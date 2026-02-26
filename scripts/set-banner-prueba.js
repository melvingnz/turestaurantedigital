/**
 * Asigna el banner oscuro de prueba al tenant "Prueba".
 * El archivo debe estar en public/branding/banner-prueba-oscuro.png
 *
 * Uso: node scripts/set-banner-prueba.js
 */

const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

const envPath = path.resolve(__dirname, '..', '.env.local')
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf8').replace(/\r\n/g, '\n').replace(/\r/g, '\n')
  content.split('\n').forEach((line) => {
    const m = line.match(/^([^#=]+)=(.*)$/)
    if (m) {
      const key = m[1].trim()
      const val = m[2].trim().replace(/^["']|["']$/g, '')
      if (key) process.env[key] = val
    }
  })
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Configura .env.local con NEXT_PUBLIC_SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
})

// Ruta relativa al origen (funciona en localhost y en producción)
const BANNER_URL = '/branding/banner-prueba-oscuro.png'

async function main() {
  const { data: tenant, error: e } = await supabase
    .from('tenants')
    .select('id, name')
    .eq('slug', 'prueba')
    .maybeSingle()

  if (e || !tenant) {
    console.error('❌ No se encontró el tenant Prueba')
    process.exit(1)
  }

  const { error: updateErr } = await supabase
    .from('tenants')
    .update({ banner_url: BANNER_URL })
    .eq('id', tenant.id)

  if (updateErr) {
    console.error('❌ Error al actualizar:', updateErr.message)
    process.exit(1)
  }

  console.log('✅ Banner asignado al tenant Prueba:', BANNER_URL)
  console.log('   Abre /prueba para verlo.')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
