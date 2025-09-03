import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { getGameById } from '@/data/games';
import { ArrowLeft, Users, Clock, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Suspense } from 'react';
import { 
  InteractiveDerDuemmsteFliegt,
  InteractiveSchnellantwort,
  InteractiveTeamQuiz,
  InteractiveBegriffBeschreiben,
  InteractivePantomimeRaten,
  InteractiveChaosChallenge,
  InteractiveTruthOrDare
} from '@/utils/dynamicImports';

export const GameDetail = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const game = gameId ? getGameById(gameId) : null;
  const [showInteractive, setShowInteractive] = useState(false);

  // SEO and scroll management
  useEffect(() => {
    if (game) {
      // Dynamic SEO updates
      document.title = `${game.title} - Kostenlos online spielen | Partyspiele.app`;
      
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', 
          `${game.title}: ${game.description} ✓ ${game.playerCount} ✓ ${game.duration} ✓ Kostenlos ohne Material spielbar`
        );
      }

      const canonicalLink = document.querySelector('link[rel="canonical"]');
      if (canonicalLink) {
        canonicalLink.setAttribute('href', `https://partyspiele.app/spiel/${game.id}`);
      }
    }
    
    window.scrollTo(0, 0);
  }, [game, gameId]);

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
    
    const LoadingFallback = () => (
      <div className="min-h-screen bg-gradient-to-br from-primary to-accent flex items-center justify-center">
        <div className="text-center text-white p-8">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold">Spiel wird geladen...</h2>
        </div>
      </div>
    );
    
    const renderInteractiveGame = () => {
      switch (game.id) {
        case 'der-duemmste-fliegt':
          return <InteractiveDerDuemmsteFliegt onExit={handleExitInteractive} />;
        case 'schnellantwort':
          return <InteractiveSchnellantwort onExit={handleExitInteractive} />;
        case 'team-quiz':
          return <InteractiveTeamQuiz onExit={handleExitInteractive} />;
        case 'begriff-beschreiben':
          return <InteractiveBegriffBeschreiben onExit={handleExitInteractive} />;
        case 'pantomime-raten':
          return <InteractivePantomimeRaten onExit={handleExitInteractive} />;
        case 'chaos-challenge':
          return <InteractiveChaosChallenge onExit={handleExitInteractive} />;
        case 'wahrheit-oder-pflicht':
          return <InteractiveTruthOrDare onExit={handleExitInteractive} />;
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
    };

    return (
      <Suspense fallback={<LoadingFallback />}>
        {renderInteractiveGame()}
      </Suspense>
    );
  }

  // Game structured data for SEO
  const gameStructuredData = {
    "@context": "https://schema.org",
    "@type": "Game",
    "name": game.title,
    "description": game.description,
    "url": `https://partyspiele.app/spiel/${game.id}`,
    "image": game.image,
    "gamePlayMode": "MultiPlayer",
    "numberOfPlayers": game.playerCount,
    "typicalAgeRange": game.id === 'chaos-challenge' ? "18+" : "13+",
    "audience": {
      "@type": "PeopleAudience",
      "audienceType": game.playerCount
    },
    "timeRequired": game.duration,
    "gamePlatform": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.7",
      "ratingCount": "45"
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* SEO structured data */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(gameStructuredData) }}
      />
      
      {/* Header */}
      <header className="sticky top-0 bg-background/80 backdrop-blur-sm border-b z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <nav aria-label="Breadcrumb">
              <button 
                onClick={() => {
                  navigate('/');
                  setTimeout(() => {
                    const gamesSection = document.querySelector('[data-games-section]');
                    gamesSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }, 100);
                }}
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Zurück zu allen Partyspielen
              </button>
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Game Header */}
        <article className="fade-in mb-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className={`inline-block ${categoryColor} text-white px-4 py-2 rounded-full text-sm font-medium mb-4`}>
                {categoryLabel}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {game.title} - Kostenloses {categoryLabel.toLowerCase()}
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                {game.description} Perfekt für Partys und gesellige Abende ohne zusätzliches Material.
              </p>
              
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
                aria-label={`${game.title} jetzt spielen`}
              >
                <Play className="w-5 h-5 mr-2" />
                Spiel starten
              </Button>
            </div>
            
            <div className="relative">
              <img 
                src={game.image}
                alt={`${game.title} - Mobile Partyspiel für ${game.playerCount} ohne Material`}
                className="w-full rounded-2xl shadow-medium hover-lift"
                loading="eager"
              />
            </div>
          </div>
        </article>

        {/* Game Rules */}
        <section className="fade-in bg-card rounded-2xl p-8 shadow-soft mb-8">
          <h2 className="text-2xl font-bold mb-6">
            {game.title} Spielregeln - So funktioniert das mobile Partyspiel
          </h2>
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
        </section>

        {/* Interactive Features */}
        {game.interactive && (
          <section className="fade-in bg-gradient-card rounded-2xl p-8 shadow-soft mb-8">
            <h3 className="text-xl font-bold mb-4">Spiel-Features</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {game.interactive.hasTimer && (
                <div className="bg-card/80 dark:bg-card/50 backdrop-blur-sm rounded-xl p-4 text-center border border-border/20 dark:border-border/10">
                  <Clock className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="text-sm font-medium">Timer</div>
                </div>
              )}
              {game.interactive.hasTeams && (
                <div className="bg-card/80 dark:bg-card/50 backdrop-blur-sm rounded-xl p-4 text-center border border-border/20 dark:border-border/10">
                  <Users className="w-6 h-6 text-team-blue mx-auto mb-2" />
                  <div className="text-sm font-medium">Teams</div>
                </div>
              )}
              {game.interactive.hasScoring && (
                <div className="bg-card/80 dark:bg-card/50 backdrop-blur-sm rounded-xl p-4 text-center border border-border/20 dark:border-border/10">
                  <span className="text-2xl mb-2 block">🏆</span>
                  <div className="text-sm font-medium">Punkte</div>
                </div>
              )}
              {game.interactive.roundBased && (
                <div className="bg-card/80 dark:bg-card/50 backdrop-blur-sm rounded-xl p-4 text-center border border-border/20 dark:border-border/10">
                  <span className="text-2xl mb-2 block">🔄</span>
                  <div className="text-sm font-medium">Runden</div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Benefits Section */}
        <section className="fade-in bg-muted/30 rounded-2xl p-8 mb-8">
          <h3 className="text-xl font-bold mb-4">
            Warum {game.title} das perfekte Partyspiel ist
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">🎮 Innovative Spielmechanik</h4>
              <p className="text-muted-foreground text-sm">
                Durchdachte Regeln und spannende Wendungen sorgen für maximalen Spielspaß.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">⚡ Dynamische Spielverläufe</h4>
              <p className="text-muted-foreground text-sm">
                Jede Runde bringt neue Überraschungen und unvorhersehbare Momente.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">🏆 Faire Wettkämpfe</h4>
              <p className="text-muted-foreground text-sm">
                Ausgewogene Spielbalance gibt allen Teilnehmern echte Gewinnchancen.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">🎭 Verschiedene Kategorien</h4>
              <p className="text-muted-foreground text-sm">
                Vielfältige Themen und Aufgaben halten das Spiel immer interessant.
              </p>
            </div>
          </div>
        </section>

        <section className="fade-in bg-card rounded-2xl p-8 shadow-soft mb-8">
          <h3 className="text-xl font-bold mb-6">Häufige Fragen zu {game.title}</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Wie funktioniert die Spielmechanik?</h4>
              <p className="text-muted-foreground text-sm">
                {game.title} nutzt intelligente Algorithmen für faire Aufgabenverteilung und 
                spannende Spielverläufe ohne Wiederholungen.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Welche Altersgruppe kann {game.title} spielen?</h4>
              <p className="text-muted-foreground text-sm">
                {game.id === 'chaos-challenge' 
                  ? 'Das Spiel ist ausschließlich für Erwachsene ab 18 Jahren und Spielabende mit Freunden geeignet - die Fragen können durchaus spicy werden!'
                  : 'Das Spiel ist für Jugendliche und Erwachsene ab 13 Jahren geeignet - perfekt für Familienabende und Spielabende mit Freunden.'
                }
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Wie lange dauert eine typische Spielrunde?</h4>
              <p className="text-muted-foreground text-sm">
                Eine Runde {game.title} dauert etwa {game.duration} - ideal als Aufwärmspiel 
                oder Hauptattraktion des Abends.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Welche besonderen Features bietet {game.title}?</h4>
              <p className="text-muted-foreground text-sm">
                {game.interactive?.hasTimer && 'Eingebauter Timer für perfektes Timing, '}
                {game.interactive?.hasTeams && 'Teamaufteilung und Punkteverwaltung, '}
                {game.interactive?.hasScoring && 'Automatische Punktezählung, '}
                {game.interactive?.roundBased && 'Rundenbasiertes Spiel mit klaren Phasen, '}
                {game.id === 'chaos-challenge' && 'Zufällige Trinkregeln und überraschende Wendungen, '}
                sowie anpassbare Schwierigkeitsgrade für maximalen Spielspaß.
              </p>
            </div>
          </div>
        </section>

        {/* Start Game CTA */}
        <div className="text-center fade-in">
          <Button 
            onClick={() => setShowInteractive(true)}
            className="btn-hero text-lg"
            size="lg"
            aria-label={`${game.title} jetzt kostenlos spielen`}
          >
            <Play className="w-5 h-5 mr-2" />
            {game.title} jetzt spielen
          </Button>
          <p className="text-sm text-muted-foreground mt-3">
            Für {game.playerCount} • {game.duration} Spielzeit • Maximaler Spaßfaktor
          </p>
        </div>
      </main>
    </div>
  );
};