"use client";

import React, { useState, useEffect } from "react";
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
  FlaskConical
} from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { locale, setLocale, userProfile, setShowOnboardingModal } = useResearchStore();
  const { t } = useI18n(locale);

  useEffect(() => {
    setMounted(true);
  }, []);

  const deptInfo = getDepartmentByCode(userProfile.departmentCode, userProfile.customDepartmentName, userProfile.customFacultyName);

  const navLinks = [
    { href: "/", label: t("nav.workspace"), icon: Bookmark },
    { href: "/foundations", label: t("nav.foundations"), icon: BookOpen },
    { href: "/methodology-lab", label: t("nav.methodologyLab"), icon: FlaskConical },
    { href: "/discovery", label: t("nav.discovery"), icon: Compass },
    { href: "/milestones", label: t("nav.milestones"), icon: CheckCircle2 },
    { href: "/ethical-ai", label: t("nav.ethicalAi"), icon: ShieldCheck },
    { href: "/compute", label: t("nav.compute"), icon: Cpu },
    { href: "/venues", label: t("nav.venues"), icon: Sparkles },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
        {/* Brand & Active Archetype Pill */}
        <div className="flex items-center gap-2.5 shrink-0">
          <Link href="/" className="flex items-center gap-2 group">
            <Logo size={36} />
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-bold tracking-tight bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 dark:from-white dark:via-slate-200 dark:to-cyan-200 bg-clip-text text-transparent group-hover:opacity-90 transition-opacity">
                ResearchForge<span className="text-indigo-600 dark:text-cyan-400">AI</span>
              </span>
              <span className="text-[9px] uppercase font-semibold tracking-wider text-slate-500 dark:text-slate-400">
                Academic Co-Pilot
              </span>
            </div>
          </Link>

          {/* Department Archetype Badge */}
          {deptInfo && (
            <button
              onClick={() => setShowOnboardingModal(true)}
              className="hidden 2xl:flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border border-indigo-200 dark:border-indigo-900/50 bg-indigo-50/70 dark:bg-indigo-950/40 text-indigo-700 dark:text-cyan-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-colors"
              title="Click to customize department or institution"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="font-semibold">{deptInfo.code}</span>
              <span className="text-slate-400 dark:text-slate-500">|</span>
              <span className="truncate max-w-[120px]">{deptInfo.name}</span>
              <SlidersHorizontal className="w-3 h-3 ml-0.5 opacity-60" />
            </button>
          )}
        </div>

        {/* Desktop Nav Links (Responsive spacing for laptops) */}
        <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 overflow-x-auto">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-2 xl:px-2.5 py-1.5 rounded-lg text-[11px] xl:text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0 ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-sm shadow-indigo-600/30 dark:bg-cyan-500 dark:text-slate-950"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60"
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Actions (Language Toggle, Theme Toggle, Profile Button, Mobile menu button) */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Language Switcher */}
          <button
            onClick={() => setLocale(locale === "en" ? "bn" : "en")}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors"
            title="Toggle English / বাংলা"
          >
            <Globe className="w-3.5 h-3.5 text-indigo-500 dark:text-cyan-400" />
            <span>{locale === "en" ? "বাংলা" : "EN"}</span>
          </button>

          {/* Theme Switcher */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>
          )}

          {/* Onboarding Trigger Button */}
          <button
            onClick={() => setShowOnboardingModal(true)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white transition-all shadow-sm"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>{t("nav.onboarding")}</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 lg:hidden rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Open mobile navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md px-4 pt-2 pb-4 space-y-3">
          <div className="pt-2 border-b border-slate-100 dark:border-slate-800 pb-2">
            <button
              onClick={() => {
                setShowOnboardingModal(true);
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-semibold"
            >
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-indigo-600 dark:text-cyan-400" />
                <span>{t("nav.onboarding")}</span>
              </div>
              {deptInfo && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-cyan-400 font-bold">
                  {deptInfo.code}
                </span>
              )}
            </button>
          </div>
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2.5 ${
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
