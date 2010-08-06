---
layout: post
title: "Summary of this spring's dev sprint in Berlin"
tags: ["Germany", "Berlin", "web programming"]
---

I've spent the last two weeks in Berlin_, Germany_, working on two projects: an
ecommerce web application and a Facebook_ application. The former is actually
an ongoing project, involving many interesting technologies, such as working
with the eBay_ API, extending the Django_ admin, geocoding (and reverse
geocoding), CMS, domain and subdomain management, etc. The other project is a
smaller one that also emphatizes on geological location of the users.

.. _Berlin: http://en.wikipedia.org/wiki/Berlin
.. _Germany: http://en.wikipedia.org/wiki/Germany
.. _Facebook: http://www.facebook.com/
.. _eBay: http://www.ebay.com/
.. _Django: http://www.djangoproject.com/

As a result of the sprint, in a few weeks, `Sproud Ventures UG`_ (the company
that sponsored the event) will open-source a python package for doing
geological lookups and other useful things in web applications. The package
contains a pure WSGI_ middleware for doing IP-based, keyword-based and
coordinate-based lookups. Other handy features include Django template tags and
a template context processor. I'll write about it in details when it gets
released (= when I find some time to improve test coverage and review the
documentation.)

.. _`Sproud Ventures UG`: http://www.sproud.de/
.. _WSGI: http://wsgi.org/


Lessons learned
---------------

During these two weaks I test-drived a few toolkits and learned some new
techniques. The most interesting ones are CSS and JavaScript tricks:

* LESS_, a very neat tool for writing structured, object-like CSS. Lets you
  define your template colors in a separate library, import it and use in other
  styles, use variables, basic arithmetic, and then compiles everything into a
  valid, syntax-error-free and nicely-formatted CSS file. I'll definitely use
  it in my future projects.
* The JavaSctipt Revealing Module Pattern can too be very handy. I've written
  lots and lots of hacky JavaScript snippets in the past, so now I'm trying to
  force myself to write more organized code for the client side too...
* Better write simple templates than fancy-shiny ones that will scare away all
  the IE users :)
* ALWAYS use ``twod.wsgi`` if working with Django. Makes life much easier.
* Use even more third party tools. There's so many great libraryes out there.
  There are a lot of crappy ones too, but some of them can be improved. +1 for
  publicly forking projects on GitHub_ and BitBucket_.
* Use YAML_. Even more.

.. _LESS: http://lesscss.org/
.. _GitHub: http://github.com/
.. _BitBucket: http://bitbucket.com/
.. _YAML: http://yaml.org


Next stop
---------

Delft_, The Netherlands_. Next week. New project, new experiences, new friends.
Will be lots of fun too!

.. _Delft: http://en.wikipedia.org/wiki/Delft
.. _Netherlands: http://en.wikipedia.org/wiki/Netherlands
