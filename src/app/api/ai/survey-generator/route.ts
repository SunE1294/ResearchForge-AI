import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { generateSurveyQuestionnaire } from "@/lib/ai/gemini";

const RequestSchema = z.object({
  topic: z.string().min(2).max(400),
  variables: z.string().optional().default(""),
  methodologyType: z.enum(["quantitative", "qualitative"]).default("quantitative"),
  targetAudience: z.string().optional().default(""),
  facultyCode: z.string().optional().default(""),
  locale: z.string().optional().default("en"),
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

    const { topic, variables, methodologyType, targetAudience, facultyCode, locale } = parsed.data;

    const result = await generateSurveyQuestionnaire({
      topic,
      variables,
      methodologyType,
      targetAudience,
      facultyCode,
      locale,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("API /api/ai/survey-generator error:", error);
    return NextResponse.json(
      { error: "Failed to generate methodology survey instrument" },
      { status: 500 }
    );
  }
}
