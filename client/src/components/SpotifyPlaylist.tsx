import { useState } from 'react';
import { Music, Heart, ExternalLink, Share2 } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/hooks/use-language";

interface SpotifyPlaylistProps {
  title: string;
  description: string;
  spotifyUrl: string;
  tags: string[];
}

export default function SpotifyPlaylist({ title, description, spotifyUrl, tags }: SpotifyPlaylistProps) {
  const [liked, setLiked] = useState(false);
  const { t } = useLanguage();
  
  const handleLike = () => setLiked(!liked);
  
  // Convert regular Spotify URL to Embed URL
  const embedUrl = spotifyUrl.replace('https://open.spotify.com/playlist/', 'https://open.spotify.com/embed/playlist/') + '?utm_source=generator';
  
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Music className="h-5 w-5 text-green-600" />
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="w-full overflow-hidden rounded-md">
          <iframe 
            src={embedUrl} 
            width="100%" 
            height="380" 
            frameBorder="0" 
            allowFullScreen 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy"
            title={title}
          ></iframe>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4 bg-gray-50">
        <div className="flex justify-between w-full">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleLike}
            className={liked ? "bg-pink-50 text-pink-600" : ""}
          >
            <Heart className={`mr-1 h-4 w-4 ${liked ? "fill-pink-600" : ""}`} />
            {liked ? "Liked" : "Like"}
          </Button>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              asChild
            >
              <a href={spotifyUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-1 h-4 w-4" />
                {t("listenOnSpotify")}
              </a>
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