"use client";

import React, { useState, useEffect } from "react";
import { useResearchStore } from "@/store/useResearchStore";
import { useI18n } from "@/lib/i18n";
import { FACULTIES, DEPARTMENTS, getDepartmentByCode, getDepartmentsByFaculty } from "@/data/taxonomy";
import { FacultyCode, DepartmentCode, AcademicLevel, SkillLevel } from "@/types";
import {
  X,
  CheckCircle2,
  GraduationCap,
  Sparkles,
  BookOpen,
  Cpu,
  Layers,
  Calendar
} from "lucide-react";

export function OnboardingModal() {
  const {
    showOnboardingModal,
    setShowOnboardingModal,
    hasCompletedOnboarding,
    setHasCompletedOnboarding,
    userProfile,
    setUserProfile,
    locale
  } = useResearchStore();

  const { t } = useI18n(locale);

  // Local form state initialized from store
  const [name, setName] = useState(userProfile.name);
  const [institution, setInstitution] = useState(userProfile.institution);
  const [academicLevel, setAcademicLevel] = useState<AcademicLevel>(userProfile.academicLevel);
  const [facultyCode, setFacultyCode] = useState<FacultyCode>(userProfile.facultyCode);
  const [departmentCode, setDepartmentCode] = useState<DepartmentCode>(userProfile.departmentCode);
  const [customDepartmentName, setCustomDepartmentName] = useState(userProfile.customDepartmentName || "");
  const [primaryInterest, setPrimaryInterest] = useState(userProfile.primaryInterest);
  const [skillLevel, setSkillLevel] = useState<SkillLevel>(userProfile.skillLevel);
  const [targetTimelineWeeks, setTargetTimelineWeeks] = useState(userProfile.targetTimelineWeeks || 16);

  // Synchronize when store changes
  useEffect(() => {
    setName(userProfile.name);
    setInstitution(userProfile.institution);
    setAcademicLevel(userProfile.academicLevel);
    setFacultyCode(userProfile.facultyCode);
    setDepartmentCode(userProfile.departmentCode);
    setCustomDepartmentName(userProfile.customDepartmentName || "");
    setPrimaryInterest(userProfile.primaryInterest);
    setSkillLevel(userProfile.skillLevel);
    setTargetTimelineWeeks(userProfile.targetTimelineWeeks || 16);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedProfile = {
      name,
      institution,
      academicLevel,
      facultyCode,
      departmentCode,
      customDepartmentName,
      primaryInterest,
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
          fullName: name || "Researcher",
          institution: institution || "University Scholar",
          facultyCode,
          departmentCode: departmentCode === "OTHER" ? (customDepartmentName || "Custom Department") : departmentCode,
          primaryInterest,
          academicLevel,
          skillLevel,
        }),
      });
    } catch (err) {
      console.warn("Notice: profile sync to database", err);
    }
  };

  // If not completed onboarding yet, always keep modal visible
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
          {hasCompletedOnboarding && (
            <button
              onClick={() => setShowOnboardingModal(false)}
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
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
                  {t("onboarding.nameLabel")}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t("onboarding.namePlaceholder")}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-cyan-400 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {t("onboarding.institutionLabel")}
                </label>
                <input
                  type="text"
                  required
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
                  required
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

          {/* Step 3: Research Focus & Skill */}
          <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-cyan-400 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-cyan-950 text-indigo-700 dark:text-cyan-300 flex items-center justify-center text-[11px]">3</span>
              {t("onboarding.step3")}
            </h4>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {t("onboarding.interestLabel")}
              </label>
              <input
                type="text"
                required
                value={primaryInterest}
                onChange={(e) => setPrimaryInterest(e.target.value)}
                placeholder={t("onboarding.interestPlaceholder")}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-cyan-400"
              />
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
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
            {hasCompletedOnboarding && (
              <button
                type="button"
                onClick={() => setShowOnboardingModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
              >
                {t("onboarding.btnCancel")}
              </button>
            )}
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 hover:from-indigo-700 hover:to-cyan-600 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 transition-all"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{t("onboarding.btnSave")}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
