import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { supportedLanguages } from "@/lib/languages";
import { getText, getAllTranslations, appTranslations } from "@/lib/translations";

// Define all possible translation keys
type TranslationKeys = 
  | "home" | "chat" | "topics" | "recommendations" | "therapists" | "helpContact" | "signIn" | "signUp" | "logOut"
  | "welcome" | "welcomeMessage" | "startConversation" | "keyFeatures" | "aiChatSupport" | "aiChatDescription"
  | "voiceInteraction" | "voiceDescription" | "multilingualSupport" | "multilingualDescription"
  | "quickAccess" | "recentConversations" | "recentConversationsDesc" | "viewConversations"
  | "professionalHelp" | "professionalHelpDesc" | "findTherapists"
  | "authWelcome" | "authMessage" | "login" | "register" | "username" | "password" | "email" | "name"
  | "createAccount" | "authHeroTitle" | "authHeroDesc"
  | "therapistsTitle" | "therapistsSubtitle" | "speaks" | "availableOn" | "scheduleConsultation"
  | "therapistHelp" | "therapistHelpDesc" | "getRecommendations"
  | "recommendationsTitle" | "recommendationsDesc" | "books" | "videos" | "podcasts" | "music"
  | "by" | "personalizedTitle" | "personalizedDesc"
  | "mentalHealthSupport" | "typingIndicator" | "sendMessage" | "listen" | "pause" | "resume" | "stop"
  | "contactUs" | "contactUsDesc" | "subject" | "message" | "sendMessageButton" | "contactInfo"
  | "contactInfoDesc" | "phoneSupport" | "emailContact" | "liveChat" | "faq" | "viewAllFAQs"
  | "recommendedResources" | "resourcesDescription" | "informationResources" | "musicTherapy"
  | "breathingExercises" | "moodEnhancementMusic" | "musicDescription" | "listenOnSpotify"
  | "breathingDescription" | "learnMore" | "watchVideo" | "personalizedRecommendations" 
  | "personalizedRecommendationsDescription" | "getPersonalResources"
  | "topicsPageTitle" | "topicsPageDescription" | "searchTopics" | "personalizedGuidanceTitle"
  | "personalizedGuidanceDescription" | "chatWithAI" | "findTherapistButton";

type TranslationType = Record<TranslationKeys, string>;

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