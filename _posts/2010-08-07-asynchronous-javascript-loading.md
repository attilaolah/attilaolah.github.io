---
layout: post
title: Asynchronous JavaScript loading
tags:
- programming
---

If your website has a sufficient amount of static content, it might be a good
idea to load all the extra JavaScript files asynchronously. <del>This</del>
<ins>my old</ins> blog, for example, shows the static content as soon as
possible, allowing its visitors to read the main content (the article) while
the not-so-important content (like Facebook Like buttons, "Web 2.0" widgets and
all that crap) is on its way from the server.

I use the following snippet to load external JS:

{% highlight javascript linenos %}
(function () {

    // Asynchronous JS loader
    var load = (function () {
        // Private members
        var create = function (url) {
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.async = true;
            script.src = url;
            document.getElementsByTagName('head')[0].appendChild(script);
        };
        // Public: export a Function object
        return function (url) {
            setTimeout(function () { create(url); }, 1);
        };
    })();

    // Call the other script files from here
    load('https://www.example.com/foo-script.js');
    load('/media/js/some-local-js-file.js');

})();
{% endhighlight %}

I put all that stuff in a closure so nothing gets exported to to the global
namespace. Note that the ``setTimeout`` trick is [from here][1].

[1]: https://www.artzstudio.com/2008/07/beating-blocking-javascript-asynchronous-js/

Note also that some JavaScript files will not work if you load them like this.
These are ones that expect to be run before DOM readyness. Such an example is
[less.js][2].

[2]: https://github.com/cloudhead/less.js

Good candidates for asynchronous loading are the [Facebook JavaScript SDK][3]
and [Google Analytics] [4].

[3]: https://developers.facebook.com/docs/reference/javascript/
[4]: https://code.google.com/apis/analytics/docs/tracking/asyncTracking.html

## Update

* You can load less.js too, just trigger a `less.refresh()` after it has been
  loaded.
* Have a look at [Richard Neil Ilagan's implementation][5] as well.

[5]: https://richardneililagan.com/2010/09/protip-load-javascript-into-your-pages-asynchronously/
