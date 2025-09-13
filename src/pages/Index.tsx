import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MessageCircle, Sparkles } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleStartChat = () => {
    setIsAnimating(true);
    setTimeout(() => {
      navigate('/chat');
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-neon-green/5 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-128 h-128 rounded-full bg-neon-cyan/3 blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 text-center space-y-8 max-w-4xl mx-auto px-6">
        {/* Main Title */}
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className="w-8 h-8 text-primary" />
            <h1 className="text-6xl font-black bg-gradient-to-r from-foreground via-primary to-neon-green bg-clip-text text-transparent">
              Smart Campus
            </h1>
            <Sparkles className="w-8 h-8 text-neon-green" />
          </div>
          
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Assistant
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Your AI-powered campus companion for schedules, dining, library services, 
            administrative help, and facility information.
          </p>
        </div>

        {/* Animated Chat Bubble */}
        <div className="relative">
          <div className={`float pulse-glow glass rounded-3xl p-8 border-primary/30 transition-all duration-500 ${isAnimating ? 'scale-110 glow-cyan' : ''}`}>
            <MessageCircle className="w-16 h-16 text-primary mx-auto mb-4" />
            <p className="text-foreground font-medium">
              "Hey! I'm here to help with all your campus needs. 
              <br />
              Just ask me anything!"
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="space-y-4">
          <Button
            onClick={handleStartChat}
            variant="neon"
            size="lg"
            className="transform hover:scale-105 transition-all duration-300"
            disabled={isAnimating}
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            {isAnimating ? 'Starting Chat...' : 'Start Chat'}
          </Button>
          
          <p className="text-sm text-muted-foreground">
            Available 24/7 • Instant responses • Student-focused
          </p>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-12">
          {[
            { emoji: '📅', label: 'Schedules' },
            { emoji: '🍴', label: 'Dining' },
            { emoji: '📚', label: 'Library' },
            { emoji: '🏢', label: 'Admin' },
            { emoji: '🏋️', label: 'Facilities' }
          ].map((feature, index) => (
            <div
              key={feature.label}
              className="glass glass-hover rounded-2xl p-4 text-center transition-all duration-300 hover:scale-105"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-2xl mb-2">{feature.emoji}</div>
              <div className="text-sm font-medium text-foreground">{feature.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
