# Seeding Hardcoded Palettes to Supabase

## Overview

This guide explains how to seed all your hardcoded color palettes (Dark, Light, Pastel, Vintage, etc.) into Supabase so they can use the global like system.

---

## Why Seed Palettes?

Currently, only **user-created palettes** get unique UUIDs from Supabase and can use the global like system. Your **hardcoded palettes** (from `palettes.ts`) use string IDs like `"midnight-ember"` and store likes in localStorage only.

**After seeding**, all hardcoded palettes will:
- ✅ Have unique UUIDs in Supabase
- ✅ Support global likes (synchronized across all users)
- ✅ Persist likes after deployment
- ✅ Use the same like system as user-created palettes

---

## Prerequisites

1. ✅ Supabase database schema is set up (tables and RPC functions)
2. ✅ Environment variables configured in `.env.local`:
   ```
   VITE_SUPABASE_URL=https://etsqidrpebkrtubfufag.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGci...
   ```
3. ✅ `tsx` package installed (for running TypeScript directly)

---

## Installation

If you don't have `tsx` installed, install it:

```bash
npm install -D tsx
```

---

## How to Seed

### Step 1: Run the Seeding Script

```bash
npx tsx seed-palettes.ts
```

### Step 2: Verify the Output

You should see output like:

```
🎨 Starting palette seeding...

📊 Total palettes to seed: 800

📦 Processing batch 1/16 (50 palettes)...
✅ Batch 1 inserted successfully (50 palettes)
📦 Processing batch 2/16 (50 palettes)...
✅ Batch 2 inserted successfully (50 palettes)
...

==================================================
📈 SEEDING COMPLETE
==================================================
✅ Successfully seeded: 800 palettes
❌ Failed: 0 palettes
📊 Total: 800 palettes
==================================================

🎉 Your hardcoded palettes now have unique UUIDs in Supabase!
🔥 They can now use the global like system!
```

### Step 3: Verify in Supabase

1. Go to Supabase Dashboard → Table Editor
2. Open the `palettes` table
3. You should see all 800+ palettes with:
   - Unique UUIDs
   - `likes` column set to `0`
   - `created_at` timestamps

---

## What Happens During Seeding?

1. **Reads all palettes** from `palettes.ts` (Dark, Light, Pastel, etc.)
2. **Checks for duplicates** to ensure no palette ID conflicts
3. **Inserts in batches** of 50 palettes at a time
4. **Auto-generates UUIDs** via Supabase's `gen_random_uuid()`
5. **Initializes likes** to `0` for each palette
6. **Reports progress** for each batch

---

## Important Notes

### ⚠️ Run Only Once

**Do NOT run this script multiple times** unless you've cleared the `palettes` table first. Running it again will create duplicate entries.

### 🗑️ Clearing the Table (If Needed)

If you need to re-seed (e.g., after testing), clear the table first:

```sql
-- Run in Supabase SQL Editor
DELETE FROM palettes WHERE likes = 0;
```

Or delete all palettes:

```sql
TRUNCATE TABLE palettes CASCADE;
```

### 🔄 Updating Frontend Code

After seeding, you may want to update your frontend to fetch palettes from Supabase instead of using hardcoded arrays. This is **optional** but recommended for consistency.

**Example**: Modify `Index.tsx` to fetch all palettes on mount:

```typescript
useEffect(() => {
  const fetchPalettes = async () => {
    const { data, error } = await supabase
      .from('palettes')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) {
      // Use data instead of hardcoded arrays
    }
  };

  fetchPalettes();
}, []);
```

---

## Troubleshooting

### Error: "Cannot find module './src/lib/supabase'"

**Solution**: Make sure you're running the script from the project root:

```bash
cd c:\Users\Admin\Documents\GitHub\Chromatic
npx tsx seed-palettes.ts
```

### Error: "Supabase credentials missing"

**Solution**: Check your `.env.local` file has the correct variables:

```bash
cat .env.local
```

### Error: "Duplicate key value violates unique constraint"

**Solution**: You've already seeded the palettes. Clear the table first (see above).

---

## Next Steps

After seeding:

1. ✅ **Test the like system** on hardcoded palettes
2. ✅ **Verify like counts persist** after page refresh
3. ✅ **Check cross-browser synchronization**
4. ✅ **Deploy to production** (palettes will be in Supabase)

---

## Summary

- **Script**: `seed-palettes.ts`
- **Command**: `npx tsx seed-palettes.ts`
- **Total Palettes**: ~800
- **Result**: All hardcoded palettes now have UUIDs and global like support

**Congratulations! Your color palette app now has a fully global like system! 🎉**
