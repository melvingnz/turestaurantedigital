import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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
