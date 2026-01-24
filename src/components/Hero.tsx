import { ArrowDown, Star, ShieldCheck, Truck, Car, Store, Ship, Home } from 'lucide-react';

export function Hero() {
  return (
    <>
      {/* Trust Bar */}
      <div className="trust-bar">
        <div className="section-container flex flex-wrap justify-between items-center gap-4 text-[11px] font-bold uppercase tracking-widest">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-primary">
              <Star className="w-3 h-3 fill-current" />
              <span className="text-background">4.9/5 Klanttevredenheid</span>
            </span>
            <span className="hidden sm:flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% Plakgarantie</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden md:block">Vandaag besteld = morgen verzonden</span>
            <span className="text-primary">Gratis verzending vanaf €25</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-secondary via-background to-muted/50 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        </div>

        <div className="section-container relative">
          <div className="py-16 md:py-24 lg:py-28">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-wider border border-primary/20">
                <Truck className="w-3.5 h-3.5" />
                <span>Geen opstartkosten · Direct prijzen zien</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground tracking-tight leading-[1.1]">
                Maak het{' '}
                <span className="text-primary">eigen</span>.
              </h1>

              {/* Subtitle */}
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto">
                Ontwerp unieke plakletters in seconden. Zie direct de prijs en ontvang snel in huis.
              </p>

              {/* CTA Button */}
              <a 
                href="#ontwerp" 
                className="inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-primary-foreground font-black py-5 px-10 rounded-2xl text-lg transition-all transform active:scale-95 shadow-xl shadow-primary/20 group"
              >
                Ontwerp je tekst
                <ArrowDown className="w-5 h-5 group-hover:animate-bounce" />
              </a>

              {/* Trust indicators */}
              <div className="flex flex-wrap items-center justify-center gap-8 pt-4 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full" />
                  <span>Direct prijs zien</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full" />
                  <span>Snel geleverd</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full" />
                  <span>Topkwaliteit vinyl</span>
                </div>
              </div>

              {/* Use Case Examples */}
              <div className="pt-12">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-6">
                  Populaire toepassingen
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="group relative bg-background/80 backdrop-blur-sm border border-border/50 rounded-2xl p-4 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all cursor-pointer">
                    <div className="aspect-[4/3] bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center mb-3">
                      <Car className="w-10 h-10 text-primary/70 group-hover:text-primary group-hover:scale-110 transition-all" />
                    </div>
                    <p className="text-sm font-bold text-foreground">Auto's</p>
                    <p className="text-xs text-muted-foreground">Bedrijfswagens & personenauto's</p>
                  </div>
                  <div className="group relative bg-background/80 backdrop-blur-sm border border-border/50 rounded-2xl p-4 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all cursor-pointer">
                    <div className="aspect-[4/3] bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center mb-3">
                      <Store className="w-10 h-10 text-primary/70 group-hover:text-primary group-hover:scale-110 transition-all" />
                    </div>
                    <p className="text-sm font-bold text-foreground">Winkels</p>
                    <p className="text-xs text-muted-foreground">Etalages & panden</p>
                  </div>
                  <div className="group relative bg-background/80 backdrop-blur-sm border border-border/50 rounded-2xl p-4 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all cursor-pointer">
                    <div className="aspect-[4/3] bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center mb-3">
                      <Ship className="w-10 h-10 text-primary/70 group-hover:text-primary group-hover:scale-110 transition-all" />
                    </div>
                    <p className="text-sm font-bold text-foreground">Boten</p>
                    <p className="text-xs text-muted-foreground">Namen & registraties</p>
                  </div>
                  <div className="group relative bg-background/80 backdrop-blur-sm border border-border/50 rounded-2xl p-4 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all cursor-pointer">
                    <div className="aspect-[4/3] bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center mb-3">
                      <Home className="w-10 h-10 text-primary/70 group-hover:text-primary group-hover:scale-110 transition-all" />
                    </div>
                    <p className="text-sm font-bold text-foreground">Thuis</p>
                    <p className="text-xs text-muted-foreground">Muren & decoratie</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
