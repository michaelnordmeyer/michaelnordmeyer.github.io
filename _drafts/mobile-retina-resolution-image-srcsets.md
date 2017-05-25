---
title: Mobile Retina Resolution Image SRCSETs
date:
excerpt:
layout: post
permalink:
categories:
  - Technology
tags:
  - Mobile
  - Web Development
---
## Overview of Most Common Mobile Device Resolutions

Mobile devices have physical screens resolutions which are not advertised to browsers. Instead the 1x resolutions is. Here's an overview of the relationship between physical and virtual (calculated) resolutions for the most common mobile devices.

| Device         | Screen Res. |    1x   |    2x    |    3x     |    4x     |
|----------------|:-----------:|:-------:|:--------:|:---------:|:---------:|
| Android HD     |   720x1280  | 360x640 | 720x1280 |    n/a    |    n/a    |
| Android FullHD |  1080x1920  | 360x640 | 720x1280 | 1080x1920 |    n/a    |
| Android QuadHD |  1440x2560  | 360x640 | 720x1280 | 1080x1920 | 1440x2560 |
| iPhone 3.5˝    |   320x480   | 320x480 |   n/a    |    n/a    |    n/a    |
| iPhone 3.5˝    |   640x960   | 320x480 | 640x960  |    n/a    |    n/a    |
| iPhone 4.0˝    |   640x1136  | 320x568 | 640x1136 |    n/a    |    n/a    |
| iPhone 4.7˝    |   750x1334  | 375x667 | 750x1334 |    n/a    |    n/a    |
| iPhone 5.5˝<sup>1</sup>|  1080x1920  | 414x736 | 828x1472 | 1242x2208 |    n/a    |

<sup>1</sup>: 1242x2208 is downsampled to 1080x1920 and therefor not pixel-perfect

The people of PaintCode have a great overview showing graphically [how these resolutions are related](https://www.paintcodeapp.com/news/iphone-6-screens-demystified).

## Which Image Sizes to Support High-Res Retina Screens

To support high-res retina screens we need a version with the highest x-factor for the specific device. QuadHD devices need a 4x image, HD devices a 2x one. And if you want to be pixel-perfect, you also have to support both portait and landscape modes. By that I don't mean the image dimensions but the way people hold their phones.

### Portrait Mode

| Device      | Screen Res. |   1x  |   2x  |   3x   |   4x   |
|-------------|:-----------:|:-----:|:-----:|:------:|:------:|
| Android     |  1440x2560  | 360x? | 720x? | 1080x? | 1440x? |
| iPhone 4.0˝ |   640x1136  | 320x? | 640x? |   n/a  |   n/a  |
| iPhone 4.7˝ |   750x1334  | 375x? | 750x? |   n/a  |   n/a  |
| iPhone 5.5˝ |  1080x1920  | 414x? | 828x? | 1242x? |   n/a  |

Duplicate resolutions have been removed.

### Landscape Mode

| Device      | Screen Res. |  1x   |   2x   |   3x   |   4x   |
|-------------|:-----------:|:-----:|:------:|:------:|:------:|
| Android     |  1440x2560  | ?x640 | ?x1280 | ?x1920 | ?x2560 |
| iPhone 3.5˝ |   640x960   | ?x480 | ?x960  |   n/a  |   n/a  |
| iPhone 4.0˝ |   640x1136  | ?x568 | ?x1136 |   n/a  |   n/a  |
| iPhone 4.7˝ |   750x1334  | ?x667 | ?x1334 |   n/a  |   n/a  |
| iPhone 5.5˝ |  1080x1920  | ?x736 | ?x1472 | ?x2208 |   n/a  |

Duplicate resolutions have been removed.


For Android devices portait srcset candidate resolutions would be 360x?, 720x?, 1080x?, and 1440x?. The corresponding landscape srcset would be ?x640, ?x1280, ?x1920, and ?x2560.