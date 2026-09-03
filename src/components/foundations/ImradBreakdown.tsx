"use client";

import React, { useState } from "react";
import { FileText, Cpu, CheckCircle, BarChart3, MessageSquare, AlertCircle } from "lucide-react";

export function ImradBreakdown() {
  const [activeSection, setActiveSection] = useState<string>("intro");

  const sections = [
    {
      id: "intro",
      name: "Introduction: The Funnel",
      icon: FileText,
      purpose: "Establish the importance of the field, cite recent benchmark limitations, identify the specific gap, and declare your novel contributions.",
      structuralFormula: [
        { label: "1. The Broad Hook", text: "Why does this problem matter globally or socioeconomically? (e.g., 'Cardiovascular diseases account for 32% of worldwide mortality...')" },
        { label: "2. The Current Paradigm", text: "What do current state-of-the-art tools or models accomplish? What is the standard baseline?" },
        { label: "3. The Critical Gap", text: "Where do current methods fail? (e.g., computational complexity, lack of low-resource language generalization, overfitting on small cohorts)." },
        { label: "4. The Proposed Novelty", text: "In this paper, we propose [Model/System X] to resolve this limitation through [Novel Mechanism Y]." },
        { label: "5. Bulleted Contributions", text: "Explicitly itemize 3 concrete contributions (novel architecture, verified dataset, empirical superior benchmark)." }
      ],
      commonMistakes: [
        "Writing a history lesson instead of focusing on state-of-the-art literature from the last 3-5 years.",
        "Failing to clearly state the novel contribution in the final paragraphs of the introduction."
      ]
    },
    {
      id: "method",
      name: "Methodology: The Recipe",
      icon: Cpu,
      purpose: "Provide enough rigorous architectural and mathematical detail that another competent researcher could replicate your entire system without contacting you.",
      structuralFormula: [
        { label: "1. Dataset & Acquisition", text: "Source of data, sample size, train/val/test splits, ethical approvals, and institutional oversight." },
        { label: "2. Preprocessing Pipeline", text: "Normalization, missing value imputation, noise filtration, tokenization, or image augmentation." },
        { label: "3. Mathematical Formulation", text: "Formal equations for loss functions, objective matrices, probability distributions, or regression formulas." },
        { label: "4. Architectural Pipeline", text: "Comprehensive block diagram showing data flow from input tensors to output logits or metrics." },
        { label: "5. Hyperparameters & Hardware", text: "Batch size, learning rate schedule, optimizer (AdamW), GPU hardware, and random seeds." }
      ],
      commonMistakes: [
        "Omitting hyperparameter values, random seeds, or train/test split percentages (leading to irreproducibility).",
        "Confusing Results with Methodology: do not include experimental outcome numbers in Chapter 3!"
      ]
    },
    {
      id: "results",
      name: "Results: The Evidence",
      icon: BarChart3,
      purpose: "Present objective, empirical evidence. Compare your system against competitive baselines using rigorous statistical metrics and ablation experiments.",
      structuralFormula: [
        { label: "1. Baseline Comparison", text: "Performance tables comparing proposed method with at least 3-5 established state-of-the-art baselines." },
        { label: "2. Statistical Significance", text: "Report p-values (p < 0.05), confidence intervals (95% CI), or standard deviations across repeated trials (K-Fold)." },
        { label: "3. Ablation Experiments", text: "Disable individual proposed modules one-by-one to prove that each specific component contributes to the improvement." },
        { label: "4. Visual Analytics", text: "High-resolution ROC curves, confusion matrices, loss convergence plots, or qualitative attention heatmaps." }
      ],
      commonMistakes: [
        "Showing tables with no bolded best scores or missing units of measurement.",
        "Speculating on why a result occurred inside the Results section—reserve interpretation for Discussion!"
      ]
    },
    {
      id: "disc",
      name: "Discussion: The Synthesis",
      icon: MessageSquare,
      purpose: "Interpret the empirical findings, reconcile contradictory results with previous literature, acknowledge authentic limitations, and outline future avenues.",
      structuralFormula: [
        { label: "1. Findings in Context", text: "How do your results support or challenge earlier literature cited in the Introduction?" },
        { label: "2. Theoretical / Practical Value", text: "What are the real-world implications for software developers, doctors, engineers, or policymakers?" },
        { label: "3. Candid Limitations", text: "Honest appraisal of constraints (e.g. sample size, compute limits, lack of out-of-distribution evaluation)." },
        { label: "4. Concrete Future Work", text: "2-3 actionable extensions that subsequent researchers can build upon." }
      ],
      commonMistakes: [
        "Merely restating the numbers from the Results section without analytical synthesis.",
        "Hiding obvious limitations—reviewers will catch them; self-acknowledging weaknesses shows academic maturity."
      ]
    }
  ];

  const current = sections.find((s) => s.id === activeSection) || sections[0];
  const Icon = current.icon;

  return (
    <div className="space-y-6">
      {/* Selector Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {sections.map((sec) => (
          <button
            key={sec.id}
            onClick={() => setActiveSection(sec.id)}
            className={`p-3 rounded-xl text-left border text-xs font-semibold transition-all ${
              activeSection === sec.id
                ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/20 dark:bg-cyan-500 dark:text-slate-950 dark:border-cyan-500"
                : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-cyan-800"
            }`}
          >
            <span className="block font-bold text-sm mb-0.5">{sec.name.split(":")[0]}</span>
            <span className={`text-[10px] block opacity-80 ${activeSection === sec.id ? "text-indigo-100 dark:text-slate-900" : "text-slate-500"}`}>
              {sec.name.split(":")[1]}
            </span>
          </button>
        ))}
      </div>

      {/* Anatomy Content Card */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-cyan-400 flex items-center justify-center">
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {current.name}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {current.purpose}
            </p>
          </div>
        </div>

        {/* Structural Formula */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Proven Structural Blueprint:
          </h4>
          <div className="space-y-2">
            {current.structuralFormula.map((step, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-xs">
                <span className="font-bold text-indigo-700 dark:text-cyan-300 block mb-0.5">
                  {step.label}
                </span>
                <span className="text-slate-600 dark:text-slate-300 leading-relaxed block">
                  {step.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Common Pitfalls to Avoid */}
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs space-y-1.5">
          <div className="flex items-center gap-1.5 text-amber-700 dark:text-amber-300 font-bold">
            <AlertCircle className="w-4 h-4" />
            <span>Common Novice Pitfalls to Avoid:</span>
          </div>
          <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300 pl-1">
            {current.commonMistakes.map((mistake, idx) => (
              <li key={idx}>{mistake}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
