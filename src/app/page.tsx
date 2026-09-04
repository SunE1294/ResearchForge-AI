"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useResearchStore } from "@/store/useResearchStore";
import { useI18n } from "@/lib/i18n";
import { getDepartmentByCode } from "@/data/taxonomy";
import { AcademicTooltip } from "@/components/ui/AcademicTooltip";
import {
  Search,
  BookOpen,
  Compass,
  CheckCircle2,
  ShieldCheck,
  Cpu,
  Sparkles,
  ArrowRight,
  Database,
  Layers,
  GraduationCap,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  FileText,
  FlaskConical,
  Target,
  FileSpreadsheet,
  Globe
} from "lucide-react";

export default function WorkspacePage() {
  const router = useRouter();
  const { userProfile, locale, setShowOnboardingModal, currentRoadmap, savedPaperIds } = useResearchStore();
  const { t } = useI18n(locale);

  // States
  const [quickSearchInput, setQuickSearchInput] = useState("");
  const [showAdvancedTools, setShowAdvancedTools] = useState(false);

  const deptInfo = getDepartmentByCode(
    userProfile.departmentCode,
    userProfile.customDepartmentName,
    userProfile.customFacultyName
  );

  // Milestone Stats
  const totalTasks = currentRoadmap?.tasks?.length || 0;
  const completedTasks = currentRoadmap?.tasks?.filter((t) => t.completed).length || 0;
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Handle Quick Search Submit
  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickSearchInput.trim()) {
      router.push(`/discovery?q=${encodeURIComponent(quickSearchInput.trim())}`);
    } else {
      router.push("/discovery");
    }
  };

  // 4 Primary Beginner Action Chips
  const quickActionChips = [
    {
      id: "papers",
      labelEn: "Find Free Papers",
      labelBn: "ফ্রি পেপার খুঁজুন",
      icon: "🔍",
      href: "/discovery",
      hintEn: "OpenAlex, Crossref & arXiv search with zero paywalls",
      hintBn: "পেওয়াল ছাড়া আন্তর্জাতিক গবেষণাপত্র খুঁজুন",
      color: "border-indigo-200 dark:border-indigo-800 bg-indigo-50/70 dark:bg-indigo-950/40 text-indigo-700 dark:text-cyan-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/60"
    },
    {
      id: "survey",
      labelEn: "Create Survey/Questionnaire",
      labelBn: "সার্ভে / প্রশ্নমালা তৈরি",
      icon: "📋",
      href: "/methodology-lab",
      hintEn: "5-point Likert scales & qualitative interview guides",
      hintBn: "৫-পয়েন্ট লিকার্ট স্কেল ও ইন্টারভিউ প্রশ্নমালা তৈরি করুন",
      color: "border-emerald-200 dark:border-emerald-800 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/60"
    },
    {
      id: "roadmap",
      labelEn: "Generate Thesis Roadmap",
      labelBn: "থিসিস রোডম্যাপ তৈরি",
      icon: "🗺️",
      href: "/milestones",
      hintEn: "Phased Gantt timeline with weekly supervisor deadlines",
      hintBn: "সাপ্তাহিক ডেডলাইন ও গ্যান্ট চার্টসহ থিসিস রোডম্যাপ",
      color: "border-cyan-200 dark:border-cyan-800 bg-cyan-50/70 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300 hover:bg-cyan-100 dark:hover:bg-cyan-900/60"
    },
    {
      id: "venues",
      labelEn: "Check Predatory Journals",
      labelBn: "ভুয়া জার্নাল যাচাই",
      icon: "🛡️",
      href: "/venues",
      hintEn: "Scopus Q1-Q4 indexing tier & 5-point anti-scam audit",
      hintBn: "স্কোপাস Q1-Q4 ইনডেক্সিং ও স্ক্যাম প্রতিরোধ চেকলিস্ট",
      color: "border-rose-200 dark:border-rose-800 bg-rose-50/70 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-900/60"
    }
  ];

  // Technical Phase Modules (Kept in Advanced Tools toggle)
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
    <div className="space-y-8">
      {/* 1. SIMPLIFIED HERO SECTION WITH UNIFIED ACTION BAR */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-10 shadow-xl border border-indigo-900/40 text-center sm:text-left">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 -mb-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto sm:mx-0 space-y-6">
          {/* Welcome Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-white/10 text-cyan-300 backdrop-blur-sm border border-white/15">
            <GraduationCap className="w-4 h-4 text-cyan-400" />
            <span>{userProfile.institution || (locale === "bn" ? "শিক্ষা প্রতিষ্ঠান" : "Tertiary Institution")}</span>
            <span className="text-white/40">•</span>
            <span>{userProfile.name || (locale === "bn" ? "গবেষক" : "Scholar")}</span>
          </div>

          {/* Core Question Prompt */}
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              {locale === "bn"
                ? "আজ আপনি গবেষণার কোন কাজটি করতে চান?"
                : "What do you want to accomplish today?"}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              {locale === "bn"
                ? "শুরু করুন মাত্র এক ক্লিকে—ফ্রি গবেষণাপত্র অনুসন্ধান, বৈজ্ঞানিক সার্ভে প্রশ্নমালা তৈরি, থিসিস টাইমলাইন ও ভুয়া জার্নাল যাচাই।"
                : "A beginner-first co-pilot for early-stage scholars. Instantly discover open papers, architect survey instruments, generate phased milestones, and verify publishing venues."}
            </p>
          </div>

          {/* Unified Action / Search Bar */}
          <form onSubmit={handleQuickSearch} className="relative max-w-3xl">
            <div className="flex flex-col sm:flex-row items-stretch gap-2 bg-white/10 dark:bg-slate-900/70 p-1.5 sm:p-2 rounded-2xl border border-white/20 shadow-lg backdrop-blur-md">
              <div className="relative flex-1 flex items-center">
                <Search className="w-5 h-5 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={quickSearchInput}
                  onChange={(e) => setQuickSearchInput(e.target.value)}
                  placeholder={
                    locale === "bn"
                      ? "যেকোনো গবেষণার টপিক বা কিওয়ার্ড লিখুন (যেমন: Deep Learning, Microfinance, Survey Questionnaire)..."
                      : "Search any research topic, paper title, or method (e.g. Deep Learning, Microfinance, Likert Scale)..."
                  }
                  className="w-full pl-11 pr-4 py-3 bg-transparent text-white placeholder:text-slate-400 text-xs sm:text-sm font-medium focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 shrink-0"
              >
                <span>{locale === "bn" ? "অনুসন্ধান শুরু করুন" : "Explore Now"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* 4 Quick Action Chips */}
          <div className="space-y-2 pt-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              {locale === "bn" ? "⚡ দ্রুত শুরু করার অপশন:" : "⚡ Quick Action Pathways:"}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {quickActionChips.map((chip) => (
                <Link
                  key={chip.id}
                  href={chip.href}
                  className={`p-3 rounded-2xl border transition-all text-left flex flex-col justify-between group shadow-sm hover:shadow-md ${chip.color}`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-base">{chip.icon}</span>
                    <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-cyan-300 transition">
                      {locale === "bn" ? chip.labelBn : chip.labelEn}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 leading-snug">
                    {locale === "bn" ? chip.hintBn : chip.hintEn}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. SCHOLAR STATUS & ACTIVE ROADMAP OVERVIEW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 text-xs">
        {/* Left 2 Cols: Active Department & Recommended Workflow */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-cyan-400 block">
                {locale === "bn" ? "আপনার সক্রিয় গবেষণা রূপরেখা" : "Your Active Research Profile"}
              </span>
              <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
                {deptInfo ? (locale === "bn" ? (deptInfo.nameBn || deptInfo.name) : deptInfo.name) : "General Academic Track"}
              </h2>
            </div>

            <button
              onClick={() => setShowOnboardingModal(true)}
              className="self-start sm:self-center flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold hover:bg-slate-100 dark:hover:bg-slate-700 transition"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-600 dark:text-cyan-400" />
              <span>{t("nav.onboarding")}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-1">
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                {locale === "bn" ? "অনুষদ ও বিভাগ" : "Faculty & Code"}
              </span>
              <span className="text-xs font-bold text-slate-900 dark:text-white block">
                {deptInfo ? `${deptInfo.facultyCode} • ${deptInfo.code}` : "Universal"}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-1">
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                {locale === "bn" ? "স্ট্যান্ডার্ড সাইটেশন শৈলী" : "Citation Style"}
              </span>
              <span className="text-xs font-bold text-slate-900 dark:text-white block">
                {deptInfo ? deptInfo.recommendedCitation : "IEEE / APA"}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-1">
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                {locale === "bn" ? "টার্গেট টাইমলাইন" : "Timeline"}
              </span>
              <span className="text-xs font-bold text-slate-900 dark:text-white block">
                {userProfile.targetTimelineWeeks || 16} {locale === "bn" ? "সপ্তাহের সেমিস্টার" : "Weeks"}
              </span>
            </div>
          </div>

          {/* Beginner Tip Banner */}
          <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 flex items-start gap-3">
            <div className="w-7 h-7 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
              💡
            </div>
            <div className="space-y-0.5">
              <span className="font-bold text-indigo-900 dark:text-cyan-300 text-xs">
                {locale === "bn" ? "প্রারম্ভিক গবেষকের জন্য প্রথম ধাপ:" : "Recommended Next Step for Beginners:"}
              </span>
              <p className="text-[11px] text-indigo-800/90 dark:text-slate-300 leading-relaxed">
                {locale === "bn"
                  ? "সরাসরি পেপার লেখা শুরু করার পূর্বে 'Literature & Data' থেকে ৩-৫টি সাম্প্রতিক পেপারের মেথডলজি পড়ুন অথবা 'Methodology Lab' থেকে একটি ভ্যালিড প্রশ্নমালা তৈরি করুন।"
                  : "Before drafting your manuscript, review 3-5 recent papers via Literature & Data or construct a standardized 5-point Likert instrument in the Methodology Lab."}
              </p>
            </div>
          </div>
        </div>

        {/* Right Col: Quick Execution Metrics */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              {locale === "bn" ? "গবেষণার সার্বিক অগ্রগতি" : "Thesis Execution Stats"}
            </span>
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              {progressPercent}% {locale === "bn" ? "মাইলস্টোন সমাপ্ত" : "Milestones Completed"}
            </h3>
            {/* Progress bar */}
            <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-600 to-cyan-400 transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-slate-600 dark:text-slate-400 flex items-center gap-1.5 font-medium">
                <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
                <span>{locale === "bn" ? "সংরক্ষিত গবেষণাপত্র:" : "Saved Papers:"}</span>
              </span>
              <span className="font-bold text-slate-900 dark:text-white">{savedPaperIds.length}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-600 dark:text-slate-400 flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>{locale === "bn" ? "টার্নিটিন এআই পলিসি:" : "Turnitin AI Policy:"}</span>
              </span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">Verified</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-600 dark:text-slate-400 flex items-center gap-1.5 font-medium">
                <Target className="w-3.5 h-3.5 text-cyan-500" />
                <span>{locale === "bn" ? "লক্ষ্যমাত্রা জার্নাল টায়ার:" : "Target Journal Tier:"}</span>
                <AcademicTooltip term="scopus" />
              </span>
              <span className="font-bold text-indigo-600 dark:text-cyan-400">Scopus Q1/Q2</span>
            </div>
          </div>

          <Link
            href="/milestones"
            className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-sm text-center"
          >
            <span>{locale === "bn" ? "রোডম্যাপ আপডেট করুন" : "Manage Phased Roadmap"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 3. EXPANDABLE "ADVANCED TOOLS & ARCHITECTURE" ACCORDION */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden transition-all">
        <button
          onClick={() => setShowAdvancedTools(!showAdvancedTools)}
          className="w-full p-5 sm:p-6 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/40 transition"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-cyan-400 flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
                {locale === "bn"
                  ? "উন্নত গবেষণা মডিউল ও বিভাগীয় ব্লুপ্রিন্ট (Advanced Tools)"
                  : "Advanced Research Modules & Technical Blueprint"}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {locale === "bn"
                  ? "৬টি পর্যায়ক্রমিক মডিউল এবং আপনার বিষয়ের সফটওয়্যার ও মেথডলজি স্ট্যাক দেখতে ক্লিক করুন।"
                  : "Click to toggle granular phase cards, department tool stacks, and benchmark datasets."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-cyan-400">
            <span>{showAdvancedTools ? (locale === "bn" ? "সংক্ষেপ করুন" : "Collapse") : (locale === "bn" ? "প্রদর্শন করুন" : "Expand")}</span>
            {showAdvancedTools ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>

        {showAdvancedTools && (
          <div className="p-6 sm:p-8 border-t border-slate-100 dark:border-slate-800 space-y-8 animate-in fade-in duration-200 text-xs">
            {/* 6 Phase Modules Grid */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {locale === "bn" ? "পর্যায়ক্রমিক গবেষণা মডিউলসমূহ" : "Phased Execution Architecture"}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {phaseCards.map((card, idx) => {
                  const Icon = card.icon;
                  return (
                    <Link
                      key={idx}
                      href={card.href}
                      className="group p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-cyan-500 transition-all flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="px-2 py-0.5 rounded-md text-[9px] font-bold bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 uppercase tracking-wider border border-slate-200 dark:border-slate-800">
                            {locale === "bn" ? card.phase.replace("Phase", "পর্যায়") : card.phase}
                          </span>
                          <Icon className="w-4 h-4 text-indigo-600 dark:text-cyan-400" />
                        </div>
                        <h5 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-cyan-400 transition">
                          {card.title}
                        </h5>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                          {card.desc}
                        </p>
                      </div>
                      <div className="pt-3 mt-3 border-t border-slate-200/50 dark:border-slate-800 flex items-center justify-between font-bold text-indigo-600 dark:text-cyan-400 text-[11px]">
                        <span>{locale === "bn" ? "প্রবেশ করুন" : "Open Module"}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Department Blueprint Deep Dive */}
            {deptInfo && (
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200/60 dark:border-slate-800">
                  <div>
                    <span className="text-[10px] font-bold text-indigo-600 dark:text-cyan-400 uppercase tracking-wider block">
                      {locale === "bn" ? "বিভাগীয় টুলস ও ডেটাসেট তালিকা" : "Discipline Specification"}
                    </span>
                    <h5 className="text-sm font-bold text-slate-900 dark:text-white">
                      {deptInfo.facultyCode} &bull; {locale === "bn" ? (deptInfo.nameBn || deptInfo.name) : deptInfo.name}
                    </h5>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                    {locale === "bn" ? "সাইটেশন:" : "Citation:"} <strong>{deptInfo.recommendedCitation}</strong>
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Primary Tools */}
                  <div className="space-y-1.5">
                    <span className="font-bold text-slate-700 dark:text-slate-300 text-[11px] flex items-center gap-1">
                      <Cpu className="w-3.5 h-3.5 text-indigo-500" />
                      {locale === "bn" ? "প্রস্তাবিত সফটওয়্যার ও টুলস" : "Recommended Tools"}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {deptInfo.primaryTools.map((tool, idx) => (
                        <span key={idx} className="px-2 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] font-medium text-slate-700 dark:text-slate-300">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Benchmark Datasets */}
                  <div className="space-y-1.5">
                    <span className="font-bold text-slate-700 dark:text-slate-300 text-[11px] flex items-center gap-1">
                      <Database className="w-3.5 h-3.5 text-cyan-500" />
                      {locale === "bn" ? "বেঞ্চমার্ক ডেটাসেট" : "Benchmark Datasets"}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {deptInfo.benchmarkDatasets.map((dataset, idx) => (
                        <span key={idx} className="px-2 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] font-medium text-slate-700 dark:text-slate-300">
                          {dataset}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Methodology Focus */}
                  <div className="space-y-1.5">
                    <span className="font-bold text-slate-700 dark:text-slate-300 text-[11px] flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5 text-emerald-500" />
                      {locale === "bn" ? "প্রধান গবেষণাপদ্ধতি" : "Core Methodologies"}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {deptInfo.methodologyFocus.map((method, idx) => (
                        <span key={idx} className="px-2 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] font-medium text-slate-700 dark:text-slate-300">
                          {method}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
