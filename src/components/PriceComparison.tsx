import { Check, X, TrendingDown } from 'lucide-react';

const comparisonData = [
  { text: 'OPEN', letters: 4, height: 10, us: 8.80, them: 11.80, savings: 25 },
  { text: 'BEDRIJF', letters: 7, height: 15, us: 23.10, them: 36.75, savings: 37 },
  { text: 'AMSTERDAM', letters: 9, height: 20, us: 39.60, them: 69.30, savings: 43 },
  { text: 'BOOTNAAM', letters: 8, height: 30, us: 52.80, them: 119.20, savings: 56 },
];

export function PriceComparison() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-muted/30 to-background">
      <div className="section-container">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-success/10 text-success rounded-full text-[10px] font-black uppercase tracking-wider mb-6">
            <TrendingDown className="w-3.5 h-3.5" />
            <span>Eerlijke prijsvergelijking</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
            Tot <span className="text-success">50% goedkoper</span> dan concurrenten
          </h2>
          <p className="text-muted-foreground">
            Wij rekenen €0,22 per letter per cm. Geen verborgen kosten, geen opstartkosten.
            Vergelijk zelf met traditionele letterbedrijven.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-3xl border border-border shadow-xl overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-4 gap-4 p-4 md:p-6 bg-muted/50 border-b border-border text-xs font-black uppercase tracking-widest text-muted-foreground">
              <div>Voorbeeld</div>
              <div className="text-center">Traditioneel</div>
              <div className="text-center text-primary">Bij ons</div>
              <div className="text-right">Besparing</div>
            </div>

            {/* Table Rows */}
            {comparisonData.map((item, index) => (
              <div
                key={item.text}
                className={`grid grid-cols-4 gap-4 p-4 md:p-6 items-center ${
                  index !== comparisonData.length - 1 ? 'border-b border-border/50' : ''
                }`}
              >
                {/* Example */}
                <div>
                  <p className="font-bold text-foreground">{item.text}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.letters} letters, {item.height}cm
                  </p>
                </div>

                {/* Traditional Price */}
                <div className="text-center">
                  <p className="font-bold text-muted-foreground line-through">
                    €{item.them.toFixed(2).replace('.', ',')}
                  </p>
                </div>

                {/* Our Price */}
                <div className="text-center">
                  <p className="font-black text-xl text-primary">
                    €{item.us.toFixed(2).replace('.', ',')}
                  </p>
                </div>

                {/* Savings */}
                <div className="text-right">
                  <span className="inline-flex items-center gap-1 bg-success/10 text-success px-3 py-1 rounded-full text-sm font-bold">
                    -{item.savings}%
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Features Comparison */}
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            {/* Us */}
            <div className="bg-primary/5 border-2 border-primary/20 rounded-2xl p-6">
              <h3 className="font-black text-lg text-foreground mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm">
                  B
                </span>
                BeletteringBestellen
              </h3>
              <ul className="space-y-3">
                {[
                  'Geen opstartkosten',
                  'Direct online ontwerpen',
                  'Prijs direct zichtbaar',
                  'Zelf makkelijk plakken',
                  'Gratis verzending vanaf €75',
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm">
                    <Check className="w-5 h-5 text-success flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Traditional */}
            <div className="bg-muted/50 border border-border rounded-2xl p-6">
              <h3 className="font-black text-lg text-muted-foreground mb-4">
                Traditioneel letterbedrijf
              </h3>
              <ul className="space-y-3">
                {[
                  'Opstartkosten €25-75',
                  'Offerte aanvragen & wachten',
                  'Prijs pas na contact duidelijk',
                  'Montage extra (€70/uur)',
                  'Verzendkosten €6-15',
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <X className="w-5 h-5 text-destructive/60 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Source note */}
          <p className="text-center text-xs text-muted-foreground mt-6">
            * Prijzen vergeleken met traditionele letterbedrijven (januari 2026). Alle prijzen excl. BTW.
          </p>
        </div>
      </div>
    </section>
  );
}
