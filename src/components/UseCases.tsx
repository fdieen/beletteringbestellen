import { Car, Ship, Building2, Home, Store, Ruler } from 'lucide-react';

const useCases = [
  {
    icon: Car,
    title: 'Auto',
    description: 'Bedrijfsnaam, telefoonnummer of slogan op je auto',
  },
  {
    icon: Ship,
    title: 'Boot',
    description: 'Bootnaam en thuishaven op je schip',
  },
  {
    icon: Building2,
    title: 'Bedrijf',
    description: 'Reclame, openingstijden of logo op je pand',
  },
  {
    icon: Home,
    title: 'Thuis',
    description: 'Huisnummer, naam of decoratieve tekst',
  },
  {
    icon: Store,
    title: 'Winkel',
    description: 'Etalage, raam of deur belettering',
  },
  {
    icon: Ruler,
    title: 'Maatwerk',
    description: 'Elk formaat, elke tekst, elke toepassing',
  },
];

export function UseCases() {
  return (
    <section className="py-16 md:py-24 bg-secondary/50">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Waar gebruik je plakletters voor?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Onze plakletters zijn geschikt voor vrijwel elke ondergrond
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((useCase, index) => (
            <div 
              key={index}
              className="card-elevated hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <useCase.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-display font-semibold text-foreground mb-1">
                    {useCase.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {useCase.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
