import { NextRequest, NextResponse } from "next/server";
import { dbGetFaculties, dbGetDepartments } from "@/lib/db";
import { FACULTIES, DEPARTMENTS } from "@/data/taxonomy";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const facultyCode = searchParams.get("faculty") || undefined;

    const [faculties, departments] = await Promise.all([
      dbGetFaculties(),
      dbGetDepartments(facultyCode),
    ]);

    return NextResponse.json({
      faculties: faculties.length > 0 ? faculties : FACULTIES,
      departments: departments.length > 0 ? departments : DEPARTMENTS,
      source: "Supabase PostgreSQL",
    });
  } catch (error) {
    console.warn("Falling back to in-memory taxonomy:", error);
    return NextResponse.json({
      faculties: FACULTIES,
      departments: DEPARTMENTS,
      source: "Taxonomy Specification",
    });
  }
}
