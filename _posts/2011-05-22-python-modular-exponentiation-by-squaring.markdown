---
layout: post
title: Python modular exponentiation by squaring
tags:
 - Python
 - programming
 - math
summary: "A fast Python 3-compatible implementation of modular exponentiation
by squaring."
---

Exponentiation of large numbers can easily be implemented using [exponentiation
by squaring](http://en.wikipedia.org/wiki/Exponentiation_by_squaring), which
greatly reduces the number of steps it is needed for a given imput. Computing
large [exponents modulo](http://en.wikipedia.org/wiki/Modular_exponentiation) a
number is even faster and requires less memory, as it reduces the size of the
resulting integer.

The following implementation works for both Python 3 and python 2 (although in
Python 3 it will run faster):

{% highlight python %}
import sys


try:
    rng = xrange
except NameError:
    rng = range  # Python 3+


def mesq(base, exp, mod, debug=False):
    """Modular exponentiation by squaring."""
    if debug:
        # Print some debugging output. Don't use with huge numbers!
        print('({}**{})%{} ='.format(base, exp, mod))
        print('(({}%{})**{})%{} ='.format(base, mod, exp, mod))
        log, cexp = '', 1
        for x in reversed('{:b}'.format(exp)):
            if x == '1':
                log = '*((({}%{})**{})%{})'.format(base, mod, cexp, mod) + log
            cexp *= 2
        print('({})%{} ='.format(log[1:], mod))
        log, nexp = '', 0
        for x in reversed('{:b}'.format(exp)):
            if x == '1':
                args = '('*nexp*2, base, mod, '**2)%{})'.format(mod)*nexp
                log = '*{}({}%{}){}'.format(*args) + log
            nexp += 1
        print('({})%{} ='.format(log[1:], mod))
    # Loop until we have the result:
    result, counter = 1, 0
    cache = (counter, base % mod)
    while exp:
        leap = 1
        if exp & 1:
            current = cache[1]
            for x in rng(counter - cache[0]):
                current = pow(current, 2) % mod  # pow() is fast!
            cache = (counter, current)
            result = (result * current) % mod
        else:
            # In case of many zeros, this will give a small speedup:
            while not exp & ((1<<(leap*2))-1):
                leap *= 2
        counter += leap
        exp >>= leap
    return result


if __name__ == '__main__':
    print(mesq(*(int(x) for x in sys.argv[1:4]), debug=False))
{% endhighlight %}

Due to the modulo, the resulting function will be very fast: for example, it
calculates `mesq(3**5**7, 11**17**3, 69)` in a matter of milliseconds. 

To get the idea behind, set the `debug` keyword argument to `True`. This will
show you how it actually calculates the result:

{% highlight pycon %}
>>> mesq(7, 30, 5, True)
(7**30)%5 =
((7%5)**30)%5 =
((((7%5)**16)%5)*(((7%5)**8)%5)*(((7%5)**4)%5)*(((7%5)**2)%5))%5 =
((((((((((7%5)**2)%5)**2)%5)**2)%5)**2)%5)* \
 (((((((7%5)**2)%5)**2)%5)**2)%5)* \
 (((((7%5)**2)%5)**2)%5)* \
 (((7%5)**2)%5) \
)%5 =
4
{% endhighlight %}

And finally, if you're wondering where would you need madular exponentiation,
well, it comes in handy for example when generating [Pratt
certificates](http://en.wikipedia.org/wiki/Primality_certificate#Pratt_certificates).
