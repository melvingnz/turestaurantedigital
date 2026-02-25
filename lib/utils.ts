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

/** Requisitos: mínimo 8 caracteres, al menos una mayúscula, un número y un carácter especial */
export function validatePassword(
  password: string
): { valid: boolean; error?: string } {
  if (password.length < 8) {
    return { valid: false, error: 'La contraseña debe tener al menos 8 caracteres' }
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, error: 'La contraseña debe incluir al menos una mayúscula' }
  }
  if (!/[0-9]/.test(password)) {
    return { valid: false, error: 'La contraseña debe incluir al menos un número' }
  }
  if (!/[^A-Za-z0-9]/.test(password)) {
    return { valid: false, error: 'La contraseña debe incluir al menos un carácter especial (!@#$%^&* etc.)' }
  }
  return { valid: true }
}

/**
 * Nombre a mostrar en el storefront (navbar, etc.).
 * Quita el prefijo "TRD " del nombre del tenant para mostrar solo el nombre del cliente.
 */
export function getStorefrontDisplayName(tenantName: string): string {
  if (!tenantName || typeof tenantName !== 'string') return tenantName || ''
  const trimmed = tenantName.replace(/^TRD\s+/i, '').trim()
  return trimmed || tenantName
}

/**
 * Generar URL de storefront usando subdominio
 * Funciona tanto en Server Components como Client Components
 * @param slug - Slug del restaurante (ej: 'lateburger')
 * @returns URL completa con subdominio
 */
export function getStorefrontUrl(slug: string): string {
  // Client-side: usar window.location para detectar el entorno actual
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname
    const port = window.location.port ? `:${window.location.port}` : ''
    const protocol = window.location.protocol
    
    // Si estamos en localhost, usar subdominio de localhost
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return `${protocol}//${slug}.localhost${port}`
    }
    
    // Si ya estamos en un subdominio del dominio de producción, mantener el protocolo
    if (hostname.includes('turestaurantedigital.com')) {
      return `${protocol}//${slug}.turestaurantedigital.com`
    }
  }

  // Server-side: usar variables de entorno
  const isDevelopment = process.env.NODE_ENV === 'development'
  if (isDevelopment) {
    // En desarrollo, asumir que estamos en localhost:3000
    return `http://${slug}.localhost:3000`
  }

  // En producción: usar subdominio del dominio principal
  const productionDomain = process.env.NEXT_PUBLIC_PRODUCTION_DOMAIN || 'turestaurantedigital.com'
  return `https://${slug}.${productionDomain}`
}
