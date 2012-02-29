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
[here](/downloads/python/imgcmp.py).

{% highlight python %}
import math

import Image
import Levenshtein


class ImageCompare(object):
    """Compares two images."""

    def __init__(self, imga, imgb, maxsize=64):
        """Save a copy of the image objects."""

        sizea, sizeb = imga.size, imgb.size

        newx = min(sizea[0], sizeb[0], maxsize)
        newy = min(sizea[1], sizeb[1], maxsize)

        # Rescale to a common size:
        imga = imga.resize((newx, newy), Image.BICUBIC)
        imgb = imgb.resize((newx, newy), Image.BICUBIC)

        # Store the images in B/W Int format
        self._imga = imga.convert('I')
        self._imgb = imgb.convert('I')

        # Store the common image size
        self.x, self.y = newx, newy

    def _img_int(self, img):
        """Convert an image to a list of pixels."""

        x, y = img.size

        for i in xrange(x):
            for j in xrange(y):
                yield img.getpixel((i, j))

    @property
    def imga_int(self):
        """Return a tuple representing the first image."""

        if not hasattr(self, '_imga_int'):
            self._imga_int = tuple(self._img_int(self._imga))

        return self._imga_int

    @property
    def imgb_int(self):
        """Return a tuple representing the second image."""

        if not hasattr(self, '_imgb_int'):
            self._imgb_int = tuple(self._img_int(self._imgb))

        return self._imgb_int

    @property
    def mse(self):
        """Return the mean square error between the two images."""

        if not hasattr(self, '_mse'):
            tmp = sum((a-b)**2 for a, b in zip(self.imga_int, self.imgb_int))
            self._mse = float(tmp) / self.x / self.y

        return self._mse

    @property
    def psnr(self):
        """Calculate the peak signal-to-noise ratio."""

        if not hasattr(self, '_psnr'):
            self._psnr = 20 * math.log(255 / math.sqrt(self.mse), 10)

        return self._psnr

    @property
    def nrmsd(self):
        """Calculate the normalized root mean square deviation."""

        if not hasattr(self, '_nrmsd'):
            self._nrmsd = math.sqrt(self.mse) / 255

        return self._nrmsd

    @property
    def levenshtein(self):
        """Calculate the Levenshtein distance."""

        if not hasattr(self, '_lv'):
            stra = ''.join((chr(x) for x in self.imga_int))
            strb = ''.join((chr(x) for x in self.imgb_int))

            lv = Levenshtein.distance(stra, strb)

            self._lv = float(lv) / self.x / self.y

        return self._lv


class FuzzyImageCompare(object):
    """Compares two images based on the previous comparison values."""

    def __init__(self, imga, imgb, lb=1, tol=15):
        """Store the images in the instance."""

        self._imga, self._imgb, self._lb, self._tol = imga, imgb, lb, tol

    def compare(self):
        """Run all the comparisons."""

        if hasattr(self, '_compare'):
            return self._compare

        lb, i = self._lb, 2

        diffs = {
            'levenshtein': [],
            'nrmsd': [],
            'psnr': [],
        }

        stop = {
            'levenshtein': False,
            'nrmsd': False,
            'psnr': False,
        }

        while not all(stop.values()):
            cmp = ImageCompare(self._imga, self._imgb, i)

            diff = diffs['levenshtein']
            if len(diff) >= lb+2 and \
                abs(diff[-1] - diff[-lb-1]) <= abs(diff[-lb-1] - diff[-lb-2]):
                stop['levenshtein'] = True
            else:
                diff.append(cmp.levenshtein)

            diff = diffs['nrmsd']
            if len(diff) >= lb+2 and \
                abs(diff[-1] - diff[-lb-1]) <= abs(diff[-lb-1] - diff[-lb-2]):
                stop['nrmsd'] = True
            else:
                diff.append(cmp.nrmsd)

            diff = diffs['psnr']
            if len(diff) >= lb+2 and \
                abs(diff[-1] - diff[-lb-1]) <= abs(diff[-lb-1] - diff[-lb-2]):
                stop['psnr'] = True
            else:
                try:
                    diff.append(cmp.psnr)
                except ZeroDivisionError:
                    diff.append(-1)  # to indicate that the images are identical

            i *= 2

        self._compare = {
            'levenshtein': 100 - diffs['levenshtein'][-1] * 100,
            'nrmsd': 100 - diffs['nrmsd'][-1] * 100,
            'psnr': diffs['psnr'][-1] == -1 and 100.0 or diffs['psnr'][-1],
        }

        return self._compare

    def similarity(self):
        """Try to calculate the image similarity."""

        cmp = self.compare()

        lnrmsd = (cmp['levenshtein'] + cmp['nrmsd']) / 2
        return lnrmsd
        return min(lnrmsd * cmp['psnr'] / self._tol, 100.0)  # TODO: fix psnr!


if __name__ == '__main__':

    import sys

    if len(sys.argv) < 3:
        print 'usage: %s image-file-1.jpg image-file-2.jpg ...' % sys.argv[0]
        sys.exit()

    tot = len(sys.argv) - 1
    tot = (tot ** 2 - tot) / 2

    print 'Comparing %d images:' % tot

    images = {}
    for img in sys.argv[1:]:
        images[img] = Image.open(img)

    results, i = {}, 1
    for namea, imga in images.items():
        for nameb, imgb in images.items():
            if namea == nameb or (nameb, namea) in results:
                continue

            print ' * %2d / %2d:' % (i, tot),
            print namea, nameb, '...',

            cmp = FuzzyImageCompare(imga, imgb)
            sim = cmp.similarity()
            results[(namea, nameb)] = sim

            print '%.2f %%' % sim

            i += 1

    res = max(results.values())
    imgs = [k for k, v in results.iteritems() if v == res][0]

    print 'Most similar images: %s %s (%.2f %%)' % (imgs[0], imgs[1], res)
{% endhighlight %}


License
-------

This source code is placed into the [Public
Domain](http://en.wikipedia.org/wiki/Public_domain).
