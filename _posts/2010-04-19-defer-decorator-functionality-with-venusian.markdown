---
layout: post
title: Defer decorator functionality with Venusian
tags:
 - Python
 - PyPI
summary: Venusian is "a library for deferring decorator actions".
---

The tagline on the [PyPI page](http://pypi.python.org/pypi/venusian) says, ``a
library for deferring decorator actions``. Although it's intended for framework
authors, I think it's pretty much usable for your every-day code snippets, if
you tend to use
[decorators](http://wiki.python.org/moin/PythonDecoratorLibrary) a lot.


A simple use case
-----------------

Some [Django](http://www.djangoproject.com/) folks like to write their own
*templatizer* decorators. It might look something like this:

    import json


    def jsonify(wrapped):
        def json_wrapper(request):
            result = wrapped(request)
            dumped = json.dumps(result)
            return dumped
        return json_wrapper

Of course, the drawback here is once you have *templatized* your view using the
decorator, you cannot use it any longer like an ordinary view (i.e. call from
other views). As a workaround, I have been using a template decorator that
looks something like this:

    from decorator import decorator

    from functools import partial

    from django.http import HttpResponse
    from django.shortcuts import render_to_response
    from django.template import RequestContext


    def decorator_factory(decfac):
        return partial(lambda df, param: decorator(partial(df, param)), decfac)


    @decorator_factory
    def template(template, f, request, *args, **kw):
        """Decorator to load the view's template."""

        def new(f, *args, **kw):
            ret = f(*args, **kw) or {}
            if isinstance(ret, HttpResponse):
                return ret
            return render_to_response(template, ret,
                context_instance=RequestContext(request))

        return new(f, request, *args, **kw)

This way I can use the decorated views as I would use any other function.


Using Venusian
--------------

With Venusina, this becomes even simpler (and more efficient):

    import venusian


    def jsonify(wrapped):
        def callback(scanner, name, obj):
            print 'jsonified'
        venusian.attach(wrapped, callback)
        return wrapped

As the [documentation](http://docs.repoze.org/venusian/) says:

    As you can see, this decorator actually calls into venusian, but then simply
    returns the wrapped object. Effectively this means that this decorator is
    "passive" when the module is imported.

To learn more about this great library, take a look at the
[documentation](http://docs.repoze.org/venusian/).
