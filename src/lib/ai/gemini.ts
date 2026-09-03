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

export interface SurveyQuestionnaireResult {
  title: string;
  methodologyType: "quantitative" | "qualitative";
  targetAudience: string;
  informedConsent: {
    title: string;
    studyTitle: string;
    investigatorInfo: string;
    purpose: string;
    voluntaryClause: string;
    confidentiality: string;
    dataProtection: string;
    contactInfo: string;
  };
  demographics: Array<{
    id: string;
    question: string;
    type: "multiple_choice" | "text";
    options?: string[];
  }>;
  constructs?: Array<{
    constructName: string;
    description: string;
    variableCode: string;
    items: Array<{
      id: string;
      itemText: string;
      scale: string;
      isReverseCoded: boolean;
      rationale: string;
    }>;
  }>;
  interviewProtocol?: Array<{
    id: string;
    phase: string;
    mainQuestion: string;
    probingQuestions: string[];
    interviewerNote: string;
  }>;
  ethicsChecklist: Array<{
    title: string;
    requirement: string;
    status: "mandatory" | "recommended";
  }>;
  googleFormsTips: {
    sections: string[];
    validationAdvice: string[];
    spssEncodingRules: string[];
  };
}

export async function generateSurveyQuestionnaire(params: {
  topic: string;
  variables: string;
  methodologyType: "quantitative" | "qualitative";
  targetAudience: string;
  facultyCode?: string;
  locale?: string;
}): Promise<SurveyQuestionnaireResult> {
  const { topic, variables, methodologyType, targetAudience, locale = "en" } = params;

  if (genAI) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `You are an expert Professor of Academic Research Methodology and Psychometrics.
Design an institutionally compliant, bias-free academic instrument based on these requirements:
- Research Topic: "${topic}"
- Target Variables / Constructs: "${variables || "Perceived Usability, Adoption Intent, Ethical Concerns"}"
- Methodology Mode: ${methodologyType === "quantitative" ? "Quantitative (5-Point Likert Scale Survey)" : "Qualitative (Semi-Structured Interview Protocol)"}
- Target Audience: "${targetAudience || "Undergraduate University Students / Early-Career Professionals"}"
- Language: ${locale === "bn" ? "Provide Bengali alongside English for items" : "English"}

REQUIREMENTS:
1. If Quantitative: Generate EXACTLY 10 scale items split across 2 well-defined constructs (5 items each). Use standard 5-point Likert (1=Strongly Disagree to 5=Strongly Agree). Include 2 reverse-coded items to combat acquiescence bias. Ensure NO leading or double-barreled questions.
2. If Qualitative: Generate EXACTLY 6 semi-structured interview questions across 3 phases (Opening, Core In-Depth Exploration, Reflection/Concluding) with 2-3 probing sub-questions per main item.
3. Include an Informed Consent Statement complying with IRB ethical standards (voluntary, anonymous, right to withdraw).
4. Include 4 relevant demographic questions.
5. Include an Ethics & Data Protection Checklist.
6. Include actionable Google Forms structuring rules and SPSS/Python CSV export guidance.

Return ONLY a valid JSON object strictly matching this schema:
{
  "title": "string",
  "methodologyType": "${methodologyType}",
  "targetAudience": "${targetAudience}",
  "informedConsent": {
    "title": "Participant Informed Consent Form",
    "studyTitle": "string",
    "investigatorInfo": "Academic Researcher / Thesis Investigator",
    "purpose": "string",
    "voluntaryClause": "string",
    "confidentiality": "string",
    "dataProtection": "string",
    "contactInfo": "research.ethics@university.edu"
  },
  "demographics": [
    { "id": "demo-1", "question": "string", "type": "multiple_choice", "options": ["opt1", "opt2"] }
  ],
  "constructs": [
    {
      "constructName": "string",
      "description": "string",
      "variableCode": "string",
      "items": [
        {
          "id": "item-1",
          "itemText": "string",
          "scale": "5-point Likert (1: Strongly Disagree to 5: Strongly Agree)",
          "isReverseCoded": false,
          "rationale": "Measures core construct"
        }
      ]
    }
  ],
  "interviewProtocol": [
    {
      "id": "proto-1",
      "phase": "Opening / Warm-up",
      "mainQuestion": "string",
      "probingQuestions": ["probe 1", "probe 2"],
      "interviewerNote": "string"
    }
  ],
  "ethicsChecklist": [
    { "title": "Informed Consent", "requirement": "Participant must check agreement before answering", "status": "mandatory" }
  ],
  "googleFormsTips": {
    "sections": ["Section 1: ...", "Section 2: ..."],
    "validationAdvice": ["Tip 1", "Tip 2"],
    "spssEncodingRules": ["Rule 1", "Rule 2"]
  }
}`;

      const result = await model.generateContent(prompt);
      const text = result.response.text();
      const cleaned = text.replace(/```json/g, "").replace(/```/g, "").trim();
      const parsed = JSON.parse(cleaned);
      return parsed;
    } catch (err) {
      console.warn("Gemini survey generator error, activating expert heuristic engine:", err);
    }
  }

  // Expert Heuristic Rule-Based Psychometric Engine
  const parsedVars = variables
    ? variables.split(/[,;&]/).map((v) => v.trim()).filter(Boolean)
    : ["Perceived Usefulness", "Adoption Barriers & Trust"];
  
  const var1 = parsedVars[0] || "Perceived Practical Value";
  const var2 = parsedVars[1] || "Behavioral Adoption & Trust";

  if (methodologyType === "quantitative") {
    return {
      title: `Empirical Assessment Instrument: ${topic}`,
      methodologyType: "quantitative",
      targetAudience: targetAudience || "Undergraduate University Students and Practitioners",
      informedConsent: {
        title: "Academic Research Participant Informed Consent",
        studyTitle: `An Empirical Investigation into ${topic}`,
        investigatorInfo: "Thesis Investigator, Academic Faculty Board",
        purpose: `This survey investigates empirical patterns regarding ${topic} to support peer-reviewed thesis analysis and statistical model validation.`,
        voluntaryClause: "Participation is completely voluntary. You have the unconditional right to decline answering any question or withdraw at any stage without penalty.",
        confidentiality: "All survey responses are collected strictly anonymously. No personally identifiable credentials (IP addresses, student IDs) will be recorded or published.",
        dataProtection: "Aggregated numeric datasets are stored on encrypted institutional cloud drives in compliance with IEEE/ACM academic data protection ethics.",
        contactInfo: "academic.survey.ethics@university.edu"
      },
      demographics: [
        {
          id: "demo-1",
          question: "What is your current academic / career level?",
          type: "multiple_choice",
          options: ["Undergraduate Scholar", "Graduate / Master's Student", "Faculty / Academic Researcher", "Industry Professional"]
        },
        {
          id: "demo-2",
          question: "How long have you been engaged with or utilizing technologies relevant to this domain?",
          type: "multiple_choice",
          options: ["Less than 6 months", "6 months - 1 year", "1 - 3 years", "More than 3 years"]
        },
        {
          id: "demo-3",
          question: "Estimated frequency of encountering or performing tasks related to this study:",
          type: "multiple_choice",
          options: ["Daily", "Several times a week", "Occasionally / Monthly", "Rarely or Never"]
        },
        {
          id: "demo-4",
          question: "Primary institutional or organizational domain:",
          type: "multiple_choice",
          options: ["Science & Engineering", "Business & Economics", "Health & Allied Sciences", "Humanities & Social Sciences", "Other"]
        }
      ],
      constructs: [
        {
          constructName: `Construct A: ${var1}`,
          description: `Evaluates participants' direct perception, effectiveness, and functional capability regarding ${var1}.`,
          variableCode: "VAR_A",
          items: [
            {
              id: "item-1",
              itemText: `Implementing solutions related to ${topic} significantly enhances my overall workflow efficiency.`,
              scale: "5-point Likert (1: Strongly Disagree to 5: Strongly Agree)",
              isReverseCoded: false,
              rationale: "Direct operational efficiency measurement."
            },
            {
              id: "item-2",
              itemText: `The foundational features of ${var1} are intuitive and easy to integrate into daily routines.`,
              scale: "5-point Likert (1: Strongly Disagree to 5: Strongly Agree)",
              isReverseCoded: false,
              rationale: "Perceived ease of use (TAM baseline)."
            },
            {
              id: "item-3",
              itemText: `I find the output and results generated through ${topic} consistently accurate and dependable.`,
              scale: "5-point Likert (1: Strongly Disagree to 5: Strongly Agree)",
              isReverseCoded: false,
              rationale: "Outcome reliability validation."
            },
            {
              id: "item-4",
              itemText: `Relying on ${var1} introduces unnecessary complexity and steep learning curves.`,
              scale: "5-point Likert (1: Strongly Disagree to 5: Strongly Agree)",
              isReverseCoded: true,
              rationale: "Reverse-coded item to diagnose and prevent acquiescence response bias."
            },
            {
              id: "item-5",
              itemText: `Overall, ${var1} is indispensable for achieving high-quality academic or professional outcomes in this domain.`,
              scale: "5-point Likert (1: Strongly Disagree to 5: Strongly Agree)",
              isReverseCoded: false,
              rationale: "Global construct satisfaction benchmark."
            }
          ]
        },
        {
          constructName: `Construct B: ${var2}`,
          description: `Captures behavioral intent, trust indicators, and adoption readiness concerning ${var2}.`,
          variableCode: "VAR_B",
          items: [
            {
              id: "item-6",
              itemText: `I feel confident in the ethical safeguards and transparency protocols applied within ${topic}.`,
              scale: "5-point Likert (1: Strongly Disagree to 5: Strongly Agree)",
              isReverseCoded: false,
              rationale: "Trust and transparency indicator."
            },
            {
              id: "item-7",
              itemText: `I intend to continue utilizing and advocating for ${var2} over the upcoming academic semester or year.`,
              scale: "5-point Likert (1: Strongly Disagree to 5: Strongly Agree)",
              isReverseCoded: false,
              rationale: "Future behavioral intention."
            },
            {
              id: "item-8",
              itemText: `The potential security and privacy vulnerabilities of ${topic} discourage me from wider adoption.`,
              scale: "5-point Likert (1: Strongly Disagree to 5: Strongly Agree)",
              isReverseCoded: true,
              rationale: "Reverse-coded barrier check."
            },
            {
              id: "item-9",
              itemText: `My peers and institutional leadership actively encourage the adoption of ${var2}.`,
              scale: "5-point Likert (1: Strongly Disagree to 5: Strongly Agree)",
              isReverseCoded: false,
              rationale: "Subjective norm evaluation (Theory of Planned Behavior)."
            },
            {
              id: "item-10",
              itemText: `Given adequate training and institutional resources, I would prioritize mastering ${topic}.`,
              scale: "5-point Likert (1: Strongly Disagree to 5: Strongly Agree)",
              isReverseCoded: false,
              rationale: "Facilitating conditions assessment."
            }
          ]
        }
      ],
      ethicsChecklist: [
        {
          title: "Informed Consent Gateway",
          requirement: "Participants MUST select 'I Agree' before accessing demographic and survey sections in Google Forms.",
          status: "mandatory"
        },
        {
          title: "Anonymous Response Mode",
          requirement: "Disable 'Collect email addresses' in Google Forms settings to maintain blind respondent anonymity.",
          status: "mandatory"
        },
        {
          title: "No Coercive Incentives",
          requirement: "Academic surveys must not tie grades, course credits, or biased incentives to questionnaire completion.",
          status: "mandatory"
        },
        {
          title: "Data Destruction Protocol",
          requirement: "Raw spreadsheet responses must be securely archived for 3 years post-defense, then permanently deleted.",
          status: "recommended"
        }
      ],
      googleFormsTips: {
        sections: [
          "Section 1: Study Title, Institutional Affiliation, Investigator Contact, and Mandatory Consent Checkbox.",
          "Section 2: Demographic Profiles (Multiple-choice with required toggle enabled).",
          "Section 3: Construct A Likert Matrix (Use 'Multiple choice grid' or individual 'Linear scale' from 1 to 5).",
          "Section 4: Construct B Likert Matrix (Linear scale 1: Strongly Disagree to 5: Strongly Agree).",
          "Section 5: Optional qualitative commentary and final submission confirmation."
        ],
        validationAdvice: [
          "Set 'Limit to 1 response' if Google Account sign-in is permissible, or clearly instruct respondents not to duplicate submissions.",
          "For reverse-coded items (items 4 and 8), ensure the visual scale labels remain identical (1 = Strongly Disagree, 5 = Strongly Agree); do not flip the labels manually."
        ],
        spssEncodingRules: [
          "In Google Sheets/CSV, recode reverse items in SPSS: Transform -> Recode into Same Variables (1=5, 2=4, 3=3, 4=2, 5=1).",
          "Define 'Variable View' with numeric types, 0 decimals, and Value Labels (1=SD, 2=D, 3=N, 4=A, 5=SA).",
          "Run Reliability Analysis: Analyze -> Scale -> Reliability Analysis to verify Cronbach's Alpha (aim for α ≥ 0.70)."
        ]
      }
    };
  }

  // Qualitative Semi-Structured Interview Protocol
  return {
    title: `Qualitative Semi-Structured Interview Protocol: ${topic}`,
    methodologyType: "qualitative",
    targetAudience: targetAudience || "Key Informants, Practitioners, and Domain Experts",
    informedConsent: {
      title: "Informed Consent & Audio-Recording Authorization",
      studyTitle: `A Qualitative Exploration of Experiences and Perspectives in ${topic}`,
      investigatorInfo: "Principal Investigator & Thesis Research Panel",
      purpose: `This qualitative investigation gathers deep experiential narratives, lived contexts, and thematic perspectives regarding ${topic}.`,
      voluntaryClause: "Participation in this 30-45 minute interview is voluntary. You may request pausing the audio recording, skipping questions, or terminating the session at any time.",
      confidentiality: "Interview transcripts will be pseudonymized (e.g., Participant P1, P2). Real institutional or individual identifiers will be stripped during thematic coding.",
      dataProtection: "Audio recordings will be stored in an encrypted offline volume and permanently erased upon completion and transcription validation.",
      contactInfo: "qualitative.ethics@university.edu"
    },
    demographics: [
      {
        id: "qual-demo-1",
        question: "Professional role or institutional position:",
        type: "text"
      },
      {
        id: "qual-demo-2",
        question: "Years of specialized experience in this field:",
        type: "multiple_choice",
        options: ["1 - 2 years", "3 - 5 years", "6 - 10 years", "More than 10 years"]
      },
      {
        id: "qual-demo-3",
        question: "Geographic or institutional setting:",
        type: "text"
      }
    ],
    interviewProtocol: [
      {
        id: "proto-1",
        phase: "Phase 1: Warm-Up & Contextual Background",
        mainQuestion: `Could you walk me through your initial journey and daily involvement with ${topic}?`,
        probingQuestions: [
          "How did your department or team initially decide to adopt this approach?",
          "What were your early expectations versus the initial reality?"
        ],
        interviewerNote: "Establish rapport, observe tone, and do not interrupt initial contextual storytelling."
      },
      {
        id: "proto-2",
        phase: "Phase 2: Core Operational Experience",
        mainQuestion: `When reflecting on your practical work, what specific moments or workflows highlight the greatest value of ${var1}?`,
        probingQuestions: [
          "Can you describe a specific incident where this made a critical difference?",
          "How did your colleagues or stakeholders react during that process?"
        ],
        interviewerNote: "Ask for concrete episodic anecdotes rather than abstract theoretical assertions."
      },
      {
        id: "proto-3",
        phase: "Phase 3: Bottlenecks, Failures & Friction Points",
        mainQuestion: `What are the most significant roadblocks, technical friction, or institutional resistance you have encountered?`,
        probingQuestions: [
          "Were these obstacles technological, cultural, ethical, or policy-related?",
          "How did you or your organization work around these hurdles?"
        ],
        interviewerNote: "Listen for unvoiced assumptions and systemic barriers (useful for Qualitative Grounded Theory / Thematic Analysis)."
      },
      {
        id: "proto-4",
        phase: "Phase 4: Trust, Ethics & Governance",
        mainQuestion: `How do concerns regarding transparency, ethical implications, and reliability shape decision-making around ${var2}?`,
        probingQuestions: [
          "Have you observed instances where ethical compromises or data privacy tensions occurred?",
          "What safeguards or verification steps do you personally apply before trusting outputs?"
        ],
        interviewerNote: "Probe deeper on 'why' and 'how' they verify outputs."
      },
      {
        id: "proto-5",
        phase: "Phase 5: Paradigm Shifts & Institutional Evolution",
        mainQuestion: `Looking back over the past few years, how has ${topic} fundamentally transformed standard practices in your environment?`,
        probingQuestions: [
          "What older processes have become obsolete?",
          "What new competencies or skills are now required that were previously unnecessary?"
        ],
        interviewerNote: "Encourage comparative reflection (past vs. present)."
      },
      {
        id: "proto-6",
        phase: "Phase 6: Future Projections & Concluding Reflections",
        mainQuestion: `If you were advising a new researcher or institutional leader beginning with ${topic}, what critical advice or cautionary wisdom would you share?`,
        probingQuestions: [
          "Is there any aspect we haven't discussed that you feel is crucial for this study?",
          "May we follow up if we need clarification during transcript validation?"
        ],
        interviewerNote: "Summarize key themes verbally to provide member-checking validation before concluding."
      }
    ],
    ethicsChecklist: [
      {
        title: "Audio Consent Agreement",
        requirement: "Verbally confirm consent to record audio once the recorder is turned on ('Do you consent to being recorded?').",
        status: "mandatory"
      },
      {
        title: "De-identification & Pseudonymity",
        requirement: "Replace participant names with identifiers (e.g. Expert-01, Clinician-B) in all analytical memos and transcripts.",
        status: "mandatory"
      },
      {
        title: "Member-Checking Protocol",
        requirement: "Send cleaned transcripts back to participants for factual verification (Qualitative Rigor & Credibility).",
        status: "recommended"
      },
      {
        title: "Secure Transcript Storage",
        requirement: "Store pseudonymized verbatim transcripts separate from the master key link file.",
        status: "mandatory"
      }
    ],
    googleFormsTips: {
      sections: [
        "Use Google Forms strictly for Participant Recruitment & Screening (not for conducting the interview itself).",
        "Form Section 1: Study Abstract, Eligibility Criteria, and Participant Information Sheet.",
        "Form Section 2: Contact Details (Email/Phone), Preferred Timeslots, and Remote Interview Platform (Zoom/Google Meet/In-person).",
        "Form Section 3: Pre-interview consent agreement with downloadable PDF consent link."
      ],
      validationAdvice: [
        "Enable field validation on phone/email inputs.",
        "Ensure participants understand interviews will be 30-45 minutes."
      ],
      spssEncodingRules: [
        "For qualitative coding, export transcripts to NVivo or ATLAS.ti, or perform inductive thematic analysis in Google Sheets using Open Coding columns.",
        "Synthesize codes into Axial categories and thematic networks (Braun & Clarke 6-phase framework)."
      ]
    }
  };
}

