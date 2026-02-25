-- Añadir columna para no enviar dos veces el correo de bienvenida post-onboarding.
-- Ejecutar en Supabase → SQL Editor si ya tienes la tabla tenants creada.
-- Idempotente: puedes ejecutarlo más de una vez sin error (IF NOT EXISTS).
ALTER TABLE tenants
  ADD COLUMN IF NOT EXISTS welcome_email_sent_at TIMESTAMP WITH TIME ZONE;
