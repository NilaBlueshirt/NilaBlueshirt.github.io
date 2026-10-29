---
permalink: /
title: "About me"
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

{% include base_path %}

<div class="contact-terminal">
  <div class="contact-terminal__line"><span class="contact-terminal__prompt" aria-hidden="true">$</span> mail {{ site.author.email }}</div>
  <button type="button" class="contact-terminal__copy" data-copy-email="{{ site.author.email }}" aria-label="Copy email address" title="Copy email address" hidden>
    <svg class="contact-terminal__icon contact-terminal__icon--copy" viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="9" width="12" height="12" rx="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
    <svg class="contact-terminal__icon contact-terminal__icon--done" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6 9 17l-5-5"></path></svg>
  </button>
</div>
<script src="{{ base_path }}/assets/js/contact.js" defer></script>

I am a **High-Performance Computing (HPC) Systems Administrator** in [Research Computing](https://cores.research.asu.edu/computing-and-data-services/research-computing/about/) at the [Research Technology Office](https://cores.research.asu.edu/), Arizona State University, where my work centers on high-performance computing for scientific discovery. Driven by a passion for science rooted in my bioinformatics background, I work to accelerate research through system optimization, research software engineering, user collaboration, and community engagement.

My interests sit at the intersection of research software engineering, scientific workflows on shared HPC systems, and the benchmarking and tuning of heterogeneous and AI-accelerated architectures. Day to day, I:

- Help scientific workflows run well on shared Slurm clusters. I developed [WfTune](https://github.com/NilaBlueshirt/WfTune), an open-source framework for benchmarking workflow configurations, deployment strategies, and their interactions with local HPC schedulers. MIT-licensed and [available on PyPI](https://pypi.org/project/wftune/), it is extensible and portable across workflow managers (currently [Nextflow](https://www.nextflow.io/) and [Snakemake](https://snakemake.github.io/)), pipelines, and HPC sites. My accepted SC26 HPCSYSPROS paper showcases its use across four deployment strategies on two ASU clusters: the tuned pipeline cuts completion time by over 50% while reducing scheduler stress.
- Refactor genomic pipelines to modern [nf-core](https://nf-co.re/) standards for the [Earth BioGenome Project](https://www.earthbiogenome.org/) and the [Vertebrate Genomes Project](https://www.biorxiv.org/content/10.64898/2026.06.24.732306v1.abstract), including an nf-core DSL2 rewrite of the Hiller Lab's [make_lastz_chains](https://github.com/hillerlab/make_lastz_chains), merged upstream in May 2026. I am the project's third-largest contributor by commits. My US-RSE'26 paper distills that work into [ten practices](https://doi.org/10.5281/zenodo.22921770), which I also packaged as the [wms-hpc-refactor](https://github.com/NilaBlueshirt/WfTune/tree/main/skill/wms-hpc-refactor) agent skill for AI-assisted workflow refactoring.
- Develop a large-scale Nextflow virus detection and discovery pipeline with the [NASA OSDR Microbiome Analysis Working Group](https://science.nasa.gov/biological-physical/data/awg/).
- Facilitate a [CIREN](https://ciren.asu.edu/research/) project with Michael Lynch that simulates how early RNA-like organisms evolve under mutation, natural selection, and genetic drift, translating the original C++ research code into Python and accelerating large-population simulations with PyTorch on GPUs.
- Benchmark ASU's supercomputers for the [TOP500](https://top500.org/site/50960/), Green500, and other lists with HPL, HPCG, and HPL-MxP, and validate the clusters after each maintenance window with a ReFrame test suite of node-level and MPI checks.
- Port bioinformatics software, protein foundation models, and other scientific applications to Intel Gaudi2 accelerators and benchmark their performance.
- Maintain the scientific software stacks and bioinformatics databases that support genomics research across ASU, integrate HPC account management with the university registration database for automated account provisioning, and customize the Open OnDemand portal to support scientific applications and agentic AI functionality.

Beyond ASU, I serve on the Earth BioGenome Project's [Scientific Subcommittee on IT and Informatics](https://www.earthbiogenome.org/it-informatics), represent ASU's clusters in the [Energy Efficient HPC Working Group](https://eehpcwg.llnl.gov/), where I analyze HPC power and water usage data, and co-organize the SC26 Birds of a Feather session on [operational data analytics and agentic AI for HPC facilities](https://sc26.conference-program.com/presentation/?id=bof215&sess=sess395). I also mentor a [CCMNet](https://ccmnet.org/) project on [tuning workflow management systems on shared HPC resources](https://ccmnet.org/mentorships/tuning-workflow-management-system-shared-hpc-resources), review proposals for the NAIRR Pilot, and teach as a [Carpentries](https://carpentries.org/) Certified Instructor.

Trained as a computational biologist, my earlier research applied explainable machine learning and metagenomic analysis to microbiome and viral genomics. As a Graduate Research Assistant in the [Efrem Lim Lab](https://limlab.org/) at the ASU Biodesign Institute, I served on the Arizona Department of Health Services COVID-19 Sequencing Project team, building an ETL pipeline that managed sequencing data for over one-third of Arizona's COVID-19 patients at the time. In separate work, I built a genomic workflow that identified two novel bat coronaviruses.

I hold an M.S. in Computer Science (Biomedical Informatics) and a B.S. in Computer Science from Arizona State University. My peer-reviewed research has appeared in *mSystems*, *mBio*, and the *Journal of Biological Chemistry*, with conference contributions to SC, PEARC, US-RSE, and RMACC. I was selected for the SC26 Early Career Program and have received travel support from US-RSE (2025 and 2026), CCMNet, and RMACC.

You can browse my [research](/research/) or read my [curriculum vitae](/cv/). Feel free to reach out at [nil.mu@asu.edu](mailto:nil.mu@asu.edu).
