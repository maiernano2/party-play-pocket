import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { InteractiveGameContainer } from './InteractiveGameContainer';
import { Users, Trophy, Clock, Star } from 'lucide-react';

interface Team {
  id: string;
  name: string;
  color: string;
  score: number;
}

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  points: number;
}

interface InteractiveTeamQuizProps {
  onExit: () => void;
}

const quizQuestions: Question[] = [
  {
    question: "Wie viele Kontinente gibt es?",
    options: ["5", "6", "7", "8"],
    correctAnswer: 2,
    points: 1
  },
  {
    question: "Welcher Planet ist der Sonne am nächsten?",
    options: ["Venus", "Merkur", "Erde", "Mars"],
    correctAnswer: 1,
    points: 1
  },
  {
    question: "In welchem Jahr fiel die Berliner Mauer?",
    options: ["1987", "1988", "1989", "1990"],
    correctAnswer: 2,
    points: 2
  },
  {
    question: "Wie viele Herzen hat ein Oktopus?",
    options: ["1", "2", "3", "4"],
    correctAnswer: 2,
    points: 2
  },
  {
    question: "Welches ist das größte Säugetier der Welt?",
    options: ["Elefant", "Blauwal", "Giraffe", "Nashorn"],
    correctAnswer: 1,
    points: 1
  },
  {
    question: "Wer schrieb 'Romeo und Julia'?",
    options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
    correctAnswer: 1,
    points: 2
  },
  {
    question: "Wie viele Knochen hat ein erwachsener Mensch etwa?",
    options: ["156", "186", "206", "236"],
    correctAnswer: 2,
    points: 3
  },
  {
    question: "Welcher Fluss ist der längste der Welt?",
    options: ["Amazonas", "Nil", "Mississippi", "Jangtse"],
    correctAnswer: 1,
    points: 2
  }
];

const teamColors = ['bg-blue-500', 'bg-red-500', 'bg-green-500', 'bg-purple-500'];

export const InteractiveTeamQuiz = ({ onExit }: InteractiveTeamQuizProps) => {
  const [gamePhase, setGamePhase] = useState<'setup' | 'playing' | 'answering' | 'results' | 'finished'>('setup');
  const [teams, setTeams] = useState<Team[]>([]);
  const [newTeamName, setNewTeamName] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [teamAnswers, setTeamAnswers] = useState<{[teamId: string]: number}>({});
  const [maxQuestions, setMaxQuestions] = useState(5);

  const currentQuestion = quizQuestions[currentQuestionIndex];

  useEffect(() => {
    if (gamePhase === 'answering' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gamePhase === 'answering') {
      setGamePhase('results');
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
      setCurrentQuestionIndex(0);
      setGamePhase('playing');
    }
  };

  const startQuestion = () => {
    setTeamAnswers({});
    setTimeLeft(30);
    setGamePhase('answering');
  };

  const submitAnswer = (teamId: string, answerIndex: number) => {
    setTeamAnswers({...teamAnswers, [teamId]: answerIndex});
  };

  const showResults = () => {
    setGamePhase('results');
  };

  const nextQuestion = () => {
    // Punkte vergeben
    const updatedTeams = teams.map(team => {
      if (teamAnswers[team.id] === currentQuestion.correctAnswer) {
        return { ...team, score: team.score + currentQuestion.points };
      }
      return team;
    });
    setTeams(updatedTeams);

    // Nächste Frage oder Spielende
    if (currentQuestionIndex + 1 >= maxQuestions) {
      setGamePhase('finished');
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setGamePhase('playing');
    }
  };

  const gameWinners = teams.length > 0 ? teams.filter(t => t.score === Math.max(...teams.map(t => t.score))) : [];

  if (gamePhase === 'setup') {
    return (
      <InteractiveGameContainer onExit={onExit} title="Team-Quiz">
        <div className="max-w-md mx-auto space-y-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4 text-center">Teams einrichten</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white mb-2">Anzahl Fragen</label>
                <Input
                  type="number"
                  value={maxQuestions}
                  onChange={(e) => setMaxQuestions(Number(e.target.value))}
                  min="3"
                  max="8"
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
                    onKeyPress={(e) => e.key === 'Enter' && addTeam()}
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
                  Quiz starten
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

  if (gamePhase === 'playing') {
    return (
      <InteractiveGameContainer onExit={onExit} title="Team-Quiz">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center">
            <div className="bg-white/20 rounded-full px-4 py-2 inline-block mb-4">
              <span className="text-white font-bold">Frage {currentQuestionIndex + 1}/{maxQuestions}</span>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h2 className="text-xl font-bold text-white mb-4 text-center">Nächste Frage</h2>
            <div className="bg-gradient-to-r from-primary to-accent rounded-lg p-6 mb-6">
              <p className="text-lg font-medium text-white text-center">{currentQuestion.question}</p>
            </div>
            
            <div className="text-center mb-6">
              <span className="bg-white/20 rounded-full px-3 py-1 text-white text-sm">
                {currentQuestion.points} Punkt{currentQuestion.points > 1 ? 'e' : ''}
              </span>
            </div>

            <Button 
              onClick={startQuestion}
              className="w-full bg-white text-primary hover:bg-white/90"
              size="lg"
            >
              Frage zeigen & Timer starten
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

  if (gamePhase === 'answering') {
    return (
      <InteractiveGameContainer onExit={onExit} title="Team-Quiz">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="bg-white/20 rounded-full px-4 py-2">
                <span className="text-white font-bold">Frage {currentQuestionIndex + 1}/{maxQuestions}</span>
              </div>
              <div className="bg-white/20 rounded-full px-4 py-2 flex items-center gap-2">
                <Clock className="w-4 h-4 text-white" />
                <span className={`font-bold ${timeLeft <= 10 ? 'text-red-400' : 'text-white'}`}>{timeLeft}s</span>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <p className="text-lg font-medium text-white text-center mb-6">{currentQuestion.question}</p>
            
            <div className="grid grid-cols-1 gap-3 mb-6">
              {currentQuestion.options.map((option, index) => (
                <div key={index} className="bg-white/10 rounded-lg p-4 text-center">
                  <span className="text-white font-medium">{String.fromCharCode(65 + index)}) {option}</span>
                </div>
              ))}
            </div>

            <div className="text-center">
              <span className="bg-white/20 rounded-full px-3 py-1 text-white text-sm">
                {currentQuestion.points} Punkt{currentQuestion.points > 1 ? 'e' : ''}
              </span>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 className="text-lg font-bold text-white mb-4 text-center">Team-Antworten</h3>
            <div className="space-y-3">
              {teams.map(team => (
                <div key={team.id} className="bg-white/10 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${team.color}`}></div>
                      <span className="text-white font-medium">{team.name}</span>
                    </div>
                    <span className="text-white/70 text-sm">
                      {teamAnswers[team.id] !== undefined ? 
                        `Antwort: ${String.fromCharCode(65 + teamAnswers[team.id])}` : 
                        'Noch keine Antwort'
                      }
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {currentQuestion.options.map((_, index) => (
                      <Button
                        key={index}
                        onClick={() => submitAnswer(team.id, index)}
                        variant={teamAnswers[team.id] === index ? "default" : "secondary"}
                        size="sm"
                        className="text-xs"
                      >
                        {String.fromCharCode(65 + index)}
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <Button 
              onClick={showResults}
              className="w-full mt-4 bg-white text-primary hover:bg-white/90"
              size="lg"
            >
              Auflösung zeigen
            </Button>
          </div>
        </div>
      </InteractiveGameContainer>
    );
  }

  if (gamePhase === 'results') {
    return (
      <InteractiveGameContainer onExit={onExit} title="Team-Quiz">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h2 className="text-xl font-bold text-white mb-4 text-center">Auflösung</h2>
            
            <div className="bg-white/20 rounded-lg p-4 mb-6 text-center">
              <p className="text-white font-medium mb-2">{currentQuestion.question}</p>
              <p className="text-lg font-bold text-green-400">
                Richtige Antwort: {String.fromCharCode(65 + currentQuestion.correctAnswer)}) {currentQuestion.options[currentQuestion.correctAnswer]}
              </p>
            </div>

            <div className="space-y-3 mb-6">
              {teams.map(team => {
                const isCorrect = teamAnswers[team.id] === currentQuestion.correctAnswer;
                return (
                  <div key={team.id} className={`rounded-lg p-4 ${isCorrect ? 'bg-green-500/20 border border-green-500/50' : 'bg-white/10'}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${team.color}`}></div>
                        <span className="text-white font-medium">{team.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-white/70 text-sm">
                          {teamAnswers[team.id] !== undefined ? 
                            String.fromCharCode(65 + teamAnswers[team.id]) : 
                            'Keine Antwort'
                          }
                        </span>
                        {isCorrect && <span className="text-green-400 font-bold">+{currentQuestion.points}</span>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <Button
              onClick={nextQuestion}
              className="w-full bg-white text-primary hover:bg-white/90"
              size="lg"
            >
              {currentQuestionIndex + 1 >= maxQuestions ? 'Spiel beenden' : 'Nächste Frage'}
            </Button>
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
            <h2 className="text-3xl font-bold text-white mb-2">🎉 Gewinner!</h2>
            
            <div className="space-y-2 mb-6">
              {gameWinners.map(winner => (
                <div key={winner.id} className="flex items-center justify-center gap-2">
                  <div className={`w-4 h-4 rounded-full ${winner.color}`}></div>
                  <p className="text-xl text-white">{winner.name}</p>
                </div>
              ))}
              <p className="text-white/80 text-sm">
                {Math.max(...teams.map(t => t.score))} Punkte
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
                        <span>{team.score} Punkte</span>
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