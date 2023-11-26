---
title: Building My First Browser Extension
author: Benjamin Rae
pubDatetime: 2023-11-24T23:59:03.607Z
postSlug: building-my-first-browser-extension
draft: false
featured: true
tags:
  - browser extensions
  - web-development
  - javascript
  - typescript
  - tsup
ogImage: ""
description: Building my first browser extension
---

## How I Got Here

Like many of you, I spend too much time being unproductive online. Recently, I've taken to lurking on [Hacker News](https://news.ycombinator.com/) during the day at work and keeping up with what's going on in the world of tech.

Now, Hacker News' UI is pretty barebones, it's definitely not going to win any design awards. But it is functional, it offers a simple experience of reading and commenting on articles and I tend to enjoy the discussions more than the articles themselves.

You might have gathered, since I'm talking about looking at this during the day, that my attention span is a bit iffy at times. Normally, I get distracted, jump into a thread read it to the end and then hop onto my next task. It actually works pretty well for me since it gets me out of my code editor and takes my mind off of the problem I'm working on for a moment.

Where am I going with this? Well, my attention span being what it is, I often feel that certain comment threads on HN get a bit boring after the first couple of replies, not only that it starts to look like callback hell, and it's often impossible to know which level of the thread you're on.

![Hacker News comment hell](../../assets/blog/HN-comment-hell.png)

With that problem came my idea for my first browser extension. Help me find the comments I want to read and let me skip the rest.

I know that the majority of the comments that I find interesting are first or second level replies. Beyond that it's usually just people arguing about the same thing over and over again. So, I wanted to be able to jump between the all of the first level comments on the page.

Hacker News Scroller was born. Great, right? I really put a lot of thought into the name.

## How I Built It

It turns out, that it's not actually that hard to make a browser extension. Making a good one is different mind you, but getting your code to run as a browser extension doesn't have much mystery behind it. It is also pretty versatile. Your extension could just be a UI tweak for your favorite website, or it could be a full blown application with service workers, a separate backend, popups for configuration and more.

### Manifest.json

Just like when you have Node.js project, you need a `package.json`, well turns out you need a `manifest.json` file for browser extensions. Here I am strictly talking about Chromium based browsers, but I presume others will need something similar, maybe with a different name.

This `manifest.json` file is very similar to a `package.json file`. It has some important things like the extension name, version and description.

Here's my `manifest.json` file:

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

## Developing the extension

Those of you that work with frontend frameworks that have Hot Module Reload might find the DX of browser extensions a little clunky. Tsup, like tsc, has a watch mode and it builds really quickly. But, that's not the problem. If you want to see the changes you've made in the browser, you need to add load the extension.

First let's go to `Settings -> Extensions -> Manage Extensions`.

Or, click on the extensions icon(in Chrome it's a piece of a jigsaw pizzle) and then `Manage Extensions` at the bottom.

You should now be on the page where you can manage your browser extensions, but you will only be able to interact with your installed extensions.

At the top right, you should see the option to toggle `Developer mode`.

Once you're in developer mode, at the top left, you should now see `Load unpacked`, `Pack extension` and `Update`.

Perfect, click on load unpacked and upload the folder where you have your `manifest.json` and other extension files. If you are doing it like me, or using my template, that should be the `dist` folder.

That's it, you can now see your extension in the browser and try it out. You'll see that you even get some options for debugging here on the extensions page.

But wait..., you haven't finished developing have you? No? Well, time to make your changes in your code. And since you are using Tsup's watch mode all of your changes are being added to your `dist` folder. But your extensions is not changing.

I told you that you would miss HMR.

Now it's time to back to the extensions page, find your extension, and refresh it. Unfortunately, you're going to be in that cycle for the rest of development.

So, it is possible to use HMR with browser extensions, but it would require a little bit of extra set up, that I don't really need. But if you're interested, there is a webpack plugin out there somewhere, and I have also seen a websocket implementation to monitor changes in the dist folder and trigger a reload event in the browser. I'm sure there are other ways too. I really didn't want to bother with Webpack for this. I mean, look at how many lines are in my Tsup config file. Have you seen a webpack config file? It's like a novel. Rollup or Esbuild might have been a better alternative and I'll probably dig a little deeper into using those for browser extensions in the future.

Now, let me clear this up a bit because I was being a little dramatic. You DON'T need to refesh the extension every single time you make a change to the code.

## Publishing the extension

If you decide you want to publish an extension on the Chrome Web Store the first step is parting with your hard earned cash. Unfortunately,

## Try it yourself

If you'd like to try building your own extension with TypeScript, then feel free to use my [GitHub template](https://github.com/benjaminrae/ts-chrome-extension-starter). It uses Tsup like in my example.

I'd love to see what you can come up with.
