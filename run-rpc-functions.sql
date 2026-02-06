-- ============================================
-- RUN THIS IN SUPABASE SQL EDITOR
-- ============================================
-- This creates the RPC functions and verifies your setup
-- Your tables already exist, so we just need the functions
-- ============================================

-- ============================================
-- 1. CREATE RPC FUNCTIONS
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
-- 2. ENABLE REALTIME (OPTIONAL)
-- ============================================

-- Enable realtime for palettes table
ALTER PUBLICATION supabase_realtime ADD TABLE palettes;

-- ============================================
-- 3. VERIFICATION QUERIES
-- ============================================

-- Check if tables exist (should return 2 rows)
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' AND table_name IN ('palettes', 'palette_likes');

-- Check if RPC functions exist (should return 2 rows)
SELECT routine_name FROM information_schema.routines 
WHERE routine_schema = 'public' AND routine_name LIKE '%palette_likes%';

-- Check if indexes exist (should return multiple rows)
SELECT indexname FROM pg_indexes 
WHERE tablename IN ('palettes', 'palette_likes');

-- Check RLS policies (should return multiple rows)
SELECT tablename, policyname, cmd FROM pg_policies 
WHERE tablename IN ('palettes', 'palette_likes');

-- ============================================
-- 4. TEST THE RPC FUNCTIONS
-- ============================================

-- Get a palette ID from your existing data
-- Replace this UUID with an actual palette ID from your palettes table
-- Example: SELECT id FROM palettes LIMIT 1;

-- Test increment function (uncomment and replace UUID)
-- SELECT increment_palette_likes('7707ee7c-414c-49dd-93b6-96941ed5d54'::UUID);

-- Test decrement function (uncomment and replace UUID)
-- SELECT decrement_palette_likes('7707ee7c-414c-49dd-93b6-96941ed5d54'::UUID);

-- ============================================
-- DONE! Your like system is ready! 🚀
-- ============================================
