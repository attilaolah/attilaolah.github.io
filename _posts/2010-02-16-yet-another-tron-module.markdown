---
layout: post
title: Yet another tron module for the Google AI Challenge
tags:
 - Python
 - game
summary: <tt>ao.tron</tt> is a Python module for the Google AI Challenge.
---

The idea
--------

I've been playing around with a [Python](http://www.python.org/)
[project](http://github.com/aatiis/python-yatron) for the [Google AI
Challenge](http://csclub.uwaterloo.ca/contest/) as an alternative to the
[python starter
package](http://csclub.uwaterloo.ca/contest/starter_packages.php).

Nothing very special; I've put together a few
[buildout](http://www.buildout.org/) recipes and rewrote some of the methods,
to get some easy utility functions.


The module
----------

``ao.tron`` is a Python module for working with tron boards. For more
information and examples, take a look at the next section. The package is also
[available on PyPI](http://pypi.python.org/pypi/ao.tron).


The tron board
--------------

The class ``ao.tron.Board`` represents the state of the tron board in discrete
time. It has some utility functions to make it easier for your bot to work
with the board object. To construct a simple board object, we'll use the
``ao.tron.generate`` generator:

    >>> import sys
    >>> from StringIO import StringIO
    >>> sys.stdin = StringIO("""5 5
    ... #####
    ... #  2#
    ... #   #
    ... #1  #
    ... #####
    ... """)

    >>> from ao.tron import generate
    >>> board = generate().next()
    >>> board
    <Board (5x5)>

To see that we actually have the correct board, we can use the
``ao.tron.Board.board`` property. Note that this property is lazy, as are most
other properties: they won't calculate the result unless you ask for it, and
once calculated, they store it in the object for later use:

    >>> print board.board
    #####
    #  2#
    #   #
    #1  #
    #####

We can ask our coordinates using the ``ao.tron.Board.me`` property (or it's
alias, ``ao.tron.Board.m``):

    >>> me = board.me
    >>> me
    (1, 1)

Similarly, we can use ``ao.tron.Board.them`` (and it's alias,
``ao.tron.Board.t``):

    >>> them = board.them
    >>> them
    (3, 3)

As you can see, the coordinates start from the lower left corner. The first
coordinate is the X axis, the second is the Y axis. We can ask for any
coordinate on the boar like this:

    >>> board[0, 0]
    '#'

    >>> board[me]
    '1'

    >>> board[them]
    '2'

    >>> board[10, 10]
    Traceback (most recent call last):
    ...
    IndexError: tuple index out of range

You can use the object's field markers for comparison:

    >>> assert all(((board.ME  == '1'),
    ...     (board.THEM == '2'),
    ...     (board.WALL == '#'),
    ...     (board.FLOOR == ' '),
    ... ))

If we iterate over the board, it will yield it's blocks and coordinates:

    >>> for block, coords in board:
    ...     print block, coords
    # (0, 0)
    # (1, 0)
    ...
    1 (1, 1)
    ...
    2 (3, 3)
    ...
    # (4, 4)

To check for possible moves from a certain position, we call
``ao.tron.Board.possibilities``:

    >>> board.possibilities(me)
    ((1, 2), (2, 1))

    >>> board.possibilities(them)
    ((3, 2), (2, 3))

To check the distance between us and the opponent, we can use the
``ao.tron.Board.distance`` property:

    >>> board.distance
    3

Let's try it with a more complex board:

    >>> sys.stdin = StringIO("""7 5
    ... #######
    ... #   #2#
    ... # # # #
    ... #1#   #
    ... #######
    ... """)

    >>> board = generate().next()
    >>> board.distance
    9

Or an even more complex one:

    >>> sys.stdin = StringIO("""14 10
    ... ##############
    ... #            #
    ... #          2 #
    ... #   ######   #
    ... #   #    #   #
    ... #   #    #   #
    ... #   ######   #
    ... # 1          #
    ... #            #
    ... ##############
    ... """)

    >>> board = generate().next()
    >>> board.distance
    13

Let's try an isolated board:

    >>> sys.stdin = StringIO("""14 10
    ... ##############
    ... ###         ##
    ... #  #    #  2 #
    ... #   ######   #
    ... #      #     #
    ... #     #      #
    ... #   ######   #
    ... # 1  #    #  #
    ... ##         ###
    ... ##############
    ... """)

    >>> board = generate().next()
    >>> board.distance
    -1

Asking it the second time it should be slightly faster:

    >>> board.distance
    -1

Note that if we're isolated, calling distance will also calculate our space
left:

    >>> board.space
    35

If the two players are adjacent, the result is zero:

    >>> sys.stdin = StringIO("""7 6
    ... #######
    ... #     #
    ... #  2  #
    ... #  1  #
    ... #     #
    ... #######
    ... """)

    >>> board = generate().next()
    >>> board.distance
    0

To calculate one of the shortest paths between us and the opponent, we can use
the ``ao.tron.Board.path`` property:

    >>> board.path
    ()

    >>> sys.stdin = StringIO("""14 10
    ... ##############
    ... ###         ##
    ... #  #    #  2 #
    ... #   ######   #
    ... #       #    #
    ... #    #       #
    ... #   ######   #
    ... # 1  #    #  #
    ... ##         ###
    ... ##############
    ... """)

    >>> board = generate().next()
    >>> board.path
    ((2, 3), (2, 4), (2, 5), ..., (10, 5), (10, 6), (10, 7))

To get directions for an adjacent coordinate, call ``ao.tron.Board.direction``:

    >>> board.direction((2, 3))
    1

    >>> board.direction((board.me[0]-1, board.me[1])) == board.WEST
    True

Thus, if we want to head towards the enemy, we can easily get directions:

    >>> board.direction(board.path[0]) == board.NORTH
    True

The absolute distance between us and the enemy can be accessed with the
``ao.tron.Board.flight`` property.

Note that walls are not taken account of. We may even be separated. This is
just a cheap call to see if we're far away on a huge map:

    >>> board.flight
    14

The accurate way to go in the enemys direction is to to access the
``ao.tron.Board.chase`` property. Note that this will call ``ao.tron.Board.path``,
which may be quite expensive on huge boards. Use it with caution. If you need
a cheaper version, try ``ao.tron.Board.charge``:

    >>> board.chase
    (2, 3)

A cheaper way to do the same is to call ``ao.tron.Board.charge`` This call is
very cheap, but it does not check for the shortest path; It doesn't even check
if we're separated from the enemy or not. Use it when you're far from the
enemy and want to get closer as quickly as possible. In this particular case,
it will show us different results:

    >>> board.charge
    (3, 2)

The value is cached; calling it again is much faster:

    >>> board.charge
    (3, 2)

If we're trapped, it will return ``None``:

    >>> sys.stdin = StringIO("""7 7
    ... #######
    ... #     #
    ... #  2  #
    ... #     #
    ... # ### #
    ... # #1# #
    ... #######
    ... """)

    >>> board = generate().next()
    >>> board.charge is None
    True

As usual, the value is cached:

    >>> board.charge is None
    True

The opposite of ``ao.tron.Board.charge`` is ``ao.tron.Board.flee``. This call
is very cheap, but it does not check for the shortest path; It doesn't even
check if we're separated from the enemy or not. Use it when you want to run
away as quickly as possible:

    >>> board.flee is None
    True

As usual, the value is cached:

    >>> board.flee is None
    True

    >>> sys.stdin = StringIO("""7 7
    ... #######
    ... #     #
    ... #  2  #
    ... #  1  #
    ... #     #
    ... #     #
    ... #######
    ... """)

    >>> board = generate().next()
    >>> board.flee
    (2, 3)

    >>> board.flee
    (2, 3)

To make a random possible move, just call ``ao.tron.Board.random``:

    >>> board.random in board.possibilities(board.me)
    True


Clean up after the tests:

    >>> from zope.testing import cleanup
    >>> cleanup.cleanUp()


Reading the board from a file
-----------------------------

``ao.tron.generate`` is a simple function that reads the tron board from
the standard input and and generates ``ao.tron.Board`` instances. Format
the input like this:

    5 5
    #####
    #  2#
    #   #
    #1  #
    #####

The numbers on the first line show the height and withd of the board,
respectively. The following lines represent the board, where:

* ``"#"`` are walls
* ``" "`` (whitespaces) are the floor
* ``"1"`` is our player
* ``"2"`` is the opponent

To use the function, in your source file you can do something like this:

    from ao.tron import generate, move
    for board  in generate():
        # do your stuff here
        move(board.NORTH)

For testing, we'll create a file-like object and mangle sys.stdin to
demonstrate how it works:

    >>> import sys
    >>> from StringIO import StringIO
    >>> sys.stdin = StringIO("""5 5
    ... #####
    ... #  2#
    ... #   #
    ... #1  #
    ... #####
    ... """)

Now we can use the board generator as usual:

    >>> from ao.tron import generate
    >>> board = generate().next()
    >>> board
    <Board (5x5)>

    >>> sys.stdin = StringIO("""5 5
    ... #####
    ... #  2#
    ... #   #
    ... #1  #
    ... #####
    ... 4 4
    ... ####
    ... # 2#
    ... #1 #
    ... ####
    ... 4 4
    ... ####
    ... #1 #
    ... # 2#
    ... ####
    ... """)

    >>> for board in generate():
    ...     print board
    <Board (5x5)>
    <Board (4x4)>
    <Board (4x4)>

To make a move, we can use the ``ao.tron.board.move`` method, which is an
alias for the module-global ``ao.tron.move`` function:

    >>> board.move(board.NORTH)
    1

Clean up after the tests:

    >>> from zope.testing import cleanup
    >>> cleanup.cleanUp()
