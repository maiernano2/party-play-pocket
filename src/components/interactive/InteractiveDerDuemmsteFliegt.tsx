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

const questionsWithAnswers = [
  { question: "Wie viele Kontinente gibt es auf der Erde?", answer: "7 Kontinente" },
  { question: "In welchem Jahr wurde die Berliner Mauer gebaut?", answer: "1961" },
  { question: "Wie heißt die Hauptstadt von Australien?", answer: "Canberra" },
  { question: "Welcher Planet ist der Sonne am nächsten?", answer: "Merkur" },
  { question: "Wie viele Herzen hat ein Oktopus?", answer: "3 Herzen" },
  { question: "In welchem Jahr wurde das Internet erfunden?", answer: "1969 (ARPANET)" },
  { question: "Wie heißt der größte Ozean der Welt?", answer: "Pazifischer Ozean" },
  { question: "Welches ist das kleinste Land der Welt?", answer: "Vatikanstadt" },
  { question: "Wie viele Beine hat eine Spinne?", answer: "8 Beine" },
  { question: "In welchem Jahr fiel die Berliner Mauer?", answer: "1989" },
  { question: "Wie heißt der höchste Berg der Welt?", answer: "Mount Everest" },
  { question: "Welcher ist der längste Fluss der Welt?", answer: "Nil" },
  { question: "Wie viele Planeten gibt es in unserem Sonnensystem?", answer: "8 Planeten" },
  { question: "In welchem Jahr landeten die ersten Menschen auf dem Mond?", answer: "1969" },
  { question: "Wie heißt die Währung von Japan?", answer: "Yen" },
  { question: "Wie viele Zähne hat ein erwachsener Mensch normalerweise?", answer: "32 Zähne" },
  { question: "Welches ist das größte Säugetier der Welt?", answer: "Blauwal" },
  { question: "Wie heißt die Hauptstadt von Kanada?", answer: "Ottawa" },
  { question: "Welcher ist der tiefste Punkt der Erde?", answer: "Marianengraben" },
  { question: "In welchem Jahr wurde die USA gegründet?", answer: "1776" }
];

export const InteractiveDerDuemmsteFliegt = ({ onExit }: InteractiveDerDuemmsteFliegtProps) => {
  const [gamePhase, setGamePhase] = useState<'setup' | 'playing' | 'question' | 'voting' | 'finished'>('setup');
  const [players, setPlayers] = useState<Player[]>([]);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<{question: string, answer: string} | null>(null);
  const [maxRounds, setMaxRounds] = useState(5);
  const [questionsPerRound, setQuestionsPerRound] = useState(4);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [startLives, setStartLives] = useState(3);
  const [currentRound, setCurrentRound] = useState(1);
  const [votingFor, setVotingFor] = useState<string[]>([]);
  const [usedQuestions, setUsedQuestions] = useState<number[]>([]);
  const [availableQuestions, setAvailableQuestions] = useState<number[]>([]);
  const [askedCounts, setAskedCounts] = useState<Record<string, number>>({});

  const activePlayers = players.filter(p => p.lives > 0);
  const currentPlayer = activePlayers[currentPlayerIndex];
  const winner = activePlayers.length === 1 ? activePlayers[0] : null;
  const moderator = players[0]; // First player is always moderator


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
    setCurrentPlayerIndex(1); // Start with first non-moderator player
    setCurrentQuestionIndex(0);
    setVotingFor([]);
    // Reset available questions at start of each round
    setAvailableQuestions(Array.from({length: questionsWithAnswers.length}, (_, i) => i));
    // Initialize asked counts for non-moderator active players
    const nonModeratorActive = players.filter(p => p.lives > 0 && p.id !== moderator?.id);
    const initialCounts: Record<string, number> = {};
    nonModeratorActive.forEach(p => { initialCounts[p.id] = 0; });
    setAskedCounts(initialCounts);
    setGamePhase('question');
    getNewQuestion();
  };

  const getNewQuestion = () => {
    // Get a random question from available questions
    if (availableQuestions.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableQuestions.length);
      const questionIndex = availableQuestions[randomIndex];
      setCurrentQuestion(questionsWithAnswers[questionIndex]);
      // Remove this question from available questions
      setAvailableQuestions(prev => prev.filter((_, i) => i !== randomIndex));
    } else {
      // If no questions left, reset the pool
      const newAvailable = Array.from({length: questionsWithAnswers.length}, (_, i) => i);
      setAvailableQuestions(newAvailable);
      const questionIndex = newAvailable[0];
      setCurrentQuestion(questionsWithAnswers[questionIndex]);
      setAvailableQuestions(prev => prev.slice(1));
    }
  };

  const nextPlayer = () => {
    const answeringPlayer = activePlayers[currentPlayerIndex];
    if (!answeringPlayer || answeringPlayer.id === moderator?.id) {
      // Safety: move to first non-moderator
      setCurrentPlayerIndex(1);
      getNewQuestion();
      return;
    }

    // Increment asked count for current answering player
    const newCounts: Record<string, number> = {
      ...askedCounts,
      [answeringPlayer.id]: (askedCounts[answeringPlayer.id] || 0) + 1,
    };
    setAskedCounts(newCounts);

    // Check if all non-moderator active players reached their quota
    const allDone = activePlayers
      .filter(p => p.id !== moderator?.id)
      .every(p => (newCounts[p.id] || 0) >= questionsPerRound);

    if (allDone) {
      setGamePhase('voting');
      return;
    }

    // Find next eligible player (not moderator, not finished quota)
    let idx = currentPlayerIndex;
    const countActive = activePlayers.length;
    let attempts = 0;
    do {
      idx = (idx + 1) % countActive;
      attempts++;
    } while (
      (activePlayers[idx].id === moderator?.id || (newCounts[activePlayers[idx].id] || 0) >= questionsPerRound) &&
      attempts <= countActive + 1
    );

    setCurrentPlayerIndex(idx);
    getNewQuestion(); // Always get a new unique question for the next player
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
              // Keep scrolled position after voting
              setTimeout(() => {
                startNewRound();
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
              }, 100);
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
                <label className="block text-white mb-2">Fragen pro Person pro Runde</label>
                <Input
                  type="number"
                  min="1"
                  max="10"
                  value={questionsPerRound}
                  onChange={(e) => setQuestionsPerRound(parseInt(e.target.value) || 1)}
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
              
              <div className="mb-4 p-3 bg-primary/10 rounded-lg border border-primary">
                <div className="text-sm font-medium text-white text-center">
                  🎯 Der erste Spieler ist der Moderator und behält das Handy
                </div>
              </div>
              
              
              <div>
                <label className="block text-white mb-2">Spieler hinzufügen</label>
                <div className="flex gap-2">
                  <Input
                    value={newPlayerName}
                    onChange={(e) => setNewPlayerName(e.target.value)}
                    placeholder={players.length === 0 ? "Moderator-Name eingeben..." : "Spielername eingeben..."}
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addPlayer();
                        // Keep focus on input after adding player
                        setTimeout(() => {
                          (e.target as HTMLInputElement).focus();
                        }, 50);
                      }
                    }}
                  />
                  <Button 
                    onClick={() => {
                      addPlayer();
                      // Keep focus on input after button click
                      setTimeout(() => {
                        const input = document.querySelector('input[placeholder*="eingeben"]') as HTMLInputElement;
                        input?.focus();
                      }, 50);
                    }} 
                    variant="secondary"
                  >
                    Hinzufügen
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {players.length > 0 && (
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">Spieler ({players.length})</h3>
              <div className="space-y-2">
                {players.map((player, index) => (
                  <div key={player.id} className={`flex items-center justify-between rounded-lg p-3 ${
                    index === 0 ? 'bg-primary/20 border-2 border-primary' : 'bg-white/10'
                  }`}>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-white" />
                      <span className="text-white font-medium">{player.name}</span>
                      {index === 0 && <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">MODERATOR</span>}
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
    const moderatorPlayer = players[0]; // First player is always moderator
    const answeringPlayer = activePlayers[currentPlayerIndex];
    
    return (
      <InteractiveGameContainer onExit={onExit} title="Der Dümmste fliegt">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center">
            <div className="bg-white/20 rounded-full px-4 py-2 inline-block mb-4">
              <span className="text-white font-bold">Runde {currentRound} von {maxRounds}</span>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center">
            <div className="bg-blue-500/30 rounded-lg p-6 mb-6 border-2 border-blue-400">
              <h2 className="text-2xl text-white/90 mb-3 text-center">🎯 MODERATOR</h2>
              <h3 className="text-3xl font-bold text-white text-center mb-4">{moderatorPlayer?.name}</h3>
              <div className="bg-white/20 rounded-lg p-4 text-center">
                <p className="text-white text-lg font-semibold">Stelle diese Frage an:</p>
                <p className="text-2xl font-bold text-yellow-300 mt-2">{answeringPlayer?.name}</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-primary to-accent rounded-lg p-8 mb-6 border-2 border-primary">
              <h2 className="text-xl text-white/90 mb-4 text-center">📝 FRAGE FÜR {answeringPlayer?.name.toUpperCase()}:</h2>
              <p className="text-2xl font-bold text-white text-center leading-relaxed mb-4">{currentQuestion?.question}</p>
              <div className="bg-white/20 rounded-lg p-4 border-2 border-white/30">
                <p className="text-lg text-green-300 font-semibold text-center">
                  💡 Antwort: {currentQuestion?.answer}
                </p>
              </div>
            </div>
            
            <div className="bg-orange-500/30 rounded-lg p-6 mb-6 border-2 border-orange-400">
              <h3 className="text-xl font-bold text-white mb-3 text-center">👤 ANTWORTENDER</h3>
              <div className="flex items-center justify-center gap-3">
                <span className="text-3xl font-bold text-white">{answeringPlayer?.name}</span>
                <div className="flex gap-1">
                  {Array.from({ length: answeringPlayer?.lives || 0 }).map((_, i) => (
                    <Heart key={i} className="w-6 h-6 text-red-400 fill-current" />
                  ))}
                </div>
              </div>
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
              <p className="text-lg text-white">Frage war: {currentQuestion?.question}</p>
            </div>
            
            <p className="text-white/80 mb-6">
              Wählt gemeinsam, wer die dümmste/falscheste Antwort gegeben hat und ein Leben verlieren soll:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              {activePlayers.filter(player => player.id !== moderator?.id).map((player) => (
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