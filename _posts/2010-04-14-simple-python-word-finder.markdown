---
layout: post
title: Simple Python word finder
tags:
- Python
- Regexp
---

A few days ago one of my customers asked me to put together a very simple
[Python][1] script that would search through a text and find all the words that
contain both letters and numbers. As simple as it may be, I've decided to make
it a little more robust by wrapping it in a class that can be configured to
split words and check patterns for each word.

[1]: http://www.python.org/



This is just too simple to be released as a module, but I'll put the code here
in case anyone needs it. I'm placing it in the [public domain][2], by the way.

[2]: http://en.wikipedia.org/wiki/Public_domain

{% gist 4681755 %}
