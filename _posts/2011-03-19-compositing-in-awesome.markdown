---
layout: post
title: Compositing in awesome
tags:
 - Awesome
 - Lua
 - Linux
summary: How to enable compositing in the awesome window manager.
---

A while ago I wrote [two widgets for
awesome](/2010/12/04/two-simple-widgets-for-awesome.html). Later on I've added
a little more look&feel to my awesome desktop.


Compositing
-----------

Very easy, via `xcompmgr`. I don't like the huge default shadows (nor pretty
much any of the default settings), so I start it from my `rc.lua` like this:

{% highlight lua %}
awful.util.spawn("nautilus -n")
awful.util.spawn("xcompmgr -c -C -f -F -D 2.5 -l -2 -t -2 -r 2 -o 0.25")
{% endhighlight %}

Note that I need to start `nautilus` before running `xcompmgr`, otherwise tha
background won't word. Passing `-n` to `nautilus` will get rid of the desctop
icons. Now I get to see the `GNOME` desktop background instead of my awesome
background image, but it's easy to change using the `gconf-editor`.


A shiny new GTK engine
----------------------

While there, I also set up a new GTK engine. For a while I was using the
[Aurora GTK
engine](http://gnome-look.org/content/show.php/Aurora+Gtk+Engine?content=56438),
but I wanted something simpler. Then I stumbled upon the [Equinox GTK
engine](http://gnome-look.org/content/show.php/Equinox+GTK+Engine?content=121881).
Simple and nice. The tooltips are very similar to my awesome's color theme. The
buttons are smaller, good for laptop screens. With the light shadows and fading
provided by `xcompmgr`, this engine looks great and works really well with
awesome.

<div class="img center">
  <a href="/media/images/random/gtk-equinox-theme.png">
    <img src="/media/images/random/gtk-equinox-theme.png"/>
  </a>
</div>
