---
layout: post
title: Productivity boost for September
tags:
 - Linux
 - programming
 - work
summary: My recipe for a productive study- and work environment.
---

It's September, again. And exams are starting pretty soon, so I decided to
boost my productivity as much as I can. Studying, working and following
[mailing](http://www.mail-archive.com/distutils-sig@python.org/)
[lists](http://lists.repoze.org/listinfo/repoze-dev) can take up too much time
sometimes. And as much as I like programming, I also like to leave my desk
sometimes.

The idea is that the more productive my work hours get, the less of them will
be necessary. Or at least that's what I'm hoping for.


Personalized work environment
-----------------------------

My work enwironment of choice is:

* [Gentoo Linux](http://www.gentoo.org/) on `~amd64` with some overlays
* [awesome window manager](http://awesome.naquadah.org/) with six tags
* [konsole terminal emulator](http://konsole.kde.org/) with two profiles
* [byobu](https://launchpad.net/byobu) in my default konsole profile
* [bash](http://www.gnu.org/software/bash/) with some nice colors
* [vim](http://www.vim.org/) with some nifty scripts

Currently my main browsers are:

* [Chromium 7.0.503.1 (0)](http://www.chromium.org/) for everyday browsing
* [Firefox 3.6.8](http://www.mozilla.com/en-US/firefox/firefox.html) with
  [FireBug](http://getfirebug.com/) for development

I use these tools more than 95% of the time I'm using my computer. This is me
writing this very article using vim:

<div class="center">
  <a href="/media/images/random/environ.png">
    <img src="/media/images/random/environ-small.png"/>
  </a>
</div>

As you can see, I don't really like big title bars and scrollbars. Nor those
annoying menus. Most things have their own keybinding so I don't need too many
buttons.

Awesome is my only window manager for almost a year now, since <a
href="http://kobold.it/blog/" rel="met">a friend of mine</a> suggested it. It
took some time to get used to it, but now I'm really addicted :)


Vim 7.3
-------

It is by far the best editor I've seen out there (haha, take that,
[emacs](http://www.gnu.org/software/emacs/) users). Some of my favorite
extensions are:

* [snipMate](http://www.vim.org/scripts/script.php?script_id=2540)
* [PyFlakes](http://github.com/kevinw/pyflakes-vim)
* [PEP8](http://www.vim.org/scripts/script.php?script_id=2914)
* [VIM Pdb](http://github.com/gotcha/vimpdb)
* [Dpaste.com plugin](http://www.vim.org/scripts/script.php?script_id=2519)
* [ZenCoding](http://www.vim.org/scripts/script.php?script_id=2981)

This is how a usual `vimpdb` session looks like:

<div class="center">
  <a href="/media/images/random/vimpdb.png">
    <img src="/media/images/random/vimpdb-small.png"/>
  </a>
</div>


Learning Programmers' Dvorak
----------------------------

This is something I should have done a long time ago. I finally took the time
to add these lines to my `xorg.conf`:

    Section "InputDevice"
        Identifier  "Dvorak Programmer Keyboard"
        Driver      "kbd"
        Option      "XkbLayout"     "us"
        Option      "XkbVariant"    "dvp"
        Option      "XkbOptions"    "compose:102,numpad:shift3,kpdl:semi,keypad:atm,caps:shift"
    EndSection

I was inspired by [this
article](http://workawesome.com/productivity/dvorak-keyboard-layout/). Now my
keyboard layout looks like this:

<div class="center">
  <a href="/media/images/random/dvp.png">
    <img src="/media/images/random/dvp-small.png"/>
  </a>
</div>

I'm still getting used to it, but in the long term, this change is certainly
going to be worth it.
