import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'wouter';
import { 
  Book, 
  Youtube, 
  MessageCircle, 
  Music, 
  ArrowLeft, 
  Info, 
  Headphones,
  Play,
  Check,
  Link as LinkIcon,
  ExternalLink
} from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import VideoGuide from '@/components/VideoGuide';
import SpotifyPlaylist from '@/components/SpotifyPlaylist';

// Define all topic data
const topicsData = {
  anxiety: {
    title: 'Anxiety',
    description: 'Anxiety is a normal emotion that can help us stay alert and focused in challenging situations. However, when anxiety becomes overwhelming and persistent, it may develop into an anxiety disorder that interferes with daily life.',
    symptoms: [
      'Excessive worry or fear',
      'Restlessness or feeling on edge',
      'Increased heart rate',
      'Rapid breathing',
      'Difficulty concentrating',
      'Trouble sleeping',
      'Muscle tension'
    ],
    tips: [
      'Practice deep breathing exercises',
      'Challenge negative thoughts',
      'Maintain a regular exercise routine',
      'Limit caffeine and alcohol',
      'Get enough sleep',
      'Try progressive muscle relaxation',
      'Consider mindfulness meditation'
    ],
    articles: [
      {
        title: 'Understanding Different Types of Anxiety Disorders',
        author: 'National Institute of Mental Health',
        description: 'An overview of various anxiety disorders including generalized anxiety disorder, panic disorder, social anxiety, and specific phobias.',
        link: 'https://www.nimh.nih.gov/health/topics/anxiety-disorders'
      },
      {
        title: 'How to Stop a Panic Attack',
        author: 'Anxiety and Depression Association of America',
        description: 'Practical strategies to manage panic attacks when they occur and reduce their frequency and intensity over time.',
        link: 'https://adaa.org/understanding-anxiety/panic-disorder/symptoms/how-stop-panic-attack'
      },
      {
        title: 'Anxiety in Children and Teens',
        author: 'Child Mind Institute',
        description: 'Signs of anxiety in younger populations and how parents and caregivers can provide support and seek appropriate help.',
        link: 'https://childmind.org/article/what-to-do-and-not-do-when-children-are-anxious/'
      }
    ],
    videos: [
      {
        title: 'Anxiety Relief Techniques',
        description: 'Learn quick and effective techniques to manage anxiety symptoms in the moment.',
        youtubeUrl: 'https://www.youtube.com/embed/O-6f5wQXSu8?rel=0&modestbranding=1',
        duration: '10:26',
        benefits: ['Immediate Relief', 'Practical', 'Evidence-based']
      },
      {
        title: 'Understanding Anxiety: The Cognitive Perspective',
        description: 'Explore how thoughts influence anxiety and learn techniques to challenge anxious thinking.',
        youtubeUrl: 'https://www.youtube.com/embed/ZidGozDhOjg?rel=0&modestbranding=1',
        duration: '15:47',
        benefits: ['Educational', 'Cognitive Techniques', 'Self-awareness']
      }
    ],
    podcasts: [
      {
        title: 'The Anxiety Coaches Podcast',
        host: 'Gina Ryan',
        description: 'Weekly episodes focused on breaking free from anxiety, panic, and PTSD through practical coaching and guidance.',
        link: 'https://www.anxietycoachespodcast.com/'
      },
      {
        title: 'Anxiety Slayer',
        host: 'Shann Vander Leek & Ananga Sivyer',
        description: 'Support for anxiety, panic attacks, and stress with guided meditations, expert interviews, and practical tips.',
        link: 'https://www.anxietyslayer.com/'
      }
    ],
    playlists: [
      {
        title: 'Calm & Anti-Anxiety Music',
        description: 'Soothing tracks designed to reduce anxiety symptoms and promote relaxation.',
        spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1DWXe9gFZP0gtP',
        tags: ['Relaxation', 'Anxiety Relief', 'Calm']
      },
      {
        title: 'Meditation Focus',
        description: 'Ambient sounds and mindful music to help you center your thoughts and reduce anxiety.',
        spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1DWZqd5JICZI0u',
        tags: ['Meditation', 'Focus', 'Mindfulness']
      }
    ],
    exercises: [
      {
        title: '4-7-8 Breathing Technique',
        description: 'A breathing pattern developed by Dr. Andrew Weil that promotes relaxation and can help manage anxiety.',
        steps: [
          'Find a comfortable sitting position with your back straight',
          'Place the tip of your tongue against the ridge behind your upper front teeth',
          'Exhale completely through your mouth, making a whoosh sound',
          'Close your mouth and inhale through your nose for a count of 4',
          'Hold your breath for a count of 7',
          'Exhale completely through your mouth for a count of 8',
          'Repeat this cycle 3-4 times initially, gradually increasing to 8 cycles'
        ]
      },
      {
        title: 'Progressive Muscle Relaxation',
        description: 'A technique that involves tensing and then releasing different muscle groups to reduce physical tension associated with anxiety.',
        steps: [
          'Find a quiet, comfortable place to sit or lie down',
          'Take a few deep breaths to begin relaxing',
          'Focus on your feet. Tense the muscles as tightly as you can for 5 seconds',
          'Release the tension and notice how your muscles feel when relaxed',
          'Move up to your calves, then thighs, continuing upward through your body',
          'Focus on the contrast between tension and relaxation',
          'End with tensing and relaxing your face muscles'
        ]
      }
    ]
  },
  depression: {
    title: 'Depression',
    description: 'Depression is more than just feeling sad or going through a rough patch. It's a serious mental health condition that requires understanding, treatment, and support. With appropriate care, people with depression can improve their symptoms and live full, productive lives.',
    symptoms: [
      'Persistent sadness or low mood',
      'Loss of interest in activities once enjoyed',
      'Changes in appetite and weight',
      'Trouble sleeping or sleeping too much',
      'Fatigue or loss of energy',
      'Feelings of worthlessness or excessive guilt',
      'Difficulty thinking, concentrating or making decisions',
      'Thoughts of death or suicide'
    ],
    tips: [
      'Establish a daily routine',
      'Set small, achievable goals',
      'Exercise regularly, even if just a short walk',
      'Maintain social connections',
      'Challenge negative thoughts',
      'Seek professional help',
      'Consider meditation and mindfulness practices',
      'Ensure adequate sleep'
    ],
    articles: [
      {
        title: 'Types of Depression and Treatment Options',
        author: 'American Psychological Association',
        description: 'Learn about different forms of depression and evidence-based approaches to treatment including therapy, medication, and lifestyle changes.',
        link: 'https://www.apa.org/topics/depression/treatment'
      },
      {
        title: 'Depression and Chronic Illness',
        author: 'National Institute of Mental Health',
        description: 'Exploring the relationship between physical health conditions and depression, with strategies for managing both simultaneously.',
        link: 'https://www.nimh.nih.gov/health/topics/depression'
      },
      {
        title: 'Supporting Someone With Depression',
        author: 'Mental Health America',
        description: 'Practical advice for family members and friends on how to provide effective support to someone experiencing depression.',
        link: 'https://www.mhanational.org/supporting-someone-who-has-depression'
      }
    ],
    videos: [
      {
        title: 'Understanding the Nature of Depression',
        description: 'An educational overview of depression's biological, psychological, and social aspects.',
        youtubeUrl: 'https://www.youtube.com/embed/50rQiP7EE_E?rel=0&modestbranding=1',
        duration: '13:56',
        benefits: ['Educational', 'Insightful', 'Research-based']
      },
      {
        title: 'Behavioral Activation: A Simple Strategy to Combat Depression',
        description: 'Learn about behavioral activation, a core component of cognitive-behavioral therapy for depression.',
        youtubeUrl: 'https://www.youtube.com/embed/sKEwJtXVJoY?rel=0&modestbranding=1',
        duration: '9:38',
        benefits: ['Practical', 'Evidence-based', 'Actionable']
      }
    ],
    podcasts: [
      {
        title: 'The Hilarious World of Depression',
        host: 'John Moe',
        description: 'Conversations with comedians who have dealt with depression, combining humor with honest discussions about mental health.',
        link: 'https://www.hilariousworld.org/'
      },
      {
        title: 'The Depression Files',
        host: 'Al Levin',
        description: 'Interviews with men who have experienced depression, aiming to reduce stigma and provide hope and resources.',
        link: 'https://allevin18.podbean.com/'
      }
    ],
    playlists: [
      {
        title: 'Mood Boost',
        description: 'Uplifting music designed to improve mood and energy levels when feeling low.',
        spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1DX3rxVfibe1L0',
        tags: ['Uplifting', 'Energy', 'Mood Improvement']
      },
      {
        title: 'Peaceful Piano',
        description: 'Calming piano music that can help soothe emotional pain and create a relaxing atmosphere.',
        spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1DX4sWSpwq3LiO',
        tags: ['Calming', 'Emotional', 'Reflective']
      }
    ],
    exercises: [
      {
        title: 'Daily Activity Scheduling',
        description: 'A simple but powerful technique that helps combat depression by tracking your activities and their effect on your mood.',
        steps: [
          'Create a schedule for each day, hour by hour',
          'Plan activities that provide a sense of pleasure or accomplishment',
          'Rate how much you enjoy each activity from 0-10',
          'Rate your overall mood each day from 0-10',
          'Identify patterns between activities and mood',
          'Gradually increase activities that positively impact your mood',
          'Start with small, manageable activities and build up gradually'
        ]
      },
      {
        title: 'Gratitude Journaling',
        description: 'Regular reflection on positive aspects of life can help shift attention away from negative thoughts.',
        steps: [
          'Set aside 10-15 minutes each day, preferably in the evening',
          'Write down three things you're grateful for that day',
          'Be specific about each item and why it made you feel grateful',
          'Include both significant and small everyday occurrences',
          'Try to avoid repeating the same items day after day',
          'Notice any positive feelings that arise while writing',
          'Review your journal entries periodically to reinforce positive memories'
        ]
      }
    ]
  },
  mindfulness: {
    title: 'Mindfulness & Meditation',
    description: 'Mindfulness is the practice of purposely focusing your attention on the present moment—and accepting it without judgment. Mindfulness and meditation practices can help reduce stress, improve focus, and enhance overall well-being.',
    symptoms: [
      'Difficulty staying present in the moment',
      'Racing thoughts',
      'Overthinking past or future events',
      'Trouble focusing or concentrating',
      'Feeling overwhelmed',
      'Physical tension and stress',
      'Emotional reactivity'
    ],
    tips: [
      'Start with short, 5-minute meditation sessions',
      'Focus on your breath as an anchor',
      'Practice mindfulness during everyday activities',
      'Use guided meditations when beginning',
      'Be patient and non-judgmental with yourself',
      'Create a consistent practice schedule',
      'Find a quiet, comfortable space for formal practice'
    ],
    articles: [
      {
        title: 'The Science Behind Mindfulness Meditation',
        author: 'Harvard Health Publishing',
        description: 'Research findings on how mindfulness affects the brain, stress levels, and overall health.',
        link: 'https://www.health.harvard.edu/blog/mindfulness-meditation-may-ease-anxiety-mental-stress-201401086967'
      },
      {
        title: 'Mindfulness for Children and Teens',
        author: 'Mindful.org',
        description: 'Age-appropriate mindfulness practices for young people to develop emotional regulation skills.',
        link: 'https://www.mindful.org/mindfulness-for-kids/'
      },
      {
        title: 'Integrating Mindfulness into Daily Life',
        author: 'Greater Good Science Center',
        description: 'Practical ways to bring mindful awareness into routine activities for sustained well-being.',
        link: 'https://greatergood.berkeley.edu/topic/mindfulness/definition'
      }
    ],
    videos: [
      {
        title: 'Mindful Breathing Meditation (5 minutes)',
        description: 'A short guided practice focusing on the breath to center your attention and calm the mind.',
        youtubeUrl: 'https://www.youtube.com/embed/nmFUDkj1Aq0?rel=0&modestbranding=1',
        duration: '5:32',
        benefits: ['Quick', 'Beginner-friendly', 'Stress reduction']
      },
      {
        title: 'Body Scan Meditation for Relaxation',
        description: 'A guided practice to systematically release tension throughout the body and develop bodily awareness.',
        youtubeUrl: 'https://www.youtube.com/embed/QS2yDmWk0vs?rel=0&modestbranding=1',
        duration: '20:17',
        benefits: ['Physical relaxation', 'Sleep aid', 'Stress relief']
      }
    ],
    podcasts: [
      {
        title: 'Ten Percent Happier',
        host: 'Dan Harris',
        description: 'Conversations with meditation teachers and researchers exploring the practical applications of mindfulness.',
        link: 'https://www.tenpercent.com/podcast'
      },
      {
        title: 'Tara Brach',
        host: 'Tara Brach',
        description: 'Weekly talks and guided meditations by a renowned meditation teacher combining Western psychology and Eastern spiritual practices.',
        link: 'https://www.tarabrach.com/talks-audio-video/'
      }
    ],
    playlists: [
      {
        title: 'Meditation Moments',
        description: 'Ambient sounds and gentle music specifically designed to accompany meditation practice.',
        spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1DWZqd5JICZI0u',
        tags: ['Meditation', 'Focus', 'Calm']
      },
      {
        title: 'Peaceful Ambient',
        description: 'Atmospheric compositions that help create a tranquil environment for mindfulness practice.',
        spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1DX3Ogo9pFvBkY',
        tags: ['Ambient', 'Peaceful', 'Background']
      }
    ],
    exercises: [
      {
        title: 'STOP Practice for Stressful Moments',
        description: 'A brief mindfulness technique to use throughout the day, especially during challenging situations.',
        steps: [
          'S - Stop what you're doing, press pause',
          'T - Take a breath, focus on your breathing for a few moments',
          'O - Observe what's happening in your body, emotions, and thoughts',
          'P - Proceed with awareness of what would serve you best in this moment',
          'Practice this whenever you feel overwhelmed or on autopilot',
          'Use it as a way to interrupt unhelpful patterns',
          'Over time, this can become an automatic response to stress'
        ]
      },
      {
        title: 'Mindful Eating Exercise',
        description: 'A practice to develop presence and appreciation while eating, transforming a routine activity into a mindful experience.',
        steps: [
          'Choose a small piece of food (like a raisin or slice of fruit)',
          'Look at it closely, noticing colors, textures, and shapes',
          'Smell the food, noticing any aromas that arise',
          'Place it in your mouth but don't chew yet, noticing the sensation',
          'Slowly begin to chew, paying attention to tastes and textures',
          'Notice the impulse to swallow and the sensations of swallowing',
          'Reflect on the entire experience and the journey of the food'
        ]
      }
    ]
  },
  // Other topics would be defined here
};

export default function TopicDetails() {
  const { topicId } = useParams();
  const [, navigate] = useLocation();
  const { t } = useLanguage();
  const [topic, setTopic] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, we might fetch this data from an API
    if (topicId && topicsData[topicId as keyof typeof topicsData]) {
      setTopic(topicsData[topicId as keyof typeof topicsData]);
    } else {
      // If topic doesn't exist, navigate back to topics page
      navigate('/topics');
    }
    setLoading(false);
  }, [topicId, navigate]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-10 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Topic not found</h2>
          <Button onClick={() => navigate('/topics')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Topics
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        variant="outline" 
        onClick={() => navigate('/topics')}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Topics
      </Button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{topic.title}</h1>
        <p className="text-gray-600 max-w-3xl">{topic.description}</p>
      </div>

      <Tabs defaultValue="overview" className="w-full mb-12">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="music">Music</TabsTrigger>
          <TabsTrigger value="exercises">Exercises</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Info className="mr-2 h-5 w-5 text-blue-600" />
                  Common Symptoms
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {topic.symptoms.map((symptom: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{symptom}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Check className="mr-2 h-5 w-5 text-green-600" />
                  Helpful Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {topic.tips.map((tip: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Recommended Resources</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button 
                className="h-auto py-4 flex flex-col items-center text-center" 
                onClick={() => document.querySelector('[data-value="articles"]')?.click()}
              >
                <Book className="h-8 w-8 mb-2" />
                <span className="text-lg font-medium">Articles</span>
                <span className="text-sm opacity-80 mt-1">Evidence-based reading material</span>
              </Button>
              
              <Button 
                className="h-auto py-4 flex flex-col items-center text-center"
                onClick={() => document.querySelector('[data-value="videos"]')?.click()}
              >
                <Youtube className="h-8 w-8 mb-2" />
                <span className="text-lg font-medium">Videos</span>
                <span className="text-sm opacity-80 mt-1">Guided practices and explanations</span>
              </Button>
              
              <Button 
                className="h-auto py-4 flex flex-col items-center text-center"
                onClick={() => document.querySelector('[data-value="exercises"]')?.click()}
              >
                <Play className="h-8 w-8 mb-2" />
                <span className="text-lg font-medium">Exercises</span>
                <span className="text-sm opacity-80 mt-1">Step-by-step practices for your wellbeing</span>
              </Button>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Start a Conversation</h3>
            <Card>
              <CardContent className="pt-6">
                <p className="mb-4">
                  Would you like to discuss this topic with our AI assistant? Our chatbot can provide additional information, answer questions, and offer personalized support.
                </p>
                <Button onClick={() => navigate('/chat')} className="w-full sm:w-auto">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Chat About This Topic
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="articles" className="space-y-6">
          <h2 className="text-2xl font-semibold mb-4">Recommended Reading</h2>
          <div className="grid grid-cols-1 gap-6">
            {topic.articles.map((article: any, index: number) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{article.title}</CardTitle>
                  <CardDescription>By {article.author}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{article.description}</p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline">
                    <a href={article.link} target="_blank" rel="noopener noreferrer" className="flex items-center">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Read Article
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4">Podcasts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {topic.podcasts.map((podcast: any, index: number) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Headphones className="h-5 w-5 text-purple-600" />
                      <CardTitle className="text-lg">{podcast.title}</CardTitle>
                    </div>
                    <CardDescription>Hosted by {podcast.host}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{podcast.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="outline">
                      <a href={podcast.link} target="_blank" rel="noopener noreferrer" className="flex items-center">
                        <LinkIcon className="mr-2 h-4 w-4" />
                        Listen to Podcast
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="videos" className="space-y-6">
          <h2 className="text-2xl font-semibold mb-4">Educational & Guided Videos</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {topic.videos.map((video: any, index: number) => (
              <VideoGuide
                key={index}
                title={video.title}
                description={video.description}
                youtubeUrl={video.youtubeUrl}
                duration={video.duration}
                benefits={video.benefits}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="music" className="space-y-6">
          <h2 className="text-2xl font-semibold mb-4">Music for Mood Enhancement</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {topic.playlists.map((playlist: any, index: number) => (
              <SpotifyPlaylist
                key={index}
                title={playlist.title}
                description={playlist.description}
                spotifyUrl={playlist.spotifyUrl}
                tags={playlist.tags}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="exercises" className="space-y-6">
          <h2 className="text-2xl font-semibold mb-4">Practical Exercises</h2>
          <div className="grid grid-cols-1 gap-8">
            {topic.exercises.map((exercise: any, index: number) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Play className="mr-2 h-5 w-5 text-blue-600" />
                    {exercise.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">{exercise.description}</p>
                  
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Steps:</h4>
                    <ol className="space-y-2 list-decimal pl-5">
                      {exercise.steps.map((step: string, stepIndex: number) => (
                        <li key={stepIndex}>{step}</li>
                      ))}
                    </ol>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => navigate('/chat')}>
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Discuss This Exercise With AI
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}