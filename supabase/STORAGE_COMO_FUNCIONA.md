# Storage: qué es y qué hacer — Tu Restaurante Digital

Guía corta para entender **Supabase Storage** en TRD y qué tienes que configurar tú.

---

## ¿Qué es Storage para TRD?

Es donde guardamos **logos de restaurantes** y **imágenes de productos**. Todo vive en **Supabase Storage** (no en `/public` ni en tu servidor). Cuando un dueño sube un logo en Configuración o una foto en Menú, el archivo va a Storage y guardamos la **URL pública** en la base de datos.

---

## ¿Qué tienes que hacer tú?

### 1. Ejecutar el SQL de Storage en Supabase

Si aún no lo has hecho:

1. Abre **Supabase Dashboard** → **SQL Editor**.
2. Copia el contenido de **`supabase/storage.sql`**.
3. Pégalo y ejecuta (Run).

Ese script crea los **buckets** y las **políticas**:

- **`restaurant-logos`**: logos de restaurantes.
- **`product-images`**: imágenes de productos.

### 2. Variables de entorno

En `.env.local` tienes que tener:

```env
NEXT_PUBLIC_SUPABASE_URL=https://TU_PROYECTO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key
```

(El **service role** se usa para cosas como el rollback en signup; el resto de Storage usa anon + RLS.)

### 3. Nada más

No hace falta crear carpetas a mano ni configurar dominios. Los buckets ya son **públicos** para lectura; la app sube y guarda las URLs sola.

---

## ¿Cómo funciona en la app?

1. **Subir**  
   En Configuración (logo) o en Menú (imagen de producto), el usuario elige un archivo. La app llama a `uploadLogo` o `uploadProductImage` (server actions que usan `lib/storage`).

2. **Guardar la URL**  
   Supabase devuelve una **URL pública**. Esa URL se guarda en `tenants.logo_url` o en `products.image_url`.

3. **Mostrar**  
   El storefront (y el Admin) usan esa URL para mostrar la imagen. Next.js ya tiene `remotePatterns` para `**.supabase.co`, así que `<Image src={logo_url} />` funciona sin tocar nada.

**Resumen:** subes → Supabase te da una URL → la guardamos en BD → la mostramos. No hay paso extra de “configurar Storage” en la app.

---

## ¿Cómo es la URL?

Todas las URLs de Storage siguen este patrón:

```
https://<TU_PROYECTO>.supabase.co/storage/v1/object/public/<BUCKET>/<RUTA>
```

- **`<TU_PROYECTO>`**: el id de tu proyecto en Supabase (está en `NEXT_PUBLIC_SUPABASE_URL`).
- **`<BUCKET>`**: `restaurant-logos` o `product-images`.
- **`<RUTA>`**: algo como `user-id/logo_123.png` o `user-id/products/123_foto.jpg`.

La app genera la ruta y la URL automáticamente; tú no tienes que armarla a mano. Para el detalle de rutas y “personalidad” TRD, ver **`STORAGE_URLS.md`**.

---

## Resumen rápido

| Qué | Dónde |
|-----|--------|
| Crear buckets y políticas | Ejecutar `supabase/storage.sql` en Supabase |
| Credenciales | `.env.local` con Supabase URL y keys |
| Subir logos | Configuración → Subir imagen |
| Subir imágenes de productos | Menú → Crear/editar producto → Subir imagen |
| Formato de URLs | `STORAGE_URLS.md` |

**En la práctica:** corres `storage.sql`, configuras `.env.local`, y ya. El resto lo hace la app.
