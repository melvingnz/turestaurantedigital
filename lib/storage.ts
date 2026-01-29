import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { logger } from '@/lib/logger'

/**
 * Upload file to Supabase Storage
 */
export async function uploadFile(
  bucket: 'restaurant-logos' | 'product-images',
  file: File,
  path: string
): Promise<{ url: string; error: null } | { url: null; error: string }> {
  try {
    const supabase = await createClient()

    // Upload file
    const { data, error } = await supabase.storage.from(bucket).upload(path, file, {
      cacheControl: '3600',
      upsert: true, // Replace if exists
    })

    if (error) {
      logger.error('[Storage] Upload failed', { bucket, path, message: error.message })
      return { url: null, error: error.message }
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from(bucket).getPublicUrl(data.path)

    return { url: publicUrl, error: null }
  } catch (error) {
    logger.error('[Storage] Unexpected upload error', { bucket, path, message: (error as Error)?.message })
    return {
      url: null,
      error: error instanceof Error ? error.message : 'Error desconocido al subir el archivo',
    }
  }
}

/**
 * Delete file from Supabase Storage
 */
export async function deleteFile(
  bucket: 'restaurant-logos' | 'product-images',
  path: string
): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = await createClient()

    const { error } = await supabase.storage.from(bucket).remove([path])

    if (error) {
      logger.error('[Storage] Delete failed', { bucket, path, message: error.message })
      return { success: false, error: error.message }
    }

    return { success: true, error: null }
  } catch (error) {
    logger.error('[Storage] Unexpected delete error', { bucket, path, message: (error as Error)?.message })
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido al eliminar el archivo',
    }
  }
}

/**
 * Extract file path from Supabase Storage URL
 */
export function extractPathFromUrl(
  url: string,
  bucket: 'restaurant-logos' | 'product-images'
): string | null {
  try {
    const urlObj = new URL(url)
    const pathMatch = urlObj.pathname.match(new RegExp(`/${bucket}/(.+)$`))
    return pathMatch ? pathMatch[1] : null
  } catch {
    return null
  }
}

/**
 * Generate unique file path for upload
 */
export function generateFilePath(
  bucket: 'restaurant-logos' | 'product-images',
  userId: string,
  fileName: string
): string {
  const timestamp = Date.now()
  const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_')
  const extension = sanitizedFileName.split('.').pop() || 'jpg'

  if (bucket === 'restaurant-logos') {
    return `${userId}/logo_${timestamp}.${extension}`
  } else {
    // product-images
    return `${userId}/products/${timestamp}_${sanitizedFileName}`
  }
}
