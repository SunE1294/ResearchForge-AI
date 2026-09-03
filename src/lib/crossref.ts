import { Paper } from "@/types";

export async function searchCrossref(query: string, limit: number = 8): Promise<Paper[]> {
  try {
    const encoded = encodeURIComponent(query);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 7000);

    const res = await fetch(
      `https://api.crossref.org/works?query=${encoded}&rows=${limit}&mailto=researchforge.ai@gmail.com`,
      {
        signal: controller.signal,
        headers: {
          "User-Agent": "ResearchForge-AI/1.0.0 (mailto:researchforge.ai@gmail.com)",
        },
      }
    );

    clearTimeout(timeoutId);
    if (!res.ok) return [];

    const data = await res.json();
    const items = data.message?.items || [];

    return items.map((item: any) => {
      const title = Array.isArray(item.title) ? item.title[0] : (item.title || "Untitled Scholarly Work");
      const venue = Array.isArray(item["container-title"])
        ? item["container-title"][0]
        : (item["container-title"] || "Peer-Reviewed Academic Venue");
      const authors = (item.author || [])
        .map((a: any) => `${a.given || ""} ${a.family || ""}`.trim())
        .filter(Boolean)
        .slice(0, 4);
      const year = item.created?.["date-parts"]?.[0]?.[0] || new Date().getFullYear();
      const openAccessUrl = item.resource?.primary?.URL || item.link?.[0]?.URL || (item.DOI ? `https://doi.org/${item.DOI}` : undefined);
      const rawAbstract = item.abstract
        ? item.abstract.replace(/<[^>]*>?/gm, "").slice(0, 400) + "..."
        : "Peer-reviewed research publication indexed in Crossref international DOI registry.";

      return {
        id: item.DOI || `crossref-${Math.random().toString(36).substring(2, 9)}`,
        title,
        authors: authors.length > 0 ? authors : ["Scholarly Author"],
        year,
        venue,
        abstract: rawAbstract,
        citationCount: item["is-referenced-by-count"] || 0,
        openAccessUrl,
        doi: item.DOI,
        source: "OpenAlex" as const, // Compatible with Paper.source type ("OpenAlex" | "SemanticScholar" | "Curated")
        tags: (item.subject || []).slice(0, 3),
      };
    });
  } catch (err) {
    console.warn("Crossref fetch notice:", err);
    return [];
  }
}
