import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navigation from "./components/navigation";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blog Summarizer",
  description: "Summarize blog content with AI in seconds",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}
      >
        {/* Header */}
        <header className="sticky top-0 z-50 bg-gradient-to-r from-sky-100 to-cyan-100 shadow-md backdrop-blur-lg">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-sky-800 hover:opacity-90 transition cursor-pointer">
              Blog Summarizer
            </h1>
            <nav className="flex items-center space-x-6 text-sm font-medium text-sky-800">
              <Navigation />
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow min-h-[80vh]">{children}</main>

        {/* Footer */}
        <footer className="mt-12 bg-gradient-to-r from-sky-100 to-cyan-100 text-center text-gray-800 py-6 shadow-inner">
          <div className="text-sm">
            © {new Date().getFullYear()} Blog Summarizer. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
