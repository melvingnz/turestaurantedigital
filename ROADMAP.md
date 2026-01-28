# 🗺️ ROADMAP - Tu Restaurante Digital

**Versión:** 1.0  
**Fecha:** 2026  
**Piloto:** Late Burger (`lateburger.com`)

---

## 📋 ÍNDICE

1. [Visión del Producto](#visión-del-producto)
2. [Arquitectura: La Trinidad](#arquitectura-la-trinidad)
3. [Stack Tecnológico](#stack-tecnológico)
4. [Estado Actual](#estado-actual)
5. [Fases de Desarrollo](#fases-de-desarrollo)
6. [Flujos Críticos](#flujos-críticos)

---

## 🎯 VISIÓN DEL PRODUCTO

### El Problema
Los restaurantes en República Dominicana pagan **30% de comisión** a apps como UberEats y Rappi por cada pedido, incluso de clientes recurrentes que ya conocen el restaurante.

### La Solución
**Tu Restaurante Digital** es un SaaS B2B que proporciona a restaurantes su **propio canal directo sin comisiones**. No reemplazamos UberEats; capturamos clientes recurrentes que prefieren ordenar directamente.

### El Caso de Uso: Late Burger

**Escenario:**
- Late Burger tiene clientes fieles que siempre piden la "Doble Queso Burger".
- Actualmente pagan 30% a UberEats por cada pedido de estos clientes.
- Late Burger necesita su propio sitio web con branding naranja donde los clientes puedan ordenar directamente.

**Resultado Esperado:**
- Cliente visita `lateburger.com.do` → Ve el menú con branding naranja → Ordena → Late Burger recibe notificación por WhatsApp → **0% comisión**.

---

## 🏗️ ARQUITECTURA: LA TRINIDAD

El sistema está dividido en **3 portales independientes** usando Next.js Route Groups:

### A. 🎨 Marketing Portal `(marketing)`

**URL:** `turestaurantedigital.com`  
**Acceso:** Público  
**Objetivo:** Vender el SaaS

**Componentes:**
- Landing Page con Hero, Features, Pricing, FAQ
- Botón "Empezar Ahora" → `/signup`
- Botón "Iniciar Sesión" → `/login`

**Estado:** ✅ **COMPLETO**  
- Landing page implementada
- Componentes de marketing listos
- Footer multi-columna

---

### B. 🍳 Admin Portal `(app)` - La Cocina

**URL:** `app.turestaurantedigital.com`  
**Acceso:** Privado (Auth requerido)  
**Usuarios:** Propietarios de restaurantes (ej: Dueño de Late Burger)

**Módulos Clave:**

#### 1. Dashboard (`/app/dashboard`)
- Métricas de ventas (hoy, semana, mes)
- Gráficos de órdenes últimos 7 días
- Ingresos totales y ticket promedio
- Top 5 productos más vendidos
- Estado: ✅ **IMPLEMENTADO**

#### 2. Menu Builder (`/app/menu`)
- Crear categorías (ej: "Hamburguesas", "Pizzas", "Tacos")
- Agregar productos con upload de imágenes (Supabase Storage)
- Ocultar/mostrar productos sin eliminarlos
- Filtros: Todos, Disponibles, Ocultos
- Toggle disponibilidad con lógica mejorada
- Estado: ✅ **IMPLEMENTADO** (falta modificadores y variantes)

#### 3. KDS - Kitchen Display System (`/app/orders`)
- Pantalla en tiempo real
- Muestra: "Orden #102: 2x Doble Queso Burger"
- Estados: Pendiente → En Cocina → Listo → Entregado
- Notificaciones de sonido para nuevas órdenes
- Estado: ✅ **IMPLEMENTADO** (básico, falta optimización)

#### 4. Configuración (`/app/settings`)
- Editar nombre del restaurante
- Cambiar slug (con validación)
- Subir logo (Supabase Storage + URL externa)
- Cambiar color de marca (color picker)
- Preview en tiempo real del storefront
- Estado: ✅ **IMPLEMENTADO** (falta dominio personalizado)

**Estado General:** 🟢 **85% COMPLETO**

---

### C. 🛒 Client Storefront `(storefront)` - El Menú

**URL:** Dinámico
- **Fase 1:** `lateburger.turestaurantedigital.com` (Subdominio)
- **Fase 2:** `lateburger.com.do` (Dominio personalizado)

**Acceso:** Público (Checkout sin cuenta)

**Flujo:**
1. Cliente visita `lateburger.com.do`
2. Ve el menú con branding naranja de Late Burger
3. Agrega "Doble Queso Burger" al carrito
4. Checkout: Nombre, Teléfono, Tipo (Delivery/Pickup)
5. Orden creada → Notificación WhatsApp a Late Burger

**Componentes:**
- Navbar con logo y nombre del restaurante
- Filtro de categorías (sticky)
- Grid de productos con imágenes
- Modal para seleccionar cantidad
- Carrito flotante
- Checkout Sheet con formulario
- Confirmación con confetti

**Estado:** ✅ **COMPLETO** (básico, falta dominio personalizado)

---

## 🛠️ STACK TECNOLÓGICO

### Frontend
- **Framework:** Next.js 14+ (App Router, TypeScript)
- **Estilos:** Tailwind CSS + ShadcnUI
- **Iconos:** Lucide React
- **Brand Color:** `#FF5F1F` (Naranja)

### Backend
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth
- **Realtime:** Supabase Realtime (para KDS)
- **Storage:** Supabase Storage (para imágenes de productos)

### Seguridad
- **RLS (Row Level Security):** ✅ **IMPLEMENTADO**
  - Los datos de `lateburger` **NUNCA** se filtran a `pizzeriamario`
  - Políticas RLS en todas las tablas
  - Verificación por `owner_id` en todas las queries

### Infraestructura
- **Hosting:** Vercel (recomendado)
- **DNS:** Cloudflare (para subdominios y dominios personalizados)
- **Middleware:** Next.js Middleware (routing inteligente)

---

## 📊 ESTADO ACTUAL

### ✅ Completado

1. **Base de Datos**
   - Schema completo (`tenants`, `products`, `orders`, `order_items`)
   - RLS policies implementadas
   - Índices optimizados
   - Triggers para `updated_at`

2. **Marketing Portal**
   - Landing page completa
   - Componentes: Hero, Features, Steps, Pricing, FAQ, Footer
   - Traducción al español
   - Navbar limpio y enfocado en conversión

3. **Admin Portal (Básico)**
   - Layout con Sidebar
   - Menu Management (CRUD de productos)
   - KDS con Realtime (básico)
   - Dashboard placeholder

4. **Storefront (Básico)**
   - Layout con detección de tenant por slug
   - Menu display con categorías
   - Carrito con Context API + localStorage
   - Checkout flow
   - Order placement

5. **Middleware**
   - Routing inteligente por subdominio
   - Soporte para localhost y producción

### ⚠️ Parcialmente Implementado

1. **KDS (Kitchen Display System)**
   - Realtime subscription funcionando
   - Falta: Optimización de UI para pantallas grandes
   - Falta: Filtros avanzados (por estado, por hora)
   - Falta: Sonido de notificación mejorado

### ❌ No Implementado

1. **Dominio Personalizado**
   - Configuración DNS
   - Validación de dominio
   - SSL automático

2. **Modificadores y Variantes en Menu Builder**
   - Modificadores (ej: "Bacon" +RD$ 50)
   - Variantes (ej: "Tamaño: Pequeño/Mediano/Grande")
   - Ordenamiento de productos (drag & drop)
   - Duplicar producto

3. **Notificaciones WhatsApp**
   - Integración con API de WhatsApp Business
   - Templates de mensajes
   - Notificaciones automáticas de nuevas órdenes

4. **Sistema de Pagos**
   - Integración con pasarelas de pago (Stripe, PayPal)
   - Pagos en línea
   - Historial de transacciones

5. **Exportación de Reportes**
   - Exportar métricas a CSV
   - Reportes personalizados

---

## 🚀 FASES DE DESARROLLO

### FASE 1: Fundación (Backend) ✅ **COMPLETADO**

**Objetivo:** Establecer la base de datos y seguridad.

**Tareas:**
- [x] Crear schema de base de datos
- [x] Implementar RLS policies
- [x] Crear índices optimizados
- [x] Definir tipos TypeScript
- [x] Configurar Supabase client (server/client)

**Resultado:** Base de datos lista para multi-tenancy seguro.

**Ejemplo con Late Burger:**
```
Tenant creado:
- id: uuid-123
- name: "Late Burger"
- slug: "lateburger"
- owner_id: uuid-owner-456
- brand_color: "#FF5F1F"
```

---

### FASE 2: El Puente (Onboarding) ✅ **COMPLETADO**

**Objetivo:** Permitir que restaurantes se registren y creen su tenant.

**Tareas Completadas:**
- [x] Crear página `/signup`
  - Formulario completo: Email, Password, Nombre del Restaurante, Slug
  - Validación de slug único
  - Validación de formato (solo letras, números, guiones)
  - Auto-generación de slug desde nombre
  - Preview de URL del storefront
- [x] Implementar Server Action `signupWithTenant` (ATÓMICO)
  - Crear usuario en Supabase Auth
  - Crear tenant en la misma transacción
  - Rollback automático si falla (elimina usuario si tenant falla)
  - Manejo de errores (slug duplicado, email existente)
- [x] Crear página `/login`
  - Formulario de login completo
  - Redirigir a `/app/dashboard` después del login
  - Manejo de errores
- [x] Proteger rutas `/app/*`
  - Helper `requireAuth()` en layout
  - Redirigir a `/login` si no está autenticado
- [x] Cliente Admin para operaciones de rollback
  - `createAdminClient()` con Service Role Key
  - Usado para eliminar usuarios en caso de rollback

**Flujo Completo:**
```
1. Usuario visita turestaurantedigital.com
2. Click en "Empezar Ahora" → /signup
3. Completa formulario:
   - Email: owner@lateburger.com
   - Password: ****
   - Nombre: "Late Burger"
   - Slug: "lateburger" (auto-generado)
4. Submit → signupWithTenant() ejecuta:
   - auth.signUp() → Crea usuario
   - Verifica slug disponible
   - db.insert('tenants') → Crea tenant
   - Si falla → Rollback (elimina usuario)
5. Redirige a /app/dashboard
```

**Estado:** ✅ **100% COMPLETO**  
**Archivos Clave:**
- `app/actions/auth.ts` - Server Actions de autenticación
- `app/(marketing)/signup/page.tsx` - Página de registro
- `app/(marketing)/login/page.tsx` - Página de login
- `lib/auth.ts` - Helpers de autenticación
- `lib/supabase/admin.ts` - Cliente admin para rollback

---

### FASE 3: El Admin (MVP) 🟢 **85% COMPLETO**

**Objetivo:** Permitir que el dueño de Late Burger gestione su restaurante.

#### 3.1 Menu Builder ✅ **COMPLETO (Mejorado)**

**Tareas Completadas:**
- [x] CRUD de productos completo
- [x] Toggle disponibilidad (ocultar/mostrar sin eliminar)
- [x] Filtros: Todos, Disponibles, Ocultos
- [x] Categorías expandidas (Hamburguesas, Pizzas, Tacos, etc.)
- [x] UI mejorada con ShadcnUI
- [x] Upload de imágenes con Supabase Storage
- [x] Fallback a URL externa
- [x] Validaciones mejoradas
- [x] Banner informativo sobre lógica de ocultar

**Lógica de Ocultar/Mostrar:**
- Los productos NO se eliminan, solo se ocultan
- Ejemplo: Jueves no venden "Pizza Margarita" → Ocultar
- Viernes vuelven a vender → Mostrar
- Los productos ocultos NO aparecen en el storefront
- Los productos ocultos permanecen en la base de datos

**Tareas Pendientes:**
- [ ] Modificadores (ej: "Bacon" +RD$ 50)
- [ ] Variantes (ej: "Tamaño: Pequeño/Mediano/Grande")
- [ ] Ordenamiento de productos (drag & drop)
- [ ] Duplicar producto

**Ejemplo:**
```
Producto: "Doble Queso Burger"
- Precio base: RD$ 450
- Modificadores:
  - Bacon: +RD$ 50
  - Extra Queso: +RD$ 30
- Variantes:
  - Tamaño: Pequeño (-RD$ 50) / Mediano (base) / Grande (+RD$ 50)
```

#### 3.2 Dashboard Analytics ✅ **COMPLETO**

**Tareas Completadas:**
- [x] Métricas básicas:
  - Total de productos
  - Pedidos (hoy, esta semana, este mes)
  - Ingresos (hoy, esta semana, este mes)
  - Ticket promedio (valor promedio de orden)
- [x] Top 5 productos más vendidos
  - Cantidad vendida
  - Revenue total por producto
- [x] Gráfico de ventas (últimos 7 días)
  - Barras CSS simples
  - Muestra órdenes y revenue por día
- [x] Cards con iconos y colores
- [x] Formato de moneda (RD$ con separadores)

**Tareas Pendientes:**
- [ ] Gráficos más avanzados (Recharts)
- [ ] Ventas por hora (últimas 24 horas)
- [ ] Exportación de reportes (CSV)

**Prioridad:** 🟢 **BAJA** (Funcional, mejoras opcionales)

#### 3.3 KDS (Kitchen Display System) ✅ **COMPLETO (Básico)**

**Tareas Completadas:**
- [x] Realtime subscription a `orders`
- [x] Order cards con estados
- [x] Botones de acción (Aceptar, Listo, Entregado)
- [x] Notificación de sonido (básico)

**Tareas Pendientes:**
- [ ] Optimización para pantallas grandes (TVs en cocina)
- [ ] Filtros avanzados (por estado, por hora)
- [ ] Modo oscuro para cocina
- [ ] Timer de tiempo de preparación
- [ ] Sonido de notificación mejorado

**Prioridad:** 🟢 **BAJA** (Funcional, mejoras opcionales)

#### 3.4 Configuración ✅ **COMPLETO**

**Tareas Completadas:**
- [x] Editar nombre del restaurante
- [x] Cambiar slug (con validación y verificación de disponibilidad)
- [x] Subir logo con Supabase Storage
- [x] Fallback a URL externa para logo
- [x] Cambiar color de marca (color picker + input de texto)
- [x] Preview en tiempo real del storefront
- [x] Validaciones completas
- [x] Manejo de errores y éxito

**Tareas Pendientes:**
- [ ] Configurar información de contacto
- [ ] Configurar horarios de operación
- [ ] Configurar métodos de pago aceptados

**Prioridad:** 🟢 **BAJA** (Funcional, mejoras opcionales)

---

### FASE 4: El Storefront ✅ **COMPLETO (Básico)**

**Objetivo:** Permitir que clientes ordenen desde `lateburger.com.do`.

**Tareas Completadas:**
- [x] Layout con detección de tenant por slug
- [x] Menu display con categorías
- [x] Carrito con Context API
- [x] Checkout flow
- [x] Order placement
- [x] Storefront Dark Theme para Late Burger (Master Template)
- [x] Branding dinámico (colores, logo)

**Tareas Pendientes:**
- [ ] **Sistema de Upload Masivo de Assets para Storefront**
  - Upload de logo del restaurante
  - Upload de imágenes de productos (múltiples a la vez)
  - Upload de banner/hero image personalizado
  - Gestor de assets en `/app/settings/assets`
  - Preview de cómo se verán en el storefront
  - Optimización automática (resize, compress)
  - Soporte para diferentes formatos (JPG, PNG, WEBP)
- [x] 404 si tenant no existe

**Tareas Pendientes:**
- [ ] Dominio personalizado (Fase 2 del roadmap)
- [ ] Optimización de imágenes (Next.js Image)
- [ ] Búsqueda de productos
- [ ] Filtros avanzados (precio, disponibilidad)
- [ ] Modificadores en el storefront (si se implementan en Fase 3)

**Prioridad:** 🟢 **BAJA** (Funcional, mejoras opcionales)

---

### FASE 5: Realtime KDS ✅ **COMPLETO (Básico)**

**Objetivo:** Pantalla de cocina en tiempo real.

**Tareas Completadas:**
- [x] Supabase Realtime subscription
- [x] UI de order cards
- [x] Actualización automática de estados
- [x] Notificación de sonido

**Tareas Pendientes:**
- [ ] Optimización para pantallas grandes
- [ ] Filtros avanzados
- [ ] Timer de preparación
- [ ] Modo fullscreen para cocina

**Prioridad:** 🟢 **BAJA** (Funcional, mejoras opcionales)

---

## 🔄 FLUJOS CRÍTICOS

### 1. Flujo de Signup Atómico ✅ **IMPLEMENTADO**

**Problema:** Necesitamos crear el User y el Tenant en una sola transacción para evitar estados inconsistentes.

**Solución Implementada:**
```typescript
// app/actions/auth.ts
export async function signupWithTenant(data: SignupData): Promise<SignupResult> {
  // 1. Validar slug (formato, longitud, reservados)
  // 2. Crear usuario en Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({...})
  
  // 3. Verificar slug disponible
  // 4. Crear tenant
  const { data: tenantData, error: tenantError } = await supabase
    .from('tenants')
    .insert({...})
  
  if (tenantError) {
    // Rollback: Eliminar usuario usando admin client
    await adminClient.auth.admin.deleteUser(authData.user.id)
    throw tenantError
  }
  
  return { success: true, user, tenant }
}
```

**Características:**
- ✅ Validación de slug (formato, longitud, reservados)
- ✅ Verificación de disponibilidad antes de crear
- ✅ Rollback automático si falla
- ✅ Manejo completo de errores
- ✅ UI con validaciones en tiempo real

**Estado:** ✅ **IMPLEMENTADO**  
**Archivos:**
- `app/actions/auth.ts`
- `app/(marketing)/signup/page.tsx`
- `lib/supabase/admin.ts`

---

### 2. Middleware Routing ✅ **IMPLEMENTADO**

**Funcionalidad:**
- `turestaurantedigital.com` → `/marketing`
- `app.turestaurantedigital.com` → `/app/dashboard`
- `lateburger.turestaurantedigital.com` → `/storefront/lateburger`
- `lateburger.com.do` → `/storefront/lateburger` (Fase 2: Dominio personalizado)

**Estado:** ✅ **FUNCIONANDO**

---

### 3. Flujo de Orden Completo ✅ **IMPLEMENTADO**

**Ejemplo con Late Burger:**
```
1. Cliente visita lateburger.turestaurantedigital.com
2. Ve "Doble Queso Burger" - RD$ 450
3. Click en "Agregar" → Abre modal
4. Selecciona cantidad: 2
5. Agrega al carrito
6. Click en "Ver Carrito" → Abre Sheet
7. Completa formulario:
   - Nombre: "Juan Pérez"
   - Teléfono: "809-123-4567"
   - Tipo: Delivery
8. Click en "Realizar Pedido"
9. Server Action ejecuta:
   - Inserta en `orders`
   - Inserta en `order_items` (2x Doble Queso Burger)
   - Todo en transacción
10. KDS de Late Burger recibe notificación en tiempo real
11. Cliente ve confirmación con confetti
```

**Estado:** ✅ **FUNCIONANDO**

---

## 📈 PRÓXIMOS PASOS (Priorizados)

### Prioridad 🔴 ALTA

1. ✅ **Signup Flow Atómico** - COMPLETADO
2. ✅ **Login Flow** - COMPLETADO
3. ✅ **Protección de Rutas Admin** - COMPLETADO

### Prioridad 🟡 MEDIA

4. ✅ **Dashboard Analytics** - COMPLETADO
5. ✅ **Configuración del Restaurante** - COMPLETADO
6. ✅ **Supabase Storage** - COMPLETADO
7. ⚠️ **Modificadores en Menu Builder** - PENDIENTE
   - Agregar modificadores a productos
   - Mostrar modificadores en storefront
8. ⚠️ **Asset Management System** - PLANIFICADO
   - Upload masivo de imágenes para productos
   - Gestor de assets (logos, banners, productos)
   - Optimización automática de imágenes
   - Preview de assets en storefront

### Prioridad 🟢 BAJA

7. **Optimizaciones de KDS**
   - Pantallas grandes
   - Filtros avanzados

8. **Dominio Personalizado**
   - Configuración DNS
   - Validación de dominio

9. **Notificaciones WhatsApp**
   - Integración con API
   - Templates de mensajes

---

## 🎯 MÉTRICAS DE ÉXITO

### MVP (Fase 1-3)
- [x] Late Burger puede registrarse ✅
- [x] Late Burger puede crear productos ✅
- [x] Late Burger puede ocultar/mostrar productos sin eliminarlos ✅
- [x] Late Burger puede subir logos e imágenes de productos ✅
- [x] Late Burger puede personalizar su branding (color, logo) ✅
- [x] Clientes pueden ordenar desde `lateburger.turestaurantedigital.com` ✅
- [x] Late Burger recibe órdenes en tiempo real en KDS ✅
- [x] Dashboard muestra métricas básicas ✅

### Fase 4-5
- [ ] Late Burger puede usar `lateburger.com.do` (Dominio personalizado)
- [ ] Notificaciones WhatsApp funcionando
- [ ] Modificadores y variantes en productos

---

## 📝 NOTAS TÉCNICAS

### Seguridad RLS

**Ejemplo de Política RLS:**
```sql
-- Solo el owner de Late Burger puede ver sus órdenes
CREATE POLICY "Orders are viewable by tenant owner"
  ON orders FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM tenants
      WHERE tenants.id = orders.tenant_id
      AND tenants.owner_id = auth.uid()
    )
  );
```

**Resultado:** Si `pizzeriamario` intenta acceder a órdenes de `lateburger`, la query retorna 0 filas.

### Realtime KDS

**Implementación:**
```typescript
// components/admin/orders-client.tsx
useEffect(() => {
  const channel = supabase
    .channel('orders')
    .on('postgres_changes', {
      event: 'INSERT',
      schema: 'public',
      table: 'orders',
      filter: `tenant_id=eq.${tenantId}`,
    }, (payload) => {
      // Nueva orden recibida
      playSound()
      setOrders(prev => [payload.new, ...prev])
    })
    .subscribe()
  
  return () => {
    supabase.removeChannel(channel)
  }
}, [tenantId])
```

---

## 🚧 RIESGOS Y CONSIDERACIONES

### Riesgos Técnicos

1. **Transacciones Atómicas**
   - Supabase no soporta transacciones multi-tabla directamente
   - Solución: Usar funciones PostgreSQL o manejar rollback manual

2. **Escalabilidad de Realtime**
   - Si hay 100 restaurantes, 100 canales activos
   - Considerar rate limiting

3. **Dominio Personalizado**
   - Requiere configuración DNS manual
   - Considerar automatización con Cloudflare API

### Riesgos de Negocio

1. **Adopción**
   - Restaurantes pueden ser reacios a cambiar
   - Necesitamos demostrar ROI claro

2. **Soporte**
   - Cada restaurante necesita onboarding
   - Considerar documentación y videos

---

## 📚 RECURSOS

### Documentación
- [Next.js App Router](https://nextjs.org/docs/app)
- [Supabase Docs](https://supabase.com/docs)
- [Supabase Realtime](https://supabase.com/docs/guides/realtime)

### Archivos Clave
- `supabase/schema.sql` - Schema de base de datos
- `proxy.ts` - Routing inteligente
- `types/database.ts` - Tipos TypeScript
- `app/actions/` - Server Actions

---

## 🆕 CAMBIOS RECIENTES (v2.0)

### ✅ Implementado en esta versión:

1. **Signup Flow Atómico Completo**
   - Páginas `/signup` y `/login` funcionales
   - Rollback automático si falla la creación del tenant
   - Validaciones completas de slug
   - Protección de rutas `/app/*`

2. **Dashboard Analytics**
   - Métricas en tiempo real (productos, pedidos, ingresos)
   - Top 5 productos más vendidos
   - Gráfico de ventas últimos 7 días
   - Ticket promedio calculado

3. **Configuración del Restaurante**
   - Editar nombre y slug
   - Upload de logo con Supabase Storage
   - Cambiar color de marca
   - Preview en tiempo real

4. **Menu Builder Mejorado**
   - Lógica de ocultar/mostrar productos (sin eliminar)
   - Filtros: Todos, Disponibles, Ocultos
   - Upload de imágenes con Supabase Storage
   - Fallback a URL externa
   - Validaciones mejoradas

5. **Supabase Storage**
   - Buckets configurados: `restaurant-logos`, `product-images`
   - Políticas RLS para acceso controlado
   - Componente `ImageUpload` reutilizable
   - Limpieza automática de archivos antiguos

### 📁 Archivos Nuevos Creados:

- `app/actions/auth.ts` - Autenticación y signup atómico
- `app/actions/analytics.ts` - Métricas del dashboard
- `app/actions/tenant.ts` - Gestión de tenant
- `app/actions/storage.ts` - Upload de archivos
- `app/(marketing)/signup/page.tsx` - Página de registro
- `app/(marketing)/login/page.tsx` - Página de login
- `app/(app)/settings/page.tsx` - Configuración del restaurante
- `lib/auth.ts` - Helpers de autenticación
- `lib/storage.ts` - Helpers de Supabase Storage
- `lib/supabase/admin.ts` - Cliente admin para rollback
- `components/ui/image-upload.tsx` - Componente de upload
- `supabase/storage.sql` - Script de configuración de Storage
- `supabase/STORAGE_SETUP.md` - Instrucciones de setup

---

## 🔮 ROADMAP FUTURO (Post-MVP)

### FASE 6: Asset Management System ⚠️ **PLANIFICADO**

**Objetivo:** Permitir que restaurantes suban y gestionen todos sus assets (imágenes, logos, banners) desde el Admin Panel de forma masiva y eficiente.

**Contexto Actual:**
- ✅ Ya tenemos Supabase Storage configurado (`restaurant-logos`, `product-images`)
- ✅ Ya tenemos componente `ImageUpload` para upload individual
- ✅ Los restaurantes pueden subir logo y una imagen por producto
- ⚠️ **Limitación actual:** Upload uno por uno, no hay gestión centralizada
- ⚠️ **Late Burger:** Actualmente usa imágenes hardcodeadas en `/public/images/` (temporal para MVP)

**Features Planificadas:**

#### 6.1 Asset Manager Dashboard (`/app/settings/assets`)

**Objetivo:** Dashboard centralizado para gestionar todos los assets del restaurante.

**Features:**
- [ ] Vista de galería de todos los assets (logos, productos, banners)
- [ ] Filtros por tipo de asset (Logo, Producto, Banner)
- [ ] Búsqueda de assets por nombre
- [ ] Preview de assets antes de usar
- [ ] Estadísticas de uso (qué assets están siendo usados en productos activos)
- [ ] Eliminación de assets no utilizados (con confirmación)
- [ ] Reasignación de imágenes a diferentes productos

#### 6.2 Upload Masivo de Productos

**Objetivo:** Permitir subir múltiples imágenes de productos a la vez para agilizar el setup del storefront.

**Features:**
- [ ] Drag & drop múltiple (seleccionar 10+ imágenes a la vez)
- [ ] Progress bar para uploads grandes
- [ ] Retry automático en caso de fallo
- [ ] CSV import con URLs de imágenes (opcional)
- [ ] Asignación automática de imágenes a productos existentes por nombre
- [ ] Validación de formato y tamaño en batch
- [ ] Preview de todas las imágenes antes de confirmar upload

**Flujo de Trabajo:**
1. Restaurante va a `/app/settings/assets`
2. Selecciona "Upload Masivo de Productos"
3. Arrastra 10 imágenes a la vez
4. Sistema valida formato/tamaño
5. Restaurante asigna cada imagen a un producto (o crea productos nuevos)
6. Confirmación y preview del storefront actualizado

#### 6.3 Optimización Automática de Imágenes

**Objetivo:** Mejorar performance del storefront con imágenes optimizadas automáticamente.

**Features:**
- [ ] Resize automático según uso:
  - Thumbnail (150x150) para listas
  - Card (400x400) para grid de productos
  - Hero (1200x800) para banners
- [ ] Compresión inteligente (WebP cuando sea posible, fallback a JPG)
- [ ] Lazy loading en storefront
- [ ] CDN integration (opcional, para escalar)
- [ ] Next.js Image Optimization API

#### 6.4 Branding Assets Avanzados

**Objetivo:** Permitir personalización completa del storefront con múltiples variantes.

**Features:**
- [ ] Upload de múltiples variantes de logo:
  - Logo claro (para fondos oscuros)
  - Logo oscuro (para fondos claros)
  - Favicon (32x32, 64x64)
  - Icon para app móvil (512x512)
- [ ] Upload de banner/hero personalizado
- [ ] Templates de storefront (Dark, Light, Custom)
- [ ] Preview en tiempo real de cambios en storefront

**Tecnología:**
- Supabase Storage (ya implementado)
- Extender componente `ImageUpload` a `ImageUploadMultiple`
- Next.js Image Optimization API
- Sharp para procesamiento de imágenes (opcional)

**Prioridad:** 🟡 **MEDIA** (Mejora UX significativa, no bloquea MVP)

**Nota Importante:** 
Actualmente, Late Burger usa imágenes hardcodeadas en `/public/images/` como solución temporal para el MVP. Cuando se implemente este sistema, los restaurantes podrán:
1. Subir todas sus imágenes desde el Admin Panel
2. Gestionar sus assets de forma centralizada
3. No depender de archivos en `/public/` (que no escalan para múltiples restaurantes)

---

## 🛠️ SOLUCIÓN DE PROBLEMAS (TROUBLESHOOTING)

### 1. Error `spawn EPERM` en Windows (Node.js 21+)

**Problema:** Al ejecutar `npm run dev` en Windows con Node.js v21 o v22, el servidor de desarrollo de Next.js falla con un error `spawn EPERM`. Esto se debe a un bug conocido en Node.js al realizar `fork()` de procesos hijo en Windows.

**Solución Implementada:**
- Se ha modificado `scripts/dev.js` para detectar si se está en Windows con Node >= 21.
- En ese caso, se ejecuta Next.js forzando el uso de **Node 20 LTS** mediante `npx --yes node@20`.
- Se ha añadido un archivo `.nvmrc` y restricciones de versión en `package.json` para recomendar el uso de Node 20.

**Archivos afectados:**
- `scripts/dev.js`
- `package.json`
- `.nvmrc`

---

**Última Actualización:** 2026  
**Mantenido por:** Equipo de Desarrollo - Tu Restaurante Digital
