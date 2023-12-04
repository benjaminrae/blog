---
title: Make your Node package executable
author: Benjamin Rae
pubDatetime: 2023-12-04T19:59:03.607Z
featured: false
draft: false
tags:
  - node
  - executable
  - javascript
  - npm
  - CLI
description: As I was working on a kata, as I do in my spare time, yeah, I'm a loser. I realised that I didn't know how to make my Node applications executable. So I decided to find out how and share it with you.
---

## Table of contents

## The Problem

So I was recently working on a kata called [Ohce Kata](ihttps://kata-log.rocks/ohce-kata) which I found on [Kata-log.rocks](https://kata-log.rocks/).

The kata is pretty simple: create a console application that echoes the reverse of the input - a reverse echo! There are a couple of twists to make the kata a little more interesting but that's not why we're here.

![Echo GIF](https://media.giphy.com/media/KYIFQIusoEbaE/giphy.gif)

TypeScript was my choice for this kata and if you look at the example given on the kata page, you'll see that application is used like this:

```bash
$ ohce Pedro
> ¡Buenos días Pedro!
$ hola
> aloh
$ oto
> oto
> ¡Bonita palabra!
$ stop
> pots
$ Stop!
> Adios Pedro
```

Notice the application isn't being run with `node index.js` or `npm start`. It's being run with the application name `ohce` followed by some arguments.

Now I know, that to run any application from the command line, you need to add it to your `PATH` environment variable, but I had no idea how to do that with a Node application.

All of the packages that I've created in the past have been libraries used as dependencies in other projects, none have needed to be run from the command line. I guess unless you have created a CLI tool with Node, you probably haven't needed to do this either.

So now we're here to answer the question: how on earth do you make your Node application executable?

## The Solution

It's actually much easier than you might think.

As you know the `package.json` file is the heart of any Node project. And you have probably set the `main` property to set the point of entry for your application like this:

```json
{
  "name": "my-package",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  }
}
```

Well it turns out there is another property called `bin` that you can use to make your application executable.

So we can do something like this:

```json
{
  "name": "my-package",
  "version": "1.0.0",
  "main": "index.js",
  "bin": "./index.js",
  "scripts": {
    "start": "node index.js"
  }
}
```

If you have a single executable and you want the executable name to be the same as the package then you only have to specify the path to the executable in the `bin` property.

However, if you have several executables or you want to specify a different name, then you can pass an object to the `bin` property like this:

```json
{
  "name": "my-package",
  "version": "1.0.0",
  "main": "index.js",
  "bin": {
    "my-package": "./index.js",
    "my-other-package": "./other-index.js"
  },
  "scripts": {
    "start": "node index.js"
  }
}
```

This means that when someone installs your package from **npm**, they will be able to execute your package from the command line like this:

```bash
my-package
```

Pretty cool right?

Yes, but to make it work locally for you there's one more thing you'll need to do. Since you aren't installing your package from **npm**, you'll need to create a symlink to your executable. What's a symlink? Basically, it's a shortcut to a file or directory. You can create a symlink like this:

```bash
npm link
```

Make sure you run that command from the root of your project. This creates a symlink in your global `node_modeules` to bins specified in your `package.json` file. Now you should be able to run your executable.

If you want to see the symlinks that you have created, you can run this command:

```bash
npm ls -g --link
```

To remove a symlink, you can run this command:

```bash
npm unlink -g my-package
```

Check out the npm Docs on the `bin` property [here](https://docs.npmjs.com/cli/v6/configuring-npm/package-json#bin).

So now now it's time to go out there and start building your own CLI tools with Node!
