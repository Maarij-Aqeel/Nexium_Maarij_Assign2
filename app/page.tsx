"use client";
import { useState } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("url");
  const [urlInput, setUrlInput] = useState("");
  const [textInput, setTextInput] = useState("");
  const images=["/images/lightning.png","/images/flexible.png","/images/translation.png"]


  const isInputFilled =
    (activeTab === "url" && urlInput.trim().length > 0) ||
    (activeTab === "text" && textInput.trim().length > 0);

  return (
    <div className="min-h-screen bg-cyan-100 flex flex-col items-center justify-center p-5">
      
      <h1 className="text-5xl text-black p-4 mb-2 font-semibold">
        Blog Summarizer
      </h1>
      <p className="text-lg text-center text-gray-700 min-w-50 max-w-150 mb-6"> 
        Transform lengthy blog posts into concise, digestible summaries. Paste a URL or raw text to get key insights in seconds, with optional Urdu translation.
      </p>

      <div className="bg-cyan-300   rounded-4xl shadow-lg p-6 w-full max-w-2xl">
        <h1 className="text-gray-900 text-2xl font-bold mb-6 text-center">
          Choose your Input method
        </h1>
        <p className="text-center text-gray-700">
          Summarize content by pasting a URL or entering raw text directly
        </p>

        {/* Tabs */}
        <div role="tablist" className="tabs  tabs-bordered w-full mb-4 justify-center">
          <button
            role="tab"
            className={`tab ${activeTab === "url" ? "tab-active text-gray-900 " : "!text-gray-400 hover:!text-gray-600"}`}
            onClick={() => setActiveTab("url")}
          >
            Blog URL
          </button>
          <button
            role="tab"
            className={` tab ${activeTab === "text" ? "tab-active text-gray-900" :"!text-gray-400 hover:!text-gray-600"}`}
            onClick={() => setActiveTab("text")}
          >
            Raw Text
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "url" && (
          <input
            type="text"
            placeholder="https://example.com/blog-post"
            className="input rounded-xl bg-white text-black input-bordered w-full mb-4"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
          />
        )}

        {activeTab === "text" && (
          <textarea
            placeholder="Paste blog content here..."
            className="textarea textarea-neutral w-full mb-4 text-black bg-cyan-50"
            rows={5}
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
          />
        )}

        <div className="justify-center flex">
          <button
              className={`w-2/3 px-4  py-2 rounded-xl text-lg font-medium transition-colors duration-200 ${
                isInputFilled
                  ? "bg-sky-600 hover:bg-indigo-700 text-white"
                  : "bg-gray-900 text-white opacity-40 cursor-not-allowed"
              }`}
              disabled={!isInputFilled}
            >
              Summarize
            </button>
      </div>
      </div>

{/* Cards Section */}
      <div className="flex flex-wrap justify-center gap-6 mt-8 p-4 mb-4">
          {["Lightning Fast", "AI Powered", "Multilingual Support"].map((title, i) => (
            <div
              key={i}
              className="card bg-cyan-150 text-gray-800 rounded-2xl shadow-lg transform hover:scale-105 hover:shadow-2xl transition-all duration-300 w-80 p-6 text-center"
            >
              <figure>
                <img src={images[i]} alt="light" className="w-16 h-16 mx-auto mb-4" />
              </figure>

              <h2 className="text-2xl font-semibold mb-3">{title}</h2>
              <p className="text-lg">
                {i === 0
                  ? "Get summaries in seconds with our advanced processing."
                  : i === 1
                  ? "Powered by cutting-edge AI models for accurate results."
                  : "Translate summaries into Urdu and other languages instantly."}
              </p>
            </div>
          ))}
        </div>
      </div>
  );
}
