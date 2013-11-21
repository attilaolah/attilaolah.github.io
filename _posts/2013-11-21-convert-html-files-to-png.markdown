---
layout: post
title: Convert HTML files to PNG
tags:
- programming
---

For some stupid reason I ended up having to convert a whole lot of HTML files
to images. Not wanting to waste space, the plan was to compress the files as
much as possible without loosing too much quality.

So here's how to do it:

{% highlight bash %}
for f in *.html; do
  wkhtmltoimage -f png $f $f.png
  mogrify -trim $f.png
  pngquant --speed 1 $f.png --ext .png.o
  mv $f.png.o $f.png
done
{% endhighlight %}

Here's what each line does:

* `for f in *.html; do` will loop through each `.html` file in the current directory
* `wkhtmltoimage -f png $f $f.png` will convert the `.html` files to `.png`
  (see the [wkhtmltoimage project page][1])
* `mogrify -trim $f.png` will auto-crop the image and cut off the body padding,
  this saves a few bytes (see the [mogrify documentation][2])
* `pngquant --speed 1 $f.png --ext .png.o` compresses the `.png` files (note
  that [pngquant][3] uses *lossy* compression; to compress losslessly, use
  [pngcrush][4] instead)
* `mv $f.png.o $f.png` replaces the original png with the optimised one

[1]: //code.google.com/p/wkhtmltopdf
[2]: http://www.imagemagick.org/script/mogrify.php
[3]: http://pngquant.org/
[4]: http://pmt.sourceforge.net/pngcrush/
