# ResearchForge AI: Discipline-Aware Academic Co-Pilot

[![Next.js](https://img.shields.io/badge/Next.js-15.1.7-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL_17-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![Google Gemini](https://img.shields.io/badge/AI-Google_Gemini-4285F4?style=for-the-badge&logo=google)](https://aistudio.google.com/)
[![Vercel Ready](https://img.shields.io/badge/Deployment-Vercel_Edge-000000?style=for-the-badge&logo=vercel)](https://vercel.com/)

**ResearchForge AI** is a production-ready, discipline-aware, bilingual academic co-pilot engineered to transition tertiary university students (undergraduate capstones and master's dissertations) from initial thesis ambiguity to structured, ethical, publication-grade research execution.

> **Institutional Baseline**: Initial launch baseline calibrated for **Daffodil International University (DIU)**, architected for scalable multi-tenancy across all Bangladeshi and international tertiary institutions with custom department support.

---

## 1. Problem Framing & Core Value Proposition

- **The Academic Deficit**: Early-career researchers face severe cold-start friction: deciphering academic indexations (Scopus, Web of Science, IEEE Xplore), reading literature critically, avoiding predatory publishers, and locating open benchmark datasets and GPU compute.
- **The Mentorship Bottleneck**: Faculty advisors routinely supervise dozens of thesis teams simultaneously, resulting in feedback delays and fragmented foundational guidance.
- **The ResearchForge Solution**: A unified, zero-latency system providing personalized workspaces provisioned to the student's exact discipline. A Computer Science student receives PyTorch and IEEE pipelines; a Pharmacy scholar receives AutoDock Vina, PubMed, and PRISMA systematic review workflows; a Law scholar receives OSCOLA citation formatting and statutory database portals.

---

## 2. Discipline-Aware Taxonomy & Multi-Disciplinary Support

ResearchForge AI features a comprehensive relational taxonomy supporting **24 institutional departments across 5 faculties**, with dynamic tooling archetypes, benchmark datasets, and citation standards:

- **Faculty of Science & Information Technology (FSIT)**: CSE, SWE, CIS, ITM, MCT, ESDM, PESS &bull; *High Compute, Applied Data, Biostatistics, IEEE & APA*
- **Faculty of Engineering (FE)**: EEE, TE, CE, ARCH &bull; *Circuit Simulation, Materials Testing, Structural CAD, IEEE & Chicago*
- **Faculty of Business & Entrepreneurship (FBE)**: BBA, DoIE, REAL, THM, BIT &bull; *Econometrics, SmartPLS, Market Feeds, Harvard & APA*
- **Faculty of Health & Life Sciences (FHLS)**: PHARM, PH, NFE, AGRI &bull; *Molecular Docking, Epidemiology, Bioassays, APA 7th*
- **Faculty of Humanities & Social Sciences (FHSS)**: ENG, LAW, JMC, DS &bull; *Hermeneutics, Statutory Repositories, OSCOLA, MLA 9th & APA*
- **Custom / Multi-Disciplinary Option**: Students from any tertiary institution can select **"Other Department"** and specify their custom field (e.g., Robotics, Economics, Microbiology) to receive a tailored multi-disciplinary workspace.

---

## 3. Key Features

### Contextual Onboarding & Personalization
- **3-Step Wizard**: Configures student identity, institution, faculty, department (with custom department input), and research goals.
- **Bilingual Localization**: Instant client-side switching between English and Bengali (**বাংলা**).
- **Theme Engine**: WCAG 2.1 AA compliant Dark and Light mode switching with zero layout shift.

### Academic Foundations & Critical Literacy
- **Typology Matrices**: Interactive deconstructions of Conference Proceedings (CORE A*–C), Scopus/SCIE Journals (Q1–Q4), Systematic Literature Reviews (SLRs), and Master's Theses.
- **Three-Pass Reading Method**: S. Keshav's structured reading workflow with stage timers and verification checkpoints.
- **IMRAD Anatomical Breakdown**: Structural formulas and common novice pitfalls for Introduction, Methodology, Results, and Discussion.
- **PRISMA 2020 Flowchart Generator**: Real-time SLR screening calculator and visual flowchart builder.
- **4-Quadrant Research Gap Taxonomy**: Actionable frameworks for Contradictory, Methodological, Contextual, and Emerging Technology gaps.

### Academic Discovery & Venue Intelligence
- **Dual-Source Literature Search**: Concurrent REST queries across **OpenAlex** and **Semantic Scholar** with title deduplication, citation metrics, and direct open-access PDF links.
- **Boolean Query Constructor**: Google Gemini AI assistant that converts thesis prompts into Boolean search queries (`AND`, `OR`, `NOT`, wildcards) tailored for IEEE Xplore, PubMed, and Scopus.
- **Benchmark Dataset Directory**: Discipline-curated benchmark repositories (HuggingFace, UCI, Copernicus Sentinel, World Bank, DSE, WHO, PubChem).
- **Venue & Predatory Journal Shield**: Scimago quartiles (Q1–Q4), CORE tiers, and a 5-point Anti-Scam inspection protocol linked to official ISSN portals.

### Active Research Execution Workspace
- **Dynamic Gantt Milestone Planner**: Phased thesis timeline generator (Phases 1–5) with deliverables, supervisor check-ins, and interactive progress tracking with confetti celebration on 100% completion.
- **Multi-Format Export**: Export roadmaps directly to Markdown (`.md`), JSON, or a clean printable view.
- **Ethical AI Policy Navigator**: Turnitin AI similarity scoring breakdown and an interactive **AI Disclosure Statement Generator** for publication-ready declarations.
- **Cloud GPU Compute Navigator**: Zero-cost cloud environments guide (Kaggle 30h T4/P100, Google Colab, Lightning AI) and low-VRAM FP16 PyTorch memory optimization snippets.

---

## 4. Technical Stack & Security Architecture

| Architectural Layer | Selected Technology | Rationale & Role |
| :--- | :--- | :--- |
| **Frontend Framework** | **Next.js 15 (App Router, React 19)** | Lightning-fast Server Components, edge runtime, zero API key leakage. |
| **Styling & Design** | **Tailwind CSS + next-themes** | High-contrast WCAG 2.1 AA ratios; zero-layout-shift Dark & Light modes. |
| **Client State** | **Zustand (with LocalStorage Sync)** | Frictionless zero-login guest mode with full client-side persistence. |
| **Bilingual Localization** | **Native Dictionary Engine (`en.json`, `bn.json`)** | Real-time bilingual toggling between English and Bengali. |
| **AI Orchestration** | **Google Gemini 1.5 Pro & Flash** | Fast Boolean query synthesis and structured thesis roadmap generation. |
| **Academic Discovery APIs** | **OpenAlex & Semantic Scholar REST APIs** | Concurrent fetching, deduplication, and open-access PDF discovery. |
| **Database** | **Supabase (PostgreSQL 17)** | Connection pooling via `pg.Pool` with comprehensive database migrations. |
| **Security & Hardening** | **Row Level Security (RLS) & Strict CSP** | PostgreSQL RLS policies (`auth.uid() = user_id`), strict HTTP security headers (`X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`), and Zod input validation. |

---

## 5. Local Setup & Quickstart

### Prerequisites
- **Node.js**: v18.18.0+ or v20+
- **Package Manager**: `npm` or `pnpm`

### Quickstart in 3 Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/SunE1294/ResearchForge-AI.git
   cd ResearchForge-AI
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Configuration (Optional)
Copy `.env.example` to `.env.local` to connect live database and AI services:
```bash
cp .env.example .env.local
```

```env
# Optional: Google Gemini API Key for live AI generation
GEMINI_API_KEY=your_gemini_key

# Optional: Supabase PostgreSQL connection
DATABASE_URL=postgresql://postgres.your-project:your_password@aws-0-region.pooler.supabase.com:6543/postgres?sslmode=require
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
```

> **Zero-Config Resilient Mode**: ResearchForge AI runs immediately out of the box even without API keys! If external keys are omitted, the application automatically uses domain-aware heuristic fallbacks and local storage persistence.

---

## 6. Building & Deploying to Vercel

1. **Verify Production Build**:
   ```bash
   npm run build
   ```
2. **Deploy via Vercel Dashboard**:
   - Go to [Vercel Dashboard](https://vercel.com/new).
   - Import your GitHub repository: `https://github.com/SunE1294/ResearchForge-AI`.
   - In **Environment Variables**, add `DATABASE_URL`, `NEXT_PUBLIC_SUPABASE_URL`, and optionally `GEMINI_API_KEY`.
   - Click **Deploy**.

---

## 7. Institutional Governance & Academic Integrity

ResearchForge AI is strictly committed to upholding international standards of academic integrity. The platform does **not** engage in ghostwriting, data fabrication, or unauthorized automated generation of scientific text. It equips early-career scholars with the foundational literacy, critical thinking frameworks, and transparent AI disclosure protocols necessary to conduct responsible, peer-reviewed research.

---

## 8. License

This project is open source and licensed under the [MIT License](LICENSE).

Developed with pride for the academic and scientific research community.
