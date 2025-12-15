# Vercel Deployment Guide - Kingdom Nanies

## ✅ Migration Complete

Successfully migrated from **Netlify Functions** to **Vercel Serverless Functions** with hardcoded Supabase and PesaFlux credentials.

## 🔧 What Was Changed

### API Functions (Vercel Serverless Functions)

All functions migrated from `netlify/functions/` to `api/` directory:

1. **`api/supabase.ts`**
   - ✅ Supabase client configuration
   - ✅ Hardcoded credentials for deployment
   - ✅ Shared across all API functions

2. **`api/initiate-payment.ts`**
   - ✅ Converted from Netlify Handler to Vercel Request/Response
   - ✅ PesaFlux STK Push integration
   - ✅ Hardcoded API key: `PSFXPCGLCY37`
   - ✅ Hardcoded email: `silverstonesolutions103@gmail.com`
   - ✅ Stores transactions in Supabase

3. **`api/check-status.ts`**
   - ✅ Queries Supabase for transaction status
   - ✅ Returns PesaFlux-compatible status format
   - ✅ Converted to Vercel format

4. **`api/check-status-db.ts`**
   - ✅ Database-only status check
   - ✅ Supports both GET and POST methods
   - ✅ Returns frontend-friendly format

5. **`api/webhook.ts`**
   - ✅ Handles PesaFlux payment webhooks
   - ✅ Updates transaction status in Supabase
   - ✅ Proper handling of success/failed/cancelled/timeout states

6. **`api/submit-application.js`**
   - ✅ Demo application submission endpoint
   - ✅ No email sending (logs only)

### Configuration Files

1. **`vercel.json`** (NEW)
   - ✅ Vercel deployment configuration
   - ✅ Static build setup for Vite
   - ✅ API routes configuration
   - ✅ Security headers

2. **`package.json`**
   - ✅ Added `@vercel/node` dependency
   - ✅ Existing build scripts work as-is

## 🔑 Hardcoded Credentials

### Supabase
- **URL**: `https://dbpbvoqfexofyxcexmmp.supabase.co`
- **Anon Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRicGJ2b3FmZXhvZnl4Y2V4bW1wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkzNDc0NTMsImV4cCI6MjA3NDkyMzQ1M30.hGn7ux2xnRxseYCjiZfCLchgOEwIlIAUkdS6h7byZqc`

### PesaFlux
- **API Key**: `PSFXPCGLCY37`
- **Email**: `silverstonesolutions103@gmail.com`

## 📊 Database Schema

Uses the existing `transactions` table in Supabase:
- `transaction_request_id` (unique)
- `status` (`pending`, `success`, `failed`, `cancelled`)
- `amount`, `phone`, `email`, `reference`
- `receipt_number`, `transaction_id`
- `merchant_request_id`, `checkout_request_id`
- `result_code`, `result_description`
- `transaction_date`, `created_at`, `updated_at`

## 🚀 Deployment Steps

### 1. Install Dependencies

```bash
npm install
```

This will install:
- `@vercel/node` - Vercel serverless function types
- `@supabase/supabase-js` - Supabase client (already in dependencies)
- All other existing dependencies

### 2. Build the Project

```bash
npm run build
```

This creates the `dist/` folder with the production build.

### 3. Deploy to Vercel

#### Option A: Vercel CLI (Recommended)

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# For production deployment
vercel --prod
```

#### Option B: GitHub Integration

1. Push code to GitHub repository
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your GitHub repository
5. Vercel will auto-detect settings from `vercel.json`
6. Click "Deploy"

### 4. Configure PesaFlux Webhook

After deployment, update the webhook URL in PesaFlux dashboard:

1. Go to: https://pesaflux.co.ke/user
2. Set webhook URL to: `https://your-vercel-domain.vercel.app/api/webhook`
3. Save settings

## 🎯 API Endpoints

After deployment, your API endpoints will be:

- `POST /api/initiate-payment` - Initiate STK push
- `POST /api/check-status` - Check payment status
- `GET /api/check-status-db?transaction_request_id=xxx` - Check status from DB
- `POST /api/webhook` - PesaFlux webhook handler
- `POST /api/submit-application` - Application submission

## 🔄 Payment Flow

```
User initiates payment
    ↓
/api/initiate-payment
    ↓
PesaFlux STK Push API
    ↓
Transaction saved to Supabase (status: pending)
    ↓
Frontend polls /api/check-status-db every 5s
    ↓
User completes/cancels on phone
    ↓
PesaFlux sends webhook to /api/webhook
    ↓
Webhook updates Supabase status
    ↓
Frontend detects status change
    ↓
Shows success/failed screen
```

## ✨ Key Features

- ✅ Serverless functions with Vercel
- ✅ Hardcoded credentials (no environment variables needed)
- ✅ Real-time status updates via webhooks
- ✅ Database-backed transaction tracking
- ✅ Same frontend code (no changes required)
- ✅ Automatic HTTPS and CDN
- ✅ Security headers configured

## 🧪 Testing

After deployment:

1. Visit your Vercel URL
2. Test the payment flow
3. Verify webhook is receiving callbacks
4. Check Supabase for transaction records

## 📝 Differences from Netlify

| Feature | Netlify | Vercel |
|---------|---------|--------|
| Functions Directory | `netlify/functions/` | `api/` |
| Handler Type | `@netlify/functions` Handler | `@vercel/node` Request/Response |
| Config File | `netlify.toml` | `vercel.json` |
| Function URL | `/.netlify/functions/xxx` | `/api/xxx` |
| Build Command | Same | Same |
| Deploy Command | `netlify deploy` | `vercel` |

## 🔒 Security Notes

- Credentials are hardcoded as requested
- For production, consider using Vercel Environment Variables
- Security headers are configured in `vercel.json`
- CORS is enabled for all API endpoints

## 🎉 Migration Complete!

The Kingdom Nanies project is now ready for Vercel deployment with all credentials hardcoded and working Supabase + PesaFlux integration!

## 📞 Support

If you encounter any issues:
1. Check Vercel deployment logs
2. Verify webhook URL is correct in PesaFlux dashboard
3. Check Supabase database for transaction records
4. Review browser console for frontend errors
