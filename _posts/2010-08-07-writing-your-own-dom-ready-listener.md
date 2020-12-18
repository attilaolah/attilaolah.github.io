---
layout: post
title: Writing your own DOM ready listener
tags:
- programming
source: https://gist.github.com/attilaolah/6025568
---

Today I asked [a question][1] on StackOverflow on how to attach a function to
the browser's [DOM][2] ready event, in a cross-browser way, but *without*
exporting any globals (keeping everything in an anonymous function's closure)
and without including any external file. As a result, with some help of [a
friendly StackOverflow user][3], I put together a code snippet that:

[1]: https://stackoverflow.com/q/3430455/252239
[2]: https://en.wikipedia.org/wiki/Document_Object_Model
[3]: https://stackoverflow.com/users/113716/patrick-dw

* takes a single function as argument,
* attaches that function to the DOM ready event in all browsers supported by
  [jQuery][4],
* is [idempotent][5] (will never fire the given function twice),
* does not export any globals,
* compiles down to less than 590 bytes (less than 300 bytes gzipped),
* is based on the [jQuery][4] source code (I take no credit for it).

[4]: https://jquery.com/
[5]: https://en.wikipedia.org/wiki/Idempotence

{% gist 6025568 domready.js %}

I take no credit for writing this script. If you want to use it, please include
jQuery's license comment.

## Update

Here is a CoffeeScript version:

{% gist 6025568 domready.coffee %}
