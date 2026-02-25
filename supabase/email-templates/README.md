# Plantillas de correo — Tu Restaurante Digital

Registro de los correos que envía la app y dónde está cada uno configurado.

---

## 1. Código de verificación (confirmación de cuenta)

| Qué | Dónde |
|-----|--------|
| **Plantilla HTML** | `confirm-signup.html` (esta carpeta) |
| **Quién lo envía** | **Supabase Auth** (al registrarse el usuario) |
| **Dónde se configura** | Supabase Dashboard → **Authentication** → **Email Templates** → **Confirm signup**. Copia el cuerpo de `confirm-signup.html` en el Body. |
| **Variable** | `{{ .Token }}` = código de 6 dígitos (no cambiar) |
| **Guía** | [CONFIRMATION_EMAIL_SETUP.md](../CONFIRMATION_EMAIL_SETUP.md) |

El envío sale por el SMTP configurado en Supabase (p. ej. Resend). Ver [RESEND_SUPABASE_SETUP.md](../RESEND_SUPABASE_SETUP.md).

---

## 2. Bienvenida después del onboarding

| Qué | Dónde |
|-----|--------|
| **Plantilla HTML** | `welcome-after-onboarding.html` (esta carpeta). El HTML también está inlined en el código para el envío. |
| **Quién lo envía** | La **app** (Resend), no Supabase |
| **Dónde se dispara** | Al hacer clic en **«Ir al Dashboard»** en la última pantalla del onboarding (`app/app/(app)/onboarding/page.tsx`) → llama a `sendWelcomeEmailAfterOnboarding()` |
| **Código de envío** | `app/actions/send-welcome-email.ts` → `sendWelcomeEmailAfterOnboarding()` |
| **Asunto** | «Bienvenido a Tu Restaurante Digital» |
| **Destino** | Email del usuario autenticado (session) |
| **Una sola vez** | Se marca en `tenants.welcome_email_sent_at` para no reenviar. Requiere la migración [TENANTS_ADD_WELCOME_EMAIL_SENT.sql](../migrations/TENANTS_ADD_WELCOME_EMAIL_SENT.sql). |

Variables de entorno: `RESEND_API_KEY` y `RESEND_FROM` (mismo que el resto de correos desde la app).

---

## Resumen

| Correo | Enviado por | Configuración |
|--------|-------------|----------------|
| Código de verificación | Supabase Auth | Plantilla en Supabase Dashboard + SMTP (Resend) |
| Bienvenida post-onboarding | App (Resend) | `send-welcome-email.ts` + plantilla en repo |
