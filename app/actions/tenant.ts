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
    .update(updates)
    .eq('id', tenant.id)
    .select()
    .single()

  if (error) {
    console.error('Error updating tenant:', error)
    throw new Error(`Error al actualizar: ${error.message}`)
  }

  revalidatePath('/app/settings')
  revalidatePath('/app/dashboard')
  
  return data
}

/**
 * Validar y normalizar slug
 */
export function validateSlug(slug: string): { valid: boolean; error?: string; normalized?: string } {
  const slugRegex = /^[a-z0-9-]+$/
  const normalized = slug.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

  if (normalized.length < 3) {
    return { valid: false, error: 'El slug debe tener al menos 3 caracteres' }
  }

  if (normalized.length > 30) {
    return { valid: false, error: 'El slug no puede tener más de 30 caracteres' }
  }

  const reservedSlugs = ['app', 'www', 'admin', 'api', 'marketing', 'storefront']
  if (reservedSlugs.includes(normalized)) {
    return { valid: false, error: 'Este slug está reservado' }
  }

  if (!slugRegex.test(normalized)) {
    return { valid: false, error: 'El slug solo puede contener letras, números y guiones' }
  }

  return { valid: true, normalized }
}

/**
 * Verificar si un slug está disponible
 */
export async function checkSlugAvailability(slug: string, currentTenantId: string): Promise<boolean> {
  const supabase = await createClient()

  const { data } = await supabase
    .from('tenants')
    .select('id')
    .eq('slug', slug)
    .neq('id', currentTenantId)
    .single()

  return !data // Disponible si no existe
}
