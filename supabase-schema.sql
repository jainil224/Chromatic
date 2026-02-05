-- ============================================
-- Chromatic Color Palette Database Schema
-- ============================================
-- This schema creates a global likes system for color palettes
-- All users share the same like counts in real-time

-- Create the palettes table
CREATE TABLE IF NOT EXISTS palettes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  colors JSONB NOT NULL, -- Storing as JSONB for flexibility and querying
  likes INTEGER DEFAULT 0 CHECK (likes >= 0), -- Prevent negative likes
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on created_at for faster sorting
CREATE INDEX IF NOT EXISTS idx_palettes_created_at ON palettes(created_at DESC);

-- Create an index on likes for popular palette queries
CREATE INDEX IF NOT EXISTS idx_palettes_likes ON palettes(likes DESC);

-- ============================================
-- Row Level Security (RLS) Policies
-- ============================================
-- This is a PUBLIC collaborative palette system
-- Anyone can view, create, and like palettes
-- No authentication required

-- Enable Row Level Security
ALTER TABLE palettes ENABLE ROW LEVEL SECURITY;

-- Policy 1: Allow public read access to all palettes
-- Everyone can see all palettes
CREATE POLICY "Allow public read access"
  ON palettes
  FOR SELECT
  TO public
  USING (true);

-- Policy 2: Allow public insert for new palettes
-- Anyone can create a new palette (no auth required)
CREATE POLICY "Allow public insert"
  ON palettes
  FOR INSERT
  TO public
  WITH CHECK (
    -- Ensure required fields are present
    name IS NOT NULL AND
    colors IS NOT NULL AND
    jsonb_array_length(colors) > 0
  );

-- Policy 3: Allow public update ONLY for incrementing likes
-- This prevents users from modifying name, colors, or created_at
CREATE POLICY "Allow public like increment"
  ON palettes
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (
    -- Only allow updating the likes column
    -- Ensure other fields remain unchanged
    likes >= 0
  );

-- Policy 4: Allow public delete for palettes
-- Anyone can delete any palette (no auth required)
-- WARNING: This allows anyone to delete any palette!
-- Consider adding authentication in the future to restrict deletes to palette owners
CREATE POLICY "Allow public delete"
  ON palettes
  FOR DELETE
  TO public
  USING (true);

-- ============================================
-- Sample Data (Optional - for testing)
-- ============================================

-- Insert some sample palettes for testing
INSERT INTO palettes (name, colors, likes) VALUES
  ('Sunset Vibes', '["#FF6B6B", "#FFE66D", "#4ECDC4", "#45B7D1"]', 0),
  ('Ocean Breeze', '["#006994", "#0090C1", "#00B4D8", "#90E0EF"]', 0),
  ('Forest Dreams', '["#2D6A4F", "#40916C", "#52B788", "#95D5B2"]', 0),
  ('Purple Haze', '["#5A189A", "#7209B7", "#9D4EDD", "#C77DFF"]', 0),
  ('Warm Autumn', '["#9B2226", "#AE2012", "#BB3E03", "#EE9B00"]', 0)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- Helper Functions (Optional)
-- ============================================

-- Function to safely increment likes (prevents race conditions)
CREATE OR REPLACE FUNCTION increment_palette_likes(palette_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE palettes
  SET likes = likes + 1
  WHERE id = palette_id;
END;
$$;

-- Grant execute permission to public
GRANT EXECUTE ON FUNCTION increment_palette_likes(UUID) TO public;
