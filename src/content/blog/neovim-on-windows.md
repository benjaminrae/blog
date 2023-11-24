# Neovim on Windows

I decided to try Neovim recently since I've heard about all of the benefits of learning Vim motions.

I decided to start by setting it up in a WSL and trying to create my own custom development environment.

Things worked great but when I decided to start tying to work on one of my C# projects I just couldn't get autocompletion and the LSP to work how I wanted it.

As far as I could see, everything was installed and configured correctly but it still didn't work.

It looked like a problem with the installation of the dotnet SDK on Ubuntu. I already had dotnet setup correctly on Windows 11 and I knew the SDKs were installed and working correctly. Rather than spend a whole day trying to get it configured and loose a day of work, I decided to just bring my config to Windows to see if it would work. Luckily, it did, almost.

## Installing Neovim

If you are going to be installing Neovim by itself instead of a distribution then checkout the installation instruction in the [Neovim repository](https://github.com/neovim/neovim/wiki/Installing-Neovim).

## Creating a Neovim configuration

In Ubuntu you would normally place your Neovim config in `~/.config/nvim`, but in Windows it's a little different. You should place your config here `%LOCALAPPDATA%\nvim`. If you are using Git Bash like me then you just need run `cd $LOCALAPPDATA` then `mkdir nvim`. Inside that folder is where you need to create your Neovim configuration.

Another option would be to download a starter configuration. I'd recommend [kickstart.nvim](https://github.com/nvim-lua/kickstart.nvim) since it already has everything you need to get started with a local development environment in Neovim.

## Running Neovim

You probably want to create an alias for `nvim` so that you can run it with `vim` or another command if you like.

Again, if you are using Git Bash like me, then you can run go to `~/.bashrc` and add `alias vim='nvim'`. Change `vim` to whatever command you want to run to open Neovim.

The first time your run Neovim on Windows with this configuration. You are probably going to find an error message along the lines of:

> `No C compiler found! "cc", "gcc", "clang", "cl", "zig" are not executable.`

To fix this you are going to need to install a C compiler on your Windows machine. To do this I'd recommend follwing [this guide](https://www.freecodecamp.org/news/how-to-install-c-and-cpp-compiler-on-windows/) from FreeCodeCamp.

Once you have the C compiler installed and added to your path, you should be able to run Neovim without any error messages.

Now you should be ready to go and start developing on Windows with Neovim.

## Learning Vim motions

First understand that Vim has five modes:

- Normal mode
- Insert mode
- Visual mode
- Command mode
- Replace mode

Normal mode is the mostly for navigating around the document. Text you type in this mode isn't added to the document. You can enter normal mode by pressing `esc` while in the other modes.

Insert mode is for editing the text in the document. `i`, `a` and `o` all switch to insert mode.

Visual mode is for selecting text in the document. `v` switches to visual mode.

Command mode is for running both native and plugin commands. `:` starts command mode.

Replace mode is for replacing text. `R` starts replace mode.

This is a very, very basic overview of the modes, but you will learn more you as you go.

The next step is going to be learning to use Vim motions so that you can navigate and edit files and folders quickly in Neovim.

Let me tell you, you are going to feel very slow for a week or two and you might be tempted to jump back to you old IDE or editor. I'd recommend you persevere because things will start to fall into place.

The best place to start is with **Vimtutor**.

With Neovim installed all you have to do is run `nvim +Tutor`, remember you can use your alias if you set it. Or with Vim you can just run `vimtutor` in the terminal.
Start by working through those exercises regularly to learn the basic movements.

You can also open a list of commmand from anywhere in Neovim by typing `:help` in normal mode.

Once you're done, then start investigating the key mappings that were installed with **kickstart.nvim**, there are quite a few of them and most will make things even easier than the simple Vim motions.
