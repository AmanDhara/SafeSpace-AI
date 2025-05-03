import { PlayCircle } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/hooks/use-language";

interface SpotifyPlaylistProps {
  title: string;
  description: string;
  spotifyUrl: string;
  tags: string[];
  imageUrl?: string;
}

export default function SpotifyPlaylist({ title, description, spotifyUrl, tags, imageUrl }: SpotifyPlaylistProps) {
  const { t } = useLanguage();
  
  // Generate a gradient background if no image URL provided
  const gradientColors: Record<string, string> = {
    "Relaxation & Meditation": "from-blue-400 to-purple-500",
    "Mood Booster": "from-yellow-400 to-orange-500",
    "Sleep & Focus": "from-indigo-400 to-purple-600",
    "Calm & Relaxation": "from-blue-400 to-teal-500",
    "Focus & Concentration": "from-indigo-400 to-blue-600",
    "Mood Boost": "from-yellow-400 to-orange-500",
    "Sleep & Meditation": "from-purple-400 to-indigo-600"
  };
  
  const gradient = gradientColors[title] || "from-blue-400 to-indigo-600";
  
  return (
    <a 
      href={spotifyUrl} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block group"
    >
      <div className="rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white">
        <div 
          className={`h-44 w-full bg-gradient-to-r ${gradient} flex items-center justify-center relative`}
        >
          <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <PlayCircle className="h-16 w-16 text-white drop-shadow-md" />
          </div>
          <span className="text-white text-2xl font-bold text-center px-6 drop-shadow-md">
            {title}
          </span>
        </div>
        <div className="p-4">
          <p className="text-sm text-gray-700 mb-3">{description}</p>
          <div className="flex flex-wrap gap-1">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
            ))}
          </div>
          <div className="mt-3 flex items-center text-green-600">
            <PlayCircle className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">{t("listenOnSpotify")}</span>
          </div>
        </div>
      </div>
    </a>
  );
}