# Supabase Integration Setup Guide

## ✅ What's Been Done

The Chromatic app now uses **Supabase** instead of localStorage for storing user-created palettes. This means:
- ✅ All users can see palettes created by others
- ✅ Palettes persist across devices and browsers
- ✅ Real-time global sharing

---

## 🚀 Quick Start

### 1. Environment Variables
Your Supabase credentials are already configured in `.env.local`:
```
VITE_SUPABASE_URL=https://etsqidrpebkrtubfufag.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...
```

### 2. Database Setup
Run the SQL schema in your Supabase dashboard:
1. Go to https://supabase.com/dashboard
2. Select your project
3. Go to **SQL Editor**
4. Copy and paste the contents of `supabase-schema.sql`
5. Click **Run**

### 3. Restart Dev Server
```bash
npm run dev
```

---

## 📁 Files Modified

### New Files
- ✅ `src/lib/supabase.ts` - Supabase client configuration
- ✅ `.env.local` - Environment variables (DO NOT commit to git)

### Updated Files
- ✅ `src/hooks/useUserPalettes.ts` - Now uses Supabase instead of localStorage
- ✅ `package.json` - Added @supabase/supabase-js dependency

---

## 🧪 Testing

1. **Create a palette** in your app
2. **Check Supabase dashboard** → Table Editor → `palettes` table
3. **Open in incognito/another browser** → Palette should be visible
4. **Refresh page** → Palette persists

---

## 🔒 Security

- ✅ `.env.local` is gitignored (credentials safe)
- ✅ Row Level Security (RLS) enabled
- ✅ Public can read and insert palettes
- ✅ Deletes are disabled (data protection)

---

## 🛠️ Features

### Global Palette Sharing
- When a user creates a palette, it's saved to Supabase
- All users see the palette immediately after refresh
- Palettes marked as "New" if created within 24 hours

### Offline Fallback
- If Supabase is unreachable, palettes save to localStorage
- User sees a warning: "Palette saved locally only (offline mode)"
- Data syncs when connection is restored

### Loading States
- `loading` - Shows while fetching palettes
- `error` - Shows if fetch fails
- `refetch()` - Manually refresh palettes

---

## 🐛 Troubleshooting

### "Failed to fetch palettes"
- Check Supabase credentials in `.env.local`
- Verify SQL schema is run in Supabase dashboard
- Check browser console for errors

### "Cannot delete shared palettes"
- This is expected! RLS prevents deletes
- Palettes are only hidden locally
- To enable deletes, add DELETE policy in Supabase

### Palettes not showing for other users
- Ensure `.env.local` exists and has correct credentials
- Restart dev server after adding `.env.local`
- Check Supabase dashboard → Table Editor → `palettes`

---

## 📊 Database Schema

```sql
CREATE TABLE palettes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  colors JSONB NOT NULL,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## 🎯 Next Steps (Optional)

1. **Real-time updates** - Enable Supabase subscriptions for instant updates
2. **User authentication** - Add auth to track palette owners
3. **Pagination** - Load palettes in batches for better performance
4. **Search** - Add full-text search for palette names

---

**Status:** ✅ Ready to deploy!
