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
  BookOpen,
  Compass,
  CheckCircle2,
  ShieldCheck,
  Cpu,
  Bookmark,
  Sun,
  Moon,
  Globe,
  SlidersHorizontal,
  Menu,
  X,
  Sparkles,
  FlaskConical,
  ChevronDown
} from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { locale, setLocale, userProfile, setShowOnboardingModal } = useResearchStore();
  const { t } = useI18n(locale);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setToolsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const deptInfo = getDepartmentByCode(
    userProfile.departmentCode,
    userProfile.customDepartmentName,
    userProfile.customFacultyName
  );

  // Core Primary Nav Links (Compact, spacious, uncluttered)
  const primaryNavLinks = [
    { href: "/", label: t("nav.workspace"), icon: Bookmark },
    { href: "/foundations", label: t("nav.foundations"), icon: BookOpen },
    { href: "/methodology-lab", label: t("nav.methodologyLab"), icon: FlaskConical },
    { href: "/discovery", label: t("nav.discovery"), icon: Compass },
    { href: "/milestones", label: t("nav.milestones"), icon: CheckCircle2 },
  ];

  // Secondary Tools (Available in sleek dropdown on desktop)
  const secondaryNavLinks = [
    { href: "/ethical-ai", label: t("nav.ethicalAi"), icon: ShieldCheck, desc: "Turnitin audit, AI disclosure & ethics" },
    { href: "/compute", label: t("nav.compute"), icon: Cpu, desc: "Colab, Kaggle GPU & cloud navigator" },
    { href: "/venues", label: t("nav.venues"), icon: Sparkles, desc: "Scopus, IEEE Xplore & predatory audit" },
  ];

  const isSecondaryActive = secondaryNavLinks.some((l) => pathname === l.href);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        {/* Brand & Logo */}
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

          {/* Department Archetype Pill (Shown on wider desktop) */}
          {deptInfo && (
            <button
              onClick={() => setShowOnboardingModal(true)}
              className="hidden 2xl:flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border border-indigo-200/80 dark:border-indigo-900/50 bg-indigo-50/60 dark:bg-indigo-950/40 text-indigo-700 dark:text-cyan-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition"
              title="Click to customize department or institution"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-semibold">{deptInfo.code}</span>
              <span className="text-slate-300 dark:text-slate-600">|</span>
              <span className="truncate max-w-[130px]">{deptInfo.name}</span>
              <SlidersHorizontal className="w-3 h-3 ml-0.5 opacity-60" />
            </button>
          )}
        </div>

        {/* Clean, Spacious Desktop Nav (Zero gathering, zero horizontal scroll) */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
          {primaryNavLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-sm shadow-indigo-600/20 dark:bg-cyan-500 dark:text-slate-950"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60"
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span>{link.label}</span>
              </Link>
            );
          })}

          {/* "More Tools" Sleek Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all ${
                isSecondaryActive
                  ? "bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-cyan-300 border border-indigo-200 dark:border-indigo-800"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60"
              }`}
            >
              <span>{t("nav.moreTools")}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${toolsDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {toolsDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 mb-1">
                  {locale === "bn" ? "অ্যাকাডেমিক রিসার্চ টুলস" : "Research Intelligence Tools"}
                </div>
                {secondaryNavLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setToolsDropdownOpen(false)}
                      className={`px-3 py-2 flex items-start gap-2.5 transition ${
                        isActive
                          ? "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-cyan-300"
                          : "text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                      }`}
                    >
                      <div className={`p-1.5 rounded-lg shrink-0 ${isActive ? "bg-indigo-600 text-white dark:bg-cyan-500 dark:text-slate-950" : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"}`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold leading-tight">{link.label}</span>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 leading-snug">{link.desc}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </nav>

        {/* Action Controls (Compact, clean spacing) */}
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

          {/* Onboarding / Profile Button */}
          <button
            onClick={() => setShowOnboardingModal(true)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white transition shadow-sm"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t("nav.onboarding")}</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 lg:hidden rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Open mobile navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md px-4 pt-2 pb-5 space-y-4">
          <div className="pt-2 border-b border-slate-100 dark:border-slate-800 pb-3">
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

          {/* Primary Modules */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2">
              {locale === "bn" ? "প্রধান মডিউল" : "Core Modules"}
            </span>
            {primaryNavLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-xl text-sm font-medium flex items-center gap-2.5 transition ${
                    isActive
                      ? "bg-indigo-600 text-white dark:bg-cyan-500 dark:text-slate-950 font-semibold"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Intelligence Tools */}
          <div className="space-y-1 pt-2 border-t border-slate-100 dark:border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2">
              {locale === "bn" ? "অ্যাকাডেমিক টুলস" : "Research Tools"}
            </span>
            {secondaryNavLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-xl text-sm font-medium flex items-center gap-2.5 transition ${
                    isActive
                      ? "bg-indigo-600 text-white dark:bg-cyan-500 dark:text-slate-950 font-semibold"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
