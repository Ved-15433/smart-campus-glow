import { useState, useEffect, useRef } from 'react';
import { ChatHeader } from '@/components/ChatHeader';
import { ChatBubble } from '@/components/ChatBubble';
import { ChatInput } from '@/components/ChatInput';
import { QuickActions } from '@/components/QuickActions';
import { aiResponses } from '@/data/mockData';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: string;
  icon?: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    // Initial greeting
    const initialMessage: Message = {
      id: '1',
      content: aiResponses.greeting,
      isUser: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      icon: '🤖'
    };
    setMessages([initialMessage]);
  }, []);

  const generateAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('schedule') || message.includes('class') || message.includes('timetable')) {
      return aiResponses.schedule();
    }
    
    if (message.includes('dining') || message.includes('food') || message.includes('cafeteria') || message.includes('menu')) {
      return aiResponses.dining();
    }
    
    if (message.includes('library') || message.includes('book') || message.includes('study')) {
      return aiResponses.library();
    }
    
    if (message.includes('admin') || message.includes('registration') || message.includes('procedure') || message.includes('document')) {
      return aiResponses.admin();
    }
    
    if (message.includes('facilities') || message.includes('gym') || message.includes('pool') || message.includes('court')) {
      return aiResponses.facilities();
    }
    
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return "Hello! 👋 How can I assist you with campus services today?";
    }
    
    return aiResponses.fallback;
  };

  const handleSendMessage = (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setShowQuickActions(false);
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(content),
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        icon: getResponseIcon(content)
      };

      setIsTyping(false);
      setMessages(prev => [...prev, aiResponse]);
    }, 1000 + Math.random() * 1500); // Random delay between 1-2.5 seconds
  };

  const getResponseIcon = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    if (message.includes('schedule') || message.includes('class')) return '📅';
    if (message.includes('dining') || message.includes('food')) return '🍴';
    if (message.includes('library') || message.includes('book')) return '📚';
    if (message.includes('admin') || message.includes('procedure')) return '🏢';
    if (message.includes('facilities') || message.includes('gym')) return '🏋️';
    return '🤖';
  };

  const handleQuickAction = (actionId: string) => {
    const actionMessages: Record<string, string> = {
      schedule: "Show me my class schedule",
      dining: "What's on the menu today?",
      library: "What library services are available?",
      admin: "Help me with administrative procedures",
      facilities: "Show me campus facilities status"
    };

    const message = actionMessages[actionId];
    if (message) {
      handleSendMessage(message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <ChatHeader title="Smart Campus Assistant" isTyping={isTyping} />
      
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-6 space-y-6">
          {messages.map((message) => (
            <ChatBubble
              key={message.id}
              message={message.content}
              isUser={message.isUser}
              timestamp={message.timestamp}
              icon={message.icon}
            />
          ))}
          
          {isTyping && (
            <ChatBubble
              message=""
              isUser={false}
              typing={true}
            />
          )}
          
          {showQuickActions && messages.length === 1 && (
            <div className="pt-6">
              <p className="text-center text-muted-foreground mb-4 text-sm">
                Quick actions to get started:
              </p>
              <QuickActions onActionClick={handleQuickAction} />
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </main>
      
      <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
    </div>
  );
}