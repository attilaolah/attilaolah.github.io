---
layout: post
title: Ebuilds for Pymorph & Mahotas
tags:
 - Python
 - Gentoo
 - Linux
 - programming
summary: "Two fine ebuilds for scientific computing in Python."
---

The following is an `ebuild` for `mahotas` version `0.6.4`. The `freeimage`
`USE` flag is required if you want support for reading images for files (you
probably do want that). `mahotas-0.6.4.ebuild`:

{% highlight bash %}
# Copyright 2011 Attila Oláh
# Distributed under the terms of the GNU General Public License v2

EAPI="3"
PYTHON_DEPEND="2"
SUPPORT_PYTHON_ABIS="1"
RESTRICT_PYTHON_ABIS="3.*"

inherit distutils


DESCRIPTION="Python Image Processing Library"
HOMEPAGE="http://luispedro.org/software/mahotas http://pypi.python.org/pypi/mahotas"
SRC_URI="http://pypi.python.org/packages/source/m/${PN}/${P}.tar.gz"

LICENSE="GPL"
SLOT="0"
KEYWORDS="~alpha ~amd64 ~arm ~hppa ~ia64 ~ppc ~ppc64 ~sparc ~x86 ~x86-fbsd"
IUSE="+freeimage"

DEPEND="dev-python/numpy
    sci-libs/scipy
    freeimage? ( media-libs/freeimage )"
RDEPEND="${DEPEND}"

python_enable_pyc
{% endhighlight %}

`freeimage` can be found in the `gamerlay` overlay. Add it using the command
`layman --add gamerlay`. Then you should have `freeimage`:

    aatiis@aiur ~ $ eix freeimage
    [I] media-libs/freeimage [1]
         Available versions:  (~)3.14.1 (~)3.15.0 {cxx doc}
         Installed versions:  3.15.0(09:16:12 PM 04/07/2011)(cxx -doc)
         Homepage:            http://freeimage.sourceforge.net/
         Description:         Image library supporting many formats

    [1] "gamerlay-stable" /var/lib/layman/gamerlay

The other ebuild is `pymorph-0.96.ebuild`:

{% highlight bash %}
# Copyright 2011 Attila Oláh
# Distributed under the terms of the GNU General Public License v2

EAPI="3"
PYTHON_DEPEND="2"
SUPPORT_PYTHON_ABIS="1"
RESTRICT_PYTHON_ABIS="3.*"

inherit distutils


DESCRIPTION="Python Image Morphology Toolbox"
HOMEPAGE="http://luispedro.org/software/pymorph http://pypi.python.org/pypi/pymorph"
SRC_URI="http://pypi.python.org/packages/source/p/${PN}/${P}.tar.gz"

LICENSE="GPL"
SLOT="0"
KEYWORDS="~alpha ~amd64 ~arm ~hppa ~ia64 ~ppc ~ppc64 ~sparc ~x86 ~x86-fbsd"

DEPEND="dev-python/numpy"
RDEPEND="${DEPEND}"

python_enable_pyc
{% endhighlight %}

Copy these to your local overlay, then you can install them on your system.
