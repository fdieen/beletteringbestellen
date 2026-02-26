import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { TextDesigner } from '@/components/TextDesigner';
import { InstructionVideo } from '@/components/InstructionVideo';
import { PriceComparison } from '@/components/PriceComparison';
import { HowItWorks } from '@/components/HowItWorks';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Plakletters Bestellen | Simpel & Snel | BeletteringBestellen.nl</title>
        <meta name="description" content="Plakletters bestellen? Ontwerp je eigen tekst, zie direct de prijs en ontvang snel in huis. Geen opstartkosten. Zelf plakken = goedkoper!" />
        <link rel="canonical" href="https://beletteringbestellen.nl/" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "BeletteringBestellen.nl",
            "url": "https://beletteringbestellen.nl",
            "logo": "https://beletteringbestellen.nl/assets/logo-beletteringbestellen.png",
            "description": "Plakletters en belettering bestellen. Ontwerp je eigen tekst, kies je lettertype en kleur, en ontvang snel in huis.",
            "contactPoint": {
              "@type": "ContactPoint",
              "email": "info@beletteringbestellen.nl",
              "contactType": "customer service",
              "availableLanguage": "Dutch"
            }
          }
        `}</script>
      </Helmet>
      <div className="bg-primary text-primary-foreground text-center text-sm py-2 px-4">
        Binnenkort volledig online — wil je nu al bestellen? Bel <a href="tel:0614145350" className="font-semibold underline">0614145350</a> of mail <a href="mailto:info@beletteringbestellen.nl" className="font-semibold underline">info@beletteringbestellen.nl</a>
      </div>
      <Header />
      <main>
        <Hero />
        <TextDesigner />
        <InstructionVideo />
        <PriceComparison />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
