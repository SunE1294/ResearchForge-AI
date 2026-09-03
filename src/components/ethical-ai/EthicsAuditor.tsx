"use client";

import React from "react";
import { ShieldCheck, ShieldAlert, CheckCircle2, XCircle, AlertTriangle, FileSearch } from "lucide-react";

export function EthicsAuditor() {
  const dos = [
    {
      title: "Grammar & Phrasing Refinement",
      desc: "Using AI to refine grammatical accuracy, eliminate passive voice, and improve English fluency of your own original concepts."
    },
    {
      title: "Boolean Query Formulation",
      desc: "Employing LLMs to brainstorm synonyms, keywords, and Boolean search strings for searching literature databases."
    },
    {
      title: "Syntax Debugging & Code Comments",
      desc: "Asking AI to explain runtime compiler exceptions or help format documentation strings for your custom scripts."
    },
    {
      title: "Transparent Academic Disclosure",
      desc: "Formally declaring the specific model version and exact role of AI in the methodology or acknowledgements section."
    }
  ];

  const donts = [
    {
      title: "Automated Literature Review Generation",
      desc: "Letting AI generate literature summaries without manually reading the original cited papers (risk of hallucinated DOIs and nonexistent papers)."
    },
    {
      title: "AI Ghostwriting of Methodology or Results",
      desc: "Having an LLM draft novel conclusions or experimental findings that you did not personally verify through code or data."
    },
    {
      title: "Submitting Private Research Data to Public Models",
      desc: "Pasting confidential medical records, patient data, or proprietary source code into public AI chats without anonymization."
    },
    {
      title: "Bypassing Turnitin via AI Paraphrasing Spinners",
      desc: "Using Quillbot or word-spinners to disguise copied material. Turnitin's perplexity and burstiness filters actively flag these patterns."
    }
  ];

  return (
    <div className="space-y-6 text-xs">
      {/* Side-by-Side Dos and Don'ts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Permissible */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900/40 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-emerald-100 dark:border-emerald-900/30">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                Permissible & Ethical AI Usage
              </h4>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                Accepted by IEEE, Elsevier & DIU Guidelines
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {dos.map((item, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-800 dark:text-slate-200 block">
                    {item.title}
                  </span>
                  <span className="text-slate-600 dark:text-slate-400 leading-relaxed block mt-0.5">
                    {item.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Prohibited */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900/40 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-rose-100 dark:border-rose-900/30">
            <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                Prohibited & Risky AI Practices
              </h4>
              <span className="text-[11px] text-rose-600 dark:text-rose-400 font-semibold">
                Subject to Immediate Thesis Disqualification
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {donts.map((item, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-800 dark:text-slate-200 block">
                    {item.title}
                  </span>
                  <span className="text-slate-600 dark:text-slate-400 leading-relaxed block mt-0.5">
                    {item.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Turnitin Insights Box */}
      <div className="p-5 rounded-2xl bg-slate-900 text-slate-200 border border-slate-800 space-y-3">
        <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
          <FileSearch className="w-4 h-4" />
          <span>Turnitin AI Detection Mechanics: What Supervisors Look For</span>
        </div>
        <p className="text-slate-300 leading-relaxed">
          University examination committees utilize Turnitin's AI Writing Report alongside traditional similarity indices. Turnitin flags content with abnormally low perplexity (uniform sentence cadence) and low burstiness. If your manuscript is flagged with &gt; 20% AI generated text, supervisors will scrutinize your oral viva-voce questioning to ensure you authored the underlying logic.
        </p>
      </div>
    </div>
  );
}
