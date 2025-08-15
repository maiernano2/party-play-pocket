import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { InteractiveGameContainer } from './InteractiveGameContainer';
import { GameCountdown } from '../GameCountdown';
import { Users, Trophy, Clock, Star } from 'lucide-react';

interface Team {
  id: string;
  name: string;
  color: string;
  score: number;
}

interface InteractivePantomimeRatenProps {
  onExit: () => void;
}

const pantomimeTerms = [
  // Tägliche Aktivitäten
  "Zähne putzen", "Auto fahren", "Pizza essen", "Fenster putzen", "Hund ausführen",
  "Kaffee trinken", "Zeitung lesen", "Musik hören", "Telefon benutzen", "Kochen",
  "Tanzen", "Schlafen", "Duschen", "Fahrrad fahren", "Blumen gießen", "Staubsaugen",
  
  // Sport und Bewegung
  "Fußball spielen", "Tennis spielen", "Basketball spielen", "Schwimmen", "Joggen",
  "Yoga machen", "Gewichte heben", "Skifahren", "Surfen", "Klettern", "Golf spielen",
  "Volleyball spielen", "Bowling", "Dart spielen", "Tischtennis",
  
  // Hobbys und Freizeit
  "Malen", "Singen", "Gitarre spielen", "Lesen", "Nähen", "Stricken", "Fotografieren",
  "Gärtnern", "Angeln", "Wandern", "Puzzeln", "Schach spielen", "Kartenspiel",
  "Videospiele spielen", "Filme schauen",
  
  // Berufe
  "Lehrer", "Arzt", "Polizist", "Feuerwehrmann", "Koch", "Friseur", "Mechaniker",
  "Pilot", "Verkäufer", "Postbote", "Bauarbeiter", "Tänzer", "Musiker", "Maler",
  
  // Tiere
  "Hund", "Katze", "Elefant", "Affe", "Pinguin", "Schlange", "Frosch", "Känguru",
  "Bär", "Löwe", "Pferd", "Kuh", "Schwein", "Huhn", "Fisch", "Vogel", "Spinne",
  
  // Gegenstände
  "Hammer", "Schere", "Regenschirm", "Brille", "Handy", "Computer", "Auto",
  "Flugzeug", "Boot", "Uhr", "Stuhl", "Tisch", "Bett", "Lampe", "Fernseher",
  
  // Essen und Trinken
  "Apfel", "Banane", "Hamburger", "Spaghetti", "Eis", "Kuchen", "Brot", "Käse",
  "Wasser", "Bier", "Wein", "Tee", "Milch", "Saft",
  
  // Emotionen und Zustände
  "Glücklich", "Traurig", "Wütend", "Müde", "Überrascht", "Verängstigt",
  "Verliebt", "Gelangweilt", "Aufgeregt", "Nervös", "Stolz", "Enttäuscht"
];

const teamColors = ['bg-blue-500', 'bg-red-500', 'bg-green-500', 'bg-purple-500'];

export const InteractivePantomimeRaten = ({ onExit }: InteractivePantomimeRatenProps) => {
  const [gamePhase, setGamePhase] = useState<'setup' | 'countdown' | 'playing' | 'scoring' | 'finished'>('setup');
  const [teams, setTeams] = useState<Team[]>([]);
  const [newTeamName, setNewTeamName] = useState('');
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const [currentTerm, setCurrentTerm] = useState('');
  const [timeLeft, setTimeLeft] = useState(90);
  const [roundTime, setRoundTime] = useState(90);
  const [maxRounds, setMaxRounds] = useState(3);
  const [currentRound, setCurrentRound] = useState(1);
  const [correctGuesses, setCorrectGuesses] = useState(0);
  const [teamTerms, setTeamTerms] = useState<Record<string, string[]>>({});

  const currentTeam = teams[currentTeamIndex];

  useEffect(() => {
    if (gamePhase === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gamePhase === 'playing') {
      setGamePhase('scoring');
    }
  }, [timeLeft, gamePhase]);

  const addTeam = () => {
    if (newTeamName.trim() && teams.length < 4) {
      const newTeam: Team = {
        id: Date.now().toString(),
        name: newTeamName.trim(),
        color: teamColors[teams.length],
        score: 0
      };
      setTeams([...teams, newTeam]);
      setNewTeamName('');
    }
  };

  const removeTeam = (teamId: string) => {
    setTeams(teams.filter(t => t.id !== teamId));
  };

  const startGame = () => {
    if (teams.length >= 2) {
      // Initialize unique terms for each team
      const newTeamTerms: Record<string, string[]> = {};
      teams.forEach(team => {
        const shuffledTerms = [...pantomimeTerms].sort(() => Math.random() - 0.5);
        newTeamTerms[team.id] = shuffledTerms;
      });
      setTeamTerms(newTeamTerms);
      setGamePhase('countdown');
    }
  };

  const onCountdownComplete = () => {
    startNewRound();
  };

  const startNewRound = () => {
    const currentTeamTerms = teamTerms[currentTeam.id] || [];
    const termIndex = (currentRound - 1) * 10 + correctGuesses; // Use different terms each round
    setCurrentTerm(currentTeamTerms[termIndex] || pantomimeTerms[Math.floor(Math.random() * pantomimeTerms.length)]);
    setTimeLeft(roundTime);
    setCorrectGuesses(0);
    setGamePhase('playing');
  };

  const nextTerm = () => {
    const currentTeamTerms = teamTerms[currentTeam.id] || [];
    const termIndex = (currentRound - 1) * 10 + correctGuesses + 1;
    setCurrentTerm(currentTeamTerms[termIndex] || pantomimeTerms[Math.floor(Math.random() * pantomimeTerms.length)]);
    setCorrectGuesses(correctGuesses + 1);
  };

  const finishRound = () => {
    setGamePhase('scoring');
  };

  const awardPoints = () => {
    const updatedTeams = teams.map(team => 
      team.id === currentTeam.id 
        ? { ...team, score: team.score + correctGuesses }
        : team
    );
    setTeams(updatedTeams);
    
    if (currentRound >= maxRounds) {
      setGamePhase('finished');
    } else {
      const nextTeamIndex = (currentTeamIndex + 1) % teams.length;
      if (nextTeamIndex === 0) {
        setCurrentRound(currentRound + 1);
      }
      setCurrentTeamIndex(nextTeamIndex);
      startNewRound();
    }
  };

  const gameWinners = teams.length > 0 ? teams.filter(t => t.score === Math.max(...teams.map(t => t.score))) : [];

  if (gamePhase === 'setup') {
    return (
      <InteractiveGameContainer onExit={onExit} title="Pantomime-Raten">
        <div className="max-w-md mx-auto space-y-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4 text-center">Teams einrichten</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white mb-2">Zeit pro Runde (Sekunden)</label>
                <Input
                  type="number"
                  value={roundTime}
                  onChange={(e) => setRoundTime(Number(e.target.value))}
                  min="60"
                  max="180"
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                />
              </div>
              
              <div>
                <label className="block text-white mb-2">Anzahl Runden</label>
                <Input
                  type="number"
                  value={maxRounds}
                  onChange={(e) => setMaxRounds(Number(e.target.value))}
                  min="2"
                  max="5"
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                />
              </div>
              
              <div>
                <label className="block text-white mb-2">Team hinzufügen</label>
                <div className="flex gap-2">
                  <Input
                    value={newTeamName}
                    onChange={(e) => setNewTeamName(e.target.value)}
                    placeholder="Teamname"
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addTeam();
                        setTimeout(() => {
                          const nextInput = document.querySelector('input[placeholder="Teamname"]') as HTMLInputElement;
                          nextInput?.focus();
                        }, 50);
                      }
                    }}
                  />
                  <Button 
                    onClick={addTeam} 
                    variant="secondary"
                    disabled={teams.length >= 4}
                  >
                    Hinzufügen
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {teams.length > 0 && (
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">Teams ({teams.length}/4)</h3>
              <div className="space-y-2">
                {teams.map(team => (
                  <div key={team.id} className="flex items-center justify-between bg-white/10 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full ${team.color}`}></div>
                      <span className="text-white font-medium">{team.name}</span>
                    </div>
                    <Button
                      onClick={() => removeTeam(team.id)}
                      variant="ghost"
                      size="sm"
                      className="text-white/70 hover:text-white hover:bg-white/20"
                    >
                      ✕
                    </Button>
                  </div>
                ))}
              </div>
              
              {teams.length >= 2 && (
                <Button
                  onClick={startGame}
                  className="w-full mt-4 bg-white text-primary hover:bg-white/90"
                  size="lg"
                >
                  Spiel starten
                </Button>
              )}
              
              {teams.length < 2 && (
                <p className="text-white/70 text-center mt-4 text-sm">
                  Mindestens 2 Teams erforderlich
                </p>
              )}
            </div>
          )}
        </div>
      </InteractiveGameContainer>
    );
  }

  if (gamePhase === 'countdown') {
    return (
      <GameCountdown 
        onCountdownComplete={onCountdownComplete}
        onSkip={onCountdownComplete}
      />
    );
  }

  if (gamePhase === 'playing') {
    return (
      <InteractiveGameContainer onExit={onExit} title="Pantomime-Raten">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="bg-white/20 rounded-full px-4 py-2">
                <span className="text-white font-bold">Runde {currentRound}/{maxRounds}</span>
              </div>
              <div className="bg-white/20 rounded-full px-4 py-2 flex items-center gap-2">
                <Clock className="w-4 h-4 text-white" />
                <span className={`font-bold ${timeLeft <= 15 ? 'text-red-400' : 'text-white'}`}>{timeLeft}s</span>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center">
            <div className="bg-gradient-to-r from-primary to-accent rounded-lg p-4 mb-6">
              <h3 className="text-lg text-white/80 mb-1">Aktives Team:</h3>
              <div className="flex items-center justify-center gap-2">
                <div className={`w-4 h-4 rounded-full ${currentTeam?.color}`}></div>
                <h2 className="text-2xl font-bold text-white">{currentTeam?.name}</h2>
              </div>
            </div>

            <div className="bg-white/20 rounded-lg p-6 mb-6">
              <h3 className="text-white/80 text-sm mb-2">Pantomimisch darstellen:</h3>
              <p className="text-3xl font-bold text-white mb-4">{currentTerm}</p>
              <p className="text-white/70 text-sm">
                Nur Körpersprache - keine Worte oder Geräusche!
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 mb-4">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-white font-bold">Erraten: {correctGuesses}</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Button 
              onClick={nextTerm}
              className="bg-green-500 hover:bg-green-600 text-white"
              size="lg"
            >
              ✓ Erraten!
            </Button>
            <Button 
              onClick={() => {
                const currentTeamTerms = teamTerms[currentTeam.id] || [];
                const termIndex = (currentRound - 1) * 10 + correctGuesses + 1;
                setCurrentTerm(currentTeamTerms[termIndex] || pantomimeTerms[Math.floor(Math.random() * pantomimeTerms.length)]);
              }}
              className="bg-yellow-500 hover:bg-yellow-600 text-white"
              size="lg"
            >
              Skippen
            </Button>
            <Button 
              onClick={finishRound}
              className="bg-white text-primary hover:bg-white/90"
              size="lg"
            >
              Zeit beenden
            </Button>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 className="text-lg font-bold text-white mb-4 text-center">Aktuelle Punkte</h3>
            <div className="grid grid-cols-2 gap-3">
              {teams.map(team => (
                <div key={team.id} className="flex items-center justify-between bg-white/10 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${team.color}`}></div>
                    <span className="text-white font-medium text-sm">{team.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-white font-bold">{team.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </InteractiveGameContainer>
    );
  }

  if (gamePhase === 'scoring') {
    return (
      <InteractiveGameContainer onExit={onExit} title="Pantomime-Raten">
        <div className="max-w-md mx-auto space-y-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center">
            <h2 className="text-xl font-bold text-white mb-4">Runde beendet!</h2>
            
            <div className="bg-gradient-to-r from-primary to-accent rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className={`w-4 h-4 rounded-full ${currentTeam?.color}`}></div>
                <h3 className="text-lg font-bold text-white">{currentTeam?.name}</h3>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="text-2xl font-bold text-white">{correctGuesses}</span>
                <span className="text-white">Begriffe erraten</span>
              </div>
            </div>

            <div className="bg-white/20 rounded-lg p-4 mb-6">
              <h3 className="text-white/80 text-sm mb-2">Letzter Begriff:</h3>
              <p className="text-lg font-bold text-white">{currentTerm}</p>
            </div>
            
            <Button
              onClick={awardPoints}
              className="w-full bg-white text-primary hover:bg-white/90"
              size="lg"
            >
              {currentRound >= maxRounds && (currentTeamIndex + 1) % teams.length === 0
                ? 'Spiel beenden' 
                : 'Nächstes Team'}
            </Button>
          </div>
        </div>
      </InteractiveGameContainer>
    );
  }

  if (gamePhase === 'finished') {
    return (
      <InteractiveGameContainer onExit={onExit} title="Pantomime-Raten">
        <div className="max-w-md mx-auto text-center space-y-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-2">🎉 Gewinner!</h2>
            
            <div className="space-y-2 mb-6">
              {gameWinners.map(winner => (
                <div key={winner.id} className="flex items-center justify-center gap-2">
                  <div className={`w-4 h-4 rounded-full ${winner.color}`}></div>
                  <p className="text-xl text-white">{winner.name}</p>
                </div>
              ))}
              <p className="text-white/80 text-sm">
                {Math.max(...teams.map(t => t.score))} Begriffe erraten
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white/10 rounded-lg p-4">
                <h3 className="text-white font-medium mb-2">Endstand</h3>
                <div className="space-y-1">
                  {teams
                    .sort((a, b) => b.score - a.score)
                    .map((team, index) => (
                      <div key={team.id} className="flex justify-between items-center text-white/80 text-sm">
                        <div className="flex items-center gap-2">
                          <span>{index + 1}.</span>
                          <div className={`w-3 h-3 rounded-full ${team.color}`}></div>
                          <span>{team.name}</span>
                        </div>
                        <span>{team.score} Begriffe</span>
                      </div>
                    ))}
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