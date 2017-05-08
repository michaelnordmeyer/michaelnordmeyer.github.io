---
title: Speed of MacBook Air 2011 with USB Ethernet Adapter
date: 2011-12-25T20:34:46+00:00
excerpt: A quick benchmark of the USB Ethernet adapter.
layout: post
permalink: /speed-macbook-air-usb-ethernet-adapter
redirect_from:
  - /2011/12/geschwindigkeit-macbook-air-2011-mit-usb-ethernet/
  - /2011/12/geschwindigkeit-macbook-air-2011-mit-usb-ethernet-2/
  - /speed-macbook-air-usb-ethernet-adapter/
image: /images/2011/12/usb-ethernet.jpg
categories:
  - Apple
tags:
  - LAN
  - Mac
  - Wireless
---
The MacBook Air is reduced to the essentials to get a small, light, ultra-portable and sexy computer. The [USB Ethernet adapter](http://www.apple.com/shop/product/MC704LL/A/apple-usb-ethernet-adapter) (100 Mbit/s, $30 extra) is Apple’s option for people who need to connect to networks or the Internet using a cable. If only it would be faster.

Unfortunately some companies still think wireless networking is insecure so you have to use an old-fashioned cable. When using this adapter in the company I was working at, I realized that the computer wasn’t as fast as before when accessing the network. The obvious reason is the maximum speed the adapter is capable of: 100 Mbit/s. This Fast Ethernet speed is outdated for some years. Gigabit Ethernet is the current standard and is 10 times as fast (1,000 Mbit/s).

## A Quick Test

There are so many ways to test performance. And most likely the test won’t test the exact use case you have. My most predominant use cases for network speed is a very simple one: copying lots of data.

I used a Time Capsule 2011 with 802.11n wireless and Gigabit Ethernet and two test devices: a MacBook Air 2011 with Thunderbolt and a MacBook Pro 2.8 GHz 2009.

For a real world performance test is copied a 800 MB large file to my network. That is an ideal case which would achieve the maximum possible transfer speed. If I would have used many small files the speed would be much slower.

## Speed Comparison

| Connection                            | MacBook Air     | MacBook Pro   |
| ------------------------------------- | --------------- | ------------- |
| Wired USB Ethernet (100 Mbit/s)       | 12 MByte/s      |               |
| Wireless 802.11n (300 Mbit/s)         | 16 MByte/s down<br>20 MByte/s up   |               |
| Wired Gigabit Ethernet (1,000 Mbit/s) |                 | 75-80 MByte/s |

The interesting bit is, that the MacBook Air 2011 is faster using wireless than wired using the USB Ethernet adapter. Not only you have to use an adapter and a cable, but you’re slower as well.

Because I only use wired Ethernet – if ever –, if I have to copy large amounts of data (gigabytes to terabytes), I’m very happy with the wireless speed. The slow USB Ethernet adapter is just for emergency. Who wants to use cables anyway.

#### Update

For a faster wired network connection use [Apple’s Thunderbolt Ethernet adapter](https://michaelnordmeyer.com/speed-thunderbolt-ethernet-adapter-macbook-air-macbook-pro-retina "Apple's Thunderbolt Ethernet adapter").