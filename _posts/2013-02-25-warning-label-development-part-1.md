---
layout: post
title: Warning Label Development, Part 1
categories: [warning label,security,anonymity,privacy,research]
date: 2013-02-25
lang: en
---

[See the original post on the
Commotion
website](https://web.archive.org/web/20160529221234/https://commotionwireless.net/blog/2013/02/25/warning-label-development-part-1/)

Commotion is not currently a secure circumvention tool. At some point that statement will not be true, but until then this fact must be known by anyone who interacts with Commotion. With the increasing popularity of digital circumvention tools, news outlets have pointed to Commotion as a possible tool for creating safe local communication networks when the usual channels are compromised. When an unfinished project like Commotion enters the spotlight, it is important to warn potential users about the limitations of the tools in development. In the circumvention and cryptography communities, this is usually done with a warning. This post will walk through our process for developing a warning label. We hope it will help new projects who face this same dilemma.

We decided to frame our search for a warning by asking two questions. What information is important for a potential user of Commotion to have to make an informed decision? How do we ensure the "ability of the individual reading [the warning] to understand the information sufficiently to take the desired action"[1] for their specific situation?

We brainstormed country-specific warnings that identified local threats from internet rights watchdogs[2] to create customized warnings for various levels of threat. But with location anonymizing tools[3] and individual variability in threats, we decided to create a unified warning that focuses on what Commotion can't do.  Broadly, Commotion is a tool-kit that allows wireless routers, laptop and desktop computers, rooted android phones, and software-defined cell phone basestations to find and communicate with and through each other.  What Commotion is unable to do is a trickier question.

Commotion is unable to do many things. It cannot ride a bike or do my taxes. But, most users will not expect these things. In order to tell potential users what Commotion cannot do, we needed to find out the potential set of functionality users expect of Commotion. To discover possible expectations, we poured over our own outreach and the press we have received to see what it conveyed to those who read it. Here is a collection of salient snippets, and what functionality we gleaned from them.

Secure independent wireless for conflicts and disasters:

> "[The] Internet in a Suitcase is basically a software program aimed at giving people in conflict or disaster zones the ability to establish a secure, independent wireless network over their computers and cell phones." [4]

Device and centralized infrastructure-independent tool which eliminates surveillance and monitoring while ensuring the identity of those you communicate with:

> "This is a completely ad hoc network, there's no dependency of any device on any other device and that eliminates a central point for command and control surveillance and monitoring," said Meinrath. "We also have authentication between each hop on the network and encryption across each hop." [4]

Free phone calls:

> "The killer app that I talk with a lot of folks about is, if you have a system like this, there's no reason you would ever need to pay for local phone calls again" once you've downloaded the software allowing your device to join the wifi network, "because you're just pinging machine to machine over a local network," said Meinrath. [4]

Cheap tech for routers and Android phones for dissidents to evade censorship:

> "He and a team of software engineers are developing open-source software to turn cheap wireless access points and Android smartphones into nodes on the network, which could then be used by dissidents to evade censorship and to spread low-cost connections everywhere around the world." [6]

Easy to install and set up:

> ”The firmware provides auto-configuration capabilities,” said Brian Duggan, one of the engineers on the Internet in a Suitcase project, “so you don’t need to be an engineer” to install it. “You flash as many nodes as you want, or pick up previous ones.” [6]

Delay tolerant access to the Internet:

> “You could have a delay-tolerant Twitter, where people on the local network could see your tweets and then when a connection is restored it could get pushed to the internet,” Meinrath said. “We are in the very infancy of this kind of intranet.” [6]

We're rock stars (totally true):

> "One operation out of a spy novel in a fifth-floor shop on L Street in Washington, where a group of young entrepreneurs who look as if they could be in a garage band are fitting deceptively innocent-looking hardware into a prototype “Internet in a suitcase.” [5]

Separate from existing infrastructure, impossible to shut down, control, and surveil:

> “We’re going to build a separate infrastructure where the technology is nearly impossible to shut down, to control, to surveil.” [5]

Decentralized network using phones, computers:

> "Commotion is an open-source communication tool that uses mobile phones, computers, and other wireless devices to create decentralized mesh networks." [7]

Share the internet:

> "Commotion software also allows users on a mesh network to share access to the Internet. The software does not provide Internet access, but it does allow multiple devices to share their connections."  [7]

Robust network that ensures anonymity and circumvents censorship even when other communication systems have failed:

> "Commotion is a flexible set of tools that can work well in many different scenarios. They can grow, shrink, and move as necessary and according to available resources. Commotion is organized and maintained by community members to fit their needs. It can act as a backbone for last-mile infrastructure, a local community network, a circumvention and anonymity ensuring communication channel, or a local emergency communications infrastructure when existing systems are severed." [7]

This set of quotes gave us an idea of what we have presented as the current and future states of Commotion, and therefore, what users may expect from Commotion when they go to download it. We took these quotes and compiled a list of what the current release of Commotion is NOT yet able to do.

**Commotion does not:**

-   Provide anonymity
-   Provide delay tolerant communications
-   Prevent monitoring of your internet use
-   Allow you to call to non-Commotion enabled phones
-   Provide a simple user interface for installation or customization
-   Prevent monitoring of Commotion mesh communication
-   Prevent jamming/DoS attacks against a Commotion mesh
-   Provide access without power
-   Provide strong encryption
-   Provide protection from malware on devices

With this list in hand we narrowed down to the points that increase the ability of a potential user to make an informed decision about their security. Commotion does not:

-   Provide anonymity
-   Prevent monitoring of internet traffic
-   Provide strong security over the mesh
-   Resist jamming or DDoS attacks
-   Protect your device from Malware

In [Part 2](https://web.archive.org/web/20160529221156/https://commotionwireless.net/blog/2013/02/25/warning-label-development-part-2/), we'll go over how we used this list of unimplemented security features to develop a warning label.
