'use client'

import { Search } from 'lucide-react'
import { ProductGrid } from './product-grid'
import type { Product, Tenant } from '@/types/database'

interface MenuSectionProps {
  tenant: Tenant
  products: Product[]
  searchQuery: string
  onSearchChange: (q: string) => void
  onProductClick: (product: Product) => void
  sectionRef?: React.RefObject<HTMLElement | null>
}

export function MenuSection({
  tenant,
  products,
  searchQuery,
  onSearchChange,
  onProductClick,
  sectionRef,
}: MenuSectionProps) {
  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement> | undefined}
      id="menu-section"
      className="w-full py-8 md:py-12 scroll-mt-24"
    >
      <div className="container mx-auto px-4">
        <header className="mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nuestro Menú</h2>
          <div className="max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="search"
                placeholder="Buscar en el menú..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-gray-300 focus:ring-2 focus:ring-gray-200 outline-none transition-all"
              />
            </div>
          </div>
        </header>

        <ProductGrid products={products} tenant={tenant} onProductClick={onProductClick} />
      </div>
    </section>
  )
}
