---
title: Opcaching
categories:
  - 'Technology'
tags:
  - 'Apache'
  - 'APC'
  - 'Digital Ocean'
  - 'Nginx'
  - 'Opcaching'
  - 'WordPress'
---
Cheap and Fast VPS Server for WordPress

I recommend to use opcache for opcode caching and memcached for object caching instead of using APC for both. The reason is that APC uses much more memory.

If you want to scale you need lots of PHP processes to serve lots of users.

When using APC for n PHP processes you need n APC caches for opcode and object caching (e.g. 64 MB each).

When using opcache and memcache for n PHP processes you need n opcaches (e.g. 32 MB each) and 1 memcache for object caching (e.g. 64 MB). You only need 1 memcache, because all data is saved in a single instance and accessible for all PHP processes.

Example: If you use 10 PHP processes APC caching needs 640 MB while opcahe and memcache needs 384 MB of memory.

My WordPress runs on the smallest Digital Ocean server (512 MB RAM for $5/month) having nginx with 4 PHP-FPM instances, 48 MB opcache (4x => 192 MB) and memcache with 64 MB and batcache as the WordPress caching plugin.

“Apache remains online all the time while PHP runs and content being sent to client. While nginx releases PHP as soon as it’s finished. Even making nginx a frontend in front of Apache can relieve the latter from great pains – working the same way, making Apache return resources way faster.”

Ubuntu 13.10
net.core.netdev_max_backlog=1000
net.core.somaxconn=128
net.ipv4.tcp_max_syn_backlog=1024
net.ipv4.tcp_fin_timeout=60
net.ipv4.tcp_keepalive_time=7200
net.ipv4.tcp_keepalive_intvl=75
net.ipv4.tcp_keepalive_probes=9
net.ipv4.ip_local_port_range= 32768 61000
fs.file-max=400360
ulimit -n 1024
Usually I increase this limit by adding a ulimit -n $fd_value to the init script of a certain service instead of increasing this limit as system wide.

php-fpm (or nginx?)
listen.backlog=128

nginx
worker_rlimit_nofile=

https://www.ruby-forum.com/topic/2730615
http://www.mervine.net/performance-testing-with-httperf
httperf test pipelining. https://en.wikipedia.org/wiki/Httperf
httperf --num-conns=50 --num-calls=1000 --server=michaelnordmeyer.com
siege
ab

Affiliate link to digital ocean?

Link to this at:

* http://www.stefandidak.com/2013/10/making-wordpress-fly-with-apc-varnish-memcached-and-more/
* https://www.branded3.com/blog/magento-performance-optimisation-apc-memcached-and-varnish/
* http://we.je/custom-bleeding-edge-lamp-nginxvarnishphpnode-js-running-wordpress-and-ghost-on-arch-linux-on-digital-ocean/ (notify about LEMP not LAMP)
* https://github.com/bdelbono/custom-lamp
* https://systemsarchitect.net/2013/03/28/apache2-vs-nginx-for-php-application/ (the benchmark probably only requested the HTML file and not the linked resources, which are many. This is where nginx + PHP is better than Apache + PHP)
