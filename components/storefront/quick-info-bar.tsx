'use client'

import { Star, Clock, MapPin, Truck } from 'lucide-react'
import type { RestaurantConfig } from '@/types/storefront'

interface QuickInfoBarProps {
  config: RestaurantConfig
}

export function QuickInfoBar({ config }: QuickInfoBarProps) {
  const items = [
    config.rating != null && (
      <div
        key="rating"
        className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl bg-white border border-gray-200 shadow-sm"
      >
        <Star className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500 fill-amber-500" />
        <span className="font-semibold text-gray-900">{config.rating}</span>
      </div>
    ),
    config.hours && (
      <div
        key="hours"
        className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl bg-white border border-gray-200 shadow-sm"
      >
        <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
        <span className="text-gray-700 text-sm md:text-base">{config.hours}</span>
      </div>
    ),
    config.location && (
      <div
        key="location"
        className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl bg-white border border-gray-200 shadow-sm"
      >
        <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
        <span className="text-gray-700 text-sm md:text-base">{config.location}</span>
      </div>
    ),
    config.deliveryAvailable && (
      <div
        key="delivery"
        className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl bg-white border border-gray-200 shadow-sm"
      >
        <Truck className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
        <span className="text-gray-700 text-sm md:text-base">Delivery disponible</span>
      </div>
    ),
  ].filter(Boolean)

  if (items.length === 0) return null

  return (
    <section className="px-3 sm:px-4 py-3 md:py-6 bg-gray-50/50 border-b border-gray-100">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {items}
        </div>
      </div>
    </section>
  )
}
