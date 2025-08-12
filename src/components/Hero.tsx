import { Button } from './ui/button';
import { Gamepad2, Smartphone, Users } from 'lucide-react';
import heroImage from '@/assets/hero-image.jpg';

interface HeroProps {
  onDiscoverGames: () => void;
}

export const Hero = ({ onDiscoverGames }: HeroProps) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-muted to-secondary/20 py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 fade-in">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                <span className="gradient-text">Partyspiele</span>
                <br />
                sofort spielen!
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
                Mobile-first Partyspiele für Gruppen. Nur das Handy als Moderator - 
                keine weiteren Materialien nötig. Perfekt für jeden Anlass!
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex items-center gap-3 p-4 bg-white/50 rounded-xl">
                <div className="bg-primary p-2 rounded-lg">
                  <Smartphone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-sm">Nur Handy</div>
                  <div className="text-xs text-muted-foreground">Kein Material nötig</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-white/50 rounded-xl">
                <div className="bg-accent p-2 rounded-lg">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-sm">Für Gruppen</div>
                  <div className="text-xs text-muted-foreground">3-12 Spieler</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-white/50 rounded-xl">
                <div className="bg-team-blue p-2 rounded-lg">
                  <Gamepad2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-sm">Sofort los</div>
                  <div className="text-xs text-muted-foreground">Keine Vorbereitung</div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="space-y-4">
              <Button 
                onClick={onDiscoverGames}
                className="btn-hero text-lg w-full sm:w-auto"
                size="lg"
              >
                Spiele entdecken
              </Button>
              <p className="text-sm text-muted-foreground">
                Über 6 verschiedene Spiele verfügbar
              </p>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative fade-in">
            <div className="relative z-10">
              <img 
                src={heroImage}
                alt="Gruppe von Freunden beim Spielen von Partyspielen mit dem Handy"
                className="w-full rounded-3xl shadow-strong hover-lift"
              />
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-primary rounded-full opacity-20 animate-bounce-in"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-game rounded-full opacity-15 animate-bounce-in" style={{animationDelay: '0.3s'}}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};