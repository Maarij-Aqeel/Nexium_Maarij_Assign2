"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { GradualSpacing } from "@/components/GradualSpacing";
import FeatureCards from "@/components/FeatureCards";
import { motion, AnimatePresence, circOut } from "framer-motion";
import { scrapeAndSummarize, summarizeText } from "@/lib/api/summarizer";

export default function Home() {
  const [activeTab, setActiveTab] = useState("url");
  const [urlInput, setUrlInput] = useState("");
  const [textInput, setTextInput] = useState("");
  const [Error, SetError] = useState(false);
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: circOut,
      },
    },
  };

  const tabVariants = {
    inactive: { scale: 1 },
    active: { scale: 1.05 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen bg-gradient-to-br from-cyan-50 via-sky-100 to-cyan-200 flex flex-col items-center px-6 py-12"
    >
      {/* Enhanced Header with Backdrop */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-12 relative"
      >
        {/* Decorative background elements */}
        <div className="absolute inset-0 -z-10 flex items-center justify-center">
          <div className="w-96 h-96 bg-gradient-to-r from-cyan-200/30 to-sky-300/30 rounded-full blur-3xl"></div>
        </div>
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-bl from-sky-200/40 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute -bottom-20 -left-20 w-32 h-32 bg-gradient-to-tr from-cyan-200/40 to-transparent rounded-full blur-2xl"></div>

        <h1 className="text-6xl md:text-7xl font-bold text-sky-800 mb-4 text-center leading-tight">
          BlogDigester
        </h1>
        <GradualSpacing
          text="Transform lengthy blog posts into concise, digestible summaries. Paste a URL or raw text to get key insights in seconds — with optional Urdu translation."
          className="text-xl text-gray-700 text-center max-w-3xl mb-8 leading-relaxed"
        />
      </motion.div>

      {/* Input Box */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-3xl"
      >
        <motion.div
          variants={itemVariants}
          className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-10 border border-cyan-100/50 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-cyan-100/30 to-transparent rounded-full -translate-y-20 translate-x-20"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-sky-100/30 to-transparent rounded-full translate-y-16 -translate-x-16"></div>

          <div className="relative z-10">
            <h2 className="text-3xl text-sky-800 font-bold text-center mb-3">
              Choose Your Input Method
            </h2>
            <GradualSpacing
              className="text-gray-600 text-center mb-8 text-lg"
              text="Summarize content by pasting a URL or entering raw text directly"
            />

            {/* Tabs */}
            <div className="flex justify-center mb-8 gap-2 bg-sky-50 p-2 rounded-2xl max-w-md mx-auto">
              <motion.button
                variants={tabVariants}
                animate={activeTab === "url" ? "active" : "inactive"}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-6 py-3 text-lg font-semibold rounded-xl transition-all duration-300 flex-1 relative overflow-hidden ${
                  activeTab === "url"
                    ? "bg-sky-600 text-white shadow-lg"
                    : "bg-transparent text-sky-700 hover:bg-sky-100"
                }`}
                onClick={() => {
                  setActiveTab("url");
                  setSummarized(false);
                }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Blog URL
                </span>
                {activeTab === "url" && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-sky-600 rounded-xl"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
              <motion.button
                variants={tabVariants}
                animate={activeTab === "text" ? "active" : "inactive"}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-6 py-3 text-lg font-semibold rounded-xl transition-all duration-300 flex-1 relative overflow-hidden ${
                  activeTab === "text"
                    ? "bg-sky-600 text-white shadow-lg"
                    : "bg-transparent text-sky-700 hover:bg-sky-100"
                }`}
                onClick={() => {
                  setActiveTab("text");
                  setSummarized(false);
                }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Raw Text
                </span>
                {activeTab === "text" && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-sky-600 rounded-xl"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            </div>

            {/* Enhanced Input Fields with Animation */}
            <AnimatePresence mode="wait">
              {activeTab === "url" && (
                <motion.div
                  key="url"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                >
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  </div>
                  <input
                    type="url"
                    placeholder="https://example.com/blog-post"
                    className="w-full pl-8 pr-4 py-4 text-gray-800 bg-gradient-to-r from-sky-50 to-cyan-50 border-2 border-sky-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all duration-300 text-lg placeholder-gray-400"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                  />
                  {urlInput && !check_url(urlInput) && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-2 ml-1"
                    >
                      Please enter a valid URL
                    </motion.p>
                  )}
                </motion.div>
              )}

              {activeTab === "text" && (
                <motion.div
                  key="text"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                >
                  <textarea
                    placeholder="Paste your blog content here... (minimum 50 characters)"
                    rows={8}
                    className="w-full p-4 text-gray-800 bg-gradient-to-r from-sky-50 to-cyan-50 border-2 border-sky-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all duration-300 text-lg placeholder-gray-400 resize-none"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                  />
                  <div className="flex justify-between items-center mt-2">
                    <span
                      className={`text-sm ${
                        textInput.length < 50
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                    >
                      {textInput.length}/50 characters minimum
                    </span>
                    <span className="text-gray-400 text-sm">
                      {textInput.length} characters
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Summarize Button */}
            <div className="flex justify-center mt-6">
              <button
                className={`w-2/3 px-6 py-4 text-lg font-semibold rounded-full transition-all duration-200 shadow-md ${
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

                  if (!finalText || finalText.trim() === "") {
                    SetError(true);
                    setSummarized(false);
                    return;
                  } else {
                    SetError(false)
                    // Navigate to summarize page
                    router.push(
                      `/summarize?s=${encodeURIComponent(
                        urlInput
                      )}&source=${activeTab}`
                    );
                  }
                }}
              >
                {summarized_click && (
                  <span className="loading loading-dots mr-2"></span>
                )}
                {summarized_click ? "Summarizing" : "Summarize"}
              </button>
            </div>

            {/* Input validation feedback */}
            <AnimatePresence>
              {Error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-center mt-4"
                >
                  <p className="text-red-600 text-sm bg-red-100 px-4 py-2 rounded-full inline-block">
                    Error: LLM not available or failed to summarize. Try again
                    later.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>

      {/* Feature Cards*/}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.4 }}
        className=" mt-16"
      >
        <FeatureCards />
      </motion.div>
    </motion.div>
  );
}
