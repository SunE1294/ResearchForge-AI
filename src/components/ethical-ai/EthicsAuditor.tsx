"use client";

import React from "react";
import { useResearchStore } from "@/store/useResearchStore";
import { ShieldCheck, ShieldAlert, CheckCircle2, XCircle, AlertTriangle, FileSearch } from "lucide-react";

export function EthicsAuditor() {
  const { locale } = useResearchStore();

  const dos = [
    {
      title: locale === "bn" ? "ব্যাকরণ ও বাক্যের সৌন্দর্য বৃদ্ধি" : "Grammar & Phrasing Refinement",
      desc: locale === "bn"
        ? "নিজের মৌলিক ভাবনাগুলোর ব্যাকরণগত ভুল দূর করা, প্যাসিভ ভয়েস কমানো এবং ইংরেজি লেখার সাবলীলতা বাড়াতে এআই ব্যবহার করা।"
        : "Using AI to refine grammatical accuracy, eliminate passive voice, and improve English fluency of your own original concepts."
    },
    {
      title: locale === "bn" ? "বুলিয়ান সার্চ কুয়েরি গঠন" : "Boolean Query Formulation",
      desc: locale === "bn"
        ? "লিটারেচার ডাটাবেজে (IEEE, PubMed, Scopus) সার্চ করার জন্য সঠিক সমার্থক শব্দ এবং জটিল বুলিয়ান কুয়েরি স্ট্রিং তৈরি করতে এলএলএম-এর সাহায্য নেওয়া।"
        : "Employing LLMs to brainstorm synonyms, keywords, and Boolean search strings for searching literature databases."
    },
    {
      title: locale === "bn" ? "কোড ডিবাগিং ও কমেন্টিং" : "Syntax Debugging & Code Comments",
      desc: locale === "bn"
        ? "রানটাইম কম্পাইলার এরর বা এক্সেপশনের কারণ বুঝতে এবং নিজস্ব স্ক্রিপ্টে যথাযথ ডকুমেন্টেশন কমেন্ট যোগ করতে এআই ব্যবহার করা।"
        : "Asking AI to explain runtime compiler exceptions or help format documentation strings for your custom scripts."
    },
    {
      title: locale === "bn" ? "স্বচ্ছ প্রাতিষ্ঠানিক ঘোষণা (AI Disclosure)" : "Transparent Academic Disclosure",
      desc: locale === "bn"
        ? "মেথডলজি বা অ্যাকনলেজমেন্ট সেকশনে এআই ব্যবহারের সুনির্দিষ্ট মডেল ও পরিধি আনুষ্ঠানিকভাবে ডিক্লেয়ার করা।"
        : "Formally declaring the specific model version and exact role of AI in the methodology or acknowledgements section."
    }
  ];

  const donts = [
    {
      title: locale === "bn" ? "অটোমেটেড লিটারেচার রিভিউ জেনারেশন" : "Automated Literature Review Generation",
      desc: locale === "bn"
        ? "মূল পেপার না পড়ে এআই দিয়ে লিটারেচার সামারি তৈরি করা (এতে ভুয়া ডিওআই এবং কাল্পনিক অস্তিত্বহীন রেফারেন্স আসার ঝুঁকি থাকে)।"
        : "Letting AI generate literature summaries without manually reading the original cited papers (risk of hallucinated DOIs and nonexistent papers)."
    },
    {
      title: locale === "bn" ? "মেথডলজি বা ফলাফল ঘোস্টরাইটিং" : "AI Ghostwriting of Methodology or Results",
      desc: locale === "bn"
        ? "যা আপনি নিজে কোড বা ডেটা দিয়ে পরীক্ষা করেননি, এমন ফলাফল বা চ্যাপ্টার এআই দিয়ে হুবহু লিখিয়ে নেওয়া।"
        : "Having an LLM draft novel conclusions or experimental findings that you did not personally verify through code or data."
    },
    {
      title: locale === "bn" ? "পাবলিক মডেলে গোপন রিসার্চ ডেটা পেস্ট করা" : "Submitting Private Research Data to Public Models",
      desc: locale === "bn"
        ? "হাসপাতালের গোপন মেডিকেল রেকর্ড, রোগীর ব্যক্তিগত তথ্য বা প্রাতিষ্ঠানিক গোপন কোড পাবলিক এআই চ্যাটে উন্মুক্ত করা।"
        : "Pasting confidential medical records, patient data, or proprietary source code into public AI chats without anonymization."
    },
    {
      title: locale === "bn" ? "স্পিনার দিয়ে টার্নিটিন বাইপাস করার চেষ্টা" : "Bypassing Turnitin via AI Paraphrasing Spinners",
      desc: locale === "bn"
        ? "Quillbot বা প্যারাফ্রেজিং টুল দিয়ে চুরি করা লেখা লুকানোর চেষ্টা করা। টার্নিটিনের পারপ্লেক্সিটি ও বার্স্টিনেস ফিল্টার এগুলো সহজেই শনাক্ত করে।"
        : "Using Quillbot or word-spinners to disguise copied material. Turnitin's perplexity and burstiness filters actively flag these patterns."
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
                {locale === "bn" ? "অনুমোদিত ও নৈতিক এআই ব্যবহার" : "Permissible & Ethical AI Usage"}
              </h4>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                {locale === "bn" ? "IEEE, Elsevier এবং আন্তর্জাতিক অ্যাকাডেমিক গাইডলাইন অনুযায়ী স্বীকৃত" : "Accepted by IEEE, Elsevier & International Academic Guidelines"}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {dos.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">
                    {item.title}
                  </span>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-0.5">
                    {item.desc}
                  </p>
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
                {locale === "bn" ? "নিষিদ্ধ ও অ্যাকাডেমিক অসদাচরণ" : "Prohibited & Academic Misconduct"}
              </h4>
              <span className="text-[11px] text-rose-600 dark:text-rose-400 font-semibold">
                {locale === "bn" ? "ডিফেন্স বাতিল ও শাস্তিমূলক ব্যবস্থার কারণ" : "Causes Thesis Defense Rejection"}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {donts.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">
                    {item.title}
                  </span>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-0.5">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Turnitin AI Detection Mechanics */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <FileSearch className="w-4 h-4 text-indigo-600 dark:text-cyan-400" />
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
            {locale === "bn" ? "টার্নিটিন এআই লেখার স্কোর কীভাবে কাজ করে?" : "How Turnitin's AI Writing Score Actually Operates"}
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-600 dark:text-slate-300">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 space-y-1">
            <span className="font-bold text-slate-900 dark:text-white block">
              {locale === "bn" ? "১. পারপ্লেক্সিটি (Perplexity - শব্দ পূর্বাভাসের সম্ভাবনা)" : "1. Perplexity (Word Predictability)"}
            </span>
            <p className="leading-relaxed text-[11px]">
              {locale === "bn"
                ? "এলএলএম সাধারণত পরবর্তী সবচেয়ে সম্ভাব্য শব্দটি বেছে নেয়, যার ফলে পারপ্লেক্সিটি খুব কম হয়। মানুষের লেখায় স্বাভাবিক বৈচিত্র্য থাকে।"
                : "LLMs consistently select mathematically probable next tokens, resulting in unnaturally low perplexity. Human prose possesses organic irregularity."}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 space-y-1">
            <span className="font-bold text-slate-900 dark:text-white block">
              {locale === "bn" ? "২. বার্স্টিনেস (Burstiness - বাক্যের দৈর্ঘ্যের বৈচিত্র্য)" : "2. Burstiness (Sentence Length Variance)"}
            </span>
            <p className="leading-relaxed text-[11px]">
              {locale === "bn"
                ? "এআই সাধারণত সমান ও সুষম দৈর্ঘ্যের বাক্য তৈরি করে। মানুষ কখনো ছোট, কখনো জটিল ও দীর্ঘ বাক্য লিখে যা টার্নিটিন স্কোরে ধরা পড়ে।"
                : "Machine-generated paragraphs exhibit uniform sentence structures. Humans alternate naturally between concise punchy statements and multifaceted sentences."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
