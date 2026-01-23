# Database Schema - Tu Restaurante Digital

This directory contains the database schema and migration files for the Supabase PostgreSQL database.

## Setup Instructions

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Note your project URL and anon key (you'll need these for environment variables)

### 2. Run the Schema

You can run the schema in two ways:

#### Option A: Supabase Dashboard (Recommended for first-time setup)

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy the contents of `schema.sql`
4. Paste and execute the script

#### Option B: Supabase CLI

```bash
# Install Supabase CLI (if not already installed)
npm install -g supabase

# Link to your project
supabase link --project-ref your-project-ref

# Run the migration
supabase db push
```

### 3. Environment Variables

Add these to your `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## Schema Overview

### Tables

1. **`tenants`** - Restaurant/tenant information
   - Stores restaurant details, slug for subdomain routing
   - Linked to Supabase Auth via `owner_id`

2. **`products`** - Menu items
   - Belongs to a tenant
   - Includes pricing, availability, and category

3. **`orders`** - Customer orders
   - Tracks order status, type (delivery/pickup/dine_in)
   - Contains customer information

4. **`order_items`** - Individual items in an order
   - Links products to orders with quantity and price snapshot

### Row Level Security (RLS)

All tables have RLS enabled with the following access patterns:

- **Tenants**: Public read, owner write
- **Products**: Public read, owner write
- **Orders**: Public insert (customers), owner read/update
- **Order Items**: Public insert, owner read/update

### Indexes

Performance indexes are created on:
- `tenants.slug` (critical for subdomain routing)
- `products.tenant_id`, `category`, `is_available`
- `orders.tenant_id`, `status`, `created_at`
- `order_items.order_id`, `product_id`

## Usage in Next.js

Import types from `types/database.ts`:

```typescript
import type { Tenant, Product, Order, OrderItem } from '@/types/database'
```

## Notes

- All UUIDs are generated using `gen_random_uuid()`
- Timestamps use `TIMESTAMP WITH TIME ZONE`
- Price fields use `NUMERIC(10, 2)` for precision
- Check constraints ensure data integrity (status enums, positive prices, etc.)
- Automatic `updated_at` triggers on `products` and `orders`
