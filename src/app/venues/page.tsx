"use client";

import React, { useState } from "react";
import { SmartVenueMatcher } from "@/components/venues/SmartVenueMatcher";
import { VenueList } from "@/components/venues/VenueList";
import { PredatoryShield } from "@/components/venues/PredatoryShield";
import { AcademicResourceHub } from "@/components/resources/AcademicResourceHub";
import { useResearchStore } from "@/store/useResearchStore";
import { useI18n } from "@/lib/i18n";
import { Sparkles, ShieldAlert, Award, Globe, Compass, Target } from "lucide-react";

export default function VenuesPage() {
  const { locale } = useResearchStore();
  const { t } = useI18n(locale);
  const [activeTab, setActiveTab] = useState<"matcher" | "antiScam" | "resources">("matcher");

  // Handle URL hash or param (e.g. #resources or ?tab=resources)
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.toLowerCase();
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get("tab")?.toLowerCase();

      if (hash.includes("resource") || tabParam === "resources") {
        setActiveTab("resources");
      } else if (hash.includes("scam") || hash.includes("predatory") || tabParam === "antiscam") {
        setActiveTab("antiScam");
      } else if (tabParam === "matcher") {
        setActiveTab("matcher");
      }
    }
  }, []);

  return (
    <div className="space-y-8 text-xs">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{locale === "bn" ? "পর্যায় গ • ভেন্যু ইনটেলিজেন্স ও রিসোর্স ইকোসিস্টেম" : "Phase C • Venue Intelligence & Resource Ecosystem"}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {locale === "bn" ? "ভেন্যু, অ্যান্টি-স্ক্যাম ও রিসোর্স হাব" : "Venues, Predatory Shield & Resource Hub"}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-3xl">
          {locale === "bn"
            ? "২৪টি বিভাগের ইনডেক্সড Scopus/CORE ভেন্যু ও CFP খুঁজুন, প্রিডেটরি জার্নাল প্রতিরোধ করুন এবং ওপেন-অ্যাক্সেস রিসার্চ টুলস ব্যবহার করুন।"
            : "Discover indexed Scopus/CORE venues across 24 departments, safeguard your thesis from predatory publishers, and access open academic tools."}
        </p>
      </div>

      {/* 3 Consolidated Segmented Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto">
        {/* Tab 1: Smart Venue & CFP Matcher */}
        <button
          onClick={() => setActiveTab("matcher")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition shrink-0 ${
            activeTab === "matcher"
              ? "bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-md shadow-cyan-500/20"
              : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <Sparkles className="w-4 h-4 text-cyan-200" />
          <span>{t("venues.tabMatcher")}</span>
        </button>

        {/* Tab 2: Predatory Journal Shield */}
        <button
          onClick={() => setActiveTab("antiScam")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition shrink-0 ${
            activeTab === "antiScam"
              ? "bg-rose-600 text-white shadow-md shadow-rose-600/25 dark:bg-rose-500 dark:text-white"
              : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>{t("venues.tabAntiScam")}</span>
        </button>

        {/* Tab 3: Academic Resource Ecosystem */}
        <button
          onClick={() => setActiveTab("resources")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition shrink-0 ${
            activeTab === "resources"
              ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-cyan-500/20"
              : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <Globe className="w-4 h-4 text-cyan-400" />
          <span>{t("venues.tabResourceHub")}</span>
        </button>
      </div>

      {activeTab === "matcher" && (
        <div className="space-y-6">
          <SmartVenueMatcher />
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
            <VenueList />
          </div>
        </div>
      )}
      {activeTab === "antiScam" && <PredatoryShield />}
      {activeTab === "resources" && <AcademicResourceHub />}
    </div>
  );
}
