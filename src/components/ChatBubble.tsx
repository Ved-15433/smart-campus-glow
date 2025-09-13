import { ReactNode } from 'react';

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
  timestamp?: string;
  typing?: boolean;
  icon?: ReactNode;
}

export const ChatBubble = ({ message, isUser, timestamp, typing = false, icon }: ChatBubbleProps) => {
  if (typing) {
    return (
      <div className="flex items-start gap-3 animate-fade-in">
        <div className="w-8 h-8 rounded-full glass flex items-center justify-center text-primary">
          🤖
        </div>
        <div className="chat-bubble-ai">
          <div className="typing-dots">
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-start gap-3 animate-fade-in ${isUser ? 'flex-row-reverse' : ''}`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full glass flex items-center justify-center text-primary flex-shrink-0">
          {icon || '🤖'}
        </div>
      )}
      
      <div className="flex flex-col gap-1 max-w-[80%]">
        <div className={isUser ? 'chat-bubble-user ml-auto' : 'chat-bubble-ai'}>
          <p className="text-sm leading-relaxed">{message}</p>
        </div>
        {timestamp && (
          <span className="text-xs text-muted-foreground px-2">
            {timestamp}
          </span>
        )}
      </div>
    </div>
  );
};