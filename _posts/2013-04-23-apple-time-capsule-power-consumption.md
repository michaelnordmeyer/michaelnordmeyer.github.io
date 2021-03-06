---
title: Apple AirPort Time Capsule Power Consumption
date: 2013-04-23T09:31:52+00:00
excerpt: I tested both the Time Capsule 802.11n 4th generation and the Time Capsule 802.11ac. Measured power consumption is for the Time Capsule 2TB model.
layout: post
permalink: /apple-time-capsule-power-consumption
redirect_from:
  - /2013/04/stromverbrauch-apple-time-capsule-2-tb/
  - apple-time-capsule-power-consumption/
categories: Apple
tags:
  - Environment
---
I tested both the Apple AirPort Time Capsule 802.11n 4th generation and the Time Capsule 802.11ac 5th gen. The wireless power consumption of the Time Capsule 2 TB is as follows:

| Usage Pattern                           | 802.11n 4th Gen. | 802.11ac 5th Gen. |
| --------------------------------------- | ----------------:| -----------------:|
| Idle (no wireless traffic)              |              11W |               10W |
| Wireless traffic (copying a large file) |              13W |               11W |
| Time Machine Backup                     |              16W |               16W |

The 802.11ac consumes a little less power than the older model. Idle and wireless traffic of the 5th gen. Time Capsule sometimes reads 8W and 9W respectively. Then they went back to 10W and 11W without increased device usage (I used a 24/7 visible monitor, see below). I was able to reduce the consumption to the lower levels by restarting the Time Capsule, but it didn’t take long for the consumption to go back up again. It might be the internal fan turning on.

The power difference during spin-up is because of the different types of hard drives used by Apple. The old one had a low power Western Digital spinning at 5,400 rpm, the new one has a Seagate spinning at 7,200 rpm (ST2000DM001). WD is ahead of Seagate when it comes to power savings and 7,200 rpm drives use more power than 5,400 rpm ones.

I used an affordable ($30) energy-use monitor called [Belkin Conserve Insight](http://www.belkin.com/us/p/P-F7C005), which has the advantage over other devices that the display is not fixed to the power socket but has a 2 meter (6 feet) cable. So it’s easy to read the power consumption of devices, whose power socket is located behind furniture. The power consumption will conveniently be calculated monthly or yearly in the currency of your choice. CO<sub>2</sub> emissions are calculated as well.

I exclusively use 100 % sustainable and renewable energy to power my devices. Still it’s better to use less energy even if it’s sustainable energy. That’s why I measure everything to get an idea of my energy consumption per device.