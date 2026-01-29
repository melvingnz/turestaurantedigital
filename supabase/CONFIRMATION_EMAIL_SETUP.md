# Configuración de emails de confirmación — Tu Restaurante Digital

Para que los enlaces de **Confirmar mi cuenta** apunten siempre a producción (`https://www.turestaurantedigital.com`) y nunca a localhost, hay que configurar correctamente la app, Vercel y Supabase.

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

---

## 3. Plantilla de email (Confirmación)

1. **Supabase Dashboard** → **Authentication** → **Email Templates** → **Confirm signup**.
2. **Enlace de confirmación:** usa siempre `{{ .ConfirmationURL }}`. Supabase sustituye este valor por la URL que nosotros enviamos vía `emailRedirectTo` (ya apuntando a producción cuando `NODE_ENV=production`).
3. **Footer y tono:**
   - Mantén un cierre profesional. Ejemplo: **«Hecho con ❤️ en República Dominicana»**.
   - **No incluyas** enlaces a localhost ni URLs de desarrollo en el cuerpo ni en el footer.
   - Evita texto de depuración o enlaces de prueba.

4. Revisa también **Subject** y el resto del cuerpo para que todo sea claro y orientado al usuario (mercado RD).

---

## 4. Script para copiar URLs

Desde la raíz del proyecto:

```bash
npm run confirmation-urls
```

(o `node scripts/print-confirmation-urls.js`). Imprime las URLs para **Site URL** y **Redirect URLs** de Supabase, y el valor de `NEXT_PUBLIC_SITE_URL` para producción.

---

## 5. Resumen rápido

| Dónde | Qué |
|-------|-----|
| **Vercel** (Production) | `NEXT_PUBLIC_SITE_URL` = `https://www.turestaurantedigital.com` |
| **Supabase** → Site URL | `https://www.turestaurantedigital.com` |
| **Supabase** → Redirect URLs | `https://www.turestaurantedigital.com/marketing/accountconfirmed` (+ localhost solo para dev) |
| **Email template** | `{{ .ConfirmationURL }}`, footer profesional, sin localhost |

Con esto, cada interacción por email (confirmación de cuenta) usará siempre el dominio de producción y se verá lista para el mercado dominicano.
