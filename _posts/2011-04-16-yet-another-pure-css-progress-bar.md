---
layout: post
title: Yet another pure CSS progress bar
summary: "Here's one to all you CSS freaks out there."
---

Inspired by [Ivan Vanderbyl's implementation][1], I also put together a
progress bar, in pure CSS. <del>The transition of the blue bar is also done
with CSS, only the text is being updated with JavaScript.</del> The animation
is done using JavaScript to make sure it synchronizes nicely with the
percentage text. It is also possible to animate it with pure CSS though.

[1]: https://ivan.dev

{:.center}
<iframe src="/demos/pure-css-progress-bar.html" style="width:100%; height:120px;">&nbsp;</iframe>

The full code is in one simple HTML file, available in the [public domain][2].
Demo code [can be found here][3].

[2]: https://en.wikipedia.org/wiki/Public_domain
[3]: /demos/pure-css-progress-bar.html

Tested with:

* Chromium/Chrome 12
* Firefox 4
* Opera 11
* Android Browser (Froyo, with minor style glitches)
