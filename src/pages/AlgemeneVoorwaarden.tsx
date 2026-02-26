import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function AlgemeneVoorwaarden() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Algemene Voorwaarden | BeletteringBestellen.nl</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-black mb-2">Algemene Voorwaarden</h1>
        <p className="text-muted-foreground mb-10">BeletteringBestellen.nl — RHTTOURS B.V. | Laatste update: februari 2026</p>

        <div className="prose prose-sm max-w-none space-y-8 text-foreground">

          <section>
            <h2 className="text-xl font-bold mb-3">1. Identiteit van de ondernemer</h2>
            <p>RHTTOURS B.V.<br />
            Handelend onder de naam: BeletteringBestellen.nl<br />
            Rogerslijn 22, 2728 BW Zoetermeer<br />
            E-mail: info@beletteringbestellen.nl<br />
            Telefoon: 06 14 14 53 50<br />
            KvK-nummer: 95053115<br />
            BTW-nummer: NL866981755B01<br />
            IBAN: NL05 INGB 0107 9200 93</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">2. Toepasselijkheid</h2>
            <p>Deze algemene voorwaarden zijn van toepassing op alle aanbiedingen, bestellingen en overeenkomsten van BeletteringBestellen.nl. Door een bestelling te plaatsen gaat u akkoord met deze voorwaarden.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">3. Aanbod en prijzen</h2>
            <p>Alle prijzen op de website zijn inclusief 21% BTW. BeletteringBestellen.nl behoudt zich het recht voor om prijzen te wijzigen. Reeds geplaatste bestellingen worden niet achteraf gewijzigd in prijs.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">4. Bestellingen en betaling</h2>
            <p>Bestellingen worden verwerkt na ontvangst van de betaling. Betaling geschiedt via iDEAL, Bancontact of creditcard via Mollie. Na betaling ontvangt u een orderbevestiging per e-mail.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">5. Levering</h2>
            <p>Wij streven ernaar bestellingen binnen 3–5 werkdagen te leveren. Levertijden zijn indicatief. BeletteringBestellen.nl is niet aansprakelijk voor vertragingen door externe factoren. Gratis verzending bij bestellingen vanaf €75. Bij bestellingen onder €75 worden verzendkosten van €4,95 in rekening gebracht.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">6. Maatwerk en retour</h2>
            <p>Omdat onze producten op maat worden gemaakt (gepersonaliseerde belettering), is het herroepingsrecht op grond van artikel 6:230p sub c BW uitgesloten. Producten kunnen na productie niet worden geretourneerd, tenzij er sprake is van een fabricagefout.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">7. Klachten</h2>
            <p>Bij klachten kunt u contact opnemen via info@beletteringbestellen.nl of 06 14 14 53 50. Wij streven ernaar klachten binnen 5 werkdagen te behandelen. Bij een fabricagefout zorgen wij voor een gratis vervanging.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">8. Aansprakelijkheid</h2>
            <p>BeletteringBestellen.nl is niet aansprakelijk voor indirecte schade, gevolgschade of schade ontstaan door onjuist gebruik of plaatsing van de producten. Onze aansprakelijkheid is beperkt tot het bedrag van de betreffende bestelling.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">9. Toepasselijk recht</h2>
            <p>Op alle overeenkomsten is Nederlands recht van toepassing. Geschillen worden voorgelegd aan de bevoegde rechter in het arrondissement Den Haag.</p>
          </section>

        </div>
      </main>
      <Footer />
    </div>
  );
}
