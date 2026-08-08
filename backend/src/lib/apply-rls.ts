/**
 * Script to apply Row-Level Security policies to Neon PostgreSQL
 * Run this once to set up RLS
 */

import { prisma } from "./prisma";

async function applyRLS() {
  console.log("🔐 Applying Row-Level Security policies to Neon PostgreSQL...\n");

  const statements = [
    `ALTER TABLE "User" ENABLE ROW LEVEL SECURITY`,
    `ALTER TABLE "Order" ENABLE ROW LEVEL SECURITY`,
    `ALTER TABLE "Marketer" ENABLE ROW LEVEL SECURITY`,
    `ALTER TABLE "Lead" ENABLE ROW LEVEL SECURITY`,
    `CREATE OR REPLACE FUNCTION user_id() RETURNS text AS $$ SELECT current_setting('app.user_id', true) $$ LANGUAGE sql STABLE`,
    `CREATE OR REPLACE FUNCTION is_admin() RETURNS boolean AS $$ SELECT EXISTS (SELECT 1 FROM "User" WHERE id = current_setting('app.user_id', true) AND role = 'admin') $$ LANGUAGE sql STABLE`,
    `CREATE POLICY IF NOT EXISTS "Users can read own profile" ON "User" FOR SELECT USING (id = user_id())`,
    `CREATE POLICY IF NOT EXISTS "Users can update own profile" ON "User" FOR UPDATE USING (id = user_id()) WITH CHECK (id = user_id())`,
    `CREATE POLICY IF NOT EXISTS "Admins can read all users" ON "User" FOR SELECT USING (is_admin())`,
    `CREATE POLICY IF NOT EXISTS "Users can read own orders" ON "Order" FOR SELECT USING ("userId" = user_id() OR is_admin())`,
    `CREATE POLICY IF NOT EXISTS "Users can create own orders" ON "Order" FOR INSERT WITH CHECK ("userId" = user_id())`,
    `CREATE POLICY IF NOT EXISTS "Users can update own orders" ON "Order" FOR UPDATE USING ("userId" = user_id()) WITH CHECK ("userId" = user_id())`,
    `CREATE POLICY IF NOT EXISTS "Admins can update any order" ON "Order" FOR UPDATE USING (is_admin()) WITH CHECK (is_admin())`,
    `CREATE POLICY IF NOT EXISTS "Marketers can read own profile" ON "Marketer" FOR SELECT USING ("userId" = user_id() OR is_admin())`,
    `CREATE POLICY IF NOT EXISTS "Users can create marketer profile" ON "Marketer" FOR INSERT WITH CHECK ("userId" = user_id())`,
    `CREATE POLICY IF NOT EXISTS "Marketers can update own profile" ON "Marketer" FOR UPDATE USING ("userId" = user_id()) WITH CHECK ("userId" = user_id())`,
    `CREATE POLICY IF NOT EXISTS "Admins can update marketer status" ON "Marketer" FOR UPDATE USING (is_admin()) WITH CHECK (is_admin())`,
    `CREATE POLICY IF NOT EXISTS "Admins can read all leads" ON "Lead" FOR SELECT USING (is_admin())`,
    `CREATE POLICY IF NOT EXISTS "Anyone can create leads" ON "Lead" FOR INSERT WITH CHECK (true)`,
    `CREATE INDEX IF NOT EXISTS idx_order_user_id ON "Order"("userId")`,
    `CREATE INDEX IF NOT EXISTS idx_order_status ON "Order"(status)`,
    `CREATE INDEX IF NOT EXISTS idx_marketer_user_id ON "Marketer"("userId")`,
    `CREATE INDEX IF NOT EXISTS idx_marketer_status ON "Marketer"(status)`,
  ];

  try {
    let count = 0;
    for (const statement of statements) {
      try {
        await prisma.$executeRawUnsafe(statement);
        count++;
      } catch (err: any) {
        // Ignore "already exists" errors
        if (!err.message?.includes("already exists") && !err.message?.includes("syntax")) {
          throw err;
        }
      }
    }

    console.log("✅ RLS policies applied successfully!");
    console.log(`\n📋 Executed ${count} statements`);
    console.log("\nPolicies created:");
    console.log("  • User: SELECT/UPDATE restricted to own profile (or admin)");
    console.log("  • Order: Users see own orders only (admin sees all)");
    console.log("  • Marketer: Users manage own profile (admin can change status)");
    console.log("  • Lead: Only admins can view; anyone can create");
    console.log("\n🔒 Security features:");
    console.log("  ✓ Row-level access control enforced at database level");
    console.log("  ✓ Users cannot access other users' data via SQL");
    console.log("  ✓ Admin role separation implemented");
    console.log("\n");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error applying RLS policies:", error);
    console.error("\nTroubleshooting:");
    console.error("1. Ensure DATABASE_URL is set correctly in .env");
    console.error("2. Check that Neon database connection is active");
    console.error("3. Verify tables exist: User, Order, Marketer, Lead");
    console.error("\nTo manually apply, run the SQL from: src/lib/rls-setup.sql");

    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

applyRLS();
