-- ============================================
-- REMOVE ALL CUSTOM USER-CREATED PALETTES
-- ============================================
-- This script removes all user-created palettes from the database
-- to restore the website to its original state with only hardcoded palettes

-- Delete all palettes from the database
-- This will remove all custom palettes and their associated likes
DELETE FROM palettes;

-- Optional: Reset the palette_likes table as well
DELETE FROM palette_likes;

-- Verify deletion
SELECT COUNT(*) as remaining_palettes FROM palettes;
SELECT COUNT(*) as remaining_likes FROM palette_likes;
