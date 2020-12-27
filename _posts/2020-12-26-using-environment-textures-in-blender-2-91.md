---
layout: post
title: Using Environment Textures in Blender 2.91
tags:
- blender
- 3d
---

This tutorial will demonstrate how to use equirectangular environment textures
in Blender. I'm going to use version 2.91 just because that happens to be the
latest stable version.

[![Download Blender 2.91.0](/images/2020/download-blender-2.91.0.png)](https://www.blender.org/download/)

As an example, we're going to make an "Earth" texture. Before we dive in, we
need to download some high-res textures: I got mine from a Google search:

[![Google "nasa blue marble"](/images/2020/google-search-nasa-blue-marble.png)](https://www.google.com/search?q=nasa+blue+marble)

I downloaded the "Explorer Base Map", published September 1, 2020. The
[3600×1800px PNG (6 Mb)](https://visibleearth.nasa.gov/images/147190/explorer-base-map/147191l)
is good enough, however in this tutorial I'm going to use the
[21600×10800px GeoTIFF (231 Mb)](https://visibleearth.nasa.gov/images/147190/explorer-base-map/147192l)
to get even higher resolution.

The texture looks like this:

[![Explorer Base Map](/images/2020/eo-base-2020-clean-720x360.jpg)](https://visibleearth.nasa.gov/collection/1484/blue-marble)

Now that we have a texture to use, fire up Blender:

[![Open Blender 2.91.0](/images/2020/open-blender-2.91.0.png)](/images/2020/open-blender-2.91.0.png)

…and go straight to the **Shading** workspace:

[![Shading workspace](/images/2020/shading-workspace.png)](/images/2020/shading-workspace.png)

The default cube should have a material called "Material", go ahead and rename
it, e.g. to "Earth":

[![Rename material](/images/2020/rename-material.png)](/images/2020/rename-material.png)

Add an **Environment Texture** node:

[![Add Environment Texture node](/images/2020/add-environment-texture.png)](/images/2020/add-environment-texture.png)

Click **Open** and locate the image file that we downloaded earlier:

[![Open Environment Texture](/images/2020/open-environment-texture.png)](/images/2020/open-environment-texture.png)

[![Open Environment Texture file](/images/2020/open-environment-texture-file.png)](/images/2020/open-environment-texture-file.png)

Connect the **Color** output of the **Environment Texture** node to the **Base
Color** input of the **Principled BSDF** node.

[![Connect Color to Base Color](/images/2020/connect-color-to-base-color.png)](/images/2020/connect-color-to-base-color.png)

Once the nodes are connected, the default cube should already have the texture
applied:

[![Default cube with Earth texture, flipped](/images/2020/cube-with-earth-texture-flipped.png)](/images/2020/cube-with-earth-texture-flipped.png)

Note that the above example is viewed from the default camera (Numpad 0) with
**Viewport Shading** enabled:

[![Enable Viewport Shading](/images/2020/enable-viewport-shading.png)](/images/2020/enable-viewport-shading.png)

Also note that our cube-Earth is horizontally "flipped", i.e. it looks as if it
would look in a vertical mirror. To fix that we will scale the texture along
the X axis by -1.

Start by adding a **Texture Coordinate** node and connect its **Object** output
to the **Vector** input of the **Environment Texture** node:

[![Add Texture Coordinate](/images/2020/add-texture-coordinate.png)](/images/2020/add-texture-coordinate.png)

[![Connect Texture Coordinate node](/images/2020/connect-texture-coordinate.png)](/images/2020/connect-texture-coordinate.png)

So far haven't changed anything, the texture is still flipped. To make the
actual transformation, add a **Mapping** node between the **Texture
Coordinate** and **Environment Texture** nodes, and change the **X** axis of
the **Scale** factor from 1 to -1, like so:

[![Add Mapping node](/images/2020/add-vector-mapping.png)](/images/2020/add-vector-mapping.png)

[![Mapping node connected](/images/2020/mapping-node-connected.png)](/images/2020/mapping-node-connected.png)

The default cube should have the texture applied the right way now. Here is how
it looks, after rotating by 180° degrees around the Z axis (R Z 180):

[![Default cube with Earth texture](/images/2020/cube-with-earth-texture.png)](/images/2020/cube-with-earth-texture.png)

Of course, we can obliterate the default cube and add a UV sphere instead,
apply a SubSurf modifier, rotate it 180° along the Z axis and render it to get
a more reasonable-looking planet Earth:

[![Earth](/images/2020/earth-sphere-r-180.png)](/images/2020/earth-sphere-r-180.png)

Next step in the series:

- [Baking Environment Textures in Blender 2.91](/2020/12/27/baking-environment-textures-in-blender-2-91/)
