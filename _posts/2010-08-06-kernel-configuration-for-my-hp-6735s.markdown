---
layout: post
title: Kernel configuration for my HP 6735s
tags:
 - Linux
 - administration
summary: "I'm writing this down here so I don't have to look for it every time
I compile my kernel."
---

Kernel Configuration
--------------------

I use ``genkernel`` to compile the kernel:

    $ sudo genkernel --clean --color --install --loglevel=5 --mrproper \
        --menuconfig all

To have all of my hardware working, I change the following things (``+`` means
enable, ``-`` menas disable):

    * General setup
      + Local version - append to kernel release: '-aiur-r1'
    * Device Drivers
      + Generic Thermal sysfs driver
        + Hardware monitoring support
      * Network device support
        * Ethernet (10 or 100Mbit)
          - Broadcom 440x/47xx ethernet support
        * Wireless LAN
          - Broadcom 43xx wireless support (mac80211 stack)
          - Broadcom 43xx-legacy wireless support (mac80211 stack)
      - Sonics Silicon Backplane
      * Multimedia support
        + Video For Linux (NEW)
          - Enable Video For Linux API 1 (DEPRECATED) (NEW)
          + Enable Video For Linux API 1 compatible Layer (NEW)
          + Video capture adapters (NEW)
          + V4L USB devices (NEW)
            + USB Video Class (UVC)
              + (My UVC manufacturer driver)
      * Graphics support
        + ATI Radeon display support
    * File systems
      + Ext3 journalling file system support
      + The Extended 4 (ext4) filesystem
      + Btrfs filesystem (EXPERIMENTAL) Unstable disk format
        + Btrfs POSIX Access Control Lists
      + DOS/FAT/NT Filesystems
        + NTFS file system support
          + NTFS write support
