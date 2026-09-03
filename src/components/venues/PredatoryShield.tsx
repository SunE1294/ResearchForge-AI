"use client";

import React, { useState } from "react";
import { PREDATORY_CHECKLIST } from "@/data/venues";
import { ShieldAlert, AlertTriangle, CheckCircle, HelpCircle, ExternalLink } from "lucide-react";

export function PredatoryShield() {
  const [checkedRules, setCheckedRules] = useState<Record<string, boolean>>({});

  const toggleRule = (id: string) => {
    setCheckedRules((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const totalPoints = PREDATORY_CHECKLIST.length;
  const verifiedCount = Object.values(checkedRules).filter(Boolean).length;
  const isFullyAudited = verifiedCount === totalPoints;

  return (
    <div className="space-y-6 text-xs">
      {/* Warning Banner */}
      <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-900 dark:text-rose-200 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold text-sm block">
            Academic Shield: Never Pay Publication Fees to an Unverified Journal
          </span>
          <p className="leading-relaxed">
            Predatory publishers actively target thesis students in Bangladesh via unsolicited spam emails, promising 48-hour acceptance. A paper published in a predatory outlet cannot be used for thesis defense and disqualifies scholarships.
          </p>
        </div>
      </div>

      {/* Audit Progress */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="font-bold text-slate-900 dark:text-white block text-sm">
            Venue Safety Verification Audit: {verifiedCount} / {totalPoints} Checked
          </span>
          <span className="text-slate-500 text-[11px]">
            Tick each rule as you verify the prospective venue's legitimacy.
          </span>
        </div>

        <div className="flex items-center gap-2">
          {isFullyAudited ? (
            <span className="px-3 py-1.5 rounded-xl bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm">
              <CheckCircle className="w-4 h-4" />
              Venue Cleared Safe
            </span>
          ) : (
            <span className="px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-700 dark:text-amber-300 font-bold text-xs border border-amber-500/30">
              Audit Incomplete ({totalPoints - verifiedCount} remaining)
            </span>
          )}
        </div>
      </div>

      {/* Rules Checklist */}
      <div className="space-y-3">
        {PREDATORY_CHECKLIST.map((item) => {
          const isChecked = Boolean(checkedRules[item.id]);
          return (
            <div
              key={item.id}
              onClick={() => toggleRule(item.id)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-2 ${
                isChecked
                  ? "bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-900/50"
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-cyan-800"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold ${
                    isChecked
                      ? "bg-emerald-600 text-white"
                      : "border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  }`}>
                    {isChecked ? "✓" : ""}
                  </div>
                  <span className={`font-bold text-sm ${isChecked ? "text-emerald-900 dark:text-emerald-300" : "text-slate-900 dark:text-white"}`}>
                    {item.rule}
                  </span>
                </div>

                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  item.severity === "critical"
                    ? "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300"
                    : "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                }`}>
                  {item.severity} Risk
                </span>
              </div>

              <p className="text-slate-600 dark:text-slate-300 leading-relaxed pl-7">
                {item.explanation}
              </p>
            </div>
          );
        })}
      </div>

      {/* Official Directory Verifiers */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
        <span className="font-bold text-slate-800 dark:text-slate-200 block text-xs">
          Official Authoritative Verification Portals (Always cross-reference here):
        </span>
        <div className="flex flex-wrap gap-2 text-[11px]">
          <a
            href="https://www.scimagojr.com/"
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-semibold text-indigo-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
          >
            <span>Scimago Journal & Country Rank (SJR)</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href="https://portal.issn.org/"
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-semibold text-indigo-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
          >
            <span>Official ISSN International Portal</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href="https://mjl.clarivate.com/home"
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-semibold text-indigo-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
          >
            <span>Clarivate Master Journal List (Web of Science)</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
