// Pricing logic for bestellen.nl

export const BASE_PRICE_PER_LETTER_PER_CM = 0.22;
export const MINIMUM_ORDER_AMOUNT = 9.95;

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
  { id: 'white', name: 'Wit', hex: '#FFFFFF', category: 'standard', surcharge: 0 },
  { id: 'black', name: 'Zwart', hex: '#1a1a1a', category: 'standard', surcharge: 0 },
  
  // Colored (+€0.02 per letter per cm)
  { id: 'red', name: 'Rood', hex: '#E53935', category: 'colored', surcharge: 0.02 },
  { id: 'blue', name: 'Blauw', hex: '#1E88E5', category: 'colored', surcharge: 0.02 },
  { id: 'green', name: 'Groen', hex: '#43A047', category: 'colored', surcharge: 0.02 },
  { id: 'yellow', name: 'Geel', hex: '#FDD835', category: 'colored', surcharge: 0.02 },
  { id: 'orange', name: 'Oranje', hex: '#FB8C00', category: 'colored', surcharge: 0.02 },
  { id: 'pink', name: 'Roze', hex: '#EC407A', category: 'colored', surcharge: 0.02 },
  
  // Metallic (+€0.05 per letter per cm)
  { id: 'gold', name: 'Goud', hex: '#FFD700', category: 'metallic', surcharge: 0.05 },
  { id: 'silver', name: 'Zilver', hex: '#C0C0C0', category: 'metallic', surcharge: 0.05 },
  { id: 'chrome', name: 'Chroom', hex: '#E8E8E8', category: 'metallic', surcharge: 0.05 },
];

export interface FontOption {
  id: string;
  name: string;
  fontFamily: string;
}

export const FONT_OPTIONS: FontOption[] = [
  { id: 'arial', name: 'Arial', fontFamily: 'Arial, sans-serif' },
  { id: 'times', name: 'Times', fontFamily: 'Times New Roman, serif' },
  { id: 'courier', name: 'Courier', fontFamily: 'Courier New, monospace' },
  { id: 'georgia', name: 'Georgia', fontFamily: 'Georgia, serif' },
  { id: 'verdana', name: 'Verdana', fontFamily: 'Verdana, sans-serif' },
  { id: 'impact', name: 'Impact', fontFamily: 'Impact, sans-serif' },
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
  totalBeforeMinimum: number;
  total: number;
  pricePerUnit: number;
  minimumApplied: boolean;
}

export function calculatePrice(
  text: string,
  heightCm: number,
  color: ColorOption,
  quantity: number
): PriceCalculation {
  // Count actual letters (exclude spaces)
  const letterCount = text.replace(/\s/g, '').length;
  
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
  const totalBeforeMinimum = subtotal - discountAmount;
  
  // Apply minimum order amount
  const minimumApplied = totalBeforeMinimum < MINIMUM_ORDER_AMOUNT && letterCount > 0;
  const total = minimumApplied ? MINIMUM_ORDER_AMOUNT : totalBeforeMinimum;
  
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
    totalBeforeMinimum,
    total,
    pricePerUnit,
    minimumApplied,
  };
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);
}
