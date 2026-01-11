import { ShoppingCart, Trash2, Plus, Minus, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice, calculatePrice } from '@/lib/pricing';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function CartSheet() {
  const { items, totalItems, totalPrice, removeItem, updateQuantity, clearCart } = useCart();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = () => {
    setOpen(false);
    navigate('/checkout');
  };

  const handleUpdateQuantity = (id: string, currentQuantity: number, delta: number) => {
    const newQuantity = Math.max(1, currentQuantity + delta);
    updateQuantity(id, newQuantity);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
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
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Winkelwagen ({totalItems} {totalItems === 1 ? 'item' : 'items'})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
            <ShoppingCart className="w-16 h-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">Je winkelwagen is leeg</h3>
            <p className="text-muted-foreground mb-6">
              Ontwerp je plakletters en voeg ze toe aan je winkelwagen
            </p>
            <Button onClick={() => setOpen(false)} variant="default">
              Ga naar ontwerpen
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="bg-muted/50 rounded-xl p-4 space-y-3">
                  {/* Preview */}
                  <div className="bg-background rounded-lg p-3 text-center overflow-hidden">
                    <span
                      className="text-xl break-words"
                      style={{
                        fontFamily: item.font.fontFamily,
                        color: item.color.hex,
                        textShadow: item.color.id === 'white' ? '0 1px 2px rgba(0,0,0,0.3)' : 'none',
                      }}
                    >
                      {item.text}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <p className="font-medium text-foreground">{item.text}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.font.name} · {item.color.name} · {item.heightCm} cm
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                      aria-label="Verwijderen"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Quantity & Price */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-border rounded-lg">
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity, -1)}
                        className="px-3 py-1 hover:bg-muted transition-colors"
                        aria-label="Verminderen"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 py-1 font-medium">{item.quantity}</span>
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity, 1)}
                        className="px-3 py-1 hover:bg-muted transition-colors"
                        aria-label="Verhogen"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="font-bold text-primary text-lg">
                      {formatPrice(item.priceCalculation.total)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-border pt-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Subtotaal</span>
                <span className="font-medium">{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between items-center text-lg">
                <span className="font-medium">Totaal</span>
                <span className="font-bold text-primary">{formatPrice(totalPrice)}</span>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Incl. 21% BTW · Verzendkosten worden berekend bij afrekenen
              </p>
              
              <Button 
                onClick={handleCheckout} 
                className="w-full btn-hero"
                size="lg"
              >
                Afrekenen
              </Button>
              
              <button
                onClick={clearCart}
                className="w-full text-sm text-muted-foreground hover:text-destructive transition-colors py-2"
              >
                Winkelwagen legen
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
