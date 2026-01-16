import { Menu, X, User, LogOut, ShoppingCart, Heart } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartSheet } from '@/components/CartSheet';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 glass-effect border-b border-border/50">
      <div className="section-container">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="bg-primary text-primary-foreground p-2 rounded-xl shadow-lg shadow-primary/20">
              <span className="font-black text-xl tracking-tighter italic">BB</span>
            </div>
            <span className="text-xl font-black text-foreground tracking-tight hidden sm:block">
              Belettering<span className="text-primary">Bestellen</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10">
            <a href="/#ontwerp" className="text-muted-foreground hover:text-primary font-bold text-xs uppercase tracking-widest transition">
              Ontwerp
            </a>
            <a href="/#hoe-werkt-het" className="text-muted-foreground hover:text-primary font-bold text-xs uppercase tracking-widest transition">
              Hoe werkt het
            </a>
            <Link to="/faq" className="text-muted-foreground hover:text-primary font-bold text-xs uppercase tracking-widest transition">
              FAQ
            </Link>
            <Link to="/contact" className="text-muted-foreground hover:text-primary font-bold text-xs uppercase tracking-widest transition">
              Contact
            </Link>
          </nav>

          {/* Cart & Account */}
          <div className="flex items-center gap-3">
            <CartSheet />
            
            {/* Account Button */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    className="flex items-center gap-2 bg-foreground text-background hover:bg-foreground/90 font-black text-[10px] uppercase tracking-widest px-6 py-3 rounded-xl shadow-lg"
                  >
                    <User className="w-4 h-4" />
                    <span className="hidden md:inline">Account</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-popover rounded-xl border border-border shadow-xl">
                  <DropdownMenuItem onClick={() => navigate('/mijn-account')} className="cursor-pointer font-medium">
                    <User className="w-4 h-4 mr-2" />
                    Mijn Account
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer font-medium">
                    <LogOut className="w-4 h-4 mr-2" />
                    Uitloggen
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                onClick={() => navigate('/auth')}
                className="flex items-center gap-2 bg-foreground text-background hover:bg-foreground/90 font-black text-[10px] uppercase tracking-widest px-6 py-3 rounded-xl shadow-lg"
              >
                <User className="w-4 h-4" />
                <span className="hidden md:inline">Account</span>
              </Button>
            )}

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden py-6 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-4">
              <a 
                href="/#ontwerp" 
                className="text-muted-foreground hover:text-primary transition font-bold text-xs uppercase tracking-widest py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Ontwerp
              </a>
              <a 
                href="/#hoe-werkt-het" 
                className="text-muted-foreground hover:text-primary transition font-bold text-xs uppercase tracking-widest py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Hoe werkt het
              </a>
              <Link 
                to="/faq" 
                className="text-muted-foreground hover:text-primary transition font-bold text-xs uppercase tracking-widest py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link 
                to="/contact" 
                className="text-muted-foreground hover:text-primary transition font-bold text-xs uppercase tracking-widest py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              {user ? (
                <>
                  <Link 
                    to="/mijn-account" 
                    className="text-muted-foreground hover:text-primary transition font-bold text-xs uppercase tracking-widest py-2 flex items-center gap-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User className="w-4 h-4" />
                    Mijn Account
                  </Link>
                  <button 
                    className="text-muted-foreground hover:text-primary transition font-bold text-xs uppercase tracking-widest py-2 flex items-center gap-2 text-left"
                    onClick={() => {
                      handleSignOut();
                      setMobileMenuOpen(false);
                    }}
                  >
                    <LogOut className="w-4 h-4" />
                    Uitloggen
                  </button>
                </>
              ) : (
                <Link 
                  to="/auth" 
                  className="text-muted-foreground hover:text-primary transition font-bold text-xs uppercase tracking-widest py-2 flex items-center gap-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="w-4 h-4" />
                  Inloggen
                </Link>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
