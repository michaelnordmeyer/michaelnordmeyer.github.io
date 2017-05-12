---
title: Nginx GZIP Compression Level
categories:
  - Technology
---
http://nginx.org/en/docs/http/ngx_http_gzip_module.html

gzip_comp_level 4;

Sets a gzip compression level of a response. Acceptable values are in the range from 1 to 9, default is 1.

Good display of the different compression levels for **your** URL and content.
http://www.gidnetwork.com/tools/gzip-test.php

Shows gzip to be off, which is wrong. Google Pagespeed Online and 
http://www.whatsmyip.org/http-compression-test/ both showed

While testing random URLs of my site it showed 4 or 5 is best, depending on the contents. I opted for 4, because the savings where negligible (less than 0.5 % difference).