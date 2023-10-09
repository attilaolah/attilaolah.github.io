---
layout: post
title: A Walter számok halmaza
lang: hu
---

*Ajánlom minden olyan ismerősöm figyelmébe, aki azt hiszi, hogy a gyök kettő
nem is igazi, az $$i$$ pedig egyáltalán nem létezik.*

Szóval kezdett elegem lenni abból, hogy egyesek néhány sör után elkezdik
támadni a számukra ismeretlen matematikai fogalmak sokaságát azzal az érvvel,
hogy olyan [nincs is][1]. Igen, a gonosz matematikusok [kitalálnak][2]
mindenféléket csak azért, hogy ezzel is bosszantsák a köznépet.

[1]: https://youtu.be/TbNymweHW4E
[2]: https://youtu.be/1EGDCh75SpQ

Hosszas gondolkodás után arra jutottam, hogy az emberek legnagyobb része úgy
néz minden matematikai fogalomra, hogy azt próbálja beleerőltetni a számára
ismeretes fogalmak rendszerébe, és ha nem megy, akkor az új fogalom minden
bizonnyal *lehetetlen*.

Vegyük például a $$\sqrt{2}$$-t. Sok ember számára az irracionális számok
egyszerűen nem léteznek ($$\mathbb{I} = \varnothing$$). A számok összessége
tehát a racionális számok ($$\mathbb{Q}$$) halmazára korlátozódik. Ha egy ilyen
személynek azt mondjuk:

— *Képzeld Feri<sup><a href="#fn-1" title="Feri nevét megváltoztattuk a pofonok
elkerülése érdekében.">1</a></sup>,* $$x^2=2$$ *.*

Feri ezt így értelmezi:

— *Képzeld Feri,* $$x^2=2 \land x \in \mathbb{Q}$$ *.*

És így válaszol:

— *De hát Jola<sup><a href="#fn-2" title="Az én nevemet is
megváltoztattuk.">2</a></sup>!* $$x \in \varnothing$$ *!*

A racionális számokkal ($$\mathbb{Q}$$) már többen ki vannak békülve, az egész
számokat ($$\mathbb{Z}$$) pedig mindenki komázza. Pedig ha ugyanezt
megcsináljuk egy gyerekkel:

— *Szia Peti! Hallottad?* $$x = 1-2$$ *!*

Peti fejében:

— *Szia Peti! Hallottad?* $$x = 1-2 \land x \in \mathbb{N}$$ *!*

— *De Attila, hiszen* $$x \in \varnothing$$ *!*

És aztán megkérdezzük Ferit,

— *Feri, mit szólsz Peti válaszához?*

— *Ne bántsd már! Peti alig múlt kettő, majd ha nagyobb lesz, megérti.*

Pedig Peti és Feri ugyanazt a hibát követik el: a kérdést úgy értelmezik, ahogy
az az ismereteiknek megfelel. És sok egyetemet végzett ismerősöm is ugyanúgy
belesétál ebbe.

Ezért szeretném kihangsúlyozni minden kedves olvasó számára, hogy amikor azt
mondja valaki, hogy $$x^2 = -1$$, azt nem úgy érti, hogy
$$x^2 = -1 \land x \in \mathbb{R}$$, mert hát $$x = i$$, és ezzel meg is
ismertük a [komplex számok][3] halmazát:

[3]: https://hu.wikipedia.org/wiki/Komplex_számok

$$\mathbb{C} = \{z \colon z = (ai+b) \land a, b \in \mathbb{R} \land i^2 = -1\}$$

Itt sem kell megállni, hogy "jól van, több már úgysincs", mert én meg azt
mondom:

$$x^2 = 1 \land x \notin \{i^n \colon n \in \mathbb{R} \land i^2 = -1\}$$

Nyilvánvaló, hogy $$x \notin \mathbb{C}$$. Ez viszont nem jelenti azt, hogy
$$x \in \varnothing$$, mert nem adtam meg semmilyen "fölső határt" $$x$$-re.
Sőt, a fönti egyenlőségrendszernek számtalan megoldása van, csakhogy egyik sem
komplex. (A kortárs matematikában a fönti képlet megoldását $$j$$-vel szokták
jelölni.)

A számtalan megoldás közül csak egyet említenék meg:

{:.center}
$$x =$$
<img class="icon-24" src="/images/2013/walter-48.jpg" title="Sóti Valentin">

Ezzel definiáljuk az *ún. Walter-féle számokat*:

{:.center}
$$\mathbb{W} = \{w \colon w = (a$$
<img class="icon-24" src="/images/2013/walter-48.jpg" title="Sóti Valentin">
$$+b) \land a, b \in \mathbb{C} \land$$
<img class="icon-24" src="/images/2013/walter-48.jpg" title="Sóti Valentin">
$$^2 = 1 \land$$
<img class="icon-24" src="/images/2013/walter-48.jpg" title="Sóti Valentin">
$$\notin \{i^n \colon n \in \mathbb{R} \land i^2 = -1\}\}$$

A $$\mathbb{W}$$ halmazt a többi számhoz viszonyítva az alábbi Venn-diagrammal
szemléltetem:

{:.center}
![W halmaz][4]

[4]: /images/2013/walter-halmaz.jpg

Melyben:

* $$\mathbb{N}$$ a [természetes számok][9] halmaza,
* $$\mathbb{N}_0$$ a természetes számok $$0$$-val [kibővített halmaza][10]
* $$\mathbb{Z}$$ az [egész számok][11] halmaza,
* $$\mathbb{Q}$$ a [racionális számok][12] halmaza,
* $$\mathbb{I}$$ az [iracionális számok][13] halmaza,
* $$\mathbb{A}$$ az [algebrai számok][14] halmaza,
* $$\mathbb{R}$$ a [valós számok][15] halmaza,
* $$\mathbb{A}_R$$ az algebrai és a valós számok halmazainak metszete,
* $$\mathbb{C}$$ a komplex számok halmaza,
* $$\mathbb{W}$$ a Walter számok halmaza.

[9]: https://hu.wikipedia.org/wiki/Term%C3%A9szetes_sz%C3%A1mok
[10]: https://hu.wikipedia.org/wiki/Term%C3%A9szetes_sz%C3%A1mok#Term.C3.A9szetes_sz.C3.A1m-e_a_nulla.3F
[11]: https://hu.wikipedia.org/wiki/Eg%C3%A9sz_sz%C3%A1mok
[12]: https://hu.wikipedia.org/wiki/Racion%C3%A1lis_sz%C3%A1m
[13]: https://hu.wikipedia.org/wiki/Irracion%C3%A1lis_sz%C3%A1m
[14]: https://hu.wikipedia.org/wiki/Algebrai_sz%C3%A1m
[15]: https://hu.wikipedia.org/wiki/Val%C3%B3s_sz%C3%A1mok

A Walter számok halmazára érvényesek a következők:

* A $$\mathbb{W}$$ halmaz [számossága][16] $$\aleph_2$$ (lásd:
  [kontinuumhipotézis][17]).
* A $$\mathbb{W}$$ halmaz nem kapható meg [Cayley–Dickson][5] konstrukcióval
  (más szóval
  <img class="icon-24" src="/images/2013/walter-48.jpg" title="Sóti Valentin">
  *nem [kvaternion][6]*).
* Ha a $$(G; \oplus)$$ [csoport][7] [kommutatív][8] (azaz *Abel-csoport*), és a
  $$G$$ halmaz egységeleme a
  <img class="icon-24" src="/images/2013/walter-48.jpg" title="Sóti Valentin">,
  akkor (és csakis akkor) a $$(G; \oplus)$$ csoportot *Walter-csoportnak*
  nevezzük.
* Ebből következik, hogy
  $$W = (G, \oplus, \otimes)$$ [test][18] *Walter-test* akkor és csakis akkor,
  ha $$(G; \oplus)$$ Walter-csoport, továbbá
* a $$\mathcal{W} = (G, \oplus, \otimes)$$ [gyűrű][19] *Walter-gyűrű* akkor és
  csakis akkor, ha $$(G, \oplus)$$ Walter-csoport.

[5]: https://en.wikipedia.org/wiki/Cayley%E2%80%93Dickson_construction
[6]: https://en.wikipedia.org/wiki/Cayley%E2%80%93Dickson_construction#Quaternions
[7]: https://hu.wikipedia.org/wiki/Csoport_(matematika)
[8]: https://hu.wikipedia.org/wiki/Abel-csoport
[16]: https://hu.wikipedia.org/wiki/Sz%C3%A1moss%C3%A1g
[17]: https://hu.wikipedia.org/wiki/Kontinuumhipot%C3%A9zis
[18]: https://hu.wikipedia.org/wiki/Test_(algebra)
[19]: https://hu.wikipedia.org/wiki/Gy%C5%B1r%C5%B1_(matematika)

{:#fn-1.footnote}
<sup>1</sup>Feri nevét megváltoztattuk a pofonok elkerülése érdekében.

{:#fn-2.footnote}
<sup>2</sup>Az én nevemet is megváltoztattuk.
