"use client";

import React, { useState } from "react";
import { Clock, CheckSquare, Square, Eye, BookOpen, Wrench, Sparkles, ArrowRight } from "lucide-react";

export function ThreePassReader() {
  const [activePass, setActivePass] = useState<number>(1);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const passes = [
    {
      passNumber: 1,
      name: "Pass 1: The Bird's-Eye View",
      subtitle: "Grasp the big picture in 5 to 10 minutes",
      duration: "5 - 10 Minutes",
      icon: Eye,
      description: "Quickly scan the architecture of the paper to answer the 5 C's: Category, Context, Correctness, Contributions, and Clarity. Decide if you need to read further.",
      checkpoints: [
        { id: "p1-1", text: "Carefully read the Title, Abstract, and Introduction opening." },
        { id: "p1-2", text: "Read section and sub-section headings to understand paper structure." },
        { id: "p1-3", text: "Read the Conclusions and Future Work section." },
        { id: "p1-4", text: "Glance at the References, ticking off ones you already recognize." },
        { id: "p1-5", text: "Classify paper into category (empirical, theoretical, survey, benchmark)." }
      ],
      decisionQuestion: "At the end of Pass 1: Should I read this paper in depth, file it away, or discard it?"
    },
    {
      passNumber: 2,
      name: "Pass 2: Grasp the Content",
      subtitle: "Understand key mechanisms in roughly 1 hour",
      duration: "1 Hour",
      icon: BookOpen,
      description: "Read the paper with greater care, paying special attention to graphs, figures, and statistical tables. Mark uncomprehended proofs or math for Pass 3.",
      checkpoints: [
        { id: "p2-1", text: "Examine figures and diagrams carefully. Are axes properly labeled? Are error bars present?" },
        { id: "p2-2", text: "Underline unread references for background reading." },
        { id: "p2-3", text: "Annotate questions, questionable assumptions, or confusing mathematical equations in margins." },
        { id: "p2-4", text: "Summarize the main thesis of the paper in 1-2 sentences in your own words." }
      ],
      decisionQuestion: "At the end of Pass 2: Do I understand the main mechanisms well enough to cite it, or do I need to re-implement it?"
    },
    {
      passNumber: 3,
      name: "Pass 3: Deep Critique & Re-implementation",
      subtitle: "Virtually re-create the study in 2 to 3 hours",
      duration: "2 - 3 Hours",
      icon: Wrench,
      description: "The key to mastering a paper: virtually re-implement it. Attempt to recreate the author's experiment, identifying implicit assumptions and unstated edge cases.",
      checkpoints: [
        { id: "p3-1", text: "Assume the author's hypothesis and mentally reconstruct the experiment step by step." },
        { id: "p3-2", text: "Identify hidden assumptions that may fail in realistic or developing world constraints (e.g. Bangladesh low-resource settings)." },
        { id: "p3-3", text: "Check reproducibility: is the code or dataset publicly linked and executable?" },
        { id: "p3-4", text: "Draft ideas for how your own thesis could extend, improve, or contradict their findings." }
      ],
      decisionQuestion: "At the end of Pass 3: You now know the paper from the inside out and can formulate your own thesis contribution upon it!"
    }
  ];

  const currentPass = passes.find((p) => p.passNumber === activePass) || passes[0];
  const Icon = currentPass.icon;

  return (
    <div className="space-y-6">
      {/* Step Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {passes.map((p) => {
          const PIcon = p.icon;
          const isActive = activePass === p.passNumber;
          return (
            <button
              key={p.passNumber}
              onClick={() => setActivePass(p.passNumber)}
              className={`p-4 rounded-xl text-left border transition-all flex items-start gap-3 ${
                isActive
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/20 dark:bg-cyan-500 dark:text-slate-950 dark:border-cyan-500"
                  : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-cyan-800"
              }`}
            >
              <div className={`p-2 rounded-lg shrink-0 ${isActive ? "bg-white/20 text-white dark:text-slate-950" : "bg-indigo-50 dark:bg-slate-800 text-indigo-600 dark:text-cyan-400"}`}>
                <PIcon className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <span className="text-xs font-bold block">{p.name}</span>
                <span className={`text-[11px] block ${isActive ? "text-indigo-100 dark:text-slate-900" : "text-slate-500 dark:text-slate-400"}`}>
                  {p.duration}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Pass Stage View */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-cyan-400 flex items-center justify-center">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {currentPass.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {currentPass.subtitle}
              </p>
            </div>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <Clock className="w-3.5 h-3.5 text-indigo-500 dark:text-cyan-400" />
            <span>Target Duration: {currentPass.duration}</span>
          </div>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          {currentPass.description}
        </p>

        {/* Interactive Checkpoints */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Interactive Pass Checkpoints (Click to track progress):
          </h4>
          <div className="space-y-2">
            {currentPass.checkpoints.map((cp) => {
              const isChecked = Boolean(checkedItems[cp.id]);
              return (
                <div
                  key={cp.id}
                  onClick={() => toggleCheck(cp.id)}
                  className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    isChecked
                      ? "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/40 text-emerald-900 dark:text-emerald-200"
                      : "bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-indigo-300 dark:hover:border-cyan-800"
                  }`}
                >
                  <button className="mt-0.5 shrink-0 text-indigo-600 dark:text-cyan-400">
                    {isChecked ? (
                      <CheckSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-400" />
                    )}
                  </button>
                  <span className={`text-xs ${isChecked ? "line-through opacity-80" : ""}`}>
                    {cp.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Decision Box */}
        <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200/60 dark:border-indigo-900/40 text-xs">
          <span className="font-bold text-indigo-800 dark:text-cyan-300 block mb-1 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-600 dark:text-cyan-400" />
            Decision Milestone:
          </span>
          <p className="text-slate-700 dark:text-slate-300">
            {currentPass.decisionQuestion}
          </p>
        </div>
      </div>
    </div>
  );
}
