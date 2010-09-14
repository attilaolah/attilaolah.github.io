---
layout: post
title: Kernel configuration for my HP 6735s
tags:
 - Linux
 - administration
summary: "I'm writing this down here so I don't have to look for it every time
I compile my kernel."
---

I use ``genkernel`` to compile the kernel:

{% highlight console %}
$ sudo genkernel --clean --color --install --loglevel=5 --mrproper --menuconfig all
{% endhighlight %}

To have all of my hardware working, I change the following things (``+`` means
enable, ``-`` means disable):

    * General setup
      + Local version - append to kernel release: '-aiur-r1'
    * Processor type and features
      + Processor family: 'Opteron/Athlon64/Hammer/K8'
    * Power management and ACPI options
      * ACPI (Advanced Configuration and Power Interface) Support
        - Deprecated /proc/acpi files
        - Deprecated power /proc/acpi directories
        + Future power /sys interface
        - Deprecated /proc/acpi/event support
    * Networking support
      + Wireless
        + cfg80211 - wireless configuration API
    * Device Drivers
      * Network device support
        * Ethernet (10 or 100Mbit)
          - Broadcom 440x/47xx ethernet support
        * Wireless LAN
          - Broadcom 43xx wireless support (mac80211 stack)
          - Broadcom 43xx-legacy wireless support (mac80211 stack)
      + Generic Thermal sysfs driver
        + Hardware monitoring support
      - Sonics Silicon Backplane
      + Multimedia support
        + Video For Linux
          - Enable Video For Linux API 1 (DEPRECATED)
          + Enable Video For Linux API 1 compatible Layer
          + Video capture adapters
            + V4L USB devices
              + USB Video Class (UVC)
              + (My UVC manufacturer driver)
      * Graphics support
        + Direct Rendering Manager (XFree86 4.1.0 and higher DRI support)
          + ATI Radeon
            + Enable modesetting on radeon by default - NEW DRIVER
        + Bootup logo
    * File systems
      + Ext3 journalling file system support
        + Ext3 extended attributes
          + Ext3 POSIX Access Control Lists
          + Ext3 Security Labels
      + The Extended 4 (ext4) filesystem
        + Ext4 extended attributes
          + Ext4 POSIX Access Control Lists
          + Ext4 Security Labels
      - Reiserfs support
      - JFS filesystem support
      - XFS filesystem support
      - GFS2 file system support
      - OCFS2 file system support
      + Btrfs filesystem (EXPERIMENTAL) Unstable disk format
        + Btrfs POSIX Access Control Lists
      + DOS/FAT/NT Filesystems
        + NTFS file system support
          + NTFS write support

**Note:** this configuration applies for
[``2.6.35.*``](http://www.kernel.org/), i.e., my generated kernel looks like
this: ``kernel-genkernel-x86_64-2.6.35-gentoo-r1-aiur-r1``.
