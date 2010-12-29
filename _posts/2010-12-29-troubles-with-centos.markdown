---
layout: post
title: Troubles with CentOS
tags:
 - Administration
 - Linux
 - CentOS
summary: My experiences with CentOS (not very positive).
---

At our company, we host our apps on [Google App
Engine](http://code.google.com/appengine/). Thus, we need no other kinds of
servers. This brought me to an unpleasant situation: where should I run [my
favorite IRC client](http://irssi.org/) now? Where do I put my
[buildmaster](http://trac.buildbot.net/)? Where do I put my
[ICMPTX](http://thomer.com/icmptx/)/[NSTX](http://thomer.com/howtos/nstx.html)
servers (although now obsolete, I'll have to have a look at
[iodine](http://code.kryo.se/iodine/))?

So I headed over to [lowendbox.com](http://www.lowendbox.com/) to look for some
really cheap solutions. I wouldn't run any production servers on the VPS. I
don't need anything fancy. I was looking for an option with unmetered bandwith
and as much storage as possible. This has lead me to a German VPS reseller whom
I will not disclose. 

I was happy to see that I can chose [Gentoo](http://www.gentoo.org/) for the
OS. However, there is a bug with the website: Gentoo could not be installed,
instead, I got [CentOS 5](http://www.centos.org/). Moreover, I didn't have
access to the control ponel to reinstall the OS for a whole day, so I figured
I'll experiment with CentOS.

<div class="center">
  <a href="/media/images/random/centos-5.jpg">
    <img src="/media/images/random/centos-5.jpg"/>
  </a>
</div>

I can tell one thing for sure: CentOS is not for me.

One major poblem is Python 2.4. What the hell? The other problem, I was not
able to find the software I needed in the official repos.

So I went with a hacky approach and installed an [additional
hierarchy](http://en.wikipedia.org/wiki/Filesystem_Hierarchy_Standard#Directory_structure)
at `~/local`. Here are some of the ad-hoc install scripts I put together.

* `install-curl.sh`:

{% highlight bash %}
NAME="curl"
VER="7.21.3"
DIR="$NAME-$VER"
FILE="$DIR.tar.bz2"

LOCAL="$HOME/local"
SRC="$LOCAL/src/$NAME"

mkdir -p $SRC && cd $SRC

if [ -f $FILE ]; then
	echo "$FILE already downloaded."
else
	wget http://curl.haxx.se/download/$FILE
fi

rm -rf $DIR
tar xf $FILE
cd $DIR

./configure --prefix=$LOCAL && make && make install
{% endhighlight %}

* `install-gettext.sh`:

{% highlight bash %}
NAME="gettext"
VER="0.18"
DIR="$NAME-$VER"
FILE="$DIR.tar.gz"

LOCAL="$HOME/local"
SRC="$LOCAL/src/$NAME"

mkdir -p $SRC && cd $SRC

if [ -f $FILE ]; then
	echo "$FILE already downloaded."
else
	wget http://ftp.gnu.org/gnu/$NAME/$FILE
fi

rm -rf $DIR
tar xf $FILE
cd $DIR

./configure --prefix=$LOCAL && make && make install
{% endhighlight %}

* `install-glib.sh`:

{% highlight bash %}
NAME="glib"
VER="2.27.4"
DIR="$NAME-$VER"
FILE="$DIR.tar.bz2"

LOCAL="$HOME/local"
SRC="$LOCAL/src/$NAME"

mkdir -p $SRC && cd $SRC

if [ -f $FILE ]; then
	echo "$FILE already downloaded."
else
	wget ftp://ftp.gtk.org/pub/$NAME/2.27/$FILE
fi

rm -rf $DIR
tar xf $FILE
cd $DIR

./configure --prefix=$LOCAL && make && make install
{% endhighlight %}

* `install-irssi.sh`:

{% highlight bash %}
NAME="irssi"
VER="0.8.15"
DIR="$NAME-$VER"
FILE="$DIR.tar.bz2"

LOCAL="$HOME/local"
SRC="$LOCAL/src/$NAME"

mkdir -p $SRC && cd $SRC

if [ -f $FILE ]; then
	echo "$FILE already downloaded."
else
	wget http://irssi.org/files/$FILE
fi

rm -rf $DIR
tar xf $FILE
cd $DIR

./configure --prefix=$LOCAL && make && make install
{% endhighlight %}

* `install-libpar2.sh`:

{% highlight bash %}
NAME="libpar2"
VER="0.2"
DIR="$NAME-$VER"
FILE="$DIR.tar.gz"

LOCAL="$HOME/local"
SRC="$LOCAL/src/$NAME"

mkdir -p $SRC && cd $SRC

if [ -f $FILE ]; then
	echo "$FILE already downloaded."
else
	wget http://sourceforge.net/projects/parchive/files/$NAME/$VER/$FILE/download
fi

rm -rf $DIR
tar xf $FILE
cd $DIR

export libxml2_CFLAGS="-I/usr/include/libxml2"
export libxml2_LIBS="-L/usr/lib64 -lxml2  -lz  -lm"
export SIGC_CFLAGS="-I$LOCAL/include/sigc++-2.0  -I$LOCAL/lib/sigc++-2.0/include"
export SIGC_LIBS="-L$LOCAL/lib -lsigc-2.0"
./configure --prefix=$LOCAL && make && make install
{% endhighlight %}

* `install-libsigc++.sh`:

{% highlight bash %}
NAME="libsigc++"
VER="2.2.8"
DIR="$NAME-$VER"
FILE="$DIR.tar.bz2"

LOCAL="$HOME/local"
SRC="$LOCAL/src/$NAME"

mkdir -p $SRC && cd $SRC

if [ -f $FILE ]; then
	echo "$FILE already downloaded."
else
	wget http://ftp.gnome.org/pub/GNOME/sources/$NAME/2.2/$FILE
fi

rm -rf $DIR
tar xf $FILE
cd $DIR

export OPENSSL_CFLAGS="-I$LOCAL/include"
export OPENSSL_LIBS="-L$LOCAL/lib64 -lssl -lcrypto -ldl"
./configure --prefix=$LOCAL && make && make install
{% endhighlight %}

* `install-libtorrent.sh`:

{% highlight bash %}
NAME="libtorrent"
VER="0.12.7"
DIR="$NAME-$VER"
FILE="$DIR.tar.gz"

LOCAL="$HOME/local"
SRC="$LOCAL/src/$NAME"

mkdir -p $SRC && cd $SRC

if [ -f $FILE ]; then
	echo "$FILE already downloaded."
else
	wget http://libtorrent.rakshasa.no/downloads/$FILE
fi

rm -rf $DIR
tar xf $FILE
cd $DIR

export OPENSSL_CFLAGS="-I$LOCAL/include"
export OPENSSL_LIBS="-L$LOCAL/lib64 -lssl -lcrypto -ldl"
./configure --prefix=$LOCAL && make && make install
{% endhighlight %}

* `install-mktorrent.sh`:

{% highlight bash %}
NAME="mktorrent"
VER="1.0"
DIR="$NAME-$VER"
FILE="$DIR.tar.gz"

LOCAL="$HOME/local"
SRC="$LOCAL/src/$NAME"

mkdir -p $SRC && cd $SRC

if [ -f $FILE ]; then
	echo "$FILE already downloaded."
else
	wget http://downloads.sourceforge.net/$NAME/$FILE
fi

rm -rf $DIR
tar xf $FILE
cd $DIR

make && mkdir -p $LOCAL/bin && cp $NAME $LOCAL/bin
{% endhighlight %}

* `install-nzbget.sh`:

{% highlight bash %}
NAME="nzbget"
VER="0.7.0"
DIR="$NAME-$VER"
FILE="$DIR.tar.gz"

LOCAL="$HOME/local"
SRC="$LOCAL/src/$NAME"

mkdir -p $SRC && cd $SRC

if [ -f $FILE ]; then
	echo "$FILE already downloaded."
else
	wget http://sourceforge.net/projects/$NAME/files/$NAME-stable/$VER/$FILE/download
fi

rm -rf $DIR
tar xf $FILE
cd $DIR

export libxml2_CFLAGS="-I/usr/include/libxml2"
export libxml2_LIBS="-L/usr/lib64 -lxml2  -lz  -lm"
export libsigc_CFLAGS="-I$LOCAL/include/sigc++-2.0  -I$LOCAL/lib/sigc++-2.0/include"
export libsigc_LIBS="-L$LOCAL/lib -lsigc-2.0"
# If TLS.cpp won't compile, disable the extras:
#./configure --prefix=$LOCAL --disable-parcheck --disable-tls && make && make install
./configure --prefix=$LOCAL --with-libpar2-includes=$LOCAL/include \
                            --with-libpar2-libraries=$LOCAL/lib \
                            --with-openssl-includes=$LOCAL/include \
                            --with-openssl-libraries=$LOCAL/lib \
            && make && make install
{% endhighlight %}

* `install-openssl.sh`:

{% highlight bash %}
NAME="openssl"
VER="1.0.0c"
DIR="$NAME-$VER"
FILE="$DIR.tar.gz"

LOCAL="$HOME/local"
SRC="$LOCAL/src/$NAME"

mkdir -p $SRC && cd $SRC

if [ -f $FILE ]; then
	echo "$FILE already downloaded."
else
	wget http://www.openssl.org/source/$FILE
fi

rm -rf $DIR
tar xf $FILE
cd $DIR

./config --prefix=$LOCAL && make && make install
{% endhighlight %}

* `install-pkg-config.sh`:

{% highlight bash %}
NAME="pkg-config"
VER="0.25"
DIR="$NAME-$VER"
FILE="$DIR.tar.gz"

LOCAL="$HOME/local"
SRC="$LOCAL/src/$NAME"

mkdir -p $SRC && cd $SRC

if [ -f $FILE ]; then
	echo "$FILE already downloaded."
else
	wget http://pkg-config.freedesktop.org/releases/$FILE
fi

rm -rf $DIR
tar xf $FILE
cd $DIR

./configure --prefix=$LOCAL && make && make install
{% endhighlight %}

* `install-rtorrent.sh`:

{% highlight bash %}
NAME="rtorrent"
VER="0.8.7"
DIR="$NAME-$VER"
FILE="$DIR.tar.gz"

LOCAL="$HOME/local"
SRC="$LOCAL/src/$NAME"

mkdir -p $SRC && cd $SRC

if [ -f $FILE ]; then
        echo "$FILE already downloaded."
else
        wget http://libtorrent.rakshasa.no/downloads/$FILE
fi

rm -rf $DIR
tar xf $FILE
cd $DIR

export libsigc_CFLAGS="-I$LOCAL/include/sigc++-2.0  -I$LOCAL/lib/sigc++-2.0/include"
export libsigc_LIBS="-L$LOCAL/lib -lsigc-2.0"
export libcurl_CFLAGS="-I$LOCAL/include"
export libcurl_LIBS="-L$LOCAL/lib -lcurl"
export libtorrent_CFLAGS="-I$LOCAL/include"
export libtorrent_LIBS="-L$LOCAL/lib -ltorrent"
export LD_RUN_PATH="$LOCAL/lib"
./configure --prefix=$LOCAL && make && make install
{% endhighlight %}

Note on the installed files
---------------------------

Since I have an unmetered plan, and of course I don't use up all my bandwith, I
figured I'll donate the rest by seeding some open-source torrents. Hence
[libterront and rtorrent](http://libtorrent.rakshasa.no/).

I also needed to grab some files from the
[Usenet](http://en.wikipedia.org/wiki/Usenet) and then transfer them to my
laptop, hence [nzbget](http://nzbget.sourceforge.net/Main_Page) and
[mktorrent](http://mktorrent.sourceforge.net/).

I needed to install a bunch of [Perl](http://www.perl.org/) libraries too, for
SASL authentication with [irssi](http://irssi.org/).
