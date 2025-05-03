import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BookOpen, Youtube, Headphones, Bookmark } from "lucide-react";

export default function Recommendations() {
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
        <h1 className="text-3xl font-bold mb-2">Recommended Resources</h1>
        <p className="text-gray-600">
          Discover books, videos, podcasts, and other resources to support your mental well-being journey.
        </p>
      </div>

      <div className="space-y-10">
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
                      <span>Learn more</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 rounded-lg p-6 mt-8">
        <h2 className="text-xl font-semibold mb-2">Personalized Recommendations</h2>
        <div className="flex items-start gap-4">
          <Bookmark className="h-10 w-10 text-blue-500 mt-1" />
          <div>
            <p className="text-gray-600 mb-4">
              Get resources tailored to your specific needs and interests. Our AI will analyze your 
              preferences and suggest the most relevant books, videos, and podcasts.
            </p>
            <Button>Get My Personal Resources</Button>
          </div>
        </div>
      </div>
    </div>
  );
}