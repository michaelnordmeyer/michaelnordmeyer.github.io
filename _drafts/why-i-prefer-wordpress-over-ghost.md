---
title: Why I Prefer WordPress Over Ghost
categories:
  - Web
tags:
  - Blogging
  - WordPress
---
* Only tags. Categories have to be converted to tags first.
* No media import. Has to be uploaded manually or use Cloudinary.
* Only one media size.
* No image alignment.
* (taken from Wp2Ghost export plugin)

I would like to switch WordPress for a more modern and simpler blogging system. Unfortunately Ghost has a lot to wish for. I tested Ghost and other systems quite a lot and Ghost shows the most promise. This comparison only shows the things I cannot live without or are at least very important and is based on the current iterations of both, WordPress 4.7 and Ghost 1.0 Alpha 9.

* No sitemap.xml for better SEO (is in the works but probably takes a while).
* No pinging of search engines for published or edited posts for better SEO.
* No image management. Images which are deleted from posts cannot be reused via the admin interface. The still exist on the server and have to be either inserted manually via pasting the URL or deleted manually from the file system via FTP or terminal.
* No menu where pages are automatically added to which means I cannot easily add pages.
* No site search for users
* No search in admin for articles or pages.
* No categories, just tags.
* No tag management.
* No native comments (Disqus is possible, but tracks people).
* The internal analytics also counts visits by yourself or other logged in users. Also there’s no distinction between visits and uniques.
* No autosave on iOS. If you change to another tab the tab having the draft might get reloaded automatically by iOS so your unsaved changes are gone.
* No way of using images in posts on iOS. There are no CTRL/CMD keys on iOS to insert the images and therefore no way to upload them.
* (No way of changing abstracts in blog feed)
* No edit link while viewing your own published posts. You have to hack the URL and append “edit”.
* Ghost’s WordPress export plugin only exports HTML from WordPress, even though the posts are saved in Markdown.

I think I have to wait some time until Ghost has matured a little more. The main problem I have with Ghost is the stance of the development team and the founder John O'Nolan in particular. They promised to deliver a simpler, more personal blogging platform without the multitude of options WordPress has. Have a look at the [Kickstarter campaign](https://www.kickstarter.com/projects/johnonolan/ghost-just-a-blogging-platform). “Just a blogging platform”, they said. No CMS. But a fancy statistics view. They dropped the statistics view as something that’s too much for them. Too complicated. But now they want to have plugins, [apps in Ghost’s parlance](https://trello.com/c/gud0CiJj). The Ghost roadmap is public and can be viewed on [Ghost’s Trello board](https://trello.com/b/EceUgtCL/ghost-roadmap).
