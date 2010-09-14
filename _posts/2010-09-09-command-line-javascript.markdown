---
layout: post
title: Command line JavaScript
tags:
 - JavaScript
 - programming
summary: How to install various JavaScript interpreters in Gentoo.
---

Sometimes I need to run some
[JavaScript](http://en.wikipedia.org/wiki/JavaScript) from the command line.
Mostly [JSLint](http://www.jslint.com/) and
[less.js](http://github.com/cloudhead/less.js). I used to do it with
[SpiderMonkey](http://www.mozilla.org/js/spidermonkey/), but less.js seems to
require [node.js](http://nodejs.org/) too, so recently I installed that and
[Rhino](http://www.mozilla.org/rhino/). Here are some instructions on how to do
it in [Gentoo](http://www.gentoo.org/).


SpiderMonkey
------------

Not to worry, it is in [Portage](http://www.gentoo-portage.com/).

{% highlight console %}
$ eix spidermonkey
[D] dev-lang/spidermonkey
     Available versions:  1.7.0 {threadsafe}
     Installed versions:  1.7.0-r2(22:29:31 08/15/10)(unicode -threadsafe)
     Homepage:            http://www.mozilla.org/js/spidermonkey/
     Description:         Stand-alone JavaScript C library
{% endhighlight %}

Installing it is a simple `emerge spidermonkey`. As we can see, it installs the
`js` executable:

{% highlight console %}
$ equery f spidermonkey | grep bin 
/usr/bin
/usr/bin/js
/usr/bin/jscpucfg

$ js
js> 2+2
4
{% endhighlight %}

Rhino
-----

This one is in Portage too. It is slotted, so you can install 1.5 and 1.6 side
by side:

{% highlight console %}
$ eix rhino
[D] dev-java/rhino
     Available versions:
        (1.5)   1.5.5-r4 (~)1.5.5-r5
        (1.6)   1.6.5
        {doc elibc_FreeBSD examples source}
     Installed versions:  1.5.5-r5(1.5)(12:11:26 09/09/10)(-doc -elibc_FreeBSD -source) \
        1.7.2-r2(1.6)(12:10:58 09/09/10)(-doc -elibc_FreeBSD -examples -source)
     Homepage:            http://www.mozilla.org/rhino/
     Description:         An open-source implementation of JavaScript written in Java.
{% endhighlight %}

I have both 1.5 and 1.6 installed:

{% highlight console %}
$ equery f rhino
[ Searching for packages matching rhino... ]
* Contents of dev-java/rhino-1.5.5-r5:
/usr
/usr/bin
/usr/bin/jsscript-1.5
/usr/share
/usr/share/rhino-1.5
/usr/share/rhino-1.5/lib
/usr/share/rhino-1.5/lib/js.jar
/usr/share/rhino-1.5/package.env
* Contents of dev-java/rhino-1.7.2-r2:
/usr
/usr/bin
/usr/bin/jsscript-1.6
/usr/share
/usr/share/rhino-1.6
/usr/share/rhino-1.6/lib
/usr/share/rhino-1.6/lib/js.jar
/usr/share/rhino-1.6/package.env

$ /usr/bin/jsscript-1.6 
Rhino 1.7 release 2 2010 09 09
js> 2+2
4
{% endhighlight %}


node.js
-------

It is currently not in Portage, but adding [monoid's
overlay](http://github.com/monoid/gentoo-nodejs) from
[GitHub](http://github.com/) will probably make your life somewhat easier.

{% highlight console %}
$ layman -f -o http://github.com/downloads/monoid/gentoo-nodejs/nodejs-layman.xml -a nodejs
$ emerge nodejs

$ equery f nodejs | grep bin
/usr/bin
/usr/bin/node
/usr/bin/node-repl
/usr/bin/node-waf

$ node
node> (function (n) { console.log(n*n); }(10000));
100000000
{% endhighlight %}

Now we can run less.js from the command line too.


A note on JSLint
----------------

There are multiple command line wrappers for JSLint, however, I needed to roll
my omn to support custom settings ano custom output formatting for use in
automaten code checking in [Buildbot](http://buildbot.net/trac) instances. It
is convenient sometimes to have a buildbot automatically check your JS code
nightly, or after each commit.
