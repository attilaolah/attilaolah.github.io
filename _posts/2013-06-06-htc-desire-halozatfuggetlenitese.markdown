---
layout: post
title: HTC Desire hálózatfüggetlenítése
tags:
- programming
- hu
lang: hu
lang_full: hu_HU
---

Ha Linuxban vagy XP-ben vagy,

* telepíts egy [VirtualBox][2]-ot (vagy valami hasonlót) (`emerge virtualbox`
  Gentooban)
* szerezz egy Windows 7 ISO-t (sajnos a jó öreg [wine][1] itt nem fog segíteni)
  (XP sem jó, legalább is a 64-bites verzió nem akarja telepíteni az
  illesztőprogramokat)
* telepíts Windows 7-et VirtualBox-ban

[1]: https://www.winehq.org/
[2]: https://www.virtualbox.org

Ezután

* csatlakoztast a Desire-t (a telefonon az USB fejlesztést be kell kapcsolni)
* telepítsd az [HTC Sync][3] nevű programot, az majd beteszi a szükséges
  illesztőprogramokat (az univerzális "Google USB illesztőprogramok" csomak nem
  jó, a HTC-s kell.
* telepítds az adb illesztőprogramot (letölthető [itt][5] vagy [itt][6])
* töltsd le és indítsd el a [föltörő programot][7] ([alőző verzió][8])

[3]: http://drivers.softpedia.com/progDownload/HTC-Sync-Manager-USB-Driver-20410-Download-240924.html
[4]: http://forum.xda-developers.com/showthread.php?t=943726
[5]: http://downloads.unrevoked.com/recovery/android-usb-driver.zip
[6]: http://www.sieempi.eu/data/android-usb-driver.zip
[7]: http://www.sieempi.eu/data/HTC_Desire_Unlock_v0.9.5.rar
[8]: http://www.sieempi.eu/data/HTC_Desire_Unlock_v0.9.4.rar

VirtualBox alatt oda kell figyelni arra, hogy az USB port továbbítva legyen a
vendég oprendszernek.

Ha a telefon nem akar újraindulni, ellenőrizd, hogy az `adb devices` parancs
fölismeri-e a csatlakoztatott eszközt. Ha nem, valószínű az adb illesztőprogram
nincs jól telepítve.

Ha a telefon újraindul, de a program nem találja, ellenőrizd megint `adb
devices` parancssal, hogy az adb illesztőprogram telepítődött-e.

*Ez csak az HTP Desire-re alkalmazható.*
