# Security Guide: API Keys & Sensitive Data

## 🔐 Critical: API Key Protection

Your Anthropic API key is like a password to your Claude AI account. **Never commit it to Git.**

### ✅ Safe Practices

1. **Local Development**
   ```bash
   # 1. Add .env to .gitignore (already done ✓)
   # 2. Create .env file with your key (local only)
   echo "ANTHROPIC_API_KEY=sk-ant-..." > .env
   
   # 3. Load .env in your code
   import.meta.env.ANTHROPIC_API_KEY
   ```

2. **Verify .gitignore Works**
   ```bash
   # Check if .env would be ignored
   git check-ignore .env
   # Should output: .env
   
   # See what Git tracks
   git status
   # Should NOT show .env
   ```

3. **Before First Commit**
   ```bash
   # Check Git hasn't already tracked .env
   git ls-files | grep .env
   # Should return nothing
   
   # If .env is already tracked, remove it:
   git rm --cached .env
   git commit -m "Remove .env from tracking"
   ```

### ❌ Never Do These

- ❌ Commit `.env` file to Git
- ❌ Push API keys to GitHub/GitLab
- ❌ Share keys in chat, emails, or Slack
- ❌ Hardcode keys in source code
- ❌ Add keys to Git history (even in old commits)
- ❌ Use same key for dev/prod/staging

### 🚨 If You Accidentally Exposed Your Key

1. **Immediately revoke it**
   - Go to https://console.anthropic.com/account/keys
   - Delete the compromised key
   - Create a new key
   - Update your `.env` file

2. **Remove from Git history** (if committed)
   ```bash
   # Install BFG Repo Cleaner
   # (Advanced: use only if key was committed)
   # Contact security team for guidance
   ```

---

## Environment Management

### Development (.env)
```
ANTHROPIC_API_KEY=sk-ant-xxxxxxx (your test key)
VITE_ENV=development
VITE_LOG_LEVEL=debug
```

### Staging (.env.staging)
```
ANTHROPIC_API_KEY=sk-ant-yyyyyyy (staging key, different from dev)
VITE_ENV=staging
```

### Production (.env.production)
```
# NEVER store in .env file
# Use server environment variables only (see below)
```

---

## Production Deployment

### ✅ Use Environment Variables (NOT .env files)

**For Vercel/Netlify/Similar Platforms:**
1. Go to project settings → Environment Variables
2. Add `ANTHROPIC_API_KEY=sk-ant-...`
3. Redeploy
4. App reads from `process.env.ANTHROPIC_API_KEY`

**For Base44/Custom Server:**
```bash
# Set via environment (not in .env file)
export ANTHROPIC_API_KEY=sk-ant-...
npm run start
```

**For Docker:**
```dockerfile
# Dockerfile (safe - no secrets)
FROM node:18
WORKDIR /app
COPY . .
RUN npm install

# Pass secret at runtime, not build time
CMD ["npm", "start"]
```

```bash
# Deploy with secret
docker run -e ANTHROPIC_API_KEY=sk-ant-... myapp
```

---

## Monitoring & Rotation

### Weekly Checklist
- [ ] `.env` is in `.gitignore`
- [ ] No API keys in Git history
- [ ] `git status` doesn't show `.env`
- [ ] `.env.example` is up to date (without real keys)

### Monthly
- [ ] Review API key usage (console.anthropic.com)
- [ ] Check for unusual activity
- [ ] Rotate old keys (create new, retire old)

### Quarterly
- [ ] Update `.env.example` with new variables
- [ ] Audit all production secrets
- [ ] Review team access

---

## Team Access

### Sharing Environment Variables Securely

**❌ NEVER do this:**
- Slack messages with keys
- Email attachments
- Shared documents with keys
- GitHub issues/PRs

**✅ SAFE ways:**

1. **Use 1Password / LastPass / Bitwarden**
   - Store in team vault
   - Share encrypted link
   - Team members retrieve independently

2. **Use AWS Secrets Manager / Google Secret Manager**
   ```bash
   # Retrieve at runtime
   aws secretsmanager get-secret-value --secret-id prod/anthropic-key
   ```

3. **Use HashiCorp Vault**
   - Enterprise secret management
   - Audit all access
   - Auto-rotate keys

---

## Code Review Checklist

Before merging any PR:
- [ ] No `.env` files added/modified
- [ ] No hardcoded API keys in code
- [ ] No secrets in comments
- [ ] `.env.example` matches new requirements
- [ ] `.gitignore` includes all sensitive files

---

## Accidental Exposure Response

### Step 1: Immediate (first 5 minutes)
1. Revoke compromised key at console.anthropic.com
2. Create new key
3. Update `.env` locally
4. Notify team

### Step 2: Investigation (within 1 hour)
1. Check API usage logs for unauthorized requests
2. Review Git history for key exposure
3. Check GitHub/GitLab for any pushes with key

### Step 3: Cleanup (same day)
1. If key was in Git history, consider repo cleanup
2. Update all deployment environments with new key
3. Document incident

### Step 4: Prevention (next sprint)
1. Add pre-commit hook to prevent .env commits
2. Use secret scanning tool on CI/CD
3. Update team security training

---

## Pre-Commit Hook (Optional but Recommended)

Create `.git/hooks/pre-commit`:

```bash
#!/bin/bash

# Prevent committing .env files
if git diff --cached --name-only | grep -E "\.env|\.key|secret"; then
  echo "❌ ERROR: You're about to commit a sensitive file!"
  echo "Files detected:"
  git diff --cached --name-only | grep -E "\.env|\.key|secret"
  echo ""
  echo "✅ Solution:"
  echo "  1. Remove from staging: git reset HEAD <filename>"
  echo "  2. Add to .gitignore: echo '.env' >> .gitignore"
  echo "  3. Try commit again"
  exit 1
fi

exit 0
```

Make it executable:
```bash
chmod +x .git/hooks/pre-commit
```

---

## Useful Commands

```bash
# Check if .env would be ignored
git check-ignore .env

# See all Git-ignored files
git status --ignored

# See what's currently tracked
git ls-files

# Remove .env from Git tracking (if accidentally added)
git rm --cached .env

# Check recent commits for secrets (GitHub tool)
# Use: git-secrets (https://github.com/awslabs/git-secrets)
git secrets --scan

# Find API keys in code (using ripgrep)
rg "sk-ant-|ANTHROPIC_API_KEY" --no-ignore
```

---

## Summary

✅ **Your Setup is Secure** (with .gitignore & .env.example in place)

**Next steps:**
1. Verify `.gitignore` is working: `git check-ignore .env`
2. Update your `.env` with real API key
3. Use `.env.example` as template for team
4. Never commit `.env` file
5. Use secure secret management for production

**Questions?** Review Anthropic's security docs: https://docs.anthropic.com/getting-started/integration-overview

---

**Last Updated**: 2026-08-08  
**Security Level**: 🟢 Production-Ready
