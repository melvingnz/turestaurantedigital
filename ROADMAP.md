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
- Métricas de ventas
- Gráficos de órdenes por día/semana
- Ingresos totales
- Estado: ⚠️ **PLACEHOLDER** (necesita implementación)

#### 2. Menu Builder (`/app/menu`)
- Crear categorías (ej: "Hamburguesas")
- Agregar productos (ej: "Doble Queso Burger" - RD$ 450)
- Modificadores (ej: "Bacon" - +RD$ 50)
- Toggle disponibilidad
- Estado: ✅ **IMPLEMENTADO** (básico, falta modificadores)

#### 3. KDS - Kitchen Display System (`/app/orders`)
- Pantalla en tiempo real
- Muestra: "Orden #102: 2x Doble Queso Burger"
- Estados: Pendiente → En Cocina → Listo → Entregado
- Notificaciones de sonido para nuevas órdenes
- Estado: ✅ **IMPLEMENTADO** (básico, falta optimización)

#### 4. Configuración (`/app/settings`)
- Editar nombre del restaurante
- Subir logo
- Cambiar color de marca
- Configurar dominio personalizado
- Estado: ❌ **NO IMPLEMENTADO**

**Estado General:** 🟡 **70% COMPLETO**

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

1. **Auth Flow**
   - Supabase Auth configurado
   - Falta: Signup atómico (crear User + Tenant en transacción)
   - Falta: Login flow completo
   - Falta: Protección de rutas `/app/*`

2. **KDS (Kitchen Display System)**
   - Realtime subscription funcionando
   - Falta: Optimización de UI para pantallas grandes
   - Falta: Filtros avanzados (por estado, por hora)
   - Falta: Sonido de notificación mejorado

3. **Menu Builder**
   - CRUD básico funcionando
   - Falta: Modificadores (ej: "Bacon", "Extra Queso")
   - Falta: Variantes (ej: "Tamaño: Pequeño/Mediano/Grande")
   - Falta: Upload de imágenes (actualmente solo URL)

### ❌ No Implementado

1. **Signup Flow Atómico**
   - Crear User en Supabase Auth
   - Crear Tenant en la misma transacción
   - Validar slug único
   - Redirigir a onboarding

2. **Dominio Personalizado**
   - Configuración DNS
   - Validación de dominio
   - SSL automático

3. **Dashboard Analytics**
   - Métricas de ventas
   - Gráficos
   - Exportación de reportes

4. **Configuración del Restaurante**
   - Editar branding
   - Subir logo
   - Cambiar color de marca

5. **Notificaciones WhatsApp**
   - Integración con API de WhatsApp Business
   - Templates de mensajes
   - Notificaciones automáticas de nuevas órdenes

6. **Sistema de Pagos**
   - Integración con pasarelas de pago (Stripe, PayPal)
   - Pagos en línea
   - Historial de transacciones

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

### FASE 2: El Puente (Onboarding) ⚠️ **EN PROGRESO**

**Objetivo:** Permitir que restaurantes se registren y creen su tenant.

**Tareas:**
- [ ] Crear página `/signup`
  - Formulario: Email, Password, Nombre del Restaurante, Slug
  - Validación de slug único
  - Validación de formato (solo letras, números, guiones)
- [ ] Implementar Server Action `signupWithTenant`
  - Crear usuario en Supabase Auth
  - Crear tenant en la misma transacción (usando Supabase Transaction)
  - Manejar errores (slug duplicado, email existente)
- [ ] Crear página `/login`
  - Formulario de login
  - Redirigir a `/app/dashboard` después del login
- [ ] Proteger rutas `/app/*`
  - Middleware de autenticación
  - Redirigir a `/login` si no está autenticado
- [ ] Página de onboarding post-signup
  - Bienvenida
  - Guía rápida: "Sube tu primer producto"

**Flujo Completo:**
```
1. Usuario visita turestaurantedigital.com
2. Click en "Empezar Ahora" → /signup
3. Completa formulario:
   - Email: owner@lateburger.com
   - Password: ****
   - Nombre: "Late Burger"
   - Slug: "lateburger"
4. Submit → Server Action ejecuta:
   - auth.signUp() → Crea usuario
   - db.insert('tenants') → Crea tenant
   - (Todo en transacción)
5. Redirige a /app/dashboard
```

**Estado:** 🟡 **30% COMPLETO**  
**Prioridad:** 🔴 **ALTA** (Bloquea todo el flujo)

---

### FASE 3: El Admin (MVP) 🟡 **70% COMPLETO**

**Objetivo:** Permitir que el dueño de Late Burger gestione su restaurante.

#### 3.1 Menu Builder ✅ **COMPLETO (Básico)**

**Tareas Completadas:**
- [x] CRUD de productos
- [x] Toggle disponibilidad
- [x] Categorías básicas
- [x] UI con ShadcnUI

**Tareas Pendientes:**
- [ ] Modificadores (ej: "Bacon" +RD$ 50)
- [ ] Variantes (ej: "Tamaño: Pequeño/Mediano/Grande")
- [ ] Upload de imágenes (Supabase Storage)
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

#### 3.2 Dashboard Analytics ❌ **NO IMPLEMENTADO**

**Tareas:**
- [ ] Métricas básicas:
  - Total de órdenes (hoy, esta semana, este mes)
  - Ingresos totales
  - Promedio por orden
  - Productos más vendidos
- [ ] Gráficos (usar Recharts o similar):
  - Ventas por día (últimos 7 días)
  - Ventas por hora (últimas 24 horas)
- [ ] Exportación de reportes (CSV)

**Prioridad:** 🟡 **MEDIA**

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

#### 3.4 Configuración ❌ **NO IMPLEMENTADO**

**Tareas:**
- [ ] Editar nombre del restaurante
- [ ] Subir logo (Supabase Storage)
- [ ] Cambiar color de marca (picker de color)
- [ ] Configurar información de contacto
- [ ] Configurar horarios de operación

**Prioridad:** 🟡 **MEDIA**

---

### FASE 4: El Storefront ✅ **COMPLETO (Básico)**

**Objetivo:** Permitir que clientes ordenen desde `lateburger.com.do`.

**Tareas Completadas:**
- [x] Layout con detección de tenant por slug
- [x] Menu display con categorías
- [x] Carrito con Context API
- [x] Checkout flow
- [x] Order placement
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

### 1. Flujo de Signup Atómico ⚠️ **PENDIENTE**

**Problema:** Necesitamos crear el User y el Tenant en una sola transacción para evitar estados inconsistentes.

**Solución:**
```typescript
// app/actions/auth.ts
export async function signupWithTenant(data: {
  email: string
  password: string
  restaurantName: string
  slug: string
}) {
  // 1. Crear usuario en Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  })
  
  if (authError) throw authError
  
  // 2. Crear tenant en la misma transacción
  const { data: tenantData, error: tenantError } = await supabase
    .from('tenants')
    .insert({
      name: data.restaurantName,
      slug: data.slug,
      owner_id: authData.user!.id,
    })
    .select()
    .single()
  
  if (tenantError) {
    // Si falla, eliminar el usuario creado (rollback)
    await supabase.auth.admin.deleteUser(authData.user!.id)
    throw tenantError
  }
  
  return { user: authData.user, tenant: tenantData }
}
```

**Estado:** ❌ **NO IMPLEMENTADO**  
**Prioridad:** 🔴 **CRÍTICA**

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

1. **Implementar Signup Flow Atómico**
   - Bloquea todo el onboarding
   - Sin esto, no hay nuevos restaurantes

2. **Implementar Login Flow**
   - Proteger rutas `/app/*`
   - Redirigir a `/login` si no está autenticado

3. **Proteger Rutas Admin**
   - Middleware de autenticación
   - Verificar que el usuario es owner del tenant

### Prioridad 🟡 MEDIA

4. **Dashboard Analytics**
   - Métricas básicas
   - Gráficos simples

5. **Configuración del Restaurante**
   - Editar branding
   - Subir logo

6. **Modificadores en Menu Builder**
   - Agregar modificadores a productos
   - Mostrar modificadores en storefront

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
- [ ] Late Burger puede registrarse
- [ ] Late Burger puede crear productos
- [ ] Clientes pueden ordenar desde `lateburger.turestaurantedigital.com`
- [ ] Late Burger recibe órdenes en tiempo real en KDS

### Fase 4-5
- [ ] Late Burger puede usar `lateburger.com.do`
- [ ] Dashboard muestra métricas básicas
- [ ] Notificaciones WhatsApp funcionando

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
- `middleware.ts` - Routing inteligente
- `types/database.ts` - Tipos TypeScript
- `app/actions/` - Server Actions

---

**Última Actualización:** 2026  
**Mantenido por:** Equipo de Desarrollo - Tu Restaurante Digital
