import { PenLine, CreditCard, Package, ThumbsUp } from 'lucide-react';

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

export function HowItWorks() {
  return (
    <section id="hoe-werkt-het" className="py-16 md:py-24 bg-background">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
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
              <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-primary/10 text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                <step.icon className="w-10 h-10" />
                <span className="absolute -top-2 -right-2 w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </span>
              </div>
              
              <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
