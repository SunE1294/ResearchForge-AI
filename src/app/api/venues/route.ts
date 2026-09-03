import { NextRequest, NextResponse } from "next/server";
import { KEY_VENUES, PREDATORY_CHECKLIST } from "@/data/venues";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const deptCode = searchParams.get("dept");

  let venues = KEY_VENUES;
  if (deptCode) {
    venues = KEY_VENUES.filter((v) => v.departments.includes(deptCode as any));
    if (venues.length === 0) {
      venues = KEY_VENUES.slice(0, 4);
    }
  }

  return NextResponse.json({
    venues,
    predatoryChecklist: PREDATORY_CHECKLIST,
    total: venues.length,
  });
}
