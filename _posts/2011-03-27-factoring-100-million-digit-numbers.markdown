---
layout: post
title: Factoring 100 million digit numbers
tags:
- math
---

Yesterday I figured I'll try to [factor][1] the first few numbers greater than
10⁹⁹⁹⁹⁹⁹⁹⁹ (or at least find their smallest divisors). The idea was to see how
hard it is to find the divisors of the first few hundred [100,000,000][2]-digit
numbers.

[1]: http://en.wikipedia.org/wiki/Integer_factorization
[2]: http://en.wikipedia.org/wiki/100000000

I took a pretty simple approach: for each prime number p, calculate 10⁹⁹⁹⁹⁹⁹⁹⁹
% p (the remainder after dividing by p). Then I used the result to create a
partial [sieve][3]. After the first 300,000 primes, I still couldn't find a
divisor for 10⁹⁹⁹⁹⁹⁹⁹⁹+37.

[3]: http://en.wikipedia.org/wiki/Sieve_of_Eratosthenes

## Update

10⁹⁹⁹⁹⁹⁹⁹⁹+3 is divisible by 6870527 (the 468407th prime)!  The next one
without a known divisor is 10⁹⁹⁹⁹⁹⁹⁹⁹+69 (tried to divide by the first
2,348,559 primes, no factors found so far).

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
    | 37 + I | 6870527 |
    | 38 + I |       2 |
    | 39 + I |     139 |
    | 40 + I |       2 |
    | 41 + I |       3 |
    | 42 + I |       2 |
    | 43 + I |      11 |
    | 44 + I |       2 |
    | 45 + I |       5 |
    | 46 + I |       2 |
    | 47 + I |       3 |
    | 48 + I |       2 |
    | 49 + I |      13 |
    | 50 + I |       2 |
    | 51 + I |      71 |
    | 52 + I |       2 |
    | 53 + I |       3 |
    | 54 + I |       2 |
    | 55 + I |       5 |
    | 56 + I |       2 |
    | 57 + I |      31 |
    | 58 + I |       2 |
    | 59 + I |       3 |
    | 60 + I |       2 |
    | 61 + I |      59 |
    | 62 + I |       2 |
    | 63 + I |  399389 |
    | 64 + I |       2 |
    | 65 + I |       3 |
    | 66 + I |       2 |
    | 67 + I |      17 |
    | 68 + I |       2 |
    | 69 + I | ??????? |
    '------------------'
