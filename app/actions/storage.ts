'use server'

import { uploadFile, deleteFile, generateFilePath, extractPathFromUrl } from '@/lib/storage'
import { getAuthUser } from '@/lib/auth'

/**
 * Upload restaurant logo
 */
export async function uploadLogo(file: File): Promise<{ url: string | null; error: string | null }> {
  const user = await getAuthUser()
  if (!user) {
    return { url: null, error: 'No autenticado' }
  }

  // Validate file type
  if (!file.type.startsWith('image/')) {
    return { url: null, error: 'El archivo debe ser una imagen' }
  }

  // Validate file size (max 5MB)
  const maxSize = 5 * 1024 * 1024 // 5MB
  if (file.size > maxSize) {
    return { url: null, error: 'La imagen no puede ser mayor a 5MB' }
  }

  const path = generateFilePath('restaurant-logos', user.id, file.name)
  const result = await uploadFile('restaurant-logos', file, path)

  return result
}

/**
 * Upload product image
 */
export async function uploadProductImage(
  file: File
): Promise<{ url: string | null; error: string | null }> {
  const user = await getAuthUser()
  if (!user) {
    return { url: null, error: 'No autenticado' }
  }

  // Validate file type
  if (!file.type.startsWith('image/')) {
    return { url: null, error: 'El archivo debe ser una imagen' }
  }

  // Validate file size (max 5MB)
  const maxSize = 5 * 1024 * 1024 // 5MB
  if (file.size > maxSize) {
    return { url: null, error: 'La imagen no puede ser mayor a 5MB' }
  }

  const path = generateFilePath('product-images', user.id, file.name)
  const result = await uploadFile('product-images', file, path)

  return result
}

/**
 * Upload restaurant banner (hero/portada)
 */
export async function uploadBanner(file: File): Promise<{ url: string | null; error: string | null }> {
  const user = await getAuthUser()
  if (!user) {
    return { url: null, error: 'No autenticado' }
  }

  if (!file.type.startsWith('image/')) {
    return { url: null, error: 'El archivo debe ser una imagen' }
  }

  const maxSize = 5 * 1024 * 1024 // 5MB
  if (file.size > maxSize) {
    return { url: null, error: 'La imagen no puede ser mayor a 5MB' }
  }

  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
  const path = `${user.id}/banner_${Date.now()}.${ext}`
  const result = await uploadFile('restaurant-logos', file, path)
  return { url: result.url, error: result.error }
}

/**
 * Delete old logo if it's from Supabase Storage
 */
export async function deleteOldLogo(oldLogoUrl: string | null): Promise<void> {
  if (!oldLogoUrl) return

  // Only delete if it's from our storage
  if (!oldLogoUrl.includes('supabase.co/storage/v1/object/public/restaurant-logos')) {
    return
  }

  const path = extractPathFromUrl(oldLogoUrl, 'restaurant-logos')
  if (path) {
    await deleteFile('restaurant-logos', path)
  }
}

/**
 * Delete old banner if it's from Supabase Storage (restaurant-logos bucket)
 */
export async function deleteOldBanner(oldBannerUrl: string | null): Promise<void> {
  if (!oldBannerUrl) return

  if (!oldBannerUrl.includes('supabase.co/storage/v1/object/public/restaurant-logos')) {
    return
  }

  const path = extractPathFromUrl(oldBannerUrl, 'restaurant-logos')
  if (path) {
    await deleteFile('restaurant-logos', path)
  }
}

/**
 * Delete old product image if it's from Supabase Storage
 */
export async function deleteOldProductImage(oldImageUrl: string | null): Promise<void> {
  if (!oldImageUrl) return

  // Only delete if it's from our storage
  if (!oldImageUrl.includes('supabase.co/storage/v1/object/public/product-images')) {
    return
  }

  const path = extractPathFromUrl(oldImageUrl, 'product-images')
  if (path) {
    await deleteFile('product-images', path)
  }
}
