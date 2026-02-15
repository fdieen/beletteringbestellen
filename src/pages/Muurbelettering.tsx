import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const Muurbelettering = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Muurbelettering Bestellen | Plakletters voor Muur & Interieur | BeletteringBestellen.nl</title>
        <meta name="description" content="Muurbelettering bestellen? Ontwerp plakletters voor je muur, kantoor of interieur. Stijlvolle wandteksten, eenvoudig zelf aan te brengen. Direct online ontwerpen." />
        <link rel="canonical" href="https://beletteringbestellen.nl/muur-belettering" />
      </Helmet>
      <Header />
      <main className="py-16 md:py-24">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                  Muurbelettering &amp; interieur
                </h1>
                <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                  Voeg karakter toe aan je interieur met stijlvolle muurbelettering. Perfect voor kantoren, wachtruimtes, restaurants of gewoon thuis. Een inspirerend citaat, je bedrijfsnaam of een speelse tekst — met plakletters creëer je het in een handomdraai.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                  Onze plakletters hechten op vrijwel elke gladde muur en zijn beschikbaar in diverse kleuren en formaten. Zo past je muurbelettering naadloos bij je interieur of huisstijl.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  Ontwerp je tekst in onze online tool, kies je lettertype en kleur, en wij leveren het kant-en-klaar bij je thuis. Zelf plakken is eenvoudig met de meegeleverde instructies.
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
                  src="/assets/mockups/interieur-belettering.png"
                  alt="Voorbeeld van muurbelettering in een interieur"
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

export default Muurbelettering;
