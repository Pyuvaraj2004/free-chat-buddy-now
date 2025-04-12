
import React, { useEffect, useRef } from 'react';
import ChatMessage, { MessageType } from './ChatMessage';

interface ChatContainerProps {
  messages: MessageType[];
}

const ChatContainer: React.FC<ChatContainerProps> = ({ messages }) => {
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom whenever messages change
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 flex flex-col">
      {messages.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-gray-400 flex-col">
          <p className="text-xl font-medium mb-2">Start a conversation</p>
          <p className="text-sm text-center max-w-md">
            Click the microphone button below and speak to chat with your AI buddy
          </p>
        </div>
      ) : (
        messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))
      )}
      <div ref={endOfMessagesRef} />
    </div>
  );
};

export default ChatContainer;
