# Migraciones SQL (Supabase)

Los scripts en esta carpeta son **idempotentes**: puedes ejecutarlos más de una vez en Supabase → SQL Editor sin que fallen. Usan `IF NOT EXISTS` o equivalentes para no repetir cambios ya aplicados.

- **TENANTS_ADD_WELCOME_EMAIL_SENT.sql** — Añade la columna `welcome_email_sent_at` a `tenants` (correo de bienvenida post-onboarding).
- **add_tenants_banner_url.sql** — Añade la columna `banner_url` a `tenants`.

Si ya ejecutaste uno antes, volver a ejecutarlo no hará nada extra ni dará error.
