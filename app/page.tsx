"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { GradualSpacing } from "@/components/GradualSpacing";
import FeatureCards from "@/components/FeatureCards";
import { motion } from "framer-motion";
import { scrapeAndSummarize, summarizeText } from "@/lib/api/summarizer";

export default function Home() {
  const [activeTab, setActiveTab] = useState("url");
  const [urlInput, setUrlInput] = useState("");
  const [textInput, setTextInput] = useState("");
  const [summarized_click, setSummarized] = useState(false);

  const router = useRouter();

  // Function to check if a URL is Valid
  function check_url(input_url: string) {
    try {
      new URL(input_url);
      return true;
    } catch (err) {
      return false;
    }
  }
  const isInputFilled =
    (activeTab === "url" &&
      urlInput.trim().length > 0 &&
      check_url(urlInput)) ||
    (activeTab === "text" && textInput.trim().length > 50);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen bg-gradient-to-b from-cyan-100 to-white flex flex-col items-center px-6 py-12"
    >
      {/* Header */}
      <h1 className="text-5xl font-bold text-sky-800 mb-2 text-center">
        Blog Summarizer
      </h1>
      <GradualSpacing
        text="Transform lengthy blog posts into concise, digestible summaries. Paste a
        URL or raw text to get key insights in seconds — with optional Urdu
        translation."
        className="text-lg text-gray-700 text-center max-w-2xl mb-8"
      />

      {/* Input Box */}
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-2xl text-sky-800 font-semibold text-center mb-2">
          Choose Your Input Method
        </h2>
        <GradualSpacing
          className="text-gray-600 text-center mb-6"
          text="Summarize content by pasting a URL or entering raw text directly"
        />

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
              setSummarized(false);
            }}
          >
            Blog URL
          </button>
          <button
            className={`px-4 py-2 text-lg  rounded-full transition-all duration-200 ${
              activeTab === "text"
                ? "bg-sky-600 text-white shadow-md"
                : "bg-sky-100 text-sky-700 hover:bg-sky-200"
            }`}
            onClick={() => {
              setActiveTab("text");
              setSummarized(false);
            }}
          >
            Raw Text
          </button>
        </div>

        {/* Input Fields */}
        {activeTab === "url" && (
          <input
            type="url"
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
              if (summarized_click) return;
              setSummarized(true);

              let finalText = "";
              let title = "";

              if (activeTab === "url") {
                const { summary, title: returnedTitle } =
                  await scrapeAndSummarize(urlInput);
                finalText = summary;
                title = returnedTitle;
              } else {
                finalText = await summarizeText(textInput);
                title = "Raw Text Summary";
              }
              // Store in localstorage for later use
              localStorage.setItem("summarized", finalText);
              localStorage.setItem("title", title);

              // Navigate to summarize page
              router.push(
                `/summarize?s=${encodeURIComponent(
                  urlInput
                )}&source=${activeTab}`
              );
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
      <FeatureCards />
    </motion.div>
  );
}
