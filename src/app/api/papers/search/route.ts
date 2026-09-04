import { NextRequest, NextResponse } from "next/server";
import { searchOpenAlex } from "@/lib/openalex";
import { searchCrossref } from "@/lib/crossref";
import { searchSemanticScholar } from "@/lib/semantic-scholar";
import { sanitizeQuery } from "@/lib/utils";
import { getDepartmentLiteratureConfig } from "@/data/departmentLiterature";
import { Paper } from "@/types";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const rawQuery = searchParams.get("q") || "";
  const dept = searchParams.get("dept") || "";
  const faculty = searchParams.get("faculty") || "";
  const query = sanitizeQuery(rawQuery);

  const deptConfig = getDepartmentLiteratureConfig(dept);

  // If query is empty, use the department's authentic primary search query
  const effectiveQuery = query.trim().length > 0
    ? query
    : (deptConfig.primaryQuery || "academic research methodology");

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
    let mergedPapers: Paper[] = [];

    // If query is empty, prepend verified landmark papers for this department
    if (!query.trim() && deptConfig.landmarkPapers.length > 0) {
      for (const p of deptConfig.landmarkPapers) {
        seenTitles.add(p.title.toLowerCase().replace(/[^\w]/g, ""));
        if (p.doi) seenDois.add(p.doi.toLowerCase().trim());
        mergedPapers.push(p);
      }
    }

    for (const paper of [...openAlexPapers, ...crossrefPapers, ...semanticPapers]) {
      const normalizedTitle = paper.title.toLowerCase().replace(/[^\w]/g, "");
      const normalizedDoi = paper.doi ? paper.doi.toLowerCase().trim() : null;

      if (normalizedDoi && seenDois.has(normalizedDoi)) continue;
      if (normalizedTitle && seenTitles.has(normalizedTitle)) continue;

      // Strict Anti-Discipline Contamination Filtering:
      // If user did not specifically search for an excluded technical keyword, reject off-discipline papers
      if (deptConfig.excludedKeywords.length > 0) {
        const textToCheck = `${paper.title} ${paper.abstract || ""} ${paper.venue || ""}`.toLowerCase();
        const containsContamination = deptConfig.excludedKeywords.some((forbidden) => {
          // Only filter out if the user did NOT type this forbidden term in their query
          const userAskedForIt = query.toLowerCase().includes(forbidden.toLowerCase());
          return !userAskedForIt && textToCheck.includes(forbidden.toLowerCase());
        });

        if (containsContamination) {
          continue; // Skip cross-discipline contamination
        }
      }

      if (normalizedDoi) seenDois.add(normalizedDoi);
      if (normalizedTitle) seenTitles.add(normalizedTitle);
      mergedPapers.push(paper);
    }

    // If live API results are sparse after filtering, add department landmarks
    if (mergedPapers.length < 3 && deptConfig.landmarkPapers.length > 0) {
      for (const p of deptConfig.landmarkPapers) {
        const nTitle = p.title.toLowerCase().replace(/[^\w]/g, "");
        if (!seenTitles.has(nTitle)) {
          seenTitles.add(nTitle);
          mergedPapers.push(p);
        }
      }
    }

    // Sort by citation count descending to surface landmark publications
    mergedPapers.sort((a, b) => (b.citationCount || 0) - (a.citationCount || 0));

    return NextResponse.json({
      papers: mergedPapers,
      total: mergedPapers.length,
      query: effectiveQuery,
      department: deptConfig.name,
      citationStandard: deptConfig.citationStandard,
      source: "Crossref, OpenAlex & Verified Landmark Index",
    });
  } catch (error) {
    console.error("API /api/papers/search error:", error);
    return NextResponse.json({
      papers: deptConfig.landmarkPapers || [],
      total: deptConfig.landmarkPapers?.length || 0,
      query: effectiveQuery,
      department: deptConfig.name,
      source: "Verified Department Landmark Catalog",
    });
  }
}
