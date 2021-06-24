---
title: Blogging App Desk Looks Cool But Behaves Badly
date: 2015-01-30T01:42:49+00:00
excerpt: I bought Desk because I wanted to get an undistracted writing experience and some Markdown for good measure. Unfortunately Desk is too buggy to provide this yet.
layout: post
permalink: /blogging-app-desk-looks-cool-behaves-badly
redirect_from: /blogging-app-desk-looks-cool-behaves-badly/
categories: Technology
tags:
  - Apps
  - Blogging
  - macOS
  - WordPress
---
I bought [Desk](https://desk.pm/) because I wanted to get an undistracted writing experience and some Markdown for good measure. Unfortunately Desk is too buggy to provide this yet.

#### Update

_This is a living post, meaning I’m going to update it if new versions of Desk are going to be released._ (Desk 1.2 and 1.3 fix some problems. Strikethrough text has been fixed.)

While it’s possible to use an editor like [Byword](https://itunes.apple.com/us/app/byword/id420212497?mt=12), [iA Writer](https://itunes.apple.com/us/app/ia-writer/id775737590?mt=12), [WriteRoom](https://itunes.apple.com/us/app/writeroom/id417967324?mt=12) or [OmmWriter Dāna II](https://itunes.apple.com/us/app/ommwriter-dana-ii/id412347921?mt=12) providing this experience, I didn’t want to manually copy and paste the post in the end into WordPress running in a browser.

I have an old license for [MarsEdit](https://www.red-sweater.com/marsedit/), but I never liked the writing experience. It even felt old-fashioned when I bought it in 2006 as a bundle license with [NetNewsWire](http://www.netnewswireapp.com/), an RSS reader from the same indie developer.

I have the habit to focus on the bad stuff, because the good stuff is covered in the App’s description and [the mood video](https://vimeo.com/105360935) pretty well. So don’t get me wrong ([Hi John](https://john.do/shitty-2/ "The developer of Desk writing about harsh feelings when receiving strong critique.")) because Desk has a lot of promise. I use Desk 1.1 with WordPress 4.1 in WYSIWYG mode.

## What’s Good

A limited feature set clad in a gorgeous outfit. Writing feels _so much better_.

## What’s Missing: Advanced Features

These features would be convenient and match WordPress features. But I only use them every once in a while so they’re not very important.

  * ~~Scheduled publishing for posting in the future. E.g. write two posts at once but publish them on different days.~~
  * ~~Post formats like post, link or video.~~ Post formats text (standard), image, quote and link are supported. Video, audio, gallery, chat, aside and status are not. Personally, I only miss video and gallery.
  * Media settings like ~~captions~~, titles, alt text. Maybe link to and sizes. Have a look at the media upload dialog of WordPress to know what I mean.
  * Excerpts, especially if you use WordPress SEO to use special excerpts for SEO purposes.
  * Auto-completion of tags.
  * Only the last eight published posts are visible and editable. Using Desk on an established blog makes it impossible to edit old posts. So Desk cannot be a one stop solution and you still have to use WordPress in your browser.

## What’s Wrong

Small bugs and user experience annoyances.

  * CMD+S saves locally. I’d like to have it saved as a draft on my WordPress server. This would allow me to edit this later on using my iPhone or iPad while being on the road.
  * The buttons on the right are unintuitive. Clicking `Update Post` lets me update the post. But if I want to close the sidebar I cannot click `Update Post` again. I have to click `Share`. Granted, `Share` is highlighted, but I would have expected `Update Post` to be highlighted.
  * ~~CMD+I formats text cursively but also adds huge whitespace before and after the cursive text. A rendering bug. After typing enter for a new paragraph or typing a backspace the text display fixes itself. Ugly.~~
  * The “Good Job” confirmation dialog after updating a draft. How many times do I have to click `OK`? And does the `Update Post` sidebar slides away automatically? No. I also have to dismiss it. That makes four clicks for updating a post. Meh!
  * Full screen mode is ~~useless~~ not very useful. ~~The margins are to narrow which means the lines are getting too long. And that is on a MacBook Air 13”.~~ The text ist scaled automatically, which means the type is getting very large. Way to large for my taste. On a 27” display it’s a joke. So the only way to get a less distracting writing experience is to hide all other windows and having a desktop without any icons on it and a hidden dock.
  * ~~The preview mode is quite ugly. No margins and a line-height which is too small.~~ Previews are okay now. But I would prefer to see a real preview like I get when using WordPress directly to see the applied theme.
  * ~~Drafts created in WordPress won’t show paragraphs in Desk. It’s just a long continous flow of text and you have to re-enter paragraph breaks.~~
  * It’s cumbersome to change settings for a draft or post before posting. You have to use

## What’s Seriously Wrong

Broken stuff. The bad ones.

  * ~~Pasting a header is not possible. Seriously, try it.~~ Pasting a header only pastes the text and deletes the styling. In fact every paste pastes without styling.
  * Changing formatting to a header ~~is not possible if there’s no text in the line you want to change the formatting in~~ creates a new paragraph before the current line, places the cursor in the new paragraph and applies the header style. ~~If you hit enter to subsequently type a header you have to type first and then format. Doing it the other way round will make the cursor jump to another place in your text change the paragraph which is located before the header.~~
  * ~~Selecting a header to type a different header will delete the header but doesn’t display your typed characters but place your cursor at the end of the previous paragraphs.~~
  * Creating an unordered list will place the cursor in the middle of the last hyped character. (I experienced this once but couldn’t reproduce this behavior)
  * Pasting an unordered list will mess up the list. The last list element will be correctly pasted but the former elements will be indented one level deep and an empty paragraph will be inserted between all list elements.
  * ~~Adding text before the first header is not possible if the header is the first line. Hitting enter won’t create a new line.~~
  * Deleting styled elements like unordered lists or headers by selecting a couple of line and hitting backspace deletes this elements, but sometime there’s some funny cursor movement involved after deleting.

All this makes using Desk a very unsatisfying experience. From a user’s perspective using stock WordPress in a browser is a much better experience. Which is a pity because I really like the approach John, the developer, is taking with Desk. ~~But I’m tempted to return the app even though I bought it at 50% off.~~