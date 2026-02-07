import { useState, useCallback, useRef } from 'react';
import { Upload, X, ShoppingCart, Check, ImageIcon, Maximize2, Palette } from 'lucide-react';
import { formatPrice } from '@/lib/pricing';
import { useCart } from '@/context/CartContext';

// Pricing for full-color printed stickers (tiered per cm²)
const LOGO_MIN_PRICE = 5.00;

function calculateLogoPrice(areaCm2: number): number {
  if (areaCm2 <= 100) {
    // Tot 100 cm²: €0,05 per cm²
    return Math.max(areaCm2 * 0.05, LOGO_MIN_PRICE);
  } else if (areaCm2 <= 500) {
    // 100-500 cm²: eerste 100 cm² à €0,05, rest à €0,04
    return 100 * 0.05 + (areaCm2 - 100) * 0.04;
  } else {
    // 500+ cm²: eerste 100 à €0,05, 100-500 à €0,04, rest à €0,03
    return 100 * 0.05 + 400 * 0.04 + (areaCm2 - 500) * 0.03;
  }
}

interface LogoDimensions {
  widthCm: number;
  heightCm: number;
  area: number;
}

export function LogoUploader() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [sizeCm, setSizeCm] = useState(10); // Width in cm
  const [aspectRatio, setAspectRatio] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addItem } = useCart();

  const handleFileSelect = useCallback((file: File) => {
    if (!file.type.match(/image\/(png|svg\+xml|jpeg|jpg)/)) {
      alert('Alleen PNG, SVG of JPG bestanden zijn toegestaan');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        setAspectRatio(img.width / img.height);
        setUploadedImage(e.target?.result as string);
        setFileName(file.name);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  }, [handleFileSelect]);

  const clearImage = () => {
    setUploadedImage(null);
    setFileName('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Calculate dimensions and price
  const dimensions: LogoDimensions = {
    widthCm: sizeCm,
    heightCm: Math.round((sizeCm / aspectRatio) * 10) / 10,
    area: sizeCm * (sizeCm / aspectRatio),
  };

  const basePrice = calculateLogoPrice(dimensions.area);
  const unitPrice = basePrice;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    if (!uploadedImage) return;

    // Full color print - no specific vinyl color
    const fullColorOption = { id: 'fullcolor', name: 'Full Color Print', hex: '#000000', category: 'standard' as const, surcharge: 0 };

    addItem({
      text: `Logo: ${fileName}`,
      font: { id: 'logo', name: 'Logo Upload', fontFamily: 'sans-serif', category: 'zakelijk' as const },
      color: fullColorOption,
      heightCm: dimensions.heightCm,
      quantity,
      priceCalculation: {
        text: `Logo: ${fileName}`,
        letterCount: 0,
        heightCm: dimensions.heightCm,
        color: fullColorOption,
        quantity,
        basePrice,
        colorSurcharge: 0,
        subtotal: unitPrice * quantity,
        volumeDiscount: null,
        discountAmount: 0,
        total: totalPrice,
        pricePerUnit: unitPrice,
      },
      logoImage: uploadedImage,
      logoWidth: dimensions.widthCm,
    });

    // Reset
    clearImage();
    setQuantity(1);
  };

  return (
    <section id="logo-upload" className="py-16 md:py-24 bg-background">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Upload je eigen logo
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Heb je een eigen ontwerp? Upload je logo en wij printen het als full color sticker.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Upload Panel */}
          <div className="card-elevated space-y-6">
            {/* Upload Zone */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Upload je logo
              </label>

              {!uploadedImage ? (
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                    isDragging
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50 hover:bg-muted/50'
                  }`}
                >
                  <Upload className={`w-12 h-12 mx-auto mb-4 ${isDragging ? 'text-primary' : 'text-muted-foreground'}`} />
                  <p className="text-foreground font-medium mb-1">
                    Sleep je bestand hierheen
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    of klik om te selecteren
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PNG, SVG of JPG (transparante achtergrond aanbevolen)
                  </p>
                </div>
              ) : (
                <div className="relative border border-border rounded-xl p-4 bg-muted/30">
                  <button
                    onClick={clearImage}
                    className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-[#e5e5e5] rounded-lg flex items-center justify-center overflow-hidden"
                         style={{ backgroundImage: 'repeating-conic-gradient(#ccc 0% 25%, transparent 0% 50%) 50% / 10px 10px' }}>
                      <img
                        src={uploadedImage}
                        alt="Uploaded logo"
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-foreground truncate max-w-[200px]">
                        {fileName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Verhouding: {aspectRatio.toFixed(2)}:1
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/svg+xml,image/jpeg,image/jpg"
                onChange={handleInputChange}
                className="hidden"
              />
            </div>

            {/* Size Selection */}
            {uploadedImage && (
              <>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    <Maximize2 className="w-4 h-4 inline mr-1" />
                    Breedte: <span className="text-primary font-semibold">{sizeCm} cm</span>
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="100"
                    value={sizeCm}
                    onChange={(e) => setSizeCm(Number(e.target.value))}
                    className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>5 cm</span>
                    <span>100 cm</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Afmetingen: {dimensions.widthCm} × {dimensions.heightCm} cm
                  </p>
                </div>

                {/* Full Color Info */}
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <Palette className="w-8 h-8 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">Full Color Print</p>
                      <p className="text-sm text-muted-foreground">
                        Je logo wordt geprint in de originele kleuren en contour gesneden langs de vorm van je logo.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Aantal
                  </label>
                  <div className="flex items-center border border-border rounded-lg w-fit">
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
                </div>
              </>
            )}
          </div>

          {/* Preview & Price Panel */}
          <div className="space-y-6">
            {/* Preview */}
            <div className="card-elevated">
              <h3 className="text-sm font-medium text-muted-foreground mb-4">
                Preview
              </h3>
              <div
                className="relative rounded-xl overflow-hidden min-h-[200px] flex items-center justify-center"
                style={{
                  backgroundColor: '#E5E7EB',
                  backgroundImage: 'repeating-conic-gradient(#ccc 0% 25%, transparent 0% 50%) 50% / 20px 20px'
                }}
              >
                {uploadedImage ? (
                  <div className="p-8">
                    <img
                      src={uploadedImage}
                      alt="Logo preview"
                      className="max-w-full max-h-[200px] object-contain"
                    />
                  </div>
                ) : (
                  <div className="text-center p-8">
                    <ImageIcon className="w-16 h-16 text-muted-foreground/50 mx-auto mb-2" />
                    <p className="text-muted-foreground italic">
                      Upload een logo om een preview te zien
                    </p>
                  </div>
                )}
              </div>
              {uploadedImage && (
                <p className="text-xs text-muted-foreground text-center mt-3">
                  Full color print · {dimensions.widthCm} × {dimensions.heightCm} cm
                </p>
              )}
            </div>

            {/* Price Card */}
            <div className="card-elevated bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
              <div className="space-y-4">
                {uploadedImage ? (
                  <>
                    {/* Price breakdown */}
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          {dimensions.area.toFixed(1)} cm² full color print
                        </span>
                        <span>{formatPrice(basePrice)}</span>
                      </div>

                      {quantity > 1 && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            × {quantity} stuks
                          </span>
                          <span>{formatPrice(totalPrice)}</span>
                        </div>
                      )}

                      <div className="text-xs text-muted-foreground space-y-1 pt-2 border-t border-border">
                        <p className="font-medium">Staffelprijs:</p>
                        <p>• Tot 100 cm²: €0,05/cm²</p>
                        <p>• 100-500 cm²: €0,04/cm²</p>
                        <p>• 500+ cm²: €0,03/cm²</p>
                        <p className="pt-1">Minimum: €5,00</p>
                      </div>
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
                            {formatPrice(totalPrice)}
                          </span>
                          {quantity > 1 && (
                            <p className="text-xs text-muted-foreground">
                              {formatPrice(unitPrice)} per stuk
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
                  disabled={!uploadedImage}
                  className="w-full btn-hero flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Toevoegen aan winkelwagen
                </button>

                {/* Trust badges */}
                <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Check className="w-4 h-4 text-success" />
                    Contour gesneden
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
