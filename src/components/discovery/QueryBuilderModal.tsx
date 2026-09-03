"use client";

import React, { useState } from "react";
import { useResearchStore } from "@/store/useResearchStore";
import { useI18n } from "@/lib/i18n";
import { Sparkles, Copy, Check, X, ArrowRight, Database } from "lucide-react";

interface QueryBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyQuery: (query: string) => void;
}

export function QueryBuilderModal({ isOpen, onClose, onApplyQuery }: QueryBuilderModalProps) {
  const { userProfile, locale } = useResearchStore();
  const { t } = useI18n(locale);

  const [topic, setTopic] = useState(userProfile.primaryInterest || "");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    booleanString: string;
    keywords: string[];
    suggestedDatabases: string[];
    explanation: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/ai/query-builder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          departmentCode: userProfile.departmentCode,
        }),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error("Error generating query:", err);
    } finally {
      setLoading(false);
    }
  };

  const copyQuery = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.booleanString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
      <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-5 animate-in fade-in zoom-in-95 duration-200 text-xs">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 dark:bg-cyan-500 text-white dark:text-slate-950 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Boolean Query Assistant (Gemini AI)
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Transforms conversational topic ideas into database-ready Boolean search strings.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Input */}
        <form onSubmit={handleGenerate} className="space-y-3">
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Your Thesis Topic or Working Question:
            </label>
            <textarea
              rows={3}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. How can deep learning algorithms detect early-stage diabetic retinopathy in resource-constrained rural clinics?"
              className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-cyan-400 text-xs"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 dark:bg-cyan-500 dark:hover:bg-cyan-600 text-white dark:text-slate-950 font-bold flex items-center justify-center gap-2 shadow transition"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{loading ? "Generating Boolean String..." : "Synthesize Boolean Search"}</span>
          </button>
        </form>

        {/* Output */}
        {result && (
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-indigo-200 dark:border-indigo-900/50 space-y-3">
            <div>
              <span className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Synthesized Boolean Query:
              </span>
              <div className="p-3 rounded-lg bg-slate-900 text-cyan-300 font-mono text-[11px] break-all border border-slate-800">
                {result.booleanString}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={copyQuery}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold hover:bg-slate-300 dark:hover:bg-slate-600 transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied!" : "Copy Boolean String"}</span>
              </button>

              <button
                onClick={() => {
                  onApplyQuery(result.booleanString);
                  onClose();
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 dark:bg-cyan-500 text-white dark:text-slate-950 font-semibold transition shadow-sm"
              >
                <ArrowRight className="w-3.5 h-3.5" />
                <span>Search in Discovery Pipeline</span>
              </button>
            </div>

            {/* Suggested Databases */}
            {result.suggestedDatabases && result.suggestedDatabases.length > 0 && (
              <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex items-center gap-2 flex-wrap text-[11px]">
                <Database className="w-3.5 h-3.5 text-indigo-500 dark:text-cyan-400" />
                <span className="font-semibold text-slate-600 dark:text-slate-400">Target Databases:</span>
                {result.suggestedDatabases.map((db, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-medium">
                    {db}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
