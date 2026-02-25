/**
 * Tipos para la plantilla de storefront / landing de restaurante.
 * El config se construye desde Tenant + Product[] con valores por defecto para campos opcionales.
 */

export interface RestaurantCategory {
  id: string
  name: string
}

export interface RestaurantProduct {
  id: string
  name: string
  description: string | null
  price: number
  image_url: string | null
  category: string
  categoryId: string // mismo que category para filtrar
  featured: boolean
  is_available: boolean
}

export interface RestaurantSocial {
  instagram?: string | null
  facebook?: string | null
}

export interface RestaurantConfig {
  name: string
  tagline: string
  logoUrl: string | null
  coverImageUrl: string | null
  primaryColor: string
  rating: number | null
  hours: string | null
  location: string | null
  deliveryAvailable: boolean
  whatsappNumber: string | null
  reservationUrl: string | null
  social: RestaurantSocial
  address: string | null
  phone: string | null
  acceptsOnlinePayments?: boolean
  categories: RestaurantCategory[]
  products: RestaurantProduct[]
}

const DEFAULT_PRIMARY = '#FF5F1F'

/**
 * Construye RestaurantConfig desde tenant y productos.
 * Valores por defecto para campos no presentes en DB.
 */
export function buildRestaurantConfig(
  tenant: { id: string; name: string; logo_url: string | null; banner_url?: string | null; brand_color?: string | null; menu_description?: string | null },
  products: Array<{ id: string; name: string; description: string | null; price: number; image_url: string | null; category: string; is_available: boolean }>
): RestaurantConfig {
  const primaryColor = tenant.brand_color || DEFAULT_PRIMARY
  const categoryNames = [...new Set(products.map((p) => p.category).filter(Boolean))] as string[]
  const categories: RestaurantCategory[] = categoryNames.length
    ? categoryNames.map((name) => ({ id: name, name }))
    : [{ id: 'general', name: 'General' }]

  const featuredCount = Math.min(4, products.length)
  const productsWithFeatured: RestaurantProduct[] = products.map((p, i) => ({
    id: p.id,
    name: p.name,
    description: p.description,
    price: p.price,
    image_url: p.image_url,
    category: p.category,
    categoryId: p.category,
    featured: i < featuredCount,
    is_available: p.is_available,
  }))

  const t = tenant as Record<string, unknown>
  return {
    name: tenant.name,
    tagline: (t.tagline as string) || 'Deliciosos platos esperando por ti',
    logoUrl: tenant.logo_url || null,
    coverImageUrl: tenant.banner_url || null,
    primaryColor,
    rating: (t.rating as number) ?? 4.8,
    hours: (t.hours as string) || '10:00 AM - 11:00 PM',
    location: (t.location as string) || 'Santo Domingo',
    deliveryAvailable: (t.delivery_available as boolean) ?? true,
    whatsappNumber: (t.whatsapp_number as string) || (t.whatsappNumber as string) || null,
    reservationUrl: (t.reservation_url as string) || (t.reservationUrl as string) || null,
    social: (t.social as RestaurantSocial) || {},
    address: (t.address as string) || null,
    phone: (t.phone as string) || null,
    acceptsOnlinePayments: (t.accepts_online_payments as boolean) ?? false,
    categories,
    products: productsWithFeatured,
  }
}
