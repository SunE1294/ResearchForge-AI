import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { dbSaveRoadmap, dbGetRoadmaps } from "@/lib/db";

const SaveRoadmapSchema = z.object({
  userId: z.string().default("guest_student"),
  departmentCode: z.string().default("CSE"),
  title: z.string().min(2),
  problemStatement: z.string().default(""),
  researchGap: z.string().default(""),
  objectives: z.array(z.string()).default([]),
  timelineWeeks: z.number().int().default(16),
  tasks: z.array(z.any()).default([]),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = SaveRoadmapSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid roadmap payload", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const saved = await dbSaveRoadmap(parsed.data);

    return NextResponse.json({
      success: true,
      roadmap: saved,
      source: "Supabase PostgreSQL",
    });
  } catch (error) {
    console.error("Error saving roadmap to Supabase:", error);
    return NextResponse.json(
      { error: "Failed to persist roadmap to database" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get("userId") || "guest_student";

    const roadmaps = await dbGetRoadmaps(userId);

    return NextResponse.json({
      roadmaps,
      total: roadmaps.length,
      source: "Supabase PostgreSQL",
    });
  } catch (error) {
    console.error("Error fetching roadmaps from Supabase:", error);
    return NextResponse.json({ roadmaps: [], total: 0 });
  }
}
