import { NextRequest, NextResponse } from "next/server";
import { searchOpenAlex } from "@/lib/openalex";
import { searchCrossref } from "@/lib/crossref";
import { searchSemanticScholar } from "@/lib/semantic-scholar";
import { sanitizeQuery } from "@/lib/utils";
import { Paper } from "@/types";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const rawQuery = searchParams.get("q") || "";
  const dept = searchParams.get("dept") || "";
  const faculty = searchParams.get("faculty") || "";
  const query = sanitizeQuery(rawQuery);

  // If query is empty, construct a discipline-focused baseline query
  const effectiveQuery = query || (dept ? `${dept} research` : (faculty ? `${faculty} methodology` : "academic research methodology"));

  try {
    // Run OpenAlex, Crossref, and Semantic Scholar concurrently
    const [openAlexResult, crossrefResult, semanticScholarResult] = await Promise.allSettled([
      searchOpenAlex(effectiveQuery, 8),
      searchCrossref(effectiveQuery, 8),
      searchSemanticScholar(effectiveQuery, 6),
    ]);

    const openAlexPapers = openAlexResult.status === "fulfilled" ? openAlexResult.value : [];
    const crossrefPapers = crossrefResult.status === "fulfilled" ? crossrefResult.value : [];
    const semanticPapers = semanticScholarResult.status === "fulfilled" ? semanticScholarResult.value : [];

    // Deduplicate by lowercase alphanumeric normalized title or DOI
    const seenTitles = new Set<string>();
    const seenDois = new Set<string>();
    const mergedPapers: Paper[] = [];

    for (const paper of [...openAlexPapers, ...crossrefPapers, ...semanticPapers]) {
      const normalizedTitle = paper.title.toLowerCase().replace(/[^\w]/g, "");
      const normalizedDoi = paper.doi ? paper.doi.toLowerCase().trim() : null;

      if (normalizedDoi && seenDois.has(normalizedDoi)) {
        continue;
      }
      if (normalizedTitle && seenTitles.has(normalizedTitle)) {
        continue;
      }

      if (normalizedDoi) seenDois.add(normalizedDoi);
      if (normalizedTitle) seenTitles.add(normalizedTitle);
      mergedPapers.push(paper);
    }

    // Sort by citation count descending to surface top landmark papers
    mergedPapers.sort((a, b) => (b.citationCount || 0) - (a.citationCount || 0));

    return NextResponse.json({
      papers: mergedPapers,
      total: mergedPapers.length,
      query: effectiveQuery,
      source: "Live Crossref & OpenAlex API",
    });
  } catch (error) {
    console.error("API /api/papers/search error:", error);
    return NextResponse.json({
      papers: [],
      total: 0,
      query: effectiveQuery,
      error: "Search failed to reach live indexes",
    });
  }
}
