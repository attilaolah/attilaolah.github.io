---
layout: post
title: Yet another pure CSS progress bar
tags:
 - CSS
 - web design
summary: "Here's one to all you CSS freaks out there."
---

Inspired by [Ivan Vanderbyl's
implementation](http://skunkworks.ivanvanderbyl.com/), I also put together a
progress bar, in pure CSS. <strike>The transition of the blue bar is also done with
CSS, only the text is being updated with JavaScript.</strike> The animation is
done using JavaScript to make sure it synchronizes nicely with the percentage
text. It is also possible to animate it with pure CSS though.

<div class="img center">
  <iframe src="/demos/pure-css-progress-bar" style="width:400px; height:120px;">&nbsp;</iframe>
  <br/>
  <em>demo page <a href="/demos/pure-css-progress-bar">available here</a></em>
</div>

The full code is in one simple HTML file, which I put into the [public
domain](http://en.wikipedia.org/wiki/Public_domain). The demo is [available
here](/demos/pure-css-progress-bar).

Tested with:
* Chromium/Chrome 12
* Firefox 4
* Opera 11
* Android Browser (Froyo, with minor style glitches)
