---
layout: post
title: Cross-compiling CGO to ARM
tags:
- programming
---

This is a story about a a piece of Go code that wanted to be cross-compiled for
the Raspberri Pi. From a private repo. On Wercker. With C/CGO files. And link
it against `libbluetooth`.


## Requirements

* Cross-compile to ARM. Target the [Raspberry Pi].
* Include C source files. Needs `cgo`.
* Link against `libbluetooth`. Needs custom `ldflags`.
* Do all this on [Wercker].

[Raspberry Pi]: https://www.raspberrypi.org/
[Wercker]: https://wercker.com/


## Steps I go through

* Read [Dave Cheney][davecheney]'s [blog post][1] on cross compilation.
* Follow the link to Dave's [new blog post][2] about the same topic.
* Try [`goxc`][3]. It is supposed to be the "easy" route.
* [Issue #54][4] is merged, `goxc` now supports Go 1.4. Sweet!
* It requires building the Go toolchain for every target.
* Doesn't work with the system Go on Gentoo — missing `.hg`, bad file permissions, etc.
* Try fixing all these issues. Fail, then look for a better solution.
* Find out about [Péter Szilágyi][peter_szilagyi]'s [xgo][5]. Seems to fit the bill.
* No need to build the toolchain. It's all [up in the Docker registry][8].
* Find out about [Issue #1][6] (can't build non-public repos).
* Péter isn't interested in solving the issue. He uses [Mitchell Hashimoto][mitchellh]'s [`gox`][7] now.
* Find out about `gox`. Seems to fit the bill even better.
* Fail to build the toolchain locally, for the same reason as `gox`.
* Look for a Wercker box that uses `gox`.
* Find out about [Taichi Nakashima][deeeet]'s [`wercker-box-gox`][9] and [`wercker-step-gox`][10].
* Send a few pull requests. Taichi accepts them shortly. The Wercker box now runs Go 1.4!
* Tell Wercker to use [`tcnksm/gox`][11].
* Set up a build step to use [`tcnxsm/gox`][12].
* Oops! Go 1.4 [won't build C source files by default][13] any more.
* Add a simple build step to `export CGO_ENABLED="1"`.
* Hooray! Now it starts to build at least!
* However, `bluetooth.h` was not found. OK, this one was expected.
* Create a new Wercker box, [gox-bluetooth][14], that `apt-get install`s `libbluetooth-dev`.
* Change my app to use `box: attilaolah/gox-bluetooth`. I'me one more step closer to my goal.
* `cc1: error: unrecognized command line option '-marm'` — well, that doesn't say too much…
* Google brings me to [Go Issue #1880][16]. It is already fixed.
* Scrolling down, I notice [this comment][17].

> I meet this problem too,when compile go for arm,there are some problem
> `eg:# runtime/cgo`<br>
> `cc1: error: unrecognized command line option '-marm'`<br>
> when compiling finished,cgo.a for arm not creat.

And [the answer][18]:

> […] I believe you are cross compiling from non arm to arm, and your `gcc` is
> complaining because it only known hows to compile for x86/x64. The short answer to this
> is, when cross compiling for arm, pass `CGO_ENABLED=0` to disable cgo. If you need `cgo` on
> arm, you will have to compile on arm directly.

Damn. No CGO when cross compiling to ARM. This can't be right. This is all
because GCC doesn't speak ARM. We can fix that. We have Gentoo. We have
[`crossdev`][19]. We can compile a toolchain for ARM. Let's roll.

[davecheney]: https://twitter.com/davecheney
[peter_szilagyi]: https://twitter.com/peter_szilagyi
[mitchellh]: https://twitter.com/mitchellh
[deeeet]: https://twitter.com/deeeet

[1]: https://dave.cheney.net/2012/09/08/an-introduction-to-cross-compilation-with-go
[2]: https://dave.cheney.net/2013/07/09/an-introduction-to-cross-compilation-with-go-1-1
[3]: https://github.com/laher/goxc
[4]: https://github.com/laher/goxc/pull/54
[5]: https://github.com/karalabe/xgo
[6]: https://github.com/karalabe/xgo/issues/1
[7]: https://github.com/mitchellh/gox
[8]: https://registry.hub.docker.com/u/karalabe/xgo-latest
[9]: https://github.com/tcnksm/wercker-box-gox
[10]: https://github.com/tcnksm/wercker-step-gox
[11]: https://app.wercker.com/#applications/54391f7d84570fc622001320/tab/details
[12]: https://app.wercker.com/#applications/5438e27b2131b5070f0d38bc/tab/details
[13]: https://golang.org/doc/go1.4#gocmd
[14]: https://app.wercker.com/#applications/5492f12e6b3ba8733d986071/tab/details
[16]: https://golang.org/issue/1880
[17]: https://github.com/golang/go/issues/1880#issuecomment-66056700
[18]: https://github.com/golang/go/issues/1880#issuecomment-66056701
[19]: https://www.gentoo.org/proj/en/base/embedded/cross-development.xml


## Installing the ARM toolchain under Gentoo

This is relatively simple, but rather time consuming. I Install `crossdev` (in
fact, I already have it installed, since I had already built the AVR toolchain
for Arduino). Then I set up the toolchain. This will emerge `binutils`, `gcc`
and friends. 

```
sudo emerge crossdev
sudo crossdev -S -v -t armv6j-hardfloat-linux-gnueabi
```

It takes a few hours on my sistem, so I go grab a(nother) coffee.


## A note on i386

At some point, I tried to cross-compile for i386 as well, but since it wasn't
that important, I stopped after I hit the first few failures.

* The `tcnxsm/gox` build step allows me to specify multiple build targets, let's try i386.
* Apparently CGO for i386 needs `bits/predefs.h`. I need [`libc6-dev:i386`][15]. Welcome to Ubuntu multilib.
* At this point I just try `apt-get install -y build-essential:{i386,amd64}` and hope for the best.
* Bam! `build-essential:i386` conflicts with `build-essential:amd64`. Apparently multilib isn't fully supported in 12.04.
* Let's try to `apt-get install build-essential libc6-dev:i386`?
* Nope! Installing `libc6-dev:i386` removes `build-essential:amd64`, `g++:amd64` and `gcc:amd64` due to the conflicts.
* Screw that. I don't need i386. Let's just stick with ARM. One less problem.


[15]: https://packages.ubuntu.com/precise/libs/libc6-dev

Apparently, compiling `cgo` code to multiple targets on the same host requires
a true multilib system. One that has a multilib GCC. My Gentoo installation is
true multilib, but Ubuntu 12.04 doesn't seem to be. Without proper multilib
support, I need a separate container for each architecture — not so fun.

---


## Some useful links

* [Raspberri Pi - Gentoo Wiki](https://wiki.gentoo.org/wiki/Raspberry_Pi)
* [Experimenting with Go on Android](https://river.styx.org/ww/2011/03/godroid) (March 2011.)
