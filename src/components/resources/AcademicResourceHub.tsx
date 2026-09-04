"use client";

import React, { useState, useMemo } from "react";
import { useResearchStore } from "@/store/useResearchStore";
import { useI18n } from "@/lib/i18n";
import {
  Globe,
  BookOpen,
  Database,
  PenTool,
  ExternalLink,
  Search,
  Filter,
  Copy,
  Check,
  Sparkles,
  Layers,
  FileCheck2,
  Cpu,
  Share2,
  FolderSearch,
  CheckCircle2,
  SlidersHorizontal,
  Bookmark
} from "lucide-react";

export interface AcademicResource {
  id: string;
  name: string;
  category: "literature" | "datasets" | "diagrams";
  badge: string;
  badgeBn: string;
  badgeColor: "indigo" | "emerald" | "purple" | "cyan" | "amber" | "rose";
  url: string;
  secondaryUrl?: string;
  secondaryUrlLabel?: string;
  secondaryUrlLabelBn?: string;
  utility: string;
  utilityBn: string;
  bestFor: string;
  bestForBn: string;
  disciplines: string[];
  disciplinesBn: string[];
}

export const ACADEMIC_RESOURCES: AcademicResource[] = [
  // --- Category 1: Direct Open-Access Literature Hub ---
  {
    id: "google-scholar",
    name: "Google Scholar",
    category: "literature",
    badge: "Universal Citation Engine",
    badgeBn: "সার্বজনীন সাইটেশন ও পেপার সার্চ",
    badgeColor: "indigo",
    url: "https://scholar.google.com",
    utility: "Global search engine indexing peer-reviewed papers, theses, preprints, technical reports, and court opinions.",
    utilityBn: "বিশ্বের সকল একাডেমিক পেপার, থিসিস, বই ও আদালতের রায় অনুসন্ধানের সর্ববৃহৎ ফ্রি সার্চ ইঞ্জিন।",
    bestFor: "Universal citation tracking, one-click BibTeX/APA exports, finding institutional PDFs, and discovering related articles.",
    bestForBn: "সাইটেশন ট্র্যাকিং, বিবটেক্স ও এপিএ রেফারেন্স এক্সপোর্ট এবং পেপারের উন্মুক্ত PDF কপি খুঁজে পাওয়ার জন্য সেরা।",
    disciplines: ["All Disciplines", "Computer Science", "Engineering", "Business", "Health", "Social Sciences"],
    disciplinesBn: ["সকল বিভাগ", "কম্পিউটার সায়েন্স", "ইঞ্জিনিয়ারিং", "ব্যবসায়", "স্বাস্থ্যবিজ্ঞান", "সমাজবিজ্ঞান"]
  },
  {
    id: "arxiv",
    name: "arXiv.org",
    category: "literature",
    badge: "Preprints (Zero Paywall)",
    badgeBn: "প্রিপ্রিন্ট ওপেন অ্যাক্সেস (বিনামূল্যে)",
    badgeColor: "cyan",
    url: "https://arxiv.org",
    utility: "Pioneering open-access archive for over 2.4 million scholarly articles curated by Cornell University.",
    utilityBn: "কর্নেল ইউনিভার্সিটি পরিচালিত ২.৪ মিলিয়নেরও বেশি প্রিপ্রিন্ট গবেষণাপত্রের উন্মুক্ত ঐতিহাসিক আর্কাইভ।",
    bestFor: "Cutting-edge breakthroughs in Computer Science, Artificial Intelligence, Machine Learning, Math, Physics, and Quantitative Finance.",
    bestForBn: "কম্পিউটার সায়েন্স, কৃত্রিম বুদ্ধিমত্তা, গণিত ও পদার্থবিজ্ঞানের একদম সাম্প্রতিক গবেষণা পেপার পেওয়াল ছাড়া পড়া।",
    disciplines: ["Computer Science", "Artificial Intelligence", "Mathematics", "Physics", "Quant Finance"],
    disciplinesBn: ["কম্পিউটার সায়েন্স", "কৃত্রিম বুদ্ধিমত্তা", "গণিত", "পদার্থবিজ্ঞান", "কোয়ান্ট ফাইন্যান্স"]
  },
  {
    id: "researchgate",
    name: "ResearchGate",
    category: "literature",
    badge: "Direct Author Full-Texts",
    badgeBn: "লেখকদের সরাসরি আপলোড ও যোগাযোগ",
    badgeColor: "emerald",
    url: "https://www.researchgate.net",
    utility: "World's largest academic professional network connecting 25+ million active researchers and professors.",
    utilityBn: "বিশ্বের ২৫ মিলিয়নেরও বেশি গবেষক ও অধ্যাপকদের সরাসরি নেটওয়ার্ক এবং সম্পূর্ণ পেপারের উন্মুক্ত সংগ্রহশালা।",
    bestFor: "Requesting paywalled PDFs directly from primary authors, academic networking, tracking citations, and direct scholarly Q&A.",
    bestForBn: "লেখকদের থেকে সরাসরি পেপারের PDF চেয়ে নেওয়া এবং আন্তর্জাতিক গবেষকদের সাথে প্রশ্ন-উত্তর ও সাইটেশন বিনিময়ের জন্য সেরা।",
    disciplines: ["All Disciplines", "Life Sciences", "Engineering", "Medicine", "Social Sciences"],
    disciplinesBn: ["সকল বিভাগ", "লাইফ সায়েন্সেস", "প্রকৌশল", "চিকিৎসাবিজ্ঞান", "সমাজবিজ্ঞান"]
  },
  {
    id: "semantic-scholar",
    name: "Semantic Scholar",
    category: "literature",
    badge: "AI-Powered TL;DR Takeaways",
    badgeBn: "এআই-চালিত সংক্ষেপ ও প্রভাব বিশ্লেষণ",
    badgeColor: "purple",
    url: "https://www.semanticscholar.org",
    utility: "AI-backed scientific literature engine created by the Allen Institute for Artificial Intelligence (AI2).",
    utilityBn: "অ্যালেন ইনস্টিটিউট ফর এআই (AI2) নির্মিত কৃত্রিম বুদ্ধিমত্তা চালিত বৈজ্ঞানিক লিটারেচার সার্চ ইঞ্জিন।",
    bestFor: "One-sentence AI TL;DR summaries, Highly Influential Citations metric, and instant open-access PDF matching.",
    bestForBn: "এক বাক্যে পেপারের মূল সারসংক্ষেপ (TL;DR), প্রভাবশালী সাইটেশন ফিল্টার এবং সরাসরি আনপেওয়ালড PDF লিঙ্ক পাওয়ার জন্য সেরা।",
    disciplines: ["Computer Science", "Neuroscience", "Medicine", "AI", "General Science"],
    disciplinesBn: ["কম্পিউটার সায়েন্স", "নিউরোসায়েন্স", "চিকিৎসাবিজ্ঞান", "এআই", "বিজ্ঞান"]
  },
  {
    id: "core-base",
    name: "CORE & BASE Repositories",
    category: "literature",
    badge: "Global Institutional Archives",
    badgeBn: "গ্লোবাল ইউনিভার্সিটি রিপোজিটরি সার্চ",
    badgeColor: "indigo",
    url: "https://core.ac.uk",
    secondaryUrl: "https://www.base-search.net",
    secondaryUrlLabel: "Open BASE Search",
    secondaryUrlLabelBn: "BASE সার্চ পোর্টাল",
    utility: "Harvests over 250 million open-access papers directly from thousands of universities and institutional repositories worldwide.",
    utilityBn: "বিশ্বের হাজার হাজার বিশ্ববিদ্যালয় ও ইনস্টিটিউশনাল আর্কাইভ থেকে ২৫০ মিলিয়নেরও বেশি উন্মুক্ত পেপারের মেগা-সংগ্রহ।",
    bestFor: "Unlocking institutional thesis dissertations, technical reports, and non-commercial open-access scholarship globally.",
    bestForBn: "বিশ্ববিদ্যালয়ের অভ্যন্তরীণ রিপোজিটরির অপ্রকাশিত মূল্যবান গবেষণাপত্র ও মাস্টার্স/পিএইচডি থিসিস উন্মুক্তভাবে খোঁজা।",
    disciplines: ["Institutional Research", "Multidisciplinary", "Theses & Dissertations"],
    disciplinesBn: ["প্রাতিষ্ঠানিক গবেষণা", "বহুবিষয়ক", "থিসিস ও গবেষণাপত্র"]
  },
  {
    id: "pubmed-central",
    name: "PubMed Central (PMC)",
    category: "literature",
    badge: "Biomedical & Health Full-Text",
    badgeBn: "বায়োমেডিক্যাল ও স্বাস্থ্য পূর্ণাঙ্গ আর্কাইভ",
    badgeColor: "rose",
    url: "https://pmc.ncbi.nlm.nih.gov",
    utility: "Free full-text archive of biomedical, clinical, health, and life sciences journal literature at the US NIH / NLM.",
    utilityBn: "ইউএস ন্যাশনাল লাইব্রেরি অব মেডিসিন (NLM) পরিচালিত ফ্রি বায়োমেডিক্যাল ও লাইফ সায়েন্স পেপার আর্কাইভ।",
    bestFor: "Clinical healthcare trials, epidemiology, pharmacology, microbiology, and PRISMA systematic biomedical reviews.",
    bestForBn: "ফার্মাসি, জনস্বাস্থ্য, ক্লিনিক্যাল ট্রায়াল এবং মেথডলজিক্যাল বায়োমেডিক্যাল গবেষণার পূর্ণাঙ্গ পেপার পড়ার জন্য সেরা।",
    disciplines: ["Medicine", "Public Health", "Pharmacy", "Biotechnology", "Life Sciences"],
    disciplinesBn: ["চিকিৎসাবিজ্ঞান", "জনস্বাস্থ্য", "ফার্মাসি", "বায়োটেকনোলজি", "জীবন বিজ্ঞান"]
  },

  // --- Category 2: Comprehensive Open Dataset Repositories Hub ---
  {
    id: "google-dataset-search",
    name: "Google Dataset Search",
    category: "datasets",
    badge: "Cross-Disciplinary Meta-Search",
    badgeBn: "সর্বজনীন ডেটাসেট মেটা-সার্চ",
    badgeColor: "indigo",
    url: "https://datasetsearch.research.google.com",
    utility: "Google's specialized scientific crawler indexing tabular data, geospatial layers, and repositories across the web.",
    utilityBn: "বিশ্বজুড়ে উন্মুক্ত সিএসভি, জিও-স্পেশাল এবং বৈজ্ঞানিক ডেটাসেট খোঁজার গুগলের নিজস্ব সার্চ ইঞ্জিন।",
    bestFor: "Discovering raw datasets, government open-data portals, environmental data, and university research archives.",
    bestForBn: "বিশ্ববিদ্যালয় ও সরকারি পোর্টালে থাকা যেকোনো বিষয়ের ভেরিফায়েড কাঁচা ডেটা (Raw Data) খুঁজে পাওয়ার জন্য সেরা।",
    disciplines: ["All Disciplines", "Environmental Science", "Economics", "Computer Science"],
    disciplinesBn: ["সকল বিভাগ", "পরিবেশ বিজ্ঞান", "অর্থনীতি", "কম্পিউটার সায়েন্স"]
  },
  {
    id: "huggingface-datasets",
    name: "Hugging Face Datasets Hub",
    category: "datasets",
    badge: "ML, NLP & Vision Benchmarks",
    badgeBn: "মেশিন লার্নিং ও এআই বেঞ্চমার্ক",
    badgeColor: "amber",
    url: "https://huggingface.co/datasets",
    utility: "World's primary collaborative hub hosting 150,000+ machine learning datasets with online viewers and 1-line Python loading.",
    utilityBn: "১৫০,০০০ এরও বেশি এআই ও মেশিন লার্নিং ডেটাসেটের সর্ববৃহৎ ওপেন হাব, যা ১-লাইন পাইথন কোডে লোড করা যায়।",
    bestFor: "Natural Language Processing (NLP) text corpora, computer vision image collections, audio, and multimodal training benchmarks.",
    bestForBn: "এনএলপি টেক্সট করপাস, কম্পিউটার ভিশন ইমেজ ও অডিও ডেটাসেট পাইথনে সরাসরি লোড করে ট্রেইনিং করানোর জন্য সেরা।",
    disciplines: ["Artificial Intelligence", "NLP", "Computer Vision", "Deep Learning", "Data Science"],
    disciplinesBn: ["কৃত্রিম বুদ্ধিমত্তা", "এনএলপি", "কম্পিউটার ভিশন", "ডিপ লার্নিং", "ডেটা সায়েন্স"]
  },
  {
    id: "uci-ml-repo",
    name: "UCI Machine Learning Repository",
    category: "datasets",
    badge: "Standard Benchmark Archives",
    badgeBn: "ক্লাসিক অ্যাকাডেমিক বেঞ্চমার্ক",
    badgeColor: "cyan",
    url: "https://archive.ics.uci.edu",
    utility: "University of California, Irvine's historic archive of standardized benchmark datasets established in 1987.",
    utilityBn: "ইউনিভার্সিটি অব ক্যালিফোর্নিয়া আর্ভিন পরিচালিত মেশিন লার্নিং বেঞ্চমার্ক ডেটাসেটের ঐতিহাসিক আর্কাইভ।",
    bestFor: "Gold-standard reproducible machine learning experiments (Iris, Heart Disease, Adult, Wine, Bank Marketing).",
    bestForBn: "মডেলের নির্ভুলতা তুলনামূলক যাচাই (Ablation/Benchmark) করার জন্য সুপ্রতিষ্ঠিত ক্লিন ডেটাসেটের জন্য সেরা।",
    disciplines: ["Machine Learning", "Data Mining", "Statistics", "Predictive Analytics"],
    disciplinesBn: ["মেশিন লার্নিং", "ডেটা মাইনিং", "পরিসংখ্যান", "প্রেডিক্টিভ অ্যানালিটিক্স"]
  },
  {
    id: "kaggle-datasets",
    name: "Kaggle Datasets",
    category: "datasets",
    badge: "Community & Real-World Data",
    badgeBn: "কমিউনিটি ও বাস্তব ডেটাসেট",
    badgeColor: "cyan",
    url: "https://www.kaggle.com/datasets",
    utility: "Over 200,000 curated community and industry datasets complete with runnable Jupyter exploratory data analysis notebooks.",
    utilityBn: "রানযোগ্য পাইথন নোটবুক ও এক্সপ্লোরেটরি ডেটা এনালাইসিসসহ ২ লক্ষাধিক বাস্তবসম্মত ডেটাসেট।",
    bestFor: "Real-world domain datasets across healthcare, retail e-commerce, banking fraud, finance, and predictive modeling.",
    bestForBn: "বাস্তব জীবনের বিজনেস, ফিনান্স, স্বাস্থ্য ও প্রকৌশল বিষয়ক সিএসভি ডেটাসেট এবং রেডিমেড এনালাইসিস কোড পাওয়ার জন্য সেরা।",
    disciplines: ["Data Science", "Business Administration", "Finance", "Healthcare Analytics"],
    disciplinesBn: ["ডেটা সায়েন্স", "ব্যবসা প্রশাসন", "ফিন্যান্স", "হেলথকেয়ার অ্যানালিটিক্স"]
  },
  {
    id: "worldbank-who-data",
    name: "World Bank Data & WHO GHO",
    category: "datasets",
    badge: "Global Socio-Economic & Health",
    badgeBn: "অর্থনৈতিক ও বিশ্ব স্বাস্থ্য সূচক",
    badgeColor: "emerald",
    url: "https://data.worldbank.org",
    secondaryUrl: "https://www.who.int/data/gho",
    secondaryUrlLabel: "WHO Health Observatory",
    secondaryUrlLabelBn: "WHO স্বাস্থ্য পরিসংখ্যান",
    utility: "Official global repositories for country-level macroeconomic indicators, developmental statistics, and public health metrics.",
    utilityBn: "বিশ্বব্যাংক ও ডব্লিউএইচও-র বৈশ্বিক উন্নয়ন সূচক, স্বাস্থ্য পরিসংখ্যান ও অর্থনৈতিক ডেটা।",
    bestFor: "Macroeconomic time-series, GDP, poverty indices, infant mortality, cross-national regression, and public health policy.",
    bestForBn: "অর্থনীতি, ব্যবসা, সমাজবিজ্ঞান ও স্বাস্থ্যনীতির তুলনামূলক স্ট্যাটিস্টিক্যাল ও প্যানেল রিগ্রেশন অ্যানালাইসিসের জন্য সেরা।",
    disciplines: ["Economics", "Public Health", "Development Studies", "Social Sciences", "Governance"],
    disciplinesBn: ["অর্থনীতি", "জনস্বাস্থ্য", "উন্নয়ন অধ্যয়ন", "সমাজবিজ্ঞান", "প্রশাসন"]
  },
  {
    id: "zenodo-figshare",
    name: "Zenodo & Figshare Open Science",
    category: "datasets",
    badge: "Citable DOIs & Open Science",
    badgeBn: "সাইটেবল ডিওআই ও ওপেন সায়েন্স",
    badgeColor: "purple",
    url: "https://zenodo.org",
    secondaryUrl: "https://figshare.com",
    secondaryUrlLabel: "Visit Figshare",
    secondaryUrlLabelBn: "Figshare পোর্টাল",
    utility: "CERN and Digital Science-backed open repositories granting permanent, citable Digital Object Identifiers (DOIs).",
    utilityBn: "সার্ন (CERN) ও ডিজিটাল সায়েন্স পরিচালিত ওপেন ডাটাবেজ যা স্থায়ী citable DOI প্রদান করে।",
    bestFor: "Long-term research data preservation, publishing your own thesis datasets, and citing open science artifacts.",
    bestForBn: "নিজের থিসিসের ডেটা প্রকাশ করে নিজস্ব DOI নেওয়া এবং আন্তর্জাতিক বৈজ্ঞানিক ডেটা সাইট করার জন্য সেরা।",
    disciplines: ["All Scientific Disciplines", "Open Science", "Reproducible Research"],
    disciplinesBn: ["সকল বিজ্ঞান বিভাগ", "উন্মুক্ত বিজ্ঞান", "পুনরুৎপাদনযোগ্য গবেষণা"]
  },

  // --- Category 3: Diagram, Architecture & Flowchart Design Suite ---
  {
    id: "draw-io",
    name: "draw.io (diagrams.net)",
    category: "diagrams",
    badge: "100% Free & Open-Source Vector",
    badgeBn: "সম্পূর্ণ ফ্রি ভেক্টর ডায়াগ্রামিং",
    badgeColor: "indigo",
    url: "https://app.diagrams.net",
    utility: "Zero-cost, browser-based and offline vector diagram creator for system architecture, workflow pipelines, and neural nets.",
    utilityBn: "কোনো ওয়াটারমার্ক বা ফি ছাড়া ব্রাউজারে বা অফলাইনে ভেক্টর ডায়াগ্রাম আঁকার সেরা ওপেন-সোর্স টুল।",
    bestFor: "System architecture diagrams, workflow pipelines, UML class models, and crisp SVG/PDF/PNG exports for IEEE/ACM papers.",
    bestForBn: "সিস্টেম আর্কিটেকচার, ইউএমএল, অ্যালগরিদম ফ্লোচার্ট এবং থিসিস বা জার্নালের জন্য হাই-রেজুলেশন SVG/PDF এক্সপোর্টের জন্য সেরা।",
    disciplines: ["Computer Science", "Software Engineering", "All Engineering Disciplines"],
    disciplinesBn: ["কম্পিউটার সায়েন্স", "সফটওয়্যার ইঞ্জিনিয়ারিং", "সকল প্রকৌশল বিভাগ"]
  },
  {
    id: "canva-academic",
    name: "Canva for Research & Posters",
    category: "diagrams",
    badge: "Visual Abstracts & Posters",
    badgeBn: "গ্রাফিক্যাল অ্যাবস্ট্রাক্ট ও পোস্টার",
    badgeColor: "cyan",
    url: "https://www.canva.com",
    utility: "Intuitive graphical design studio featuring high-quality templates for scientific posters, visual abstracts, and slides.",
    utilityBn: "কনফারেন্স পোস্টার প্রেজেন্টেশন ও গ্রাফিক্যাল অ্যাবস্ট্রাক্ট সহজে তৈরির জন্য ড্র্যাগ-অ্যান্ড-ড্রপ ডিজাইন স্টুডিও।",
    bestFor: "Graphical abstracts demanded by Elsevier/Springer journals, academic conference poster presentations, and methodology slides.",
    bestForBn: "এলসিভিয়ার ও স্প্রিঙ্গার জার্নালের জন্য আকর্ষণীয় গ্রাফিক্যাল অ্যাবস্ট্রাক্ট এবং কনফারেন্স পোস্টার তৈরির জন্য সেরা।",
    disciplines: ["All Disciplines", "Life Sciences", "Business", "Social Sciences"],
    disciplinesBn: ["সকল বিভাগ", "লাইফ সায়েন্সেস", "ব্যবসায়", "সমাজবিজ্ঞান"]
  },
  {
    id: "latex-tikz",
    name: "Overleaf / LaTeX TikZ Suite",
    category: "diagrams",
    badge: "Publication-Ready Code Diagrams",
    badgeBn: "কোড-ভিত্তিক গাণিতিক ডায়াগ্রাম",
    badgeColor: "emerald",
    url: "https://www.overleaf.com",
    utility: "Cloud collaborative LaTeX platform with TikZ engine for compiling mathematical flowcharts directly in manuscripts.",
    utilityBn: "সরাসরি ল্যাটেক (LaTeX) কোডের মাধ্যমে নিখুঁত গাণিতিক ও আর্কিটেকচার ডায়াগ্রাম কম্পাইল করার ক্লাউড প্ল্যাটফর্ম।",
    bestFor: "Mathematical state machines, finite automata, neural network graphs, and pixel-perfect IEEE 2-column vector figures.",
    bestForBn: "অসীম স্কেলেবল ভেক্টর গ্রাফিক্স, নিউরাল নেটওয়ার্ক লেয়ার ও আইইইই ২-কলাম পেপারের নিখুঁত কোড ডায়াগ্রাম তৈরির জন্য সেরা।",
    disciplines: ["Computer Science", "Mathematics", "Electrical Engineering", "Physics"],
    disciplinesBn: ["কম্পিউটার সায়েন্স", "গণিত", "ইলেকট্রিক্যাল ইঞ্জিনিয়ারিং", "পদার্থবিজ্ঞান"]
  },
  {
    id: "prisma-flow-tool",
    name: "PRISMA 2020 Flow Diagram Tool",
    category: "diagrams",
    badge: "Systematic Literature Reviews",
    badgeBn: "সিস্টেমেটিক রিভিউ ফ্লোচার্ট",
    badgeColor: "rose",
    url: "https://estech.shinyapps.io/prisma_flowdiagram/",
    secondaryUrl: "https://www.prisma-statement.org/prisma-2020-flow-diagram",
    secondaryUrlLabel: "PRISMA Official Statement",
    secondaryUrlLabelBn: "PRISMA অফিশিয়াল গাইড",
    utility: "Official interactive flow diagram generator conforming strictly to the PRISMA 2020 systematic review statement.",
    utilityBn: "প্রিসমা ২০২০ স্ট্যান্ডার্ড অনুযায়ী সিস্টেমেটিক রিভিউ ও মেটা-অ্যানালাইসিসের ইন্টারঅ্যাক্টিভ ফ্লোচার্ট জেনারেটর।",
    bestFor: "Documenting database record identification, screening, eligibility, and included studies for SLR publications.",
    bestForBn: "লিটারেচার রিভিউয়ের প্রতিটি ধাপে কতটি পেপার বাতিল ও কতটি সিলেক্ট হলো তার প্রাতিষ্ঠানিক ফ্লোচার্ট তৈরির জন্য সেরা।",
    disciplines: ["Public Health", "Medicine", "Software Engineering", "Business", "All Systematic Reviews"],
    disciplinesBn: ["জনস্বাস্থ্য", "চিকিৎসাবিজ্ঞান", "সফটওয়্যার ইঞ্জিনিয়ারিং", "ব্যবসায়", "সকল সিস্টেমেটিক রিভিউ"]
  }
];

export function AcademicResourceHub() {
  const { locale } = useResearchStore();
  const { t } = useI18n(locale);

  // States
  const [activeCategory, setActiveCategory] = useState<"all" | "literature" | "datasets" | "diagrams">("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Handle Copy Link
  const handleCopyLink = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filter list based on category, search, and discipline
  const filteredResources = useMemo(() => {
    return ACADEMIC_RESOURCES.filter((res) => {
      // Category check
      if (activeCategory !== "all" && res.category !== activeCategory) {
        return false;
      }

      // Discipline check
      if (selectedDiscipline !== "all") {
        const matchesEn = res.disciplines.some((d) => d.toLowerCase().includes(selectedDiscipline.toLowerCase()));
        const matchesBn = res.disciplinesBn.some((d) => d.toLowerCase().includes(selectedDiscipline.toLowerCase()));
        if (!matchesEn && !matchesBn) return false;
      }

      // Search query
      if (searchQuery.trim().length > 0) {
        const query = searchQuery.toLowerCase();
        const matchesName = res.name.toLowerCase().includes(query);
        const matchesUtility = (locale === "bn" ? res.utilityBn : res.utility).toLowerCase().includes(query);
        const matchesBestFor = (locale === "bn" ? res.bestForBn : res.bestFor).toLowerCase().includes(query);
        const matchesBadge = (locale === "bn" ? res.badgeBn : res.badge).toLowerCase().includes(query);
        return matchesName || matchesUtility || matchesBestFor || matchesBadge;
      }

      return true;
    });
  }, [activeCategory, selectedDiscipline, searchQuery, locale]);

  // Discipline Filter Options
  const disciplineOptions = [
    { id: "all", labelEn: "All Fields", labelBn: "সকল ডিসিপ্লিন" },
    { id: "computer", labelEn: "CS, AI & Data", labelBn: "কম্পিউটার সায়েন্স ও এআই" },
    { id: "engineering", labelEn: "Engineering", labelBn: "প্রকৌশল বিভাগ" },
    { id: "health", labelEn: "Health & Life Sciences", labelBn: "স্বাস্থ্য ও জীবনবিজ্ঞান" },
    { id: "business", labelEn: "Business & Economics", labelBn: "ব্যবসায় ও অর্থনীতি" },
  ];

  // Helper badge color mapper
  const getBadgeStyle = (color: string) => {
    switch (color) {
      case "indigo":
        return "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-cyan-300 border-indigo-200 dark:border-indigo-800";
      case "emerald":
        return "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800";
      case "cyan":
        return "bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800";
      case "purple":
        return "bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800";
      case "amber":
        return "bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800";
      case "rose":
        return "bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800";
      default:
        return "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700";
    }
  };

  return (
    <div className="space-y-6 text-xs">
      {/* Section Header Card */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl border border-indigo-900/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-cyan-400/20 text-cyan-300 border border-cyan-400/30 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{locale === "bn" ? "অ্যাকাডেমিক রিসোর্স হাব ও টুলিং ইকোসিস্টেম" : "Academic Resource Hub & Tooling Ecosystem"}</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
            {locale === "bn"
              ? "বিনামূল্যে ওপেন-অ্যাক্সেস পেপার, ডেটাসেট ও থিসিস ডায়াগ্রামিং হাব"
              : "Curated Open-Access Literature, Datasets & Diagramming Suite"}
          </h2>

          <p className="text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
            {locale === "bn"
              ? "পেওয়াল ছাড়া পেপার পড়ার ওপেন-অ্যাক্সেস আর্কাইভ, নির্ভরযোগ্য সাইটেবল ডেটাসেট পোর্টাল এবং থিসিস ও কনফারেন্স পেপারের জন্য পাবলিকেশন-রেডি ডায়াগ্রামিং টুলসের সমন্বিত ডিরেক্টরি।"
              : "Direct access to 100% free scholarly literature search engines, global citable dataset portals, and publication-quality vector diagramming suites tailored for undergraduate & master's scholars."}
          </p>

          {/* Quick Metrics Bar */}
          <div className="pt-2 flex flex-wrap items-center gap-4 text-[11px] text-slate-300 font-medium">
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>{locale === "bn" ? "৬টি ওপেন পেপার হাব" : "6 Open Paper Hubs"}</span>
            </span>
            <span className="text-white/20">•</span>
            <span className="flex items-center gap-1.5">
              <Database className="w-4 h-4 text-emerald-400" />
              <span>{locale === "bn" ? "৬টি গ্লোবাল ডেটাসেট রিপোজিটরি" : "6 Global Dataset Repositories"}</span>
            </span>
            <span className="text-white/20">•</span>
            <span className="flex items-center gap-1.5">
              <PenTool className="w-4 h-4 text-purple-400" />
              <span>{locale === "bn" ? "৪টি থিসিস ডায়াগ্রাম ও ফ্লোচার্ট টুল" : "4 Diagram & Flowchart Suites"}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Controls (Category Tabs + Search + Discipline Filter) */}
      <div className="space-y-3 bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        {/* Category Pill Switcher */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {[
            { id: "all", labelEn: "All Resources (16)", labelBn: "সকল রিসোর্স (১৬)", icon: Layers },
            { id: "literature", labelEn: "Open-Access Literature (6)", labelBn: "ওপেন লিটারেচার ও পেপার (৬)", icon: BookOpen },
            { id: "datasets", labelEn: "Open Datasets & Benchmarks (6)", labelBn: "উন্মুক্ত ডেটাসেট পোর্টাল (৬)", icon: Database },
            { id: "diagrams", labelEn: "Diagrams & Architecture (4)", labelBn: "ডায়াগ্রাম ও ফ্লোচার্ট (৪)", icon: PenTool },
          ].map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/25 dark:bg-cyan-500 dark:text-slate-950"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{locale === "bn" ? cat.labelBn : cat.labelEn}</span>
              </button>
            );
          })}
        </div>

        {/* Search Bar & Discipline Filter Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
          {/* Real-time Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={locale === "bn" ? "টুল বা রিসোর্সের নাম, বিবরণ বা টপিক দিয়ে খুঁজুন..." : "Filter tools by name, description, or discipline..."}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-cyan-400 transition"
            />
          </div>

          {/* Discipline Filter Select */}
          <div className="flex items-center gap-1.5 overflow-x-auto">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
              <Filter className="w-3 h-3 inline mr-1" />
              {locale === "bn" ? "ফিল্টার:" : "Discipline:"}
            </span>
            {disciplineOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSelectedDiscipline(opt.id)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition shrink-0 ${
                  selectedDiscipline === opt.id
                    ? "bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-sm"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {locale === "bn" ? opt.labelBn : opt.labelEn}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Resource Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredResources.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
          >
            {/* Card Header & Badge */}
            <div className="space-y-2.5">
              <div className="flex items-start justify-between gap-2">
                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border ${getBadgeStyle(item.badgeColor)}`}>
                  {locale === "bn" ? item.badgeBn : item.badge}
                </span>

                <button
                  onClick={() => handleCopyLink(item.url, item.id)}
                  className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition"
                  title="Copy direct portal link"
                >
                  {copiedId === item.id ? (
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {/* Resource Name */}
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-cyan-400 transition">
                {item.name}
              </h3>

              {/* 1-Sentence Utility */}
              <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                {locale === "bn" ? item.utilityBn : item.utility}
              </p>

              {/* Best For Callout Block */}
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-cyan-400 block">
                  {locale === "bn" ? "🎯 যে কাজের জন্য সবচেয়ে উপযোগী:" : "🎯 Best For:"}
                </span>
                <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-snug font-medium">
                  {locale === "bn" ? item.bestForBn : item.bestFor}
                </p>
              </div>

              {/* Discipline Tags */}
              <div className="flex items-center gap-1 flex-wrap pt-1">
                {(locale === "bn" ? item.disciplinesBn : item.disciplines).map((disc, dIdx) => (
                  <span
                    key={dIdx}
                    className="px-2 py-0.5 rounded-md text-[9px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                  >
                    {disc}
                  </span>
                ))}
              </div>
            </div>

            {/* Direct Action Link Buttons */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-2">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-sm"
              >
                <span>{locale === "bn" ? "সরাসরি পোর্টালে যান" : "Open Direct Portal"}</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>

              {item.secondaryUrl && (
                <a
                  href={item.secondaryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center justify-center gap-1 transition"
                  title={locale === "bn" ? item.secondaryUrlLabelBn || "বিকল্প লিঙ্ক" : item.secondaryUrlLabel || "Secondary Link"}
                >
                  <span>{locale === "bn" ? (item.secondaryUrlLabelBn || "বিকল্প লিঙ্ক") : (item.secondaryUrlLabel || "Secondary Link")}</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Special PRISMA 2020 Protocol Spotlight Card */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-rose-950 via-slate-900 to-indigo-950 text-white border border-rose-900/40 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-500/20 text-rose-300 flex items-center justify-center border border-rose-500/30">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-rose-300 uppercase tracking-wider block">
                {locale === "bn" ? "সিস্টেমেটিক লিটারেচার রিভিউ স্ট্যান্ডার্ড" : "Systematic Literature Review Standard"}
              </span>
              <h4 className="text-sm sm:text-base font-bold text-white">
                {locale === "bn" ? "PRISMA 2020 ফ্লো ডায়াগ্রাম গাইডলাইন" : "PRISMA 2020 Flow Diagram Blueprint"}
              </h4>
            </div>
          </div>

          <a
            href="https://estech.shinyapps.io/prisma_flowdiagram/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition self-start sm:self-auto"
          >
            <span>{locale === "bn" ? "PRISMA অ্যাপ ওপেন করুন" : "Launch Interactive PRISMA Generator"}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <span className="font-bold text-rose-300 block text-[11px]">1. Identification</span>
            <span className="text-slate-300 text-[10px] leading-relaxed block">
              Records identified from databases (e.g. Scopus, IEEE, PubMed) + Duplicates removed.
            </span>
          </div>
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <span className="font-bold text-rose-300 block text-[11px]">2. Screening</span>
            <span className="text-slate-300 text-[10px] leading-relaxed block">
              Title & abstract screening against strict inclusion/exclusion criteria.
            </span>
          </div>
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <span className="font-bold text-rose-300 block text-[11px]">3. Eligibility</span>
            <span className="text-slate-300 text-[10px] leading-relaxed block">
              Full-text articles assessed for eligibility with documented exclusion reasons.
            </span>
          </div>
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <span className="font-bold text-emerald-300 block text-[11px]">4. Included Studies</span>
            <span className="text-slate-300 text-[10px] leading-relaxed block">
              Final study count synthesized into qualitative and meta-analytic synthesis.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
