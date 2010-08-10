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

The benchmark script
--------------------

Here's a script that will benchmark ``urllib2`` and ``urllib3`` for the domain
``theoatmeal.con``, and write out the results to a CSV files (easy to importy
to Google Docs Spreadsheet and generate a nice chart). You can also download
the script from [here](/downloads/python/urllib-benchmark.py).

    import csv
    import random
    import re
    import time
    import urllib2
    import urllib3


    any_protocol = re.compile('^[^#^\\?^/]+?:')

    http_link = re.compile(r'^https?://', re.I)
    http_naked = re.compile(r'^https?://[^/]+$', re.I)
    http_parts = re.compile(r'(^https?://[^/]+)(.*)$', re.I)
    http_bad_url = re.compile('https?://[^/]+[#\\?]', re.I)
    http_bad_url_split = re.compile('([#\\?])')
    http_dots = re.compile(r'/[^/]+/\.\./')
    http_dots_start = re.compile(r'^/\.\./')
    http_dots_end = re.compile(r'(/\.\./?)$')
    http_dot = re.compile(r'/\./')
    http_dot_end = re.compile(r'(/\./?)$')
    http_slashes = re.compile(r'/+')

    html_ignore = re.compile(
        r'(<script.*?>.+?</script>)|(<!--.+?-->)',
        re.I + re.S + re.M,
    )

    rx_href = re.compile("""
        href = (
          ("(.*?)")         # double quotes
          |
          ('(.*?)')         # single quotes
          |
          ([^ >]*)          # no quotes
        )
    """, re.VERBOSE + re.IGNORECASE)

    rx_js = re.compile("""
        (
          location (        # [window.]location
            |
            \.href          # [.href]
            |
            \.pathname      # [.pathname]
          )
        )
        \W*
        =
        \W*
        (
          ("(.*?)")         # double quotes
          |
          ('(.*?)')         # single quotes
        )
    """, re.VERBOSE + re.MULTILINE + re.DOTALL)

    rx_frame = re.compile(r'(<frame .*?src=.*?>)', re.I + re.S + re.M)
    rx_frame_url = re.compile("""
        ^
        <frame
        .*?
        src = (
          ("(.*?)")         # double quotes
          |
          ('(.*?)')         # single quotes
          |
          ([^ >]*)          # no quotes
        )
        .*?
        >
        $
    """, re.IGNORECASE + re.MULTILINE + re.DOTALL + re.VERBOSE)

    rx_meta = re.compile(
        r'(<meta [^>]*http-equiv=[\'"]refresh[\'"].*?>)',
        re.I + re.S + re.M,
    )
    rx_meta_url = re.compile(r"""
        ^
        <meta
        .*?
        content
        =
        ['"]
        ([\d]+;\s*url=)?(.*?)
        ['"]
        .*?
        >
        $
    """, re.IGNORECASE + re.MULTILINE + re.DOTALL + re.VERBOSE)


    class URL(object):
        """Handle various URL-based tasks."""

        pool = None

        @staticmethod
        def canonize_url(crawled_url, extracted_link, strip_hash=True, **kw):
            """Canonize URLs for """

            ## Part 1: filter out unsopported links

            http_matched = False  # catch match result for later
            if any_protocol.match(extracted_link):
                if not http_link.match(extracted_link):
                    return None
                http_matched = True  # change match result

            ## Part 2: construct an *absolute* URL

            # Check if the url is absolute:
            if http_matched:  # use the cached result instead of matching again
                link = extracted_link

            # Check for in-host absolute paths:
            elif extracted_link.startswith('/'):
                # assume crawled_url starts with "http[s]://"
                start = http_parts.match(crawled_url).group(1)
                link = start + extracted_link

            # Handle in-page (hash-only) URLs
            elif extracted_link.startswith('#'):
                link = crawled_url + extracted_link

            # For relative urls, just append to the current path
            else:
                # assume crawled_url starts with "http[s]://"
                if http_naked.match(crawled_url):
                    start = crawled_url
                else:
                    start = crawled_url.rsplit('/', 1)[0]
                link = start + '/' + extracted_link

            ## Part 3: try to fix some bad URLs

            if http_bad_url.match(link):
                # add a slash after the domain
                link = re.sub(http_bad_url_split, '/\\1', link, 1)

            ## Part 4: more canonization

            # hppt://foo.br/bar/baz/.[/] -> http://foo.br/bar/baz/
            while http_dot_end.search(link):
                link = re.sub(http_dot_end, '/', link)

            # http://foo.br/bar/baz/..[/] -> http://foo.br/bar/
            while http_dots_end.search(link):
                link = re.sub(http_dots_end, '/', link)

            # http://foo.br/bar/../baz -> http://foo.br/baz
            host, path = http_parts.match(link).groups()

            # Lower-case the host
            host = host.lower()

            # check the domain
            if kw.get('domain_ends_with'):
                if not host.split('//')[1].endswith(kw['domain'].lower()):
                    # Oops, the url goes to a subdomain!
                    return None
            if kw.get('domain'):
                if host.split('//')[1] != kw['domain'].lower():
                    # Oops, the url goes outside the domain!
                    return None

            while http_dots.search(path):
                path = re.sub(http_dots, '/', path)

            # http://foo.br/../bar -> http://foo.br/bar
            while http_dots_start.search(path):
                path = re.sub(http_dots_start, '/', path)

            # Strip multiple slashes and dot-slashes
            path = re.sub(http_dot, '/', path)
            path = re.sub(http_slashes, '/', path)

            # http://foo.br -> http://foo.br/
            path = path or '/'

            # Combine the host and path again
            link = host + path

            ## Part 5: stripping the hash

            # Strip the hash?
            return not strip_hash and link or link.split('#', 1)[0]

        @staticmethod
        def extract_links(html):
            """Extract various links."""

            for link in rx_js.findall(html):
                yield link[-3] or link[-1] or ''

            html = html_ignore.sub('', html)

            for frame in rx_frame.findall(html):
                groups = rx_frame_url.match(frame).groups()
                yield groups[2] or groups[4] or groups[5] or ''

            for meta in rx_meta.findall(html):
                yield rx_meta_url.match(meta).groups()[1]

            for link in rx_href.findall(html):
                yield link[2] or link[4] or link[5] or ''

        def download_url(self, url, urllib):
            """Download the URL."""

            try:
                if urllib == urllib2:
                    request = urllib2.Request(url)
                    response = urllib2.urlopen(request)

                    return response.read()

            except urllib2.HTTPError:
                return ''

            self.pool = self.pool or urllib3.connection_from_url(url)

            return self.pool.get_url(url).data


    if __name__ == '__main__':
        # Do some testing

        crawled_url, domain = 'http://theoatmeal.com/', 'theoatmeal.com'

        queue, visited = set(), set()

        url = URL()

        print 'Starting urllib2/urllib3 benchmark...'

        urllibs = [urllib2, urllib3]

        benchmark = []

        csv_file = open('results.csv', 'w')
        writer = csv.writer(csv_file)

        try:
            while True:

                print ' * crawling:',
                print crawled_url

                random.shuffle(urllibs)

                times = [0, 0]

                for lib in urllibs:
                    start = time.time()
                    html = url.download_url(crawled_url, urllib=lib)
                    duration = time.time() - start
                    times[lib is urllib3 and 1 or 0] = duration

                benchmark.append(times)

                writer.writerow(times)
                csv_file.flush()

                visited.add(crawled_url)

                extracted_links = [x for x in url.extract_links(html)]
                valid_links = [url.canonize_url(
                    crawled_url,
                    link,
                    domain=domain,
                ) for link in extracted_links]
                valid_links = set(filter(None, valid_links))

                queue.update(valid_links)

                empty = False

                try:
                    next_link = queue.pop()
                except KeyError:
                    break

                while next_link in visited:
                    try:
                        next_link = queue.pop()
                    except KeyError:
                        empty = True
                        break

                if empty:
                    break

                crawled_url = next_link

        except KeyboardInterrupt:
            pass
        finally:
            csv_file.close()
            print
            print 'Finishing benchmark, writing results to file `results.cvs`'
            print 'Total times:'
            print ' * urllib2:',
            print sum(x[0] for x in benchmark)
            print ' * urllib3:',
            print sum(x[1] for x in benchmark)

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

As you can see, ``urllib3`` appears to be twice as fast as ``urllib2``.
