"use client";

import React, { useState, useEffect } from "react";
import { useResearchStore } from "@/store/useResearchStore";
import { useI18n } from "@/lib/i18n";
import { PaperSearchCard } from "@/components/discovery/PaperSearchCard";
import { DatasetFinder } from "@/components/discovery/DatasetFinder";
import { QueryBuilderModal } from "@/components/discovery/QueryBuilderModal";
import { Paper } from "@/types";
import {
  Compass,
  Search,
  Sparkles,
  Database,
  BookOpen,
  Filter,
  Loader2,
  Bookmark
} from "lucide-react";

export default function DiscoveryPage() {
  const { userProfile, locale, savedPaperIds } = useResearchStore();
  const { t } = useI18n(locale);

  const [searchQuery, setSearchQuery] = useState(userProfile.primaryInterest || "deep learning medical imaging");
  const [papers, setPapers] = useState<Paper[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"papers" | "datasets" | "bookmarks">("papers");
  const [isQueryModalOpen, setIsQueryModalOpen] = useState(false);
  const [openAccessOnly, setOpenAccessOnly] = useState(false);

  const performSearch = async (queryText: string) => {
    if (!queryText.trim()) return;
    setIsLoading(true);

    try {
      const res = await fetch(`/api/papers/search?q=${encodeURIComponent(queryText)}&dept=${userProfile.departmentCode}`);
      const data = await res.json();
      if (data.papers) {
        setPapers(data.papers);
      }
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    performSearch(searchQuery);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(searchQuery);
  };

  const displayedPapers = papers.filter((p) => {
    if (activeTab === "bookmarks") {
      return savedPaperIds.includes(p.id);
    }
    if (openAccessOnly && !p.openAccessUrl) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-8 text-xs">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-cyan-300 border border-indigo-200 dark:border-indigo-900">
          <Compass className="w-3.5 h-3.5" />
          <span>Phase C &bull; Academic Discovery Pipeline</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {t("discovery.title")}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-3xl">
          {t("discovery.subtitle")}
        </p>
      </div>

      {/* Search Bar & AI Query Builder Trigger */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("discovery.searchPlaceholder")}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-cyan-400 text-xs font-medium"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 dark:bg-cyan-500 dark:hover:bg-cyan-600 text-white dark:text-slate-950 font-bold flex items-center justify-center gap-2 shadow-md shadow-indigo-600/20 transition shrink-0"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            <span>{t("discovery.btnSearch")}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsQueryModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold flex items-center justify-center gap-1.5 transition shrink-0"
          >
            <Sparkles className="w-4 h-4 text-indigo-500 dark:text-cyan-400" />
            <span>{t("discovery.btnQueryBuilder")}</span>
          </button>
        </form>

        {/* Quick Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setActiveTab("papers")}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${
                activeTab === "papers"
                  ? "bg-indigo-600 text-white dark:bg-cyan-500 dark:text-slate-950"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
              }`}
            >
              Indexed Papers ({papers.length})
            </button>
            <button
              onClick={() => setActiveTab("datasets")}
              className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 ${
                activeTab === "datasets"
                  ? "bg-indigo-600 text-white dark:bg-cyan-500 dark:text-slate-950"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>Curated Datasets</span>
            </button>
            <button
              onClick={() => setActiveTab("bookmarks")}
              className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 ${
                activeTab === "bookmarks"
                  ? "bg-indigo-600 text-white dark:bg-cyan-500 dark:text-slate-950"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Bookmarked ({savedPaperIds.length})</span>
            </button>
          </div>

          {activeTab !== "datasets" && (
            <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-600 dark:text-slate-400">
              <input
                type="checkbox"
                checked={openAccessOnly}
                onChange={(e) => setOpenAccessOnly(e.target.checked)}
                className="rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span>{t("discovery.openAccessOnly")}</span>
            </label>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      {activeTab === "datasets" ? (
        <DatasetFinder />
      ) : (
        <div className="space-y-4">
          {isLoading ? (
            <div className="p-12 text-center space-y-3">
              <Loader2 className="w-8 h-8 text-indigo-600 dark:text-cyan-400 animate-spin mx-auto" />
              <p className="font-semibold text-slate-600 dark:text-slate-400">
                {t("discovery.searching")}
              </p>
            </div>
          ) : displayedPapers.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <BookOpen className="w-8 h-8 text-slate-400 mx-auto" />
              <p className="font-bold text-slate-700 dark:text-slate-300">
                {activeTab === "bookmarks" ? "No bookmarked papers yet." : "No publications found matching criteria."}
              </p>
              <p className="text-slate-500">
                {activeTab === "bookmarks" ? "Click the bookmark icon on any paper card to save it." : "Try expanding your keywords or use the Boolean Query Assistant."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {displayedPapers.map((paper) => (
                <PaperSearchCard key={paper.id} paper={paper} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Boolean Query Modal */}
      <QueryBuilderModal
        isOpen={isQueryModalOpen}
        onClose={() => setIsQueryModalOpen(false)}
        onApplyQuery={(q) => {
          setSearchQuery(q);
          performSearch(q);
        }}
      />
    </div>
  );
}
