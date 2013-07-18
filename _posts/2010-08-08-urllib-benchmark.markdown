---
layout: post
title: Benchmarking urllib2 vs. urllib3
tags:
- programming
source: https://gist.github.com/attilaolah/6025493
---

[`urllib3`][1] seems to be a long-abandoned project on [PyPI][2]. However, it
has some features (like re-using connections, aka [HTTP Keep-Alive][3]) that
are not present in the [Python 2][4] version of `urllib` and `urllib2`.
Another package that provides HTTP Keep-Alive is [httplib2][5].

[1]: http://pypi.python.org/pypi/urllib3
[2]: http://pypi.python.org/pypi/
[3]: http://en.wikipedia.org/wiki/Keepalive
[4]: http://www.python.org/
[5]: http://pypi.python.org/pypi/httplib2

## Benchmark results on a single host

Keep-Alive can significantly speed up your scraper or API client if you're
connecting to a single host, or a small set of hosts. This example shows the
times spent downloading random pages from a single host, using both `urllib2`
and `urllib3`:

urllib-benchmark-results.png

{:.center}
![urllib2 vs. urllib3 benchmark results][6]
urllib2 vs. urllib3 benchmark results

[6]: /images/2010/urllib-benchmark-results.png

## The benchmark script

Here's a script that will benchmark `urllib2` and `urllib3` for the domain
`theoatmeal.con`, and write out the results to a CSV files (easy to importy to
Google Docs Spreadsheet and generate a nice chart).

{% gist 6025493 %}

If you run it, it will also prent the result summary, something like this:

    Starting urllib2/urllib3 benchmark...
     * crawling: http://theoatmeal.com/
     * crawling: http://theoatmeal.com/comics/party_gorilla
     * crawling: http://theoatmeal.com/comics/slinky
     * crawling: http://theoatmeal.com/blog/floss
     ...
    Finishing benchmark, writing results to file `results.cvs`
    Total times:
     * urllib2: 183.593553543
     * urllib3: 95.9748189449

As you can see, `urllib3` appears to be twice as fast as `urllib2`.
