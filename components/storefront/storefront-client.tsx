/**
 * STOREFRONT TEMPLATE – Cómo personalizar para un nuevo cliente
 * ---------------------------------------------------------------
 * El config del restaurante se construye en buildRestaurantConfig() desde Tenant + Product[].
 * Para personalizar datos que no vienen de la DB (tagline, horario, WhatsApp, reservas, redes):
 * 1) Añade columnas opcionales al tenant (ej: whatsapp_number, reservation_url, hours, location, address, phone)
 *    y rellena buildRestaurantConfig en types/storefront.ts para leerlas.
 * 2) O pasa un config override desde el servidor (página [slug]) leyendo de env o CMS y fusionando con el config.
 * Productos destacados: por ahora los primeros 4 productos se marcan featured=true. Para elegir cuáles,
 *    añade un campo `featured` a la tabla products y actualiza buildRestaurantConfig.
 */

'use client'

import { useState, useRef, useCallback } from 'react'
import { StoreHeader } from './store-header'
import { HeroBranding } from './hero-branding'
import { QuickInfoBar } from './quick-info-bar'
import { CategoryBar } from './category-bar'
import { MenuSection } from './menu-section'
import { CTASection } from './cta-section'
import { StorefrontFooter } from './storefront-footer'
import { useCart } from './cart-context'
import { ProductModal } from './product-modal'
import { CartSheet } from './cart-sheet'
import { OrderSuccess } from './order-success'
import type { Product, Tenant } from '@/types/database'
import { buildRestaurantConfig } from '@/types/storefront'

interface StorefrontClientProps {
  tenant: Tenant
  products: Product[]
}

export function StorefrontClient({ tenant, products }: StorefrontClientProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const { isOpen: isCartOpen, setIsOpen: setIsCartOpen } = useCart()
  const [categoryId, setCategoryId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const menuSectionRef = useRef<HTMLDivElement>(null)

  const config = buildRestaurantConfig(tenant, products)
  const primaryColor = config.primaryColor

  const scrollToMenu = useCallback(() => {
    menuSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product)
    setIsProductModalOpen(true)
  }

  const handleWhatsApp = () => {
    if (config.whatsappNumber) {
      const cleaned = config.whatsappNumber.replace(/\D/g, '')
      const number = cleaned.startsWith('1') ? cleaned : `1${cleaned}`
      const message = encodeURIComponent(`Hola, me gustaría hacer un pedido de ${config.name}.`)
      window.open(`https://wa.me/${number}?text=${message}`, '_blank')
    }
  }

  const filteredProducts = products.filter((p) => {
    if (!p.is_available) return false
    const matchCategory = !categoryId || categoryId === '__all__' || p.category === categoryId
    const q = searchQuery.trim().toLowerCase()
    const matchSearch = !q || p.name.toLowerCase().includes(q) || (p.description?.toLowerCase().includes(q) ?? false)
    return matchCategory && matchSearch
  })

  return (
    <div className="min-h-screen flex flex-col bg-white" style={{ '--brand-primary': primaryColor } as React.CSSProperties}>
      <div className="flex-1 flex flex-col">
        <StoreHeader tenant={tenant} />

        <HeroBranding
          config={config}
          onVerMenu={scrollToMenu}
          onWhatsApp={config.whatsappNumber ? handleWhatsApp : undefined}
        />

        <QuickInfoBar config={config} />

        {tenant.menu_description?.trim() && (
          <div className="px-4 md:px-6 py-6 md:py-8 bg-white border-b border-gray-100">
            <div className="container mx-auto max-w-3xl text-center">
              <p className="text-gray-700 text-base md:text-lg leading-relaxed whitespace-pre-line">
                {tenant.menu_description.trim()}
              </p>
            </div>
          </div>
        )}

        <CategoryBar
          categories={config.categories}
          selectedId={categoryId}
          onSelect={setCategoryId}
          primaryColor={primaryColor}
        />

        <MenuSection
          tenant={tenant}
          products={filteredProducts}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onProductClick={handleProductClick}
          sectionRef={menuSectionRef}
        />

        <CTASection config={config} />

        <StorefrontFooter config={config} />
      </div>

      <ProductModal
        product={selectedProduct}
        open={isProductModalOpen}
        onOpenChange={setIsProductModalOpen}
        primaryColor={primaryColor}
      />

      <CartSheet
        open={isCartOpen}
        onOpenChange={setIsCartOpen}
        tenantId={tenant.id}
        slug={tenant.slug}
        primaryColor={primaryColor}
      />

      {showSuccess && (
        <OrderSuccess
          onClose={() => {
            setShowSuccess(false)
            setIsCartOpen(false)
          }}
        />
      )}
    </div>
  )
}
