---
layout: post
title: When can we drop Python 2.5
tags:
 - Python
 - programming
summary: Just wondering for how long will I have to support Python 2.5.
---

<div class="center right">
  <a href="http://pypy.org/"><img src="/menda/images/random/pypy-logo.png" alt="PyPy"/></a>
</div>

There are mainly two reasons I need Python libraries to be compatible with 2.5.
First there's [PyPy](http://pypy.org/). The current release (version 1.4.1) is
only compatible with 2.5. PyPy trunk however is now compatible with 2.7, so
this should not be a problem in the near future.

<div class="center left">
  <a href="http://code.google.com/appengine/"><img src="/menda/images/random/gae-logo.png" alt="PyPy"/></a>
</div>

The other obstacle to upgrade was (and still is, at the time of writing)
[Google App Engine](http://code.google.com/appengine/). For a long time, they
only supported Python 2.5. Recently however, Python 2.7 support has been [added
to the roadmap](http://code.google.com/appengine/docs/roadmap.html). At least
there's light at the end of the tunnel.

It was because of the lack of Python 2.7 support that I wrote an ad-hoc
solution, a Python package named `seven` (available on
[pypi](http://pypi.python.org/pypi/seven/0.5) and
[GitHub](https://github.com/aatiis/seven)), that adds a [new-style import
hook](http://www.python.org/dev/peps/pep-0302/) that pre-processes Python code
before evaluation, and converts it to Python 2.5 syntax. Most notably, it adds
missing `from __future__` imports and converts class decorators to compatible
expressions. So a code snippet like this:

{% highlight python %}
@decorated
class C(object):
    """A decorated class."""
{% endhighlight %}

would become something like this:

{% highlight python %}
class C(object):
    """A decorated class."""
C = decorated(C)
{% endhighlight %}

`seven` is in very early stages of development, and I was planning to put more
effort in it, but now I really hope that there's goingt to be need for that, as
Python 2.5 will slowle be replaced by newer versions at hosting services and
Linux distros.

And with Python 2.7 becoming more and more popular (and stable, of course),
hopefully porting code to Python 3 will also become easier by the day. Or maybe
I'm too optimistic about that. But at least I can see progress, and progress is
something I really like. Each time, one step closer to the goal.
