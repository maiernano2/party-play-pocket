import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { getGameById } from '@/data/games';
import { ArrowLeft, Users, Clock, Play } from 'lucide-react';
import { useState } from 'react';
import { InteractiveDerDuemmsteFliegt } from '@/components/interactive/InteractiveDerDuemmsteFliegt';
import { InteractiveSchnellantwort } from '@/components/interactive/InteractiveSchnellantwort';
import { InteractiveMimikMaster } from '@/components/interactive/InteractiveMimikMaster';
import { InteractiveTeamQuiz } from '@/components/interactive/InteractiveTeamQuiz';
import { InteractiveBegriffBeschreiben } from '@/components/interactive/InteractiveBegriffBeschreiben';
import { InteractivePantomimeRaten } from '@/components/interactive/InteractivePantomimeRaten';
import { InteractiveChaosChallenge } from '@/components/interactive/InteractiveChaosChallenge';

export const GameDetail = () => {
  const { gameId } = useParams();
  const game = gameId ? getGameById(gameId) : null;
  const [showInteractive, setShowInteractive] = useState(false);

  if (!game) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Spiel nicht gefunden</h1>
          <Link to="/">
            <Button variant="secondary">Zurück zur Startseite</Button>
          </Link>
        </div>
      </div>
    );
  }

  const categoryLabel = game.category === 'einzelspiel' ? 'Einzelspiel' : 'Teamspiel';
  const categoryColor = game.category === 'einzelspiel' ? 'bg-accent' : 'bg-team-blue';

  if (showInteractive) {
    const handleExitInteractive = () => setShowInteractive(false);
    
    switch (game.id) {
      case 'der-duemmste-fliegt':
        return <InteractiveDerDuemmsteFliegt onExit={handleExitInteractive} />;
      case 'schnellantwort':
        return <InteractiveSchnellantwort onExit={handleExitInteractive} />;
      case 'mimik-master':
        return <InteractiveMimikMaster onExit={handleExitInteractive} />;
      case 'team-quiz':
        return <InteractiveTeamQuiz onExit={handleExitInteractive} />;
      case 'begriff-beschreiben':
        return <InteractiveBegriffBeschreiben onExit={handleExitInteractive} />;
      case 'pantomime-raten':
        return <InteractivePantomimeRaten onExit={handleExitInteractive} />;
      case 'chaos-challenge':
        return <InteractiveChaosChallenge onExit={handleExitInteractive} />;
      default:
        return (
          <div className="min-h-screen bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <div className="text-center text-white p-8">
              <h2 className="text-3xl font-bold mb-4">Interaktiver Modus</h2>
              <p className="text-xl mb-8">Dieses Spiel hat noch keinen interaktiven Modus.</p>
              <Button 
                onClick={handleExitInteractive}
                variant="secondary"
                className="mr-4"
              >
                Zurück zu den Regeln
              </Button>
            </div>
          </div>
        );
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 bg-background/80 backdrop-blur-sm border-b z-10">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Zurück zu allen Spielen
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Game Header */}
        <div className="fade-in mb-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className={`inline-block ${categoryColor} text-white px-4 py-2 rounded-full text-sm font-medium mb-4`}>
                {categoryLabel}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{game.title}</h1>
              <p className="text-xl text-muted-foreground mb-6">{game.description}</p>
              
              <div className="flex flex-wrap gap-6 mb-6">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="w-5 h-5" />
                  <span className="font-medium">{game.playerCount}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-5 h-5" />
                  <span className="font-medium">{game.duration}</span>
                </div>
              </div>
              
              <Button 
                onClick={() => setShowInteractive(true)}
                className="btn-hero text-lg mb-6"
                size="lg"
              >
                <Play className="w-5 h-5 mr-2" />
                Spiel starten
              </Button>
            </div>
            
            <div className="relative">
              <img 
                src={game.image}
                alt={`${game.title} Spielbild`}
                className="w-full rounded-2xl shadow-medium hover-lift"
              />
            </div>
          </div>
        </div>

        {/* Game Rules */}
        <div className="fade-in bg-card rounded-2xl p-8 shadow-soft mb-8">
          <h2 className="text-2xl font-bold mb-6">Spielregeln</h2>
          <div className="space-y-4">
            {game.rules.map((rule, index) => (
              <div key={index} className="flex gap-4">
                <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
                  {index + 1}
                </div>
                <p className="text-muted-foreground leading-relaxed">{rule}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Features */}
        {game.interactive && (
          <div className="fade-in bg-gradient-card rounded-2xl p-8 shadow-soft mb-8">
            <h3 className="text-xl font-bold mb-4">Features</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {game.interactive.hasTimer && (
                <div className="bg-white/80 rounded-xl p-4 text-center">
                  <Clock className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="text-sm font-medium">Timer</div>
                </div>
              )}
              {game.interactive.hasTeams && (
                <div className="bg-white/80 rounded-xl p-4 text-center">
                  <Users className="w-6 h-6 text-team-blue mx-auto mb-2" />
                  <div className="text-sm font-medium">Teams</div>
                </div>
              )}
              {game.interactive.hasScoring && (
                <div className="bg-white/80 rounded-xl p-4 text-center">
                  <span className="text-2xl mb-2 block">🏆</span>
                  <div className="text-sm font-medium">Punkte</div>
                </div>
              )}
              {game.interactive.roundBased && (
                <div className="bg-white/80 rounded-xl p-4 text-center">
                  <span className="text-2xl mb-2 block">🔄</span>
                  <div className="text-sm font-medium">Runden</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Start Game CTA */}
        <div className="text-center fade-in">
          <Button 
            onClick={() => setShowInteractive(true)}
            className="btn-hero text-lg"
            size="lg"
          >
            <Play className="w-5 h-5 mr-2" />
            Spiel starten
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Interaktiver Modus mit automatischer Moderation
          </p>
        </div>
      </main>
    </div>
  );
};