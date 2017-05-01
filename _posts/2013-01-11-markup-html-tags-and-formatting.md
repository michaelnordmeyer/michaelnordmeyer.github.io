---
title: 'Markup: HTML Tags and Formatting'
date: 2013-01-11T20:22:19+00:00
layout: post
permalink: /markup-html-tags-and-formatting
redirect_from:
  - /markup-html-tags-and-formatting/
  - /blog/markup-html-tags-and-formatting/
categories:
  - Markup
tags:
  - test
  - content
  - css
  - formatting
  - html
  - markup
---
## Headings

# Header one

## Header two

### Header three

#### Header four

##### Header five

###### Header six

## Blockquotes

Single line blockquote:

> Stay hungry. Stay foolish.

Multi line blockquote with a cite reference:

> People think focus means saying yes to the thing you’ve got to focus on. But that’s not what it means at all. It means saying no to the hundred other good ideas that there are. You have to pick carefully. I’m actually as proud of the things we haven’t done as the things I have done. Innovation is saying no to 1,000 things. 

<cite>Steve Jobs</cite> – Apple Worldwide Developers’ Conference, 1997

## Tables

<table>
  <tr>
    <th>
      Employee
    </th>
    
    <th>
      Salary
    </th>
    
    <th>
    </th>
  </tr>
  
  <tr>
    <th>
      <a href="http://example.org/">John Doe</a>
    </th>
    
    <td>
      $1
    </td>
    
    <td>
      Because that’s all Steve Jobs needed for a salary.
    </td>
  </tr>
  
  <tr>
    <th>
      <a href="http://example.org/">Jane Doe</a>
    </th>
    
    <td>
      $100K
    </td>
    
    <td>
      For all the blogging she does.
    </td>
  </tr>
  
  <tr>
    <th>
      <a href="http://example.org/">Fred Bloggs</a>
    </th>
    
    <td>
      $100M
    </td>
    
    <td>
      Pictures are worth a thousand words, right? So Jane x 1,000.
    </td>
  </tr>
  
  <tr>
    <th>
      <a href="http://example.org/">Jane Bloggs</a>
    </th>
    
    <td>
      $100B
    </td>
    
    <td>
      With hair like that?! Enough said…
    </td>
  </tr>
</table>

## Definition Lists

<dl>
 	<dt>Definition List Title</dt>
 	<dd>Definition list division.</dd>
 	<dt>Startup</dt>
 	<dd>A startup company or startup is a company or temporary organization designed to search for a repeatable and scalable business model.</dd>
 	<dt>#dowork</dt>
 	<dd>Coined by Rob Dyrdek and his personal body guard Christopher "Big Black" Boykins, "Do Work" works as a self motivator, to motivating your friends.</dd>
 	<dt>Do It Live</dt>
 	<dd>I'll let Bill O'Reilly will [explain](https://www.youtube.com/watch?v=O_HyZ5aW76c "We'll Do It Live") this one.</dd>
</dl>

## Unordered Lists (Nested)

  * List item one 
      * List item one 
          * List item one
          * List item two
          * List item three
          * List item four
      * List item two
      * List item three
      * List item four
  * List item two
  * List item three
  * List item four

## Ordered List (Nested)

  1. List item one 
      1. List item one 
          1. List item one
          2. List item two
          3. List item three
          4. List item four
      2. List item two
      3. List item three
      4. List item four
  2. List item two
  3. List item three
  4. List item four

## HTML Tags

These supported tags come from the WordPress.com code [FAQ](http://en.support.wordpress.com/code/ "Code").

**Abbreviation Tag**

The abbreviation <abbr>srsly</abbr> stands for “seriously” "seriously".

**Address Tag**

<address>
  1 Infinite Loop<br>
  Cupertino, CA 95014<br>
  United States
</address>

**Anchor Tag (aka. Link)**

This is an example of a [link](http://apple.com "Apple").

**Cite Tag**

“Code is poetry.” —<cite>Automattic</cite>

**Code Tag**

You will learn later on in these tests that `word-wrap: break-word;` will be your best friend.

**Delete Tag**

This tag will let you <del>strikeout text</del>.

**Emphasize Tag**

The emphasize tag should _italicize_ text.

**Insert Tag**

This tag should denote <ins>inserted</ins> text.

**Keyboard Tag**

This scarcely known tag emulates <kbd>keyboard text</kbd>, which is usually styled like the `<code>` tag.

**Preformatted Tag**

This tag styles large blocks of code.

<pre>.post-title {
    margin: 0 0 5px;
    font-weight: bold;
    font-size: 38px;
    line-height: 1.2;
    and here's a line of some really, really, really, really long text, just to see how the PRE tag handles it and to find out how it overflows;
}</pre>

**Quote Tag**

<q>Developers, developers, developers…</q> —Steve Ballmer

**Quote and Cite Tags**

<q>Developers, developers, developers…</q> —<cite>Steve Ballmer</cite>

**Strong Tag**

This tag shows **bold text.**

**Subscript Tag**

Getting our science styling on with H<sub>2</sub>O, which should push the “2” down.

**Superscript Tag**

Still sticking with science and Isaac Newton’s E = MC<sup>2</sup>, which should lift the 2 up.

**Variable Tag**

This allows you to denote <var>variables</var>.

**Jekyll Code Highlighting**

```ruby
def show
  @widget = Widget(params[:id])
  respond_to do |format|
    format.html # show.html.erb
    format.json { render json: @widget }
  end
end
```
