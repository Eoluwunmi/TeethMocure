-- Row-Level Security Setup for Teethmocure
-- This script enables RLS and creates policies for data isolation

-- 1. Enable RLS on all tables
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Order" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Marketer" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Lead" ENABLE ROW LEVEL SECURITY;

-- 2. Create auth context function to retrieve user ID from JWT claims
-- This function reads the user ID from the app.user_id setting set by backend
CREATE OR REPLACE FUNCTION auth.user_id() RETURNS text AS $$
  SELECT current_setting('app.user_id', true)
$$ LANGUAGE sql STABLE;

-- 3. Create admin check function
CREATE OR REPLACE FUNCTION auth.is_admin() RETURNS boolean AS $$
  SELECT EXISTS (
    SELECT 1 FROM "User"
    WHERE id = current_setting('app.user_id', true)
    AND role = 'admin'
  )
$$ LANGUAGE sql STABLE;

-- ============================================
-- USER TABLE POLICIES
-- ============================================

-- Users can view their own profile
CREATE POLICY "Users can read own profile" ON "User"
  FOR SELECT
  USING (id = auth.user_id());

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON "User"
  FOR UPDATE
  USING (id = auth.user_id())
  WITH CHECK (id = auth.user_id());

-- Admins can view all users
CREATE POLICY "Admins can read all users" ON "User"
  FOR SELECT
  USING (auth.is_admin());

-- ============================================
-- ORDER TABLE POLICIES
-- ============================================

-- Users can view only their own orders
CREATE POLICY "Users can read own orders" ON "Order"
  FOR SELECT
  USING (
    "userId" = auth.user_id()
    OR auth.is_admin()
  );

-- Users can create orders (for themselves)
CREATE POLICY "Users can create own orders" ON "Order"
  FOR INSERT
  WITH CHECK ("userId" = auth.user_id());

-- Users can update their own orders (status changes)
CREATE POLICY "Users can update own orders" ON "Order"
  FOR UPDATE
  USING ("userId" = auth.user_id())
  WITH CHECK ("userId" = auth.user_id());

-- Admins can update any order status
CREATE POLICY "Admins can update any order" ON "Order"
  FOR UPDATE
  USING (auth.is_admin())
  WITH CHECK (auth.is_admin());

-- ============================================
-- MARKETER TABLE POLICIES
-- ============================================

-- Users can view their own marketer profile
CREATE POLICY "Marketers can read own profile" ON "Marketer"
  FOR SELECT
  USING (
    "userId" = auth.user_id()
    OR auth.is_admin()
  );

-- Users can create one marketer profile (themselves)
CREATE POLICY "Users can create marketer profile" ON "Marketer"
  FOR INSERT
  WITH CHECK ("userId" = auth.user_id());

-- Marketers can update their own profile
CREATE POLICY "Marketers can update own profile" ON "Marketer"
  FOR UPDATE
  USING ("userId" = auth.user_id())
  WITH CHECK ("userId" = auth.user_id());

-- Admins can update marketer status (approve/reject/suspend)
CREATE POLICY "Admins can update marketer status" ON "Marketer"
  FOR UPDATE
  USING (auth.is_admin())
  WITH CHECK (auth.is_admin());

-- ============================================
-- LEAD TABLE POLICIES
-- ============================================

-- Only admins can view leads
CREATE POLICY "Admins can read all leads" ON "Lead"
  FOR SELECT
  USING (auth.is_admin());

-- Anyone can create a lead (contact form submission)
CREATE POLICY "Anyone can create leads" ON "Lead"
  FOR INSERT
  WITH CHECK (true);

-- ============================================
-- INDEX OPTIMIZATION
-- ============================================

-- Create indexes for better RLS performance
CREATE INDEX IF NOT EXISTS idx_user_id ON "User"(id);
CREATE INDEX IF NOT EXISTS idx_order_user_id ON "Order"("userId");
CREATE INDEX IF NOT EXISTS idx_order_status ON "Order"(status);
CREATE INDEX IF NOT EXISTS idx_marketer_user_id ON "Marketer"("userId");
CREATE INDEX IF NOT EXISTS idx_marketer_status ON "Marketer"(status);
CREATE INDEX IF NOT EXISTS idx_lead_created_at ON "Lead"("createdAt");
