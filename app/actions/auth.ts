'use server'

import { createClient } from '@/lib/supabase/server'
import { createAdminClient, deleteUserForRollback, hasServiceRoleKey } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { logger } from '@/lib/logger'

/** Base URL para redirects de confirmación de email. Producción: siempre dominio público, nunca localhost. */
const PRODUCTION_SITE_URL = 'https://www.turestaurantedigital.com'
const CONFIRM_PATH = '/marketing/accountconfirmed'

function getEmailRedirectTo(): string {
  const isProd = process.env.NODE_ENV === 'production'
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  const base = isProd
    ? (fromEnv && !fromEnv.includes('localhost') ? fromEnv : PRODUCTION_SITE_URL)
    : (fromEnv || 'http://localhost:3000')
  return `${base.replace(/\/$/, '')}${CONFIRM_PATH}`
}

export interface SignupData {
  email: string
  password: string
  restaurantName: string
  slug: string
  hasCustomDomain: boolean
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
        emailRedirectTo: getEmailRedirectTo(),
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
    const { data: existingTenant, error: checkError } = await supabase
      .from('tenants')
      .select('id')
      // @ts-expect-error - Supabase type inference issue
      .eq('slug', data.slug.toLowerCase())
      .maybeSingle()

    // Si hay un error de tabla no encontrada (PGRST205), continuar (tabla no existe aún)
    if (checkError && checkError.code !== 'PGRST205') {
      logger.error('[Auth] Error checking slug availability', { code: checkError.code, message: checkError.message })
    }

    if (existingTenant) {
      if (hasServiceRoleKey()) {
        await deleteUserForRollback(authData.user.id)
      } else {
        logger.warn('[Auth] Rollback skipped: missing SUPABASE_SERVICE_ROLE_KEY. User remains in Auth.')
      }
      return {
        success: false,
        error: 'Este slug ya está en uso. Por favor elige otro.',
      }
    }

    // PASO 3: Crear tenant en la base de datos (admin bypass RLS; la sesión del user puede no estar lista en la misma petición)
    const admin = createAdminClient()
    const { data: tenantData, error: tenantError } = await admin
      .from('tenants')
      // @ts-expect-error - Supabase type inference issue
      .insert({
        name: data.restaurantName,
        slug: data.slug.toLowerCase(),
        owner_id: authData.user.id,
        brand_color: '#FF5F1F',
        has_custom_domain: !!data.hasCustomDomain,
      })
      .select()
      .single()

    if (tenantError) {
      if (hasServiceRoleKey()) {
        await deleteUserForRollback(authData.user.id)
      } else {
        logger.warn('[Auth] Rollback skipped: missing SUPABASE_SERVICE_ROLE_KEY. User remains in Auth.')
      }
      return {
        success: false,
        error: tenantError.message || 'Error al crear el restaurante',
      }
    }

    // ÉXITO: Todo se creó correctamente
    revalidatePath('/app/dashboard')
    
    // Type guard para asegurar que tenantData es válido
    const validTenant = tenantData as unknown as { id: string; name: string; slug: string }
    
    return {
      success: true,
      user: {
        id: authData.user.id,
        email: authData.user.email || '',
      },
      tenant: {
        id: validTenant.id,
        name: validTenant.name,
        slug: validTenant.slug,
      },
    }
  } catch (error) {
    logger.error('[Auth] Unexpected signup error', error)
    return {
      success: false,
      error: 'Ocurrió un error inesperado. Por favor intenta de nuevo.',
    }
  }
}

/**
 * Login Flow
 * No redirige desde el server: devuelve success y el cliente hace refresh + replace.
 * Evita bucle login ↔ dashboard cuando las cookies no se ven igual en server/client.
 */
export async function signIn(email: string, password: string) {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    logger.error('[Auth] signIn error', {
      message: error.message,
      status: (error as { status?: number }).status,
      code: (error as { code?: string }).code,
      email: email.replace(/^(.{2}).*@/, '$1***@'),
    })
    const msg = error.message || 'Error al iniciar sesión'
    const friendly =
      msg.toLowerCase().includes('invalid login credentials')
        ? 'Correo o contraseña incorrectos. Si acabas de registrarte, revisa tu correo y confirma tu cuenta con el enlace que te enviamos.'
        : msg
    return { success: false, error: friendly }
  }

  if (data.user) {
    revalidatePath('/app/dashboard')
    logger.info('[Auth] signIn success, redirecting to /app/dashboard')
    return { success: true }
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

  const { data: tenant, error } = await supabase
    .from('tenants')
    .select('*')
    // @ts-expect-error - Supabase type inference issue
    .eq('owner_id', user.id)
    .maybeSingle()

  // Solo mostrar error si no es un error de tabla no encontrada (PGRST205)
  // Esto es común durante desarrollo cuando la tabla aún no existe
  if (error && error.code !== 'PGRST205') {
    logger.error('[Auth] Error fetching tenant', { code: error.code, message: error.message })
  }

  return tenant
}
