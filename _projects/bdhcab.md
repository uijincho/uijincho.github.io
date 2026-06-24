---
layout: page
title: Brown Daily Herald - Courses@Brown
description: python, jupyter, datawrapper
img: assets/img/publication_preview/bdhcab.png
importance: 1
category: data
---

## Background

As part of the Brown Daily Herald Data Desk, I contributed to a data journalism project analyzing a decade of course enrollment data at Brown University. Using Courses@Brown data spanning the 2016–17 to 2025–26 academic years, I built leaderboards of the most popular professors and courses by total student enrollment.

## Data Setup

I built the analysis pipeline in Python using Jupyter Notebook ([see code](https://github.com/uijincho/BDHDataDesk_S26/blob/main/cab-profs/profs-v2.ipynb)):

- Created a unified data frame by adding each year and semester individually, with fields including CRN, course title, course code, professor names (`prof1`, `prof2`, `morethan2profs`), and manually appended `year` and `semester` columns based on the source file
- Removed unnecessary fields and dropped non-lecture sections by keeping only sections starting with **S** (filtering out labs, discussions, etc.)

Some additional data manipulation and checking was done in CSV/Sheets: [Google Drive folder](https://drive.google.com/drive/folders/1PpEBeq7wMBLH0iU7eVE-itff-8W63p2z?usp=sharing)

## Top 30 Popular Professors by Enrollment

- Grouped courses by professor, preserving both instructors when a course had co-teachers
- Summed `totalenrollment` for each professor across all years and sorted in descending order
- Exported as CSV and visualized in Datawrapper

<div class="row justify-content-center">
    <div class="col-sm-8 mt-3 mt-md-0"> 
        <iframe title="Teaching Professor of Neuroscience John Stein taught over 7,000 students from 2016-17 to 2025-26 academic years" aria-label="Bar Chart" id="datawrapper-chart-BTVmX" src="https://datawrapper.dwcdn.net/BTVmX/16/" scrolling="no" frameborder="0" style="width: 0; min-width: 100% !important; border: none;" height="888" data-external="1"></iframe><script type="text/javascript">window.addEventListener("message",function(a){if(void 0!==a.data["datawrapper-height"]){var e=document.querySelectorAll("iframe");for(var t in a.data["datawrapper-height"])for(var r,i=0;r=e[i];i++)if(r.contentWindow===a.source){var d=a.data["datawrapper-height"][t]+"px";r.style.height=d}}});</script>
    </div>
</div>

## Top 30 Most Popular Courses by Enrollment

- Starting from the combined 2016–25 dataset, isolated course code and title
- Totaled enrollment across all years per course and sorted in descending order
- Exported as CSV and visualized in Datawrapper

<div class="row justify-content-center">
    <div class="col-sm-8 mt-3 mt-md-0"> 
        <iframe title="Over 7,000 students took Principles of Economics in the past decade" aria-label="Bar Chart" id="datawrapper-chart-igJFU" src="https://datawrapper.dwcdn.net/igJFU/10/" scrolling="no" frameborder="0" style="width: 0; min-width: 100% !important; border: none;" height="943" data-external="1"></iframe><script type="text/javascript">window.addEventListener("message",function(a){if(void 0!==a.data["datawrapper-height"]){var e=document.querySelectorAll("iframe");for(var t in a.data["datawrapper-height"])for(var r,i=0;r=e[i];i++)if(r.contentWindow===a.source){var d=a.data["datawrapper-height"][t]+"px";r.style.height=d}}});</script>
    </div>
</div>

## Full Article: A look into the most popular courses at Brown

<iframe src="https://projects.browndailyherald.com/2026/04/24/courses/" width="100%" height="600px" style="border: none;">
    <p>Your browser does not support iframes. <a href="https://projects.browndailyherald.com/2026/04/24/courses/">View the article</a> instead.</p>
</iframe>
<div class="caption">
    "A look into the most popular courses at Brown" — the Brown Daily Herald
</div>