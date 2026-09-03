import { NextRequest, NextResponse } from "next/server";
import { dbGetVenues } from "@/lib/db";
import { KEY_VENUES, PREDATORY_CHECKLIST } from "@/data/venues";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const deptCode = searchParams.get("dept") || undefined;

    const venues = await dbGetVenues(deptCode);

    return NextResponse.json({
      venues: venues.length > 0 ? venues : KEY_VENUES,
      predatoryChecklist: PREDATORY_CHECKLIST,
      total: venues.length > 0 ? venues.length : KEY_VENUES.length,
      source: "Supabase PostgreSQL",
    });
  } catch (error) {
    console.warn("Falling back to local venues cache:", error);
    return NextResponse.json({
      venues: KEY_VENUES,
      predatoryChecklist: PREDATORY_CHECKLIST,
      total: KEY_VENUES.length,
      source: "Local Catalog",
    });
  }
}
