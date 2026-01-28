'use client'

import { ShoppingBag, Clock, CheckCircle, ChefHat, Plus, Bell } from 'lucide-react'

export function HeroMockup() {
  return (
    <div className="relative w-full max-w-full mx-auto overflow-hidden">
      <div className="absolute inset-0 bg-[#FF6B00]/20 blur-3xl rounded-full -z-10" />
      <div className="relative animate-float w-full max-w-[260px] sm:max-w-[340px] md:max-w-[420px] lg:max-w-[500px] xl:max-w-[560px] mx-auto flex flex-col md:block">
        <div className="relative w-full max-w-[600px] mx-auto flex-shrink-0">
          <div
            className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl sm:rounded-2xl p-2 sm:p-3 shadow-2xl w-full"
            style={{
              transform: 'perspective(1000px) rotateY(-8deg) rotateX(5deg)',
              transformStyle: 'preserve-3d',
            }}
          >
            <div className="absolute inset-0 rounded-xl sm:rounded-2xl ring-1 ring-white/20 pointer-events-none" />
            <div className="bg-black rounded-lg sm:rounded-xl p-1.5 sm:p-2 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent rounded-lg sm:rounded-xl pointer-events-none z-10" />
              <div className="bg-slate-900 rounded-md sm:rounded-lg overflow-hidden aspect-[16/10] relative">
                <div className="bg-[#FF5F1F] px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between relative z-0">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <ChefHat className="h-4 w-4 sm:h-5 sm:w-5 text-white shrink-0" />
                    <h3 className="text-white font-bold text-xs sm:text-sm truncate">Pedidos en Cocina</h3>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 bg-white rounded-full animate-pulse" />
                    <span className="text-white text-[10px] sm:text-xs">En Vivo</span>
                  </div>
                </div>
                <div className="p-2 sm:p-4 grid grid-cols-2 gap-1.5 sm:gap-3 h-full overflow-hidden">
                  {[
                    { id: '1', status: 'Listo', border: 'border-green-500', bg: 'bg-green-500', name: 'Juan Pérez', items: '2x Burger, 1x Papas', price: 'RD$ 850' },
                    { id: '2', status: 'Pendiente', border: 'border-[#FF5F1F]', bg: 'bg-[#FF5F1F]', name: 'María García', items: '1x Pizza, 2x Refrescos', price: 'RD$ 650' },
                    { id: '3', status: 'En Cocina', border: 'border-[#FF5F1F]/50', bg: 'bg-[#FF5F1F]/30', name: 'Carlos Rodríguez', items: '3x Tacos, 1x Ensalada', price: 'RD$ 1,200' },
                    { id: '4', status: 'Listo', border: 'border-green-500', bg: 'bg-green-500', name: 'Ana Martínez', items: '1x Pasta, 1x Vino', price: 'RD$ 950' },
                  ].map((o) => (
                    <div
                      key={o.id}
                      className={`bg-slate-800/90 border-2 ${o.border} rounded-md sm:rounded-lg p-2 sm:p-3 space-y-1 sm:space-y-2 backdrop-blur-sm min-w-0`}
                    >
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-white font-bold text-[10px] sm:text-xs truncate">#{o.id}</span>
                        <span className={`px-1.5 sm:px-2 py-0.5 ${o.bg} text-white text-[9px] sm:text-xs font-semibold rounded-full shrink-0`}>
                          {o.status}
                        </span>
                      </div>
                      <div className="text-gray-300 text-[10px] sm:text-xs truncate">{o.name}</div>
                      <div className="text-gray-400 text-[9px] sm:text-xs truncate">{o.items}</div>
                      <div className="text-[#FF5F1F] font-bold text-[10px] sm:text-xs">{o.price}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Phone - stacked below KDS on mobile, absolute overlay on md+ */}
          <div className="mt-4 sm:mt-6 md:mt-0 flex-shrink-0 w-36 sm:w-44 md:w-64 h-[280px] sm:h-[360px] md:h-[500px] mx-auto md:absolute md:-bottom-6 md:-right-6 md:mx-0 z-10">
            <div
              className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] p-1.5 sm:p-2 shadow-2xl transform rotate-[-8deg] h-full"
              style={{ boxShadow: '0 25px 50px -12px rgba(255, 107, 0, 0.25)' }}
            >
              <div className="absolute inset-0 rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] ring-1 ring-white/20 pointer-events-none" />
              <div className="bg-black rounded-[1.25rem] sm:rounded-[1.5rem] md:rounded-[2rem] p-1 sm:p-1.5 relative h-full">
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent rounded-[1.25rem] sm:rounded-[1.5rem] md:rounded-[2rem] pointer-events-none z-10" />
                <div className="bg-white rounded-[1rem] sm:rounded-[1.25rem] md:rounded-[1.75rem] overflow-hidden h-full relative">
                  <div className="bg-white border-b border-gray-200 px-2 sm:px-3 md:px-4 py-2 sm:py-3 flex items-center justify-between sticky top-0 z-10">
                    <div className="min-w-0">
                      <h3 className="font-bold text-gray-900 text-xs sm:text-sm truncate">Late Burger</h3>
                      <p className="text-[10px] sm:text-xs text-gray-500 truncate">Restaurante</p>
                    </div>
                    <div className="relative shrink-0">
                      <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                      <span className="absolute -top-0.5 -right-0.5 h-3 w-3 sm:h-4 sm:w-4 bg-[#FF5F1F] text-white text-[10px] sm:text-xs font-bold rounded-full flex items-center justify-center">
                        2
                      </span>
                    </div>
                  </div>
                  <div className="relative h-20 sm:h-24 md:h-32 bg-gradient-to-br from-[#FF5F1F] via-[#FF7F4F] to-[#FF9F6F] overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative scale-75 sm:scale-90 md:scale-100">
                        <div className="w-16 sm:w-20 md:w-24 h-5 sm:h-6 md:h-8 bg-white/90 rounded-t-full mb-0.5 sm:mb-1 shadow-lg" />
                        <div className="w-16 sm:w-20 md:w-24 h-4 sm:h-5 md:h-6 bg-[#FF5F1F] rounded-full mb-0.5 sm:mb-1 shadow-md" />
                        <div className="w-16 sm:w-20 md:w-24 h-1.5 sm:h-2 bg-[#FF9F6F] rounded-full mb-0.5 sm:mb-1" />
                        <div className="w-16 sm:w-20 md:w-24 h-2 sm:h-3 bg-white/80 rounded-full mb-0.5 sm:mb-1" />
                        <div className="w-16 sm:w-20 md:w-24 h-5 sm:h-6 md:h-8 bg-white/90 rounded-b-full shadow-lg" />
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                  </div>
                  <div className="p-2 sm:p-3 md:p-4 space-y-2 sm:space-y-3">
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm sm:text-base truncate">Doble Queso Burger</h4>
                      <p className="text-[10px] sm:text-xs text-gray-600 mt-0.5 sm:mt-1 line-clamp-2">
                        Carne jugosa, doble queso cheddar, lechuga fresca y nuestra salsa especial
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg sm:text-xl md:text-2xl font-bold text-[#FF5F1F]">RD$ 450</span>
                    </div>
                    <button
                      type="button"
                      className="w-full bg-[#FF5F1F] hover:bg-[#FF5F1F]/90 text-white font-semibold py-2 sm:py-3 px-3 sm:px-4 rounded-lg flex items-center justify-center gap-1.5 sm:gap-2 transition-colors shadow-lg shadow-[#FF5F1F]/30 text-xs sm:text-sm"
                    >
                      <Plus className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
                      Agregar al Carrito
                    </button>
                    <div className="flex items-center gap-2 sm:gap-4 text-[10px] sm:text-xs text-gray-500 pt-1 sm:pt-2 border-t border-gray-200">
                      <div className="flex items-center gap-1">
                        <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3 shrink-0" />
                        <span>15-20 min</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CheckCircle className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-green-500 shrink-0" />
                        <span>Disponible</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating badge - hide on very small */}
      <div className="absolute top-4 sm:top-6 right-2 sm:right-4 z-20 animate-float hidden sm:block">
        <div className="bg-white rounded-lg shadow-xl p-2 sm:p-3 flex items-center gap-2 border border-gray-100">
          <div className="relative shrink-0">
            <Bell className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-700" />
            <div className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 sm:h-2 sm:w-2 bg-[#FF5F1F] rounded-full animate-pulse" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] sm:text-xs font-semibold text-gray-900 truncate">Nueva Orden</p>
            <p className="text-[10px] sm:text-xs text-gray-500">Hace 2 min</p>
          </div>
        </div>
      </div>

      <div className="absolute -top-4 -right-4 w-16 sm:w-24 h-16 sm:h-24 bg-[#FF5F1F]/20 rounded-full blur-2xl -z-10" />
      <div className="absolute -bottom-4 -left-4 w-20 sm:w-32 h-20 sm:h-32 bg-[#FF5F1F]/15 rounded-full blur-3xl -z-10" />
    </div>
  )
}
