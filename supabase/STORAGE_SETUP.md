# Supabase Storage - Configuración

Este documento explica cómo configurar Supabase Storage para subir imágenes directamente desde la aplicación.

## 📋 Requisitos Previos

1. Proyecto de Supabase creado
2. Schema de base de datos ejecutado (`schema.sql`)
3. Variables de entorno configuradas en `.env.local`

## 🚀 Pasos de Configuración

### 1. Ejecutar el Script de Storage

1. Ve a tu proyecto de Supabase Dashboard
2. Navega a **SQL Editor**
3. Copia el contenido de `supabase/storage.sql`
4. Pega y ejecuta el script

Este script creará:
- **Bucket `restaurant-logos`**: Para logos de restaurantes (público)
- **Bucket `product-images`**: Para imágenes de productos (público)
- **Políticas RLS**: Para controlar acceso a los archivos

### 2. Verificar los Buckets

1. Ve a **Storage** en el menú lateral
2. Deberías ver dos buckets:
   - `restaurant-logos`
   - `product-images`

### 3. Verificar las Políticas

1. En cada bucket, ve a **Policies**
2. Deberías ver las políticas creadas:
   - **Viewable by everyone** (SELECT)
   - **Uploadable by authenticated users** (INSERT)
   - **Updatable by owner** (UPDATE)
   - **Deletable by owner** (DELETE)

## 📝 Variables de Entorno

Asegúrate de tener estas variables en `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=tu-url-de-supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key
```

## ✅ Verificación

Para verificar que todo funciona:

1. Ve a `/app/settings`
2. Intenta subir un logo
3. Ve a `/app/menu` → Crear producto
4. Intenta subir una imagen de producto

## 🔒 Seguridad

Las políticas RLS aseguran que:
- ✅ Cualquiera puede **ver** las imágenes (necesario para el storefront)
- ✅ Solo usuarios autenticados pueden **subir** imágenes
- ✅ Solo el dueño del restaurante puede **actualizar/eliminar** sus propias imágenes

## 📦 Estructura de Archivos

Los archivos se organizan así:

```
restaurant-logos/
  └── {user_id}/
      └── logo_{timestamp}.{ext}

product-images/
  └── {user_id}/
      └── products/
          └── {timestamp}_{filename}
```

## 🐛 Troubleshooting

### Error: "Bucket not found"
- Verifica que ejecutaste `storage.sql`
- Verifica que los buckets existen en Storage

### Error: "Policy violation"
- Verifica que las políticas RLS están creadas
- Verifica que el usuario está autenticado

### Error: "File too large"
- El límite es 5MB por archivo
- Comprime la imagen antes de subirla

### Error: "Invalid file type"
- Solo se permiten imágenes (image/*)
- Formatos soportados: PNG, JPG, WEBP, GIF

## 📚 Recursos

- [Supabase Storage Docs](https://supabase.com/docs/guides/storage)
- [Storage Policies](https://supabase.com/docs/guides/storage/security/access-control)
