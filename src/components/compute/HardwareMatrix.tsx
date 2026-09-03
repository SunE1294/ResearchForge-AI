"use client";

import React, { useState } from "react";
import { useResearchStore } from "@/store/useResearchStore";
import { CLOUD_RUNTIMES, STUDENT_OPTIMIZATION_TIPS } from "@/data/hardware";
import { Cpu, ExternalLink, Zap, CheckCircle2, Code2, Copy, Check } from "lucide-react";

export function HardwareMatrix() {
  const { locale } = useResearchStore();
  const [copiedSnippetId, setCopiedSnippetId] = useState<string | null>(null);

  const copyCode = (id: string, code?: string) => {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopiedSnippetId(id);
    setTimeout(() => setCopiedSnippetId(null), 2000);
  };

  return (
    <div className="space-y-8 text-xs">
      {/* Free Cloud Runtime Tiers */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-2">
          <Cpu className="w-4 h-4 text-indigo-600 dark:text-cyan-400" />
          <span>{locale === "bn" ? "বিনা মূল্যের হাই-পারফরম্যান্স ক্লাউড ও জিপিইউ পরিবেশ" : "Zero-Cost High-Performance Cloud Environments"}</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CLOUD_RUNTIMES.map((runtime) => (
            <div
              key={runtime.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white text-sm">
                    {runtime.name}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-cyan-300">
                    {runtime.provider}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1">
                  <div className="text-slate-700 dark:text-slate-300">
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {locale === "bn" ? "স্পেসিফিকেশন:" : "Specs:"}
                    </span>{" "}
                    {runtime.freeTierSpecs}
                  </div>
                  <div className="text-indigo-600 dark:text-cyan-400 font-medium">
                    <span className="font-semibold">
                      {locale === "bn" ? "সাপ্তাহিক বরাদ্দ:" : "Allowance:"}
                    </span>{" "}
                    {runtime.weeklyAllowance}
                  </div>
                </div>

                <div className="space-y-1 pt-1">
                  <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block">
                    {locale === "bn" ? "প্রধান সুবিধাসমূহ:" : "Pros:"}
                  </span>
                  <ul className="space-y-0.5">
                    {runtime.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-slate-600 dark:text-slate-400 text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 italic max-w-[200px] truncate">
                  {locale === "bn" ? runtime.idealForBn : runtime.idealFor}
                </span>

                <a
                  href={runtime.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 dark:bg-cyan-500 text-white dark:text-slate-950 font-bold hover:opacity-90 transition"
                >
                  <span>{locale === "bn" ? "ক্লাউড সেশন চালু করুন" : "Launch Cloud Runtime"}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* VRAM Memory Hacks & Optimization Snippets */}
      <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500" />
            <span>{locale === "bn" ? "লো-ভিআরএএম (Low-VRAM) পাইটর্চ মেমোরি হ্যাকস ও কোড স্নিপেট" : "Low-VRAM PyTorch Memory Optimization Snippets"}</span>
          </h3>
          <p className="text-slate-500 text-[11px] mt-0.5">
            {locale === "bn"
              ? "CUDA Out of Memory (OOM) সমস্যা এড়াতে এবং ফ্রি T4 GPU-তে বড় মডেল ট্রেইন করতে নিচের পাইথন কোডগুলো ব্যবহার করুন।"
              : "Practical copy-paste snippets to eliminate CUDA Out of Memory (OOM) runtime errors on free 15GB T4 GPUs."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {STUDENT_OPTIMIZATION_TIPS.map((tip) => (
            <div
              key={tip.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-indigo-500 dark:text-cyan-400" />
                  {locale === "bn" ? tip.titleBn : tip.title}
                </span>
              </div>

              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[11px]">
                {locale === "bn" ? tip.explanationBn : tip.explanation}
              </p>

              {tip.codeSnippet && (
                <div className="relative rounded-xl overflow-hidden bg-slate-950 text-slate-100 p-3 font-mono text-[11px]">
                  <button
                    onClick={() => copyCode(tip.id, tip.codeSnippet)}
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition flex items-center gap-1 text-[10px]"
                  >
                    {copiedSnippetId === tip.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">{locale === "bn" ? "কপি হয়েছে" : "Copied"}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>{locale === "bn" ? "কোড কপি" : "Copy"}</span>
                      </>
                    )}
                  </button>
                  <pre className="overflow-x-auto pr-12 pt-1">{tip.codeSnippet}</pre>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
