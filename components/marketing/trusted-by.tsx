import React from 'react'

export function TrustedBy() {
  const restaurants = [
    { name: 'Restaurante A', logo: '🍕' },
    { name: 'Restaurante B', logo: '🍔' },
    { name: 'Restaurante C', logo: '🍜' },
    { name: 'Restaurante D', logo: '🍣' },
    { name: 'Restaurante E', logo: '🌮' },
    { name: 'Restaurante F', logo: '🥗' },
  ]

  return (
    <section className="w-full bg-gray-50 py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            Confiado por restaurantes en toda la República Dominicana
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
          {restaurants.map((restaurant, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center opacity-60 hover:opacity-100 transition-opacity"
            >
              <div className="text-4xl mb-2">{restaurant.logo}</div>
              <div className="text-sm font-medium text-gray-600 text-center">
                {restaurant.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
