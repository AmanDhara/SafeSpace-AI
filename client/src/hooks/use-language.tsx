import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { supportedLanguages } from "@/lib/languages";
import { getText, getAllTranslations, appTranslations } from "@/lib/translations";

type TranslationType = typeof appTranslations.en;

type LanguageContextType = {
  currentLanguage: string;
  setLanguage: (lang: string) => void;
  t: (key: keyof TranslationType) => string;
  translations: TranslationType;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<string>("en");
  const [translations, setTranslations] = useState<TranslationType>(getAllTranslations("en"));

  // Load language preference from localStorage if available
  useEffect(() => {
    const savedLanguage = localStorage.getItem("mindfulAI_language");
    if (savedLanguage && supportedLanguages.some(lang => lang.code === savedLanguage)) {
      setCurrentLanguage(savedLanguage);
      setTranslations(getAllTranslations(savedLanguage));
    }
  }, []);

  // Function to set language and save to localStorage
  const setLanguage = (lang: string) => {
    setCurrentLanguage(lang);
    setTranslations(getAllTranslations(lang));
    localStorage.setItem("mindfulAI_language", lang);
  };

  // Function to get translated text
  const t = (key: keyof TranslationType) => {
    return getText(key, currentLanguage);
  };

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        setLanguage,
        t,
        translations
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}