import { Button } from './ui/button';

interface GameFilterProps {
  activeFilter: 'alle' | 'einzelspiel' | 'teamspiel';
  onFilterChange: (filter: 'alle' | 'einzelspiel' | 'teamspiel') => void;
}

export const GameFilter = ({ activeFilter, onFilterChange }: GameFilterProps) => {
  const filters = [
    { key: 'alle' as const, label: 'Alle Spiele' },
    { key: 'einzelspiel' as const, label: 'Einzelspiele' },
    { key: 'teamspiel' as const, label: 'Teamspiele' }
  ];

  return (
    <div className="flex flex-wrap gap-3 justify-center mb-8">
      {filters.map((filter) => (
        <Button
          key={filter.key}
          variant={activeFilter === filter.key ? "default" : "secondary"}
          onClick={() => onFilterChange(filter.key)}
          className={`px-6 py-2 rounded-xl font-medium transition-all duration-300 ${
            activeFilter === filter.key 
              ? filter.key === 'einzelspiel' 
                ? 'bg-green-500 hover:bg-green-600 text-white shadow-medium'
                : filter.key === 'teamspiel'
                ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-medium'
                : 'bg-gradient-to-r from-primary to-primary-glow text-white shadow-medium'
              : 'hover:scale-105'
          }`}
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
};