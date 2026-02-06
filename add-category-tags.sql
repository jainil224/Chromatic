yes-- ============================================
-- ADD CATEGORY AND TAGS TO PALETTES TABLE
-- ============================================
-- Run this in Supabase SQL Editor to add missing columns

-- Add category column
ALTER TABLE palettes 
ADD COLUMN IF NOT EXISTS category TEXT;

-- Add tags column (JSONB array)
ALTER TABLE palettes 
ADD COLUMN IF NOT EXISTS tags JSONB DEFAULT '[]'::jsonb;

-- Create index for category filtering
CREATE INDEX IF NOT EXISTS idx_palettes_category ON palettes(category);

-- Create index for tags searching
CREATE INDEX IF NOT EXISTS idx_palettes_tags ON palettes USING GIN (tags);

-- Verify the changes
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'palettes' 
ORDER BY ordinal_position;
