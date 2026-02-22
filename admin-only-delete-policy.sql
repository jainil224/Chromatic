-- ============================================================
-- CHROMATIC — ADMIN-ONLY DELETE POLICY
-- ============================================================
-- PROBLEM: The current "Allow public delete" policy lets ANY
-- anonymous visitor delete palettes from the live site.
--
-- FIX: Replace it with a policy that restricts DELETE to
-- authenticated users only (i.e., the admin who is logged
-- in via Supabase Auth in the Admin Dashboard).
--
-- Run this in Supabase → SQL Editor
-- ============================================================

-- 1. Drop the old permissive public DELETE policy
DROP POLICY IF EXISTS "Allow public delete" ON palettes;

-- 2. Create a new DELETE policy — authenticated users (admin) only
CREATE POLICY "Admin only delete"
  ON palettes
  FOR DELETE
  TO authenticated          -- Only users with a valid Supabase Auth session
  USING (true);             -- No further row-level restriction needed (admin owns all rows)

-- ============================================================
-- Also lock down the palette_submissions DELETE to admin only
-- (users should never be able to hard-delete their own submissions)
-- ============================================================
DROP POLICY IF EXISTS "Allow public delete on palette_submissions" ON palette_submissions;

CREATE POLICY "Admin only delete submissions"
  ON palette_submissions
  FOR DELETE
  TO authenticated
  USING (true);

-- ============================================================
-- Verify the updated policies
-- ============================================================
SELECT tablename, policyname, cmd, roles
FROM pg_policies
WHERE tablename IN ('palettes', 'palette_submissions')
ORDER BY tablename, cmd;
