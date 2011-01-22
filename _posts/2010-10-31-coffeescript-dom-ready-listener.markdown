---
layout: post
title: CoffeeScript DOM ready listener
tags:
 - CoffeeScript
 - JavaScript
 - jQuery
 - programming
summary: A CoffeeScript implementation of the browser DOM ready listener.
---

A while ago I've posted [about a JavaScript DOM ready event
listener](/2010/08/07/writing-your-own-dom-ready-listener.html). Well, it turns out that a [CoffeeScript](http://jashkenas.github.com/coffee-script/) implementation is pretty easy to write, and in fact it looks much nicer than its JavaScript alternative. Here goes the source:

{% highlight javascript %}
# DOM ready event listener
window.ready = (() ->

    ready_event_fired = false

    (fn) ->

        # Create an idempotent version of the 'fn' function
        idempotent_fn = () ->
            unless ready_event_fired
                ready_event_fired = true
                fn()

        # The DOM ready check for Internet Explorer
        do_scroll_check = () ->
            # If IE is used, use the trick by Diego Perini
            # http://javascript.nwbox.com/IEContentLoaded/
            try 
                document.documentElement.doScroll "left"
            catch e
                setTimeout do_scroll_check, 1
                return
            # Execute any waiting functions
            idempotent_fn()


        # If the browser ready event has already occurred
        if document.readyState is "complete"
            return idempotent_fn()

        # Mozilla, Opera and webkit nightlies currently support this event
        if document.addEventListener
            # Use the handy event callback
            document.addEventListener "DOMContentLoaded", idempotent_fn, false
            # A fallback to window.onload, that will always work
            window.addEventListener "load", idempotent_fn, false

        # If IE event model is used
        else if document.attachEvent
            # Ensure firing before onload; maybe late but safe also for iframes
            document.attachEvent "onreadystatechange", idempotent_fn
            # A fallback to window.onload, that will always work
            window.attachEvent "onload", idempotent_fn
            # If IE and not a frame:
            # continually check to see if the document is ready
            do_scroll_check() if document?.documentElement?.doScroll and window?.frameElement is null
)()
{% endhighlight %}

It compiles down to the following JS:

{% highlight javascript %}
window.ready = (function() {
  var ready_event_fired;
  ready_event_fired = false;
  return function(fn) {
    var do_scroll_check, idempotent_fn;
    idempotent_fn = function() {
      if (!(ready_event_fired)) {
        ready_event_fired = true;
        return fn();
      }
    };
    do_scroll_check = function() {
      try {
        document.documentElement.doScroll("left");
      } catch (e) {
        setTimeout(do_scroll_check, 1);
        return null;
      }
      return idempotent_fn();
    };
    if (document.readyState === "complete") {
      return idempotent_fn();
    }
    if (document.addEventListener) {
      document.addEventListener("DOMContentLoaded", idempotent_fn, false);
      return window.addEventListener("load", idempotent_fn, false);
    } else if (document.attachEvent) {
      document.attachEvent("onreadystatechange", idempotent_fn);
      window.attachEvent("onload", idempotent_fn);
      if (((typeof document === "undefined" || document === null) ?
        undefined : document.documentElement == null ? undefined :
          document.documentElement.doScroll) &&
        ((typeof window === "undefined" || window === null) ? undefined :
          window.frameElement) === null) {
            return do_scroll_check();
      }
    }
  };
})();
{% endhighlight %}

Minified to ~730 bytes (remove the newlines to use it):

{% highlight javascript %}
window.ready=function(){var b;b=false;return function(d){var c,a;a=function(){i
f(!b){b=true;return d()}};c=function(){try{document.documentElement.doScroll("l
eft")}catch(e){setTimeout(c,1);return null}return a()};if(document.readyState==
="complete")return a();if(document.addEventListener){document.addEventListener(
"DOMContentLoaded",a,false);return window.addEventListener("load",a,false)}else
if(document.attachEvent){document.attachEvent("onreadystatechange",a);window.at
tachEvent("onload",a);if((typeof document==="undefined"||document===null?undefi
ned:document.documentElement==null?undefined:document.documentElement.doScroll)
&&(typeof window==="undefined"||window===null?undefined:window.frameElement)===
null)return c()}}}();
{% endhighlight %}

It is about ~330 bytes gzipped, the size is only a bit more than the pure JS
version, but the actual CoffeeScript source is much cleaner and easier to
maintain.
