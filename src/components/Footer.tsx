import { Mail, Phone, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-foreground text-background pt-20 pb-12">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-16">
          {/* Logo & About */}
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-primary p-2 rounded-xl">
                <span className="font-black text-xl italic tracking-tighter text-primary-foreground">BB</span>
              </div>
              <span className="text-2xl font-black tracking-tight">
                Belettering<span className="text-primary">Bestellen</span>
              </span>
            </div>
            <p className="text-background/60 max-w-sm leading-relaxed text-lg font-medium">
              Wij maken design toegankelijk voor iedereen. Hoogwaardige belettering, voor een fractie van de prijs.
            </p>
          </div>
          
          {/* Klantenservice */}
          <div className="space-y-6">
            <h4 className="font-black uppercase text-[10px] tracking-[0.2em] text-background/50">Klantenservice</h4>
            <ul className="space-y-4 text-background/60 font-medium">
              <li>
                <Link to="/faq" className="hover:text-primary transition">Hulp bij plakken</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary transition">Contact opnemen</Link>
              </li>
            </ul>
          </div>

          {/* Belettering */}
          <div className="space-y-6">
            <h4 className="font-black uppercase text-[10px] tracking-[0.2em] text-background/50">Belettering</h4>
            <ul className="space-y-4 text-background/60 font-medium">
              <li>
                <Link to="/autobelettering" className="hover:text-primary transition">Autobelettering</Link>
              </li>
              <li>
                <Link to="/raambelettering" className="hover:text-primary transition">Raambelettering</Link>
              </li>
              <li>
                <Link to="/bootbelettering" className="hover:text-primary transition">Bootbelettering</Link>
              </li>
              <li>
                <Link to="/muur-belettering" className="hover:text-primary transition">Muurbelettering</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="font-black uppercase text-[10px] tracking-[0.2em] text-background/50">Contact</h4>
            <div className="space-y-3 text-background/60 font-medium">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:info@beletteringbestellen.nl" className="hover:text-primary transition">
                  info@beletteringbestellen.nl
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <a href="tel:+31614145350" className="hover:text-primary transition">
                  06 14 14 53 50
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                <a href="https://wa.me/31614145350" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition">
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-background/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-background/40 font-medium">
            © {new Date().getFullYear()} BeletteringBestellen.nl. Alle rechten voorbehouden.
          </p>

          {/* Betaalmethodes */}
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <span className="text-xs text-background/30 font-medium mr-1">Betalen via</span>

            {/* iDEAL */}
            <div className="bg-white rounded px-2.5 py-1 flex items-center h-7">
              <svg width="48" height="18" viewBox="0 0 48 18" fill="none">
                {/* i - stem */}
                <rect x="1.5" y="8" width="3" height="9" rx="1.5" fill="#CC0066"/>
                {/* i - hart boven de stam */}
                <path d="M3 7C3 7 0.5 5 0.8 3C1.1 1.2 2.5 0.5 3 1.5C3.5 0.5 4.9 1.2 5.2 3C5.5 5 3 7 3 7Z" fill="#CC0066"/>
                {/* DEAL */}
                <text x="9" y="16" fontFamily="Arial Black, Arial, sans-serif" fontSize="13" fontWeight="900" fill="#CC0066" letterSpacing="0.3">DEAL</text>
              </svg>
            </div>

            {/* Bancontact */}
            <div className="bg-white rounded px-2 py-1 flex items-center h-7">
              <svg width="54" height="18" viewBox="0 0 54 18" fill="none">
                {/* Blauwe helft */}
                <rect width="27" height="18" rx="3" fill="#005498"/>
                {/* Gele helft */}
                <rect x="27" width="27" height="18" rx="3" fill="#FFD700"/>
                {/* Witte B op blauw */}
                <text x="13" y="13.5" textAnchor="middle" fill="white" fontSize="11" fontWeight="900" fontFamily="Arial Black, Arial">B</text>
                {/* Blauwe C op geel */}
                <text x="41" y="13.5" textAnchor="middle" fill="#005498" fontSize="11" fontWeight="900" fontFamily="Arial Black, Arial">C</text>
              </svg>
            </div>

            {/* Visa */}
            <div className="bg-white rounded px-2.5 py-1 flex items-center h-7">
              <svg width="40" height="14" viewBox="0 0 40 14" fill="none">
                {/* Klassiek Visa blauw italic */}
                <text x="0" y="13" fill="#1A1F71" fontSize="14" fontWeight="900" fontFamily="Arial Black, Arial" fontStyle="italic" letterSpacing="-0.5">VISA</text>
              </svg>
            </div>

            {/* Mastercard */}
            <div className="bg-white rounded px-2.5 py-1 flex items-center gap-1.5 h-7">
              <svg width="34" height="20" viewBox="0 0 34 20" fill="none">
                {/* Rode cirkel links */}
                <circle cx="12" cy="10" r="10" fill="#EB001B"/>
                {/* Gele cirkel rechts */}
                <circle cx="22" cy="10" r="10" fill="#F79E1B"/>
                {/* Overlapping oranje gebied */}
                <path d="M17 3.27a10 10 0 0 1 0 13.46A10 10 0 0 1 17 3.27z" fill="#FF5F00"/>
              </svg>
            </div>

            {/* Mollie */}
            <div className="bg-white rounded px-2 py-1 flex items-center gap-1.5 h-7">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                {/* Mollie M-vorm: twee bogen */}
                <circle cx="4" cy="9" r="3.5" fill="none" stroke="#FF6640" strokeWidth="2.5"/>
                <circle cx="10" cy="9" r="3.5" fill="none" stroke="#FF6640" strokeWidth="2.5"/>
                <rect x="0.75" y="2" width="2.5" height="10" rx="1.25" fill="#FF6640"/>
              </svg>
              <span className="text-[12px] font-black text-[#FF6640] tracking-tight">mollie</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
