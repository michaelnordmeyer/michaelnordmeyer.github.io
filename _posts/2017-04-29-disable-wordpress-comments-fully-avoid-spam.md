---
title: How to Disable WordPress Comments and Fully Avoid Spam
date: 2017-04-29T14:42:43+00:00
excerpt: Comment spam on WordPress blogs can easily be avoided without the need for plugins if you configure your own servers. Just turning off comments in settings will not stop spam.
layout: post
permalink: /disable-wordpress-comments-fully-avoid-spam
categories:
  - Web
tags:
  - Spam
  - WordPress
---
Comment spam on WordPress blogs can easily be avoided without the need for plugins if you configure your own servers. Just turning off comments in settings will not remove the ability for spammers to access the WordPress commenting facility.

The WordPress file `wp-comments-post.php` is responsible for accepting comments and is globally accessible. Disallowing access to this file altogether would mean nobody can ever submit a comment, regardless of what is configured in WordPress.

## The Basic Idea

The basic idea to fight spam is to only allow commenting if the referrer is your server. That’s always the case for legitimate commenters, because they have to be on the corresponding page using a browser to actually type and submit the comment. Spammers normally don’t set the referrer so they would be turned away.

For that to work we have to manually configure the web server which is running WordPress. I use nginx and stopped using Apache for performance reasons.

## nginx

We have to set valid referrers for which we conveniently choose nginx’s `server_name` variable, which has to be manually set for every virtual host. This is most likely the domain name. In my case it’s `michaelnordmeyer.com`.

<pre>location ~ /wp-comments-post\.php$ {
  valid_referers server_names;
  if ($invalid_referer) { return 403; access_log off; }
  include sites-available/php-fpm.include;
}</pre>

To be able to execute PHP for valid comments, we have to include the PHP settings so nginx knows how to submit the request to PHP. As I run Ubuntu Server all settings are stored in `/etc/nginx/sites-available/`. I chose to have a modular configuration setup so I included the settings from a file called `php-fpm.include` which looks like this:

<pre>location ~ \.php$ {
  include snippets/fastcgi-php.conf;
  fastcgi_pass unix:/var/run/php/php7.1-fpm.sock;
  fastcgi_keep_conn on;
}</pre>

Yours might look differently. I especially use a socket and not TCP to connect to PHP.

Logging is disabled for this particular use case to keep the logs clean `(access_log off)`.

## Apache

It should be a easy to adapt this to Apache. If there’s no equivalent `server_name` variable then just use your domain name.

## Conclusion

Regardless if comments are enabled in WordPress or not spammers won’t be able to submit spam anymore. And we don’t need a potentially insecure plugin for that.