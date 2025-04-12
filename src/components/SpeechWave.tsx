
import React from 'react';
import { cn } from '@/lib/utils';

interface SpeechWaveProps {
  isActive: boolean;
  className?: string;
}

const SpeechWave: React.FC<SpeechWaveProps> = ({ isActive, className }) => {
  if (!isActive) {
    return null;
  }

  return (
    <div className={cn("speech-wave", className)}>
      <div className="speech-wave-bar h-2 animate-wave-1" />
      <div className="speech-wave-bar h-3 animate-wave-2" />
      <div className="speech-wave-bar h-4 animate-wave-3" />
      <div className="speech-wave-bar h-3 animate-wave-4" />
      <div className="speech-wave-bar h-2 animate-wave-5" />
    </div>
  );
};

export default SpeechWave;
