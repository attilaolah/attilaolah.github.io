---
layout: post
title: Berlin, Delft, and more
tags:
- travel
---

I've spent the last two weeks in [Berlin][1], [Germany][2], working on two
projects: an ecommerce web application and a Facebook app.

[1]: https://en.wikipedia.org/wiki/Berlin
[2]: https://en.wikipedia.org/wiki/Germany


The former is actually an ongoing project, involving many interesting
technologies, such as working with the [eBay][3] API, extending the [Django][4]
admin interface, geocoding (and reverse geocoding), CMS, domain and subdomain
management, etc. The other project is a small app that works based on the
users' locaiton.

[3]: https://www.ebay.com/
[4]: https://www.djangoproject.com/

As a result of these two weeks, [Sproud Ventures UG][5] (the company that
sponsored the event) will open-source a python package for doing geological
lookups and other useful things in web applications. The package contains a raw
[WSGI][6] middleware for doing IP-based, keyword-based and coordinate-based
lookups. Other handy features include Django template tags and a template
context processor. I'll write about it in details when it gets released (that
is, when I find some time to improve test coverage and review the
documentation.)

[5]: https://www.sproud.de/
[6]: https://wsgi.org/


During my stay I tested a few toolkits and learned some new techniques. Here
are the highlightn, including some CSS and JavaScript tricks:

* [LESS][1], a very neat tool for writing structured, object-like CSS. Lets you
  define your template colours in a separate library, import it and use in
  other styles, use variables, basic arithmetic, and then compiles everything
  into a valid, nicely-formatted CSS file. I'll definitely use it in my future
  projects.
* The JavaSctipt Revealing Module Pattern can too be very handy. I've written
  lots and lots of hacky JavaScript snippets in the past, so now I'm trying to
  force myself to write more organized code.
* *Always* use `twod.wsgi` when working with Django. Makes life much easier.
* Use even more third party tools. There's so many great libraryes out there.
  There are a lot of crappy ones too, but some of them can be improved. +1 for
  publicly forking projects on [GitHub][8] and [BitBucket][9].
* Use [YAML][10], even more.

[7]: https://lesscss.org/
[8]: https://github.com/
[9]: https://bitbucket.com/
[10]: https://yaml.org/

Next stop, [Delft][11], [The Netherlands][12]. New week, [new project][13], new
experiences and friends.

[11]: https://en.wikipedia.org/wiki/Delft
[12]: https://en.wikipedia.org/wiki/Netherlands
[13]: https://www.vemble.com/

{:.center}
[![Hermina and I](/images/2010/antwerp-zoo-small.jpg)
In the Antwerp zoo.
][14]

[14]: /images/2010/antwerp-zoo.jpg
