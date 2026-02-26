/**
 * Añade ~5 productos de prueba al tenant "Prueba" (slug: prueba)
 * con imágenes placeholder para probar el storefront.
 *
 * Uso: node scripts/seed-products-prueba.js
 * Requisitos: .env.local con NEXT_PUBLIC_SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY
 */

const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

// Cargar .env.local si existe (sin depender de dotenv)
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
  console.error('❌ Necesitas NEXT_PUBLIC_SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY en .env.local')
  console.error('   Ruta leída:', envPath)
  console.error('   URL presente:', !!SUPABASE_URL, '| Service role presente:', !!SUPABASE_SERVICE_ROLE_KEY)
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
})

// Imágenes relacionadas con cada producto (Unsplash, libre uso)
const PRODUCTOS_PRUEBA = [
  {
    name: 'Ensalada César',
    description: 'Lechuga fresca, pollo grillado, crutones y aderezo césar.',
    category: 'Ensaladas',
    price: 350,
    image_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop',
  },
  {
    name: 'Pizza Margarita',
    description: 'Salsa de tomate, mozzarella y albahaca fresca.',
    category: 'Pizzas',
    price: 450,
    image_url: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=400&fit=crop',
  },
  {
    name: 'Pasta Alfredo',
    description: 'Fettuccine con salsa cremosa de parmesano.',
    category: 'Pastas',
    price: 420,
    image_url: 'https://images.unsplash.com/photo-1551183053-bf91a1f81111?w=400&h=400&fit=crop',
  },
  {
    name: 'Smoothie de Frutas',
    description: 'Mezcla de mango, fresa y banano. Refrescante.',
    category: 'Bebidas',
    price: 180,
    image_url: 'https://images.unsplash.com/photo-1505252585461-04db1ebd25c1?w=400&h=400&fit=crop',
  },
  {
    name: 'Brownie con Helado',
    description: 'Brownie de chocolate caliente con bola de helado de vainilla.',
    category: 'Postres',
    price: 220,
    image_url: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=400&h=400&fit=crop',
  },
  {
    name: 'Sándwich Club',
    description: 'Pechuga, tocino, lechuga, tomate y mayonesa. Acompañado de papas.',
    category: 'Sándwiches',
    price: 380,
    image_url: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=400&fit=crop',
  },
  {
    name: 'Sopa del Día',
    description: 'Sopa casera preparada fresca cada día. Pregunta por la variedad.',
    category: 'Sopas',
    price: 195,
    image_url: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=400&fit=crop',
  },
]

async function main() {
  const slug = 'prueba'

  const { data: tenant, error: tenantError } = await supabase
    .from('tenants')
    .select('id, name')
    .eq('slug', slug)
    .maybeSingle()

  if (tenantError) {
    console.error('❌ Error al buscar tenant:', tenantError.message)
    process.exit(1)
  }

  if (!tenant) {
    console.error('❌ No existe un tenant con slug "prueba". Créalo desde la app (registro o Configuración).')
    process.exit(1)
  }

  console.log('Tenant encontrado:', tenant.name, '(' + tenant.id + ')')

  // Actualizar imágenes de productos existentes para que coincidan con el plato
  console.log('\nActualizando imágenes de productos existentes...')
  for (const p of PRODUCTOS_PRUEBA) {
    const { error: updateError } = await supabase
      .from('products')
      .update({ image_url: p.image_url })
      .eq('tenant_id', tenant.id)
      .eq('name', p.name)
    if (!updateError) {
      const { data: updated } = await supabase.from('products').select('id').eq('tenant_id', tenant.id).eq('name', p.name).limit(1).maybeSingle()
      if (updated) console.log('  Imagen actualizada:', p.name)
    }
  }

  console.log('\nInsertando productos (si no existen)...')
  for (const p of PRODUCTOS_PRUEBA) {
    const { data: inserted, error } = await supabase
      .from('products')
      .insert({
        tenant_id: tenant.id,
        name: p.name,
        description: p.description || null,
        category: p.category,
        price: p.price,
        image_url: p.image_url || null,
        is_available: true,
      })
      .select('id, name')
      .single()

    if (error) {
      console.error('❌ Error al insertar', p.name, ':', error.message)
      continue
    }
    console.log('✅', inserted.name)
  }

  console.log('\nListo. Abre el storefront en /prueba para ver los productos.')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
