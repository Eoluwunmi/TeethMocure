# Teethmocure Production Deployment Guide

## Deployment Architecture

```
Domain: teethmocure.com
    │
    ├─ Frontend: Vercel/Netlify (React/Vite)
    │  └─ HTTPS only
    │  └─ Environment: production
    │
    ├─ Backend API: Heroku/Railway/Render (Express)
    │  └─ HTTPS only
    │  └─ Environment: production
    │  └─ Autoscaling enabled
    │
    └─ Database: Neon PostgreSQL
       └─ SSL/TLS enabled
       └─ Connection pooling: ON
       └─ Automated backups
       └─ Read replicas (optional)
```

---

## Prerequisites

- [ ] Production domain (e.g., teethmocure.com)
- [ ] SSL certificate (auto-provisioned by deployment platform)
- [ ] Production database (already: Neon PostgreSQL)
- [ ] Git repository (GitHub)
- [ ] Deployment platform account (Vercel + Render/Railway/Heroku)

---

## Step 1: Environment Configuration

### Backend Production Environment

Create `.env.production`:

```bash
# Database
DATABASE_URL=postgresql://neondb_owner:npg_eWlLnkb9Cjq0@ep-winter-butterfly-zaplx503-pooler.c-2.eu-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require

# Security (CHANGE THESE!)
JWT_SECRET=your-production-secret-key-min-32-chars-change-this-now-12345
NODE_ENV=production
PORT=3001

# CORS
CORS_ORIGIN=https://teethmocure.com

# Optional: Monitoring
SENTRY_DSN=https://your-sentry-key@sentry.io/project-id
LOG_LEVEL=info
```

### Frontend Production Environment

Create `.env.production`:

```bash
# API Configuration
VITE_API_URL=https://api.teethmocure.com

# Claude AI (same as development)
VITE_ANTHROPIC_API_KEY=sk-ant-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

# Analytics (optional)
VITE_ANALYTICS_ID=your-gtag-id
```

---

## Step 2: Frontend Deployment (Vercel)

### 2.1 Connect Repository

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy frontend
cd C:\Users\User\Desktop\TeethmoCure
vercel --prod
```

### 2.2 Configure Vercel Settings

In Vercel Dashboard:

1. **Project Settings → Environment Variables**
   ```
   VITE_API_URL = https://api.teethmocure.com
   VITE_ANTHROPIC_API_KEY = sk-ant-...
   ```

2. **Project Settings → Build & Development**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Project Settings → Domains**
   - Add custom domain: `teethmocure.com`
   - HTTPS: Auto-provisioned

4. **Project Settings → Git**
   - Production Branch: `main`
   - Auto-deploy: ON

### 2.3 Vercel Configuration File

Create `vercel.json`:

```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "env": {
    "VITE_API_URL": "@api_url",
    "VITE_ANTHROPIC_API_KEY": "@anthropic_key"
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "SAMEORIGIN"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    }
  ],
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

## Step 3: Backend Deployment (Render)

### 3.1 Create Render Service

1. Go to https://render.com
2. Click "New +" → "Web Service"
3. Connect GitHub repository
4. Configure:
   - **Name**: teethmocure-api
   - **Branch**: main
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
   - **Instance Type**: Standard (starter)
   - **Auto-deploy**: ON

### 3.2 Environment Variables

In Render Dashboard → Environment:

```
DATABASE_URL=postgresql://neondb_owner:...
JWT_SECRET=your-production-secret-min-32-chars
NODE_ENV=production
PORT=3001
CORS_ORIGIN=https://teethmocure.com
SENTRY_DSN=https://...@sentry.io/...
LOG_LEVEL=info
```

### 3.3 Custom Domain

In Render Dashboard → Settings:

- Add Custom Domain: `api.teethmocure.com`
- SSL: Auto-provisioned (HTTPS only)

### 3.4 Backend Render Configuration

Create `render.yaml`:

```yaml
services:
  - type: web
    name: teethmocure-api
    runtime: node
    buildCommand: npm run build
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 3001
      - key: DATABASE_URL
        sync: false
      - key: JWT_SECRET
        sync: false
      - key: CORS_ORIGIN
        value: https://teethmocure.com
```

---

## Step 4: Database Production Setup

### 4.1 Neon Configuration

In Neon Dashboard:

1. **Connection Pooling**
   - Enable: PgBouncer
   - Pool mode: Transaction
   - Reserve pool size: 5

2. **Backup**
   - Enable automated backups
   - Retention: 7 days

3. **Branches** (optional for staging)
   - Create "staging" branch for testing
   - Sync schema from main

### 4.2 Connection String

Use for backend:
```
postgresql://neondb_owner:password@ep-*.c-2.eu-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

### 4.3 Monitor Database

```bash
# Connect to production database
psql $DATABASE_URL

# Check RLS policies
SELECT schemaname, tablename, policyname 
FROM pg_policies;

# Check connections
SELECT count(*) FROM pg_stat_activity;

# Monitor slow queries
SELECT query, calls, total_time, mean_time 
FROM pg_stat_statements 
WHERE mean_time > 1000 
ORDER BY mean_time DESC;
```

---

## Step 5: Security Hardening

### 5.1 CORS Configuration

Update backend `src/app.ts`:

```typescript
import cors from 'cors';

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5174',
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
```

### 5.2 Security Headers

Add to `src/app.ts`:

```typescript
import helmet from 'helmet';

app.use(helmet());
app.use((req, res, next) => {
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  next();
});
```

### 5.3 Environment Variables

**NEVER commit:**
- `.env.production`
- `JWT_SECRET`
- `DATABASE_URL`

Use platform secrets instead:
- Vercel: Environment Variables (secret flag)
- Render: Environment Variables

### 5.4 Rate Limiting

Install and configure:

```bash
npm install express-rate-limit
```

Add to backend `src/app.ts`:

```typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

app.use('/api/', limiter);

// Stricter limit for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  skipSuccessfulRequests: true
});

app.post('/api/auth/login', authLimiter, ...);
app.post('/api/auth/register', authLimiter, ...);
```

---

## Step 6: Monitoring & Logging

### 6.1 Sentry Setup

```bash
npm install @sentry/node @sentry/tracing
```

Add to backend `src/server.ts`:

```typescript
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.errorHandler());
```

### 6.2 Database Monitoring

Set up Neon alerts:
- CPU usage > 80%
- Connections > 90% of max
- Query duration > 10s
- Replication lag > 1s

### 6.3 Logging

Use structured logging:

```bash
npm install winston
```

```typescript
import winston from 'winston';

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

// Usage
logger.info('Server started', { port: 3001 });
logger.error('Database error', { error: err });
```

---

## Step 7: CI/CD Pipeline

### GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Run tests
        run: npm test
      
      - name: TypeScript check
        run: npm run build

  deploy-frontend:
    needs: test
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Deploy to Vercel
        uses: vercel/action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          production: true

  deploy-backend:
    needs: test
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Deploy to Render
        run: |
          curl https://api.render.com/deploy/srv-${{ secrets.RENDER_SERVICE_ID }}?key=${{ secrets.RENDER_API_KEY }} -X POST
```

---

## Step 8: Database Migrations

### Automatic Migrations on Deploy

Update `src/server.ts`:

```typescript
import { prisma } from './lib/prisma';

async function runMigrations() {
  try {
    console.log('🔄 Running database migrations...');
    await prisma.$executeRawUnsafe(`SELECT 1`); // Test connection
    console.log('✅ Database connected');
    // Prisma auto-runs migrations
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

app.listen(PORT, async () => {
  await runMigrations();
  console.log(`🚀 Server running on port ${PORT}`);
});
```

---

## Step 9: SSL/TLS Certificates

### Automatic (Recommended)

Both Vercel and Render provide:
- ✅ Free SSL certificates
- ✅ Auto-renewal
- ✅ HTTPS enforced
- ✅ HTTP → HTTPS redirect

### Manual (Advanced)

If using custom platform:
```bash
# Generate certificate
certbot certonly --standalone -d teethmocure.com -d api.teethmocure.com

# Renew automatically
certbot renew --quiet --no-eff-email --agree-tos
```

---

## Step 10: Deployment Checklist

### Pre-Deployment
- [ ] All tests passing
- [ ] TypeScript builds without errors
- [ ] `.env.production` created (not committed)
- [ ] JWT_SECRET changed to secure value (32+ chars)
- [ ] Database backups configured
- [ ] RLS policies verified active
- [ ] Rate limiting configured
- [ ] CORS configured for production domain
- [ ] Monitoring setup (Sentry)

### Deployment Day
- [ ] Deploy frontend to Vercel
- [ ] Deploy backend to Render
- [ ] Verify database connection
- [ ] Test login/register flow
- [ ] Verify JWT tokens work
- [ ] Check RLS policies blocking unauthorized access
- [ ] Monitor error logs for issues
- [ ] Load test with 100 concurrent users

### Post-Deployment
- [ ] Monitor for 24 hours
- [ ] Check error tracking (Sentry)
- [ ] Verify database performance
- [ ] Test all API endpoints
- [ ] Backup production database
- [ ] Document deployment procedure

---

## Rollback Procedure

If issues occur:

```bash
# Vercel rollback
vercel rollback

# Render rollback
# Go to Render Dashboard → Deploys → Select previous → Redeploy

# Database rollback (if needed)
# Restore from Neon backup
neon branch restore <branch-id> <backup-id>
```

---

## Performance Optimization

### Frontend (Vercel)
- ✅ Automatic code splitting
- ✅ Image optimization
- ✅ CDN caching
- ✅ Edge functions (optional)

### Backend (Render)
- ✅ Horizontal scaling
- ✅ Load balancing
- ✅ Auto-scaling on CPU > 80%
- ✅ Connection pooling (Neon)

### Database (Neon)
- ✅ Connection pooling
- ✅ Query caching
- ✅ Read replicas (optional)
- ✅ Indexes optimized

---

## Cost Estimates (Monthly)

| Service | Plan | Cost |
|---------|------|------|
| Vercel | Pro | $20 |
| Render | Standard | $12 |
| Neon PostgreSQL | Growth | $50-200 |
| **Total** | | **$82-232** |

---

## Disaster Recovery Plan

### Backup Strategy
- ✅ Daily automated backups (Neon)
- ✅ 7-day retention
- ✅ Test restore monthly
- ✅ Store backup offline (optional)

### Incident Response
1. **Detect**: Sentry alerts + Neon monitoring
2. **Assess**: Check error logs
3. **Communicate**: Notify users if needed
4. **Fix**: Deploy hotfix or rollback
5. **Verify**: Full smoke test
6. **Document**: Post-mortem analysis

### Contact Info
- On-call: [Add team contact info]
- Escalation: [Add escalation contact]
- Status page: [Add status.teethmocure.com]

---

## Maintenance Schedule

### Daily
- Monitor error logs
- Check database performance
- Verify SSL certificate

### Weekly
- Review Sentry alerts
- Check API response times
- Backup verification

### Monthly
- Security audit
- Dependency updates
- Performance review

### Quarterly
- Load testing
- Disaster recovery drill
- Cost optimization

---

## Production Hotline

For urgent issues:
- Email: support@teethmocure.com
- Slack: #production-alerts
- On-call: [Phone number]
- Status: status.teethmocure.com

---

## Additional Resources

- Vercel Docs: https://vercel.com/docs
- Render Docs: https://render.com/docs
- Neon Docs: https://neon.tech/docs
- Sentry Setup: https://docs.sentry.io/platforms/node/

---

**Document Version**: 1.0  
**Last Updated**: August 8, 2026  
**Status**: Ready for Implementation
