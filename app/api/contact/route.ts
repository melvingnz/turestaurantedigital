import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { logger } from '@/lib/logger'

const RESEND_API_KEY = process.env.RESEND_API_KEY
const RESEND_FROM =
  process.env.RESEND_FROM ?? 'Tu Restaurante Digital <onboarding@resend.dev>'
/** Destino fijo del formulario de contacto. Siempre contacto@, nunca servicioalcliente@. */
const CONTACT_TO = 'contacto@turestaurantedigital.com'

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export async function POST(request: NextRequest) {
  try {
    if (!RESEND_API_KEY) {
      logger.error('[Contact] RESEND_API_KEY is not set')
      return NextResponse.json(
        { message: 'El servicio de correo no está configurado.' },
        { status: 503 }
      )
    }

    const body = await request.json()
    const { name, email, phone, message } = body as {
      name?: string
      email?: string
      phone?: string
      message?: string
    }
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { message: 'Nombre, email y mensaje son obligatorios.' },
        { status: 400 }
      )
    }

    const n = escapeHtml(name.trim())
    const e = escapeHtml(email.trim())
    const p = phone?.trim() ? escapeHtml(phone.trim()) : '—'
    const m = escapeHtml(message.trim())

    const resend = new Resend(RESEND_API_KEY)
    const { data, error } = await resend.emails.send({
      from: RESEND_FROM,
      to: [CONTACT_TO],
      replyTo: email.trim(),
      subject: `Contacto web: ${name.trim()}`,
      html: `
        <h2>Nuevo mensaje desde el formulario de contacto</h2>
        <p><strong>Nombre:</strong> ${n}</p>
        <p><strong>Email:</strong> ${e}</p>
        <p><strong>Teléfono:</strong> ${p}</p>
        <p><strong>Mensaje:</strong></p>
        <pre style="white-space: pre-wrap; font-family: inherit;">${m}</pre>
      `,
    })

    if (error) {
      logger.error('[Contact] Resend error', error)
      return NextResponse.json(
        { message: 'No pudimos enviar tu mensaje. Intenta de nuevo.' },
        { status: 502 }
      )
    }

    logger.info('[Contact] Sent', { id: data?.id, to: CONTACT_TO })
    return NextResponse.json({ ok: true })
  } catch (e) {
    logger.error('[Contact] Unexpected error', e)
    return NextResponse.json(
      { message: 'Error al procesar el mensaje.' },
      { status: 500 }
    )
  }
}
