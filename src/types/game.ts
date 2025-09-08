export interface Game {
  id: string;
  title: string;
  description: string;
  category: 'einzelspiel' | 'teamspiel';
  playerCount: string;
  duration: string;
  image: string;
  rules: string[];
  gameOfTheMonth?: boolean;
  interactive?: {
    hasTimer?: boolean;
    hasTeams?: boolean;
    hasScoring?: boolean;
    roundBased?: boolean;
  };
}

export interface Team {
  id: string;
  name: string;
  color: 'blue' | 'red' | 'green' | 'purple';
  score: number;
  lives?: number;
}

export interface GameSession {
  gameId: string;
  teams: Team[];
  currentRound: number;
  maxRounds?: number;
  timePerRound?: number;
  status: 'setup' | 'playing' | 'finished';
}