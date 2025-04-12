
import React from 'react';
import Chatbot from '@/components/Chatbot';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6 text-chatbot-primary">Free Chat Buddy</h1>
      <Chatbot />
    </div>
  );
};

export default Index;
