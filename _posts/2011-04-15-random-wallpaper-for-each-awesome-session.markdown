---
layout: post
title: Random wallpaper for each awesome session
tags:
 - Awesome
 - Bash
 - Linux
summary: "This is a tiny script that will change the wallpaper on each login."
---

First, get some nice wallpapers. `KDE` has a nice set of free wallpapers.
Install them (`sudo emerge kde{,artwork}-wallpapers
kdeartwork-weatherwallpapers`), and you'll get some nice wallpapers in
`/usr/share/wallpapers`.

Then, create a bash script, something like this:

{% highlight bash %}
#!/bin/bash
# Go to pics directory
cd $HOME/pics
# Remove the old wallpaper
rm wallpaper.jpg
# Link a random new one
ln -s `set -- /usr/share/wallpapers/*/contents/images/1920x1200.jpg && \
    length=$# && \
    random_num=$(( $RANDOM % ($length + 1) )) && \
    echo ${!random_num}` wallpaper.jpg
{% endhighlight %}

The above snippet will pick a random wallpaper of size 1920x1200, and link it
to `~/pics/wallpaper.jpg`. Then, just set your default wallpaper to,
`~/pics/wallpaper.jpg`, and have this script run each time you log in to
awesome, e.g:

{% highlight lua %}
awful.util.spawn("/path/to/change-wallpaper.sh")
{% endhighlight %}

Remember to `chmod +x` your bash script. You can map the script to a key
combination in awesome and use that to change the wallpaper whenever you feel
like, or even create a `cron` job to do that for you.

References:

* [Ubuntu Forums](http://ubuntuforums.org/showthread.php?t=501904) has a post
  on how to select a random file from `bash`
