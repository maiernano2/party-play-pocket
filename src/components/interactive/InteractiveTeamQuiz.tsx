import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { InteractiveGameContainer } from './InteractiveGameContainer';
import { GameCountdown } from '../GameCountdown';
import { Users, Trophy, Clock, Play, SkipForward } from 'lucide-react';
import { Team } from '@/types/game';

interface InteractiveTeamQuizProps {
  onExit: () => void;
}

const questionsWithAnswers = [
  { question: "Wie heißt die Hauptstadt von Frankreich?", answer: "Paris" },
  { question: "Welcher Planet ist der größte in unserem Sonnensystem?", answer: "Jupiter" },
  { question: "In welchem Jahr wurde die Titanic versenkt?", answer: "1912" },
  { question: "Wie viele Saiten hat eine Standard-Gitarre?", answer: "6 Saiten" },
  { question: "Welcher ist der längste Fluss in Afrika?", answer: "Nil" },
  { question: "Wer malte die Mona Lisa?", answer: "Leonardo da Vinci" },
  { question: "Wie viele Herzen hat ein Oktopus?", answer: "3 Herzen" },
  { question: "In welchem Land befindet sich Machu Picchu?", answer: "Peru" },
  { question: "Welches chemische Element hat das Symbol 'Au'?", answer: "Gold" },
  { question: "Wie heißt der kleinste Ozean der Welt?", answer: "Arktischer Ozean" },
  { question: "Wer schrieb 'Romeo und Julia'?", answer: "William Shakespeare" },
  { question: "Welcher ist der höchste Wasserfall der Welt?", answer: "Salto Ángel (Venezuela)" },
  { question: "In welchem Jahr fiel die Berliner Mauer?", answer: "1989" },
  { question: "Wie viele Knochen hat ein erwachsener Mensch?", answer: "206 Knochen" },
  { question: "Welcher ist der größte Kontinent?", answer: "Asien" },
  { question: "Wer erfand das Telefon?", answer: "Alexander Graham Bell" },
  { question: "Welche Farbe entsteht aus Rot und Gelb?", answer: "Orange" },
  { question: "Wie heißt die Währung von Japan?", answer: "Yen" },
  { question: "Welcher Planet ist der Sonne am nächsten?", answer: "Merkur" },
  { question: "In welchem Land wurden die ersten Olympischen Spiele abgehalten?", answer: "Griechenland" },
  { question: "Wie viele Minuten hat eine Stunde?", answer: "60 Minuten" },
  { question: "Welches Tier ist das Symbol von WWF?", answer: "Panda" },
  { question: "Wie heißt der größte Vogel der Welt?", answer: "Strauß" },
  { question: "In welchem Jahr wurde Berlin zur Hauptstadt Deutschlands?", answer: "1990" },
  { question: "Welches ist das härteste natürliche Material?", answer: "Diamant" }
];

export const InteractiveTeamQuiz = ({ onExit }: InteractiveTeamQuizProps) => {
  const [gamePhase, setGamePhase] = useState<'setup' | 'countdown' | 'playing' | 'waiting' | 'finished'>('setup');
  const [teams, setTeams] = useState<Team[]>([]);
  const [newTeamName, setNewTeamName] = useState('');
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<{question: string, answer: string} | null>(null);
  const [timePerTeam, setTimePerTeam] = useState(60);
  const [timeLeft, setTimeLeft] = useState(60);
  const [currentScore, setCurrentScore] = useState(0);
  const [usedQuestions, setUsedQuestions] = useState<string[]>([]);

  const currentTeam = teams[currentTeamIndex];

  useEffect(() => {
    if (gamePhase === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gamePhase === 'playing') {
      finishTeamTurn();
    }
  }, [timeLeft, gamePhase]);

  const addTeam = () => {
    if (newTeamName.trim()) {
      const colors: Team['color'][] = ['blue', 'red', 'green', 'purple'];
      const newTeam: Team = {
        id: Date.now().toString(),
        name: newTeamName.trim(),
        color: colors[teams.length % colors.length],
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
      setGamePhase('countdown');
    }
  };

  const onCountdownComplete = () => {
    setCurrentTeamIndex(0);
    setGamePhase('waiting');
  };

  const startTeamTurn = () => {
    setCurrentScore(0);
    setTimeLeft(timePerTeam);
    setGamePhase('playing');
    getNewQuestion();
  };

  const getNewQuestion = () => {
    const availableQuestions = questionsWithAnswers.filter(q => !usedQuestions.includes(q.question));
    if (availableQuestions.length === 0) {
      setUsedQuestions([]);
      setCurrentQuestion(questionsWithAnswers[Math.floor(Math.random() * questionsWithAnswers.length)]);
    } else {
      const randomQuestion = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
      setCurrentQuestion(randomQuestion);
      setUsedQuestions([...usedQuestions, randomQuestion.question]);
    }
  };

  const correctAnswer = () => {
    setCurrentScore(currentScore + 1);
    getNewQuestion();
  };

  const skipQuestion = () => {
    getNewQuestion();
  };

  const finishTeamTurn = () => {
    const updatedTeams = teams.map(team => 
      team.id === currentTeam.id ? { ...team, score: team.score + currentScore } : team
    );
    setTeams(updatedTeams);

    if (currentTeamIndex < teams.length - 1) {
      setCurrentTeamIndex(currentTeamIndex + 1);
      setGamePhase('waiting');
    } else {
      setGamePhase('finished');
    }
  };

  const sortedTeams = [...teams].sort((a, b) => b.score - a.score);

  if (gamePhase === 'setup') {
    return (
      <InteractiveGameContainer onExit={onExit} title="Team-Quiz">
        <div className="max-w-md mx-auto space-y-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4 text-center">Spiel einrichten</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white mb-2">Zeit pro Team (Sekunden)</label>
                <Input
                  type="number"
                  min="30"
                  max="300"
                  value={timePerTeam}
                  onChange={(e) => setTimePerTeam(parseInt(e.target.value) || 60)}
                  className="bg-white/20 border-white/30 text-white"
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
                  <Button onClick={addTeam} variant="secondary">Hinzufügen</Button>
                </div>
              </div>
            </div>
          </div>

          {teams.length > 0 && (
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">Teams ({teams.length})</h3>
              <div className="space-y-2">
                {teams.map(team => (
                  <div key={team.id} className="flex items-center justify-between bg-white/10 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full ${
                        team.color === 'blue' ? 'bg-blue-500' :
                        team.color === 'red' ? 'bg-red-500' :
                        team.color === 'green' ? 'bg-green-500' :
                        'bg-purple-500'
                      }`}></div>
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

  if (gamePhase === 'waiting') {
    return (
      <InteractiveGameContainer onExit={onExit} title="Team-Quiz">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Team-Quiz</h2>
            
            <div className="bg-gradient-to-r from-primary to-accent rounded-lg p-6 mb-6">
              <h3 className="text-2xl font-bold text-white">{currentTeam?.name}</h3>
              <p className="text-white/90">ist als nächstes dran!</p>
            </div>
            
            <div className="bg-white/10 rounded-lg p-4 mb-6">
              <h4 className="text-white font-medium mb-2">Anleitung:</h4>
              <p className="text-white/80 text-sm mb-2">
                Ein Moderator aus einem anderen Team stellt die Fragen.
              </p>
              <p className="text-white/80 text-sm">
                Das Team hat {timePerTeam} Sekunden Zeit, um möglichst viele Fragen richtig zu beantworten.
              </p>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-medium text-white mb-3">Aktuelle Punktestände:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {teams.map((team) => (
                  <div key={team.id} className={`p-3 rounded-lg ${
                    team.id === currentTeam?.id ? 'bg-white/30' : 'bg-white/10'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${
                          team.color === 'blue' ? 'bg-blue-400' :
                          team.color === 'red' ? 'bg-red-400' :
                          team.color === 'green' ? 'bg-green-400' :
                          'bg-purple-400'
                        }`}></div>
                        <span className="text-white font-medium">{team.name}</span>
                      </div>
                      <span className="text-white font-bold">{team.score}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <Button 
              onClick={startTeamTurn}
              className="bg-white text-primary hover:bg-white/90 font-bold"
              size="lg"
            >
              <Play className="w-5 h-5 mr-2" />
              Timer starten für {currentTeam?.name}
            </Button>
          </div>
        </div>
      </InteractiveGameContainer>
    );
  }

  if (gamePhase === 'playing') {
    return (
      <InteractiveGameContainer onExit={onExit} title="Team-Quiz">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center">
            <div className={`text-6xl font-bold mb-4 ${timeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-white'}`}>
              {timeLeft}
            </div>
            <Clock className="w-8 h-8 text-white mx-auto" />
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center">
            <div className="bg-gradient-to-r from-primary to-accent rounded-lg p-4 mb-4">
              <h3 className="text-xl font-bold text-white">{currentTeam?.name}</h3>
              <div className="text-2xl font-bold text-white">{currentScore} Punkte</div>
            </div>
            
            <div className="bg-white/20 rounded-lg p-6 mb-6">
              <h2 className="text-lg text-white/80 mb-2">Frage:</h2>
              <p className="text-xl font-bold text-white mb-4">{currentQuestion?.question}</p>
              <div className="bg-green-500/20 rounded-lg p-4 border-2 border-green-400/30">
                <p className="text-lg text-green-300 font-semibold">
                  💡 Antwort: {currentQuestion?.answer}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Button 
                onClick={correctAnswer}
                className="bg-green-500 hover:bg-green-600 text-white"
                size="lg"
              >
                ✓ Richtig
              </Button>
              <Button 
                onClick={skipQuestion}
                className="bg-yellow-500 hover:bg-yellow-600 text-white"
                size="lg"
              >
                <SkipForward className="w-4 h-4 mr-1" />
                Überspringen
              </Button>
              <Button 
                onClick={finishTeamTurn}
                className="bg-red-500 hover:bg-red-600 text-white"
                size="lg"
              >
                Beenden
              </Button>
            </div>
          </div>
        </div>
      </InteractiveGameContainer>
    );
  }

  if (gamePhase === 'finished') {
    return (
      <InteractiveGameContainer onExit={onExit} title="Team-Quiz">
        <div className="max-w-md mx-auto text-center space-y-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-6">🎉 Endergebnis!</h2>
            
            <div className="space-y-3 mb-6">
              {sortedTeams.map((team, index) => (
                <div key={team.id} className={`p-4 rounded-lg ${
                  index === 0 ? 'bg-gradient-to-r from-yellow-500/30 to-amber-500/30 border border-yellow-400/50' : 'bg-white/10'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">
                        {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`}
                      </span>
                      <span className="text-white font-medium">{team.name}</span>
                    </div>
                    <span className="text-white font-bold text-xl">{team.score}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <Button onClick={onExit} className="w-full bg-white text-primary hover:bg-white/90" size="lg">
              Zurück zu den Regeln
            </Button>
          </div>
        </div>
      </InteractiveGameContainer>
    );
  }

  return null;
};