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
    <Link to={`/spiel/${game.id}`} className="block h-full">
      <div className="game-card p-6 group cursor-pointer h-full flex flex-col">
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
          {game.gameOfTheMonth && (
            <div className="absolute -top-2 -right-2 z-20">
              <div className="relative">
                <div className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-400 text-red-700 px-4 py-2 transform rotate-45 translate-x-4 translate-y-4 shadow-xl border border-yellow-300">
                  <div className="text-xs font-black whitespace-nowrap transform -rotate-45 -translate-x-1 -translate-y-0.5">
                    SPIEL DES<br/>MONATS
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 to-orange-300 opacity-50 blur-sm transform rotate-45 translate-x-4 translate-y-4"></div>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex flex-col flex-grow">
          <h3 className="text-xl font-semibold mb-2 text-foreground">{game.title}</h3>
          <p className="text-muted-foreground mb-4 line-clamp-3 flex-grow">
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
          
          <div className="btn-game w-full text-center py-2 px-4 rounded-lg mt-auto">
            {game.title} spielen
          </div>
        </div>
      </div>
    </Link>
  );
});