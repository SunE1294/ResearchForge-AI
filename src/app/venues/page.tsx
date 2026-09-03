"use client";

import React, { useState } from "react";
import { VenueList } from "@/components/venues/VenueList";
import { PredatoryShield } from "@/components/venues/PredatoryShield";
import { useResearchStore } from "@/store/useResearchStore";
import { useI18n } from "@/lib/i18n";
import { Sparkles, ShieldAlert, Award } from "lucide-react";

export default function VenuesPage() {
  const { locale } = useResearchStore();
  const { t } = useI18n(locale);
  const [activeTab, setActiveTab] = useState<"venues" | "antiScam">("venues");

  return (
    <div className="space-y-8 text-xs">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{locale === "bn" ? "পর্যায় গ • ভেন্যু ইনটেলিজেন্স ও অ্যান্টি-স্ক্যাম শিল্ড" : "Phase C • Venue Intelligence & Anti-Scam Shield"}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {t("venues.title")}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-3xl">
          {t("venues.subtitle")}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab("venues")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition ${
            activeTab === "venues"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/25 dark:bg-cyan-500 dark:text-slate-950"
              : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <Award className="w-4 h-4" />
          <span>{t("venues.tabKeyVenues")}</span>
        </button>

        <button
          onClick={() => setActiveTab("antiScam")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition ${
            activeTab === "antiScam"
              ? "bg-rose-600 text-white shadow-md shadow-rose-600/25 dark:bg-rose-500 dark:text-white"
              : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>{t("venues.tabAntiScam")}</span>
        </button>
      </div>

      {activeTab === "venues" ? <VenueList /> : <PredatoryShield />}
    </div>
  );
}
