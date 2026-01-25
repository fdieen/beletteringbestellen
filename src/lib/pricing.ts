// Pricing logic for bestellen.nl

export const BASE_PRICE_PER_LETTER_PER_CM = 0.22;
export const BTW_RATE = 0.21;

export type ColorCategory = 'standard' | 'colored' | 'metallic';

export interface ColorOption {
  id: string;
  name: string;
  hex: string;
  category: ColorCategory;
  surcharge: number;
}

export const COLOR_OPTIONS: ColorOption[] = [
  // Standard colors (no surcharge)
  { id: 'black', name: 'Zwart', hex: '#1a1a1a', category: 'standard', surcharge: 0 },
  { id: 'white', name: 'Wit', hex: '#FFFFFF', category: 'standard', surcharge: 0 },
  { id: 'darkgray', name: 'Donkergrijs', hex: '#4a4a4a', category: 'standard', surcharge: 0 },
  { id: 'lightgray', name: 'Lichtgrijs', hex: '#a0a0a0', category: 'standard', surcharge: 0 },

  // Colored (+€0.02 per letter per cm)
  { id: 'red', name: 'Rood', hex: '#E53935', category: 'colored', surcharge: 0.02 },
  { id: 'blue', name: 'Blauw', hex: '#1E88E5', category: 'colored', surcharge: 0.02 },
  { id: 'navy', name: 'Marineblauw', hex: '#1a237e', category: 'colored', surcharge: 0.02 },
  { id: 'green', name: 'Groen', hex: '#43A047', category: 'colored', surcharge: 0.02 },
  { id: 'lime', name: 'Limegroen', hex: '#7cb342', category: 'colored', surcharge: 0.02 },
  { id: 'yellow', name: 'Geel', hex: '#FDD835', category: 'colored', surcharge: 0.02 },
  { id: 'orange', name: 'Oranje', hex: '#FB8C00', category: 'colored', surcharge: 0.02 },
  { id: 'purple', name: 'Paars', hex: '#8E24AA', category: 'colored', surcharge: 0.02 },
  { id: 'pink', name: 'Roze', hex: '#E91E63', category: 'colored', surcharge: 0.02 },
  { id: 'turquoise', name: 'Turquoise', hex: '#00ACC1', category: 'colored', surcharge: 0.02 },
  { id: 'bordeaux', name: 'Bordeaux', hex: '#7B1F3A', category: 'colored', surcharge: 0.02 },
  { id: 'brown', name: 'Bruin', hex: '#5D4037', category: 'colored', surcharge: 0.02 },

  // Metallic (+€0.05 per letter per cm)
  { id: 'gold', name: 'Goud', hex: '#FFD700', category: 'metallic', surcharge: 0.05 },
  { id: 'silver', name: 'Zilver', hex: '#C0C0C0', category: 'metallic', surcharge: 0.05 },
  { id: 'bronze', name: 'Brons', hex: '#CD7F32', category: 'metallic', surcharge: 0.05 },
  { id: 'rosegold', name: 'Roségoud', hex: '#B76E79', category: 'metallic', surcharge: 0.05 },
  { id: 'copper', name: 'Koper', hex: '#B87333', category: 'metallic', surcharge: 0.05 },
];

export type FontCategory = 'zakelijk' | 'klassiek' | 'modern' | 'speels' | 'handschrift';

export interface FontOption {
  id: string;
  name: string;
  fontFamily: string;
  category: FontCategory;
}

export const FONT_OPTIONS: FontOption[] = [
  // Zakelijk - clean, professional fonts
  { id: 'arial', name: 'Arial', fontFamily: 'Arial, sans-serif', category: 'zakelijk' },
  { id: 'helvetica', name: 'Helvetica', fontFamily: 'Helvetica, Arial, sans-serif', category: 'zakelijk' },
  { id: 'roboto', name: 'Roboto', fontFamily: "'Roboto', sans-serif", category: 'zakelijk' },
  { id: 'opensans', name: 'Open Sans', fontFamily: "'Open Sans', sans-serif", category: 'zakelijk' },
  { id: 'lato', name: 'Lato', fontFamily: "'Lato', sans-serif", category: 'zakelijk' },
  { id: 'poppins', name: 'Poppins', fontFamily: "'Poppins', sans-serif", category: 'zakelijk' },

  // Klassiek - serif, elegant fonts
  { id: 'times', name: 'Times New Roman', fontFamily: 'Times New Roman, serif', category: 'klassiek' },
  { id: 'georgia', name: 'Georgia', fontFamily: 'Georgia, serif', category: 'klassiek' },
  { id: 'playfair', name: 'Playfair Display', fontFamily: "'Playfair Display', serif", category: 'klassiek' },
  { id: 'merriweather', name: 'Merriweather', fontFamily: "'Merriweather', serif", category: 'klassiek' },

  // Modern - bold, impactful fonts
  { id: 'montserrat', name: 'Montserrat', fontFamily: "'Montserrat', sans-serif", category: 'modern' },
  { id: 'bebas', name: 'Bebas Neue', fontFamily: "'Bebas Neue', cursive", category: 'modern' },
  { id: 'oswald', name: 'Oswald', fontFamily: "'Oswald', sans-serif", category: 'modern' },
  { id: 'anton', name: 'Anton', fontFamily: "'Anton', sans-serif", category: 'modern' },
  { id: 'impact', name: 'Impact', fontFamily: 'Impact, sans-serif', category: 'modern' },
  { id: 'raleway', name: 'Raleway', fontFamily: "'Raleway', sans-serif", category: 'modern' },

  // Speels - fun, casual fonts
  { id: 'verdana', name: 'Verdana', fontFamily: 'Verdana, sans-serif', category: 'speels' },
  { id: 'comicsans', name: 'Comic Sans', fontFamily: "'Comic Sans MS', cursive", category: 'speels' },
  { id: 'fredoka', name: 'Fredoka One', fontFamily: "'Fredoka One', cursive", category: 'speels' },
  { id: 'baloo', name: 'Baloo 2', fontFamily: "'Baloo 2', cursive", category: 'speels' },

  // Handschrift - script, handwritten fonts
  { id: 'dancing', name: 'Dancing Script', fontFamily: "'Dancing Script', cursive", category: 'handschrift' },
  { id: 'pacifico', name: 'Pacifico', fontFamily: "'Pacifico', cursive", category: 'handschrift' },
  { id: 'greatvibes', name: 'Great Vibes', fontFamily: "'Great Vibes', cursive", category: 'handschrift' },
  { id: 'sacramento', name: 'Sacramento', fontFamily: "'Sacramento', cursive", category: 'handschrift' },
  { id: 'caveat', name: 'Caveat', fontFamily: "'Caveat', cursive", category: 'handschrift' },
];

export interface VolumeDiscount {
  minQuantity: number;
  maxQuantity: number | null;
  discount: number;
  label: string;
}

export const VOLUME_DISCOUNTS: VolumeDiscount[] = [
  { minQuantity: 3, maxQuantity: 5, discount: 0.05, label: '5% korting' },
  { minQuantity: 6, maxQuantity: 10, discount: 0.10, label: '10% korting' },
  { minQuantity: 11, maxQuantity: null, discount: 0.15, label: '15% korting' },
];

export function getVolumeDiscount(quantity: number): VolumeDiscount | null {
  for (const discount of VOLUME_DISCOUNTS) {
    if (quantity >= discount.minQuantity && 
        (discount.maxQuantity === null || quantity <= discount.maxQuantity)) {
      return discount;
    }
  }
  return null;
}

export interface PriceCalculation {
  text: string;
  letterCount: number;
  heightCm: number;
  color: ColorOption;
  quantity: number;
  basePrice: number;
  colorSurcharge: number;
  subtotal: number;
  volumeDiscount: VolumeDiscount | null;
  discountAmount: number;
  total: number;
  pricePerUnit: number;
}

export function calculatePrice(
  text: string,
  heightCm: number,
  color: ColorOption,
  quantity: number
): PriceCalculation {
  // Count actual letters (exclude spaces)
  const letterCount = text.replace(/\s/g, '').length;
  
  // If no letters, return zero prices
  if (letterCount === 0) {
    return {
      text,
      letterCount: 0,
      heightCm,
      color,
      quantity,
      basePrice: 0,
      colorSurcharge: 0,
      subtotal: 0,
      volumeDiscount: null,
      discountAmount: 0,
      total: 0,
      pricePerUnit: 0,
    };
  }
  
  // Base price calculation
  const basePrice = letterCount * heightCm * BASE_PRICE_PER_LETTER_PER_CM;
  
  // Color surcharge
  const colorSurcharge = letterCount * heightCm * color.surcharge;
  
  // Subtotal per unit
  const subtotalPerUnit = basePrice + colorSurcharge;
  
  // Total before discount
  const subtotal = subtotalPerUnit * quantity;
  
  // Get volume discount
  const volumeDiscount = getVolumeDiscount(quantity);
  const discountAmount = volumeDiscount ? subtotal * volumeDiscount.discount : 0;
  
  // Total after discount
  const total = subtotal - discountAmount;
  
  // Price per unit (for display)
  const pricePerUnit = quantity > 0 ? total / quantity : 0;
  
  return {
    text,
    letterCount,
    heightCm,
    color,
    quantity,
    basePrice,
    colorSurcharge,
    subtotal,
    volumeDiscount,
    discountAmount,
    total,
    pricePerUnit,
  };
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);
}
