"use client";

import React from "react";
import { useResearchStore } from "@/store/useResearchStore";
import { useI18n } from "@/lib/i18n";
import { getDepartmentByCode } from "@/data/taxonomy";
import {
  Sparkles,
  BookMarked,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  GraduationCap,
  SlidersHorizontal,
  Target,
  FileText
} from "lucide-react";

export function WorkspaceHeader() {
  const { userProfile, locale, setShowOnboardingModal, currentRoadmap, savedPaperIds } = useResearchStore();
  const { t } = useI18n(locale);

  const deptInfo = getDepartmentByCode(userProfile.departmentCode, userProfile.customDepartmentName, userProfile.customFacultyName);

  // Compute completed milestones
  const totalTasks = currentRoadmap?.tasks?.length || 0;
  const completedTasks = currentRoadmap?.tasks?.filter((t) => t.completed).length || 0;
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 shadow-xl border border-indigo-900/30">
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-12 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-6">
        {/* Top bar: Welcome & Profile reconfigure */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-cyan-300 backdrop-blur-sm border border-white/10">
                <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
                <span>{userProfile.institution || (locale === "bn" ? "শিক্ষা প্রতিষ্ঠান" : "Tertiary Institution")}</span>
                <span className="text-white/40">•</span>
                <span className="capitalize">{userProfile.academicLevel}</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>{locale === "bn" ? "সুপাবেজ ডাটাবেজ সংযুক্ত" : "Supabase PostgreSQL Connected"}</span>
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              {t("workspace.greeting")}, <span className="bg-gradient-to-r from-cyan-400 to-indigo-300 bg-clip-text text-transparent">{userProfile.name || (locale === "bn" ? "গবেষক" : "Scholar")}</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              {userProfile.primaryInterest || (locale === "bn" ? "আপনার অনুষদ, বিভাগ ও গবেষণার টপিক সাজাতে 'প্রোফাইল পরিবর্তন' এ ক্লিক করুন।" : "Configure your department, university, and thesis goals to activate personalized workflows.")}
            </p>
          </div>

          <button
            onClick={() => setShowOnboardingModal(true)}
            className="self-start sm:self-center flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-sm border border-white/15 transition-all shadow-sm"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-300" />
            <span>{t("nav.onboarding")}</span>
          </button>
        </div>

        {/* Dynamic Department Archetype Banner */}
        {deptInfo && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-white/10 text-xs">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                <Cpu className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 font-semibold block text-[11px] uppercase tracking-wider">
                  {t("workspace.archetype")}
                </span>
                <span className="font-bold text-white block">
                  {deptInfo.archetype}
                </span>
                <span className="text-[11px] text-slate-400 block">
                  {deptInfo.facultyCode} • {deptInfo.code}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center shrink-0">
                <BookMarked className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 font-semibold block text-[11px] uppercase tracking-wider">
                  {t("workspace.citation")}
                </span>
                <span className="font-bold text-white block text-sm">
                  {deptInfo.recommendedCitation} Standard
                </span>
                <span className="text-[11px] text-cyan-200/80 block">
                  {locale === "bn" ? "বিষয়ভিত্তিক রেফারেন্স মানদণ্ড" : "Discipline Baseline Ref"}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0">
                <Target className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 font-semibold block text-[11px] uppercase tracking-wider">
                  {t("workspace.primaryTools")}
                </span>
                <span className="font-medium text-slate-200 block text-[11px] line-clamp-2">
                  {deptInfo.primaryTools.join(", ")}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Quick Execution Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-3 rounded-xl bg-black/20 border border-white/5">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">
              {t("workspace.statMilestones")}
            </span>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-lg font-bold text-white">{progressPercent}%</span>
              <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-cyan-400 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-black/20 border border-white/5">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">
              {t("workspace.statPapers")}
            </span>
            <div className="flex items-center gap-1.5 mt-1">
              <FileText className="w-4 h-4 text-indigo-400" />
              <span className="text-lg font-bold text-white">{savedPaperIds.length}</span>
              <span className="text-[10px] text-slate-400">{locale === "bn" ? "সংরক্ষিত" : "Bookmarked"}</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-black/20 border border-white/5">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">
              {t("workspace.statVenues")}
            </span>
            <div className="flex items-center gap-1.5 mt-1">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-lg font-bold text-white">Q1 / CORE A*</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-black/20 border border-white/5">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">
              {t("workspace.statEthics")}
            </span>
            <div className="flex items-center gap-1.5 mt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-bold text-emerald-400">{t("workspace.statEthicsStatus")}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
