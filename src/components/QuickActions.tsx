interface QuickAction {
  id: string;
  label: string;
  icon: string;
  description: string;
}

interface QuickActionsProps {
  onActionClick: (actionId: string) => void;
}

const quickActions: QuickAction[] = [
  { id: 'schedule', label: 'Schedule', icon: '📅', description: 'View class timetable' },
  { id: 'dining', label: 'Dining', icon: '🍴', description: 'Cafeteria menus' },
  { id: 'library', label: 'Library', icon: '📚', description: 'Services & timings' },
  { id: 'admin', label: 'Admin', icon: '🏢', description: 'Procedures guide' },
  { id: 'facilities', label: 'Facilities', icon: '🏋️', description: 'Campus facilities' },
];

export const QuickActions = ({ onActionClick }: QuickActionsProps) => {
  return (
    <div className="flex flex-wrap gap-3 justify-center animate-fade-in">
      {quickActions.map((action) => (
        <button
          key={action.id}
          onClick={() => onActionClick(action.id)}
          className="quick-action group"
          title={action.description}
        >
          <span className="mr-2 text-base group-hover:scale-110 transition-transform">
            {action.icon}
          </span>
          <span>{action.label}</span>
        </button>
      ))}
    </div>
  );
};