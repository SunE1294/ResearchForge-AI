"use client";

import React from "react";
import Link from "next/link";
import { useResearchStore } from "@/store/useResearchStore";
import { useI18n } from "@/lib/i18n";
import { Logo } from "@/components/ui/Logo";
import { Sparkles, Shield, Github, BookCheck, GraduationCap, FlaskConical } from "lucide-react";

export function Footer() {
  const { locale } = useResearchStore();
  const { t } = useI18n(locale);

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
        {/* Brand Column */}
        <div className="md:col-span-2 space-y-3">
          <div className="flex items-center gap-2">
            <Logo size={32} />
            <span className="text-base font-bold text-slate-900 dark:text-white">
              ResearchForge AI
            </span>
          </div>
          <p className="text-xs leading-relaxed max-w-md text-slate-500 dark:text-slate-400">
            {t("brand.tagline")}
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-900/40 text-xs font-semibold text-indigo-700 dark:text-cyan-300">
            <GraduationCap className="w-4 h-4" />
            <span>{t("brand.institutionBaseline")}</span>
          </div>
        </div>

        {/* Phase Modules */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
            Architecture
          </h4>
          <ul className="space-y-1.5 text-xs">
            <li>
              <Link href="/foundations" className="hover:text-indigo-600 dark:hover:text-cyan-400 transition-colors">
                Academic Foundations
              </Link>
            </li>
            <li>
              <Link href="/methodology-lab" className="hover:text-indigo-600 dark:hover:text-cyan-400 transition-colors">
                Methodology Lab & Survey
              </Link>
            </li>
            <li>
              <Link href="/discovery" className="hover:text-indigo-600 dark:hover:text-cyan-400 transition-colors">
                Discovery & OpenAlex
              </Link>
            </li>
            <li>
              <Link href="/milestones" className="hover:text-indigo-600 dark:hover:text-cyan-400 transition-colors">
                Phase D: Milestone Planner
              </Link>
            </li>
            <li>
              <Link href="/ethical-ai" className="hover:text-indigo-600 dark:hover:text-cyan-400 transition-colors">
                Ethical AI Navigator
              </Link>
            </li>
            <li>
              <Link href="/venues" className="hover:text-indigo-600 dark:hover:text-cyan-400 transition-colors">
                Venues & Resource Hub
              </Link>
            </li>
          </ul>
        </div>

        {/* Academic Governance */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
            Integrity & Specs
          </h4>
          <ul className="space-y-1.5 text-xs">
            <li className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-emerald-500" />
              <span>Turnitin & RLS Compliant</span>
            </li>
            <li className="flex items-center gap-1">
              <BookCheck className="w-3.5 h-3.5 text-cyan-500" />
              <span>5-Faculty, 24-Dept Taxonomy</span>
            </li>
            <li>
              <a
                href="https://github.com/SunE1294/ResearchForge-AI"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-indigo-600 dark:text-cyan-400 hover:underline font-medium"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub Repository</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-slate-200 dark:border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
        <p>© 2026 ResearchForge AI. Developed for Academic Rigor & Ethical Research Execution.</p>
        <p className="flex items-center gap-2">
          <span>Target Runtime: Vercel Edge</span>
          <span>•</span>
          <span>OpenAlex & Semantic Scholar Integration</span>
        </p>
      </div>
    </footer>
  );
}
