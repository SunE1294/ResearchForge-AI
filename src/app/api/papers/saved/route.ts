import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { dbSavePaper, dbGetSavedPapers, dbDeleteSavedPaper } from "@/lib/db";

const SavePaperSchema = z.object({
  userId: z.string().default("guest_student"),
  paperId: z.string(),
  title: z.string(),
  authors: z.array(z.string()).default([]),
  year: z.number().int().default(new Date().getFullYear()),
  venue: z.string().default("Academic Publication"),
  doi: z.string().optional(),
  citationCount: z.number().int().default(0),
  openAccessUrl: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = SavePaperSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid paper payload", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const saved = await dbSavePaper(parsed.data);

    return NextResponse.json({
      success: true,
      paper: saved,
      source: "Supabase PostgreSQL",
    });
  } catch (error) {
    console.error("Error saving paper to Supabase:", error);
    return NextResponse.json(
      { error: "Failed to persist paper to database" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get("userId") || "guest_student";

    const papers = await dbGetSavedPapers(userId);

    return NextResponse.json({
      papers,
      total: papers.length,
      source: "Supabase PostgreSQL",
    });
  } catch (error) {
    console.error("Error fetching saved papers from Supabase:", error);
    return NextResponse.json({ papers: [], total: 0 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get("userId") || "guest_student";
    const paperId = searchParams.get("paperId");

    if (!paperId) {
      return NextResponse.json({ error: "Missing paperId" }, { status: 400 });
    }

    await dbDeleteSavedPaper(userId, paperId);

    return NextResponse.json({
      success: true,
      deletedId: paperId,
      source: "Supabase PostgreSQL",
    });
  } catch (error) {
    console.error("Error deleting saved paper from Supabase:", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
