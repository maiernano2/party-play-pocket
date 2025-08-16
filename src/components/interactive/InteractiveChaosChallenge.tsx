import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { InteractiveGameContainer } from './InteractiveGameContainer';
import { GameCountdown } from '../GameCountdown';
import { AlertTriangle, Users, ArrowRight, RotateCcw } from 'lucide-react';

interface Player {
  id: string;
  name: string;
}

interface ChaosRule {
  id: string;
  text: string;
  category: string;
  requiresVoting?: boolean;
}

interface InteractiveChaosChallengeProps {
  onExit: () => void;
}

  const chaosRules: ChaosRule[] = [
  // Wer würde eher...
  { id: '1', text: 'Wer würde eher... einen ganzen Tag lang schweigen?', category: 'wer-würde-eher', requiresVoting: true },
  { id: '2', text: 'Wer würde eher... bei einer Zombie-Apokalypse überleben?', category: 'wer-würde-eher', requiresVoting: true },
  { id: '15', text: 'Wer würde eher... heimlich Schokolade vor dem Fernseher essen?', category: 'wer-würde-eher', requiresVoting: true },
  { id: '16', text: 'Wer würde eher... nackt durch die Stadt laufen für 1000€?', category: 'wer-würde-eher', requiresVoting: true },
  { id: '17', text: 'Wer würde eher... einen Monat ohne Internet überleben?', category: 'wer-würde-eher', requiresVoting: true },
  { id: '18', text: 'Wer würde eher... ihren Ex zurück nehmen?', category: 'wer-würde-eher', requiresVoting: true },
  { id: '19', text: 'Wer würde eher... beim ersten Date zu viel trinken?', category: 'wer-würde-eher', requiresVoting: true },
  { id: '20', text: 'Wer würde eher... auf einem Konzert auf die Bühne klettern?', category: 'wer-würde-eher', requiresVoting: true },
  { id: '40', text: 'Wer würde eher... einen Dreier haben?', category: 'wer-würde-eher', requiresVoting: true },
  { id: '41', text: 'Wer würde eher... beim Sex stöhnen wie ein Pornostar?', category: 'wer-würde-eher', requiresVoting: true },
  { id: '42', text: 'Wer würde eher... heimlich Sexspielzeug kaufen?', category: 'wer-würde-eher', requiresVoting: true },
  { id: '43', text: 'Wer würde eher... einen Striptease machen für Geld?', category: 'wer-würde-eher', requiresVoting: true },
  { id: '44', text: 'Wer würde eher... eine Affäre haben?', category: 'wer-würde-eher', requiresVoting: true },
  
  // Dies oder Das
  { id: '71', text: 'Abstimmung: Netflix oder YouTube?', category: 'dies-oder-das', requiresVoting: true },
  { id: '72', text: 'Abstimmung: Pizza oder Burger?', category: 'dies-oder-das', requiresVoting: true },
  { id: '73', text: 'Abstimmung: Meer oder Berge?', category: 'dies-oder-das', requiresVoting: true },
  { id: '74', text: 'Abstimmung: Kaffee oder Tee?', category: 'dies-oder-das', requiresVoting: true },
  { id: '75', text: 'Abstimmung: Hund oder Katze?', category: 'dies-oder-das', requiresVoting: true },
  { id: '76', text: 'Abstimmung: Sommer oder Winter?', category: 'dies-oder-das', requiresVoting: true },
  { id: '77', text: 'Abstimmung: Android oder iPhone?', category: 'dies-oder-das', requiresVoting: true },
  { id: '78', text: 'Abstimmung: Früh aufstehen oder lange wach bleiben?', category: 'dies-oder-das', requiresVoting: true },
  { id: '79', text: 'Abstimmung: Lesen oder Filme schauen?', category: 'dies-oder-das', requiresVoting: true },
  { id: '80', text: 'Abstimmung: Auto oder Fahrrad?', category: 'dies-oder-das', requiresVoting: true },
  
  // Fragen über andere
  { id: '3', text: 'Wer ist am zuverlässigsten in der Gruppe?', category: 'fragen-über-andere', requiresVoting: true },
  { id: '4', text: 'Wer hat die beste Ausrede, wenn er zu spät kommt?', category: 'fragen-über-andere', requiresVoting: true },
  { id: '21', text: 'Wer würde am ehesten heimlich das Handy des Partners checken?', category: 'fragen-über-andere', requiresVoting: true },
  { id: '22', text: 'Wer hat schon mal gelogen, um nicht zu einem Date zu müssen?', category: 'fragen-über-andere', requiresVoting: true },
  { id: '23', text: 'Wer würde am ehesten einen One-Night-Stand haben?', category: 'fragen-über-andere', requiresVoting: true },
  { id: '24', text: 'Wer schläft am wahrscheinlichsten nackt?', category: 'fragen-über-andere', requiresVoting: true },
  { id: '45', text: 'Wer hat die meisten Sexpartner gehabt?', category: 'fragen-über-andere', requiresVoting: true },
  { id: '46', text: 'Wer würde am ehesten fremdgehen?', category: 'fragen-über-andere', requiresVoting: true },
  { id: '47', text: 'Wer ist heimlich am perversesten?', category: 'fragen-über-andere', requiresVoting: true },
  
  // Gruppenchallenges
  { id: '5', text: 'Alle müssen stumm den Song "Happy Birthday" singen', category: 'group-challenge' },
  { id: '25', text: 'Alle müssen gleichzeitig ihren peinlichsten Moment erzählen', category: 'group-challenge' },
  { id: '26', text: 'Macht eine Minute lang einen Gruppentanz zu imaginärer Musik', category: 'group-challenge' },
  { id: '27', text: 'Alle müssen ihre schlimmste Dating-Story erzählen', category: 'group-challenge' },
  { id: '48', text: 'Alle erzählen gleichzeitig ihr peinlichstes Sexerlebnis', category: 'group-challenge' },
  { id: '49', text: 'Alle müssen einen sexy Tanz für 30 Sekunden machen', category: 'group-challenge' },
  
  // Individuelle Regeln
  { id: '6', text: 'Fingerspitzen müssen sich berühren, bis du wieder dran bist', category: 'individual-rule' },
  { id: '7', text: 'Du darfst nicht "Ja" oder "Nein" sagen', category: 'individual-rule' },
  { id: '13', text: 'Du musst jede Antwort mit "Meiner Meinung nach..." beginnen', category: 'speaking-rule' },
  { id: '14', text: 'Sprich nur in Fragen, bis du wieder dran bist', category: 'speaking-rule' },
  { id: '28', text: 'Du musst bei jedem Satz mit den Händen gestikulieren', category: 'individual-rule' },
  { id: '29', text: 'Du darfst nur flüstern, bis du wieder dran bist', category: 'speaking-rule' },
  { id: '30', text: 'Du musst jeden Satz mit "Ehm..." beginnen', category: 'speaking-rule' },
  { id: '50', text: 'Du musst jedes Mal zwinkern wenn du sprichst', category: 'individual-rule' },
  { id: '51', text: 'Du darfst nicht das Wort "und" sagen', category: 'speaking-rule' },
  { id: '52', text: 'Du musst bei jedem Satz "wie geil" am Ende sagen', category: 'speaking-rule' },
  
  // Challenges
  { id: '8', text: 'Zeichne in 30 Sekunden einen Elefanten mit geschlossenen Augen', category: 'challenge' },
  { id: '9', text: 'Imitiere 30 Sekunden lang einen berühmten Politiker', category: 'challenge' },
  { id: '10', text: 'Sage einen Zungenbrecher 5x hintereinander fehlerfrei', category: 'challenge' },
  { id: '31', text: 'Erzähle eine erfundene Geschichte über dein erstes Mal', category: 'challenge' },
  { id: '32', text: 'Tanze 30 Sekunden zu imaginärer Musik als wärst du allein', category: 'challenge' },
  { id: '33', text: 'Imitiere einen Orgasmus (jugendfreie Version)', category: 'challenge' },
  { id: '34', text: 'Erzähle dein peinlichstes Sex-Erlebnis (oder erfinde eins)', category: 'challenge' },
  { id: '53', text: 'Mache 10 sexy Kniebeugen', category: 'challenge' },
  { id: '54', text: 'Erzähle deine wildeste Sexfantasie (oder erfinde eine)', category: 'challenge' },
  { id: '55', text: 'Imitiere deinen letzten Orgasmus mit Geräuschen', category: 'challenge' },
  { id: '56', text: 'Lecke deinen Ellbogen für 10 Sekunden', category: 'challenge' },
  { id: '57', text: 'Massiere die Schultern der Person links von dir für 30 Sekunden', category: 'challenge' },
  { id: '60', text: 'Küsse die Hand der Person rechts von dir leidenschaftlich', category: 'challenge' },
  { id: '61', text: 'Flüstere der Person links von dir etwas Verführerisches ins Ohr', category: 'challenge' },
  { id: '62', text: 'Tanze einen langsamen, sinnlichen Tanz für 20 Sekunden', category: 'challenge' },
  { id: '63', text: 'Erzähle von deinem verrücktesten Kuss', category: 'challenge' },
  { id: '64', text: 'Mache Liegestütze und gib dabei verführerische Geräusche von dir', category: 'challenge' },
  { id: '65', text: 'Beschreibe deinen Traumpartner im Bett (ohne Namen zu nennen)', category: 'challenge' },
  { id: '66', text: 'Führe einen 15-sekündigen Strip-Tease auf (nur Oberteil)', category: 'challenge' },
  { id: '67', text: 'Gib jemandem in der Runde ein Kompliment über sein Aussehen', category: 'challenge' },
  { id: '68', text: 'Erzähle von deinem ersten Kuss in allen Details', category: 'challenge' },
  { id: '69', text: 'Mache 30 Sekunden lang sexy Gesichtsausdrücke', category: 'challenge' },
  { id: '70', text: 'Imitiere, wie du jemanden verführen würdest', category: 'challenge' },
  
  // Trinkregeln
  { id: '11', text: 'TRINKRUNDE: Alle trinken 2 Schlucke!', category: 'drink' },
  { id: '12', text: 'TRINKREGEL: Wer lacht, muss trinken (gilt diese Runde)', category: 'drink-rule' },
  { id: '35', text: 'TRINKREGEL: Wer "ich" sagt, muss trinken (gilt diese Runde)', category: 'drink-rule' },
  { id: '36', text: 'TRINKRUNDE: Jeder trinkt so viele Schlucke wie sein Alter geteilt durch 10', category: 'drink' },
  { id: '37', text: 'TRINKREGEL: Wer sein Handy berührt, muss trinken (gilt diese Runde)', category: 'drink-rule' },
  { id: '38', text: 'TRINKRUNDE: Wer Single ist, trinkt 3 Schlucke', category: 'drink' },
  { id: '39', text: 'TRINKREGEL: Bei Regelbruch oder nicht geschaffter Aufgabe: Trinken!', category: 'drink-rule' },
  { id: '58', text: 'TRINKREGEL: Wer flucht, muss trinken (gilt diese Runde)', category: 'drink-rule' },
  { id: '59', text: 'TRINKRUNDE: Alle die schon mal betrunken Sex hatten trinken 2 Schlucke', category: 'drink' }
];

export const InteractiveChaosChallenge = ({ onExit }: InteractiveChaosChallengeProps) => {
  const [gamePhase, setGamePhase] = useState<'warning' | 'setup' | 'countdown' | 'playing' | 'rule-end' | 'voting'>('warning');
  const [players, setPlayers] = useState<Player[]>([]);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [currentRule, setCurrentRule] = useState<ChaosRule | null>(null);
  const [ruleGiver, setRuleGiver] = useState<string>('');
  const [round, setRound] = useState(1);
  const [usedRules, setUsedRules] = useState<string[]>([]);
  const [usedRulesThisRound, setUsedRulesThisRound] = useState<string[]>([]);
  const [playerTasksThisRound, setPlayerTasksThisRound] = useState<{[playerId: string]: string[]}>({});
  const [lastUsedRule, setLastUsedRule] = useState<string | null>(null);
  const [votes, setVotes] = useState<{[playerId: string]: string}>({});
  
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
      setGamePhase('countdown');
    }
  };

  const onCountdownComplete = () => {
    setGamePhase('playing');
    drawNewRule();
  };

  const drawNewRule = () => {
    const currentPlayerId = players[currentPlayerIndex].id;
    const playerUsedTasks = playerTasksThisRound[currentPlayerId] || [];
    
    // Filter rules that this player hasn't used in this round AND is not the last used rule
    let availableRules = chaosRules.filter(rule => 
      !playerUsedTasks.includes(rule.id) && rule.id !== lastUsedRule
    );
    
    // If no rules available, allow any rule except the last used one
    if (availableRules.length === 0) {
      availableRules = chaosRules.filter(rule => rule.id !== lastUsedRule);
    }
    
    // If still no rules (shouldn't happen with 60+ rules), use all rules
    if (availableRules.length === 0) {
      availableRules = chaosRules;
    }
    
    const randomRule = availableRules[Math.floor(Math.random() * availableRules.length)];
    setCurrentRule(randomRule);
    setUsedRules([...usedRules, randomRule.id]);
    setUsedRulesThisRound([...usedRulesThisRound, randomRule.id]);
    setLastUsedRule(randomRule.id);
    
    // Track that this player used this task in this round
    setPlayerTasksThisRound(prev => ({
      ...prev,
      [currentPlayerId]: [...playerUsedTasks, randomRule.id]
    }));
    
    setRuleGiver(players[currentPlayerIndex].name);
    
    // If rule requires voting, go to voting phase
    if (randomRule.requiresVoting) {
      setGamePhase('voting');
      setVotes({});
    }
  };

  const castVote = (playerId: string, vote: string) => {
    setVotes(prev => ({
      ...prev,
      [playerId]: vote
    }));
  };

  const finishVoting = () => {
    const voteCount: {[option: string]: string[]} = {};
    
    // Count votes
    Object.entries(votes).forEach(([playerId, vote]) => {
      if (!voteCount[vote]) voteCount[vote] = [];
      voteCount[vote].push(playerId);
    });
    
    // Find minority group(s)
    const voteCounts = Object.entries(voteCount).map(([option, voters]) => ({
      option,
      voters,
      count: voters.length
    }));
    
    if (voteCounts.length > 0) {
      const minCount = Math.min(...voteCounts.map(v => v.count));
      const minorities = voteCounts.filter(v => v.count === minCount);
      // Show result and continue to normal game flow
    }
    
    setGamePhase('playing');
  };

  const nextPlayer = () => {
    const nextIndex = (currentPlayerIndex + 1) % players.length;
    
    if (nextIndex === 0) {
      setRound(round + 1);
      setUsedRulesThisRound([]); // Reset used rules for new round
      setPlayerTasksThisRound({}); // Reset player tasks for new round
      setLastUsedRule(null); // Reset last used rule for new round
    }
    
    // Check if we're back to the rule giver
    if (players[nextIndex].name === ruleGiver) {
      setGamePhase('rule-end');
    } else {
      setCurrentPlayerIndex(nextIndex);
      // Draw a new rule for the next player immediately
      setTimeout(() => {
        drawNewRule();
      }, 0);
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

  const renderVoting = () => {
    if (!currentRule) return null;
    
    const isThisOrThat = currentRule.category === 'dies-oder-das';
    const voteCount: {[option: string]: string[]} = {};
    
    // Count current votes
    Object.entries(votes).forEach(([playerId, vote]) => {
      if (!voteCount[vote]) voteCount[vote] = [];
      voteCount[vote].push(playerId);
    });

    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="p-8">
          <div className="text-center space-y-6">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Abstimmung:</div>
              <div className="text-xl font-bold p-4 bg-primary/10 rounded-lg border-2 border-primary">
                {currentRule.text}
              </div>
            </div>
            
            {isThisOrThat && (
              <div className="p-4 bg-blue-500/20 rounded-lg border border-blue-500">
                <div className="text-blue-900 font-semibold">
                  🗳️ Alle stimmen ab! Die Minderheit muss trinken!
                </div>
              </div>
            )}
            
            {currentRule.category === 'wer-würde-eher' && (
              <div className="p-4 bg-orange-500/20 rounded-lg border border-orange-500">
                <div className="text-orange-900 font-semibold">
                  👥 Alle zeigen gleichzeitig auf eine Person!
                </div>
              </div>
            )}
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Wähle deine Option:</h3>
              
              {isThisOrThat ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Extract options from the question text */}
                  {(() => {
                    const match = currentRule.text.match(/Abstimmung: (.+) oder (.+)\?/);
                    if (match) {
                      const [, option1, option2] = match;
                      return [
                        <Button
                          key="option1"
                          onClick={() => castVote(players[currentPlayerIndex].id, option1)}
                          variant={votes[players[currentPlayerIndex].id] === option1 ? "default" : "outline"}
                          className="h-16 text-lg"
                        >
                          {option1}
                        </Button>,
                        <Button
                          key="option2"
                          onClick={() => castVote(players[currentPlayerIndex].id, option2)}
                          variant={votes[players[currentPlayerIndex].id] === option2 ? "default" : "outline"}
                          className="h-16 text-lg"
                        >
                          {option2}
                        </Button>
                      ];
                    }
                    return null;
                  })()}
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-2">
                  {players.map(player => (
                    <Button
                      key={player.id}
                      onClick={() => castVote(players[currentPlayerIndex].id, player.name)}
                      variant={votes[players[currentPlayerIndex].id] === player.name ? "default" : "outline"}
                      className="h-12"
                    >
                      {player.name}
                    </Button>
                  ))}
                </div>
              )}
            </div>
            
            <div className="text-sm text-muted-foreground">
              {Object.keys(votes).length}/{players.length} haben abgestimmt
            </div>
            
            {Object.keys(votes).length === players.length && (
              <Button onClick={finishVoting} className="w-full" size="lg">
                <ArrowRight className="w-4 h-4 mr-2" />
                Ergebnis anzeigen
              </Button>
            )}
          </div>
        </Card>
      </div>
    );
  };

  const renderPlaying = () => (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center md:text-center">
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
          
          {(currentRule?.category === 'drink' || currentRule?.category === 'drink-rule') && (
            <div className="p-4 bg-accent/20 rounded-lg border border-accent">
              <div className="text-accent font-semibold">🍺 Trinkregel aktiviert!</div>
            </div>
          )}
          
          {(currentRule?.category === 'wer-würde-eher' || currentRule?.category === 'fragen-über-andere' || currentRule?.category === 'dies-oder-das') && (
            <div className="p-4 bg-orange-500/20 rounded-lg border border-orange-500">
              <div className="text-orange-900 font-semibold">
                👥 WICHTIG: Abstimmung! Die Minderheit muss trinken!
              </div>
            </div>
          )}
          
          {(currentRule?.category === 'challenge' || currentRule?.category === 'individual-rule' || currentRule?.category === 'speaking-rule') && (
            <div className="p-4 bg-red-500/20 rounded-lg border border-red-500">
              <div className="text-red-900 font-semibold">
                ⚠️ WICHTIG: Aufgabe nicht geschafft oder Regel gebrochen? Trinken!
              </div>
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
      {gamePhase === 'countdown' && <GameCountdown onCountdownComplete={onCountdownComplete} />}
      {gamePhase === 'voting' && renderVoting()}
      {gamePhase === 'playing' && renderPlaying()}
      {gamePhase === 'rule-end' && renderRuleEnd()}
    </InteractiveGameContainer>
  );
};