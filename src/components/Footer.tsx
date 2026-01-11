import { Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer id="contact" className="bg-foreground text-background">
      <div className="section-container py-12 md:py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo & About */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <span className="text-xl font-display font-bold text-primary-foreground">
                Belettering
              </span>
              <span className="text-xl font-display font-bold">
                Bestellen.nl
              </span>
            </div>
            <p className="text-background/70 mb-6 max-w-md">
              De simpelste en goedkoopste manier om plakletters te bestellen. 
              Ontwerp, bestel en ontvang snel in huis. Zelf plakken = goedkoper!
            </p>
            <div className="space-y-2 text-sm text-background/70">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:info@bestellen.nl" className="hover:text-background transition-colors">
                  info@bestellen.nl
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <a href="tel:+31612345678" className="hover:text-background transition-colors">
                  +31 6 12 34 56 78
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Snelle links</h4>
            <ul className="space-y-2 text-background/70">
              <li>
                <a href="#ontwerp" className="hover:text-background transition-colors">
                  Ontwerp je tekst
                </a>
              </li>
              <li>
                <a href="#hoe-werkt-het" className="hover:text-background transition-colors">
                  Hoe werkt het?
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-background transition-colors">
                  Veelgestelde vragen
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Verzending & Levering
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Klantenservice</h4>
            <ul className="space-y-2 text-background/70">
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Retourneren
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Algemene voorwaarden
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Privacybeleid
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-background/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-background/50">
            © {new Date().getFullYear()} BeletteringBestellen.nl. Alle rechten voorbehouden.
          </p>
          <div className="flex items-center gap-4">
            <img 
              src="https://cdn.brandfetch.io/idL7iEnWmr/theme/dark/symbol.svg?k=bfHSJFAPEG" 
              alt="iDEAL" 
              className="h-8 opacity-70 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
