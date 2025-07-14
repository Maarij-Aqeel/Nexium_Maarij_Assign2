import { NextResponse } from "next/server";
import * as cheerio from "cheerio";
import axios from "axios";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

export async function POST(req: Request) {
  let bodyText = "";

  const body = await req.json();

  try {
    const response = await axios.get(body.url);
    const html = response.data;
    const $ = cheerio.load(html);

    $("script, style, noscript, iframe, svg, canvas").remove();

    bodyText = $("body").text().replace(/\s+/g, " ").trim();
    const title = $("title").text().trim();

    if (bodyText) {
      return NextResponse.json({ text_content: bodyText, title: title });
    }
  } catch (err) {
    console.log("Axios scraping failed:", err);
  }

  // Puppeteer fallback
  try {
    const browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: true,
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
    console.error("Puppeteer scraping error:", error);
    return NextResponse.json(
      { error: "Failed to scrape with fallback", details: String(error) },
      { status: 500 }
    );
  }
}
