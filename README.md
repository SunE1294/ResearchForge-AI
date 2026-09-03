# ResearchForge AI: Discipline-Aware Academic Co-Pilot

[![Next.js](https://img.shields.io/badge/Next.js-15.1.7-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL_15+-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![Google Gemini](https://img.shields.io/badge/AI-Google_Gemini-4285F4?style=for-the-badge&logo=google)](https://aistudio.google.com/)
[![Vercel Ready](https://img.shields.io/badge/Deployment-Vercel_Edge-000000?style=for-the-badge&logo=vercel)](https://vercel.com/)

**ResearchForge AI** is a production-ready, discipline-aware, bilingual academic co-pilot engineered to transition university students (undergraduate capstones and master's dissertations) from initial research ambiguity to structured, ethical, publication-grade execution. 

> **Institutional Baseline**: Initial launch baseline calibrated for **Daffodil International University (DIU)**, architected for scalable multi-tenancy across all Bangladeshi and international tertiary institutions.

---

## 1. Problem Framing & Core Value Proposition

- **The Academic Deficit**: Early-career researchers face severe cold-start friction: deciphering indexations (Scopus, Web of Science, IEEE Xplore), reading literature critically, dodging predatory publishers, and locating open benchmark datasets and GPU compute.
- **The Mentorship Bottleneck**: Faculty advisors routinely supervise dozens of thesis groups concurrently, causing unavoidable feedback delays and fragmented foundational guidance.
- **The ResearchForge Solution**: A unified, zero-latency system providing personalized workspaces dynamically provisioned to the student's exact department. A Software Engineering scholar receives repository mining tooling and IEEE pipelines; a Pharmacy scholar receives AutoDock Vina, PubMed, and PRISMA systematic review workflows; a Law scholar receives OSCOLA citation formatting and statutory database portals.

---

## 2. Institutional Department Taxonomy (Database Seed Specification)

The onboarding engine classifies users across a **5-Faculty, 24-Department** hierarchical relational taxonomy:

| Faculty Code & Title | Dept Code | Department Name | Target Tooling Archetype & Citation |
| :--- | :--- | :--- | :--- |
| **FSIT** (Science & Info Tech) | `CSE` | Computer Science and Engineering | High Compute (PyTorch, Colab, Kaggle, LaTeX) &bull; **IEEE** |
| | `SWE` | Software Engineering | High Compute (DevOps, Repositories, IEEE) &bull; **IEEE** |
| | `CIS` | Computing and Information System | Applied Data (SQL, Analytics, Elsevier) &bull; **IEEE** |
| | `ITM` | Information Technology & Management | Systems Analysis & Empirical Surveys &bull; **APA 7th** |
| | `MCT` | Multimedia & Creative Technology | HCI, Design Research, UX Tooling &bull; **IEEE** |
| | `ESDM` | Environmental Science & Disaster Mgmt | GIS, Spatial Datasets, Statistical Modeling &bull; **APA 7th** |
| | `PESS` | Physical Education & Sports Science | Biomechanics & Empirical Quantitative Tools &bull; **APA 7th** |
| **FE** (Faculty of Engineering) | `EEE` | Electrical & Electronic Engineering | MATLAB, Circuit Simulators, IEEE Xplore &bull; **IEEE** |
| | `TE` | Textile Engineering | Materials Science, Testing Protocols &bull; **IEEE** |
| | `CE` | Civil Engineering | Structural CAD, Material Testing Datasets &bull; **IEEE** |
| | `ARCH` | Architecture | Spatial Design, Qualitative Case Studies &bull; **Chicago** |
| **FBE** (Business & Entrepreneurship) | `BBA` | Business Administration | SPSS, SmartPLS, Econometrics &bull; **Harvard** |
| | `DoIE` | Innovation & Entrepreneurship | Case Study Methodologies, Market Data &bull; **Harvard** |
| | `REAL` | Real Estate | Valuation Models, Macroeconomic Datasets &bull; **Harvard** |
| | `THM` | Tourism & Hospitality Management | Survey Metrics, Qualitative/Quantitative Mixed &bull; **APA 7th** |
| | `BIT` | Business Information Technology | Enterprise Systems, Mixed Quantitative &bull; **Harvard** |
| **FHLS** (Health & Life Sciences) | `PHARM` | Pharmacy | Molecular Docking, PubMed, PRISMA &bull; **APA 7th** |
| | `PH` | Public Health | Epidemiology, Biostatistics (R/SPSS), WHO Data &bull; **APA 7th** |
| | `NFE` | Nutrition & Food Engineering | Lab Methodologies, Bio-statistical Analysis &bull; **APA 7th** |
| | `AGRI` | Agricultural Science | Field Experimentation, Environmental Datasets &bull; **APA 7th** |
| **FHSS** (Humanities & Social Sciences) | `ENG` | English | MLA/Chicago, Hermeneutics, Textual Analysis &bull; **MLA 9th** |
| | `LAW` | Law | OSCOLA, Jurisprudence, Statutory Databases &bull; **OSCOLA** |
| | `JMC` | Journalism, Media & Communication | Content/Thematic Analysis, Media Archives &bull; **APA 7th** |
| | `DS` | Development Studies | Qualitative Fieldwork, Policy Data, World Bank &bull; **APA 7th** |

---

## 3. System Architecture & Phased Modules

```
ResearchForge AI Architecture
├── Phase A: Contextual Onboarding & Personalization Engine
│   ├── 3-Step Wizard: Student Identity, Faculty/Department Taxonomy, Research Focus
│   ├── Real-time Bilingual Localization (English ⇄ বাংলা)
│   └── High-contrast WCAG 2.1 AA Dark/Light Theme Switching
│
├── Phase B: Academic Foundations (Educational Knowledge Base)
│   ├── Typology Matrices (Conference vs. Scopus Q1-Q4 Journal vs. SLR vs. Master's Thesis)
│   ├── S. Keshav's Three-Pass Reading Method (Bird's Eye, Content Grasp, Deep Critique)
│   ├── IMRAD Anatomical Deconstruction (Introduction, Methodology, Results, Discussion)
│   ├── PRISMA 2020 Flowchart Interactive Generator
│   └── 4-Quadrant Research Gap Taxonomy (Contradictory, Methodological, Contextual, Emerging Tech)
│
├── Phase C: Discovery & Venue Intelligence
│   ├── Live Literature Search via OpenAlex & Semantic Scholar REST APIs
│   ├── Google Gemini Boolean Search Query Constructor (AND, OR, NOT, wildcards)
│   ├── Curated Benchmark Dataset Directory (HuggingFace, UCI, WHO, World Bank, DSE)
│   ├── Venue Tracker (Scimago Quartiles Q1-Q4, CORE Ranks A*, A, B, C)
│   └── Predatory Journal Shield (5-point Anti-Scam verification checklist & official ISSN verifiers)
│
└── Phase D: Active Research Execution Workspace
    ├── Dynamic Gantt-style Thesis Milestone Planner (Phase-by-phase deliverables & supervisor check-ins)
    ├── Completion Progress Tracker with celebratory particle confetti on 100% completion
    ├── Multi-format Export (Markdown .md, JSON schema, Clean Print View)
    ├── Ethical AI Guide & Turnitin AI Writing Score Mechanics
    ├── Standardized Thesis AI Disclosure Statement Generator
    └── Cloud Compute Navigator (Free Kaggle 30h T4/P100, Google Colab, and low-VRAM FP16 PyTorch hacks)
```

---

## 4. Technical Stack & Security Architecture

| Architectural Layer | Selected Technology | Rationale & Role |
| :--- | :--- | :--- |
| **Frontend Framework** | **Next.js 15 (App Router, React 19)** | Lightning-fast Server Components, edge rendering, zero API key leakage. |
| **Styling & Theme** | **Tailwind CSS + next-themes** | WCAG 2.1 AA compliant contrast ratios; zero-layout-shift Dark & Light modes. |
| **Client State Management** | **Zustand (with LocalStorage Sync)** | Frictionless zero-login guest mode with full client persistence. |
| **Bilingual Localization** | **Native Dictionary Engine (`en.json`, `bn.json`)** | Instant seamless toggling between English and Bengali (বাংলা). |
| **AI Orchestration** | **Google Gemini 1.5 Pro & Flash** | Flash for instantaneous Boolean query synthesis; Pro for structured phased roadmaps. |
| **Academic Discovery APIs** | **OpenAlex & Semantic Scholar REST APIs** | Resilient dual-source concurrent fetching, deduplication, and open access PDF discovery. |
| **Database & Auth** | **Supabase (PostgreSQL 15+)** | Production relational modeling with Row Level Security (RLS) policies. |
| **Security & Hardening** | **Strict CSP Headers & Zod Validation** | `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, and schema validation. |

### Supabase Row Level Security (RLS) Policy

All user roadmaps, profiles, and saved papers are secured at the PostgreSQL kernel level:

```sql
ALTER TABLE public.user_roadmaps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only access their own roadmaps" 
ON public.user_roadmaps 
FOR ALL 
USING (auth.uid() = user_id);
```

---

## 5. Local Setup & Quickstart

### Prerequisites
- **Node.js**: v18.18.0+ or v20+ (tested on Node v25)
- **Package Manager**: npm or pnpm

### Step 1: Clone the Repository
```bash
git clone https://github.com/SunE1294/ResearchForge-AI.git
cd ResearchForge-AI
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables (Optional)
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Configure your keys:
```env
# Optional: For live Gemini LLM generation (fallback heuristic generator runs automatically if empty)
GEMINI_API_KEY=your_gemini_api_key_here

# Optional: For Supabase PostgreSQL cloud sync (defaults to localStorage if empty)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

> **Zero-Config Resilient Mode**: ResearchForge AI runs out of the box even without API keys! If `GEMINI_API_KEY` is not provided, the platform automatically utilizes intelligent domain-aware heuristic generators for Boolean search queries and thesis milestone roadmaps.

### Step 4: Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 6. Building & Deploying to Vercel

### Step 1: Production Build Verification
```bash
npm run build
```
Ensure 0 TypeScript errors and 0 build warnings.

### Step 2: One-Click Vercel Deployment
1. Push your code to your GitHub repository: `https://github.com/SunE1294/ResearchForge-AI`.
2. Navigate to [Vercel Dashboard](https://vercel.com/new).
3. Import the `ResearchForge-AI` repository.
4. Add your Environment Variables (`GEMINI_API_KEY`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
5. Click **Deploy**.

---

## 7. Institutional Governance & Ethical AI Statement

ResearchForge AI is strictly committed to upholding international standards of academic integrity. The platform does **not** engage in ghostwriting, data fabrication, or unauthorized automated generation of scientific text. It equips early-career scholars with the foundational literacy, critical thinking frameworks, and transparent AI disclosure protocols necessary to conduct responsible, peer-reviewed research.

---

## 8. License

This project is licensed under the [MIT License](LICENSE).

Developed with pride for the academic and scientific research community.
