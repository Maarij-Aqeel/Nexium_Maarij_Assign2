import { useEffect, useState } from "react";

type Props = {
  InputText: string;
};

export default function TranslateComponent({ InputText }: Props) {
  const [TranslatedText, setTranslatedText] = useState("");

  useEffect(() => {
    const translateText = async () => {
      try {
        const resp = await fetch(
          `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
            InputText
          )}&langpair=en|ur`
        );
        const data = await resp.json();
        setTranslatedText(data.responseData.translatedText);
      } catch (err) {
        console.error("Translation failed", err);
      }
    };

    if (InputText.trim() !== "") translateText();
  }, [InputText]);

  return <p>{TranslatedText}</p>;
}
