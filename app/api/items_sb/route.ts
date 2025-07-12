import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { url, summarizedText } = await request.json();

    const { data, error } = await supabase
      .from("Blog_summarizer_summaries")
      .insert([{ url, summarizedText }]);

    if (error) {
      console.error("Supabase insert error:", error.message);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (err) {
    console.error("Api Error:", err);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
