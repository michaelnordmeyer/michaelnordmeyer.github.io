---
title: Speed of Thunderbolt Ethernet Adapter for MacBook Air and MacBook Pro Retina
date: 2013-01-08T22:49:52+00:00
excerpt: "Speed comparison of Apple's Thunderbolt gigabit ethernet adapter vs. wired gigabit ethernet and wireless ethernet."
layout: post
permalink: /speed-thunderbolt-ethernet-adapter-macbook-air-macbook-pro-retina
redirect_from: /speed-thunderbolt-ethernet-adapter-macbook-air-macbook-pro-retina/
categories:
  - Apple
tags:
  - LAN
  - Mac
  - Wireless
---
Many people still need a wired network (LAN) connection, because wireless networks (WLANs) are not allowed at their workplace. [The MacBook Air using the USB ethernet adapter is slow](https://michaelnordmeyer.github.io/speed-macbook-air-usb-ethernet-adapter). Slower than using wireless.

Because Apple doesn’t sell a USB 3 ethernet adapter the only alternative is a [Thunderbolt ethernet adapter](http://www.apple.com/shop/product/MD463LL/A/thunderbolt-to-gigabit-ethernet-adapter), if you want high speed transfers. The same is true for the new MacBook Pro Retina, which also don’t have a wired ethernet port anymore.

## Options of Connection

If the only Thunderbolt port of the MacBook Air is used for the adapter, you only can connect an external display via USB to DVI. This works quite well but is expensive and has a subpar performance. Videos or fast scrolling is too slow. But it’s an alternative if you really need both.

With the MacBook Pro Retina it’s much easier, because not only it has two Thunderbolt ports, it also has an HDMI port.

Apple’s Thunderbolt display has internal docking options via Thunderbolt, so you get a free Thunderbolt port on the display for using your internal one. But we won’t need it because the display also has an internal gigabit ethernet port. Very convenient.

## A Quick Benchmark

I quickly speed-tested the adapter using a Time Capsule 2011 with 802.11n wireless and wired gigabit ethernet. As test devices I used a MacBook Air 2012 having Thunderbolt and a MacBook Pro 2.8 GHz 2009.

To test real-wold performance I copied a 800 MB file. Because of the large file size this is a best-case test, so the resulting speeds are the maximum you can get. If I would have been using many small files the numbers would have been significantly lower.

## Speed Comparison

<table>
  <tr>
    <td>
      <strong>Connection</strong>
    </td>
    
    <td>
      <strong>MacBook Air</strong>
    </td>
    
    <td>
      <strong>MacBook Pro</strong>
    </td>
  </tr>
  
  <tr>
    <td>
      Wireless 802.11n (300 Mbit/s)
    </td>
    
    <td>
      16 MByte/s down<br> 20 MByte/s up
    </td>
    
    <td>
    </td>
  </tr>
  
  <tr>
    <td>
      Wireless 802.11ac (867 Mbit/s)
    </td>
    
    <td>
      20 MByte/s down<br> 30 MByte/s up
    </td>
    
    <td>
    </td>
  </tr>
  
  <tr>
    <td>
      Wired Thunderbolt Gigabit Adapter (1,000 Mbit/s)
    </td>
    
    <td>
      78-88 MByte/s
    </td>
    
    <td>
    </td>
  </tr>
  
  <tr>
    <td>
      Wired Gigabit Ethernet (1,000 Mbit/s)
    </td>
    
    <td>
    </td>
    
    <td>
      75-80 MByte/s
    </td>
  </tr>
</table>

## Conclusion

The Thunderbolt ethernet adapter is getting full gigabit ethernet speed. If you need the speed and don’t have to run an external display on your single Thunderbolt port of your Air, this is the way to go.

Personally I would opt for the external display connected via Thunderbolt to utilize the higher resolution and live with the lower network speed via USB 2.0.