"use client";

import React, { useState } from "react";
import { useResearchStore } from "@/store/useResearchStore";
import { useI18n } from "@/lib/i18n";
import {
  BarChart3,
  MessageSquareQuote,
  GitMerge,
  HelpCircle,
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Database,
  Users,
  Code2,
  FileCheck
} from "lucide-react";

export function MethodologyComparison() {
  const { locale } = useResearchStore();
  const { t } = useI18n(locale);

  // Decision Tree State (Steps 1, 2, 3)
  const [treeStep, setTreeStep] = useState<number>(1);
  const [natureChoice, setNatureChoice] = useState<string | null>(null);
  const [dataChoice, setDataChoice] = useState<string | null>(null);
  const [outcomeChoice, setOutcomeChoice] = useState<string | null>(null);

  const resetDecisionTree = () => {
    setTreeStep(1);
    setNatureChoice(null);
    setDataChoice(null);
    setOutcomeChoice(null);
  };

  // Determine recommendation based on decision tree selections
  const getRecommendation = () => {
    if (natureChoice === "hypothesis" || outcomeChoice === "statistical") {
      return {
        type: "quantitative",
        title: locale === "bn" ? "পরিমাণগত পদ্ধতি (Quantitative Empirical Research)" : "Quantitative Empirical Research",
        badge: locale === "bn" ? "পরিসংখ্যানগত সাধারণীকরণ • হাইপোথিসিস টেস্ট" : "Statistical Generalizability • Hypothesis Testing",
        color: "indigo",
        rationale: locale === "bn"
          ? "আপনার গবেষণার মূল লক্ষ্য হলো নির্দিষ্ট চলকগুলোর (Variables) মধ্যকার সম্পর্ক প্রমাণ করা, হাইপোথিসিস টেস্ট করা এবং বৃহৎ নমুনা থেকে সংখ্যাগত সিদ্ধান্ত গ্রহণ করা।"
          : "Your study aims to mathematically test hypotheses, examine correlations between defined variables, and generalize empirical findings across a broader population.",
        sampling: locale === "bn" ? "সম্ভাব্যতাভিত্তিক নমুনায়ন (Simple Random, Stratified, বা Cluster Sampling - নূন্যতম ১০০+ রেসপন্ডেন্ট)" : "Probability Sampling (Simple Random, Stratified, or Cluster - Min N ≥ 100)",
        tools: ["SPSS", "R (lavaan, psych)", "Python (pandas, scipy, statsmodels)", "SmartPLS 4"],
        instruments: locale === "bn" ? "৫-পয়েন্ট লিকার্ট স্কেল প্রশ্নমালা (Google Forms / Qualtrics), স্ট্রাকচার্ড এক্সপেরিমেন্টাল মেজারস" : "5-point Likert Scale Questionnaire (Google Forms/Qualtrics), Structured Metrics"
      };
    }

    if (natureChoice === "exploratory" || outcomeChoice === "contextual") {
      return {
        type: "qualitative",
        title: locale === "bn" ? "গুণগত পদ্ধতি (Qualitative In-Depth Research)" : "Qualitative In-Depth Research",
        badge: locale === "bn" ? "গভীর প্রাসঙ্গিক উপলব্ধি • থিমেটিক এনালাইসিস" : "Deep Contextual Insights • Thematic Analysis",
        color: "emerald",
        rationale: locale === "bn"
          ? "যেখানে কোনো প্রতিষ্ঠিত তত্ত্ব নেই বা মানুষের বাস্তব অভিজ্ঞতা, আচরণ ও প্রাতিষ্ঠানিক বাধাগুলো উন্মোচন করা প্রয়োজন, সেখানে কোয়ালিটেটিভ পদ্ধতি সর্বোত্তম।"
          : "Ideal when exploring novel, ill-defined social/technical dynamics where participants' lived experiences, institutional roadblocks, and rich contextual nuances take precedence.",
        sampling: locale === "bn" ? "উদ্দেশ্যমূলক বা স্নোবল নমুনায়ন (Purposive / Snowball Sampling - ১২ থেকে ২৫ জন কী-ইনফরম্যান্ট বা বিশেষজ্ঞ)" : "Purposive or Snowball Sampling (12 - 25 Key Informants / Domain Specialists)",
        tools: ["NVivo", "ATLAS.ti", "MAXQDA", "Manual Inductive Thematic Coding (Braun & Clarke)"],
        instruments: locale === "bn" ? "সেমি-স্ট্রাকচার্ড ইন্টারভিউ প্রটোকল (অডিও রেকর্ডিং ও ট্রান্সক্রিপ্ট), ফোকাস গ্রুপ ডিসকাশন (FGD)" : "Semi-Structured Interview Protocol (Audio Recordings & Transcripts), Focus Groups (FGD)"
      };
    }

    // Default to Mixed-Methods
    return {
      type: "mixed",
      title: locale === "bn" ? "মিশ্র পদ্ধতি (Mixed-Methods Triangulation)" : "Mixed-Methods Triangulation",
      badge: locale === "bn" ? "বহুমাত্রিক বিশ্বাসযোগ্যতা • এক্সপ্লানেটরি সিকোয়েনশিয়াল" : "Multidimensional Credibility • Explanatory Sequential",
      color: "purple",
      rationale: locale === "bn"
        ? "প্রথমে বৃহৎ জরিপ দ্বারা সাধারণ ট্রেন্ড পরিমাপ করা (Quant), অতঃপর প্রাপ্ত অমিল বা গভীর কারণগুলো ব্যাখ্যার জন্য নির্বাচিত বিশেষজ্ঞদের ইন্টারভিউ গ্রহণ (Qual) আপনার থিসিসকে সর্বোচ্চ গ্রহণযোগ্যতা দেবে।"
        : "Combining quantitative trends with qualitative depth (Explanatory Sequential Design: Quant -> Qual) provides maximum empirical rigor, triangulation, and defensive strength.",
      sampling: locale === "bn" ? "মিশ্র পদ্ধতি: পর্যায় ১-এ বৃহৎ অনলাইন জরিপ (N=১৫০+) + পর্যায় ২-এ উদ্দেশ্যমূলক ইন্টারভিউ (N=৮-১০)" : "Mixed Sampling: Large Online Survey (N=150+) followed by Nested Key Informant Interviews (N=8-10)",
      tools: ["SPSS / Python + NVivo / ATLAS.ti (Joint Display Integration)"],
      instruments: locale === "bn" ? "৫-পয়েন্ট লিকার্ট সার্ভে + ফলো-আপ সেমি-স্ট্রাকচার্ড ইন্টারভিউ প্রোটোকল" : "Structured 5-point Likert Scale + Targeted In-Depth Probing Protocol"
    };
  };

  const rec = getRecommendation();

  return (
    <div className="space-y-10 text-xs">
      {/* 3-Pillar Comparative Matrix */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600 dark:text-cyan-400" />
              <span>{locale === "bn" ? "গবেষণা পদ্ধতির তুলনামূলক ফ্রেমওয়ার্ক" : "Methodology Typology Comparison Framework"}</span>
            </h2>
            <p className="text-slate-500 text-[11px] mt-0.5">
              {locale === "bn"
                ? "কোয়ান্টিটেটিভ, কোয়ালিটেটিভ এবং মিক্সড-মেথডসের গঠন, ডেটা কালেকশন ও অ্যানালাইসিস টুলস"
                : "Comprehensive breakdown of Quantitative, Qualitative, and Mixed-Methods research archetypes."}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Quantitative Card */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-indigo-200/80 dark:border-indigo-900/60 shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-cyan-300 border border-indigo-200 dark:border-indigo-800">
                  {locale === "bn" ? "সংখ্যাগত ও পরিসংখ্যান" : "Numerical & Statistical"}
                </span>
                <BarChart3 className="w-5 h-5 text-indigo-600 dark:text-cyan-400" />
              </div>

              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {locale === "bn" ? "১. পরিমাণগত পদ্ধতি (Quantitative)" : "1. Quantitative Methodology"}
              </h3>

              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                {locale === "bn"
                  ? "নির্দিষ্ট হাইপোথিসিস ও চলক (Variables) পরিমাপে বৃহৎ নমুনা থেকে ডেটা সংগ্রহ করে গাণিতিক বা পরিসংখ্যানিক মডেল তৈরি করা।"
                  : "Deductive hypothesis testing using structured instruments, numeric metrics, and statistical inferences to establish cause-and-effect or correlation."}
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px]">
                <div>
                  <span className="font-bold text-slate-700 dark:text-slate-300 block">{locale === "bn" ? "প্রধান ইনস্ট্রুমেন্ট:" : "Primary Instrument:"}</span>
                  <span className="text-slate-500">5-point Likert Scales, Structured Sensor Logs, Closed-ended Surveys</span>
                </div>
                <div>
                  <span className="font-bold text-slate-700 dark:text-slate-300 block">{locale === "bn" ? "নমুনা কৌশল (Sampling):" : "Sampling Approach:"}</span>
                  <span className="text-slate-500">Probability / Random Sampling (N ≥ 100 - 300+ respondents)</span>
                </div>
                <div>
                  <span className="font-bold text-slate-700 dark:text-slate-300 block">{locale === "bn" ? "টুলস ও লাইব্রেরি:" : "Analysis Software:"}</span>
                  <span className="text-indigo-600 dark:text-cyan-400 font-semibold">IBM SPSS, R Studio, Python (pandas, scipy), SmartPLS 4</span>
                </div>
              </div>
            </div>
          </div>

          {/* Qualitative Card */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-200/80 dark:border-emerald-900/60 shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  {locale === "bn" ? "অভিজ্ঞতা ও থিম" : "Textual & Thematic"}
                </span>
                <MessageSquareQuote className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>

              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {locale === "bn" ? "২. গুণগত পদ্ধতি (Qualitative)" : "2. Qualitative Methodology"}
              </h3>

              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                {locale === "bn"
                  ? "মানুষের বাস্তব অভিজ্ঞতা, সামাজিক প্রেক্ষাপট এবং গভীর কারণগুলো উন্মোচনে মুক্ত আলোচনা ও থিমেটিক কোডিংয়ের ব্যবহার।"
                  : "Inductive exploration of complex human experiences, institutional frictions, and organizational contexts through rich narratives."}
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px]">
                <div>
                  <span className="font-bold text-slate-700 dark:text-slate-300 block">{locale === "bn" ? "প্রধান ইনস্ট্রুমেন্ট:" : "Primary Instrument:"}</span>
                  <span className="text-slate-500">Semi-Structured Interviews, Focus Group Discussions (FGD), Observation Notes</span>
                </div>
                <div>
                  <span className="font-bold text-slate-700 dark:text-slate-300 block">{locale === "bn" ? "নমুনা কৌশল (Sampling):" : "Sampling Approach:"}</span>
                  <span className="text-slate-500">Purposive, Theoretical, or Snowball Sampling (N = 10 - 25 Key Informants)</span>
                </div>
                <div>
                  <span className="font-bold text-slate-700 dark:text-slate-300 block">{locale === "bn" ? "টুলস ও লাইব্রেরি:" : "Analysis Software:"}</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">NVivo, ATLAS.ti, MAXQDA, Thematic Analysis Matrices</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mixed Methods Card */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-purple-200/80 dark:border-purple-900/60 shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                  {locale === "bn" ? "দ্বৈত যাচাই ও শক্ত ভিত্তি" : "Triangulation & Rigor"}
                </span>
                <GitMerge className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>

              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {locale === "bn" ? "৩. মিশ্র পদ্ধতি (Mixed-Methods)" : "3. Mixed-Methods Design"}
              </h3>

              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                {locale === "bn"
                  ? "সংখ্যাগত জরিপ (Quantitative) ও গভীর ইন্টারভিউ (Qualitative) একত্রে সমন্বয় করে গবেষণার ফলাফলকে ত্রিমুখী যাচাই (Triangulation) করা।"
                  : "Synergistic integration of quantitative breadth and qualitative depth (e.g., Explanatory Sequential: Quant -> Qual, or Convergent Parallel)."}
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px]">
                <div>
                  <span className="font-bold text-slate-700 dark:text-slate-300 block">{locale === "bn" ? "প্রধান ডিজাইন মডেল:" : "Core Design Models:"}</span>
                  <span className="text-slate-500">Explanatory Sequential (Quant first, Qual explains outliers) or Convergent</span>
                </div>
                <div>
                  <span className="font-bold text-slate-700 dark:text-slate-300 block">{locale === "bn" ? "নমুনা কৌশল (Sampling):" : "Sampling Approach:"}</span>
                  <span className="text-slate-500">Multi-Phase Sampling: Large Survey (N ≥ 150) + Nested Key Interviews (N = 8-12)</span>
                </div>
                <div>
                  <span className="font-bold text-slate-700 dark:text-slate-300 block">{locale === "bn" ? "টুলস ও ইন্টিগ্রেশন:" : "Analysis Software:"}</span>
                  <span className="text-purple-600 dark:text-purple-400 font-semibold">SPSS / Python + NVivo (Joint Display Tables & Side-by-Side Comparison)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive 3-Step Decision Tree */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl border border-indigo-900/50 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-400/20 text-cyan-300 border border-cyan-400/30 uppercase tracking-wider mb-1">
              <HelpCircle className="w-3 h-3" />
              {locale === "bn" ? `ইন্টারেক্টিভ ডিসিশন ট্রি • ধাপ ${treeStep} / ৩` : `Interactive Decision Tree • Step ${treeStep} of 3`}
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white">
              {locale === "bn" ? "আপনার থিসিসের জন্য সঠিক মেথডলজি নির্বাচন করুন" : "Determine Your Ideal Thesis Methodology"}
            </h3>
          </div>

          <button
            onClick={resetDecisionTree}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-semibold transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{locale === "bn" ? "পুনরায় শুরু করুন" : "Reset Steps"}</span>
          </button>
        </div>

        {/* Step 1: Question Nature */}
        {treeStep === 1 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <h4 className="font-bold text-sm text-cyan-300">
              {locale === "bn"
                ? "ধাপ ১: আপনার থিসিসের মূল গবেষণামূলক প্রশ্নের ধরন কেমন?"
                : "Step 1: What is the primary nature of your central research question?"}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                {
                  id: "hypothesis",
                  title: locale === "bn" ? "হাইপোথিসিস ও সংখ্যাগত সম্পর্ক যাচাই" : "Hypothesis & Causal Relationship",
                  desc: locale === "bn" ? "নির্দিষ্ট ভেরিয়েবলগুলোর মধ্যে প্রভাব, সম্পর্ক বা গাণিতিক পার্থক্য যাচাই করতে চাই।" : "Testing specific relationships, regression models, or quantitative group differences."
                },
                {
                  id: "exploratory",
                  title: locale === "bn" ? "অজানা প্রেক্ষাপট বা অভিজ্ঞতা অন্বেষণ" : "Exploratory & Lived Experiences",
                  desc: locale === "bn" ? "কোনো ঘটনার অন্তর্নিহিত কারণ, অনুভূতি, প্রাতিষ্ঠানিক বাধা বা নতুন ফ্রেমওয়ার্ক দাঁড় করাতে চাই।" : "Discovering 'why' and 'how' through narratives, behavioral patterns, and emerging themes."
                },
                {
                  id: "mixed",
                  title: locale === "bn" ? "সংখ্যাগত পরিমাপ + গভীর ব্যাখ্যা উভয়েই" : "Dual Exploration & Explanation",
                  desc: locale === "bn" ? "প্রথমে সার্বিক পরিসংখ্যান দেখব এবং পরে তার গভীরে গিয়ে কারণ ব্যাখ্যা করব।" : "Combining statistical generalization with in-depth key informant explanations."
                }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setNatureChoice(opt.id);
                    setTreeStep(2);
                  }}
                  className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-2 ${
                    natureChoice === opt.id
                      ? "bg-indigo-600/50 border-cyan-400 shadow-md ring-2 ring-cyan-400/40"
                      : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                  }`}
                >
                  <span className="font-bold text-xs text-white block">{opt.title}</span>
                  <span className="text-[11px] text-slate-300 leading-relaxed block">{opt.desc}</span>
                  <div className="pt-2 flex items-center gap-1 text-[11px] text-cyan-300 font-bold">
                    <span>{locale === "bn" ? "নির্বাচন করুন" : "Select"}</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Sampling & Data Feasibility */}
        {treeStep === 2 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <h4 className="font-bold text-sm text-cyan-300">
              {locale === "bn"
                ? "ধাপ ২: আপনার ডেটা ও অংশগ্রহণকারীদের প্রাপ্তিসাধ্যতা (Data Access) কেমন?"
                : "Step 2: What is your realistic access to data and research participants?"}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                {
                  id: "large_scale",
                  title: locale === "bn" ? "১০০+ অংশগ্রহণকারীকে অনলাইন সার্ভে পাঠানো সম্ভব" : "Accessible Large Sample (N ≥ 100+)",
                  desc: locale === "bn" ? "শিক্ষার্থী, গ্রাহক বা সাধারণ ব্যবহারকারীদের থেকে গুগল ফর্মে প্রচুর রেসপন্স সংগ্রহ করা যাবে।" : "Feasible to distribute online questionnaires across large student, user, or consumer pools."
                },
                {
                  id: "experts_only",
                  title: locale === "bn" ? "সীমিত সংখ্যক (১০-২০ জন) বিশেষজ্ঞ বা আক্রান্ত ব্যক্তি" : "Targeted Niche / Key Informants (N = 10 - 25)",
                  desc: locale === "bn" ? "ডাক্তার, পুলিশ কর্মকর্তা, সফটওয়্যার আর্কিটেক্ট বা নির্দিষ্ট ভুক্তভোগীদের সাথে ইন-ডেপথ ইন্টারভিউ।" : "Access to industry leaders, doctors, legal experts, or specific impacted individuals for in-depth interviews."
                },
                {
                  id: "sequential_both",
                  title: locale === "bn" ? "প্রথমে সাধারণ সার্ভে, অতঃপর নির্বাচিতদের ইন্টারভিউ" : "Two-Phase Feasibility (Survey + Follow-up)",
                  desc: locale === "bn" ? "প্রথমে অনলাইন সার্ভে দিয়ে শুরু করব, তারপর তাদের মধ্য থেকে ৫-৮ জনকে ইন্টারভিউ করব।" : "Can administer a broad survey first and recruit a sub-sample of respondents for interviews."
                }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setDataChoice(opt.id);
                    setTreeStep(3);
                  }}
                  className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-2 ${
                    dataChoice === opt.id
                      ? "bg-indigo-600/50 border-cyan-400 shadow-md ring-2 ring-cyan-400/40"
                      : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                  }`}
                >
                  <span className="font-bold text-xs text-white block">{opt.title}</span>
                  <span className="text-[11px] text-slate-300 leading-relaxed block">{opt.desc}</span>
                  <div className="pt-2 flex items-center gap-1 text-[11px] text-cyan-300 font-bold">
                    <span>{locale === "bn" ? "পরবর্তী" : "Proceed"}</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Analytical Outcome Goal */}
        {treeStep === 3 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <h4 className="font-bold text-sm text-cyan-300">
              {locale === "bn"
                ? "ধাপ ৩: আপনার থিসিস ডিফেন্সে আপনি কোন ফলাফলটি সবচেয়ে বেশি জোর দিয়ে প্রমাণ করতে চান?"
                : "Step 3: What analytical outcome will be the cornerstone of your thesis defense?"}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                {
                  id: "statistical",
                  title: locale === "bn" ? "পরিসংখ্যানগত প্রামাণ্যতা (p-value, R-squared, ANOVA)" : "Empirical Statistical Validation",
                  desc: locale === "bn" ? "সংখ্যা দিয়ে প্রমাণ করতে হবে যে আমার প্রস্তাবিত সমাধান কার্যকর এবং ফলাফলটি কাকতালীয় নয়।" : "Empirically demonstrating significance, statistical reliability (Cronbach's α), and regression variance."
                },
                {
                  id: "contextual",
                  title: locale === "bn" ? "বাস্তব প্রেক্ষাপটের গভীর অন্তর্দৃষ্টি ও থিম" : "Deep Contextual Taxonomy & Themes",
                  desc: locale === "bn" ? "মানুষের উদ্ধৃতি, সমস্যাগুলোর মূল কারণ এবং শ্রেণীবদ্ধ থিমেটিক নেটওয়ার্ক উপস্থাপন করা।" : "Presenting verbatim participant quotes, grounded frameworks, and rich socio-technical insights."
                },
                {
                  id: "triangulated",
                  title: locale === "bn" ? "দ্বিমুখী যাচাই (সংখ্যাগত প্রমাণের সাথে বিশেষজ্ঞ মতামত)" : "Comprehensive Triangulation",
                  desc: locale === "bn" ? "জরিপের সংখ্যাও থাকবে এবং বিশেষজ্ঞদের যুক্তিপূর্ণ ব্যাখ্যা দিয়ে ফলাফল সমৃদ্ধ করা হবে।" : "Presenting statistical benchmarks alongside expert thematic interviews for maximum thesis defensibility."
                }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setOutcomeChoice(opt.id);
                  }}
                  className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-2 ${
                    outcomeChoice === opt.id
                      ? "bg-indigo-600/50 border-cyan-400 shadow-md ring-2 ring-cyan-400/40"
                      : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                  }`}
                >
                  <span className="font-bold text-xs text-white block">{opt.title}</span>
                  <span className="text-[11px] text-slate-300 leading-relaxed block">{opt.desc}</span>
                  <div className="pt-2 flex items-center gap-1 text-[11px] text-cyan-300 font-bold">
                    <span>{locale === "bn" ? "ফলাফল দেখুন" : "View Recommendation"}</span>
                    <CheckCircle2 className="w-3 h-3" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Dynamic Decision Tree Recommendation Box */}
        {(treeStep === 3 && outcomeChoice) && (
          <div className="p-5 rounded-2xl bg-white/10 border border-cyan-400/40 space-y-3.5 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div>
                <span className="text-[10px] font-bold text-cyan-300 uppercase tracking-wider block">
                  {locale === "bn" ? "আপনার জন্য সুপারিশকৃত মেথডলজি" : "Recommended Methodology Archetype"}
                </span>
                <h4 className="text-base font-extrabold text-white mt-0.5">{rec.title}</h4>
              </div>
              <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-cyan-400 text-slate-950 self-start sm:self-auto">
                {rec.badge}
              </span>
            </div>

            <p className="text-slate-200 leading-relaxed text-[11px]">
              {rec.rationale}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-[11px]">
              <div className="p-3 rounded-xl bg-black/20 border border-white/5">
                <span className="font-bold text-cyan-300 block mb-1">{locale === "bn" ? "নমুনা কৌশল (Sampling):" : "Sampling Technique:"}</span>
                <span className="text-slate-300 text-[10px]">{rec.sampling}</span>
              </div>
              <div className="p-3 rounded-xl bg-black/20 border border-white/5">
                <span className="font-bold text-cyan-300 block mb-1">{locale === "bn" ? "প্রস্তাবিত ইনস্ট্রুমেন্ট:" : "Core Instrument:"}</span>
                <span className="text-slate-300 text-[10px]">{rec.instruments}</span>
              </div>
              <div className="p-3 rounded-xl bg-black/20 border border-white/5">
                <span className="font-bold text-cyan-300 block mb-1">{locale === "bn" ? "প্রস্তাবিত সফটওয়্যার:" : "Recommended Tools:"}</span>
                <span className="text-slate-300 text-[10px]">{rec.tools.join(", ")}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
