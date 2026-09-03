"use client";

import React from "react";
import Link from "next/link";
import { WorkspaceHeader } from "@/components/workspace/WorkspaceHeader";
import { useResearchStore } from "@/store/useResearchStore";
import { useI18n } from "@/lib/i18n";
import { getDepartmentByCode } from "@/data/taxonomy";
import {
  BookOpen,
  Compass,
  CheckCircle2,
  ShieldCheck,
  Cpu,
  Sparkles,
  ArrowRight,
  Database,
  Layers,
  GraduationCap
} from "lucide-react";

export default function WorkspacePage() {
  const { userProfile, locale } = useResearchStore();
  const { t } = useI18n(locale);

  const deptInfo = getDepartmentByCode(userProfile.departmentCode);

  const phaseCards = [
    {
      phase: "Phase B",
      title: t("workspace.cardFoundationsTitle"),
      desc: t("workspace.cardFoundationsDesc"),
      href: "/foundations",
      icon: BookOpen,
      color: "from-blue-600 to-indigo-600",
    },
    {
      phase: "Phase C",
      title: t("workspace.cardDiscoveryTitle"),
      desc: t("workspace.cardDiscoveryDesc"),
      href: "/discovery",
      icon: Compass,
      color: "from-indigo-600 to-cyan-600",
    },
    {
      phase: "Phase D",
      title: t("workspace.cardMilestonesTitle"),
      desc: t("workspace.cardMilestonesDesc"),
      href: "/milestones",
      icon: CheckCircle2,
      color: "from-emerald-600 to-teal-600",
    },
    {
      phase: "Phase D",
      title: t("workspace.cardEthicsTitle"),
      desc: t("workspace.cardEthicsDesc"),
      href: "/ethical-ai",
      icon: ShieldCheck,
      color: "from-amber-600 to-orange-600",
    },
    {
      phase: "Phase D",
      title: t("workspace.cardComputeTitle"),
      desc: t("workspace.cardComputeDesc"),
      href: "/compute",
      icon: Cpu,
      color: "from-purple-600 to-pink-600",
    },
    {
      phase: "Phase C",
      title: t("workspace.cardVenuesTitle"),
      desc: t("workspace.cardVenuesDesc"),
      href: "/venues",
      icon: Sparkles,
      color: "from-rose-600 to-red-600",
    },
  ];

  return (
    <div className="space-y-10">
      {/* Personalized Header Banner */}
      <WorkspaceHeader />

      {/* Phase Modules Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {t("workspace.jumpIn")}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Coordinated academic phases moving your thesis from problem definition to publication.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {phaseCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <Link
                key={idx}
                href={card.href}
                className="group relative p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-indigo-400 dark:hover:border-cyan-500 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                      {card.phase}
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-cyan-400 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-1">
                      {card.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs font-bold text-indigo-600 dark:text-cyan-400">
                  <span>Enter Module</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Discipline-Aware Archetype Deep Dive */}
      {deptInfo && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-cyan-300 mb-1">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Department Blueprint</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {deptInfo.facultyCode} &bull; {deptInfo.name} ({deptInfo.nameBn})
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {deptInfo.description}
              </p>
            </div>
            <span className="self-start sm:self-center px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
              Citation: {deptInfo.recommendedCitation}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            {/* Primary Tools */}
            <div className="space-y-2">
              <span className="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-indigo-500 dark:text-cyan-400" />
                Recommended Tool Stack
              </span>
              <ul className="space-y-1.5">
                {deptInfo.primaryTools.map((tool, idx) => (
                  <li key={idx} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                    {tool}
                  </li>
                ))}
              </ul>
            </div>

            {/* Benchmark Datasets */}
            <div className="space-y-2">
              <span className="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Database className="w-4 h-4 text-cyan-500" />
                Benchmark Datasets
              </span>
              <ul className="space-y-1.5">
                {deptInfo.benchmarkDatasets.map((dataset, idx) => (
                  <li key={idx} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                    {dataset}
                  </li>
                ))}
              </ul>
            </div>

            {/* Methodology Focus */}
            <div className="space-y-2">
              <span className="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-emerald-500" />
                Core Methodologies
              </span>
              <ul className="space-y-1.5">
                {deptInfo.methodologyFocus.map((method, idx) => (
                  <li key={idx} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                    {method}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
