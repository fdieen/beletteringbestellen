import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const Autobelettering = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Autobelettering Bestellen | Plakletters voor je Auto | BeletteringBestellen.nl</title>
        <meta name="description" content="Autobelettering bestellen? Ontwerp zelf je plakletters voor auto, bus of bestelwagen. Eenvoudig online ontwerpen, snel geleverd en makkelijk zelf te plakken." />
        <link rel="canonical" href="https://beletteringbestellen.nl/autobelettering" />
      </Helmet>
      <Header />
      <main className="py-16 md:py-24">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                  Autobelettering bestellen
                </h1>
                <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                  Geef je auto, bestelbus of bedrijfswagen een professionele uitstraling met zelfklevende plakletters. Bij BeletteringBestellen.nl ontwerp je jouw autobelettering volledig zelf. Kies je tekst, lettertype en kleur, en wij produceren het op maat.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                  Onze belettering is gemaakt van hoogwaardige, weerbestendige folie die jarenlang meegaat. Of het nu gaat om je bedrijfsnaam op een bestelwagen of een telefoonnummer op je auto: het resultaat is strak en duurzaam.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  Zelf plakken is eenvoudig met onze meegeleverde instructies. Zo bespaar je flink op de kosten van een beletteringsbedrijf, zonder in te leveren op kwaliteit.
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
                  src="/assets/mockups/auto-belettering.png"
                  alt="Voorbeeld van autobelettering met plakletters"
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

export default Autobelettering;
