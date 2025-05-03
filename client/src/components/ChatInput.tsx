import { useState, KeyboardEvent, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { placeholders } from "@/lib/languages";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  currentLanguage: string;
}

export default function ChatInput({ onSendMessage, isLoading, currentLanguage }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Focus textarea on mount
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage("");
      // Reset height
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  return (
    <div className="border-t border-neutral-light p-4 bg-white">
      <div className="flex items-center">
        <Textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholders[currentLanguage] || placeholders.en}
          className="flex-1 resize-none min-h-[44px] max-h-[120px] border border-neutral-light rounded-l-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary"
          disabled={isLoading}
        />
        <Button
          onClick={handleSendMessage}
          className="bg-primary text-white rounded-r-lg px-4 py-3 h-full hover:bg-primary-dark transition-colors"
          disabled={!message.trim() || isLoading}
        >
          <Send size={18} />
        </Button>
      </div>
      <div className="mt-2 flex justify-between text-xs text-neutral-dark">
        <span>Supports 6 languages: English, Hindi, Marathi, Tamil, Telugu, Kannada</span>
        <span className={message.length > 0 ? "" : "hidden"}>
          {message.length}/500
        </span>
      </div>
    </div>
  );
}
