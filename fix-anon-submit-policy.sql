-- ============================================
-- FIX: Allow anonymous users to submit palettes
-- Run this in: Supabase Dashboard > SQL Editor
-- Project: etsqidrpebkrtubfufag (chromatic)
-- ============================================

-- Add INSERT policy for anonymous users.
-- status is forced to 'pending' so no one can self-approve.
DROP POLICY IF EXISTS "Anyone can submit palette" ON palette_submissions;
CREATE POLICY "Anyone can submit palette"
  ON palette_submissions
  FOR INSERT
  TO anon
  WITH CHECK (status = 'pending');

-- Verify the policy was created
SELECT policyname, cmd, roles
FROM pg_policies
WHERE tablename = 'palette_submissions';
