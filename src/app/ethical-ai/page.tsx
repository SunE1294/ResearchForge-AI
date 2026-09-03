"use client";

import React from "react";
import { EthicsAuditor } from "@/components/ethical-ai/EthicsAuditor";
import { AiDisclosureGenerator } from "@/components/ethical-ai/AiDisclosureGenerator";
import { useResearchStore } from "@/store/useResearchStore";
import { useI18n } from "@/lib/i18n";
import { ShieldCheck } from "lucide-react";

export default function EthicalAiPage() {
  const { locale } = useResearchStore();
  const { t } = useI18n(locale);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Phase D &bull; Ethical AI Governance & Academic Integrity</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {t("ethicalAi.title")}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-3xl">
          {t("ethicalAi.subtitle")}
        </p>
      </div>

      <div className="space-y-8">
        <EthicsAuditor />
        <AiDisclosureGenerator />
      </div>
    </div>
  );
}
