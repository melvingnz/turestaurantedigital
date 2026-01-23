'use client'

import { useState } from 'react'
import { StoreHeader } from './store-header'
import { ProductGrid } from './product-grid'
import { ProductModal } from './product-modal'
import { CartSheet } from './cart-sheet'
import { CartButton } from './cart-button'
import { OrderSuccess } from './order-success'
import type { Product, Tenant } from '@/types/database'

interface StorefrontClientProps {
  tenant: Tenant
  products: Product[]
}

export function StorefrontClient({ tenant, products }: StorefrontClientProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const primaryColor = tenant.brand_color || '#FF5F1F'
  const secondaryColor = '#FCFF70' // Late Burger secondary (can be made dynamic)

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product)
    setIsProductModalOpen(true)
  }

  return (
    <div
      className="min-h-screen"
      style={{
        // Apply brand colors as CSS variables
        '--brand-primary': primaryColor,
        '--brand-secondary': secondaryColor,
      } as React.CSSProperties}
    >
      <StoreHeader tenant={tenant} />

      {/* Hero Banner */}
      <div
        className="py-8 md:py-12 px-4 md:px-6"
        style={{
          background: `linear-gradient(135deg, ${primaryColor}15 0%, ${secondaryColor}15 100%)`,
        }}
      >
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
            Nuestro Menú
          </h2>
          <p className="text-gray-600 text-base md:text-lg">
            Deliciosos platos esperando por ti
          </p>
        </div>
      </div>

      {/* Products Section */}
      <div className="py-8 md:py-12">
        <ProductGrid
          products={products}
          tenant={tenant}
          onProductClick={handleProductClick}
        />
      </div>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        open={isProductModalOpen}
        onOpenChange={setIsProductModalOpen}
        primaryColor={primaryColor}
      />

      {/* Cart Button (Floating) */}
      <CartButton onClick={() => setIsCartOpen(true)} primaryColor={primaryColor} />

      {/* Cart Sheet */}
      <CartSheet
        open={isCartOpen}
        onOpenChange={setIsCartOpen}
        tenantId={tenant.id}
        onOrderSuccess={() => setShowSuccess(true)}
        primaryColor={primaryColor}
      />

      {/* Order Success */}
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
