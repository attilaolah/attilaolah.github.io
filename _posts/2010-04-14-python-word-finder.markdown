---
layout: post
title: Very simple word finder class for Python
tags:
 - Python
 - code-snippet
 - regex
summary: "A simple Python script that searches through a text and find all the
words that match a certain regex."
---

A few days ago one of my customers asked me to put together a very simple
[Python](http://www.python.org/) script that would search through a text and find all the words that
contain both letters and numbers. As simple as it may be, I've decided to make
it a little more robust by creating a class that can be configured to split
words and check patterns for each word.

This is just too simple to be released as a module, but I'll put the code here
in case anyone needs it. I'm placing it in the [public
domain](http://en.wikipedia.org/wiki/Public_domain), by the way.

Code sample
-----------

    import re


    class WordFinder(object):
        """Searches text for words that conform to the given constraint.

        To use it, instantiate it with any number of strings. These strings will be
        used as constraints. For example, to find all words that contain the letter
        'X' and the number '6', you can do something like this::

            >>> find = WordFinder('X', '6')
            >>> find
            <WordFinder object (using 2 constraints)>

        When you use the finder, you will get a list of words that contain at least
        one character from each string you used when you constructed the finder::

            >>> find('DarkX 666 sixx6 XXX T6FX\\tfoo\\n\\n66X')
            ['T6FX', '66X']

        Let's find the words that have both numbers and letters in them::

            >>> import string
            >>> find = WordFinder(string.digits, string.ascii_letters)

            >>> find('Konica Minolta DiMAGE Z3 4MP Digital Camera 200$ -30% off!')
            ['Z3', '4MP']

        If you also want the punctuation::

            >>> letters_punctiation = string.ascii_letters + string.punctuation
            >>> find = WordFinder(string.digits, letters_punctiation)

            >>> find('Konica Minolta DiMAGE Z3 4MP Digital Camera 200$ -30% off!')
            ['Z3', '4MP', '200$', '-30%']

        If you don't supply any constraints, all words will be returned::

            >>> find = WordFinder()

            >>> find('Konica Minolta DiMAGE Z3 4MP Digital Camera 200$ -30% off!')
            ['Konica', 'Minolta', 'DiMAGE', 'Z3', '4MP', 'Digital', 'Camera', ...]

        To use custom word separators, supply the `separator` keyword argument::

            >>> find = WordFinder(string.ascii_letters)
            >>> find('Foo, bar! Spam? eggs...')
            ['Foo,', 'bar!', 'Spam?', 'eggs...']

            >>> find = WordFinder(string.ascii_letters, separator=r'\W+')
            >>> find('Foo, bar! Spam? eggs...')
            ['Foo', 'bar', 'Spam', 'eggs']

        """

        def __init__(self, *strings, **kw):
            """Compile the regexes needed for matching."""

            self.constraints = [re.compile(r'[%s]' % word) for word in strings]
            self.separator = re.compile(kw.get('separator', r'\s+'))

        def __call__(self, text):
            """Yield words that conform to all the constraints."""

            return [word for word in self.separator.split(text) if \
                all((rx.search(word) for rx in self.constraints))]

        def __repr__(self):
            """Tell how many constraints we have."""

            return '<%s object (using %d constraints)>' % \
                (self.__class__.__name__, len(self.constraints))


    if __name__ == '__main__':
        # Do some testing

        import doctest, unittest

        tests = [doctest.DocTestSuite(__name__, optionflags=doctest.ELLIPSIS)]
        unittest.TextTestRunner().run(unittest.TestSuite(tests))


Download
--------

You can download the file [here](/downloads/python/wordfinder.py).
