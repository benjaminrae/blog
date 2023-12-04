---
title: Title here
author: Benjamin Rae
pubDatetime: 2023-11-24T23:59:03.607Z
postSlug: slug-here
featured: true
draft: true
tags:
  - tags
  - here
ogImage: ""
description: Write your description here
---

## Table of contents

## The problem

In my current position we have a suite of Node.js microservices built with the Loopback framework. We also have some other microservices built with NestJs and our frontends are in React/NextJs. 

Not long after joining, I was tasked with improving error handling across the whole stack. Too often the client facing errors were unhelpful, especially for debugging. Many times they were being sent something like this: 

```json
{
    "status": 400,
    "message": "ERR_BAD_REQUEST"
}
```

We also didn't really have any useful error logging. I found myself many a time, having to dive into the logs on the Kubernetes dashboard and combing through the lines in order to find what caused the error, praying that it was logged somewhere. Sometimes it wasn´t. Yeah, it was a bit of a shit show. 

It's not really helped by the fact that TypeScript/JavaScript error handling is already a little chaotic, at least in my opinion. If you decide to throw an error, you rely on another part of the system catching and doing something with that error, but there is nothing explicitly telling users of your function/method that it could throw an error. And yes, most of the time if your function is asyncronous, then most users should realize that Promises can reject but even that is not guaranteed. 

What's more, I see this pattern all to often in TypeScript codebases:

```ts
const doSomething = async () => {
    try {
        await fetchSomething();
    } catch (error) {
        throw new Error("Couldn't do something");
    }
}
```

Do you see the problem? The caught error is left to float away into nothingness. Even passing the caught error's message to the new error (I also see this a lot), means that we lose valuable information. Stack trace of the original error is completely lost.

## Step One - Improving Errors

