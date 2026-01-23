# 📸 Instrucciones para Imágenes de Late Burger

## ✅ Carpeta Creada

La carpeta `public/images/` ya está creada y lista para recibir las imágenes.

## 📁 Estructura Requerida

Coloca las siguientes imágenes en esta carpeta (`public/images/`):

```
public/
  └── images/
      ├── Logo_500x500_amarillo.jpg    ← Logo oficial de Late Burger
      ├── Pidebot_Smash.jpg            ← Imagen para Hero Section
      ├── Bacon.jpg                    ← Imagen del Late Bacon
      ├── Blue.jpg                     ← Imagen del Late Blue
      └── Chicken.jpg                  ← Imagen del Late Chicken
```

## 🔗 Rutas en el Código

Las imágenes se referencian así en el código:

- Logo: `/images/Logo_500x500_amarillo.jpg`
- Hero: `/images/Pidebot_Smash.jpg`
- Productos: `/images/Bacon.jpg`, `/images/Blue.jpg`, `/images/Chicken.jpg`

**Nota importante**: En Next.js, los archivos en `/public` se sirven desde la raíz. Por lo tanto:
- `public/images/logo.jpg` → Se accede como `/images/logo.jpg`
- No uses `/public/images/logo.jpg` en el código

## ✅ Verificación

Una vez que coloques las imágenes, puedes verificar que estén correctamente ubicadas:

```bash
ls -la public/images/
```

Deberías ver los 5 archivos listados arriba.

## 🚀 Para Producción (Vercel)

Las imágenes en `public/` se incluyen automáticamente en el build de Next.js y estarán disponibles en producción.
