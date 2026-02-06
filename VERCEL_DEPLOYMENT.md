# Vercel Deployment Guide for Global Like System

## ✅ What's Already Done

Your code has been pushed to GitHub with the global like system implementation!

---

## 🚀 Vercel Setup (REQUIRED)

For the like system to work in production, you **MUST** add your Supabase credentials as environment variables in Vercel.

### Step 1: Go to Vercel Dashboard

1. Open [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your **Chromatic** project
3. Go to **Settings** → **Environment Variables**

### Step 2: Add Environment Variables

Add these **TWO** environment variables:

#### Variable 1: VITE_SUPABASE_URL
- **Key**: `VITE_SUPABASE_URL`
- **Value**: `https://etsqidrpebkrtubfufag.supabase.co`
- **Environment**: Select all (Production, Preview, Development)

#### Variable 2: VITE_SUPABASE_ANON_KEY
- **Key**: `VITE_SUPABASE_ANON_KEY`
- **Value**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0c3FpZHJwZWJrcnR1YmZ1ZmFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzMDM4NzEsImV4cCI6MjA4NTg3OTg3MX0.GexBeezXG05HxdeOKwJa1riBRRBY4bdpQFqRaieEBoU`
- **Environment**: Select all (Production, Preview, Development)

### Step 3: Redeploy

After adding the environment variables:

1. Go to **Deployments** tab
2. Click the **three dots** (•••) on the latest deployment
3. Click **Redeploy**
4. Select **Use existing Build Cache** (faster)
5. Click **Redeploy**

---

## ⚠️ Important Notes

### Environment Variables Are Required

Without these environment variables, your app will:
- ❌ Not connect to Supabase
- ❌ Not save likes
- ❌ Fall back to localStorage (local only, not global)

### Security

- ✅ The `anon` key is **safe to expose** in frontend code
- ✅ Supabase RLS (Row Level Security) policies protect your data
- ✅ Never commit `.env.local` to GitHub (already in `.gitignore`)

---

## 🧪 Testing After Deployment

Once redeployed with environment variables:

1. **Open your production URL** (e.g., `https://chromatic.vercel.app`)
2. **Like a palette** by clicking the heart button
3. **Refresh the page** - like should persist
4. **Open in incognito/another browser** - like count should be the same
5. **Check Supabase** - `palette_likes` table should have new entries

---

## ✅ Verification Checklist

After deployment, verify:

- [ ] Environment variables added to Vercel
- [ ] App redeployed successfully
- [ ] Likes persist after refresh
- [ ] Likes sync across browsers
- [ ] Supabase shows new like entries
- [ ] No console errors about Supabase

---

## 🔧 Troubleshooting

### Issue: "Supabase credentials missing" warning

**Solution**: Environment variables not set in Vercel
- Go to Settings → Environment Variables
- Add both `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- Redeploy

### Issue: Likes don't persist

**Solution**: Check browser console for errors
- Open DevTools (F12)
- Check Console tab
- Look for Supabase connection errors

### Issue: "Failed to fetch" errors

**Solution**: Check Supabase RLS policies
- Go to Supabase Dashboard → Authentication → Policies
- Ensure `palettes` and `palette_likes` tables have public access policies

---

## 📊 What's in Production

After deployment, your production app will have:

- ✅ **714 seeded palettes** with unique UUIDs
- ✅ **Global like system** synchronized across all users
- ✅ **Realtime updates** when users like/unlike
- ✅ **Persistent storage** in Supabase
- ✅ **Production-ready** infrastructure

---

## 🎉 You're Done!

Once you've added the environment variables and redeployed:

1. Your app will connect to Supabase
2. All users will see the same like counts
3. Likes will persist forever
4. The system will scale automatically

**Congratulations! Your color palette app is live with a global like system!** 🚀🎨
