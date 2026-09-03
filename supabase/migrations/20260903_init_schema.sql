-- ==============================================================================
-- ResearchForge AI: Production Supabase PostgreSQL Schema & RLS Policies
-- Document Version: 1.0.0
-- Initial Launch Baseline: Daffodil International University (Scalable to all BD tertiary institutions)
-- ==============================================================================

-- 1. Create Faculties Table
CREATE TABLE IF NOT EXISTS public.faculties (
    code VARCHAR(10) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    name_bn VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Departments Table
CREATE TABLE IF NOT EXISTS public.departments (
    code VARCHAR(10) PRIMARY KEY,
    faculty_code VARCHAR(10) REFERENCES public.faculties(code) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    name_bn VARCHAR(255) NOT NULL,
    archetype TEXT NOT NULL,
    recommended_citation VARCHAR(50) NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Seed Faculties
INSERT INTO public.faculties (code, name, name_bn, description) VALUES
('FSIT', 'Faculty of Science & Information Technology', 'বিজ্ঞান ও তথ্যপ্রযুক্তি অনুষদ', 'Computational sciences, software engineering, spatial data, and high compute'),
('FE', 'Faculty of Engineering', 'প্রকৌশল অনুষদ', 'Hardware systems, materials, structural modeling, telecommunications, and architecture'),
('FBE', 'Faculty of Business & Entrepreneurship', 'ব্যবসায় ও উদ্যোক্তা অনুষদ', 'Econometrics, empirical consumer behavior, market systems, and finance'),
('FHLS', 'Faculty of Health & Life Sciences', 'স্বাস্থ্য ও জীবন বিজ্ঞান অনুষদ', 'Biostatistics, epidemiology, molecular therapeutics, clinical nutrition, and agronomy'),
('FHSS', 'Faculty of Humanities & Social Sciences', 'মানবিক ও সামাজিক বিজ্ঞান অনুষদ', 'Hermeneutic analysis, statutory jurisprudence, qualitative fieldwork, and media')
ON CONFLICT (code) DO NOTHING;

-- 4. Seed 24 Departments
INSERT INTO public.departments (code, faculty_code, name, name_bn, archetype, recommended_citation) VALUES
-- FSIT
('CSE', 'FSIT', 'Computer Science and Engineering', 'কম্পিউটার সায়েন্স অ্যান্ড ইঞ্জিনিয়ারিং', 'High Compute (PyTorch, Colab, Kaggle, LaTeX)', 'IEEE'),
('SWE', 'FSIT', 'Software Engineering', 'সফটওয়্যার ইঞ্জিনিয়ারিং', 'High Compute (DevOps, Repositories, IEEE)', 'IEEE'),
('CIS', 'FSIT', 'Computing and Information System', 'কম্পিউটিং অ্যান্ড ইনফরমেশন সিস্টেম', 'Applied Data (SQL, Analytics, Elsevier)', 'IEEE'),
('ITM', 'FSIT', 'Information Technology & Management', 'ইনফরমেশন টেকনোলজি অ্যান্ড ম্যানেজমেন্ট', 'Systems Analysis & Empirical Surveys', 'APA 7th'),
('MCT', 'FSIT', 'Multimedia & Creative Technology', 'মাল্টিমিডিয়া অ্যান্ড ক্রিয়েটিভ টেকনোলজি', 'HCI, Design Research, UX Tooling', 'IEEE'),
('ESDM', 'FSIT', 'Environmental Science & Disaster Mgmt', 'পরিবেশ বিজ্ঞান ও দুর্যোগ ব্যবস্থাপনা', 'GIS, Spatial Datasets, Statistical Modeling', 'APA 7th'),
('PESS', 'FSIT', 'Physical Education & Sports Science', 'শারীরিক শিক্ষা ও ক্রীড়া বিজ্ঞান', 'Biomechanics & Empirical Quantitative Tools', 'APA 7th'),

-- FE
('EEE', 'FE', 'Electrical & Electronic Engineering', 'ইলেকট্রিক্যাল অ্যান্ড ইলেকট্রনিক ইঞ্জিনিয়ারিং', 'MATLAB, Circuit Simulators, IEEE Xplore', 'IEEE'),
('TE', 'FE', 'Textile Engineering', 'টেক্সটাইল ইঞ্জিনিয়ারিং', 'Materials Science, Testing Protocols', 'IEEE'),
('CE', 'FE', 'Civil Engineering', 'সিভিল ইঞ্জিনিয়ারিং', 'Structural CAD, Material Testing Datasets', 'IEEE'),
('ARCH', 'FE', 'Architecture', 'আর্কিটেকচার', 'Spatial Design, Qualitative Case Studies', 'Chicago'),

-- FBE
('BBA', 'FBE', 'Business Administration', 'বিজনেস অ্যাডমিনিস্ট্রেশন', 'SPSS, SmartPLS, Econometrics, Harvard Ref', 'Harvard'),
('DoIE', 'FBE', 'Innovation & Entrepreneurship', 'ইনোভেশন অ্যান্ড এন্টারপ্রেনারশিপ', 'Case Study Methodologies, Market Data', 'Harvard'),
('REAL', 'FBE', 'Real Estate', 'রিয়েল এস্টেট', 'Valuation Models, Macroeconomic Datasets', 'Harvard'),
('THM', 'FBE', 'Tourism & Hospitality Management', 'ট্যুরিজম অ্যান্ড হসপিটালিটি ম্যানেজমেন্ট', 'Survey Metrics, Qualitative/Quantitative Mixed', 'APA 7th'),
('BIT', 'FBE', 'Business Information Technology', 'বিজনেস ইনফরমেশন টেকনোলজি', 'Enterprise Systems, Mixed Quantitative', 'Harvard'),

-- FHLS
('PHARM', 'FHLS', 'Pharmacy', 'ফার্মাসি', 'Molecular Docking, PubMed, PRISMA, APA', 'APA 7th'),
('PH', 'FHLS', 'Public Health', 'পাবলিক হেলথ', 'Epidemiology, Biostatistics (R/SPSS), WHO Data', 'APA 7th'),
('NFE', 'FHLS', 'Nutrition & Food Engineering', 'নিউট্রিশন অ্যান্ড ফুড ইঞ্জিনিয়ারিং', 'Lab Methodologies, Bio-statistical Analysis', 'APA 7th'),
('AGRI', 'FHLS', 'Agricultural Science', 'অ্যাগ্রিকালচারাল সায়েন্স', 'Field Experimentation, Environmental Datasets', 'APA 7th'),

-- FHSS
('ENG', 'FHSS', 'English', 'ইংরেজি', 'MLA/Chicago, Hermeneutics, Textual Analysis', 'MLA 9th'),
('LAW', 'FHSS', 'Law', 'আইন', 'OSCOLA, Jurisprudence, Statutory Databases', 'OSCOLA'),
('JMC', 'FHSS', 'Journalism, Media & Communication', 'সাংবাদিকতা, মিডিয়া ও গণযোগাযোগ', 'Content/Thematic Analysis, Media Archives', 'APA 7th'),
('DS', 'FHSS', 'Development Studies', 'উন্নয়ন অধ্যয়ন', 'Qualitative Fieldwork, Policy Data, World Bank', 'APA 7th')
ON CONFLICT (code) DO NOTHING;

-- 5. User Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    institution TEXT DEFAULT 'Daffodil International University',
    faculty_code VARCHAR(10) REFERENCES public.faculties(code),
    department_code VARCHAR(10) REFERENCES public.departments(code),
    primary_interest TEXT,
    academic_level VARCHAR(50) DEFAULT 'undergraduate',
    skill_level VARCHAR(50) DEFAULT 'beginner',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. User Roadmaps Table
CREATE TABLE IF NOT EXISTS public.user_roadmaps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    department_code VARCHAR(10) REFERENCES public.departments(code),
    title TEXT NOT NULL,
    problem_statement TEXT,
    research_gap TEXT,
    objectives JSONB DEFAULT '[]'::jsonb,
    timeline_weeks INT DEFAULT 16,
    tasks JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. User Saved Papers Table
CREATE TABLE IF NOT EXISTS public.saved_papers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    paper_id TEXT NOT NULL,
    title TEXT NOT NULL,
    authors JSONB DEFAULT '[]'::jsonb,
    year INT,
    venue TEXT,
    doi TEXT,
    citation_count INT DEFAULT 0,
    open_access_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, paper_id)
);

-- ==============================================================================
-- Row Level Security (RLS) Policies
-- ==============================================================================

-- Enable RLS on user tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roadmaps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_papers ENABLE ROW LEVEL SECURITY;

-- Allow public read on faculties & departments
ALTER TABLE public.faculties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read for faculties" ON public.faculties FOR SELECT USING (true);
CREATE POLICY "Public read for departments" ON public.departments FOR SELECT USING (true);

-- Profiles Policies
CREATE POLICY "Users can view their own profile"
ON public.profiles FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = id);

-- Roadmaps Policies (Specified in Brief)
CREATE POLICY "Users can only access their own roadmaps"
ON public.user_roadmaps
FOR ALL
USING (auth.uid() = user_id);

-- Saved Papers Policies
CREATE POLICY "Users can only access their own saved papers"
ON public.saved_papers
FOR ALL
USING (auth.uid() = user_id);
