import { DatasetItem, DepartmentCode, FacultyCode } from "@/types";

export async function searchZenodoDatasets(query: string, limit: number = 8): Promise<DatasetItem[]> {
  try {
    const encoded = encodeURIComponent(query);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(`https://zenodo.org/api/records?q=${encoded}&type=dataset&size=${limit}`, {
      signal: controller.signal,
      headers: {
        "User-Agent": "ResearchForge-AI/1.0.0 (mailto:researchforge.ai@gmail.com)",
      },
    });

    clearTimeout(timeoutId);
    if (!res.ok) return [];

    const data = await res.json();
    const hits = data.hits?.hits || [];

    return hits.map((item: any) => {
      const rawDesc = item.metadata?.description
        ? item.metadata.description.replace(/<[^>]*>?/gm, "").slice(0, 300) + "..."
        : "Peer-reviewed open dataset hosted on CERN Zenodo repository with DOI attribution.";

      const url = item.links?.html || (item.doi ? `https://doi.org/${item.doi}` : `https://zenodo.org/records/${item.id}`);
      const format = item.files?.[0]?.type || "CSV / ZIP / Archive";
      const sizeBytes = item.files?.[0]?.size || 15728640; // ~15MB default if omitted

      return {
        id: `zenodo-${item.id}`,
        title: item.metadata?.title || "Academic Research Dataset",
        description: rawDesc,
        descriptionBn: "সিইআরএন জেনোডো রিপোজিটরিতে সংরক্ষিত আন্তর্জাতিক বৈজ্ঞানিক ডেটাসেট।",
        departments: ["OTHER" as DepartmentCode],
        facultyCode: "OTHER" as FacultyCode,
        sourceName: "CERN Zenodo Open Science",
        license: item.metadata?.license?.id || "Creative Commons Attribution",
        sourceUrl: url,
        format: [format],
        tags: (item.metadata?.keywords || []).slice(0, 4),
      };
    });
  } catch (err) {
    console.warn("Zenodo fetch notice:", err);
    return [];
  }
}

export async function searchHuggingFaceDatasets(query: string, limit: number = 6): Promise<DatasetItem[]> {
  try {
    const encoded = encodeURIComponent(query);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const res = await fetch(`https://huggingface.co/api/datasets?search=${encoded}&limit=${limit}`, {
      signal: controller.signal,
      headers: {
        "User-Agent": "ResearchForge-AI/1.0.0",
      },
    });

    clearTimeout(timeoutId);
    if (!res.ok) return [];

    const list = await res.json();
    if (!Array.isArray(list)) return [];

    return list.map((item: any) => ({
      id: `hf-${item.id.replace(/\//g, "-")}`,
      title: item.id,
      description: item.description || `Benchmark dataset (${item.id}) available on Hugging Face Hub for experimental modeling and statistical evaluation.`,
      descriptionBn: `হাগিং ফেস ওপেন হাবে সংরক্ষিত বেঞ্চমার্ক ডেটাসেট (${item.id})।`,
      departments: ["OTHER" as DepartmentCode],
      facultyCode: "OTHER" as FacultyCode,
      sourceName: "Hugging Face Hub",
      license: "Open Access",
      sourceUrl: `https://huggingface.co/datasets/${item.id}`,
      format: ["Parquet", "JSON", "Arrow"],
      tags: (item.tags || []).slice(0, 4),
    }));
  } catch (err) {
    console.warn("HuggingFace fetch notice:", err);
    return [];
  }
}
