#!/usr/bin/env node
/**
 * Comprueba SUPABASE_SERVICE_ROLE_KEY vs NEXT_PUBLIC_SUPABASE_URL.
 * Decodifica el JWT y verifica role (service_role vs anon) y ref (proyecto).
 *
 * Uso: npm run check:service-role
 * Requiere: .env.local con SUPABASE_SERVICE_ROLE_KEY y NEXT_PUBLIC_SUPABASE_URL
 */

const fs = require('fs')
const path = require('path')

const envPath = path.join(__dirname, '..', '.env.local')
if (!fs.existsSync(envPath)) {
  console.error('No se encontró .env.local. Crea el archivo con SUPABASE_SERVICE_ROLE_KEY y NEXT_PUBLIC_SUPABASE_URL.')
  process.exit(1)
}

const raw = fs.readFileSync(envPath, 'utf8')
for (const line of raw.split('\n')) {
  const idx = line.indexOf('=')
  if (idx <= 0) continue
  const k = line.slice(0, idx).trim()
  let v = line.slice(idx + 1).replace(/#.*$/, '').trim()
  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
    v = v.slice(1, -1)
  }
  process.env[k] = v
}

const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
const url = (process.env.NEXT_PUBLIC_SUPABASE_URL || '').trim()

console.log('')
console.log('Check SUPABASE_SERVICE_ROLE_KEY vs NEXT_PUBLIC_SUPABASE_URL')
console.log('==========================================================')
console.log('')

if (!key) {
  console.error('Falta SUPABASE_SERVICE_ROLE_KEY en .env.local')
  console.error('¿Usaste el nombre exacto SUPABASE_SERVICE_ROLE_KEY (sin "S" extra en SERVICE)?')
  process.exit(1)
}
if (!url) {
  console.error('Falta NEXT_PUBLIC_SUPABASE_URL en .env.local')
  process.exit(1)
}

console.log('NEXT_PUBLIC_SUPABASE_URL:', url)
console.log('SUPABASE_SERVICE_ROLE_KEY: present, length', key.length)
console.log('')

try {
  const parts = key.split('.')
  if (parts.length !== 3) {
    console.error('La key no tiene formato JWT (header.payload.signature). ¿Copiaste la key completa?')
    process.exit(1)
  }
  const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/')
  const padding = base64.length % 4
  const padded = padding ? base64 + '='.repeat(4 - padding) : base64
  const payload = JSON.parse(Buffer.from(padded, 'base64').toString('utf8'))
  const role = payload.role ?? '(no existe)'
  const ref = payload.ref ?? '(no existe)'

  const urlMatch = url.match(/https?:\/\/([^.]+)\.supabase\.co/)
  const urlRef = urlMatch?.[1] ?? null

  console.log('JWT role:', role)
  console.log('JWT ref: ', ref)
  console.log('URL ref: ', urlRef || '(no se pudo extraer)')
  console.log('')

  if (role === 'anon') {
    console.error('Problema: estás usando la key ANON, no la SERVICE_ROLE.')
    console.error('En Supabase → Project Settings → API → "service_role secret" → Copy.')
    process.exit(1)
  }
  if (role !== 'service_role') {
    console.error('Problema: la key tiene role="' + role + '". Debe ser "service_role".')
    process.exit(1)
  }
  if (urlRef && ref !== urlRef) {
    console.error('Problema: el proyecto de la key (ref=' + ref + ') no coincide con la URL (' + urlRef + ').')
    console.error('Usa la service_role del mismo proyecto que NEXT_PUBLIC_SUPABASE_URL.')
    process.exit(1)
  }

  console.log('OK: role=service_role, ref coincide con URL.')
  console.log('')
  console.log('Si aún hay 401 en rollback: reinicia el dev server (npm run dev) y vuelve a probar.')
  console.log('')
} catch (e) {
  console.error('Error al decodificar el JWT:', e.message)
  process.exit(1)
}
