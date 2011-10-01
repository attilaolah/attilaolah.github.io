---
layout: post
title: Google App Engine Go url routes
tags:
 - Programming
 - App Engine
 - Go
summary: " Some time ago <a href=\"http://code.google.com/appengine/\">Google
App Engine</a> <a
href=\"http://code.google.com/appengine/docs/go/overview.html\">has added
support</a> for <a href=\"http://golang.org/\">the Go programming language</a>
. Application configuration for the Go runtime is similar to that of the Python
apps, with slight differences: at the time of writing this, there is no support
for specifying custom URL paths to execute different Go packages. Instead, all
this configuration is contained in the Go app itself, so the application
configuration looks something like this&hellip;"
---

Some time ago [Google App Engine](http://code.google.com/appengine/) [has added
support](http://code.google.com/appengine/docs/go/overview.html) for [the Go
programming language](http://golang.org/). Application configuration for the Go
runtime is similar to that of the Python apps, with slight differences: at the
time of writing this, there is no support for specifying custom URL paths to
execute different Go packages. Instead, all this configuration is contained in
the Go app itself, so the application configuration looks something like this:

{% highlight yaml %}
application: mygoapp
version: main
runtime: go
api_version: 1

handlers:
- url: /.*
  script: _go_app
{% endhighlight %}

Then, in the Go app one should add a custom handler for each path.

However, the Go [`http` package](http://golang.org/pkg/http/) does not support
regexes for paths. To add regex support, a simple package like this could help:


{% highlight go %}
package rxh

import (
    "http"
    "regexp"
)

type route struct {
    re *regexp.Regexp
    handler func(http.ResponseWriter, *http.Request, []string)
}

type RegexpHandler struct {
    routes []*route
}

func (h *RegexpHandler) AddRoute(re string,
handler func(http.ResponseWriter, *http.Request, []string)) {
    r := &route{regexp.MustCompile(re), handler}
    h.routes = append(h.routes, r)
}

func (h *RegexpHandler) ServeHTTP(rw http.ResponseWriter, r *http.Request) {
    for _, route := range h.routes {
        matches := route.re.FindStringSubmatch(r.RawURL)
        if matches != nil {
            route.handler(rw, r, matches)
            break
        }
    }
}
{% endhighlight %}

Then in the main application file, it can be used instead of the default handler:

{% highlight go %}
func init() {
    rxhandler := new(rxh.RegexpHandler)
    rxhandler.AddRoute("^/users/([0-9]+)$", users.UserHandler)
    rxhandler.AddRoute("^/posts/([0-9]+)$", posts.PostHandler)
    rxhandler.AddRoute("^/.*$", DefaultHandler)
    http.Handle("/", rxhandler)
}
{% endhighlight %}

Most of the above code is based on [this
conversation](http://permalink.gmane.org/gmane.comp.lang.go.general/28267) on
*comp.lang.go.general*.
