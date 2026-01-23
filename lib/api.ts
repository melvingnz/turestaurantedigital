import { createServerClient } from '@/lib/supabase/server'
import type { Tenant, Product } from '@/types/database'

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
    .eq('slug', slug)
    .maybeSingle()

  if (error) {
    console.error('Error fetching tenant:', error)
    return null
  }

  return data
}

/**
 * Get active products for a tenant
 */
export async function getActiveProducts(tenantId: string): Promise<Product[]> {
  const supabase = await createServerClient()
  
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('tenant_id', tenantId)
    .eq('is_available', true)
    .order('category', { ascending: true })
    .order('name', { ascending: true })

  if (error) {
    console.error('Error fetching products:', error)
    return []
  }

  return data || []
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
