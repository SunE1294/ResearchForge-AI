"use client";

import React, { useState } from "react";
import { useResearchStore } from "@/store/useResearchStore";
import {
  BookOpen,
  Award,
  CheckCircle,
  Layers,
  ArrowRight,
  ExternalLink,
  FileText,
  Bookmark,
  Sparkles,
  Eye,
  Table
} from "lucide-react";

export function TypologyMatrix() {
  const { locale } = useResearchStore();
  const [selectedType, setSelectedType] = useState<string>("conference");

  const typologies = [
    {
      id: "conference",
      title: locale === "bn" ? "১. Conference Paper (কনফারেন্স পেপার)" : "1. Conference Paper",
      shortTitle: locale === "bn" ? "Conference Paper" : "Conference Paper",
      badge: locale === "bn" ? "দ্রুত প্রকাশনা • সিএস ও ইঞ্জিনিয়ারিংয়ে উচ্চ মর্যাদা" : "Fast Iteration • High Prestige in CS/Eng",
      indexTiers: locale === "bn" ? "CORE র‍্যাংকিং: A*, A, B, C (IEEE / ACM / Springer)" : "CORE Rankings: A*, A, B, C (IEEE / ACM / Springer)",
      typicalLength: locale === "bn" ? "৪ - ৮ পৃষ্ঠা (বেশিরভাগ ক্ষেত্রে ৬-৮ পৃষ্ঠা)" : "4 - 8 Pages (Typically 6 - 8 pages)",
      primaryFocus: locale === "bn" ? "দ্রুত নতুন আইডিয়া বা মেথড শেয়ার করা" : "Fast dissemination of novel ideas, models & benchmarks",
      format: locale === "bn" ? "২-কলাম, টাইট স্পেসিং (IEEE/ACM ২-কলামের লেআউট)" : "2-Column layout, tight spacing (IEEE/ACM format)",
      turnaround: locale === "bn" ? "২ - ৪ মাস (নির্দিষ্ট ডেডলাইন)" : "2 - 4 Months (Fixed Deadlines)",
      acceptanceRate: locale === "bn" ? "শীর্ষ ভেন্যুর জন্য ১৫% - ২৫%" : "15% - 25% for top-tier venues",
      visualAppearance: locale === "bn"
        ? "এটি সাধারণত বেশ সংক্ষিপ্ত হয় (বেশিরভাগ ক্ষেত্রে ৪ থেকে ৮ পৃষ্ঠা) এবং খুব নির্দিষ্ট একটি ফরম্যাট (যেমন- IEEE বা ACM-এর ২-কলামের লেআউট) মেনে চলে। এতে কাজের মূল আইডিয়া, মেথডলজি এবং প্রাথমিক ফলাফলগুলো খুব দ্রুত ও সংক্ষেপে উপস্থাপন করা হয়।"
        : "Conference papers are compact (typically 4 to 8 pages) adhering strictly to standard 2-column layouts (IEEE or ACM). The core concept, methodology, and empirical baseline results are presented punchily and concisely.",
      examplePaper: {
        title: "Deep Residual Learning for Image Recognition (ResNet)",
        titleBn: "ডিপ রেসিডুয়াল লার্নিং ফর ইমেজ রিকগনিশন (ResNet-এর মূল পেপার)",
        authors: "Kaiming He, Xiangyu Zhang, Shaoqing Ren, Jian Sun",
        venue: "IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR 2016)",
        citationCount: "২০০,০০০+ সাইটেশন (কম্পিউটার সায়েন্স ইতিহাসের অন্যতম শীর্ষ পেপার)",
        description: locale === "bn"
          ? "কম্পিউটার ভিশন ও ডিপ লার্নিংয়ের ইতিহাসের অন্যতম বিখ্যাত কনফারেন্স পেপার। এটি CVPR কনফারেন্সে প্রকাশিত হয়েছিল এবং লক্ষাধিকবার সাইট করা হয়েছে। কীভাবে ৮ পৃষ্ঠার ২-কলামের পেপারে একটি যুগান্তকারী আর্কিটেকচার উপস্থাপন করা হয় তা দেখতে এই পেপারটি পড়ুন।"
          : "One of the most cited papers in computer science history. Published at CVPR, it demonstrates how a 9-page 2-column paper revolutionized modern neural network depth with residual connections.",
        officialUrl: "https://openaccess.thecvf.com/content_cvpr_2016/papers/He_Deep_Residual_Learning_CVPR_2016_paper.pdf",
        arxivUrl: "https://arxiv.org/abs/1512.03385",
        pdfUrl: "https://openaccess.thecvf.com/content_cvpr_2016/papers/He_Deep_Residual_Learning_CVPR_2016_paper.pdf"
      },
      keyCharacteristics: locale === "bn" ? [
        "কম্পিউটার সায়েন্স, এআই এবং সফটওয়্যার ইঞ্জিনিয়ারিংয়ের প্রধান প্রকাশনা মাধ্যম।",
        "নির্দিষ্ট পেইজ বাজেট (সাধারণত ৪-৮ পৃষ্ঠা) এবং কঠোর ক্যামেরা-রেডি সাবমিশন ডেডলাইন থাকে।",
        "কনফারেন্সে সশরীরে বা ভার্চুয়ালি পেপার প্রেজেন্টেশন প্রদান বাধ্যতামূলক।",
        "IEEE Xplore, ACM Digital Library অথবা Springer LNCS-এ তাৎক্ষণিক ইনডেক্সিং হয়।"
      ] : [
        "Primary publication route for Computer Science, AI, and Software Engineering",
        "Strict page budget (typically 4-8 pages) with hard camera-ready submission deadlines",
        "Author presentation required at the conference venue or virtual track",
        "Instant indexing in IEEE Xplore, ACM Digital Library, or Springer LNCS"
      ],
      idealWhen: locale === "bn"
        ? "যখন আপনার কাছে কোনো নতুন মডেল, উন্নত বেঞ্চমার্ক ফলাফল বা নতুন কোনো এলগরিদম দ্রুত প্রকাশের জন্য প্রস্তুত রয়েছে।"
        : "You have a novel experimental model, breakthrough benchmark, or prompt engineering framework ready to publish quickly."
    },
    {
      id: "review",
      title: locale === "bn" ? "২. Review Paper (রিভিউ পেপার / SLR)" : "2. Review Paper (SLR)",
      shortTitle: locale === "bn" ? "Review Paper" : "Review Paper",
      badge: locale === "bn" ? "উচ্চ সাইটেশন সম্ভাবনা • প্রটোকল ভিত্তিক কাঠামো" : "High Citations • Methodological Protocol",
      indexTiers: locale === "bn" ? "PRISMA 2020 নির্দেশিকা অনুসারী (Elsevier / Springer / Nature Surveys)" : "PRISMA 2020 Compliant (Elsevier / Springer / Nature)",
      typicalLength: locale === "bn" ? "১৫ - ৫০+ পৃষ্ঠা" : "15 - 50+ Pages",
      primaryFocus: locale === "bn" ? "বিদ্যমান শতশত পেপারের সামারি ও অ্যানালাইসিস" : "Synthesizing and taxonomizing hundreds of existing papers",
      format: locale === "bn" ? "সিঙ্গেল কলাম, বিশাল রেফারেন্স ও তুলনামূলক টেবিল লিস্ট" : "Single column, extensive taxonomy tables & reference lists",
      turnaround: locale === "bn" ? "৪ - ৬ মাস" : "4 - 6 Months",
      acceptanceRate: locale === "bn" ? "রিভিউ-ভিত্তিক জার্নালে ২০% - ৩৫%" : "20% - 35% in survey-dedicated journals",
      visualAppearance: locale === "bn"
        ? "রিভিউ পেপার কোনো নতুন ল্যাবরেটরি এক্সপেরিমেন্ট বা ডেটা তৈরি করে না। এটি একটি নির্দিষ্ট বিষয়ের ওপর এ পর্যন্ত যত কাজ হয়েছে (যেমন- ১০০ থেকে ২০০টি পেপার), সেগুলোকে একত্রিত করে একটি বিশাল ওভারভিউ দেয়। এর দৈর্ঘ্য বেশ বড় হয় (১৫ থেকে ৫০ পৃষ্ঠা বা তার বেশি) এবং এতে প্রচুর লিটারেচার সাইটেশন ও তুলনামূলক টেবিল থাকে।"
        : "Review papers do not introduce new raw lab datasets or experiments. Instead, they synthesize and categorize 100 to 300+ existing publications into a rigorous state-of-the-art taxonomy. They feature large comparative tables and massive bibliographies.",
      examplePaper: {
        title: "Transformers in Skin Lesion Classification and Diagnosis: A Systematic Review",
        titleBn: "ট্রান্সফরমারস ইন স্কিন লেসন ক্লাসিফিকেশন অ্যান্ড ডায়াগনোসিস: আ সিস্টেমেটিক রিভিউ",
        authors: "medRxiv Systematic Review Investigators (Cold Spring Harbor Laboratory, BMJ, Yale)",
        venue: "medRxiv (PRISMA 2020 Compliant Systematic Review / Meta-Analysis)",
        citationCount: "ওপেন এক্সেস ফুল-টেক্সট সিস্টেমেটিক লিটারেচার রিভিউ (PRISMA 2020 স্ট্যান্ডার্ড)",
        description: locale === "bn"
          ? "একটি আদর্শ সিস্টেমেটিক রিভিউ (SLR) পেপারের নিখুঁত বাস্তব উদাহরণ। এতে কোনো নতুন ল্যাব এক্সপেরিমেন্ট না করে কীভাবে শতশত গবেষণাপত্রকে PRISMA 2020 ফ্রেমওয়ার্ক অনুযায়ী বাছাই, স্ক্রিনিং ও তুলনামূলক টেবিলের মাধ্যমে উপস্থাপন করা হয় তা এই সম্পূর্ণ ওপেন-এক্সেস পেপারটিতে দেখতে পাবেন।"
          : "An authentic, fully open-access Systematic Literature Review (SLR) following PRISMA 2020 guidelines. Demonstrates how hundreds of disparate studies are filtered, quality-assessed, and structured into comparative taxonomy matrices without generating new raw datasets.",
        officialUrl: "https://www.medrxiv.org/content/10.1101/2024.09.19.24314004v2.full",
        arxivUrl: "https://www.medrxiv.org/content/10.1101/2024.09.19.24314004v2.full",
        pdfUrl: "https://www.medrxiv.org/content/10.1101/2024.09.19.24314004v2.full.pdf"
      },
      keyCharacteristics: locale === "bn" ? [
        "বুলিয়ান সার্চ কুয়েরি ব্যবহার করে সুস্পষ্ট ও পুনরাবৃত্তিযোগ্য সার্চ প্রটোকল অনুসরণ করে।",
        "একাধিক ডাটাবেস (Scopus, PubMed, IEEE) থেকে অন্তর্ভুক্তি ও বর্জনের সুনির্দিষ্ট ক্রাইটেরিয়া নির্ধারণ করে।",
        "রিভিউকৃত পেপারগুলোর মান যাচাই (Quality Assessment) ও পক্ষপাতিত্বের ঝুঁকি (Risk of Bias) বিশ্লেষণ করে।",
        "সাধারণত অন্যান্য গবেষকদের জন্য এটি প্রাথমিক উৎস হওয়ায় প্রচুর সাইটেশন লাভ করে।"
      ] : [
        "Follows a strict reproducible search protocol using Boolean query strings",
        "Requires explicit inclusion/exclusion criteria across multiple databases (Scopus, PubMed, IEEE)",
        "Includes quality assessment and risk of bias evaluation across all reviewed papers",
        "Historically garners very high citation counts from other researchers entering the field"
      ],
      idealWhen: locale === "bn"
        ? "যখন আপনি নতুন থিসিস শুরু করছেন, বিদ্যমান গবেষণার গ্যাপ বিশ্লেষণ করছেন এবং বহু গবেষণাকে একটি সার্বিক কাঠামোতে রূপ দিতে চান।"
        : "You are beginning your thesis, analyzing existing gaps, and synthesising hundreds of disparate studies into a definitive taxonomy."
    },
    {
      id: "journal",
      title: locale === "bn" ? "৩. Q1 Journal Paper (Q1 জার্নাল পেপার)" : "3. Q1 Journal Paper",
      shortTitle: locale === "bn" ? "Q1 Journal" : "Q1 Journal",
      badge: locale === "bn" ? "উচ্চ মান ও গভীরতা • স্থায়ী প্রাতিষ্ঠানিক রেকর্ড" : "High Rigor • Archival Permanence",
      indexTiers: locale === "bn" ? "সাইমাগো কোয়ার্টাইল: Q1 (শীর্ষ ২৫% মানদণ্ড) / SCIE" : "Scimago Quartile Q1 (Top 25%) / SCIE",
      typicalLength: locale === "bn" ? "১০ - ২৫ পৃষ্ঠা" : "10 - 25 Pages",
      primaryFocus: locale === "bn" ? "সম্পূর্ণ এবং প্রমাণিত নতুন কোনো বৈজ্ঞানিক আবিষ্কার" : "Comprehensive, mathematically proven & empirically verified novel discovery",
      format: locale === "bn" ? "জার্নাল-নির্দিষ্ট নিখুঁত লেআউট (IMRaD ফরম্যাট)" : "Journal-specific layout: Intro -> Method -> Results -> Discussion (IMRaD)",
      turnaround: locale === "bn" ? "৩ - ৮ মাস (ধারাবাহিক সাবমিশন)" : "3 - 8 Months (Continuous Submission)",
      acceptanceRate: locale === "bn" ? "Q1 স্তরের জন্য ১০% - ২৫%" : "10% - 25% for top Q1 journals",
      visualAppearance: locale === "bn"
        ? "Q1 জার্নাল হলো শীর্ষ ২৫% মানের ইন্টারন্যাশনাল জার্নাল। এই পেপারগুলো অত্যন্ত নিখুঁত, দীর্ঘ (১০ থেকে ২০+ বা ১০-২৫ পৃষ্ঠা) এবং এর প্রতিটি ক্লেইমের পেছনে কঠোর প্রমাণ থাকে। এর গঠন সাধারণত নির্দিষ্ট থাকে: Introduction -> Methodology -> Results -> Discussion (IMRaD ফরম্যাট)।"
        : "Q1 journals represent the top 25% of journals in a discipline. Papers are exhaustive (10 to 25 pages) with comprehensive mathematical derivations, ablation studies, and strict IMRaD structuring.",
      examplePaper: {
        title: "Attention Is All You Need (Transformer Architecture)",
        titleBn: "অ্যাটেনশন ইজ অল ইউ নিড (ট্রান্সফরমার আর্কিটেকচার)",
        authors: "Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, et al.",
        venue: "Advances in Neural Information Processing Systems (NeurIPS Premier Track)",
        citationCount: "১২০,০০০+ সাইটেশন (আধুনিক এলএলএম ও জেনারেটিভ এআই-এর ভিত্তি)",
        description: locale === "bn"
          ? "ট্রান্সফরমার আর্কিটেকচারের (Attention is All You Need) মূল পেপারটি আধুনিক AI ও লার্জ ল্যাঙ্গুয়েজ মডেলের ভিত্তি এবং এটি একটি ক্লাসিক হাই-ইমপ্যাক্ট পেপারের চমৎকার উদাহরণ। কীভাবে গাণিতিক স্পষ্টতা ও বেঞ্চমার্ক প্রমাণ সহকারে পেপার লিখতে হয় তা এখান থেকে দেখতে পাবেন।"
          : "The monumental paper that introduced the Transformer architecture behind ChatGPT and modern LLMs. A textbook masterclass in clean mathematical formalization, empirical comparison, and ablation rigor.",
        officialUrl: "https://arxiv.org/abs/1706.03762",
        arxivUrl: "https://arxiv.org/abs/1706.03762",
        pdfUrl: "https://arxiv.org/pdf/1706.03762.pdf"
      },
      keyCharacteristics: locale === "bn" ? [
        "সকল অনুষদের (প্রকৌশল, স্বাস্থ্যবিজ্ঞান, ব্যবসা ও সমাজবিজ্ঞান) জন্য আন্তর্জাতিকভাবে স্বীকৃত মানদণ্ড।",
        "একাধিক ধাপের অন্ধ পিয়ার-রিভিউ প্রক্রিয়া (মেজর ও মাইনর রিভিশন)।",
        "গভীর তাত্ত্বিক ভিত্তি, পরিসংখ্যানিক প্রমাণ এবং বিস্তৃত অ্যাবলেশন স্টাডি প্রয়োজন হয়।",
        "ইমপ্যাক্ট ফ্যাক্টর (JCR) এবং সাইটস্কোর (Scopus) দ্বারা জার্নালের মান ও মর্যাদা নির্ধারিত হয়।"
      ] : [
        "Standard gold metric across all 5 university faculties (Engineering, Life Sciences, Business)",
        "Multiple rounds of blind peer review (Major Revision, Minor Revision)",
        "Demands exhaustive ablation studies, statistical proofs, and comprehensive literature background",
        "Impact Factor (Clarivate JCR) and CiteScore (Scopus) metrics determine prestige"
      ],
      idealWhen: locale === "bn"
        ? "যখন আপনার গবেষণায় গভীর গাণিতিক বিশ্লেষণ, একাধিক ডেটাসেটে বিস্তৃত এক্সপেরিমেন্ট এবং সুদৃঢ় মেথডলজি রয়েছে।"
        : "You have an extensive experimental campaign, multi-dataset evaluations, or deep theoretical formulation."
    },
    {
      id: "thesis",
      title: locale === "bn" ? "৪. Thesis Paper (থিসিস পেপার)" : "4. Thesis Paper",
      shortTitle: locale === "bn" ? "Thesis" : "Thesis",
      badge: locale === "bn" ? "ডিগ্রি অর্জনের চূড়ান্ত প্রজেক্ট • প্রাতিষ্ঠানিক মনোগ্রাফ" : "Institutional Degree Fulfillment",
      indexTiers: locale === "bn" ? "বিশ্ববিদ্যালয়ের অ্যাকাডেমিক ডিফেন্স কমিটি ও ভাইভা বোর্ড" : "University Academic Defense Board",
      typicalLength: locale === "bn" ? "৫০ - ৩০০+ পৃষ্ঠা (আন্ডারগ্র্যাড ৫০-১০০, মাস্টার্স ১০০-২০০+)" : "50 - 300+ Pages (Undergrad 50-100, Masters 100-200+)",
      primaryFocus: locale === "bn" ? "সম্পূর্ণ একাডেমিক ডিগ্রির জন্য বিস্তারিত গবেষণার বই" : "Full academic monograph fulfilling degree graduation requirements",
      format: locale === "bn" ? "চ্যাপ্টার ভিত্তিক (Chapter 1, 2, 3...) বইয়ের মতো, কভার পেজ, উৎসর্গ ও সূচিপত্র" : "Book format with chapters (Ch 1-6), cover page, dedication, index",
      turnaround: locale === "bn" ? "১ - ২ সেমিস্টার (১৬ থেকে ৫২ সপ্তাহ)" : "1 - 2 Semesters (16 to 52 Weeks)",
      acceptanceRate: locale === "bn" ? "অনুষদের ডিফেন্স বোর্ড, এক্সটার্নাল এক্সামিনার ও ভাইভা" : "Internal Faculty Board & External Defense",
      visualAppearance: locale === "bn"
        ? "এটি কোনো ছোট পেপার নয়, এটি আস্ত একটি বইয়ের মতো (সাধারণত ৫০ থেকে ৩০০+ পৃষ্ঠা)। এর ফরম্যাটে আলাদা কভার পেজ, উৎসর্গ পাতা, টেবিল অব কন্টেন্টস (সূচিপত্র), এবং অনেকগুলো বড় বড় চ্যাপ্টার (অধ্যায়) থাকে। একজন শিক্ষার্থীর ডিগ্রি (Undergrad / Masters / Ph.D.) অর্জনের জন্য এটি জমা দিতে হয়।"
        : "A thesis is not a brief paper—it is a comprehensive bound book (typically 50 to 300+ pages). It has institutional cover formatting, dedication, table of contents, and extensive multi-chapter developments (Chapters 1 through 6) required for university graduation.",
      examplePaper: {
        title: "MIT Computer Science & AI Theses Collection (Tim Berners-Lee & MIT Theses)",
        titleBn: "এমআইটি কম্পিউটার সায়েন্স থিসিস কালেকশন (WWW জনক টিম বার্নার্স-লি ও এমআইটি)",
        authors: "MIT Department of Electrical Engineering & Computer Science Scholars",
        venue: "DSpace@MIT Official Institutional Academic Repository",
        citationCount: "বিশ্বের শীর্ষ প্রযুক্তি বিশ্ববিদ্যালয়ের অফিসিয়াল ডিগ্রি থিসিস রেকর্ড",
        description: locale === "bn"
          ? "MIT-এর অফিশিয়াল রিপোজিটরি থেকে ওয়ার্ল্ড-ওয়াইড ওয়েব (WWW) এর জনক Tim Berners-Lee-এর থিসিস এবং শীর্ষ কম্পিউটার সায়েন্স থিসিস সংগ্রহ। এখানে থাকা PDF-গুলো ডাউনলোড করে ওপেন করলেই একটি আদর্শ থিসিসের পৃষ্ঠা এবং চ্যাপ্টার বিন্যাস সরাসরি দেখতে পাবেন।"
          : "Official MIT archive including landmark theses in computer science. Inspecting these full PDFs demonstrates standard thesis chapter formatting, title pages, literature surveys, and appendices in real life.",
        officialUrl: "https://dspace.mit.edu/handle/1721.1/7582",
        arxivUrl: "https://dspace.mit.edu/handle/1721.1/7582",
        pdfUrl: "https://dspace.mit.edu/handle/1721.1/7582"
      },
      keyCharacteristics: locale === "bn" ? [
        "আন্ডারগ্র্যাজুয়েট থিসিস: কারিগরি দক্ষতা, সঠিক মেথডলজি এবং প্রচলিত পদ্ধতির সফল বাস্তবায়নের ওপর জোর দেয়।",
        "মাস্টার্স থিসিস: একাডেমিক সাহিত্যে নিজস্ব মৌলিক অবদান (নতুন এলগরিদম, নতুন পরিসংখ্যানিক প্রমাণ ইত্যাদি) দাবি করে।",
        "উভয়ক্ষেত্রেই প্লেজিয়ারিজম প্রতিরোধ (< ১৫% - ২০% Turnitin সিমিলারিটি) এবং ভাইভা ডিফেন্স বাধ্যতামূলক।",
        "একটি মানসম্পন্ন মাস্টার্স থিসিস থেকে অনায়াসে Q1/Q2 জার্নাল বা টপ কনফারেন্স পেপার প্রকাশ করা সম্ভব।"
      ] : [
        "Undergraduate Thesis: Focuses on demonstrating technical competence, sound methodology, and proper implementation of established techniques.",
        "Master's Thesis: Demands a genuine novel contribution to academic literature (new algorithm, new empirical proof, or unique application).",
        "Both require strict plagiarism compliance (< 15% - 20% on Turnitin) and viva-voce defense.",
        "A strong Master's thesis can usually yield at least one Q1/Q2 journal or CORE conference paper."
      ],
      idealWhen: locale === "bn"
        ? "ড্যাফোডিল ইন্টারন্যাশনাল ইউনিভার্সিটি বা যেকোনো বিশ্ববিদ্যালয়ে স্নাতক ও মাস্টার্স ডিগ্রি সম্পন্নের সময়।"
        : "Meeting graduation requirements at Daffodil International University or global tertiary universities."
    }
  ];

  const current = typologies.find((t) => t.id === selectedType) || typologies[0];

  return (
    <div className="space-y-8">
      {/* 1. Interactive Comparison Table matching User Specification */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Table className="w-4 h-4 text-indigo-600 dark:text-cyan-400" />
            <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
              {locale === "bn" ? "গবেষণাপত্রের প্রকারভেদ: সারসংক্ষেপ তুলনামূলক টেবিল" : "Summary Comparison Matrix: Paper Typologies"}
            </h3>
          </div>
          <span className="text-[11px] text-slate-500">
            {locale === "bn" ? "(যেকোনো রো-তে ক্লিক করে বিস্তারিত ও আসল পেপার দেখুন)" : "(Click any row to inspect deep-dive & real papers)"}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-bold bg-slate-50 dark:bg-slate-800/50">
                <th className="p-3 rounded-l-lg">{locale === "bn" ? "পেপারের ধরন" : "Paper Type"}</th>
                <th className="p-3">{locale === "bn" ? "সাধারণ দৈর্ঘ্য" : "Typical Length"}</th>
                <th className="p-3">{locale === "bn" ? "প্রধান ফোকাস" : "Primary Focus"}</th>
                <th className="p-3">{locale === "bn" ? "ফরম্যাট ও লেআউট" : "Format & Layout"}</th>
                <th className="p-3 rounded-r-lg text-right">{locale === "bn" ? "বাস্তব উদাহরণ পেপার" : "Exemplar Paper"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {typologies.map((item) => {
                const isSelected = selectedType === item.id;
                return (
                  <tr
                    key={item.id}
                    onClick={() => setSelectedType(item.id)}
                    className={`cursor-pointer transition-colors ${
                      isSelected
                        ? "bg-indigo-50/70 dark:bg-indigo-950/40 font-semibold"
                        : "hover:bg-slate-50 dark:hover:bg-slate-800/40 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    <td className="p-3 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${isSelected ? "bg-indigo-600 dark:bg-cyan-400 animate-pulse" : "bg-slate-300 dark:bg-slate-700"}`} />
                      <span>{item.shortTitle}</span>
                    </td>
                    <td className="p-3 text-indigo-600 dark:text-cyan-400 font-bold whitespace-nowrap">
                      {item.typicalLength}
                    </td>
                    <td className="p-3 max-w-xs">
                      {item.primaryFocus}
                    </td>
                    <td className="p-3 max-w-xs text-slate-600 dark:text-slate-400">
                      {item.format}
                    </td>
                    <td className="p-3 text-right whitespace-nowrap">
                      <a
                        href={item.examplePaper.pdfUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-indigo-100 dark:bg-slate-800 text-indigo-700 dark:text-cyan-300 font-bold text-[11px] hover:bg-indigo-600 hover:text-white transition"
                      >
                        <span>{locale === "bn" ? "পেপার দেখুন" : "View Paper"}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. Selector Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
        {typologies.map((t) => (
          <button
            key={t.id}
            onClick={() => setSelectedType(t.id)}
            className={`p-3.5 rounded-2xl text-left border text-xs font-semibold transition-all ${
              selectedType === t.id
                ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/20 dark:bg-cyan-500 dark:text-slate-950 dark:border-cyan-500"
                : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-cyan-800"
            }`}
          >
            <span className="block text-sm font-bold mb-0.5">{t.shortTitle}</span>
            <span className={`text-[10px] block opacity-80 ${selectedType === t.id ? "text-indigo-100 dark:text-slate-900" : "text-slate-500 dark:text-slate-400"}`}>
              {t.typicalLength}
            </span>
          </button>
        ))}
      </div>

      {/* 3. Detail Card & Exemplar Paper Showcase */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 text-xs">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-cyan-300 border border-indigo-200/60 dark:border-indigo-900/60">
              {current.badge}
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1.5">
              {current.title}
            </h3>
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 sm:text-right">
            <span className="font-semibold text-slate-700 dark:text-slate-300 block">
              {locale === "bn" ? "ইনডেক্সিং ও স্তর:" : "Indexing & Tiers:"}
            </span>
            <span>{current.indexTiers}</span>
          </div>
        </div>

        {/* 4-Metric Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 space-y-0.5">
            <span className="text-slate-400 font-semibold block text-[10px] uppercase tracking-wider">
              {locale === "bn" ? "সাধারণ দৈর্ঘ্য" : "Typical Length"}
            </span>
            <span className="text-slate-900 dark:text-white font-bold text-sm block">{current.typicalLength}</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 space-y-0.5">
            <span className="text-slate-400 font-semibold block text-[10px] uppercase tracking-wider">
              {locale === "bn" ? "ফরম্যাট ও লেআউট" : "Format & Layout"}
            </span>
            <span className="text-slate-900 dark:text-white font-bold text-xs block">{current.format}</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 space-y-0.5">
            <span className="text-slate-400 font-semibold block text-[10px] uppercase tracking-wider">
              {locale === "bn" ? "প্রকাশনা সময়সীমা" : "Turnaround Time"}
            </span>
            <span className="text-slate-900 dark:text-white font-bold text-sm block">{current.turnaround}</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 space-y-0.5">
            <span className="text-slate-400 font-semibold block text-[10px] uppercase tracking-wider">
              {locale === "bn" ? "গ্রহণের হার" : "Acceptance Ratio"}
            </span>
            <span className="text-slate-900 dark:text-white font-bold text-sm block">{current.acceptanceRate}</span>
          </div>
        </div>

        {/* দেখতে কেমন হয় (Visual Appearance & Structure Description) */}
        <div className="p-5 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 space-y-2">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-indigo-600 dark:text-cyan-400" />
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">
              {locale === "bn" ? "দেখতে কেমন হয় ও গঠনগত কাঠামো:" : "Visual Appearance & Structure:"}
            </h4>
          </div>
          <p className="text-slate-700 dark:text-slate-300 text-xs leading-relaxed font-medium">
            {current.visualAppearance}
          </p>
        </div>

        {/* বাস্তব উদাহরণ পেপারের বিস্তারিত বক্স (Real Exemplar Paper Preview & Live PDF Links) */}
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white border border-indigo-800/40 shadow-lg space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider block">
                  {locale === "bn" ? "বাস্তব রেফারেন্স উদাহরণ পেপার" : "Real-World Exemplar Paper"}
                </span>
                <h4 className="font-extrabold text-sm sm:text-base text-white">
                  {current.examplePaper.title}
                </h4>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={current.examplePaper.pdfUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition shadow-md"
              >
                <span>{locale === "bn" ? "আসল পেপারটি দেখুন (Open PDF)" : "View Real Paper (PDF)"}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex flex-wrap items-center gap-3 text-slate-300">
              <span><strong>{locale === "bn" ? "লেখকবৃন্দ:" : "Authors:"}</strong> {current.examplePaper.authors}</span>
              <span className="text-white/30">•</span>
              <span className="text-cyan-300 font-semibold">{current.examplePaper.venue}</span>
            </div>

            <div className="inline-block px-2.5 py-1 rounded-lg bg-white/10 text-amber-300 font-semibold text-[11px]">
              ★ {current.examplePaper.citationCount}
            </div>

            <p className="text-slate-300 leading-relaxed pt-1">
              {current.examplePaper.description}
            </p>
          </div>
        </div>

        {/* Key Architectural Characteristics */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            {locale === "bn" ? "প্রধান গঠনগত বৈশিষ্ট্যসমূহ:" : "Key Architectural Characteristics:"}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs">
            {current.keyCharacteristics.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-indigo-50/40 dark:bg-indigo-950/20 border border-indigo-100/60 dark:border-indigo-900/30">
                <CheckCircle className="w-4 h-4 text-indigo-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                <span className="text-slate-700 dark:text-slate-300 leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* When to Choose */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-500/10 via-cyan-500/10 to-transparent border border-indigo-500/20 text-xs">
          <span className="font-bold text-indigo-700 dark:text-cyan-300 block mb-1">
            {locale === "bn" ? "কখন এই ধরনের ভেন্যু বা ফরম্যাট বেছে নেবেন?" : "When Should a Student Target This Venue?"}
          </span>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            {current.idealWhen}
          </p>
        </div>
      </div>
    </div>
  );
}
