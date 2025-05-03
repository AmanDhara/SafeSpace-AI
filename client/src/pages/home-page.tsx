import { useAuth } from "@/hooks/use-auth";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { MessageSquare, Volume2, Languages } from "lucide-react";

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center gap-8 mb-12 bg-white rounded-lg overflow-hidden shadow-sm">
        <div className="flex-1 p-8">
          <h1 className="text-3xl font-bold mb-4">
            Welcome, <span className="text-blue-500">{user?.name || user?.username}!</span>
          </h1>
          <p className="text-gray-600 mb-6">
            How are you feeling today? I'm here to listen and support your mental
            wellness journey.
          </p>
          <Link href="/chat">
            <Button className="bg-blue-500 hover:bg-blue-600">
              Start Conversation
            </Button>
          </Link>
        </div>
        <div className="flex-1 p-6 bg-blue-500 min-h-[300px] flex items-center justify-center">
          <svg
            className="w-64 h-64"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="100" cy="100" r="80" fill="#8CC5FF" opacity="0.8" />
            <g transform="translate(60, 85)">
              <circle cx="10" cy="10" r="8" fill="#FFC2D1" />
              <circle cx="70" cy="10" r="8" fill="#FFC2D1" />
              <g transform="translate(10, 30)">
                <path
                  d="M0,0 C20,20 40,20 60,0"
                  stroke="#FFC2D1"
                  strokeWidth="3"
                  fill="none"
                />
              </g>
            </g>
            <circle cx="70" cy="40" r="5" fill="#FFFFFF" opacity="0.6" />
            <circle cx="120" cy="30" r="8" fill="#FFFFFF" opacity="0.6" />
            <circle cx="150" cy="80" r="6" fill="#FFFFFF" opacity="0.6" />
          </svg>
        </div>
      </div>

      {/* Key Features Section */}
      <h2 className="text-2xl font-bold mb-6">Key Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* AI Chat Feature */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <MessageSquare className="h-6 w-6 text-blue-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2">AI Chat Support</h3>
          <p className="text-gray-600">
            Have meaningful conversations about your mental health with our
            empathetic AI assistant.
          </p>
        </div>

        {/* Voice Interaction Feature */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <Volume2 className="h-6 w-6 text-blue-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Voice Interaction</h3>
          <p className="text-gray-600">
            Speak naturally with our AI and get voice responses for a more
            personal experience.
          </p>
        </div>

        {/* Multilingual Support Feature */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <Languages className="h-6 w-6 text-blue-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Multilingual Support</h3>
          <p className="text-gray-600">
            Communicate in your preferred language, including Hindi, Kannada,
            Telugu, and Tamil.
          </p>
        </div>
      </div>

      {/* Quick Access Section */}
      <h2 className="text-2xl font-bold mb-4">Quick Access</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-2">Recent Conversations</h3>
          <p className="text-gray-600 mb-4">
            Continue where you left off with your recent chats.
          </p>
          <Link href="/chat">
            <Button variant="outline" className="w-full">
              View Conversations
            </Button>
          </Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-2">Professional Help</h3>
          <p className="text-gray-600 mb-4">
            Connect with mental health professionals for personalized guidance.
          </p>
          <Link href="/therapists">
            <Button variant="outline" className="w-full">
              Find Therapists
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}