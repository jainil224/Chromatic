-- ============================================
-- LIKE/UNLIKE SYSTEM FOR CHROMATIC
-- ============================================
-- This SQL sets up the like system for color palettes
-- Run this in Supabase SQL Editor

-- The palettes table already has a 'likes' column
-- This is just to ensure it exists and has the right structure

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
-- HELPER FUNCTIONS
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
-- EXAMPLE USAGE
-- ============================================

-- Like a palette (increment)
-- SELECT increment_palette_likes('PASTE_PALETTE_ID_HERE');

-- Unlike a palette (decrement)
-- SELECT decrement_palette_likes('PASTE_PALETTE_ID_HERE');

-- Get all palettes with like counts
-- SELECT id, name, likes FROM palettes ORDER BY likes DESC;

-- Get most liked palettes
-- SELECT id, name, likes FROM palettes WHERE likes > 0 ORDER BY likes DESC LIMIT 10;
