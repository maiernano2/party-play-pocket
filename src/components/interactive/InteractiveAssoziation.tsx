import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { InteractiveGameContainer } from './InteractiveGameContainer';
import { assoziationTopics, getRandomTopic } from '@/data/assoziation-topics';
import { Users, Plus, Minus, Play, Check, X, ArrowRight } from 'lucide-react';

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
    { name: 'Team 1', score: 0 },
    { name: 'Team 2', score: 0 }
  ]);
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const [currentTopic, setCurrentTopic] = useState<string>('');
  const [phase, setPhase] = useState<'setup' | 'playing' | 'waiting'>('setup');
  const [usedTopics, setUsedTopics] = useState<Set<string>>(new Set());
  const [newTeamName, setNewTeamName] = useState('');

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
      }
    }
  };

  const handleAnswer = (sameWord: boolean) => {
    if (sameWord) {
      const newTeams = [...teams];
      newTeams[currentTeamIndex].score += 1;
      setTeams(newTeams);
    }
    setPhase('waiting');
  };

  const nextTeam = () => {
    const nextIndex = (currentTeamIndex + 1) % teams.length;
    setCurrentTeamIndex(nextIndex);
    
    const topic = getRandomTopic(usedTopics);
    if (topic) {
      setCurrentTopic(topic);
      setUsedTopics(prev => new Set([...prev, topic]));
      setPhase('playing');
    } else {
      // All topics used, reset
      setUsedTopics(new Set());
      const newTopic = getRandomTopic(new Set());
      if (newTopic) {
        setCurrentTopic(newTopic);
        setUsedTopics(new Set([newTopic]));
        setPhase('playing');
      }
    }
  };

  const resetGame = () => {
    setTeams(teams.map(team => ({ ...team, score: 0 })));
    setUsedTopics(new Set());
    setCurrentTeamIndex(0);
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
                    placeholder={`Team ${index + 1} Name`}
                    className="bg-white/10 border-white/30 text-white placeholder:text-white/60"
                  />
                  {teams.length > 2 && (
                    <Button
                      onClick={() => removeTeam(index)}
                      variant="outline"
                      size="sm"
                      className="text-white border-white/30 hover:bg-white/20"
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
                    className="text-white border-white/30 hover:bg-white/20"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              )}
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
              <div className="text-white text-sm mb-4">
                Der Überbegriff lautet... sagt gleichzeitig euer Wort!
              </div>
              
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
        <div className="flex justify-center">
          <Button
            onClick={resetGame}
            variant="outline"
            className="text-white border-white/30 hover:bg-white/20"
          >
            Spiel zurücksetzen
          </Button>
        </div>
      </div>
    </InteractiveGameContainer>
  );
};