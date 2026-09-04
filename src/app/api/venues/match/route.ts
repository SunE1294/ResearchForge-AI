import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { matchAcademicVenues } from "@/lib/ai/gemini";
import { ALL_FACULTY_VENUES } from "@/data/venues";

const MatchRequestSchema = z.object({
  topic: z.string().optional().default(""),
  faculty: z.string().optional().default("ALL"),
  venueType: z.string().optional().default("all"),
  departmentCode: z.string().optional()
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const validated = MatchRequestSchema.parse(body);

    const matches = await matchAcademicVenues(
      validated.topic,
      validated.faculty,
      validated.venueType,
      validated.departmentCode
    );

    return NextResponse.json({
      venues: matches,
      total: matches.length,
      source: "Gemini AI & Verified Index",
      success: true
    });
  } catch (error) {
    console.warn("Venue matching API fallback:", error);
    return NextResponse.json({
      venues: ALL_FACULTY_VENUES.slice(0, 6),
      total: 6,
      source: "Verified Seed Directory",
      success: true
    });
  }
}
