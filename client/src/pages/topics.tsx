import { useState } from 'react';
import { Search } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import MentalHealthTopics from '@/components/MentalHealthTopics';
import { Input } from '@/components/ui/input';

export default function TopicsPage() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-4">{t("topicsPageTitle")}</h1>
        <p className="text-gray-600 max-w-3xl mx-auto mb-8">
          {t("topicsPageDescription")}
        </p>
        
        <div className="relative max-w-lg mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder={t("searchTopics")}
            className="pl-10 pr-4 py-2 rounded-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <MentalHealthTopics />
      
      <div className="mt-16 bg-blue-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">{t("personalizedGuidanceTitle")}</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          {t("personalizedGuidanceDescription")}
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <a href="/chat" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors">
            {t("chatWithAI")}
          </a>
          <a href="/therapists" className="bg-white text-blue-600 border border-blue-600 px-6 py-3 rounded-md hover:bg-blue-50 transition-colors">
            {t("findTherapistButton")}
          </a>
        </div>
      </div>
    </div>
  );
}