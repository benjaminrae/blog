---
title: Trying Neovim For A Week
author: Benjamin Rae
pubDatetime: 2023-11-24T23:59:03.607Z
postSlug: trying-neovim-for-a-week
featured: true
draft: true 
tags:
  - tools
  - productivity
  - neovim
ogImage: ""
description: Trying Neovim for a week
---

## Table of contents

The time has come, it's time to be a real programmer and go blazingly fast *a la* Primeagen.

![](https://media.giphy.com/media/rHd6tkRptFuk8/giphy.gif)

My journey through code editors has been as follows:
- Jupypter Notebook (is this even a code editor)
- Sublime Text
- PyCharm
- VsCode (I finally learned how to use semi-colons and curly braces)
- VisualStudio (mostly for the test runner and debugger when using C#)

Out of all of these. VsCode is by far the one I've used the most. And yeah, I will admit it: it hasn't bothered me immensely thus far.

But it does have its shortcomings. I have an older laptop that I keep by the bed for some late night programming action (yes, my life is that thrilling). VsCode turns this laptop into a toaster. 

Another thing that I often find annoying about VsCode and other editors is that there's so much wasted real estate. I always endup feeling like there are too many things on the screen. Now VsCode does have Zen Mode but it leaves thick sidebars which I don't like. 

Let me preface this by saying that I have tried to learn VIM motions before. A while back I installed [vscodevim](https://marketplace.visualstudio.com/items?itemName=vscodevim.vim) in VsCode and I have a Vim profile set up there. I do often find that I fallback to using the mouse a lot, though. It's probably habit after a couple of years of using the mouse so much to edit code, but it's a habit that I can't break.

But anyway, back on track. What I want to say is, I already knew how to exit Vim, so I was flying, right?

## The week of Neovim

### Day one

I got started by watching ThePrimeagen's 0 to LSP video. In fact I watched it like 3 or 4 times. It was a great way of seeing how to use Lua to create a neovim configuration. The key takeway from the video for me is the cycle of installing a plugin via your package manager, then creating a configuration file for that plugin, then testing.

Here's the problem - ThePrimeagen(aka TheVimagen) has been using Vim for over a decade and knows exactly what he wants out of his configuration. By copying his video you are only going to end up with load of plugins and key mapping that you aren't going to use. So I made the decision to scrap it.

I still didn't feel like I could create my own configuration yet and I knew that a pluginless Neovim would just send me running straight back to VsCode.

What were my other options?

I could pick one of the many Neovim distributions available online (Lunarvim, Astrovim, NVChad, etc.) or copy a random Neovim configuration from GitHub

Both options would probably have left me in exactly the same position as I was in after following Prime's video. 

So yeah, end of the first day. I hadn't expected to be productive using Neovim on the first day, but I had hoped to have it configured. 

### Day two

Technically this happened on the first day but that doesn't matter. After watching Prime's video and a few others several times the YouTube algorithm was already zeroing in on my interest in Neovim content. In bed that night, I came across TJ DeVries' video, [Zero to IDE](https://youtu.be/stqUbv-5u2s?si=AGyD4mGAbW-lD4D2). The title made it look like it would be very similar to Prime's video, BUT it was about half the length. So I saved it to watch later came back to watch it the next morning. 

TJ shows you how to set up Neovim using his [kickstart.nvim](https://github.com/nvim-lua/kickstart.nvim) script. Within the first few minutes of the video you already have everything set up (syntax highlighting, autocompletion, remaps, etc) and he spends the rest of the video explaining how it all works. It's a great video if you're new to Neovim.

By the way, Prime actually recommends **kickstart.nvim** at the very end of his video. I just never watched to the very end. What an idiot!

So very quickly on day two, I had a working Neovim configuration and I was able to start developing.

### Rest of the week



## Try it yourself

### Installing Neovim

If you are going to be installing Neovim by itself instead of a distribution then checkout the installation instruction in the [Neovim repository](https://github.com/neovim/neovim/wiki/Installing-Neovim). I installed from source because the apt repository on Ubuntu doesn't have a very up to date version. Don't forget to install the build requisites!

If you don't want to go all in, I'd really recommend starting to learn VIM motions. For VSCode users, I cannot recommend the vscodevim plugin that I mentioned earlier. It's more trouble than it's worth in my opinion. However, [VSCode Neovim](https://github.com/vscode-neovim/vscode-neovim) is well worth trying out.

### Configuring Neovim 

For Windows users like me, you have two options. I've tried and use both.

You can install a Linux distro using WSL and set up and configure Neovim there. 
Or, you can just install Neovim on Windows. If you choose this option, you might run into a few bumps down the road, but I'll explain how I fixed them in a moment.

In Ubuntu you would normally place your Neovim config in `$XDG_CONFIG_HOME/config`, normally `~/.config/nvim`.

But in Windows it's a little different. You should place your config here `%LOCALAPPDATA%\nvim`. If you are using Git Bash like me then you just need run `cd $LOCALAPPDATA` then `mkdir nvim`. Inside that folder is where you need to create your Neovim configuration.

If you are using [kickstart.nvim](https://github.com/nvim-lua/kickstart.nvim), all you need to do is clone your fork into that folder since it already has everything you need to get started.

You probably want to create an alias for `nvim` so that you can run it with `vim` or another command if you like.

### Running Neovim

Again, if you are using Git Bash like me or Ubuntu, then you can run go to `~/.bashrc` (`~/.zshrc`) and add `alias vim='nvim'`. Change `vim` to whatever command you want to run to open Neovim.

This next part is the problem Windows users will run into. Skip it if you are using WSL or Ubuntu. 

The first time your run Neovim on Windows with this configuration. You are probably going to find an error message along the lines of:

> `No C compiler found! "cc", "gcc", "clang", "cl", "zig" are not executable.`

To fix this you are going to need to install a C compiler on your Windows machine. To do this I'd recommend follwing [this guide](https://www.freecodecamp.org/news/how-to-install-c-and-cpp-compiler-on-windows/) from FreeCodeCamp.

Once you have the C compiler installed and added to your path, you should be able to run Neovim without any error messages.

Now you should be ready to go and start developing on Windows with Neovim.



