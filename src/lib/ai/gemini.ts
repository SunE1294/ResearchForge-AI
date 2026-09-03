import { GoogleGenerativeAI } from "@google/generative-ai";
import { MilestoneTask, DepartmentCode } from "@/types";
import { getDepartmentByCode } from "@/data/taxonomy";

const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export async function generateBooleanQuery(topic: string, departmentCode?: DepartmentCode): Promise<{
  booleanString: string;
  keywords: string[];
  suggestedDatabases: string[];
  explanation: string;
}> {
  const dept = departmentCode ? getDepartmentByCode(departmentCode) : undefined;
  const archetype = dept?.archetype || "General Academic";
  const citation = dept?.recommendedCitation || "IEEE";

  if (genAI) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `You are a Senior Academic Research Librarian. Convert this student's research topic into a rigorous Boolean search string for academic databases (Scopus, IEEE Xplore, Web of Science, PubMed).
Student Topic: "${topic}"
Academic Discipline / Archetype: ${archetype}
Citation standard: ${citation}

Return ONLY a valid JSON object matching this schema:
{
  "booleanString": "string with AND, OR, NOT, quotes, wildcards",
  "keywords": ["keyword1", "keyword2", "keyword3"],
  "suggestedDatabases": ["Database1", "Database2"],
  "explanation": "Short advice on how to use this query"
}`;

      const result = await model.generateContent(prompt);
      const text = result.response.text();
      const cleaned = text.replace(/```json/g, "").replace(/```/g, "").trim();
      return JSON.parse(cleaned);
    } catch (err) {
      console.warn("Gemini API error in query builder, falling back to heuristic synthesis:", err);
    }
  }

  // Heuristic Rule-Based Fallback Generator
  const words = topic
    .replace(/[^\w\s-]/g, "")
    .split(/\s+/)
    .filter((w) => w.length > 3 && !["with", "from", "that", "this", "using", "study", "paper"].includes(w.toLowerCase()));

  const primaryTerms = words.slice(0, 3);
  const booleanString = primaryTerms.length > 0
    ? primaryTerms.map((term) => `("${term}" OR "${term}s*")`).join(" AND ")
    : `("${topic}")`;

  return {
    booleanString,
    keywords: primaryTerms,
    suggestedDatabases: dept?.facultyCode === "FHLS"
      ? ["PubMed", "Cochrane Library", "ScienceDirect"]
      : dept?.facultyCode === "FSIT"
      ? ["IEEE Xplore", "ACM Digital Library", "Scopus", "ArXiv"]
      : ["Scopus", "Web of Science", "JSTOR", "Google Scholar"],
    explanation: `Constructed Boolean search combining core entities with truncation wildcards suited for ${dept?.name || "your field"}.`
  };
}

export async function generateThesisMilestones(params: {
  problemStatement: string;
  researchGap: string;
  objectives: string[];
  timelineWeeks: number;
  departmentCode: DepartmentCode;
}): Promise<MilestoneTask[]> {
  const dept = getDepartmentByCode(params.departmentCode);
  const archetype = dept?.archetype || "Standard Methodology";

  if (genAI) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
      const prompt = `You are a distinguished University Faculty Advisor and Thesis Committee Chair.
Generate a structured, phased thesis milestone execution plan for a student.
Parameters:
- Discipline: ${dept?.name} (${dept?.code})
- Tooling Archetype: ${archetype}
- Target Timeline: ${params.timelineWeeks} Weeks
- Problem Statement: "${params.problemStatement}"
- Research Gap: "${params.researchGap}"
- Specific Objectives: ${JSON.stringify(params.objectives)}

Generate an array of 6-8 structured milestone tasks divided logically across 5 sequential phases:
Phase 1: Problem Definition & Literature Matrix (Weeks 1-3)
Phase 2: Methodology Architecture & Ethical Approvals (Weeks 4-7)
Phase 3: Implementation, Data Collection & Benchmarking (Weeks 8-11)
Phase 4: Comparative Evaluation, Ablation & Discussion (Weeks 12-14)
Phase 5: Thesis Manuscript Finalization & Defense Prep (Weeks 15-16)

Return ONLY a valid JSON array of objects matching this TypeScript interface:
[
  {
    "id": "task-1",
    "title": "Title in English",
    "titleBn": "বাংলায় শিরোনাম",
    "description": "Clear step description",
    "descriptionBn": "বাংলায় ধাপের বিবরণ",
    "phase": 1,
    "phaseName": "Phase 1: Problem Definition & Literature Matrix",
    "phaseNameBn": "ধাপ ১: সমস্যা নির্ধারণ ও লিটারেচার ম্যাট্রিক্স",
    "estimatedWeeks": "Week 1 - 3",
    "completed": false,
    "deliverable": "Specific tangible artifact (e.g. 15-paper comparative synthesis table)",
    "advisorCheckin": true,
    "tips": ["Tip 1", "Tip 2"]
  }
]`;

      const result = await model.generateContent(prompt);
      const text = result.response.text();
      const cleaned = text.replace(/```json/g, "").replace(/```/g, "").trim();
      const parsed = JSON.parse(cleaned);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    } catch (err) {
      console.warn("Gemini API error in milestone generator, using disciplined template:", err);
    }
  }

  // Resilient High-Fidelity Phased Milestone Generator
  return [
    {
      id: "task-1-lit-matrix",
      title: "Systematic Literature Matrix & Citation Mapping",
      titleBn: "পদ্ধতিগত লিটারেচার ম্যাট্রিক্স ও সাইটেশন ম্যাপিং",
      description: `Survey 20+ recent publications (current year & last 4 years) from ${dept?.keyVenues?.join(", ") || "top venues"}. Extract metrics, limitations, and benchmark datasets into an annotated comparative matrix.`,
      descriptionBn: `সাম্প্রতিক ২০+ গবেষণাপত্র সংগ্রহ করে তাদের ফলাফল, সীমাবদ্ধতা এবং ব্যবহূত ডেটাসেট একটি তুলনামূলক ম্যাট্রিক্সে লিপিবদ্ধ করুন।`,
      phase: 1,
      phaseName: "Phase 1: Problem Definition & Literature Synthesis",
      phaseNameBn: "ধাপ ১: সমস্যা নির্ধারণ ও লিটারেচার পর্যালোচনা",
      estimatedWeeks: "Weeks 1 - 3",
      completed: false,
      deliverable: "Annotated 20-paper literature review table highlighting state-of-the-art benchmark gap",
      advisorCheckin: true,
      tips: [
        "Use the Three-Pass reading method for efficiency.",
        `Format preliminary bibliography using ${dept?.recommendedCitation || "IEEE"} standard.`
      ]
    },
    {
      id: "task-2-methodology-blueprint",
      title: "Methodology Architecture & Institutional Ethical Approval",
      titleBn: "মেথডলজি আর্কিটেকচার ও প্রাতিষ্ঠানিক অনুমোদন",
      description: `Formalize the mathematical, empirical, or qualitative framework. Prepare PRISMA diagram or algorithmic flowcharts. Obtain required institutional review or supervisor approval.`,
      descriptionBn: `গবেষণার গাণিতিক বা পরীক্ষামূলক আর্কিটেকচার চূড়ান্ত করুন এবং সুপারভাইজারের নিকট থেকে মেথডলজির ছাড়পত্র গ্রহণ করুন।`,
      phase: 2,
      phaseName: "Phase 2: Methodology Architecture & Approvals",
      phaseNameBn: "ধাপ ২: মেথডলজি কাঠামো ও প্রাতিষ্ঠানিক সম্মতি",
      estimatedWeeks: "Weeks 4 - 6",
      completed: false,
      deliverable: "Complete Chapter 3 (Methodology) draft including detailed pipeline diagram",
      advisorCheckin: true,
      tips: [
        `Recommended tool stack for this step: ${dept?.primaryTools?.slice(0, 3).join(", ") || "Standard tools"}`,
        "Document all hyperparameter or variable configurations explicitly for reproducibility."
      ]
    },
    {
      id: "task-3-data-collection",
      title: "Benchmark Dataset Acquisition & Preprocessing Pipeline",
      titleBn: "বেঞ্চমার্ক ডেটাসেট সংগ্রহ ও ডেটা প্রিপ্রসেসিং পাইপলাইন",
      description: `Acquire and validate target data (${dept?.benchmarkDatasets?.slice(0, 2).join(" / ") || "verified datasets"}). Clean missing values, handle normalization, and conduct exploratory data analysis (EDA).`,
      descriptionBn: `প্রয়োজনীয় ডেটা সংগ্রহ করুন, মিসিং ভ্যালু ক্লিন করুন এবং এক্সপ্লোরেটরি ডেটা অ্যানালিসিস সম্পন্ন করুন।`,
      phase: 3,
      phaseName: "Phase 3: Data Preparation & Implementation",
      phaseNameBn: "ধাপ ৩: ডেটা প্রস্তুতি ও বাস্তবায়ন",
      estimatedWeeks: "Weeks 7 - 9",
      completed: false,
      deliverable: "Reproducible preprocessing scripts and exploratory data analysis report",
      advisorCheckin: false,
      tips: [
        "Store raw data separately in a read-only partition.",
        "Ensure training/testing splits prevent data leakage across folds."
      ]
    },
    {
      id: "task-4-experimentation",
      title: "Model Execution, Empirical Experimentation & Benchmarking",
      titleBn: "মডেল চালনা, পরীক্ষণ ও বেঞ্চমার্কিং",
      description: `Execute core experiments utilizing free cloud environments (Kaggle / Colab) or specialized tools. Record accuracy, F1, p-values, or thematic codes against baseline models.`,
      descriptionBn: `প্রধান পরীক্ষণ সম্পন্ন করুন, ক্লাউড কম্পিউট ব্যবহার করে ফলাফল সংরক্ষণ করুন এবং বেসলাইনের সাথে তুলনা করুন।`,
      phase: 3,
      phaseName: "Phase 3: Data Preparation & Implementation",
      phaseNameBn: "ধাপ ৩: ডেটা প্রস্তুতি ও বাস্তবায়ন",
      estimatedWeeks: "Weeks 10 - 12",
      completed: false,
      deliverable: "Tabulated experimental results and statistical significance test logs",
      advisorCheckin: true,
      tips: [
        "Enable Automatic Mixed Precision (AMP) to avoid out-of-memory errors on free GPUs.",
        "Log intermediate checkpoints to cloud drive every epoch or iteration."
      ]
    },
    {
      id: "task-5-ablation-discussion",
      title: "Ablation Study, Error Analysis & IMRAD Synthesis",
      titleBn: "অ্যাবলেশন স্টাডি, ত্রুটি বিশ্লেষণ ও ফলাফল আলোচনা",
      description: `Conduct ablation studies to isolate the individual contribution of proposed modules. Synthesize the Discussion section: contextualize findings against prior literature.`,
      descriptionBn: `প্রস্তাবিত মডেলের বিভিন্ন উপাদানের কার্যকারিতা যাচাইয়ে অ্যাবলেশন স্টাডি করুন এবং পূর্ববর্তী গবেষণার প্রেক্ষিতে ফলাফল আলোচনা লিখুন।`,
      phase: 4,
      phaseName: "Phase 4: Results, Discussion & Critical Analysis",
      phaseNameBn: "ধাপ ৪: ফলাফল, আলোচনা ও বিশ্লেষণ",
      estimatedWeeks: "Weeks 13 - 14",
      completed: false,
      deliverable: "Draft of Chapter 4 (Results & Discussion) with publication-quality charts",
      advisorCheckin: true,
      tips: [
        "Discuss unexpected negative results honestly—reviewers respect rigorous error analysis.",
        "Ensure all figure legends and tables are self-contained."
      ]
    },
    {
      id: "task-6-manuscript-defense",
      title: "Manuscript Finalization, Anti-Plagiarism Audit & Defense Prep",
      titleBn: "থিসিস পাণ্ডুলিপি চূড়ান্তকরণ, প্লেজিয়ারিজম অডিট ও ডিফেন্স প্রস্তুতি",
      description: `Complete the full thesis manuscript. Run Turnitin similarity audit (aim for < 15% similarity excluding bibliography). Generate AI disclosure statement. Prepare defense slide deck.`,
      descriptionBn: `সম্পূর্ণ থিসিস পাণ্ডুলিপি একত্রিত করুন, টার্নিটিন প্লেজিয়ারিজম অডিট সম্পন্ন করুন এবং ডিফেন্সের জন্য স্লাইড তৈরি করুন।`,
      phase: 5,
      phaseName: "Phase 5: Thesis Defense & Camera-Ready Submission",
      phaseNameBn: "ধাপ ৫: থিসিস ডিফেন্স ও চূড়ান্ত প্রকাশনা",
      estimatedWeeks: "Weeks 15 - 16",
      completed: false,
      deliverable: "Final signed thesis PDF, AI Disclosure Statement, and 15-minute defense presentation deck",
      advisorCheckin: true,
      tips: [
        "Rehearse presentation timing—allocate 1 minute per slide maximum.",
        "Double-check all references against the departmental citation format."
      ]
    }
  ];
}
