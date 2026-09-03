"use client";

import React, { useState, useEffect } from "react";
import { useResearchStore } from "@/store/useResearchStore";
import { useI18n } from "@/lib/i18n";
import { FACULTIES, getDepartmentsByFaculty, getDepartmentByCode } from "@/data/taxonomy";
import { FacultyCode, DepartmentCode, AcademicLevel, SkillLevel } from "@/types";
import {
  GraduationCap,
  Sparkles,
  BookOpen,
  CheckCircle2,
  X,
  Sliders,
  Cpu,
  Layers,
  ArrowRight
} from "lucide-react";

export function OnboardingModal() {
  const {
    hasCompletedOnboarding,
    setHasCompletedOnboarding,
    showOnboardingModal,
    setShowOnboardingModal,
    userProfile,
    setUserProfile,
    locale
  } = useResearchStore();

  const { t } = useI18n(locale);

  // Local form state initialized from store
  const [name, setName] = useState(userProfile.name || "");
  const [institution, setInstitution] = useState(userProfile.institution || "");
  const [academicLevel, setAcademicLevel] = useState<AcademicLevel>(userProfile.academicLevel || "undergraduate");
  const [facultyCode, setFacultyCode] = useState<FacultyCode>(userProfile.facultyCode || "FSIT");
  const [departmentCode, setDepartmentCode] = useState<DepartmentCode>(userProfile.departmentCode || "CSE");
  const [customDepartmentName, setCustomDepartmentName] = useState(userProfile.customDepartmentName || "");
  const [primaryInterest, setPrimaryInterest] = useState(userProfile.primaryInterest || "");
  const [skillLevel, setSkillLevel] = useState<SkillLevel>(userProfile.skillLevel || "beginner");
  const [targetTimelineWeeks, setTargetTimelineWeeks] = useState(userProfile.targetTimelineWeeks || 16);
  
  // Beginners who don't have a specific topic yet can leave this unchecked
  const [hasSpecificTopic, setHasSpecificTopic] = useState(
    Boolean(userProfile.primaryInterest && userProfile.primaryInterest.trim().length > 0)
  );

  // Synchronize when store changes
  useEffect(() => {
    setName(userProfile.name || "");
    setInstitution(userProfile.institution || "");
    setAcademicLevel(userProfile.academicLevel || "undergraduate");
    setFacultyCode(userProfile.facultyCode || "FSIT");
    setDepartmentCode(userProfile.departmentCode || "CSE");
    setCustomDepartmentName(userProfile.customDepartmentName || "");
    setPrimaryInterest(userProfile.primaryInterest || "");
    setSkillLevel(userProfile.skillLevel || "beginner");
    setTargetTimelineWeeks(userProfile.targetTimelineWeeks || 16);
    setHasSpecificTopic(Boolean(userProfile.primaryInterest && userProfile.primaryInterest.trim().length > 0));
  }, [userProfile]);

  // When faculty changes, update department to the first department of that faculty
  const handleFacultyChange = (newFaculty: FacultyCode) => {
    setFacultyCode(newFaculty);
    const availableDepts = getDepartmentsByFaculty(newFaculty);
    if (availableDepts.length > 0) {
      setDepartmentCode(availableDepts[0].code);
    }
  };

  const currentDeptInfo = getDepartmentByCode(departmentCode, customDepartmentName);
  const filteredDepartments = getDepartmentsByFaculty(facultyCode);

  const handleSkip = () => {
    const finalName = name.trim() || (locale === "bn" ? "গবেষক শিক্ষার্থী" : "Student Scholar");
    const finalInstitution = institution.trim() || (locale === "bn" ? "শিক্ষা প্রতিষ্ঠান" : "Tertiary Institution");
    const finalInterest = locale === "bn"
      ? "একাডেমিক রিসার্চ ও মেথডলজি ফান্ডামেন্টালস"
      : "Academic Research & Methodology Fundamentals";

    setUserProfile({
      name: finalName,
      institution: finalInstitution,
      academicLevel: "undergraduate",
      facultyCode: "FSIT",
      departmentCode: "CSE",
      primaryInterest: finalInterest,
      skillLevel: "beginner",
      targetTimelineWeeks: 16,
      customDepartmentName: "",
    });
    setHasCompletedOnboarding(true);
    setShowOnboardingModal(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const finalName = name.trim() || (locale === "bn" ? "গবেষক শিক্ষার্থী" : "Student Scholar");
    const finalInstitution = institution.trim() || (locale === "bn" ? "শিক্ষা প্রতিষ্ঠান" : "Tertiary Institution");
    const finalInterest = (hasSpecificTopic && primaryInterest.trim())
      ? primaryInterest.trim()
      : (locale === "bn"
          ? "একাডেমিক রিসার্চ ও মেথডলজি ফান্ডামেন্টালস"
          : "Academic Research & Methodology Fundamentals");

    const updatedProfile = {
      name: finalName,
      institution: finalInstitution,
      academicLevel,
      facultyCode,
      departmentCode,
      customDepartmentName: customDepartmentName.trim(),
      primaryInterest: finalInterest,
      skillLevel,
      targetTimelineWeeks
    };

    setUserProfile(updatedProfile);
    setHasCompletedOnboarding(true);
    setShowOnboardingModal(false);

    // Sync directly with Supabase PostgreSQL
    try {
      await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "00000000-0000-0000-0000-000000000001",
          fullName: finalName,
          institution: finalInstitution,
          facultyCode,
          departmentCode: departmentCode === "OTHER" ? (customDepartmentName.trim() || "Custom Department") : departmentCode,
          primaryInterest: finalInterest,
          academicLevel,
          skillLevel,
        }),
      });
    } catch (err) {
      console.warn("Notice: profile sync to database", err);
    }
  };

  // If not completed onboarding yet, always keep modal visible unless closed
  const isOpen = showOnboardingModal || !hasCompletedOnboarding;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 dark:bg-cyan-500 flex items-center justify-center text-white dark:text-slate-950 shadow-md">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-cyan-400 border border-indigo-200/50 dark:border-indigo-900/50 uppercase tracking-wider mb-0.5">
                <Sparkles className="w-3 h-3" />
                {t("onboarding.badge")}
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {t("onboarding.title")}
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={handleSkip}
            title={locale === "bn" ? "স্কিপ করে প্রবেশ করুন" : "Dismiss / Skip"}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Step 1: Student Identity */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-cyan-400 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-cyan-950 text-indigo-700 dark:text-cyan-300 flex items-center justify-center text-[11px]">1</span>
              {t("onboarding.step1")}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {t("onboarding.nameLabel")} <span className="text-slate-400 font-normal">({locale === "bn" ? "ঐচ্ছিক" : "Optional"})</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t("onboarding.namePlaceholder")}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-cyan-400 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {t("onboarding.institutionLabel")} <span className="text-slate-400 font-normal">({locale === "bn" ? "ঐচ্ছিক" : "Optional"})</span>
                </label>
                <input
                  type="text"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  placeholder={t("onboarding.institutionPlaceholder")}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-cyan-400 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {t("onboarding.levelLabel")}
              </label>
              <select
                value={academicLevel}
                onChange={(e) => setAcademicLevel(e.target.value as AcademicLevel)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-cyan-400"
              >
                <option value="undergraduate">{t("onboarding.levelUndergrad")}</option>
                <option value="masters">{t("onboarding.levelMasters")}</option>
                <option value="early_career">{t("onboarding.levelResearcher")}</option>
              </select>
            </div>
          </div>

          {/* Step 2: Faculty & Department Taxonomy */}
          <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-cyan-400 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-cyan-950 text-indigo-700 dark:text-cyan-300 flex items-center justify-center text-[11px]">2</span>
              {t("onboarding.step2")}
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Faculty Dropdown */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {t("onboarding.facultyLabel")}
                </label>
                <select
                  value={facultyCode}
                  onChange={(e) => handleFacultyChange(e.target.value as FacultyCode)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-cyan-400"
                >
                  {FACULTIES.map((f) => (
                    <option key={f.code} value={f.code}>
                      {f.code} - {locale === "bn" ? f.nameBn : f.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Department Dropdown */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {t("onboarding.deptLabel")}
                </label>
                <select
                  value={departmentCode}
                  onChange={(e) => setDepartmentCode(e.target.value as DepartmentCode)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-cyan-400"
                >
                  {filteredDepartments.map((d) => (
                    <option key={d.code} value={d.code}>
                      {d.code} - {locale === "bn" ? d.nameBn : d.name}
                    </option>
                  ))}
                  <option value="OTHER">
                    {locale === "bn" ? "অন্যান্য (কাস্টম বিভাগ লিখুন...)" : "Other Department (Type Custom...)"}
                  </option>
                </select>
              </div>
            </div>

            {/* Custom Department Name Field (When OTHER is selected) */}
            {departmentCode === "OTHER" && (
              <div className="p-3.5 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 animate-in fade-in duration-200 space-y-1.5">
                <label className="block text-xs font-bold text-indigo-900 dark:text-cyan-300">
                  {locale === "bn" ? "আপনার নিজস্ব বিভাগের নাম টাইপ করুন:" : "Enter Your Custom Department Name:"}
                </label>
                <input
                  type="text"
                  value={customDepartmentName}
                  onChange={(e) => setCustomDepartmentName(e.target.value)}
                  placeholder={locale === "bn" ? "যেমন: ডিপার্টমেন্ট অব রোবোটিক্স, অর্থনীতি, মাইক্রোবায়োলজি ইত্যাদি..." : "e.g. Department of Robotics & Mechatronics, Economics, Microbiology..."}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-cyan-400"
                />
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {locale === "bn" ? "ড্যাফোডিল বা যেকোনো বিশ্ববিদ্যালয়ের শিক্ষার্থীরা তাদের নিজস্ব বিভাগের নাম এখানে লিখতে পারবেন।" : "Available for students from any tertiary university to customize their specialized discipline."}
                </p>
              </div>
            )}

            {/* Live Archetype Preview Box */}
            {currentDeptInfo && (
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-indigo-100 dark:border-indigo-900/40 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-indigo-500 dark:text-cyan-400" />
                    {t("onboarding.archetypePreview")}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-cyan-300 font-semibold text-[11px]">
                    {currentDeptInfo.archetype}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                  <div>
                    <span className="font-medium text-slate-700 dark:text-slate-300">Citation:</span>{" "}
                    <span className="font-bold text-indigo-600 dark:text-cyan-400">{currentDeptInfo.recommendedCitation}</span>
                  </div>
                  <div>
                    <span className="font-medium text-slate-700 dark:text-slate-300">Primary Venues:</span>{" "}
                    <span>{currentDeptInfo.keyVenues.slice(0, 2).join(", ")}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Step 3: Research Focus & Goals */}
          <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-cyan-400 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-cyan-950 text-indigo-700 dark:text-cyan-300 flex items-center justify-center text-[11px]">3</span>
              {t("onboarding.step3")}
            </h4>

            {/* Clickable Topic Toggle for Beginners vs. Topic-Ready Researchers */}
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between gap-3">
                <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-slate-800 dark:text-slate-200 select-none">
                  <input
                    type="checkbox"
                    checked={hasSpecificTopic}
                    onChange={(e) => {
                      setHasSpecificTopic(e.target.checked);
                      if (!e.target.checked) {
                        setPrimaryInterest("");
                      }
                    }}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 dark:border-slate-700 dark:bg-slate-900 cursor-pointer"
                  />
                  <span>
                    {locale === "bn"
                      ? "আমার নির্দিষ্ট গবেষণার বিষয় / থিসিস টপিক ঠিক করা আছে (ক্লিক করে লিখুন)"
                      : "I have a specific research topic / thesis proposal (Click to specify)"}
                  </span>
                </label>
              </div>

              {hasSpecificTopic ? (
                <div className="space-y-1.5 animate-in fade-in duration-200">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {t("onboarding.interestLabel")}
                  </label>
                  <input
                    type="text"
                    value={primaryInterest}
                    onChange={(e) => setPrimaryInterest(e.target.value)}
                    placeholder={t("onboarding.interestPlaceholder")}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-cyan-400"
                  />
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-900/60 flex items-start gap-2.5 text-xs text-emerald-800 dark:text-emerald-300">
                  <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block mb-0.5">
                      {locale === "bn" ? "শিক্ষানবিস মোড (কোনো টপিক বাধ্যতামূলক নয়):" : "Beginner Exploration Mode (No Fixed Topic Required):"}
                    </span>
                    <span className="text-[11px] leading-relaxed text-emerald-700 dark:text-emerald-300/90">
                      {locale === "bn"
                        ? "আপনি নতুন শিখতে এসেছেন? কোনো সমস্যা নেই! কোনো টপিক ছাড়াও আপনি অ্যাকাডেমিক ভিত্তি (Three-Pass Reading), PRISMA এবং লিটারেচার সার্চ স্বাধীনভাবে শিখতে পারবেন।"
                        : "Learning academic research for the first time? No topic needed yet! You can freely explore methodologies, Three-Pass Reading, and research gaps."}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {t("onboarding.skillLabel")}
                </label>
                <select
                  value={skillLevel}
                  onChange={(e) => setSkillLevel(e.target.value as SkillLevel)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-cyan-400"
                >
                  <option value="beginner">{t("onboarding.skillBeginner")}</option>
                  <option value="intermediate">{t("onboarding.skillIntermediate")}</option>
                  <option value="advanced">{t("onboarding.skillAdvanced")}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {t("onboarding.timelineLabel")}
                </label>
                <select
                  value={targetTimelineWeeks}
                  onChange={(e) => setTargetTimelineWeeks(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-cyan-400"
                >
                  <option value={16}>{t("onboarding.timeline16")}</option>
                  <option value={24}>{t("onboarding.timeline24")}</option>
                  <option value={52}>{t("onboarding.timeline52")}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleSkip}
              className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition text-center"
            >
              {locale === "bn" ? "স্কিপ করে সরাসরি প্রবেশ করুন" : "Skip & Explore as Beginner"}
            </button>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                type="submit"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 hover:from-indigo-700 hover:to-cyan-600 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 transition-all"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{t("onboarding.btnSave")}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
