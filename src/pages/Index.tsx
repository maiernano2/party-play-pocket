import { useState, useRef, useMemo } from 'react';
import { Hero } from '@/components/Hero';
import { GameCard } from '@/components/GameCard';
import { GameFilter } from '@/components/GameFilter';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { games, getGamesByCategory } from '@/data/games';
import { useAnalytics } from '@/hooks/useAnalytics';
import { SEOContent } from '@/components/SEOContent';
import { Smartphone, Users, Clock, Heart } from 'lucide-react';

const Index = () => {
  const [activeFilter, setActiveFilter] = useState<'alle' | 'einzelspiel' | 'teamspiel'>('alle');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const gamesRef = useRef<HTMLElement>(null);
  const { trackEvent } = useAnalytics();

  const filteredGames = useMemo(() => getGamesByCategory(activeFilter), [activeFilter]);

  const scrollToGames = () => {
    trackEvent('scroll_to_games', { page_title: 'Homepage' });
    gamesRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  // SEO structured data for homepage
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Partyspiele Sammlung",
    "description": "Kostenlose mobile Partyspiele für Gruppen ohne zusätzliches Material",
    "numberOfItems": games.length,
    "itemListElement": games.map((game, index) => ({
      "@type": "Game",
      "position": index + 1,
      "name": game.title,
      "description": game.description,
      "url": `https://partyspiele.app/spiel/${game.id}`,
      "audience": {
        "@type": "PeopleAudience",
        "audienceType": "Gruppen von 3-12 Personen"
      }
    }))
  };

  return (
    <div className="min-h-screen bg-background">
      {/* SEO structured data */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Theme Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      
      {/* Hero Section */}
      <Hero onDiscoverGames={scrollToGames} />

      {/* Games Section */}
      <main>
        <section ref={gamesRef} data-games-section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <header className="text-center mb-12 fade-in">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Kostenlose <span className="gradient-text">Partyspiele</span> für deine Gruppe
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Entdecke 10 abwechslungsreiche mobile Partyspiele komplett ohne zusätzliches Material. 
                Perfekt für deine Geburtstage, Partys und geselligen Abende - einfach mit dem Handy spielen!
              </p>
            </header>

            {/* Filter */}
            <GameFilter 
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
            />

            {/* Games Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredGames.map((game, index) => (
                <article
                  key={game.id} 
                  className="fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <GameCard game={game} />
                </article>
              ))}
            </div>

            {filteredGames.length === 0 && (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground">
                  Keine Spiele in dieser Kategorie gefunden.
                </p>
              </div>
            )}
          </div>
        </section>

      {/* SEO Content with Streamer Keywords */}
      <SEOContent page="home" />

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-secondary/20 to-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-6 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              Mobile Partyspiele - die Vorteile
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Warum unsere Handy-Partyspiele die perfekte Wahl für deine nächste Feier sind
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center space-y-4">
              <div className="bg-primary/10 p-4 rounded-2xl w-fit mx-auto">
                <Smartphone className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Nur Handy nötig</h3>
              <p className="text-muted-foreground">Ein Smartphone reicht - kein zusätzliches Material oder Apps zum Download</p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="bg-accent/10 p-4 rounded-2xl w-fit mx-auto">
                <Users className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold">Große Gruppen</h3>
              <p className="text-muted-foreground">Spiele für 3-16 Personen - perfekt für jede Gruppengröße</p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="bg-team-blue/10 p-4 rounded-2xl w-fit mx-auto">
                <Clock className="w-8 h-8 text-team-blue" />
              </div>
              <h3 className="text-xl font-semibold">Sofort spielbar</h3>
              <p className="text-muted-foreground">Keine Vorbereitung oder Aufbau - direkt losspielen</p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="bg-team-green/10 p-4 rounded-2xl w-fit mx-auto">
                <Heart className="w-8 h-8 text-team-green" />
              </div>
              <h3 className="text-xl font-semibold">Kostenlos</h3>
              <p className="text-muted-foreground">Alle Spiele komplett gratis - keine versteckten Kosten</p>
            </div>
          </div>
        </div>
      </section>
      </main>

      {/* Beta Access Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-primary/5 to-accent/5 border-t">
        <div className="container mx-auto max-w-2xl text-center">
          <div className="space-y-6">
            <div className="space-y-3">
              <h2 className="text-2xl md:text-3xl font-bold">
                Früher Zugang zur <span className="gradient-text">Partyspiele-App</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Sei einer der Ersten, die unsere neue mobile App testen können. 
                Exklusive Features, Offline-Modus und noch mehr Spiele!
              </p>
            </div>
            
            <form 
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const email = formData.get('email') as string;
                trackEvent('beta_signup', { email, page_title: 'Homepage' });
                window.location.href = `mailto:beta@partyspiele.app?subject=Beta-Zugang angefordert&body=Hallo! Ich möchte gerne frühen Zugang zur Partyspiele-App. Meine E-Mail: ${email}`;
              }}
            >
              <input
                type="email"
                name="email"
                placeholder="deine@email.de"
                required
                className="flex-1 px-4 py-3 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
              />
              <Button type="submit" className="px-6 py-3 whitespace-nowrap">
                Beta-Zugang sichern
              </Button>
            </form>
            
            <p className="text-sm text-muted-foreground">
              🚀 Kostenlos • 📱 Früher Zugang • ✨ Exklusive Features
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 bg-card border border-border rounded-xl shadow-sm">
              <h3 className="font-bold text-lg mb-4 gradient-text">Partyspiele.app</h3>
              <p className="text-muted-foreground mb-4">
                Deine ultimative Sammlung mobiler Partyspiele für unvergessliche 
                Momente mit Freunden und Familie. 10 verschiedene Spiele mit 
                einzigartigen Spielmechaniken für jeden Anlass.
              </p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>✓ Interaktive Timer und Punktesysteme</p>
                <p>✓ Automatische Fragengenerierung</p>
                <p>✓ Anpassbare Schwierigkeitsgrade</p>
              </div>
            </div>
            <div className="p-8 bg-card border border-border rounded-xl shadow-sm">
              <h4 className="font-semibold mb-4">Feedback & Support</h4>
              <p className="text-muted-foreground text-sm mb-4">
                Hast du Verbesserungsvorschläge oder Fehler gefunden? Wir freuen uns über dein Feedback!
              </p>
              <form className="space-y-4" onSubmit={(e) => {
                e.preventDefault();
                trackEvent('feedback_submit', { rating, page_title: 'Homepage' });
                const formData = new FormData(e.target as HTMLFormElement);
                const message = formData.get('message') as string;
                const subject = `Feedback (${rating} Sterne) - Partyspiele.app`;
                window.location.href = `mailto:feedback@partyspiele.app?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
              }}>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Bewertung</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className="text-2xl transition-colors duration-200 focus:outline-none"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                      >
                        <span 
                          className={`${
                            star <= (hoverRating || rating) 
                              ? 'text-yellow-400' 
                              : 'text-gray-300 dark:text-gray-600'
                          }`}
                        >
                          ★
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
                <textarea
                  name="message"
                  placeholder="Deine Nachricht"
                  required
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary resize-none"
                ></textarea>
                <Button type="submit" className="w-full" disabled={rating === 0}>
                  Nachricht senden
                </Button>
              </form>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>Made with ❤️ in Mainz</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
