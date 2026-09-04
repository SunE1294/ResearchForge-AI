"use client";

import React, { useState, useRef, useEffect } from "react";
import { useResearchStore } from "@/store/useResearchStore";
import { HelpCircle, Info, X } from "lucide-react";

export type JargonTerm =
  | "prisma"
  | "likert"
  | "boolean"
  | "scopus"
  | "imrad"
  | "cronbach"
  | "doubleBarreled"
  | "preprint"
  | "doi"
  | "reverseCoded";

interface JargonDefinition {
  titleEn: string;
  titleBn: string;
  descEn: string;
  descBn: string;
  tipEn?: string;
  tipBn?: string;
}

export const JARGON_DICTIONARY: Record<JargonTerm, JargonDefinition> = {
  prisma: {
    titleEn: "PRISMA 2020 Standard",
    titleBn: "প্রিসমা ২০২০ (PRISMA) স্ট্যান্ডার্ড",
    descEn: "Preferred Reporting Items for Systematic Reviews—a 4-step checklist (Identification, Screening, Eligibility, Included) to systematically select and report research papers.",
    descBn: "সিস্টেমেটিক রিভিউতে পেপার বাছাই ও অন্তর্ভুক্ত করার আন্তর্জাতিক ৪-ধাপের বৈজ্ঞানিক ফ্লোচার্ট স্ট্যান্ডার্ড।",
    tipEn: "Mandatory for high-impact review papers and meta-analyses.",
    tipBn: "সিস্টেমেটিক লিটারেচার রিভিউ পেপার লেখার জন্য এটি অত্যন্ত জরুরি।"
  },
  likert: {
    titleEn: "5-Point Likert Scale",
    titleBn: "৫-পয়েন্ট লিকার্ট স্কেল",
    descEn: "A psychometric scale measuring respondents' agreement from 1 ('Strongly Disagree') to 5 ('Strongly Agree') to quantify human perception objectively.",
    descBn: "অংশগ্রহণকারীদের মতামত পরিমাপের ১ (সম্পূর্ণ দ্বিমত) থেকে ৫ (সম্পূর্ণ একমত) পয়েন্ট বিশিষ্ট নির্ভরযোগ্য অ্যাকাডেমিক স্কেল।",
    tipEn: "Widely used in business, HCI, education, and social science surveys.",
    tipBn: "জরিপভিত্তিক গবেষণার জন্য সবচেয়ে জনপ্রিয় ও গ্রহণযোগ্য স্কেল।"
  },
  boolean: {
    titleEn: "Boolean Search Operators",
    titleBn: "বুলিয়ান সার্চ লজিক",
    descEn: "Combining keywords with AND, OR, NOT and quotes to eliminate irrelevant noise and pinpoint exact peer-reviewed papers in scientific databases.",
    descBn: "AND, OR, NOT এবং উদ্ধৃতিচিহ্ন ব্যবহার করে অপ্রয়োজনীয় ফলাফল বাদ দিয়ে সুনির্দিষ্ট গবেষণাপত্র খুঁজে বের করার বৈজ্ঞানিক সার্চ পদ্ধতি।",
    tipEn: "Example: (\"Deep Learning\" OR \"CNN\") AND \"Lung Cancer\"",
    tipBn: "যেমন: (\"মেশিন লার্নিং\" OR \"এআই\") AND \"স্বাস্থ্যসেবা\""
  },
  scopus: {
    titleEn: "Scopus Quartiles (Q1 - Q4)",
    titleBn: "স্কোপাস কোয়ার্টাইল (Q1 - Q4)",
    descEn: "Scimago journal ranking dividing indexed venues into 4 tiers; Q1 represents the top 25% highest-impact and most prestigious journals globally.",
    descBn: "সাইটেশন ও গ্রহণযোগ্যতা অনুযায়ী বৈশ্বিক জার্নালের ৪টি স্তর; Q1 হলো বিশ্বের শীর্ষ ২৫% জার্নাল, যা ডিফেন্সে সর্বোচ্চ সম্মান বহন করে।",
    tipEn: "Target Q1/Q2 journals for master's and doctoral graduation benchmarks.",
    tipBn: "থিসিস পেপার প্রকাশের জন্য Q1 বা Q2 জার্নালকে অগ্রাধিকার দিন।"
  },
  imrad: {
    titleEn: "IMRAD Paper Formula",
    titleBn: "IMRAD পেপার ফরম্যাট",
    descEn: "Introduction, Methods, Results, and Discussion—the universal 4-part architectural blueprint followed by empirical journal publications.",
    descBn: "ভূমিকা (Introduction), পদ্ধতি (Methods), ফলাফল (Results) ও আলোচনা (Discussion)—বৈজ্ঞানিক জার্নাল পেপারের সার্বজনীন কাঠামো।",
    tipEn: "Most IEEE, Elsevier, and Springer papers strictly adhere to IMRAD.",
    tipBn: "অধিকাংশ আন্তর্জাতিক গবেষণাপত্র এই নির্দিষ্ট ক্রমে সাজানো থাকে।"
  },
  cronbach: {
    titleEn: "Cronbach's Alpha (α)",
    titleBn: "ক্রনবাখ আলফা (α) রিলায়েবিলিটি",
    descEn: "A statistical metric measuring internal consistency of survey questions; an alpha score ≥ 0.70 is the academic threshold for publication validity.",
    descBn: "জরিপের প্রশ্নমালাগুলোর অভ্যন্তরীণ নির্ভরযোগ্যতা পরিমাপের পরিসংখ্যানিক সূচক (০.৭০ বা তার বেশি গ্রহণযোগ্য)।",
    tipEn: "Calculate Cronbach's Alpha in SPSS or Python before running regression.",
    tipBn: "রিগ্রেশন অ্যানালাইসিস চালানোর আগে এই নির্ভরযোগ্যতা পরীক্ষা করা বাধ্যতামূলক।"
  },
  doubleBarreled: {
    titleEn: "Double-Barreled Question Trap",
    titleBn: "ডাবল-ব্যারেলড প্রশ্ন ফাঁদ",
    descEn: "A flawed survey question merging two distinct issues into one, confusing respondents and generating invalid research data.",
    descBn: "একই প্রশ্নে দুটি ভিন্ন বিষয় ঢুকিয়ে ফেলা, যা উত্তরদাতাকে বিভ্রান্ত করে এবং থিসিস ডিফেন্সে সরাসরি বাতিল হয়।",
    tipEn: "Fix: Split compound questions into two separate, focused items.",
    tipBn: "সমাধান: একটি জটিল প্রশ্নকে ভেঙে দুটি সরল প্রশ্নে রূপান্তর করুন।"
  },
  preprint: {
    titleEn: "Academic Preprint",
    titleBn: "একাডেমিক প্রিপ্রিন্ট",
    descEn: "A complete scientific manuscript shared publicly on open servers (like arXiv) prior to formal peer review, enabling instant zero-paywall discovery.",
    descBn: "জার্নালে চূড়ান্ত পিয়ার-রিভিউয়ের আগে দ্রুত উন্মুক্ত জ্ঞান বিস্তারের জন্য arXiv-এর মতো ওপেন সার্ভারে প্রকাশিত গবেষণাপত্র।",
    tipEn: "Allows you to cite cutting-edge research months before journal printing.",
    tipBn: "জার্নালে প্রিন্ট হওয়ার আগেই গবেষকদের লেটেস্ট পেপার পড়ার দারুণ উপায়।"
  },
  doi: {
    titleEn: "Digital Object Identifier (DOI)",
    titleBn: "ডিজিটাল অবজেক্ট আইডেন্টিফায়ার (DOI)",
    descEn: "A persistent unique alpha-numeric string assigned to scientific articles and datasets ensuring they remain permanently citable online.",
    descBn: "বৈজ্ঞানিক নিবন্ধ ও ডেটাসেটের জন্য নির্ধারিত স্থায়ী ডিজিটাল নম্বর, যা আজীবন ইন্টারনেটে খুঁজে পাওয়া নিশ্চিত করে।",
    tipEn: "Always include the DOI link in your bibliography / references.",
    tipBn: "থিসিসের রেফারেন্সে সবসময় পেপারের DOI লিংক যুক্ত করা উচিত।"
  },
  reverseCoded: {
    titleEn: "Reverse-Coded Item",
    titleBn: "রিভার্স-কোডেড আইটেম",
    descEn: "A negatively phrased question intentionally embedded to detect inattentive survey participants and eliminate automatic agreement bias.",
    descBn: "উত্তরদাতারা মনোযোগ দিয়ে পড়ছে কি না তা যাচাই করতে এবং অন্ধভাবে 'একমত' দেওয়ার প্রবণতা ঠেকাতে কৌশলগত নেতিবাচক প্রশ্ন।",
    tipEn: "Remember to recode scores (1=5, 5=1) in SPSS/Python before computing means.",
    tipBn: "গড় বের করার আগে এসপিএসএস বা পাইথনে এর স্কেল উল্টে (১=৫, ৫=১) নিতে হয়।"
  }
};

interface AcademicTooltipProps {
  term?: JargonTerm;
  customTitle?: string;
  customTitleBn?: string;
  customDesc?: string;
  customDescBn?: string;
  className?: string;
}

export function AcademicTooltip({
  term,
  customTitle,
  customTitleBn,
  customDesc,
  customDescBn,
  className = ""
}: AcademicTooltipProps) {
  const { locale } = useResearchStore();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  const def = term ? JARGON_DICTIONARY[term] : null;
  const title = locale === "bn" 
    ? (customTitleBn || def?.titleBn || "একাডেমিক পরিভাষা") 
    : (customTitle || def?.titleEn || "Academic Concept");

  const desc = locale === "bn"
    ? (customDescBn || def?.descBn || "")
    : (customDesc || def?.descEn || "");

  const tip = locale === "bn" ? def?.tipBn : def?.tipEn;

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <span
      ref={containerRef}
      className={`relative inline-flex items-center align-middle mx-1 ${className}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Trigger Pill Button */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        aria-label={`Academic guidance for ${title}`}
        className="w-4 h-4 rounded-full bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-950/80 dark:hover:bg-indigo-900/90 text-indigo-700 dark:text-cyan-300 flex items-center justify-center text-[10px] font-bold transition-transform hover:scale-110 shadow-xs border border-indigo-200/60 dark:border-indigo-800"
      >
        ?
      </button>

      {/* Accessible Popover Tooltip */}
      {isOpen && (
        <div
          role="tooltip"
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 sm:w-80 p-3.5 rounded-2xl bg-slate-900 text-white border border-slate-700 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150 text-left pointer-events-auto"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-2 pb-1.5 border-b border-slate-800">
            <div className="flex items-center gap-1.5 text-cyan-400">
              <Info className="w-3.5 h-3.5 shrink-0" />
              <span className="text-[11px] font-bold tracking-tight text-white">{title}</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
              className="text-slate-400 hover:text-white p-0.5"
            >
              <X className="w-3 h-3" />
            </button>
          </div>

          {/* Plain Language Definition */}
          <p className="text-[11px] text-slate-300 leading-relaxed mt-2 font-normal">
            {desc}
          </p>

          {/* Optional Actionable Tip */}
          {tip && (
            <div className="mt-2 pt-2 border-t border-slate-800/80 text-[10px] text-emerald-400 font-medium flex items-start gap-1">
              <span className="shrink-0 font-bold">💡 {locale === "bn" ? "টিপ:" : "Tip:"}</span>
              <span className="leading-snug text-slate-300">{tip}</span>
            </div>
          )}

          {/* Arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-900" />
        </div>
      )}
    </span>
  );
}
