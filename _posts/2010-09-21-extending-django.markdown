---
layout: post
title: Extending Django
tags:
 - Django
 - Python
 - programming
summary: Tips on how to replace some Django components.
---

When I put together my [Django](http://www.djangoproject.com/) app, initially
it looks something like this:

<div class="img center">
  <img src="/media/images/random/django-depgraph.png" alt="Django App Components"/>
</div>

Why would you want to do this? Well, there are several reasons:

* I like [Jinja2](http://jinja.pocoo.org/2/) more than Django's templating
  language. [Coffin](http://github.com/dcramer/coffin) is a Jinja2 adapter for
  Django.
* [Deform](http://docs.repoze.org/deform/) is the best form library out there.
  Hats down to the [Repaze](http://repoze.org/) guys.
* [Beaker](http://beaker.groovie.org/) is 100% [WSGI](http://wsgi.org/wsgi/)
  compliant. As opposed to Django. Also, it runs on App Engine.
* [twod.wsgi](http://packages.python.org/twod.wsgi/) makes it easy to use
  Django just like any other framework.
* [WobOb](http://pythonpaste.org/webob/) is used by all other web frameworks.
  Well tested and WSGI compliant.


Messaging & tasks
-----------------

[RabbitMQ](http://www.rabbitmq.com/) and [Celery](http://celeryproject.org/)
are suitable choices. Easy to set up, easy to use. On Gentoo, starting from
version 2.0 RabbitMQ runs without root privileges, so I upgrading is probably a
good idea.


Database and geolocation
------------------------

[PostgreSQL](http://www.postgresql.org/) is the usual, well-tested database for
most Python apps that use relational databases. Version 9.0 is out, but as of
writing this post, version 8.4 is the last one that plays well with
[PostGIS](http://postgis.refractions.net/). Once we set them up along with
[GDAL](http://www.gdal.org/), we can run some crazy spatial queries. The
[GeoDjango](http://geodjango.org/) documentation is a good place to start.


Performance and deployment
--------------------------

When deploying a Django app, I find it helpful to put it (that is,
[Apache](http://www.apache.org/) and
[mod_wsgi](http://code.google.com/p/modwsgi/)) behind an HTTP accelerator,
preferably [Varnish](http://www.varnish-cache.org/), along with an
[nginx](http://nginx.org/) instance for serving static files.

Setting up all these services can be tricky sometimes, so it might be a good
idea to automate deployment using [Buildout](http://www.buildout.org/) or some
similar tool.


The client side
---------------

This really depends on the nature of the app, but these rules apply for most of
my projects:

* Use [HTML5](http://en.wikipedia.org/wiki/HTML5). Here's some [useful
  boilerplate](http://simon.html5.org/presentations/html5-geekmeet.en).
* Never write CSS. Use [less.js](http://github.com/cloudhead/less.js).
* Use [jQuery](http://jquery.com/) if there's too much JavaScript. Probably
  also [CoffeeScript](http://jashkenas.github.com/coffee-script/) when it
  reaches version 1.0.


Additional hacks
----------------

I also use some neat tricks like class-based views, declarative URL
configurations, and other things that would probably scare away most Django
people. I'm not going to post that here, as I plan to release it soon, so that
will have its own post. Stay tuned.
