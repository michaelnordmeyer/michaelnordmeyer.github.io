---
title: Apple AirPort Time Capsule Power Consumption
date: 2013-04-23T09:31:52+00:00
excerpt: I tested both the Time Capsule 802.11n 4th generation and the Time Capsule 802.11ac. Measured power consumption is for the Time Capsule 2TB model.
layout: post
permalink: /apple-time-capsule-power-consumption
redirect_from:
  - /2013/04/stromverbrauch-apple-time-capsule-2-tb/
categories:
  - Apple
tags:
  - Environment
---
I tested both the Apple AirPort Time Capsule 802.11n 4th generation and the Time Capsule 802.11ac 5th gen. The wireless power consumption of the Time Capsule 2 TB is as follows:

<table style="width: auto;">
  <tr>
    <th>
      Usage Pattern
    </th>
    
    <th style="text-align: right;">
      802.11n 4th Gen.
    </th>
    
    <th style="text-align: right;">
      802.11ac 5th Gen.
    </th>
  </tr>
  
  <tr>
    <td>
      Idle (no wireless traffic)
    </td>
    
    <td style="text-align: right;">
      11W
    </td>
    
    <td style="text-align: right;">
      10W
    </td>
  </tr>
  
  <tr>
    <td>
      Wireless traffic (copying a large file)
    </td>
    
    <td style="text-align: right;">
      13W
    </td>
    
    <td style="text-align: right;">
      11W
    </td>
  </tr>
  
  <tr>
    <td>
      Time Machine Backup
    </td>
    
    <td style="text-align: right;">
      16W
    </td>
    
    <td style="text-align: right;">
      16W
    </td>
  </tr>
</table>

The 802.11ac consumes a little less power than to the older model. Idle and wireless traffic of the 5th gen. Time Capsule sometimes reads 8W and 9W respectively. Then they went back to 10W and 11W without increased device usage (I used a 24/7 visible monitor, see below). I was able to reduce the consumption to the lower levels by restarting the Time Capsule, but it didn’t take long for the consumption to go back up again. It might be the internal fan turning on.

The power difference during spin-up is because of the different types of hard drives used by Apple. The old one had a low power Western Digital spinning at 5.400 rpm, the new one has a Seagate spinning at 7.200 rpm (ST2000DM001). WD is ahead of Seagate when it comes to power savings.

I used an affordable ($30) energy-use monitor called [Belkin Conserve Insight](https://www.belkin.com/conserve/insight/), which has the advantage over other devices that the display is not fixed to the power socket but has a 2 meter (6-foot) cable. So it’s easy to read the power consumption of devices, whose power socket is located behind furniture. The power consumption will conveniently be calculated monthly or yearly in the currency of your choice. CO<sub>2</sub> emissions are calculated as well.

I use 100% sustainable and renewable energy exclusively to power my devices. Still it’s better to use less energy even if it’s sustainable energy. That’s why I measure everything to get an idea of my energy consumption per device.