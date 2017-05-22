---
layout: none
permalink: /feed.json
sitemap: false
---
{
  "version": "https://jsonfeed.org/version/1",
  "title": {{ site.name | smartify | jsonify }},
  "home_page_url": "{{ site.url }}/",
  "feed_url": "{{ site.url }}/feed.json",
  "author": {
    "name": "{{ site.author }}",
    "url": "https://keybase.io/michaelnordmeyer"
  },
  "icon": "{{ site.url }}/favicon.ico",
  "expired": false,
  "items": [
{% for post in site.posts %}
    {
      "id": "{{ post.id }}",
      "title": {{ post.title | smartify | jsonify }},
      "content_html": {{ post.content | jsonify }},
      "url": "{{ site.url }}{{ post.url }}",
      "summary": {% if post.excerpt %}{{ post.excerpt | smartify | jsonify }}{% else %}{{ post.description | smartify | jsonify }}{% endif %},
      "date_published": "{{ post.date }}"
    }{% unless forloop.last == true %},{% endunless %}
{% endfor %}
  ]
}