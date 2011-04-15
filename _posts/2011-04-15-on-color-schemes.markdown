---
layout: post
title: On color shcemes
tags:
 - Linux
 - Vim
summary: "Comparing various color schemes for terminal emulators."
---

I've recently heard about the [solarized color
theme](http://ethanschoonover.com/solarized). My first impression was good, so
I thought I try it on as my `Konsole` color scheme + the `vim` syntax
highlighting. As good as it may look, it is actually not very pleasant to stare
at it for longer periods of time (it doesn't have enough contrast imho).

Here's a comparison of my original color profile (left) and the solarized
profile with dark background:

<div class="img center">
  <a href="/media/images/random/contrast-comparison.png"><img src="/media/images/random/contrast-comparison.png" alt="Vim with different color profiles"/></a>
  <br/>
  <em><code>vim</code> with highlighted python code</em>
</div>

The solarized color scheme for `KDE`'s `Konsole` terminal emulator can be found
on GitHub, [in this
repo](https://github.com/phiggins/solarized/blob/b3c2170ec01fb7d543c5cf8322a4207ff6be117a/konsole-solarized/Solarized%20Dark.colorscheme).
My personal color scheme (called *Linux for Byobu*) can also be found [on
GitHub](https://github.com/aatiis/skel/blob/master/home/aatiis/.kde4/share/apps/konsole/Linux%20for%20Byobu.colorscheme),
or below. It is a modification of the *Linux* color palette with dark gray
colors for programs like `byobu` and `eix` that use it.

{% highlight ini %}
[Background]
Color=0,0,0
Transparency=false

[BackgroundIntense]
Color=104,104,104
Transparency=false

[Color0]
Color=48,48,48
Transparency=false

[Color0Intense]
Color=104,104,104
Transparency=false

[Color1]
Color=178,24,24
Transparency=false

[Color1Intense]
Color=255,84,84
Transparency=false

[Color2]
Color=24,178,24
Transparency=false

[Color2Intense]
Color=84,255,84
Transparency=false

[Color3]
Color=178,104,24
Transparency=false

[Color3Intense]
Color=255,255,84
Transparency=false

[Color4]
Color=24,24,178
Transparency=false

[Color4Intense]
Color=84,84,255
Transparency=false

[Color5]
Color=178,24,178
Transparency=false

[Color5Intense]
Color=255,84,255
Transparency=false

[Color6]
Color=24,178,178
Transparency=false

[Color6Intense]
Color=84,255,255
Transparency=false

[Color7]
Color=178,178,178
Transparency=false

[Color7Intense]
Color=255,255,255
Transparency=false

[Foreground]
Color=178,178,178
Transparency=false

[ForegroundIntense]
Color=255,255,255
Transparency=false

[General]
Description=Linux for Byobu
Opacity=1
{% endhighlight %}
