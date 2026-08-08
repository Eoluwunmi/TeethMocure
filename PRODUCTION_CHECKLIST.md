# Production Deployment Checklist

## Pre-Deployment (1 week before)

### Code Quality
- [ ] All tests passing locally
- [ ] TypeScript strict mode no errors
- [ ] No console.log statements (use logger)
- [ ] No TODO/FIXME comments in production code
- [ ] All dependencies up to date
- [ ] Security audit: `npm audit`
- [ ] Code review completed
- [ ] Linting passes: `npm run lint`

### Documentation
- [ ] README.md up to date
- [ ] API documentation complete
- [ ] Deployment guide reviewed
- [ ] Runbooks created for common issues
- [ ] Team trained on new features
- [ ] Status page created (optional)

### Database
- [ ] RLS policies verified
- [ ] Indexes created and tested
- [ ] Backup strategy configured
- [ ] Restore procedure tested
- [ ] Migration tested on staging database
- [ ] Connection pooling configured
- [ ] Slow query log reviewed

### Frontend
- [ ] Build succeeds: `npm run build`
- [ ] Bundle size analyzed
- [ ] Performance metrics < 3s LCP
- [ ] All environment variables documented
- [ ] Meta tags optimized
- [ ] Error boundaries added
- [ ] Offline mode tested

### Backend
- [ ] Build succeeds: `npm run build`
- [ ] All endpoints tested
- [ ] JWT token expiration tested
- [ ] CORS configured correctly
- [ ] Rate limiting configured
- [ ] Error handling complete
- [ ] Logging configured
- [ ] Health check endpoint ready

---

## Deployment Day (Friday AM recommended)

### 1 Hour Before Deployment

- [ ] Team on-call configured
- [ ] Incident response channel ready
- [ ] Rollback procedure reviewed
- [ ] Database backup created
- [ ] All team members notified
- [ ] Status page updated
- [ ] Monitoring dashboards open

### Deployment - Frontend (Vercel)

- [ ] Environment variables set in Vercel dashboard
- [ ] Build pipeline configured
- [ ] GitHub connection verified
- [ ] Deploy from main branch
- [ ] Deployment completes without errors
- [ ] Vercel URL working
- [ ] Custom domain pointing correctly
- [ ] HTTPS certificate valid

### Deployment - Backend (Render)

- [ ] Environment variables set in Render dashboard
- [ ] GitHub connection verified
- [ ] Database URL configured
- [ ] Build command correct: `npm run build`
- [ ] Start command correct: `npm start`
- [ ] Deploy from main branch
- [ ] Deployment completes without errors
- [ ] Health check endpoint responding (/health)
- [ ] Logs show successful startup

### Smoke Tests (15-30 minutes)

**Frontend:**
- [ ] Homepage loads in < 2s
- [ ] CSS styles applied correctly
- [ ] Images load properly
- [ ] No console errors
- [ ] Navigation works

**API:**
- [ ] Health check responds: `curl https://api.teethmocure.com/health`
- [ ] Register endpoint works
- [ ] Login endpoint works
- [ ] JWT token generated successfully
- [ ] Order creation works
- [ ] Database queries responding < 100ms

**Integration:**
- [ ] Frontend connects to backend
- [ ] JWT stored in localStorage
- [ ] User authentication flow complete
- [ ] Order appears in database
- [ ] RLS policies blocking unauthorized access
- [ ] Admin endpoints restricted to admins

**Claude AI:**
- [ ] Chat widget loads
- [ ] API requests to Anthropic working
- [ ] Responses displaying correctly

---

## Post-Deployment (First 24 hours)

### Immediate (30 minutes)
- [ ] Monitor error tracking (Sentry)
- [ ] Check server logs for errors
- [ ] Verify database connections stable
- [ ] Check API response times
- [ ] Monitor CPU/memory usage
- [ ] Verify SSL certificate active

### Hour 1-2
- [ ] Test with real users if available
- [ ] Monitor error rate
- [ ] Check database query performance
- [ ] Verify backups completed
- [ ] Test all user flows
- [ ] Monitor API rate limiting

### Hour 2-8
- [ ] Continue monitoring errors
- [ ] Check for memory leaks
- [ ] Verify caching working
- [ ] Test edge cases
- [ ] Monitor third-party services (Anthropic)
- [ ] Verify email notifications working

### Hour 8-24
- [ ] Daily backup verification
- [ ] Analyze performance metrics
- [ ] Review error logs for patterns
- [ ] Test rollback procedure (don't execute)
- [ ] User feedback collection
- [ ] Incident log review

---

## Monitoring Setup

### Metrics to Track

**Frontend:**
- [ ] Page load time (LCP, FCP, CLS)
- [ ] JavaScript errors
- [ ] API response times
- [ ] User session count
- [ ] Error rate

**Backend:**
- [ ] API response time (p50, p95, p99)
- [ ] Request count per endpoint
- [ ] Database query time
- [ ] Error rate by endpoint
- [ ] JWT validation success rate

**Database:**
- [ ] Connection count
- [ ] Query duration
- [ ] Replication lag (if applicable)
- [ ] CPU usage
- [ ] Disk usage

### Alert Thresholds

Configure alerts for:
- [ ] API response time > 1000ms
- [ ] Error rate > 1%
- [ ] Database connections > 80%
- [ ] CPU usage > 80%
- [ ] Disk usage > 90%
- [ ] JWT failures > 5/min
- [ ] Failed authentications > 10/hour

---

## First Week After Deployment

### Daily Checks
- [ ] Error logs reviewed
- [ ] Performance metrics normal
- [ ] Database backups successful
- [ ] No unusual database queries
- [ ] User feedback monitored
- [ ] Security logs reviewed

### Weekly Review
- [ ] Performance baseline established
- [ ] Cost analysis (Vercel, Render, Neon)
- [ ] User feedback aggregated
- [ ] Bug reports triaged
- [ ] Deployment documented
- [ ] Post-mortem written (if issues found)

### Team Debrief
- [ ] What went well?
- [ ] What could be improved?
- [ ] Any incidents or issues?
- [ ] Performance vs. expectations?
- [ ] Next steps and improvements?

---

## Rollback Procedure

If critical issues occur:

### Frontend Rollback (Vercel)
```bash
# Option 1: Use Vercel dashboard
# Go to Deployments → Select previous → Redeploy

# Option 2: Use Vercel CLI
vercel rollback
```

### Backend Rollback (Render)
```bash
# Go to Render dashboard
# Select "Deploys" → Previous deployment → Redeploy
```

### Database Rollback (if needed)
```bash
# Use Neon backup
# In Neon console: Backups → Select backup → Restore
```

### Trigger Rollback When:
- [ ] > 10% error rate for 5 minutes
- [ ] API response time > 5 seconds
- [ ] Database connection failures
- [ ] Security incident detected
- [ ] Data corruption detected
- [ ] Critical feature broken

---

## Post-Incident

### If Rollback Occurred

1. **Immediate**
   - [ ] Verify rollback successful
   - [ ] Confirm error rate normalized
   - [ ] Notify stakeholders
   - [ ] Monitor for 1 hour

2. **Investigation**
   - [ ] Root cause analysis
   - [ ] Error logs reviewed
   - [ ] Code diff analyzed
   - [ ] Database state checked

3. **Fix & Retry**
   - [ ] Fix identified issues
   - [ ] Local testing
   - [ ] Code review
   - [ ] Staging deployment
   - [ ] Smoke tests
   - [ ] Re-deploy to production

4. **Documentation**
   - [ ] Post-mortem written
   - [ ] Preventive measures identified
   - [ ] Team trained on prevention
   - [ ] Monitoring rules updated

---

## Success Criteria

Deployment is successful if after 24 hours:

- [ ] Error rate < 0.5%
- [ ] API response time p95 < 500ms
- [ ] Database queries p95 < 100ms
- [ ] Zero critical bugs reported
- [ ] All features working as expected
- [ ] No security incidents
- [ ] Zero data corruption
- [ ] Backups verified

---

## Emergency Contacts

| Role | Name | Phone | Email |
|------|------|-------|-------|
| Lead DevOps | - | - | - |
| Database Admin | - | - | - |
| Backend Lead | - | - | - |
| Frontend Lead | - | - | - |
| Security Officer | - | - | - |

---

## Sign-Off

- [ ] Frontend Lead: _________________ Date: _______
- [ ] Backend Lead: _________________ Date: _______
- [ ] DevOps/Infra: _________________ Date: _______
- [ ] QA: _________________ Date: _______

---

**Deployment Date**: ___________  
**Deployed By**: ___________  
**Approved By**: ___________  
**Status**: [ ] Success [ ] Rolled Back [ ] Partial

---

## Notes

```
[Add any notes, issues, or observations here]



```
