import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

const ADMIN_PASSWORD = 'belettering2024';

export default function Admin() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [orderNumber, setOrderNumber] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [trackingCode, setTrackingCode] = useState('');

  const [loading, setLoading] = useState(false);
  const [lookingUp, setLookingUp] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setLoggedIn(true);
    } else {
      setPasswordError('Verkeerd wachtwoord');
    }
  };

  const handleLookup = async () => {
    if (!orderNumber.trim()) return;
    setLookingUp(true);
    try {
      const { data } = await supabase
        .from('orders')
        .select('design_data')
        .eq('design_data->>order_number', orderNumber.trim())
        .single();

      if (data?.design_data) {
        const dd = data.design_data as Record<string, unknown>;
        const customer = dd.customer as Record<string, string> | undefined;
        if (customer?.email) setCustomerEmail(customer.email);
        if (customer?.name) setCustomerName(customer.name);
      }
    } catch {
      // Order not found, user can fill in manually
    }
    setLookingUp(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber || !customerEmail || !customerName) return;
    setLoading(true);
    setResult(null);

    try {
      const { error } = await supabase.functions.invoke('send-shipping-email', {
        body: {
          to: customerEmail,
          customerName,
          orderNumber,
          trackingCode: trackingCode || undefined,
        },
      });

      if (error) throw error;
      setResult({ success: true, message: `Verzendmail verstuurd naar ${customerEmail}` });
      setOrderNumber('');
      setCustomerName('');
      setCustomerEmail('');
      setTrackingCode('');
    } catch (err: unknown) {
      setResult({ success: false, message: 'Er ging iets mis. Probeer opnieuw.' });
    }
    setLoading(false);
  };

  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 mb-2">
              <div className="bg-primary p-2 rounded-xl">
                <span className="font-black text-lg italic text-white">BB</span>
              </div>
            </div>
            <h1 className="text-xl font-black">Admin</h1>
            <p className="text-sm text-gray-500 mt-1">BeletteringBestellen.nl</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Wachtwoord</label>
              <input
                type="password"
                value={password}
                onChange={e => { setPassword(e.target.value); setPasswordError(''); }}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-primary"
                placeholder="••••••••"
                autoFocus
              />
              {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
            </div>
            <button type="submit" className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:opacity-90 transition">
              Inloggen
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-lg mx-auto">
        <div className="flex items-center gap-3 mb-6 pt-4">
          <div className="bg-primary p-2 rounded-xl">
            <span className="font-black text-lg italic text-white">BB</span>
          </div>
          <div>
            <h1 className="text-xl font-black">Bestelling verzenden</h1>
            <p className="text-sm text-gray-500">Stuur een verzendbevestiging naar de klant</p>
          </div>
        </div>

        {result && (
          <div className={`rounded-xl p-4 mb-6 font-medium ${result.success ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
            {result.success ? '✓ ' : '✗ '}{result.message}
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="block text-sm font-semibold mb-1">Bestelnummer *</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={orderNumber}
                  onChange={e => setOrderNumber(e.target.value)}
                  onBlur={handleLookup}
                  className="flex-1 border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-primary"
                  placeholder="BB-20260226-480"
                  required
                />
                <button
                  type="button"
                  onClick={handleLookup}
                  disabled={lookingUp}
                  className="px-4 py-3 bg-gray-100 rounded-xl text-sm font-semibold hover:bg-gray-200 transition"
                >
                  {lookingUp ? '...' : 'Zoek'}
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-1">Klantnaam en e-mail worden automatisch ingevuld als het bestelnummer bekend is</p>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Naam klant *</label>
              <input
                type="text"
                value={customerName}
                onChange={e => setCustomerName(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-primary"
                placeholder="Jan Jansen"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">E-mailadres klant *</label>
              <input
                type="email"
                value={customerEmail}
                onChange={e => setCustomerEmail(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-primary"
                placeholder="klant@email.nl"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Track &amp; Trace code <span className="text-gray-400 font-normal">(optioneel)</span></label>
              <input
                type="text"
                value={trackingCode}
                onChange={e => setTrackingCode(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-primary"
                placeholder="3SPOST123456789"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !orderNumber || !customerEmail || !customerName}
              className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed text-base"
            >
              {loading ? 'Versturen...' : 'Bestelling verzonden — mail sturen'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          <button onClick={() => setLoggedIn(false)} className="hover:underline">Uitloggen</button>
        </p>
      </div>
    </div>
  );
}
