#!/usr/bin/env node
/**
 * Tu Restaurante Digital - Script de actualización de BD
 *
 * Ejecuta migraciones SQL en Supabase (manual o vía CLI).
 *
 * Uso:
 *   npm run db:update
 *
 * Imprime instrucciones y la ruta al archivo SQL a ejecutar en Supabase → SQL Editor.
 */

const path = require('path')
const fs = require('fs')

const ROOT = path.resolve(__dirname, '..')
const MIGRATION = path.join(ROOT, 'supabase', 'TENANTS_ADD_HAS_CUSTOM_DOMAIN.sql')

console.log('')
console.log('Tu Restaurante Digital — Actualización de BD')
console.log('============================================')
console.log('')

if (!fs.existsSync(MIGRATION)) {
  console.error('No se encontró el archivo de migración:', MIGRATION)
  process.exit(1)
}

const sql = fs.readFileSync(MIGRATION, 'utf8')
console.log('1. Abre tu proyecto en Supabase Dashboard')
console.log('   https://supabase.com/dashboard/project/_/sql')
console.log('')
console.log('2. Ve a SQL Editor → New query')
console.log('')
console.log('3. Copia y pega el contenido del archivo:')
console.log('   ' + MIGRATION)
console.log('')
console.log('4. Ejecuta la query (Run)')
console.log('')
console.log('--- Contenido del archivo ---')
console.log('')
console.log(sql)
console.log('')
console.log('--- Fin del archivo ---')
console.log('')
console.log('Si usas Supabase CLI:')
console.log('   npx supabase db execute -f supabase/TENANTS_ADD_HAS_CUSTOM_DOMAIN.sql')
console.log('')
console.log('(Asegúrate de estar enlazado al proyecto: supabase link)')
console.log('')
