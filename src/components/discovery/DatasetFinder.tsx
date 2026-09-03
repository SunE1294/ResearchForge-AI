"use client";

import React, { useState, useEffect } from "react";
import { DatasetItem } from "@/types";
import { BENCHMARK_DATASETS } from "@/data/datasets";
import { useResearchStore } from "@/store/useResearchStore";
import { Database, ExternalLink, Filter, Search, Tag, Loader2 } from "lucide-react";

export function DatasetFinder() {
  const { userProfile, locale } = useResearchStore();
  const [selectedFaculty, setSelectedFaculty] = useState<string>("ALL");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [datasets, setDatasets] = useState<DatasetItem[]>(BENCHMARK_DATASETS);
  const [isLoading, setIsLoading] = useState(false);
  const [dataSource, setDataSource] = useState<string>("Supabase PostgreSQL");

  useEffect(() => {
    async function loadDatasets() {
      setIsLoading(true);
      try {
        const url = selectedFaculty === "ALL" 
          ? "/api/datasets" 
          : `/api/datasets?faculty=${selectedFaculty}`;
        const res = await fetch(url);
        const data = await res.json();
        if (data.datasets && data.datasets.length > 0) {
          setDatasets(data.datasets);
          if (data.source) setDataSource(data.source);
        }
      } catch (e) {
        console.warn("Using local cache fallback for datasets:", e);
      } finally {
        setIsLoading(false);
      }
    }
    loadDatasets();
  }, [selectedFaculty]);

  const filtered = datasets.filter((ds) => {
    const matchesSearch =
      searchTerm === "" ||
      ds.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ds.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (ds.descriptionBn && ds.descriptionBn.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (ds.tags && ds.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase())));
    return matchesSearch;
  });

  return (
    <div className="space-y-5 text-xs">
      {/* Header & Source Info */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={locale === "bn" ? "ডেটাসেট, মোডালিটি বা ট্যাগ দিয়ে খুঁজুন..." : "Search datasets, modalities, or tags..."}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-cyan-400"
          />
        </div>

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
            ? `${filtered.length} টি বেঞ্চমার্ক ডেটাসেট প্রদর্শিত হচ্ছে`
            : `Displaying ${filtered.length} benchmark datasets`}
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
            {locale === "bn" ? "ডাটাবেজ থেকে ডেটাসেট লোড হচ্ছে..." : "Loading datasets from Supabase..."}
          </span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((dataset) => (
            <div
              key={dataset.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-cyan-300 border border-indigo-200/50 dark:border-indigo-900/50">
                    {dataset.facultyCode} • {(dataset.departments || []).join(", ")}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-500">
                    {dataset.license}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  {dataset.title}
                </h4>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {locale === "bn" ? (dataset.descriptionBn || dataset.description) : dataset.description}
                </p>

                {dataset.tags && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {dataset.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-medium">
                  {locale === "bn" ? "ফরম্যাট:" : "Format:"} <span className="font-semibold text-slate-700 dark:text-slate-300">{(dataset.format || []).join(", ")}</span>
                </span>

                <a
                  href={dataset.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 dark:bg-cyan-500 text-white dark:text-slate-950 font-bold hover:opacity-90 transition-opacity"
                >
                  <span>{locale === "bn" ? "রিপোজিটরি দেখুন" : "Access Repository"}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
