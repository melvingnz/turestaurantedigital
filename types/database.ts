/**
 * Database Type Definitions
 * Tu Restaurante Digital - Supabase Schema
 * 
 * These types correspond to the PostgreSQL schema defined in supabase/schema.sql
 */

// ============================================
// ENUMS
// ============================================

export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled'
export type OrderType = 'delivery' | 'pickup' | 'dine_in'

// ============================================
// TABLES
// ============================================

/**
 * Tenant (Restaurant) Table
 * Represents a restaurant/tenant in the multi-tenant system
 */
export interface Tenant {
  id: string // UUID
  created_at: string // ISO timestamp
  name: string
  slug: string // Unique slug for subdomain routing
  logo_url: string | null
  brand_color: string // Default: '#FF5F1F'
  owner_id: string // UUID, references auth.users
  has_custom_domain: boolean // Onboarding: si tiene dominio propio, TRD lo gestiona
}

/**
 * Product (Menu Item) Table
 * Represents a menu item/product for a restaurant
 */
export interface Product {
  id: string // UUID
  tenant_id: string // UUID, references tenants
  name: string
  description: string | null
  price: number // Numeric(10, 2)
  image_url: string | null
  is_available: boolean // Default: true
  category: string // Default: 'General'
  created_at: string // ISO timestamp
  updated_at: string // ISO timestamp
}

/**
 * Order Table
 * Represents a customer order
 */
export interface Order {
  id: string // UUID
  tenant_id: string // UUID, references tenants
  status: OrderStatus // 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled'
  total_amount: number // Numeric(10, 2)
  customer_name: string
  customer_phone: string | null
  type: OrderType // 'delivery' | 'pickup' | 'dine_in'
  created_at: string // ISO timestamp
  updated_at: string // ISO timestamp
}

/**
 * Order Item Table
 * Represents an individual item within an order
 */
export interface OrderItem {
  id: string // UUID
  order_id: string // UUID, references orders
  product_id: string // UUID, references products
  quantity: number // Integer, must be > 0
  price: number // Numeric(10, 2) - snapshot of price at time of order
  notes: string | null
  created_at: string // ISO timestamp
}

// ============================================
// INSERT TYPES (for creating new records)
// ============================================

export interface TenantInsert {
  name: string
  slug: string
  logo_url?: string | null
  brand_color?: string
  owner_id: string
  has_custom_domain?: boolean
}

export interface ProductInsert {
  tenant_id: string
  name: string
  description?: string | null
  price: number
  image_url?: string | null
  is_available?: boolean
  category?: string
}

export interface OrderInsert {
  tenant_id: string
  status?: OrderStatus
  total_amount: number
  customer_name: string
  customer_phone?: string | null
  type: OrderType
}

export interface OrderItemInsert {
  order_id: string
  product_id: string
  quantity: number
  price: number
  notes?: string | null
}

// ============================================
// UPDATE TYPES (for partial updates)
// ============================================

export interface TenantUpdate {
  name?: string
  slug?: string
  logo_url?: string | null
  brand_color?: string
  has_custom_domain?: boolean
}

export interface ProductUpdate {
  name?: string
  description?: string | null
  price?: number
  image_url?: string | null
  is_available?: boolean
  category?: string
}

export interface OrderUpdate {
  status?: OrderStatus
  total_amount?: number
  customer_name?: string
  customer_phone?: string | null
  type?: OrderType
}

export interface OrderItemUpdate {
  quantity?: number
  price?: number
  notes?: string | null
}

// ============================================
// RELATIONSHIP TYPES (with joins)
// ============================================

/**
 * Product with tenant information
 */
export interface ProductWithTenant extends Product {
  tenant: Tenant
}

/**
 * Order with tenant information
 */
export interface OrderWithTenant extends Order {
  tenant: Tenant
}

/**
 * Order with items and product details
 */
export interface OrderWithItems extends Order {
  items: Array<OrderItem & { product: Product }>
}

/**
 * Complete order with tenant and items
 */
export interface OrderComplete extends Order {
  tenant: Tenant
  items: Array<OrderItem & { product: Product }>
}

// ============================================
// SUPABASE RESPONSE TYPES
// ============================================

/**
 * Generic Supabase response wrapper
 */
export interface SupabaseResponse<T> {
  data: T | null
  error: {
    message: string
    details?: string
    hint?: string
    code?: string
  } | null
}

/**
 * Supabase query response with count
 */
export interface SupabaseQueryResponse<T> {
  data: T[]
  error: {
    message: string
    details?: string
    hint?: string
    code?: string
  } | null
  count?: number | null
}

// ============================================
// DATABASE TYPE FOR SUPABASE CLIENT
// ============================================

export interface Database {
  public: {
    Tables: {
      tenants: {
        Row: Tenant
        Insert: TenantInsert
        Update: TenantUpdate
      }
      products: {
        Row: Product
        Insert: ProductInsert
        Update: ProductUpdate
      }
      orders: {
        Row: Order
        Insert: OrderInsert
        Update: OrderUpdate
      }
      order_items: {
        Row: OrderItem
        Insert: OrderItemInsert
        Update: OrderItemUpdate
      }
    }
  }
}
