-- ============================================
-- Tu Restaurante Digital - Database Schema
-- Supabase (PostgreSQL)
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABLE: tenants
-- Stores restaurant/tenant information
-- ============================================
CREATE TABLE IF NOT EXISTS tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  logo_url TEXT,
  brand_color TEXT DEFAULT '#FF5F1F',
  owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL
);

-- Index for fast slug lookups (critical for subdomain routing)
CREATE INDEX IF NOT EXISTS idx_tenants_slug ON tenants(slug);
CREATE INDEX IF NOT EXISTS idx_tenants_owner_id ON tenants(owner_id);

-- ============================================
-- TABLE: products
-- Menu items for each restaurant
-- ============================================
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
  image_url TEXT,
  is_available BOOLEAN DEFAULT true NOT NULL,
  category TEXT DEFAULT 'General' NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Index for tenant-based queries
CREATE INDEX IF NOT EXISTS idx_products_tenant_id ON products(tenant_id);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_is_available ON products(is_available);

-- ============================================
-- TABLE: orders
-- Customer orders
-- ============================================
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'preparing', 'ready', 'delivered', 'cancelled')),
  total_amount NUMERIC(10, 2) NOT NULL CHECK (total_amount >= 0),
  customer_name TEXT NOT NULL,
  customer_phone TEXT,
  type TEXT NOT NULL CHECK (type IN ('delivery', 'pickup', 'dine_in')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Index for tenant-based queries
CREATE INDEX IF NOT EXISTS idx_orders_tenant_id ON orders(tenant_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);

-- ============================================
-- TABLE: order_items
-- Individual items within an order
-- ============================================
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES products(id) ON DELETE RESTRICT NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Index for order-based queries
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON order_items(product_id);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- ============================================
-- TENANTS POLICIES
-- Public Read: Everyone can read tenant info (needed for storefront)
-- Owner Write: Only the owner can update/delete their tenant
-- ============================================

-- Public read access (everyone can see restaurant info)
CREATE POLICY "Tenants are viewable by everyone"
  ON tenants FOR SELECT
  USING (true);

-- Only authenticated users can create tenants (via signup flow)
CREATE POLICY "Authenticated users can create tenants"
  ON tenants FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = owner_id);

-- Only the owner can update their tenant
CREATE POLICY "Tenants are updatable by owner"
  ON tenants FOR UPDATE
  TO authenticated
  USING (auth.uid() = owner_id)
  WITH CHECK (auth.uid() = owner_id);

-- Only the owner can delete their tenant
CREATE POLICY "Tenants are deletable by owner"
  ON tenants FOR DELETE
  TO authenticated
  USING (auth.uid() = owner_id);

-- ============================================
-- PRODUCTS POLICIES
-- Public Read: Everyone can read products (customers need to see menu)
-- Owner Write: Only tenant owner can insert/update/delete products
-- ============================================

-- Public read access (customers need to see the menu)
CREATE POLICY "Products are viewable by everyone"
  ON products FOR SELECT
  USING (true);

-- Only tenant owner can insert products
CREATE POLICY "Products are insertable by tenant owner"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM tenants
      WHERE tenants.id = products.tenant_id
      AND tenants.owner_id = auth.uid()
    )
  );

-- Only tenant owner can update products
CREATE POLICY "Products are updatable by tenant owner"
  ON products FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM tenants
      WHERE tenants.id = products.tenant_id
      AND tenants.owner_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM tenants
      WHERE tenants.id = products.tenant_id
      AND tenants.owner_id = auth.uid()
    )
  );

-- Only tenant owner can delete products
CREATE POLICY "Products are deletable by tenant owner"
  ON products FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM tenants
      WHERE tenants.id = products.tenant_id
      AND tenants.owner_id = auth.uid()
    )
  );

-- ============================================
-- ORDERS POLICIES
-- Public Insert: Anyone can create orders (customers)
-- Owner Read/Update: Only tenant owner can view and manage orders
-- ============================================

-- Public insert access (customers create orders)
CREATE POLICY "Orders are insertable by everyone"
  ON orders FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only tenant owner can view orders
CREATE POLICY "Orders are viewable by tenant owner"
  ON orders FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM tenants
      WHERE tenants.id = orders.tenant_id
      AND tenants.owner_id = auth.uid()
    )
  );

-- Only tenant owner can update orders
CREATE POLICY "Orders are updatable by tenant owner"
  ON orders FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM tenants
      WHERE tenants.id = orders.tenant_id
      AND tenants.owner_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM tenants
      WHERE tenants.id = orders.tenant_id
      AND tenants.owner_id = auth.uid()
    )
  );

-- Only tenant owner can delete orders
CREATE POLICY "Orders are deletable by tenant owner"
  ON orders FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM tenants
      WHERE tenants.id = orders.tenant_id
      AND tenants.owner_id = auth.uid()
    )
  );

-- ============================================
-- ORDER_ITEMS POLICIES
-- Inherit access from parent order
-- ============================================

-- Public insert access (when creating orders)
CREATE POLICY "Order items are insertable by everyone"
  ON order_items FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Viewable by tenant owner (through order access)
CREATE POLICY "Order items are viewable by tenant owner"
  ON order_items FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM orders
      JOIN tenants ON tenants.id = orders.tenant_id
      WHERE orders.id = order_items.order_id
      AND tenants.owner_id = auth.uid()
    )
  );

-- Updatable by tenant owner
CREATE POLICY "Order items are updatable by tenant owner"
  ON order_items FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM orders
      JOIN tenants ON tenants.id = orders.tenant_id
      WHERE orders.id = order_items.order_id
      AND tenants.owner_id = auth.uid()
    )
  );

-- Deletable by tenant owner
CREATE POLICY "Order items are deletable by tenant owner"
  ON order_items FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM orders
      JOIN tenants ON tenants.id = orders.tenant_id
      WHERE orders.id = order_items.order_id
      AND tenants.owner_id = auth.uid()
    )
  );

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for products updated_at
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger for orders updated_at
CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
