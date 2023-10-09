---
layout: post
title: Coding style
---

Today's rant is about [coding style][1], readability and code review.

[1]: https://en.wikipedia.org/wiki/Programming_style#Elements_of_good_style

It happened to me more than once that I wrote some code that looked more or
less like this (simplified to avoid disclosure):

{% highlight python linenos %}
class Author(User):
    """Book author."""

    def reviews(self, limit=None):
        """Reviews by the author.

        Usage:

            >>> for review in book.author.reviews(5):
            ...     print(review)

        """
        # query reviews from database…
        return reviews
{% endhighlight %}

But after some code review it mutated into this beast:

{% highlight python linenos %}
class Author(User):
    """Book author."""

    def get_list_of_reviews_by_author(self, review_limit=None):
        """Reviews by the author.

        Usage:

            >>> for review in book.author.get_list_of_reviews_by_author(
            ...         review_limit=5):
            ...     print(review)

        """
        # query reviews from database…
        return reviews
{% endhighlight %}

Functionally, nothing has changed (or rather, I'm not talking about functional
changes here). But how the coding style has changed is the result of a
compromise among members of the review.

My preference is, of course, the first example (since I wrote it), because:

* it is shorter and simpler
* I understand it quite easily
* `_by_author` is redundant since the method is defined on the `Author` class.
* `list_of_` is redundant as the plural of `reviews` implies a list (or more
  correctly, a collection, which can be any iterable)
* `get_` doesn't make much sense either, since we don't have a setter, and it
  is obvious by looking at the method that it *returns* something

Arguments for the second example are usually:

* it is more explicit
* it reads like English
* a new developer can look at the method's name and see what it does
* a *non-developer* can look at it and have an idea of what might be going on

The accompanying argument is that code (and unit tests and functional tests)
should be written in such a way that non-developers can understand it. I don't
agree with that point, to me it is OK that only developers understand code, but
it certainly makes project management easier.

Unfortunately when it comes to a compromise, there isn't much to do. The
developer accepts the changes (after all, they're just cosmetics), and carries
on with the new code style. Since the code in question is [Python][2], there
isn't a strict enough style guide that can help. While [PEP8][3] has loads of
instructions on how to *format* the code, it doesn't say that much about
semantics like [naming things][4].

[2]: https://www.python.org/
[3]: https://www.python.org/dev/peps/pep-0008/
[4]: https://quotabl.es/quotes/97013

For that matter, I'd like to point out that [Go][5] has some guidelines for
this. [Effective Go][6] lists the following naming conventions:

[5]: https://golang.org/
[6]: https://golang.org/doc/effective_go.html#names

* getters should be named like `Owner()`, not `GetOwner()`
* methods that convert to a well-known type should be named like `String()`,
  not `ToString()`

I like to apply those to Python as well. With a simple naming convention, even
with a terse syntax, code should be readable enough that a new developer can
understand it. As for non-developers, there are plenty of statistical code
analysing services and [tools][7] that analyse complexity, standard compliance,
test coverage, etc.

[7]: https://en.wikipedia.org/wiki/List_of_tools_for_static_code_analysis

## Update

[`pylint`][8] suggests method names should be not longer than 30 characters
(they should match `[a-z_][a-z0-9_]{2,30}$`), so the second example still
passes the lint check, although just barely.

[8]: https://pypi.python.org/pypi/pylint
