"use client";

import React, { useState } from "react";
import { useResearchStore } from "@/store/useResearchStore";
import { useI18n } from "@/lib/i18n";
import { MethodologyComparison } from "@/components/methodology/MethodologyComparison";
import { SurveyArchitect } from "@/components/methodology/SurveyArchitect";
import { GoogleFormsBlueprint } from "@/components/methodology/GoogleFormsBlueprint";
import {
  FlaskConical,
  Sparkles,
  GitMerge,
  FileSpreadsheet,
  FileText,
  CheckCircle2,
  BookOpen
} from "lucide-react";

export default function MethodologyLabPage() {
  const { locale } = useResearchStore();
  const { t } = useI18n(locale);

  const [activeTab, setActiveTab] = useState<"comparison" | "architect" | "blueprint">("comparison");

  return (
    <div className="space-y-8 text-xs pb-12">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-cyan-300 border border-indigo-200 dark:border-indigo-900">
          <FlaskConical className="w-3.5 h-3.5" />
          <span>
            {locale === "bn"
              ? "পর্যায় খ • মেথডলজি ল্যাব ও সার্ভে ইঞ্জিনিয়ারিং"
              : "Phase B • Methodology Lab & Survey Engineering"}
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {locale === "bn"
            ? "গবেষণা পদ্ধতি ও এআই প্রশ্নমালা ল্যাব"
            : "Research Methodology & Survey Engineering Lab"}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-3xl leading-relaxed">
          {locale === "bn"
            ? "পরিমাণগত (Quantitative) ও গুণগত (Qualitative) গবেষণার তুলনামূলক বিশ্লেষণ, ৩-ধাপের ডিসিশন ট্রি, এআই-চালিত লিকার্ট স্কেল ও ইন্টারভিউ প্রোটোকল জেনারেটর এবং গুগল ফর্ম ডেটা কালেকশন গাইড।"
            : "Interactive decision tree comparing Quantitative vs. Qualitative vs. Mixed-methods, bias-free AI survey generation (5-point Likert & Interview Protocols), and Google Forms collection pipelines."}
        </p>
      </div>

      {/* Main Tab Navigation Bar */}
      <div className="p-1.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap items-center gap-1.5">
        <button
          onClick={() => setActiveTab("comparison")}
          className={`flex-1 min-w-[200px] py-2.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
            activeTab === "comparison"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20 dark:bg-cyan-500 dark:text-slate-950"
              : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <GitMerge className="w-4 h-4" />
          <span>
            {locale === "bn"
              ? "১. পদ্ধতি তুলনা ও ডিসিশন ট্রি"
              : "1. Comparison & Decision Tree"}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("architect")}
          className={`flex-1 min-w-[200px] py-2.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
            activeTab === "architect"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20 dark:bg-cyan-500 dark:text-slate-950"
              : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>
            {locale === "bn"
              ? "২. এআই সার্ভে ও প্রশ্নমালা আর্কিটেক্ট"
              : "2. AI Survey & Protocol Architect"}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("blueprint")}
          className={`flex-1 min-w-[200px] py-2.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
            activeTab === "blueprint"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20 dark:bg-cyan-500 dark:text-slate-950"
              : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>
            {locale === "bn"
              ? "৩. গুগল ফর্ম ও ডেটা ব্লুপ্রিন্ট"
              : "3. Google Forms & Data Blueprint"}
          </span>
        </button>
      </div>

      {/* Tab Content Rendering */}
      <div>
        {activeTab === "comparison" && <MethodologyComparison />}
        {activeTab === "architect" && <SurveyArchitect />}
        {activeTab === "blueprint" && <GoogleFormsBlueprint />}
      </div>
    </div>
  );
}
