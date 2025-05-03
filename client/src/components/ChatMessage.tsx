import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, User } from "lucide-react";
import TextToSpeech from "@/components/TextToSpeech";
import { useEffect, useRef } from "react";

interface ChatMessageProps {
  content: string;
  isUserMessage: boolean;
  language?: string;
}

export default function ChatMessage({ content, isUserMessage, language = "en" }: ChatMessageProps) {
  // Use ref to track if this is a new message
  const isNewMessage = useRef(true);

  // Reset the ref on component unmount
  useEffect(() => {
    return () => {
      isNewMessage.current = false;
    };
  }, []);

  return (
    <div className={`flex items-start mb-4 ${isUserMessage ? "justify-end" : ""}`}>
      {!isUserMessage && (
        <Avatar className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white mr-2 flex-shrink-0">
          <AvatarFallback className="bg-primary text-white">
            <Bot size={16} />
          </AvatarFallback>
        </Avatar>
      )}
      
      <div 
        className={`max-w-[80%] ${
          isUserMessage 
            ? "bg-primary text-white rounded-lg rounded-tr-none" 
            : "bg-neutral-medium text-neutral-darkest rounded-lg rounded-tl-none"
        } p-3`}
      >
        <p className={`${isUserMessage ? "text-white" : "text-neutral-darkest"}`}>{content}</p>
        
        {/* Only show text-to-speech for AI responses with auto-play enabled */}
        {!isUserMessage && (
          <div className="mt-2 flex justify-end">
            <TextToSpeech 
              text={content} 
              language={language} 
              autoPlay={isNewMessage.current} 
            />
          </div>
        )}
      </div>
      
      {isUserMessage && (
        <Avatar className="w-8 h-8 rounded-full bg-neutral-dark flex items-center justify-center text-white ml-2 flex-shrink-0">
          <AvatarFallback className="bg-neutral-dark text-white">
            <User size={16} />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
