---
layout: page
permalink: /projects/
title: Projects
description: 
years: [2026,2025,2024]
nav: true
nav_order: 1
---
<div class="publications">

<div class="filter-bar">
  <span class="filter active" data-filter="all">all</span> &nbsp;·&nbsp;
  <span class="filter" data-filter="data">data</span> &nbsp;·&nbsp;
  <span class="filter" data-filter="web">web</span> &nbsp;·&nbsp;
  <span class="filter" data-filter="app">app</span>
</div>

{%- for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}

</div>

<script src="{{ '/assets/js/filter.js' | relative_url }}"></script>