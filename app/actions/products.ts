'use server'

import { createServerClient } from '@/lib/supabase/server'
import { getAuthTenant } from '@/lib/auth'
import type { Product, ProductInsert, ProductUpdate } from '@/types/database'
import { logger } from '@/lib/logger'

/**
 * Get all products for a tenant
 */
export async function getProducts(tenantId: string): Promise<Product[]> {
  try {
    const supabase = await createServerClient()

    const { data, error } = await supabase
      .from('products')
      .select('*')
      // @ts-ignore - Supabase generated types mismatch
      .eq('tenant_id', tenantId)
      .order('created_at', { ascending: false })

    if (error) {
      logger.error('[Products] Error fetching products', { tenantId, code: error.code, message: error.message })
      return []
    }

    return (data as unknown as Product[]) || []
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    logger.error('[Products] Fetch failed (network or Supabase)', { tenantId, message })
    return []
  }
}

/**
 * Get a single product by ID
 */
export async function getProduct(id: string): Promise<Product | null> {
  const supabase = await createServerClient()
  
  const { data, error } = await supabase
    .from('products')
    .select('*')
    // @ts-ignore - Supabase generated types mismatch
    .eq('id', id)
    .single()

  if (error) {
    logger.error('[Products] Error fetching product', { id, code: error.code, message: error.message })
    return null
  }

  return data as unknown as Product | null
}

/**
 * Create a new product
 */
export async function createProduct(product: ProductInsert): Promise<Product> {
  const supabase = await createServerClient()
  
  const { data, error } = await supabase
    .from('products')
    // @ts-ignore - Supabase generated types mismatch
    .insert(product)
    .select()
    .single()

  if (error) {
    logger.error('[Products] Error creating product', { code: error.code, message: error.message })
    throw new Error(`Failed to create product: ${error.message}`)
  }

  if (!data) {
    throw new Error('Failed to create product: No data returned')
  }

  return data as unknown as Product
}

/**
 * Update a product
 */
export async function updateProduct(
  id: string,
  updates: ProductUpdate
): Promise<Product> {
  const supabase = await createServerClient()
  
  const { data, error } = await supabase
    .from('products')
    // @ts-ignore - Supabase generated types mismatch
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    logger.error('[Products] Error updating product', { id, code: error.code, message: error.message })
    throw new Error(`Failed to update product: ${error.message}`)
  }

  if (!data) {
    throw new Error('Failed to update product: No data returned')
  }

  return data as unknown as Product
}

/**
 * Delete a product (solo si pertenece al tenant del usuario autenticado)
 */
export async function deleteProduct(id: string): Promise<void> {
  const tenant = await getAuthTenant()
  if (!tenant) {
    throw new Error('No autorizado')
  }

  const supabase = await createServerClient()
  const product = await getProduct(id)
  if (!product) {
    throw new Error('Producto no encontrado')
  }
  if (product.tenant_id !== tenant.id) {
    logger.warn('[Products] Delete rejected: product belongs to another tenant', { id, tenantId: tenant.id })
    throw new Error('No puedes eliminar este producto')
  }

  const { error } = await supabase
    .from('products')
    .delete()
    // @ts-ignore - Supabase generated types mismatch
    .eq('id', id)

  if (error) {
    logger.error('[Products] Error deleting product', { id, code: error.code, message: error.message })
    throw new Error(`Error al eliminar: ${error.message}`)
  }
}

/**
 * Toggle product availability
 */
export async function toggleProductAvailability(
  id: string,
  isAvailable: boolean
): Promise<Product> {
  return updateProduct(id, { is_available: isAvailable })
}
