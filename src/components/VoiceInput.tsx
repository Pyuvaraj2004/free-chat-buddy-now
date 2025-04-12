
import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SpeechWave from './SpeechWave';

interface VoiceInputProps {
  onSpeechResult: (text: string) => void;
  isBotSpeaking: boolean;
}

const VoiceInput: React.FC<VoiceInputProps> = ({ onSpeechResult, isBotSpeaking }) => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);

  useEffect(() => {
    // Check if browser supports speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      console.error("Speech recognition not supported in this browser");
      setSpeechSupported(false);
      return;
    }
    
    // Initialize speech recognition
    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.continuous = false;
    recognitionInstance.interimResults = false;
    recognitionInstance.lang = 'en-US';
    
    recognitionInstance.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onSpeechResult(transcript);
      setIsListening(false);
    };
    
    recognitionInstance.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      if (event.error === 'not-allowed') {
        setPermissionDenied(true);
      }
      setIsListening(false);
    };
    
    recognitionInstance.onend = () => {
      setIsListening(false);
    };
    
    setRecognition(recognitionInstance);
    
    // Clean up
    return () => {
      if (recognition) {
        recognition.abort();
      }
    };
  }, [onSpeechResult]);

  const toggleListening = () => {
    if (!recognition) return;
    
    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      setPermissionDenied(false);
      recognition.start();
      setIsListening(true);
    }
  };

  if (!speechSupported) {
    return (
      <div className="p-4 bg-red-50 rounded-lg text-red-500 text-center">
        Your browser doesn't support speech recognition.
        Try using Chrome, Edge, or Safari.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2">
      {permissionDenied && (
        <div className="text-red-500 text-sm mb-2">
          Microphone permission denied. Please enable it in your browser settings.
        </div>
      )}
      
      <Button
        onClick={toggleListening}
        disabled={isBotSpeaking}
        className={`rounded-full w-16 h-16 ${
          isListening 
            ? "bg-red-500 hover:bg-red-600" 
            : "bg-chatbot-primary hover:bg-chatbot-secondary"
        }`}
        aria-label={isListening ? "Stop listening" : "Start listening"}
      >
        {isListening ? (
          <MicOff className="h-6 w-6" />
        ) : (
          <Mic className="h-6 w-6" />
        )}
      </Button>
      
      <div className="h-5 flex items-center justify-center">
        {isListening ? (
          <SpeechWave isActive={isListening} className="text-chatbot-primary" />
        ) : isBotSpeaking ? (
          <div className="flex items-center gap-2 text-chatbot-primary">
            <Volume2 size={16} className="animate-pulse-slow" />
            <span className="text-xs">Speaking...</span>
          </div>
        ) : (
          <span className="text-xs text-gray-500">
            {permissionDenied ? "Permission denied" : "Tap to speak"}
          </span>
        )}
      </div>
    </div>
  );
};

export default VoiceInput;
