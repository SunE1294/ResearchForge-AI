"use client";

import React, { useState } from "react";
import { Layers, ArrowDown, Download, CheckCircle2 } from "lucide-react";

export function PrismaFlowchart() {
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
          <span className="font-bold text-indigo-700 dark:text-cyan-300 block">
            PRISMA 2020 Flowchart Interactive Generator
          </span>
          <span className="text-slate-600 dark:text-slate-400">
            Customize screening numbers below. Your PRISMA diagram recalculates dynamically for thesis inclusion.
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls Column */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 text-xs">
          <h4 className="font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            PRISMA Data Inputs
          </h4>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Records identified from databases (Scopus, IEEE, PubMed)
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
              Records from citation searching / other registers
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
              Duplicate records removed
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
              Records excluded during Title / Abstract screening
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
              Full-text articles excluded with reasons (Count)
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
              1. Identification
            </span>
            <div className="text-slate-800 dark:text-slate-200 font-semibold">
              Total Records Identified: <span className="font-extrabold text-blue-600 dark:text-cyan-400">{totalIdentified}</span>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">
              Databases (n = {identifiedDatabases}) | Other Sources (n = {identifiedRegisters})
            </div>
          </div>

          <ArrowDown className="w-4 h-4 text-slate-400" />

          {/* Phase 2: Screening */}
          <div className="w-full max-w-md grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 text-center space-y-1">
              <span className="font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider text-[10px] block">
                2. Screening
              </span>
              <div className="text-slate-800 dark:text-slate-200 font-semibold">
                Records Screened: <span className="font-extrabold text-indigo-600 dark:text-cyan-400">{screenedCount}</span>
              </div>
              <div className="text-[10px] text-slate-500">Duplicates removed (n = {duplicatesRemoved})</div>
            </div>

            <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 text-center space-y-1">
              <span className="font-bold text-rose-700 dark:text-rose-300 uppercase tracking-wider text-[10px] block">
                Excluded
              </span>
              <div className="text-rose-800 dark:text-rose-200 font-semibold">
                Excluded (n = {recordsExcluded})
              </div>
              <div className="text-[10px] text-slate-500">Based on Title/Abstract</div>
            </div>
          </div>

          <ArrowDown className="w-4 h-4 text-slate-400" />

          {/* Phase 3: Eligibility */}
          <div className="w-full max-w-md grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-center space-y-1">
              <span className="font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wider text-[10px] block">
                3. Eligibility
              </span>
              <div className="text-slate-800 dark:text-slate-200 font-semibold">
                Full-Text Assessed: <span className="font-extrabold text-amber-600 dark:text-amber-400">{fullTextAssessed}</span>
              </div>
              <div className="text-[10px] text-slate-500">Evaluated against criteria</div>
            </div>

            <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 text-center space-y-1">
              <span className="font-bold text-rose-700 dark:text-rose-300 uppercase tracking-wider text-[10px] block">
                Reports Excluded
              </span>
              <div className="text-rose-800 dark:text-rose-200 font-semibold">
                Excluded (n = {reportsExcludedCount})
              </div>
              <div className="text-[10px] text-slate-500">With explicit reasons</div>
            </div>
          </div>

          <ArrowDown className="w-4 h-4 text-slate-400" />

          {/* Phase 4: Included */}
          <div className="w-full max-w-md p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-500 text-center space-y-1 shadow-sm">
            <span className="font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider text-[11px] block flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              4. Final Studies Included in Synthesis
            </span>
            <div className="text-lg font-black text-emerald-700 dark:text-emerald-300">
              n = {includedCount} Studies
            </div>
            <div className="text-[11px] text-slate-600 dark:text-slate-400">
              Included in final qualitative & quantitative meta-analysis
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
