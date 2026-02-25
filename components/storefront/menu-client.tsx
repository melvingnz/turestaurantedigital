'use client'

import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { ProductModal } from './product-modal'
import { CartSheet } from './cart-sheet'
import { CartButton } from './cart-button'
import { OrderSuccess } from './order-success'
import { Plus, Image as ImageIcon } from 'lucide-react'
import type { Product } from '@/types/database'
import { useCart } from './cart-context'

interface MenuClientProps {
  products: Product[]
  tenantId: string
  slug: string
}

export function MenuClient({ products, tenantId, slug }: MenuClientProps) {
  const { setIsOpen } = useCart()
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = Array.from(new Set(products.map((p) => p.category)))
    return ['all', ...cats]
  }, [products])

  // Filter products by category
  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') return products
    return products.filter((p) => p.category === selectedCategory)
  }, [products, selectedCategory])

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product)
    setIsProductModalOpen(true)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-DO', {
      style: 'currency',
      currency: 'DOP',
    }).format(price)
  }

  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 py-12 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Nuestro Menú
          </h2>
          <p className="text-gray-600">Deliciosos platos esperando por ti</p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="sticky top-16 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-primary hover:bg-primary/90'
                    : ''
                }`}
              >
                {category === 'all' ? 'Todos' : category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-8">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <ImageIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">
              {selectedCategory === 'all'
                ? 'No hay productos disponibles'
                : 'No hay productos en esta categoría'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <button
                key={product.id}
                onClick={() => handleProductClick(product)}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow text-left group"
              >
                <div className="aspect-square relative bg-gray-100">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                      <Plus className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                    {product.name}
                  </h3>
                  {product.description && (
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {product.description}
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        open={isProductModalOpen}
        onOpenChange={setIsProductModalOpen}
      />

      {/* Cart Button */}
      <CartButton onClick={() => setIsCartOpen(true)} />

      {/* Cart Sheet */}
      <CartSheet
        open={isCartOpen}
        onOpenChange={setIsCartOpen}
        tenantId={tenantId}
        slug={slug}
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
    </>
  )
}
