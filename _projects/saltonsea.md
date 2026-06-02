---
layout: page
title: Salton Sea H2S Project
description: python, supercomputing, jupyter, deep learning
img: assets/img/publication_preview/saltonsea.png
importance: 1
category: research
---
This summer, I'm working with [Dr. Mara Freilich](https://mara-freilich.github.io/) and Alejandra Lopez (Brown University) and the [Salton Sea Environmental Timeseries Project](https://saltonseascience.org/) to hindcast hydrogen sulfide using satellite imagery of the Salton Sea in southern California.

<div class="row justify-content-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.html path="assets/img/publication_preview/saltonsea.png" title="salton sea project logo" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

I'll be expanding upon already developed and categorized machine learning models that identified certain days as higher-than-normal hydrogen sulfide levels using surface-level air quality monitors nearby. However, the identification was dependent on multiple conditions (e.g. wind direction), so there are many gaps in the data.

My role in the project will be to develop convolutional neural networks (CNNs) using the [MODIS satellite](https://modis.gsfc.nasa.gov/) data as a proxy for hydrogen sulfide, building off of the existing data and hindcast hydrogen sulfide levels.

Some technology I will be using is Python and Jupyter notebooks, specifically the PyTorch library on Brown's supercomputer, [Oscar](https://docs.ccv.brown.edu/oscar).

I'm particularly excited about this project because this will be the first time I independently develop a complete deep learning pipeline, as well as the fact that I'll be collaborating with the Salton Sea Environmental Timeseries project and the nearby Salton Sea/Coachella Valley community.