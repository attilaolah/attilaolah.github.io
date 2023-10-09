---
layout: post
title: To lint or not to lint
---

In general it is always a good idea to run static checkers through the code. It
catches some obvious mistakes and helps maintain a readable code base — at
least most of the time. But some checkers are quite aggressive, or some rules
may be too *outdated* or simply don't match the [preferred coding style][1] of
the programmer.

[1]: /2013/07/17/coding-style/

Nevertheless, here are my two cents on [linters][2] and other static checkers:

[2]: https://en.wikipedia.org/wiki/Lint_(software)

* JavaScript should *always be checked* ([JSLint][3]).
* jQuery can be [linted on its own][4], too.

[3]: https://www.jslint.com/
[4]: https://james.padolsey.com/javascript/jquery-lint/

A short snippet of in-line code is fine, but anything that resides in its own
.js file deserves a lint. If you *have to write* JavaScript
(*\*cough\**coffee*\*cough\**script*\*cough\**), you have to lint it. To keep
the bad parts out.

* [CoffeeScript][9] is usually fine, though it is not a bad idea to give
  [CoffeeLint][5] a run every once in a while.
* HTML: nah, why bother (there's the [validator][6] though)
* CSS: don't write CSS, write [LESS][10] or [SASS][11]/[Compass][12]

[5]: https://www.coffeelint.org/
[6]: https://validator.w3.org/
[9]: https://coffeescript.org/
[10]: https://lesscss.org/
[11]: https://sass-lang.com/
[12]: https://compass-style.org/

* [Go][7]: *always* run `gofmt` and `go vet`!

[7]: https://golang.org/

* Python: well, that's a tricky one…

* [`pyflakes`][8] is a must, it will catch not just errors, but things like
  unused imports and locals, re-defined variables and such.
* [`pep8`][13] should be run too, but you may want to disable some checks if
  you're like me (I don't quite agree with the visual/hanging indent rules and
  sometimes I don't want to try and fit in &lt;79 char lines)
* [`autopep8`][14] can be useful sometimes, though it is best to not let things
  out of hand so much to need it in the first place
* [`flake8`][15] is a handy combination of `pyflakes` and `pep8`
* [`pylint`][16] is useful but *very strict*; it will force you to split
  functions but won't let you use too many function arguments; but at least it
  will *rate your code* on a 1-10 scale.


[8]: https://pypi.python.org/pypi/pyflakes
[13]: https://pypi.python.org/pypi/pep8
[14]: https://pypi.python.org/pypi/autopep8
[15]: https://pypi.python.org/pypi/flake8
[16]: https://pypi.python.org/pypi/pylint

For less-strict checkers like `gofmt` and `pyflakes`, it is a good idea to
install them as commit hooks. There are also *[vim][17] plug-ins* for most of
these, so you see the problems right as you edit the file (or when saving). The
advantage of of the static regex-based checkers is that they are fast enough to
run on every change you make to the buffer.

[17]: https://www.vim.org/

## Update

For Go there is also [`golint`][17], which *can* be useful, for example it
detects `for x, _ := range` and reports to drop the `_`; However, it mostly
complains about missing comments :) And there's also [this][18].


[17]: https://github.com/golang/lint
[18]: https://github.com/golang/lint/issues/17
