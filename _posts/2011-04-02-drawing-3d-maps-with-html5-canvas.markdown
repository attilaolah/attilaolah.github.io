---
layout: post
title: Drawing 3D maps with HTML5 canvas
tags:
 - HTML5
 - CoffeeScript
 - JavaScript
 - programming
summary: "A snippet of code that draws nice, 3D-looking buildings on a map."
---

Today I had some free time, so I played around with the
[OpenStreetMap](http://www.openstreetmap.org/) API. It turns out it's quite
easy to draw 3D-looking buildings on a canvas. After an hour or two of coding,
I was able to render actual buildings from the OSM database:

<div class="img center">
  <img src="/media/images/random/cmap-canvas-buildings.png" alt="Buildings rendered on a canvas" class="white" />
  <br/>
  <em>Buildings rendered on a canvas</em>
</div>

On the above picture, red buildings are "primary" ones (i.e. ones with an
address or a house number), while the grey ones are "secondary". **A demo
version of the canvas map can be seen
[here](/demos/cmap/buildings/buildings.html) (but only by people with decent
brawsers).**

As a comparison, here's how [Mapnik](http://mapnik.org/) renders the same data:

<div class="img center">
  <img src="/media/images/random/mapnik-osm-buildings.png" alt="Same map rendered by Mapnik" class="white" />
  <br/>
  <em>Same map rendered by <a href="http://mapnik.org/">Mapnik</a></em>
</div>

Even nicer is the result when it is drawn over Mapnik's tiles:

<div class="img center">
  <img src="/media/images/random/mapnik-canvas-combined-buildings.png" alt="The two images merged together" class="white" />
  <br/>
  <em>The two images merged together</em>
</div>

The above result could be improved by not rendering any of the buildings by
Mapnik, only the ground, & the roads. Then the canvas renderer could just place
everything else on top of the Mapnik layer (including amenities and other
interactive elements).

While maps rendered on the server side are more compatible with old browsers,
canvas-based maps can be made more interactive (e.g. hovering or clicking on a
building could highlight it and pop up a message with the complete address or
relevant information). Other projects, such as
[Cartagen](http://cartagen.org/), are capable of rendering a high variety of
objects, not just buildings, but they still require a lot of improvements, for
example the display of road names is note very optimal.

Hopefully, as more browsers support HTML5 and canvas by the day, people will
implement great interactive applications using this technology.
