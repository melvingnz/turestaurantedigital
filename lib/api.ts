import { createServerClient } from '@/lib/supabase/server'
import type { Tenant, Product } from '@/types/database'
import { logger } from '@/lib/logger'

/**
 * Get tenant by slug
 * CRITICAL: Returns null immediately for localhost and root domain (no DB query)
 */
export async function getTenantBySlug(slug: string): Promise<Tenant | null> {
  // Bypass localhost and root domain - these should NEVER query the database
  if (
    slug.includes('localhost') ||
    slug === 'localhost' ||
    slug.includes('127.0.0.1') ||
    slug === 'turestaurantedigital.com' ||
    slug === 'www.turestaurantedigital.com' ||
    slug === 'www' ||
    !slug ||
    slug.trim() === ''
  ) {
    return null
  }

  const supabase = await createServerClient()
  
  // Use maybeSingle() instead of single() to avoid errors when no rows found
  const { data, error } = await supabase
    .from('tenants')
    .select('*')
    // @ts-expect-error - Supabase type inference issue
    .eq('slug', slug)
    .maybeSingle()

  if (error) {
    if (error.code !== 'PGRST205') {
      logger.error('[API] Error fetching tenant', { code: error.code, message: error.message, slug })
    }
    return null
  }

  return data as unknown as Tenant | null
}

/**
 * Get active products for a tenant
 */
export async function getActiveProducts(tenantId: string): Promise<Product[]> {
  const supabase = await createServerClient()
  
  const { data, error } = await supabase
    .from('products')
    .select('*')
    // @ts-expect-error - Supabase type inference issue
    .eq('tenant_id', tenantId)
    // @ts-expect-error - Supabase type inference issue
    .eq('is_available', true)
    .order('category', { ascending: true })
    .order('name', { ascending: true })

  if (error) {
    logger.error('[API] Error fetching products', { code: error.code, message: error.message, tenantId })
    return []
  }

  return (data as unknown as Product[]) || []
}

/**
 * Get products by tenant slug
 */
export async function getProductsBySlug(slug: string): Promise<Product[]> {
  const tenant = await getTenantBySlug(slug)
  if (!tenant) {
    return []
  }
  return getActiveProducts(tenant.id)
}
