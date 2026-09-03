"use client";

import React, { useState } from "react";
import { useResearchStore } from "@/store/useResearchStore";
import { useI18n } from "@/lib/i18n";
import { getDepartmentByCode } from "@/data/taxonomy";
import { MilestoneTask, ThesisMilestones } from "@/types";
import confetti from "canvas-confetti";
import {
  Sparkles,
  CheckCircle2,
  Circle,
  Download,
  FileJson,
  Printer,
  Calendar,
  AlertCircle,
  HelpCircle,
  Layers,
  ArrowRight
} from "lucide-react";

export function MilestoneGenerator() {
  const { userProfile, locale, currentRoadmap, setCurrentRoadmap, toggleTaskCompletion } = useResearchStore();
  const { t } = useI18n(locale);

  const deptInfo = getDepartmentByCode(userProfile.departmentCode);

  const [problemStatement, setProblemStatement] = useState(
    currentRoadmap?.problemStatement ||
      "Early diagnosis of chronic diseases is severely bottlenecked in developing economies due to limited specialist radiologists and lack of lightweight computational models."
  );
  const [researchGap, setResearchGap] = useState(
    currentRoadmap?.researchGap ||
      "Existing vision transformer architectures require excessive VRAM (unusable on low-cost hardware) and have not been benchmarked on regional clinical cohorts."
  );
  const [objectives, setObjectives] = useState(
    currentRoadmap?.objectives?.join("\n") ||
      "1. Curate and preprocess multi-institutional benchmark dataset\n2. Formulate lightweight quantized vision model (< 15M parameters)\n3. Perform ablation study and statistical significance evaluation"
  );
  const [timelineWeeks, setTimelineWeeks] = useState(currentRoadmap?.timelineWeeks || userProfile.targetTimelineWeeks || 16);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    const parsedObjectives = objectives
      .split("\n")
      .map((o) => o.trim())
      .filter(Boolean);

    try {
      const res = await fetch("/api/ai/roadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          problemStatement,
          researchGap,
          objectives: parsedObjectives,
          timelineWeeks,
          departmentCode: userProfile.departmentCode,
        }),
      });

      const data = await res.json();
      if (data.tasks) {
        const newRoadmap: ThesisMilestones = {
          id: `roadmap-${Date.now()}`,
          title: `Thesis Roadmap: ${deptInfo?.name || "Academic Research"}`,
          problemStatement,
          researchGap,
          objectives: parsedObjectives,
          timelineWeeks,
          departmentCode: userProfile.departmentCode,
          tasks: data.tasks,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        setCurrentRoadmap(newRoadmap);
      }
    } catch (err) {
      console.error("Error generating roadmap:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  const tasks = currentRoadmap?.tasks || [];
  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const handleToggle = (taskId: string) => {
    toggleTaskCompletion(taskId);
    if (completedCount + 1 === totalCount) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const exportMarkdown = () => {
    if (!currentRoadmap) return;
    const content = `# ${currentRoadmap.title}
**Discipline**: ${deptInfo?.name} (${deptInfo?.code})
**Institution**: ${userProfile.institution}
**Timeline**: ${currentRoadmap.timelineWeeks} Weeks
**Generated**: ${new Date(currentRoadmap.createdAt).toLocaleDateString()}

## Problem Statement
${currentRoadmap.problemStatement}

## Research Gap
${currentRoadmap.researchGap}

## Research Objectives
${currentRoadmap.objectives.map((o, i) => `${i + 1}. ${o}`).join("\n")}

## Execution Milestones (${progressPercent}% Completed)
${currentRoadmap.tasks
  .map(
    (t) =>
      `### [${t.completed ? "x" : " "}] ${t.title} (${t.estimatedWeeks})
- **Phase**: ${t.phaseName}
- **Deliverable**: ${t.deliverable}
- **Advisor Check-In**: ${t.advisorCheckin ? "Yes" : "No"}
- **Description**: ${t.description}
${t.tips.map((tip) => `  - Tip: ${tip}`).join("\n")}`
  )
  .join("\n\n")}`;

    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `thesis_roadmap_${userProfile.departmentCode}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportJson = () => {
    if (!currentRoadmap) return;
    const blob = new Blob([JSON.stringify(currentRoadmap, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `thesis_roadmap_${userProfile.departmentCode}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 text-xs">
      {/* Parameter Ingestion Form */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600 dark:text-cyan-400" />
              <span>{t("milestones.title")}</span>
            </h3>
            <p className="text-slate-500 dark:text-slate-400 mt-0.5">
              {t("milestones.subtitle")}
            </p>
          </div>
          {deptInfo && (
            <span className="hidden sm:inline-block px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-cyan-300 border border-indigo-200 dark:border-indigo-900">
              {deptInfo.code} • {deptInfo.archetype}
            </span>
          )}
        </div>

        <form onSubmit={handleGenerate} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {t("milestones.problemLabel")}
              </label>
              <textarea
                rows={3}
                required
                value={problemStatement}
                onChange={(e) => setProblemStatement(e.target.value)}
                placeholder={t("milestones.problemPlaceholder")}
                className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-cyan-400"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {t("milestones.gapLabel")}
              </label>
              <textarea
                rows={3}
                required
                value={researchGap}
                onChange={(e) => setResearchGap(e.target.value)}
                placeholder={t("milestones.gapPlaceholder")}
                className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-cyan-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {t("milestones.objectivesLabel")}
              </label>
              <textarea
                rows={3}
                required
                value={objectives}
                onChange={(e) => setObjectives(e.target.value)}
                placeholder={t("milestones.objectivesPlaceholder")}
                className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-cyan-400"
              />
            </div>

            <div className="space-y-3">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {t("milestones.timelineLabel")}
                </label>
                <select
                  value={timelineWeeks}
                  onChange={(e) => setTimelineWeeks(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-cyan-400 font-semibold"
                >
                  <option value={16}>16 Weeks (1-Semester Final)</option>
                  <option value={24}>24 Weeks (2-Semester Capstone)</option>
                  <option value={52}>52 Weeks (1-Year Master's)</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isGenerating}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 dark:from-cyan-500 dark:to-blue-500 text-white dark:text-slate-950 font-bold shadow-lg shadow-indigo-500/20 transition-all flex items-center justify-center gap-2 mt-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isGenerating ? t("milestones.generating") : t("milestones.btnGenerate")}</span>
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Generated Roadmap Display */}
      {tasks.length > 0 && (
        <div className="space-y-6">
          {/* Milestone Header & Progress Bar */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                    {currentRoadmap?.title}
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                    {completedCount} / {totalCount} Done
                  </span>
                </div>
                <p className="text-slate-500 text-xs mt-0.5">
                  Click any checkbox below to update your completion status.
                </p>
              </div>

              {/* Exports */}
              <div className="flex items-center gap-2">
                <button
                  onClick={exportMarkdown}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Markdown</span>
                </button>
                <button
                  onClick={exportJson}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold transition"
                >
                  <FileJson className="w-3.5 h-3.5" />
                  <span>JSON</span>
                </button>
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 dark:bg-cyan-500 text-white dark:text-slate-950 font-bold hover:opacity-90 transition"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print View</span>
                </button>
              </div>
            </div>

            {/* Visual Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-700 dark:text-slate-300">{t("milestones.progressTitle")}</span>
                <span className="text-indigo-600 dark:text-cyan-400">{progressPercent}%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-500 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Gantt-Style Interactive Task Cards */}
          <div className="space-y-3">
            {tasks.map((task: MilestoneTask, idx: number) => {
              return (
                <div
                  key={task.id}
                  className={`p-5 rounded-2xl border transition-all space-y-3 ${
                    task.completed
                      ? "bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800/60 opacity-80"
                      : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm hover:border-indigo-300 dark:hover:border-cyan-800"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() => handleToggle(task.id)}
                        className="mt-0.5 shrink-0 text-indigo-600 dark:text-cyan-400 focus:outline-none"
                      >
                        {task.completed ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        ) : (
                          <Circle className="w-5 h-5 text-slate-300 hover:text-indigo-500" />
                        )}
                      </button>

                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-cyan-300">
                            {locale === "bn" ? task.phaseNameBn : task.phaseName}
                          </span>
                          <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-500">
                            <Calendar className="w-3 h-3" />
                            {task.estimatedWeeks}
                          </span>
                          {task.advisorCheckin && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900/50 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              {t("milestones.advisorCheckin")}
                            </span>
                          )}
                        </div>

                        <h4 className={`text-sm font-bold ${task.completed ? "line-through text-slate-500" : "text-slate-900 dark:text-white"}`}>
                          {locale === "bn" ? task.titleBn : task.title}
                        </h4>

                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xs">
                          {locale === "bn" ? task.descriptionBn : task.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Deliverable Pill & Tips */}
                  <div className="pt-2 pl-8 border-t border-slate-100 dark:border-slate-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px]">
                    <div className="text-slate-700 dark:text-slate-300">
                      <span className="font-bold text-indigo-600 dark:text-cyan-400">Target Deliverable:</span>{" "}
                      {task.deliverable}
                    </div>

                    {task.tips && task.tips.length > 0 && (
                      <div className="text-slate-500 italic">
                        💡 {task.tips[0]}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
