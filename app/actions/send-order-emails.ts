'use server'

import { Resend } from 'resend'
import { createAdminClient } from '@/lib/supabase/admin'
import { getOrderWithItemsForEmail } from '@/app/actions/orders'
import { getStorefrontDisplayName } from '@/lib/utils'
import type { OrderWithItems } from '@/types/database'
import { logger } from '@/lib/logger'

const RESEND_API_KEY = process.env.RESEND_API_KEY
const RESEND_FROM =
  process.env.RESEND_FROM ?? 'Tu Restaurante Digital <noreply@turestaurantedigital.com>'
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://turestaurantedigital.com'

function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-DO', {
    style: 'currency',
    currency: 'DOP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price)
}

function formatOrderType(type: string): string {
  const t: Record<string, string> = {
    delivery: 'Entrega a domicilio',
    pickup: 'Recoger en local',
    dine_in: 'Comer en local',
  }
  return t[type] ?? type
}

/**
 * Build HTML for customer order confirmation (like Shopify style).
 */
function buildOrderConfirmationHtml(params: {
  storeName: string
  orderNumberDisplay: string
  orderIdForLink: string
  customerName: string
  items: Array<{ name: string; quantity: number; price: number }>
  subtotal: number
  total: number
  paymentMethod: string
  slug: string
}): string {
  const { storeName, orderNumberDisplay, orderIdForLink, customerName, items, subtotal, total, paymentMethod, slug } = params
  const viewOrderUrl = `${APP_URL}/${slug}/orden-completada?order=${encodeURIComponent(orderIdForLink)}`
  const storeUrl = `${APP_URL}/${slug}`

  const rows = items
    .map(
      (i) =>
        `<tr><td style="padding:8px 0;border-bottom:1px solid #eee;">${escapeHtml(i.name)} x ${i.quantity}</td><td style="padding:8px 0;border-bottom:1px solid #eee;text-align:right;">${formatPrice(i.price * i.quantity)}</td></tr>`
    )
    .join('')

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f5f5f5;padding:24px;">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
    <div style="padding:24px 24px 16px;text-align:center;border-bottom:1px solid #eee;">
      <h1 style="margin:0;font-size:22px;font-weight:700;color:#1a1a1a;">${escapeHtml(storeName)}</h1>
      <p style="margin:8px 0 0;font-size:14px;color:#666;">PEDIDO #${escapeHtml(orderNumberDisplay)}</p>
    </div>
    <div style="padding:24px;">
      <p style="margin:0 0 20px;font-size:18px;font-weight:600;color:#1a1a1a;">¡Gracias por tu compra${customerName ? `, ${escapeHtml(customerName.split(' ')[0] || '')}` : ''}!</p>
      <table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
        ${rows}
      </table>
      <table style="width:100%;border-collapse:collapse;font-size:14px;color:#555;">
        <tr><td style="padding:4px 0;">Subtotal</td><td style="text-align:right;">${formatPrice(subtotal)}</td></tr>
        <tr><td style="padding:4px 0;">Envío</td><td style="text-align:right;">RD$ 0.00</td></tr>
        <tr><td style="padding:4px 0;">Impuestos</td><td style="text-align:right;">RD$ 0.00</td></tr>
        <tr style="font-weight:700;font-size:16px;color:#1a1a1a;"><td colspan="2" style="padding:12px 0 0;text-align:right;">DOP $${total.toFixed(2)}</td></tr>
      </table>
      <p style="margin:16px 0 0;font-size:13px;color:#666;">Pago: ${escapeHtml(paymentMethod)}</p>
      <div style="margin-top:24px;text-align:center;">
        <a href="${viewOrderUrl}" style="display:inline-block;background:#FF6B00;color:#fff;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:600;margin:4px;">Ver tu pedido</a>
        <a href="${storeUrl}" style="display:inline-block;background:#333;color:#fff;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:600;margin:4px;">Visita nuestra tienda</a>
      </div>
    </div>
    <div style="padding:16px 24px;background:#f9f9f9;font-size:12px;color:#888;text-align:center;">
      Tu Restaurante Digital · Hecho con ❤️ en República Dominicana
    </div>
  </div>
</body>
</html>
`.trim()
}

/**
 * Build HTML for restaurant: new order notification.
 */
function buildNewOrderNotificationHtml(params: {
  storeName: string
  orderNumber: string
  customerName: string
  customerContact: string
  orderType: string
  total: number
  items: Array<{ name: string; quantity: number; price: number }>
  ordersAppUrl: string
}): string {
  const { storeName, orderNumber, customerName, customerContact, orderType, total, items, ordersAppUrl } = params
  const rows = items
    .map(
      (i) =>
        `<tr><td style="padding:6px 0;">${escapeHtml(i.name)} x ${i.quantity}</td><td style="text-align:right;">${formatPrice(i.price * i.quantity)}</td></tr>`
    )
    .join('')

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f5f5f5;padding:24px;">
  <div style="max-width:520px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
    <div style="padding:20px;background:#FF6B00;color:#fff;text-align:center;">
      <h1 style="margin:0;font-size:20px;">Nuevo pedido</h1>
      <p style="margin:8px 0 0;font-size:14px;opacity:0.95;">${escapeHtml(storeName)} · #${escapeHtml(orderNumber)}</p>
    </div>
    <div style="padding:20px;">
      <p style="margin:0 0 12px;font-size:14px;"><strong>Cliente:</strong> ${escapeHtml(customerName)}</p>
      <p style="margin:0 0 12px;font-size:14px;"><strong>Contacto:</strong> ${escapeHtml(customerContact)}</p>
      <p style="margin:0 0 16px;font-size:14px;"><strong>Tipo:</strong> ${escapeHtml(formatOrderType(orderType))}</p>
      <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:12px;">
        ${rows}
      </table>
      <p style="margin:0;font-size:16px;font-weight:700;">DOP $${total.toFixed(2)}</p>
      <p style="margin:20px 0 0;"><a href="${ordersAppUrl}" style="display:inline-block;background:#FF6B00;color:#fff;text-decoration:none;padding:12px 20px;border-radius:8px;font-weight:600;">Ver pedidos</a></p>
    </div>
  </div>
</body>
</html>
`.trim()
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/**
 * Send order confirmation email to customer (if customer_email is set).
 */
export async function sendOrderConfirmationEmail(orderId: string): Promise<{ ok: boolean; error?: string }> {
  if (!RESEND_API_KEY) {
    logger.warn('[OrderEmail] RESEND_API_KEY not set')
    return { ok: false, error: 'Email not configured' }
  }

  const data = await getOrderWithItemsForEmail(orderId)
  if (!data) return { ok: false, error: 'Order not found' }

  const order = data.order as OrderWithItems & { customer_email?: string | null }
  if (!order.customer_email?.trim()) {
    return { ok: true }
  }

  const storeName = getStorefrontDisplayName(data.tenant.name)
  const shortId = order.id.slice(0, 8).toUpperCase()
  const paymentLabel = order.type === 'delivery' ? 'Pago contra entrega' : order.type === 'pickup' ? 'Recoger en local' : 'Comer en local'

  const html = buildOrderConfirmationHtml({
    storeName,
    orderNumberDisplay: shortId,
    orderIdForLink: order.id,
    customerName: order.customer_name,
    items: order.items.map((i) => ({ name: i.product.name, quantity: i.quantity, price: i.product.price })),
    subtotal: order.total_amount,
    total: order.total_amount,
    paymentMethod: paymentLabel,
    slug: data.tenant.slug,
  })

  try {
    const resend = new Resend(RESEND_API_KEY)
    const { error } = await resend.emails.send({
      from: RESEND_FROM,
      to: [order.customer_email.trim()],
      subject: `Confirmación de pedido #${shortId} – ${storeName}`,
      html,
    })
    if (error) {
      logger.error('[OrderEmail] Confirmation send failed', { orderId, error })
      return { ok: false, error: error.message }
    }
    logger.info('[OrderEmail] Confirmation sent', { orderId, to: order.customer_email })
    return { ok: true }
  } catch (e) {
    logger.error('[OrderEmail] Confirmation error', { orderId, message: (e as Error).message })
    return { ok: false, error: (e as Error).message }
  }
}

/**
 * Send new order notification to restaurant owner (owner_id email).
 */
export async function sendNewOrderNotificationToRestaurant(orderId: string): Promise<{ ok: boolean; error?: string }> {
  if (!RESEND_API_KEY) {
    logger.warn('[OrderEmail] RESEND_API_KEY not set')
    return { ok: false, error: 'Email not configured' }
  }

  const data = await getOrderWithItemsForEmail(orderId)
  if (!data) return { ok: false, error: 'Order not found' }

  const supabase = createAdminClient()
  const tenantId = data.order.tenant_id
  const { data: tenantRow, error: tenantError } = await supabase
    .from('tenants')
    .select('owner_id')
    .eq('id', tenantId)
    .single()

  const ownerId = tenantRow && typeof (tenantRow as { owner_id?: string }).owner_id === 'string' ? (tenantRow as { owner_id: string }).owner_id : null
  if (tenantError || !ownerId) {
    logger.error('[OrderEmail] Tenant/owner not found', { orderId })
    return { ok: false, error: 'Tenant not found' }
  }

  const { data: { user }, error: userError } = await supabase.auth.admin.getUserById(ownerId)
  if (userError || !user?.email) {
    logger.error('[OrderEmail] Owner user/email not found', { orderId })
    return { ok: false, error: 'Owner email not found' }
  }

  const storeName = getStorefrontDisplayName(data.tenant.name)
  const shortId = data.order.id.slice(0, 8).toUpperCase()
  const contact = data.order.customer_phone || data.order.customer_email || '—'

  const html = buildNewOrderNotificationHtml({
    storeName,
    orderNumber: shortId,
    customerName: data.order.customer_name,
    customerContact: contact,
    orderType: data.order.type,
    total: data.order.total_amount,
    items: data.order.items.map((i) => ({ name: i.product.name, quantity: i.quantity, price: i.product.price })),
    ordersAppUrl: `${APP_URL}/app/orders`,
  })

  try {
    const resend = new Resend(RESEND_API_KEY)
    const { error } = await resend.emails.send({
      from: RESEND_FROM,
      to: [user.email],
      subject: `Nuevo pedido #${shortId} – ${storeName}`,
      html,
    })
    if (error) {
      logger.error('[OrderEmail] Restaurant notification failed', { orderId, error })
      return { ok: false, error: error.message }
    }
    logger.info('[OrderEmail] Restaurant notification sent', { orderId, to: user.email })
    return { ok: true }
  } catch (e) {
    logger.error('[OrderEmail] Restaurant notification error', { orderId, message: (e as Error).message })
    return { ok: false, error: (e as Error).message }
  }
}
