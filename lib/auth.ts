import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

/**
 * Verificar si el usuario está autenticado
 * Redirige a /login si no está autenticado
 */
export async function requireAuth() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return user
}

/**
 * Obtener el usuario actual (sin redirigir)
 */
export async function getAuthUser() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return user
}

/**
 * Obtener el tenant del usuario actual
 */
export async function getAuthTenant() {
  const user = await getAuthUser()
  if (!user) return null

  const supabase = await createClient()
  const { data: tenant, error } = await supabase
    .from('tenants')
    .select('*')
    // @ts-expect-error - Supabase type inference issue
    .eq('owner_id', user.id)
    .maybeSingle()

  // Solo mostrar error si no es un error de tabla no encontrada (PGRST205)
  // Esto es común durante desarrollo cuando la tabla aún no existe
  if (error && error.code !== 'PGRST205') {
    console.error('Error fetching tenant:', error)
  }

  return tenant
}
