# Imágenes de Late Burger

Coloca aquí las siguientes imágenes para el storefront de Late Burger:

## Assets Requeridos

1. **Logo_500x500_amarillo.jpg** - Logo oficial de Late Burger (amarillo)
2. **Pidebot_Smash.jpg** - Imagen del Classic Smash Burger (para Hero)
3. **Bacon.jpg** - Imagen del Late Bacon
4. **Blue.jpg** - Imagen del Late Blue
5. **Chicken.jpg** - Imagen del Late Chicken

## Estructura

```
public/
  └── images/
      ├── Logo_500x500_amarillo.jpg
      ├── Pidebot_Smash.jpg
      ├── Bacon.jpg
      ├── Blue.jpg
      └── Chicken.jpg
```

## Uso en el Código

Las imágenes se referencian con rutas absolutas desde `/public`:

```tsx
<img src="/images/Logo_500x500_amarillo.jpg" alt="Late Burger" />
```

Nota: En Next.js, los archivos en `/public` se sirven desde la raíz, por lo que `/images/logo.jpg` apunta a `public/images/logo.jpg`.
