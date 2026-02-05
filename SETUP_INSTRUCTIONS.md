# 🚀 Supabase Global Likes Setup Instructions

## Overview
This guide will help you set up a production-ready global likes system for your Chromatic color palette website using Supabase.

---

## 📋 Prerequisites

1. **Supabase Account**: Sign up at [supabase.com](https://supabase.com)
2. **Project Created**: Create a new Supabase project

---

## 🔧 Step 1: Create Database Schema

1. Go to your Supabase Dashboard
2. Navigate to **SQL Editor** (left sidebar)
3. Click **New Query**
4. Copy and paste the entire contents of `supabase-schema.sql`
5. Click **Run** to execute the SQL

This will:
- ✅ Create the `palettes` table
- ✅ Set up Row Level Security (RLS) policies
- ✅ Create indexes for performance
- ✅ Add helper function for atomic like increments
- ✅ Insert sample data (optional)

---

## 🔑 Step 2: Get Your Supabase Credentials

1. In Supabase Dashboard, go to **Settings** → **API**
2. Copy these two values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)

---

## 💻 Step 3: Configure Frontend

### Option A: Using Plain HTML/JS

1. Open `supabase-client.js`
2. Replace the placeholder values:

```javascript
const SUPABASE_URL = 'https://your-project.supabase.co' // ← Your Project URL
const SUPABASE_ANON_KEY = 'your-anon-key-here' // ← Your anon key
```

3. Include in your HTML:

```html
<!-- Add to <head> -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<link rel="stylesheet" href="palette-styles.css">

<!-- Add to <body> -->
<div id="palettes-container"></div>
<script src="supabase-client.js"></script>
```

### Option B: Using React/TypeScript

1. Install Supabase client:
```bash
npm install @supabase/supabase-js
```

2. Create `src/lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://your-project.supabase.co'
const SUPABASE_ANON_KEY = 'your-anon-key-here'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
```

3. Use in your components (see React example below)

---

## 🧪 Step 4: Test the System

1. Open `example.html` in your browser
2. You should see sample palettes with like buttons
3. Click ❤️ on any palette
4. Refresh the page - likes should persist
5. Open in another browser/incognito - likes should be the same

---

## 🎯 Step 5: Verify RLS Policies

Test that security is working:

1. Go to **Table Editor** → **palettes** in Supabase
2. Try to manually delete a row → Should fail (no delete policy)
3. Try to update `name` field → Should fail (only likes can be updated)
4. Try to update `likes` field → Should succeed

---

## 🔄 Optional: Enable Real-Time Updates

To see likes update instantly across all users without refresh:

1. In `supabase-client.js`, uncomment the last line:
```javascript
subscribeToRealtimeUpdates()
```

2. In Supabase Dashboard:
   - Go to **Database** → **Replication**
   - Enable replication for `palettes` table
   - Turn on `UPDATE` events

Now when User A clicks like, User B sees it instantly!

---

## 📦 Integration with Existing Chromatic Project

Since you're using React/TypeScript, here's how to integrate:

### 1. Create Supabase Client

Create `src/lib/supabase.ts`:
```typescript
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || ''
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export type Palette = {
  id: string
  name: string
  colors: string[]
  likes: number
  created_at: string
}
```

### 2. Create `.env.local`

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Create Hooks

Create `src/hooks/usePalettes.ts`:
```typescript
import { useState, useEffect } from 'react'
import { supabase, type Palette } from '@/lib/supabase'

export function usePalettes() {
  const [palettes, setPalettes] = useState<Palette[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPalettes()
  }, [])

  async function fetchPalettes() {
    const { data, error } = await supabase
      .from('palettes')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching palettes:', error)
    } else {
      setPalettes(data || [])
    }
    setLoading(false)
  }

  async function incrementLikes(paletteId: string) {
    await supabase.rpc('increment_palette_likes', { palette_id: paletteId })
    
    // Optimistic update
    setPalettes(prev => 
      prev.map(p => p.id === paletteId ? { ...p, likes: p.likes + 1 } : p)
    )
  }

  return { palettes, loading, incrementLikes }
}
```

### 4. Use in Component

```typescript
import { usePalettes } from '@/hooks/usePalettes'

export function PaletteGrid() {
  const { palettes, loading, incrementLikes } = usePalettes()

  if (loading) return <div>Loading...</div>

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {palettes.map(palette => (
        <div key={palette.id} className="palette-card">
          <h3>{palette.name}</h3>
          <div className="colors">
            {palette.colors.map((color, i) => (
              <div key={i} style={{ backgroundColor: color }} />
            ))}
          </div>
          <button onClick={() => incrementLikes(palette.id)}>
            ❤️ {palette.likes}
          </button>
        </div>
      ))}
    </div>
  )
}
```

---

## 🛡️ Security Features

✅ **Row Level Security (RLS)** enabled  
✅ **Public read** access for all palettes  
✅ **Public update** only for likes column  
✅ **No delete** access (protected data)  
✅ **Atomic increments** prevent race conditions  
✅ **Check constraints** prevent negative likes  

---

## 🚨 Troubleshooting

### Likes not persisting?
- Check Supabase credentials are correct
- Verify RLS policies are enabled
- Check browser console for errors

### Can't increment likes?
- Ensure RPC function was created (`increment_palette_likes`)
- Check that RLS policy allows UPDATE
- Verify EXECUTE permission is granted to public

### Real-time not working?
- Enable replication in Supabase Dashboard
- Check that subscription is active
- Verify WebSocket connection in Network tab

---

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Real-time Subscriptions](https://supabase.com/docs/guides/realtime)

---

## ✅ Checklist

- [ ] Created Supabase project
- [ ] Ran `supabase-schema.sql`
- [ ] Copied Project URL and anon key
- [ ] Updated credentials in code
- [ ] Tested like functionality
- [ ] Verified likes persist across refresh
- [ ] Tested in multiple browsers/devices
- [ ] (Optional) Enabled real-time updates

---

**You're all set! 🎉**

Your color palette website now has a production-ready global likes system that works across all users in real-time.
