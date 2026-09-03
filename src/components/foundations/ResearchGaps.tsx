"use client";

import React from "react";
import { GitFork, AlertTriangle, Users, Cpu, ArrowRight } from "lucide-react";

export function ResearchGaps() {
  const gapTypes = [
    {
      title: "1. Contradictory Findings Gap",
      icon: GitFork,
      badge: "Theoretical Conflict",
      description: "When two reputable published studies investigate the same phenomenon but reach conflicting or incompatible conclusions.",
      example: "Study A reports that Transformer self-attention improves diagnostic accuracy on lung CTs, while Study B shows CNNs generalize better across multi-site hospital datasets due to smaller inductive bias.",
      thesisOpportunity: "Conduct a rigorous cross-domain controlled benchmark comparing both architectures on a standardized benchmark to discover the exact boundary conditions."
    },
    {
      title: "2. Methodological Gap",
      icon: Cpu,
      badge: "Algorithmic / Protocol Limitation",
      description: "When prior work solved a problem, but used an outdated, computationally prohibitive, or flawed methodology.",
      example: "Previous researchers required 8x A100 GPUs (unusable in developing country hospitals) or relied solely on synthetic lab data with no clinical validation.",
      thesisOpportunity: "Develop a quantized, low-parameter model (e.g. MobileNet/LoRA) that maintains 95%+ of the performance while running on consumer-grade hardware."
    },
    {
      title: "3. Contextual & Population Gap",
      icon: Users,
      badge: "Demographic / Regional Neglect",
      description: "When a theory or algorithm has been validated in Western/High-income cohorts, but has never been evaluated in regional contexts (such as Bangladesh or South Asia).",
      example: "Clinical risk scoring algorithms calibrated on US Caucasian populations fail significantly when applied to Bengali epidemiological patterns and dietary lifestyles.",
      thesisOpportunity: "Collect a localized ethical dataset and re-calibrate/fine-tune the predictive model specifically for the Bangladeshi population."
    },
    {
      title: "4. Technology Under-Exploration Gap",
      icon: AlertTriangle,
      badge: "Emerging Frontier",
      description: "When a major technological breakthrough has emerged in computer science (e.g. State-Space Models / Mamba / Multimodal RAG) but has not yet been applied to a specific domain.",
      example: "Traditional legal research or environmental disaster prediction still relies on simple keyword searching or static regression models.",
      thesisOpportunity: "Pioneer the application of Multimodal Retrieval-Augmented Generation (RAG) to the Laws of Bangladesh or riverbank flood monitoring."
    }
  ];

  return (
    <div className="space-y-6">
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
        <span className="font-bold text-slate-900 dark:text-white block mb-1">
          The 4 Archetypal Research Gaps
        </span>
        <p className="text-slate-600 dark:text-slate-400">
          Faculty review committees approve theses based on a clearly formulated gap. Locate which quadrant best fits your research problem.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {gapTypes.map((gap, idx) => {
          const Icon = gap.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 flex flex-col justify-between text-xs"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-cyan-300 border border-indigo-200/50 dark:border-indigo-900/50">
                    {gap.badge}
                  </span>
                  <Icon className="w-4 h-4 text-indigo-600 dark:text-cyan-400" />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                  {gap.title}
                </h4>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {gap.description}
                </p>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 text-[11px] space-y-1">
                  <span className="font-bold text-slate-700 dark:text-slate-300 block">Real-World Case Example:</span>
                  <p className="text-slate-600 dark:text-slate-400 italic">"{gap.example}"</p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                <span className="font-bold text-emerald-700 dark:text-emerald-400 block text-[11px] mb-0.5 flex items-center gap-1">
                  <ArrowRight className="w-3.5 h-3.5" />
                  Your Thesis Opportunity:
                </span>
                <p className="text-slate-700 dark:text-slate-300 text-[11px]">
                  {gap.thesisOpportunity}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
