import { NextResponse } from 'next/server';
import { chromium } from 'playwright-core';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const browser = await chromium.launch({
      headless: true,
    });

    const page = await browser.newPage();

    await page.goto(body.url, {
      waitUntil: "domcontentloaded",
    });

    // Get the title of the page
    const title = await page.title();

    // Get the Text content of the page
    const text_content = await page.evaluate(() => {
      return document.body.innerText;
    });

    await browser.close();

    return NextResponse.json({ text_content, title });
  } catch (error) {
    console.error("Scraping error:", error);
    return NextResponse.json(
      { error: "Failed to Scrape", details: String(error) },
      { status: 500 }
    );
  }
}
