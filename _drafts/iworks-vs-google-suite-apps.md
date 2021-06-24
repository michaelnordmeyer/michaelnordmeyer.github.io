---
title: Google Apps vs. iWorks / iCloud
categories: Miscellaneous
tags:
  - Google Apps
  - iCloud
---
Broken:

* dates: dates are exported as ordinary numbers like 40269 for 01.04.2010 because of 12/30/1899. Other base dates are 01.01.1900 and 01.01.1904
* currencies: default currency sign won't be exported. It’s just numeric. But the non-default are exported as type currency

don’t use accounting for currency in Excel. If imported into iWorks you’ll get -00€.

Microsoft Excel Date System, Base date epoch

* 1900: DOS and Windows
* 1904: Macintosh 1-9
* 1970: Unix (Linux, BSD, SunOS, macOS, etc)
* 2001: [macOS CoreFoundation Time Utilities](https://developer.apple.com/reference/corefoundation/1666533-time_utilities)

https://support.microsoft.com/en-us/kb/180162
