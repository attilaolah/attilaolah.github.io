---
layout: post
title: A simple but powerful zsh prompt
---

Over the years, I've been changing my bash prompt every now and then. Since I
switched to [zsh][2] last year, and started using [oh-my-zsh][3], I've slowly
put together the perfect prompt for my needs.

[2]: //www.zsh.org/
[3]: //ohmyz.sh

Here's how it looks right now (with extra-large font size for better
visibility):

[![zsh prompt][1]][1]

[1]: /images/2014/zsh-screenshot.png

### Parts of the left prompt, from left to right:

* <code style="background: black"><span style="color: #c4a000;">1</span><span style="color: #c00;">z</span></code>
  shows that there is one background job (`vim`), suspended with
  <kbd>Ctrl</kbd>+<kbd>Z</kbd> (hence the `z`) — this goes away if there are no
  background jobs
* <code style="background: black; color: #06989a;">tp</code>
  is the hostname, useful to tell apart `ssh` sessions
* <code style="background: black; color: #aaa;"><span style="color: #3465a4;">git</span>:<span style="color: #c00;">master</span></code>
  shows that I'm in a git repo and that `master` is the currently active
  branch, this one is *very* useful
* <code style="background: black; color: #c4a000;">…</code>
  after the git branch indicates that there are unstaged changes or newly added
  files — this goes away in a clean tree
* <code style="background: black; color: #aaa;">~/github.com/attilaolah/…</code>
  is just the `$PWD` collapsed with `~` when applicable
* <code style="background: black; color: #4e9a06;">$</code>
  shows that I'm not the root user
* there's a trailing space to make it a word boundary when selecting with the
  mouse

There are spaces between these parts so that I can select them with a
double-click, if I want to quickly navigate here, for example in another `tmux`
window.

### Parts of the right prompt, from right to left:

* <code style="background: black; color: #aaa;">1:23:52</code>
  is the time, which is useful when I forget to prefix a long
  running command with `time`
* <code style="background: black; color: #c00;">=</code>
  before the time indicates a non-zero exit status from the previous command

I used to have `git_prompt_status` in the right prompt (that shows a summary of
changes in the current repo), but it was making the terminal noticeably slower,
which is not something I tolerate. Hitting enter in a terminal must feel
instant.

### The source, if anyone likes it:

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
