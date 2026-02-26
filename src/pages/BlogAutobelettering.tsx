import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function BlogAutobelettering() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Hoe plak ik autobelettering? Stap voor stap | BeletteringBestellen.nl</title>
        <meta name="description" content="Autobelettering zelf plakken in 6 stappen. Tips voor een luchtbelvrij resultaat, de beste temperatuur en wat je nodig hebt. Lees onze handleiding." />
        <link rel="canonical" href="https://beletteringbestellen.nl/blog/hoe-plak-ik-autobelettering" />
      </Helmet>
      <Header />
      <main className="max-w-2xl mx-auto px-4 py-16">

        <Link to="/blog" className="text-sm text-muted-foreground hover:text-primary transition mb-6 inline-block">← Terug naar blog</Link>

        <div className="flex gap-3 text-xs text-muted-foreground mb-4">
          <span>februari 2026</span>
          <span>·</span>
          <span>4 min lezen</span>
        </div>

        <h1 className="text-3xl font-black mb-6 leading-tight">Hoe plak ik autobelettering? Stap voor stap uitgelegd</h1>

        <div className="prose prose-sm max-w-none space-y-6 text-foreground leading-relaxed">

          <p className="text-lg text-muted-foreground">
            Autobelettering zelf plakken is makkelijker dan je denkt. Met de juiste voorbereiding en onze tips krijg je een perfect resultaat — zonder luchtbellen en professioneel van uitstraling.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-3">Wat heb je nodig?</h2>
          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
            <li>Je bestelde belettering (geleverd op transferfolie)</li>
            <li>Een bankpasje of vouwbeen</li>
            <li>Schone doek of microvezeldoek</li>
            <li>Afwasmiddel + water in een plantenspuit (voor natte methode)</li>
            <li>Warmtepistool of haardroger (optioneel, voor gebogen vlakken)</li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-3">Stap 1 — Reinig het oppervlak</h2>
          <p className="text-muted-foreground">
            Maak het oppervlak grondig schoon met een ontvetter of afwasmiddel. Verwijder vet, stof en vuil volledig. Vinyl hecht niet goed op een vuil of vettig oppervlak. Laat het daarna volledig drogen.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-3">Stap 2 — Bepaal de positie</h2>
          <p className="text-muted-foreground">
            Houd de belettering (nog op de transferfolie) op de gewenste plek. Gebruik stukjes maskingtape om de positie tijdelijk vast te zetten en stap achteruit om te controleren of het recht en goed zit.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-3">Stap 3 — Verwijder de achterkant</h2>
          <p className="text-muted-foreground">
            Verwijder voorzichtig het siliconen papier aan de achterkant. Doe dit langzaam en in een kleine hoek. Als de letters meekomen met het papier, druk ze dan terug en probeer het opnieuw.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-3">Stap 4 — Plak de belettering</h2>
          <p className="text-muted-foreground">
            Leg de belettering op de juiste plek en druk het midden als eerste aan. Werk daarna vanuit het midden naar buiten om luchtbellen te voorkomen. Gebruik een bankpasje om stevig aan te strijken.
          </p>

          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 my-6">
            <p className="text-sm font-semibold text-primary mb-1">Tip: natte methode</p>
            <p className="text-sm text-muted-foreground">Spuit een klein beetje water met afwasmiddel op het oppervlak voordat je plakt. Je kunt de belettering dan nog verschuiven voor de perfecte positie. Laat daarna goed drogen (minimaal 24 uur).</p>
          </div>

          <h2 className="text-xl font-bold mt-8 mb-3">Stap 5 — Verwijder de transferfolie</h2>
          <p className="text-muted-foreground">
            Verwijder de bovenste transferfolie langzaam in een kleine hoek (bijna plat). Als een letter meegaat, druk hem dan terug en strijk nogmaals aan voordat je verder gaat.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-3">Stap 6 — Controleer en druk aan</h2>
          <p className="text-muted-foreground">
            Strijk de belettering nogmaals volledig aan met je bankpasje. Controleer alle randen en hoekjes. Eventuele kleine luchtbellen prik je door met een naald en strijk ze glad.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-3">Extra tips</h2>
          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
            <li>Plak bij voorkeur bij temperaturen tussen 10°C en 25°C</li>
            <li>Plak niet in direct zonlicht — het vinyl droogt dan te snel</li>
            <li>Bij gebogen oppervlakken: gebruik een haardroger om het vinyl soepel te maken</li>
            <li>Wacht minimaal 24 uur voordat je de auto wast</li>
          </ul>

          <div className="bg-muted rounded-2xl p-6 mt-10">
            <p className="font-bold mb-2">Nog geen belettering besteld?</p>
            <p className="text-muted-foreground text-sm mb-4">Ontwerp je eigen tekst, kies je kleur en lettertype en ontvang het snel thuis.</p>
            <Link to="/" className="inline-block bg-primary text-white font-bold px-6 py-3 rounded-xl hover:opacity-90 transition text-sm">
              Belettering bestellen →
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
