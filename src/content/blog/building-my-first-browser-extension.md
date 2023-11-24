---
title: Building My First Browser Extension
author: Benjamin Rae
pubDatetime:
postSlug: building-my-first-browser-extension
draft: true
featured: true
tags:
  - browser extensions
  - web-development
  - javascript
  - typescript
  - tsup
ogImage: ""
description:
---

# Building My First Browser Extension

## How I Got Here

Like many of you, I spend too much time being unproductive online. Recently, I've taken to lurking on [Hacker News](https://news.ycombinator.com/) during the day at work and keeping up with what's going on in the world of tech.

Now, Hacker News' UI is pretty barebones, it's definitely not going to win any design awards. But it is functional, it offers a simple experience of reading and commenting on articles and I tend to enjoy the discussions more than the articles themselves.

You might have gathered, since I'm talking about looking at this during the day, that my attention span is a bit iffy at times. Normally, I get distracted, jump into a thread read it to the end and then hop onto my next task. It actually works pretty well for me since it gets me out of my code editor and takes my mind out of the code for a moment.

Where am I going with this? Well, my attention span being what it is, I often feel that certain comment threads on HN get a bit boring after the first couple of replies, not only that it starts to look like callback hell, and it's often impossible to know which level of the thread you're on.

With that problem came my idea for my first browser extension. Help me find the comments I want to read and let me skip the rest.

I know that the majority of the comments that I find interesting are first or second level replies. Beyond that it's usually just people arguing about the same thing over and over again. So, I wanted to be able to jump between the all of the first level comments on the page.

Hacker News Scroller was born. Great, right? I really put a lot of thought into the name.

## How I Built It

It turns out, that it's not actually that hard to make a browser extension. Making a good one is different mind you, but getting your code to run as a browser extension doesn't have much mystery behind it. It is also pretty versatile. Your extension could just be a UI tweak for your favorite website, or it could be a full blown application with service workers, a separate backend, popups for configuration and more.

### Manifest.json

Just like when you have Node.js project, you need a package.json, well turns out you need something a manifest.json file for browser extensions. Here I am strictly talking about Chromium based browsers, but I presume others will need something similar, maybe with a different name.

This manifest.json file is very similar to a package.json file. It has some important things like the extension name, version and description.

Here's my manifest.json file:

```json
{
  "manifest_version": 3, // this is the version of the manifest file
  "name": "Hacker News Scroller", // this is the name of the extension
  "version": "1.0", // this is the version of the extension
  "description": "Read Hacker News comments with ease.", // this is the description of the extension
  "permissions": ["scripting", "tabs", "activeTab", "storage"],
  "content_scripts": [
    {
      "matches": ["*://news.ycombinator.com/item*"], // this is the URL that the extension will run on
      "js": ["index.js"], // this is the content script that the extension will run
      "runs_at": "document_end" // this is when the extension will run
    }
  ],
  "action": {
    "default_popup": "popup.html"
  },
  "options_page": "options.html"
}
```

I built my extension using manifest verison 3, so that's what I'm able to talk about here. It is the newest version and it does bring some important changes compared to older versions.

[//]: # "TODO: Add link to manifest.json docs"

Check the changes here:

### Content Scripts

The most important part of the manifest.json file(for this project) is the content scripts property. That's where we are able to link to the code that the browser extension will run in order to interact with the DOM and content on the page.

Browser extensions follow the same rules as web pages. we use HTML to markup the content, CSS to add styles and JavaScript for the logic. We can also use [WebAPIs](https://developer.mozilla.org/en-US/docs/Web/API) just like we would in a web page. Not only do we have access to JavaScrip WebAPIs in a browser extension but we also have access to [ChromeAPIs](https://developer.chrome.com/docs/extensions/reference/).

### Service workers

Service workers are for interacting with browser events rather than the content of a web page. For example, you can use service worker to listen to a new tab being opened in the browser.

I didn't need to use any service workers for my extension since I didn't need to interact with any of the browser events.

### The rest

We can also use the manifest.json file to add icons for the extension, set permissions and even decide in which browser contexts the extension will run. We can also design our own options pages to let users configure the extension and include it in the manifest.json file. We can also include actions that the user can take on the extension, like clicking a button to open a popup. There's a lot of options and I probably haven't even scratched the surface so the best place to find out is in the Chrome Developer documentation.

## The Code

I decided to use TS in my project which is not necessary but my personal preference when developing. Using TS means that I need to compile my code into JS before I can use it in the browser. I used [Tsup](https://tsup.egoist.dev/) so that I am able to compile and bundle my code into a single file. This is important to reduce the size of the extension and also to make sure that the code is compatible with the browser.

Here's my Tsup config file:

```js
import { defineConfig } from "tsup";

export default defineConfig({
  entryPoints: ["src/index.ts"], // source file
  dts: true, // generate .d.ts bundle
  sourcemap: true, // generate sourcemap
  format: ["cjs"], // output in CJS
  clean: true, // clear the dist folder before each build
  splitting: true, // split output into chunks
  minify: "terser", // minify output using Terser
  watch: process.argv.includes("--watch"), // configure watch mode by passing "--watch" to the CLI
  publicDir: "public", // copy files from "public" folder into dist folder
  legacyOutput: "dist/index.js", // this lets me create CJS with the .js extension instead of .cjs extension
});
```
