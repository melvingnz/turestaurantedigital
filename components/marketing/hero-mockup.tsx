'use client'

import { ShoppingBag, Clock, CheckCircle, ChefHat, Plus, Bell } from 'lucide-react'

export function HeroMockup() {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Brand Glow - Orange Aura */}
      <div className="absolute inset-0 bg-[#FF5F1F]/20 blur-3xl rounded-full -z-10"></div>
      
      {/* Floating Animation Container */}
      <div className="relative animate-float">
        {/* Tablet - Kitchen Display System (Background) */}
        <div className="relative w-full max-w-[600px] mx-auto">
          {/* Tablet Device */}
          <div 
            className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-3 shadow-2xl"
            style={{
              transform: 'perspective(1000px) rotateY(-8deg) rotateX(5deg)',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Inner Border Effect */}
            <div className="absolute inset-0 rounded-2xl ring-1 ring-white/20 pointer-events-none"></div>
            
            {/* Screen Bezel */}
            <div className="bg-black rounded-xl p-2 relative">
              {/* Glass Glare Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent rounded-xl pointer-events-none z-10"></div>
              
              {/* Screen Content - KDS Interface */}
              <div className="bg-slate-900 rounded-lg overflow-hidden aspect-[16/10] relative">
                {/* KDS Header */}
                <div className="bg-[#FF5F1F] px-4 py-3 flex items-center justify-between relative z-0">
                  <div className="flex items-center gap-2">
                    <ChefHat className="h-5 w-5 text-white" />
                    <h3 className="text-white font-bold text-sm">Pedidos en Cocina</h3>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 bg-white rounded-full animate-pulse"></div>
                    <span className="text-white text-xs">En Vivo</span>
                  </div>
                  {/* Glass Glare on Header */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent rounded-t-lg pointer-events-none"></div>
                </div>

                {/* KDS Orders Grid */}
                <div className="p-4 grid grid-cols-2 gap-3 h-full overflow-hidden">
                  {/* Order Card 1 - Ready */}
                  <div className="bg-slate-800/90 border-2 border-green-500 rounded-lg p-3 space-y-2 backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-bold text-xs">#A3F2</span>
                      <span className="px-2 py-0.5 bg-green-500 text-white text-xs font-semibold rounded-full">
                        Listo
                      </span>
                    </div>
                    <div className="text-gray-300 text-xs">Juan Pérez</div>
                    <div className="text-gray-400 text-xs">2x Burger, 1x Papas</div>
                    <div className="text-[#FF5F1F] font-bold text-xs">RD$ 850</div>
                  </div>

                  {/* Order Card 2 - Pending */}
                  <div className="bg-slate-800/90 border-2 border-[#FF5F1F] rounded-lg p-3 space-y-2 backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-bold text-xs">#B4G3</span>
                      <span className="px-2 py-0.5 bg-[#FF5F1F] text-white text-xs font-semibold rounded-full">
                        Pendiente
                      </span>
                    </div>
                    <div className="text-gray-300 text-xs">María García</div>
                    <div className="text-gray-400 text-xs">1x Pizza, 2x Refrescos</div>
                    <div className="text-[#FF5F1F] font-bold text-xs">RD$ 650</div>
                  </div>

                  {/* Order Card 3 - Preparing */}
                  <div className="bg-slate-800/90 border-2 border-[#FF5F1F]/50 rounded-lg p-3 space-y-2 backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-bold text-xs">#C5H4</span>
                      <span className="px-2 py-0.5 bg-[#FF5F1F]/30 text-white text-xs font-semibold rounded-full border border-[#FF5F1F]/50">
                        En Cocina
                      </span>
                    </div>
                    <div className="text-gray-300 text-xs">Carlos Rodríguez</div>
                    <div className="text-gray-400 text-xs">3x Tacos, 1x Ensalada</div>
                    <div className="text-[#FF5F1F] font-bold text-xs">RD$ 1,200</div>
                  </div>

                  {/* Order Card 4 - Ready */}
                  <div className="bg-slate-800/90 border-2 border-green-500 rounded-lg p-3 space-y-2 backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-bold text-xs">#D6I5</span>
                      <span className="px-2 py-0.5 bg-green-500 text-white text-xs font-semibold rounded-full">
                        Listo
                      </span>
                    </div>
                    <div className="text-gray-300 text-xs">Ana Martínez</div>
                    <div className="text-gray-400 text-xs">1x Pasta, 1x Vino</div>
                    <div className="text-[#FF5F1F] font-bold text-xs">RD$ 950</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Phone - Storefront (Foreground) */}
          <div className="absolute -bottom-8 -right-8 w-64 h-[500px] z-10">
            {/* Phone Device */}
            <div 
              className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-[2.5rem] p-2 shadow-2xl transform rotate-[-8deg]"
              style={{
                boxShadow: '0 25px 50px -12px rgba(255, 95, 31, 0.25)',
              }}
            >
              {/* Inner Border Effect */}
              <div className="absolute inset-0 rounded-[2.5rem] ring-1 ring-white/20 pointer-events-none"></div>
              
              {/* Screen Bezel */}
              <div className="bg-black rounded-[2rem] p-1.5 relative">
                {/* Glass Glare Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent rounded-[2rem] pointer-events-none z-10"></div>
                
                {/* Screen Content - Storefront Interface */}
                <div className="bg-white rounded-[1.75rem] overflow-hidden h-full relative">
                  {/* Storefront Header */}
                  <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-10">
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm">Late Burger</h3>
                      <p className="text-xs text-gray-500">Restaurante</p>
                    </div>
                    <div className="relative">
                      <ShoppingBag className="h-5 w-5 text-gray-600" />
                      <span className="absolute -top-1 -right-1 h-4 w-4 bg-[#FF5F1F] text-white text-xs font-bold rounded-full flex items-center justify-center">
                        2
                      </span>
                    </div>
                  </div>

                  {/* Product Hero Image */}
                  <div className="relative h-32 bg-gradient-to-br from-[#FF5F1F] via-[#FF7F4F] to-[#FF9F6F] overflow-hidden">
                    {/* Burger Illustration using CSS - Brand Colors Only */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        {/* Bun Top */}
                        <div className="w-24 h-8 bg-white/90 rounded-t-full mb-1 shadow-lg"></div>
                        {/* Patty */}
                        <div className="w-24 h-6 bg-[#FF5F1F] rounded-full mb-1 shadow-md"></div>
                        {/* Cheese - Orange tint */}
                        <div className="w-24 h-2 bg-[#FF9F6F] rounded-full mb-1"></div>
                        {/* Lettuce - White/light */}
                        <div className="w-24 h-3 bg-white/80 rounded-full mb-1"></div>
                        {/* Bun Bottom */}
                        <div className="w-24 h-8 bg-white/90 rounded-b-full shadow-lg"></div>
                      </div>
                    </div>
                    {/* Glass Glare Effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent"></div>
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                  </div>

                  {/* Product Details */}
                  <div className="p-4 space-y-3">
                    <div>
                      <h4 className="font-bold text-gray-900 text-base">Doble Queso Burger</h4>
                      <p className="text-xs text-gray-600 mt-1">
                        Carne jugosa, doble queso cheddar, lechuga fresca y nuestra salsa especial
                      </p>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-[#FF5F1F]">RD$ 450</span>
                      </div>
                    </div>

                    {/* Add Button */}
                    <button className="w-full bg-[#FF5F1F] hover:bg-[#FF5F1F]/90 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg shadow-[#FF5F1F]/30">
                      <Plus className="h-5 w-5" />
                      Agregar al Carrito
                    </button>

                    {/* Additional Info */}
                    <div className="flex items-center gap-4 text-xs text-gray-500 pt-2 border-t border-gray-200">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>15-20 min</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CheckCircle className="h-3 w-3 text-green-500" />
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

      {/* Floating Badge - Nueva Orden */}
      <div className="absolute top-8 right-4 z-20 animate-float" style={{ animationDelay: '1s' }}>
        <div className="bg-white rounded-lg shadow-xl p-3 flex items-center gap-2 border border-gray-100">
          <div className="relative">
            <Bell className="h-4 w-4 text-gray-700" />
            <div className="absolute -top-1 -right-1 h-2 w-2 bg-[#FF5F1F] rounded-full animate-pulse"></div>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-900">Nueva Orden</p>
            <p className="text-xs text-gray-500">Hace 2 min</p>
          </div>
        </div>
      </div>

      {/* Decorative Elements - Brand Orange Glow Only */}
      <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#FF5F1F]/20 rounded-full blur-2xl -z-10"></div>
      <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#FF5F1F]/15 rounded-full blur-3xl -z-10"></div>
    </div>
  )
}
