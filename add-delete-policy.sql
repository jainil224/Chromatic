-- Add DELETE policy to allow users to delete palettes from database
-- Run this in Supabase SQL Editor

-- Drop existing policy if it exists (in case you're re-running this)
DROP POLICY IF EXISTS "Allow public delete" ON palettes;

-- Create new DELETE policy
CREATE POLICY "Allow public delete"
  ON palettes
  FOR DELETE
  TO public
  USING (true);

-- Verify the policy was created
SELECT * FROM pg_policies WHERE tablename = 'palettes';
