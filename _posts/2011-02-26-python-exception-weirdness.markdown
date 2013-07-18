---
layout: post
title: Python exception weirdness
tags:
- programming
---

This may have been obvious to others, but I have just found out that in Python,
when Exceptions get `raise`d, they are converted to strings. That is:

{% highlight pycon %}
>>> class C(object):
...     __str__ = lambda s: '<C: str>'
...     __repr__ = lambda s: '<C: repr>'

>>> c = C()
>>> exc = Exception(c)

>>> exc
Exception(<C: repr>,)

>>> repr(exc)
'Exception(<C: repr>,)'

>>> str(exc)
'<C: str>'
{% endhighlight %}

And now comes the interesting part:

{% highlight pycon %}
>>> raise exc:
Traceback (most recent call last):
...
Exception: <C: str>
{% endhighlight %}

The traceback displays the Exception class's name (`__class__.__name__`), and
the parameters passed when instantiating the exception, **converted to string**
(`str()`)! The same thing happens in both Python 2.X and 3.X.

The thing is, I'd expect `repr()` instead of `str()`. But good to know how it
works. If I want to see consistent output in both `pdb` and tracebacks, I just
need to use classes where `str(obj) == repr(obj)`, that is, `obj.__str__ is
obj.__repr__`.
