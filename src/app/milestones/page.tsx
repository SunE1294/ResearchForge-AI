"use client";

import React from "react";
import { MilestoneGenerator } from "@/components/milestones/MilestoneGenerator";
import { useResearchStore } from "@/store/useResearchStore";
import { useI18n } from "@/lib/i18n";
import { CheckCircle2 } from "lucide-react";

export default function MilestonesPage() {
  const { locale } = useResearchStore();
  const { t } = useI18n(locale);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>{locale === "bn" ? "পর্যায় ঘ • সক্রিয় থিসিস এক্সিকিউশন ওয়ার্কস্পেস" : "Phase D • Active Research Execution Workspace"}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {t("milestones.title")}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-3xl">
          {t("milestones.subtitle")}
        </p>
      </div>

      <MilestoneGenerator />
    </div>
  );
}
