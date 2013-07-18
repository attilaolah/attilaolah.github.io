---
layout: post
title: Two simple widgets for awesome
tags:
- programming
source: https://gist.github.com/attilaolah/6025651
---

The two widgets next to the system tray:

{:.center}
![Awesome WM widgets][1]
Awesome WM widgets

[1]: /images/2010/awesome-widgets.png

## Battery monitor

This one is pretty simple, based on [this wiki page][2]: (requires
`acpitools`):

[2]: http://awesome.naquadah.org/wiki/Acpitools-based_battery_widget

{% gist 6025651 batterymonitor.lua %}

The nice thing about it is that it changes its color dynamically (and
linearly). `0%` battery = `#FF0000`, `100%` = `#00FF00`.

## CPU temperature monitor

Based on the same code, looks very similar to the battery widget:

{% gist 6025651 cpumonitor.lua %}

## Update

I've updated the temperature monitor to work without `acpitool`.  Now instead
of relying on legacy files in `/proc/`, it uses the new `ACPI` interface
provided by `/sys/` files.

I have also replaced the battery monitor with the `gnome-power-manager` applet,
as it is more powerful and consumes less on-screan real estate. Start it from
your `rc.lua` like this:

{% highlight lua %}
awful.util.spawn("gnome-power-manager")
{% endhighlight %}
