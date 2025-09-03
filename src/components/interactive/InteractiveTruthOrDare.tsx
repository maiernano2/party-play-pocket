import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Users, X, Heart, Zap } from 'lucide-react';
import { InteractiveGameContainer } from './InteractiveGameContainer';
import { getRandomTruth, getRandomDare } from '@/data/truth-dare-data';

interface Player {
  id: string;
  name: string;
}

type GameMode = 'truth' | 'dare' | 'both';
type Intensity = 'zahm' | 'mittel' | 'wild';
type GamePhase = 'setup' | 'mode-select' | 'intensity-select' | 'playing';

interface InteractiveTruthOrDareProps {
  onExit: () => void;
}

export const InteractiveTruthOrDare = ({ onExit }: InteractiveTruthOrDareProps) => {
  const [gamePhase, setGamePhase] = useState<GamePhase>('setup');
  const [players, setPlayers] = useState<Player[]>([]);
  const [gameMode, setGameMode] = useState<GameMode>('both');
  const [intensity, setIntensity] = useState<Intensity>('mittel');
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [currentTask, setCurrentTask] = useState<string>('');
  const [currentType, setCurrentType] = useState<'truth' | 'dare'>('truth');
  const [newPlayerName, setNewPlayerName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (gamePhase === 'setup' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [gamePhase]);

  const addPlayer = () => {
    if (newPlayerName.trim() && players.length < 12) {
      const newPlayer: Player = {
        id: Date.now().toString(),
        name: newPlayerName.trim()
      };
      setPlayers([...players, newPlayer]);
      setNewPlayerName('');
      inputRef.current?.focus();
    }
  };

  const removePlayer = (playerId: string) => {
    setPlayers(players.filter(p => p.id !== playerId));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addPlayer();
    }
  };

  const proceedToModeSelect = () => {
    if (players.length >= 2) {
      setGamePhase('mode-select');
    }
  };

  const proceedToIntensitySelect = () => {
    setGamePhase('intensity-select');
  };

  const startGame = () => {
    setGamePhase('playing');
    generateTask();
  };

  const generateTask = () => {
    let taskType: 'truth' | 'dare';
    
    if (gameMode === 'truth') {
      taskType = 'truth';
    } else if (gameMode === 'dare') {
      taskType = 'dare';
    } else {
      taskType = Math.random() > 0.5 ? 'truth' : 'dare';
    }

    const task = taskType === 'truth' 
      ? getRandomTruth(intensity)
      : getRandomDare(intensity);

    setCurrentTask(task);
    setCurrentType(taskType);
  };

  const nextPlayer = () => {
    setCurrentPlayerIndex((prev) => (prev + 1) % players.length);
    generateTask();
  };

  const renderSetup = () => (
    <div className="max-w-2xl mx-auto text-center text-white">
      <div className="mb-8">
        <Heart className="w-16 h-16 mx-auto mb-4 text-red-300" />
        <h2 className="text-4xl font-bold mb-4">Wahrheit oder Pflicht</h2>
        <p className="text-xl text-white/80">
          Füge Spieler hinzu (mindestens 2)
        </p>
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
        <div className="flex gap-3 mb-6">
          <Input
            ref={inputRef}
            type="text"
            placeholder="Spielername eingeben..."
            value={newPlayerName}
            onChange={(e) => setNewPlayerName(e.target.value)}
            onKeyPress={handleKeyPress}
            className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
            maxLength={20}
          />
          <Button
            onClick={addPlayer}
            disabled={!newPlayerName.trim() || players.length >= 12}
            className="bg-white/20 hover:bg-white/30 text-white border border-white/30"
          >
            Hinzufügen
          </Button>
        </div>

        {players.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {players.map((player) => (
              <div
                key={player.id}
                className="flex items-center justify-between bg-white/10 rounded-lg p-3"
              >
                <span className="font-medium">{player.name}</span>
                <button
                  onClick={() => removePlayer(player.id)}
                  className="text-red-300 hover:text-red-200 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2 text-white/60 mb-6">
          <Users className="w-5 h-5" />
          <span>{players.length} von 12 Spielern</span>
        </div>

        <Button
          onClick={proceedToModeSelect}
          disabled={players.length < 2}
          className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-8 py-3 text-lg font-semibold"
        >
          Weiter
        </Button>
      </div>
    </div>
  );

  const renderModeSelect = () => (
    <div className="max-w-2xl mx-auto text-center text-white">
      <div className="mb-8">
        <Heart className="w-16 h-16 mx-auto mb-4 text-red-300" />
        <h2 className="text-4xl font-bold mb-4">Spielmodus wählen</h2>
        <p className="text-xl text-white/80">
          Was möchtet ihr spielen?
        </p>
      </div>

      <div className="grid gap-6 mb-8">
        <button
          onClick={() => setGameMode('truth')}
          className={`p-6 rounded-2xl border-2 transition-all ${
            gameMode === 'truth'
              ? 'border-blue-400 bg-blue-500/20'
              : 'border-white/30 bg-white/10 hover:bg-white/20'
          }`}
        >
          <div className="text-center">
            <div className="text-4xl mb-3">💭</div>
            <h3 className="text-xl font-bold mb-2">Nur Wahrheit</h3>
            <p className="text-white/70">Nur Wahrheitsfragen</p>
          </div>
        </button>

        <button
          onClick={() => setGameMode('dare')}
          className={`p-6 rounded-2xl border-2 transition-all ${
            gameMode === 'dare'
              ? 'border-red-400 bg-red-500/20'
              : 'border-white/30 bg-white/10 hover:bg-white/20'
          }`}
        >
          <div className="text-center">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="text-xl font-bold mb-2">Nur Pflicht</h3>
            <p className="text-white/70">Nur Pflichtaufgaben</p>
          </div>
        </button>

        <button
          onClick={() => setGameMode('both')}
          className={`p-6 rounded-2xl border-2 transition-all ${
            gameMode === 'both'
              ? 'border-purple-400 bg-purple-500/20'
              : 'border-white/30 bg-white/10 hover:bg-white/20'
          }`}
        >
          <div className="text-center">
            <div className="text-4xl mb-3">🎭</div>
            <h3 className="text-xl font-bold mb-2">Wahrheit oder Pflicht</h3>
            <p className="text-white/70">Zufällige Mischung</p>
          </div>
        </button>
      </div>

      <Button
        onClick={proceedToIntensitySelect}
        className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-8 py-3 text-lg font-semibold"
      >
        Weiter
      </Button>
    </div>
  );

  const renderIntensitySelect = () => (
    <div className="max-w-2xl mx-auto text-center text-white">
      <div className="mb-8">
        <Zap className="w-16 h-16 mx-auto mb-4 text-yellow-300" />
        <h2 className="text-4xl font-bold mb-4">Intensität wählen</h2>
        <p className="text-xl text-white/80">
          Wie wild soll es werden?
        </p>
      </div>

      <div className="grid gap-6 mb-8">
        <button
          onClick={() => setIntensity('zahm')}
          className={`p-6 rounded-2xl border-2 transition-all ${
            intensity === 'zahm'
              ? 'border-green-400 bg-green-500/20'
              : 'border-white/30 bg-white/10 hover:bg-white/20'
          }`}
        >
          <div className="text-center">
            <div className="text-4xl mb-3">😊</div>
            <h3 className="text-xl font-bold mb-2">Zahm</h3>
            <p className="text-white/70">Harmlose Fragen und Aufgaben</p>
          </div>
        </button>

        <button
          onClick={() => setIntensity('mittel')}
          className={`p-6 rounded-2xl border-2 transition-all ${
            intensity === 'mittel'
              ? 'border-orange-400 bg-orange-500/20'
              : 'border-white/30 bg-white/10 hover:bg-white/20'
          }`}
        >
          <div className="text-center">
            <div className="text-4xl mb-3">😏</div>
            <h3 className="text-xl font-bold mb-2">Mittel</h3>
            <p className="text-white/70">Etwas gewagter und persönlicher</p>
          </div>
        </button>

        <button
          onClick={() => setIntensity('wild')}
          className={`p-6 rounded-2xl border-2 transition-all ${
            intensity === 'wild'
              ? 'border-red-400 bg-red-500/20'
              : 'border-white/30 bg-white/10 hover:bg-white/20'
          }`}
        >
          <div className="text-center">
            <div className="text-4xl mb-3">🔥</div>
            <h3 className="text-xl font-bold mb-2">Wild</h3>
            <p className="text-white/70">Nur für mutige Erwachsene!</p>
          </div>
        </button>
      </div>

      <Button
        onClick={startGame}
        className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-8 py-3 text-lg font-semibold"
      >
        Spiel starten
      </Button>
    </div>
  );

  const renderPlaying = () => {
    const currentPlayer = players[currentPlayerIndex];
    
    return (
      <div className="max-w-2xl mx-auto text-center text-white">
        <div className="mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
            <h3 className="text-xl font-semibold mb-2">Spieler am Zug</h3>
            <div className="text-3xl font-bold text-yellow-300">
              {currentPlayer.name}
            </div>
          </div>

          <div className={`inline-block px-6 py-3 rounded-full text-lg font-bold mb-6 ${
            currentType === 'truth' 
              ? 'bg-blue-500/20 text-blue-300 border border-blue-400'
              : 'bg-red-500/20 text-red-300 border border-red-400'
          }`}>
            {currentType === 'truth' ? '💭 Wahrheit' : '⚡ Pflicht'}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
          <div className="text-xl leading-relaxed">
            {currentTask}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={generateTask}
            variant="outline"
            className="flex-1 bg-white/10 border-white/30 text-white hover:bg-white/20"
          >
            Neue Aufgabe
          </Button>
          <Button
            onClick={nextPlayer}
            className="flex-1 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white"
          >
            Nächster Spieler
          </Button>
        </div>

        <div className="mt-6 text-white/60">
          Spieler {currentPlayerIndex + 1} von {players.length}
        </div>
      </div>
    );
  };

  const renderCurrentPhase = () => {
    switch (gamePhase) {
      case 'setup':
        return renderSetup();
      case 'mode-select':
        return renderModeSelect();
      case 'intensity-select':
        return renderIntensitySelect();
      case 'playing':
        return renderPlaying();
      default:
        return renderSetup();
    }
  };

  return (
    <InteractiveGameContainer onExit={onExit} title="Wahrheit oder Pflicht">
      {renderCurrentPhase()}
    </InteractiveGameContainer>
  );
};