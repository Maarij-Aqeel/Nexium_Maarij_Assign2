import ReactMarkdown from "react-markdown";
import { useState, useEffect } from "react";
import { GradualSpacing } from "./GradualSpacing";
import { Message } from "../components/Message";
import { translateText } from "@/lib/api/summarizer";
import languageCodes from "@/lib/languages";

type Props = {
  summarize_text: string;
};

export default function SummarizeBox({ summarize_text }: Props) {
  const [title, setTitle] = useState("");
  const [showToast, SetShowToast] = useState(false);
  const [translatedText, SetTranslatedText] = useState("");
  const [showTranslated, SetshowTranslated] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [selectedLang, SetSelectedLang] = useState("ur");

  useEffect(() => {
    setTitle(localStorage.getItem("title") || "");
  }, []);

  // Auto close toast after 2s
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => SetShowToast(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <div className="w-full flex flex-col items-center mt-10">
      <div className="w-2/3 bg-white rounded-2xl shadow-2xl p-6 space-y-4">
        {/* Toast Message */}
        {showToast && <Message alert_msg="Copied to clipboard!" />}

        {/* Header */}
        <div className="flex justify-between items-center">
          <GradualSpacing className="text-2xl text-sky-800 font-bold" text="Summary"/>

          <button
            className="text-lg px-4 py-2 cursor-pointer font-semibold flex items-center gap-2 bg-sky-100 text-sky-700 hover:bg-sky-200 rounded-full shadow-sm transition-all duration-200"
            onClick={() => {
              navigator.clipboard.writeText(
                showTranslated ? translatedText : summarize_text
              );
              SetShowToast(true);
            }}
          >
            <img
              src="https://img.icons8.com/?size=100&id=cvB6JC7HJn9v&format=png&color=000000"
              className="h-5 w-5"
              alt="copy icon"
            />
            Copy
          </button>
        </div>

        {/* Title  */}
        <div className="text-lg text-gray-600 flex">
          <GradualSpacing
            className="font-semibold text-sky-800"
            text={`Title: ${title}`}
          />
        </div>

        {/* Main Summary Content */}
        <div className="bg-sky-50 border border-sky-100 p-4 rounded-xl shadow-inner max-h-[300px] overflow-y-auto">
          <div className="text-gray-800 text-base break-words whitespace-pre-wrap leading-relaxed">
            {!showTranslated ? (
              <ReactMarkdown>{summarize_text}</ReactMarkdown>
            ) : (
              <ReactMarkdown>{translatedText}</ReactMarkdown>
            )}
          </div>
        </div>

        {/* Translate Button */}
        <div className="flex flex-row items-center gap-6">
          <button
            className={`bg-sky-600 text-white font-semibold px-5 py-3 rounded-full transition-all duration-200 shadow-md flex items-center gap-3 ${
              isTranslating
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-sky-700"
            }`}
            onClick={async () => {
              // 1. Prevent re-click
              if (isTranslating) return;

              // 2. If already showing translation, go back to original
              if (showTranslated) {
                SetshowTranslated(false);
                return;
              }

              // 3. If translation already exists, just show it
              if (translatedText.length !== 0) {
                SetshowTranslated(true);
                return;
              }

              // 4. Translate if not done yet
              setIsTranslating(true);
              try {
                const translated = await translateText(
                  summarize_text,
                  selectedLang
                );
                SetTranslatedText(translated);
                SetshowTranslated(true);
              } catch (err) {
                console.error("Translation error", err);
              }
              setIsTranslating(false);
            }}
            disabled={isTranslating}
          >
            {isTranslating ? (
              <span className="loading loading-dots loading-sm text-white mr-2"></span>
            ) : (
              <img
                src="https://img.icons8.com/?size=100&id=QyZvJTP0BAHx&format=png&color=000000"
                className="h-9 w-9"
                alt="translate icon"
              />
            )}
            {isTranslating
              ? "Translating"
              : showTranslated
              ? "Show Original"
              : "Translate"}
          </button>

          <select
            value={selectedLang}
            onChange={(e) => {
              SetSelectedLang(e.target.value);
              SetTranslatedText("");
            }}
            className="select bg-white text-sky-700 font-semibold border border-sky-300 rounded-xl shadow-md hover:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all duration-200 w-52"
          >
            <option value="" disabled>
              Pick a Language
            </option>
            {Object.entries(languageCodes).map(([code, name]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
