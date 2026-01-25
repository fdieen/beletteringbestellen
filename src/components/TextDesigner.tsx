import { useState, useMemo, useCallback } from 'react';
import { ShoppingCart, Info, Check, Sparkles } from 'lucide-react';
import {
  calculatePrice,
  formatPrice,
  COLOR_OPTIONS,
  FONT_OPTIONS,
  VOLUME_DISCOUNTS,
  ColorOption,
  FontOption,
  FontCategory
} from '@/lib/pricing';

const FONT_CATEGORY_LABELS: Record<FontCategory, string> = {
  zakelijk: '💼 Zakelijk',
  klassiek: '📜 Klassiek',
  modern: '⚡ Modern',
  speels: '🎈 Speels',
  handschrift: '✍️ Handschrift',
};

const fontsByCategory = FONT_OPTIONS.reduce((acc, font) => {
  if (!acc[font.category]) acc[font.category] = [];
  acc[font.category].push(font);
  return acc;
}, {} as Record<FontCategory, FontOption[]>);
import { StickerPreview, StickerDimensions } from './StickerPreview';
import { useCart } from '@/context/CartContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function TextDesigner() {
  const [text, setText] = useState('');
  const [selectedFont, setSelectedFont] = useState<FontOption>(FONT_OPTIONS[0]);
  const [selectedColor, setSelectedColor] = useState<ColorOption>(COLOR_OPTIONS[0]); // Black default
  const [heightCm, setHeightCm] = useState(5);
  const [quantity, setQuantity] = useState(1);
  const [stickerDimensions, setStickerDimensions] = useState<StickerDimensions>({ widthCm: 0, heightCm: 0 });
  const { addItem } = useCart();

  const handleDimensionsChange = useCallback((dimensions: StickerDimensions) => {
    setStickerDimensions(dimensions);
  }, []);

  const letterCount = text.replace(/\s/g, '').length;

  const priceCalculation = useMemo(() => {
    return calculatePrice(text, heightCm, selectedColor, quantity);
  }, [text, heightCm, selectedColor, quantity]);

  const handleAddToCart = () => {
    if (letterCount === 0) return;
    
    addItem({
      text,
      font: selectedFont,
      color: selectedColor,
      heightCm,
      quantity,
      priceCalculation,
    });
    
    // Reset form
    setText('');
    setQuantity(1);
  };

  const handleFontChange = (fontId: string) => {
    const font = FONT_OPTIONS.find(f => f.id === fontId);
    if (font) setSelectedFont(font);
  };

  return (
    <section id="ontwerp" className="py-16 md:py-24 bg-muted/30">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Ontwerp je plakletters
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Typ je tekst, kies je stijl en zie direct wat het kost. Zo simpel is het!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Design Panel */}
          <div className="card-elevated space-y-6">
            {/* Text Input */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Jouw tekst
              </label>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Typ hier je tekst..."
                className="input-styled text-lg"
                maxLength={50}
              />
              <p className="text-xs text-muted-foreground mt-1">
                <span className="font-medium">{letterCount}</span> letters (spaties tellen niet mee)
              </p>
            </div>

            {/* Font Selection - Dropdown with Categories */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Lettertype
              </label>
              <Select value={selectedFont.id} onValueChange={handleFontChange}>
                <SelectTrigger className="w-full h-12">
                  <SelectValue>
                    <span style={{ fontFamily: selectedFont.fontFamily }}>
                      {selectedFont.name}
                    </span>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="bg-background border border-border max-h-80">
                  {(Object.keys(fontsByCategory) as FontCategory[]).map((category) => (
                    <div key={category}>
                      <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground bg-muted/50 sticky top-0">
                        {FONT_CATEGORY_LABELS[category]}
                      </div>
                      {fontsByCategory[category].map((font) => (
                        <SelectItem
                          key={font.id}
                          value={font.id}
                          className="cursor-pointer"
                        >
                          <span style={{ fontFamily: font.fontFamily }}>
                            {font.name}
                          </span>
                        </SelectItem>
                      ))}
                    </div>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Color Selection */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Kleur
              </label>
              <div className="space-y-3">
                {/* Standard colors */}
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Standaard (geen toeslag)</p>
                  <div className="flex flex-wrap gap-2">
                    {COLOR_OPTIONS.filter(c => c.category === 'standard').map((color) => (
                      <button
                        key={color.id}
                        onClick={() => setSelectedColor(color)}
                        className={`w-10 h-10 rounded-lg border-2 transition-all relative ${
                          selectedColor.id === color.id
                            ? 'border-primary ring-2 ring-primary/30 scale-110'
                            : 'border-border hover:scale-105'
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      >
                        {selectedColor.id === color.id && (
                          <Check className={`w-5 h-5 absolute inset-0 m-auto ${
                            color.id === 'white' || color.id === 'lightgray' ? 'text-foreground' : 'text-white'
                          }`} />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Colored */}
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Gekleurd (+€0,02/letter/cm)</p>
                  <div className="flex flex-wrap gap-2">
                    {COLOR_OPTIONS.filter(c => c.category === 'colored').map((color) => (
                      <button
                        key={color.id}
                        onClick={() => setSelectedColor(color)}
                        className={`w-10 h-10 rounded-lg border-2 transition-all relative ${
                          selectedColor.id === color.id
                            ? 'border-primary ring-2 ring-primary/30 scale-110'
                            : 'border-border hover:scale-105'
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      >
                        {selectedColor.id === color.id && (
                          <Check className={`w-5 h-5 absolute inset-0 m-auto ${
                            color.id === 'yellow' ? 'text-foreground' : 'text-white'
                          }`} />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Metallic */}
                <div>
                  <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Metallic (+€0,05/letter/cm)
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {COLOR_OPTIONS.filter(c => c.category === 'metallic').map((color) => (
                      <button
                        key={color.id}
                        onClick={() => setSelectedColor(color)}
                        className={`w-10 h-10 rounded-lg border-2 transition-all relative ${
                          selectedColor.id === color.id
                            ? 'border-primary ring-2 ring-primary/30 scale-110'
                            : 'border-border hover:scale-105'
                        }`}
                        style={{ 
                          backgroundColor: color.hex,
                          background: color.id === 'silver' 
                            ? 'linear-gradient(135deg, #E8E8E8 0%, #B8B8B8 50%, #E8E8E8 100%)' 
                            : color.hex
                        }}
                        title={color.name}
                      >
                        {selectedColor.id === color.id && (
                          <Check className="w-5 h-5 absolute inset-0 m-auto text-foreground" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Height Selection */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Hoogte: <span className="text-primary font-semibold">{heightCm} cm</span>
              </label>
              <input
                type="range"
                min="2"
                max="30"
                value={heightCm}
                onChange={(e) => setHeightCm(Number(e.target.value))}
                className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>2 cm</span>
                <span>30 cm</span>
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Aantal
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-muted transition-colors"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                    className="w-16 text-center py-2 border-x border-border bg-transparent"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-muted transition-colors"
                  >
                    +
                  </button>
                </div>
                
                {/* Volume discount hint */}
                {priceCalculation.volumeDiscount && (
                  <span className="price-badge">
                    {priceCalculation.volumeDiscount.label}
                  </span>
                )}
              </div>
              
              {/* Volume discount info */}
              <div className="mt-3 p-3 bg-muted rounded-lg">
                <p className="text-xs font-medium text-foreground mb-2 flex items-center gap-1">
                  <Info className="w-3 h-3" />
                  Staffelkorting
                </p>
                <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                  {VOLUME_DISCOUNTS.map((discount, i) => (
                    <div 
                      key={i}
                      className={`${priceCalculation.volumeDiscount === discount ? 'text-success font-medium' : ''}`}
                    >
                      {discount.minQuantity}{discount.maxQuantity ? `-${discount.maxQuantity}` : '+'} stuks: {Math.round(discount.discount * 100)}%
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Preview & Price Panel */}
          <div className="space-y-6">
            {/* Live Sticker Preview with SVG */}
            <div className="card-elevated">
              <h3 className="text-sm font-medium text-muted-foreground mb-4">
                Live Preview
              </h3>
              <StickerPreview
                text={text}
                fontFamily={selectedFont.fontFamily}
                stickerColor={selectedColor.hex}
                heightCm={heightCm}
                onDimensionsChange={handleDimensionsChange}
              />
              {letterCount > 0 && (
                <p className="text-xs text-muted-foreground text-center mt-3">
                  {selectedFont.name} · {selectedColor.name} · {stickerDimensions.widthCm} × {stickerDimensions.heightCm} cm
                </p>
              )}
            </div>

            {/* Price Card */}
            <div className="card-elevated bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
              <div className="space-y-4">
                {letterCount > 0 ? (
                  <>
                    {/* Price breakdown */}
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          {priceCalculation.letterCount} letters × {heightCm} cm × €0,22
                        </span>
                        <span>{formatPrice(priceCalculation.basePrice)}</span>
                      </div>
                      
                      {priceCalculation.colorSurcharge > 0 && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Kleurtoeslag ({selectedColor.name})
                          </span>
                          <span>+ {formatPrice(priceCalculation.colorSurcharge)}</span>
                        </div>
                      )}
                      
                      {quantity > 1 && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            × {quantity} stuks
                          </span>
                          <span>{formatPrice(priceCalculation.subtotal)}</span>
                        </div>
                      )}
                      
                      {priceCalculation.discountAmount > 0 && (
                        <div className="flex justify-between text-success">
                          <span>
                            Staffelkorting ({priceCalculation.volumeDiscount?.label})
                          </span>
                          <span>- {formatPrice(priceCalculation.discountAmount)}</span>
                        </div>
                      )}
                    </div>

                    {/* Total */}
                    <div className="border-t border-border pt-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-sm text-muted-foreground">Jouw prijs</span>
                          <p className="text-xs text-muted-foreground">Incl. 21% BTW</p>
                        </div>
                        <div className="text-right">
                          <span className="price-highlight">
                            {formatPrice(priceCalculation.total)}
                          </span>
                          {quantity > 1 && (
                            <p className="text-xs text-muted-foreground">
                              {formatPrice(priceCalculation.pricePerUnit)} per stuk
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-4">
                    <span className="price-highlight text-muted-foreground">
                      € 0,00
                    </span>
                    <p className="text-xs text-muted-foreground mt-1">Incl. 21% BTW</p>
                  </div>
                )}

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  disabled={letterCount === 0}
                  className="w-full btn-hero flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Toevoegen aan winkelwagen
                </button>

                {/* Trust badges */}
                <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Check className="w-4 h-4 text-success" />
                    Geen opstartkosten
                  </span>
                  <span className="flex items-center gap-1">
                    <Check className="w-4 h-4 text-success" />
                    Snel geleverd
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
