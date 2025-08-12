import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { InteractiveGameContainer } from './InteractiveGameContainer';
import { Users, Trophy, Clock, Heart, AlertCircle } from 'lucide-react';

interface Player {
  id: string;
  name: string;
  lives: number;
}

interface InteractiveDerDuemmsteFliegtProps {
  onExit: () => void;
}

const questions = [
  "Wie viele Kontinente gibt es auf der Erde?",
  "In welchem Jahr wurde die Berliner Mauer gebaut?",
  "Wie heißt die Hauptstadt von Australien?",
  "Welcher Planet ist der Sonne am nächsten?",
  "Wie viele Herzen hat ein Oktopus?",
  "In welchem Jahr wurde das Internet erfunden?",
  "Wie heißt der größte Ozean der Welt?",
  "Welches ist das kleinste Land der Welt?",
  "Wie viele Beine hat eine Spinne?",
  "In welchem Jahr fiel die Berliner Mauer?",
  "Wie heißt der höchste Berg der Welt?",
  "Welcher ist der längste Fluss der Welt?",
  "Wie viele Planeten gibt es in unserem Sonnensystem?",
  "In welchem Jahr landeten die ersten Menschen auf dem Mond?",
  "Wie heißt die Währung von Japan?"
];

export const InteractiveDerDuemmsteFliegt = ({ onExit }: InteractiveDerDuemmsteFliegtProps) => {
  const [gamePhase, setGamePhase] = useState<'setup' | 'playing' | 'question' | 'voting' | 'finished'>('setup');
  const [players, setPlayers] = useState<Player[]>([]);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [maxRounds, setMaxRounds] = useState(5);
  const [timePerRound, setTimePerRound] = useState(30);
  const [timeLeft, setTimeLeft] = useState(30);
  const [startLives, setStartLives] = useState(3);
  const [currentRound, setCurrentRound] = useState(1);
  const [votingFor, setVotingFor] = useState<string[]>([]);

  const activePlayers = players.filter(p => p.lives > 0);
  const currentPlayer = activePlayers[currentPlayerIndex];
  const winner = activePlayers.length === 1 ? activePlayers[0] : null;

  useEffect(() => {
    if (gamePhase === 'question' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gamePhase === 'question') {
      setGamePhase('voting');
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
      setGamePhase('playing');
      startNewRound();
    }
  };

  const startNewRound = () => {
    setCurrentQuestion(questions[Math.floor(Math.random() * questions.length)]);
    setCurrentPlayerIndex(0);
    setVotingFor([]);
    setGamePhase('question');
    setTimeLeft(timePerRound);
  };

  const nextPlayer = () => {
    const nextIndex = (currentPlayerIndex + 1) % activePlayers.length;
    setCurrentPlayerIndex(nextIndex);
  };

  const eliminatePlayer = (playerId: string) => {
    const updatedPlayers = players.map(p => 
      p.id === playerId ? { ...p, lives: p.lives - 1 } : p
    );
    setPlayers(updatedPlayers);
    
    const remainingActive = updatedPlayers.filter(p => p.lives > 0);
    
    if (remainingActive.length === 1) {
      setGamePhase('finished');
    } else if (currentRound >= maxRounds) {
      setGamePhase('finished');
    } else {
      setCurrentRound(currentRound + 1);
      startNewRound();
    }
  };

  if (gamePhase === 'setup') {
    return (
      <InteractiveGameContainer onExit={onExit} title="Der Dümmste fliegt">
        <div className="max-w-md mx-auto space-y-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4 text-center">Spiel einrichten</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white mb-2">Anzahl Leben pro Spieler</label>
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
                <label className="block text-white mb-2">Zeit pro Runde (Sekunden)</label>
                <Input
                  type="number"
                  min="10"
                  max="120"
                  value={timePerRound}
                  onChange={(e) => setTimePerRound(parseInt(e.target.value) || 30)}
                  className="bg-white/20 border-white/30 text-white"
                />
              </div>
              
              <div>
                <label className="block text-white mb-2">Maximale Runden</label>
                <Input
                  type="number"
                  min="1"
                  max="20"
                  value={maxRounds}
                  onChange={(e) => setMaxRounds(parseInt(e.target.value) || 5)}
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

  if (gamePhase === 'question') {
    const moderatorIndex = (currentPlayerIndex + 1) % activePlayers.length;
    const moderatorPlayer = activePlayers[moderatorIndex];
    const answeringPlayer = activePlayers[currentPlayerIndex];
    
    return (
      <InteractiveGameContainer onExit={onExit} title="Der Dümmste fliegt">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center">
            <div className="bg-white/20 rounded-full px-4 py-2 inline-block mb-4">
              <span className="text-white font-bold">Runde {currentRound} von {maxRounds}</span>
            </div>
            <div className={`text-6xl font-bold mb-4 ${timeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-white'}`}>
              {timeLeft}
            </div>
            <Clock className="w-8 h-8 text-white mx-auto" />
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center">
            <div className="bg-blue-500/30 rounded-lg p-4 mb-6">
              <h2 className="text-lg text-white/90 mb-2">Moderator:</h2>
              <h3 className="text-xl font-bold text-white">{moderatorPlayer?.name}</h3>
              <p className="text-white/80 text-sm mt-2">Du stellst die Frage an {answeringPlayer?.name}</p>
            </div>
            
            <div className="bg-gradient-to-r from-primary to-accent rounded-lg p-6 mb-6">
              <h2 className="text-lg text-white/90 mb-2">Frage:</h2>
              <p className="text-xl font-bold text-white">{currentQuestion}</p>
            </div>
            
            <div className="bg-orange-500/30 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-bold text-white mb-2">Antwortender:</h3>
              <div className="flex items-center justify-center gap-2">
                <span className="text-xl font-bold text-white">{answeringPlayer?.name}</span>
                <div className="flex gap-1">
                  {Array.from({ length: answeringPlayer?.lives || 0 }).map((_, i) => (
                    <Heart key={i} className="w-5 h-5 text-red-400 fill-current" />
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-yellow-500/20 border border-yellow-500/40 rounded-lg p-4">
              <AlertCircle className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
              <p className="text-white text-sm">
                {answeringPlayer?.name} antwortet mündlich. Bei Zeitablauf geht es zur Abstimmung!
              </p>
            </div>
            
            <Button 
              onClick={nextPlayer}
              className="bg-white text-primary hover:bg-white/90 mt-4"
              size="lg"
            >
              Nächster Spieler
            </Button>
          </div>
        </div>
      </InteractiveGameContainer>
    );
  }

  if (gamePhase === 'voting') {
    return (
      <InteractiveGameContainer onExit={onExit} title="Der Dümmste fliegt">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Zeit ist um!</h2>
            <div className="bg-gradient-to-r from-primary to-accent rounded-lg p-4 mb-6">
              <p className="text-lg text-white">Frage war: {currentQuestion}</p>
            </div>
            
            <p className="text-white/80 mb-6">
              Wählt gemeinsam, wer die dümmste/falscheste Antwort gegeben hat und ein Leben verlieren soll:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              {activePlayers.map((player) => (
                <Button
                  key={player.id}
                  onClick={() => eliminatePlayer(player.id)}
                  className="bg-red-500/80 hover:bg-red-500 text-white p-4 rounded-lg"
                  size="lg"
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-medium">{player.name}</span>
                    <div className="flex gap-1">
                      {Array.from({ length: player.lives }).map((_, i) => (
                        <Heart key={i} className="w-4 h-4 text-red-200 fill-current" />
                      ))}
                    </div>
                  </div>
                </Button>
              ))}
            </div>
            
            <p className="text-white/60 text-xs">
              Klickt auf den Spieler, der ein Leben verlieren soll
            </p>
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
            <h2 className="text-3xl font-bold text-white mb-2">🎉 Spiel beendet!</h2>
            {winner && (
              <div>
                <p className="text-xl text-white mb-4">Gewinner: {winner.name}</p>
                <div className="flex gap-1 justify-center mb-6">
                  {Array.from({ length: winner.lives }).map((_, i) => (
                    <Heart key={i} className="w-6 h-6 text-red-400 fill-current" />
                  ))}
                </div>
              </div>
            )}
            
            <div className="space-y-4">
              <div className="bg-white/10 rounded-lg p-4">
                <h3 className="text-white font-medium mb-2">Spiel-Statistiken</h3>
                <div className="text-white/80 text-sm space-y-1">
                  <div>Gespielte Runden: {currentRound}</div>
                  <div>Teilnehmer: {players.length}</div>
                  <div>Überlebende: {activePlayers.length}</div>
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