---
layout: post
title: Merging mkv files
tags:
- programming
---

A while ago I was looking for a way to merge two separate `.mkv` files (left
and right views of a stereoscopic, 3D movie) into one file, to get a
side-by-side or top-bottom view. Since back then <del>I didn't get any
answer on <a href="http://superuser.com/q/231938/25095">SuperUser</a></del>
<ins>I've got <a href="http://superuser.com/a/259068/25095">an
answer</a></ins>, I figured I might just look into it myself, google it, read a
few man pages, and then write it down for the rest of the world.

*I'm not encouraging anyone to download pirated films.* But, if you do have the
movies, and they are in separate files, but you want to watch them on a 3DTV or
a PS3 that can only play side-by-side, single-file 3D movies, you'll end up
merging your files.

If you just want to know how to merge these files using the GUI, I'm not going
to write it down here, as there exists a very detailed tutorial about this over
at [Ameic.net][2]. Go read that if you want to do this using the GUI.

[2]: http://www.ameic.net/blog/archives/22

If you'd rather do it in the command line though (which would allow you to
create a batch to process all your movies later, `nice` the process while
you're working on the computer, and ler it rock while you're away), read on.

Here's what you're going to need:

* `mkvtoolnix`
* `ffmpeg`
* `avisynth`

`mkvtoolnix` is a free, open source tool. In Gentoo, you can get it from
[Portage][3]. `ffmpeg` is also [available for Gentoo][4]. You can find out more
about Avisynth [on their home page][5].

[3]: http://gentoo-portage.com/media-video/mkvtoolnix
[4]: http://gentoo-portage.com/media-video/ffmpeg
[5]: http://www.avisynth.org

{% highlight bash %}
$ sudo emerge -at mkvtoolnix
{% endhighlight %}

Note that if you build it yourself, there's also an `--enable-qt` option, but
for some reason a `qt` use flag does not exist in the ebuild. Also, I don't
build `ffmpeg` here as I already have that on my system.

Next thing you'll need to do is extract the audio you want. Use `eac3to` to do
so:

{% highlight bash %}
$ eac3to video-left.mkv sound.ac3
{% endhighlight %}

## Update 1

As *Marcin* mentioned, you can extract the autio simply using `ffmpeg`, you
don't need `eac3to`:

{% highlight bash %}
$ ffmpeg -i video-left.mkv -acodec copy audio.ac3
{% endhighlight %}

Next thing you're going to do is extract the video streams of both left and
right files, and convert them to side-by-side view. To do so, you'll need to
generate an `.avs` file that looks like this:

{% highlight js %}
videol=DirectShowSource("/path/to/video-left.mkv")
videor=DirectShowSource("/path/to/video-right.mkv")
video=StackHorizontal(videol, videor)
BicubicResize(video, 1920, 1080)
{% endhighlight %}

Name this file `convert.avs`, then process it with `ffmpeg` like this:

{% highlight bash %}
$ ffmpeg -i convert.avs -vcodec libx264 -b 7500000 -bt 7500000 -y video-sbs.h264
{% endhighlight %}

Now merge the audio and the video:

{% highlight bash %}
$ mkvmerge -o result.mkv --default-duration 0:24000/1001fps video-sbs.h264 audio.ac3
{% endhighlight %}

The resulting `result.mkv` file can now be played on a 3DTV or a PS3. You can
now remove the temporary files:

{% highlight bash %}
$ rm sound.ac3 video-sbs.mkv convert.avs
{% endhighlight %}

## Update 2
I've just got [an answer][1] on SuperUser.  In short, here's how no do it with
[GStreamer][6]:

[6]: http://gstreamer.freedesktop.org/

{% highlight bash %}
$ gst-launch-0.10 \
    filesrc location=MVI_0735L.MOV ! decodebin2 name=Left \
    filesrc location=MVI_0735R.MOV ! decodebin2 name=Right \
    Left.  ! videoscale ! ffmpegcolorspace ! video/x-raw-yuv, width=1280, \
             height=720 ! videobox border-alpha=0 right=-1280 ! queue ! mix. \
    Right. ! videoscale ! ffmpegcolorspace ! video/x-raw-yuv, width=1280, \
             height=720 ! videobox border-alpha=0 left=-1280 ! queue ! mix. \
    Left.  ! decodebin2 ! audioconvert ! audiopanorama panorama=-1.00 ! \
             queue ! addaudio. \
    Right. ! decodebin2 ! audioconvert ! audiopanorama panorama=1.00 ! \
             queue ! addaudio. \
    adder name=addaudio ! faac ! avmux. \
    videomixer name=mix ! ffmpegcolorspace ! x264enc ! \
    avimux name=avmux ! progressreport name="Encoding Progress" ! \
    filesink location=out.avi
{% endhighlight %}
