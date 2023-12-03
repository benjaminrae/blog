---
title: No More Noisy Type Assertions
author: Benjamin Rae
pubDatetime: 2023-12-03T20:00:00.607Z
featured: true
draft: false
tags:
  - typescript
description: Are you sick of filling your TypeScript code with noisy type assertions? Maybe with this you can remove them from your code completely.
---

## Table of contents

## The Problem

One of the criticisms of TypeScript that I've seen floating around the internet is that TypeScript can add a lot of noise your codebase. Even though I would never work with JavaScript with it, there probably is some truth behind that opinion.

I was building a simple POC today for a browser extension and basically what I was trying to do was handle messages send from the extension's popup to the extension's background script. I found myself in a situation where I was doing a lot of type assertions and it got me thinking about how I could avoid that.

Have you ever found yourself in a situation like this?

Let's see if we can clean up some of that noise today.

![](https://media.giphy.com/media/xsATxBQfeKHCg/giphy-downsized-large.gif)

Imagine you have these types:

```ts
enum MessageActions {
  START = "start",
  STOP = "stop",
  RESET = "reset",
}

type Message<Payload> = {
  action: MessageActions;
  payload: Payload;
};

type StartMessage = Message<{
  some: string;
  random: string;
  properties: string;
}>;
```

And you define a function to handle messages like this:

```ts
const handleMessage = (message: Message<unknown>) => {
  if (message.action === MessageActions.START) {
    console.log("Start action received!");
  }
};
```

We're not here to judge whether this code is good or bad, we can leave that debate for another time, BUT I see this kind of thing A LOT in TypeScript codebases.

Now after entering the `if` block, I know that my code is a StartMessage, or at least I want it to be.

So when we do something like this:

```ts
const handleMessage = (message: Message<unknown>) => {
  if (message.action === MessageActions.START) {
    console.log("Start action received!");

    console.log(message.payload.some); // 'message.payload' is of type 'unknown'
  }
};
```

TypeScript correctly notifies us that payload is of type unknown. But oh yes, we can shut TypeScript up with out favorite word, `any`!

While any may keep TypeScript quiet here, it will not give us any help in knowing what on earth is in the payload and we can start doing things like this:

```ts
const handleMessage = (message: Message<any>) => {
  if (message.action === MessageActions.START) {
    console.log("Start action received!");

    console.log(message.payload.foo.bar.baz);
  }
};
```

Naturally, TypeScript stays quiet, but there you have a nice little nest of runtime errors.

## Possible fixes

So, what's the alternative?

Until now my alternative had mostly been things like this:

```ts
const handleMessage = (message: Message<unknown>) => {
  if (message.action === MessageActions.START) {
    console.log("Start action received!");

    console.log((message as StartMessage).payload.some);
  }
};
```

Here TypeScript is happy, you've asserted the type that you believe it is and TypeScript now knows what is in the payload.

Well since TypeScript is happy, we can finish? No?

NO. I am not happy. I can maybe bear this kind of thing once in a while, but when you need to do this several times, it gets messy. The code becomes much harder to read.

So what's the solution?

### The "Do it Once" method

Declare a new variable and do the type assertion once like this:

```ts
const handleMessage = (message: Message<unknown>) => {
  if (message.action === MessageActions.START) {
    console.log("Start action received!");
    const startMessage = message as StartMessage;

    console.log(startMessage.payload.some);
    console.log(startMessage.payload.random);
    console.log(startMessage.payload.properties);
  }
};
```

But there's an even better method, in my opinion.

### The "Type Guard" method

We're going to take advantage of a TypeScript operator that you might not have heard of: The `is` operator.

Type guards are not specific to TypeScript and I'm sure you've already used them.

```ts
const isStartMessage = (message: Message<unknown>): boolean =>
  message.action === MessageActions.START;
```

There you have a type guard. Simple, right? That type guard will actually do nothing for us.

```ts
const handleMessage = (message: Message<unknown>) => {
  if (isStartMessage(message)) {
    console.log("Start action received!");

    console.log(message.payload.some); // 'message.payload' is of type 'unknown'
  }
};
```

We are still getting the same error as before. That's because `isStartMessage` simple checks `message.action` and returns a boolean. What we need to do is also let TypeScript know that `isStartMessage` is a type guard.

Here's the new type guard leveraging TypeScript's `is`` operator.

```ts
const isStartMessage = (message: Message<unknown>): message is StartMessage =>
  message.action === MessageActions.START;
```

As you can see it reads pretty logically. The type guard is checking if `message` is a `StartMessage`. And by doing it this way, TypeScript now knows that inside the `if` block, `message` is of type `StartMessage`.

## Wrapping up

Personally, I'd opt for type guards where possible. It introduces less noise and makes the code a little easier to read at a glance.

The `is` operator is one of the many ways we can perform type _narrowing_ in TypeScript. If you want to find out what else you can do the check out [Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html) in the TypeScript documentation.

I hope you enjoyed the read and sorry for not providing a better example, it's just what came to mind. See you next time!
