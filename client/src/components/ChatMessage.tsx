import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, User, ThumbsUp, MessageSquare } from "lucide-react";
import TextToSpeech from "@/components/TextToSpeech";
import FeedbackForm from "@/components/FeedbackForm";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface ChatMessageProps {
  content: string;
  isUserMessage: boolean;
  language?: string;
  messageId?: string;
}

export default function ChatMessage({ content, isUserMessage, language = "en", messageId }: ChatMessageProps) {
  // Use ref to track if this is a new message
  const isNewMessage = useRef(true);
  const [isFeedbackDialogOpen, setIsFeedbackDialogOpen] = useState(false);
  
  // Reset the isNewMessage flag after the component is mounted
  // This ensures auto-play only happens once when the message first appears
  useEffect(() => {
    // We're using a setTimeout to ensure the component is fully mounted
    // before attempting to auto-play, which helps with speech synthesis reliability
    const timer = setTimeout(() => {
      // Keep the current value for this render cycle
      // isNewMessage.current will be used for the initial TextToSpeech render
    }, 100);
    
    return () => {
      clearTimeout(timer);
      // Cleanup on unmount
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
        
        {/* Only show text-to-speech and feedback for AI responses */}
        {!isUserMessage && (
          <div className="mt-2 flex justify-between items-center">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1 p-1"
              onClick={() => setIsFeedbackDialogOpen(true)}
            >
              <MessageSquare className="h-3 w-3" />
              Feedback
            </Button>
            <TextToSpeech 
              text={content} 
              language={language} 
              autoPlay={isNewMessage.current} 
            />
          </div>
        )}
        
        {/* Feedback Dialog */}
        <Dialog open={isFeedbackDialogOpen} onOpenChange={setIsFeedbackDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <FeedbackForm 
              messageId={messageId}
              responseContent={content}
              onClose={() => setIsFeedbackDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
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
