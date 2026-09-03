export type FacultyCode = "FSIT" | "FE" | "FBE" | "FHLS" | "FHSS" | "OTHER";

export type DepartmentCode =
  // FSIT
  | "CSE"
  | "SWE"
  | "CIS"
  | "ITM"
  | "MCT"
  | "ESDM"
  | "PESS"
  // FE
  | "EEE"
  | "TE"
  | "CE"
  | "ARCH"
  // FBE
  | "BBA"
  | "DoIE"
  | "REAL"
  | "THM"
  | "BIT"
  // FHLS
  | "PHARM"
  | "PH"
  | "NFE"
  | "AGRI"
  // FHSS
  | "ENG"
  | "LAW"
  | "JMC"
  | "DS"
  // Other / Custom Department
  | "OTHER";

export type AcademicLevel = "undergraduate" | "masters" | "early_career";

export type SkillLevel = "beginner" | "intermediate" | "advanced";

export type ToolingArchetype =
  | "High Compute (PyTorch, Colab, Kaggle, LaTeX)"
  | "High Compute (DevOps, Repositories, IEEE)"
  | "Applied Data (SQL, Analytics, Elsevier)"
  | "Systems Analysis & Empirical Surveys"
  | "HCI, Design Research, UX Tooling"
  | "GIS, Spatial Datasets, Statistical Modeling"
  | "Biomechanics & Empirical Quantitative Tools"
  | "MATLAB, Circuit Simulators, IEEE Xplore"
  | "Materials Science, Testing Protocols"
  | "Structural CAD, Material Testing Datasets"
  | "Spatial Design, Qualitative Case Studies"
  | "SPSS, SmartPLS, Econometrics, Harvard Ref"
  | "Case Study Methodologies, Market Data"
  | "Valuation Models, Macroeconomic Datasets"
  | "Survey Metrics, Qualitative/Quantitative Mixed"
  | "Enterprise Systems, Mixed Quantitative"
  | "Molecular Docking, PubMed, PRISMA, APA"
  | "Epidemiology, Biostatistics (R/SPSS), WHO Data"
  | "Lab Methodologies, Bio-statistical Analysis"
  | "Field Experimentation, Environmental Datasets"
  | "MLA/Chicago, Hermeneutics, Textual Analysis"
  | "OSCOLA, Jurisprudence, Statutory Databases"
  | "Content/Thematic Analysis, Media Archives"
  | "Qualitative Fieldwork, Policy Data, World Bank";

export type CitationStyle = "IEEE" | "APA 7th" | "Harvard" | "MLA 9th" | "Chicago" | "OSCOLA";

export interface DepartmentInfo {
  code: DepartmentCode;
  name: string;
  nameBn: string;
  facultyCode: FacultyCode;
  facultyName: string;
  facultyNameBn: string;
  archetype: ToolingArchetype;
  recommendedCitation: CitationStyle;
  primaryTools: string[];
  keyVenues: string[];
  benchmarkDatasets: string[];
  methodologyFocus: string[];
  description: string;
  descriptionBn: string;
}

export interface UserProfile {
  name: string;
  institution: string;
  facultyCode: FacultyCode;
  departmentCode: DepartmentCode;
  primaryInterest: string;
  academicLevel: AcademicLevel;
  skillLevel: SkillLevel;
  thesisTitle?: string;
  targetTimelineWeeks: number;
  customDepartmentName?: string;
  customFacultyName?: string;
}

export interface Paper {
  id: string;
  title: string;
  authors: string[];
  year: number;
  venue: string;
  abstract: string;
  doi?: string;
  citationCount: number;
  openAccessUrl?: string;
  source: "OpenAlex" | "SemanticScholar" | "Curated";
  relevanceScore?: number;
  tags: string[];
}

export interface DatasetItem {
  id: string;
  title: string;
  description: string;
  descriptionBn: string;
  departments: DepartmentCode[];
  facultyCode: FacultyCode;
  sourceName: string;
  sourceUrl: string;
  format: string[];
  license: string;
  tags: string[];
}

export interface VenueItem {
  id: string;
  name: string;
  acronym: string;
  type: "Journal" | "Conference";
  tier: "Q1" | "Q2" | "Q3" | "Q4" | "CORE A*" | "CORE A" | "CORE B" | "CORE C";
  indexing: string[];
  hIndex?: number;
  field: string;
  deadlineText?: string;
  website: string;
  departments: DepartmentCode[];
}

export interface MilestoneTask {
  id: string;
  title: string;
  titleBn: string;
  description: string;
  descriptionBn: string;
  phase: number;
  phaseName: string;
  phaseNameBn: string;
  estimatedWeeks: string;
  completed: boolean;
  deliverable: string;
  advisorCheckin: boolean;
  tips: string[];
}

export interface ThesisMilestones {
  id: string;
  title: string;
  problemStatement: string;
  researchGap: string;
  objectives: string[];
  timelineWeeks: number;
  departmentCode: DepartmentCode;
  tasks: MilestoneTask[];
  createdAt: string;
  updatedAt: string;
}
