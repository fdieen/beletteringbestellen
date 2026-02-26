import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('cookies-accepted');
    if (!accepted) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem('cookies-accepted', 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-foreground text-background p-4 shadow-2xl">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-sm text-background/80 max-w-2xl">
          Wij gebruiken functionele cookies voor het winkelmandje en analytische cookies om de website te verbeteren.
          Lees meer in ons{' '}
          <Link to="/privacybeleid" className="underline text-background hover:text-primary transition">
            privacybeleid
          </Link>.
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={accept}
            className="bg-primary text-white font-bold px-5 py-2 rounded-xl text-sm hover:opacity-90 transition"
          >
            Accepteren
          </button>
          <button
            onClick={accept}
            className="border border-background/30 text-background/70 font-medium px-5 py-2 rounded-xl text-sm hover:border-background/60 transition"
          >
            Alleen functioneel
          </button>
        </div>
      </div>
    </div>
  );
}
