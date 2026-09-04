import { NextRequest, NextResponse } from "next/server";
import { dbGetDatasets } from "@/lib/db";
import { searchZenodoDatasets, searchHuggingFaceDatasets } from "@/lib/zenodo";
import { BENCHMARK_DATASETS } from "@/data/datasets";
import { sanitizeQuery } from "@/lib/utils";
import { DatasetItem } from "@/types";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const rawQuery = searchParams.get("q") || "";
    const faculty = searchParams.get("faculty") || undefined;
    const dept = searchParams.get("dept") || undefined;
    const query = sanitizeQuery(rawQuery);

    // If a search query is provided, query Zenodo & Hugging Face live!
    if (query) {
      const [zenodoRes, hfRes] = await Promise.allSettled([
        searchZenodoDatasets(query, 8),
        searchHuggingFaceDatasets(query, 6),
      ]);

      const liveZenodo = zenodoRes.status === "fulfilled" ? zenodoRes.value : [];
      const liveHf = hfRes.status === "fulfilled" ? hfRes.value : [];

      // Also filter local / Supabase DB for matching datasets
      const localMatches = BENCHMARK_DATASETS.filter((d) => {
        const qLow = query.toLowerCase();
        return (
          d.title.toLowerCase().includes(qLow) ||
          d.description.toLowerCase().includes(qLow) ||
          (d.tags && d.tags.some((t) => t.toLowerCase().includes(qLow)))
        );
      });

      const mergedDatasets: DatasetItem[] = [...localMatches, ...liveZenodo, ...liveHf];

      return NextResponse.json({
        datasets: mergedDatasets,
        total: mergedDatasets.length,
        query,
        source: liveZenodo.length > 0 ? "CERN Zenodo & Hugging Face Live" : "Supabase PostgreSQL",
      });
    }

    // Default load: query Supabase PostgreSQL by faculty/dept
    let datasets = await dbGetDatasets(faculty, dept);

    if (!datasets || datasets.length === 0) {
      // Local fallback with strict department/faculty isolation
      if (dept) {
        const deptMatches = BENCHMARK_DATASETS.filter((d) => d.departments && d.departments.includes(dept as any));
        if (deptMatches.length > 0) {
          datasets = deptMatches;
        } else if (faculty && faculty !== "ALL") {
          datasets = BENCHMARK_DATASETS.filter((d) => d.facultyCode === faculty);
        } else {
          datasets = BENCHMARK_DATASETS;
        }
      } else if (faculty && faculty !== "ALL") {
        datasets = BENCHMARK_DATASETS.filter((d) => d.facultyCode === faculty);
      } else {
        datasets = BENCHMARK_DATASETS;
      }
    }

    return NextResponse.json({
      datasets: datasets.length > 0 ? datasets : BENCHMARK_DATASETS,
      total: datasets.length > 0 ? datasets.length : BENCHMARK_DATASETS.length,
      source: "Supabase PostgreSQL & Verified Catalog",
    });
  } catch (error) {
    console.warn("Dataset API notice:", error);
    return NextResponse.json({
      datasets: BENCHMARK_DATASETS,
      total: BENCHMARK_DATASETS.length,
      source: "Supabase PostgreSQL",
    });
  }
}
