import { useState, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { InteractiveGameContainer } from './InteractiveGameContainer';
import { getRandomWord } from '@/data/imposter-words';
import { Eye, EyeOff, Users, Trophy, Target } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Player {
  id: string;
  name: string;
  score: number;
  isImposter: boolean;
  hasSeenRole: boolean;
}

interface GameRound {
  roundNumber: number;
  word: string;
  imposter: string;
  eliminated?: string;
  imposterGuess?: string;
  winner: 'crew' | 'imposter' | null;
}

type GamePhase = 'setup' | 'roleReveal' | 'playing' | 'voting' | 'imposterClaim' | 'roundEnd' | 'gameEnd';

export const InteractiveImposterGame = ({ onExit }: { onExit: () => void }) => {
  const { toast } = useToast();
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentRound, setCurrentRound] = useState(1);
  const [maxRounds, setMaxRounds] = useState(5);
  const [gamePhase, setGamePhase] = useState<GamePhase>('setup');
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState('');
  const [imposterIndex, setImposterIndex] = useState(-1);
  const [usedWords] = useState(new Set<string>());
  const [rounds, setRounds] = useState<GameRound[]>([]);
  const [votes, setVotes] = useState<Record<string, string>>({});
  const [imposterGuess, setImposterGuess] = useState('');
  const [startingPlayerIndex, setStartingPlayerIndex] = useState(0);
  const [eliminatedPlayer, setEliminatedPlayer] = useState<string | null>(null);
  const [newPlayerName, setNewPlayerName] = useState('');

  const currentPlayer = useMemo(() => 
    players[currentPlayerIndex] || null, [players, currentPlayerIndex]
  );

  const addPlayer = useCallback(() => {
    if (newPlayerName.trim() && players.length < 12) {
      setPlayers(prev => [...prev, {
        id: `player-${Date.now()}`,
        name: newPlayerName.trim(),
        score: 0,
        isImposter: false,
        hasSeenRole: false
      }]);
      setNewPlayerName('');
    }
  }, [newPlayerName, players.length]);

  const removePlayer = useCallback((playerId: string) => {
    setPlayers(prev => prev.filter(p => p.id !== playerId));
  }, []);

  const startGame = useCallback(() => {
    if (players.length < 3) {
      toast({
        title: "Zu wenige Spieler",
        description: "Mindestens 3 Spieler benötigt",
        variant: "destructive"
      });
      return;
    }
    startNewRound();
  }, [players.length]);

  const startNewRound = useCallback(() => {
    const word = getRandomWord(usedWords);
    if (!word) {
      toast({
        title: "Keine Wörter mehr",
        description: "Alle Wörter wurden verwendet",
        variant: "destructive"
      });
      return;
    }

    usedWords.add(word);
    const randomImposterIndex = Math.floor(Math.random() * players.length);
    const randomStartingIndex = Math.floor(Math.random() * players.length);
    
    setCurrentWord(word);
    setImposterIndex(randomImposterIndex);
    setStartingPlayerIndex(randomStartingIndex);
    setCurrentPlayerIndex(0);
    setVotes({});
    setImposterGuess('');
    setEliminatedPlayer(null);
    
    setPlayers(prev => prev.map((player, index) => ({
      ...player,
      isImposter: index === randomImposterIndex,
      hasSeenRole: false
    })));
    
    setGamePhase('roleReveal');
  }, [players, usedWords, toast]);

  const showPlayerRole = useCallback(() => {
    if (currentPlayer) {
      setPlayers(prev => prev.map(p => 
        p.id === currentPlayer.id ? { ...p, hasSeenRole: true } : p
      ));
    }
  }, [currentPlayer]);

  const nextPlayer = useCallback(() => {
    if (currentPlayerIndex < players.length - 1) {
      setCurrentPlayerIndex(prev => prev + 1);
    } else {
      setGamePhase('playing');
    }
  }, [currentPlayerIndex, players.length]);

  const startVoting = useCallback(() => {
    setGamePhase('voting');
  }, []);

  const castVote = useCallback((voterId: string, targetId: string) => {
    setVotes(prev => ({ ...prev, [voterId]: targetId }));
  }, []);

  const finishVoting = useCallback(() => {
    const voteCounts: Record<string, number> = {};
    Object.values(votes).forEach(targetId => {
      voteCounts[targetId] = (voteCounts[targetId] || 0) + 1;
    });

    const maxVotes = Math.max(...Object.values(voteCounts));
    const eliminated = Object.keys(voteCounts).find(id => voteCounts[id] === maxVotes);
    
    if (eliminated) {
      setEliminatedPlayer(eliminated);
      const eliminatedPlayerData = players.find(p => p.id === eliminated);
      
      if (eliminatedPlayerData?.isImposter) {
        // Crew wins
        setPlayers(prev => prev.map(p => ({
          ...p,
          score: p.isImposter ? p.score : p.score + 2
        })));
        
        setRounds(prev => [...prev, {
          roundNumber: currentRound,
          word: currentWord,
          imposter: players[imposterIndex].name,
          eliminated: eliminatedPlayerData.name,
          winner: 'crew'
        }]);
      } else {
        // Imposter wins (wrong person eliminated)
        setPlayers(prev => prev.map(p => ({
          ...p,
          score: p.isImposter ? p.score + 3 : p.score
        })));
        
        setRounds(prev => [...prev, {
          roundNumber: currentRound,
          word: currentWord,
          imposter: players[imposterIndex].name,
          eliminated: eliminatedPlayerData.name,
          winner: 'imposter'
        }]);
      }
    }
    
    setGamePhase('roundEnd');
  }, [votes, players, currentRound, currentWord, imposterIndex]);

  const handleImposterClaim = useCallback(() => {
    setGamePhase('imposterClaim');
  }, []);

  const submitImposterGuess = useCallback(() => {
    const isCorrect = imposterGuess.toLowerCase().trim() === currentWord.toLowerCase().trim();
    
    if (isCorrect) {
      // Imposter wins immediately
      setPlayers(prev => prev.map(p => ({
        ...p,
        score: p.isImposter ? p.score + 5 : p.score
      })));
      
      setRounds(prev => [...prev, {
        roundNumber: currentRound,
        word: currentWord,
        imposter: players[imposterIndex].name,
        imposterGuess,
        winner: 'imposter'
      }]);
      
      setGamePhase('roundEnd');
    } else {
      toast({
        title: "Falsch geraten!",
        description: "Das Spiel geht normal weiter",
        variant: "destructive"
      });
      setGamePhase('playing');
    }
    
    setImposterGuess('');
  }, [imposterGuess, currentWord, players, imposterIndex, currentRound, toast]);

  const nextRound = useCallback(() => {
    if (currentRound < maxRounds) {
      setCurrentRound(prev => prev + 1);
      startNewRound();
    } else {
      setGamePhase('gameEnd');
    }
  }, [currentRound, maxRounds, startNewRound]);

  const resetGame = useCallback(() => {
    setCurrentRound(1);
    setGamePhase('setup');
    setPlayers(prev => prev.map(p => ({ ...p, score: 0 })));
    setRounds([]);
    usedWords.clear();
  }, [usedWords]);

  if (gamePhase === 'setup') {
    return (
      <InteractiveGameContainer onExit={onExit} title="Imposter Game - Setup">
        <div className="max-w-2xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Spieler hinzufügen (3-12)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newPlayerName}
                  onChange={(e) => setNewPlayerName(e.target.value)}
                  placeholder="Spielername eingeben"
                  onKeyPress={(e) => e.key === 'Enter' && addPlayer()}
                />
                <Button onClick={addPlayer} disabled={!newPlayerName.trim() || players.length >= 12}>
                  Hinzufügen
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                {players.map((player) => (
                  <div key={player.id} className="flex items-center justify-between bg-white/20 p-2 rounded text-white">
                    <span>{player.name}</span>
                    <Button size="sm" variant="ghost" onClick={() => removePlayer(player.id)} className="text-white hover:bg-white/20">×</Button>
                  </div>
                ))}
              </div>
              
              <div className="flex items-center gap-2 text-white">
                <label>Runden:</label>
                <Input
                  type="number"
                  min="1"
                  max="20"
                  value={maxRounds}
                  onChange={(e) => setMaxRounds(Number(e.target.value))}
                  className="w-20"
                />
              </div>
              
              <Button 
                onClick={startGame} 
                disabled={players.length < 3}
                className="w-full"
                size="lg"
              >
                Spiel starten
              </Button>
            </CardContent>
          </Card>
        </div>
      </InteractiveGameContainer>
    );
  }

  if (gamePhase === 'roleReveal') {
    return (
      <InteractiveGameContainer onExit={onExit} title={`Runde ${currentRound} - Rollen zeigen`}>
        <div className="max-w-md mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">
                {currentPlayer?.hasSeenRole ? 'Weiter zum nächsten Spieler' : currentPlayer?.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {!currentPlayer?.hasSeenRole ? (
                <Button onClick={showPlayerRole} className="w-full" size="lg">
                  <Eye className="w-4 h-4 mr-2" />
                  Rolle anzeigen
                </Button>
              ) : (
                <div className="space-y-4">
                  <div className="text-center p-6 bg-white/10 rounded-lg space-y-4">
                    <div className="text-xl font-bold text-white">
                      {currentPlayer.isImposter ? (
                        <Badge variant="destructive" className="text-lg px-4 py-2">
                          IMPOSTER
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="text-lg px-4 py-2">
                          CREW
                        </Badge>
                      )}
                    </div>
                    <div className="text-lg text-white">
                      Wort: <strong>{currentPlayer.isImposter ? '???' : currentWord}</strong>
                    </div>
                    <div className="text-sm text-white/80 bg-white/10 p-3 rounded">
                      {currentPlayer.isImposter ? (
                        <p><strong>Deine Aufgabe:</strong> Verhalte dich unauffällig und versuche das geheime Wort zu erraten, ohne dass die anderen merken, dass du es nicht kennst!</p>
                      ) : (
                        <p><strong>Deine Aufgabe:</strong> Gib einen Hinweis zum Wort und versuche den Imposter zu entlarven, der das Wort nicht kennt!</p>
                      )}
                    </div>
                  </div>
                  
                  <Button onClick={nextPlayer} className="w-full" size="lg">
                    {currentPlayerIndex < players.length - 1 
                      ? `Handy an ${players[currentPlayerIndex + 1]?.name} weitergeben`
                      : 'Spiel starten'
                    }
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </InteractiveGameContainer>
    );
  }

  if (gamePhase === 'playing') {
    return (
      <InteractiveGameContainer onExit={onExit} title={`Runde ${currentRound} - Hinweise geben`}>
        <div className="max-w-2xl mx-auto space-y-6">
          <Card>
            <CardContent className="space-y-6 pt-6">
              <div className="text-center text-white space-y-4">
                <h2 className="text-2xl font-bold">Hinweisrunde</h2>
                <div className="bg-white/10 p-4 rounded-lg">
                  <p className="text-lg font-semibold text-orange-300">
                    🎯 {players[startingPlayerIndex]?.name} beginnt!
                  </p>
                </div>
                <p>
                  Jeder gibt genau EIN Wort als Hinweis. Der Imposter kennt das Wort nicht!
                </p>
                <p className="text-sm opacity-80">
                  Diskutiert danach frei und entscheidet, wann ihr voten wollt.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button onClick={startVoting} size="lg" className="w-full">
                  <Target className="w-4 h-4 mr-2" />
                  Voting starten
                </Button>
                <Button onClick={handleImposterClaim} variant="outline" size="lg" className="w-full">
                  <Eye className="w-4 h-4 mr-2" />
                  Imposter Claim
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </InteractiveGameContainer>
    );
  }

  if (gamePhase === 'voting') {
    const allVoted = players.every(p => votes[p.id]);
    
    return (
      <InteractiveGameContainer onExit={onExit} title={`Runde ${currentRound} - Voting`}>
        <div className="max-w-2xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Wer ist der Imposter?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {players.map((voter) => (
                  <div key={voter.id} className="space-y-2">
                    <h3 className="font-semibold text-white">{voter.name}</h3>
                    <div className="grid grid-cols-1 gap-1">
                      {players.map((target) => (
                        <Button
                          key={target.id}
                          variant={votes[voter.id] === target.id ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => castVote(voter.id, target.id)}
                          disabled={target.id === voter.id}
                        >
                          {target.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <Button 
                onClick={finishVoting} 
                disabled={!allVoted}
                className="w-full"
                size="lg"
              >
                Voting beenden
              </Button>
            </CardContent>
          </Card>
        </div>
      </InteractiveGameContainer>
    );
  }

  if (gamePhase === 'imposterClaim') {
    return (
      <InteractiveGameContainer onExit={onExit} title={`Runde ${currentRound} - Imposter Claim`}>
        <div className="max-w-md mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Imposter Claim</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center space-y-4">
                <p className="text-white">
                  Der Imposter behauptet, das Wort zu kennen.
                </p>
                <div className="bg-white/10 p-4 rounded-lg">
                  <p className="text-white text-lg font-bold">
                    Wort: {currentWord}
                  </p>
                </div>
                <p className="text-white">
                  Hat der Imposter das richtige Wort genannt?
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  onClick={() => {
                    // Imposter wins immediately if correct
                    setPlayers(prev => prev.map(p => ({
                      ...p,
                      score: p.isImposter ? p.score + 5 : p.score
                    })));
                    
                    setRounds(prev => [...prev, {
                      roundNumber: currentRound,
                      word: currentWord,
                      imposter: players[imposterIndex].name,
                      imposterGuess: currentWord,
                      winner: 'imposter'
                    }]);
                    
                    setGamePhase('roundEnd');
                  }}
                  size="lg"
                  className="bg-green-600 hover:bg-green-700"
                >
                  ✓ Richtig
                </Button>
                <Button 
                  onClick={() => {
                    // Imposter loses immediately if wrong
                    setPlayers(prev => prev.map(p => ({
                      ...p,
                      score: p.isImposter ? p.score : p.score + 2
                    })));
                    
                    setRounds(prev => [...prev, {
                      roundNumber: currentRound,
                      word: currentWord,
                      imposter: players[imposterIndex].name,
                      imposterGuess: 'Falsches Wort',
                      winner: 'crew'
                    }]);
                    
                    setGamePhase('roundEnd');
                  }}
                  size="lg"
                  variant="destructive"
                >
                  ✗ Falsch
                </Button>
              </div>
              
              <Button 
                variant="outline"
                onClick={() => setGamePhase('playing')}
                className="w-full"
              >
                Abbrechen
              </Button>
            </CardContent>
          </Card>
        </div>
      </InteractiveGameContainer>
    );
  }

  if (gamePhase === 'roundEnd') {
    const lastRound = rounds[rounds.length - 1];
    const isGameEnd = currentRound >= maxRounds;
    
    return (
      <InteractiveGameContainer onExit={onExit} title={`Runde ${currentRound} - Ergebnis`}>
        <div className="max-w-2xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">
                {lastRound?.winner === 'crew' ? '🎉 Crew gewinnt!' : '🎭 Imposter gewinnt!'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-white/10 p-4 rounded-lg">
                <div className="text-center space-y-2">
                  <p className="text-white">
                    <strong>Wort:</strong> {currentWord}
                  </p>
                  <p className="text-white">
                    <strong>Imposter:</strong> {players[imposterIndex]?.name}
                  </p>
                  {eliminatedPlayer && (
                    <p className="text-white">
                      <strong>Eliminiert:</strong> {players.find(p => p.id === eliminatedPlayer)?.name}
                    </p>
                  )}
                  {lastRound?.imposterGuess && (
                    <p className="text-white">
                      <strong>Imposter Guess:</strong> {lastRound.imposterGuess}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-semibold text-white text-center">Aktuelle Punkte</h3>
                <div className="grid grid-cols-2 gap-2">
                  {players
                    .sort((a, b) => b.score - a.score)
                    .map((player) => (
                    <div key={player.id} className="flex justify-between bg-white/10 p-2 rounded">
                      <span className="text-white">{player.name}</span>
                      <span className="text-white font-bold">{player.score}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <Button 
                onClick={isGameEnd ? () => setGamePhase('gameEnd') : nextRound}
                className="w-full"
                size="lg"
              >
                {isGameEnd ? 'Spiel beenden' : 'Nächste Runde'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </InteractiveGameContainer>
    );
  }

  if (gamePhase === 'gameEnd') {
    const winner = players.reduce((max, player) => 
      player.score > max.score ? player : max
    );
    
    return (
      <InteractiveGameContainer onExit={onExit} title="Spiel beendet">
        <div className="max-w-2xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">
                <Trophy className="w-8 h-8 mx-auto mb-2" />
                🎉 {winner.name} gewinnt!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold text-white text-center">Endstand</h3>
                <div className="space-y-2">
                  {players
                    .sort((a, b) => b.score - a.score)
                    .map((player, index) => (
                    <div key={player.id} className="flex justify-between bg-white/10 p-3 rounded">
                      <span className="text-white">
                        #{index + 1} {player.name}
                      </span>
                      <span className="text-white font-bold">{player.score} Punkte</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <Button onClick={resetGame} className="w-full">
                  Neues Spiel
                </Button>
                <Button onClick={onExit} variant="outline" className="w-full">
                  Beenden
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </InteractiveGameContainer>
    );
  }

  return null;
};