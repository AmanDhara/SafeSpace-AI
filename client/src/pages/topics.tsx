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
        <h1 className="text-4xl font-bold mb-4">Mental Health Topics</h1>
        <p className="text-gray-600 max-w-3xl mx-auto mb-8">
          Explore a wide range of mental health topics with tailored resources, exercises, and information. 
          Find specific guidance for your needs or browse to discover new wellness strategies.
        </p>
        
        <div className="relative max-w-lg mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search topics, symptoms, or concerns..."
            className="pl-10 pr-4 py-2 rounded-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <MentalHealthTopics />
      
      <div className="mt-16 bg-blue-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Need Personalized Guidance?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Not sure where to start? Our AI assistant can help you identify relevant topics 
          and resources based on your specific situation and needs.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <a href="/chat" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors">
            Chat with AI Assistant
          </a>
          <a href="/therapists" className="bg-white text-blue-600 border border-blue-600 px-6 py-3 rounded-md hover:bg-blue-50 transition-colors">
            Find a Therapist
          </a>
        </div>
      </div>
    </div>
  );
}