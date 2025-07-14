# BlogDigester

A web application that scrapes blog content from URLs and generates AI-powered summaries in English and Urdu. Content is automatically stored in databases for future retrieval.

## Features

- **URL Content Scraping**: Extracts full text from blog pages using Puppeteer
- **AI Summarization**: Generates concise summaries using custom language models
- **Dofferent Language Translation**: Translates summaries using google-api translation
- **Dual Database Storage**: Summaries in Supabase, full content in MongoDB
- **Modern UI**: Built with DaisyUI components and deployed on Vercel
- **REST API**: Clean endpoints for summary generation and retrieval

## Tech Stack

**Frontend**
- Next.js
- Tailwind CSS
- DaisyUI
- Framer Motion

**Backend**
- Node.js/Express
- Puppeteer (web scraping)
- Custom AI models (summarization & translation)
- Supabase (summary storage)
- MongoDB (full content storage)
- Vercel Functions (API hosting)

## How It Works

1. User submits a blog URL
2. Puppeteer scrapes the content
3. AI model generates English summary
4. Summary is translated to Urdu
5. Data is stored in databases
6. Both language versions are displayed

## Setup

### 1. Clone Repository
```bash
git clone (https://github.com/Maarij-Aqeel/Nexium_Maarij_Assign2)
cd Nexium_Maarij_Assign2
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create `.env.local`:
```env
MONGODB_URI=your_mongodb_connection_string
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
```

### 4. Run Locally
```bash
npm run dev
```

Visit `http://localhost:3000`

## API Endpoints

- `POST /api/summarize` - Generate summary from URL
- `GET /api/summaries` - Retrieve stored summaries
- `GET /api/content/:id` - Get full blog content