-- ============================================
-- Tu Restaurante Digital - Supabase Storage
-- Ejecutar en Supabase → SQL Editor después de schema.sql.
-- Proyecto nuevo: crea buckets y políticas de storage.
-- ============================================

-- ============================================
-- STORAGE BUCKETS
-- ============================================

-- Bucket para logos de restaurantes
INSERT INTO storage.buckets (id, name, public)
VALUES ('restaurant-logos', 'restaurant-logos', true)
ON CONFLICT (id) DO NOTHING;

-- Bucket para imágenes de productos
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- STORAGE POLICIES
-- ============================================

-- ============================================
-- RESTAURANT LOGOS POLICIES
-- ============================================

-- Public read access (logos need to be visible in storefront)
CREATE POLICY "Restaurant logos are viewable by everyone"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'restaurant-logos');

-- Only authenticated users can upload logos
CREATE POLICY "Restaurant logos are uploadable by authenticated users"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'restaurant-logos');

-- Only the owner can update their logo
CREATE POLICY "Restaurant logos are updatable by owner"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'restaurant-logos' AND
    EXISTS (
      SELECT 1 FROM tenants
      WHERE tenants.owner_id = auth.uid()
      AND tenants.logo_url LIKE '%' || (storage.objects.name) || '%'
    )
  );

-- Only the owner can delete their logo
CREATE POLICY "Restaurant logos are deletable by owner"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'restaurant-logos' AND
    EXISTS (
      SELECT 1 FROM tenants
      WHERE tenants.owner_id = auth.uid()
      AND tenants.logo_url LIKE '%' || (storage.objects.name) || '%'
    )
  );

-- ============================================
-- PRODUCT IMAGES POLICIES
-- ============================================

-- Public read access (product images need to be visible in storefront)
CREATE POLICY "Product images are viewable by everyone"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'product-images');

-- Only tenant owners can upload product images
CREATE POLICY "Product images are uploadable by tenant owner"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'product-images' AND
    EXISTS (
      SELECT 1 FROM tenants
      WHERE tenants.owner_id = auth.uid()
    )
  );

-- Only tenant owners can update product images
CREATE POLICY "Product images are updatable by tenant owner"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'product-images' AND
    EXISTS (
      SELECT 1 FROM tenants
      WHERE tenants.owner_id = auth.uid()
    )
  );

-- Only tenant owners can delete product images
CREATE POLICY "Product images are deletable by tenant owner"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'product-images' AND
    EXISTS (
      SELECT 1 FROM tenants
      WHERE tenants.owner_id = auth.uid()
    )
  );
