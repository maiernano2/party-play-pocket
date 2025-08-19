import { Game } from '@/types/game';
import { Button } from './ui/button';
import { Users, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { memo } from 'react';

interface GameCardProps {
  game: Game;
}

export const GameCard = memo(({ game }: GameCardProps) => {
  const categoryLabel = game.category === 'einzelspiel' ? 'Einzelspiel' : 'Teamspiel';
  const categoryColor = game.category === 'einzelspiel' ? 'bg-accent' : 'bg-team-blue';

  return (
    <Link to={`/spiel/${game.id}`} className="block">
      <div className="game-card p-6 group cursor-pointer">
        <div className="relative mb-4 overflow-hidden rounded-xl">
          <img 
            src={game.image} 
            alt={`${game.title} - Kostenloses mobiles Partyspiel für ${game.playerCount} ohne Material`}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
          <div className={`absolute top-3 left-3 ${categoryColor} text-white px-3 py-1 rounded-full text-sm font-medium`}>
            {categoryLabel}
          </div>
        </div>
        
        <h3 className="text-xl font-semibold mb-2 text-foreground">{game.title}</h3>
        <p className="text-muted-foreground mb-4 line-clamp-2">
          {game.description} Spannende Unterhaltung für die ganze Gruppe.
        </p>
        
        <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{game.playerCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{game.duration}</span>
          </div>
        </div>
        
        <div className="btn-game w-full text-center py-2 px-4 rounded-lg">
          {game.title} spielen
        </div>
      </div>
    </Link>
  );
});