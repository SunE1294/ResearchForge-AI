"use client";

import React, { useState } from "react";
import { useResearchStore } from "@/store/useResearchStore";
import { Sparkles, Copy, Check, FileCheck, Info } from "lucide-react";

export function AiDisclosureGenerator() {
  const { userProfile } = useResearchStore();
  const [modelName, setModelName] = useState("Google Gemini 1.5 Pro & Flash");
  const [assistGrammar, setAssistGrammar] = useState(true);
  const [assistCode, setAssistCode] = useState(true);
  const [assistSearch, setAssistSearch] = useState(true);
  const [assistIdeation, setAssistIdeation] = useState(false);
  const [copied, setCopied] = useState(false);

  // Generate structured academic statement
  const tasksSelected: string[] = [];
  if (assistGrammar) tasksSelected.push("proofreading, grammar correction, and phrasing enhancement");
  if (assistCode) tasksSelected.push("technical script debugging and syntax error diagnostics");
  if (assistSearch) tasksSelected.push("Boolean keyword structuring for academic database search queries");
  if (assistIdeation) tasksSelected.push("brainstorming alternative methodology taxonomies");

  const taskPhrase = tasksSelected.length > 0 ? tasksSelected.join("; ") : "no automated text generation";

  const generatedStatement = `Statement on the Use of Generative Artificial Intelligence:

During the preparation of this thesis, the author(s) utilized ${modelName} in order to assist with ${taskPhrase}. After using this tool/service, the author(s) reviewed and edited the content as needed and take full academic and legal responsibility for the validity, integrity, and authenticity of the final publication and experimental outcomes. No generative AI system was utilized to synthesize raw scientific findings, fabricate experimental data, or ghostwrite original analytical conclusions.`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedStatement);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5 text-xs">
      <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="w-8 h-8 rounded-lg bg-indigo-600 dark:bg-cyan-500 text-white dark:text-slate-950 flex items-center justify-center">
          <FileCheck className="w-4 h-4" />
        </div>
        <div>
          <h4 className="font-bold text-slate-900 dark:text-white text-sm">
            Interactive Thesis AI Disclosure Statement Generator
          </h4>
          <span className="text-[11px] text-slate-500">
            Publishers (Elsevier, IEEE, Springer) mandate this statement in the Methodology or Acknowledgements section.
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Configurations */}
        <div className="space-y-4">
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Generative AI Tool / Model Employed:
            </label>
            <select
              value={modelName}
              onChange={(e) => setModelName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
            >
              <option value="Google Gemini 1.5 Pro & Flash">Google Gemini 1.5 Pro & Flash</option>
              <option value="OpenAI GPT-4o">OpenAI GPT-4o</option>
              <option value="Anthropic Claude 3.5 Sonnet">Anthropic Claude 3.5 Sonnet</option>
              <option value="DeepSeek-R1 / V3">DeepSeek-R1 / V3</option>
              <option value="Meta Llama 3 (Self-Hosted)">Meta Llama 3 (Self-Hosted)</option>
            </select>
          </div>

          <div className="space-y-2">
            <span className="block font-semibold text-slate-700 dark:text-slate-300">
              Select Verified AI Assistance Functions:
            </span>

            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={assistGrammar}
                onChange={(e) => setAssistGrammar(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-slate-700 dark:text-slate-300">
                Grammar polishing, sentence fluency, and proofreading
              </span>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={assistCode}
                onChange={(e) => setAssistCode(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-slate-700 dark:text-slate-300">
                Code syntax debugging and runtime error explanations
              </span>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={assistSearch}
                onChange={(e) => setAssistSearch(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-slate-700 dark:text-slate-300">
                Boolean search string keyword formulation for literature databases
              </span>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={assistIdeation}
                onChange={(e) => setAssistIdeation(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-slate-700 dark:text-slate-300">
                Methodology taxonomy brainstorming and outline structuring
              </span>
            </label>
          </div>
        </div>

        {/* Live Output */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-700 dark:text-slate-300">
              Generated Official Statement:
            </span>
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 dark:bg-cyan-500 text-white dark:text-slate-950 font-bold hover:opacity-90 transition shadow-sm"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied!" : "Copy Statement"}</span>
            </button>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs leading-relaxed font-serif italic">
            "{generatedStatement}"
          </div>

          <div className="flex items-start gap-1.5 text-[11px] text-slate-500">
            <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
            <span>
              Paste this verbatim into your thesis manuscript under "Declarations & Acknowledgments" before submitting to the department examination board.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
