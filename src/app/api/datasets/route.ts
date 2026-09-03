import { NextRequest, NextResponse } from "next/server";
import { dbGetDatasets } from "@/lib/db";
import { BENCHMARK_DATASETS } from "@/data/datasets";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const faculty = searchParams.get("faculty") || undefined;
    const dept = searchParams.get("dept") || undefined;

    const datasets = await dbGetDatasets(faculty, dept);

    return NextResponse.json({
      datasets: datasets.length > 0 ? datasets : BENCHMARK_DATASETS,
      total: datasets.length > 0 ? datasets.length : BENCHMARK_DATASETS.length,
      source: "Supabase PostgreSQL",
    });
  } catch (error) {
    console.warn("Falling back to benchmark datasets cache:", error);
    return NextResponse.json({
      datasets: BENCHMARK_DATASETS,
      total: BENCHMARK_DATASETS.length,
      source: "Local Catalog",
    });
  }
}
