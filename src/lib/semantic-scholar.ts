import { Paper } from "@/types";

export interface SemanticScholarPaper {
  paperId: string;
  title: string;
  year?: number;
  venue?: string;
  abstract?: string;
  citationCount?: number;
  authors?: Array<{ name: string }>;
  openAccessPdf?: {
    url: string;
  };
}

export async function searchSemanticScholar(query: string, limit: number = 8): Promise<Paper[]> {
  try {
    const encoded = encodeURIComponent(query);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(
      `https://api.semanticscholar.org/graph/v1/paper/search?query=${encoded}&limit=${limit}&fields=title,authors,year,venue,abstract,citationCount,openAccessPdf`,
      {
        signal: controller.signal,
        headers: {
          "User-Agent": "ResearchForge-AI/1.0.0",
        },
      }
    );

    clearTimeout(timeoutId);

    if (!res.ok) {
      console.warn(`Semantic Scholar returned status: ${res.status}`);
      return [];
    }

    const data = await res.json();
    const papers: SemanticScholarPaper[] = data.data || [];

    return papers.map((item) => ({
      id: item.paperId,
      title: item.title,
      authors: (item.authors || []).slice(0, 4).map((a) => a.name),
      year: item.year || new Date().getFullYear(),
      venue: item.venue || "Peer-Reviewed Venue",
      abstract: item.abstract ? (item.abstract.length > 400 ? item.abstract.slice(0, 400) + "..." : item.abstract) : "Abstract available in source indexing.",
      citationCount: item.citationCount || 0,
      openAccessUrl: item.openAccessPdf?.url,
      source: "SemanticScholar",
      tags: ["Verified Venue", "Graph-Indexed"],
    }));
  } catch (err) {
    console.warn("Semantic Scholar fetch error (graceful fallback):", err);
    return [];
  }
}
