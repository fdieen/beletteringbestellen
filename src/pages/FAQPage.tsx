import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, Car, Ship, Building2, Home, Store, Ruler } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

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
    answer: 'Op dit moment bieden we een selectie van 12 populaire lettertypes. Heb je een specifiek lettertype nodig? Neem contact met ons op voor de mogelijkheden.',
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

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Veelgestelde Vragen over Plakletters | BeletteringBestellen.nl</title>
        <meta name="description" content="Antwoorden op veelgestelde vragen over plakletters: aanbrengen, ondergronden, levensduur, bestellen en meer. Alles wat je wilt weten over belettering." />
        <link rel="canonical" href="https://beletteringbestellen.nl/faq" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              ${faqs.map(faq => `{
                "@type": "Question",
                "name": ${JSON.stringify(faq.question)},
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": ${JSON.stringify(faq.answer)}
                }
              }`).join(',\n              ')}
            ]
          }
        `}</script>
      </Helmet>
      <Header />
      <main className="py-16 md:py-24">
        <div className="section-container">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Veelgestelde vragen
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Alles wat je wilt weten over onze plakletters
            </p>
          </div>

          {/* FAQ Section */}
          <div className="max-w-3xl mx-auto mb-20">
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

          {/* Use Cases Section */}
          <div>
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

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <div className="card-elevated max-w-2xl mx-auto p-8">
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">
                Vraag niet beantwoord?
              </h2>
              <p className="text-muted-foreground mb-6">
                Neem gerust contact met ons op. Of begin direct met het ontwerpen van je belettering.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center rounded-xl border border-primary text-primary px-6 py-3 font-semibold hover:bg-primary/10 transition-colors"
                >
                  Neem contact op
                </Link>
                <Link
                  to="/"
                  className="inline-flex items-center justify-center rounded-xl bg-primary text-primary-foreground px-6 py-3 font-semibold hover:bg-primary/90 transition-colors"
                >
                  Begin met ontwerpen
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQPage;
