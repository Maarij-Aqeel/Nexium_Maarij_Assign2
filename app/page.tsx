"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [activeTab, setActiveTab] = useState("url");
  const [urlInput, setUrlInput] = useState("");
  const [textInput, setTextInput] = useState("");
  const [summarized_click, setSummarized] = useState("");
  const [scraped_text, setScrapedText] = useState("");
  const [summarized_text, setSummarizedText] = useState("");

  const router=useRouter()

  const images = [
    "/images/lightning.png",
    "/images/flexible.png",
    "/images/translation.png",
  ];

  // Scraping text call
    const scrape_url = async (): Promise<string> => {
    const resp = await fetch("/api/scrape", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: urlInput }),
    });

    const data = await resp.json();
    setScrapedText(data.text_content);

    const summary = await summarize_text(data.text_content);
    return summary;
  };

  // Summarizing text call
    const summarize_text = async (text: string): Promise<string> => {
      const resp = await fetch("/api/model_call", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ scraped_text: text }),
      });

      const data = await resp.json();
      setSummarizedText(data.output);
      return data.output;
    };


  const isInputFilled =
    (activeTab === "url" && urlInput.trim().length > 0) ||
    (activeTab === "text" && textInput.trim().length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-100 to-white flex flex-col items-center px-6 py-12">
      {/* Header */}
      <h1 className="text-5xl font-bold text-sky-800 mb-2 text-center">
        Blog Summarizer
      </h1>
      <p className="text-lg text-gray-700 text-center max-w-2xl mb-8">
        Transform lengthy blog posts into concise, digestible summaries. Paste a
        URL or raw text to get key insights in seconds — with optional Urdu
        translation.
      </p>

      {/* Input Box */}
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-2xl text-sky-800 font-semibold text-center mb-2">
          Choose Your Input Method
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Summarize content by pasting a URL or entering raw text directly
        </p>

        {/* Tabs */}
        <div className="flex justify-center mb-6 gap-4">
          <button
            className={`px-4 py-2 text-lg rounded-full transition-all duration-200 ${
              activeTab === "url"
                ? "bg-sky-600 text-white shadow-md"
                : "bg-sky-100 text-sky-700 hover:bg-sky-200"
            }`}
            onClick={() => {
              setActiveTab("url");
              setSummarized("");
            }}
          >
            Blog URL
          </button>
          <button
            className={`px-4 py-2 text-lg rounded-full transition-all duration-200 ${
              activeTab === "text"
                ? "bg-sky-600 text-white shadow-md"
                : "bg-sky-100 text-sky-700 hover:bg-sky-200"
            }`}
            onClick={() => {
              setActiveTab("text");
              setSummarized("");
            }}
          >
            Raw Text
          </button>
        </div>

        {/* Input Fields */}
        {activeTab === "url" && (
          <input
            type="text"
            placeholder="https://example.com/blog-post"
            className="w-full p-4 text-gray-800 bg-sky-50 border border-sky-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
          />
        )}
        {activeTab === "text" && (
          <textarea
            placeholder="Paste blog content here..."
            rows={6}
            className="w-full p-4 mt-2 text-gray-800 bg-sky-50 border border-sky-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
          />
        )}

        {/* Summarize Button */}
        <div className="flex justify-center mt-6">
          <button
            className={`w-2/3 px-6 py-3 text-lg font-semibold rounded-full transition-all duration-200 shadow-md ${
              isInputFilled
                ? "bg-sky-600 text-white hover:bg-sky-700"
                : "bg-gray-400 text-white opacity-60 cursor-not-allowed"
            }`}
            disabled={!isInputFilled}
           onClick={async () => {
          setSummarized("True");

          let finalText = "";

          if (activeTab === "url") {
            const scraped = await scrape_url(); // return summarized_text from here
            finalText = scraped;
          } else {
            finalText = await summarize_text(textInput);
          }
          localStorage.setItem("summarized", finalText);
          router.push(`/summarize?s=${encodeURIComponent(urlInput)}&source=${activeTab}`);

        }}

          >
            {summarized_click && (
              <span className="loading loading-dots mr-2"></span>
            )}
            {summarized_click ? "Summarizing" : "Summarize"}
          </button>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="flex flex-wrap justify-center gap-6 mt-12 px-4 w-full max-w-6xl">
        {["Lightning Fast", "AI Powered", "Multilingual Support"].map(
          (title, i) => (
            <div
              key={i}
              className="bg-white text-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 w-80 p-6 text-center"
            >
              <figure>
                <img
                  src={images[i]}
                  alt={title}
                  className="w-16 h-16 mx-auto mb-4"
                />
              </figure>

              <h2 className="text-2xl font-bold text-sky-800 mb-2">{title}</h2>
              <p className="text-md text-gray-600">
                {i === 0
                  ? "Get summaries in seconds with our advanced processing."
                  : i === 1
                  ? "Powered by cutting-edge AI models for accurate results."
                  : "Translate summaries into Urdu and other languages instantly."}
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
