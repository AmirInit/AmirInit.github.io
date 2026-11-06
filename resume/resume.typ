#set document(title: "Amir Parsa Rabiei | Curriculum Vitae", author: "Amir Parsa Rabiei")
#set page(paper: "a4", margin: (x: 1.55cm, y: 1.35cm))
#set text(font: ("Liberation Sans", "DejaVu Sans"), size: 9.7pt, fill: rgb("#242932"))
#set par(leading: 0.55em)
#show link: set text(fill: rgb("#315a75"))
#let ink = rgb("#152333")
#let muted = rgb("#505b66")
#let line-color = rgb("#c6d0d6")
#let section(title) = [
  #v(7pt)
  #text(size: 9pt, weight: "bold", fill: ink, tracking: 0.8pt)[#title]
  #v(3pt)
  #line(length: 100%, stroke: 0.5pt + line-color)
  #v(4pt)
]
#let role(title, org, date, body) = [
  #grid(columns: (1fr, auto), gutter: 6pt,
    [#text(weight: "bold", fill: ink)[#title] #text(fill: muted)[| #org]],
    [#text(size: 8pt, fill: muted)[#date]],
  )
  #v(2pt)
  #body
  #v(5pt)
]
#let bert = "https://arxiv.org/abs/2412.05591"
#let bert-rg = "https://www.researchgate.net/publication/386140009_BERTCaps_BERT_Capsule_for_Persian_Multi-Domain_Sentiment_Analysis"
#let gan = "https://www.researchgate.net/publication/391561422_A_survey_of_generative_adversarial_network_on_next_generation_network"
#let paper = "https://isnac.ir/show-paper/50740"
#let isca = "https://www.iscanews.ir/news/1206733/"
#let pana = "https://www.pana.ir/%D8%A8%D8%AE%D8%B4-%D8%A7%D8%AE%D8%A8%D8%A7%D8%B1-2/623615-%DA%A9%D8%B3%D8%A8-%D8%B1%D8%AA%D8%A8%D9%87-%D9%87%D8%A7%DB%8C-%D8%A8%D8%B1%D8%AA%D8%B1-%D8%A7%D8%B3%D8%AA%D8%A7%D9%86%DB%8C-%D8%AA%D9%88%D8%B3%D8%B7"
#let ana = "https://ana.ir/fa/news/889549/"
#let researchgate = "https://www.researchgate.net/profile/Amirparsa-Rabiei"

#text(size: 24pt, weight: "bold", fill: ink)[Amir Parsa Rabiei] \
#text(size: 10pt, fill: muted)[AI / Security Engineer · Quantitative Finance]
#v(5pt)
#text(size: 8pt)[
  #link("mailto:amirparsarabii@gmail.com")[amirparsarabii\@gmail.com] #h(5pt) | #h(5pt)
  #link("https://amirinit.github.io/")[amirinit.github.io] #h(5pt) | #h(5pt)
  #link("https://github.com/AmirInit")[GitHub] #h(5pt) | #h(5pt)
  #link(researchgate)[ResearchGate]
]

#section("PROFILE")
Researcher and systems engineer interested in machine learning, cybersecurity, quantitative finance, and the infrastructure behind reliable systems. Experience includes AI consulting and security operations, alongside research in language, networks, and computer vision.

#section("PROFESSIONAL EXPERIENCE")
#role("AI Consultant", "Deep Nex", "1402–1403 SH | approx. 2023–2025")[
  Artificial intelligence consulting and advisory work.
]
#role("SOC Engineer", "Arka", "1401 SH | approx. 2022–2023")[
  Security operations work within a Security Operations Center (SOC).
]
#text(size: 7.3pt, fill: muted)[SH denotes Solar Hijri calendar years; Gregorian years indicate the approximate calendar span, not exact employment dates.]

#section("SELECTED RESEARCH")
#text(weight: "bold", fill: ink)[BERTCaps: BERT Capsule for Persian Multi-Domain Sentiment Analysis] \
Co-authored study combining BERT and capsule models; reported 97.12% sentiment and 85.09% domain classification accuracy on Persian Digikala reviews. 2024. #link(bert)[arXiv] · #link(bert-rg)[ResearchGate]
#v(4pt)
#text(weight: "bold", fill: ink)[A Survey of Generative Adversarial Network on Next Generation Network] \
A survey of generative adversarial networks and their applications in next-generation networks. #link(gan)[ResearchGate]
#v(4pt)
#text(weight: "bold", fill: ink)[Deep Face Identification Using Incomplete Facial Data] \
Research on facial recognition with partial image data; International Congress of Science and Engineering, Japan. Title translated from Persian. #link(paper)[Paper record]

#section("RECOGNITION & MEDIA")
#text(weight: "bold", fill: ink)[First place, IRAN CTF] — national cybersecurity competition, 1402 SH. #link(isca)[ISCA News]
#v(3pt)
#text(weight: "bold", fill: ink)[Second place, Khwarizmi Youth Festival] — provincial student project recognition, 1396 SH. #link(pana)[PANA]
#v(3pt)
#text(weight: "bold", fill: ink)[Cybersecurity and information protection] — interview with ANA News Agency. #link(ana)[Interview]

#section("FOCUS & EDUCATION")
#text(weight: "bold", fill: ink)[Focus:] Machine learning, quantitative finance, security operations, Linux and systems, Python, Rust, containers. \
#text(weight: "bold", fill: ink)[Education:] Software engineering studies, Islamic Azad University, Hamadan.
