import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function Privacybeleid() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Privacybeleid | BeletteringBestellen.nl</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-black mb-2">Privacybeleid</h1>
        <p className="text-muted-foreground mb-10">BeletteringBestellen.nl — RHTTOURS B.V. | Laatste update: februari 2026</p>

        <div className="prose prose-sm max-w-none space-y-8 text-foreground">

          <section>
            <h2 className="text-xl font-bold mb-3">1. Wie zijn wij?</h2>
            <p>RHTTOURS B.V., handelend onder de naam BeletteringBestellen.nl, is verantwoordelijk voor de verwerking van persoonsgegevens zoals beschreven in dit privacybeleid.<br /><br />
            Contactgegevens: info@beletteringbestellen.nl | 06 14 14 53 50 | KvK: 95053115</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">2. Welke gegevens verzamelen wij?</h2>
            <p>Bij het plaatsen van een bestelling verwerken wij de volgende persoonsgegevens:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Voor- en achternaam</li>
              <li>E-mailadres</li>
              <li>Telefoonnummer (optioneel)</li>
              <li>Bezorgadres (straat, huisnummer, postcode, woonplaats)</li>
              <li>Bestelgegevens (producten, afmetingen, kleuren)</li>
              <li>Betaalgegevens (verwerkt door Mollie, wij slaan geen betaalgegevens op)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">3. Waarvoor gebruiken wij uw gegevens?</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Verwerken en bezorgen van uw bestelling</li>
              <li>Sturen van een orderbevestiging en verzendbevestiging</li>
              <li>Beantwoorden van vragen en afhandelen van klachten</li>
              <li>Voldoen aan wettelijke verplichtingen (bijv. bewaarplicht facturen)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">4. Bewaartermijn</h2>
            <p>Wij bewaren uw gegevens niet langer dan noodzakelijk. Bestelgegevens worden 7 jaar bewaard in verband met de fiscale bewaarplicht. Overige gegevens worden na afloop van de overeenkomst verwijderd.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">5. Delen met derden</h2>
            <p>Wij delen uw gegevens alleen met partijen die noodzakelijk zijn voor de uitvoering van de overeenkomst:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong>Mollie</strong> — betaalverwerking</li>
              <li><strong>Resend</strong> — verzenden van e-mails</li>
              <li><strong>Supabase</strong> — opslag van bestelgegevens</li>
              <li><strong>PostNL / bezorgdienst</strong> — bezorging van uw bestelling</li>
            </ul>
            <p className="mt-2">Wij verkopen uw gegevens nooit aan derden.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">6. Cookies</h2>
            <p>Wij gebruiken functionele cookies die noodzakelijk zijn voor het functioneren van de webshop (zoals het bijhouden van uw winkelwagen). Voor analytische cookies vragen wij uw toestemming via de cookiemelding.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">7. Uw rechten</h2>
            <p>U heeft het recht om uw gegevens in te zien, te corrigeren of te laten verwijderen. Neem hiervoor contact op via info@beletteringbestellen.nl. Wij reageren binnen 30 dagen.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">8. Beveiliging</h2>
            <p>Wij nemen passende technische en organisatorische maatregelen om uw persoonsgegevens te beveiligen. De website maakt gebruik van een beveiligde HTTPS-verbinding.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">9. Klachten</h2>
            <p>Heeft u een klacht over de verwerking van uw persoonsgegevens? U kunt een klacht indienen bij de Autoriteit Persoonsgegevens via <a href="https://www.autoriteitpersoonsgegevens.nl" className="text-primary underline" target="_blank" rel="noopener noreferrer">autoriteitpersoonsgegevens.nl</a>.</p>
          </section>

        </div>
      </main>
      <Footer />
    </div>
  );
}
