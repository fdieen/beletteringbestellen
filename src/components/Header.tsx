import { ShoppingCart, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/pricing';

export function Header() {
  const { totalItems, totalPrice } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="section-container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <div className="flex items-center">
              <span className="text-xl md:text-2xl font-display font-bold text-primary">
                Belettering
              </span>
              <span className="text-xl md:text-2xl font-display font-bold text-foreground">
                Bestellen.nl
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#ontwerp" className="text-foreground/80 hover:text-primary transition-colors font-medium">
              Ontwerp
            </a>
            <a href="#hoe-werkt-het" className="text-foreground/80 hover:text-primary transition-colors font-medium">
              Hoe werkt het?
            </a>
            <a href="#faq" className="text-foreground/80 hover:text-primary transition-colors font-medium">
              FAQ
            </a>
            <a href="#contact" className="text-foreground/80 hover:text-primary transition-colors font-medium">
              Contact
            </a>
          </nav>

          {/* Cart Button */}
          <div className="flex items-center gap-4">
            <button className="relative flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium transition-all hover:opacity-90">
              <ShoppingCart className="w-5 h-5" />
              <span className="hidden sm:inline">
                {totalItems > 0 ? formatPrice(totalPrice) : 'Winkelwagen'}
              </span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground w-6 h-6 rounded-full text-sm font-bold flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-4">
              <a href="#ontwerp" className="text-foreground/80 hover:text-primary transition-colors font-medium py-2">
                Ontwerp
              </a>
              <a href="#hoe-werkt-het" className="text-foreground/80 hover:text-primary transition-colors font-medium py-2">
                Hoe werkt het?
              </a>
              <a href="#faq" className="text-foreground/80 hover:text-primary transition-colors font-medium py-2">
                FAQ
              </a>
              <a href="#contact" className="text-foreground/80 hover:text-primary transition-colors font-medium py-2">
                Contact
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
