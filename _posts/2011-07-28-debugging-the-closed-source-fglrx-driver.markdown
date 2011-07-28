---
layout: post
title: Debugging AMD's closed source fglr driver
tags:
 - Linux
 - badassery
summary: How I ended up reverse-engineering the proprietary fglrx driver.
---

A broken [Sapphire Radeon HD
4850](http://en.wikipedia.org/wiki/Radeon_R700#Radeon_HD_4800) somehow ended up
in my possession. I didn't know what was the problem, so I tried to plug it in
in a mobo I just had lying around, running the [nightly
oneiric](https://wiki.ubuntu.com/OneiricOcelot).

The card showed up fine in ``lspci``. I didn't try using it with the
open-source drivers, as I'm not interested in putting a display on it. Instead
I wanted to play around a little with
[OpenCL](http://en.wikipedia.org/wiki/OpenCL), so I went for the closed-source
Catalyst driver. (This was a few days ago, when 11.6 was the newest version
around - I haven't tried it with the latest 11.7 or with the 11.8 preview
versions.)

The driver didn't start, X choked on this error:

    (EE) PPLIB: PP_Initialize() failed.

Since the driver is not open-sourced, googling around didn't reveal any usable
source code on PP_Initialize. So I turned to
[``objdump``](http://en.wikipedia.org/wiki/Objdump).

{% highlight console %}
$ objdump -CRd fglrx_drv.so
{% endhighlight %}

This revealed a few things about PP_Initialize. (I don't think I should post
any dumps here, as I believe that would violate copyright laws.) I assumed it
returns a status code, so I tried overloading it and returning a different
status code instead:

{% highlight c %}
#define _GNU_SOURCE 1
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/types.h>
#include <dlfcn.h>

long PP_Initialize(void) {
    fp = fopen("/dev/stderr", "a");
    fprintf(fp, "DEBUG: entering PP_Initialize.\n");
    close(fp);

    // Call the original function but return a different value:
    long (*orig)(void) = dlsym(RTLD_NEXT, "PP_Initialize");
    orig();

    return 0;
}
{% endhighlight %}

{% highlight console %}
$ gcc -shared -fPIC -o preload.so preload.c -ldl
$ LD_PRELOAD="`pwd`/preload.so" startx
{% endhighlight %}

This will start the X server but with our library preloaded. With a status code
of zero, the server now continued the loading of the driver, but of course
other errors have emerged. So I ended up overriding a couple more functions.

I was wondering if maybe ``PPLIB`` is part of the code that manages
[PowerPlay](http://en.wikipedia.org/wiki/ATI_PowerPlay) functions, and if maybe
just disabling it all and setting the fan speed manually to 100% would give me
a result.

Well, I was wrong. The only thing I gained was some experience with
``objdump``, reverse-engineering, some C and assembly. After disassembling the
card itself, I noticed that one of the conductors on the GPU seemed to be
burned out - probably causing card initialization to fail.

I also learned that when pre-loading with ``LD_PRELOAD``, the overriding
function should accept the same number of arguments as the overriding function,
otherwise crap will be left on the stack, messing up the rest of the code. To
figure out how many parameters a function takes, it is usually enough to fund
it in the ``objdump`` output, look at the assembly, and count how many things
are popped off the stack before returning.

The pops usually occur around the top of the function body, just before the
``ret`` statement, so no need to follow any jumps. Note to discard stack
pointer registers, ``%ebp`` and/or ``%esp``.

Another thing I've learned playing around with GPUs is the fact that X has to
be running in order for OpenCL to work on a card. No displays are necessary,
but the ``Device`` sections in ``xorg.conf`` need to reference the proprietary
drivers (as the open-source ones don't provide OpenCL support at the moment).
