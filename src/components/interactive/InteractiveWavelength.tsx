import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { InteractiveGameContainer } from './InteractiveGameContainer';
import { wavelengthScales, getRandomScale } from '@/data/wavelength-scales';
import { Eye, EyeOff, Users, Crown, RotateCcw, Play } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Team {
  name: string;
  score: number;
}

interface WavelengthProps {
  onExit: () => void;
}

export const InteractiveWavelength = ({ onExit }: WavelengthProps) => {
  const { toast } = useToast();
  const [teams, setTeams] = useState<Team[]>([
    { name: 'Team A', score: 0 },
    { name: 'Team B', score: 0 }
  ]);
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const [currentScale, setCurrentScale] = useState<string>('');
  const [secretNumber, setSecretNumber] = useState<number | null>(null);
  const [showSecretNumber, setShowSecretNumber] = useState(false);
  const [teamGuess, setTeamGuess] = useState<number>(5);
  const [phase, setPhase] = useState<'setup' | 'clue' | 'guess' | 'reveal'>('setup');
  const [usedScales, setUsedScales] = useState<Set<string>>(new Set());
  const [round, setRound] = useState(1);
  const [gameFinished, setGameFinished] = useState(false);

  const generateNewRound = () => {
    const newScale = getRandomScale(usedScales);
    if (!newScale) {
      toast({
        title: "Alle Skalen verwendet",
        description: "Das Spiel wird zurückgesetzt.",
        variant: "default"
      });
      setUsedScales(new Set());
      setCurrentScale(wavelengthScales[0]);
    } else {
      setCurrentScale(newScale);
      setUsedScales(prev => new Set([...prev, newScale]));
    }
    
    setSecretNumber(Math.floor(Math.random() * 10) + 1);
    setShowSecretNumber(false);
    setTeamGuess(5);
    setPhase('clue');
  };

  const startGame = () => {
    generateNewRound();
  };

  const revealSecretNumber = () => {
    setShowSecretNumber(true);
  };

  const hideSecretNumber = () => {
    setShowSecretNumber(false);
    setPhase('guess');
  };

  const submitGuess = () => {
    if (!secretNumber) return;
    
    const difference = Math.abs(teamGuess - secretNumber);
    let points = 0;
    
    if (difference === 0) {
      points = 3;
      toast({
        title: "Perfekt! 🎯",
        description: `+${points} Punkte für ${teams[currentTeamIndex].name}`,
        variant: "default"
      });
    } else if (difference === 1) {
      points = 1;
      toast({
        title: "Nah dran! 👌",
        description: `+${points} Punkt für ${teams[currentTeamIndex].name}`,
        variant: "default"
      });
    } else {
      toast({
        title: "Zu weit weg 😔",
        description: `Kein Punkt für ${teams[currentTeamIndex].name}`,
        variant: "destructive"
      });
    }

    // Update score
    const newTeams = [...teams];
    newTeams[currentTeamIndex].score += points;
    setTeams(newTeams);

    // Check for game end
    if (newTeams[currentTeamIndex].score >= 15 || round >= 10) {
      setGameFinished(true);
      const winner = newTeams.reduce((max, team) => team.score > max.score ? team : max);
      toast({
        title: "Spiel beendet! 🏆",
        description: `${winner.name} gewinnt mit ${winner.score} Punkten!`,
        variant: "default"
      });
    }

    setPhase('reveal');
  };

  const nextRound = () => {
    setCurrentTeamIndex((prev) => (prev + 1) % teams.length);
    setRound(prev => prev + 1);
    generateNewRound();
  };

  const resetGame = () => {
    setTeams([
      { name: 'Team A', score: 0 },
      { name: 'Team B', score: 0 }
    ]);
    setCurrentTeamIndex(0);
    setRound(1);
    setUsedScales(new Set());
    setGameFinished(false);
    setPhase('setup');
  };


  const currentTeam = teams[currentTeamIndex];

  return (
    <InteractiveGameContainer onExit={onExit} title="Wavelength">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Wavelength Banner */}
        <div className="w-full max-w-md mx-auto rounded-lg overflow-hidden">
          <img 
            src="/lovable-uploads/c82f115a-c63e-49d6-9d0a-6e481d7b4e66.png" 
            alt="Wavelength - The Party Team Game"
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </div>
        {/* Scoreboard */}
        <div className="grid grid-cols-2 gap-4">
          {teams.map((team, index) => (
            <Card key={index} className={`p-4 text-center border-2 ${
              index === currentTeamIndex && !gameFinished
                ? 'border-primary bg-primary/10' 
                : 'border-white/20 bg-white/10'
            }`}>
              <div className="flex items-center justify-center gap-2 mb-2">
                {index === currentTeamIndex && !gameFinished && <Crown className="w-4 h-4 text-yellow-400" />}
                <h3 className="text-lg font-bold text-white">{team.name}</h3>
              </div>
              <div className="text-3xl font-bold text-white">{team.score}</div>
            </Card>
          ))}
        </div>

        {/* Round Info */}
        <div className="text-center">
          <div className="text-white/80">Runde {round}</div>
          {gameFinished && (
            <div className="text-xl font-bold text-green-400 mt-2">
              🏆 {teams.reduce((max, team) => team.score > max.score ? team : max).name} gewinnt!
            </div>
          )}
        </div>

        {/* Game Content */}
        {phase === 'setup' && (
          <Card className="p-8 text-center bg-white/10 border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4">Bereit für Wavelength?</h2>
            <p className="text-white/80 mb-6">
              Teams versuchen, geheime Zahlen anhand von Hinwörtern zu erraten.
            </p>
            <Button onClick={startGame} size="lg" className="bg-white text-primary hover:bg-white/90">
              <Play className="w-4 h-4 mr-2" />
              Spiel starten
            </Button>
          </Card>
        )}

        {phase === 'clue' && currentScale && (
          <div className="space-y-6">
            {/* Scale */}
            <Card className="p-6 bg-white/10 border-white/20">
              <h2 className="text-xl font-bold text-white text-center mb-4">Aktuelle Skala</h2>
              <div className="text-3xl font-bold text-center text-white">
                {currentScale}
              </div>
              <div className="flex justify-between text-white/60 text-sm mt-2">
                <span>1</span>
                <span>10</span>
              </div>
            </Card>

            {/* Secret Number */}
            <Card className="p-6 bg-white/10 border-white/20">
              <h3 className="text-lg font-bold text-white mb-4 text-center">
                {currentTeam.name} - Geheime Zahl
              </h3>
              
              {!showSecretNumber ? (
                <div className="text-center">
                  <Button 
                    onClick={revealSecretNumber}
                    className="bg-red-500 hover:bg-red-600 text-white"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Zahl anzeigen
                  </Button>
                  <p className="text-white/60 text-sm mt-2">
                    Nur der Hinweisgeber darf dies drücken!
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <div className="text-6xl font-bold text-white mb-4">
                    {secretNumber}
                  </div>
                  <p className="text-white/80 mb-4">
                    Denke dir ein Hinweiswort aus und sage es laut!
                  </p>
                  <Button 
                    onClick={hideSecretNumber}
                    className="bg-green-500 hover:bg-green-600 text-white"
                  >
                    <EyeOff className="w-4 h-4 mr-2" />
                    Hinwort gesagt & weiter
                  </Button>
                </div>
              )}
            </Card>
          </div>
        )}

        {phase === 'guess' && (
          <div className="space-y-6">
            {/* Scale */}
            <Card className="p-6 bg-white/10 border-white/20">
              <h2 className="text-xl font-bold text-white text-center mb-2">Skala</h2>
              <div className="text-2xl font-bold text-center text-white mb-4">
                {currentScale}
              </div>
              <div className="text-xl text-center text-blue-400 mb-4">
                Ratet die Zahl basierend auf dem Hinwort!
              </div>
            </Card>

            {/* Team Guess */}
            <Card className="p-6 bg-white/10 border-white/20">
              <h3 className="text-lg font-bold text-white mb-4 text-center">
                {currentTeam.name} - Eure Schätzung
              </h3>
              
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-4">{teamGuess}</div>
                </div>
                
                <Slider
                  value={[teamGuess]}
                  onValueChange={(value) => setTeamGuess(value[0])}
                  min={1}
                  max={10}
                  step={1}
                  className="w-full"
                />
                
                <div className="flex justify-between text-white/60 text-sm">
                  <span>1</span>
                  <span>10</span>
                </div>
                
                <Button 
                  onClick={submitGuess}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                  size="lg"
                >
                  Schätzung abgeben
                </Button>
              </div>
            </Card>
          </div>
        )}

        {phase === 'reveal' && (
          <div className="space-y-6">
            {/* Results */}
            <Card className="p-6 bg-white/10 border-white/20">
              <h2 className="text-xl font-bold text-white text-center mb-4">Auflösung</h2>
              
              <div className="grid grid-cols-2 gap-4 text-center mb-6">
                <div>
                  <div className="text-white/60 text-sm">Geheime Zahl</div>
                  <div className="text-3xl font-bold text-yellow-400">{secretNumber}</div>
                </div>
                <div>
                  <div className="text-white/60 text-sm">Eure Schätzung</div>
                  <div className="text-3xl font-bold text-blue-400">{teamGuess}</div>
                </div>
              </div>

              <div className="text-center mb-6">
                <div className="text-lg text-white">
                  Unterschied: {Math.abs((teamGuess) - (secretNumber || 0))}
                </div>
                <div className="text-2xl font-bold text-green-400">
                  {Math.abs((teamGuess) - (secretNumber || 0)) === 0 ? '+3 Punkte' :
                   Math.abs((teamGuess) - (secretNumber || 0)) === 1 ? '+1 Punkt' : '0 Punkte'}
                </div>
              </div>
            </Card>

            {/* Next Round */}
            {!gameFinished ? (
              <Button 
                onClick={nextRound}
                className="w-full bg-green-500 hover:bg-green-600 text-white"
                size="lg"
              >
                <Users className="w-4 h-4 mr-2" />
                Nächste Runde ({teams[(currentTeamIndex + 1) % teams.length].name})
              </Button>
            ) : (
              <Button 
                onClick={resetGame}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                size="lg"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Neues Spiel starten
              </Button>
            )}
          </div>
        )}
      </div>
    </InteractiveGameContainer>
  );
};