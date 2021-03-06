---
layout: post
title: Snow day an experiment in bash web scraping
date: 2014-01-01
tags: bash scraping script
---

My current work follows federal government closures because we are in DC. We recently had a snow day at the office that I missed because the e-mail went out before I left the house. Well, I had enough and decided to automate the e-mails the instant the website changed to make sure that I never missed a snow day again.

<!--more-->

First I went to the site that gives the current status.


{% highlight bash %}
    http://www.opm.gov/policy-data-oversight/snow-dismissal-procedures/current-status/
{% endhighlight %}

First I went and viewed the page-source to see what the underlying code would be. Looking at the source I saw that the important text was within a div with the statusContainer class.

{% highlight bash %}
    <div class="StatusContainer">
      <div class="Status Open">
        <h2>Washington, DC, Area</h2>
            <p class="Date">Applies to: <strong>January 1, 2014</strong></p>
            <h3>Status: Open</h3>
            <p>Federal agencies in the Washington, DC, area are <strong>OPEN</strong>.  Employees are expected to report to their worksite or begin telework on time.</p>
      </div>
      <more code>...</more code>
    </div>
{% endhighlight %}

I wanted to do this as a bash function within the cron tab because it sounded fun and I am always looking for opportunities to play with wget.  NOTE: I am using the full text command flags in this post. You can use the shorthand flags as well. I like to use the full text command flags so that I can look back on my scripts and actually know what they do. It makes them more verbose, but easier to maintain, update, and read.

First I needed to grab the website. I chose wget to do this because it is my go to website scraper. Simply using wget with the url of the website will download it into a file in the current directory. But, I don't want to create a file every time I read the website so I will use the output command's - flag to send the page contents to standard output so that I can scrape it appropriately. I also used a quieted output so I only saw the webpage, and not the wget status.

{% highlight bash %}
        wget --quiet --output-document=- http://www.opm.gov/policy-data-oversight/snow-dismissal-procedures/current-status/
{% endhighlight %}

Once I had it piping correctly I created a small shell script to set it to a variable I could check against. While I would usually use sed to parse through a multi-line file, this data comes as a stream and can more cleanly be parsed with one or two greps. I only want to get the section above.

{% highlight bash %}
    #!/bin/bash

    current=$(wget --quiet --output-document=- http://www.opm.gov/policy-data-oversight/snow-dismissal-procedures/current-status/)

    section=$(echo $current |grep --only-matching --extended-regexp "class\=\"StatusContainer\".*Status: (Open|Closed)")
{% endhighlight %}

Next I want to check the date of the site. I am sure federal government's website admin's are on point, but I don't want to send false positives.

{% highlight bash %}
    mon=$(date +%B) # get the month
    day=$(date +%d |grep --only-matching "[^0].*") #they do not use a leading 0. Date does.
    year=$(date +%Y) # get the year
    date=$(echo $section |grep --only-matching "$mon $day, $year")
{% endhighlight %}

I want to grab the current status off the site. I use cut to separate the word "status:" from the actual status by cutting the string on its spaces and grabbing the section section

{% highlight bash %}
    status=$(echo $section |grep --only-matching --extended-regexp "Status\: (Open|Closed)" |cut --delimiter=" " --fields=2)
{% endhighlight %}

Finally, I place a little bit of logic at the end to make sure all my values are right and use sendmail to shoot out a short email. I also added a temporary file to make sure that when this code is run multiple times during a blizzard or other snow-pocolypse I don't send extraneous emails to everyone reminding them that they are trapped in winters cold grasp. For those who are less experienced, the *tmp* directory is cleared out after every reboot. This means if the machine reboots it will re-send the message. We keep our server on and on a generator, so i am not worried. But, if this is running on your desktop and the blizzard is giving you power on and off throughout the snowstorm it will send an email when it runs after every reboot.

{% highlight bash %}
    if [ "$status" == "Closed" ] && [ "$date" ] && [ ! -f "/tmp/.snowday" ]; then
            echo "SNOW DAY!!" >> /tmp/.snowday
        SUBJECT="Snow Day Today!"
        EMAIL="staff@your_workplace_here.com"
        echo "It's a snow day" | mail -s "$SUBJECT" "$EMAIL"
    elif  [ "$status" == "Open" ] && [ -f "/tmp/.snowday" ]; then
            rm /tmp/.snowday
    fi
{% endhighlight %}

Here is the full script put together.

{% highlight bash %}
    #!/bin/bash
    current=$(wget -q -O- http://www.opm.gov/policy-data-oversight/snow-dismissal-procedures/current-status/)
    section=$(echo $current |grep -o -E "class\=\"StatusContainer\".*Status: (Open|Closed)")

    mon=$(date +%B)
    day=$(date +%d |grep -o "[^0].*")
    year=$(date +%Y)
    date=$(echo $section |grep -o "$mon $day, $year")
    status=$(echo $section |grep -o -E "Status\: (Open|Closed)" |cut -d" " -f2)

    if [ "$status" == "Closed" ] && [ "$date" ] && [ ! -f "/tmp/.snowday" ]; then
            echo "SNOW DAY!!" >> /tmp/.snowday
        SUBJECT="Snow Day Today!"
        EMAIL="staff@your_workplace_here.com"
        echo "It's a snow day" | mail -s "$SUBJECT" "$EMAIL"
    elif  [ "$status" == "Open" ] && [ -f "/tmp/.snowday" ]; then
            rm /tmp/.snowday
        SUBJECT="Snow Day OVER!"
        EMAIL="staff@your_workplace_here.com"
        echo "The sun has arrived. Back to work you lollygaggers!" | mail -s "$SUBJECT" "$EMAIL"
    fi
{% endhighlight %}

I first copy my script into my local binaries directory and make it executable.

{% highlight bash %}
    cp snowday.sh /usr/local/bin/.
    chmod 755 /usr/local/bin/snowday.sh
{% endhighlight %}

And, now that the script is done and ready to run I have to set running.  If the fed has a standard time when they put up the site I would set it to that specific time every morning. Since I have no idea when they turn the snow alarm on I will just run it once every two hours. To do this I will have to paste the following line into my crontab.

{% highlight bash %}
    echo "0 */2 * * * /usr/local/bin/snowday.sh"
{% endhighlight %}

To do this I run = cron -e = which will open up an editor where I can paste the code in. After that I can sit back with my hot cocoa knowing I will never miss a snow-day again.

This was a fun little project, but I never actually used this script. I just signed up an email account to their listserv and had it forward emails sent to it about federal government closures to the entire office. Sometimes the easiest solution is the best, even if not the most fun. ;)
