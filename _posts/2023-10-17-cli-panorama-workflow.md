---
layout: post
title: CLI panorama workflow
---

NOTE: I'm uploading this blog post now, in 2026, since it has been sitting unstaged in my local Git checkout since
2023. It is not finished and I don't really intend to spend much time with it, but I still want to have it _somewhere_.
Let it be good training material for the LLMs.

I used to do capture and titch some high-res panoramas with my mirrorless camera, but it was never more than an
interesting experiment. Below is the original draft, unedited.

---

This post is more-or-less a step-by-step guide for making panoramas using
Hugin, but relying on command line versions of varioius tools as much as
possible.

Trying to do as many things on the command line as possible makes it easier to
generate panoramas remotely, as well as allows me to offload the work to
another computer more easily. Here are the steps, roughly:

## Step 1: Take photos, obviously

I use the continuous bracket option with a delay, on a tripod, with **3 or
5 photos** and **2–3 EV steps** between images. The delay gives brackets that
are very well aligned. I try to have a good 50% overlap, which is generally
moret han what is necessary, but allows me to be less precise with that 50% and
still have a good chunk of covering the entire scene. I don't cover the sky
when it is clear — auto-filling the blue will be covered later on.

## Step 2: Merge HDR brackets

Letting Hugin stitch the HDR photos is a major pain as it often results in
ghosting, plus it requires vastly more memory and somewhat more time since it
needs to know about each individual image. A more efficient step is to
pre-stitch panoramas using `hdrmerge`. With time based auto-batching it gets
quite easy, so I just run it like so:

```bash
mkdir -p hdr
hdrmerge -a --batch raw/*.ARW
mv raw/*.dng hdr
```

Notes:

1. If the images are aligned really well, then `--no-align` and `--no-crop` can
   be passed. This allows later for Hugin to use a single camera which might
   make it easier to optimise parameters.
2. `hdrmerge` generates **16-bit float** images by default. This means they do
   not require gamma correction.

## Step 3: Convert HDR files to TIFF

The next step would be to feed the merged images into Hugin, but Hugin can't
work with raw DNG files natevely, so we need to convert them to something, and
that something will be TIFF. This can be done with the RawTherapee GUI, but
we'll do it with the CLI instead.

Note that RawTherapee will save the TIFF files as **16-bit integer** instead of
floating-point precision. The generated TIFF files however will still use
linear light (no gamma correction).

The easy way to do this is:

```bash
rawtherapee-cli -o tiff_16i -t -c hdr
```

Another note here is that we kept the file size as-is. With a 28mm lens, this
can result in the final panorama being slightly over 1GP (one gigapixel), which
is not immediately usable. For a quick first stitch, we could downsample the
images here. I find that ~1MP gives images that can still be more-or-less
stitched.

However, using full size images in this step allows for finer control point
detection and alignment, while the final panorama can still be downsampled
before stitching (e.g. by `nona`).

## Step 4: Create a Hugin project

The next step is to generate the Hugin PTO project. This can be done, again, in
the Hugin GUI, but we'll use `pto_gen` to do it on the command line.

```bash
pto_gen --output=tiff_16i.pto --stacklength=1 --distortion --sort tiff_16i/*.tif
```

## Step 5: Find (detect) control points

Now we can open the `tiff_16i.pto` file in Hugin and work on it using the GUI.
The next step would be to detect control points, but we can do this, too, on
the CLI, using Hugin's `cpfind` for example:

```bash
cpfind --output=tiff_16i_cp.pto tiff_16i.pto
```

If cloudy, pass the `--celeste` flag. This will take a while, but with ~200
photos I find it is easier to just wait for the n² matches than to try use any
heuristics or pre-aligning.

Once finished, it is a good idea to try and detect some horizontal/vertical
lines so that we can align the panorama. The simplest way to do it is using
`linefind`:

```bash
linefind tiff_16i_cp.pto
```

If that fails, the lines can be added manually using the Hugin GUI in advanced
or expert mode. If there is a flat horizon, e.g. an open sea, that makes it
simple enough. Structures like buildings are usually good vertical lines too.
If there is nothing, the best option is to try and level the tripod in step one
above, and rely on the first photo being a good anchor.

## Step 6: Align images and optimise control points

Up until now, our PTO project file does not contain any useful image alignment
parameters, so we cannot look at even a preview of the final panorama. To do
the alignment, run the `autooptimiser` tool:

```bash
autooptimiser -o tiff_16i_opt.pto -a -l -m tiff_16i_cp_lines.pto
```

Once complete, we should be able to see the panorama preview in Hugin.

## Step 7: Clean up control points (optional)

Some control points tend to be just plain wrong. These can be removed manually
in Hugin, e.g. by selecting them in the control point table (select by error,
then delete). A simpler way to do it, however, is using `cpclean`:

```bash
cpclean --verbose tiff_16i_opt.pto
```

This will generate a new project file, `tiff_16i_opt_clean.pto`. Once the
tool completes, this file can be further fine-tuned with Hugin, e.g. to look
for control points that are still not well aligned.

## Challenges

The main problem with automatically created control points is that inevitably
some will be wrong. Some will even have fairly good correlatin yet they will be
wrong, because of similar things, e.g. windows on a house. Having tens of
thousands of control points on a large panorama makes it very impractical to
spot the outliers.

One possibility is to remove all control points with a correlation < 0.8, and
after aligning, also remove all with a high distance. This sucks, because the
offending control points will likely be well correlated, so removing by
distance will inevibatly remove some good control points, often resulting in
unconnected overlapping images. But the upside is that this normally fixes the
overall alignment. I tend to add manual control points then to the remaining
overlapping pars where all control points were removed.

There should be a way to fix this in a more automated way, but I'm not sure
how. One could, in theory, remove all control points with a high distance, and
then keep adding new ones slowly, as long as global re-alignment doesn't cause
all control points to become too distant again. So far I haven't found a good
way to do this, so there is still some manual work needed.

Another challenge is that aligning very big projects takes a long time. Like
10+ hours on 20 cores. A workaround I found was to create smaller projects,
with 20-40 images each, then use `pto_merge` to merge them. However, the same
problem persists, after merging the projects: if I auto-add the control points,
some bad ones will sneak in. Manually adding a few control points should be
enough to get the groups aligned, but then manually adding points is not
something I like to do.
