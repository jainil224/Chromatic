# Deployment Guide - Fixing Blank Page Issue

## 🐛 Problem
Deployed website shows a **blank page** instead of the app.

## 🔍 Root Cause
Missing environment variables on the deployment platform. The app needs Supabase credentials to work properly.

---

## ✅ Solution

### Option 1: Add Environment Variables (Recommended)

#### For Vercel:
1. Go to your project dashboard
2. Click **Settings** → **Environment Variables**
3. Add these variables:
   ```
   VITE_SUPABASE_URL=https://etsqidrpebkrtubfufag.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0c3FpZHJwZWJrcnR1YmZ1ZmFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzMDM4NzEsImV4cCI6MjA4NTg3OTg3MX0.GexBeezXG05HxdeOKwJa1riBRRBY4bdpQFqRaieEBoU
   ```
4. **Redeploy** your project

#### For Netlify:
1. Go to **Site settings** → **Build & deploy** → **Environment**
2. Click **Edit variables**
3. Add:
   ```
   VITE_SUPABASE_URL=https://etsqidrpebkrtubfufag.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0c3FpZHJwZWJrcnR1YmZ1ZmFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzMDM4NzEsImV4cCI6MjA4NTg3OTg3MX0.GexBeezXG05HxdeOKwJa1riBRRBY4bdpQFqRaieEBoU
   ```
4. **Trigger a new deploy**

#### For Other Platforms:
Add the same environment variables in your platform's settings.

---

### Option 2: Check Browser Console

1. Open deployed site
2. Press **F12** (Developer Tools)
3. Go to **Console** tab
4. Look for errors:
   - ❌ "Supabase credentials missing" → Add env vars
   - ❌ "Failed to fetch" → Check Supabase URL
   - ❌ "Invalid API key" → Check anon key

---

## 🧪 Testing After Fix

1. **Clear browser cache** (Ctrl+Shift+Delete)
2. **Hard refresh** (Ctrl+Shift+R)
3. **Check console** for warnings
4. **Create a test palette** to verify Supabase works

---

## 🔧 Common Issues

### Issue 1: Still Blank After Adding Env Vars
**Solution:** Redeploy the project (env vars only apply to new builds)

### Issue 2: "Invalid API key" Error
**Solution:** Double-check the anon key - it should start with `eyJ`

### Issue 3: App Works Locally But Not Deployed
**Solution:** 
- Ensure env vars are added to deployment platform
- Check build logs for errors
- Verify `.env.local` is NOT committed to git (it's only for local dev)

### Issue 4: Console Shows "Failed to fetch"
**Solution:**
- Verify Supabase URL is correct
- Check if Supabase project is active
- Ensure RLS policies are set up correctly

---

## 📋 Deployment Checklist

- [ ] Environment variables added to deployment platform
- [ ] Supabase SQL schema executed
- [ ] Project redeployed after adding env vars
- [ ] Browser cache cleared
- [ ] Console checked for errors
- [ ] Test palette creation works

---

## 🚀 Quick Deploy Commands

### Build Locally First (Test)
```bash
npm run build
npm run preview
```

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add env vars via CLI
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY

# Redeploy
vercel --prod
```

### Deploy to Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod

# Set env vars
netlify env:set VITE_SUPABASE_URL "https://etsqidrpebkrtubfufag.supabase.co"
netlify env:set VITE_SUPABASE_ANON_KEY "your-key-here"
```

---

## 🎯 Expected Behavior After Fix

✅ Website loads normally  
✅ Palettes are visible  
✅ Can create new palettes  
✅ Palettes shared across users  
✅ No console errors  

---

## 📞 Still Having Issues?

Check these:
1. **Build logs** - Look for errors during build
2. **Network tab** - Check if API calls are failing
3. **Supabase dashboard** - Verify project is active
4. **RLS policies** - Ensure they're enabled

---

**Most Common Fix:** Add environment variables to your deployment platform and redeploy! 🚀
