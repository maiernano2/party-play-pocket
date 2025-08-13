import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { InteractiveGameContainer } from './InteractiveGameContainer';
import { AlertTriangle, Users, ArrowRight, RotateCcw } from 'lucide-react';

interface Player {
  id: string;
  name: string;
}

interface ChaosRule {
  id: string;
  text: string;
  category: string;
}

interface InteractiveChaosChallengeProps {
  onExit: () => void;
}

const chaosRules: ChaosRule[] = [
  { id: '1', text: 'Wer würde eher... einen ganzen Tag lang schweigen?', category: 'wer-würde-eher' },
  { id: '2', text: 'Wer würde eher... bei einer Zombie-Apokalypse überleben?', category: 'wer-würde-eher' },
  { id: '3', text: 'Wer ist am zuverlässigsten in der Gruppe?', category: 'fragen-über-andere' },
  { id: '4', text: 'Wer hat die beste Ausrede, wenn er zu spät kommt?', category: 'fragen-über-andere' },
  { id: '5', text: 'Alle müssen stumm den Song "Happy Birthday" singen', category: 'group-challenge' },
  { id: '6', text: 'Fingerspitzen müssen sich berühren, bis du wieder dran bist', category: 'individual-rule' },
  { id: '7', text: 'Du darfst nicht "Ja" oder "Nein" sagen', category: 'individual-rule' },
  { id: '8', text: 'Zeichne in 30 Sekunden einen Elefanten mit geschlossenen Augen', category: 'challenge' },
  { id: '9', text: 'Imitiere 30 Sekunden lang einen berühmten Politiker', category: 'challenge' },
  { id: '10', text: 'Sage einen Zungenbrecher 5x hintereinander fehlerfrei', category: 'challenge' },
  { id: '11', text: 'TRINKRUNDE: Alle trinken 2 Schlucke!', category: 'drink' },
  { id: '12', text: 'TRINKREGEL: Wer lacht, muss trinken (gilt diese Runde)', category: 'drink-rule' },
  { id: '13', text: 'Du musst jede Antwort mit "Meiner Meinung nach..." beginnen', category: 'speaking-rule' },
  { id: '14', text: 'Sprich nur in Fragen, bis du wieder dran bist', category: 'speaking-rule' },
  { id: '15', text: 'Wer würde eher... heimlich Schokolade vor dem Fernseher essen?', category: 'wer-würde-eher' }
];

export const InteractiveChaosChallenge = ({ onExit }: InteractiveChaosChallengeProps) => {
  const [gamePhase, setGamePhase] = useState<'warning' | 'setup' | 'playing' | 'rule-end'>('warning');
  const [players, setPlayers] = useState<Player[]>([]);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [currentRule, setCurrentRule] = useState<ChaosRule | null>(null);
  const [ruleGiver, setRuleGiver] = useState<string>('');
  const [round, setRound] = useState(1);
  const [usedRules, setUsedRules] = useState<string[]>([]);
  
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

  const startGame = () => {
    if (players.length >= 3) {
      setGamePhase('playing');
      drawNewRule();
    }
  };

  const drawNewRule = () => {
    const availableRules = chaosRules.filter(rule => !usedRules.includes(rule.id));
    if (availableRules.length === 0) {
      setUsedRules([]);
      return drawNewRule();
    }
    
    const randomRule = availableRules[Math.floor(Math.random() * availableRules.length)];
    setCurrentRule(randomRule);
    setUsedRules([...usedRules, randomRule.id]);
    setRuleGiver(players[currentPlayerIndex].name);
  };

  const nextPlayer = () => {
    const nextIndex = (currentPlayerIndex + 1) % players.length;
    
    if (nextIndex === 0) {
      setRound(round + 1);
    }
    
    // Check if we're back to the rule giver
    if (players[nextIndex].name === ruleGiver) {
      setGamePhase('rule-end');
    } else {
      setCurrentPlayerIndex(nextIndex);
    }
  };

  const endRule = () => {
    setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);
    setGamePhase('playing');
    drawNewRule();
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
            className="w-full bg-destructive hover:bg-destructive/90 text-white"
            size="lg"
          >
            Verstanden - Ich bin 18+ und stimme zu
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
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  Entfernen
                </Button>
              </div>
            ))}
          </div>
        )}

        <Button 
          onClick={startGame}
          disabled={players.length < 3}
          className="w-full"
          size="lg"
        >
          <Users className="w-4 h-4 mr-2" />
          Spiel starten
        </Button>
      </Card>
    </div>
  );

  const renderPlaying = () => (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <div className="text-sm text-muted-foreground mb-2">Runde {round}</div>
        <div className="text-lg font-semibold">
          {players[currentPlayerIndex].name} ist dran
        </div>
      </div>

      <Card className="p-8">
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Deine Aufgabe:</div>
            <div className="text-xl font-bold p-4 bg-primary/10 rounded-lg border-2 border-primary">
              {currentRule?.text}
            </div>
          </div>
          
          {currentRule?.category === 'drink' && (
            <div className="p-4 bg-accent/20 rounded-lg border border-accent">
              <div className="text-accent font-semibold">🍺 Trinkregel aktiviert!</div>
            </div>
          )}
          
          <div className="text-sm text-muted-foreground">
            Regelgeber: <strong>{ruleGiver}</strong>
          </div>
          
          <div className="space-y-3">
            <div className="text-sm">
              Gib das Handy weiter an: <strong>{players[(currentPlayerIndex + 1) % players.length].name}</strong>
            </div>
            
            <Button onClick={nextPlayer} className="w-full" size="lg">
              <ArrowRight className="w-4 h-4 mr-2" />
              Weiter zum nächsten Spieler
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderRuleEnd = () => (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="p-8">
        <div className="text-center space-y-6">
          <RotateCcw className="w-16 h-16 text-primary mx-auto" />
          <div className="space-y-2">
            <h3 className="text-xl font-bold">Regel beendet!</h3>
            <div className="text-base">
              <strong>{ruleGiver}</strong>, du kannst nun aufhören mit:
            </div>
            <div className="text-lg font-semibold p-4 bg-secondary rounded-lg">
              {currentRule?.text}
            </div>
          </div>
          
          <Button onClick={endRule} className="w-full" size="lg">
            <ArrowRight className="w-4 h-4 mr-2" />
            Neue Regel ziehen
          </Button>
        </div>
      </Card>
    </div>
  );

  return (
    <InteractiveGameContainer onExit={onExit} title="Chaos-Challenge">
      {gamePhase === 'warning' && renderWarning()}
      {gamePhase === 'setup' && renderSetup()}
      {gamePhase === 'playing' && renderPlaying()}
      {gamePhase === 'rule-end' && renderRuleEnd()}
    </InteractiveGameContainer>
  );
};