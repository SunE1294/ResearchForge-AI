"use client";

import React, { useState } from "react";
import { useResearchStore } from "@/store/useResearchStore";
import { useI18n } from "@/lib/i18n";
import { TypologyMatrix } from "@/components/foundations/TypologyMatrix";
import { ThreePassReader } from "@/components/foundations/ThreePassReader";
import { ImradBreakdown } from "@/components/foundations/ImradBreakdown";
import { PrismaFlowchart } from "@/components/foundations/PrismaFlowchart";
import { ResearchGaps } from "@/components/foundations/ResearchGaps";
import { BookOpen, Layers, Eye, FileText, GitFork } from "lucide-react";

export default function FoundationsPage() {
  const { locale } = useResearchStore();
  const { t } = useI18n(locale);
  const [activeTab, setActiveTab] = useState<string>("typology");

  const tabs = [
    { id: "typology", label: t("foundations.tabTypology"), icon: Layers },
    { id: "threepass", label: t("foundations.tabThreePass"), icon: Eye },
    { id: "imrad", label: t("foundations.tabImrad"), icon: FileText },
    { id: "prisma", label: t("foundations.tabPrisma"), icon: BookOpen },
    { id: "gaps", label: t("foundations.tabGaps"), icon: GitFork },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-cyan-300 border border-blue-200 dark:border-blue-900">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Phase B &bull; Academic Knowledge Base</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {t("foundations.title")}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-3xl">
          {t("foundations.subtitle")}
        </p>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800 text-xs">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold transition-all shrink-0 ${
                isActive
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/25 dark:bg-cyan-500 dark:text-slate-950"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div className="transition-all duration-200">
        {activeTab === "typology" && <TypologyMatrix />}
        {activeTab === "threepass" && <ThreePassReader />}
        {activeTab === "imrad" && <ImradBreakdown />}
        {activeTab === "prisma" && <PrismaFlowchart />}
        {activeTab === "gaps" && <ResearchGaps />}
      </div>
    </div>
  );
}
