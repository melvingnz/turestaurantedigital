# 📋 Análisis de Features — Tu Restaurante Digital

**Fecha:** Enero 2026  
**Objetivo:** Reunir lo que tenemos hoy y lo que debemos implementar, priorizado y documentado.

---

## Índice

1. [Resumen Ejecutivo](#1-resumen-ejecutivo)
2. [Lo que tenemos (implementado)](#2-lo-que-tenemos-implementado)
3. [Lo que debemos implementar](#3-lo-que-debemos-implementar)
4. [Priorización sugerida](#4-priorización-sugerida)
5. [Stack y referencias](#5-stack-y-referencias)

---

## 1. Resumen Ejecutivo

| Área | Estado | % aprox. |
|------|--------|----------|
| **Marketing / Landing** | ✅ Completo | ~95% |
| **Auth & Onboarding** | ✅ Completo | ~100% |
| **Admin (Dashboard, Menu, KDS, Settings)** | ✅ Funcional | ~85% |
| **Storefront** | ✅ Funcional | ~80% |
| **Subdominio por tenant** | ✅ Implementado (`lateburger.turestaurantedigital.com`) | 100% |
| **Dominio personalizado** | 🚫 Fuera de alcance (modelo: clientes bajo marca TRD; ver [Estrategia de dominios](#estrategia-de-dominios)) | — |
| **WhatsApp** | ❌ No implementado | 0% |
| **Pagos en línea** | ❌ No implementado | 0% |
| **Modificadores / variantes** | ❌ No implementado | 0% |
| **Asset Management** | ⚠️ Parcial (upload individual) | ~30% |

---

## 2. Lo que tenemos (implementado)

### 2.1 Portal de Marketing / Landing

| Feature | Descripción | Ubicación |
|--------|-------------|-----------|
| **Landing principal** | Hero, Social Proof (Late Burger SDQ), Features, 3 Steps, Pricing, FAQ, Footer | `app/page.tsx`, `components/marketing/` |
| **Navbar** | Logo, links (Características, Precios, Acerca de, Contacto), CTA (Iniciar sesión, Empezar Ahora), menú hamburguesa en móvil | `navbar.tsx` |
| **Hero** | Headline, CTA “Ver Planes”, “Ver Menú de Ejemplo” (Late Burger), mockup KDS | `hero.tsx`, `hero-mockup.tsx` |
| **Trusted By** | Card Late Burger SDQ, emojis, “Ver Storefront” | `trusted-by.tsx` |
| **Features** | 3 cards: KDS, WhatsApp, Analíticas (solo copy; integración WhatsApp pendiente) | `features.tsx` |
| **Steps** | 3 pasos: Regístrate, Sube menú, Empieza a vender | `steps.tsx` |
| **Pricing** | Planes Inicios (gratis) y Pro (RD$ 2,500/mes), CTAs a signup | `pricing.tsx` |
| **FAQ** | Accordion, 3 preguntas | `faq.tsx` |
| **Footer** | Logo, descripción, redes (Instagram, Facebook, Twitter), columnas Producto, Recursos, Legal, copyright | `footer.tsx` |
| **Páginas adicionales** | `/about` (Acerca de), `/contact` (formulario + soporte directo) | `app/about/`, `app/contact/` |
| **Login / Signup** | `/marketing/login`, `/marketing/signup`; metadata “Iniciar Sesión \| …” y “Registrarse \| …” | `app/marketing/` |
| **Contacto** | Formulario (nombre, email, teléfono, mensaje) → Resend → `contacto@turestaurantedigital.com` | `app/api/contact/`, `contact-form.tsx` |
| **Componentes no usados en landing** | Commission Calculator, Omnichannel Flow, Zero Friction, Customer Data Insights (existen pero se quitaron de `/` por paridad visual) | `components/marketing/` |
| **Paridad visual** | Mismo orden en desktop y móvil; sin secciones ocultas en móvil; contenedores `max-w-6xl` | `app/page.tsx`, `app/marketing/page.tsx` |
| **Branding** | Naranja #FF6B00, blanco, texto #1A1A1A, logo en header y favicon | `components/ui/logo.tsx`, `app/layout.tsx`, `public/branding/` |

**Routing marketing (producción):**  
`turestaurantedigital.com` → rewrite a `/marketing` (proxy).  
`localhost` → `/` sirve `app/page.tsx` (landing raíz).

---

### 2.2 Autenticación y onboarding

| Feature | Descripción |
|--------|-------------|
| **Signup** | Email, contraseña, nombre del restaurante, slug; validación de slug único y formato; preview URL storefront |
| **Signup atómico** | Crear usuario (Supabase Auth) + tenant en un flujo con rollback (si falla tenant, se elimina usuario) |
| **Login** | Email/password; redirección a `/app/dashboard` |
| **Protección rutas admin** | `requireAuth()` en layout de `(app)`; redirección a `/marketing/login` si no autenticado |
| **Admin client** | `createAdminClient()` para rollback y operaciones server-side |

**Archivos:** `app/actions/auth.ts`, `lib/auth.ts`, `lib/supabase/admin.ts`, `app/marketing/login/`, `app/marketing/signup/`.

---

### 2.3 Portal Admin (`/app/*`)

| Módulo | Features |
|--------|----------|
| **Dashboard** (`/app/dashboard`) | Métricas: productos, pedidos (hoy/semana/mes), ingresos, ticket promedio; Top 5 productos; gráfico últimos 7 días |
| **Menu Builder** (`/app/menu`) | CRUD productos; categorías; toggle disponibilidad (ocultar/mostrar sin borrar); filtros Todos/Disponibles/Ocultos; upload imagen (Supabase Storage o URL externa); `ImageUpload` reutilizable |
| **KDS** (`/app/orders`) | Realtime (Supabase) órdenes; cards por estado; acciones Aceptar / Listo / Entregado; sonido nueva orden |
| **Settings** (`/app/settings`) | Nombre restaurante; slug (con validación); logo (Storage o URL); color de marca (picker + input); preview storefront en tiempo real |
| **Layout** | Sidebar con links a Dashboard, Menú, Órdenes, Configuración |

**Actions:** `analytics`, `products`, `orders`, `tenant`, `storage`.  
**API:** `app/api/products/` (GET, POST), `app/api/products/[id]/` (PATCH, DELETE).

---

### 2.4 Storefront (cliente)

| Feature | Descripción |
|--------|-------------|
| **Detección tenant** | Por `[slug]` en ruta; soporte subdominio (`lateburger.turestaurantedigital.com`) y ruta directa |
| **Branding dinámico** | Logo, nombre, `brand_color` por tenant |
| **Menú** | Categorías, grid de productos, imágenes |
| **Carrito** | Context API + `localStorage`; modal cantidad; sheet carrito |
| **Checkout** | Nombre, teléfono, tipo (delivery/pickup/dine-in); sin cuenta |
| **Orden** | Inserción en `orders` + `order_items`; confirmación con confetti |
| **404** | `not-found` si no existe tenant |
| **Variantes de UI** | Dark theme, Late Burger (hero/product-grid específicos); componentes genéricos + especializados |

**Componentes:** `storefront-client`, `menu-client`, `cart-context`, `cart-sheet`, `cart-button`, `product-grid`, `product-modal`, `order-success`, `store-header`, `navbar`, etc.

---

### 2.5 Base de datos e infra

| Elemento | Detalle |
|----------|---------|
| **Tablas** | `tenants`, `products`, `orders`, `order_items` |
| **RLS** | Políticas por tenant; acceso owner a sus datos |
| **Storage** | Buckets `restaurant-logos`, `product-images`; políticas RLS |
| **Realtime** | Suscripción a `orders` para KDS |
| **Tipos** | `types/database.ts` alineado con schema |

---

### 2.6 Routing e infraestructura

| Feature | Descripción |
|--------|-------------|
| **Proxy** | `proxy.ts` (ex middleware): localhost, `turestaurantedigital.com` → `/marketing`, `app.` → `/app`, subdominios → `[slug]` |
| **Vercel** | Build, deploy; subdominios según `VERCEL_SUBDOMAIN_SETUP.md` |
| **Resend** | Contacto; env vars `RESEND_API_KEY`, `RESEND_FROM` |

---

## 3. Lo que debemos implementar

### Estrategia de dominios

**Modelo de producto:** Los clientes operan **bajo la marca Tu Restaurante Digital**. La URL estándar es `[slug].turestaurantedigital.com` (ej. `lateburger.turestaurantedigital.com`). Muchos restaurantes no tienen dominio propio y no lo necesitan.

**Dominio personalizado (`lateburger.com.do`, etc.):**
- **Fuera de alcance del producto por ahora.** Si un cliente tiene dominio propio y quiere usarlo, **tú (TRD) te encargas** de DNS, CNAME, etc. de forma manual.
- No se prioriza un flujo en Settings ni automatización en app para dominios del restaurante.
- El foco sigue siendo subdominios bajo `turestaurantedigital.com`.

### 3.1 Prioridad alta

| Feature | Descripción | Dependencias |
|--------|-------------|--------------|
| **Modificadores de productos** | Ej. “Bacon +RD$ 50”, “Extra queso +RD$ 30” | Schema `product_modifiers` o similar; Menu Builder; Storefront |
| **Variantes de productos** | Ej. Tamaño: Pequeño / Mediano / Grande con ajuste de precio | Schema; Menu Builder; Storefront |
| **Notificaciones WhatsApp** | Aviso a restaurante por nueva orden; templates; API WhatsApp Business | Cuenta WhatsApp Business; API; env vars |

### 3.2 Prioridad media

| Feature | Descripción |
|--------|-------------|
| **Asset Management** | Galería en `/app/settings/assets`; upload masivo de imágenes; filtros por tipo (logo, producto, banner); optimización (resize, WebP); reasignación a productos |
| **Ordenamiento de productos** | Drag & drop para orden de categorías/productos en Menu Builder |
| **Duplicar producto** | Acción “Duplicar” en Menu Builder |
| **KDS mejorado** | Uso en pantallas grandes/TV; filtros (estado, hora); modo oscuro; timer de preparación; fullscreen |
| **Dashboard mejorado** | Gráficos (ej. Recharts); ventas por hora; exportar reportes (CSV) |
| **Configuración ampliada** | Contacto (teléfono, dirección); horarios; métodos de pago aceptados |
| **Búsqueda y filtros en storefront** | Búsqueda por nombre; filtros por precio, disponibilidad |
| **Reintegrar secciones de landing** | Si se desea: Commission Calculator, Omnichannel Flow, Zero Friction, Customer Data Insights (hoy no en `/` ni en `/marketing`) |

### 3.3 Prioridad baja

| Feature | Descripción |
|--------|-------------|
| **Sistema de pagos** | Stripe/PayPal u otra pasarela; pagos en línea; historial de transacciones |
| **Integración WhatsApp en app** | Más allá de notificaciones: quizá recibir órdenes por WhatsApp (según roadmap) |
| **Dominio personalizado** | Solo si en el futuro se decide ofrecerlo; hoy **fuera de alcance** (tú gestionas manualmente si un cliente tiene dominio) |
| **Optimización de imágenes** | Resize/compress automático; CDN; Next.js Image en todos los usos |

---

## 4. Priorización sugerida

### Fase inmediata (1–2 sprints)

1. **Modificadores y variantes**  
   Necesarios para menús reales (tamaños, extras). Afecta Menu Builder + Storefront + schema.

2. **WhatsApp para nuevas órdenes**  
   Alto impacto en operación del restaurante; complementa el KDS.

3. **Asset Management básico**  
   Upload masivo y galería; reducir dependencia de `/public` y mejorar onboarding.

### Fase siguiente (2–4 sprints)

4. **KDS para pantallas grandes**  
   Mejora uso en cocina.

5. **Dashboard y reportes**  
   Exportar CSV; gráficos más ricos.

### Fase posterior

6. **Pagos en línea**  
7. **Horarios y contacto en Settings**  
8. **Búsqueda y filtros en storefront**

---

## 5. Stack y referencias

- **Frontend:** Next.js (App Router), TypeScript, Tailwind, ShadcnUI, Lucide.
- **Backend:** Supabase (Postgres, Auth, Realtime, Storage).
- **Hosting:** Vercel.
- **Contacto:** Resend.

**Docs útiles:**

- `ROADMAP.md` — Roadmap detallado, fases, flujos.
- `README.md` — Instalación, configuración, troubleshooting.
- `supabase/README.md`, `STORAGE_SETUP.md` — DB y storage.
- `MIGRATE_IMAGES_TO_SUPABASE.md` — Migración de imágenes.
- `VERCEL_SUBDOMAIN_SETUP.md` — Subdominios en producción.

---

**Última actualización:** Enero 2026  
**Mantenido por:** Equipo Tu Restaurante Digital
