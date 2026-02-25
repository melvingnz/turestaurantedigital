'use client'

import { useState } from 'react'
import { StoreHeader } from './store-header'
import { DarkProductGrid } from './dark-product-grid'
import { DarkHero } from './dark-hero'
import { ProductModal } from './product-modal'
import { CartSheet } from './cart-sheet'
import { CartButton } from './cart-button'
import { OrderSuccess } from './order-success'
import type { Product, Tenant } from '@/types/database'

interface DarkStorefrontClientProps {
  tenant: Tenant
  products: Product[]
}

// Late Burger Official Brand Colors
const LATE_BURGER_PRIMARY = '#0FA8D8' // Brand Blue
const LATE_BURGER_SECONDARY = '#FCFF70' // Brand Yellow
const LATE_BURGER_BG = '#050505' // Deep Dark Background

export function DarkStorefrontClient({ tenant, products }: DarkStorefrontClientProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product)
    setIsProductModalOpen(true)
  }

  // Find hero product (Classic Smash Burger) for hero section
  const heroProduct = products.find((p) => p.name === 'Classic Smash Burger') || products[0]
  // Show ALL products in the grid (including Classic Smash Burger)
  const menuProducts = products

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: LATE_BURGER_BG,
        color: '#FFFFFF',
      }}
    >
      <StoreHeader tenant={tenant} isDark />

      {/* Hero Section */}
      <DarkHero product={heroProduct} />

      {/* Products Section */}
      <div className="py-12 md:py-16" id="menu-section">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
            Nuestro Menú
          </h2>
          <DarkProductGrid
            products={menuProducts}
            onProductClick={handleProductClick}
          />
        </div>
      </div>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        open={isProductModalOpen}
        onOpenChange={setIsProductModalOpen}
        primaryColor={LATE_BURGER_PRIMARY}
      />

      {/* Cart Button (Floating) */}
      <CartButton onClick={() => setIsCartOpen(true)} primaryColor={LATE_BURGER_PRIMARY} />

      {/* Cart Sheet */}
      <CartSheet
        open={isCartOpen}
        onOpenChange={setIsCartOpen}
        tenantId={tenant.id}
        slug={tenant.slug}
        primaryColor={LATE_BURGER_PRIMARY}
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
