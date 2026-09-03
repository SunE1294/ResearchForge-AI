import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { dbSaveProfile, dbGetProfile } from "@/lib/db";

const ProfileSchema = z.object({
  userId: z.string().default("00000000-0000-0000-0000-000000000001"),
  fullName: z.string().min(2),
  institution: z.string().default("Daffodil International University"),
  facultyCode: z.string().default("FSIT"),
  departmentCode: z.string().default("CSE"),
  primaryInterest: z.string().default(""),
  academicLevel: z.string().default("undergraduate"),
  skillLevel: z.string().default("beginner"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = ProfileSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid profile data", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const saved = await dbSaveProfile(parsed.data);

    return NextResponse.json({
      success: true,
      profile: saved,
      source: "Supabase PostgreSQL",
    });
  } catch (error) {
    console.error("Error saving profile to Supabase:", error);
    return NextResponse.json(
      { error: "Failed to persist profile to database" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get("userId") || "00000000-0000-0000-0000-000000000001";

    const profile = await dbGetProfile(userId);

    return NextResponse.json({
      profile,
      source: "Supabase PostgreSQL",
    });
  } catch (error) {
    console.error("Error fetching profile from Supabase:", error);
    return NextResponse.json({ profile: null });
  }
}
