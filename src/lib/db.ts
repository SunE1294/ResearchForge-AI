import { Pool, QueryResult, QueryResultRow } from "pg";

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://postgres.wmzpvkkbvyevkjecpvta:Shamimul1294Pani@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres?sslmode=require";

let pool: Pool | null = null;

export function getDbPool(): Pool {
  if (!pool) {
    pool = new Pool({
      connectionString,
      ssl: { rejectUnauthorized: false },
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
    });

    pool.on("error", (err) => {
      console.error("Unexpected error on idle PostgreSQL client", err);
    });
  }

  return pool;
}

export async function query<T extends QueryResultRow = any>(
  text: string,
  params?: any[]
): Promise<QueryResult<T>> {
  const p = getDbPool();
  return p.query<T>(text, params);
}

// 1. Fetch Faculties from Database
export async function dbGetFaculties() {
  const res = await query(
    "SELECT code, name, name_bn AS \"nameBn\", description FROM public.faculties ORDER BY code ASC"
  );
  return res.rows;
}

// 2. Fetch Departments from Database
export async function dbGetDepartments(facultyCode?: string) {
  if (facultyCode) {
    const res = await query(
      `SELECT d.code, d.faculty_code AS "facultyCode", d.name, d.name_bn AS "nameBn", 
              d.archetype, d.recommended_citation AS "recommendedCitation", d.description,
              f.name AS "facultyName", f.name_bn AS "facultyNameBn"
       FROM public.departments d
       JOIN public.faculties f ON d.faculty_code = f.code
       WHERE d.faculty_code = $1
       ORDER BY d.code ASC`,
      [facultyCode]
    );
    return res.rows;
  }

  const res = await query(
    `SELECT d.code, d.faculty_code AS "facultyCode", d.name, d.name_bn AS "nameBn", 
            d.archetype, d.recommended_citation AS "recommendedCitation", d.description,
            f.name AS "facultyName", f.name_bn AS "facultyNameBn"
     FROM public.departments d
     JOIN public.faculties f ON d.faculty_code = f.code
     ORDER BY d.faculty_code ASC, d.code ASC`
  );
  return res.rows;
}

// 3. Fetch Benchmark Datasets from Database
export async function dbGetDatasets(facultyCode?: string, deptCode?: string) {
  let queryText = "SELECT * FROM public.benchmark_datasets WHERE 1=1";
  const params: any[] = [];

  if (facultyCode && facultyCode !== "ALL") {
    params.push(facultyCode);
    queryText += ` AND faculty_code = $${params.length}`;
  }

  if (deptCode) {
    params.push(JSON.stringify([deptCode]));
    queryText += ` AND departments @> $${params.length}::jsonb`;
  }

  queryText += " ORDER BY title ASC";
  const res = await query(queryText, params);

  return res.rows.map((row) => ({
    id: row.id,
    title: row.title,
    description: row.description,
    descriptionBn: row.description_bn,
    facultyCode: row.faculty_code,
    departments: Array.isArray(row.departments) ? row.departments : JSON.parse(row.departments || "[]"),
    sourceName: row.source_name,
    sourceUrl: row.source_url,
    format: Array.isArray(row.format) ? row.format : JSON.parse(row.format || "[]"),
    license: row.license,
    tags: Array.isArray(row.tags) ? row.tags : JSON.parse(row.tags || "[]"),
  }));
}

// 4. Fetch Key Venues from Database
export async function dbGetVenues(deptCode?: string) {
  let queryText = "SELECT * FROM public.venues WHERE 1=1";
  const params: any[] = [];

  if (deptCode) {
    params.push(JSON.stringify([deptCode]));
    queryText += ` AND departments @> $${params.length}::jsonb`;
  }

  queryText += " ORDER BY tier ASC, name ASC";
  const res = await query(queryText, params);

  return res.rows.map((row) => ({
    id: row.id,
    name: row.name,
    acronym: row.acronym,
    type: row.type,
    tier: row.tier,
    indexing: Array.isArray(row.indexing) ? row.indexing : JSON.parse(row.indexing || "[]"),
    hIndex: row.h_index,
    field: row.field,
    deadlineText: row.deadline_text,
    website: row.website,
    departments: Array.isArray(row.departments) ? row.departments : JSON.parse(row.departments || "[]"),
  }));
}

// 5. Store / Update User Roadmaps in Database
export async function dbSaveRoadmap(params: {
  userId: string;
  departmentCode: string;
  title: string;
  problemStatement: string;
  researchGap: string;
  objectives: string[];
  timelineWeeks: number;
  tasks: any[];
}) {
  const res = await query(
    `INSERT INTO public.user_roadmaps 
      (user_id, department_code, title, problem_statement, research_gap, objectives, timeline_weeks, tasks, updated_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
     RETURNING *`,
    [
      params.userId,
      params.departmentCode,
      params.title,
      params.problemStatement,
      params.researchGap,
      JSON.stringify(params.objectives),
      params.timelineWeeks,
      JSON.stringify(params.tasks),
    ]
  );
  return res.rows[0];
}

// 6. Get User Roadmaps from Database
export async function dbGetRoadmaps(userId: string) {
  const res = await query(
    "SELECT * FROM public.user_roadmaps WHERE user_id = $1 ORDER BY updated_at DESC",
    [userId]
  );
  return res.rows.map((row) => ({
    id: row.id,
    userId: row.user_id,
    departmentCode: row.department_code,
    title: row.title,
    problemStatement: row.problem_statement,
    researchGap: row.research_gap,
    objectives: typeof row.objectives === "string" ? JSON.parse(row.objectives) : row.objectives,
    timelineWeeks: row.timeline_weeks,
    tasks: typeof row.tasks === "string" ? JSON.parse(row.tasks) : row.tasks,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }));
}

// 7. Save / Bookmark Papers in Database
export async function dbSavePaper(params: {
  userId: string;
  paperId: string;
  title: string;
  authors: string[];
  year: number;
  venue: string;
  doi?: string;
  citationCount: number;
  openAccessUrl?: string;
}) {
  const res = await query(
    `INSERT INTO public.saved_papers 
      (user_id, paper_id, title, authors, year, venue, doi, citation_count, open_access_url)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     ON CONFLICT (user_id, paper_id) DO UPDATE SET
      title = EXCLUDED.title,
      citation_count = EXCLUDED.citation_count,
      open_access_url = EXCLUDED.open_access_url
     RETURNING *`,
    [
      params.userId,
      params.paperId,
      params.title,
      JSON.stringify(params.authors),
      params.year,
      params.venue,
      params.doi || null,
      params.citationCount || 0,
      params.openAccessUrl || null,
    ]
  );
  return res.rows[0];
}

// 8. Delete Saved Paper from Database
export async function dbDeleteSavedPaper(userId: string, paperId: string) {
  await query(
    "DELETE FROM public.saved_papers WHERE user_id = $1 AND paper_id = $2",
    [userId, paperId]
  );
  return true;
}

// 9. Get User Saved Papers from Database
export async function dbGetSavedPapers(userId: string) {
  const res = await query(
    "SELECT * FROM public.saved_papers WHERE user_id = $1 ORDER BY created_at DESC",
    [userId]
  );
  return res.rows.map((row) => ({
    id: row.paper_id,
    title: row.title,
    authors: typeof row.authors === "string" ? JSON.parse(row.authors) : row.authors,
    year: row.year,
    venue: row.venue,
    doi: row.doi,
    citationCount: row.citation_count,
    openAccessUrl: row.open_access_url,
    source: "Supabase Database",
    tags: ["Saved to Database"],
  }));
}

// 10. Save / Update User Profile in Database
export async function dbSaveProfile(params: {
  userId: string;
  fullName: string;
  institution: string;
  facultyCode: string;
  departmentCode: string;
  primaryInterest: string;
  academicLevel: string;
  skillLevel: string;
}) {
  const res = await query(
    `INSERT INTO public.profiles 
      (id, full_name, institution, faculty_code, department_code, primary_interest, academic_level, skill_level, updated_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
     ON CONFLICT (id) DO UPDATE SET
      full_name = EXCLUDED.full_name,
      institution = EXCLUDED.institution,
      faculty_code = EXCLUDED.faculty_code,
      department_code = EXCLUDED.department_code,
      primary_interest = EXCLUDED.primary_interest,
      academic_level = EXCLUDED.academic_level,
      skill_level = EXCLUDED.skill_level,
      updated_at = NOW()
     RETURNING *`,
    [
      params.userId,
      params.fullName,
      params.institution,
      params.facultyCode,
      params.departmentCode,
      params.primaryInterest,
      params.academicLevel,
      params.skillLevel,
    ]
  );
  return res.rows[0];
}

// 11. Get User Profile from Database
export async function dbGetProfile(userId: string) {
  const res = await query("SELECT * FROM public.profiles WHERE id = $1", [userId]);
  return res.rows[0] || null;
}
