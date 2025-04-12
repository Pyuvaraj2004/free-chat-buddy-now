
import React from 'react';
import { cn } from '@/lib/utils';
import { Bot, User } from 'lucide-react';

export type MessageType = {
  id: string;
  content: string;
  role: 'user' | 'bot';
  timestamp: Date;
};

interface ChatMessageProps {
  message: MessageType;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.role === 'bot';

  return (
    <div 
      className={cn(
        "flex items-start gap-3 mb-4 max-w-[85%] md:max-w-[70%]",
        isBot ? "self-start" : "self-end ml-auto"
      )}
    >
      {isBot && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-chatbot-primary text-white flex items-center justify-center">
          <Bot size={18} />
        </div>
      )}
      <div 
        className={cn(
          "rounded-2xl p-4",
          isBot 
            ? "bg-white border border-gray-200 shadow-sm text-left" 
            : "bg-chatbot-primary text-white"
        )}
      >
        {message.content}
      </div>
      {!isBot && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-chatbot-secondary text-white flex items-center justify-center">
          <User size={18} />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
