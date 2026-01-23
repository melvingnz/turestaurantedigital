'use server'

import { createServerClient } from '@/lib/supabase/server'
import type { Product, ProductInsert, ProductUpdate } from '@/types/database'

/**
 * Get all products for a tenant
 */
export async function getProducts(tenantId: string): Promise<Product[]> {
  const supabase = await createServerClient()
  
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('tenant_id', tenantId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching products:', error)
    throw new Error(`Failed to fetch products: ${error.message}`)
  }

  return data || []
}

/**
 * Get a single product by ID
 */
export async function getProduct(id: string): Promise<Product | null> {
  const supabase = await createServerClient()
  
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching product:', error)
    return null
  }

  return data
}

/**
 * Create a new product
 */
export async function createProduct(product: ProductInsert): Promise<Product> {
  const supabase = await createServerClient()
  
  const { data, error } = await supabase
    .from('products')
    .insert(product)
    .select()
    .single()

  if (error) {
    console.error('Error creating product:', error)
    throw new Error(`Failed to create product: ${error.message}`)
  }

  if (!data) {
    throw new Error('Failed to create product: No data returned')
  }

  return data
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
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating product:', error)
    throw new Error(`Failed to update product: ${error.message}`)
  }

  if (!data) {
    throw new Error('Failed to update product: No data returned')
  }

  return data
}

/**
 * Delete a product
 */
export async function deleteProduct(id: string): Promise<void> {
  const supabase = await createServerClient()
  
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting product:', error)
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
