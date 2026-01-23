'use server'

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export interface SignupData {
  email: string
  password: string
  restaurantName: string
  slug: string
}

export interface SignupResult {
  success: boolean
  error?: string
  user?: {
    id: string
    email: string
  }
  tenant?: {
    id: string
    name: string
    slug: string
  }
}

/**
 * Signup Flow Atómico
 * Crea el usuario en Supabase Auth y el tenant en la base de datos
 * Si algo falla, hace rollback eliminando el usuario creado
 */
export async function signupWithTenant(data: SignupData): Promise<SignupResult> {
  const supabase = await createClient()

  // Validar formato del slug
  const slugRegex = /^[a-z0-9-]+$/
  if (!slugRegex.test(data.slug)) {
    return {
      success: false,
      error: 'El slug solo puede contener letras minúsculas, números y guiones',
    }
  }

  // Validar longitud del slug
  if (data.slug.length < 3 || data.slug.length > 30) {
    return {
      success: false,
      error: 'El slug debe tener entre 3 y 30 caracteres',
    }
  }

  // Validar que el slug no esté reservado
  const reservedSlugs = ['app', 'www', 'admin', 'api', 'marketing', 'storefront']
  if (reservedSlugs.includes(data.slug.toLowerCase())) {
    return {
      success: false,
      error: 'Este slug está reservado. Por favor elige otro.',
    }
  }

  try {
    // PASO 1: Crear usuario en Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/app/dashboard`,
      },
    })

    if (authError) {
      return {
        success: false,
        error: authError.message || 'Error al crear el usuario',
      }
    }

    if (!authData.user) {
      return {
        success: false,
        error: 'No se pudo crear el usuario',
      }
    }

    // PASO 2: Verificar que el slug no exista
    const { data: existingTenant } = await supabase
      .from('tenants')
      .select('id')
      .eq('slug', data.slug.toLowerCase())
      .single()

    if (existingTenant) {
      // Rollback: Eliminar el usuario creado usando admin client
      const adminClient = createAdminClient()
      const { error: deleteError } = await adminClient.auth.admin.deleteUser(authData.user.id)
      if (deleteError) {
        console.error('Error al eliminar usuario después de rollback:', deleteError)
      }
      return {
        success: false,
        error: 'Este slug ya está en uso. Por favor elige otro.',
      }
    }

    // PASO 3: Crear tenant en la base de datos
    const { data: tenantData, error: tenantError } = await supabase
      .from('tenants')
      .insert({
        name: data.restaurantName,
        slug: data.slug.toLowerCase(),
        owner_id: authData.user.id,
        brand_color: '#FF5F1F', // Color por defecto
      })
      .select()
      .single()

    if (tenantError) {
      // Rollback: Eliminar el usuario creado usando admin client
      const adminClient = createAdminClient()
      const { error: deleteError } = await adminClient.auth.admin.deleteUser(authData.user.id)
      if (deleteError) {
        console.error('Error al eliminar usuario después de rollback:', deleteError)
      }
      return {
        success: false,
        error: tenantError.message || 'Error al crear el restaurante',
      }
    }

    // ÉXITO: Todo se creó correctamente
    revalidatePath('/app/dashboard')
    return {
      success: true,
      user: {
        id: authData.user.id,
        email: authData.user.email || '',
      },
      tenant: {
        id: tenantData.id,
        name: tenantData.name,
        slug: tenantData.slug,
      },
    }
  } catch (error) {
    console.error('Error inesperado en signup:', error)
    return {
      success: false,
      error: 'Ocurrió un error inesperado. Por favor intenta de nuevo.',
    }
  }
}

/**
 * Login Flow
 */
export async function signIn(email: string, password: string) {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return {
      success: false,
      error: error.message || 'Error al iniciar sesión',
    }
  }

  if (data.user) {
    revalidatePath('/app/dashboard')
    redirect('/app/dashboard')
  }

  return {
    success: false,
    error: 'No se pudo iniciar sesión',
  }
}

/**
 * Logout Flow
 */
export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/')
  redirect('/')
}

/**
 * Obtener el usuario actual
 */
export async function getCurrentUser() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

/**
 * Obtener el tenant del usuario actual
 */
export async function getCurrentTenant() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  const { data: tenant } = await supabase
    .from('tenants')
    .select('*')
    .eq('owner_id', user.id)
    .single()

  return tenant
}
