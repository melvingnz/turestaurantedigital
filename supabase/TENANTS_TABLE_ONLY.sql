-- ============================================
-- TENANTS TABLE ONLY
-- Run this in Supabase SQL Editor if you only need the tenants table
-- ============================================

-- Enable UUID extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABLE: tenants
-- Stores restaurant/tenant information
-- ============================================
CREATE TABLE IF NOT EXISTS tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  logo_url TEXT,
  brand_color TEXT DEFAULT '#FF5F1F',
  owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL
);

-- Index for fast slug lookups (critical for subdomain routing)
CREATE INDEX IF NOT EXISTS idx_tenants_slug ON tenants(slug);
CREATE INDEX IF NOT EXISTS idx_tenants_owner_id ON tenants(owner_id);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;

-- Public read access (everyone can see restaurant info)
CREATE POLICY "Tenants are viewable by everyone"
  ON tenants FOR SELECT
  USING (true);

-- Only authenticated users can create tenants (via signup flow)
CREATE POLICY "Authenticated users can create tenants"
  ON tenants FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = owner_id);

-- Only the owner can update their tenant
CREATE POLICY "Tenants are updatable by owner"
  ON tenants FOR UPDATE
  TO authenticated
  USING (auth.uid() = owner_id)
  WITH CHECK (auth.uid() = owner_id);

-- Only the owner can delete their tenant
CREATE POLICY "Tenants are deletable by owner"
  ON tenants FOR DELETE
  TO authenticated
  USING (auth.uid() = owner_id);
