import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { InteractiveGameContainer } from './InteractiveGameContainer';
import { chaosRules, getRandomRule } from '@/data/chaos-rules';

import { AlertTriangle, Users, ArrowRight, RotateCcw, Shuffle } from 'lucide-react';

interface Player {
  id: string;
  name: string;
  team?: 'A' | 'B';
}

interface ChaosRule {
  id: string;
  text: string;
  category: string;
  intensity: 'zahm' | 'mittel' | 'wild';
  requiresVoting?: boolean;
  isTeamGame?: boolean;
  duration?: string;
}

interface InteractiveChaosChallengeProps {
  onExit: () => void;
}

export const InteractiveChaosChallenge = ({ onExit }: InteractiveChaosChallengeProps) => {
  const [gamePhase, setGamePhase] = useState<'warning' | 'setup' | 'intensity-select' | 'playing'>('warning');
  const [players, setPlayers] = useState<Player[]>([]);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [currentRule, setCurrentRule] = useState<ChaosRule | null>(null);
  const [round, setRound] = useState(1);
  const [usedRules, setUsedRules] = useState<string[]>([]);
  const [usedRulesThisRound, setUsedRulesThisRound] = useState<string[]>([]);
  const [playerTasksThisRound, setPlayerTasksThisRound] = useState<{[playerId: string]: string[]}>({});
  const [lastUsedRule, setLastUsedRule] = useState<string | null>(null);
  const [intensity, setIntensity] = useState<'zahm' | 'mittel' | 'wild'>('zahm');
  const [teams, setTeams] = useState<{A: Player[], B: Player[]}>({A: [], B: []});
  const [currentTeamGame, setCurrentTeamGame] = useState<boolean>(false);
  
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current && gamePhase === 'setup') {
      inputRef.current.focus();
    }
  }, [gamePhase, players.length]);

  const acceptWarning = () => {
    setGamePhase('setup');
  };

  const addPlayer = () => {
    if (newPlayerName.trim() && players.length < 12) {
      const newPlayer: Player = {
        id: Date.now().toString(),
        name: newPlayerName.trim()
      };
      setPlayers([...players, newPlayer]);
      setNewPlayerName('');
    }
  };

  const removePlayer = (playerId: string) => {
    setPlayers(players.filter(p => p.id !== playerId));
  };

  const proceedToIntensitySelect = () => {
    if (players.length >= 3) {
      setGamePhase('intensity-select');
    }
  };

  const assignTeams = () => {
    const shuffledPlayers = [...players].sort(() => Math.random() - 0.5);
    const teamA: Player[] = [];
    const teamB: Player[] = [];
    
    shuffledPlayers.forEach((player, index) => {
      if (index % 2 === 0) {
        teamA.push({...player, team: 'A'});
      } else {
        teamB.push({...player, team: 'B'});
      }
    });
    
    setTeams({A: teamA, B: teamB});
    setPlayers([...teamA, ...teamB]);
  };

  const startGame = () => {
    assignTeams();
    setGamePhase('playing');
    drawNewRule();
  };

  const drawNewRule = () => {
    const currentPlayerId = players[currentPlayerIndex]?.id;
    if (!currentPlayerId) return;
    
    const playerUsedTasks = playerTasksThisRound[currentPlayerId] || [];
    
    // Get appropriate intensity level (gets wilder as rounds progress)
    let currentIntensity = intensity;
    if (round > 3 && intensity === 'zahm') currentIntensity = 'mittel';
    if (round > 6 && intensity === 'mittel') currentIntensity = 'wild';
    
    const excludeIds = [...usedRules, lastUsedRule].filter(Boolean);
    const randomRule = getRandomRule(currentIntensity, excludeIds);
    
    setCurrentRule(randomRule);
    setUsedRules([...usedRules, randomRule.id]);
    setUsedRulesThisRound([...usedRulesThisRound, randomRule.id]);
    setLastUsedRule(randomRule.id);
  };

  const nextPlayer = () => {
    const nextIndex = (currentPlayerIndex + 1) % players.length;
    
    if (nextIndex === 0) {
      setRound(round + 1);
      setUsedRulesThisRound([]);
      setPlayerTasksThisRound({});
      setLastUsedRule(null);
    }
    
    setCurrentPlayerIndex(nextIndex);
    setCurrentTeamGame(false); // Reset team game display
    setTimeout(() => {
      drawNewRule();
    }, 0);
  };

  const renderWarning = () => (
    <div className="max-w-2xl mx-auto">
      <Card className="p-8 bg-destructive/10 border-destructive">
        <div className="text-center space-y-6">
          <AlertTriangle className="w-16 h-16 text-destructive mx-auto" />
          <h2 className="text-2xl font-bold text-destructive">Wichtiger Hinweis - Ab 18 Jahren</h2>
          <div className="space-y-4 text-left">
            <p className="text-base">
              <strong>Dieses Spiel richtet sich an Personen ab 18 Jahren.</strong>
            </p>
            <p className="text-base">
              Bitte beachtet: Bei diesem Spiel wird <strong>kein Alkohol konsumiert</strong>, 
              sondern ausschließlich <strong>Wasser oder alkoholfreie Getränke</strong> getrunken.
            </p>
            <p className="text-base">
              Trinkt verantwortungsvoll. Wir übernehmen keine Haftung für Folgen durch Alkoholkonsum.
            </p>
          </div>
          <Button 
            onClick={acceptWarning}
            className="w-full max-w-2xl mx-auto bg-destructive hover:bg-destructive/90 text-white px-12 py-6 text-lg font-semibold leading-tight"
            size="lg"
          >
            Ich bin 18+ Jahre alt und stimme zu
          </Button>
        </div>
      </Card>
    </div>
  );

  const renderSetup = () => (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Spieler hinzufügen</h2>
        
        <div className="flex gap-2 mb-4">
          <Input
            ref={inputRef}
            type="text"
            value={newPlayerName}
            onChange={(e) => setNewPlayerName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addPlayer()}
            placeholder="Spielername eingeben..."
            className="flex-1"
            maxLength={20}
          />
          <Button 
            onClick={addPlayer}
            disabled={!newPlayerName.trim() || players.length >= 12}
          >
            Hinzufügen
          </Button>
        </div>
        
        <div className="text-sm text-muted-foreground text-center mb-4">
          {players.length}/12 Spieler ({3 - players.length > 0 ? `Noch ${3 - players.length} benötigt` : 'Bereit zum Starten'})
        </div>

        {players.length > 0 && (
          <div className="space-y-2 mb-6">
            {players.map((player, index) => (
              <div key={player.id} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">#{index + 1}</span>
                  <span>{player.name}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removePlayer(player.id)}
                  className="text-destructive hover:text-destructive"
                >
                  Entfernen
                </Button>
              </div>
            ))}
          </div>
        )}

        <Button 
          onClick={proceedToIntensitySelect}
          disabled={players.length < 3}
          className="w-full"
          size="lg"
        >
          <ArrowRight className="w-4 h-4 mr-2" />
          Weiter zur Intensitätsauswahl
        </Button>
      </Card>
    </div>
  );

  const renderIntensitySelect = () => (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Intensitätslevel wählen</h2>
        
        <div className="space-y-4 mb-8">
          <div className="grid gap-4">
            <Card 
              className={`p-4 cursor-pointer border-2 transition-all ${
                intensity === 'zahm' ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'
              }`}
              onClick={() => setIntensity('zahm')}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg text-success">🐰 Zahm</h3>
                  <p className="text-sm text-muted-foreground">Harmlose Fragen und einfache Aufgaben</p>
                </div>
                <Badge variant="secondary">Familie & Freunde</Badge>
              </div>
            </Card>

            <Card 
              className={`p-4 cursor-pointer border-2 transition-all ${
                intensity === 'mittel' ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'
              }`}
              onClick={() => setIntensity('mittel')}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg text-warning">🔥 Mittel</h3>
                  <p className="text-sm text-muted-foreground">Etwas persönlichere Fragen und Challenges</p>
                </div>
                <Badge variant="secondary">Gute Freunde</Badge>
              </div>
            </Card>

            <Card 
              className={`p-4 cursor-pointer border-2 transition-all ${
                intensity === 'wild' ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'
              }`}
              onClick={() => setIntensity('wild')}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg text-destructive">💥 Wild</h3>
                  <p className="text-sm text-muted-foreground">Sehr persönliche und aufregende Aufgaben</p>
                </div>
                <Badge variant="destructive">Beste Freunde</Badge>
              </div>
            </Card>
          </div>
        </div>

        <div className="text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            <strong>Hinweis:</strong> Das Spiel wird automatisch intensiver, je länger es dauert.
          </p>
          <Button 
            onClick={startGame}
            className="w-full"
            size="lg"
          >
            <Shuffle className="w-4 h-4 mr-2" />
            Spiel starten ({intensity} gewählt)
          </Button>
        </div>
      </Card>
    </div>
  );

  const renderVoting = () => null; // Removed voting system

  const renderPlaying = () => {
    if (!currentRule) return null;

    const currentPlayer = players[currentPlayerIndex];

    return (
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Current Player & Round Info */}
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                {currentPlayer?.name?.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold">{currentPlayer?.name}</h3>
                {currentTeamGame && currentPlayer?.team && (
                  <Badge variant={currentPlayer.team === 'A' ? 'default' : 'secondary'}>
                    Team {currentPlayer.team}
                  </Badge>
                )}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Runde {round}</div>
              <Badge variant="outline">{intensity.toUpperCase()}</Badge>
            </div>
          </div>
        </Card>

        {/* Teams Display only for Team Games */}
        {currentTeamGame && (
          <Card className="p-4">
            <h3 className="font-bold mb-3 text-center">Team-Aufteilung für diese Aufgabe</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Team A</h4>
                <div className="space-y-1">
                  {teams.A.map(player => (
                    <div key={player.id} className="text-sm p-2 bg-primary/10 rounded">
                      {player.name}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Team B</h4>
                <div className="space-y-1">
                  {teams.B.map(player => (
                    <div key={player.id} className="text-sm p-2 bg-secondary/10 rounded">
                      {player.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Current Rule */}
        <Card className="p-6">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">{currentRule.text}</h2>
            
            <div className="flex justify-center gap-3 mt-6">
              <Button onClick={nextPlayer}>
                <ArrowRight className="w-4 h-4 mr-2" />
                Nächster Spieler
              </Button>
              <Button 
                variant="outline"
                onClick={drawNewRule}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                🥤 Neue Aufgabe (trinken)
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  };

  return (
    <InteractiveGameContainer onExit={onExit} title="Chaos Challenge">
      {gamePhase === 'warning' && renderWarning()}
      {gamePhase === 'setup' && renderSetup()}
      {gamePhase === 'intensity-select' && renderIntensitySelect()}
      {gamePhase === 'playing' && renderPlaying()}
    </InteractiveGameContainer>
  );
};