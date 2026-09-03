"use client";

import React from "react";
import { useResearchStore } from "@/store/useResearchStore";
import { GitFork, AlertTriangle, Users, Cpu, ArrowRight } from "lucide-react";

export function ResearchGaps() {
  const { locale } = useResearchStore();

  const gapTypes = [
    {
      title: locale === "bn" ? "১. পরস্পরবিরোধী ফলাফলের গ্যাপ" : "1. Contradictory Findings Gap",
      icon: GitFork,
      badge: locale === "bn" ? "তাত্ত্বিক দ্বন্দ্ব" : "Theoretical Conflict",
      description: locale === "bn"
        ? "যখন দুটি নির্ভরযোগ্য বৈজ্ঞানিক গবেষণা একই সমস্যা নিয়ে কাজ করেও সম্পূর্ণ বিপরীত বা অসামঞ্জস্যপূর্ণ সিদ্ধান্তে পৌঁছায়।"
        : "When two reputable published studies investigate the same phenomenon but reach conflicting or incompatible conclusions.",
      example: locale === "bn"
        ? "গবেষণা 'A' দাবি করে সেলফ-অ্যাটেনশন ভিশন ট্রান্সফরমার ফুসফুসের সিটি স্ক্যানে নির্ভুল শনাক্তকরণ দেয়, যেখানে গবেষণা 'B' দেখায় হাসপাতালগুলোর বহুমাত্রিক ডেটায় সিএনএন (CNN) মডেল বেশি কার্যকর।"
        : "Study A reports that Transformer self-attention improves diagnostic accuracy on lung CTs, while Study B shows CNNs generalize better across multi-site hospital datasets due to smaller inductive bias.",
      thesisOpportunity: locale === "bn"
        ? "উভয় আর্কিটেকচারকে একটি আদর্শ বেঞ্চমার্কে কঠোরভাবে পরীক্ষা ও তুলনা করে নিশ্চিত করা যে ঠিক কোন পরিস্থিতিতে কোন মডেলটি শ্রেষ্ঠত্ব অর্জন করে।"
        : "Conduct a rigorous cross-domain controlled benchmark comparing both architectures on a standardized benchmark to discover the exact boundary conditions."
    },
    {
      title: locale === "bn" ? "২. গবেষণাপদ্ধতিগত সীমাবদ্ধতার গ্যাপ" : "2. Methodological Gap",
      icon: Cpu,
      badge: locale === "bn" ? "এলগরিদম ও প্রটোকলের সীমাবদ্ধতা" : "Algorithmic / Protocol Limitation",
      description: locale === "bn"
        ? "যখন পূর্বে সমস্যাটির সমাধান করা হয়েছে, কিন্তু ব্যবহৃত পদ্ধতিটি ছিল অত্যন্ত ভারী, ব্যয়বহুল বা ত্রুটিপূর্ণ।"
        : "When prior work solved a problem, but used an outdated, computationally prohibitive, or flawed methodology.",
      example: locale === "bn"
        ? "পূর্ববর্তী গবেষণায় ৮টি A100 জিপিইউ প্রয়োজন ছিল (যা বাংলাদেশের কোনো হাসপাতালের পক্ষে কেনা অসম্ভব) অথবা কেবল কৃত্রিম ল্যাব ডেটাতে কাজ করা হয়েছে।"
        : "Previous researchers required 8x A100 GPUs (unusable in developing country hospitals) or relied solely on synthetic lab data with no clinical validation.",
      thesisOpportunity: locale === "bn"
        ? "একটি লাইটওয়েট, কম প্যারামিটারের কোয়ান্টাইজড মডেল (যেমন MobileNet/LoRA) তৈরি করা যা সাধারণ কম দামি হার্ডওয়্যারেও ৯৫%+ নির্ভুলতা বজায় রাখে।"
        : "Develop a quantized, low-parameter model (e.g. MobileNet/LoRA) that maintains 95%+ of the performance while running on consumer-grade hardware."
    },
    {
      title: locale === "bn" ? "৩. আঞ্চলিক ও জনমিতিক প্রেক্ষাপটের গ্যাপ" : "3. Contextual & Population Gap",
      icon: Users,
      badge: locale === "bn" ? "আঞ্চলিক ও স্থানীয় উপেক্ষিত ক্ষেত্র" : "Demographic / Regional Neglect",
      description: locale === "bn"
        ? "যখন কোনো মডেল বা তত্ত্ব পশ্চিমা বা ধনী দেশগুলোতে সফল প্রমাণিত হয়েছে, কিন্তু উন্নয়নশীল দেশগুলোতে (যেমন বাংলাদেশ বা দক্ষিণ এশিয়া) কখনোই প্রয়োগ করা হয়নি।"
        : "When a theory or algorithm has been validated in Western/High-income cohorts, but has never been evaluated in regional contexts (such as Bangladesh or South Asia).",
      example: locale === "bn"
        ? "আমেরিকান বা ইউরোপীয় রোগীদের ডেটায় তৈরি প্রিডিক্টিভ হেলথ এলগরিদম বাংলাদেশি মানুষের খাদ্যাভ্যাস, জিনগত বৈশিষ্ট্য ও জীবনযাত্রায় কার্যকরভাবে কাজ করে না।"
        : "Clinical risk scoring algorithms calibrated on US Caucasian populations fail significantly when applied to Bengali epidemiological patterns and dietary lifestyles.",
      thesisOpportunity: locale === "bn"
        ? "স্থানীয় বাংলাদেশি জনসংখ্যার ওপর এথিক্যাল ডেটাসেট সংগ্রহ করে মডেলটিকে ফাইন-টিউন ও নতুনভাবে ক্যালিব্রেট করা।"
        : "Collect a localized ethical dataset and re-calibrate/fine-tune the predictive model specifically for the Bangladeshi population."
    },
    {
      title: locale === "bn" ? "৪. প্রযুক্তির নতুন সীমান্ত ও অপ্রয়োগজনিত গ্যাপ" : "4. Technology Under-Exploration Gap",
      icon: AlertTriangle,
      badge: locale === "bn" ? "উদীয়মান প্রযুক্তি" : "Emerging Frontier",
      description: locale === "bn"
        ? "কম্পিউটার সায়েন্সে নতুন কোনো যুগান্তকারী আবিষ্কার (যেমন Mamba, Multimodal RAG, Diffusion Models) হয়েছে, কিন্তু কোনো নির্দিষ্ট বাস্তব ক্ষেত্রে তা এখনো ব্যবহার করা হয়নি।"
        : "When a major technological breakthrough has emerged in computer science (e.g. State-Space Models / Mamba / Multimodal RAG) but has not yet been applied to a specific domain.",
      example: locale === "bn"
        ? "বাংলাদেশের প্রচলিত আইন গবেষণা বা নদীভাঙন পূর্বাভাস এখনো সাধারণ কীওয়ার্ড সার্চ কিংবা পুরোনো স্ট্যাটিক রিগ্রেশন মডেলের ওপর নির্ভরশীল।"
        : "Traditional legal research or environmental disaster prediction still relies on simple keyword searching or static regression models.",
      thesisOpportunity: locale === "bn"
        ? "বাংলাদেশের প্রচলিত আইনের ওপর মাল্টিমোডাল RAG সিস্টেম তৈরি করা কিংবা স্যাটেলাইট চিত্র ব্যবহারে আধুনিক এআই প্রয়োগ করা।"
        : "Pioneer the application of Multimodal Retrieval-Augmented Generation (RAG) to the Laws of Bangladesh or riverbank flood monitoring."
    }
  ];

  return (
    <div className="space-y-6">
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
        <span className="font-bold text-slate-900 dark:text-white block mb-1">
          {locale === "bn" ? "গবেষণার ৪টি প্রধান রিসার্চ গ্যাপ কাঠামো:" : "The 4 Archetypal Research Gaps"}
        </span>
        <p className="text-slate-600 dark:text-slate-400">
          {locale === "bn"
            ? "বিশ্ববিদ্যালয়ের থিসিস কমিটি মূলত সুনির্দিষ্ট রিসার্চ গ্যাপ দেখেই অনুমোদন দেয়। আপনার আইডিয়াটি নিচের কোন ঘরে মানানসই তা চিহ্নিত করুন।"
            : "Faculty review committees approve theses based on a clearly formulated gap. Locate which quadrant best fits your research problem."}
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
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-cyan-300">
                    {gap.badge}
                  </span>
                  <Icon className="w-4 h-4 text-slate-400" />
                </div>

                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  {gap.title}
                </h4>

                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {gap.description}
                </p>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 space-y-1">
                  <span className="font-bold text-slate-700 dark:text-slate-200 block text-[11px]">
                    {locale === "bn" ? "বাস্তব উদাহরণ:" : "Real-World Context / Example:"}
                  </span>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
                    {gap.example}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] space-y-1">
                <span className="font-bold text-emerald-600 dark:text-emerald-400 block">
                  {locale === "bn" ? "থিসিসের উদ্ভাবনী সুযোগ:" : "Concrete Thesis Opportunity:"}
                </span>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
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
