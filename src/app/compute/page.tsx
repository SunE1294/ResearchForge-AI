"use client";

import React from "react";
import { HardwareMatrix } from "@/components/compute/HardwareMatrix";
import { useResearchStore } from "@/store/useResearchStore";
import { useI18n } from "@/lib/i18n";
import { Cpu } from "lucide-react";

export default function ComputePage() {
  const { locale } = useResearchStore();
  const { t } = useI18n(locale);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-900">
          <Cpu className="w-3.5 h-3.5" />
          <span>{locale === "bn" ? "পর্যায় ঘ • ক্লাউড কম্পিউট ও জিপিইউ নেভিগেটর" : "Phase D • Cloud Compute & GPU Navigator"}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {t("compute.title")}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-3xl">
          {t("compute.subtitle")}
        </p>
      </div>

      <HardwareMatrix />
    </div>
  );
}
