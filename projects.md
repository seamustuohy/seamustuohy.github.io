---
layout: page
permalink: /projects/
title: Projects
description: "Highlighted projects and tools I have worked on."
---

{% for proj in site.data.projects %}
{% if proj.display %}
<br/>
{% if proj.image %}
<dl class="captioned-img alignleft" style="max-width:400px">
<dt><a href=""><img src="/images/{{proj.image}}" alt="proj.image_caption"></a></dt>
</dl>
{% endif %}

### [{{ proj.name }}]({{proj.project_url}})

{{proj.year}} - [source]({{proj.source_url}})

{{proj.description}}
{% endif %}
{% endfor %}
