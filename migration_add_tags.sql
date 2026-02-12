-- ============================================
-- MIGRATION: ADD TAGS COLUMN (JSONB)
-- ============================================

-- Safely add the column if it doesn't exist
CREATE TABLE IF NOT EXISTS palettes (id UUID); -- Just to ensure table ref works in IDE (dummy)

-- We want tags to be JSONB to store array of strings ["tag1", "tag2"]
-- If the column exists as TEXT[], we might want to convert it, but let's assume valid JSONB is the goal.

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'palettes' AND column_name = 'tags') THEN
        ALTER TABLE palettes ADD COLUMN tags JSONB DEFAULT '[]';
        CREATE INDEX idx_palettes_tags ON palettes USING GIN (tags);
    ELSE
        -- If it exists, we can try to ensure it is JSONB.
        -- If it is TEXT[], this might fail if there is incompatible data, but for empty column it works.
        -- Uncomment the next line if you need to force conversion (USE WITH CAUTION)
        -- ALTER TABLE palettes ALTER COLUMN tags TYPE JSONB USING to_jsonb(tags);
    END IF;
END $$;
