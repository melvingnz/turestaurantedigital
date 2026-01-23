# Kitchen Display System (KDS) - Orders Dashboard

Real-time order management system for restaurant kitchens.

## Features

- **Real-time Updates**: Automatically receives new orders via Supabase Realtime
- **Status Management**: Update order status (Pending → Preparing → Ready → Delivered)
- **Visual Indicators**: Color-coded cards based on order status
- **Sound Notifications**: Plays a beep sound when new orders arrive
- **Status Filtering**: Filter orders by status (All, Pending, Preparing, Ready)

## Setup

### Enable Supabase Realtime

1. Go to your Supabase Dashboard
2. Navigate to **Database** → **Replication**
3. Enable replication for the `orders` table
4. Make sure Row Level Security (RLS) policies allow authenticated users to read orders

### RLS Policy for Realtime

The existing RLS policies should already allow authenticated tenant owners to read orders. If you encounter issues, verify:

```sql
-- This policy should already exist from schema.sql
CREATE POLICY "Orders are viewable by tenant owner"
  ON orders FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM tenants
      WHERE tenants.id = orders.tenant_id
      AND tenants.owner_id = auth.uid()
    )
  );
```

## Usage

1. Navigate to `/app/orders` in the admin portal
2. The system automatically connects to Supabase Realtime
3. New orders appear instantly with a sound notification
4. Click status buttons to advance orders through the workflow

## Order Status Flow

- **Pending** (Yellow) → Click "Aceptar" → **Preparing** (Blue)
- **Preparing** (Blue) → Click "Marcar Listo" → **Ready** (Green)
- **Ready** (Green) → Click "Entregado" → **Delivered** (Gray)

## Components

- `OrdersClient`: Main component with real-time subscription
- `OrderCard`: Individual order card with status actions
- `useSound`: Hook for playing notification sounds
