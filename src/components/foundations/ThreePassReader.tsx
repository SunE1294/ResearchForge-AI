"use client";

import React, { useState } from "react";
import { useResearchStore } from "@/store/useResearchStore";
import { Clock, CheckSquare, Square, Eye, BookOpen, Wrench, Sparkles, ArrowRight } from "lucide-react";

export function ThreePassReader() {
  const { locale } = useResearchStore();
  const [activePass, setActivePass] = useState<number>(1);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const passes = [
    {
      passNumber: 1,
      name: locale === "bn" ? "পাস ১: পাখি-চোখে একঝলক পরিদর্শন" : "Pass 1: The Bird's-Eye View",
      subtitle: locale === "bn" ? "৫ থেকে ১০ মিনিটে পেপারের সামগ্রিক চিত্র বুঝুন" : "Grasp the big picture in 5 to 10 minutes",
      duration: locale === "bn" ? "৫ - ১০ মিনিট" : "5 - 10 Minutes",
      icon: Eye,
      description: locale === "bn"
        ? "পেপারের মূল গঠন দ্রুত স্ক্যান করে ৫টি 'C' (Category, Context, Correctness, Contributions, Clarity) এর উত্তর খুঁজুন। সিদ্ধান্ত নিন পেপারটি বিস্তারিত পড়া দরকার কিনা।"
        : "Quickly scan the architecture of the paper to answer the 5 C's: Category, Context, Correctness, Contributions, and Clarity. Decide if you need to read further.",
      checkpoints: locale === "bn" ? [
        { id: "p1-1", text: "শিরোনাম (Title), সারসংক্ষেপ (Abstract) এবং ভূমিকার সূচনাটি মনোযোগ দিয়ে পড়ুন।" },
        { id: "p1-2", text: "পেপারের অভ্যন্তরীণ গঠন বুঝতে প্রধান ও উপ-শিরোনামগুলো স্ক্যান করুন।" },
        { id: "p1-3", text: "উপসংহার (Conclusions) এবং ভবিষ্যৎ গবেষণার দিকগুলো (Future Work) পড়ুন।" },
        { id: "p1-4", text: "তথ্যসূত্রের (References) ওপর চোখ বুলান, পূর্বপরিচিত পেপারগুলো চিহ্নিত করুন।" },
        { id: "p1-5", text: "পেপারটির ক্যাটাগরি নির্ধারণ করুন (পরীক্ষামূলক, তাত্ত্বিক, রিভিউ, বেঞ্চমার্ক)।" }
      ] : [
        { id: "p1-1", text: "Carefully read the Title, Abstract, and Introduction opening." },
        { id: "p1-2", text: "Read section and sub-section headings to understand paper structure." },
        { id: "p1-3", text: "Read the Conclusions and Future Work section." },
        { id: "p1-4", text: "Glance at the References, ticking off ones you already recognize." },
        { id: "p1-5", text: "Classify paper into category (empirical, theoretical, survey, benchmark)." }
      ],
      decisionQuestion: locale === "bn"
        ? "পাস ১ এর শেষে সিদ্ধান্ত: এই পেপারটি কি আমি গভীরভাবে পড়ব, ভবিষ্যতে পড়ার জন্য সংরক্ষণ করব, নাকি বাদ দেব?"
        : "At the end of Pass 1: Should I read this paper in depth, file it away, or discard it?"
    },
    {
      passNumber: 2,
      name: locale === "bn" ? "পাস ২: মূল বিষয়বস্তু অনুধাবন" : "Pass 2: Grasp the Content",
      subtitle: locale === "bn" ? "প্রায় ১ ঘণ্টায় পেপারের মূল মেকানিজম বুঝুন" : "Understand key mechanisms in roughly 1 hour",
      duration: locale === "bn" ? "১ ঘণ্টা" : "1 Hour",
      icon: BookOpen,
      description: locale === "bn"
        ? "অধিক মনোযোগ দিয়ে পেপারটি পড়ুন। বিশেষ করে গ্রাফ, চিত্র এবং পরিসংখ্যানিক টেবিলগুলো গভীরভাবে দেখুন। জটিল সমীকরণগুলো চিহ্নিত করে পাস ৩ এর জন্য রাখুন।"
        : "Read the paper with greater care, paying special attention to graphs, figures, and statistical tables. Mark uncomprehended proofs or math for Pass 3.",
      checkpoints: locale === "bn" ? [
        { id: "p2-1", text: "চিত্র ও ডায়াগ্রামগুলো খুঁটিয়ে দেখুন। অক্ষগুলো কি ঠিকভাবে লেবেল করা? এরর বার আছে কি?" },
        { id: "p2-2", text: "ব্যাকগ্রাউন্ড বোঝার জন্য অপঠিত গুরুত্বপূর্ণ রেফারেন্সগুলোর নিচে দাগ দিন।" },
        { id: "p2-3", text: "যেসব বিষয়ে খটকা লাগছে বা দুর্বোধ্য সমীকরণ রয়েছে তা মার্জিনে নোট করুন।" },
        { id: "p2-4", text: "নিজের ভাষায় ১-২ বাক্যে পেপারের মূল দাবিটি সংক্ষেপে লিখুন।" }
      ] : [
        { id: "p2-1", text: "Examine figures and diagrams carefully. Are axes properly labeled? Are error bars present?" },
        { id: "p2-2", text: "Underline unread references for background reading." },
        { id: "p2-3", text: "Annotate questions, questionable assumptions, or confusing mathematical equations in margins." },
        { id: "p2-4", text: "Summarize the main thesis of the paper in 1-2 sentences in your own words." }
      ],
      decisionQuestion: locale === "bn"
        ? "পাস ২ এর শেষে সিদ্ধান্ত: আমি কি পেপারের মেকানিজম যথেষ্ট বুঝতে পেরেছি সাইট করার জন্য, নাকি কোড করে পুনঃপরীক্ষা করতে হবে?"
        : "At the end of Pass 2: Do I understand the main mechanisms well enough to cite it, or do I need to re-implement it?"
    },
    {
      passNumber: 3,
      name: locale === "bn" ? "পাস ৩: গভীর পর্যালোচনা ও পুনঃবাস্তবায়ন" : "Pass 3: Deep Critique & Re-implementation",
      subtitle: locale === "bn" ? "২ থেকে ৩ ঘণ্টায় পেপারটিকে কার্যত পুনর্নির্মাণ করুন" : "Virtually re-create the study in 2 to 3 hours",
      duration: locale === "bn" ? "২ - ৩ ঘণ্টা" : "2 - 3 Hours",
      icon: Wrench,
      description: locale === "bn"
        ? "একটি পেপার পুরোপুরি আয়ত্ত করার চাবিকাঠি হলো ভার্চুয়ালি এটিকে পুনরায় তৈরি করা। লেখকের দৃষ্টিকোণ থেকে পুরো এক্সপেরিমেন্ট ভাবুন এবং লুকানো অনুমিতি ও ত্রুটি খুঁজুন।"
        : "The key to mastering a paper: virtually re-implement it. Attempt to recreate the author's experiment, identifying implicit assumptions and unstated edge cases.",
      checkpoints: locale === "bn" ? [
        { id: "p3-1", text: "লেখকের হাইপোথিসিসকে মাথায় রেখে ধাপে ধাপে এক্সপেরিমেন্টটি নিজের মনে পুনর্গঠন করুন।" },
        { id: "p3-2", text: "এমন লুকানো শর্ত খুঁজুন যা বাংলাদেশের মতো নিম্ন-রিসোর্স পরিবেশে অকার্যকর হতে পারে।" },
        { id: "p3-3", text: "রিপ্রোডিউসিবিলিটি চেক করুন: কোড বা ডেটাসেটের পাবলিক লিঙ্ক সচল ও রান করা যায় কি?" },
        { id: "p3-4", text: "আপনার নিজস্ব থিসিসে এই পেপারের সীমাবদ্ধতাকে কীভাবে উন্নত বা সম্প্রসারণ করবেন তার আইডিয়া লিখুন।" }
      ] : [
        { id: "p3-1", text: "Assume the author's hypothesis and mentally reconstruct the experiment step by step." },
        { id: "p3-2", text: "Identify hidden assumptions that may fail in realistic or developing world constraints (e.g. Bangladesh low-resource settings)." },
        { id: "p3-3", text: "Check reproducibility: is the code or dataset publicly linked and executable?" },
        { id: "p3-4", text: "Draft ideas for how your own thesis could extend, improve, or contradict their findings." }
      ],
      decisionQuestion: locale === "bn"
        ? "পাস ৩ এর শেষে ফলাফল: আপনি এখন পেপারটির নাড়িনক্ষত্র জানেন এবং এর ওপর ভিত্তি করে নিজের থিসিসের মৌলিক অবদান দাঁড় করাতে পারেন!"
        : "At the end of Pass 3: You now know the paper from the inside out and can formulate your own thesis contribution upon it!"
    }
  ];

  const current = passes.find((p) => p.passNumber === activePass) || passes[0];
  const Icon = current.icon;

  return (
    <div className="space-y-6">
      {/* Pass Selector Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {passes.map((pass) => {
          const PIcon = pass.icon;
          const isSelected = activePass === pass.passNumber;
          return (
            <button
              key={pass.passNumber}
              onClick={() => setActivePass(pass.passNumber)}
              className={`p-4 rounded-2xl border text-left transition-all ${
                isSelected
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/20 dark:bg-cyan-500 dark:text-slate-950 dark:border-cyan-500"
                  : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-cyan-800"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isSelected ? "bg-white/20 text-white dark:text-slate-950" : "bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-cyan-400"}`}>
                  <PIcon className="w-4 h-4" />
                </div>
                <div className="flex items-center gap-1 text-[11px] opacity-80">
                  <Clock className="w-3 h-3" />
                  <span>{pass.duration}</span>
                </div>
              </div>
              <span className="font-bold block text-sm">{pass.name}</span>
              <span className={`text-[11px] block mt-0.5 opacity-80 ${isSelected ? "text-indigo-100 dark:text-slate-900" : "text-slate-500 dark:text-slate-400"}`}>
                {pass.subtitle}
              </span>
            </button>
          );
        })}
      </div>

      {/* Pass Detail Panel */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 text-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-cyan-400 flex items-center justify-center">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {current.name}
              </h3>
              <span className="text-slate-500 dark:text-slate-400 text-xs">
                {current.subtitle}
              </span>
            </div>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold self-start sm:self-center">
            <Clock className="w-3.5 h-3.5 text-indigo-500 dark:text-cyan-400" />
            <span>{locale === "bn" ? "নির্ধারিত সময়:" : "Target Duration:"} {current.duration}</span>
          </div>
        </div>

        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
          {current.description}
        </p>

        {/* Checkpoints Checklist */}
        <div className="space-y-3">
          <h4 className="font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 text-xs">
            {locale === "bn" ? "পরীক্ষা ও যাচাই চেকলিস্ট (ক্লিক করে ট্র্যাক করুন):" : "Stage Checkpoints & Milestones (Click to tick off):"}
          </h4>
          <div className="space-y-2">
            {current.checkpoints.map((cp) => {
              const isDone = checkedItems[cp.id] || false;
              return (
                <button
                  key={cp.id}
                  onClick={() => toggleCheck(cp.id)}
                  className={`w-full flex items-start gap-3 p-3 rounded-xl border text-left transition-colors ${
                    isDone
                      ? "bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900 text-emerald-900 dark:text-emerald-200"
                      : "bg-slate-50 dark:bg-slate-800/40 border-slate-200/60 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <div className="mt-0.5 shrink-0 text-indigo-600 dark:text-cyan-400">
                    {isDone ? <CheckSquare className="w-4 h-4 text-emerald-600" /> : <Square className="w-4 h-4 text-slate-400" />}
                  </div>
                  <span className={`leading-relaxed ${isDone ? "line-through opacity-80" : ""}`}>
                    {cp.text}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Decision Gate */}
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-200 space-y-1">
          <span className="font-bold flex items-center gap-1.5 text-xs">
            <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            {locale === "bn" ? "মূল সিদ্ধান্ত বা অর্জন:" : "Key Decision Gate:"}
          </span>
          <p className="leading-relaxed">
            {current.decisionQuestion}
          </p>
        </div>
      </div>
    </div>
  );
}
