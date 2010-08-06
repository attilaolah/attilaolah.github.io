---
layout: post
title: Summary of this spring's dev sprint in Berlin
tags:
 - Germany
 - Berlin
 - web programming
summary: A short summary of the last two weeks spent in Berlin, Germany.
---

Summary
-------

I've spent the last two weeks in [Berlin](http://en.wikipedia.org/wiki/Berlin),
[Germany](http://en.wikipedia.org/wiki/Germany), working on two projects: an
ecommerce web application and a [Facebook](http://www.facebook.com/)
application. The former is actually an ongoing project, involving many
interesting technologies, such as working with the [eBay](http://www.ebay.com/)
API, extending the [Django](http://www.djangoproject.com/) admin, geocoding
(and reverse geocoding), CMS, domain and subdomain management, etc. The other
project is a smaller one that also emphatizes on geological location of the
users.

As a result of the sprint, in a few weeks, [Sproud Ventures
UG](http://www.sproud.de/) (the company that sponsored the event) will
open-source a python package for doing geological lookups and other useful
things in web applications. The package contains a pure
[WSGI](http://wsgi.org/) middleware for doing IP-based, keyword-based and
coordinate-based lookups. Other handy features include Django template tags and
a template context processor. I'll write about it in details when it gets
released (= when I find some time to improve test coverage and review the
documentation.)


Lessons learned
---------------

During these two weaks I test-drived a few toolkits and learned some new
techniques. The most interesting ones are CSS and JavaScript tricks:

* [LESS](http://lesscss.org/), a very neat tool for writing structured,
  object-like CSS. Lets you define your template colors in a separate library,
  import it and use in other styles, use variables, basic arithmetic, and then
  compiles everything into a valid, syntax-error-free and nicely-formatted CSS
  file. I'll definitely use it in my future projects.
* The JavaSctipt Revealing Module Pattern can too be very handy. I've written
  lots and lots of hacky JavaScript snippets in the past, so now I'm trying to
  force myself to write more organized code for the client side too...
* Better write simple templates than fancy-shiny ones that will scare away all
  the IE users :)
* ALWAYS use ``twod.wsgi`` if working with Django. Makes life much easier.
* Use even more third party tools. There's so many great libraryes out there.
  There are a lot of crappy ones too, but some of them can be improved. +1 for
  publicly forking projects on [GitHub](http://github.com/) and
  [BitBucket](http://bitbucket.com/).
* Use [YAML](http://yaml.org/). Even more.


Next stop
---------

[Delft](http://en.wikipedia.org/wiki/Delft), [The
Netherlands](http://en.wikipedia.org/wiki/Netherlands). Next week. New project,
new experiences, new friends.  Will be lots of fun too!
