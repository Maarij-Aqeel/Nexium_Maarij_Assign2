import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import dotenv from "dotenv"

dotenv.config()

const Api_key=process.env.API_KEY

if (!Api_key)
{
  throw new Error("Missing Api_Key in environment variables")
}
const genai=new GoogleGenerativeAI(Api_key)
const systemPrompt="You are a professional content summarizer. Given a raw blog text that may include inconsistencies, formatting issues, or irrelevant data (like ads or links), extract and summarize the main points accurately and concisely. Focus on preserving all essential information, key insights, and the original tone. Ignore garbage data. Return a clean and readable summary. Your Response should always start like 'This comprehensive blog post explores....' or something similar to it. There can be bullet-points or headings etc."


export async function POST(req:Request)
{
     try {

        // Prompt for model
        const body = await req.json();
        const model = genai.getGenerativeModel({ model: "gemini-1.5-flash",systemInstruction:systemPrompt });
    
        // Getting the Result
        const result = await model.generateContent(body.scraped_text || "Who are you");
        const response =  result.response;
        const text =  response.text();
    
        return NextResponse.json({ output: text });
      } catch (err) {
        console.error("Model API error:", err);
        return NextResponse.json({ error: "Failed to generate content" }, { status: 500 });
      }

} 