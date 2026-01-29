import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'
import { logger } from '@/lib/logger'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

if (!supabaseServiceRoleKey) {
  logger.warn('[Supabase] Missing SUPABASE_SERVICE_ROLE_KEY. Admin operations (e.g. rollback) will fail.')
}

/** Usar solo para saber si podemos hacer rollback (deleteUser) en signup. */
export function hasServiceRoleKey(): boolean {
  return !!process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
}

/**
 * Decodifica el payload del JWT (sin verificar firma) y comprueba role/ref.
 * Solo para diagnóstico 401; no loguea la key.
 */
function diagnoseServiceRoleKey(): void {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
  const url = (process.env.NEXT_PUBLIC_SUPABASE_URL || '').trim()
  if (!key || !url) return

  try {
    const parts = key.split('.')
    if (parts.length !== 3) {
      logger.error('[Supabase] Service role key not JWT format (header.payload.signature). Copy full key.')
      return
    }
    const base64 = parts[1]!.replace(/-/g, '+').replace(/_/g, '/')
    const padding = base64.length % 4
    const padded = padding ? base64 + '='.repeat(4 - padding) : base64
    const payload = JSON.parse(Buffer.from(padded, 'base64').toString('utf8')) as {
      role?: string
      ref?: string
    }
    const role = payload.role ?? '(no existe)'
    const ref = payload.ref ?? '(no existe)'

    const urlMatch = url.match(/https?:\/\/([^.]+)\.supabase\.co/)
    const urlRef = urlMatch?.[1] ?? '(no se pudo extraer)'

    if (role === 'anon') {
      logger.error('[Supabase] Using ANON key for SERVICE_ROLE. Use service_role secret from Supabase → API Keys.')
      return
    }
    if (role !== 'service_role') {
      logger.error('[Supabase] Key role is not service_role', { role })
      return
    }
    if (ref !== urlRef) {
      logger.error('[Supabase] Key project ref does not match URL', { ref, urlRef })
      return
    }
    logger.warn('[Supabase] Service role key OK. If 401 persists, restart dev server or check key format.')
  } catch (e) {
    logger.error('[Supabase] Failed to decode JWT', { message: (e as Error)?.message })
  }
}

/**
 * Elimina un usuario en Auth (rollback signup). No lanza.
 * Si falla con 401, ejecuta diagnóstico (role/ref) y imprime ayuda.
 */
export async function deleteUserForRollback(userId: string): Promise<void> {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!key || !url) return

  try {
    const client = createClient<Database>(url, key, {
      auth: { autoRefreshToken: false, persistSession: false },
    })
    const { error } = await client.auth.admin.deleteUser(userId)
    if (error) {
      const is401 = (error as { status?: number }).status === 401
      logger.error('[Supabase] Rollback deleteUser failed', { message: error.message })
      if (is401) {
        diagnoseServiceRoleKey()
        logger.error('[Supabase] 401: Check SERVICE_ROLE key, same project as URL, restart dev server.')
      }
    }
  } catch (e) {
    const err = e as { status?: number; message?: string }
    const msg = err?.message ?? String(e)
    logger.error('[Supabase] Rollback deleteUser error', { message: msg })
    const is401 = err?.status === 401 || /invalid api key|401/i.test(msg)
    if (is401) {
      diagnoseServiceRoleKey()
      logger.error('[Supabase] 401: Check SERVICE_ROLE key, same project as URL, restart dev server.')
    }
  }
}

/**
 * Admin client with service role key
 * Use ONLY for server-side admin operations (like deleting users)
 */
export function createAdminClient() {
  return createClient<Database>(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
