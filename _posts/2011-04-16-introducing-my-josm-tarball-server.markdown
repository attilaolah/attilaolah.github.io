---
layout: post
title: Introducing my JOSM tarball server
tags:
 - Gentoo
 - Linux
summary: "I've set up a script for publishing snapshots of the JOSM trunk."
---

<div class="img center right">
  <a href="http://josm.openstreetmap.de/"><img src="/media/images/random/josm-logo.png" alt="JOSM logo"/></a>
  <br/>
  <em><a href="http://josm.openstreetmap.de/">Java OpenStreetMap Editor</a></em>
</div>

Those of you who want to have the latest bleeding-edge version of `JOSM` (The
[Java OpenStreetMap Editor](http://josm.openstreetmap.de/)) installed on your
[Gentoo](http://www.gentoo.org/) systems (or any other system capable of
building Java apps from source), the latest source tarball can be downloaded
from [josm.aiur.co.rs](http://josm.aiur.co.rs/), a virtual server that I set up
on [my company](http://aiur.co.rs/)'s VPS. An hourly `cron` job is responsible
for checking out the latest revision over `SVN` and packaging it up.

<div class="img center clear">
  <a href="http://josm.aiur.co.rs/"><img src="/media/images/random/josm-tarball-server.png" alt="Apache server serving the JOSM tarballs"/></a>
  <br/>
  <em><code>Apache</code> server with the <code>JOSM</code> tarballs</em>
</div>

An easy way of installing in Gentoo is using an ebuild like this:

{% highlight bash %}
# Copyright 1999-2011 Gentoo Foundation
# Copyright 2011 Attila Oláh
# Distributed under the terms of the GNU General Public License v2

EAPI="3"

inherit eutils java-pkg-2 java-ant-2

DESCRIPTION="Java-based editor for the OpenStreetMap project"
HOMEPAGE="http://josm.openstreetmap.de/"
SRC_URI="http://josm.aiur.co.rs/${P}.tar.xz"
LICENSE="GPL-2"
SLOT="0"

KEYWORDS="~amd64 ~x86"

DEPEND=">=virtual/jdk-1.6"
RDEPEND=">=virtual/jre-1.6"

S="${WORKDIR}/${PN}"

IUSE=""

src_compile() {
	JAVA_ANT_ENCODING=UTF-8
	eant dist
}

src_install() {
	java-pkg_newjar "dist/${PN}-custom.jar" || die "java-pkg_newjar failed"
	java-pkg_dolauncher "${PN}" --jar "${PN}.jar" || die "java-pkg_dolauncher failed"

	newicon images/logo.png josm.png || die "newicon failed"
	make_desktop_entry "${PN}" "Java OpenStreetMap Editor" josm "Science;Geoscience"
}
{% endhighlight %}

Just name the file `josm-4024.ebuild` (replacing `4024` with the version you
want to install) and put it in your local overlay. To update, just rename the
file and recreate the manifests.
