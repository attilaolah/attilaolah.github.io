---
layout: post
title: How to prevent Chromium opening all files with Firefox
tags:
 - Chromium
 - Awesome
 - Linux
summary: A quicx & simple fix for all those with a tiling window manager.
---


The problem
-----------

Chromium opens downloaded files using `xdg-open`.  Problem is, `xdg-open`
doesn't work correctly with awesome (and also doesn't support a number of
other, non-mainstream wms.)

The iece of code responsible for detecting the desktop environment:

{% highlight bash %}
detectDE()
{
    if [ x"$KDE_FULL_SESSION" = x"true" ]; then DE=kde;
    elif [ x"$GNOME_DESKTOP_SESSION_ID" != x"" ]; then DE=gnome;
    elif `dbus-send --print-reply --dest=org.freedesktop.DBus \
        /org/freedesktop/DBus org.freedesktop.DBus.GetNameOwner \
        string:org.gnome.SessionManager > /dev/null 2>&1` ; \
        then DE=gnome;
    elif xprop -root _DT_SAVE_MODE 2> /dev/null | \
        grep ' = \"xfce4\"$' >/dev/null 2>&1; then DE=xfce;
    elif [ x"$DESKTOP_SESSION" == x"LXDE" ]; then DE=lxde;
    else DE=""
    fi
}
{% endhighlight %}

(this comes from Gentoo's `xdg-open`, ebuild
`x11-misc/xdg-utils-1.1.0_rc1_p20110519`.)


A solution
----------

While we could easily monkey-patch this, or we could just set some environment
variables, but there's a cleaner solution. Create the script
`/usr/local/bin/xdg-open`, so it will take precedence over the real `xdg-open`,
and have it set the environment variable only for the process you're about to
start:

{% highlight bash %}
#!/bin/sh
KDE_FULL_SESSION="true" /usr/bin/xdg-open "$@"
{% endhighlight %}

I found some helpful information on `this forum`, though my idea is different
as I want Chromium to use KDE software when opening files (`okular`,
`gwenview`, etc.)
