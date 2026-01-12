import { Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer id="contact" className="bg-foreground text-background">
      <div className="section-container py-12 md:py-16">
        <div className="flex flex-col md:flex-row md:items-start gap-8">
          {/* Logo & About */}
          <div className="max-w-md">
            <div className="mb-4">
              <img 
                src="/assets/logo.png" 
                alt="Belettering Bestellen.nl" 
                className="h-14 w-auto"
              />
            </div>
            <p className="text-background/70 mb-6">
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
