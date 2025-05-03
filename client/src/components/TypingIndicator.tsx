import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot } from "lucide-react";

export default function TypingIndicator() {
  return (
    <div className="flex items-start mb-4">
      <Avatar className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white mr-2 flex-shrink-0">
        <AvatarFallback className="bg-primary text-white">
          <Bot size={16} />
        </AvatarFallback>
      </Avatar>
      <div className="max-w-[80%] bg-neutral-medium rounded-lg rounded-tl-none p-3">
        <div className="typing-animation">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}
