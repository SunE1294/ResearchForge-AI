"use client";

import React, { useState } from "react";
import { useResearchStore } from "@/store/useResearchStore";
import { BookOpen, Award, CheckCircle, HelpCircle, Layers, ArrowRight } from "lucide-react";

export function TypologyMatrix() {
  const { locale } = useResearchStore();
  const [selectedType, setSelectedType] = useState<string>("conference");

  const typologies = [
    {
      id: "conference",
      title: locale === "bn" ? "কনফারেন্স প্রসিডিংস" : "Conference Proceedings",
      badge: locale === "bn" ? "দ্রুত প্রকাশনা • সিএস ও ইঞ্জিনিয়ারিংয়ে উচ্চ মর্যাদা" : "Fast Iteration • High Prestige in CS/Eng",
      indexTiers: locale === "bn" ? "CORE র‍্যাংকিং: A*, A, B, C" : "CORE Rankings: A*, A, B, C",
      turnaround: locale === "bn" ? "২ - ৪ মাস (নির্দিষ্ট ডেডলাইন)" : "2 - 4 Months (Fixed Deadlines)",
      typicalLength: locale === "bn" ? "৬ - ১০ পৃষ্ঠা (IEEE / ACM / Springer)" : "6 - 10 Pages (IEEE / ACM / Springer)",
      acceptanceRate: locale === "bn" ? "শীর্ষ ভেন্যুর জন্য ১৫% - ২৫%" : "15% - 25% for top-tier venues",
      keyCharacteristics: locale === "bn" ? [
        "কম্পিউটার সায়েন্স, এআই এবং সফটওয়্যার ইঞ্জিনিয়ারিংয়ের প্রধান প্রকাশনা মাধ্যম।",
        "নির্দিষ্ট পেইজ বাজেট এবং কঠোর ক্যামেরা-রেডি সাবমিশন ডেডলাইন থাকে।",
        "কনফারেন্সে সশরীরে বা ভার্চুয়ালি পেপার প্রেজেন্টেশন প্রদান বাধ্যতামূলক।",
        "IEEE Xplore, ACM Digital Library অথবা Springer LNCS-এ তাৎক্ষণিক ইনডেক্সিং হয়।"
      ] : [
        "Primary publication route for Computer Science, AI, and Software Engineering",
        "Strict page budget with hard camera-ready submission deadlines",
        "Author presentation required at the conference venue or virtual track",
        "Instant indexing in IEEE Xplore, ACM Digital Library, or Springer LNCS"
      ],
      idealWhen: locale === "bn"
        ? "যখন আপনার কাছে কোনো নতুন মডেল, উন্নত বেঞ্চমার্ক ফলাফল বা নতুন কোনো এলগরিদম দ্রুত প্রকাশের জন্য প্রস্তুত রয়েছে।"
        : "You have a novel experimental model, breakthrough benchmark, or prompt engineering framework ready to publish quickly."
    },
    {
      id: "journal",
      title: locale === "bn" ? "স্কোপাস / এসসিআইই ইনডেক্সড জার্নাল" : "Scopus / SCIE Indexed Journals",
      badge: locale === "bn" ? "উচ্চ মান ও গভীরতা • স্থায়ী প্রাতিষ্ঠানিক রেকর্ড" : "High Rigor • Archival Permanence",
      indexTiers: locale === "bn" ? "সাইমাগো কোয়ার্টাইল: Q1, Q2, Q3, Q4" : "Scimago Quartiles: Q1, Q2, Q3, Q4",
      turnaround: locale === "bn" ? "৩ - ৮ মাস (ধারাবাহিক সাবমিশন)" : "3 - 8 Months (Continuous Submission)",
      typicalLength: locale === "bn" ? "১২ - ২৫+ পৃষ্ঠা (Elsevier, IEEE, Nature, Springer)" : "12 - 25+ Pages (Elsevier, IEEE, Nature, Springer)",
      acceptanceRate: locale === "bn" ? "Q1 / Q2 স্তরের জন্য ১০% - ৩০%" : "10% - 30% for Q1 / Q2 tiers",
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
      id: "slr",
      title: locale === "bn" ? "সিস্টেমেটিক লিটারেচার রিভিউ (SLR)" : "Systematic Literature Review (SLR)",
      badge: locale === "bn" ? "উচ্চ সাইটেশন সম্ভাবনা • প্রটোকল ভিত্তিক কাঠামো" : "High Citations • Methodological Protocol",
      indexTiers: locale === "bn" ? "PRISMA 2020 নির্দেশিকা অনুসারী" : "PRISMA 2020 Compliant",
      turnaround: locale === "bn" ? "৪ - ৬ মাস" : "4 - 6 Months",
      typicalLength: locale === "bn" ? "১৫ - ৩০ পৃষ্ঠা" : "15 - 30 Pages",
      acceptanceRate: locale === "bn" ? "রিভিউ-ভিত্তিক জার্নালে ২০% - ৩৫%" : "20% - 35% in survey-dedicated journals",
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
      id: "thesis",
      title: locale === "bn" ? "স্নাতক বনাম মাস্টার্স থিসিস" : "Undergraduate vs. Master's Thesis",
      badge: locale === "bn" ? "ডিগ্রি অর্জনের চূড়ান্ত প্রজেক্ট" : "Institutional Degree Fulfillment",
      indexTiers: locale === "bn" ? "বিশ্ববিদ্যালয়ের অ্যাকাডেমিক কমিটি কর্তৃক মূল্যায়ন" : "University Academic Committee Evaluation",
      turnaround: locale === "bn" ? "১ - ২ সেমিস্টার (১৬ থেকে ৫২ সপ্তাহ)" : "1 - 2 Semesters (16 to 52 Weeks)",
      typicalLength: locale === "bn" ? "স্নাতক: ৪০-৭০ পৃষ্ঠা | মাস্টার্স: ৭০-১২০ পৃষ্ঠা" : "Undergrad: 40-70 Pages | Master's: 70-120 Pages",
      acceptanceRate: locale === "bn" ? "অনুষদের ডিফেন্স বোর্ড ও ভাইভা" : "Internal Faculty Board Examination",
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
    <div className="space-y-6">
      {/* Selector Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {typologies.map((t) => (
          <button
            key={t.id}
            onClick={() => setSelectedType(t.id)}
            className={`p-3 rounded-xl text-left border text-xs font-semibold transition-all ${
              selectedType === t.id
                ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/20 dark:bg-cyan-500 dark:text-slate-950 dark:border-cyan-500"
                : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-cyan-800"
            }`}
          >
            <span className="block text-sm font-bold mb-0.5">{t.title}</span>
            <span className={`text-[10px] block opacity-80 ${selectedType === t.id ? "text-indigo-100 dark:text-slate-900" : "text-slate-500 dark:text-slate-400"}`}>
              {t.indexTiers}
            </span>
          </button>
        ))}
      </div>

      {/* Detail Card */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-cyan-300 border border-indigo-200/60 dark:border-indigo-900/60">
              {current.badge}
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1.5">
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

        {/* Metric Triad */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800">
            <span className="text-slate-400 font-semibold block text-[10px] uppercase">
              {locale === "bn" ? "প্রকাশনা সময়সীমা" : "Turnaround Time"}
            </span>
            <span className="text-slate-900 dark:text-white font-bold text-sm mt-0.5 block">{current.turnaround}</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800">
            <span className="text-slate-400 font-semibold block text-[10px] uppercase">
              {locale === "bn" ? "স্বাভাবিক দৈর্ঘ্য" : "Typical Length"}
            </span>
            <span className="text-slate-900 dark:text-white font-bold text-sm mt-0.5 block">{current.typicalLength}</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800">
            <span className="text-slate-400 font-semibold block text-[10px] uppercase">
              {locale === "bn" ? "গ্রহণের হার" : "Acceptance Ratio"}
            </span>
            <span className="text-slate-900 dark:text-white font-bold text-sm mt-0.5 block">{current.acceptanceRate}</span>
          </div>
        </div>

        {/* Key Characteristics */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            {locale === "bn" ? "প্রধান গঠনগত বৈশিষ্ট্য:" : "Key Architectural Characteristics:"}
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
