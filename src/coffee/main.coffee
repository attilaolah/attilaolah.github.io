embedJS = (src) ->
  script = document.createElement 'script'
  script.src = src
  script.async = true
  document.head.appendChild script

window.onload = ->
  document.getElementsByClassName 'mathjax'
    .length and embedJS '//cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML'
