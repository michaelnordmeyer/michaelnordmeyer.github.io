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

Mobile devices have physical screens resolutions which are not advertised to browsers. Instead the 1× resolutions is. Here's an overview of the relationship between physical and virtual (calculated) resolutions for the most common mobile devices.

| Device         | Screen Res. |    1×   |    2×    |    3×     |    4×     |
|----------------|:-----------:|:-------:|:--------:|:---------:|:---------:|
| Android HD     |   720×1280  | 360×640 | 720×1280 |    n/a    |    n/a    |
| Android FullHD |  1080×1920  | 360×640 | 720×1280 | 1080×1920 |    n/a    |
| Android QuadHD |  1440×2560  | 360×640 | 720×1280 | 1080×1920 | 1440×2560 |
| iPhone 3.5˝    |   320×480   | 320×480 |   n/a    |    n/a    |    n/a    |
| iPhone 3.5˝    |   640×960   | 320×480 | 640×960  |    n/a    |    n/a    |
| iPhone 4.0˝    |   640×1136  | 320×568 | 640×1136 |    n/a    |    n/a    |
| iPhone 4.7˝    |   750×1334  | 375×667 | 750×1334 |    n/a    |    n/a    |
| iPhone 5.5˝<sup>1</sup>|  1080×1920  | 414×736 | 828×1472 | 1242×2208 |    n/a    |

<sup>1</sup>: 1242×2208 is downsampled to 1080×1920 and therefor not pixel-perfect

The people of PaintCode have a great overview showing graphically [how these resolutions are related](https://www.paintcodeapp.com/news/iphone-6-screens-demystified).

## Which Image Sizes to Support High-Res Retina Screens

To support high-resolution retina screens we need a version with the highest x-factor for the specific device. QuadHD devices need a 4× image, HD devices a 2× one. And if you want to be pixel-perfect, you also have to support both portait and landscape modes. By that I don't mean the image dimensions but the way people hold their phones.

### Portrait Mode

| Device      | Screen Res. |  1×  |  2×  |  3×   |  4×   |
|-------------|:-----------:|:----:|:----:|:-----:|:-----:|
| Android     |  1440×2560  | 360× | 720× | 1080× | 1440× |
| iPhone 4.0˝ |   640×1136  | 320× | 640× |  n/a  |  n/a  |
| iPhone 4.7˝ |   750×1334  | 375× | 750× |  n/a  |  n/a  |
| iPhone 5.5˝ |  1080×1920  | 414× | 828× | 1242× |  n/a  |

Duplicate resolutions have been removed.

### Landscape Mode

| Device      | Screen Res. |  1×  |  2×   |  3×   |  4×   |
|-------------|:-----------:|:----:|:-----:|:-----:|:-----:|
| Android     |  1440×2560  | ×640 | ×1280 | ×1920 | ×2560 |
| iPhone 3.5˝ |   640×960   | ×480 | ×960  |  n/a  |  n/a  |
| iPhone 4.0˝ |   640×1136  | ×568 | ×1136 |  n/a  |  n/a  |
| iPhone 4.7˝ |   750×1334  | ×667 | ×1334 |  n/a  |  n/a  |
| iPhone 5.5˝ |  1080×1920  | ×736 | ×1472 | ×2208 |  n/a  |

Duplicate resolutions have been removed.


For Android devices portait `srcset` candidate resolutions would be `360×`, `720×`, `1080×`, and `1440×`. The corresponding landscape `srcset` would be `×640`, `×1280`, `×1920`, and `×2560`.