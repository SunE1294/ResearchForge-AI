"use client";

import React, { useState } from "react";
import { BookOpen, Award, CheckCircle, HelpCircle, Layers, ArrowRight } from "lucide-react";

export function TypologyMatrix() {
  const [selectedType, setSelectedType] = useState<string>("conference");

  const typologies = [
    {
      id: "conference",
      title: "Conference Proceedings",
      badge: "Fast Iteration • High Prestige in CS/Eng",
      indexTiers: "CORE Rankings: A*, A, B, C",
      turnaround: "2 - 4 Months (Fixed Deadlines)",
      typicalLength: "6 - 10 Pages (IEEE / ACM / Springer)",
      acceptanceRate: "15% - 25% for top-tier venues",
      keyCharacteristics: [
        "Primary publication route for Computer Science, AI, and Software Engineering",
        "Strict page budget with hard camera-ready submission deadlines",
        "Author presentation required at the conference venue or virtual track",
        "Instant indexing in IEEE Xplore, ACM Digital Library, or Springer LNCS"
      ],
      idealWhen: "You have a novel experimental model, breakthrough benchmark, or prompt engineering framework ready to publish quickly."
    },
    {
      id: "journal",
      title: "Scopus / SCIE Indexed Journals",
      badge: "High Rigor • Archival Permanence",
      indexTiers: "Scimago Quartiles: Q1, Q2, Q3, Q4",
      turnaround: "3 - 8 Months (Continuous Submission)",
      typicalLength: "12 - 25+ Pages (Elsevier, IEEE, Nature, Springer)",
      acceptanceRate: "10% - 30% for Q1 / Q2 tiers",
      keyCharacteristics: [
        "Standard gold metric across all 5 university faculties (Engineering, Life Sciences, Business)",
        "Multiple rounds of blind peer review (Major Revision, Minor Revision)",
        "Demands exhaustive ablation studies, statistical proofs, and comprehensive literature background",
        "Impact Factor (Clarivate JCR) and CiteScore (Scopus) metrics determine prestige"
      ],
      idealWhen: "You have an extensive experimental campaign, multi-dataset evaluations, or deep theoretical formulation."
    },
    {
      id: "slr",
      title: "Systematic Literature Review (SLR)",
      badge: "High Citations • Methodological Protocol",
      indexTiers: "PRISMA 2020 Compliant",
      turnaround: "4 - 6 Months",
      typicalLength: "15 - 30 Pages",
      acceptanceRate: "20% - 35% in survey-dedicated journals",
      keyCharacteristics: [
        "Follows a strict reproducible search protocol using Boolean query strings",
        "Requires explicit inclusion/exclusion criteria across multiple databases (Scopus, PubMed, IEEE)",
        "Includes quality assessment and risk of bias evaluation across all reviewed papers",
        "Historically garners very high citation counts from other researchers entering the field"
      ],
      idealWhen: "You are beginning your thesis, analyzing existing gaps, and synthesising hundreds of disparate studies into a definitive taxonomy."
    },
    {
      id: "thesis",
      title: "Undergraduate vs. Master's Thesis",
      badge: "Institutional Degree Fulfillment",
      indexTiers: "University Academic Committee Evaluation",
      turnaround: "1 - 2 Semesters (16 to 52 Weeks)",
      typicalLength: "Undergrad: 40-70 Pages | Master's: 70-120 Pages",
      acceptanceRate: "Internal Faculty Board Examination",
      keyCharacteristics: [
        "Undergraduate Thesis: Focuses on demonstrating technical competence, sound methodology, and proper implementation of established techniques.",
        "Master's Thesis: Demands a genuine novel contribution to academic literature (new algorithm, new empirical proof, or unique application).",
        "Both require strict plagiarism compliance (< 15% - 20% on Turnitin) and viva-voce defense.",
        "A strong Master's thesis can usually yield at least one Q1/Q2 journal or CORE conference paper."
      ],
      idealWhen: "Meeting graduation requirements at Daffodil International University or global tertiary universities."
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
            <span className="font-semibold text-slate-700 dark:text-slate-300 block">Indexing & Tiers:</span>
            <span>{current.indexTiers}</span>
          </div>
        </div>

        {/* Metric Triad */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800">
            <span className="text-slate-400 font-semibold block text-[10px] uppercase">Turnaround Time</span>
            <span className="text-slate-900 dark:text-white font-bold text-sm mt-0.5 block">{current.turnaround}</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800">
            <span className="text-slate-400 font-semibold block text-[10px] uppercase">Typical Length</span>
            <span className="text-slate-900 dark:text-white font-bold text-sm mt-0.5 block">{current.typicalLength}</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800">
            <span className="text-slate-400 font-semibold block text-[10px] uppercase">Acceptance Ratio</span>
            <span className="text-slate-900 dark:text-white font-bold text-sm mt-0.5 block">{current.acceptanceRate}</span>
          </div>
        </div>

        {/* Key Characteristics */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Key Architectural Characteristics:
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
            When Should a Student Target This Venue?
          </span>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            {current.idealWhen}
          </p>
        </div>
      </div>
    </div>
  );
}
