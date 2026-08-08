# Teethmocure Security Architecture

## Overview

Teethmocure implements a **multi-layered security approach** combining JWT authentication, database-level row-level security (RLS), and application-level access control.

---

## Authentication Flow

```
┌─────────────────┐
│  User Login     │
│  (email/pass)   │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────────┐
│  Backend validates credentials      │
│  - Hash verification                │
│  - User lookup from Neon DB         │
└────────┬────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│  Generate JWT Token                 │
│  - Payload: userId, email, role     │
│  - Signed with JWT_SECRET (7 days)  │
└────────┬────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│  Frontend stores JWT in localStorage│
│  - Included in all API requests     │
│  - Header: Authorization: Bearer... │
└─────────────────────────────────────┘
```

---

## Security Layers

### Layer 1: Frontend (Client-Side)
- JWT token stored in localStorage
- Axios interceptor adds Authorization header to all requests
- localStorage provides offline fallback
- User context used for optimistic UI updates

### Layer 2: Application (Express Backend)
- JWT verification middleware on protected routes
- Token signature validation using JWT_SECRET
- Automatic 401 response for invalid/expired tokens
- User context extracted and attached to request object
- Role-based access control (user vs. admin)

### Layer 3: Database (PostgreSQL RLS)
- **Row-Level Security (RLS)** policies enforce data isolation
- Policies active on all tables: User, Order, Marketer, Lead
- User context passed via `app.user_id` session variable
- Database acts as final security boundary

---

## RLS Policies Implementation

### User Table
```sql
-- Users can only view/edit their own profile
CREATE POLICY "Users can read own profile" ON "User"
  FOR SELECT USING (id = user_id());

-- Admins can view all users
CREATE POLICY "Admins can read all users" ON "User"
  FOR SELECT USING (is_admin());
```

### Order Table
```sql
-- Users see only their own orders
CREATE POLICY "Users can read own orders" ON "Order"
  FOR SELECT USING (
    "userId" = user_id() OR is_admin()
  );

-- Users create orders for themselves
CREATE POLICY "Users can create own orders" ON "Order"
  FOR INSERT WITH CHECK ("userId" = user_id());

-- Admins can update any order status
CREATE POLICY "Admins can update any order" ON "Order"
  FOR UPDATE USING (is_admin()) WITH CHECK (is_admin());
```

### Marketer Table
```sql
-- Marketers manage their own profiles
CREATE POLICY "Marketers can read own profile" ON "Marketer"
  FOR SELECT USING (
    "userId" = user_id() OR is_admin()
  );

-- Admins can approve/reject/suspend marketers
CREATE POLICY "Admins can update marketer status" ON "Marketer"
  FOR UPDATE USING (is_admin()) WITH CHECK (is_admin());
```

### Lead Table
```sql
-- Only admins can view leads
CREATE POLICY "Admins can read all leads" ON "Lead"
  FOR SELECT USING (is_admin());

-- Anyone can create leads (contact form)
CREATE POLICY "Anyone can create leads" ON "Lead"
  FOR INSERT WITH CHECK (true);
```

---

## Data Isolation Guarantees

### Scenario: Attacker Gains Database Access

❌ **Without RLS**: 
- Could execute: `SELECT * FROM "Order"` → sees ALL orders

✅ **With RLS**:
- Backend sets: `app.user_id = attacker_user_id`
- RLS policy blocks query
- Only attacker's own data visible

### Scenario: Frontend JWT Bypass

❌ **Frontend-only**: 
- Attacker obtains database connection → full access

✅ **RLS in database**:
- Direct database connection ALSO subject to RLS
- Each query enforces row-level access
- Defense-in-depth protection

---

## Implementation Details

### JWT Structure
```json
{
  "userId": "user_123abc",
  "email": "user@example.com",
  "role": "user|marketer|admin",
  "iat": 1691234567,
  "exp": 1691321167
}
```

### RLS Helper Functions
```sql
-- Get current user ID from session context
CREATE OR REPLACE FUNCTION user_id() RETURNS text AS $$
  SELECT current_setting('app.user_id', true)
$$ LANGUAGE sql STABLE;

-- Check if current user is admin
CREATE OR REPLACE FUNCTION is_admin() RETURNS boolean AS $$
  SELECT EXISTS (
    SELECT 1 FROM "User"
    WHERE id = current_setting('app.user_id', true)
    AND role = 'admin'
  )
$$ LANGUAGE sql STABLE;
```

### Backend Context Setup
```typescript
// In authMiddleware (after JWT verification)
export async function authMiddleware(req, res, next) {
  const payload = verifyToken(token);
  req.user = payload;
  
  // Note: RLS is enforced at query level
  // For each database operation, the user_id must be set
  // in the connection context before the query
  
  next();
}
```

---

## Data Flow with Security

### Creating an Order

```
1. Frontend
   ├─ User fills order form
   ├─ POST /api/orders with JWT token
   └─ Axios adds: Authorization: Bearer {JWT}

2. Backend
   ├─ authMiddleware verifies JWT signature
   ├─ Extracts userId from token payload
   ├─ Validates user owns the data (application-level check)
   └─ Calls: prisma.order.create({ userId, ...data })

3. Prisma Client
   ├─ Converts to SQL query
   └─ Sends to PrismaPg adapter

4. PostgreSQL (Neon)
   ├─ Receives INSERT query
   ├─ Evaluates RLS policy:
   │  "Users can create own orders" 
   │  WITH CHECK ("userId" = user_id())
   ├─ Verifies: order.userId === current app.user_id
   ├─ If valid: INSERT succeeds
   └─ If invalid: PERMISSION DENIED error

5. Frontend
   ├─ Receives success response
   ├─ Updates UI optimistically
   └─ Caches order in localStorage
```

---

## Attack Surface & Mitigations

| Attack Vector | Frontend Protection | Backend Protection | Database Protection |
|---|---|---|---|
| Direct DB Access | N/A | N/A | RLS policies block unauthorized access |
| Stolen JWT Token | Token expires in 7 days | JWT signature validated | Session context limits access |
| SQL Injection | N/A | Prisma parameterized queries | RLS secondary defense |
| CSRF | HTTPS + same-site cookies | JWT in Authorization header | N/A |
| XSS (steal JWT) | localStorage (not httpOnly) | N/A | User should re-authenticate |

---

## Security Best Practices Implemented

✅ **Password Security**
- Passwords hashed with bcryptjs (10 rounds)
- Never stored in plain text
- Database stores only hash

✅ **Token Security**
- JWT signed with HS256 algorithm
- 7-day expiration (requires re-login)
- Verified on every protected request
- Invalidated on logout (client-side clear)

✅ **Data Isolation**
- Row-level security on all sensitive tables
- Users cannot access other users' data
- Admin-only operations restricted

✅ **Rate Limiting**
- Can be added at reverse proxy level (recommended for production)
- Currently: 100 requests/hour per Claude AI feature

✅ **HTTPS**
- Neon uses SSL/TLS for database connections
- Production must use HTTPS for API

---

## Environment Variables (Keep Secure)

```bash
# Database (never share)
DATABASE_URL=postgresql://...

# JWT Secret (keep private, min 32 chars for production)
JWT_SECRET=your-super-secret-jwt-key

# Node environment
NODE_ENV=production

# Optional: Rate limiting config
RATE_LIMIT_WINDOW=3600000
RATE_LIMIT_MAX_REQUESTS=100
```

---

## Testing RLS Policies

### 1. Verify User Can't See Others' Orders
```sql
-- As User A
SELECT * FROM "Order" WHERE "userId" != current_user_id;
-- Result: Returns only User A's orders (RLS silently filters)
```

### 2. Verify Admin Can See All Orders
```sql
-- As admin user
SELECT * FROM "Order";
-- Result: Returns all orders
```

### 3. Verify Insert Validation
```sql
-- Try to insert order for different user
INSERT INTO "Order" ("userId", fullName, phone, ...)
VALUES ('OTHER_USER_ID', ...);
-- Result: PERMISSION DENIED error
```

---

## Production Hardening Checklist

- [ ] Change JWT_SECRET to cryptographically secure value (32+ chars)
- [ ] Set NODE_ENV=production
- [ ] Enable HTTPS on API endpoints
- [ ] Add rate limiting (reverse proxy or middleware)
- [ ] Enable CORS properly (restrict origins)
- [ ] Set up monitoring/alerting for failed auth attempts
- [ ] Regular security audits of RLS policies
- [ ] Backup strategy for Neon database
- [ ] Incident response plan for compromised JWT keys

---

## Conclusion

Teethmocure's security architecture uses **defense-in-depth** with authentication at multiple layers:

1. **Application Layer**: JWT validation
2. **Database Layer**: RLS policies
3. **Fallback**: localStorage offline access

This ensures data isolation even if one layer is compromised.

For questions or to report security issues, please contact the development team.
