-- ============================================
-- ENABLE SUPABASE REALTIME FOR CHROMATIC
-- ============================================
-- This SQL enables real-time synchronization for the palettes table
-- Run this in Supabase SQL Editor

-- Enable Realtime for the palettes table
-- This allows instant sync of like counts across all users and tabs
ALTER PUBLICATION supabase_realtime ADD TABLE palettes;

-- Verify Realtime is enabled (optional check)
-- Uncomment the line below to verify the setup
-- SELECT * FROM pg_publication_tables WHERE pubname = 'supabase_realtime';

-- ============================================
-- WHAT THIS DOES
-- ============================================
-- ✅ Enables real-time broadcasts for palette updates
-- ✅ Like counts sync instantly across all sections
-- ✅ Changes appear in all browser tabs immediately
-- ✅ All users see updates in real-time (100-200ms)

-- ============================================
-- AFTER RUNNING THIS
-- ============================================
-- 1. Open two browser tabs at http://localhost:5173
-- 2. Like a palette in Tab 1
-- 3. Instantly see the count update in Tab 2 (no refresh!)
-- 4. Changes sync across ALL sections automatically

-- ============================================
-- TROUBLESHOOTING
-- ============================================
-- If Realtime doesn't work, verify it's enabled:
-- SELECT * FROM pg_publication_tables WHERE pubname = 'supabase_realtime';
-- 
-- Should return a row with:
-- - pubname: supabase_realtime
-- - schemaname: public
-- - tablename: palettes
