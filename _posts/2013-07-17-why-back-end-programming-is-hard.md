---
layout: post
title: Why back-end programming is hard
---

Or to put it in another way, why is font-end programming way easier.

I have a very simple theory about this matter. Because of the difference in
what people consider being a *product* in each case, the process of writing and
maintaining front-end code often becomes a lot different than writing a
back-end.

The way a manager would look at a client app is something along these lines:

* developer writes code in a programming language
* computer translates this code into a usable app
* the *app* is tested directly by testers
* if it works fine, the app gets distributed
* people then download and use it
* people generate feedback
* manager turns feedback into tasks
* developer works on tasks
* `goto` step 1

It is clear that the compiled, ready-to-use app is the product of the
developer's work and this is the only level where the programmer gets feedback
on this work.

Very often nobody will care:

* which frameworks or utilities are used (as long as licences permit it)
* whether the code complies with standards of the programming language
* whether the files themselves are clean (sane line endings, no mixed
  tabs/spaces, trailing whitespace, newline at end of files, etc.)
* how data structures and other internals get implemented
* whether the code passes [linters][1]
* about [McCabe's complexity][2]

[1]: https://en.wikipedia.org/wiki/Lint_(software)
[2]: https://en.wikipedia.org/wiki/Cyclomatic_complexity

…and in general, it is likely that (other than the programmer) nobody will even
look at any code.

On the other hand, when a back-end developer is designing a service or and API,
the product becomes the code itself, and not the service. Testers cannot
install the service on their smart phones to test it, but it is still important
to make sure it works well.

Even more important than for the client app: who cares if the app breaks for a
few users, but if something goes wrong in the back-end, the whole project is
doomed.

Requirements are now different:

* the *code* needs to be fully tested
* unit tests must cover all the logic
* integration tests have to make sure it all fits together
* add [continuous integration][3] so it doesn't break during development
* regular code reviews are suddenly very important
* [coding style][4] now matters

[3]: https://travis-ci.org/
[4]: /2013/07/17/coding-style/

And with that comes that now every framework, library, service or other
dependency used by the back-end has to be a proven requirement, or it doesn't
get used. Managers don't understand how the service works, in fact all they
know are the requirements, but they have to be able to [read the code][4] and
understand the entire test suite.

Commit messages now have to be well descriptive so non-devs can understand what
each commit is about. Pull requests have to contain summaries so they don't
have to read the commit messages. Milestones have to be maintained and wiki
pages must document every aspect of the code.

It must be noted that *I am not agaienst rigorously maintaining code quality*,
but people should know that it is quite different to write quality code than
code that will never even be read.
