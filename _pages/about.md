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

I am a **High-Performance Computing (HPC) Systems Administrator** in [Research Computing](https://cores.research.asu.edu/computing-and-data-services/research-computing/about/) at the [Research Technology Office](https://cores.research.asu.edu/), Arizona State University, where my work centers on high-performance computing for scientific discovery. Driven by a passion for science rooted in my bioinformatics background, I work to accelerate research through system optimization, research software engineering, user collaboration, and community education.

My interests sit at the intersection of research software engineering, scientific workflows on shared HPC systems, and the benchmarking and tuning of heterogeneous and AI-accelerated architectures. Day to day, I:

- Help scientific workflows run well on shared Slurm clusters. My SC26 HPCSYSPROS workshop paper introduces [WfTune](https://github.com/NilaBlueshirt/WfTune), a toolkit that helps HPC sites choose a [Nextflow](https://www.nextflow.io/) deployment strategy by measuring workflow speed alongside the load it puts on the scheduler.
- Refactor genomic pipelines to modern [nf-core](https://nf-co.re/) standards in support of the [Earth BioGenome Project](https://www.earthbiogenome.org/), including an nf-core DSL2 rewrite of the Hiller Lab's [make_lastz_chains](https://github.com/hillerlab/make_lastz_chains) that is now merged upstream.
- Develop a large-scale virus detection and discovery pipeline as part of the NASA OSDR Microbiome Analysis Working Group.
- Benchmark ASU's supercomputers for the Top500 and Green500 lists, check Sol's nodes with a ReFrame test suite after each maintenance window, and benchmark Intel Gaudi2 accelerators, porting bioinformatics and protein LLMs and other scientific software to them.
- Maintain the scientific software stacks and bioinformatics databases that support genomics research across the institution, integrate HPC account management with university systems, and customize the Open OnDemand portal to support scientific applications and agentic AI functionality.

Beyond ASU, I serve on the Earth BioGenome Project's [Scientific Subcommittee on IT and Informatics](https://www.earthbiogenome.org/it-informatics), represent ASU's clusters in the [Energy Efficient HPC Working Group](https://eehpcwg.llnl.gov/), where I analyze HPC power and water usage data, and co-organize the SC26 Birds of a Feather session on operational data analytics and agentic AI for HPC facilities. I also mentor through [CCMNet](https://ccmnet.org/), serve as a cyberinfrastructure facilitator for the CIREN project, review proposals for the NAIRR Pilot, and teach as a [Carpentries](https://carpentries.org/) Certified Instructor.

Trained as a computational biologist, my earlier research applied explainable machine learning and metagenomic analysis to microbiome and viral genomics. As a Graduate Research Assistant in the [Efrem Lim Lab](https://limlab.org/) at the ASU Biodesign Institute, I contributed to genomic surveillance pipelines for the Arizona Department of Health Services COVID-19 Sequencing Project, and — in separate work — developed a genomic workflow that identified two novel bat coronaviruses.

I hold an M.S. in Computer Science (Biomedical Informatics) and a B.S. in Computer Science from Arizona State University, and a B.S. in Biology from Wuhan University. My peer-reviewed research has appeared in *mSystems*, *mBio*, and the *Journal of Biological Chemistry*, with conference contributions to SC, PEARC, US-RSE, and RMACC. I was selected for the SC26 Early Career Program.

You can browse my [research](/research/) or read my [curriculum vitae](/cv/). Feel free to reach out at [nil.mu@asu.edu](mailto:nil.mu@asu.edu).
