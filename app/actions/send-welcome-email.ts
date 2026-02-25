'use server'

import { Resend } from 'resend'
import { getAuthUser } from '@/lib/auth'
import { getCurrentTenant, updateTenant } from '@/app/actions/tenant'
import { logger } from '@/lib/logger'

const RESEND_API_KEY = process.env.RESEND_API_KEY
const RESEND_FROM =
  process.env.RESEND_FROM ?? 'Tu Restaurante Digital <noreply@turestaurantedigital.com>'

const WELCOME_HTML = `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 24px 16px; color: #1a1a1a; background-color: #ffffff;">
  <p style="margin: 0 0 24px 0; font-size: 22px; font-weight: 700; color: #FF6B00; letter-spacing: 0.02em;">Tu Restaurante Digital.</p>

  <h1 style="margin: 0 0 16px 0; font-size: 24px; font-weight: 700; color: #1a1a1a; line-height: 1.3;">Ya estás dentro.</h1>
  <p style="margin: 0 0 16px 0; font-size: 16px; color: #1a1a1a; line-height: 1.6;">Bienvenido a la plataforma. Tu menú digital está listo para que agregues productos y lo compartas con tus clientes.</p>
  <p style="margin: 0 0 24px 0; font-size: 16px; color: #1a1a1a; line-height: 1.6;">Si tienes cualquier inconveniente o necesitas ayuda, escríbenos a <a href="mailto:servicioalcliente@turestaurantedigital.com" style="color: #FF6B00; font-weight: 600;">servicioalcliente@turestaurantedigital.com</a> y te atenderemos con gusto.</p>

  <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 24px 0 16px 0;" />
  <p style="margin: 0; font-size: 13px; color: #888888;">Tu Restaurante Digital · Hecho con ❤️ en República Dominicana</p>
</div>
`.trim()

/**
 * Envía el correo de bienvenida post-onboarding al usuario.
 * Solo se envía una vez por tenant (se marca welcome_email_sent_at).
 */
export async function sendWelcomeEmailAfterOnboarding(): Promise<{ ok: boolean; error?: string }> {
  const user = await getAuthUser()
  if (!user?.email) {
    return { ok: false, error: 'Usuario no identificado' }
  }

  const tenant = await getCurrentTenant() as { id: string; welcome_email_sent_at?: string | null } | null
  if (!tenant) {
    return { ok: false, error: 'No se encontró el restaurante' }
  }

  if (tenant.welcome_email_sent_at) {
    return { ok: true }
  }

  if (!RESEND_API_KEY) {
    logger.warn('[WelcomeEmail] RESEND_API_KEY no configurada')
    return { ok: false, error: 'Servicio de correo no configurado' }
  }

  try {
    const resend = new Resend(RESEND_API_KEY)
    const { data, error } = await resend.emails.send({
      from: RESEND_FROM,
      to: [user.email],
      subject: 'Bienvenido a Tu Restaurante Digital',
      html: WELCOME_HTML,
    })

    if (error) {
      logger.error('[WelcomeEmail] Resend error', error)
      return { ok: false, error: 'No se pudo enviar el correo' }
    }

    try {
      await updateTenant({
        welcome_email_sent_at: new Date().toISOString(),
      })
    } catch (e) {
      logger.warn('[WelcomeEmail] No se pudo marcar welcome_email_sent_at (¿columna existe?)', e)
    }

    logger.info('[WelcomeEmail] Sent', { to: user.email, id: data?.id })
    return { ok: true }
  } catch (e) {
    logger.error('[WelcomeEmail] Unexpected error', e)
    return { ok: false, error: 'Error al enviar el correo' }
  }
}
