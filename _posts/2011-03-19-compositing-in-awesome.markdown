---
layout: post
title: Compositing in awesome
tags:
- programming
---

A while ago I wrote [two widgets for awesome][1]. Later on I've added a little
more look&feel to my awesome desktop.

[1]: /2010/12/04/two-simple-widgets-for-awesome/

## Compositing

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

## A shiny new GTK engine

While there, I also set up a new GTK engine. For a while I was using the
[Aurora GTK engine][3], but I wanted something simpler. Then I stumbled upon
the [Equinox GTK engine][4].  Simple and nice. The tooltips are very similar to
my awesome's color theme. The buttons are smaller, good for laptop screens.
With the light shadows and fading provided by `xcompmgr`, this engine looks
great and works really well with awesome.

[3]: http://gnome-look.org/content/show.php/Aurora+Gtk+Engine?content=56438
[4]: http://gnome-look.org/content/show.php/Equinox+GTK+Engine?content=121881

{:.center}
![Awesome WM widgets][2]
GTK Equinox theme

[2]: /images/2011/gtk-equinox-theme.png

## Neutral Plus cursor theme

This is probably the best looking cursor theme in awesome. It's very similar to
the default X cursor theme, so it is unnoticable if an app doesn't support
Xcursor and falls back.

Easy to install, just add this to your `~/.Xresources`:

    /* Cursor theme: */
    Xcursor.theme: Neutral_Plus

## Color theme & font settings for `urxvt`

My `~/.Xdefaults` looks something like this:

    /* Fonts: */
    URxvt*font:             xft:Bitstream Vera Sans Mono:pixelsize=12:autohith=true:antialias=true
    URxvt*boldFont:         xft:Bitstream Vera Sans Mono:pixelsize=12:bold:autohint=true:antialias=true
    URxvt*italicFont:       xft:Bitstream Vera Sans Mono:pixelsize=12:italic:autohint=true:antialias=true
    URxvt*bolditalicFont:   xft:Bitstream Vera Sans Mono:pixelsize=12:bold:italic:autohint=true:antialias=true
    /* Colors: */
    URxvt*colorBD:          #ffffff
    URxvt*foreground:       #b2b2b2
    URxvt*background:       #000000
    URxvt*color0:           #303030
    URxvt*color1:           #b21818
    URxvt*color2:           #18b218
    URxvt*color3:           #b26818
    URxvt*color4:           #1818b2
    URxvt*color5:           #b218b2
    URxvt*color6:           #18b2b2
    URxvt*color7:           #b2b2b2
    URxvt*color8:           #686868
    URxvt*color9:           #ff5454
    URxvt*color10:          #54ff54
    URxvt*color11:          #ffff54
    URxvt*color12:          #5454ff
    URxvt*color13:          #ff54ff
    URxvt*color14:          #54ffff
    URxvt*color15:          #ffffff
    URxvt*underlineColor:   #b26818
    /* Borders: */
    URxvt*externalBorder:   0
    URxvt*internalBorder:   0
    /* Scrolling: */
    URxvt*saveLines:        12000
    URxvt*scrollBar:        false
    URxvt*scrollTtyKeypress:true
    URxvt*scrollTtyOutput:  false
    URxvt*scrollstyle:      plain
    URxvt*secondaryScroll:  true
    /* Misc: */
    URxvt*loginShell:       false
    URxvt*urgentOnBell:     true
    URxvt*fading:           30
    URxvt*shading:          15
    URxvt*transparent:      false
