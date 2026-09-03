-- ==============================================================================
-- Add Benchmark Datasets & Key Venues Tables to Supabase
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.benchmark_datasets (
    id VARCHAR(100) PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    description_bn TEXT,
    faculty_code VARCHAR(10) REFERENCES public.faculties(code),
    departments JSONB NOT NULL DEFAULT '[]'::jsonb,
    source_name TEXT NOT NULL,
    source_url TEXT NOT NULL,
    format JSONB DEFAULT '[]'::jsonb,
    license TEXT,
    tags JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.venues (
    id VARCHAR(100) PRIMARY KEY,
    name TEXT NOT NULL,
    acronym VARCHAR(50) NOT NULL,
    type VARCHAR(50) NOT NULL,
    tier VARCHAR(50) NOT NULL,
    indexing JSONB DEFAULT '[]'::jsonb,
    h_index INT,
    field TEXT NOT NULL,
    deadline_text TEXT,
    website TEXT NOT NULL,
    departments JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.benchmark_datasets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.venues ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read for datasets" ON public.benchmark_datasets FOR SELECT USING (true);
CREATE POLICY "Public read for venues" ON public.venues FOR SELECT USING (true);
