import { ArrowDown, Check } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-secondary via-background to-secondary/50 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="section-container relative">
        <div className="py-16 md:py-24 lg:py-32">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-success/10 text-success px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in">
              <Check className="w-4 h-4" />
              Geen opstartkosten · Direct prijzen zien
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight mb-6 animate-fade-in">
              Plakletters bestellen?{' '}
              <span className="text-primary">Simpel en snel</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in">
              Ontwerp je eigen tekst, zie direct de prijs en ontvang snel in huis. 
              Zelf plakken = goedkoper!
            </p>

            {/* CTA Button */}
            <a 
              href="#ontwerp" 
              className="btn-hero inline-flex items-center gap-2 animate-fade-in"
            >
              Ontwerp je tekst
              <ArrowDown className="w-5 h-5 animate-bounce" />
            </a>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mt-12 text-sm text-muted-foreground animate-fade-in">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-success" />
                <span>Direct prijs zien</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-success" />
                <span>Snel geleverd</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-success" />
                <span>Gratis verzending vanaf €25</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
