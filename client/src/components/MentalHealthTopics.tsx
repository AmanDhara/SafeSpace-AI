import { useState } from 'react';
import { useLocation } from 'wouter';
import { 
  Brain, 
  Heart, 
  Pencil, 
  Zap, 
  Clock, 
  ArrowRight, 
  BarChart, 
  Lightbulb, 
  Coffee, 
  Users, 
  Moon,
  Leaf
} from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/hooks/use-language";

interface Topic {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  tags: string[];
}

export default function MentalHealthTopics() {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  
  // Define mental health topics
  const topics: Topic[] = [
    {
      id: 'anxiety',
      title: 'Anxiety',
      description: 'Learn to manage anxiety, panic attacks, and excessive worry with effective techniques.',
      icon: Brain,
      color: 'bg-blue-100 text-blue-700',
      tags: ['Worry', 'Panic', 'Stress']
    },
    {
      id: 'depression',
      title: 'Depression',
      description: 'Explore ways to cope with depression, improve mood, and develop positive thinking patterns.',
      icon: Heart,
      color: 'bg-purple-100 text-purple-700',
      tags: ['Mood', 'Energy', 'Motivation']
    },
    {
      id: 'stress',
      title: 'Stress Management',
      description: 'Discover effective strategies to reduce stress and build resilience in daily life.',
      icon: Zap,
      color: 'bg-orange-100 text-orange-700',
      tags: ['Relaxation', 'Burnout', 'Coping']
    },
    {
      id: 'mindfulness',
      title: 'Mindfulness & Meditation',
      description: 'Practice mindfulness techniques to stay present and develop greater awareness.',
      icon: Leaf,
      color: 'bg-green-100 text-green-700',
      tags: ['Focus', 'Awareness', 'Presence']
    },
    {
      id: 'sleep',
      title: 'Sleep Improvement',
      description: 'Improve your sleep quality with evidence-based strategies and healthy sleep habits.',
      icon: Moon,
      color: 'bg-indigo-100 text-indigo-700',
      tags: ['Insomnia', 'Rest', 'Relaxation']
    },
    {
      id: 'relationships',
      title: 'Relationships',
      description: 'Build healthier connections and improve communication in your relationships.',
      icon: Users,
      color: 'bg-pink-100 text-pink-700',
      tags: ['Communication', 'Boundaries', 'Connection']
    },
    {
      id: 'self-esteem',
      title: 'Self-esteem & Confidence',
      description: 'Develop a stronger sense of self-worth and confidence in your abilities.',
      icon: Lightbulb,
      color: 'bg-yellow-100 text-yellow-700',
      tags: ['Confidence', 'Worth', 'Affirmations']
    },
    {
      id: 'productivity',
      title: 'Productivity & Focus',
      description: 'Enhance your focus, overcome procrastination, and achieve your goals.',
      icon: BarChart,
      color: 'bg-teal-100 text-teal-700',
      tags: ['Concentration', 'Goals', 'Success']
    },
    {
      id: 'habits',
      title: 'Healthy Habits',
      description: 'Build positive routines and break unhealthy patterns for lasting well-being.',
      icon: Pencil,
      color: 'bg-emerald-100 text-emerald-700',
      tags: ['Routines', 'Wellness', 'Lifestyle']
    },
    {
      id: 'energy',
      title: 'Energy & Motivation',
      description: 'Boost your energy levels and find sustainable sources of motivation.',
      icon: Coffee,
      color: 'bg-red-100 text-red-700',
      tags: ['Fatigue', 'Inspiration', 'Vitality']
    },
    {
      id: 'time-management',
      title: 'Time Management',
      description: 'Learn to manage your time effectively and reduce feelings of overwhelm.',
      icon: Clock,
      color: 'bg-cyan-100 text-cyan-700',
      tags: ['Planning', 'Organization', 'Balance']
    }
  ];

  // Explore a specific topic
  const exploreTopic = (topicId: string) => {
    setLocation(`/topics/${topicId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Specialized Mental Health Topics</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Explore resources and guidance for specific mental health concerns. Select a topic to find targeted support, exercises, and resources.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic) => (
          <Card key={topic.id} className="hover:shadow-md transition-shadow">
            <CardHeader className={`flex flex-row items-center gap-4 ${topic.color} bg-opacity-30 rounded-t-lg`}>
              <topic.icon className="h-8 w-8" />
              <CardTitle>{topic.title}</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-gray-600 mb-4">{topic.description}</p>
              <div className="flex flex-wrap gap-2">
                {topic.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                onClick={() => exploreTopic(topic.id)}
              >
                Explore
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}