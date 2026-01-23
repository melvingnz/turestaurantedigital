# Fix para Error ENOENT en Vercel

## Problema
Error: `ENOENT: no such file or directory, lstat '/vercel/path0/.next/server/app/(marketing)/page_client-reference-manifest.js'`

Este es un **bug conocido de Next.js 14.2.35** con route groups (issue #53569).

## Soluciones

### Opción 1: Actualizar Next.js (RECOMENDADO)
```bash
# Eliminar node_modules y package-lock.json
rm -rf node_modules package-lock.json

# Actualizar Next.js a la última versión
npm install next@latest eslint-config-next@latest

# Reinstalar dependencias
npm install
```

### Opción 2: Limpiar y Reinstalar
```bash
# Eliminar cache y dependencias
rm -rf node_modules .next package-lock.json

# Reinstalar
npm install

# Build local para verificar
npm run build
```

### Opción 3: Verificar Versión
El `package.json` tiene `next: ^14.2.18` pero Vercel está usando `14.2.35`. 
Asegúrate de que `package-lock.json` esté actualizado y commitado.

## Nota
El build **compila exitosamente** pero falla durante "Collecting build traces". 
Este error puede ser no bloqueante en algunos casos, pero Vercel lo trata como fatal.

## Estado Actual
- ✅ Build compila: `✓ Compiled successfully`
- ✅ Páginas generadas: `✓ Generating static pages (11/11)`
- ❌ Falla en: `Collecting build traces`
