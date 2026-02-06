-- ============================================
-- GLOBAL LIKE SYSTEM - DATABASE SCHEMA
-- ============================================
-- This schema adds a global like system to Chromatic
-- Users can like palettes once, and all users see the same like counts

-- ============================================
-- 1. ENSURE PALETTES TABLE HAS LIKES COLUMN
-- ============================================

-- Add likes column if it doesn't exist (safe to run multiple times)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'palettes' AND column_name = 'likes'
    ) THEN
        ALTER TABLE palettes ADD COLUMN likes INTEGER DEFAULT 0;
    END IF;
END $$;

-- Add constraint to prevent negative likes
ALTER TABLE palettes 
DROP CONSTRAINT IF EXISTS palettes_likes_check;

ALTER TABLE palettes 
ADD CONSTRAINT palettes_likes_check CHECK (likes >= 0);

-- Create index for faster queries on popular palettes
CREATE INDEX IF NOT EXISTS idx_palettes_likes ON palettes(likes DESC);

-- ============================================
-- 2. CREATE PALETTE_LIKES JUNCTION TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS palette_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  palette_id UUID NOT NULL REFERENCES palettes(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL, -- Browser fingerprint or session ID
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Prevent duplicate likes: one user can only like a palette once
  CONSTRAINT unique_user_palette_like UNIQUE(palette_id, user_id)
);

-- ============================================
-- 3. CREATE INDEXES FOR PERFORMANCE
-- ============================================

-- Index for fast lookup: "Has user X liked palette Y?"
CREATE INDEX IF NOT EXISTS idx_palette_likes_palette_user 
  ON palette_likes(palette_id, user_id);

-- Index for fast lookup: "Which palettes has user X liked?"
CREATE INDEX IF NOT EXISTS idx_palette_likes_user_id 
  ON palette_likes(user_id);

-- Index for fast lookup: "Who liked palette X?"
CREATE INDEX IF NOT EXISTS idx_palette_likes_palette_id 
  ON palette_likes(palette_id);

-- ============================================
-- 4. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on palette_likes table
ALTER TABLE palette_likes ENABLE ROW LEVEL SECURITY;

-- Policy 1: Allow public read access
-- Everyone can see all likes
CREATE POLICY "Allow public read access on palette_likes"
  ON palette_likes
  FOR SELECT
  TO public
  USING (true);

-- Policy 2: Allow public insert
-- Anyone can like a palette (UNIQUE constraint prevents duplicates)
CREATE POLICY "Allow public insert on palette_likes"
  ON palette_likes
  FOR INSERT
  TO public
  WITH CHECK (
    -- Ensure required fields are present
    palette_id IS NOT NULL AND
    user_id IS NOT NULL AND
    user_id != ''
  );

-- Policy 3: Allow public delete
-- Anyone can unlike a palette (only their own likes)
CREATE POLICY "Allow public delete on palette_likes"
  ON palette_likes
  FOR DELETE
  TO public
  USING (true);

-- ============================================
-- 5. HELPER FUNCTIONS
-- ============================================

-- Function to increment likes (atomic operation)
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

-- Function to decrement likes (atomic operation)
CREATE OR REPLACE FUNCTION decrement_palette_likes(palette_id UUID)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    new_like_count INTEGER;
BEGIN
    UPDATE palettes
    SET likes = GREATEST(likes - 1, 0)  -- Prevent negative
    WHERE id = palette_id
    RETURNING likes INTO new_like_count;
    
    RETURN new_like_count;
END;
$$;

-- Grant execute permissions to public
GRANT EXECUTE ON FUNCTION increment_palette_likes(UUID) TO public;
GRANT EXECUTE ON FUNCTION decrement_palette_likes(UUID) TO public;

-- ============================================
-- 6. VERIFICATION QUERIES (OPTIONAL)
-- ============================================

-- Uncomment to verify the setup:

-- Check if palette_likes table exists
-- SELECT table_name FROM information_schema.tables 
-- WHERE table_schema = 'public' AND table_name = 'palette_likes';

-- Check indexes
-- SELECT indexname FROM pg_indexes 
-- WHERE tablename = 'palette_likes';

-- Check RLS policies
-- SELECT policyname, cmd FROM pg_policies 
-- WHERE tablename = 'palette_likes';

-- ============================================
-- SETUP COMPLETE!
-- ============================================
-- Next steps:
-- 1. Run this SQL in Supabase SQL Editor
-- 2. Implement frontend like logic in React
-- 3. Test with multiple users/browsers

