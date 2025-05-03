import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BookOpen, Youtube, Headphones, Bookmark, Music, Wind } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VideoGuide from "@/components/VideoGuide";
import SpotifyPlaylist from "@/components/SpotifyPlaylist";

export default function Recommendations() {
  const { t, currentLanguage } = useLanguage();
  // Music playlists for mood enhancement
  const musicPlaylists = [
    {
      title: "Calm & Relaxation",
      description: "Gentle, soothing tracks to help you relax and unwind after a stressful day.",
      spotifyUrl: "https://open.spotify.com/playlist/37i9dQZF1DWXe9gFZP0gtP",
      tags: ["Relaxation", "Stress Relief", "Calm"],
      imageUrl: "https://i.scdn.co/image/ab67706f00000003f2c4d223289c26196e0e0c71"
    },
    {
      title: "Focus & Concentration",
      description: "Music to help you focus, concentrate and be productive throughout your day.",
      spotifyUrl: "https://open.spotify.com/playlist/37i9dQZF1DX3PFzdbtx1Us",
      tags: ["Focus", "Concentration", "Productivity"],
      imageUrl: "https://i.scdn.co/image/ab67706f000000038c48ef4c4b64913718cbac37"
    },
    {
      title: "Mood Boost",
      description: "Uplifting and energetic tracks to boost your mood and motivation.",
      spotifyUrl: "https://open.spotify.com/playlist/37i9dQZF1DX3rxVfibe1L0",
      tags: ["Uplifting", "Energy", "Happiness"],
      imageUrl: "https://i.scdn.co/image/ab67706f00000003f93d523bd180ec0b2c4fa8f7"
    },
    {
      title: "Sleep & Meditation",
      description: "Ambient sounds and soft melodies to help you fall asleep and stay asleep.",
      spotifyUrl: "https://open.spotify.com/playlist/37i9dQZF1DWYcDQ1hSjOpY",
      tags: ["Sleep", "Meditation", "Night"],
      imageUrl: "https://i.scdn.co/image/ab67706f000000035d0798eb18342ecc1bb6f3c2"
    }
  ];

  // Breathing exercises and meditation videos with properly formatted YouTube embed URLs
  const breathingExercises = [
    {
      title: "4-7-8 Breathing Technique",
      description: "A simple breathing exercise to reduce anxiety and help sleep better.",
      youtubeUrl: "https://www.youtube.com/embed/PmBYdfv5RSk?rel=0&modestbranding=1",
      duration: "5:28",
      benefits: ["Anxiety Relief", "Better Sleep", "Stress Reduction"]
    },
    {
      title: "Box Breathing Exercise",
      description: "A technique used by Navy SEALs to control stress and improve concentration.",
      youtubeUrl: "https://www.youtube.com/embed/tEmt1Znux58?rel=0&modestbranding=1",
      duration: "4:12",
      benefits: ["Focus", "Stress Management", "Concentration"]
    },
    {
      title: "Guided Meditation for Anxiety",
      description: "A gentle 10-minute guided meditation to reduce anxiety and calm the mind.",
      youtubeUrl: "https://www.youtube.com/embed/O-6f5wQXSu8?rel=0&modestbranding=1",
      duration: "10:13",
      benefits: ["Anxiety Relief", "Mindfulness", "Relaxation"]
    },
    {
      title: "Progressive Muscle Relaxation",
      description: "Learn to relax your body and mind by progressively releasing tension.",
      youtubeUrl: "https://www.youtube.com/embed/86HUcX8ZtAk?rel=0&modestbranding=1",
      duration: "15:22",
      benefits: ["Physical Relaxation", "Stress Relief", "Sleep Improvement"]
    }
  ];
  
  const resources = [
    {
      category: "Books",
      icon: BookOpen,
      items: [
        {
          title: "Feeling Good: The New Mood Therapy",
          author: "David D. Burns",
          description: "A clinically proven drug-free treatment for depression and anxiety.",
          tags: ["Depression", "Anxiety", "Self-help"],
        },
        {
          title: "The Anxiety and Worry Workbook",
          author: "David A. Clark and Aaron T. Beck",
          description: "Effective tools and techniques from cognitive-behavioral therapy.",
          tags: ["Anxiety", "Practical", "Workbook"],
        },
        {
          title: "Atomic Habits",
          author: "James Clear",
          description: "Build good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.",
          tags: ["Habits", "Productivity", "Self-improvement"],
        },
      ],
    },
    {
      category: "Videos",
      icon: Youtube,
      items: [
        {
          title: "Understanding Anxiety and Depression",
          author: "Dr. Rangan Chatterjee",
          description: "Learn about the root causes of anxiety and depression and practical steps to overcome them.",
          tags: ["Educational", "Practical", "Science-based"],
        },
        {
          title: "Mindfulness Meditation for Stress Reduction",
          author: "Headspace",
          description: "A guided meditation series designed to help reduce stress and improve mental clarity.",
          tags: ["Meditation", "Stress", "Guided"],
        },
        {
          title: "The Power of Vulnerability",
          author: "Brené Brown",
          description: "A thought-provoking talk on the importance of embracing vulnerability for emotional well-being.",
          tags: ["Inspiration", "Emotional health", "TED Talk"],
        },
      ],
    },
    {
      category: "Podcasts",
      icon: Headphones,
      items: [
        {
          title: "The Happiness Lab",
          author: "Dr. Laurie Santos",
          description: "Scientific research and surprising stories that will change the way you think about happiness.",
          tags: ["Science", "Happiness", "Psychology"],
        },
        {
          title: "Mental Health Matters",
          author: "Various Experts",
          description: "Conversations with mental health professionals about common challenges and solutions.",
          tags: ["Expert advice", "Interviews", "Practical"],
        },
        {
          title: "Sleep With Me",
          author: "Drew Ackerman",
          description: "A bedtime story podcast designed to help you fall asleep through boring, soothing stories.",
          tags: ["Sleep", "Relaxation", "Insomnia"],
        },
      ],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{t("recommendedResources")}</h1>
        <p className="text-gray-600">
          {t("resourcesDescription")}
        </p>
      </div>

      <Tabs defaultValue="music" className="w-full mb-8">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="resources">{t("informationResources")}</TabsTrigger>
          <TabsTrigger value="music">{t("musicTherapy")}</TabsTrigger>
          <TabsTrigger value="breathing">{t("breathingExercises")}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="resources" className="space-y-10">
          {resources.map((section) => (
            <div key={section.category} className="space-y-4">
              <div className="flex items-center">
                <section.icon className="mr-2 h-6 w-6 text-blue-500" />
                <h2 className="text-2xl font-bold">{section.category}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {section.items.map((item, index) => (
                  <Card key={index} className="h-full flex flex-col">
                    <CardHeader>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <CardDescription>By {item.author}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">{tag}</Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" className="w-full" size="sm">
                        <span>{t("learnMore")}</span>
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </TabsContent>
        
        <TabsContent value="music">
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <Music className="mr-2 h-6 w-6 text-blue-500" />
              <h2 className="text-2xl font-bold">{t("moodEnhancementMusic")}</h2>
            </div>
            <p className="text-gray-600 mb-8">
              {t("musicDescription")}
            </p>
          </div>
          
          <h3 className="text-xl font-medium mb-4">Music For You</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {musicPlaylists.map((playlist, index) => (
              <SpotifyPlaylist 
                key={index}
                title={playlist.title}
                description={playlist.description}
                spotifyUrl={playlist.spotifyUrl}
                tags={playlist.tags}
                imageUrl={playlist.imageUrl}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="breathing">
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <Wind className="mr-2 h-6 w-6 text-blue-500" />
              <h2 className="text-2xl font-bold">{t("breathingExercises")}</h2>
            </div>
            <p className="text-gray-600 mb-8">
              {t("breathingDescription")}
            </p>
          </div>
          
          <h3 className="text-xl font-medium mb-4">Exercises For You</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {breathingExercises.map((exercise, index) => (
              <VideoGuide
                key={index}
                title={exercise.title}
                description={exercise.description}
                youtubeUrl={exercise.youtubeUrl}
                duration={exercise.duration}
                benefits={exercise.benefits}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="bg-blue-50 rounded-lg p-6 mt-8">
        <h2 className="text-xl font-semibold mb-2">{t("personalizedRecommendations")}</h2>
        <div className="flex items-start gap-4">
          <Bookmark className="h-10 w-10 text-blue-500 mt-1" />
          <div>
            <p className="text-gray-600 mb-4">
              {t("personalizedRecommendationsDescription")}
            </p>
            <Button>{t("getPersonalResources")}</Button>
          </div>
        </div>
      </div>
    </div>
  );
}