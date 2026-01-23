# 🚀 Configuración de Subdominios en Vercel

## Problema: DNS_PROBE_FINISHED_NXDOMAIN

Si estás viendo el error `DNS_PROBE_FINISHED_NXDOMAIN` al acceder a `lateburger.turestaurantedigital.com`, significa que el DNS no está configurado correctamente.

## ✅ Solución: Configurar Subdominio en Vercel

### Paso 1: Agregar Dominio en Vercel

1. **Ve a tu proyecto en Vercel Dashboard**
   - Navega a: `https://vercel.com/[tu-usuario]/turestaurantedigital/settings/domains`

2. **Agrega el dominio principal** (si no lo has hecho):
   - `turestaurantedigital.com`
   - `www.turestaurantedigital.com`

3. **Agrega el subdominio específico**:
   - `lateburger.turestaurantedigital.com`

### Paso 2: Configurar DNS en tu Proveedor de Dominio

Vercel te dará instrucciones específicas, pero generalmente necesitas:

#### Opción A: Usar Registros CNAME (Recomendado)

En tu proveedor de DNS (Cloudflare, GoDaddy, Namecheap, etc.):

```
Tipo: CNAME
Nombre: lateburger
Valor: cname.vercel-dns.com
TTL: Auto (o 3600)
```

#### Opción B: Usar Wildcard (Para múltiples subdominios)

Si quieres que TODOS los subdominios funcionen automáticamente:

```
Tipo: CNAME
Nombre: *
Valor: cname.vercel-dns.com
TTL: Auto (o 3600)
```

**Nota**: Con wildcard, cualquier subdominio (ej: `cualquiercosa.turestaurantedigital.com`) apuntará a Vercel. El middleware se encargará de enrutarlo correctamente.

### Paso 3: Verificar en Vercel

1. Ve a **Settings → Domains** en tu proyecto
2. Verifica que `lateburger.turestaurantedigital.com` aparezca como:
   - ✅ **Valid Configuration**
   - ✅ **DNS Configured Correctly**

### Paso 4: Esperar Propagación DNS

- **Tiempo típico**: 5 minutos a 24 horas
- **Cloudflare**: Generalmente 1-5 minutos
- **Otros proveedores**: Puede tomar hasta 24 horas

Puedes verificar la propagación con:
```bash
# En terminal
nslookup lateburger.turestaurantedigital.com

# O usar herramientas online:
# - https://dnschecker.org
# - https://www.whatsmydns.net
```

## 🔍 Verificación Rápida

### Comando para verificar DNS:

```bash
# Windows PowerShell
Resolve-DnsName lateburger.turestaurantedigital.com

# Linux/Mac
dig lateburger.turestaurantedigital.com
nslookup lateburger.turestaurantedigital.com
```

### Resultado esperado:

Si está configurado correctamente, deberías ver algo como:
```
Name: lateburger.turestaurantedigital.com
Address: 76.76.21.21 (o una IP de Vercel)
```

## ⚠️ Problemas Comunes

### 1. "Domain not found" en Vercel

**Solución**: Asegúrate de haber agregado el dominio en Vercel Dashboard antes de configurar DNS.

### 2. DNS no propaga después de 24 horas

**Solución**: 
- Verifica que el registro CNAME esté correcto
- Asegúrate de que no haya conflictos con otros registros
- Contacta a tu proveedor de DNS

### 3. Subdominio resuelve pero muestra error 404

**Solución**: Esto significa que DNS funciona pero el middleware no está enrutando correctamente. Verifica:
- Que el middleware esté desplegado correctamente
- Que la ruta `/storefront/[slug]` exista
- Revisa los logs de Vercel para errores

### 4. Wildcard no funciona

**Solución**: Algunos proveedores DNS no soportan wildcards. En ese caso:
- Agrega cada subdominio manualmente como CNAME
- O usa un proveedor que soporte wildcards (Cloudflare lo hace)

## 📋 Checklist Final

- [ ] Dominio agregado en Vercel Dashboard
- [ ] Registro CNAME configurado en proveedor DNS
- [ ] DNS propagado (verificado con `nslookup` o herramienta online)
- [ ] Vercel muestra "Valid Configuration" para el dominio
- [ ] Middleware desplegado y funcionando
- [ ] Acceso a `lateburger.turestaurantedigital.com` funciona

## 🔗 Recursos

- [Documentación oficial de Vercel sobre dominios](https://vercel.com/docs/concepts/projects/domains)
- [Configuración de DNS en Vercel](https://vercel.com/docs/concepts/projects/domains/add-a-domain)
- [Troubleshooting de DNS en Vercel](https://vercel.com/docs/concepts/projects/domains/troubleshooting)

---

**Última actualización**: Enero 2026
