---
layout: post
title: Simple but powerful zsh prompt
tags:
- programming
- linux
---

Over the years, I've been changing my Bash prompt every now and then. Since I
switched to [zsh][2] last year, and started using [oh-my-zsh][3], I've slowly
put together the perfect prompt for my needs.

[2]: //www.zsh.org/
[3]: //ohmyz.sh

Here's how it looks right now (with extra-large font size for better
visibility):

[![zsh prompt][1]][1]

[1]: /images/2014/zsh-screenshot.png

### Parts of the left prompt, from left to right:

* `1z` shows that there is one background job (`vim`), suspended with
  <kbd>Ctrl</kbd>+<kbd>Z</kbd>, hence the `z` — this one goes away if there are
  no background jobs
* `tp` is the hostname, useful to distinguish between `ssh` sessions
* `git:master` shows that I'm in a git repo and that `master` is the currently
  active branch, this one is *very* useful
* the `…` after the git branch indicates that there are unstaged changes or
  newly added files — this also goes away in a clean tree
* the next part is just `$PWD` collapsed with `~` when applicable
* the final green `$` shows that I'm not the root user
* there's a trailing space to make it a word boundary when selecting with the
  mouse

There are spaces between these parts so that I can select them with a
double-click, if I want to quickly navigate here, for example in another `tmux`
window.

### Parts of the right prompt, from right to left:

* the time, including seconds, which is useful when I forget to prefix a long
  running command with `time`, but I still want to know how long did it take to
  complete (there's also a ZSH plug-in for this)
* the red `=` before the time indicates a non-zero exit status from the
  previous command

My prompt does not contain too many things, mostly in order to keep it fast. I
used to have a plug-in that would display various stats about the current git
repo in the right prompt, but it made the prompt reloads noticeably smaller,
and this is not something I can afford in a shell. Everything must be fast
enough for me not to notice it.

If anyone likes it, here's the `.zshrc` recipe:

{% highlight bash %}
ZSH_THEME_GIT_PROMPT_PREFIX=" %{$fg[blue]%}git%{$reset_color%}:%{$fg[red]%}"
ZSH_THEME_GIT_PROMPT_SUFFIX="%{$reset_color%}"
ZSH_THEME_GIT_PROMPT_DIRTY="%{$fg[yellow]%}…%{$reset_color%}"
ZSH_THEME_GIT_PROMPT_CLEAN=""

local prompt_jobs="%(1j.%{$fg[yellow]%}%j%{$reset_color%}%{$fg[red]%}z%{$reset_color%} .)"
local prompt_host="%{$fg[cyan]%}%m%{$reset_color%}"
local prompt_root="%(!.%{$fg_bold[red]%}#.%{$fg[green]%}$)%{$reset_color%}"

local return_status="%{$fg[red]%}%(?..=)%{$reset_color%}"

PROMPT='${prompt_jobs}${prompt_host}$(git_prompt_info) %~ ${prompt_root} '

RPROMPT="${return_status}%*"
{% endhighlight %}
