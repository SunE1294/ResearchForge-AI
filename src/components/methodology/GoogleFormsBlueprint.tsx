"use client";

import React, { useState } from "react";
import { useResearchStore } from "@/store/useResearchStore";
import { useI18n } from "@/lib/i18n";
import {
  FileSpreadsheet,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  Table,
  Code,
  Layers,
  Sparkles,
  Sliders,
  HelpCircle,
  Split,
  ShieldAlert
} from "lucide-react";

export function GoogleFormsBlueprint() {
  const { locale } = useResearchStore();
  const { t } = useI18n(locale);
  const [activeCodeTab, setActiveCodeTab] = useState<"python" | "spss">("spss");

  return (
    <div className="space-y-10 text-xs">
      {/* 4-Section Google Forms Blueprint */}
      <div className="space-y-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-cyan-400 border border-indigo-200/60 dark:border-indigo-900/60 uppercase tracking-wider mb-1">
            <Layers className="w-3 h-3" />
            {locale === "bn" ? "অ্যাকাডেমিক জরিপ আর্কিটেকচার" : "Academic Survey Architecture"}
          </div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            {locale === "bn"
              ? "গুগল ফর্ম ডিজাইন ও ডেটা কালেকশন ব্লুপ্রিন্ট"
              : "Google Forms Deployment & Data Collection Blueprint"}
          </h2>
          <p className="text-slate-500 text-[11px] mt-0.5">
            {locale === "bn"
              ? "একটি ডিফেন্সযোগ্য অ্যাকাডেমিক গুগল ফর্ম তৈরি, রেসপন্স ভ্যালিডেশন এবং স্প্রেডশিট এক্সপোর্ট নির্দেশিকা।"
              : "Step-by-step masterclass on configuring Google Forms for error-free SPSS/Python ingestion."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Section 1 Card */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-cyan-300">
                Section 1 • Gateway
              </span>
              <span className="font-mono text-slate-400 text-[10px]">Form Step 1</span>
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              {locale === "bn" ? "সম্মতিপত্র ও প্রাতিষ্ঠানিক পরিচয় (Consent Header)" : "Title, Institutional Affiliation & Consent"}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
              {locale === "bn"
                ? "ফর্মের শুরুতে বিশ্ববিদ্যালয়ের নাম, সুপারভাইজারের পরিচয় ও গবেষণার উদ্দেশ্য উল্লেখ করুন। শেষে একটি আবশ্যক (Required) চেকবক্স রাখুন: 'আমি স্বেচ্ছায় অংশ নিচ্ছি'।"
                : "Add department logo, thesis title, supervisor credentials, and privacy terms. The final question must be a mandatory Checkbox gateway ('I voluntarily consent')."}
            </p>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 text-[10px] space-y-1 text-slate-600 dark:text-slate-300">
              <span className="font-bold text-indigo-600 dark:text-cyan-400 block">⚙️ Google Form Setting:</span>
              <span>Settings ➔ Responses ➔ Turn OFF "Collect email addresses" to ensure strict blind anonymity.</span>
            </div>
          </div>

          {/* Section 2 Card */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                Section 2 • Demographics
              </span>
              <span className="font-mono text-slate-400 text-[10px]">Form Step 2</span>
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              {locale === "bn" ? "জনতাত্ত্বিক স্ক্রিনিং ও ভ্যালিডেশন রুলস" : "Demographic Screening & Validation Rules"}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
              {locale === "bn"
                ? "অংশগ্রহণকারীর বয়স, বিভাগ, অভিজ্ঞতা বা ব্যবহারকারী টাইপ ড্রপডাউন বা মাল্টিপল চয়েস আকারে রাখুন। টেক্সট ইনপুট এড়িয়ে রেঞ্জ ব্যবহার করুন।"
                : "Use categorical ranges for age/experience rather than raw text inputs to prevent data cleaning friction. Enable 'Response Validation' on any numerical fields."}
            </p>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 text-[10px] space-y-1 text-slate-600 dark:text-slate-300">
              <span className="font-bold text-emerald-600 dark:text-emerald-400 block">⚙️ Google Form Setting:</span>
              <span>Always set questions to "Required" (আবশ্যক) to eliminate missing values in your dataset.</span>
            </div>
          </div>

          {/* Section 3 Card */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                Section 3 • Measurement
              </span>
              <span className="font-mono text-slate-400 text-[10px]">Form Step 3</span>
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              {locale === "bn" ? "লিকার্ট স্কেল বা মাল্টিপল চয়েস গ্রিড" : "Linear Scale (1 to 5) & Grid Matrix"}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
              {locale === "bn"
                ? "প্রতিটি চলকের জন্য ৫-পয়েন্ট লিনিয়ার স্কেল নির্বাচন করুন (1 = Strongly Disagree, 5 = Strongly Agree)। অথবা 'Multiple choice grid' ব্যবহার করুন।"
                : "Use 'Linear scale' from 1 to 5. Clearly label 1 as 'Strongly Disagree' and 5 as 'Strongly Agree'. Keep labels strictly consistent across all sections."}
            </p>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 text-[10px] space-y-1 text-slate-600 dark:text-slate-300">
              <span className="font-bold text-purple-600 dark:text-purple-400 block">⚙️ Google Form Setting:</span>
              <span>If using 'Multiple choice grid', check 'Require a response in each row'.</span>
            </div>
          </div>

          {/* Section 4 Card */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-50 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300">
                Section 4 • Ingestion
              </span>
              <span className="font-mono text-slate-400 text-[10px]">Form Step 4</span>
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              {locale === "bn" ? "গুগল শিট থেকে CSV ও SPSS এক্সপোর্ট" : "Google Sheets to CSV / SPSS Pipeline"}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
              {locale === "bn"
                ? "জরিপ সম্পন্ন হলে Google Forms-এর 'Link to Sheets' ক্লিক করুন। স্প্রেডশিটটি File ➔ Download ➔ Comma Separated Values (.csv) হিসেবে নামিয়ে নিন।"
                : "Once data collection targets are met (e.g. N ≥ 150), unlink form submissions, download CSV, and import into SPSS or Python."}
            </p>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 text-[10px] space-y-1 text-slate-600 dark:text-slate-300">
              <span className="font-bold text-cyan-600 dark:text-cyan-400 block">⚙️ Tip:</span>
              <span>Shorten verbose question header strings to clean variable names (e.g., USE_01, USE_02, TRUST_01).</span>
            </div>
          </div>
        </div>
      </div>

      {/* Critical Questionnaire Pitfalls & Biases Alert */}
      <div className="p-6 rounded-3xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 space-y-4">
        <div className="flex items-center gap-2 text-amber-900 dark:text-amber-300">
          <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          <h3 className="text-sm sm:text-base font-bold">
            {locale === "bn"
              ? "অ্যাকাডেমিক ডিফেন্স সতর্কতা: যে ২ ধরনের ভুল প্রশ্ন কখনোই করবেন না"
              : "Thesis Defense Pitfall Alert: Cognitive Biases in Question Phrasing"}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Double-Barreled Pitfall */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-amber-200/80 dark:border-amber-900/50 space-y-2.5">
            <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-bold text-xs">
              <Split className="w-4 h-4" />
              <span>{locale === "bn" ? "১. ডাবল-ব্যারেলড প্রশ্ন (Double-Barreled Trap)" : "1. Double-Barreled Question Trap"}</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
              {locale === "bn"
                ? "একই প্রশ্নে দুইটি ভিন্ন বিষয় ঢুকিয়ে ফেলা। যেমন: যদি কেউ একটিতে একমত আর অন্যটিতে দ্বিমত হয়, তবে সে কী উত্তর দেবে?"
                : "Combining two distinct constructs into a single question. If a respondent agrees with one half but disagrees with the other, their response becomes invalid noise."}
            </p>
            <div className="space-y-1.5 pt-1 text-[11px]">
              <div className="p-2 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300">
                <strong>❌ ভুল:</strong> "The mobile app is fast and easy to use." (স্পিড ভালো কিন্তু ডিজাইন জটিল হলে কী হবে?)
              </div>
              <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300">
                <strong>✓ সঠিক:</strong> দুটি আলাদা প্রশ্নে ভাগ করুন: (১) "The app response time is fast." (২) "The app user interface is intuitive."
              </div>
            </div>
          </div>

          {/* Leading Questions Pitfall */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-amber-200/80 dark:border-amber-900/50 space-y-2.5">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-xs">
              <AlertTriangle className="w-4 h-4" />
              <span>{locale === "bn" ? "২. পক্ষপাতমূলক / লিডিং প্রশ্ন (Leading Bias)" : "2. Leading & Loaded Question Bias"}</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
              {locale === "bn"
                ? "প্রশ্নের ভাষায় উত্তরদাতাকে একটি নির্দিষ্ট উত্তরের দিকে ঠেলে দেওয়া। এটি থিসিস ডিফেন্সে এক্সটার্নাল এক্সামিনাররা সরাসরি বাতিল করে দেন।"
                : "Phrasing statements that nudge or pressure respondents toward an affirmative answer, destroying psychometric objectivity."}
            </p>
            <div className="space-y-1.5 pt-1 text-[11px]">
              <div className="p-2 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300">
                <strong>❌ ভুল:</strong> "Don't you agree that AI tools significantly improve your study efficiency?"
              </div>
              <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300">
                <strong>✓ সঠিক:</strong> সম্পূর্ণ নিরপেক্ষভাবে লিকার্ট স্কেলে উপস্থাপন করুন: "Using AI tools impacts my academic task turnaround time."
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Code Snippets for Data Processing (SPSS & Python) */}
      <div className="p-6 rounded-3xl bg-slate-950 text-white shadow-xl border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">
              Statistical Code Implementation
            </span>
            <h3 className="text-sm sm:text-base font-bold text-white">
              {locale === "bn"
                ? "রিভার্স কোডিং ও নির্ভরযোগ্যতা যাচাই (Reliability Analysis)"
                : "Reverse Item Recoding & Cronbach's Alpha Test"}
            </h3>
          </div>

          <div className="p-1 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-1">
            <button
              onClick={() => setActiveCodeTab("spss")}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                activeCodeTab === "spss"
                  ? "bg-indigo-600 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              IBM SPSS Syntax
            </button>
            <button
              onClick={() => setActiveCodeTab("python")}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                activeCodeTab === "python"
                  ? "bg-cyan-500 text-slate-950 font-extrabold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Python (pandas + pingouin)
            </button>
          </div>
        </div>

        {activeCodeTab === "spss" ? (
          <div className="space-y-2">
            <p className="text-[11px] text-slate-300">
              {locale === "bn"
                ? "এসপিএসএস-এ সার্ভে ডেটা ইমপোর্ট করার পর নেগেটিভ প্রশ্নগুলো রিভার্স কোড করতে এই সিনট্যাক্স রান করুন:"
                : "Run this SPSS Syntax command to reverse-code items 4 & 8 and calculate Cronbach's Alpha:"}
            </p>
            <pre className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-mono text-cyan-300 overflow-x-auto">
{`* 1. Recode Negative / Reverse-Coded Items (1=5, 2=4, 3=3, 4=2, 5=1).
RECODE VAR_A_item4 VAR_B_item8 (1=5) (2=4) (3=3) (4=2) (5=1) 
  INTO VAR_A_item4_rev VAR_B_item8_rev.
EXECUTE.

* 2. Compute Construct Composite Mean Scores.
COMPUTE Construct_A_Mean = MEAN(VAR_A_item1, VAR_A_item2, VAR_A_item3, VAR_A_item4_rev, VAR_A_item5).
COMPUTE Construct_B_Mean = MEAN(VAR_B_item6, VAR_B_item7, VAR_B_item8_rev, VAR_B_item9, VAR_B_item10).
EXECUTE.

* 3. Run Psychometric Reliability Analysis (Cronbach's Alpha).
RELIABILITY
  /VARIABLES=VAR_A_item1 VAR_A_item2 VAR_A_item3 VAR_A_item4_rev VAR_A_item5
  /SCALE('Construct A Scale') ALL
  /MODEL=ALPHA
  /SUMMARY=TOTAL.`}
            </pre>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-[11px] text-slate-300">
              {locale === "bn"
                ? "পাইথনে পান্ডাস এবং পিংগুইন লাইব্রেরি দিয়ে ৫-পয়েন্ট লিকার্ট স্কেল প্রসেস ও ক্রনবাখ আলফা যাচাই:"
                : "Execute this Python script in Jupyter / Google Colab for automated reverse coding and Cronbach's alpha:"}
            </p>
            <pre className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-mono text-emerald-300 overflow-x-auto">
{`import pandas as pd
import pingouin as pg

# 1. Load Google Sheets CSV Export
df = pd.read_csv("academic_survey_responses.csv")

# 2. Reverse Code 5-point Likert Items (Formula: (Max_Scale + Min_Scale) - X = 6 - X)
df["VAR_A_item4_rev"] = 6 - df["VAR_A_item4"]
df["VAR_B_item8_rev"] = 6 - df["VAR_B_item8"]

# 3. Define Construct Items
construct_a_items = ["VAR_A_item1", "VAR_A_item2", "VAR_A_item3", "VAR_A_item4_rev", "VAR_A_item5"]

# 4. Calculate Cronbach's Alpha Reliability
alpha_result = pg.cronbach_alpha(data=df[construct_a_items])
print(f"Construct A Cronbach's Alpha: {alpha_result[0]:.3f} (95% CI: {alpha_result[1]})")

# Academic Rule of Thumb:
# Alpha >= 0.70 is acceptable for published exploratory thesis research.`}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
