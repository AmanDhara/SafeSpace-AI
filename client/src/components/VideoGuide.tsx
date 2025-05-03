import { useState } from 'react';
import { CheckCircle2, Bookmark, Share2, ThumbsUp } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/hooks/use-language";

interface VideoGuideProps {
  title: string;
  description: string;
  youtubeUrl: string;
  duration: string;
  benefits: string[];
}

export default function VideoGuide({ title, description, youtubeUrl, duration, benefits }: VideoGuideProps) {
  const [saved, setSaved] = useState(false);
  const [liked, setLiked] = useState(false);
  const { t } = useLanguage();
  
  const handleSave = () => setSaved(!saved);
  const handleLike = () => setLiked(!liked);
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>Duration: {duration}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pb-3">
        {/* YouTube video embed with proper responsive ratio */}
        <div className="relative overflow-hidden w-full pt-[56.25%] rounded-md shadow-md">
          <iframe
            className="absolute inset-0 w-full h-full"
            src={youtubeUrl}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        
        <div>
          <p className="text-sm text-gray-600 mb-3">{description}</p>
          <div className="flex flex-wrap gap-2">
            {benefits.map((benefit) => (
              <Badge key={benefit} variant="outline" className="bg-blue-50 border-blue-200">
                {benefit}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4 bg-gray-50">
        <div className="flex justify-between w-full">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleSave}
            className={saved ? "bg-blue-50 text-blue-600" : ""}
          >
            {saved ? <CheckCircle2 className="mr-1 h-4 w-4" /> : <Bookmark className="mr-1 h-4 w-4" />}
            {saved ? "Saved" : "Save"}
          </Button>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleLike}
              className={liked ? "bg-blue-50 text-blue-600" : ""}
            >
              <ThumbsUp className="mr-1 h-4 w-4" />
              {liked ? "Liked" : "Like"}
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="mr-1 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}