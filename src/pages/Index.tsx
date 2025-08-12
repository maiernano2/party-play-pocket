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

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <Hero onDiscoverGames={scrollToGames} />

      {/* Games Section */}
      <section ref={gamesRef} className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Entdecke <span className="gradient-text">Partyspiele</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Wähle aus verschiedenen Einzel- und Teamspielen. Alle Spiele funktionieren 
              nur mit dem Handy - keine zusätzlichen Materialien nötig.
            </p>
          </div>

          {/* Filter */}
          <GameFilter 
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />

          {/* Games Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGames.map((game, index) => (
              <div 
                key={game.id} 
                className="fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <GameCard game={game} />
              </div>
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

      {/* Footer */}
      <footer className="bg-card border-t py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4 gradient-text">Partyspiele</h3>
              <p className="text-muted-foreground">
                Mobile-first Partyspiele für unvergessliche Momente mit Freunden und Familie.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Kontakt</h4>
              <form className="space-y-4" onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const subject = formData.get('subject') as string;
                const message = formData.get('message') as string;
                window.location.href = `mailto:contact@partyspiele.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
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
            <p>&copy; 2024 Partyspiele. Alle Rechte vorbehalten.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
