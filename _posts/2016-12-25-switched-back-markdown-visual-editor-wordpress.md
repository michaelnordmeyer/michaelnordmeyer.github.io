---
title: Why I Switched Back From Markdown to Visual Editor on WordPress
date: 2016-12-25T14:17:00+00:00
excerpt: I was an early adopter of Markdown. Now I use WordPress' visual editor exclusively again with great results and don't miss Markdown a bit.
layout: post
permalink: /switched-back-markdown-visual-editor-wordpress
categories:
  - Web
tags:
  - Blogging
  - WordPress
---
I was an [early adopter](/why-i-chose-wordpress-thoughts-from-wordcamp-08) of [Markdown](https://daringfireball.net/projects/markdown/). Markdown is a straight-forward way to write HTML without having to drown in tag soup.

## The Problem with Markdown in WordPress

Markdown is more of an afterthought in WordPress. It has been officially supported when WordPress was more than eight years old. Because of the way WordPress stores Markdown in the database (attribute `post_content_filtered` in table `wp_posts`) it is more of a hack. It should be stored in the canonical place in the database (attribute `post_content` in table `wp_posts`). But in there there’s only HTML, which gets updated automatically when the post is saved.

I use a WordPress plugin called [Broken Link Checker](https://wordpress.org/plugins/broken-link-checker/) to check for broken links on my site. If the plugin finds those links, I can easily correct broken links on the Broken Link Checker result screen. This is much easier than to open the post in a new tab, finding the link in the text, edit and subsequently save it. The only problem is that Broken Link Checker only knows about `post_content` and edits the HTML stored in there. Which means the Markdown is gone afterwards. ([More very technical details](https://wordpress.stackexchange.com/questions/113387/when-is-the-post-content-filtered-column-in-database-cleared-by-wordpress))

But being WordPress there are plugins which can convert your HTML posts to Markdown. But they also have to store it in the wrong place. So the cycle repeats.

## A Realization

After a couple of cycles I realized that a) Markdown can be converted to HTML and vice-versa a couple of times and I don’t lose any data, and b) the visual editor got much better. Especially supporting themes change the visual editor’s text display to match the theme’s display. So you see while editing not only bold and italics etc., but _exactly_ the look you’ll get when the post has been published.

## The Future

This was about two years ago. Now WordPress even uses native apps to replace the old wp-admin interface. The apps work like the WordPress.com website, even for self-hosted WordPress installs like mine. And there are mobile apps for iOS and Android as any self-respecting company has. So the need for Markdown is not very high in those scenarios.

It’s even a bad idea to use Markdown in those mobile apps. You can successfully write in Markdown, but after publishing all the editing has to be done in HTML text view. Iiek.

For editing text files directly which eventually produce HTML pages for static blog engines, Markdown is still king-of-the-hill. But this is about WordPress. So no Markdown for me anymore.

The only downside of the current visual editor: you have to use text view (HTML) to see all links immediately without clicking on them. Not a big problem though.