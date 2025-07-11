import { NextResponse } from "next/server";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium"; 

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(), 
      headless: true
    });

    const page = await browser.newPage();

    await page.goto(body.url, { waitUntil: "domcontentloaded" });

    const title = await page.title();

    const text_content = await page.evaluate(() => {
      return document.body.innerText;
    });

    await browser.close();

    return NextResponse.json({ text_content, title });
  } catch (error) {
    console.error("Scraping error:", error);
    return NextResponse.json(
      { error: "Failed to scrape", details: String(error) },
      { status: 500 }
    );
  }
}
