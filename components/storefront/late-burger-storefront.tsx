'use client'

import { useState } from 'react'
import { StoreHeader } from './store-header'
import { LateBurgerProductGrid } from './late-burger-product-grid'
import { LateBurgerHero } from './late-burger-hero'
import { ProductModal } from './product-modal'
import { CartSheet } from './cart-sheet'
import { CartButton } from './cart-button'
import { OrderSuccess } from './order-success'
import type { Product, Tenant } from '@/types/database'

interface LateBurgerStorefrontProps {
  tenant: Tenant
  products: Product[]
}

// Late Burger Official Brand Colors
const LATE_BURGER_PRIMARY = '#0FA8D8' // Brand Blue (Background, Buttons & Prices)
const LATE_BURGER_SECONDARY = '#FCFF70' // Brand Yellow (Text & Accents)

export function LateBurgerStorefront({ tenant, products }: LateBurgerStorefrontProps) {
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
  // Show ALL products in the grid
  const menuProducts = products

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: LATE_BURGER_PRIMARY,
        color: '#FFFFFF',
      }}
    >
      {/* Decorative Pattern Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <StoreHeader tenant={tenant} isLateBurger />

      {/* Hero Section */}
      <LateBurgerHero product={heroProduct} />

      {/* Products Section */}
      <div className="py-12 md:py-16 relative" id="menu-section">
        <div className="container mx-auto px-4 md:px-6">
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-center drop-shadow-lg"
            style={{ color: LATE_BURGER_SECONDARY }}
          >
            Nuestro Menú
          </h2>
          <LateBurgerProductGrid
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
      <CartButton 
        onClick={() => setIsCartOpen(true)} 
        primaryColor={LATE_BURGER_PRIMARY}
        textColor="#FFFFFF"
      />

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
