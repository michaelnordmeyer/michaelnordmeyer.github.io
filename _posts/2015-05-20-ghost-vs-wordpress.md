---
title: The State of Ghost vs. WordPress
date: 2015-05-20T11:38:00+00:00
excerpt: I do like the concept of Ghost, but I'm not committing to a product where I'm missing important features compared to WordPress.
layout: post
permalink: /ghost-vs-wordpress
redirect_from: /ghost-vs-wordpress/
categories: Technology
tags:
  - Blogging
  - Ghost
  - WordPress
---
After two years in, [Ghost is taking a look back](https://blog.ghost.org/year-2/). They are profitable and show how they spent their money. It’s a long but very good read.

What I consider epic is the [publicly available revenue data](https://ghost.org/about/#metrics) of hosted Ghost, which is called [Ghost(Pro)](https://ghost.org/pricing/), and the rest of the non-profit company that the Ghost Foundation is.

I do like the concept of Ghost, but I’m not committing to an “unfinished” product, where I’m missing important features compared to WordPress. Comparing WordPress to Ghost is a little bit unfair, because WordPress exists so much longer and has a huge plugin repository. So I tested some versions over time but never made the jump from WordPress to Ghost.

## Evolvement of Ghost

I go to the public [Ghost roadmap](https://trello.com/b/EceUgtCL/ghost-roadmap) every once in a while to see what they’re up to. There were a couple of things missing, which I consider essential for running a blog. Most of those have been added in 2015.

  * **Navigation menu for pages**. Before you had to edit the theme directly to add pages to a menu. This feature is rudimentary.
  * **Prev/Next post links**, to link posts in single post view.
  * **Generate sitemap.xml**, for search engines to easier find all your content.
  * **Open Graph Tags by default**, for displaying the articles title, excerpt and image automatically on Facebook or Twitter when being shared.
  * **Mobile uploads in editor**. Without this I couldn’t post images to articles when being on my iPhone or iPad. The [WordPress app on iOS](https://itunes.apple.com/us/app/wordpress/id335703880?mt=8) or [Android](https://play.google.com/store/apps/details?id=org.wordpress.android) is still much better, though.
  * **Tag management**, for editing or deleting tags. This feature is rudimentary.
  * **Better RSS feed**, to include the featured image.

Now it seems Ghost would be ready to replace WordPress for me. Almost.

## Features I’m still missing

The current version (0.6.3) is still missing a couple of features:

  * **[Post filter menu](https://trello.com/c/7GUDsl3J/48-post-filter-menu)**, to easily find my drafts (I have dozens) or to only show my published posts.
  * **Search**, to be able to search the post content only. Google site search is very inconvenient if you search for a phrase which is also in your menu or footer, because you’ll get _all_ of your pages as a result.
  * **(Semi-)Automatic updates**. I like my blog keeping updated automatically. If this is not possible I like to get an email if an update is available and press a button in the admin area to manually update.

Interestingly, everything I want I do get from WordPress today.

## Ghost’s Promise of Speed

Ghost promised to be faster than WordPress, which can be quite heavy on servers. Compared to stock WordPress, Ghost’s performance is 3–4 times better. Using plenty of plugins, WordPress is getting even slower.

But caching can speed up WordPress tremendously. On my setup (nginx, Batcache, memcache, Zend PHP opcache) caching improves WordPress performance 50 times. So my cached WordPress blog is 15 times faster than Ghost, which doesn’t support caching out of the box.

## Bottom line Ghost vs. WordPress

Ghost is much slower than cached WordPress. And I’m still missing a couple of features. So I’m staying with WordPress for now and keep on waiting.