import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import dotenv from "dotenv"

dotenv.config()

const Api_key=process.env.API_KEY
const genai=new GoogleGenerativeAI(Api_key)

export async function POST(req:Request)
{
     try {

        // Prompt for model
        const body = await req.json();
        const model = genai.getGenerativeModel({ model: "gemini-1.5-flash" });
    
        // Getting the Result
        const result = await model.generateContent(body.Raw_data || "Who are you");
        const response =  result.response;
        const text =  response.text();
    
        return NextResponse.json({ output: text });
      } catch (err) {
        console.error("Model API error:", err);
        return NextResponse.json({ error: "Failed to generate content" }, { status: 500 });
      }



} 