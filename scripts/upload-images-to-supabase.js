/**
 * Script para subir imágenes locales a Supabase Storage
 * 
 * Uso:
 * node scripts/upload-images-to-supabase.js
 * 
 * Requisitos:
 * - Variables de entorno configuradas (.env.local)
 * - Buckets de Supabase Storage creados (restaurant-logos, product-images)
 * - Autenticación con Supabase
 */

const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

// Cargar variables de entorno
require('dotenv').config({ path: '.env.local' })

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Error: Variables de entorno no configuradas')
  console.error('Necesitas NEXT_PUBLIC_SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY en .env.local')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Mapeo de imágenes a buckets y rutas
const IMAGES_TO_UPLOAD = [
  {
    localPath: 'public/images/Logo_500x500.jpg',
    bucket: 'restaurant-logos',
    storagePath: 'late-burger/logo.jpg',
    description: 'Late Burger Logo'
  },
  {
    localPath: 'public/images/Pidebot_Smash.jpg',
    bucket: 'product-images',
    storagePath: 'late-burger/products/smash.jpg',
    description: 'Classic Smash Burger'
  },
  {
    localPath: 'public/images/Bacon.jpg',
    bucket: 'product-images',
    storagePath: 'late-burger/products/bacon.jpg',
    description: 'Late Bacon'
  },
  {
    localPath: 'public/images/Blue.jpg',
    bucket: 'product-images',
    storagePath: 'late-burger/products/blue.jpg',
    description: 'Late Blue'
  },
  {
    localPath: 'public/images/Chicken.jpg',
    bucket: 'product-images',
    storagePath: 'late-burger/products/chicken.jpg',
    description: 'Late Chicken'
  },
  {
    localPath: 'public/images/Banner_Pidebot_x3.jpg',
    bucket: 'product-images',
    storagePath: 'late-burger/banner.jpg',
    description: 'Late Burger Banner'
  }
]

async function uploadImage({ localPath, bucket, storagePath, description }) {
  try {
    const fullPath = path.join(process.cwd(), localPath)
    
    if (!fs.existsSync(fullPath)) {
      console.error(`❌ Archivo no encontrado: ${localPath}`)
      return null
    }

    const fileBuffer = fs.readFileSync(fullPath)
    const file = new File([fileBuffer], path.basename(localPath), {
      type: 'image/jpeg'
    })

    console.log(`📤 Subiendo ${description}...`)

    // Upload file
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(storagePath, file, {
        cacheControl: '3600',
        upsert: true
      })

    if (error) {
      console.error(`❌ Error subiendo ${description}:`, error.message)
      return null
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path)

    console.log(`✅ ${description} subido exitosamente`)
    console.log(`   URL: ${publicUrl}`)
    
    return publicUrl
  } catch (error) {
    console.error(`❌ Error inesperado con ${description}:`, error.message)
    return null
  }
}

async function main() {
  console.log('🚀 Iniciando subida de imágenes a Supabase Storage...\n')

  const results = []
  
  for (const image of IMAGES_TO_UPLOAD) {
    const url = await uploadImage(image)
    if (url) {
      results.push({
        ...image,
        supabaseUrl: url
      })
    }
    console.log('') // Línea en blanco
  }

  console.log('\n📋 Resumen:')
  console.log(`✅ ${results.length}/${IMAGES_TO_UPLOAD.length} imágenes subidas exitosamente\n`)

  if (results.length > 0) {
    console.log('📝 URLs de Supabase Storage:')
    results.forEach(({ description, supabaseUrl }) => {
      console.log(`   ${description}: ${supabaseUrl}`)
    })
    console.log('\n💡 Actualiza lib/mock-data.ts con estas URLs')
  }
}

main().catch(console.error)
