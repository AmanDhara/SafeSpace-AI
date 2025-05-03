import { Clock, PlayCircle } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/hooks/use-language";

interface VideoGuideProps {
  title: string;
  description: string;
  youtubeUrl: string;
  duration: string;
  benefits: string[];
  imageSrc?: string;
}

export default function VideoGuide({ title, description, youtubeUrl, duration, benefits, imageSrc }: VideoGuideProps) {
  const { t } = useLanguage();
  
  // Extract video ID from the embed URL to create direct YouTube link
  const getYoutubeDirectUrl = (embedUrl: string) => {
    // Extract video ID from embed URL
    const videoIdMatch = embedUrl.match(/\/embed\/([^?]+)/);
    const videoId = videoIdMatch ? videoIdMatch[1] : '';
    
    // Return direct YouTube video URL
    return `https://www.youtube.com/watch?v=${videoId}`;
  };
  
  const directUrl = getYoutubeDirectUrl(youtubeUrl);
  
  // Get a thumbnail image using YouTube's standard thumbnail URL format
  const getVideoThumbnail = (embedUrl: string) => {
    const videoIdMatch = embedUrl.match(/\/embed\/([^?]+)/);
    const videoId = videoIdMatch ? videoIdMatch[1] : '';
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  };
  
  const thumbnailUrl = imageSrc || getVideoThumbnail(youtubeUrl);
  
  return (
    <a 
      href={directUrl} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block group"
    >
      <div className="rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white h-full">
        <div className="relative">
          {/* Thumbnail image with play button overlay */}
          <div className="relative overflow-hidden aspect-video">
            <img
              src={thumbnailUrl}
              alt={title}
              className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <PlayCircle className="h-16 w-16 text-white drop-shadow-md" />
            </div>
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {duration}
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-medium text-gray-900 mb-1">{title}</h3>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{description}</p>
          <div className="flex flex-wrap gap-1 mb-3">
            {benefits.map((benefit) => (
              <Badge key={benefit} variant="outline" className="text-xs bg-blue-50 border-blue-200">
                {benefit}
              </Badge>
            ))}
          </div>
          <div className="flex items-center text-red-600">
            <PlayCircle className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">{t("watchVideo")}</span>
          </div>
        </div>
      </div>
    </a>
  );
}