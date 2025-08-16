import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { InteractiveGameContainer } from './InteractiveGameContainer';
import { GameCountdown } from '../GameCountdown';
import { Users, Trophy, Clock, Zap, Heart } from 'lucide-react';

interface Player {
  id: string;
  name: string;
  lives: number;
}

interface InteractiveSchnellantwortProps {
  onExit: () => void;
}

const categories = [
  "Tiere mit 4 Buchstaben",
  "Länder in Europa",
  "Dinge, die rot sind",
  "Berufe mit A",
  "Früchte",
  "Automarken",
  "Städte in Deutschland",
  "Dinge in der Küche",
  "Sportarten",
  "Farben",
  "Kleidungsstücke",
  "Gegenstände im Badezimmer",
  "Filmgenres",
  "Musikinstrumente",
  "Schulfächer"
];

export const InteractiveSchnellantwort = ({ onExit }: InteractiveSchnellantwortProps) => {
  const [gamePhase, setGamePhase] = useState<'setup' | 'category-countdown' | 'playing' | 'waiting' | 'finished'>('setup');
  const [players, setPlayers] = useState<Player[]>([]);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [currentCategory, setCurrentCategory] = useState('');
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [gameTime, setGameTime] = useState(10);
  const [requiredAnswers, setRequiredAnswers] = useState(3);
  const [startLives, setStartLives] = useState(3);
  const [currentAnswers, setCurrentAnswers] = useState(0);
  const [usedAnswers, setUsedAnswers] = useState<string[]>([]);
  const [roundNumber, setRoundNumber] = useState(1);

  const activePlayers = players.filter(p => p.lives > 0);
  const currentPlayer = activePlayers[currentPlayerIndex];
  const winner = activePlayers.length === 1 ? activePlayers[0] : null;

  useEffect(() => {
    if (gamePhase === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gamePhase === 'playing') {
      // Zeit abgelaufen - Show decision buttons
      setGamePhase('waiting');
    }
  }, [timeLeft, gamePhase]);

  const addPlayer = () => {
    if (newPlayerName.trim()) {
      const newPlayer: Player = {
        id: Date.now().toString(),
        name: newPlayerName.trim(),
        lives: startLives
      };
      setPlayers([...players, newPlayer]);
      setNewPlayerName('');
    }
  };

  const removePlayer = (playerId: string) => {
    setPlayers(players.filter(p => p.id !== playerId));
  };

  const startGame = () => {
    if (players.length >= 3) {
      setGamePhase('category-countdown');
    }
  };

  const onCountdownComplete = () => {
    startNewRound();
  };

  const startNewRound = () => {
    setCurrentCategory(`Nenne ${requiredAnswers} Begriffe: ${categories[Math.floor(Math.random() * categories.length)]}`);
    setUsedAnswers([]);
    setCurrentAnswers(0);
    setCurrentPlayerIndex(0);
    setGamePhase('waiting');
  };

  const startPlayerTurn = () => {
    setTimeLeft(gameTime);
    setCurrentAnswers(0);
    setGamePhase('playing');
  };

  const nextPlayer = () => {
    const nextIndex = (currentPlayerIndex + 1) % activePlayers.length;
    setCurrentPlayerIndex(nextIndex);
    setGamePhase('waiting');
  };

  const eliminateCurrentPlayer = () => {
    const updatedPlayers = players.map(p => 
      p.id === currentPlayer.id ? { ...p, lives: p.lives - 1 } : p
    );
    setPlayers(updatedPlayers);
    
    const remainingActive = updatedPlayers.filter(p => p.lives > 0);
    
    if (remainingActive.length === 1) {
      setGamePhase('finished');
    } else {
      nextPlayer();
    }
  };

  const playerSucceeded = () => {
    nextPlayer();
  };

  const submitAnswer = (answer: string) => {
    const normalizedAnswer = answer.toLowerCase().trim();
    
    if (usedAnswers.includes(normalizedAnswer)) {
      // Antwort bereits verwendet
      eliminateCurrentPlayer();
    } else {
      setUsedAnswers([...usedAnswers, normalizedAnswer]);
      nextPlayer();
    }
  };

  if (gamePhase === 'setup') {
    return (
      <InteractiveGameContainer onExit={onExit} title="Schnellantwort">
        <div className="max-w-md mx-auto space-y-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4 text-center">Spiel einrichten</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white mb-2">Zeit pro Runde (Sekunden)</label>
                <Input
                  type="number"
                  min="5"
                  max="30"
                  value={gameTime}
                  onChange={(e) => setGameTime(parseInt(e.target.value) || 10)}
                  className="bg-white/20 border-white/30 text-white"
                />
              </div>
              
              <div>
                <label className="block text-white mb-2">Anzahl zu nennender Begriffe</label>
                <Input
                  type="number"
                  min="1"
                  max="10"
                  value={requiredAnswers}
                  onChange={(e) => setRequiredAnswers(parseInt(e.target.value) || 3)}
                  className="bg-white/20 border-white/30 text-white"
                />
              </div>
              
              <div>
                <label className="block text-white mb-2">Leben pro Spieler</label>
                <Input
                  type="number"
                  min="1"
                  max="10"
                  value={startLives}
                  onChange={(e) => setStartLives(parseInt(e.target.value) || 3)}
                  className="bg-white/20 border-white/30 text-white"
                />
              </div>
              
              <div>
                <label className="block text-white mb-2">Spieler hinzufügen</label>
                <div className="flex gap-2">
                  <Input
                    value={newPlayerName}
                    onChange={(e) => setNewPlayerName(e.target.value)}
                    placeholder="Spielername"
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addPlayer();
                        setTimeout(() => {
                          const nextInput = document.querySelector('input[placeholder="Spielername"]') as HTMLInputElement;
                          nextInput?.focus();
                        }, 50);
                      }
                    }}
                  />
                  <Button onClick={addPlayer} variant="secondary">Hinzufügen</Button>
                </div>
              </div>
            </div>
          </div>

          {players.length > 0 && (
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">Spieler ({players.length})</h3>
              <div className="space-y-2">
                {players.map(player => (
                  <div key={player.id} className="flex items-center justify-between bg-white/10 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-white" />
                      <span className="text-white font-medium">{player.name}</span>
                      <div className="flex gap-1">
                        {Array.from({ length: startLives }).map((_, i) => (
                          <Heart key={i} className="w-4 h-4 text-red-400 fill-current" />
                        ))}
                      </div>
                    </div>
                    <Button
                      onClick={() => removePlayer(player.id)}
                      variant="ghost"
                      size="sm"
                      className="text-white/70 hover:text-white hover:bg-white/20"
                    >
                      ✕
                    </Button>
                  </div>
                ))}
              </div>
              
              {players.length >= 3 && (
                <Button
                  onClick={startGame}
                  className="w-full mt-4 bg-white text-primary hover:bg-white/90"
                  size="lg"
                >
                  Spiel starten
                </Button>
              )}
              
              {players.length < 3 && (
                <p className="text-white/70 text-center mt-4 text-sm">
                  Mindestens 3 Spieler erforderlich
                </p>
              )}
            </div>
          )}
        </div>
      </InteractiveGameContainer>
    );
  }

  if (gamePhase === 'category-countdown') {
    return (
      <GameCountdown 
        onCountdownComplete={onCountdownComplete}
        onSkip={onCountdownComplete}
      />
    );
  }

  if (gamePhase === 'waiting') {
    return (
      <InteractiveGameContainer onExit={onExit} title="Schnellantwort">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center">
            <div className="bg-white/20 rounded-full px-4 py-2 inline-block mb-4">
              <span className="text-white font-bold">Runde {roundNumber}</span>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center">
            <h2 className="text-xl font-bold text-white mb-4">Kategorie</h2>
            <div className="bg-gradient-to-r from-primary to-accent rounded-lg p-6 mb-6">
              <p className="text-2xl font-bold text-white">{currentCategory}</p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium text-white mb-2">Aktuelle Spieler:</h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {activePlayers.map((player, index) => (
                  <div 
                    key={player.id} 
                    className={`px-3 py-1 rounded-full flex items-center gap-2 ${
                      index === currentPlayerIndex 
                        ? 'bg-white text-primary font-bold' 
                        : 'bg-white/20 text-white'
                    }`}
                  >
                    <span>{player.name}</span>
                    <div className="flex gap-1">
                      {Array.from({ length: player.lives }).map((_, i) => (
                        <Heart key={i} className="w-3 h-3 text-red-400 fill-current" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <div className="bg-white/10 rounded-lg p-4">
                <h3 className="text-lg font-medium text-white mb-2">Fortschritt:</h3>
                <div className="text-white/80 text-sm">
                  <div>Benötigte Antworten: {requiredAnswers}</div>
                  <div>Zeit: {gameTime} Sekunden</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center">
            <Zap className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">
              {currentPlayer?.name} ist dran!
            </h3>
            <p className="text-white/80 mb-6">Bereit für die {gameTime}-Sekunden-Herausforderung?</p>
            
            {timeLeft === 0 && (
              <div className="bg-red-500/20 border border-red-500/40 rounded-lg p-4 mb-4">
                <h4 className="text-white font-bold mb-2">Zeit abgelaufen!</h4>
                <p className="text-white/80 text-sm mb-4">
                  Hat {currentPlayer?.name} {requiredAnswers} gültige Begriffe genannt?
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    onClick={playerSucceeded}
                    className="bg-green-500 hover:bg-green-600 text-white"
                    size="lg"
                  >
                    ✓ Geschafft
                  </Button>
                  <Button 
                    onClick={eliminateCurrentPlayer}
                    className="bg-red-500 hover:bg-red-600 text-white"
                    size="lg"
                  >
                    ✗ Nicht geschafft
                  </Button>
                </div>
              </div>
            )}
            {timeLeft > 0 && (
              <Button 
                onClick={startPlayerTurn}
                className="bg-white text-primary hover:bg-white/90 font-bold"
                size="lg"
              >
                Timer starten
              </Button>
            )}
          </div>
        </div>
      </InteractiveGameContainer>
    );
  }

  if (gamePhase === 'playing') {
    return (
      <InteractiveGameContainer onExit={onExit} title="Schnellantwort">
        <div className="max-w-md mx-auto space-y-6">
          <div className="text-center">
            <div className={`text-6xl font-bold mb-4 ${timeLeft <= 1 ? 'text-red-400 animate-pulse' : 'text-white'}`}>
              {timeLeft}
            </div>
            <Clock className="w-8 h-8 text-white mx-auto" />
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center">
            <h2 className="text-lg text-white/80 mb-2">Kategorie:</h2>
            <p className="text-xl font-bold text-white mb-4">{currentCategory}</p>
            
            <div className="bg-gradient-to-r from-primary to-accent rounded-lg p-4 mb-4">
              <h3 className="text-2xl font-bold text-white">{currentPlayer?.name}</h3>
              <p className="text-white/90">ist dran!</p>
            </div>

            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-white font-bold text-lg">
                Fortschritt: {currentAnswers}/{requiredAnswers} Begriffe
              </div>
              <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${(currentAnswers / requiredAnswers) * 100}%` }}
                ></div>
              </div>
            </div>

            <p className="text-white/80 text-sm">
              Schnell {requiredAnswers} Begriffe nennen! Zeit läuft!
            </p>
          </div>
        </div>
      </InteractiveGameContainer>
    );
  }

  if (gamePhase === 'finished') {
    return (
      <InteractiveGameContainer onExit={onExit} title="Schnellantwort">
        <div className="max-w-md mx-auto text-center space-y-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-2">🎉 Gewinner!</h2>
            {winner && (
              <p className="text-xl text-white mb-6">{winner.name}</p>
            )}
            
            <div className="space-y-4">
              <div className="bg-white/10 rounded-lg p-4">
                <h3 className="text-white font-medium mb-2">Spiel-Statistiken</h3>
                <div className="text-white/80 text-sm space-y-1">
                  <div>Gespielten Runden: {roundNumber}</div>
                  <div>Verwendete Antworten: {usedAnswers.length}</div>
                  <div>Kategorie: {currentCategory}</div>
                </div>
              </div>
              
              <Button onClick={onExit} className="w-full bg-white text-primary hover:bg-white/90" size="lg">
                Zurück zu den Regeln
              </Button>
            </div>
          </div>
        </div>
      </InteractiveGameContainer>
    );
  }

  return null;
};