---
layout: post
title: Coding with versions in mind
tags:
 - Python
 - programming
summary: Thoughts on writing code that is easy to upgrade.
---

The good thing with web apps is that you don't have to ship updates, worry
about versioning, or upload & maintain separate versions of your app. You
change something and everyone gets the new version.

Except if some users have the old cookies, or the old JS/CSS in their browser
cache. Or in [``localStorage``](http://diveintohtml5.org/storage.html). Or in
the HTML5 [Application Cache](http://diveintohtml5.org/offline.html) (think
mobile apps). Or maybe some proxy is doing too much caching, without honoring
HTTP headers (think mobile carriers trying to save some bucks - this has
already bit me once).

Then there might be a ton of data already persisted that you need to update. It
might take a lot of time. You might not want to lock out the users while you
run your [MapReduce](http://en.wikipedia.org/wiki/MapReduce).

What you'll end up having is some kind of versions.


The simple approach
-------------------

Thankfully at [Vemble](http://www.vemble.com/) we run our app on [Google App
Engine](http://code.google.com/appengine/). They provide easy versioning
support - so instead of overwriting the same version every time, when updating
the production environment, we upload a new version (that first gets its own
URL), run basic [some tests](http://en.wikipedia.org/wiki/Smoke_testing) and
then we switch versions (mark the newly uploaded one as the default, main
version).

To make sure clients using the new version are not re-downloading the old JS
and CSS from some proxy or cache still holding on to the previous version, we
provide different JS and CSS filenames for each version. We simply use ``git
rev-parse --short HEAD``. That will give us things like ``7e62da4.js`` and
``7e62da4.css``. This version string is provide to the application loader via a
very fast URL (that does not require a full server startup), that is never
cached. To make sure it is never cached, the client appends a random query
parameter - this turned out to be a good practice with some 3G networks, as
they just try to cache everything.


Version numbers and branching
-----------------------------

Using ``git rev-parse --short HEAD`` is very handy, but the downside is that it
is not sortable. When our testers see the version of the app, they can't easily
remember if it is different. When I see more versions in the App Engine admin
interface, I don't always know which one is the latest.

To get some kind of version numbers, I came up with the idea of counting
``git`` merges to the ``production`` branch. We keep a separate branch for code
that is supposed to be production-safe, and each node of that branch gets
uploaded to App Engine as a separate application version.

To get the number of merges, I simply do a ``git log | grep "^ *Merge branch
'master' into production$" | wc -l``. To mark those changes as bugfix releases,
we use manually set major version numbers, so we end up with something like
``1.4.182``, where ``182`` is the number of production branch merges, and
``1.4`` is set manually.

Of course, we have nice [Buildout](http://www.buildout.org/) scripts to
automate all the work for.


Data evolution
--------------

The manually set part can be used to check if persisted data entities are
compatible with the current version. If the current major version is ``1.4``,
and an entity is marked as version ``1.3``, we query an adapter that will
convert from the old version to the new one. Adapters are registered to entity
interfaces using the [Zope Compontent
Architecture](http://www.muthukadan.net/docs/zca.html), but any other lookup
mechanism could be used. I just love the way the ZCA works so that's why I use
it in Vemble.

In conclusion, versioning may or may not be the best way to deal with these
kinds of issues, but I've found that it works perfectly in our case.
