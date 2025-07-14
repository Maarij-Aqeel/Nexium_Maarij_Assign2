"use client";

import { circOut, motion } from "framer-motion";
import { GradualSpacing } from "@/components/GradualSpacing";
import { useRouter } from "next/navigation";
import { TextFade } from "@/components/FadeUp";

export default function About() {
  const router = useRouter();
  const features = [
    {
      title: "Summarize by URL or Text",
      description:
        "Paste a blog link or directly input raw text — flexible input methods for everyone.",
    },
    {
      title: "AI-Powered Summarization",
      description:
        "Uses state-of-the-art language models to extract and simplify key ideas.",
    },
    {
      title: "Translate Summaries",
      description:
        "Easily translate summaries into multiple languages with just a click.",
    },
    {
      title: "Clean & Responsive UI",
      description:
        "A minimal, mobile-friendly interface that works on all devices.",
    },
  ];

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="min-h-screen bg-gradient-to-br from-cyan-50 via-sky-100 to-cyan-200 flex flex-col items-center px-6 py-12"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="text-center mb-16 relative"
      >
        {/* Decorative background circle */}
        <div className="absolute inset-0 -z-10 flex items-center justify-center">
          <div className="w-96 h-96 bg-gradient-to-r from-cyan-200/30 to-sky-300/30 rounded-full blur-3xl"></div>
        </div>

        <h1 className="text-6xl md:text-7xl font-bold text-sky-800 mb-6 text-center leading-tight">
          About BlogDigester
        </h1>
        <GradualSpacing
          className="text-xl text-gray-700 text-center max-w-3xl mx-auto leading-relaxed"
          text="Learn more about the tool that simplifies reading by transforming long blogs into concise summaries."
        />
      </motion.div>

      {/* Enhanced sections with better spacing and animations */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-5xl space-y-8"
      >
        {/* Introduction Section */}
        <motion.div
          variants={itemVariants}
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-10 border border-cyan-100 relative overflow-hidden"
        >
          {/* Subtle decorative element */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-cyan-100/50 to-transparent rounded-full -translate-y-16 translate-x-16"></div>

          <h2 className="text-4xl text-sky-700 font-bold mb-6 relative">
            Introduction
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg relative">
            BlogDigester is a modern web tool designed to help readers
            quickly understand lengthy blog content. Whether you're a student,
            researcher, or just someone browsing the web, this app extracts the
            core ideas from long blog posts and presents them in a clear,
            digestible summary.
          </p>
        </motion.div>

        {/* How It Works Section */}
        <motion.div
          variants={itemVariants}
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-10 border border-cyan-100 relative overflow-hidden"
        >
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-sky-100/50 to-transparent rounded-full translate-y-16 -translate-x-16"></div>

          <h2 className="text-4xl text-sky-700 font-bold mb-6 relative">
            How It Works
          </h2>
          <div className="space-y-4 relative">
            {[
              "Enter a blog URL or paste raw blog content.",
              "The app scrapes and extracts text from the webpage (if URL).",
              "Text is sent to a powerful language model for summarization.",
              "The summary is displayed instantly on the screen.",
              "You can optionally translate the summary into your preferred language (e.g., Urdu).",
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
                className="flex items-start space-x-4"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-cyan-400 to-sky-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>
                <p className="text-gray-700 text-lg leading-relaxed">{step}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Key Features Section */}
        <motion.div
          variants={itemVariants}
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-10 border border-cyan-100"
        >
          <h2 className="text-4xl text-sky-700 font-bold mb-12 text-center">
            Key Features
          </h2>
          <TextFade
            direction="up"
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
          >
            {features.map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                }}
                className="bg-gradient-to-br from-sky-50 to-cyan-50 text-gray-800 rounded-2xl shadow-lg p-8 text-center border border-cyan-100/50 relative overflow-hidden group"
              >
                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-sky-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-sky-800 mb-4">
                    {feature.title}
                  </h3>
                  <GradualSpacing
                    className="text-lg text-gray-600 leading-relaxed"
                    text={feature.description}
                  />
                </div>
              </motion.div>
            ))}
          </TextFade>
        </motion.div>

        {/* Optional: Call to Action Section */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-r from-cyan-500 to-sky-600 rounded-3xl shadow-2xl p-10 text-center text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-sky-500/20 animate-pulse"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-6 text-cyan-100">
              Transform your reading experience with AI-powered summarization
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-sky-600 px-8 py-3 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => router.push("/")}
            >
              Try It Now
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
