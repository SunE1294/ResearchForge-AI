"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useResearchStore } from "@/store/useResearchStore";
import { useI18n } from "@/lib/i18n";
import { getDepartmentByCode } from "@/data/taxonomy";
import { Logo } from "@/components/ui/Logo";
import {
  Compass,
  BookOpen,
  Globe,
  Database,
  FlaskConical,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Cpu,
  Home,
  Sun,
  Moon,
  SlidersHorizontal,
  Menu,
  X,
  ChevronDown,
  Layers,
  PenTool
} from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Dropdown states for the 3 consolidated sections
  const [openDropdown, setOpenDropdown] = useState<"explore" | "methodology" | "writing" | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const { locale, setLocale, userProfile, setShowOnboardingModal } = useResearchStore();
  const { t } = useI18n(locale);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown when route changes
  useEffect(() => {
    setOpenDropdown(null);
    setMobileMenuOpen(false);
  }, [pathname]);

  const deptInfo = getDepartmentByCode(
    userProfile.departmentCode,
    userProfile.customDepartmentName,
    userProfile.customFacultyName
  );

  // Section 1: Explore
  const exploreItems = [
    {
      href: "/discovery",
      label: locale === "bn" ? "গবেষণাপত্র ও ডেটাসেট অনুসন্ধান" : "Literature & Dataset Discovery",
      desc: locale === "bn" ? "OpenAlex, Crossref ও Zenodo থেকে পেপার ও বেঞ্চমার্ক ডেটাসেট" : "Search 150M+ verified papers & benchmark datasets",
      icon: Compass,
      color: "text-indigo-600 dark:text-cyan-400"
    },
    {
      href: "/foundations",
      label: locale === "bn" ? "একাডেমিক ভিত্তি ও পাঠপদ্ধতি" : "Academic Reading Foundations",
      desc: locale === "bn" ? "থ্রি-পাস পাঠপদ্ধতি, IMRAD অ্যানাটমি ও PRISMA ফ্রেমওয়ার্ক" : "Three-Pass method, IMRAD anatomy & PRISMA",
      icon: BookOpen,
      color: "text-blue-600 dark:text-blue-400"
    }
  ];

  // Section 2: Methodology & Roadmap
  const methodologyItems = [
    {
      href: "/methodology-lab",
      label: locale === "bn" ? "মেথডলজি ল্যাব ও প্রশ্নমালা আর্কিটেক্ট" : "Methodology Lab & Survey Architect",
      desc: locale === "bn" ? "৫-পয়েন্ট লিকার্ট সার্ভে ও কোয়ালিটেটিভ ইন্টারভিউ প্রোটোকল" : "5-point Likert scale surveys & qualitative interview protocols",
      icon: FlaskConical,
      color: "text-indigo-600 dark:text-cyan-400"
    },
    {
      href: "/milestones",
      label: locale === "bn" ? "থিসিস মাইলস্টোন প্ল্যানার (Gantt)" : "Thesis Milestone & Gantt Generator",
      desc: locale === "bn" ? "১৬-সপ্তাহের গ্যান্ট চার্ট ও সুপারভাইজার চেক-ইন শিডিউল" : "Phased execution timeline with weekly deadlines & deliverable checks",
      icon: CheckCircle2,
      color: "text-emerald-600 dark:text-emerald-400"
    }
  ];

  // Section 3: Writing & Ethics
  const writingItems = [
    {
      href: "/venues",
      label: locale === "bn" ? "ভেন্যু, অ্যান্টি-স্ক্যাম ও রিসোর্স হাব" : "Venues, Anti-Scam & Resource Hub",
      desc: locale === "bn" ? "স্মার্ট ভেন্যু ফাইন্ডার, প্রিডেটরি শিল্ড ও টুলিং ইকোসিস্টেম" : "Smart Venue & CFP Matcher, Predatory Shield & Tooling Ecosystem",
      icon: Sparkles,
      color: "text-rose-600 dark:text-rose-400"
    },
    {
      href: "/ethical-ai",
      label: locale === "bn" ? "নৈতিক এআই ও টার্নিটিন গাইড" : "Ethical AI & Disclosure Navigator",
      desc: locale === "bn" ? "টার্নিটিন প্লেজিয়ারিজম অডিট ও অফিসিয়াল এআই ডিক্লারেশন" : "Turnitin similarity auditor & formal AI disclosure statement generator",
      icon: ShieldCheck,
      color: "text-amber-600 dark:text-amber-400"
    },
    {
      href: "/compute",
      label: locale === "bn" ? "ক্লাউড ও ফ্রি জিপিইউ নেভিগেটর" : "Cloud & GPU Compute Navigator",
      desc: locale === "bn" ? "ক্যাগল ৩০ ঘণ্টা ফ্রি GPU ও কোল্যাব মেমোরি হ্যাকস" : "Kaggle 30h free GPU quotas, Google Colab & low-VRAM memory hacks",
      icon: Cpu,
      color: "text-purple-600 dark:text-purple-400"
    }
  ];

  // Section Active Checkers
  const isExploreActive = pathname.startsWith("/discovery") || pathname.startsWith("/foundations");
  const isMethodologyActive = pathname.startsWith("/methodology-lab") || pathname.startsWith("/milestones");
  const isWritingActive = pathname.startsWith("/ethical-ai") || pathname.startsWith("/venues") || pathname.startsWith("/compute");
  const isHomeActive = pathname === "/";

  const toggleDropdown = (menu: "explore" | "methodology" | "writing") => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand & Active Archetype */}
        <div className="flex items-center gap-3 shrink-0">
          <Link href="/" className="flex items-center gap-2.5 group">
            <Logo size={34} />
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 dark:from-white dark:via-slate-100 dark:to-cyan-200 bg-clip-text text-transparent group-hover:opacity-95 transition">
                ResearchForge<span className="text-indigo-600 dark:text-cyan-400">AI</span>
              </span>
              <span className="text-[9px] uppercase font-semibold tracking-wider text-slate-400 dark:text-slate-400 -mt-0.5">
                Academic Co-Pilot
              </span>
            </div>
          </Link>

          {/* Department Archetype Pill (Wide screen) */}
          {deptInfo && (
            <button
              onClick={() => setShowOnboardingModal(true)}
              className="hidden 2xl:flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border border-indigo-200/80 dark:border-indigo-900/50 bg-indigo-50/60 dark:bg-indigo-950/40 text-indigo-700 dark:text-cyan-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition"
              title="Click to customize department"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-semibold">{deptInfo.code}</span>
              <span className="text-slate-300 dark:text-slate-600">|</span>
              <span className="truncate max-w-[120px]">{deptInfo.name}</span>
              <SlidersHorizontal className="w-3 h-3 ml-0.5 opacity-60" />
            </button>
          )}
        </div>

        {/* Streamlined Consolidated Navigation (Dashboard + 3 Clean Dropdown Sections) */}
        <nav ref={navRef} className="hidden lg:flex items-center gap-1.5">
          {/* 1. Dashboard / Home */}
          <Link
            href="/"
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              isHomeActive
                ? "bg-indigo-600 text-white shadow-sm shadow-indigo-600/20 dark:bg-cyan-500 dark:text-slate-950"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60"
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>{t("nav.dashboard")}</span>
          </Link>

          {/* 2. Explore ▾ */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown("explore")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                isExploreActive || openDropdown === "explore"
                  ? "bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-cyan-300 border border-indigo-200 dark:border-indigo-800"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60"
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-indigo-600 dark:text-cyan-400" />
              <span>{t("nav.explore")}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-150 ${openDropdown === "explore" ? "rotate-180" : ""}`} />
            </button>

            {openDropdown === "explore" && (
              <div className="absolute left-0 mt-2 w-72 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 mb-1">
                  {locale === "bn" ? "গবেষণাপত্র ও তথ্য অন্বেষণ" : "Literature Discovery & Reading"}
                </div>
                {exploreItems.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={idx}
                      href={item.href}
                      className="px-3 py-2 flex items-start gap-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition group"
                    >
                      <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-950 group-hover:text-indigo-600 dark:group-hover:text-cyan-400 shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-cyan-400 transition">
                          {item.label}
                        </span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 leading-snug">
                          {item.desc}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* 3. Methodology & Roadmap ▾ */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown("methodology")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                isMethodologyActive || openDropdown === "methodology"
                  ? "bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-cyan-300 border border-indigo-200 dark:border-indigo-800"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60"
              }`}
            >
              <FlaskConical className="w-3.5 h-3.5 text-indigo-600 dark:text-cyan-400" />
              <span>{t("nav.methodology")}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-150 ${openDropdown === "methodology" ? "rotate-180" : ""}`} />
            </button>

            {openDropdown === "methodology" && (
              <div className="absolute left-0 mt-2 w-72 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 mb-1">
                  {locale === "bn" ? "পদ্ধতিগত নকশা ও রোডম্যাপ" : "Methodology & Timeline Planning"}
                </div>
                {methodologyItems.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={idx}
                      href={item.href}
                      className="px-3 py-2 flex items-start gap-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition group"
                    >
                      <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-950 group-hover:text-indigo-600 dark:group-hover:text-cyan-400 shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-cyan-400 transition">
                          {item.label}
                        </span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 leading-snug">
                          {item.desc}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* 4. Writing & Ethics ▾ */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown("writing")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                isWritingActive || openDropdown === "writing"
                  ? "bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-cyan-300 border border-indigo-200 dark:border-indigo-800"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60"
              }`}
            >
              <PenTool className="w-3.5 h-3.5 text-indigo-600 dark:text-cyan-400" />
              <span>{t("nav.writing")}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-150 ${openDropdown === "writing" ? "rotate-180" : ""}`} />
            </button>

            {openDropdown === "writing" && (
              <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 mb-1">
                  {locale === "bn" ? "অ্যাকাডেমিক সততা ও প্রকাশনা" : "Academic Integrity & Publishing"}
                </div>
                {writingItems.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={idx}
                      href={item.href}
                      className="px-3 py-2 flex items-start gap-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition group"
                    >
                      <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-950 group-hover:text-indigo-600 dark:group-hover:text-cyan-400 shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-cyan-400 transition">
                          {item.label}
                        </span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 leading-snug">
                          {item.desc}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Language Switcher */}
          <button
            onClick={() => setLocale(locale === "en" ? "bn" : "en")}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition"
            title="Toggle English / বাংলা"
          >
            <Globe className="w-3.5 h-3.5 text-indigo-600 dark:text-cyan-400" />
            <span>{locale === "en" ? "বাংলা" : "EN"}</span>
          </button>

          {/* Theme Switcher */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>
          )}

          {/* Profile / Customize Button */}
          <button
            onClick={() => setShowOnboardingModal(true)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white transition shadow-sm"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t("nav.onboarding")}</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 lg:hidden rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Open navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Organized into the 3 Streamlined Sections) */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 dark:border-slate-800 bg-white/98 dark:bg-slate-950/98 backdrop-blur-md px-4 pt-2 pb-6 space-y-4 max-h-[85vh] overflow-y-auto">
          {/* Profile Switcher Row */}
          <div className="pt-2 pb-2 border-b border-slate-100 dark:border-slate-800">
            <button
              onClick={() => {
                setShowOnboardingModal(true);
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between p-3 rounded-2xl bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-semibold"
            >
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-indigo-600 dark:text-cyan-400" />
                <span>{t("nav.onboarding")}</span>
              </div>
              {deptInfo && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-cyan-400 font-bold border border-indigo-200 dark:border-indigo-800">
                  {deptInfo.code}
                </span>
              )}
            </button>
          </div>

          {/* 1. Explore Section */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-indigo-600 dark:text-cyan-400 uppercase tracking-wider px-2">
              1. {t("nav.explore")}
            </span>
            {exploreItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Link
                  key={idx}
                  href={item.href}
                  className="px-3 py-2 rounded-xl text-xs font-medium flex items-center gap-2.5 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  <Icon className="w-4 h-4 text-indigo-500 dark:text-cyan-400" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* 2. Methodology & Roadmap Section */}
          <div className="space-y-1 pt-2 border-t border-slate-100 dark:border-slate-800">
            <span className="text-[10px] font-bold text-indigo-600 dark:text-cyan-400 uppercase tracking-wider px-2">
              2. {t("nav.methodology")}
            </span>
            {methodologyItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Link
                  key={idx}
                  href={item.href}
                  className="px-3 py-2 rounded-xl text-xs font-medium flex items-center gap-2.5 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  <Icon className="w-4 h-4 text-emerald-500" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* 3. Writing & Ethics Section */}
          <div className="space-y-1 pt-2 border-t border-slate-100 dark:border-slate-800">
            <span className="text-[10px] font-bold text-indigo-600 dark:text-cyan-400 uppercase tracking-wider px-2">
              3. {t("nav.writing")}
            </span>
            {writingItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Link
                  key={idx}
                  href={item.href}
                  className="px-3 py-2 rounded-xl text-xs font-medium flex items-center gap-2.5 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  <Icon className="w-4 h-4 text-purple-500" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
