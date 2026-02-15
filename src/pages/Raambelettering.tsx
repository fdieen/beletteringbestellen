import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const Raambelettering = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Raambelettering Bestellen | Plakletters voor Ramen & Etalages | BeletteringBestellen.nl</title>
        <meta name="description" content="Raambelettering bestellen? Ontwerp plakletters voor je etalage, winkelruit of kantoorpand. Direct online ontwerpen, scherpe prijs en snel in huis." />
        <link rel="canonical" href="https://beletteringbestellen.nl/raambelettering" />
      </Helmet>
      <Header />
      <main className="py-16 md:py-24">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                  Raambelettering bestellen
                </h1>
                <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                  Trek de aandacht van voorbijgangers met opvallende raambelettering. Ideaal voor winkels, horecazaken, kantoren en praktijken. Met plakletters op je raam of etalage maak je direct duidelijk wie je bent en wat je doet.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                  Kies uit tientallen lettertypes en kleuren om je raambelettering precies bij je huisstijl te laten passen. Onze folie hecht uitstekend op glas en is eenvoudig aan te brengen — ook zonder ervaring.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  Geen dure reclamebureau's nodig: ontwerp je raambelettering zelf in onze online tool, zie direct je prijs en ontvang je bestelling binnen enkele werkdagen.
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
                  src="/assets/mockups/etalage-belettering.png"
                  alt="Voorbeeld van raambelettering op een etalageruit"
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

export default Raambelettering;
