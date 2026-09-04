"use client";

import React, { useState, useEffect } from "react";
import { DatasetItem } from "@/types";
import { BENCHMARK_DATASETS } from "@/data/datasets";
import { useResearchStore } from "@/store/useResearchStore";
import { Database, ExternalLink, Search, Tag, Loader2, RefreshCw } from "lucide-react";

interface DatasetFinderProps {
  initialSearchQuery?: string;
}

export function DatasetFinder({ initialSearchQuery = "" }: DatasetFinderProps) {
  const { userProfile, locale } = useResearchStore();
  const initialFaculty = userProfile.facultyCode && userProfile.facultyCode !== "OTHER"
    ? userProfile.facultyCode
    : "ALL";
  const [selectedFaculty, setSelectedFaculty] = useState<string>(initialFaculty);
  const [searchTerm, setSearchTerm] = useState<string>(initialSearchQuery);

  // Initialize strictly with department-isolated benchmark datasets
  const getInitialDatasets = () => {
    if (userProfile.departmentCode) {
      const matched = BENCHMARK_DATASETS.filter(
        (d) => d.departments && d.departments.includes(userProfile.departmentCode)
      );
      if (matched.length > 0) return matched;
    }
    if (userProfile.facultyCode && userProfile.facultyCode !== "OTHER") {
      const facMatched = BENCHMARK_DATASETS.filter(
        (d) => d.facultyCode === userProfile.facultyCode
      );
      if (facMatched.length > 0) return facMatched;
    }
    return BENCHMARK_DATASETS;
  };

  const [datasets, setDatasets] = useState<DatasetItem[]>(getInitialDatasets);
  const [isLoading, setIsLoading] = useState(false);
  const [dataSource, setDataSource] = useState<string>("CERN Zenodo & Verified Catalog");

  // Keep search term synchronized if parent query changes
  useEffect(() => {
    if (initialSearchQuery) {
      setSearchTerm(initialSearchQuery);
    }
  }, [initialSearchQuery]);

  // Load datasets when faculty or search term changes
  const fetchDatasets = async (queryText: string, faculty: string) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (queryText.trim()) params.set("q", queryText.trim());
      if (faculty !== "ALL") params.set("faculty", faculty);
      if (userProfile.departmentCode) params.set("dept", userProfile.departmentCode);

      const res = await fetch(`/api/datasets?${params.toString()}`);
      const data = await res.json();
      if (data.datasets) {
        setDatasets(data.datasets);
        if (data.source) setDataSource(data.source);
      }
    } catch (e) {
      console.warn("Dataset search fallback:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDatasets(searchTerm, selectedFaculty);
  }, [selectedFaculty, userProfile.departmentCode]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchDatasets(searchTerm, selectedFaculty);
  };

  return (
    <div className="space-y-5 text-xs">
      {/* Header & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-96 flex gap-2">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={locale === "bn" ? "ডেটাসেট বা গবেষণার বিষয় লিখে খুঁজুন..." : "Search live datasets on any topic..."}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-cyan-400 font-medium"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition shrink-0"
          >
            {isLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : (locale === "bn" ? "খুঁজুন" : "Search")}
          </button>
        </form>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {["ALL", "FSIT", "FE", "FBE", "FHLS", "FHSS"].map((fac) => (
            <button
              key={fac}
              onClick={() => setSelectedFaculty(fac)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all shrink-0 ${
                selectedFaculty === fac
                  ? "bg-indigo-600 text-white dark:bg-cyan-500 dark:text-slate-950 shadow-sm"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              {fac === "ALL" ? (locale === "bn" ? "সকল অনুষদ" : "All Faculties") : fac}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-500">
        <span>
          {locale === "bn"
            ? `${datasets.length} টি গবেষণার ডেটাসেট পাওয়া গেছে`
            : `Found ${datasets.length} verified research datasets`}
        </span>
        <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          {locale === "bn" ? "সরাসরি উৎস:" : "Live Source:"} {dataSource}
        </span>
      </div>

      {/* Dataset Cards Grid */}
      {isLoading ? (
        <div className="p-12 text-center">
          <Loader2 className="w-6 h-6 animate-spin text-indigo-600 dark:text-cyan-400 mx-auto" />
          <span className="text-slate-500 mt-2 block">
            {locale === "bn" ? "জেনোডো ও হাগিং ফেস থেকে রিয়েল ডেটাসেট লোড হচ্ছে..." : "Loading live datasets from CERN Zenodo & Hugging Face..."}
          </span>
        </div>
      ) : datasets.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <Database className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="font-bold text-slate-700 dark:text-slate-300">
            {locale === "bn" ? "এই বিষয়ে কোনো ডেটাসেট পাওয়া যায়নি।" : "No datasets found matching this query."}
          </p>
          <p className="text-slate-500 text-[11px] mt-1">
            {locale === "bn" ? "অন্য কোনো শব্দ বা সহজ ইংরেজি কিওয়ার্ড দিয়ে পুনরায় চেষ্টা করুন।" : "Try broadening your keywords or search terms."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {datasets.map((ds) => (
            <div
              key={ds.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-3 hover:border-indigo-300 dark:hover:border-cyan-800 transition"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-cyan-400 border border-indigo-200/50 dark:border-indigo-900/50">
                    {ds.sourceName}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400">
                    {Array.isArray(ds.format) ? ds.format.join(", ") : (ds.format || "Dataset Archive")}
                  </span>
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white leading-snug">
                  {ds.title}
                </h4>
                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed line-clamp-3">
                  {locale === "bn" && ds.descriptionBn ? ds.descriptionBn : ds.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px]">
                <span className="font-medium text-slate-500">
                  {ds.license || "Open Access"}
                </span>
                <a
                  href={ds.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold transition shadow-sm"
                >
                  <span>{locale === "bn" ? "আসল ডেটাসেট দেখুন" : "Access Dataset"}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
