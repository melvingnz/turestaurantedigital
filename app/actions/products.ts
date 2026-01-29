'use server'

import { createServerClient } from '@/lib/supabase/server'
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
      // @ts-expect-error - Supabase type inference issue
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
    // @ts-expect-error - Supabase type inference issue
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
    // @ts-expect-error - Supabase type inference issue
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
    // @ts-expect-error - Supabase type inference issue
    .update(updates)
    // @ts-expect-error - Supabase type inference issue
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
 * Delete a product
 */
export async function deleteProduct(id: string): Promise<void> {
  const supabase = await createServerClient()
  
  const { error } = await supabase
    .from('products')
    .delete()
    // @ts-expect-error - Supabase type inference issue
    .eq('id', id)

  if (error) {
    logger.error('[Products] Error deleting product', { id, code: error.code, message: error.message })
    throw new Error(`Failed to delete product: ${error.message}`)
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
