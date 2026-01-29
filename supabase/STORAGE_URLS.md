# Tu Restaurante Digital — URLs de Storage

**Personalidad:** Todos los assets (logos, imágenes de productos) viven en **Supabase Storage** bajo nuestra estructura. Usamos buckets y rutas consistentes para que sea fácil auditar y escalar.

> **¿Solo quieres saber qué hacer?** Lee **`STORAGE_COMO_FUNCIONA.md`**. Este doc es el detalle técnico de las URLs.

---

## Base URL

La URL pública de cualquier archivo en Storage tiene esta forma:

```
https://<PROJECT_REF>.supabase.co/storage/v1/object/public/<BUCKET>/<PATH>
```

- **`PROJECT_REF`**: Id. del proyecto en Supabase (está en `NEXT_PUBLIC_SUPABASE_URL`, p. ej. `https://abcdefgh.supabase.co` → `abcdefgh`).
- **`BUCKET`**: `restaurant-logos` o `product-images`.
- **`PATH`**: Ruta dentro del bucket (ver abajo).

**Ejemplo:**

```
https://abcdefgh.supabase.co/storage/v1/object/public/restaurant-logos/abc-123/logo_1706123456789.png
```

---

## Buckets (nuestra personalidad)

| Bucket | Uso | Público |
|--------|-----|---------|
| **`restaurant-logos`** | Logos de restaurantes (Admin → Configuración) | Sí |
| **`product-images`** | Imágenes de productos (Admin → Menú) | Sí |

Ambos son **públicos** para que el storefront pueda mostrar logos e imágenes sin auth.

---

## Estructura de rutas

### Logos (`restaurant-logos`)

```
restaurant-logos/
  └── <owner_id>/
      └── logo_<timestamp>.<ext>
```

- **`owner_id`**: UUID del usuario (Supabase Auth) dueño del tenant.
- **`timestamp`**: `Date.now()` para evitar colisiones.
- **`ext`**: `jpg`, `png`, `webp`, etc.

**Ejemplo:** `abc-user-uuid/logo_1706123456789.png`

### Imágenes de productos (`product-images`)

```
product-images/
  └── <owner_id>/
      └── products/
          └── <timestamp>_<sanitized_filename>
```

- **`owner_id`**: Mismo que arriba.
- **`products/`**: Subcarpeta por usuario.
- **`<timestamp>_<sanitized_filename>`**: Evita colisiones y caracteres raros.

**Ejemplo:** `abc-user-uuid/products/1706123456789_foto_hamburguesa.jpg`

---

## Cómo se construye la URL en código

- **Upload:** `lib/storage.ts` → `uploadFile()` usa `generateFilePath()` para el `path` y `supabase.storage.from(bucket).getPublicUrl(path)` para la URL final.
- **Uso:** Esa URL se guarda en `tenants.logo_url` o `products.image_url` y se sirve en el storefront.

**Next.js Image:** En `next.config.js` ya hay `remotePatterns` para `**.supabase.co`, así que las URLs de Storage funcionan con `<Image src={...} />`.

---

## Resumen

- **Base:** `https://<PROJECT_REF>.supabase.co/storage/v1/object/public/`
- **Buckets:** `restaurant-logos`, `product-images`
- **Rutas:** `{owner_id}/...` para logos; `{owner_id}/products/...` para productos.

Esto define la **personalidad** de Storage en Tu Restaurante Digital: un solo origen de verdad, buckets claros y rutas predecibles.
