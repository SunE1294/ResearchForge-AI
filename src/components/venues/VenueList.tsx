"use client";

import React, { useState, useEffect } from "react";
import { VenueItem } from "@/types";
import { KEY_VENUES } from "@/data/venues";
import { useResearchStore } from "@/store/useResearchStore";
import { ExternalLink, Award, Sparkles, Filter, Calendar, Loader2 } from "lucide-react";

export function VenueList() {
  const { userProfile, locale } = useResearchStore();
  const [filterDeptOnly, setFilterDeptOnly] = useState<boolean>(true);
  const [venues, setVenues] = useState<VenueItem[]>(KEY_VENUES);
  const [isLoading, setIsLoading] = useState(false);
  const [dataSource, setDataSource] = useState<string>("Supabase PostgreSQL");

  useEffect(() => {
    async function loadVenues() {
      setIsLoading(true);
      try {
        const url = filterDeptOnly
          ? `/api/venues?dept=${userProfile.departmentCode}`
          : "/api/venues";
        const res = await fetch(url);
        const data = await res.json();
        if (data.venues && data.venues.length > 0) {
          setVenues(data.venues);
          if (data.source) setDataSource(data.source);
        }
      } catch (e) {
        console.warn("Using local cache fallback for venues:", e);
      } finally {
        setIsLoading(false);
      }
    }
    loadVenues();
  }, [filterDeptOnly, userProfile.departmentCode]);

  return (
    <div className="space-y-4 text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-600 dark:text-slate-400">
            {locale === "bn"
              ? `${venues.length} টি শীর্ষ ইনডেক্সড ভেন্যু প্রদর্শিত হচ্ছে`
              : `Showing ${venues.length} high-impact indexed venues`}
          </span>
          <span className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {dataSource}
          </span>
        </div>

        <button
          onClick={() => setFilterDeptOnly(!filterDeptOnly)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold transition"
        >
          <Filter className="w-3.5 h-3.5 text-indigo-500 dark:text-cyan-400" />
          <span>
            {filterDeptOnly
              ? (locale === "bn" ? `শুধুমাত্র ${userProfile.departmentCode} ভেন্যু` : `Showing ${userProfile.departmentCode} Venues`)
              : (locale === "bn" ? "সকল বিভাগের ভেন্যু দেখুন" : "Show All Disciplines")}
          </span>
        </button>
      </div>

      {isLoading ? (
        <div className="p-12 text-center">
          <Loader2 className="w-6 h-6 animate-spin text-indigo-600 dark:text-cyan-400 mx-auto" />
          <span className="text-slate-500 mt-2 block">
            {locale === "bn" ? "ডাটাবেজ থেকে ভেন্যু তালিকা লোড হচ্ছে..." : "Loading venues from Supabase..."}
          </span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {venues.map((venue) => (
            <div
              key={venue.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200/50 dark:border-amber-900/50">
                    {venue.tier}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-500">
                    {venue.type} • {venue.field}
                  </span>
                </div>

                <div>
                  <span className="font-bold text-slate-900 dark:text-white text-sm block">
                    {venue.name}
                  </span>
                  <span className="text-[11px] text-indigo-600 dark:text-cyan-400 font-semibold block">
                    {locale === "bn" ? "সংক্ষিপ্ত রূপ:" : "Acronym:"} {venue.acronym}
                  </span>
                </div>

                {venue.hIndex && (
                  <div className="text-[11px] text-slate-600 dark:text-slate-400">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">H-Index:</span>{" "}
                    {venue.hIndex} (Scimago SJR)
                  </div>
                )}

                <div className="flex flex-wrap gap-1 pt-1">
                  {(venue.indexing || []).map((idxName, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md text-[10px] bg-indigo-50 dark:bg-slate-800 text-indigo-700 dark:text-cyan-300 font-medium"
                    >
                      ✓ {idxName}
                    </span>
                  ))}
                </div>

                {venue.deadlineText && (
                  <div className="flex items-center gap-1.5 text-[11px] text-amber-600 dark:text-amber-400 font-medium pt-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{venue.deadlineText}</span>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end">
                <a
                  href={venue.website}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold hover:bg-indigo-600 hover:text-white dark:hover:bg-cyan-500 dark:hover:text-slate-950 transition-colors"
                >
                  <span>{locale === "bn" ? "কল ফর পেপার্স ও ওয়েবসাইট" : "Call for Papers & Aims"}</span>
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
