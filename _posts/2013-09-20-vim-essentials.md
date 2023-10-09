---
layout: post
title: Vim essentials
---

Here is a list of Vim scripts I picked up in the past few years that I find
very useful. All of them can be found as [submodules][1] in my [dotvim
repo][2].

[1]: https://git-scm.com/book/en/Git-Tools-Submodules
[2]: https://git.io/mI3qWg

I am attaching my own rating to the scripts, but these aren't really objective.
They are merely an indication how much I ended up using the scripts. For
example, [vim-fugitive][T3] is so damn powerful it deserves a sixth star, but I
just prefer to use git from the command line rather than from Vim.

### [Tim Pope][3]'s scripts, in order of usefulness:

[3]: https://tpo.pe/

* [pathogen][T0] is the single most useful plug-in for Vim! ★★★★★
* [repeat][T7] for repeating plug-in maps ★★★★★
* [sensible][T8] is a set of *very* useful defaults ★★★★★
* [sleuth][T9] sets `shiftwidth` and `expandtab` in a smart way ★★★★★
* [abolish][T1] for abbreviation, substitution & correction ★★★★☆
* [commentary][T2] to comment stuff out ★★★★☆
* [haml][T4] for haml, sass, and SCSS ★★★★☆
* [liquid][T5] for liquid runtime files with jekyll enhancements ★★★☆☆
* [markdown][T6] for markdown runtime files ★★★☆☆
* [surround][T11] makes quoting/parenthesizing simpler ★★☆☆☆
* [fugitive][T3] is "a git wrapper so awesome, it should be illegal" ★★☆☆☆
* [speeddating][T10] makes date/time manipulation easier ★☆☆☆☆
* [unimpaired][T12] are complementary pairs of mappings ★☆☆☆☆

[T0]: https://github.com/tpope/vim-pathogen
[T1]: https://github.com/tpope/vim-abolish
[T2]: https://github.com/tpope/vim-commentary
[T3]: https://github.com/tpope/vim-fugitive
[T4]: https://github.com/tpope/vim-haml
[T5]: https://github.com/tpope/vim-liquid
[T6]: https://github.com/tpope/vim-markdown
[T7]: https://github.com/tpope/vim-repeat
[T8]: https://github.com/tpope/vim-sensible
[T9]: https://github.com/tpope/vim-sleuth
[T10]: https://github.com/tpope/vim-speeddating
[T11]: https://github.com/tpope/vim-surround
[T12]: https://github.com/tpope/vim-unimpaired

### Python-related scripts:

* [pyflakes][S9] ([my fork][S10]) enables PyFlakes checking for Python files ★★★★★
* [jedi][S6] enables `jedi`'s auto-completion for Python files ★★★★☆


### Others that I've tried:

* [coffee-script][S1] for those `.coffee` files ★★★★★
* [golang][S5] is the official Go Vim script ★★★★★
* [less][S7] is the Vim syntax file for [LESS][4] ★★★★★
* [css3-syntax][S4] adds CSS3 syntax support to Vim's built-in `syntax/css.vim` ★★★★☆
* [markdown-folding][S8] allows folding markdown documents by section ★★★★☆
* [colors-solarized][S2] is a "precision" colour scheme "for machines and people" ★★☆☆☆
* [css-color][S3] is a nice concept, but I couldn't get it to work ☆☆☆☆☆

[S1]: https://github.com/kchmck/vim-coffee-script
[S2]: https://github.com/altercation/vim-colors-solarized
[S3]: https://github.com/skammer/vim-css-color
[S4]: https://github.com/hail2u/vim-css3-syntax
[S5]: https://github.com/jnwhiteh/vim-golang
[S6]: https://github.com/davidhalter/jedi-vim
[S7]: https://github.com/groenewege/vim-less
[S8]: https://github.com/nelstrom/vim-markdown-folding
[S9]: https://github.com/kevinw/pyflakes-vim
[S10]: https://github.com/attilaolah/pyflakes-vim

[4]: https://lesscss.org/

Check out my [dotvim repo][5] or [this screencast][6] by Tim Pope for tips on
how to put them all together.

[5]: https://github.com/attilaolah/dotvim
[6]: https://vimcasts.org/episodes/synchronizing-plugins-with-git-submodules-and-pathogen/
