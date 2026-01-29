-- ============================================
-- Tu Restaurante Digital - Migración
-- Añade has_custom_domain a tenants (onboarding)
-- ============================================
-- Ejecuta este archivo en Supabase → SQL Editor
-- O usa: npm run db:update
-- ============================================

ALTER TABLE tenants
ADD COLUMN IF NOT EXISTS has_custom_domain BOOLEAN NOT NULL DEFAULT false;

COMMENT ON COLUMN tenants.has_custom_domain IS 'Si true, el restaurante tiene dominio propio; TRD lo gestiona manualmente. Si false, usamos subdominio [slug].turestaurantedigital.com';
