
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import ChatContainer from '@/components/ChatContainer';
import TextInput from '@/components/TextInput';
import { v4 as uuidv4 } from 'uuid';
import { MessageType } from '@/components/ChatMessage';

const ChatbotAssistance = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [weakAreas, setWeakAreas] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Get weak areas from localStorage that were saved after test
    const storedWeakAreas = localStorage.getItem('weakAreas');
    let areas: string[] = [];
    
    if (storedWeakAreas) {
      try {
        areas = JSON.parse(storedWeakAreas);
        setWeakAreas(areas);
      } catch (e) {
        console.error("Error parsing weak areas", e);
      }
    }

    // Send initial welcome message
    const initialMessage: MessageType = {
      id: uuidv4(),
      content: areas.length > 0 
        ? `Hello! Based on your test results, I can help you improve in: ${areas.join(", ")}. What would you like to know specifically?` 
        : "Hello! I'm your learning assistant. How can I help you today?",
      role: 'bot',
      timestamp: new Date(),
    };

    setMessages([initialMessage]);
  }, []);

  const generateChatbotResponse = async (userMessage: string): Promise<string> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Example personalized responses based on detected weak areas
    if (weakAreas.includes("HTML Basics")) {
      return `
Here's a roadmap to improve your HTML basics:

1. Start with basic document structure (DOCTYPE, html, head, body tags)
2. Learn semantic HTML elements (header, nav, main, section, article, footer)
3. Practice with text formatting elements (h1-h6, p, strong, em)
4. Master lists (ul, ol, li) and tables
5. Learn form elements (input, textarea, select, button)

Resources:
- MDN Web Docs (https://developer.mozilla.org/en-US/docs/Web/HTML)
- FreeCodeCamp HTML course
- W3Schools HTML Tutorial

Would you like me to explain any of these areas in more detail?`;
    }
    
    if (weakAreas.includes("CSS Styling")) {
      return `
Here's a roadmap to improve your CSS styling skills:

1. Understand selectors (element, class, ID, attribute selectors)
2. Master the box model (content, padding, border, margin)
3. Learn layout techniques (flexbox and grid)
4. Study positioning (relative, absolute, fixed, sticky)
5. Practice responsive design with media queries

Resources:
- CSS-Tricks (especially their Flexbox and Grid guides)
- MDN CSS documentation
- FreeCodeCamp CSS challenges

Would you like me to explain any of these concepts further?`;
    }

    // Default response for other topics
    return `
To help you improve your skills, I recommend following these general steps:

1. Start with the fundamentals of the topic
2. Practice with small projects
3. Use resources like documentation and tutorials
4. Join communities to ask questions
5. Build increasingly complex projects

Is there a specific area you'd like more detailed guidance on?`;
  };

  const handleSubmit = async (text: string) => {
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
      // Get response from chatbot
      const responseText = await generateChatbotResponse(text);
      
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto p-4 pt-20">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 max-w-4xl mx-auto h-[70vh] flex flex-col">
          <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white p-4">
            <h1 className="text-xl font-bold">Learning Assistant</h1>
            <p className="text-sm opacity-90">Get personalized guidance based on your test results</p>
          </div>
          
          <div className="flex-1 overflow-hidden flex flex-col">
            <ChatContainer messages={messages} />
            
            <div className="p-4 border-t border-gray-200">
              <TextInput 
                onSubmit={handleSubmit} 
                isLoading={isLoading} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotAssistance;
