import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { generateThesisMilestones } from "@/lib/ai/gemini";
import { DepartmentCode } from "@/types";

const MilestoneRequestSchema = z.object({
  problemStatement: z.string().min(5).max(1000),
  researchGap: z.string().min(5).max(1000),
  objectives: z.array(z.string()).min(1).max(10),
  timelineWeeks: z.number().int().min(4).max(52).default(16),
  departmentCode: z.string().default("CSE"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = MilestoneRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid roadmap request parameters", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const tasks = await generateThesisMilestones({
      problemStatement: parsed.data.problemStatement,
      researchGap: parsed.data.researchGap,
      objectives: parsed.data.objectives,
      timelineWeeks: parsed.data.timelineWeeks,
      departmentCode: parsed.data.departmentCode as DepartmentCode,
    });

    return NextResponse.json({
      tasks,
      timelineWeeks: parsed.data.timelineWeeks,
      departmentCode: parsed.data.departmentCode,
      generatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("API /api/ai/roadmap error:", error);
    return NextResponse.json(
      { error: "Failed to generate thesis roadmap" },
      { status: 500 }
    );
  }
}
