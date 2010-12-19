---
layout: post
title: Compiling the 2.6.36 kernel for the HP 6735s
tags:
 - Linux
 - administration
summary: Jotting down my kernel config, as usual.
---

I use ``genkernel`` to compile the kernel:

{% highlight console %}
$ sudo genkernel --clean --color --install --loglevel=5 --mrproper --menuconfig all
{% endhighlight %}

To have all of my hardware working, I change the following things (``+`` means
enable, ``-`` means disable):

    * General setup
      + Local version - append to kernel release: '-aiur-r1'
      + Kernel compression mode (LZMA) (Optional; I like LZMA, so I enabled this.)
    * Processor type and features
      + Processor family: 'Opteron/Athlon64/Hammer/K8'
    * Power management and ACPI options
      * ACPI (Advanced Configuration and Power Interface) Support
        + Future power /sys interface
        * Note: keep these enabled, as "byobu" seems to depend on them:
          + Deprecated /proc/acpi files ()
          + Deprecated power /proc/acpi directories
          + Deprecated /proc/acpi/event support
    * Networking support
      + Wireless
        + cfg80211 - wireless configuration API
        - Generic IEEE 802.11 Networking Stack (mac80211)
          * This option conflics with the Breadcom STA driver.
    * Device Drivers
      * Network device support
        * Ethernet (10 or 100Mbit)
          - Broadcom 440x/47xx ethernet support
          - The rest is not needed either
        * PPP (point-to-point protocol) support
          * PPP over Ethernet (EXPERIMENTAL)
        * Wireless LAN
          + Intel PRO/Wireless 2200BG and 2915ABG Network Connection
            * IPW2200 is needed to indirectly select WEXT_PRIV; **
          - Broadcom 43xx wireless support (mac80211 stack)
          - Broadcom 43xx-legacy wireless support (mac80211 stack)
          - The rest is not needed here
      + Generic Thermal sysfs driver
        + Hardware monitoring support
      - Sonics Silicon Backplane
        - Sonics Silicon Backplane support
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
          - Deselect the rest
        + ATI Radeon display support
          + DDC/I2C for ATI Radeon support
          + Support for backlight control
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
      + Network File Systems
        + NFS client support
        + NFS server support
        + CIFS support (advanced network filesystem, SMBFS successor)

`**` see [bug #248450 comment #98](https://bugs.gentoo.org/248450#c98).

**Note:** this configuration applies for
[``2.6.36.*``](http://www.kernel.org/), i.e., my generated kernel looks like
this: ``kernel-genkernel-x86_64-2.6.36-gentoo-aiur-r1``.
