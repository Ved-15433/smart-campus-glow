import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Send, Mic } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput = ({ onSendMessage, disabled = false }: ChatInputProps) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <footer className="glass border-t border-glass-border backdrop-blur-xl">
      <div className="container mx-auto px-4 py-4">
        <form onSubmit={handleSubmit} className="flex items-center gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about campus services..."
              disabled={disabled}
              className="w-full glass rounded-2xl px-6 py-3 text-foreground placeholder:text-muted-foreground border-primary/20 focus:border-primary focus:outline-none focus:glow-subtle transition-all duration-300 bg-transparent"
            />
            <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
          </div>
          
          <Button
            type="button"
            variant="chat"
            size="chat"
            className="text-muted-foreground hover:text-primary"
          >
            <Mic className="w-4 h-4" />
          </Button>
          
          <Button
            type="submit"
            variant="chat"
            size="chat"
            disabled={disabled || !message.trim()}
            className="text-primary hover:text-neon-green disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </footer>
  );
};