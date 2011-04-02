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
address or a house number), while the grey ones are "secondary".

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
objects, not just buildings, but they still require a lot of improvments, for
example the display of road names is note very optimal.

Hopefully, as more browsers support HTML5 and canvas by the day, people will
implement great interactive applications using this technology.


Demo
----

A demo version can be seen [here](/demos/cmap/buildings/buildings.html). The
full source code is below:

{% highlight html %}
<!doctype html>
<html>
  <head>
    <meta charset=utf-8>
    <title>CMAP: Building</title>
    <script src=js/jquery.js></script>
    <script src=js/coffee-script.js></script>
    <script type=text/coffeescript>
# Put everything in one object:
CMAP =
    # This finction creates a "map" instance.
    # A "map" is bound to a <canvas> element, and it can be used as a container
    # to add other elements to draw all of them at once.
    map: (settings) ->
        # Bounding box:
        minlat = settings.minlat or -90
        maxlat = settings.maxlat or 90
        minlon = settings.minlon or -180
        maxlon = settings.maxlon or 180
        # The canvas:
        canvas = $ settings.canvas or $ '<canvas/>',
            height: 200
            width: 200
        height = canvas.height()
        width = canvas.width()
        # The context:
        ctx = canvas[0].getContext('2d')
        # Resolution:
        resx = (maxlon - minlon) / height
        resy = (maxlat - minlat) / width
        # List of objects to draw:
        content = []
        # Return a map instance:
        map =
            minlat: minlat
            maxlat: maxlat
            minlon: minlon
            maxlon: maxlon
            canvas: canvas
            ctx: ctx
            coords: (lat, lon) ->
                # Calculate (x, y) coordinates on the canvas:
                [(lon - minlon) / resx, height - (lat - minlat) / resy]
            add: (elem) ->
                content.push elem
            draw: (settings) ->
                settings = settings or {}
                settings.ctx = ctx
                for elem in content
                    elem.draw settings
    # This function creates a "building" object.
    # A "building" object knows how to draw itself on a canvas.
    building: (settings) ->
        # Default settings:
        base =
            height: settings.height or 6
            coords: settings.coords or []
            secondary: settings.secondary
            floor:
                fillStyle: settings.floor?.fillStyle or \
                    settings.secondary and 'rgba(216,213,209, 1.0)' or 'rgba(216,113,109, 1.0)'
                strokeStyle: settings.floor?.strokeStyle or \
                    settings.secondary and 'rgba(178,170,166, 1.0)' or 'rgba(178,70,66, 1.0)'
            walls:
                fillStyle: settings.walls?.fillStyle or \
                    settings.secondary and 'rgba(216,213,209, 0.5)' or 'rgba(216,113,109, 0.5)'
                strokeStyle: settings.walls?.strokeStyle or \
                    settings.secondary and 'rgba(178,170,166, 0.75)' or 'rgba(178,70,66, 1.0)'
            roof:
                fillStyle: settings.roof?.fillStyle or \
                    settings.secondary and 'rgba(255,255,255, 0.5)' or 'rgba(255,220,220, 0.5)'
                strokeStyle: settings.roof?.strokeStyle or \
                    settings.secondary and 'rgba(178,170,166, 0.5)' or 'rgba(178,70,66, 0.75)'
            ctx: settings.ctx
        # Return a building instance:
        instance =
            bind: (ctx) ->
                base.ctx = ctx
            draw: (settings) ->
                ctx = settings.ctx or base.ctx
                instance.draw_floor settings
                instance.draw_walls settings
                instance.draw_roof settings
            draw_floor: (settings) ->
                ctx = settings.ctx or base.ctx
                ctx.fillStyle = base.floor.fillStyle
                ctx.strokeStyle = base.floor.strokeStyle
                # Move to the starting point:
                [x, y] = settings.coords or [0, 0]
                # Draw a path:
                ctx.beginPath()
                for point in base.coords
                    ctx.lineTo point[0] + x, point[1] + y
                ctx.closePath()
                ctx.fill()
                ctx.stroke()
            draw_roof: (settings) ->
                ctx = settings.ctx or base.ctx
                ctx.fillStyle = base.roof.fillStyle
                ctx.strokeStyle = base.roof.strokeStyle
                # Move to the starting point:
                [x, y] = settings.coords or [0, 0]
                # Draw a path:
                ctx.beginPath()
                for point in base.coords
                    ctx.lineTo point[0] + x, point[1] + y - base.height
                ctx.closePath()
                ctx.fill()
                ctx.stroke()
            draw_walls: (settings) ->
                ctx = settings.ctx or base.ctx
                ctx.fillStyle = base.walls.fillStyle
                ctx.strokeStyle = base.walls.strokeStyle
                # Get an array of coords & push the first at the end:
                coords = base.coords.slice 0
                coords.push coords[0]
                # Move to the starting point:
                [x, y] = settings.coords or [0, 0]
                # Loop through coords:
                index = 0
                while index < coords.length - 1
                    # Draw each wall:
                    ctx.beginPath()
                    ctx.lineTo coords[index][0] + x, coords[index][1] + y
                    ctx.lineTo coords[index+1][0] + x, coords[index+1][1] + y
                    ctx.lineTo coords[index+1][0] + x, coords[index+1][1] + y - base.height
                    ctx.lineTo coords[index][0] + x, coords[index][1] + y - base.height
                    ctx.closePath()
                    ctx.fill()
                    ctx.stroke()
                    # Continue:
                    index += 1
# Now let's test-drive our renderer.
# To do this we download an actual OSM file (which was taken from the
# OpenStreetMap API, version 0.6.)
$.ajax 'sample.osm',
    success: (data) ->
        # Parse the result with jQuery:
        osm = $ data
        # Set up a map instance:
        bbox = osm.children 'bounds'
        map = CMAP.map
            canvas: $ 'canvas'
            minlat: parseFloat bbox.attr 'minlat'
            minlon: parseFloat bbox.attr 'minlon'
            maxlat: parseFloat bbox.attr 'maxlat'
            maxlon: parseFloat bbox.attr 'maxlon'
        # Get all buildings:
        osm.children('way').children('tag[k=building][v=yes]').parent().each (i, way) ->
            way = $ way
            # Primary buildings are the ones with 'addr:*' fields.
            primary = way.children('tag[k^=addr]').length
            # Build a list of coordinates for each building:
            coords = []
            way.children('nd').each (i, nd) ->
                node = osm.children('node#' + $(nd).attr 'ref')
                lat = parseFloat node.attr 'lat'
                lon = parseFloat node.attr 'lon'
                coords.push map.coords lat, lon
            map.add CMAP.building
                secondary: not primary
                coords: coords
        # Finally wi draw the map.
        # This will cause all the buildings to be drawn on the canvas.
        map.draw()
    </script>
  </head>
  <body style=text-align:center>
    <canvas id="canvas" width=600px height=600px></canvas>
  </body>
</html>
{% endhighlight %}
