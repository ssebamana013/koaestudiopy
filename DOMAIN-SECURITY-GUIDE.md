# Domain Security Guide for KOA Estudio

## 🔒 Complete Security Checklist for Your Domain

This guide covers everything you need to secure your photography portal when deploying to production.

---

## 🌐 1. Domain & HTTPS Setup

### Purchase and Configure Domain

**Recommended Registrars:**
- **Namecheap** - Affordable, good support
- **Google Domains** - Simple, reliable
- **Cloudflare Registrar** - Best pricing, built-in security

### Enable HTTPS (SSL Certificate)

**✅ REQUIRED**: Your site MUST use HTTPS for security.

**Most hosting platforms provide free SSL:**
- **Netlify**: Automatic HTTPS (Let's Encrypt)
- **Vercel**: Automatic HTTPS (Let's Encrypt)
- **Cloudflare Pages**: Automatic HTTPS

**Manual Setup (if needed):**
1. Use [Let's Encrypt](https://letsencrypt.org/) - Free SSL
2. Or use your hosting provider's SSL option
3. Ensure auto-renewal is enabled

---

## 🛡️ 2. Cloudflare Security (Highly Recommended)

### Why Use Cloudflare?

✅ Free plan available
✅ DDoS protection
✅ SSL/TLS encryption
✅ Firewall rules
✅ Bot protection
✅ CDN (faster global access)
✅ Analytics

### Setup Cloudflare

1. **Sign up at [Cloudflare](https://www.cloudflare.com)**
2. **Add your domain**
3. **Update nameservers** at your registrar
4. **Enable these security features:**

#### Recommended Cloudflare Settings:

```yaml
SSL/TLS:
  Mode: Full (Strict)
  Always Use HTTPS: ✅ Enabled
  Minimum TLS Version: 1.2
  Automatic HTTPS Rewrites: ✅ Enabled

Security:
  Security Level: Medium or High
  Bot Fight Mode: ✅ Enabled
  Browser Integrity Check: ✅ Enabled
  Challenge Passage: 30 minutes

Firewall Rules:
  - Block traffic from known bad IPs
  - Rate limiting for API endpoints
  - Block traffic from suspicious countries (optional)

Speed:
  Auto Minify: ✅ JavaScript, CSS, HTML
  Brotli Compression: ✅ Enabled
  Early Hints: ✅ Enabled
```

---

## 🔐 3. Supabase Security Configuration

### Row Level Security (RLS)

**✅ ALREADY IMPLEMENTED** in your latest migration!

Your database is secured with:
- RLS enabled on all tables
- Admin-only access to sensitive data
- Client access restricted by access codes
- Order access restricted to order owners

### Additional Supabase Security Steps:

1. **Go to Supabase Dashboard**
2. **Settings → API**
3. **Verify these settings:**

```yaml
JWT Settings:
  JWT Expiry: 3600 seconds (1 hour)

API Settings:
  ✅ Enable RLS enforcement
  ✅ Use anon key for client (already in .env)
  ❌ Never expose service_role key to client

Email Settings:
  ✅ Enable email confirmations (optional for admin)
  ✅ Secure email templates
```

### Environment Variables Security

**CRITICAL**: Keep these secure!

```bash
# ✅ SAFE - Can be public (in frontend)
VITE_SUPABASE_URL=https://gjvikgrcvtkvcnojrtjf.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...

# ❌ DANGER - Never expose to frontend
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...  # Keep server-side only!
```

**Your current .env is safe** - only anon key is exposed, which is designed for client-side use.

---

## 🚀 4. Deployment Platform Security

### Option A: Netlify (Recommended)

1. **Deploy to Netlify:**
   ```bash
   # Install Netlify CLI
   npm install -g netlify-cli

   # Login
   netlify login

   # Deploy
   netlify deploy --prod
   ```

2. **Configure Security Headers:**

   Create `netlify.toml`:
   ```toml
   [[headers]]
     for = "/*"
     [headers.values]
       X-Frame-Options = "DENY"
       X-Content-Type-Options = "nosniff"
       X-XSS-Protection = "1; mode=block"
       Referrer-Policy = "strict-origin-when-cross-origin"
       Permissions-Policy = "geolocation=(), microphone=(), camera=()"
       Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://gjvikgrcvtkvcnojrtjf.supabase.co; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://gjvikgrcvtkvcnojrtjf.supabase.co wss://gjvikgrcvtkvcnojrtjf.supabase.co;"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

3. **Set Environment Variables:**
   - Go to Site Settings → Environment Variables
   - Add `VITE_SUPABASE_URL`
   - Add `VITE_SUPABASE_ANON_KEY`

### Option B: Vercel

1. **Deploy to Vercel:**
   ```bash
   # Install Vercel CLI
   npm install -g vercel

   # Login
   vercel login

   # Deploy
   vercel --prod
   ```

2. **Configure Security Headers:**

   Create `vercel.json`:
   ```json
   {
     "headers": [
       {
         "source": "/(.*)",
         "headers": [
           {
             "key": "X-Frame-Options",
             "value": "DENY"
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
           },
           {
             "key": "Permissions-Policy",
             "value": "geolocation=(), microphone=(), camera=()"
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

## 🔒 5. Application Security Headers

### Add Security Headers to Your App

Update `index.html` if needed:

```html
<meta http-equiv="Content-Security-Policy"
      content="default-src 'self';
               script-src 'self' 'unsafe-inline' 'unsafe-eval';
               style-src 'self' 'unsafe-inline';">
<meta http-equiv="X-Content-Type-Options" content="nosniff">
<meta http-equiv="X-Frame-Options" content="DENY">
<meta name="referrer" content="strict-origin-when-cross-origin">
```

---

## 🚨 6. Rate Limiting & DDoS Protection

### Cloudflare Rate Limiting (Free Plan)

Create rules to prevent abuse:

1. **Login Endpoint Protection:**
   ```
   Expression: (http.request.uri.path eq "/admin/login")
   Requests: 5 per 10 minutes per IP
   Action: Challenge or Block
   ```

2. **API Endpoint Protection:**
   ```
   Expression: (http.request.uri.path contains "/api/")
   Requests: 100 per minute per IP
   Action: Challenge
   ```

### Supabase Built-in Protection

Supabase already has:
- ✅ Rate limiting on auth endpoints
- ✅ Connection pooling
- ✅ DDoS protection
- ✅ Automatic scaling

---

## 🔑 7. Authentication Security

### Strong Password Policy

**Already configured** with Supabase defaults:
- Minimum 6 characters (recommend 12+ to admins)
- Configurable in Supabase Dashboard

### Additional Auth Security:

1. **Enable Email Verification (optional):**
   - Supabase Dashboard → Authentication → Settings
   - Enable "Confirm email"

2. **Session Management:**
   - Sessions expire after 1 hour (JWT expiry)
   - Auto-refresh handled by Supabase client
   - Logout properly clears all tokens

3. **Admin Account Protection:**
   - Use strong passwords (12+ characters)
   - Consider enabling 2FA (Supabase Pro plan)
   - Monitor login activity in Dashboard

---

## 🛡️ 8. Database Security

### ✅ Your Database is Already Secured!

From your latest migration:
- ✅ RLS enabled on all tables
- ✅ Admin-only policies for sensitive data
- ✅ Order access restricted to owners
- ✅ Event access controlled by access codes
- ✅ No public data exposure

### Regular Security Maintenance:

1. **Monitor Logs:**
   - Supabase Dashboard → Logs
   - Check for suspicious activity
   - Review failed login attempts

2. **Backup Database:**
   - Supabase Pro: Automatic daily backups
   - Free tier: Manual exports via Dashboard

3. **Update Dependencies:**
   ```bash
   npm audit
   npm audit fix
   npm update
   ```

---

## 🔍 9. Security Monitoring

### Set Up Monitoring

1. **Cloudflare Analytics:**
   - Monitor traffic patterns
   - Check for DDoS attempts
   - Review blocked requests

2. **Supabase Monitoring:**
   - Database performance
   - API usage
   - Authentication events

3. **Google Search Console:**
   - Monitor for security issues
   - Check for hacked content warnings
   - Verify domain ownership

---

## 🌍 10. Privacy & Compliance

### Privacy Policy

**Required for Paraguay and international clients:**

Create `src/pages/Privacy.tsx` with:
- What data you collect (emails, names, photos)
- How you use it (order fulfillment)
- How long you store it
- User rights (access, deletion)
- Contact information

### GDPR Considerations

Even though Paraguay isn't in EU:
- Be transparent about data collection
- Allow users to request data deletion
- Secure personal data properly
- Obtain consent for marketing emails

### Payment Security

If using Stripe:
- ✅ PCI-DSS compliant (Stripe handles this)
- ✅ No card data stored in your database
- ✅ Secure payment processing

---

## ✅ Complete Security Checklist

### Domain & Hosting
- [ ] Purchase domain from reputable registrar
- [ ] Enable HTTPS/SSL (automatic on Netlify/Vercel)
- [ ] Configure custom domain on hosting platform
- [ ] Set up Cloudflare (optional but recommended)

### Cloudflare Configuration
- [ ] Add domain to Cloudflare
- [ ] Update nameservers
- [ ] Enable "Always Use HTTPS"
- [ ] Set SSL mode to "Full (Strict)"
- [ ] Enable Bot Fight Mode
- [ ] Configure rate limiting rules

### Application Security
- [ ] Create `netlify.toml` or `vercel.json` with security headers
- [ ] Set environment variables on hosting platform
- [ ] Test HTTPS is working
- [ ] Verify all API calls use HTTPS

### Supabase Security
- [ ] Verify RLS is enabled on all tables
- [ ] Test that non-admin users can't access admin data
- [ ] Ensure service role key is not exposed
- [ ] Configure JWT expiry (1 hour recommended)

### Authentication
- [ ] Create strong admin password (12+ characters)
- [ ] Consider enabling email verification
- [ ] Monitor failed login attempts
- [ ] Document admin access procedures

### Monitoring & Maintenance
- [ ] Set up Cloudflare email alerts
- [ ] Monitor Supabase logs regularly
- [ ] Keep dependencies updated (`npm audit`)
- [ ] Create backup strategy

### Legal Compliance
- [ ] Create privacy policy
- [ ] Add terms of service
- [ ] Include contact information
- [ ] Comply with Paraguay data laws

---

## 🚀 Quick Start Deployment

### Option 1: Netlify (Easiest)

```bash
# 1. Build your app
npm run build

# 2. Install Netlify CLI
npm install -g netlify-cli

# 3. Login
netlify login

# 4. Deploy
netlify deploy --prod

# 5. Follow prompts to:
#    - Specify publish directory: dist
#    - Add environment variables in dashboard
#    - Configure custom domain
```

### Option 2: Vercel

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel --prod

# 4. Configure in dashboard:
#    - Add environment variables
#    - Set up custom domain
```

---

## 🆘 Security Incident Response

### If You Suspect a Breach:

1. **Immediate Actions:**
   - Change all admin passwords
   - Revoke suspicious sessions in Supabase
   - Check database logs for unauthorized access
   - Review recent orders for fraud

2. **Investigation:**
   - Check Cloudflare firewall events
   - Review Supabase auth logs
   - Examine failed login attempts
   - Look for unusual API activity

3. **Recovery:**
   - Restore from backup if needed
   - Notify affected users if personal data compromised
   - Update security measures
   - Document incident for future prevention

---

## 📞 Security Resources

**Supabase Security:**
- https://supabase.com/docs/guides/database/postgres/row-level-security
- https://supabase.com/docs/guides/auth/managing-user-data

**Cloudflare Security:**
- https://www.cloudflare.com/learning/security/
- https://support.cloudflare.com/hc/en-us/categories/200275218-Security

**Web Security:**
- https://owasp.org/www-project-web-security-testing-guide/
- https://observatory.mozilla.org/ (Test your security)

---

## 🎯 Summary: Most Important Steps

**Top 5 Must-Do Items:**

1. ✅ **Enable HTTPS** - Automatic on Netlify/Vercel
2. ✅ **Use Cloudflare** - Free DDoS & firewall protection
3. ✅ **Keep .env secure** - Never commit service role keys
4. ✅ **Monitor logs** - Check Supabase & Cloudflare regularly
5. ✅ **Strong passwords** - 12+ characters for admin accounts

**Your app is already well-secured thanks to:**
- Row Level Security (RLS) on database
- Supabase authentication
- Secure Supabase client configuration
- No sensitive data exposed to frontend

Follow this guide to deploy safely and maintain security over time!

---

**Questions?** Review this guide or check the linked resources for detailed security information.
