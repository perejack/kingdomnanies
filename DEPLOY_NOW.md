# 🚀 Quick Deploy to Vercel

## Prerequisites
- GitHub repository: ✅ https://github.com/perejack/kingdomnanies.git
- Dependencies installed: ✅
- Credentials hardcoded: ✅

## Deploy in 3 Steps

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```

### Step 3: Deploy
```bash
cd c:\Users\USED\Downloads\kingdomnanies-vercel\kingdomnanies-master
vercel --prod
```

That's it! ✅

---

## After Deployment

### Update PesaFlux Webhook
1. Go to https://pesaflux.co.ke/user
2. Find webhook URL setting
3. Update to: `https://YOUR-VERCEL-URL.vercel.app/api/webhook`
4. Save

### Test Your Site
- Visit your Vercel URL
- Test payment flow
- Verify webhooks work

---

## Alternative: Deploy via Vercel Dashboard

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select: `perejack/kingdomnanies`
4. Click "Deploy"
5. Done! ✅

---

## Your API Endpoints

After deployment, these will be live:
- `POST /api/initiate-payment`
- `POST /api/check-status`
- `GET /api/check-status-db`
- `POST /api/webhook`
- `POST /api/submit-application`

---

## Hardcoded Credentials (Already Set)

✅ **Supabase**: `https://dbpbvoqfexofyxcexmmp.supabase.co`  
✅ **PesaFlux API Key**: `PSFXPCGLCY37`  
✅ **PesaFlux Email**: `silverstonesolutions103@gmail.com`

No environment variables needed - everything is hardcoded as requested!

---

## Need Help?

Check these files:
- `MIGRATION_SUMMARY.md` - Full migration details
- `VERCEL_DEPLOYMENT.md` - Comprehensive deployment guide
- `vercel.json` - Vercel configuration

🎉 **Ready to deploy!**
