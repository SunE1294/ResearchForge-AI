"use client";

import React, { useState } from "react";
import { useResearchStore } from "@/store/useResearchStore";
import { AcademicTooltip } from "@/components/ui/AcademicTooltip";
import { Layers, ArrowDown, Download, CheckCircle2 } from "lucide-react";

export function PrismaFlowchart() {
  const { locale } = useResearchStore();
  const [identifiedDatabases, setIdentifiedDatabases] = useState<number>(342);
  const [identifiedRegisters, setIdentifiedRegisters] = useState<number>(45);
  const [duplicatesRemoved, setDuplicatesRemoved] = useState<number>(98);
  const [recordsExcluded, setRecordsExcluded] = useState<number>(185);
  const [reportsExcludedReason, setReportsExcludedReason] = useState<string>("Lack of benchmark comparisons (24), Unverified datasets (18)");
  const [reportsExcludedCount, setReportsExcludedCount] = useState<number>(42);

  // Computed metrics
  const totalIdentified = identifiedDatabases + identifiedRegisters;
  const screenedCount = Math.max(0, totalIdentified - duplicatesRemoved);
  const fullTextAssessed = Math.max(0, screenedCount - recordsExcluded);
  const includedCount = Math.max(0, fullTextAssessed - reportsExcludedCount);

  return (
    <div className="space-y-6">
      <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 text-xs flex items-center justify-between">
        <div>
          <span className="font-bold text-indigo-700 dark:text-cyan-300 inline-flex items-center">
            <span>{locale === "bn" ? "প্রিজমা ২০২০ (PRISMA 2020) ইন্টারঅ্যাক্টিভ ফ্লোচার্ট জেনারেটর" : "PRISMA 2020 Flowchart Interactive Generator"}</span>
            <AcademicTooltip term="prisma" />
          </span>
          <span className="text-slate-600 dark:text-slate-400">
            {locale === "bn"
              ? "নিচে আপনার সার্চের সংখ্যাগুলো পরিবর্তন করুন। থিসিসে সংযুক্ত করার জন্য আপনার ফ্লোচার্টটি স্বয়ংক্রিয়ভাবে পুনর্গণনা হবে।"
              : "Customize screening numbers below. Your PRISMA diagram recalculates dynamically for thesis inclusion."}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls Column */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 text-xs">
          <h4 className="font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            {locale === "bn" ? "প্রিজমা ডেটা ইনপুটসমূহ" : "PRISMA Data Inputs"}
          </h4>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {locale === "bn" ? "ডাটাবেজ থেকে প্রাপ্ত মোট রেকর্ড (Scopus, IEEE, PubMed)" : "Records identified from databases (Scopus, IEEE, PubMed)"}
            </label>
            <input
              type="number"
              value={identifiedDatabases}
              onChange={(e) => setIdentifiedDatabases(Number(e.target.value))}
              className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {locale === "bn" ? "অন্যান্য উৎস বা সাইটেশন রেজিস্টার থেকে প্রাপ্ত" : "Records from citation searching / other registers"}
            </label>
            <input
              type="number"
              value={identifiedRegisters}
              onChange={(e) => setIdentifiedRegisters(Number(e.target.value))}
              className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {locale === "bn" ? "ডুপ্লিকেট রেকর্ড অপসারণের সংখ্যা" : "Duplicate records removed"}
            </label>
            <input
              type="number"
              value={duplicatesRemoved}
              onChange={(e) => setDuplicatesRemoved(Number(e.target.value))}
              className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {locale === "bn" ? "শিরোনাম ও এবস্ট্রাক্ট স্ক্রিনিংয়ে বাদ দেওয়া রেকর্ড" : "Records excluded during Title / Abstract screening"}
            </label>
            <input
              type="number"
              value={recordsExcluded}
              onChange={(e) => setRecordsExcluded(Number(e.target.value))}
              className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {locale === "bn" ? "পূর্ণাঙ্গ পেপার যাচাই শেষে বাদ দেওয়া রিপোর্ট (সংখ্যা)" : "Full-text articles excluded with reasons (Count)"}
            </label>
            <input
              type="number"
              value={reportsExcludedCount}
              onChange={(e) => setReportsExcludedCount(Number(e.target.value))}
              className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>
        </div>

        {/* Visual Flowchart Display */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center space-y-4 text-xs">
          {/* Phase 1: Identification */}
          <div className="w-full max-w-md p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-center space-y-1">
            <span className="font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wider text-[10px] block">
              {locale === "bn" ? "১. প্রাথমিক শনাক্তকরণ (Identification)" : "1. Identification"}
            </span>
            <div className="text-slate-800 dark:text-slate-200 font-semibold">
              {locale === "bn" ? "মোট শনাক্তকৃত রেকর্ড:" : "Total Records Identified:"} <span className="font-extrabold text-blue-600 dark:text-cyan-400">{totalIdentified}</span>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">
              {locale === "bn" ? `ডাটাবেজ (n = ${identifiedDatabases}) | অন্যান্য উৎস (n = ${identifiedRegisters})` : `Databases (n = ${identifiedDatabases}) | Other Sources (n = ${identifiedRegisters})`}
            </div>
          </div>

          <ArrowDown className="w-4 h-4 text-slate-400" />

          {/* Phase 2: Screening */}
          <div className="w-full max-w-md grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 text-center space-y-1">
              <span className="font-bold text-indigo-700 dark:text-cyan-300 uppercase tracking-wider text-[10px] block">
                {locale === "bn" ? "২. প্রাথমিক বাছাই (Screening)" : "2. Screening"}
              </span>
              <div className="font-bold text-indigo-900 dark:text-white">
                {locale === "bn" ? "বাছাইকৃত রেকর্ড:" : "Records Screened:"} <span className="text-indigo-600 dark:text-cyan-400">{screenedCount}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60 text-center space-y-1">
              <span className="font-bold text-rose-700 dark:text-rose-300 uppercase tracking-wider text-[10px] block">
                {locale === "bn" ? "বর্জিত (Excluded)" : "Excluded"}
              </span>
              <div className="font-bold text-rose-800 dark:text-rose-200">
                {locale === "bn" ? `ডুপ্লিকেট: ${duplicatesRemoved}` : `Duplicates: ${duplicatesRemoved}`}
              </div>
              <div className="text-[10px] text-rose-600 dark:text-rose-400">
                {locale === "bn" ? `অপ্রাসঙ্গিক: ${recordsExcluded}` : `Irrelevant: ${recordsExcluded}`}
              </div>
            </div>
          </div>

          <ArrowDown className="w-4 h-4 text-slate-400" />

          {/* Phase 3: Eligibility */}
          <div className="w-full max-w-md grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-center space-y-1">
              <span className="font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wider text-[10px] block">
                {locale === "bn" ? "৩. যোগ্যতা নিরূপণ (Eligibility)" : "3. Eligibility"}
              </span>
              <div className="font-bold text-amber-900 dark:text-amber-200">
                {locale === "bn" ? "পূর্ণাঙ্গ পাঠ মূল্যায়ন:" : "Full-text Assessed:"} <span className="text-amber-600 dark:text-amber-400">{fullTextAssessed}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-center space-y-1">
              <span className="font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider text-[10px] block">
                {locale === "bn" ? "যৌক্তিক বর্জন" : "Excluded with Reasons"}
              </span>
              <div className="font-bold text-slate-800 dark:text-slate-200">
                n = {reportsExcludedCount}
              </div>
            </div>
          </div>

          <ArrowDown className="w-4 h-4 text-slate-400" />

          {/* Phase 4: Included */}
          <div className="w-full max-w-md p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-500/60 text-center space-y-1 shadow-sm">
            <span className="font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider text-[10px] flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>{locale === "bn" ? "৪. চূড়ান্ত অন্তর্ভুক্তি (Included)" : "4. Included in SLR / Review"}</span>
            </span>
            <div className="text-base font-extrabold text-emerald-900 dark:text-emerald-100">
              {locale === "bn" ? "চূড়ান্ত নির্বাচিত স্টাডিজ:" : "Final Included Studies:"} <span className="text-emerald-600 dark:text-emerald-400">{includedCount}</span>
            </div>
            <p className="text-[11px] text-emerald-700/80 dark:text-emerald-300/80">
              {locale === "bn"
                ? "এই নির্বাচিত পেপারগুলো আপনার থিসিসের চূড়ান্ত কোয়ান্টিটেটিভ মেটা-অ্যানালাইসিসের ভিত্তি।"
                : "Eligible studies progressing to final qualitative synthesis and meta-analysis."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
