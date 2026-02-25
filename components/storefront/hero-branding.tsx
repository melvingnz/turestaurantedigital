'use client'

import type { RestaurantConfig } from '@/types/storefront'

interface HeroBrandingProps {
  config: RestaurantConfig
  onVerMenu: () => void
  onWhatsApp?: () => void
}

export function HeroBranding({ config }: HeroBrandingProps) {
  return (
    <section className="w-full border-b border-gray-100 overflow-hidden">
      {config.coverImageUrl ? (
        <div className="relative w-full aspect-[21/9] min-h-[160px] max-h-[320px] bg-gray-100">
          <img
            src={config.coverImageUrl}
            alt="Banner del restaurante"
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div
          className="w-full aspect-[21/9] min-h-[160px] max-h-[280px]"
          style={{
            background: `linear-gradient(135deg, ${config.primaryColor}18 0%, ${config.primaryColor}06 100%)`,
          }}
        />
      )}
    </section>
  )
}
