---
layout: archive
title: "CV"
permalink: /cv/
author_profile: true
redirect_from:
  - /resume
---

{% include base_path %}

<a href="{{ base_path }}/files/cv.pdf" class="btn btn--primary">Download CV as PDF</a>

Education
======
* M.S. in Computer Science (Biomedical Informatics), Arizona State University, 2023
* B.S. in Computer Science, Arizona State University, 2022
* B.S. in Biology, Wuhan University, 2017

Work experience
======
* Jan 2024 – Present: HPC Systems Administrator
  * Research Computing, Research Technology Office, Arizona State University — Tempe, AZ
  * Port bioinformatics LLMs and scientific software to Intel Gaudi2 accelerators and generate accompanying benchmark data
  * Develop benchmarking and post-maintenance testing software for heterogeneous HPC clusters
  * Tune workflow-management system performance and scheduling on Slurm-based HPC
  * Refactor genomic sequencing software to modern nf-core standards, contributing to the Earth BioGenome Project
  * Develop a large-scale Nextflow-based virus detection and discovery pipeline with the NASA OSDR Microbiome Analysis Working Group
  * Integrate the HPC account management system with the university registration database for automated account provisioning
  * Customize the Open OnDemand web portal to support scientific applications and agentic AI functionality
  * Manage HPC software stacks and databases; provide real-time troubleshooting for job, software, and hardware issues

* Jan 2022 – Dec 2023: Graduate Research Assistant
  * ASU Biodesign Institute, Efrem Lim Lab — Tempe, AZ
  * Developed an explainable neural network pipeline for microbiome-based classification of COVID-19 patient samples (400 features), using a multilayer perceptron (mean AUC 0.75) with SHAP for feature importance analysis
  * Designed a DBSCAN-based clustering workflow to establish the true-positive threshold for KrakenUniq classification output
  * Contributed to an open-source Python package for model-agnostic feature reduction methods
  * Served on the Arizona Department of Health Services COVID-19 Sequencing Project team; built an ETL pipeline managing sequencing data for over one-third of the Arizona patient population, reporting results to government agencies and hospitals
  * Built a generalizable genomic workflow that identified two novel bat coronaviruses from 250 raw samples on ASU supercomputing resources

* Jun 2021 – Jan 2022: Research Assistant
  * ASU School of Sustainable Engineering and the Built Environment — Tempe, AZ
  * Connected twelve analog and digital environmental sensors to Arduino Uno and Raspberry Pi platforms to build IoT sensor enclosures for mobile weather stations
  * Built a real-time Adafruit data dashboard integrating MQTT, Google Drive, and SQLite for data logging and visualization

* Sep 2020 – Jun 2021: Research Assistant
  * ASU School of Mathematical and Statistical Sciences — Tempe, AZ
  * Designed an undergraduate machine learning curriculum (MAT 400-level) that has been taught at ASU since Fall 2021
  * Processed 50,000 rows of U.S. population mobility data using the spectral clustering algorithm to model COVID-19 transmission patterns

* May 2020 – Aug 2020: Software Development and Testing Intern
  * Autowise.ai & Boschung — Chandler, AZ & Chicago, IL
  * Designed and executed software and hardware tests for a self-driving robotic street sweeper, resolving issues identified during virtual and real-world road trials
  * Reviewed and managed testing data, providing feedback and recommendations to the R&D and Business teams
  * Led relocation of the full test set from Chandler to Chicago, including establishing a new test environment, producing new LiDAR maps, and training personnel for ongoing operations

* Sep 2019 – Jan 2020: Volunteer Research Assistant
  * ASU Biodesign Institute — Tempe, AZ
  * Applied natural language processing and machine learning algorithms to find associations among genes across more than 1,700 biomedical papers, using Python and Excel
  * Extracted and cleaned protein sequences from over 3,500 records in the NCBI database, using Biopython, Pandas, and NumPy
  * Adapted multiple-sequence alignment, motif searching, and text-mining algorithms to cluster and identify universal features among antibody protein sequences

* Sep 2019 – Dec 2019: Research Assistant — ZooPhy Data Expansion Project
  * ASU Biodesign Center for Environmental Health Engineering (with Dr. Matthew Scotch) — Tempe, AZ
  * Developed the Geoname Climate Data Integration System (GCIS) for ZooPhy, supporting the reconstruction of virus spread through phylogeography
  * Integrated NOAA GHCN temperature and precipitation data — cleaned and parsed into a PostgreSQL relational database — to enhance ZooPhy's epidemiological and phylogeographic capabilities
  * Built a command-line interface to manage the databases

* Sep 2018 – Apr 2019: Research Affiliate
  * Mayo Clinic — Phoenix, AZ
  * Conducted field observations across Mayo Clinic ambulatory and ancillary care settings to analyze clinical-environment issues and observe provider–EHR interaction during migration to the Epic system, reporting findings in TOYOTA A3 problem-solving format
  * Proposed a Clinical Decision Support System (CDSS) based on Prescription Drug Monitoring Programs (PDMPs) for patient pain management; presented as a poster speaker at the 5th Annual Mayo Clinic–ASU BMI/BMD Student Poster and Employer Networking Event (April 2019)
  * Completed a two-month intensive introduction to medical terminology, human anatomy, and physiology

* Apr 2014 – Jan 2018: Research Assistant
  * Chinese Academy of Sciences — Wuhan, Hubei, China
  * Designed and conducted cell-biology and BSL-2 animal experiments, including the handling of infectious materials; co-authored a paper published in the *Journal of Biological Chemistry* (2017)
  * Project 1 — GPI anchor system genes regulate the formation of PrP in AsPC-1 cells
  * Project 2 — PrP responds to the TNFα-triggered NF-κB signaling pathway by preventing the deubiquitinase activity of CYLD on RIP1 and TRAF2 (published)
  * Project 3 — PrP expression influences the establishment of Herpes Simplex Virus Type 1 latency
  * Techniques: fluorescence microscopy, UV-Vis spectrophotometry, RT-PCR/qPCR/PCR, CRISPR/Cas9 gene editing, molecular cloning; SDS-PAGE, Native PAGE, Western blot, Co-IP, IP, and ELISA

* Jan 2014 – Sep 2015: Team Leader / Slides & Poster Speaker
  * iGEM Competition, Team WHU-China — Wuhan, China
  * Led a synthetic-biology project constructing a DNA criticality-detector circuit in *E. coli* as an automatic medicine-dosage threshold for addressing human dental caries
  * Awarded a Silver Medal at the iGEM 2015 Jamboree

Skills
======
* High-Performance Computing (HPC), Slurm, Linux cluster administration
* Research software engineering: Nextflow, nf-core, workflow optimization, benchmarking
* Bioinformatics and genomics pipelines
* Machine learning: neural networks (MLP), CatBoost, SHAP, DBSCAN, spectral clustering
* Python, ETL and data pipelines, relational and NoSQL databases
* Languages: English (full professional), Chinese (native/bilingual)

Publications
======
  <ul>{% for post in site.publications reversed %}
    {% include archive-single-cv.html %}
  {% endfor %}</ul>
  
Talks
======
  <ul>{% for post in site.talks reversed %}
    {% include archive-single-talk-cv.html  %}
  {% endfor %}</ul>
  
Teaching
======
  <ul>{% for post in site.teaching reversed %}
    {% include archive-single-cv.html %}
  {% endfor %}</ul>

Grants and fellowships
======
* USRSE Travel Grant — US-RSE '25 (Awarded)
* RMACC Scholarship — RMACC HPC Symposium 2026 (Awarded)
* CCMNet Travel Grant, Cyberinfrastructure Community-wide Mentorship Network — PEARC '26 (Awarded)
* Better Scientific Software (BSSw) Fellowship Program — 2027 cycle (Application in preparation)

Service and leadership
======
* Committee Member, Scientific Subcommittee on IT and Informatics, Earth BioGenome Project
* Planning Committee Member, Operational Data Analytics (ODA) Birds-of-a-Feather session, SC26
* ASU Cluster Representative, Energy Efficient HPC Working Group (EE HPC WG)
* Mentor, "Tuning Workflow Management Systems on HPC," Cyberinfrastructure Community-wide Mentorship Network (CCMNet), 2026
* Cyberinfrastructure Facilitator, CIREN project, 2026
* Certified Instructor, The Carpentries, 2024 – present

Certifications and professional development
======
* NSF-WildWEST Project Summer Field Camp — field engineering training, 2026
* CyberAmbassadors program (Engineering Futures) certificate, 2025
* Linux Cluster Institute entry- and intermediate-level certificates, 2024

Honors and awards
======
* Mathematical Contest in Modeling (MCM) 2021 — Successful Participant
* International Genetically Engineered Machine (iGEM) Competition 2015 — Silver Medal (Team WHU-China; Team Leader)
