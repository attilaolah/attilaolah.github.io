---
layout: post
title: Benchmarking urllib2 vs. urllib3
tags:
 - Python
 - programming
summary: Benchmarking results for <code>urllib2</code> vs. <code>urllib3</code>.
---

[``urllib3``](http://pypi.python.org/pypi/urllib3) seems to be a long-abandoned
project on [PyPI](http://pypi.python.org/pypi/). However, it has some features
(like re-using connections, aka [HTTP
Keep-Alive](http://en.wikipedia.org/wiki/Keepalive)) that are not present in
the [Python 2](http://www.python.org/) version of ``urllib`` and ``urllib2``.
Another package that provides HTTP Keep-Alive is
[httplib2](http://pypi.python.org/pypi/httplib2).


Benchmark results on a single host
----------------------------------

Keep-Alive can significantly speed up your scraper or API client if you're
connecting to a single host, or a small set of hosts. This example shows the
times spent downloading random pages from a single host, using both ``urllib2``
and ``urllib3``:

<div class="center">
  <img src="/media/images/random/urllib-benchmark-results.png" alt="urllib2 vs. urllib3 benchmark results" class="white" />
</div>
