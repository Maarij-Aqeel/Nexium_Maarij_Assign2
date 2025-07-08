import { NextResponse } from 'next/server';
import { chromium } from 'playwright-core';


// Function To Scrape the Given url
export async function POST(req:Request)
{
    try{
        const body=await req.json()

        const browser=await chromium.launch({
            headless:true
        })

        const page=await browser.newPage()

        page.goto(body.url,{
            waitUntil:"domcontentloaded"
        })

        // Get the title of the page
        const title=page.title()

        // Get the Text content of the page
        const text_content=page.evaluate(()=>{
            document.body.innerText
        })

        await browser.close()

        return NextResponse.json({title,text_content})
    }
    catch(error) {
        return NextResponse.json({error:"Failed to Scrape"},{status:500})
    }
    
}