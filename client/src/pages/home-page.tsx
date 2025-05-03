import { useAuth } from "@/hooks/use-auth";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { MessageSquare, Volume2, Languages, BarChart, Palette } from "lucide-react";
import MoodTracker from "@/components/MoodTracker";
import MoodColorGuide from "@/components/MoodColorGuide";
import { useLanguage } from "@/hooks/use-language";
import { useState } from "react";

export default function HomePage() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [showColorGuide, setShowColorGuide] = useState(false);

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center gap-8 mb-12 bg-white rounded-lg overflow-hidden shadow-sm">
        <div className="flex-1 p-8">
          <h1 className="text-3xl font-bold mb-4">
            {t("welcome")}, <span className="text-blue-500">{user?.name || user?.username}!</span>
          </h1>
          <p className="text-gray-600 mb-6">
            {t("welcomeMessage")}
          </p>
          <Link href="/chat">
            <Button className="bg-blue-500 hover:bg-blue-600">
              {t("startConversation")}
            </Button>
          </Link>
        </div>
        <div className="flex-1 p-6 bg-blue-500 min-h-[300px] flex items-center justify-center">
          <svg
            className="w-64 h-64"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="100" cy="100" r="80" fill="#8CC5FF" opacity="0.8" />
            <g transform="translate(60, 85)">
              <circle cx="10" cy="10" r="8" fill="#FFC2D1" />
              <circle cx="70" cy="10" r="8" fill="#FFC2D1" />
              <g transform="translate(10, 30)">
                <path
                  d="M0,0 C20,20 40,20 60,0"
                  stroke="#FFC2D1"
                  strokeWidth="3"
                  fill="none"
                />
              </g>
            </g>
            <circle cx="70" cy="40" r="5" fill="#FFFFFF" opacity="0.6" />
            <circle cx="120" cy="30" r="8" fill="#FFFFFF" opacity="0.6" />
            <circle cx="150" cy="80" r="6" fill="#FFFFFF" opacity="0.6" />
          </svg>
        </div>
      </div>

      {/* Mood Tracker Section */}
      <div className="mb-8">
        <MoodTracker className="shadow-sm" />
      </div>

      {/* Mood Color Psychology Section */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Color Psychology</h2>
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => setShowColorGuide(!showColorGuide)}
          >
            <Palette className="h-4 w-4" />
            {showColorGuide ? "Hide Color Guide" : "Show Color Guide"}
          </Button>
        </div>
        
        {showColorGuide && (
          <div className="mt-4 animate-in fade-in-50 duration-300">
            <MoodColorGuide />
          </div>
        )}
      </div>

      {/* Key Features Section */}
      <h2 className="text-2xl font-bold mb-6">{t("keyFeatures")}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* AI Chat Feature */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <MessageSquare className="h-6 w-6 text-blue-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2">{t("aiChatSupport")}</h3>
          <p className="text-gray-600">
            {t("aiChatDescription")}
          </p>
        </div>

        {/* Voice Interaction Feature */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <Volume2 className="h-6 w-6 text-blue-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2">{t("voiceInteraction")}</h3>
          <p className="text-gray-600">
            {t("voiceDescription")}
          </p>
        </div>

        {/* Multilingual Support Feature */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <Languages className="h-6 w-6 text-blue-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2">{t("multilingualSupport")}</h3>
          <p className="text-gray-600">
            {t("multilingualDescription")}
          </p>
        </div>
      </div>

      {/* Quick Access Section */}
      <h2 className="text-2xl font-bold mb-4">{t("quickAccess")}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-2">{t("recentConversations")}</h3>
          <p className="text-gray-600 mb-4">
            {t("recentConversationsDesc")}
          </p>
          <Link href="/chat">
            <Button variant="outline" className="w-full">
              {t("viewConversations")}
            </Button>
          </Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-2">{t("professionalHelp")}</h3>
          <p className="text-gray-600 mb-4">
            {t("professionalHelpDesc")}
          </p>
          <Link href="/therapists">
            <Button variant="outline" className="w-full">
              {t("findTherapists")}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}