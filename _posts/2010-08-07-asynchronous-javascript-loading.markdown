---
layout: post
title: Asynchronous JavaScript loading
tags:
 - JavaScript
 - programming
summary: A simple code-snippet that loads JavaScript files asynchronously.
---

If your website has a sufficient amount of static content, it might be a good
idea to load all the extra JavaScript files asynchronously. This blog, for
example, shows the static content as soon as possible, allowing its visitors to
read the main content (the article) while the not-so-important content (like
Facebook Like buttons, "Web 2.0" widgets and all that crap) is on its way from
the server.


The source code
---------------

I use the following snippet to load external JS:

{% highlight javascript %}
(function () {

    // Asynchronous JS loader
    var asynchronous_javascript_loader = (function () {
        // Private members
        var create = function (url) {
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = url;
            document.getElementsByTagName('head')[0].appendChild(script);
        };
        // Public: export a Function object
        return function (url) {
            setTimeout(function () { create(url); }, 1);
        };
    })();

    // Call the other script files from here
    asynchronous_javascript_loader('http://www.example.com/foo-script.js');
    asynchronous_javascript_loader('/media/js/some-local-js-file.js');

})();
{% highlight javascript %}

I put all that stuff in a closure so nothing gets exported to to the global
namespace. Note that the ``setTimeout`` trick is [from
here](http://www.artzstudio.com/2008/07/beating-blocking-javascript-asynchronous-js/).

Note also that some JavaScript files will not work if you load them like this.
These are ones that expect to be run before DOM readyness. Such an example is
[less.js](http://github.com/cloudhead/less.js).

Good candidates for asynchronous loading are the [Facebook JavaScript
SDK](http://developers.facebook.com/docs/reference/javascript/) and [Google
Analytics](http://code.google.com/apis/analytics/docs/tracking/asyncTracking.html).
