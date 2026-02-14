import { Mail, Phone, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-foreground text-background pt-20 pb-12">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-16">
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
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 text-success fill-current" />)}
              </div>
              <span className="text-[10px] font-bold text-background/50 uppercase tracking-widest">4.9/5 Klanttevredenheid</span>
            </div>
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
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-background/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-background/40 font-medium">
            © {new Date().getFullYear()} BeletteringBestellen.nl. Alle rechten voorbehouden.
          </p>
        </div>
      </div>
    </footer>
  );
}
