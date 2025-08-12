import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { InteractiveGameContainer } from './InteractiveGameContainer';
import { Heart, Users, Trophy, Clock } from 'lucide-react';

interface Player {
  id: string;
  name: string;
  lives: number;
  isEliminated: boolean;
}

interface InteractiveDerDuemmsteFliegtProps {
  onExit: () => void;
}

const questions = [
  "Wie viele Kontinente gibt es?",
  "In welchem Jahr fiel die Berliner Mauer?",
  "Wie heißt die Hauptstadt von Australien?",
  "Welcher Planet ist der Sonne am nächsten?",
  "Wie viele Herzen hat ein Oktopus?",
  "Wer schrieb Romeo und Julia?",
  "Wie viele Knochen hat ein erwachsener Mensch etwa?",
  "In welchem Land wurde die Pizza erfunden?",
  "Wie heißt der längste Fluss der Welt?",
  "Welches ist das größte Säugetier der Welt?"
];

export const InteractiveDerDuemmsteFliegt = ({ onExit }: InteractiveDerDuemmsteFliegtProps) => {
  const [gamePhase, setGamePhase] = useState<'setup' | 'playing' | 'voting' | 'results' | 'finished'>('setup');
  const [players, setPlayers] = useState<Player[]>([]);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [startingLives, setStartingLives] = useState(3);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [currentRound, setCurrentRound] = useState(1);
  const [answers, setAnswers] = useState<{[playerId: string]: string}>({});
  const [selectedLoser, setSelectedLoser] = useState<string>('');
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    if (gamePhase === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gamePhase === 'playing') {
      setGamePhase('voting');
    }
  }, [timeLeft, gamePhase]);

  const addPlayer = () => {
    if (newPlayerName.trim()) {
      const newPlayer: Player = {
        id: Date.now().toString(),
        name: newPlayerName.trim(),
        lives: startingLives,
        isEliminated: false
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
      setCurrentQuestion(questions[Math.floor(Math.random() * questions.length)]);
      setGamePhase('playing');
      setTimeLeft(60);
    }
  };

  const submitAnswer = (playerId: string, answer: string) => {
    setAnswers({...answers, [playerId]: answer});
  };

  const eliminatePlayer = () => {
    if (selectedLoser) {
      const updatedPlayers = players.map(p => {
        if (p.id === selectedLoser) {
          const newLives = p.lives - 1;
          return { ...p, lives: newLives, isEliminated: newLives === 0 };
        }
        return p;
      });
      
      setPlayers(updatedPlayers);
      setAnswers({});
      setSelectedLoser('');
      
      const remainingPlayers = updatedPlayers.filter(p => !p.isEliminated);
      
      if (remainingPlayers.length === 1) {
        setGamePhase('finished');
      } else {
        setCurrentRound(currentRound + 1);
        setCurrentQuestion(questions[Math.floor(Math.random() * questions.length)]);
        setGamePhase('playing');
        setTimeLeft(60);
      }
    }
  };

  const activePlayers = players.filter(p => !p.isEliminated);
  const winner = activePlayers.length === 1 ? activePlayers[0] : null;

  if (gamePhase === 'setup') {
    return (
      <InteractiveGameContainer onExit={onExit} title="Der Dümmste fliegt">
        <div className="max-w-md mx-auto space-y-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4 text-center">Spiel einrichten</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white mb-2">Leben pro Spieler</label>
                <Input
                  type="number"
                  value={startingLives}
                  onChange={(e) => setStartingLives(Number(e.target.value))}
                  min="1"
                  max="5"
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
                    onKeyPress={(e) => e.key === 'Enter' && addPlayer()}
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
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {Array.from({length: startingLives}).map((_, i) => (
                          <Heart key={i} className="w-4 h-4 text-red-400 fill-current" />
                        ))}
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

  if (gamePhase === 'playing') {
    return (
      <InteractiveGameContainer onExit={onExit} title="Der Dümmste fliegt">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="bg-white/20 rounded-full px-4 py-2">
                <span className="text-white font-bold">Runde {currentRound}</span>
              </div>
              <div className="bg-white/20 rounded-full px-4 py-2 flex items-center gap-2">
                <Clock className="w-4 h-4 text-white" />
                <span className="text-white font-bold">{timeLeft}s</span>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h2 className="text-xl font-bold text-white mb-4 text-center">Frage</h2>
            <p className="text-lg text-white text-center bg-white/10 rounded-lg p-4">
              {currentQuestion}
            </p>
          </div>

          <div className="grid gap-4">
            {activePlayers.map(player => (
              <div key={player.id} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium">{player.name}</span>
                  </div>
                  <div className="flex">
                    {Array.from({length: player.lives}).map((_, i) => (
                      <Heart key={i} className="w-4 h-4 text-red-400 fill-current" />
                    ))}
                  </div>
                </div>
                <Input
                  placeholder="Deine Antwort..."
                  value={answers[player.id] || ''}
                  onChange={(e) => submitAnswer(player.id, e.target.value)}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                />
              </div>
            ))}
          </div>
        </div>
      </InteractiveGameContainer>
    );
  }

  if (gamePhase === 'voting') {
    return (
      <InteractiveGameContainer onExit={onExit} title="Der Dümmste fliegt">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h2 className="text-xl font-bold text-white mb-4 text-center">Antworten bewerten</h2>
            <p className="text-white text-center mb-6">Wählt die dümmste/falscheste Antwort:</p>
            
            <div className="space-y-3">
              {activePlayers.map(player => (
                answers[player.id] && (
                  <div key={player.id} className="bg-white/10 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-white">{player.name}</div>
                        <div className="text-white/80">{answers[player.id]}</div>
                      </div>
                      <Button
                        onClick={() => setSelectedLoser(player.id)}
                        variant={selectedLoser === player.id ? "default" : "secondary"}
                        size="sm"
                      >
                        {selectedLoser === player.id ? "Ausgewählt" : "Auswählen"}
                      </Button>
                    </div>
                  </div>
                )
              ))}
            </div>
            
            {selectedLoser && (
              <Button
                onClick={eliminatePlayer}
                className="w-full mt-6 bg-red-500 hover:bg-red-600 text-white"
                size="lg"
              >
                Leben abziehen
              </Button>
            )}
          </div>
        </div>
      </InteractiveGameContainer>
    );
  }

  if (gamePhase === 'finished') {
    return (
      <InteractiveGameContainer onExit={onExit} title="Der Dümmste fliegt">
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
                  <div>Gespielten Runden: {currentRound}</div>
                  <div>Überlebende Leben: {winner?.lives}</div>
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