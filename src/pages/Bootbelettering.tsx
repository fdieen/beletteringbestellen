import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const Bootbelettering = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Bootbelettering Bestellen | Plakletters voor je Boot | BeletteringBestellen.nl</title>
        <meta name="description" content="Bootbelettering bestellen? Ontwerp zelf plakletters voor je boot, sloep of jacht. Weerbestendige folie, eenvoudig zelf aan te brengen. Snel geleverd." />
        <link rel="canonical" href="https://beletteringbestellen.nl/bootbelettering" />
      </Helmet>
      <Header />
      <main className="py-16 md:py-24">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                  Bootbelettering bestellen
                </h1>
                <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                  Geef je boot een persoonlijke touch met zelfklevende plakletters. Of je nu de naam op je sloep wilt, je zeilboot van belettering wilt voorzien of je jacht wilt afwerken, bij ons ontwerp je het zelf.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                  Onze bootbelettering is gemaakt van duurzame, waterbestendige folie die bestand is tegen zon, regen en zout water. Zo blijft je belettering er jarenlang strak uitzien, ook op het water.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  Kies je lettertype, kleur en formaat in onze online ontwerper. Binnen enkele werkdagen ontvang je de plakletters thuis, klaar om zelf aan te brengen.
                </p>
                <Link
                  to="/#ontwerp"
                  className="btn-hero inline-flex items-center gap-2"
                >
                  Ontwerp je tekst
                </Link>
              </div>
              <div>
                <img
                  src="/assets/mockups/boot-belettering.png"
                  alt="Voorbeeld van bootbelettering met plakletters"
                  className="rounded-2xl shadow-lg w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Bootbelettering;
