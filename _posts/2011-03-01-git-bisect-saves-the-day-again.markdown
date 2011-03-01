---
layout: post
title: Git bisect saves the day, again
tags:
 - Git
 - Linux
summary: "<code>git-bisect(1)</code> makes finding buggy commits easy & fun."
---

I rarely use [`git
bisect`](http://www.kernel.org/pub/software/scm/git/docs/git-bisect.html)`, but
when I do, it always amazes me how useful (and powerful) it is. And most of
all, how simple. When I started using
[`git`](http://www.kernel.org/pub/software/scm/git/docs/git.html), I haven't
used `git bisect` for quite long, mostly because it seemed a bit scary
- too much magic in there.

But it's actually as simple as telling `git` which revision of the code is
right (`git bisect good`) and which one is wrong (`git bisect bad`). If the bug
can be found with a test run (or, for example, a
[`grep`](http://en.wikipedia.org/wiki/Grep)), `git bisect` can do some extra
magic of dotormining which revision is right or wrong for us. But in many cases
it's just easy to check by actially looking at the source code, so there's no
need to automate things that much.

Using `git bisect` is fairly simple. Start it like this:

{% highlight bash %}
$ git bisect start
{% endhighlight %}

And then check out an older revision, and start looking at the source code.
Once the buggy commit is identified, it's pretty easy to revert it.

So my two cents is that dare to use `git bisect` whenever there's a chance. It
will save you some time from wondering pointlessly between commits.
