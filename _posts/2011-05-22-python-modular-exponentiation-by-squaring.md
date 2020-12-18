---
layout: post
title: Python modular exponentiation by squaring
tags:
- math
- programming
source: https://gist.github.com/attilaolah/6025863
---

Exponentiation of large numbers can easily be implemented using [exponentiation
by squaring][1], which greatly reduces the number of steps it is needed for a
given imput. Computing large [exponents modulo][2] a number is even faster and
requires less memory, as it reduces the size of the resulting integer.

[1]: https://en.wikipedia.org/wiki/Exponentiation_by_squaring
[2]: https://en.wikipedia.org/wiki/Modular_exponentiation

The following implementation works for both Python 3 and python 2 (although in
Python 3 it will run faster):

{% gist 6025863 %}

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
well, it comes in handy for example when generating [Pratt certificates][3].

[3]: https://en.wikipedia.org/wiki/Primality_certificate#Pratt_certificates

## Update

Do not actually use this code. This is just an example. A *way faster*
implementation is the *built-in* `pow()`, which also accepts a third argument
(the modulo).
