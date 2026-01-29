# Guía del Admin Portal — Tu Restaurante Digital

**Objetivo:** Probar el Admin como dueño de restaurante y entender el onboarding completo (registro, dominio propio vs subdominio automático).

---

## Índice

1. [Prerrequisitos](#1-prerrequisitos)
2. [Guía para probar el Admin (flujo completo)](#2-guía-para-probar-el-admin-flujo-completo)
3. [Onboarding completo: dominio propio vs subdominio](#3-onboarding-completo-dominio-propio-vs-subdominio)
4. [Subdominio automático: cómo funciona](#4-subdominio-automático-cómo-funciona)
5. [Migración de BD y Storage](#5-migración-de-bd-y-storage)

---

## 1. Prerrequisitos

- **Node.js 18+**
- **Supabase:** Proyecto creado, `.env.local` con:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY` (necesaria para signup: creación del tenant y rollback; mismo proyecto que `NEXT_PUBLIC_SUPABASE_URL`)
- **Base de datos:** Ejecutados `supabase/schema.sql`, `supabase/storage.sql` y la migración `has_custom_domain` (ver [§5.1](#51-aplicar-migración-has_custom_domain); `npm run db:update`)
- **Resend** (solo para contacto): `RESEND_API_KEY`, `RESEND_FROM` — no necesarios para Admin
- **Producción / emails de confirmación:** `NEXT_PUBLIC_SITE_URL=https://www.turestaurantedigital.com` en Vercel y Supabase Auth configurado según `supabase/CONFIRMATION_EMAIL_SETUP.md`
- **Auth (login → dashboard):** Se usa `@supabase/ssr` y actualización de sesión en el proxy. Tras `git pull` o añadir la dependencia, ejecuta `npm install` para instalar `@supabase/ssr`.

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`.

---

## 2. Guía para probar el Admin (flujo completo)

### Paso 1: Registrarse (dueño de restaurante)

1. Ve a **Registrarse:**
   - Desde la landing: "Empezar Ahora" → `/marketing/signup`
   - O directo: `http://localhost:3000/marketing/signup`

2. Completa el formulario:
   - **Email:** p. ej. `owner@mirestaurante.com`
   - **Contraseña:** mínimo 6 caracteres
   - **Nombre del restaurante:** p. ej. `Mi Restaurante`
   - **URL (slug):** p. ej. `mirestaurante` (solo letras minúsculas, números y guiones)
     - Se auto-genera desde el nombre; puedes editarlo.
     - Tu menú quedará en `mirestaurante.turestaurantedigital.com` (producción) o `mirestaurante.localhost:3000` (local).
   - **¿Tienes dominio propio?** → **No, usar subdominio** (te configuramos `[slug].turestaurantedigital.com`) o **Sí, tengo dominio propio** (nos pondremos en contacto para configurarlo; mientras tanto usas el subdominio).

3. **Registrarse** → se crean usuario (Supabase Auth) y tenant (BD) de forma atómica. Si el slug ya existe, verás error y deberás elegir otro.

4. Tras éxito → redirección a **`/marketing/confirmemail`**: "Debes confirmar tu cuenta con el correo de registro que utilizaste antes de iniciar sesión." Se cierra la sesión para que no puedas entrar al panel hasta confirmar.

5. **Confirmación de correo:** Recibirás un email "Confirmar mi cuenta". Al hacer clic, irás a **Cuenta confirmada** (`/marketing/accountconfirmed`), luego "Iniciar sesión" → login (o dashboard si ya hay sesión). Configura **Site URL** y **Redirect URLs** en Supabase (Auth → URL Configuration) según `supabase/CONFIRMATION_EMAIL_SETUP.md`. En producción los enlaces deben apuntar a `https://www.turestaurantedigital.com/marketing/accountconfirmed`; para local, `http://localhost:3000/marketing/accountconfirmed`. Ejecuta `node scripts/print-confirmation-urls.js` para copiar las URLs.

---

### Paso 2: Bienvenida (`/app/welcome`)

- Tras **confirmar el correo** e **iniciar sesión**, puedes ir a `/app/welcome` para ver la URL de tu menú y enlaces al Dashboard. Mensaje según **¿Tienes dominio propio?** (No → subdominio listo; Sí → nos pondremos en contacto).

### Paso 3: Iniciar sesión (si ya tienes cuenta)

1. Ve a **Iniciar sesión:**
   - `http://localhost:3000/marketing/login`
   - O desde la landing: "Iniciar Sesión"

2. Email + contraseña → **Iniciar sesión** → redirección a `/app/dashboard`.

3. Si intentas entrar a `/app/*` sin sesión, se te redirige a `/marketing/login`.

---

### Paso 4: Dashboard (`/app/dashboard`)

- **Métricas:** Total productos, pedidos (hoy / semana / mes), ingresos, ticket promedio.
- **Top 5 productos** más vendidos.
- **Gráfico** de ventas últimos 7 días.

Al empezar, todo en 0. Añade productos y genera órdenes desde el storefront para ver datos.

---

### Paso 5: Menú (`/app/menu`)

- **Crear producto:** Nombre, descripción, precio, categoría, imagen (Supabase Storage o URL).
- **Editar / eliminar** productos.
- **Toggle disponibilidad:** Ocultar/mostrar sin borrar (p. ej. “no hay hoy”).
- **Filtros:** Todos, Disponibles, Ocultos.

Crea al menos 2–3 productos y 1–2 categorías para probar el storefront.

---

### Paso 6: Pedidos / KDS (`/app/orders`)

- **Pantalla de cocina** en tiempo real (Supabase Realtime).
- **Estados:** Pendiente → En cocina → Listo → Entregado.
- **Acciones:** Aceptar, Marcar listo, Entregado.
- **Sonido** al recibir nueva orden.

**Cómo probar:** Abre el storefront (`mirestaurante.localhost:3000` o `localhost:3000/mirestaurante`), añade al carrito, haz checkout. La orden aparece en `/app/orders`.

---

### Paso 7: Configuración (`/app/settings`)

- **Nombre del restaurante**
- **Slug** (con validación y comprobación de disponibilidad)
- **Logo:** Subir a Storage o URL externa
- **Color de marca** (picker)
- **Preview** del storefront en tiempo real

Cambios se reflejan de inmediato en el menú público.

---

### Paso 8: Probar el storefront (menú del cliente)

**Local:**

- **Subdominio:** `http://mirestaurante.localhost:3000` (si tu entorno resuelve `*.localhost`)
- **Ruta directa:** `http://localhost:3000/mirestaurante`

**Producción:**

- `https://mirestaurante.turestaurantedigital.com`

Flujo: ver menú → añadir al carrito → checkout (nombre, teléfono, tipo de entrega) → confirmación. La orden aparece en el KDS.

---

## 3. Onboarding completo: dominio propio vs subdominio

Objetivo: **onboarding completo** en el que preguntamos al dueño del restaurante si tiene dominio propio y actuamos en consecuencia.

### Pregunta: «¿Tienes dominio propio?»

- **Sí** → El cliente tiene p. ej. `mirestaurante.com.do`. **Nosotros (TRD) lo gestionamos:** DNS, CNAME, etc. Manual por ahora; en el producto solo guardamos que tiene dominio propio y lo usamos para soporte/onboarding.
- **No** → No tiene dominio. **Nosotros le damos subdominio automático** bajo `turestaurantedigital.com`: en cuanto termina el registro, su menú ya está en `[slug].turestaurantedigital.com`. No tiene que configurar nada.

### Flujo deseado

1. **Registro** (como ahora): email, contraseña, nombre del restaurante, slug.
2. **Nuevo paso en onboarding:** «¿Tienes dominio propio para tu restaurante?»
   - **No** → Mensaje tipo: *«Te hemos configurado [slug].turestaurantedigital.com. Tu menú ya está disponible. Puedes compartir ese enlace o tu QR.»*  
     - El subdominio funciona en cuanto existe el tenant (ver sección 4).
   - **Sí** → Mensaje tipo: *«Perfecto. Nos pondremos en contacto para configurar tu dominio. Mientras tanto, puedes usar [slug].turestaurantedigital.com.»*  
     - Guardamos en el tenant que tiene dominio propio; TRD gestiona el dominio aparte.

3. **Redirección** a `/app/dashboard` para seguir con Menú, Pedidos, Configuración.

Con esto se cierra el “onboarding completo” y se deja claro quién gestiona el dominio en cada caso.

---

## 4. Subdominio automático: cómo funciona

- **Wildcard en DNS:** En producción se usa `*.turestaurantedigital.com` (p. ej. en Vercel). Cualquier subdominio apunta a la misma app.
- **Proxy (`proxy.ts`):** Si la petición viene de `[slug].turestaurantedigital.com`, se reescribe a la ruta del storefront `/[slug]`. El storefront carga el tenant por `slug`.
- **Al registrarse:** Se crea el **tenant** con ese `slug` en la BD. No se “añade” el subdominio en DNS en cada registro; ya está cubierto por el wildcard.

Por tanto, **“configurar automáticamente el subdominio”** = **crear el tenant con ese slug**. En cuanto el tenant existe, `[slug].turestaurantedigital.com` sirve el menú de ese restaurante. No hay pasos extra de DNS ni de Vercel por cada cliente.

**Local:** Mismo concepto con `[slug].localhost:3000` o `localhost:3000/[slug]` según tu configuración.

---

## 5. Migración de BD y Storage

### 5.1 Aplicar migración `has_custom_domain`

Tras añadir el onboarding con «¿Tienes dominio propio?», hay que agregar la columna `has_custom_domain` a la tabla `tenants`:

```bash
npm run db:update
```

El script imprime instrucciones y el contenido de `supabase/TENANTS_ADD_HAS_CUSTOM_DOMAIN.sql`. Ejecuta ese SQL en **Supabase → SQL Editor** (o usa `npx supabase db execute -f supabase/TENANTS_ADD_HAS_CUSTOM_DOMAIN.sql` si tienes Supabase CLI enlazado).

### 5.2 Storage: qué es y qué hacer

- **Guía corta:** `supabase/STORAGE_COMO_FUNCIONA.md` — Qué es Storage para TRD, qué tienes que ejecutar (`storage.sql`), variables de entorno, y flujo: subir → guardar URL → mostrar.
- **Detalle URLs:** `supabase/STORAGE_URLS.md` — Formato `https://<PROJECT_REF>.supabase.co/storage/v1/object/public/<BUCKET>/<PATH>`, buckets `restaurant-logos` y `product-images`, rutas por `owner_id`. Next.js ya tiene `remotePatterns` para `**.supabase.co`.

### 5.3 Troubleshooting: 401 Invalid API key (rollback en signup)

Si al registrarte (slug duplicado o error al crear tenant) ves **"Error al eliminar usuario después de rollback: Invalid API key"** (401):

1. **Usar la key `service_role`, no `anon`**  
   En Supabase → **Project Settings** → **API**: hay dos keys. La que debe ir en `SUPABASE_SERVICE_ROLE_KEY` es la **`service_role`** (secret). La **`anon`** / pública no sirve para el rollback.

2. **Nombre exacto de la variable**  
   En `.env.local` debe ser **`SUPABASE_SERVICE_ROLE_KEY`** (sin “S” extra en “SERVICE”, y con `_KEY`).

3. **Mismo proyecto**  
   La `service_role` y `NEXT_PUBLIC_SUPABASE_URL` tienen que ser del **mismo** proyecto de Supabase.

4. **Reiniciar el dev server**  
   Tras cambiar `.env.local`, reinicia `npm run dev`. Next.js no recarga env en caliente.

5. **Sin comillas ni espacios**  
   El valor en `.env.local` debe ser solo la key, sin comillas y sin espacios antes/después:
   ```env
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

6. **Verificar key sin tocar signup**  
   Ejecuta `npm run check:service-role`. Comprueba que la key sea `service_role`, que `ref` coincida con la URL y que no estés usando la `anon`.

### 5.4 Login OK pero vuelve a /marketing/login

Si al hacer **Iniciar sesión** la contraseña se acepta pero terminas otra vez en login (sin error en pantalla):

1. **Instalar `@supabase/ssr`**  
   Ejecuta `npm install`. La auth usa `@supabase/ssr` y actualización de sesión en el proxy; si falta el paquete, las cookies no se refrescan y el dashboard no ve la sesión.

2. **Logs en terminal**  
   Deberías ver `[Auth] signIn success, redirecting to /app/dashboard` al iniciar sesión. Si en cambio ves `[Auth] requireAuth: no user, redirecting to /marketing/login`, el servidor no está recibiendo las cookies (revisa que el proxy ejecute `updateSession` y que no haya errores en `[Supabase] setAll failed`).

3. **Confirmar correo**  
   Si aún no has confirmado el email de registro, Supabase devuelve "Invalid login credentials". Revisa el correo y usa el enlace de confirmación antes de iniciar sesión.

---

**Última actualización:** Enero 2026  
**Mantenido por:** Equipo Tu Restaurante Digital
