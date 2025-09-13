interface ChatHeaderProps {
  title: string;
  isTyping?: boolean;
}

export const ChatHeader = ({ title, isTyping = false }: ChatHeaderProps) => {
  return (
    <header className="glass border-b border-glass-border backdrop-blur-xl">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full glass flex items-center justify-center text-primary">
              🤖
            </div>
            <div>
              <h1 className="font-bold text-lg">{title}</h1>
              {isTyping && (
                <p className="text-sm text-muted-foreground">Typing...</p>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-neon-green animate-pulse"></div>
            <span className="text-xs text-muted-foreground">Online</span>
          </div>
        </div>
      </div>
    </header>
  );
};