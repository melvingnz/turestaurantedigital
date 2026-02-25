#!/usr/bin/env node
/**
 * Tu Restaurante Digital - Script de actualización de BD
 *
 * Imprime instrucciones para ejecutar el schema y storage en tu proyecto Supabase.
 * Todos los clientes usan subdominio [slug].turestaurantedigital.com (sin dominio personalizado).
 *
 * Uso:
 *   npm run db:update
 */

const path = require('path')
const fs = require('fs')

const ROOT = path.resolve(__dirname, '..')
const SCHEMA = path.join(ROOT, 'supabase', 'schema.sql')
const STORAGE = path.join(ROOT, 'supabase', 'storage.sql')

console.log('')
console.log('Tu Restaurante Digital — Configuración de BD en Supabase')
console.log('=========================================================')
console.log('')
console.log('Ejecuta los siguientes archivos en Supabase → SQL Editor, en este orden:')
console.log('')
console.log('  1. supabase/schema.sql   (tablas, RLS, triggers)')
console.log('  2. supabase/storage.sql  (buckets y políticas de storage)')
console.log('')
console.log('Pasos:')
console.log('  1. Abre https://supabase.com/dashboard y selecciona tu proyecto')
console.log('  2. Ve a SQL Editor → New query')
console.log('  3. Copia el contenido de schema.sql, pega y ejecuta (Run)')
console.log('  4. Nueva query: copia storage.sql, pega y ejecuta (Run)')
console.log('')

if (fs.existsSync(SCHEMA)) {
  console.log('--- Vista previa schema.sql (primeras 20 líneas) ---')
  const schemaLines = fs.readFileSync(SCHEMA, 'utf8').split('\n').slice(0, 20)
  console.log(schemaLines.join('\n'))
  console.log('...')
  console.log('')
}

if (fs.existsSync(STORAGE)) {
  console.log('--- Vista previa storage.sql (primeras 15 líneas) ---')
  const storageLines = fs.readFileSync(STORAGE, 'utf8').split('\n').slice(0, 15)
  console.log(storageLines.join('\n'))
  console.log('...')
  console.log('')
}

console.log('Con Supabase CLI (si tienes el proyecto enlazado):')
console.log('  npx supabase db execute -f supabase/schema.sql')
console.log('  npx supabase db execute -f supabase/storage.sql')
console.log('')
