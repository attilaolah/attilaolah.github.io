---
layout: post
title: HTTP DELETE and Sencha Touch
tags:
- programming
source: https://gist.github.com/aatiis/3251348
---

I've [recently][1] [learned][2] that [App Engine][3] chokes on HTTP DELETE
requests that contain a request body. While developing locally, everything
works just fine, but when deployed, the production server drops these
"malformed" requests with a "400 Bad Request" status line, so they don't even
reach the application in the [WSGI pipeline][5].

[1]: http://stackoverflow.com/q/2539394/252239
[2]: http://stackoverflow.com/a/3375122/252239
[3]: https://developers.google.com/appengine/
[5]: http://en.wikipedia.org/wiki/Web_Server_Gateway_Interface


After reading [the specs][4] I couldn't find where it would state that a body
is not allowed for DELETE, it does state however that the [request URI][6]
should be enough to identify the resource and that no extra parameters should
be required (so I guess many servers just ignore the body there).

[4]: http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9.7
[6]: http://www.w3.org/Protocols/rfc2616/rfc2616-sec5.html#sec5.1.2

Anyway, since App Engine is so strict about requests (which is a good thing
anyway), it would be cool if [Sencha Touch 2][7] could be somehow forced not to
send an XHR payload when deleting a moel instance using the [REST proxy][8].
There seem to be no config option to prevent a request body, and when I [asked
in the forum][9], I got no decent reply.

[7]: http://www.sencha.com/products/touch
[8]: http://docs.sencha.com/touch/2-0/#!/api/Ext.data.proxy.Rest
[9]: http://www.sencha.com/forum/showthread.php?233537

After reading the source, I came up with an [override][10] that fixes this
behaviour. However, since overrides are now deprecated in favor of
[Ext.define][11], the following gist now includes a correction to the override.

[10]: http://docs.sencha.com/touch/2-0/#!/api/Ext-method-override
[11]: http://docs.sencha.com/touch/2-0/#!/api/Ext-method-define

{% gist 3251348 ext-define.coffee %}
