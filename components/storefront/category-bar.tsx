'use client'

import type { RestaurantCategory } from '@/types/storefront'

interface CategoryBarProps {
  categories: RestaurantCategory[]
  selectedId: string | null
  onSelect: (id: string) => void
  primaryColor: string
}

const ALL_ID = '__all__'

export function CategoryBar({ categories, selectedId, onSelect, primaryColor }: CategoryBarProps) {
  if (categories.length === 0) return null

  return (
    <section className="sticky top-14 md:top-16 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div
        className="flex gap-2 overflow-x-auto overflow-y-hidden py-2.5 sm:py-3 px-3 sm:px-4 w-full max-w-full -webkit-overflow-scrolling-touch snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <button
          type="button"
          onClick={() => onSelect(ALL_ID)}
          className="flex-shrink-0 px-3 sm:px-4 py-2 rounded-full font-medium text-sm transition-colors whitespace-nowrap border snap-start"
          style={{
            backgroundColor: selectedId === ALL_ID || selectedId === null ? primaryColor : 'transparent',
            color: selectedId === ALL_ID || selectedId === null ? 'white' : '#374151',
            borderColor: selectedId === ALL_ID || selectedId === null ? primaryColor : '#e5e7eb',
          }}
        >
          Todos
        </button>
        {categories.map((cat) => {
          const isSelected = selectedId === cat.id
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelect(cat.id)}
              className="flex-shrink-0 px-3 sm:px-4 py-2 rounded-full font-medium text-sm transition-colors whitespace-nowrap snap-start"
              style={{
                backgroundColor: isSelected ? primaryColor : 'transparent',
                color: isSelected ? 'white' : 'var(--gray-700, #374151)',
                borderWidth: 1,
                borderColor: isSelected ? primaryColor : '#e5e7eb',
              }}
            >
              {cat.name}
            </button>
          )
        })}
        {/* Espacio al final para que el último botón no quede cortado al hacer scroll */}
        <div className="flex-shrink-0 w-3 sm:w-4" aria-hidden />
      </div>
    </section>
  )
}
