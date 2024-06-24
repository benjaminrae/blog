---
title: Testing Your TypeScript Types
author: Benjamin Rae
pubDatetime: 2023-11-24T23:59:03.607Z
featured: true
draft: true
tags:
  - testing
  - typescript
  - types
  - utility
description: Write your description here
---

## Table of contents

Once you start creating complex types in your TypeScript projects, you might run into a problem. Many of us choose to write tests because we our own hands, eyes and neurons don’t seem to be the most reliable. That’s why we love to use editors and IDEs to tell us off when we are doing things wrong. How many times have you written a type, thinking there was nothing wrong, only to find that you had completely messed up when running the code. Remember when we create types, we’re often telling out editor that we know what’s going on. Shut up editor, trust me, I’m a TypeScript developer.

![Trust me I'm a professional](https://c.tenor.com/UsUDqY5lp0kAAAAC/tenor.gif)


Guess what though, you can test your TypeScript types and it’s really easy. 

First we are going to need to build some utility types to help us.

```tsx
type Expect<T extends true> = T
```

Here’s our first type, `Expect`. How does it work?  Well, basically whatever we pass to expect if it doesn’t extend true, our editor is going to tell us. 

For example 

```tsx
Expect<false> 
```

Moving on from here we can create our next utility type. This one is a little more complicated. 

```ts
type Equal<First, Second> =
```