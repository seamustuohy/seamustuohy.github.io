---
layout: page
title: CV
permalink: /cv/
---
{% capture cv_link %}{{"/files/seamus_tuohy_cv.pdf" | prepend: site.github.url }}{% endcapture %}

Download [PDF version]({{cv_link}})

{% include embedpdf.html source=cv_link width=100 height=800 %}
