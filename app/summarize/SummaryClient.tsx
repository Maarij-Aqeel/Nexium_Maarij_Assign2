"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import SummarizeBox from "@/components/SummarizeBox";
import Link from "next/link";
import { sendToSupabase } from "@/lib/api/summarizer";
import { motion } from "framer-motion";

export default function SummaryClient() {
  const searchParams = useSearchParams();
  const url = searchParams.get("s") || "";
  const source = searchParams.get("source") || "";

  const [summary, setSummary] = useState("");
  const [hasUploaded, setHasUploaded] = useState(false);

  useEffect(() => {
    const text = localStorage.getItem("summarized") || "";
    setSummary(text);
  }, []);

  useEffect(() => {
    if (summary && url && !hasUploaded) {
      sendToSupabase(url, summary);
      setHasUploaded(true);
    }
  }, [summary, url, hasUploaded]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen bg-gradient-to-b from-cyan-100 to-white flex flex-col items-center"
    >
      {/* Top Buttons */}
      <div className="w-full flex flex-row px-10 py-6 justify-between items-center">
        <Link
          href="/"
          className="text-sky-700 text-center border border-sky-700 flex items-center  rounded-full hover:bg-sky-100 w-40 text-lg font-bold p-3 justify-center transition-all duration-200 shadow-md gap-2"
        >
          <img
            src="https://img.icons8.com/?size=100&id=39776&format=png&color=000000"
            className="h-5 w-5"
            alt="Back icon"
          />
          Back
        </Link>
        <button className="text-white bg-sky-600 hover:bg-sky-700 font-semibold rounded-full w-48 text-lg p-3 transition-all duration-200 shadow-md">
          + New Summary
        </button>
      </div>

      {/* Source Input */}
      <div className="flex items-center justify-center w-full mt-6">
        <div className="p-6 bg-white rounded-2xl shadow-2xl flex flex-col w-2/3 gap-4">
          <div className="breadcrumbs text-xl font-semibold text-sky-700">
            <ul className="flex items-center gap-2 px-2">
              <li>
                <img
                  src="https://img.icons8.com/?size=100&id=0GU4b5gZ4PdA&format=png&color=000000"
                  alt="icon"
                  className="h-7 w-7"
                />
              </li>
              <li>Source Input</li>
              <li className="text-sky-800">{source.toUpperCase()}</li>
            </ul>
          </div>

          <input
            className="bg-sky-50 text-gray-700 text-lg p-4 rounded-lg outline-none border border-sky-200 shadow-inner"
            disabled={true}
            placeholder={url}
          />
        </div>
      </div>

      {/* Summarized Box */}
      <SummarizeBox summarize_text={summary} />
    </motion.div>
  );
}
