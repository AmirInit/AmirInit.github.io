#set document(title: "Amir - Resume", author: "Amir")
#set page(
  paper: "a4",
  margin: (x: 1.5cm, y: 1.5cm),
)
#set text(
  font: ("Inter", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"),
  size: 10pt,
  fill: rgb("#2b2b2b"),
)

// Accent color
#let accent-color = rgb("#000000")

#show heading: set text(fill: accent-color)
#show heading.where(level: 1): it => block(
  width: 100%,
  stroke: (bottom: 1pt + accent-color),
  inset: (bottom: 0.3em),
  spacing: 1.2em,
  [#text(size: 12pt, weight: "bold", it.body)]
)

#show heading.where(level: 2): it => block(
  spacing: 0.8em,
  [#text(size: 11pt, weight: "bold", it.body)]
)

// Monospace text (technical terms)
#show raw: set text(font: ("Fira Code", "Courier", "monospace"), size: 9pt)

// Header
#align(center)[
  #text(size: 24pt, weight: "bold", fill: accent-color)[Amir] \
  #v(0.2em)
  #text(size: 12pt, weight: "medium")[AI Researcher & Systems Engineer] \
  #v(0.4em)
  #text(size: 9pt)[
    #link("https://github.com/AmirInit")[github.com/AmirInit] |
    #link("https://t.me/bootparsa")[t.me/bootparsa] |
    #link("mailto:amir@example.com")[amir\@example.com]
  ]
]

= Core Expertise
- *Active Research:* Large Language Models (LLMs), Reinforcement Learning from Human Feedback (RLHF), Distributed Training, Transformer Architectures.
- *Core Production:* `Python`, `C++`, `Rust`, `Go`, `CUDA`, `PyTorch`, `JAX`, `TensorRT`, `Triton`.
- *Tooling & Systems:* `Kubernetes`, `Docker`, `Ray`, `CI/CD`, `Apache Kafka`, `gRPC`, `PostgreSQL`.

= Experience & Research

== Senior AI Systems Engineer
*Tech Nova Labs* | *San Francisco, CA* \
_June 2021 - Present_
- Engineered a distributed training pipeline using `PyTorch` and `Ray`, accelerating LLM pre-training by 35% across 512 A100 GPUs.
- Architected a low-latency inference engine leveraging `TensorRT` and `CUDA` custom kernels -> Achieved sub-50ms latency for a 7B parameter model under high concurrency.
- Designed and deployed robust API gateways with `Go` and `gRPC` -> Scaled to support over 100K requests per second with 99.99% uptime.

== Machine Learning Researcher
*Quantum Cognitive Institute* | *Boston, MA* \
_August 2018 - May 2021_
- Investigated novel self-attention mechanisms -> Published findings at NeurIPS 2020 demonstrating a 15% reduction in memory overhead.
- Developed an automated hyperparameter optimization framework utilizing Bayesian optimization -> Reduced experiment iteration times by 40%.
- Curated and pre-processed a multi-modal dataset comprising 10TB of text and image pairs -> Enabled the training of foundational multimodal models.

= Selected Projects & System Architectures

== Project Valhalla: Decentralized Federated Learning
- Open-source framework written in `Rust` and `Python` for privacy-preserving distributed learning.
- Implemented secure multi-party computation (SMPC) protocols to encrypt model gradients -> Ensured zero knowledge leakage during client-server aggregation.
- *Tech Stack:* `Rust`, `PyTorch`, `gRPC`, `Cryptography`.

== NeuralSynth: Real-Time Audio Generation
- Developed an end-to-end generative model for real-time procedural audio synthesis using `C++` and `JAX`.
- Optimized the synthesis graph for embedded devices -> Reached real-time synthesis capabilities on ARM Cortex-M microcontrollers.
- *Tech Stack:* `C++`, `JAX`, `WebAssembly`, `DSP`.

= Education

== Master of Science in Computer Science
*Massachusetts Institute of Technology (MIT)* | _2016 - 2018_
- Specialization: Artificial Intelligence and Distributed Systems.
- Key Courses: Advanced Machine Learning, Parallel Computing, Probabilistic Graphical Models.
- Thesis: "Optimizing Communication Bottlenecks in Decentralized Deep Learning Networks"

== Bachelor of Science in Mathematics and Computer Science
*Stanford University* | _2012 - 2016_
- Graduated with Honors.
- Key Courses: Real Analysis, Linear Algebra, Data Structures and Algorithms, Operating Systems.
