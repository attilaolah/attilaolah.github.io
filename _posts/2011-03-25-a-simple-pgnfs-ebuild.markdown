---
layout: post
title: A simple pGNFS ebuild
tags:
 - Gentoo
 - Linux
 - mathematics
summary: A very simple ebuild that builds Per Leslie Jensen's pGNFS on Gento.
---

[`pGNFS`](http://www.pgnfs.org/) is an implementation of the [*General Number
Field Sieve*](http://en.wikipedia.org/wiki/General_number_field_sieve) written
in C++. pGnfs is short for pleslie's GNFS implementation.

{% highlight bash %}
# Copyright 2011 Attila Olah
# Distributed under the terms of the GNU General Public License v2

DESCRIPTION="An implementation of the General Number Field Sieve written in C++"
HOMEPAGE="http://www.pgnfs.org/"
SRC_URI="http://www.pgnfs.org/SRC/${P}.tar.gz"

LICENSE="GPL-2"
SLOT="0"
KEYWORDS="~amd64 ~x86"
IUSE=""

RDEPEND="sci-mathematics/ginac
	dev-libs/ntl"
DEPEND="${RDEPEND}"
{% endhighlight %}

You can also [download the ebuild here](/downloads/ebuild/pgnfs-0.3.ebuild).
