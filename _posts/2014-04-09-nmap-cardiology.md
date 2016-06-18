---
layout: post
title: Nmap cardiology
date: 2014-04-09
tags: lua nmap script
---

*NOTE: This post requires a very basic understanding of Lua, or the willingness to not cate about syntax and just follow along for the principles.*

## Using nmap scripting to test the heartbleed bug

A few days ago the [Heartbleed bug](http://heartbleed.com/) came out which allowed attackers to read the memory of systems using a vulnerable version of OpenSSL. *Reading the memory* will allow attackers to steal even the encryption keys which make *all* secure traffic *ever* monitored to and from one of these systems decryptable. But, that happened a whole two days ago (as of when I put fingers to keyboard on this piece). If you are reading this blog, you probobly know that. So, what I decided to do this morning is to build a script to identify, and notify, vulnerable systems.

To start I need to gather my tools. Nmap has a robust [script library](http://nmap.org/nsedoc/) already, and I don't want to write what I don't have to. Heartbleed was orginally released on April 7th 2014. It is 7:50am on April 9th and there is already a Heartbleed vulnerability scripted up and uploaded to the script library&#x2026; I am as dissapointed as you are. But, since this was supposed to simply be a nmap scripting lesson, and open source is rooted in reuse, we are not going to re-implement this from scratch. Instead, we are going to use this script to make a vulnerability notifier.

The first thing we need to do is set up our script. This simply means that I write a description, author information, licsence, and assign this script to a set of categories. You can find details about this in the [script formatting documentation.](http://nmap.org/book/nse-script-format.html)

{% highlight lua %}
    description = [[ Identifies servers who are vulnerable to heartbleed and
    then notifies the current owner of the ip address with an e-mail. ]]

    author = "Seamus Tuohy "
    license = "Same as Nmap--See http://nmap.org/book/man-legal.html"
    categories = { "vuln", "safe", "discovery"}
{% endhighlight %}

I took the categories directly from the heartbleed script and added a *discovery* category because the [documentation](http://nmap.org/book/nse-usage.html#nse-categories) uses that section to note scripts that are "querying public registies." I am going to need to query public registries to find the contact info of server owners, so I also fit into this category.

Since we already have the heartbleed script, and we simply want to add e-mail the owner of an ip-address I am going to use an existing [whois this ip](http://nmap.org/nsedoc/scripts/whois-ip.html") script to gather the e-mails from the ip addresses we scan. With these two scripts already in place we simply have to build the glue to place them together.

For those who are dissapointed that this is starting to sound more and more like an excecise in becoming a /script kiddie,/ I am sorry. But, that is what you get for having a robust community of developers working together. All the interesting problems are solved.
