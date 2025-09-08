import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { InteractiveGameContainer } from './InteractiveGameContainer';
import { assoziationTopics, getRandomTopic } from '@/data/assoziation-topics';
import { Users, Plus, Minus, Play, Check, X, ArrowRight, RotateCcw, Timer, Trophy } from 'lucide-react';

interface Team {
  name: string;
  score: number;
}

interface AssoziationProps {
  onExit: () => void;
}

export const InteractiveAssoziation = ({ onExit }: AssoziationProps) => {
  // Auto-scroll to bottom on team change
  useEffect(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }, []);

  const [teams, setTeams] = useState<Team[]>([
    { name: '', score: 0 },
    { name: '', score: 0 }
  ]);
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const [currentTopic, setCurrentTopic] = useState<string>('');
  const [phase, setPhase] = useState<'setup' | 'playing' | 'waiting' | 'gameOver'>('setup');
  const [usedTopics, setUsedTopics] = useState<Set<string>>(new Set());
  const [newTeamName, setNewTeamName] = useState('');
  
  // Game settings
  const [hasTimer, setHasTimer] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState([10]);
  const [maxRounds, setMaxRounds] = useState([0]); // 0 = unlimited
  const [currentRound, setCurrentRound] = useState(1);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (hasTimer && timeLeft !== null && timeLeft > 0 && phase === 'playing') {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev === null || prev <= 1) {
            handleAnswer(false); // Auto "Nein" when time is up
            return null;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [hasTimer, timeLeft, phase]);

  const addTeam = () => {
    if (newTeamName.trim() && teams.length < 8) {
      setTeams([...teams, { name: newTeamName.trim(), score: 0 }]);
      setNewTeamName('');
    }
  };

  const removeTeam = (index: number) => {
    if (teams.length > 2) {
      const newTeams = teams.filter((_, i) => i !== index);
      setTeams(newTeams);
      if (currentTeamIndex >= newTeams.length) {
        setCurrentTeamIndex(0);
      }
    }
  };

  const updateTeamName = (index: number, name: string) => {
    const newTeams = [...teams];
    newTeams[index].name = name;
    setTeams(newTeams);
  };

  const startGame = () => {
    if (teams.every(team => team.name.trim())) {
      const topic = getRandomTopic(usedTopics);
      if (topic) {
        setCurrentTopic(topic);
        setUsedTopics(prev => new Set([...prev, topic]));
        setPhase('playing');
        setCurrentTeamIndex(0);
        setCurrentRound(1);
        if (hasTimer) {
          setTimeLeft(timerSeconds[0]);
        }
      }
    }
  };

  const handleAnswer = (sameWord: boolean) => {
    if (sameWord) {
      const newTeams = [...teams];
      newTeams[currentTeamIndex].score += 1;
      setTeams(newTeams);
    }
    setTimeLeft(null);
    setPhase('waiting');
  };

  const nextTeam = () => {
    const nextIndex = (currentTeamIndex + 1) % teams.length;
    
    // Check if we completed a round
    if (nextIndex === 0) {
      setCurrentRound(prev => prev + 1);
      
      // Check if game should end
      if (maxRounds[0] > 0 && currentRound >= maxRounds[0]) {
        setPhase('gameOver');
        return;
      }
    }
    
    setCurrentTeamIndex(nextIndex);
    
    const topic = getRandomTopic(usedTopics);
    if (topic) {
      setCurrentTopic(topic);
      setUsedTopics(prev => new Set([...prev, topic]));
      setPhase('playing');
      if (hasTimer) {
        setTimeLeft(timerSeconds[0]);
      }
    } else {
      // All topics used, reset
      setUsedTopics(new Set());
      const newTopic = getRandomTopic(new Set());
      if (newTopic) {
        setCurrentTopic(newTopic);
        setUsedTopics(new Set([newTopic]));
        setPhase('playing');
        if (hasTimer) {
          setTimeLeft(timerSeconds[0]);
        }
      }
    }
  };

  const resetGame = () => {
    setTeams(teams.map(team => ({ ...team, score: 0 })));
    setUsedTopics(new Set());
    setCurrentTeamIndex(0);
    setCurrentRound(1);
    setTimeLeft(null);
    setPhase('setup');
  };

  if (phase === 'setup') {
    return (
      <InteractiveGameContainer onExit={onExit} title="Assoziation">
        <div className="max-w-2xl mx-auto space-y-6">
          <Card className="p-6 bg-white/10 border-white/20 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-white mb-4 text-center">Teams einrichten</h2>
            
            <div className="space-y-4">
              {teams.map((team, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Input
                    value={team.name}
                    onChange={(e) => updateTeamName(index, e.target.value)}
                    placeholder={`Team ${index + 1}`}
                    className="bg-white/10 border-white/30 text-white placeholder:text-white/60"
                  />
                  {teams.length > 2 && (
                    <Button
                      onClick={() => removeTeam(index)}
                      variant="outline"
                      size="sm"
                      className="text-white border-white/30 hover:bg-white/20 shrink-0"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              
              {teams.length < 8 && (
                <div className="flex items-center gap-3">
                  <Input
                    value={newTeamName}
                    onChange={(e) => setNewTeamName(e.target.value)}
                    placeholder="Neues Team hinzufügen"
                    className="bg-white/10 border-white/30 text-white placeholder:text-white/60"
                    onKeyPress={(e) => e.key === 'Enter' && addTeam()}
                  />
                  <Button
                    onClick={addTeam}
                    variant="outline"
                    size="sm"
                    className="text-white border-white/30 hover:bg-white/20 shrink-0 bg-white/10 z-10"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
            
            {/* Game Settings */}
            <div className="mt-6 space-y-4 border-t border-white/20 pt-4">
              <h3 className="text-lg font-semibold text-white">Spieleinstellungen</h3>
              
              {/* Timer Setting */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="timer-switch" className="text-white">Timer verwenden</Label>
                  <Switch
                    id="timer-switch"
                    checked={hasTimer}
                    onCheckedChange={setHasTimer}
                  />
                </div>
                
                {hasTimer && (
                  <div className="space-y-2">
                    <Label className="text-white text-sm">Zeit pro Runde: {timerSeconds[0]} Sekunden</Label>
                    <Slider
                      value={timerSeconds}
                      onValueChange={setTimerSeconds}
                      max={20}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                  </div>
                )}
              </div>
              
              {/* Rounds Setting */}
              <div className="space-y-3">
                <Label className="text-white">
                  Anzahl Runden: {maxRounds[0] === 0 ? 'Unbegrenzt' : maxRounds[0]}
                </Label>
                <Slider
                  value={maxRounds}
                  onValueChange={setMaxRounds}
                  max={20}
                  min={0}
                  step={1}
                  className="w-full"
                />
                <div className="text-xs text-white/70">0 = Unbegrenzt, 1-20 = Feste Rundenanzahl</div>
              </div>
            </div>
            
            <Button
              onClick={startGame}
              disabled={!teams.every(team => team.name.trim())}
              className="w-full mt-6 bg-white/20 hover:bg-white/30 text-white border border-white/30"
            >
              <Play className="w-4 h-4 mr-2" />
              Spiel starten
            </Button>
          </Card>
          
          <Card className="p-6 bg-white/10 border-white/20 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-white mb-3">Spielregeln</h3>
            <ul className="text-white/90 space-y-2 text-sm">
              <li>• Es wird in 2er-Teams gespielt</li>
              <li>• Das Spiel gibt einen Überbegriff vor</li>
              <li>• Beide Teammitglieder überlegen kurz und sagen <strong>gleichzeitig</strong> ein Wort</li>
              <li>• Gleiches Wort = 1 Punkt für das Team</li>
              <li>• Handy wird ans nächste Team weitergegeben</li>
            </ul>
          </Card>
        </div>
      </InteractiveGameContainer>
    );
  }

  if (phase === 'gameOver') {
    const winner = teams.reduce((prev, current) => (prev.score > current.score) ? prev : current);
    const sortedTeams = [...teams].sort((a, b) => b.score - a.score);
    
    return (
      <InteractiveGameContainer onExit={onExit} title="Assoziation">
        <div className="max-w-2xl mx-auto space-y-6">
          <Card className="p-8 bg-white/10 border-white/20 backdrop-blur-sm text-center">
            <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-4">Spiel beendet!</h2>
            <div className="text-2xl text-white mb-6">
              🏆 {winner.name} gewinnt mit {winner.score} Punkten!
            </div>
            
            <div className="space-y-3 mb-6">
              <h3 className="text-lg font-semibold text-white">Endergebnis:</h3>
              {sortedTeams.map((team, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-white/10 rounded-lg">
                  <span className="text-white font-medium">{index + 1}. {team.name}</span>
                  <span className="text-2xl font-bold text-white">{team.score}</span>
                </div>
              ))}
            </div>
            
            <div className="flex gap-4 justify-center">
              <Button
                onClick={resetGame}
                className="bg-white/20 hover:bg-white/30 text-white border border-white/30"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Neues Spiel
              </Button>
              <Button
                onClick={onExit}
                variant="outline"
                className="text-white border-white/30 hover:bg-white/20"
              >
                Beenden
              </Button>
            </div>
          </Card>
        </div>
      </InteractiveGameContainer>
    );
  }

  return (
    <InteractiveGameContainer onExit={onExit} title="Assoziation">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Scoreboard */}
        <Card className="p-4 bg-white/10 border-white/20 backdrop-blur-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {teams.map((team, index) => (
              <div
                key={index}
                className={`text-center p-3 rounded-lg ${
                  index === currentTeamIndex
                    ? 'bg-white/30 border-2 border-white/60'
                    : 'bg-white/10 border border-white/30'
                }`}
              >
                <div className="text-white font-semibold">{team.name}</div>
                <div className="text-2xl font-bold text-white">{team.score}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Game Status */}
        <Card className="p-6 bg-white/10 border-white/20 backdrop-blur-sm text-center">
          {phase === 'playing' && (
            <>
              <div className="text-white/80 text-lg mb-2">
                <Users className="w-5 h-5 inline mr-2" />
                {teams[currentTeamIndex].name} ist dran
              </div>
              {maxRounds[0] > 0 && (
                <div className="text-white/60 text-sm mb-2">
                  Runde {currentRound} von {maxRounds[0]}
                </div>
              )}
              <div className="text-white text-sm mb-4">
                Der Überbegriff lautet... sagt gleichzeitig euer Wort!
              </div>
              
              {hasTimer && timeLeft !== null && (
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Timer className="w-5 h-5 text-white" />
                  <span className={`text-2xl font-bold ${timeLeft <= 3 ? 'text-red-400' : 'text-white'}`}>
                    {timeLeft}s
                  </span>
                </div>
              )}
              
              <div className="text-3xl font-bold text-white bg-white/20 p-6 rounded-lg mb-6">
                {currentTopic}
              </div>
              
              <div className="text-lg font-semibold text-white mb-4">
                Gleiches Wort gesagt?
              </div>
              
              <div className="flex gap-4 justify-center">
                <Button
                  onClick={() => handleAnswer(true)}
                  className="bg-green-500/80 hover:bg-green-500 text-white px-8 py-3 text-lg"
                >
                  <Check className="w-5 h-5 mr-2" />
                  Ja (+1 Punkt)
                </Button>
                <Button
                  onClick={() => handleAnswer(false)}
                  className="bg-red-500/80 hover:bg-red-500 text-white px-8 py-3 text-lg"
                >
                  <X className="w-5 h-5 mr-2" />
                  Nein
                </Button>
              </div>
            </>
          )}
          
          {phase === 'waiting' && (
            <>
              <div className="text-white text-lg mb-4">
                Handy ans nächste Team weitergeben
              </div>
              <div className="text-white/80 text-sm mb-6">
                Nächstes Team: {teams[(currentTeamIndex + 1) % teams.length].name}
              </div>
              
              <Button
                onClick={nextTeam}
                className="bg-white/20 hover:bg-white/30 text-white px-8 py-3 text-lg"
              >
                <ArrowRight className="w-5 h-5 mr-2" />
                Weiter
              </Button>
            </>
          )}
        </Card>

        {/* Game Controls */}
        <div className="flex justify-center gap-4">
          <Button
            onClick={resetGame}
            variant="outline"
            className="text-white border-white/30 hover:bg-white/20 bg-white/10"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Spiel zurücksetzen
          </Button>
        </div>
      </div>
    </InteractiveGameContainer>
  );
};