"use client";

import React, { useState } from "react";
import { useResearchStore } from "@/store/useResearchStore";
import { AcademicTooltip } from "@/components/ui/AcademicTooltip";
import { FileText, Cpu, CheckCircle, BarChart3, MessageSquare, AlertCircle } from "lucide-react";

export function ImradBreakdown() {
  const { locale } = useResearchStore();
  const [activeSection, setActiveSection] = useState<string>("intro");

  const sections = [
    {
      id: "intro",
      name: locale === "bn" ? "ভূমিকা: ফানেল পদ্ধতি" : "Introduction: The Funnel",
      icon: FileText,
      purpose: locale === "bn"
        ? "গবেষণার গুরুত্ব তুলে ধরা, সাম্প্রতিক কাজের সীমাবদ্ধতা নির্দেশ করা, সুনির্দিষ্ট রিসার্চ গ্যাপ নির্ধারণ করা এবং নিজস্ব মৌলিক অবদান ঘোষণা করা।"
        : "Establish the importance of the field, cite recent benchmark limitations, identify the specific gap, and declare your novel contributions.",
      structuralFormula: locale === "bn" ? [
        { label: "১. সার্বিক হুক (The Broad Hook)", text: "সমস্যাটি বৈশ্বিক বা আর্থ-সামাজিকভাবে কেন গুরুত্বপূর্ণ? (যেমন: 'বিশ্বব্যাপী মৃত্যুর ৩২% কারণ হৃদরোগ...')" },
        { label: "২. বর্তমান প্রেক্ষাপট (The Current Paradigm)", text: "বর্তমান সেরা মডেল বা প্রযুক্তিগুলো কী করছে? তাদের কাজের বেসলাইন কী?" },
        { label: "৩. সুনির্দিষ্ট সীমাবদ্ধতা (The Critical Gap)", text: "বর্তমান পদ্ধতিগুলো কোথায় ব্যর্থ হচ্ছে? (কম্পিউটেশনাল সীমাবদ্ধতা, আঞ্চলিক ডেটার অভাব, ছোট ডেটায় ওভারফিটিং)।" },
        { label: "৪. প্রস্তাবিত সমাধান (The Proposed Novelty)", text: "এই পেপারে আমরা [মডেল/পদ্ধতি X] প্রস্তাব করছি যা [নতুন মেকানিজম Y] এর মাধ্যমে এই সমাধান নিশ্চিত করে।" },
        { label: "৫. বুলেট আকারে অবদান (Bulleted Contributions)", text: "স্পষ্টভাবে ৩টি সুনির্দিষ্ট অবদান উল্লেখ করুন (নতুন আর্কিটেকচার, যাচাইকৃত ডেটাসেট, উন্নত বেঞ্চমার্ক)।" }
      ] : [
        { label: "1. The Broad Hook", text: "Why does this problem matter globally or socioeconomically? (e.g., 'Cardiovascular diseases account for 32% of worldwide mortality...')" },
        { label: "2. The Current Paradigm", text: "What do current state-of-the-art tools or models accomplish? What is the standard baseline?" },
        { label: "3. The Critical Gap", text: "Where do current methods fail? (e.g., computational complexity, lack of low-resource language generalization, overfitting on small cohorts)." },
        { label: "4. The Proposed Novelty", text: "In this paper, we propose [Model/System X] to resolve this limitation through [Novel Mechanism Y]." },
        { label: "5. Bulleted Contributions", text: "Explicitly itemize 3 concrete contributions (novel architecture, verified dataset, empirical superior benchmark)." }
      ],
      commonMistakes: locale === "bn" ? [
        "গত ৩-৫ বছরের গবেষণার বদলে পেপারের শুরুতে অতিরিক্ত দীর্ঘ ঐতিহাসিক ইতিহাস বর্ণনা করা।",
        "ভূমিকার শেষ প্যারাগ্রাফগুলোতে নিজের গবেষণার সুনির্দিষ্ট অবদানগুলো পয়েন্ট আকারে পরিষ্কার না করা।"
      ] : [
        "Writing a history lesson instead of focusing on state-of-the-art literature from the last 3-5 years.",
        "Failing to clearly state the novel contribution in the final paragraphs of the introduction."
      ]
    },
    {
      id: "method",
      name: locale === "bn" ? "পদ্ধতি: সুনির্দিষ্ট রেসিপি" : "Methodology: The Recipe",
      icon: Cpu,
      purpose: locale === "bn"
        ? "যথেষ্ট গাণিতিক ও কাঠামোগত বিশদ বিবরণ প্রদান করা যাতে অন্য যেকোনো দক্ষ গবেষক আপনার সাথে যোগাযোগ ছাড়াই গবেষণাটি সম্পূর্ণ পুনঃউৎপাদন করতে পারেন।"
        : "Provide enough rigorous architectural and mathematical detail that another competent researcher could replicate your entire system without contacting you.",
      structuralFormula: locale === "bn" ? [
        { label: "১. ডেটাসেট ও সংগ্রহ (Dataset & Acquisition)", text: "উৎস, নমুনার আকার (Sample Size), Train/Val/Test বিভাজন এবং নৈতিক বা প্রাতিষ্ঠানিক অনুমোদন।" },
        { label: "২. প্রিপ্রসেসিং পাইপলাইন (Preprocessing)", text: "নর্মালাইজেশন, মিসিং ভ্যালু পূরণ, নয়েজ ফিল্টারিং, টোকেনাইজেশন বা ডেটা অগমেন্টেশন।" },
        { label: "৩. গাণিতিক সমীকরণ (Mathematical Formulation)", text: "লস ফাংশন, অবজেক্টিভ ম্যাট্রিক্স, সম্ভাব্যতার বিন্যাস বা রিগ্রেশন সমীকরণের নির্ভুল সূত্র।" },
        { label: "৪. আর্কিটেকচারাল ব্লক ডায়াগ্রাম (Pipeline)", text: "ইনপুট থেকে আউটপুট পর্যন্ত ডেটা প্রবাহের স্পষ্ট ও পেশাদার ব্লক ডায়াগ্রাম।" },
        { label: "৫. হাইপারপ্যারামিটার ও হার্ডওয়্যার (Hyperparameters)", text: "ব্যাচ সাইজ, লার্নিং রেট, অপটিমাইজার (AdamW), ব্যবহৃত GPU এবং র‍্যান্ডম সিড (Random Seed)।" }
      ] : [
        { label: "1. Dataset & Acquisition", text: "Source of data, sample size, train/val/test splits, ethical approvals, and institutional oversight." },
        { label: "2. Preprocessing Pipeline", text: "Normalization, missing value imputation, noise filtration, tokenization, or image augmentation." },
        { label: "3. Mathematical Formulation", text: "Formal equations for loss functions, objective matrices, probability distributions, or regression formulas." },
        { label: "4. Architectural Pipeline", text: "Comprehensive block diagram showing data flow from input tensors to output logits or metrics." },
        { label: "5. Hyperparameters & Hardware", text: "Batch size, learning rate schedule, optimizer (AdamW), GPU hardware, and random seeds." }
      ],
      commonMistakes: locale === "bn" ? [
        "হাইপারপ্যারামিটার বা ট্রেইন/টেস্ট স্প্লিট উল্লেখ না করা (যা গবেষণাকে অপ্রমাণযোগ্য করে তোলে)।",
        "মেথডলজি সেকশনে ফলাফলের সংখ্যা ঢুকিয়ে ফেলা: ৩ নম্বর চ্যাপ্টারে কোনো এক্সপেরিমেন্টাল রেজাল্ট থাকবে না!"
      ] : [
        "Omitting hyperparameter values, random seeds, or train/test split percentages (leading to irreproducibility).",
        "Confusing Results with Methodology: do not include experimental outcome numbers in Chapter 3!"
      ]
    },
    {
      id: "results",
      name: locale === "bn" ? "ফলাফল: পরীক্ষিত প্রমাণ" : "Results: The Evidence",
      icon: BarChart3,
      purpose: locale === "bn"
        ? "বস্তুনিষ্ঠ ও নিরপেক্ষ ফলাফল উপস্থাপন করা। একাধিক সুপ্রতিষ্ঠিত বেসলাইনের সাথে পরিসংখ্যানিক মানদণ্ডে তুলনা করা।"
        : "Present objective, empirical evidence. Compare your system against competitive baselines using rigorous statistical metrics and ablation experiments.",
      structuralFormula: locale === "bn" ? [
        { label: "১. বেসলাইনের সাথে তুলনা (Baseline Comparison)", text: "কমপক্ষে ৩-৫টি প্রতিষ্ঠিত আধুনিক মডেলের সাথে পারফরম্যান্স টেবিল (Accuracy, F1, AUC, BLEU)।" },
        { label: "২. পরিসংখ্যানিক তাৎপর্য (Statistical Significance)", text: "p-value (< 0.05) অথবা দ্বি-পাক্ষিক টি-টেস্ট প্রমাণ করে ফলাফল কাকতালীয় নয়।" },
        { label: "৩. অ্যাবলেশন বিশ্লেষণ (Ablation Study)", text: "কোন নির্দিষ্ট উপাদানটি সরিয়ে নিলে পারফরম্যান্স কতটা কমে তা মেপে দেখানো।" },
        { label: "৪. ভিজ্যুয়াল চিত্র ও গ্রাফ (Visualizations)", text: "কনফিউশন ম্যাট্রিক্স, রিসিভার অপারেটিং কার্ভ (ROC), লস কার্ভ বা হিটম্যাপ।" }
      ] : [
        { label: "1. Baseline Comparison", text: "Performance tables comparing proposed method with at least 3-5 established state-of-the-art baselines." },
        { label: "2. Statistical Significance", text: "Report p-values (< 0.05) or confidence intervals proving improvement is not random luck." },
        { label: "3. Ablation Study", text: "Systematically remove proposed components one by one to prove each module adds measurable value." },
        { label: "4. Error Analysis & Outliers", text: "Examine and visualize failure cases; why did your model misclassify specific samples?" }
      ],
      commonMistakes: locale === "bn" ? [
        "শুধুমাত্র একক মেট্রিক (যেমন শুধু Accuracy) রিপোর্ট করা যখন ডেটাসেট ভারসাম্যহীন (Imbalanced)।",
        "অ্যাবলেশন স্টাডি বাদ দেওয়া: রিভিউয়াররা জানতে চান ঠিক কোন পরিবর্তনের কারণে উন্নতি হয়েছে।"
      ] : [
        "Only reporting accuracy on imbalanced datasets without Macro F1 or Precision-Recall curves.",
        "Omitting ablation studies, making it impossible to attribute gains to your specific novelty."
      ]
    },
    {
      id: "discussion",
      name: locale === "bn" ? "আলোচনা: সার্বিক প্রাসঙ্গিকতা" : "Discussion: The Context",
      icon: MessageSquare,
      purpose: locale === "bn"
        ? "ফলাফলের গভীর ব্যাখ্যা দেওয়া, বাস্তব প্রয়োগযোগ্যতা বিশ্লেষণ করা এবং নিজের কাজের সীমাবদ্ধতা সৎভাবে স্বীকার করা।"
        : "Interpret the meaning of your findings, relate results back to the broader field, acknowledge limitations honestly, and propose future research avenues.",
      structuralFormula: locale === "bn" ? [
        { label: "১. প্রধান ফলাফলের পুনরাবৃত্তি (Recapitulation)", text: "১-২ অনুচ্ছেদে মূল আবিষ্কার এবং রিসার্চ প্রশ্নের উত্তর সংক্ষেপে পুনর্ব্যক্ত করুন।" },
        { label: "২. পূর্ববর্তী গবেষণার সাথে তুলনা (Literature Alignment)", text: "আপনার ফলাফল পূর্বের কোন কাজের সমর্থন করে আর কোন কাজের সাথে দ্বিমত পোষণ করে।" },
        { label: "৩. সীমাবদ্ধতা স্বীকার (Limitations)", text: "কম্পিউটেশনের সীমাবদ্ধতা, ডেটাসেটের পরিধি বা সম্ভাব্য পক্ষপাতিত্ব সৎভাবে উল্লেখ করুন।" },
        { label: "৪. ভবিষ্যৎ সম্ভাবনা (Future Directions)", text: "ভবিষ্যতে এই কাজের ওপর ভিত্তি করে পরবর্তী গবেষকরা কী কী করতে পারেন।" }
      ] : [
        { label: "1. Recapitulation of Findings", text: "Synthesize the core message of Chapter 4 without repeating exact raw table numbers." },
        { label: "2. Alignment with Literature", text: "Explain why your results contradict or support prior findings cited in the Introduction." },
        { label: "3. Frank Admission of Limitations", text: "Discuss sample constraints, compute bottlenecks, or domains where the model degrades." },
        { label: "4. Actionable Future Work", text: "Concrete research extensions for future graduate scholars entering your niche." }
      ],
      commonMistakes: locale === "bn" ? [
        "সীমাবদ্ধতা গোপন করার চেষ্টা করা: একজন অভিজ্ঞ রিভিউয়ার বা এক্সটার্নাল ডিফেন্ডার এটি সাথে সাথে ধরবেন।",
        "রেজাল্টস সেকশনের হুবহু বিবরণ পুনরায় কপি করা—আলোচনায় প্রয়োজন যৌক্তিক ব্যাখ্যা, কেবল সংখ্যার পুনরাবৃত্তি নয়।"
      ] : [
        "Trying to hide limitations. Seasoned reviewers respect intellectual honesty and identify unstated flaws instantly.",
        "Merely repeating the Results section without offering contextual, mechanistic explanations."
      ]
    }
  ];

  const current = sections.find((s) => s.id === activeSection) || sections[0];
  const Icon = current.icon;

  return (
    <div className="space-y-6">
      {/* IMRAD Concept Banner */}
      <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 text-xs flex items-center justify-between">
        <div>
          <span className="font-bold text-indigo-700 dark:text-cyan-300 inline-flex items-center">
            <span>{locale === "bn" ? "IMRAD পেপার অ্যানাটমি ও অধ্যায়ভিত্তিক ফর্মুলা" : "IMRAD Paper Structure & Chapter Anatomy"}</span>
            <AcademicTooltip term="imrad" />
          </span>
          <p className="text-slate-600 dark:text-slate-400 mt-0.5">
            {locale === "bn"
              ? "বৈজ্ঞানিক গবেষণাপত্রের ৪টি মৌলিক অধ্যায় কীভাবে সাজাতে হয় এবং কোন ভুলগুলো পরিহার করতে হবে তা বিস্তারিত জানুন।"
              : "Learn the essential architectural blueprints and common pitfalls across the four core scientific manuscript sections."}
          </p>
        </div>
      </div>

      {/* Chapter Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {sections.map((sec) => {
          const SIcon = sec.icon;
          const isSelected = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id)}
              className={`p-3.5 rounded-2xl border text-left transition-all ${
                isSelected
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/20 dark:bg-cyan-500 dark:text-slate-950 dark:border-cyan-500"
                  : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-cyan-800"
              }`}
            >
              <SIcon className="w-4 h-4 mb-2" />
              <span className="font-bold block text-xs">{sec.name}</span>
            </button>
          );
        })}
      </div>

      {/* Chapter Detail View */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 text-xs">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-cyan-400 flex items-center justify-center">
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {current.name}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 mt-0.5">
              {current.purpose}
            </p>
          </div>
        </div>

        {/* Structural Formula */}
        <div className="space-y-3">
          <h4 className="font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 text-xs">
            {locale === "bn" ? "আদর্শ গঠনগত ফর্মুলা ও কাঠামো:" : "Standard Structural Formula:"}
          </h4>
          <div className="space-y-2.5">
            {current.structuralFormula.map((item, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 space-y-1">
                <span className="font-bold text-indigo-600 dark:text-cyan-400 block text-xs">
                  {item.label}
                </span>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Common Novice Traps */}
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-900 dark:text-rose-200 space-y-2">
          <span className="font-bold flex items-center gap-1.5 text-xs">
            <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
            {locale === "bn" ? "নতুন শিক্ষার্থীদের সাধারণ ভুল ও সতর্কতা:" : "Common Novice Pitfalls to Avoid:"}
          </span>
          <ul className="space-y-1 pl-5 list-disc text-slate-700 dark:text-slate-300 leading-relaxed">
            {current.commonMistakes.map((mistake, idx) => (
              <li key={idx}>{mistake}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
