# 🍽️ Tu Restaurante Digital

SaaS B2B para restaurantes en República Dominicana que permite crear su propio canal de pedidos directo sin comisiones, reduciendo la dependencia de plataformas como UberEats y Rappi.

## 📋 Tabla de Contenidos

- [Visión del Producto](#-visión-del-producto)
- [Características Principales](#-características-principales)
- [Stack Tecnológico](#-stack-tecnológico)
- [Arquitectura](#-arquitectura)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Desarrollo](#-desarrollo)
- [Estado del Proyecto](#-estado-del-proyecto)
- [Roadmap](#-roadmap)
- [Troubleshooting](#-troubleshooting)

## 🎯 Visión del Producto

### El Problema
Los restaurantes en República Dominicana pagan **30% de comisión** a apps como UberEats y Rappi por cada pedido, incluso de clientes recurrentes que ya conocen el restaurante.

### La Solución
**Tu Restaurante Digital** es un SaaS B2B que proporciona a restaurantes su **propio canal directo sin comisiones**. No reemplazamos UberEats; capturamos clientes recurrentes que prefieren ordenar directamente.

### Caso de Uso: Late Burger
- Cliente visita `lateburger.turestaurantedigital.com` o `turestaurantedigital.com/lateburger` → Ve el menú con branding azul/amarillo → Ordena → Late Burger recibe notificación → **0% comisión**

## ✨ Características Principales

### 🎨 Portal de Marketing
- Landing page completa con Hero, Features, Pricing, FAQ
- Páginas de registro (`/marketing/signup`) e inicio de sesión (`/marketing/login`)
- Diseño moderno y enfocado en conversión

### 🍳 Portal de Administración
- **Dashboard Analytics**: Métricas de ventas, gráficos, top productos
- **Menu Builder**: CRUD completo de productos con categorías
- **KDS (Kitchen Display System)**: Pantalla en tiempo real para cocina
- **Configuración**: Personalización de branding, logo, colores, slug

### 🛒 Storefront (Tienda del Cliente)
- Menú dinámico con categorías
- Carrito de compras con Context API
- Checkout sin necesidad de cuenta
- Branding personalizado por restaurante
- Tema oscuro/claro configurable
- **Late Burger**: Branding especial con colores azul (#0FA8D8) y amarillo (#FCFF70)

## 🛠️ Stack Tecnológico

### Frontend
- **Framework**: Next.js 14.2.35 (App Router, TypeScript)
- **Estilos**: Tailwind CSS + ShadcnUI
- **Iconos**: Lucide React
- **Brand Color**: `#FF5F1F` (Naranja) - Default
- **Late Burger Colors**: `#0FA8D8` (Azul) y `#FCFF70` (Amarillo)

### Backend
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Realtime**: Supabase Realtime (para KDS)
- **Storage**: Supabase Storage (para imágenes de productos y logos)

### Seguridad
- **RLS (Row Level Security)**: Implementado en todas las tablas
- **Multi-tenancy**: Aislamiento completo de datos por restaurante
- **Validaciones**: Server-side y client-side

### Infraestructura
- **Hosting**: Vercel (recomendado)
- **DNS**: Cloudflare (para subdominios y dominios personalizados)
- **Middleware**: Next.js Middleware (routing inteligente multi-tenant)

## 🏗️ Arquitectura

El sistema está dividido en **3 portales independientes**:

### 1. Marketing Portal `app/marketing/`
**URL**: `turestaurantedigital.com`  
**Acceso**: Público  
**Objetivo**: Vender el SaaS

**Rutas**:
- `/marketing` - Landing page
- `/marketing/login` - Inicio de sesión
- `/marketing/signup` - Registro

### 2. Admin Portal `app/(app)/`
**URL**: `app.turestaurantedigital.com`  
**Acceso**: Privado (Auth requerido)  
**Usuarios**: Propietarios de restaurantes

**Módulos**:
- `/app/dashboard` - Analytics y métricas
- `/app/menu` - Gestión de productos
- `/app/orders` - KDS (Kitchen Display System)
- `/app/settings` - Configuración del restaurante

### 3. Storefront `app/(storefront)/[slug]/`
**URL**: `[slug].turestaurantedigital.com` o `turestaurantedigital.com/[slug]`  
**Acceso**: Público  
**Objetivo**: Interfaz de pedidos para clientes finales

**Ejemplo**: `lateburger.turestaurantedigital.com` o `turestaurantedigital.com/lateburger`

## 📦 Instalación

### Prerrequisitos
- Node.js 18+ 
- npm o yarn
- Cuenta de Supabase

### Pasos

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd turestaurantedigital
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**

Crear un archivo `.env.local` en la raíz del proyecto con las siguientes variables:
```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
RESEND_API_KEY=your-resend-api-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key (opcional)
```

4. **Configurar la base de datos**
   - Ve a tu proyecto de Supabase
   - Abre el SQL Editor
   - Ejecuta los scripts en este orden:
     1. `supabase/schema.sql` - Schema principal
     2. `supabase/storage.sql` - Configuración de Storage
   
   Ver `supabase/README.md` para instrucciones detalladas.

5. **Ejecutar el servidor de desarrollo**
```bash
npm run dev
```

6. **Abrir en el navegador**
```
http://localhost:3000
```

## ⚙️ Configuración

### Routing Multi-Tenant

El middleware (`middleware.ts`) maneja el routing automático:

**Desarrollo Local:**
- `localhost:3000` → Acceso directo a rutas
- `localhost:3000/lateburger` → Storefront de Late Burger
- `lateburger.localhost:3000` → Storefront de Late Burger (subdominio)

**Producción:**
- `turestaurantedigital.com` → Portal de Marketing
- `turestaurantedigital.com/lateburger` → Storefront de Late Burger
- `lateburger.turestaurantedigital.com` → Storefront de Late Burger (subdominio)
- `app.turestaurantedigital.com` → Portal de Administración

### Supabase Storage

Configura los buckets necesarios:
- `restaurant-logos` - Logos de restaurantes (público)
- `product-images` - Imágenes de productos (público)

**Nota**: Para producción, las imágenes deberían estar en Supabase Storage en lugar de `/public/images/`. Ver `MIGRATE_IMAGES_TO_SUPABASE.md` para instrucciones.

Ver `supabase/STORAGE_SETUP.md` para instrucciones completas.

### Branding Late Burger

El storefront de Late Burger usa branding especial:
- **Colores**: Azul (#0FA8D8) y Amarillo (#FCFF70)
- **Logo**: `/images/Logo_500x500.jpg`
- **Banner**: `/images/Banner_Pidebot_x3.jpg`
- **Precios**: Azul (#0FA8D8)
- **Texto y acentos**: Amarillo (#FCFF70)

## 📁 Estructura del Proyecto

```
turestaurantedigital/
├── app/
│   ├── (app)/              # Portal de Administración
│   │   ├── dashboard/      # Analytics
│   │   ├── menu/           # Menu Builder
│   │   ├── orders/         # KDS
│   │   └── settings/       # Configuración
│   ├── marketing/          # Portal de Marketing (sin route group)
│   │   ├── login/          # Inicio de sesión
│   │   ├── signup/         # Registro
│   │   └── page.tsx        # Landing page
│   ├── (storefront)/       # Storefront
│   │   └── [slug]/         # Tienda dinámica
│   ├── actions/            # Server Actions
│   │   ├── auth.ts         # Autenticación
│   │   ├── analytics.ts    # Métricas
│   │   ├── orders.ts       # Órdenes
│   │   ├── products.ts     # Productos
│   │   ├── storage.ts      # Upload de archivos
│   │   └── tenant.ts       # Gestión de tenant
│   └── api/                # API Routes
├── components/
│   ├── admin/              # Componentes del Admin
│   ├── marketing/          # Componentes de Marketing
│   ├── storefront/         # Componentes del Storefront
│   └── ui/                 # Componentes UI (ShadcnUI)
├── lib/
│   ├── supabase/           # Clientes de Supabase
│   │   ├── client.ts       # Cliente público
│   │   ├── server.ts       # Cliente servidor
│   │   └── admin.ts        # Cliente admin
│   ├── auth.ts             # Helpers de autenticación
│   ├── storage.ts          # Helpers de Storage
│   ├── tenant.ts           # Helpers de tenant
│   ├── api.ts              # API helpers
│   └── mock-data.ts        # Mock data para Late Burger
├── supabase/
│   ├── schema.sql          # Schema principal
│   ├── storage.sql         # Configuración Storage
│   └── README.md           # Instrucciones DB
├── types/
│   └── database.ts         # Tipos TypeScript
├── middleware.ts           # Routing inteligente multi-tenant
└── public/
    └── images/              # Imágenes estáticas (desarrollo)
```

## 🚀 Desarrollo

### Scripts Disponibles

```bash
# Desarrollo (puerto 3000)
npm run dev

# Build de producción
npm run build

# Iniciar servidor de producción
npm start

# Linter
npm run lint
```

### Flujos Importantes

#### 1. Signup Atómico
El registro crea usuario y tenant en una transacción atómica con rollback automático si falla.

#### 2. Multi-tenancy
Cada restaurante tiene su propio tenant con aislamiento completo de datos mediante RLS. El middleware maneja routing por subdominio o ruta directa.

#### 3. Realtime KDS
El sistema de cocina se actualiza en tiempo real usando Supabase Realtime.

#### 4. Branding Dinámico
Cada restaurante puede personalizar su storefront con logo, colores y branding. Late Burger tiene un tema especial pre-configurado.

## 📊 Estado del Proyecto

### ✅ Completado (90%)

- [x] Base de datos con RLS
- [x] Portal de Marketing completo
- [x] Autenticación (signup/login) con rollback atómico
- [x] Dashboard Analytics con métricas
- [x] Menu Builder (CRUD completo)
- [x] KDS básico con Realtime
- [x] Configuración de restaurante
- [x] Storefront con branding dinámico
- [x] Multi-tenancy routing (subdominios y rutas directas)
- [x] Supabase Storage para imágenes
- [x] Middleware de routing inteligente
- [x] Branding especial Late Burger (azul/amarillo)
- [x] Optimización de imágenes con Next.js Image

### ⚠️ En Progreso

- [ ] Migración de imágenes a Supabase Storage (ver `MIGRATE_IMAGES_TO_SUPABASE.md`)
- [ ] Modificadores y variantes en productos
- [ ] Optimización de KDS para pantallas grandes

### 📋 Pendiente

- [ ] Dominio personalizado por restaurante
- [ ] Notificaciones WhatsApp
- [ ] Sistema de pagos en línea
- [ ] Exportación de reportes (CSV)
- [ ] Búsqueda y filtros avanzados en storefront

## 🗺️ Roadmap

Ver `ROADMAP.md` para el roadmap completo y detallado del proyecto.

### Próximas Fases

1. **FASE 6**: Asset Management System
   - Upload masivo de imágenes
   - Gestión centralizada de assets
   - Optimización automática

2. **FASE 7**: Dominio Personalizado
   - Configuración DNS automática
   - Validación de dominio
   - SSL automático

3. **FASE 8**: Notificaciones WhatsApp
   - Integración con API de WhatsApp Business
   - Templates de mensajes
   - Notificaciones automáticas

## 🔒 Seguridad

- **Row Level Security (RLS)**: Implementado en todas las tablas
- **Validación de datos**: Server-side y client-side
- **Autenticación**: Supabase Auth con protección de rutas
- **Aislamiento de datos**: Cada restaurante solo accede a sus propios datos

## 🐛 Troubleshooting

### Error ENOENT en Vercel
Si encuentras errores `ENOENT: no such file or directory, lstat '...page_client-reference-manifest.js'`, ver `FIX_VERCEL_ENOENT.md` para soluciones.

**Solución aplicada**: Se eliminó el route group `(marketing)` y se movió a `app/marketing/` para evitar problemas con Next.js 14.2.35.

### Imágenes no aparecen en Vercel
Las imágenes en `/public/images/` pueden no servirse correctamente en Vercel. Para producción, migra las imágenes a Supabase Storage. Ver `MIGRATE_IMAGES_TO_SUPABASE.md` para instrucciones.

### 404 en rutas de storefront
Verifica que el middleware esté configurado correctamente. El middleware maneja:
- Subdominios: `lateburger.turestaurantedigital.com`
- Rutas directas: `turestaurantedigital.com/lateburger`
- Localhost: `lateburger.localhost:3000` o `localhost:3000/lateburger`

## 📚 Recursos

### Documentación
- [Next.js App Router](https://nextjs.org/docs/app)
- [Supabase Docs](https://supabase.com/docs)
- [Supabase Realtime](https://supabase.com/docs/guides/realtime)
- [ShadcnUI](https://ui.shadcn.com/)

### Archivos Clave
- `supabase/schema.sql` - Schema de base de datos
- `middleware.ts` - Routing inteligente multi-tenant
- `types/database.ts` - Tipos TypeScript
- `app/actions/` - Server Actions
- `lib/mock-data.ts` - Mock data para Late Burger

### Guías Adicionales
- `MIGRATE_IMAGES_TO_SUPABASE.md` - Migrar imágenes a Supabase Storage
- `FIX_VERCEL_ENOENT.md` - Solución para errores ENOENT en Vercel
- `supabase/STORAGE_SETUP.md` - Configuración de Supabase Storage

## 🤝 Contribución

Este es un proyecto privado. Para contribuciones, contacta al equipo de desarrollo.

## 📝 Licencia

Privado - Todos los derechos reservados

---

**Última actualización**: Enero 2026  
**Versión**: 0.1.0  
**Piloto**: Late Burger (`lateburger.turestaurantedigital.com` o `turestaurantedigital.com/lateburger`)
