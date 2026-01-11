import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/pricing';
import { ArrowLeft, CreditCard, Building2, Check, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type PaymentMethod = 'ideal' | 'bancontact' | 'creditcard';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('ideal');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    company: '',
    street: '',
    houseNumber: '',
    postalCode: '',
    city: '',
    phone: '',
  });

  const shippingCost = totalPrice >= 50 ? 0 : 4.95;
  const grandTotal = totalPrice + shippingCost;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmitDetails = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setStep('success');
    clearCart();
  };

  if (items.length === 0 && step !== 'success') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Je winkelwagen is leeg</h1>
          <p className="text-muted-foreground mb-6">Voeg eerst items toe aan je winkelwagen</p>
          <Button onClick={() => navigate('/')}>
            Terug naar de shop
          </Button>
        </div>
      </div>
    );
  }

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-success" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">Bedankt voor je bestelling!</h1>
          <p className="text-muted-foreground mb-2">
            Je ontvangt een bevestiging per e-mail op:
          </p>
          <p className="font-medium text-foreground mb-6">{formData.email}</p>
          <div className="bg-muted rounded-xl p-6 mb-6 text-left">
            <h3 className="font-medium text-foreground mb-3">Verzendadres</h3>
            <p className="text-muted-foreground">
              {formData.firstName} {formData.lastName}<br />
              {formData.company && <>{formData.company}<br /></>}
              {formData.street} {formData.houseNumber}<br />
              {formData.postalCode} {formData.city}
            </p>
          </div>
          <Button onClick={() => navigate('/')} className="w-full">
            Terug naar de shop
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-background border-b border-border">
        <div className="section-container py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-foreground">Afrekenen</h1>
              <p className="text-sm text-muted-foreground">
                Stap {step === 'details' ? '1' : '2'} van 2
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="section-container py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            {step === 'details' ? (
              <form onSubmit={handleSubmitDetails} className="card-elevated space-y-6">
                <h2 className="text-xl font-bold text-foreground">Jouw gegevens</h2>
                
                {/* Contact */}
                <div className="space-y-4">
                  <h3 className="font-medium text-foreground">Contact</h3>
                  <div>
                    <Label htmlFor="email">E-mailadres *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="jouw@email.nl"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Telefoonnummer</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="06 12345678"
                    />
                  </div>
                </div>

                {/* Address */}
                <div className="space-y-4">
                  <h3 className="font-medium text-foreground">Verzendadres</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">Voornaam *</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Achternaam *</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="company">Bedrijfsnaam (optioneel)</Label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                      <Label htmlFor="street">Straat *</Label>
                      <Input
                        id="street"
                        name="street"
                        required
                        value={formData.street}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="houseNumber">Huisnr. *</Label>
                      <Input
                        id="houseNumber"
                        name="houseNumber"
                        required
                        value={formData.houseNumber}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="postalCode">Postcode *</Label>
                      <Input
                        id="postalCode"
                        name="postalCode"
                        required
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        placeholder="1234 AB"
                      />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="city">Plaats *</Label>
                      <Input
                        id="city"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full btn-hero" size="lg">
                  Naar betaling
                </Button>
              </form>
            ) : (
              <div className="card-elevated space-y-6">
                <h2 className="text-xl font-bold text-foreground">Betaalmethode</h2>
                
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('ideal')}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                      paymentMethod === 'ideal' 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="w-12 h-8 bg-white rounded flex items-center justify-center border border-border">
                      <span className="font-bold text-sm text-pink-500">iDEAL</span>
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-foreground">iDEAL</p>
                      <p className="text-sm text-muted-foreground">Direct betalen via je bank</p>
                    </div>
                    {paymentMethod === 'ideal' && (
                      <Check className="w-5 h-5 text-primary ml-auto" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bancontact')}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                      paymentMethod === 'bancontact' 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="w-12 h-8 bg-white rounded flex items-center justify-center border border-border">
                      <Building2 className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-foreground">Bancontact</p>
                      <p className="text-sm text-muted-foreground">Voor Belgische banken</p>
                    </div>
                    {paymentMethod === 'bancontact' && (
                      <Check className="w-5 h-5 text-primary ml-auto" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('creditcard')}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                      paymentMethod === 'creditcard' 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="w-12 h-8 bg-white rounded flex items-center justify-center border border-border">
                      <CreditCard className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-foreground">Creditcard</p>
                      <p className="text-sm text-muted-foreground">Visa, Mastercard, American Express</p>
                    </div>
                    {paymentMethod === 'creditcard' && (
                      <Check className="w-5 h-5 text-primary ml-auto" />
                    )}
                  </button>
                </div>

                <div className="flex gap-4">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setStep('details')}
                    className="flex-1"
                  >
                    Terug
                  </Button>
                  <Button 
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="flex-1 btn-hero"
                  >
                    {isProcessing ? 'Verwerken...' : `Betaal ${formatPrice(grandTotal)}`}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card-elevated sticky top-24 space-y-4">
              <h2 className="text-lg font-bold text-foreground">Overzicht</h2>
              
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                      <span
                        className="text-xs font-medium break-words text-center p-1"
                        style={{
                          fontFamily: item.font.fontFamily,
                          color: item.color.hex,
                          textShadow: item.color.id === 'white' ? '0 1px 2px rgba(0,0,0,0.3)' : 'none',
                        }}
                      >
                        {item.text.substring(0, 10)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">{item.text}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.font.name} · {item.heightCm}cm × {item.quantity}
                      </p>
                    </div>
                    <span className="font-medium">{formatPrice(item.priceCalculation.total)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotaal</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Verzending</span>
                  <span>{shippingCost === 0 ? 'Gratis' : formatPrice(shippingCost)}</span>
                </div>
                {shippingCost > 0 && (
                  <p className="text-xs text-muted-foreground">
                    Gratis verzending vanaf €50
                  </p>
                )}
              </div>

              <div className="border-t border-border pt-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-foreground">Totaal</span>
                  <span className="text-xl font-bold text-primary">{formatPrice(grandTotal)}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Incl. 21% BTW</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
