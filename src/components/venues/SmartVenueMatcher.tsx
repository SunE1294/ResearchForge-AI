"use client";

import React, { useState, useEffect } from "react";
import { useResearchStore } from "@/store/useResearchStore";
import { useI18n } from "@/lib/i18n";
import { MatchedVenueResult } from "@/types";
import { ALL_FACULTY_VENUES } from "@/data/venues";
import { AcademicTooltip } from "@/components/ui/AcademicTooltip";
import {
  Sparkles,
  Search,
  Filter,
  ShieldCheck,
  Calendar,
  Clock,
  ExternalLink,
  Award,
  Layers,
  Copy,
  Check,
  Loader2,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  Building,
  AlertCircle
} from "lucide-react";

export function SmartVenueMatcher() {
  const { userProfile, locale } = useResearchStore();
  const { t } = useI18n(locale);

  const initialFaculty = userProfile.facultyCode && userProfile.facultyCode !== "OTHER"
    ? userProfile.facultyCode
    : "ALL";

  // Search Controls State (CRITICAL: Empty string by default, unpopulated)
  const [topicInput, setTopicInput] = useState<string>("");
  const [selectedFaculty, setSelectedFaculty] = useState<string>(initialFaculty);
  const [venueTypeFilter, setVenueTypeFilter] = useState<"all" | "conference" | "journal" | "open_access">("all");

  // Results State: Initialize strictly with department-aware verified venues
  const getInitialVenues = (): MatchedVenueResult[] => {
    if (userProfile.departmentCode) {
      const deptMatches = ALL_FACULTY_VENUES.filter(
        (v) => v.departments && v.departments.includes(userProfile.departmentCode)
      );
      if (deptMatches.length > 0) return deptMatches;
    }
    if (userProfile.facultyCode && userProfile.facultyCode !== "OTHER") {
      const facMatches = ALL_FACULTY_VENUES.filter(
        (v) => v.facultyCode === userProfile.facultyCode || (v.facultyCode as string) === "INTERDISCIPLINARY"
      );
      if (facMatches.length > 0) return facMatches;
    }
    return ALL_FACULTY_VENUES.slice(0, 6);
  };

  const [venues, setVenues] = useState<MatchedVenueResult[]>(getInitialVenues);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<string>("Verified Discipline Index");

  // Keep faculty synchronized if user updates profile
  useEffect(() => {
    if (userProfile.facultyCode && userProfile.facultyCode !== "OTHER") {
      setSelectedFaculty(userProfile.facultyCode);
    }
    setVenues(getInitialVenues());
  }, [userProfile.departmentCode, userProfile.facultyCode]);

  // Faculty Filter Options
  const facultyOptions = [
    { id: "ALL", labelEn: "All Disciplines", labelBn: "সকল অনুষদ / বিষয়" },
    { id: "FSIT", labelEn: "Computing & Tech (FSIT)", labelBn: "কম্পিউটিং ও প্রযুক্তি (FSIT)" },
    { id: "FE", labelEn: "Engineering & Robotics (FE)", labelBn: "ইঞ্জিনিয়ারিং ও রোবোটিক্স (FE)" },
    { id: "FBE", labelEn: "Business, Finance & Mgmt (FBE)", labelBn: "ব্যবসায় ও অর্থনীতি (FBE)" },
    { id: "FHLS", labelEn: "Health, Life Sciences & Pharmacy (FHLS)", labelBn: "স্বাস্থ্য, ফার্মা ও জীবনবিজ্ঞান (FHLS)" },
    { id: "FHSS", labelEn: "Humanities, Social Sciences & Law (FHSS)", labelBn: "আইন, সামাজিক বিজ্ঞান ও মানবিক (FHSS)" },
  ];

  // Venue Type Filter Options
  const typeOptions = [
    { id: "all", labelEn: "All Venues", labelBn: "সকল ভেন্যু" },
    { id: "conference", labelEn: "Upcoming Conferences (CORE)", labelBn: "আসন্ন কনফারেন্স (CORE)" },
    { id: "journal", labelEn: "Scopus / SCIE Journals", labelBn: "স্কোপাস / SCIE জার্নাল" },
    { id: "open_access", labelEn: "Open Access Friendly", labelBn: "ওপেন-অ্যাক্সেস ফ্রেন্ডলি" },
  ];

  // Handle Search Submission
  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/venues/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: topicInput,
          faculty: selectedFaculty,
          venueType: venueTypeFilter,
          departmentCode: userProfile.departmentCode
        })
      });

      const data = await res.json();
      if (data.venues && data.venues.length > 0) {
        setVenues(data.venues);
        if (data.source) setDataSource(data.source);
      }
    } catch (err) {
      console.warn("API match failure, filtering local all-faculty venues:", err);
      // Resilient fallback filtering with department isolation
      let fallback = [...ALL_FACULTY_VENUES];
      if (selectedFaculty !== "ALL") {
        fallback = fallback.filter((v) => v.facultyCode === selectedFaculty || (v.facultyCode as string) === "INTERDISCIPLINARY");
      }
      if (userProfile.departmentCode) {
        const deptMatches = fallback.filter((v) => v.departments && v.departments.includes(userProfile.departmentCode));
        if (deptMatches.length > 0) {
          const others = fallback.filter((v) => !v.departments || !v.departments.includes(userProfile.departmentCode));
          fallback = [...deptMatches, ...others];
        }
      }
      if (venueTypeFilter === "conference") {
        fallback = fallback.filter((v) => v.type === "Conference");
      } else if (venueTypeFilter === "journal") {
        fallback = fallback.filter((v) => v.type === "Journal");
      } else if (venueTypeFilter === "open_access") {
        fallback = fallback.filter((v) => v.isOpenAccess);
      }
      setVenues(fallback.slice(0, 6));
      setDataSource("Local Discipline Seed Index");
    } finally {
      setIsLoading(false);
    }
  };

  // Copy Citation / Venue Name
  const handleCopyVenue = (venue: MatchedVenueResult) => {
    navigator.clipboard.writeText(`${venue.name} (${venue.acronym}) - ${venue.tier}, ${venue.publisher}`);
    setCopiedId(venue.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Tier Color Helper
  const getTierColor = (tier: string) => {
    if (tier.includes("Q1") || tier.includes("A*")) {
      return "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800";
    }
    if (tier.includes("Q2") || tier.includes("A")) {
      return "bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-cyan-300 border-blue-200 dark:border-blue-800";
    }
    return "bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800";
  };

  // Feasibility Color Helper
  const getFeasibilityBadge = (feasibility: string) => {
    switch (feasibility) {
      case "High":
        return "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-300";
      case "Moderate":
        return "bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-cyan-300 border-blue-300";
      case "Competitive":
        return "bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300 border-purple-300";
      default:
        return "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300";
    }
  };

  return (
    <div className="space-y-6 text-xs">
      {/* 1. HERO & CONTROLS HEADER */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl border border-indigo-900/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-cyan-400/20 text-cyan-300 border border-cyan-400/30 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{locale === "bn" ? "সকল ২৪টি বিভাগের জন্য স্মার্ট ভেন্যু ইঞ্জিন" : "24-Department Smart Venue Engine"}</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            {t("venues.matcherTitle")}
          </h2>

          <p className="text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
            {t("venues.matcherSubtitle")}
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="space-y-3 pt-2">
            {/* Input Bar (Clean, unpopulated by default) */}
            <div className="flex flex-col sm:flex-row items-stretch gap-2 bg-white/10 dark:bg-slate-900/70 p-2 rounded-2xl border border-white/20 shadow-lg backdrop-blur-md">
              <div className="relative flex-1 flex items-center">
                <Search className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={topicInput}
                  onChange={(e) => setTopicInput(e.target.value)}
                  placeholder={t("venues.searchPlaceholder")}
                  className="w-full pl-10 pr-4 py-2.5 bg-transparent text-white placeholder:text-slate-400 text-xs sm:text-sm font-medium focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 shrink-0 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{locale === "bn" ? "ভেন্যু খোঁজা হচ্ছে..." : "Auditing Venues..."}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-cyan-200" />
                    <span>{t("venues.btnFindVenues")}</span>
                  </>
                )}
              </button>
            </div>

            {/* Filter Controls Row */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs">
              {/* Faculty / Discipline Dropdown */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 mr-1">
                  <Filter className="w-3 h-3" />
                  {locale === "bn" ? "অনুষদ:" : "Faculty:"}
                </span>
                <select
                  value={selectedFaculty}
                  onChange={(e) => setSelectedFaculty(e.target.value)}
                  className="bg-slate-800 text-white text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-700 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                >
                  {facultyOptions.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {locale === "bn" ? opt.labelBn : opt.labelEn}
                    </option>
                  ))}
                </select>
              </div>

              {/* Venue Type Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto">
                {typeOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setVenueTypeFilter(opt.id as any)}
                    className={`px-3 py-1 rounded-xl text-[11px] font-bold transition shrink-0 ${
                      venueTypeFilter === opt.id
                        ? "bg-cyan-500 text-slate-950 shadow-sm"
                        : "bg-white/10 hover:bg-white/20 text-slate-300"
                    }`}
                  >
                    {locale === "bn" ? opt.labelBn : opt.labelEn}
                  </button>
                ))}
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* 2. MATCH METRICS BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-slate-900 dark:text-white text-sm">
            {locale === "bn"
              ? `${venues.length} টি মানানসই পিয়ার-রিভিউড প্রকাশনা ক্ষেত্র পাওয়া গেছে`
              : `Found ${venues.length} Matching Peer-Reviewed Venues`}
          </span>
          <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {dataSource}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>{locale === "bn" ? "প্রিডেটরি ব্ল্যাকলিস্ট মুক্ত ও স্কোপাস সার্টিফায়েড" : "Predatory Blacklist Screened & Scopus Indexed"}</span>
        </div>
      </div>

      {/* 3. MATCH RESULTS CARDS GRID */}
      {isLoading ? (
        <div className="p-12 text-center space-y-3 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
          <Loader2 className="w-8 h-8 text-indigo-600 dark:text-cyan-400 animate-spin mx-auto" />
          <p className="font-bold text-slate-700 dark:text-slate-300 text-sm">
            {locale === "bn"
              ? "Gemini AI আপনার টপিক ও মেথডলজি অনুযায়ী শীর্ষ জার্নাল ও CFP যাচাই করছে..."
              : "Gemini AI is analyzing editorial scopes, CFP cycles, and Scopus/CORE indexing..."}
          </p>
          <span className="text-slate-500 text-xs">
            {locale === "bn"
              ? "শিকারি প্রকাশকদের স্বয়ংক্রিয়ভাবে ফিল্টার করে শুধুমাত্র গ্রহণযোগ্য ভেন্যু সাজানো হচ্ছে।"
              : "Filtering out predatory journals and vanity conferences automatically."}
          </span>
        </div>
      ) : venues.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
          <BookOpen className="w-8 h-8 text-slate-400 mx-auto" />
          <p className="font-bold text-slate-700 dark:text-slate-300">
            {locale === "bn" ? "কোনো ভেন্যু পাওয়া যায়নি।" : "No matching venues found for this criteria."}
          </p>
          <p className="text-slate-500 text-xs">
            {locale === "bn"
              ? "অনুষদ ফিল্টার 'সকল অনুষদ' দিয়ে পুনরায় চেষ্টা করুন অথবা সহজ ইংরেজি কিওয়ার্ড লিখুন।"
              : "Try broadening your topic keywords or reset the faculty filter to 'All Disciplines'."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {venues.map((venue) => (
            <div
              key={venue.id}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
            >
              {/* Card Top: Identity, Publisher & Badges */}
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {/* Indexing Tier */}
                    <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold border inline-flex items-center ${getTierColor(venue.tier)}`}>
                      <span>{venue.tier}</span>
                      <AcademicTooltip term="scopus" />
                    </span>

                    {/* Venue Type */}
                    <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {venue.type}
                    </span>

                    {/* Open Access Pill */}
                    {venue.isOpenAccess && (
                      <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
                        Open Access
                      </span>
                    )}
                  </div>

                  {/* Copy Button */}
                  <button
                    onClick={() => handleCopyVenue(venue)}
                    className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition"
                    title="Copy venue title & indexing"
                  >
                    {copiedId === venue.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* Venue Name & Acronym */}
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-cyan-400 transition-colors leading-snug">
                    {venue.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-slate-500 text-[11px] font-semibold">
                    <span className="text-indigo-600 dark:text-cyan-400 font-bold">{venue.acronym}</span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1">
                      <Building className="w-3 h-3 text-slate-400" />
                      <span>{venue.publisher}</span>
                    </span>
                  </div>
                </div>

                {/* Field & Faculty Badges */}
                <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    🏷️ {venue.field}
                  </span>
                  <span className="px-2 py-0.5 rounded-md text-[9px] font-bold bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-cyan-300 border border-indigo-200/50 dark:border-indigo-900">
                    Faculty: {venue.facultyCode}
                  </span>
                </div>

                {/* Scope Alignment Block */}
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-cyan-400 block">
                    🎯 {t("venues.scopeMatch")}
                  </span>
                  <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    {locale === "bn" && venue.scopeAlignmentBn ? venue.scopeAlignmentBn : venue.scopeAlignment}
                  </p>
                </div>

                {/* CFP Cycle, Turnaround & Undergrad Feasibility Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[11px] pt-1">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-0.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-indigo-500" />
                      {t("venues.cfpDeadline")}
                    </span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200 block">
                      {venue.cfpCycle}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-0.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                      <Clock className="w-3 h-3 text-cyan-500" />
                      {t("venues.turnaround")}
                    </span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200 block">
                      {venue.reviewTurnaround}
                    </span>
                  </div>
                </div>

                {/* Feasibility Advice Bar */}
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex items-start gap-2">
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border shrink-0 mt-0.5 ${getFeasibilityBadge(venue.acceptanceFeasibility)}`}>
                    {venue.acceptanceFeasibility}
                  </span>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-snug">
                    {venue.acceptanceFeasibilityDesc}
                  </p>
                </div>
              </div>

              {/* Card Footer: Safety Badge & External Verification Actions */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>{t("venues.verifiedSafe")}</span>
                  </span>

                  <div className="flex items-center gap-1.5">
                    {venue.indexing.map((idxName, i) => (
                      <span key={i} className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[9px] font-mono text-slate-500 font-semibold">
                        {idxName}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <a
                    href={venue.officialWebsite}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-sm text-center"
                  >
                    <span>{t("venues.visitOfficial")}</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                  </a>

                  <a
                    href={venue.verificationLink}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center justify-center gap-1 transition"
                    title={t("venues.verifyScimago")}
                  >
                    <span>{locale === "bn" ? "Scimago যাচাই" : "Scimago Rank"}</span>
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
