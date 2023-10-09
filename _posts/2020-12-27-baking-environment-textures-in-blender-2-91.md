---
layout: post
title: Baking Environment Textures in Blender 2.91
---

This tutorial will demonstrate how to re-project Equirectangular images to cube
maps in Blender, using a technique called Baking. Before you get started, you
should set up your material using an environment texture, as described in the
previous tutiorial,
[Using Environment Textures in Blender 2.91](/2020/12/26/using-environment-textures-in-blender-2-91/).

The material should look something like this in the **Shading** workspace:

[![Mapping node connected](/images/2020/mapping-node-connected.png)](/images/2020/mapping-node-connected.png)

…and your default cube should look like this:

[![Default cube with Earth texture](/images/2020/cube-with-earth-texture-asia.png)](/images/2020/cube-with-earth-texture-asia.png)

While still in the **Shading** workspace, add a new **Image Texture** node to
the material:

[![Add Image Texture node](/images/2020/add-image-texture-node.png)](/images/2020/add-image-texture-node.png)

Click **New** on the **Image Texture** node to create a new image:

[![Create a new image](/images/2020/image-texture-node-new-image.png)](/images/2020/image-texture-node-new-image.png)

Give the new image some **Name**, set the desired resolution (**Width** &
**Height**) and uncheck **Alpha**, because we don't have an alpha channel in
our environment map.

[![Uncheck Alpha](/images/2020/image-texture-node-new-image-uncheck-alpha.png)](/images/2020/image-texture-node-new-image-uncheck-alpha.png)

The resulting **Image Texture** node should look something like this. There's
no need to connect it to anything.

[![Image Texture node](/images/2020/image-texture-node-zp.png)](/images/2020/image-texture-node-zp.png)

The next step is to UV-unwrap a face of our default cube onto this newly
created image. Head over to the **UV Editing** workspace:

[![UV Editing workspace](/images/2020/uv-editing-workspace.png)](/images/2020/uv-editing-workspace.png)

In the **3D Viewport**, delete all faces of the cube, except the one that we're
going to project to our image. An easy way to do that is to switch to **Face
select** mode, then **Select** » **All** (**A**) to select all faces, and then
Ctrl+LeftClick on the top face to select all faces of the cube, except the top
face:

[![Face select](/images/2020/face-select-mode.png)](/images/2020/face-select-mode.png)

An alternative is to select the top face only, then **Select** » **Invert**
(**Ctrl+I**) to select all faces except the top one. In any case, the resulting
selection should look like this:

[![Cube with top face not selected](/images/2020/cube-select-all-faces-except-top.png)](/images/2020/cube-select-all-faces-except-top.png)

Then hit **X** and select **Faces** to delete everything except the top face:

[![Delete faces](/images/2020/delete-faces.png)](/images/2020/delete-faces.png)

Now click on the top face again to select it, and you'll see in the **UV
editor** that the face is not aligned to the image:

[![UV Editor](/images/2020/uv-editor-not-covering-face.png)](/images/2020/uv-editor-not-covering-face.png)

A quick way to fix that is back in the **3D Viewport** to click on **UV** »
**Reset**.

[![UV » Reset](/images/2020/uv-reset.png)](/images/2020/uv-reset.png)

Now that the face is properly UV-mapped to the image, we can go ahead and bake
our image texture. Under **Properties** » **Render Properties** (on the right),
change the **Render Engine** to **Cycles**, because **Eevee** doesn't bake:

[![Change Render Engine to Cycles](/images/2020/change-eevee-to-cycles.png)](/images/2020/change-eevee-to-cycles.png)

Change the **Device** from **CPU** to **GPU Compute** if you have a supported
GPU to bake faster.

Expand the **Bake** section and change **Bake Type** from **Combined** to
**Diffuse** since we're only interested in the re-projected image texture.

Still in the **Bake** section, under **Infuence**, uncheck **Direct** and
**Indirect** and make sure only **Color** is selected. This way lighting
information will not be baked onto the image texture, only the colour values of
the environment texture.

The **Bake** section should now look something like this:

[![Bake section](/images/2020/bake-section.png)](/images/2020/bake-section.png)

Go ahead and click on **Bake**. It will take a while, depending on the
resolution of your image texture. Once it's done, the **UV Editor** on the left
will update with the contents of the baked image. Click **Image\*** » **Save
As…** (**Alt+Shift+S**) to export the image:

[![Save Image As](/images/2020/uv-editor-export-image.png)](/images/2020/uv-editor-export-image.png)

The exported image texture now has the North pole projected to the top face of
a cube:

[![North Pole @ 1024pk](/images/2020/zp-1024.png)](/images/2020/zp-1024.png)

Next step in the series:

- [Rendering Earth in Godot 3.4](/2021/11/10/rendering-earth-in-godot-3-4/)
