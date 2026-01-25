import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/pricing';
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
        <button className="relative p-2.5 text-foreground hover:text-primary transition bg-muted rounded-xl border border-border shadow-sm">
          <ShoppingCart className="w-5 h-5" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[9px] font-black rounded-full w-4 h-4 flex items-center justify-center border-2 border-background">
              {totalItems}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-3 text-xl font-black">
            <ShoppingCart className="w-5 h-5" />
            Winkelwagen ({totalItems})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
            <div className="w-20 h-20 bg-muted rounded-2xl flex items-center justify-center mb-6">
              <ShoppingCart className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-black text-foreground mb-2">Je winkelwagen is leeg</h3>
            <p className="text-muted-foreground mb-6">
              Ontwerp je plakletters en voeg ze toe
            </p>
            <Button onClick={() => setOpen(false)} className="rounded-xl font-bold">
              Ga naar ontwerpen
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="bg-muted/50 rounded-2xl p-4 space-y-3 border border-border">
                  <div className="bg-background rounded-xl p-3 text-center overflow-hidden">
                    {item.logoImage ? (
                      <img
                        src={item.logoImage}
                        alt="Logo"
                        className="max-h-16 max-w-full mx-auto object-contain"
                      />
                    ) : (
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
                    )}
                  </div>

                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <p className="font-bold text-foreground">{item.text}</p>
                      <p className="text-xs text-muted-foreground font-medium">
                        {item.logoImage ? (
                          <>Full color print · {item.logoWidth} × {item.heightCm} cm</>
                        ) : (
                          <>{item.font.name} · {item.color.name} · {item.heightCm} cm</>
                        )}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-muted-foreground hover:text-destructive transition-colors rounded-lg hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center bg-background border-2 border-border rounded-xl">
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity, -1)}
                        className="px-3 py-2 hover:bg-muted transition-colors rounded-l-lg"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 py-2 font-bold">{item.quantity}</span>
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity, 1)}
                        className="px-3 py-2 hover:bg-muted transition-colors rounded-r-lg"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="font-black text-foreground text-lg">
                      {formatPrice(item.priceCalculation.total)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t-2 border-border pt-6 space-y-4">
              <div className="flex justify-between items-center text-lg">
                <span className="font-bold">Totaal</span>
                <span className="font-black text-2xl">{formatPrice(totalPrice)}</span>
              </div>
              <p className="text-[10px] text-muted-foreground text-center uppercase tracking-widest font-bold">
                Incl. 21% BTW · Gratis verzending
              </p>
              
              <Button 
                onClick={handleCheckout} 
                className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-black text-base rounded-2xl shadow-lg shadow-primary/20"
                size="lg"
              >
                Afrekenen
              </Button>
              
              <button
                onClick={clearCart}
                className="w-full text-sm text-muted-foreground hover:text-destructive transition-colors py-2 font-medium"
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
