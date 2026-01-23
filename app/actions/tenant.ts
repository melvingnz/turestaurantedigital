'use server'

import { createClient } from '@/lib/supabase/server'
import { getAuthTenant } from '@/lib/auth'
import type { TenantUpdate } from '@/types/database'
import { revalidatePath } from 'next/cache'

/**
 * Obtener el tenant actual del usuario autenticado
 */
export async function getCurrentTenant() {
  return await getAuthTenant()
}

/**
 * Actualizar información del tenant
 */
export async function updateTenant(updates: TenantUpdate) {
  const tenant = await getAuthTenant()
  if (!tenant) {
    throw new Error('No se encontró el restaurante')
  }

  const supabase = await createClient()

  const { data, error } = await supabase
    .from('tenants')
    // @ts-expect-error - Supabase type inference issue
    .update(updates)
    // @ts-expect-error - Supabase type inference issue
    .eq('id', tenant.id)
    .select()
    .single()

  if (error) {
    // Si es un error de tabla no encontrada (PGRST205), es un error de configuración
    if (error.code === 'PGRST205') {
      throw new Error('La tabla de restaurantes no está configurada. Por favor, ejecuta el schema SQL en Supabase.')
    }
    console.error('Error updating tenant:', error)
    throw new Error(`Error al actualizar: ${error.message}`)
  }

  revalidatePath('/app/settings')
  revalidatePath('/app/dashboard')
  
  return data
}

/**
 * Verificar si un slug está disponible
 */
export async function checkSlugAvailability(slug: string, currentTenantId: string): Promise<boolean> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('tenants')
    .select('id')
    // @ts-expect-error - Supabase type inference issue
    .eq('slug', slug)
    // @ts-expect-error - Supabase type inference issue
    .neq('id', currentTenantId)
    .maybeSingle()

  // Si hay un error de tabla no encontrada (PGRST205), considerar el slug como disponible
  if (error && error.code === 'PGRST205') {
    return true
  }

  return !data // Disponible si no existe
}
