---
layout: post
title: Reusable url shortener and lookup library
tags:
 - Python
 - WSGI
 - Django
summary: "<code>ao.shorturl</code> is a library for integrating short URLs to a web
application."
---

In a nutshell
-------------

``ao.shorturl`` is a library for integrating short URLs to a web application.
Its front-end configuration is not specific to any web application framework,
instead it uses various back-ends for different frameworks.

For example, ``ao.shorturl.appengine`` implements a
[Datastore](http://code.google.com/appengine/docs/python/datastore/) backend
for [Google](http://code.google.com/appengine/) / [Typhoon App
Engine](http://code.google.com/p/typhoonae/). If installed as a
[Django](http://www.djangoproject.com/) application, ``ao.shorturl`` also
provides a [template
tag](http://docs.djangoproject.com/en/dev/ref/templates/builtins/) for easily
displaying short URLs for any object that supports them.


Using the short URL library without any framework
-------------------------------------------------

To use ``ao.shorturl`` without any specifix framework, use it's ``handlers``.


Registering and getting handlers
--------------------------------

To use the library, you need to register a *handler* first, using the
``ao.shorturl.registerHandler()`` function. To get back the handler, use the
``getHandler()`` function:

{% highlight pycon %}
>>> from ao import shorturl
>>> shorturl.getHandler()
Traceback (most recent call last):
...
ImproperlyConfigured: The requested handler is not initialized.

>>> handler = shorturl.registerHandler()
>>> shorturl.getHandler() is handler
True
>>> handler
<ao.shorturl.BaseShortUrlHandler object at ...>
{% endhighlight %}

Note that if you intend to use multiple handlers, you need to give them
*names*, as the default handler is stored as a module global. However, to
utilize named handlers, you need to make the ``zope.component`` and
``zope.interface`` packages available. Each handler is stored in the local
site, meaning that if you use multiple sites, you can have different handlers
with the same name on a per-site basis. However, the unnamed handler is still
a *module* *global*, so take thet in consideration when using multiple
handlers and sites:

{% highlight pycon %}
>>> foo = shorturl.registerHandler(name='foo')
>>> shorturl.getHandler(name='foo') is shorturl.getHandler('foo') is foo
True

If you don't have the ``zope.component`` and ``zope.interface`` packages
available, you won't be able to use named handlers.

Let's pretend we don't have ``zope.component`` and ``zope.interface``:

{% highlight pycon %}
>>> import sys

>>> class _():
...     def __init__(self, modules):
...         self.modules = modules
...
...     def find_module(self, fullname, path=None):
...         if fullname in self.modules:
...             raise ImportError('Debug import failure for %s' % fullname)
...

>>> fail_loader = _(['zope.component', 'zope.interface'])
>>> sys.meta_path.append(fail_loader)

>>> for elem in ('zope.component', 'zope.interface'):
...     del sys.modules[elem]
...

>>> reload(shorturl)
<module 'ao.shorturl' from '...'>

>>> del shorturl.zc  # delete the leftover zope.component module

>>> shorturl.registerHandler(name='bar')
Traceback (most recent call last):
...
ImproperlyConfigured: To use named handlers, you need to make the ...

>>> shorturl.getHandler('bar')
Traceback (most recent call last):
...
ImproperlyConfigured: To use named handlers, you need to make the ...
{% endhighlight %}

Remove our import hook:

{% highlight pycon %}
>>> del sys.meta_path[0]
{% endhighlight %}


Configuring the handler
-----------------------

To overwrite any default handler configuration, just pass the apropriate
keyword argument to the ``ao.shorturl.registerHandler()`` function:

{% highlight pycon %}
>>> len(shorturl.registerHandler().generate_url())
6

>>> len(shorturl.registerHandler(url_length=10).generate_url())
10

>>> shorturl.registerHandler(url_length=10, url_elems='x').generate_url()
'xxxxxxxxxx'
{% endhighlight %}


Using custom handlers
---------------------

When calling ``ao.shorturl.registerHandler()`` without a ``handler`` argument,
it will not have any real functionality:

{% highlight pycon %}
>>> shorturl.registerHandler().assign_url(None)
Traceback (most recent call last):
...
NotImplementedError: You must overload `assign_url`.

>>> shorturl.registerHandler().construct_url(None)
Traceback (most recent call last):
...
NotImplementedError: You must overload `construct_url`.
{% endhighlight %}

Registering a custom handler is easy, just subclass
``ao.shorturl.BaseShortUrlHandler``:

{% highlight pycon %}
>>> class FancyShortUrlHandler(shorturl.BaseShortUrlHandler):
...     def assign_url(self, context):
...         context['shorturl'] = self.generate_url()
...     def get_context_from_cache(self, url):
...         if context['shorturl'] == url:
...             return context
...         raise LookupError
...
>>> handler = shorturl.registerHandler(
...     handler=FancyShortUrlHandler,
...     url_length=20,
... )
>>> handler
<FancyShortUrlHandler object at ...>

>>> context = {'foo': 'bar'}
>>> handler.assign_url(context)
>>> len(context['shorturl']) == 20
True
{% endhighlight %}

As for now, there's one custom handler provided for App Engine:
``ao.shorturl.appengine.AppEngineShortUrlHandler``. It uses the datastore API
to store the short url associations and the memcache API to cache the keys for
better performance.


Getting the context from the handler
------------------------------------

In your view (if you're using an MCV framework), you can call the handler's
``get_context()`` method to query the context for a given short url:

{% highlight pycon %}
>>> handler.get_context('xxx')
Traceback (most recent call last):
...
ShortUrlNotFound: Short URL could not be found: xxx

>>> handler.get_context(context['shorturl']) is context
True
{% endhighlight %}

Note that ``ao.shorturl.get_context()`` will be called at least once each time a
new short url is created, to check for duplicates:

{% highlight pycon %}
>>> fired = False
>>> def get_context(name):
...     global fired
...     if not fired:
...         print 'This URL already exists!'
...         fired = True
...         return 'Dummy context'
...     raise LookupError
...

>>> handler.get_context = get_context

>>> handler.generate_url()
This URL already exists!
'...'
{% endhighlight %}

Clean up after the tests:

{% highlight pycon %}
>>> from zope.testing import cleanup
>>> cleanup.cleanUp()
{% endhighlight %}


Using with Django and template tags
-----------------------------------

If you use Django, you can access an object's short URL from a template with
the ``shorturl`` template tag. To use it, add ``ao.shorturl`` to your
``INSTALLED_APPS``. Then in the template you can do something like this:

{% highlight django %}
{{ "{" }}% load shorturl %{{ "}" }}
<a href="{{ "{" }}% shorturl city %{{ "}" }}">{{ "{" }}{ city.name }{{ "}" }}</a>
{% endhighlight %}

Note that this will create an *absolute* url.

Test the template tag:

{% highlight pycon %}
    >>> from ao.shorturl.templatetags import shorturl

    >>> class Parser(object):
    ...     def split_contents(self):
    ...         return (None, 'xxx')
    ...

    >>> node = shorturl.shorturl(None, Parser())
    >>> node
    <ao.shorturl.templatetags.shorturl.URL object at ...>

    >>> node.render({'xxx': None})
    Traceback (most recent call last):
    ...
    NotImplementedError: You must overload `construct_url`.
{% endhighlight %}

Clean up after the tests:

{% highlight pycon %}
    >>> from zope.testing import cleanup
    >>> cleanup.cleanUp()
{% endhighlight %}


Using the short URL library with App Engine
-------------------------------------------

First set up a fake App Engine environment:

{% highlight pycon %}
>>> import minimock
>>> import sys

>>> mocks = (
...     'google',
...     'google.appengine',
...     'google.appengine.api',
...     'google.appengine.ext',
... )

>>> sys.modules.update(dict((mock, minimock.Mock(mock)) for mock in mocks))

>>> import ao.shorturl
>>> import ao.shorturl.appengine
Called google.appengine.ext.db.ReferenceProperty(...)
{% endhighlight %}

To use the App Engine backend, simply import it and pass it as the ``handler``
keyword argument to ``ao.shorturl.registerHandler()``:

{% highlight pycon %}
>>> handler = ao.shorturl.registerHandler(
...     handler=ao.shorturl.appengine.AppEngineShortUrlHandler,
... )

>>> handler
<ao.shorturl.appengine.AppEngineShortUrlHandler object at ...>
{% endhighlight %}

Cache context will use `google.appengine.api.memcache`:

{% highlight pycon %}
>>> context = minimock.Mock('context')
>>> handler.cache_context('someurl', context)
Called context.key()
Called google.appengine.api.memcache.add('someurl', 'None', 1200)
{% endhighlight %}

1200 is the default value for the cache timeout, but you can overwrite it by
passing the ``url_cache_time`` parameter to ``ao.shorturl.registerHandler()``.

Test the cache return value:

{% highlight pycon %}
>>> from google.appengine.api import memcache
>>> memcache.get.mock_returns = 'result'

>>> handler.get_context_from_cache('someurl')
Called google.appengine.api.memcache.get('someurl')
Called google.appengine.ext.db.get('result')
{% endhighlight %}

On failure it raises a ``LookupError``:

{% highlight pycon %}
>>> memcache.get.mock_returns = None

>>> handler.get_context_from_cache('someurl')
Traceback (most recent call last):
...
LookupError: Context key not found in the cache.
{% endhighlight %}

Same is true for the datastore storage backend. Let's fake the datastore to
return a context for any key:

{% highlight pycon %}
>>> class FakeMapping(object):
...     context = 'context'
...

>>> ao.shorturl.appengine.ShortUrl.get_by_key_name.mock_returns = \
...     FakeMapping()
>>> handler.get_context_from_db('someurl')
Called ShortUrl.get_by_key_name('someurl')
'context'
{% endhighlight %}

Otherwise it raises a ``LookupError``:

{% highlight pycon %}
>>> ao.shorturl.appengine.ShortUrl.get_by_key_name.mock_returns = None

>>> handler.get_context_from_db('someurl')
Traceback (most recent call last):
...
LookupError: Context not found in the datastore.
{% endhighlight %}

Try to construct a URL:

{% highlight pycon %}
>>> class FakeQuery(list):
...     def count(self):
...         return 0
...
>>> ao.shorturl.appengine.ShortUrl.mock_returns = minimock.Mock('shorturl')
>>> context = minimock.Mock('context')
>>> fakeurl = minimock.Mock('shorturl')
>>> fakekey = minimock.Mock('shorturl.key')
>>> fakekey.name.mock_returns = 'fooname'
>>> fakeurl.key.mock_returns = fakekey
>>> context.shorturl = FakeQuery((fakeurl,))
>>> handler.construct_url(context)
Called google.appengine.api.memcache.get('...')
Called ShortUrl.get_by_key_name('...')
Called ShortUrl(context=<Mock ... context>, key_name='...')
Called shorturl.put()
Called shorturl.key()
Called shorturl.key.name()
'/fooname'
{% endhighlight %}

Clean up after the tests:

{% highlight pycon %}
>>> from zope.testing import cleanup
>>> cleanup.cleanUp()
{% endhighlight %}


TODO
----

* Add backends for [Django
  Models](http://docs.djangoproject.com/en/dev/ref/models/instances/) and
  [SQLAlchemy](http://www.sqlalchemy.org/)/[Elixir](http://elixir.ematia.de/trac/wiki)
