/**
 * Contexto de request para tracing (requestId).
 * Obtiene requestId desde headers (X-Request-ID, x-vercel-id, etc.) o genera uno.
 */

import { headers } from 'next/headers'

const REQUEST_ID_HEADERS = ['x-request-id', 'x-vercel-id', 'x-correlation-id'] as const

/**
 * Genera un UUID v4 simple (sin dependencias externas).
 */
function generateRequestId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

/**
 * Obtiene el requestId desde los headers de la request o genera uno nuevo.
 * Usar en Route Handlers o Server Actions que tengan acceso a headers.
 *
 * @example
 * const requestId = await getRequestId()
 * logger.info({ requestId, route: '/api/example' }, 'Request started')
 */
export async function getRequestId(): Promise<string> {
  try {
    const h = await headers()
    for (const name of REQUEST_ID_HEADERS) {
      const value = h.get(name)
      if (value?.trim()) return value.trim()
    }
  } catch {
    // headers() no disponible (ej. fuera de request)
  }
  return generateRequestId()
}

/**
 * Versión síncrona que acepta Headers (útil en Route Handler donde ya tienes request.headers).
 *
 * @example
 * export async function GET(request: NextRequest) {
 *   const requestId = getRequestIdFromHeaders(request.headers)
 *   logger.info({ requestId, route: '/api/example' }, 'Request started')
 * }
 */
export function getRequestIdFromHeaders(headers: Headers): string {
  for (const name of REQUEST_ID_HEADERS) {
    const value = headers.get(name)
    if (value?.trim()) return value.trim()
  }
  return generateRequestId()
}
