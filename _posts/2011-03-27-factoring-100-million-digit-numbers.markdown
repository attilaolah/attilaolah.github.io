---
layout: post
title: Factoring 100 million digit numbers
tags:
 - Python
 - programming
 - math
summary: I figured I'll try and factor the first few 100,000,000-digit numbers.
---

Yesterday I figured I'll try to
[factor](http://en.wikipedia.org/wiki/Integer_factorization) the first few
numbers greater than 10⁹⁹⁹⁹⁹⁹⁹⁹ (or at least find their smallest divisors). The
idea was to see how hard it is to find the divisors of the first few hundred
[100,000,000](http://en.wikipedia.org/wiki/100000000)-digit numbers.

I took a pretty simple approach: for each prime number `p`, calculate
`10⁹⁹⁹⁹⁹⁹⁹⁹ % p` (the remainder after dividing by `p`). Then I used the result
to create a partial
[sieve](http://en.wikipedia.org/wiki/Sieve_of_Eratosthenes). After the first
~16500 primes, I still couldn't find a divisor for `10⁹⁹⁹⁹⁹⁹⁹⁹+37`. The chance
that it is a prime is pretty damn small though (I haven't tried to run a
[primality test](http://en.wikipedia.org/wiki/Primality_test) yet though).

Here's the smallest prime divisor for the first few 100,000,000-digit integers
(`I` = 10⁹⁹⁹⁹⁹⁹⁹⁹):

    .------------------.
    | number | divisor |
    ---------+----------
    |      I |       2 |
    |  1 + I |   10753 |
    |  2 + I |       2 |
    |  3 + I |       7 |
    |  4 + I |       2 |
    |  5 + I |       3 |
    |  6 + I |       2 |
    |  7 + I |     113 |
    |  8 + I |       2 |
    |  9 + I |     197 |
    | 10 + I |       2 |
    | 11 + I |       3 |
    | 12 + I |       2 |
    | 13 + I |      29 |
    | 14 + I |       2 |
    | 15 + I |       5 |
    | 16 + I |       2 |
    | 17 + I |       3 |
    | 18 + I |       2 |
    | 19 + I |    2087 |
    | 20 + I |       2 |
    | 21 + I |      11 |
    | 22 + I |       2 |
    | 23 + I |       3 |
    | 24 + I |       2 |
    | 25 + I |       5 |
    | 26 + I |       2 |
    | 27 + I |      37 |
    | 28 + I |       2 |
    | 29 + I |       3 |
    | 30 + I |       2 |
    | 31 + I |       7 |
    | 32 + I |       2 |
    | 33 + I |      17 |
    | 34 + I |       2 |
    | 35 + I |       3 |
    | 36 + I |       2 |
    | 37 + I | ??????? |
    '------------------'
