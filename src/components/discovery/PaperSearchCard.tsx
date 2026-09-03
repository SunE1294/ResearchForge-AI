"use client";

import React, { useState } from "react";
import { Paper } from "@/types";
import { useResearchStore } from "@/store/useResearchStore";
import {
  Bookmark,
  ExternalLink,
  BookOpen,
  Share2,
  Copy,
  Check,
  Quote,
  Sparkles
} from "lucide-react";
import { formatCitationCount } from "@/lib/utils";

interface PaperSearchCardProps {
  paper: Paper;
}

export function PaperSearchCard({ paper }: PaperSearchCardProps) {
  const { savedPaperIds, toggleSavePaper, locale } = useResearchStore();
  const [showBibtex, setShowBibtex] = useState(false);
  const [copiedBib, setCopiedBib] = useState(false);
  const [expandedAbstract, setExpandedAbstract] = useState(false);

  const isSaved = savedPaperIds.includes(paper.id);

  const bibtexContent = `@article{${(paper.authors[0] || "Author").replace(/\s+/g, "")}${paper.year},
  title = {${paper.title}},
  author = {${paper.authors.join(" and ")}},
  journal = {${paper.venue}},
  year = {${paper.year}},
  citations = {${paper.citationCount}}
}`;

  const handleToggleSave = async () => {
    toggleSavePaper(paper.id);
    try {
      if (!isSaved) {
        // Save to Supabase
        await fetch("/api/papers/saved", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: "guest_student",
            paperId: paper.id,
            title: paper.title,
            authors: paper.authors,
            year: paper.year,
            venue: paper.venue,
            doi: paper.doi,
            citationCount: paper.citationCount,
            openAccessUrl: paper.openAccessUrl,
          }),
        });
      } else {
        // Delete from Supabase
        await fetch(`/api/papers/saved?userId=guest_student&paperId=${encodeURIComponent(paper.id)}`, {
          method: "DELETE",
        });
      }
    } catch (e) {
      console.warn("Supabase paper bookmark sync failed, state preserved locally:", e);
    }
  };

  const copyBibtex = () => {
    navigator.clipboard.writeText(bibtexContent);
    setCopiedBib(true);
    setTimeout(() => setCopiedBib(false), 2000);
  };

  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow space-y-3.5">
      {/* Top Meta Line */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-cyan-300 border border-indigo-200/50 dark:border-indigo-900/50">
              {paper.venue} &bull; {paper.year}
            </span>
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
              {formatCitationCount(paper.citationCount)} citations
            </span>
            {paper.openAccessUrl && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-900/60">
                {locale === "bn" ? "ওপেন এক্সেস" : "Open Access"}
              </span>
            )}
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug hover:text-indigo-600 dark:hover:text-cyan-400 transition-colors">
            {paper.title}
          </h3>
        </div>

        <button
          onClick={handleToggleSave}
          className={`p-2 rounded-xl border transition-all shrink-0 ${
            isSaved
              ? "bg-indigo-600 text-white border-indigo-600 dark:bg-cyan-500 dark:text-slate-950"
              : "border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-white"
          }`}
          title={isSaved ? (locale === "bn" ? "সংরক্ষিত তালিকাভুক্ত" : "Saved to your literature list") : (locale === "bn" ? "থিসিসের জন্য সংরক্ষণ করুন" : "Save for thesis")}
        >
          <Bookmark className="w-4 h-4 fill-current" />
        </button>
      </div>

      {/* Authors */}
      <div className="text-xs text-slate-600 dark:text-slate-400">
        <span className="font-semibold text-slate-700 dark:text-slate-300">
          {locale === "bn" ? "লেখকবৃন্দ:" : "Authors:"}
        </span>{" "}
        {paper.authors.join(", ")}
      </div>

      {/* Abstract */}
      <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
        <p className={expandedAbstract ? "" : "line-clamp-2"}>
          {paper.abstract}
        </p>
        {paper.abstract.length > 180 && (
          <button
            onClick={() => setExpandedAbstract(!expandedAbstract)}
            className="text-[11px] font-bold text-indigo-600 dark:text-cyan-400 hover:underline mt-0.5"
          >
            {expandedAbstract ? (locale === "bn" ? "সংক্ষেপ করুন" : "Show less") : (locale === "bn" ? "সম্পূর্ণ এবস্ট্রাক্ট পড়ুন" : "Read full abstract")}
          </button>
        )}
      </div>

      {/* Tags */}
      {paper.tags && paper.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {paper.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 rounded-full text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          {paper.openAccessUrl && (
            <a
              href={paper.openAccessUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/60 font-semibold hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>{locale === "bn" ? "ওপেন এক্সেস পিডিএফ পড়ুন" : "Read Open Access PDF"}</span>
            </a>
          )}
          {paper.doi && (
            <a
              href={`https://doi.org/${paper.doi}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-slate-500 hover:text-indigo-600 dark:hover:text-cyan-400 underline font-mono text-[11px]"
            >
              DOI Link
            </a>
          )}
        </div>

        <button
          onClick={() => setShowBibtex(!showBibtex)}
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium transition-colors"
        >
          <Quote className="w-3.5 h-3.5 text-indigo-500 dark:text-cyan-400" />
          <span>BibTeX</span>
        </button>
      </div>

      {/* BibTeX Flyout */}
      {showBibtex && (
        <div className="relative rounded-xl bg-slate-950 text-slate-200 p-3 font-mono text-[11px] overflow-x-auto border border-slate-800">
          <button
            onClick={copyBibtex}
            className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded bg-slate-800 text-slate-300 hover:text-white text-[10px]"
          >
            {copiedBib ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>{copiedBib ? (locale === "bn" ? "কপি হয়েছে!" : "Copied!") : (locale === "bn" ? "কপি করুন" : "Copy")}</span>
          </button>
          <pre>{bibtexContent}</pre>
        </div>
      )}
    </div>
  );
}
