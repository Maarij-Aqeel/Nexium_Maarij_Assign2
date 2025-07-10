// app/api/translate/route.ts
import { NextResponse } from "next/server";
import {translate} from "@vitalets/google-translate-api";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q");

    if (!q) {
      return NextResponse.json({ error: "Missing 'q' parameter" }, { status: 400 });
    }

    const result = await translate(q, { to: 'ur' });

    return NextResponse.json({ translated: result.text });
  } catch (err) {
    console.error("Translation failed:", err);
    return NextResponse.json({ error: "Translation failed" }, { status: 500 });
  }
}
