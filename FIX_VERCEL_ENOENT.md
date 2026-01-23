# Fix para Error ENOENT en Vercel

## Problema
Error: `ENOENT: no such file or directory, lstat '/vercel/path0/.next/server/app/(marketing)/page_client-reference-manifest.js'`

Este es un **bug conocido de Next.js 14.2.35** con route groups (issue #53569).

## Solución Recomendada

### Actualizar solo Next.js (sin eslint-config-next)
```bash
# Eliminar node_modules y package-lock.json
rm -rf node_modules package-lock.json

# Actualizar solo Next.js (mantener eslint-config-next en 14.x)
npm install next@^14.2.35

# Reinstalar dependencias
npm install

# Verificar build
npm run build

# Commit y push
git add package.json package-lock.json
git commit -m "chore: Actualizar Next.js a 14.2.35 para fix ENOENT"
git push origin main
```

### Alternativa: Usar --legacy-peer-deps
Si necesitas actualizar eslint-config-next también:
```bash
npm install next@latest eslint-config-next@latest --legacy-peer-deps
```

## Nota Importante
- `eslint-config-next@16.x` requiere ESLint 9, pero el proyecto usa ESLint 8
- Por eso es mejor actualizar solo Next.js a la versión 14.x más reciente
- El `package.json` ya tiene `next: ^14.2.35` configurado

## Estado Actual
- ✅ Build compila: `✓ Compiled successfully`
- ✅ Páginas generadas: `✓ Generating static pages (11/11)`
- ❌ Falla en: `Collecting build traces`

## Verificación
Después de actualizar, verifica que:
1. El build local funciona: `npm run build`
2. No hay errores ENOENT en el output
3. El deployment en Vercel funciona
