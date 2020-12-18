---
layout: post
title: Quick security checklist
tags:
- programming
- security
---

This is intended to be a short list of things to check before you go publish a
website or web app (or really, anything that interacts with a browser). It
starts with the easy things and continues with less obvious stuff. It is in no
way complete.

## Use `HttpOnly` cookies

* Pretty much eliminates [XSS][1]-based session hijacking ✓
* Easy to set up on most servers ✓
* Does not completely eliminate XSS attacks ✗

[1]: //en.wikipedia.org/wiki/Cross-site_scripting

## Always use a [CSRF][2] token

* Pretty much eliminates CSRF ✓
* Many frameworks support it out of the box ✓
* No use against XSS ✗

[2]: //en.wikipedia.org/wiki/Cross-site_request_forgery

## Always, [**ALWAYS**][3] escape *all* user input

* Most decent template engines will do it automatically ✓
* Eliminates XSS attacks ✓
* People tend to forget it ✗

I cannot stress enough this last item. It doesn't matter that you use a CSRF
token. The XSS attack vector will have access to it. It also doesn't matter
that you use an `HttpOnly` cookie. While an attacker cannot steal the cookie,
they can still wreak havoc. They can do almost everything the user can do.

Sometimes it may be less obvious what "user input" means. Recently I've found
an XSS vulnerability in a website because they did not escape the file names of
user-uploaded images stored in an Amazon S3 bucket. That data is coming from
the database, so it may seem unnecessary to sanitise it. However, as long as
the user can put that data in the database, it counts as user input.

[3]: //xkcd.com/327

## Use HTTPS

* <del>Trivial</del> <ins>Might be tricky<ins> to set up
* Costs $$$ (but then what doesn't)

Handling sensitive user data (or any user data for that matter; go ask your
users which part of their data *isn't sensitive*)? HTTPS is the way to serve
that. Or really, anything you can. You lose some benefits, like caching by
intermediate proxies, but most people are trying to avoid those caches anyway,
not leverage them.

I've heard a number of arguments against HTTPS, and they all sucked. You should
just use a secure connection, period.

## Give out as little permission as possible

When using a third party service like Amazon S3, if you're generating *upload
tickets* for the users (temporary credentials allowing them to upload data to
S3), you want to restrict that data as much as possible.

* Uploading images or videos? Restrict the `Content-Type` header. You don't
  want someone to upload executable files cause download/run boxes to show up.
* Jail each user/group/organisation to their own bucket/directory.

Allow a user write access in `/avatars/{userid}` to upload
`/avatars/{userid}/128.jpg`. Don't grant them access to `/avatars` and allow
them write access to `/avatars/*.jpg`.

## Hide as much of the data as possible

This is not to be confused by hiding the infrastructure of your servers or
client applications. It is OK if people know that you API runs on [Heroku][4]
or some other platform. It is OK if they know that you use a certain
programming language or framework or library.

However, it is not good to let people find out more and more information by
providing some. Don't show a user's phone number for anyone who knows their
email (or vice versa). When rejecting a failed login or a password reset
request, don't tell whether you have a user with such username or email in your
database.

I've seen people focusing on obfuscating code and trying to hide logic in the
client, thinking that nobody will figure out that you can access a resource
without proper authorisation. Somebody will. And you won't be prepared.

[4]: //www.heroku.com

## Extra authentication for important changes

Don't forget that despite all the security measures you employ and force on
your users, often the easiest way to breach their account is to just steal your
phone or tablet for a few minutes. Don't allow email address or password
changes without asking for a password (or [making sure][5] you have the right
person on the other end of the wire).

[5]: //github.com/blog/1513-introducing-github-sudo-mode

## Stop doing stupid things

* Stop adding stupid password length limits (you're going to hash it anyway)
* Stop telling me my password is not secure enough because it only contains 28
  random letters, but no digits
* And lastly, [stop asking me][6] to use upper case letters,
  lower case letters, at least one digit, two punctuation marks and one [beauty
  mark][7] in my password.

[6]: //xkcd.com/936
[7]: //en.wikipedia.org/wiki/My_Little_Pony:_Friendship_Is_Magic
