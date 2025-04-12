
import React, { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ChatContainer from './ChatContainer';
import VoiceInput from './VoiceInput';
import { MessageType } from './ChatMessage';
import { getChatResponse } from '@/services/chatService';
import { speakText, stopSpeaking } from '@/services/speechService';
import { useToast } from '@/hooks/use-toast';

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isBotSpeaking, setIsBotSpeaking] = useState(false);
  const { toast } = useToast();

  const handleSpeechResult = useCallback(async (text: string) => {
    // Show user's message
    const userMessage: MessageType = {
      id: uuidv4(),
      content: text,
      role: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    
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
      
      // Speak the response
      setIsBotSpeaking(true);
      await speakText(responseText);
      setIsBotSpeaking(false);
    } catch (error) {
      console.error('Error processing message:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      setIsBotSpeaking(false);
    }
  }, [toast]);

  return (
    <div className="flex flex-col h-full max-w-4xl w-full mx-auto bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100">
      <div className="bg-gradient-to-r from-chatbot-primary to-chatbot-secondary text-white p-4">
        <h1 className="text-xl font-bold text-center">Voice Chat Buddy</h1>
      </div>
      
      <ChatContainer messages={messages} />
      
      <div className="p-4 border-t border-gray-200 bg-white flex justify-center">
        <VoiceInput 
          onSpeechResult={handleSpeechResult} 
          isBotSpeaking={isBotSpeaking} 
        />
      </div>
    </div>
  );
};

export default Chatbot;
