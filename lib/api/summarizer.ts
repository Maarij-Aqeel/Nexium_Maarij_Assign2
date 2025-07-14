// Summarizing text call
export const summarizeText = async (text: string): Promise<string> => {
  const resp = await fetch("/api/model_call", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ scraped_text: text }),
  });

  const data = await resp.json();
  return data.output;
};

// Scraping+Summarizing text call
export const scrapeAndSummarize = async (
  url: string
): Promise<{ summary: string; title: string }> => {
  const resp = await fetch("/api/scrape", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });

  const data = await resp.json();
  const title = data.title || "Untitled Blog";

  // Upload to MongoDB
  await sendToMongo(url, title, data.text_content);

  const summary = await summarizeText(data.text_content);

  return { summary, title };
};

// Tranlation of Summary
export const translateText = async (text: string,translateto:string): Promise<string> => {
  const res = await fetch(`/api/translate?q=${encodeURIComponent(text)}&to=${encodeURIComponent(translateto)}`);
  const data = await res.json();
  return data.translated;
};

// Upload to supabase
export const sendToSupabase = async (url: string, summarize_text: string) => {
  try {
    const resp = await fetch("/api/items_sb", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, summarizedText: summarize_text }),
    });
    if (!resp.ok) {
      console.error("Failed to upload summary");
    }
  } catch (err) {
    console.error("Upload error:", err);
  }
};

// Upload to MongoDB
export const sendToMongo = async (
  url: string,
  title: string,
  scraped_text: string
) => {
  await fetch("/api/items", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url, title, fullText: scraped_text }),
  });
};
