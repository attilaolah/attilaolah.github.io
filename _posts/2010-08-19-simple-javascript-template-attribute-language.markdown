---
layout: post
title: Simple JavaScript template attribute language
tags:
 - JavaScript
 - programming
summary: "A very simple implementation of a template attribute languate in
JavaScript."
---

This is a super-simple version of a custom
[TAL](http://en.wikipedia.org/wiki/Template_Attribute_Language) implementation,
designed for JavaScript client-side templating.

Example:
--------

The following [HTML](http://en.wikipedia.org/wiki/Html) page is an example of
how to use the TAL expressions with the "``jt``"
[namespace](http://en.wikipedia.org/wiki/XML_namespace).

You can check out this example in action by [clicking
here](/downloads/javascript/jt-test.html).

    <!DOCTYPE html>
    <html xmlns:jt="http://www.example.com/jt">
      <head>
        <meta charset="utf-8" />
        <title>HTML Script Insertion Test</title>
        <script src="jt-src.js"></script>
      </head>
      <body>
        <h1 jt:content="'Foo, bar: ' + 42 + '!'"></h1>
        <p jt:css="{ color: 'red' }" jt:ignore="all">
          <a jt:content="'Foo!'">
            This is ignored.
          </a>
        </p>
        <p jt:css="{ color: 'red' }" jt:ignore="contents">
          <a jt:content="'Foo!'">
            This is ignored too, but "jt:" attributes are not ignored on the "p" node.
          </a>
        </p>
        <ul>
          <li jt:repeat="for (var counter=1; counter<5; counter++)">
            <a jt:attr="{ href: '#?counter=' + counter }"
               jt:content="'Element number ' + counter"></a>
          </li>
        </ul>
      </body>
    </html>

The script is loaded from the "``jt-src.js``" file, and as soon as the
[DOM](http://en.wikipedia.org/wiki/Document_Object_Model) is ready, it will
render the document to look like this:

    <!DOCTYPE html>
    <html xmlns:jt="http://www.example.com/jt">
      <head>
        <meta charset="utf-8" />
        <title>HTML Script Insertion Test</title>
        <script src="jt-src.js"></script>
      </head>
      <body>
        <h1>Foo, bar: 42!</h1>
        <p>
          <a>
            This is ignored.
          </a>
        </p>
        <p style="color: red;">
          <a>
            This is ignored too, but "jt:" attributes are not ignored on the "p" node.
          </a>
        </p>
        <ul>
          <li>
            <a href="#?counter=1">Element number 1</a>
          </li>
          <li>
            <a href="#?counter=2">Element number 2</a>
          </li>
          <li>
            <a href="#?counter=3">Element number 3</a>
          </li>
          <li>
            <a href="#?counter=4">Element number 4</a>
          </li>
        </ul>
      </body>
    </html>


Future ideas
------------

Although this script is just an experiment, it might be interesting to add
other "``jt:``" directives, like ``jt:load`` for dynamically loading and
inserting external HTML.


The source code
---------------

The source code wwights ``~6.9K``, or ``~1.6K`` minified (``~730 bytes`` when
minified & gzipped). The source can be downloaded from
[here](/downloads/javascript/jt-src.js).


License
-------

This source code is placed into the [Public
Domain](http://en.wikipedia.org/wiki/Public_domain).
