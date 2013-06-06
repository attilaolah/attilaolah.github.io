---
layout: post
title: HTC Desire network unlock guide
tags:
- android
- hacking
---

If under Linux or XP,

* install [VirtualBox][2] (or some other virtualisation tool) (`emerge
  virtualbox` for Gentoo)
* get a Windows 7 ISO (no, [wine][1] will not work) (no, XP won't work either,
  at least the 64-bit version has troubles with the the adb interface drivers)
* install Windows 7 in VirtualBox

[1]: https://www.winehq.org/
[2]: https://www.virtualbox.org

Then,

* connect the Desire (make sure USB debugging is enabled)
* install [HTC Sync][3], that will install the Android driver for the Desire
  (no, the Google USB drivers from the SDK won't work)
* install the adb drivers (download from [here][5] or [here][6])
* download and run the [unlock app][7] ([previous version][8])

[3]: http://drivers.softpedia.com/progDownload/HTC-Sync-Manager-USB-Driver-20410-Download-240924.html
[4]: http://forum.xda-developers.com/showthread.php?t=943726
[5]: http://downloads.unrevoked.com/recovery/android-usb-driver.zip
[6]: http://www.sieempi.eu/data/android-usb-driver.zip
[7]: http://www.sieempi.eu/data/HTC_Desire_Unlock_v0.9.5.rar
[8]: http://www.sieempi.eu/data/HTC_Desire_Unlock_v0.9.4.rar

If running from VirtualBox, make sure the USB port is forwarded to the guest
OS.

If the phone won't reboot, make sure `adb devices` shows the connected device.
If not, make sure the drivers are installed.

If the phone reboots, but the app won't find it, again, make sure `adb devices`
shows the device. If not, make sure the adb drivers are installed too.

*This will only work on the Desire.*
