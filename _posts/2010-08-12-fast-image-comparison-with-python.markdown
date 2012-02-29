---
layout: post
title: Fast image comparison with Python
tags:
 - Python
 - programming
summary: "A Python script that compares images in random format and finds the
most similar ones."
---

A few months ago I needed a script that would compare a bunch of images,
searching for similar ones. There are some tools for that already out there,
but most of them have too many limitations: they either only work with images
of the same size, or they are too slow.


Example result
--------------

If you download the first 36 image results for the word "apple", you'll get
something like this:

<div class="img center">
  <img src="/media/images/random/apple-search-results.png" alt="Apple search results" />
</div>

Now if you put those in a folder called ``results`` and run ``python imgcmp.py
results/*``, it'll tell you that the most similar pictures are the following
two:

<div class="img center">
  <img src="/media/images/random/apple-similar-images.png" alt="Apple similar images" />
</div>

Considering that the script resizes the pictures to a same size and converts
them to black & white, this match is almost perfect.


Which algorithm to use
----------------------

Initially I was using
[Levenshtein](http://en.wikipedia.org/wiki/Levenshtein_distance) only, but
later I added [mean squared
error](http://en.wikipedia.org/wiki/Mean_squared_error),
[signal-to-noise](http://en.wikipedia.org/wiki/Signal-to-noise_ratio) and
[normalised root mean square
deviation](http://en.wikipedia.org/wiki/Root_mean_square_deviation) algorithms.
I use a combination of the results to evaluate the similarity.


How does it work
----------------

First it converts both images to 256-bit (black & white), resizes them to a
very small size, and calculates the similarity. Since the images are resized to
a very small size, the calculation is very fast. Then, I do the same but with a
bigger image size. I keep increasing the size of the downscale until the
difference between the results becomes small enough, at which point I stop the
calculation.


Limitations
-----------

<strike>While this method is pretty fast, it will convert the images to black
and white, so color differences will not be taken into account. This is
acceptable in most cases though.</strike>

**UPDATE**: the updated version now supports colours, though it is not
optimised.

Another limitation is that this algorithm will not work for transformed images
(flipped, rotaged, transposed, etc.)


Dependencies
------------

There are two external dependencies:
[PIL](http://www.pythonware.com/products/pil/) and
[python-Levenshtein](http://pypi.python.org/pypi/python-Levenshtein/).


The source code
---------------

Here is the source code, you can copy-paste it or download it from
[this gist](https://gist.github.com/1940208).

<div class="img center">
  <script src="https://gist.github.com/1940208.js?file=imgcmp.py"></script>
</div>

License
-------

This source code is placed into the [Public
Domain](http://en.wikipedia.org/wiki/Public_domain).
