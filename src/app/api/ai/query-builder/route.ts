import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { generateBooleanQuery } from "@/lib/ai/gemini";
import { DepartmentCode } from "@/types";

const RequestSchema = z.object({
  topic: z.string().min(2).max(300),
  departmentCode: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = RequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request payload", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const { topic, departmentCode } = parsed.data;
    const result = await generateBooleanQuery(topic, departmentCode as DepartmentCode);

    return NextResponse.json(result);
  } catch (error) {
    console.error("API /api/ai/query-builder error:", error);
    return NextResponse.json(
      { error: "Failed to generate query string" },
      { status: 500 }
    );
  }
}
