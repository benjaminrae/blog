---
title: Function Types Go
author: Benjamin Rae
pubDatetime: 2023-11-24T23:59:03.607Z
postSlug: function-types-go
featured: true
draft: true
tags:
  - microservices
  - rabbitmq
  - web-development
  - typescript
  - javascript
  - nestjs
  - nodejs
ogImage: ""
description: Function types Go
---

# Function Types Go

Something that I find myself doing very regularly in TypeScript is declaring a function type, then using that type to create implementations.

That's something that I haven't seen many examples of in Go but I was sure there had to be away, so here's what I have found.

## TypeScript example

```ts
type Command<T> = {
  name: string;
  timestamp: number;
  payload: T;
};

type CreateUserCommand<User> = Command<User>;

type BanUserCommand<User> = Command<User>;

type CommandHandler<T> = (command: Command<T>) => void;

const createUserCommandHandler: CommandHandler<CreateUserCommand> = command => {
  // ...
};

const banUserCommandHandler: CommandHandler<BanUserCommand> = command => {
  // ...
};
```
