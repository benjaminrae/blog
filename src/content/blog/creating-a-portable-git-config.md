---
title: Creating A Portable Git Config (.gitconfig)
author: Benjamin Rae
pubDatetime: 2024-01-12T23:59:03.607Z
postSlug: portable-git-config
featured: true
draft: false
tags:
  - git
  - config
  - gitconfig
  - dotfiles
description: I got sick of having to change my Git configuration regularly for different machines, depending if I was working on a personal or a professional project, so I decided to sit down and create a portable Git config file.
---

## Table of contents

## Why do I need it

I've recently found myself switching between computers regularly. I have a work laptop, a personal laptop and a personal desktop, although I often use all three for both personal and professional work. This has driven me to try and standardise my configuration across all of my devices and one of the tools that I need to be configured correctly on all devices is Git.

![Git merge meme](https://i.giphy.com/cFkiFMDg3iFoI.webp)

My workflow until now has been something like this:
1. Clone or start a project
2. Commit and push to remote
3. See in PR that I'm commit to a work repo with a personal email or vice versa
4. Run `git config --local1.user.email ...` with the correct email
5. Force push the changes 
6. Go to sleep knowing I will do the same thing the next day 

Running `git config ...` regularly is becoming tiresome, so I decided to create a `.gitconfig` file that I can take anywhere with me. Even spinning up and working in a container or a VM, I can quickly configure Git just by adding the `.gitconfig` file.

Also, Git just has some weird and verbose commands. I mean, think about listing tags, branches and remotes:
- `git tag -l`
- `git branch -a`
- `git remote -v`

Surely if we are just trying to list things it would be more intuitive for all three to have the same list command! And yes, I know `git branch` can accept `-l` too.

## Configuring Git

There are a few places where we can configure Git and in most of them you will probably already find some basic configuration already.

### System

`/etc/gitconfig` holds your system-wide git configuration. You probably don't ever have to touch this file unless you have a specific system level use case. I haven't really found the need to. You can use `git config --system` to update this file.

### User

You'll find user level config files in a couple of places: 
-  `$XDG_CONFIG_HOME/config`
- `$HOME/.gitconfig` (if `$XDG_CONFIG_HOME` doesn't exist)

If both of these files exist, then they are read in that order. This is the equivalent of `git config --global ...`.

### Local

For repository level configurations you can find that at `$GIT_DIR/config` (normally `.git/config`) and that's the equivalent of using `git config --local`.

### Aliases

One of the most powerful things that you can configure in your `.gitconfig` file are aliases.

You can set them like this: 

```gitconfig
[alias]
	cm = commit
```

This alias allows you to use "cm" instead of writing the full "commit" command. Personally, I don't use these aliases much since I tend to use tab to autocomplete and I don't feel it saves much time at all. [Victor Zhou did the maths](https://victorzhou.com/blog/git-aliases/#some-quick-maths) and found that with an average typing speed of 135WPM, his git aliases only saved him about 1 minute of typing per day.

I prefer to use aliases to quickly run longer commands, here are some of my favourites:

```gitconfig
[alias]
	# Lists
	aliases = config --get-regexp alias
	tags = tag -l
	branches = branch -a
	remotes = remote -v 
```

Basically running `git branches` will actually run `git branch -a`. 

We can also pass arguments to our aliases:
```gitconfig
[alias]
	# Amending
	amend = commit --amend --no-edit
	rename = "!f() {commit --amend -m $1}"
```

Notice that the `amend` alias doesn't take any arguments, but the `rename` command does. So if I run `git rename "foo"` then it will amend my last commit message to "foo".

So here's a pretty sensible (in my opinion) `.gitconfig` file to get you started. Obviously, update your editor, name and email before using this.

```gitconfig
[core]
	# Line endings
	autocrlf = false
	
	# Use custom `.gitignore` and `.gitattributes`
	excludesfile = ~/.gitignore
	attributesfile = ~/.gitattributes

	# Default editor for .git files
	editor = vim

[alias]
	# Lists
	aliases = config --get-regexp alias
	tags = tag -l
	branches = branch -a
	remotes = remote -v 

	# Amending
	amend = commit --amend --no-edit
	rename = "!f() {commit --amend -m $1}"
	
	graph = log --oneline --graph
[help]
	# Correct and execute mistyped commands
	autocorrect = 1

[init]
	defaultBranch = main

[user]
	name = Benjamin Rae
	email = ben@benjaminrae.dev

[pull]
	ff = only

[fetch]
	prune = true

[color]
	ui = auto
```

### Conditional Configuration

Now to the best part. I want to be able to have different configurations for personal and work repositories. How you do that? 

One option would be to have two different users on your machine, one for work and one for personal use. Then each can have their own dedicated `.gitconfig`. But I don't like that option: too much logging in and out. 

I recently came across these two approaches:

https://www.brantonboehm.com/code/conditional-git-config/ (using remotes)
https://blog.scottlowe.org/2023/12/15/conditional-git-configuration/ (using directories)

The first option uses remotes to update your `.gitconfig`. I think this is a good option if you are working at several companies and need to fine-tune configuration for each remote.

The next uses directories, so if you would would want to keep all your personal projects in one directory, and the work ones in another. I assume that most of you already do this.

Both options seem adaptable for most scenarios, but I think I'm a little more attracted to remotes, especially if you're likely to clone a work project to a personal directory on your machine. This also helps with the portability of our `.gitconfig` file since remotes should stay the same across machines but our folder structure may not. However. you will need to either make sure you don't mix HTTP and SSH remotes, or include configuration for both of them.

So as well as our `.gitconfig` file, let's create one for work. I'm going to call it `.gitconfig.work` but you call call it whatever you want: 
```
[user]
	email = work@benjaminrae.dev
```
And in the original `.gitconfig` we'll add this to the end:

```
[includeIf "hasconfig:remote.*.url:https://gitlab.benjaminrae.dev/*/**"]
	path = .gitconfig.work 
```

Now all you need to do is put these files into a remote repository and then clone them to any machines that you plan on using. 

## Finally, RTFM

I don't know why, but for a very long time I found Git's documentation to be the most intimidating and I never really delved into it. If I had, then I'd have probably set up this configuration a long time ago. Remember, everything I've covered is also in the official Git documentation:
- [Files](https://git-scm.com/docs/git-config#FILES)
- [Conditional Includes](https://git-scm.com/docs/git-config#_conditional_includes)
