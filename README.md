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

## 🎯 Visión del Producto

### El Problema
Los restaurantes en República Dominicana pagan **30% de comisión** a apps como UberEats y Rappi por cada pedido, incluso de clientes recurrentes que ya conocen el restaurante.

### La Solución
**Tu Restaurante Digital** es un SaaS B2B que proporciona a restaurantes su **propio canal directo sin comisiones**. No reemplazamos UberEats; capturamos clientes recurrentes que prefieren ordenar directamente.

### Caso de Uso: Late Burger
- Cliente visita `lateburger.com.do` → Ve el menú con branding naranja → Ordena → Late Burger recibe notificación → **0% comisión**

## ✨ Características Principales

### 🎨 Portal de Marketing
- Landing page completa con Hero, Features, Pricing, FAQ
- Páginas de registro (`/signup`) e inicio de sesión (`/login`)
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

## 🛠️ Stack Tecnológico

### Frontend
- **Framework**: Next.js 14+ (App Router, TypeScript)
- **Estilos**: Tailwind CSS + ShadcnUI
- **Iconos**: Lucide React
- **Brand Color**: `#FF5F1F` (Naranja)

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
- **Middleware**: Next.js Middleware (routing inteligente)

## 🏗️ Arquitectura

El sistema está dividido en **3 portales independientes** usando Next.js Route Groups:

### 1. Marketing Portal `(marketing)`
**URL**: `turestaurantedigital.com`  
**Acceso**: Público  
**Objetivo**: Vender el SaaS

### 2. Admin Portal `(app)`
**URL**: `app.turestaurantedigital.com`  
**Acceso**: Privado (Auth requerido)  
**Usuarios**: Propietarios de restaurantes

**Módulos**:
- `/app/dashboard` - Analytics y métricas
- `/app/menu` - Gestión de productos
- `/app/orders` - KDS (Kitchen Display System)
- `/app/settings` - Configuración del restaurante

### 3. Storefront `(storefront)`
**URL**: `[slug].turestaurantedigital.com` o dominio personalizado  
**Acceso**: Público  
**Objetivo**: Interfaz de pedidos para clientes finales

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

### Routing por Subdominio

El middleware maneja el routing automático:

- `localhost:3000` → Acceso directo a rutas (desarrollo)
- `turestaurantedigital.com` → Portal de Marketing
- `app.turestaurantedigital.com` → Portal de Administración
- `[slug].turestaurantedigital.com` → Storefront del restaurante

### Supabase Storage

Configura los buckets necesarios:
- `restaurant-logos` - Logos de restaurantes
- `product-images` - Imágenes de productos

Ver `supabase/STORAGE_SETUP.md` para instrucciones completas.

## 📁 Estructura del Proyecto

```
turestaurantedigital/
├── app/
│   ├── (app)/              # Portal de Administración
│   │   ├── dashboard/      # Analytics
│   │   ├── menu/           # Menu Builder
│   │   ├── orders/         # KDS
│   │   └── settings/       # Configuración
│   ├── (marketing)/        # Portal de Marketing
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
│   │   └── admin.ts        # Cliente admin (rollback)
│   ├── auth.ts             # Helpers de autenticación
│   ├── storage.ts          # Helpers de Storage
│   └── tenant.ts           # Helpers de tenant
├── supabase/
│   ├── schema.sql          # Schema principal
│   ├── storage.sql         # Configuración Storage
│   └── README.md           # Instrucciones DB
├── types/
│   └── database.ts         # Tipos TypeScript
└── middleware.ts           # Routing inteligente
```

## 🚀 Desarrollo

### Scripts Disponibles

```bash
# Desarrollo
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
Cada restaurante tiene su propio tenant con aislamiento completo de datos mediante RLS.

#### 3. Realtime KDS
El sistema de cocina se actualiza en tiempo real usando Supabase Realtime.

## 📊 Estado del Proyecto

### ✅ Completado (85%)

- [x] Base de datos con RLS
- [x] Portal de Marketing completo
- [x] Autenticación (signup/login) con rollback atómico
- [x] Dashboard Analytics con métricas
- [x] Menu Builder (CRUD completo)
- [x] KDS básico con Realtime
- [x] Configuración de restaurante
- [x] Storefront básico con branding dinámico
- [x] Supabase Storage para imágenes
- [x] Middleware de routing inteligente

### ⚠️ En Progreso

- [ ] Modificadores y variantes en productos
- [ ] Optimización de KDS para pantallas grandes
- [ ] Sistema de upload masivo de assets

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

## 📚 Recursos

### Documentación
- [Next.js App Router](https://nextjs.org/docs/app)
- [Supabase Docs](https://supabase.com/docs)
- [Supabase Realtime](https://supabase.com/docs/guides/realtime)
- [ShadcnUI](https://ui.shadcn.com/)

### Archivos Clave
- `supabase/schema.sql` - Schema de base de datos
- `middleware.ts` - Routing inteligente
- `types/database.ts` - Tipos TypeScript
- `app/actions/` - Server Actions

## 🤝 Contribución

Este es un proyecto privado. Para contribuciones, contacta al equipo de desarrollo.

## 📝 Licencia

Privado - Todos los derechos reservados

---

**Última actualización**: Enero 2026  
**Versión**: 0.1.0  
**Piloto**: Late Burger (`lateburger.com`)
