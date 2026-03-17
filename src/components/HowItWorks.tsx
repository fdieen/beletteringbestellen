import { PenLine, CreditCard, Package, ThumbsUp, Zap, Truck, HelpCircle, Wrench } from 'lucide-react';

const steps = [
  {
    icon: PenLine,
    title: 'Ontwerp',
    description: 'Typ je tekst, kies lettertype, kleur en formaat. Je ziet direct de prijs.',
  },
  {
    icon: CreditCard,
    title: 'Bestel',
    description: 'Betaal veilig via iDEAL, Bancontact of creditcard.',
  },
  {
    icon: Package,
    title: 'Ontvang',
    description: 'Je plakletters worden snel gemaakt en verzonden.',
  },
  {
    icon: ThumbsUp,
    title: 'Plak',
    description: 'Eenvoudig zelf aan te brengen. Inclusief handleiding!',
  },
];

const benefits = [
  { 
    title: 'Beste Prijs', 
    desc: 'Door direct online te bestellen en zelf te plakken bespaar je tot wel 60% vergeleken met een reclamebureau.',
    icon: Zap
  },
  { 
    title: 'Super Snel', 
    desc: 'Onze geavanceerde snijplotters staan 24/7 klaar. Voor 15:00 besteld? Vandaag nog de deur uit.',
    icon: Truck
  },
  { 
    title: 'Hulp bij Plakken', 
    desc: 'Nog nooit geplakt? Geen zorgen! Bij elke bestelling krijg je een duidelijke plakinstructie meegeleverd.',
    icon: HelpCircle
  }
];

export function HowItWorks() {
  return (
    <>
      {/* How It Works Section */}
      <section id="hoe-werkt-het" className="py-20 md:py-28 bg-background">
        <div className="section-container">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-wider border border-primary/20">
              <span>Stap voor stap</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight">
              Hoe werkt het?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              In 4 simpele stappen je eigen plakletters
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div 
                key={index}
                className="relative text-center group"
              >
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-border" />
                )}
                
                {/* Step number & icon */}
                <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-muted text-muted-foreground mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-sm">
                  <step.icon className="w-10 h-10" />
                  <span className="absolute -top-2 -right-2 w-8 h-8 bg-foreground text-background rounded-xl flex items-center justify-center text-sm font-black shadow-lg">
                    {index + 1}
                  </span>
                </div>
                
                <h3 className="text-xl font-black text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-muted/50 py-20 md:py-28">
        <div className="section-container">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight">
              Waarom kiezen voor <span className="text-primary">ons</span>?
            </h2>
            <p className="text-muted-foreground text-lg">
              We doen er alles aan om jou de beste ervaring te geven.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, i) => (
              <div 
                key={i} 
                className="group p-10 bg-background rounded-[2rem] border border-transparent hover:border-primary/20 hover:shadow-2xl transition-all duration-500"
              >
                <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <benefit.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-foreground mb-4">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wij plakken het ook Section */}
      <section className="py-16 md:py-20 bg-background">
        <div className="section-container">
          <div className="rounded-3xl bg-primary/5 border border-primary/15 p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="flex-shrink-0 w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center">
              <Wrench className="w-10 h-10 text-primary" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-black text-foreground mb-3">
                Liever dat wij het plakken?
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Geen zin om zelf te plakken of gewoon zeker willen zijn van een perfect resultaat? Wij komen het ook voor je aanbrengen. Neem even contact op en we kijken samen wat mogelijk is.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row md:flex-col gap-3 flex-shrink-0">
              <a
                href="https://wa.me/31614145350"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors"
              >
                WhatsApp ons
              </a>
              <a
                href="mailto:info@beletteringbestellen.nl"
                className="inline-flex items-center justify-center gap-2 border border-primary/20 text-primary font-bold px-6 py-3 rounded-xl hover:bg-primary/5 transition-colors"
              >
                Stuur een mail
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
