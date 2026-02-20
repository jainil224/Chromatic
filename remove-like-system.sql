-- ============================================
-- REMOVE LIKE SYSTEM - DATABASE MIGRATION
-- ============================================

-- 1. Drop the junction table (auto-drops policies and indexes)
DROP TABLE IF EXISTS public.palette_likes CASCADE;

-- 2. Remove RPC functions
DROP FUNCTION IF EXISTS public.increment_palette_likes(UUID);
DROP FUNCTION IF EXISTS public.decrement_palette_likes(UUID);

-- 3. Cleanup palettes table
DO $$ 
BEGIN
    -- Remove the constraint
    IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'palettes_likes_check') THEN
        ALTER TABLE public.palettes DROP CONSTRAINT palettes_likes_check;
    END IF;

    -- Drop the index
    IF EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_palettes_likes') THEN
        DROP INDEX public.idx_palettes_likes;
    END IF;

    -- Finally drop the column
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'palettes' AND column_name = 'likes') THEN
        ALTER TABLE public.palettes DROP COLUMN likes;
    END IF;
END $$;
