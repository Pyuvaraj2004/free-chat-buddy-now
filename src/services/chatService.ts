
// This service simulates a chat API response
// In the future, this could be replaced with a real API call

type ResponseOptions = {
  timeoutMs?: number;  // simulate network delay
};

// Simple responses for demonstration
const responses: Record<string, string[]> = {
  greeting: [
    "Hello there! How can I help you today?",
    "Hi! I'm your chat buddy. What's on your mind?",
    "Hey! Great to hear from you. How are you doing?",
  ],
  weather: [
    "I don't have access to real-time weather data, but I'd be happy to chat about something else!",
    "I wish I could tell you the weather, but I don't have that capability yet.",
  ],
  help: [
    "I'm your friendly chat buddy! You can talk to me about various topics, ask questions, or just have a casual conversation.",
    "I'm here to chat with you. Try asking me questions or just talk about your day!",
  ],
  unknown: [
    "That's interesting. Tell me more about it.",
    "I'm not sure I understand completely. Could you elaborate?",
    "Thanks for sharing that with me. What else is on your mind?",
    "I'm listening. Feel free to continue.",
  ],
  joke: [
    "Why don't scientists trust atoms? Because they make up everything!",
    "What's the best thing about Switzerland? I don't know, but the flag is a big plus.",
    "I told my wife she was drawing her eyebrows too high. She looked surprised.",
    "Why did the scarecrow win an award? Because he was outstanding in his field!",
  ],
  time: [
    `The current time is ${new Date().toLocaleTimeString()}.`,
    `It's currently ${new Date().toLocaleTimeString()} where I am.`,
  ],
  date: [
    `Today is ${new Date().toLocaleDateString()}.`,
    `The date today is ${new Date().toLocaleDateString()}.`,
  ],
  name: [
    "I'm your AI chat buddy! You can call me Buddy if you like.",
    "I don't have a specific name, but you can call me Chat Buddy!",
  ],
  bye: [
    "Goodbye! Feel free to chat again whenever you want.",
    "See you later! Come back anytime.",
    "Bye for now! Hope we can chat again soon.",
  ],
};

// Determine which category the user's message falls into
function categorizeMessage(message: string): string {
  message = message.toLowerCase();
  
  if (/\b(hi|hello|hey|greetings|howdy)\b/.test(message)) return 'greeting';
  if (/\b(weather|temperature|forecast|rain|sunny)\b/.test(message)) return 'weather';
  if (/\b(help|assist|support|guide|what can you do)\b/.test(message)) return 'help';
  if (/\b(joke|funny|make me laugh|tell me a joke)\b/.test(message)) return 'joke';
  if (/\b(time|hour|clock)\b/.test(message)) return 'time';
  if (/\b(date|day|today)\b/.test(message)) return 'date';
  if (/\b(name|call you|who are you)\b/.test(message)) return 'name';
  if (/\b(bye|goodbye|farewell|see you|later)\b/.test(message)) return 'bye';
  
  return 'unknown';
}

// Get a random response from the appropriate category
function getRandomResponse(category: string): string {
  const categoryResponses = responses[category] || responses.unknown;
  const randomIndex = Math.floor(Math.random() * categoryResponses.length);
  return categoryResponses[randomIndex];
}

export const getChatResponse = async (message: string, options: ResponseOptions = {}): Promise<string> => {
  const { timeoutMs = 500 } = options;
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, timeoutMs));
  
  // Categorize message and get appropriate response
  const category = categorizeMessage(message);
  return getRandomResponse(category);
};
