# Configuración de emails de confirmación — Tu Restaurante Digital

**Registro de plantillas:** En [email-templates/README.md](email-templates/README.md) están listados todos los correos (confirmación + bienvenida post-onboarding) y dónde se configuran.

Para que los enlaces de **Confirmar mi cuenta** apunten a producción (`https://www.turestaurantedigital.com`) y los correos se envíen bien, configura la app, Vercel y Supabase como abajo. Para el envío por Resend (y evitar "Error sending confirmation email"), sigue **[Integración Resend + Supabase](RESEND_SUPABASE_SETUP.md)** (dominio DKIM/SPF y SMTP en Supabase).

---

## 1. Variables de entorno (producción)

### En Vercel

1. **Project** → **Settings** → **Environment Variables**.
2. Añade (o verifica) para **Production**:

   | Name | Value |
   |------|--------|
   | `NEXT_PUBLIC_SITE_URL` | `https://www.turestaurantedigital.com` |

   **Importante:** Sin barra final. No uses `localhost` en producción.

3. En **.env.production** (si lo usas localmente para builds de producción):

   ```
   NEXT_PUBLIC_SITE_URL=https://www.turestaurantedigital.com
   ```

   Usa `.env.production.example` como referencia.

La app usa `NEXT_PUBLIC_SITE_URL` en producción para `emailRedirectTo`. Si falta o contiene localhost, se usa por defecto `https://www.turestaurantedigital.com` (nunca localhost en prod).

---

## 2. Supabase Auth: Site URL y Redirect URLs

1. **Supabase Dashboard** → **Authentication** → **URL Configuration**.
2. **Site URL:**
   ```
   https://www.turestaurantedigital.com
   ```
   (sin barra final).

3. **Redirect URLs** — añade exactamente:

   - Producción (confirmación de cuenta):
     ```
     https://www.turestaurantedigital.com/marketing/accountconfirmed
     ```
   - Desarrollo local (solo para probar emails en local):
     ```
     http://localhost:3000/marketing/accountconfirmed
     ```

   Supabase solo acepta redirects a URLs listadas aquí. Sin la de producción, el enlace del email fallará en prod.

   Para **probar en localhost**, añade también:
   ```
   http://localhost:3000/marketing/accountconfirmed
   http://localhost:3000/marketing/confirmemail
   ```
   (Si usas otro puerto, sustituye `3000` por ese puerto.)

---

## 3. Probar en localhost

Cuando desarrollas en **localhost**:

1. **Variable de entorno** — En tu `.env.local` define:
   ```
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```
   (Si no la pones, en desarrollo la app ya usa `http://localhost:3000` por defecto para el redirect. Si usas otro puerto, ponlo aquí: `http://localhost:4000`, etc.)

2. **Redirect URLs en Supabase** — En **Authentication** → **URL Configuration** → **Redirect URLs** deben estar las URLs de localhost (ver sección 2). Sin ellas, Supabase puede rechazar el flujo cuando la app en localhost pida el envío del correo.

3. **Envío del correo** — Supabase sigue usando la **misma configuración SMTP** (p. ej. Resend) que en producción. No hay “email de localhost”: el correo llega a un email real. Usa una cuenta que controles (Gmail, Hotmail, etc.), regístrate con ese correo en `http://localhost:3000/marketing/signup`, revisa la bandeja de entrada (y spam) y copia el código de 6 dígitos en la página **Confirmar correo** en localhost.

4. **Logs** — Si ves "Error sending confirmation email" en localhost, revisa la terminal donde corre `next dev` (ahí se registra `[Auth] signUp failed`) y **Supabase** → **Authentication** → **Logs** para el detalle del envío del email.

Resumen: en localhost solo cambia la URL de la app; la configuración de Supabase (SMTP, plantillas, Redirect URLs con localhost) debe estar correcta igual que para producción.

---

## 4. Plantilla de email (Confirmación) — Código de 6 dígitos

La app usa **código de 6 dígitos** en lugar del enlace de confirmación. El usuario introduce el código en la página **Confirmar correo** tras registrarse.

### Plantilla con mejor formato visual

En el repo hay una plantilla HTML lista para copiar en Supabase:

- **Archivo:** `supabase/email-templates/confirm-signup.html`

Incluye marca (Tu Restaurante Digital en naranja), título, texto, **código en una caja destacada** (fondo claro y borde naranja) y footer. La variable del código es **`{{ .Token }}`** (no la cambies).

**Cómo usarla:**

1. **Supabase Dashboard** → **Authentication** → **Email Templates** → **Confirm signup**.
2. **Subject:** por ejemplo `Tu código de verificación — Tu Restaurante Digital`.
3. **Body:** abre `supabase/email-templates/confirm-signup.html`, copia **todo** el contenido (desde el primer `<div>` hasta el último `</div>`) y pégalo en el editor de la plantilla.
4. Guarda. Los próximos correos de confirmación se enviarán con ese formato.

**Notas:**

- **No es necesario** incluir `{{ .ConfirmationURL }}` si solo usas el flujo de código.
- **No incluyas** enlaces a localhost ni URLs de desarrollo en el cuerpo ni en el footer.
- Si prefieres escribir tu propio HTML, usa **`{{ .Token }}`** en el cuerpo para el código de 6 dígitos.

---

## 5. Script para copiar URLs

Desde la raíz del proyecto:

```bash
npm run confirmation-urls
```

(o `node scripts/print-confirmation-urls.js`). Imprime las URLs para **Site URL** y **Redirect URLs** de Supabase, y el valor de `NEXT_PUBLIC_SITE_URL` para producción.

---

## 6. Error "Error sending confirmation email"

Si el usuario ve **"Error sending confirmation email"** al registrarse:

- **Origen:** El mensaje lo devuelve **Supabase Auth** cuando `signUp` crea el usuario pero **falla el envío del correo** (no es un error de tu app ni de la base de datos).
- **En tu servidor:** Desde ahora, cada vez que ocurra este error se registrará en los logs con `[Auth] signUp failed` y el `message` de Supabase (revisa la consola donde corre `next dev` o los logs de Vercel).
- **Dónde revisar:**
  1. **Supabase Dashboard** → **Authentication** → **Logs**: ahí aparecen intentos de envío de email y errores de SMTP.
  2. **Supabase** → **Project Settings** → **Auth** → **SMTP**: configura Custom SMTP con Resend (ver **[RESEND_SUPABASE_SETUP.md](RESEND_SUPABASE_SETUP.md)**).
  3. **Resend:** dominio en estado **Failed** suele deberse a DNS (DKIM/SPF) no añadidos; sigue la guía [RESEND_SUPABASE_SETUP.md](RESEND_SUPABASE_SETUP.md) para verificar el dominio.

---

## 7. Resumen rápido

| Dónde | Qué |
|-------|-----|
| **Vercel** (Production) | `NEXT_PUBLIC_SITE_URL` = `https://www.turestaurantedigital.com` |
| **Supabase** → Site URL | `https://www.turestaurantedigital.com` |
| **Supabase** → Redirect URLs | `https://www.turestaurantedigital.com/marketing/accountconfirmed` (+ localhost solo para dev) |
| **Email template** | `{{ .Token }}` (código de 6 dígitos), footer profesional, sin localhost |
| **Si falla el email** | Revisar Auth → Logs y SMTP en Supabase; logs del servidor con `[Auth] signUp failed` |

Con esto, cada interacción por email (confirmación de cuenta) usará siempre el dominio de producción y se verá lista para el mercado dominicano.
