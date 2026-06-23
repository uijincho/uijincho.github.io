---
layout: page
title: Salton Sea H₂S CNN
description: python, supercomputing, jupyter, deep learning
img: assets/img/publication_preview/saltonsea.png
importance: 1
category: research
---

This summer, I'm working with [Dr. Mara Freilich](https://mara-freilich.github.io/) and Alejandra Lopez (Brown University) and the [Salton Sea Environmental Timeseries Project](https://saltonseascience.org/) to hindcast hydrogen sulfide (H₂S) emissions using satellite imagery of the Salton Sea in southern California.

<div class="row justify-content-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.html path="assets/img/publication_preview/saltonsea.png" title="Salton Sea project logo" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

## Background

The Salton Sea is California's largest lake and a major environmental and public health concern. As the lake has shrunk over decades, exposed lakebed and stagnant water have contributed to harmful air quality events — including periodic spikes in hydrogen sulfide, a toxic gas with well-documented health impacts on the surrounding Coachella Valley communities. Monitoring these emissions is difficult: ground-level sensors only capture H₂S under specific conditions, leaving substantial gaps in the historical record.

Others in my lab had previously developed machine learning models that classify individual days as high- or low-emission events using these sensor readings, but coverage was limited to certain wind conditions. My role is to extend this work by training convolutional neural networks (CNNs) on multispectral satellite imagery as a spatial proxy for H₂S, enabling hindcasting across more dates.

## Data Pipeline

I built an end-to-end pipeline that processes raw multispectral satellite imagery through cloud masking, area-of-interest clipping, and band stacking into analysis-ready arrays covering the full Salton Sea at high spatial resolution. Labels are assigned by joining satellite dates with H₂S sensor readings, using a threshold to define high-emission events.


## Model

The core model is a lightweight CNN designed to operate on the full spatial extent of the Salton Sea across four spectral bands. It was trained on Brown's supercomputer [Oscar](https://docs.ccv.brown.edu/oscar) using PyTorch, with chronologically structured train/val/test splits.

## Results

The best-performing models suggest that surface conditions visible from space are meaningfully predictive of H₂S events in the days that follow. Performance was evaluated using AUC-ROC on a held-out chronological test set.

<div class="row justify-content-center">
    <div class="col-sm-10 mt-3 mt-md-0">
        {% include figure.html path="assets/img/publication_preview/roc-curves.png" title="ROC curves" class="img-fluid rounded z-depth-1" %}
        <!-- PLACEHOLDER: ROC curves -->
    </div>
</div>

## Interpretability: Saliency Maps

A key component of this work is understanding where in the satellite image the model is looking. I computed multiple types of saliency maps (vanilla, guided, gradcam) for positive test samples to investigate which physical features of the lake surface drive predictions.

<div class="row justify-content-center">
    <div class="col-sm-10 mt-3 mt-md-0">
        {% include figure.html path="assets/img/publication_preview/saliency.png" title="Saliency map methods analysis" class="img-fluid rounded z-depth-1" %}
        <!-- PLACEHOLDER: saliency hotspots overlaid on spectral index maps -->
    </div>
</div>
<div class="caption">
    Three saliency methods (vanilla, guided, gradcam) applied to a true positive prediction, revealing which spatial regions most influence the model's output.
</div>

I also compared saliency hotspots against domain-specific spectral indices to probe what physical signal the model may be attending to — connecting model behavior back to hypotheses about H₂S precursors in the lake.

<div class="row justify-content-center">
    <div class="col-sm-10 mt-3 mt-md-0">
        {% include figure.html path="assets/img/publication_preview/spectral-index-comparison.png" title="Spectral index vs saliency" class="img-fluid rounded z-depth-1" %}
        <!-- PLACEHOLDER: saliency hotspots overlaid on spectral index maps -->
    </div>
</div>

## What's Next

Current efforts are focused on further optimizing model performance and refining predictions to be more actionable for community partners. This project represents my first end-to-end deep learning pipeline — from raw satellite data through model training, evaluation, and spatial interpretability — and I'm proud of how much ground it has covered.