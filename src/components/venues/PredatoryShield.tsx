"use client";

import React, { useState } from "react";
import { useResearchStore } from "@/store/useResearchStore";
import { PREDATORY_CHECKLIST } from "@/data/venues";
import { AcademicTooltip } from "@/components/ui/AcademicTooltip";
import { ShieldAlert, AlertTriangle, CheckCircle, HelpCircle, ExternalLink } from "lucide-react";

export function PredatoryShield() {
  const { locale } = useResearchStore();
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
            {locale === "bn"
              ? "অ্যাকাডেমিক সুরক্ষা: অযাচাইকৃত কোনো জার্নালকে কখনোই প্রকাশনা ফি দেবেন না"
              : "Academic Shield: Never Pay Publication Fees to an Unverified Journal"}
          </span>
          <p className="leading-relaxed">
            {locale === "bn"
              ? "শিকারি (Predatory) প্রকাশকরা স্প্যাম ইমেইল পাঠিয়ে ৪৮ ঘণ্টায় পেপার গ্রহণের লোভ দেখায়। ভুয়া জার্নালে প্রকাশিত পেপার থিসিস ডিফেন্সে গ্রহণযোগ্য নয় এবং উচ্চশিক্ষার স্কলারশিপে বড় বাধা সৃষ্টি করে।"
              : "Predatory publishers actively target thesis students in Bangladesh via unsolicited spam emails, promising 48-hour acceptance. A paper published in a predatory outlet cannot be used for thesis defense and disqualifies scholarships."}
          </p>
        </div>
      </div>

      {/* Audit Progress */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="font-bold text-slate-900 dark:text-white inline-flex items-center text-sm">
            <span>
              {locale === "bn"
                ? `ভেন্যু নিরাপত্তা যাচাই অডিট: ${verifiedCount} / ${totalPoints} টি ধাপ সম্পন্ন`
                : `Venue Safety Verification Audit: ${verifiedCount} / ${totalPoints} Checked`}
            </span>
            <AcademicTooltip term="scopus" />
          </span>
          <span className="text-slate-500 text-[11px]">
            {locale === "bn"
              ? "কোনো জার্নালে পেপার পাঠানোর আগে নিচের প্রতিটি বিষয় যাচাই করে টিক দিন।"
              : "Tick each rule as you verify the prospective venue's legitimacy."}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {isFullyAudited ? (
            <span className="px-3 py-1.5 rounded-xl bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm">
              <CheckCircle className="w-4 h-4" />
              {locale === "bn" ? "ভেন্যু নিরাপদ প্রমাণিত" : "Venue Cleared Safe"}
            </span>
          ) : (
            <span className="px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-700 dark:text-amber-300 font-bold text-xs border border-amber-500/30">
              {locale === "bn"
                ? `অডিট অসম্পূর্ণ (${totalPoints - verifiedCount} টি বাকি)`
                : `Audit Incomplete (${totalPoints - verifiedCount} remaining)`}
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
                    {locale === "bn" ? item.ruleBn : item.rule}
                  </span>
                </div>

                <span className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 ${
                  item.severity === "critical"
                    ? "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300"
                    : "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                }`}>
                  {item.severity.toUpperCase()}
                </span>
              </div>

              <p className="text-slate-600 dark:text-slate-400 pl-7 leading-relaxed">
                {locale === "bn" ? item.explanationBn : item.explanation}
              </p>
            </div>
          );
        })}
      </div>

      {/* Official Verifiers */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
        <span className="font-bold text-slate-800 dark:text-slate-200 block text-xs">
          {locale === "bn" ? "প্রকৃত ইনডেক্সিং যাচাইয়ের অফিসিয়াল পোর্টালসমূহ:" : "Official International Verifiers (Cross-Check ISSN):"}
        </span>
        <div className="flex flex-wrap gap-3 pt-1">
          <a
            href="https://portal.issn.org/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-indigo-600 dark:text-cyan-400 hover:underline font-semibold"
          >
            <span>ISSN International Center</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href="https://www.scimagojr.com/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-indigo-600 dark:text-cyan-400 hover:underline font-semibold"
          >
            <span>Scimago Journal & Country Rank (SJR)</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href="https://mjl.clarivate.com/home"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-indigo-600 dark:text-cyan-400 hover:underline font-semibold"
          >
            <span>Clarivate Master Journal List (Web of Science)</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
