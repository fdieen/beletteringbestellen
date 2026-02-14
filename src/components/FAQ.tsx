import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: 'Hoe plak ik de letters?',
    answer: 'Bij je bestelling ontvang je een duidelijke handleiding. De letters zijn voorzien van transfertape waarmee je ze eenvoudig kunt aanbrengen. Maak het oppervlak eerst schoon en vetvrij. Plak de letters op de gewenste plek en verwijder voorzichtig de transfertape. Klaar!',
  },
  {
    question: 'Op welke ondergronden werkt het?',
    answer: 'Onze plakletters hechten op vrijwel alle gladde, schone oppervlakken: glas, metaal, kunststof, gelakt hout, auto\'s, boten, muren (glad gestuukt of geverfd), tegels en meer. Niet geschikt voor ruwe, stoffige of vettige ondergronden.',
  },
  {
    question: 'Wat is de levertijd?',
    answer: 'De meeste bestellingen worden binnen 2-3 werkdagen verzonden. Bij drukte kan dit oplopen tot maximaal 5 werkdagen. Je ontvangt een track & trace code zodra je pakket onderweg is.',
  },
  {
    question: 'Kan ik mijn eigen lettertype gebruiken?',
    answer: 'Op dit moment bieden we een selectie van 6 populaire lettertypes. Heb je een specifiek lettertype nodig? Neem contact met ons op voor de mogelijkheden.',
  },
  {
    question: 'Zijn de letters weerbestendig?',
    answer: 'Ja! Onze plakletters zijn gemaakt van hoogwaardige buitenfolie en zijn bestand tegen zon, regen, vorst en andere weersomstandigheden. Ze gaan jaren mee, zowel binnen als buiten.',
  },
  {
    question: 'Wat als ik een fout maak tijdens het plakken?',
    answer: 'Geen zorgen! De letters zijn de eerste minuten nog repositioneerbaar. Trek ze voorzichtig los en plak opnieuw. Na enkele uren hechten ze permanent.',
  },
  {
    question: 'Hoeveel kost verzending?',
    answer: 'Verzending kost €4,95 binnen Nederland. Bij bestellingen boven €50 is verzending gratis! Verzending naar België kost €6,95.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-16 md:py-24 bg-background">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Veelgestelde vragen
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Alles wat je wilt weten over onze plakletters
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="card-elevated overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between text-left p-6 hover:bg-muted/50 transition-colors"
                >
                  <span className="font-semibold text-foreground pr-4">
                    {faq.question}
                  </span>
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-6 animate-fade-in">
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
