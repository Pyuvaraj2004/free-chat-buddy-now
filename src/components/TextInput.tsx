
import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface TextInputProps {
  onSubmit: (text: string) => void;
  isLoading: boolean;
}

const TextInput: React.FC<TextInputProps> = ({ onSubmit, isLoading }) => {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      onSubmit(inputText.trim());
      setInputText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex gap-2">
      <Textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Type your message here..."
        className="resize-none min-h-[50px] flex-1"
        disabled={isLoading}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (inputText.trim()) {
              handleSubmit(e);
            }
          }
        }}
      />
      <Button 
        type="submit" 
        size="icon" 
        disabled={isLoading || !inputText.trim()}
        className="h-[50px] w-[50px]"
      >
        <Send size={20} />
      </Button>
    </form>
  );
};

export default TextInput;
