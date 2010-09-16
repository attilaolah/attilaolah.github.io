---
layout: post
title: jQuery action on page scroll
tags:
 - jQuery
 - JavaScript
 - programming
summary: A simple way of firing events on scroll.
---

If you want to display some page elements initially, and later on load more
data as the user scrolls down, an easy way of doing it is putting a "loading"
div at the bottom of the page, something like this:

{% highlight html %}
<ul id="container">
    <li>Element 1</li>
    <li>Element 2</li>
    ...
    <li>Element 10</li>
</ul>
<div id="loader">Loading additional elements...</div>
{% endhighlight %}

Then, listen to scroll events:

{% highlight javascript %}
(function () {

    // Load the rest of the posts if needed
    var load_bottom_data_when_needed = function () {
        // If the marker div is not present, don'n do anything.
        if ($('#loader')[0]) {
            // Set up the scroll event listener
            $(window).scroll(load_bottom_data_once);
            // Fire in case there is no scroll event
            load_bottom_data_once();
        }
    };

    // The scroll event listener
    var load_bottom_data_once = (function () {
        var loaded = false;
        return function () {
            if (!loaded) {
                if ($(window).scrollTop() + $(window).height() >= $('#loader').offset().top) {
                    $('#container').load('/all-elements.html', function () {
                        $('#loader').remove();
                    });
                    loaded = true;
                }
            }
        };
    }());

    $(load_bottom_data_when_needed);

}());
{% endhighlight %}

This will load all the elements when you scroll down. This is how currently the
[front page of this blog](/) works. If you want to load elements in smaller
batches, you could do something like this:


{% highlight javascript %}
// The scroll event listener
var load_bottom_data_in_chunks = (function () {
    var index = 10,
        elements = 10,
        locked = false;
    return function () {
        if (!locked) {
            if ($(window).scrollTop() + $(window).height() >= $('#loader').offset().top) {
                // Lock the loader so there is only one load at a time
                locked = true;
                // Load the next batch of enements
                $.get('/items/', { index: index, elements: elements }, function (data) {
                    $('#container').append(data);
                    // release the lock
                    locked = false;
                });
                // Increase the index, so on next load we get the next chunk
                index += elements;
            }
        }
    };
}());
{% endhighlight %}

Pretty simple, yet it can be highly customized, and in many cases it will make
the user experience much smoother than a paginated page. See [Google Image
Search](http://www.google.com/images?q=agatha+christie), [Google
Reader](http://www.google.com/reader/view/) or
[Facebook](http://www.facebook.com/).
