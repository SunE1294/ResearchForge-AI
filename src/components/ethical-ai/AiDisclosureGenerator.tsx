"use client";

import React, { useState } from "react";
import { useResearchStore } from "@/store/useResearchStore";
import { Sparkles, Copy, Check, FileCheck, Info } from "lucide-react";

export function AiDisclosureGenerator() {
  const { locale } = useResearchStore();
  const [modelName, setModelName] = useState("Google Gemini 1.5 Pro & Flash");
  const [assistGrammar, setAssistGrammar] = useState(true);
  const [assistCode, setAssistCode] = useState(true);
  const [assistSearch, setAssistSearch] = useState(true);
  const [assistIdeation, setAssistIdeation] = useState(false);
  const [copied, setCopied] = useState(false);

  // Generate structured academic statement
  const tasksSelected: string[] = [];
  if (assistGrammar) tasksSelected.push(locale === "bn" ? "প্রুফরিডিং, ব্যাকরণগত ভুল সংশোধন এবং বাক্যের সাবলীলতা বৃদ্ধি" : "proofreading, grammar correction, and phrasing enhancement");
  if (assistCode) tasksSelected.push(locale === "bn" ? "প্রযুক্তিগত স্ক্রিপ্ট ডিবাগিং এবং সিনট্যাক্স এরর ডায়াগনস্টিকস" : "technical script debugging and syntax error diagnostics");
  if (assistSearch) tasksSelected.push(locale === "bn" ? "একাডেমিক ডাটাবেজে সার্চ করার জন্য বুলিয়ান কুয়েরি স্ট্রিং তৈরি" : "Boolean keyword structuring for academic database search queries");
  if (assistIdeation) tasksSelected.push(locale === "bn" ? "বিকল্প মেথডলজি ট্যাক্সোনমির ব্রেনস্টর্মিং" : "brainstorming alternative methodology taxonomies");

  const taskPhrase = tasksSelected.length > 0
    ? tasksSelected.join(locale === "bn" ? "; " : "; ")
    : (locale === "bn" ? "কোনো কৃত্রিম লেখা তৈরি করা হয়নি" : "no automated text generation");

  const generatedStatementEn = `Statement on the Use of Generative Artificial Intelligence:

During the preparation of this thesis, the author(s) utilized ${modelName} in order to assist with ${taskPhrase}. After using this tool/service, the author(s) reviewed and edited the content as needed and take full academic and legal responsibility for the validity, integrity, and authenticity of the final publication and experimental outcomes. No generative AI system was utilized to synthesize raw scientific findings, fabricate experimental data, or ghostwrite original analytical conclusions.`;

  const generatedStatementBn = `জেনারেটিভ কৃত্রিম বুদ্ধিমত্তা (AI) ব্যবহারের আনুষ্ঠানিক বিবৃতি:

এই থিসিস প্রস্তুতকালে লেখক(গণ) ${taskPhrase}-এর উদ্দেশ্যে ${modelName} সহায়তা হিসেবে ব্যবহার করেছেন। এই টুল ব্যবহারের পর, লেখক(গণ) সামগ্রিক বিষয়বস্তু ব্যক্তিগতভাবে পর্যালোচনা ও পরিমার্জন করেছেন এবং চূড়ান্ত ফলাফল, সত্যতা ও গবেষণার স্বচ্ছতার পূর্ণ অ্যাকাডেমিক দায়িত্ব গ্রহণ করেছেন। কোনো কাঁচা বৈজ্ঞানিক ফলাফল তৈরি, কাল্পনিক তথ্য উদ্ভাবন বা মৌলিক বিশ্লেষণাত্মক সিদ্ধান্ত জেনারেট করতে কৃত্রিম বুদ্ধিমত্তার আশ্রয় নেওয়া হয়নি।`;

  const generatedStatement = locale === "bn" ? generatedStatementBn : generatedStatementEn;

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
            {locale === "bn" ? "ইন্টারঅ্যাক্টিভ থিসিস এআই ডিসক্লোজার স্টেটমেন্ট জেনারেটর" : "Interactive Thesis AI Disclosure Statement Generator"}
          </h4>
          <span className="text-[11px] text-slate-500">
            {locale === "bn"
              ? "আন্তর্জাতিক জার্নাল (Elsevier, IEEE, Springer) মেথডলজি বা অ্যাকনলেজমেন্ট সেকশনে এই বিবৃতি বাধ্যতামূলক করেছে।"
              : "Publishers (Elsevier, IEEE, Springer) mandate this statement in the Methodology or Acknowledgements section."}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Configurations */}
        <div className="space-y-4">
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {locale === "bn" ? "ব্যবহৃত জেনারেটিভ এআই মডেল:" : "Generative AI Tool / Model Employed:"}
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
              {locale === "bn" ? "অনুমোদিত এআই সহায়তার ক্ষেত্রগুলো নির্বাচন করুন:" : "Select Verified AI Assistance Functions:"}
            </span>

            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={assistGrammar}
                onChange={(e) => setAssistGrammar(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-slate-700 dark:text-slate-300">
                {locale === "bn" ? "ব্যাকরণ পরিমার্জন, বাক্যের সাবলীলতা ও প্রুফরিডিং" : "Grammar polishing, sentence fluency, and proofreading"}
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
                {locale === "bn" ? "কোড সিনট্যাক্স ডিবাগিং এবং রানটাইম এরর ব্যাখ্যা" : "Code syntax debugging and runtime error explanations"}
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
                {locale === "bn" ? "লিটারেচার সার্চের জন্য বুলিয়ান কুয়েরি সমার্থক শব্দ গঠন" : "Boolean query synonym formulation for literature search"}
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
                {locale === "bn" ? "গবেষণাপদ্ধতির বিকল্প ট্যাক্সোনমি ব্রেনস্টর্মিং" : "Brainstorming alternative methodology taxonomies"}
              </span>
            </label>
          </div>

          <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 flex items-start gap-2 text-[11px] text-blue-800 dark:text-blue-300">
            <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
            <span>
              {locale === "bn"
                ? "আইইইই এবং এলসেভিয়ার গাইডলাইন অনুসারে এআই-কে কখনো কো-অথর (সহ-লেখক) হিসেবে তালিকাভুক্ত করা যাবে না।"
                : "Per COPE and Elsevier standards: AI tools can never be credited as authors. Only humans who take legal responsibility qualify."}
            </span>
          </div>
        </div>

        {/* Output Preview */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-700 dark:text-slate-300">
              {locale === "bn" ? "প্রস্তুতকৃত প্রকাশনা উপযোগী বিবৃতি:" : "Generated Declaration Text:"}
            </span>
            <button
              onClick={copyToClipboard}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-600 dark:bg-cyan-500 text-white dark:text-slate-950 font-bold hover:opacity-90 transition shadow-sm"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>{locale === "bn" ? "কপি হয়েছে!" : "Copied!"}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{locale === "bn" ? "স্টেটমেন্ট কপি করুন" : "Copy Statement"}</span>
                </>
              )}
            </button>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 font-serif leading-relaxed text-slate-800 dark:text-slate-200 text-xs whitespace-pre-wrap select-all">
            {generatedStatement}
          </div>
        </div>
      </div>
    </div>
  );
}
