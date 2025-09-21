import { Card, CardContent } from '@/components/ui/card';
import { Star, Users, Clock, Gamepad2, Sparkles, Trophy, Heart, Zap } from 'lucide-react';

interface SEOContentProps {
  page?: 'home' | 'game';
  gameTitle?: string;
}

export const SEOContent = ({ page = 'home', gameTitle }: SEOContentProps) => {
  if (page === 'home') {
    return (
      <>
        {/* Streamer Games Section */}
        <section className="py-16 px-4 bg-gradient-to-br from-muted/50 to-secondary/30">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center space-y-6 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold gradient-text">
                Beliebte Spiele von Streamern wie Papaplatte, Eligella & Schmobin
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Entdecke die gleichen Partyspiele, die auch bekannte Twitch-Streamer wie Papaplatte, 
                Eligella, Schmobin und viele andere für ihre Community-Events verwenden. 
                Diese interaktiven Gruppenspiele sorgen garantiert für Unterhaltung!
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="game-card border-0">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="bg-primary/10 p-3 rounded-full w-fit mx-auto">
                    <Gamepad2 className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Twitch Partyspiele</h3>
                  <p className="text-muted-foreground">
                    Die gleichen Spiele, die Streamer für ihre Community nutzen - 
                    jetzt auch für deine private Party verfügbar.
                  </p>
                </CardContent>
              </Card>

              <Card className="game-card border-0">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="bg-accent/10 p-3 rounded-full w-fit mx-auto">
                    <Users className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold">Community Games</h3>
                  <p className="text-muted-foreground">
                    Interaktive Gruppenspiele für 3-12 Personen - 
                    perfekt für Streams, Partys und gesellige Abende.
                  </p>
                </CardContent>
              </Card>

              <Card className="game-card border-0">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="bg-team-blue/10 p-3 rounded-full w-fit mx-auto">
                    <Trophy className="w-8 h-8 text-team-blue" />
                  </div>
                  <h3 className="text-xl font-semibold">Bewährte Formate</h3>
                  <p className="text-muted-foreground">
                    Von Streamern getestete und für gut befundene Spielformate 
                    für maximalen Unterhaltungswert.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Benefits für verschiedene Anlässe */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center space-y-6 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">
                Perfekt für jeden Anlass
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Unsere mobilen Partyspiele eignen sich für die verschiedensten Situationen und Gruppengößen.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-4 text-center">
                <div className="bg-gradient-primary p-4 rounded-2xl w-fit mx-auto">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Geburtstagsfeiern</h3>
                <p className="text-muted-foreground">
                  Sorge für unvergessliche Momente an Geburtstagen mit lustigen Gruppenspielen.
                </p>
              </div>

              <div className="space-y-4 text-center">
                <div className="bg-gradient-game p-4 rounded-2xl w-fit mx-auto">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold">WG-Partys</h3>
                <p className="text-muted-foreground">
                  Bringe deine WG-Party auf das nächste Level mit interaktiven Spielen.
                </p>
              </div>

              <div className="space-y-4 text-center">
                <div className="bg-gradient-team p-4 rounded-2xl w-fit mx-auto">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Familientreffen</h3>
                <p className="text-muted-foreground">
                  Verbinde Generationen mit Spielen, die Jung und Alt Spaß machen.
                </p>
              </div>

              <div className="space-y-4 text-center">
                <div className="bg-gradient-primary p-4 rounded-2xl w-fit mx-auto">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Spontane Runden</h3>
                <p className="text-muted-foreground">
                  Keine Vorbereitung nötig - starte sofort mit dem Spielspaß.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Keyword-reiche Testimonials Section */}
        <section className="py-16 px-4 bg-gradient-to-br from-secondary/20 to-muted/30">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center space-y-6 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">
                Das sagen unsere Nutzer
              </h2>
              <p className="text-lg text-muted-foreground">
                Erfahrungen mit unseren mobilen Partyspielen
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-0 bg-card/50">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic">
                    "Endlich Partyspiele wie bei Papaplatte! Das Imposter Game ist der absolute Hit 
                    auf jeder Feier. Alle sind sofort dabei!"
                  </p>
                  <p className="font-semibold">- Lisa, 24</p>
                </CardContent>
              </Card>

              <Card className="border-0 bg-card/50">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic">
                    "Perfekt für unsere WG-Partys! Wavelength und Chaos Challenge sind unsere Favoriten. 
                    Kein Material nötig - nur das Handy!"
                  </p>
                  <p className="font-semibold">- Marco, 28</p>
                </CardContent>
              </Card>

              <Card className="border-0 bg-card/50">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic">
                    "Als Twitch-Viewer kannte ich diese Spiele schon. Jetzt kann ich sie 
                    endlich selbst mit Freunden spielen. Genial!"
                  </p>
                  <p className="font-semibold">- Anna, 22</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section mit Keywords */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center space-y-6 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">
                Häufig gestellte Fragen
              </h2>
            </div>

            <div className="space-y-6">
              <Card className="border-0 bg-card/50">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3">
                    Sind das die gleichen Spiele wie bei Papaplatte und anderen Streamern?
                  </h3>
                  <p className="text-muted-foreground">
                    Ja! Viele unserer Spiele basieren auf beliebten Formaten, die auch Streamer wie Papaplatte, 
                    Eligella, Schmobin und andere für ihre Community-Events nutzen. Das Imposter Game und 
                    Wavelength sind besonders beliebte Twitch-Partyspiele.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 bg-card/50">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3">
                    Brauche ich zusätzliches Material für die Spiele?
                  </h3>
                  <p className="text-muted-foreground">
                    Nein! Alle Partyspiele funktionieren nur mit einem Smartphone als Moderator. 
                    Perfekt für spontane Spielrunden ohne Vorbereitung.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 bg-card/50">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3">
                    Für wie viele Personen sind die Gruppenspiele geeignet?
                  </h3>
                  <p className="text-muted-foreground">
                    Die meisten Spiele sind für 3-12 Personen ausgelegt. Einige Teamspiele 
                    funktionieren sogar mit bis zu 16 Spielern.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 bg-card/50">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3">
                    Kann ich die Spiele auch für Streaming nutzen?
                  </h3>
                  <p className="text-muted-foreground">
                    Absolut! Die Spiele eignen sich perfekt für Twitch-Streams und andere 
                    Community-Events. Viele Content Creator nutzen bereits ähnliche Formate.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <section className="py-12 px-4 bg-gradient-to-br from-muted/30 to-secondary/20">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center space-y-6 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">
            {gameTitle} - Beliebt bei Streamern und Partygästen
          </h2>
          <p className="text-lg text-muted-foreground">
            Dieses Spiel wird auch von bekannten Streamern gespielt und sorgt 
            garantiert für Unterhaltung in deiner Gruppe!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-0 bg-card/70 text-center">
            <CardContent className="p-6 space-y-3">
              <div className="bg-primary/10 p-3 rounded-full w-fit mx-auto">
                <Gamepad2 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold">Streamer-erprobt</h3>
              <p className="text-sm text-muted-foreground">
                Von Content Creators für gut befunden
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-card/70 text-center">
            <CardContent className="p-6 space-y-3">
              <div className="bg-accent/10 p-3 rounded-full w-fit mx-auto">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold">Community-Liebling</h3>
              <p className="text-sm text-muted-foreground">
                Beliebt in der Gaming-Community
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-card/70 text-center">
            <CardContent className="p-6 space-y-3">
              <div className="bg-team-blue/10 p-3 rounded-full w-fit mx-auto">
                <Sparkles className="w-6 h-6 text-team-blue" />
              </div>
              <h3 className="font-semibold">Sofort spielbar</h3>
              <p className="text-sm text-muted-foreground">
                Keine Vorbereitung oder Material nötig
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};