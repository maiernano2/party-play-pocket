import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { InteractiveGameContainer } from './InteractiveGameContainer';
import { Users, Trophy, Clock, Star } from 'lucide-react';

interface Player {
  id: string;
  name: string;
  score: number;
}

interface InteractiveMimikMasterProps {
  onExit: () => void;
}

const emotions = [
  "Verliebt sein",
  "Wütend über schlechtes WLAN",
  "Überrascht von einer Spinne",
  "Müde nach einem langen Tag",
  "Aufgeregt vor Weihnachten",
  "Erschrocken vor einem Horrorfilm", 
  "Stolz auf eine gute Note",
  "Verwirrt von Mathe-Aufgaben",
  "Eifersüchtig auf Freunde",
  "Entspannt im Urlaub",
  "Nervös vor einer Prüfung",
  "Hungrig auf Pizza",
  "Kalt im Winter",
  "Heiß im Sommer",
  "Gelangweilt in einem Meeting"
];

export const InteractiveMimikMaster = ({ onExit }: InteractiveMimikMasterProps) => {
  const [gamePhase, setGamePhase] = useState<'setup' | 'playing' | 'guessing' | 'scoring' | 'finished'>('setup');
  const [players, setPlayers] = useState<Player[]>([]);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [currentEmotion, setCurrentEmotion] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [maxRounds, setMaxRounds] = useState(5);
  const [currentRound, setCurrentRound] = useState(1);
  const [guessedCorrectly, setGuessedCorrectly] = useState(false);
  const [winners, setWinners] = useState<string[]>([]);

  const currentPlayer = players[currentPlayerIndex];

  useEffect(() => {
    if (gamePhase === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gamePhase === 'playing') {
      setGamePhase('scoring');
    }
  }, [timeLeft, gamePhase]);

  const addPlayer = () => {
    if (newPlayerName.trim()) {
      const newPlayer: Player = {
        id: Date.now().toString(),
        name: newPlayerName.trim(),
        score: 0
      };
      setPlayers([...players, newPlayer]);
      setNewPlayerName('');
    }
  };

  const removePlayer = (playerId: string) => {
    setPlayers(players.filter(p => p.id !== playerId));
  };

  const startGame = () => {
    if (players.length >= 4) {
      startNewRound();
    }
  };

  const startNewRound = () => {
    setCurrentEmotion(emotions[Math.floor(Math.random() * emotions.length)]);
    setTimeLeft(60);
    setGuessedCorrectly(false);
    setWinners([]);
    setGamePhase('playing');
  };

  const finishRound = () => {
    setGamePhase('scoring');
  };

  const awardPoints = () => {
    const updatedPlayers = players.map(player => {
      if (player.id === currentPlayer.id && guessedCorrectly) {
        return { ...player, score: player.score + 1 };
      } else if (winners.includes(player.id)) {
        return { ...player, score: player.score + 1 };
      }
      return player;
    });
    
    setPlayers(updatedPlayers);
    
    if (currentRound >= maxRounds) {
      setGamePhase('finished');
    } else {
      const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
      setCurrentPlayerIndex(nextPlayerIndex);
      setCurrentRound(currentRound + 1);
      startNewRound();
    }
  };

  const toggleWinner = (playerId: string) => {
    if (winners.includes(playerId)) {
      setWinners(winners.filter(id => id !== playerId));
    } else {
      setWinners([...winners, playerId]);
    }
  };

  const gameWinners = players.length > 0 ? players.filter(p => p.score === Math.max(...players.map(p => p.score))) : [];

  if (gamePhase === 'setup') {
    return (
      <InteractiveGameContainer onExit={onExit} title="Mimik-Master">
        <div className="max-w-md mx-auto space-y-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4 text-center">Spiel einrichten</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white mb-2">Anzahl Runden</label>
                <Input
                  type="number"
                  value={maxRounds}
                  onChange={(e) => setMaxRounds(Number(e.target.value))}
                  min="3"
                  max="10"
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
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
              
              {players.length >= 4 && (
                <Button
                  onClick={startGame}
                  className="w-full mt-4 bg-white text-primary hover:bg-white/90"
                  size="lg"
                >
                  Spiel starten
                </Button>
              )}
              
              {players.length < 4 && (
                <p className="text-white/70 text-center mt-4 text-sm">
                  Mindestens 4 Spieler erforderlich
                </p>
              )}
            </div>
          )}
        </div>
      </InteractiveGameContainer>
    );
  }

  if (gamePhase === 'playing') {
    return (
      <InteractiveGameContainer onExit={onExit} title="Mimik-Master">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="bg-white/20 rounded-full px-4 py-2">
                <span className="text-white font-bold">Runde {currentRound}/{maxRounds}</span>
              </div>
              <div className="bg-white/20 rounded-full px-4 py-2 flex items-center gap-2">
                <Clock className="w-4 h-4 text-white" />
                <span className="text-white font-bold">{timeLeft}s</span>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center">
            <h2 className="text-lg text-white/80 mb-2">Darsteller:</h2>
            <div className="bg-gradient-to-r from-primary to-accent rounded-lg p-4 mb-6">
              <h3 className="text-2xl font-bold text-white">{currentPlayer?.name}</h3>
            </div>
            
            <div className="bg-white/20 rounded-lg p-6 mb-6">
              <h3 className="text-white/80 text-sm mb-2">Stell dar:</h3>
              <p className="text-xl font-bold text-white">{currentEmotion}</p>
            </div>

            <p className="text-white/80 text-sm mb-4">
              Nur pantomimisch - keine Worte!
            </p>
            
            <Button 
              onClick={finishRound}
              className="bg-white text-primary hover:bg-white/90"
              size="lg"
            >
              Zeit beenden
            </Button>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 className="text-lg font-bold text-white mb-4 text-center">Aktuelle Punkte</h3>
            <div className="grid grid-cols-2 gap-3">
              {players.map(player => (
                <div key={player.id} className="flex items-center justify-between bg-white/10 rounded-lg p-3">
                  <span className="text-white font-medium">{player.name}</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-white font-bold">{player.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </InteractiveGameContainer>
    );
  }

  if (gamePhase === 'scoring') {
    return (
      <InteractiveGameContainer onExit={onExit} title="Mimik-Master">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h2 className="text-xl font-bold text-white mb-4 text-center">Punkte vergeben</h2>
            
            <div className="bg-white/20 rounded-lg p-4 mb-6 text-center">
              <p className="text-white/80 text-sm mb-1">Dargestellt wurde:</p>
              <p className="text-lg font-bold text-white">{currentEmotion}</p>
            </div>

            <div className="space-y-4">
              <div className="bg-white/10 rounded-lg p-4">
                <h3 className="text-white font-medium mb-3">Darsteller</h3>
                <div className="flex items-center justify-between">
                  <span className="text-white">{currentPlayer?.name}</span>
                  <Button
                    onClick={() => setGuessedCorrectly(!guessedCorrectly)}
                    variant={guessedCorrectly ? "default" : "secondary"}
                    size="sm"
                  >
                    {guessedCorrectly ? "Punkt erhalten" : "Punkt vergeben"}
                  </Button>
                </div>
              </div>

              <div className="bg-white/10 rounded-lg p-4">
                <h3 className="text-white font-medium mb-3">Rater (wer hat richtig geraten?)</h3>
                <div className="space-y-2">
                  {players.filter(p => p.id !== currentPlayer.id).map(player => (
                    <div key={player.id} className="flex items-center justify-between">
                      <span className="text-white">{player.name}</span>
                      <Button
                        onClick={() => toggleWinner(player.id)}
                        variant={winners.includes(player.id) ? "default" : "secondary"}
                        size="sm"
                      >
                        {winners.includes(player.id) ? "Punkt erhalten" : "Punkt vergeben"}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <Button
              onClick={awardPoints}
              className="w-full mt-6 bg-white text-primary hover:bg-white/90"
              size="lg"
            >
              Weiter zur nächsten Runde
            </Button>
          </div>
        </div>
      </InteractiveGameContainer>
    );
  }

  if (gamePhase === 'finished') {
    return (
      <InteractiveGameContainer onExit={onExit} title="Mimik-Master">
        <div className="max-w-md mx-auto text-center space-y-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-2">🎉 Gewinner!</h2>
            
            <div className="space-y-2 mb-6">
              {gameWinners.map(winner => (
                <p key={winner.id} className="text-xl text-white">{winner.name}</p>
              ))}
              <p className="text-white/80 text-sm">
                {Math.max(...players.map(p => p.score))} Punkte
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white/10 rounded-lg p-4">
                <h3 className="text-white font-medium mb-2">Endstand</h3>
                <div className="space-y-1">
                  {players
                    .sort((a, b) => b.score - a.score)
                    .map((player, index) => (
                      <div key={player.id} className="flex justify-between text-white/80 text-sm">
                        <span>{index + 1}. {player.name}</span>
                        <span>{player.score} Punkte</span>
                      </div>
                    ))}
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