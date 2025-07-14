import { TextFade } from "./FadeUp";
import { GradualSpacing } from "./GradualSpacing";

export default function FeatureCards() {
  const images = [
    "https://img.icons8.com/?size=100&id=kxMTqpr5xEny&format=png&color=000000",
    "https://img.icons8.com/?size=100&id=unXm4ixWAr6H&format=png&color=000000",
    "https://img.icons8.com/?size=100&id=NbwFEv4Mt8cG&format=png&color=000000",
  ];

  return (
    <TextFade
      direction="up"
      className="flex flex-wrap justify-center gap-6 mt-12 px-4 w-full max-w-6xl"
    >
      {["Lightning Fast", "AI Powered", "Multilingual Support"].map(
        (title, i) => (
          <div
            key={i}
            className="bg-white text-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 w-80 p-6 text-center"
          >
            <figure>
              <img
                src={images[i]}
                className="h-16 w-16 mx-auto mb-4"
                alt={title}
              />
            </figure>

            <h2 className="text-2xl font-bold text-sky-800 mb-2">{title}</h2>
            <GradualSpacing
              className="text-md text-gray-600"
              text={
                i === 0
                  ? "Get summaries in seconds with our advanced processing."
                  : i === 1
                  ? "Powered by cutting-edge AI models for accurate results."
                  : "Translate summaries into Urdu and other languages instantly."
              }
            />
          </div>
        )
      )}
    </TextFade>
  );
}
