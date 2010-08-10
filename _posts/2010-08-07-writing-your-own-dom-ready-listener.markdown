---
layout: post
title: Writing your own DOM ready listener
tags:
 - JavaScript
 - jQuery
 - programming
summary: A cross-browser JS snippet that fires on the DOM ready event.
---

Today I asked [a
question](http://stackoverflow.com/questions/3430455/document-ready-source) on
[StackOverflow](http://stackoverflow.com/) on how to attatch a function to the browser's [DOM](http://en.wikipedia.org/wiki/Document_Object_Model) ready event, in a cross-browser way, but **without** exporting any globals (keeping everything in an anonymous function's closure) and without including any external file. As a result, with some help of [a friendly StackOverflow user](http://stackoverflow.com/users/113716/patrick-dw), I put together a code snippet that:

 * takes a single function as argument,
 * attaches that function to the DOM ready event in all browsers supported by [jQuery](http://jquery.com/),
 * is [idempotent](http://en.wikipedia.org/wiki/Idempotence) (will never fire the given function twice),
 * does not export any globals,
 * compiles down to less than 590 bytes (less than 300 bytes gzipped),
 * is based on the [jQuery](http://jquery.com/) source code (I take no credit for it).


The source code
---------------

    (function () {

        // DOM ready event listener
        var ready = (function () {
            var ready_event_fired = false;
            var ready_event_listener = function (fn) {

                // Create an idempotent version of the 'fn' function
                var idempotent_fn = function () {
                    if (ready_event_fired) {
                        return;
                    }
                    ready_event_fired = true;
                    return fn();
                }

                // The DOM ready check for Internet Explorer
                var do_scroll_check = function () {
                    if (ready_event_fired) {
                        return;
                    }

                    // If IE is used, use the trick by Diego Perini
                    // http://javascript.nwbox.com/IEContentLoaded/
                    try {
                        document.documentElement.doScroll('left');
                    } catch(e) {
                        setTimeout(do_scroll_check, 1);
                        return;
                    }

                    // Execute any waiting functions
                    return idempotent_fn();
                }

                // If the browser ready event has already occured
                if (document.readyState === "complete") {
                    return idempotent_fn()
                }

                // Mozilla, Opera and webkit nightlies currently support this event
                if (document.addEventListener) {

                    // Use the handy event callback
                    document.addEventListener("DOMContentLoaded", idempotent_fn, false);

                    // A fallback to window.onload, that will always work
                    window.addEventListener("load", idempotent_fn, false);

                // If IE event model is used
                } else if (document.attachEvent) {

                    // Ensure firing before onload; maybe late but safe also for iframes
                    document.attachEvent("onreadystatechange", idempotent_fn);
                    
                    // A fallback to window.onload, that will always work
                    window.attachEvent("onload", idempotent_fn);

                    // If IE and not a frame:
                    // continually check to see if the document is ready
                    var toplevel = false;

                    try {
                        toplevel = window.frameElement == null;
                    } catch (e) {}

                    if (document.documentElement.doScroll && toplevel) {
                        return do_scroll_check();
                    }
                }
            };
            return ready_event_listener;
        })();

        // Put your own code here
        var ready_1 = function () {
            alert('foo');
        };
        var ready_2 = function () {
            alert('bar');
        };

        // Pass your functions to ready()
        ready(function () {
            ready_1();
            ready_2();
        });

    })();

As you can see, no globals are exported by this code snippet. This is very
useful if you just want to do some early DOM manipulation without including
jQuery, or even if you're using jQuery, but you want to do some extra work
**before** jQuery is loaded (which might take some time, as the full source of
jQuery is much heavier than this little snippet).


Copyright notice
----------------

I take no credit for writing this script. If you want to use it, please include
jQuery's license comment:

    /*!
     * jQuery JavaScript Library v1.4.2
     * http://jquery.com/
     *
     * Copyright 2010, John Resig
     * Dual licensed under the MIT or GPL Version 2 licenses.
     * http://jquery.org/license
     */
