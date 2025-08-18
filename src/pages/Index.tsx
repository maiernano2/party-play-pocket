import { useState, useRef } from 'react';
import { Hero } from '@/components/Hero';
import { GameCard } from '@/components/GameCard';
import { GameFilter } from '@/components/GameFilter';
import { Button } from '@/components/ui/button';
import { games, getGamesByCategory } from '@/data/games';

const Index = () => {
  const [activeFilter, setActiveFilter] = useState<'alle' | 'einzelspiel' | 'teamspiel'>('alle');
  const gamesRef = useRef<HTMLElement>(null);

  const filteredGames = getGamesByCategory(activeFilter);

  const scrollToGames = () => {
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
      
      {/* Hero Section */}
      <Hero onDiscoverGames={scrollToGames} />

      {/* Games Section */}
      <main>
        <section ref={gamesRef} data-games-section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <header className="text-center mb-12 fade-in">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Kostenlose <span className="gradient-text">Partyspiele</span> für Gruppen
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Entdecke über 6 verschiedene mobile Partyspiele ohne zusätzliches Material. 
                Perfekt für Geburtstage, Partys und gesellige Abende - nur mit dem Handy spielbar!
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

        {/* Benefits Section */}
        <section className="py-16 px-4 bg-background">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              Warum unsere <span className="gradient-text">mobilen Partyspiele</span>?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-card p-6 rounded-xl">
                <h3 className="font-semibold text-lg mb-3">🎯 Sofort spielbereit</h3>
                <p className="text-muted-foreground">
                  Keine Downloads, keine Registrierung - einfach Website öffnen und losspielen!
                </p>
              </div>
              <div className="bg-card p-6 rounded-xl">
                <h3 className="font-semibold text-lg mb-3">📱 Nur Handy benötigt</h3>
                <p className="text-muted-foreground">
                  Kein zusätzliches Material wie Karten oder Spielbrett - das Handy reicht völlig aus.
                </p>
              </div>
              <div className="bg-card p-6 rounded-xl">
                <h3 className="font-semibold text-lg mb-3">👥 Für alle Gruppengrößen</h3>
                <p className="text-muted-foreground">
                  Von 3 bis 12 Spielern - für jede Party die richtige Spieleranzahl.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4 gradient-text">Partyspiele.app</h3>
              <p className="text-muted-foreground mb-4">
                Die ultimative Sammlung kostenloser mobiler Partyspiele für unvergessliche 
                Momente mit Freunden und Familie. Über 6 verschiedene Spiele sofort verfügbar.
              </p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>✓ Kostenlos und werbefrei</p>
                <p>✓ Keine App-Installation nötig</p>
                <p>✓ Funktioniert auf allen Geräten</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Feedback & Support</h4>
              <p className="text-muted-foreground text-sm mb-4">
                Haben Sie Verbesserungsvorschläge oder Fehler gefunden? Wir freuen uns über Ihr Feedback!
              </p>
              <form className="space-y-4" onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const subject = formData.get('subject') as string;
                const message = formData.get('message') as string;
                window.location.href = `mailto:feedback@partyspiele.app?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
              }}>
                <input
                  name="subject"
                  type="text"
                  placeholder="Betreff"
                  required
                  className="w-full px-4 py-2 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <textarea
                  name="message"
                  placeholder="Ihre Nachricht"
                  required
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                ></textarea>
                <Button type="submit" className="w-full">
                  Nachricht senden
                </Button>
              </form>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>© 2024 Partyspiele.app - Made with ❤️ für unvergessliche Spieleabende</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
