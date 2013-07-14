---
layout: post
title: irssi and camper_van
tags:
- programming
source: https://gist.github.com/aatiis/4444697
---

Recently I've come across a ruby irc server called [`camper_van`][1]. What it
does is pretty simple: it communicates with [Campfire][2] while acting as an
[IRC server][3]. That, combined with [irssi][4] makes it much more fun to use
Campfire for [work][5].

[1]: https://github.com/aniero/camper_van
[2]: https://campfirenow.com/
[3]: https://en.wikipedia.org/wiki/Internet_Relay_Chat
[4]: http://www.irssi.org/
[5]: http://www.vemble.com/

The following is a simple script that starts the server (if not already
running) and then opens up *irssi* in a new *gnome-terminal* session.

{% gist 4444697 campervan %}

The second file is an example *irssi* config file (merge it with
`~/.irssi/config`).

{% gist 4444697 irssi-config.pl %}
