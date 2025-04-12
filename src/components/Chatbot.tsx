
import React, { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ChatContainer from './ChatContainer';
import TextInput from './TextInput';
import { MessageType } from './ChatMessage';
import { getChatResponse } from '@/services/chatService';
import { useToast } from '@/hooks/use-toast';

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = useCallback(async (text: string) => {
    // Show user's message
    const userMessage: MessageType = {
      id: uuidv4(),
      content: text,
      role: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setIsLoading(true);
    
    try {
      // Get response from chat service
      const responseText = await getChatResponse(text);
      
      // Add bot response
      const botMessage: MessageType = {
        id: uuidv4(),
        content: responseText,
        role: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error processing message:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  return (
    <div className="flex flex-col h-full max-w-4xl w-full mx-auto bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100">
      <div className="bg-gradient-to-r from-chatbot-primary to-chatbot-secondary text-white p-4">
        <h1 className="text-xl font-bold text-center">Chat Buddy</h1>
      </div>
      
      <ChatContainer messages={messages} />
      
      <div className="p-4 border-t border-gray-200 bg-white">
        <TextInput 
          onSubmit={handleSubmit} 
          isLoading={isLoading} 
        />
      </div>
    </div>
  );
};

export default Chatbot;
