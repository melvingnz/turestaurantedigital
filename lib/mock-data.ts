/**
 * Mock data for Late Burger (Pilot)
 * This will be replaced with Supabase fetch later
 */

import type { Tenant, Product } from '@/types/database'

export const LATE_BURGER_TENANT: Tenant = {
  id: 'mock-late-burger-id',
  created_at: new Date().toISOString(),
  name: 'Late Burger',
  slug: 'lateburger',
  logo_url: '/images/Logo_500x500_amarillo.jpg', // Official Late Burger Logo (Yellow version)
  brand_color: '#0FA8D8', // Official Brand Blue
  owner_id: 'mock-owner-id',
}

export const LATE_BURGER_PRODUCTS: Product[] = [
  {
    id: 'mock-product-1',
    tenant_id: 'mock-late-burger-id',
    name: 'Classic Smash Burger',
    description: 'Blend angus, doble carne estilo smash, queso americano, nuestra salsa Late, pepinillos homemade + Coca cola.',
    price: 499.00,
    image_url: '/images/Pidebot_Smash.jpg', // Hero image
    is_available: true,
    category: 'Hamburguesas',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'mock-product-2',
    tenant_id: 'mock-late-burger-id',
    name: 'Late Bacon',
    description: 'Blend Angus, Vermont cheddar, black pepper bacon glaceado en miel negra, relish de cebollas y pepinillos encurtidos, dijonnaise.',
    price: 649.00,
    image_url: '/images/Bacon.jpg',
    is_available: true,
    category: 'Hamburguesas',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'mock-product-3',
    tenant_id: 'mock-late-burger-id',
    name: 'Late Blue',
    description: 'Blend angus, reducción de Ron Brugal Leyenda con cebolla y tomillo, Danish blue cheese, rúcula, dijonnaise.',
    price: 599.00,
    image_url: '/images/Blue.jpg',
    is_available: true,
    category: 'Hamburguesas',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'mock-product-4',
    tenant_id: 'mock-late-burger-id',
    name: 'Late Chicken',
    description: 'Pechuga de pollo crispy, queso mozzarella gratinado, rúcula, salsa de albahaca fresca y limón.',
    price: 549.00,
    image_url: '/images/Chicken.jpg',
    is_available: true,
    category: 'Hamburguesas',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

/**
 * Get tenant brand colors
 * Primary: #0FA8D8 (Azul)
 * Secondary: #FCFF70 (Amarillo)
 */
export function getLateBurgerColors() {
  return {
    primary: '#0FA8D8',
    secondary: '#FCFF70',
  }
}
