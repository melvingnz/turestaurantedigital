# Migrar Imágenes a Supabase Storage

## Problema Actual
Las imágenes están en `/public/images/` y se referencian como `/images/Logo_500x500.jpg`. 
En Vercel, estas imágenes pueden no servirse correctamente.

## Solución: Usar Supabase Storage

### Paso 1: Subir Imágenes a Supabase Storage

1. **Asegúrate de tener los buckets configurados:**
   - Ve a Supabase Dashboard → Storage
   - Verifica que existan los buckets:
     - `restaurant-logos` (público)
     - `product-images` (público)
   - Si no existen, ejecuta `supabase/storage.sql` en el SQL Editor

2. **Sube las imágenes manualmente:**
   - Ve a Storage → `restaurant-logos`
   - Crea una carpeta `late-burger/`
   - Sube `Logo_500x500.jpg` como `logo.jpg`
   
   - Ve a Storage → `product-images`
   - Crea una carpeta `late-burger/products/`
   - Sube todas las imágenes de productos:
     - `Pidebot_Smash.jpg` → `smash.jpg`
     - `Bacon.jpg` → `bacon.jpg`
     - `Blue.jpg` → `blue.jpg`
     - `Chicken.jpg` → `chicken.jpg`
   - Sube `Banner_Pidebot_x3.jpg` como `banner.jpg` en `late-burger/`

3. **Obtén las URLs públicas:**
   - Para cada imagen, haz clic derecho → "Copy URL"
   - Las URLs serán algo como:
     ```
     https://[project].supabase.co/storage/v1/object/public/restaurant-logos/late-burger/logo.jpg
     https://[project].supabase.co/storage/v1/object/public/product-images/late-burger/products/smash.jpg
     ```

### Paso 2: Actualizar el Código

1. **Actualizar `lib/mock-data.ts`:**
   ```typescript
   export const LATE_BURGER_TENANT: Tenant = {
     // ...
     logo_url: 'https://[project].supabase.co/storage/v1/object/public/restaurant-logos/late-burger/logo.jpg',
   }
   
   export const LATE_BURGER_PRODUCTS: Product[] = [
     {
       // ...
       image_url: 'https://[project].supabase.co/storage/v1/object/public/product-images/late-burger/products/smash.jpg',
     },
     // ... etc
   ]
   ```

2. **Actualizar `components/marketing/trusted-by.tsx`:**
   - Cambiar de `/images/Logo_500x500.jpg` a la URL de Supabase Storage
   - O mejor: usar `LATE_BURGER_TENANT.logo_url` del mock data

### Paso 3: Verificar

1. Build local: `npm run build`
2. Verifica que las imágenes se carguen correctamente
3. Push a Vercel y verifica en producción

## Ventajas de Supabase Storage

✅ **CDN Global**: Las imágenes se sirven desde CDN de Supabase  
✅ **Optimización**: Mejor performance que archivos estáticos  
✅ **Escalable**: No aumenta el tamaño del repo  
✅ **Actualizable**: Puedes cambiar imágenes sin hacer deploy  
✅ **Seguridad**: Control de acceso con políticas RLS  

## Nota

Las imágenes en `/public/images/` pueden quedarse para desarrollo local, pero en producción deberían estar en Supabase Storage.
