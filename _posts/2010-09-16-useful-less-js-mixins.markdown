---
layout: post
title: Useful less.js mixins
tags:
 - less.js
 - web design
summary: Just a few handy less.js mixins.
---

One of the coolest things in <a
href="http://github.com/cloudhead/less.js">less.js</a> are mixins. They are
like functions. You can use basic arithmetic or whatsoever. Une thing I like to
use it for are `url(...)` directives. Say I keep my images in `/media/images/`,
here is a way of using a mixin for `background-image`:

{% highlight css %}
._bg(@filename) {
    background-image: e(%('url(/media/images/%s)', @filename));
}
.foo {
    ._bg(bunnies.png);
}
{% endhighlight %}

The resulting css will be:

{% highlight css %}
.foo {
    background-image: url(/media/images/bunnies.png);
}
{% endhighlight %}

Another common use case is to make things like opacity work in older browsers.
Example:

{% highlight css %}
._opacity(@value) {
    -khtml-opacity: @value / 100;  // some pre-2004 browsers
    -moz-opacity: @value / 100;    // really old FF versions
    -ms-filter: %('alpha(opacity=%s)', @value); // some IE versions
    filter: e(%("alpha(opacity=%s)", @value));  // most other IE versions
    opacity: @value / 100;         // CSS standard
}
{% endhighlight %}

You can build a library of mixins for a specific website and just `@import`
them when needed.
