-- Añadir columna banner_url a tenants (para onboarding y portada del storefront).
-- Ejecutar en Supabase → SQL Editor si tu proyecto ya tenía la tabla tenants sin esta columna.
ALTER TABLE tenants ADD COLUMN IF NOT EXISTS banner_url TEXT;
