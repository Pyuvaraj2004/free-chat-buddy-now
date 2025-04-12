
// This service handles text-to-speech functionality

// Check if browser supports speech synthesis
const isSpeechSynthesisSupported = 'speechSynthesis' in window;

// Get available voices
let voices: SpeechSynthesisVoice[] = [];

if (isSpeechSynthesisSupported) {
  // Some browsers need a small delay to load voices
  setTimeout(() => {
    voices = window.speechSynthesis.getVoices();
  }, 100);
  
  // Handle voices changed event
  window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();
  };
}

export const speakText = (text: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!isSpeechSynthesisSupported) {
      console.error("Speech synthesis not supported in this browser");
      reject("Speech synthesis not supported");
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Try to select a natural-sounding English voice
    if (voices.length > 0) {
      // Prefer these voice types in order
      const preferredVoices = [
        voices.find(v => v.name.includes('Google') && v.name.includes('US')),
        voices.find(v => v.name.includes('Samantha')),
        voices.find(v => v.lang === 'en-US' && v.name.includes('Female')),
        voices.find(v => v.lang === 'en-US'),
        voices.find(v => v.lang.startsWith('en')),
        voices[0]  // fallback to first available voice
      ];
      
      utterance.voice = preferredVoices.find(Boolean) || null;
    }
    
    utterance.rate = 1.0;  // Speech rate
    utterance.pitch = 1.0; // Speech pitch
    utterance.volume = 1.0; // Volume
    
    utterance.onend = () => {
      resolve();
    };
    
    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      reject(event);
    };
    
    window.speechSynthesis.speak(utterance);
  });
};

export const stopSpeaking = (): void => {
  if (isSpeechSynthesisSupported) {
    window.speechSynthesis.cancel();
  }
};

export const isSpeechSupported = (): boolean => {
  return isSpeechSynthesisSupported;
};
