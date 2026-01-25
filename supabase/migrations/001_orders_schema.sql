-- =============================================
-- BeletteringBestellen Database Schema
-- Voer dit script uit in Supabase SQL Editor
-- =============================================

-- Drop existing orders table if it exists (backup first if needed!)
-- DROP TABLE IF EXISTS orders;

-- =============================================
-- ORDERS TABLE - Hoofdtabel voor bestellingen
-- =============================================
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,

  -- Ordernummer (leesbaar voor klant, bijv. "BO-20240124-001")
  order_number TEXT UNIQUE NOT NULL,

  -- Klantgegevens
  customer_email TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT,

  -- Verzendadres
  shipping_street TEXT NOT NULL,
  shipping_housenumber TEXT NOT NULL,
  shipping_postal_code TEXT NOT NULL,
  shipping_city TEXT NOT NULL,
  shipping_country TEXT DEFAULT 'NL',

  -- Prijzen (in centen voor precisie)
  subtotal_cents INTEGER NOT NULL,
  shipping_cents INTEGER DEFAULT 0,
  discount_cents INTEGER DEFAULT 0,
  total_cents INTEGER NOT NULL,

  -- Betaling
  payment_method TEXT, -- 'ideal', 'bancontact', 'creditcard'
  payment_id TEXT, -- Mollie payment ID
  payment_status TEXT DEFAULT 'pending', -- 'pending', 'paid', 'failed', 'refunded'

  -- Order status
  status TEXT DEFAULT 'pending', -- 'pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled'

  -- Notities
  customer_notes TEXT,
  admin_notes TEXT,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  paid_at TIMESTAMPTZ,
  shipped_at TIMESTAMPTZ
);

-- =============================================
-- ORDER_ITEMS TABLE - Items binnen een order
-- =============================================
CREATE TABLE IF NOT EXISTS order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,

  -- Product type
  item_type TEXT NOT NULL, -- 'text' of 'logo'

  -- Voor tekst items
  text TEXT,
  font_id TEXT,
  font_name TEXT,

  -- Voor logo items
  logo_url TEXT,

  -- Gemeenschappelijke velden
  color_id TEXT,
  color_name TEXT,
  color_hex TEXT,

  -- Afmetingen
  width_cm DECIMAL(10,2),
  height_cm DECIMAL(10,2),

  -- Prijs en aantal
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price_cents INTEGER NOT NULL,
  total_price_cents INTEGER NOT NULL,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- INDEXES voor snelle queries
-- =============================================
CREATE INDEX IF NOT EXISTS idx_orders_email ON orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON orders(payment_status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);

-- =============================================
-- FUNCTION: Genereer ordernummer
-- =============================================
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TEXT AS $$
DECLARE
  today_str TEXT;
  seq_num INTEGER;
  new_order_number TEXT;
BEGIN
  today_str := TO_CHAR(NOW(), 'YYYYMMDD');

  -- Tel orders van vandaag
  SELECT COUNT(*) + 1 INTO seq_num
  FROM orders
  WHERE order_number LIKE 'BO-' || today_str || '-%';

  new_order_number := 'BO-' || today_str || '-' || LPAD(seq_num::TEXT, 3, '0');

  RETURN new_order_number;
END;
$$ LANGUAGE plpgsql;

-- =============================================
-- TRIGGER: Auto-update updated_at
-- =============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- =============================================
-- ROW LEVEL SECURITY (optioneel, voor admin)
-- =============================================
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Iedereen kan orders aanmaken (voor checkout)
CREATE POLICY "Anyone can create orders" ON orders
  FOR INSERT WITH CHECK (true);

-- Alleen eigen orders lezen (op basis van email, of admin)
CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (true); -- Pas dit later aan voor echte auth

-- Order items volgen dezelfde regels als orders
CREATE POLICY "Anyone can create order items" ON order_items
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can view order items" ON order_items
  FOR SELECT USING (true);

-- =============================================
-- STORAGE BUCKET voor logo uploads
-- =============================================
-- Dit moet je handmatig doen in Supabase Dashboard:
-- 1. Ga naar Storage
-- 2. Maak een nieuwe bucket "logos"
-- 3. Zet Public access aan (of configureer policies)
