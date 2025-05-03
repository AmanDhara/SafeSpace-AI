import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Brain } from "lucide-react";
import ChatInput from "@/components/ChatInput";
import ChatMessage from "@/components/ChatMessage";
import LanguageSelector from "@/components/LanguageSelector";
import TypingIndicator from "@/components/TypingIndicator";
import { welcomeMessages } from "@/lib/languages";
import { ChatResponse } from "@shared/schema";

// Message interface
interface Message {
  id: string;
  content: string;
  isUserMessage: boolean;
  language?: string;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [sessionId, setSessionId] = useState<string>("");
  const [currentLanguage, setCurrentLanguage] = useState<string>("en");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Get session ID
  useEffect(() => {
    const fetchSessionId = async () => {
      try {
        const response = await fetch("/api/session");
        const data = await response.json();
        setSessionId(data.sessionId);
      } catch (error) {
        console.error("Failed to get session ID:", error);
        toast({
          title: "Error",
          description: "Failed to initialize chat session. Please refresh the page.",
          variant: "destructive",
        });
      }
    };

    fetchSessionId();
  }, [toast]);

  // Add interactive welcome message when the session is initialized
  useEffect(() => {
    if (sessionId) {
      setMessages([
        {
          id: "welcome",
          content: "Hi there! I'm your mental health support assistant. How are you feeling today? I'm here to listen and help you with whatever's on your mind.",
          isUserMessage: false,
          language: currentLanguage
        },
      ]);
    }
  }, [sessionId, currentLanguage]);

  // Get chat history for the session
  const chatHistoryQuery = useQuery({
    queryKey: ["/api/chat", sessionId],
    queryFn: async () => {
      if (!sessionId) return { messages: [] };
      const res = await fetch(`/api/chat/${sessionId}`);
      if (!res.ok) throw new Error("Failed to load chat history");
      return res.json();
    },
    enabled: !!sessionId
  });
  
  // Handle chat history data with proper error and data handling
  useEffect(() => {
    if (chatHistoryQuery.error) {
      console.error("Failed to load chat history:", chatHistoryQuery.error);
      return;
    }
    
    const data = chatHistoryQuery.data;
    if (data && data.messages && data.messages.length > 0) {
      setMessages(data.messages.map((msg: any) => ({
        id: msg.id.toString(),
        content: msg.content,
        isUserMessage: msg.isUserMessage,
        language: msg.language,
      })));
    }
  }, [chatHistoryQuery.data, chatHistoryQuery.error]);

  // Mutation for sending messages
  const sendMessageMutation = useMutation({
    mutationFn: async (message: string) => {
      setIsTyping(true);
      const response = await apiRequest("POST", "/api/chat", {
        message,
        language: currentLanguage,
        sessionId,
      });
      const data: ChatResponse = await response.json();
      return data;
    },
    onSuccess: (data) => {
      // Add bot response
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          content: data.message,
          isUserMessage: false,
          language: data.language,
        },
      ]);
      
      // Update language if detection changed it
      if (data.detectedLanguage && data.detectedLanguage !== currentLanguage) {
        setCurrentLanguage(data.detectedLanguage);
      }
      
      setIsTyping(false);
      // Invalidate chat history query
      queryClient.invalidateQueries({ queryKey: ["/api/chat", sessionId] });
    },
    onError: (error) => {
      setIsTyping(false);
      console.error("Failed to send message:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Handle message sending
  const handleSendMessage = (message: string) => {
    if (!message.trim()) return;
    
    // Add user message to the UI immediately
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        content: message,
        isUserMessage: true,
      },
    ]);
    
    // Send to the API
    sendMessageMutation.mutate(message);
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Handle language change
  const handleLanguageChange = (language: string) => {
    setCurrentLanguage(language);
    
    // Add system message about language change
    setMessages(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        content: welcomeMessages[language] || welcomeMessages.en,
        isUserMessage: false,
        language,
      },
    ]);
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-neutral-light">
      <div className="flex flex-col h-full max-w-4xl mx-auto w-full shadow-lg bg-white">
        {/* Header */}
        <header className="bg-primary px-4 py-3 text-white shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Brain size={24} />
              <h1 className="text-xl font-semibold">Mental Health Support</h1>
            </div>
            
            {/* Language selector */}
            <LanguageSelector 
              currentLanguage={currentLanguage}
              onLanguageChange={handleLanguageChange}
            />
          </div>
        </header>

        {/* Welcome message */}
        <div className="bg-neutral-medium px-4 py-3 border-b border-neutral-light">
          <p className="text-neutral-darkest text-sm">
            {welcomeMessages[currentLanguage] || welcomeMessages.en}
          </p>
        </div>

        {/* Chat messages container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar" id="chatContainer">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              content={message.content}
              isUserMessage={message.isUserMessage}
              language={message.language || currentLanguage}
            />
          ))}
          
          {isTyping && <TypingIndicator />}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Chat input */}
        <ChatInput 
          onSendMessage={handleSendMessage}
          isLoading={isTyping}
          currentLanguage={currentLanguage}
        />
      </div>
    </div>
  );
}
