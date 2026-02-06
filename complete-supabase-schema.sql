-- ============================================
-- CHROMATIC - COMPLETE DATABASE SCHEMA
-- ============================================
-- This is the COMPLETE schema for the Chromatic color palette application
-- Run this ONCE in Supabase SQL Editor to set up everything
-- ============================================

-- ============================================
-- 1. CREATE PALETTES TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS palettes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  colors JSONB NOT NULL,
  likes INTEGER DEFAULT 0 CHECK (likes >= 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_palettes_created_at ON palettes(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_palettes_likes ON palettes(likes DESC);

-- ============================================
-- 2. CREATE PALETTE_LIKES JUNCTION TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS palette_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  palette_id UUID NOT NULL REFERENCES palettes(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Prevent duplicate likes: one user can only like a palette once
  CONSTRAINT unique_user_palette_like UNIQUE(palette_id, user_id)
);

-- Create indexes for fast lookups
CREATE INDEX IF NOT EXISTS idx_palette_likes_palette_user ON palette_likes(palette_id, user_id);
CREATE INDEX IF NOT EXISTS idx_palette_likes_user_id ON palette_likes(user_id);
CREATE INDEX IF NOT EXISTS idx_palette_likes_palette_id ON palette_likes(palette_id);

-- ============================================
-- 3. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on both tables
ALTER TABLE palettes ENABLE ROW LEVEL SECURITY;
ALTER TABLE palette_likes ENABLE ROW LEVEL SECURITY;

-- PALETTES TABLE POLICIES
-- Policy 1: Allow public read access
DROP POLICY IF EXISTS "Allow public read access" ON palettes;
CREATE POLICY "Allow public read access"
  ON palettes
  FOR SELECT
  TO public
  USING (true);

-- Policy 2: Allow public insert
DROP POLICY IF EXISTS "Allow public insert" ON palettes;
CREATE POLICY "Allow public insert"
  ON palettes
  FOR INSERT
  TO public
  WITH CHECK (
    name IS NOT NULL AND
    colors IS NOT NULL AND
    jsonb_array_length(colors) > 0
  );

-- Policy 3: Allow public update (for likes)
DROP POLICY IF EXISTS "Allow public like increment" ON palettes;
CREATE POLICY "Allow public like increment"
  ON palettes
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (likes >= 0);

-- Policy 4: Allow public delete
DROP POLICY IF EXISTS "Allow public delete" ON palettes;
CREATE POLICY "Allow public delete"
  ON palettes
  FOR DELETE
  TO public
  USING (true);

-- PALETTE_LIKES TABLE POLICIES
-- Policy 1: Allow public read access
DROP POLICY IF EXISTS "Allow public read access on palette_likes" ON palette_likes;
CREATE POLICY "Allow public read access on palette_likes"
  ON palette_likes
  FOR SELECT
  TO public
  USING (true);

-- Policy 2: Allow public insert
DROP POLICY IF EXISTS "Allow public insert on palette_likes" ON palette_likes;
CREATE POLICY "Allow public insert on palette_likes"
  ON palette_likes
  FOR INSERT
  TO public
  WITH CHECK (
    palette_id IS NOT NULL AND
    user_id IS NOT NULL AND
    user_id != ''
  );

-- Policy 3: Allow public delete
DROP POLICY IF EXISTS "Allow public delete on palette_likes" ON palette_likes;
CREATE POLICY "Allow public delete on palette_likes"
  ON palette_likes
  FOR DELETE
  TO public
  USING (true);

-- ============================================
-- 4. RPC FUNCTIONS FOR ATOMIC OPERATIONS
-- ============================================

-- Function to increment likes (atomic, returns new count)
CREATE OR REPLACE FUNCTION increment_palette_likes(palette_id UUID)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    new_like_count INTEGER;
BEGIN
    UPDATE palettes
    SET likes = likes + 1
    WHERE id = palette_id
    RETURNING likes INTO new_like_count;
    
    RETURN new_like_count;
END;
$$;

-- Function to decrement likes (atomic, returns new count, prevents negative)
CREATE OR REPLACE FUNCTION decrement_palette_likes(palette_id UUID)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    new_like_count INTEGER;
BEGIN
    UPDATE palettes
    SET likes = GREATEST(likes - 1, 0)
    WHERE id = palette_id
    RETURNING likes INTO new_like_count;
    
    RETURN new_like_count;
END;
$$;

-- Grant execute permissions to public
GRANT EXECUTE ON FUNCTION increment_palette_likes(UUID) TO public;
GRANT EXECUTE ON FUNCTION decrement_palette_likes(UUID) TO public;

-- ============================================
-- 5. ENABLE REALTIME (OPTIONAL BUT RECOMMENDED)
-- ============================================

-- Enable realtime for palettes table
ALTER PUBLICATION supabase_realtime ADD TABLE palettes;

-- ============================================
-- SETUP COMPLETE!
-- ============================================

-- Verify the setup with these queries:

-- Check if tables exist
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' AND table_name IN ('palettes', 'palette_likes');

-- Check if RPC functions exist
SELECT routine_name FROM information_schema.routines 
WHERE routine_schema = 'public' AND routine_name LIKE '%palette_likes%';

-- Check if indexes exist
SELECT indexname FROM pg_indexes 
WHERE tablename IN ('palettes', 'palette_likes');

-- Check RLS policies
SELECT tablename, policyname, cmd FROM pg_policies 
WHERE tablename IN ('palettes', 'palette_likes');
