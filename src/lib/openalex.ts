import { Paper } from "@/types";

export interface OpenAlexWork {
  id: string;
  doi?: string;
  title: string;
  publication_year: number;
  cited_by_count: number;
  primary_location?: {
    source?: {
      display_name?: string;
    };
    pdf_url?: string;
    landing_page_url?: string;
  };
  authorships?: Array<{
    author: {
      display_name: string;
    };
  }>;
  abstract_inverted_index?: Record<string, number[]>;
  concepts?: Array<{
    display_name: string;
  }>;
}

function restoreInvertedAbstract(invertedIndex?: Record<string, number[]>): string {
  if (!invertedIndex) return "No abstract available.";
  const wordsWithPositions: Array<{ word: string; position: number }> = [];

  for (const [word, positions] of Object.entries(invertedIndex)) {
    for (const pos of positions) {
      wordsWithPositions.push({ word, position: pos });
    }
  }

  wordsWithPositions.sort((a, b) => a.position - b.position);
  return wordsWithPositions.map((item) => item.word).join(" ");
}

export async function searchOpenAlex(query: string, limit: number = 10): Promise<Paper[]> {
  try {
    const encoded = encodeURIComponent(query);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(
      `https://api.openalex.org/works?search=${encoded}&per_page=${limit}&mailto=researchforge.ai@example.edu`,
      {
        signal: controller.signal,
        headers: {
          "User-Agent": "ResearchForge-AI/1.0.0 (mailto:researchforge.ai@example.edu)",
        },
      }
    );

    clearTimeout(timeoutId);

    if (!res.ok) {
      console.warn(`OpenAlex returned status: ${res.status}`);
      return [];
    }

    const data = await res.json();
    const results: OpenAlexWork[] = data.results || [];

    return results.map((item) => {
      const authors = (item.authorships || [])
        .map((a) => a.author?.display_name)
        .filter(Boolean)
        .slice(0, 4);

      const abstract = restoreInvertedAbstract(item.abstract_inverted_index);

      return {
        id: item.id.replace("https://openalex.org/", ""),
        title: item.title || "Untitled Publication",
        authors: authors.length > 0 ? authors : ["Unknown Author"],
        year: item.publication_year || new Date().getFullYear(),
        venue: item.primary_location?.source?.display_name || "Academic Conference/Journal",
        abstract: abstract.length > 400 ? abstract.slice(0, 400) + "..." : abstract,
        doi: item.doi,
        citationCount: item.cited_by_count || 0,
        openAccessUrl: item.primary_location?.pdf_url || item.primary_location?.landing_page_url || undefined,
        source: "OpenAlex",
        tags: (item.concepts || []).slice(0, 3).map((c) => c.display_name),
      };
    });
  } catch (err) {
    console.warn("OpenAlex fetch error (graceful fallback):", err);
    return [];
  }
}
