-- ============================================
-- MIGRATION: REMOVE NEW PALETTES
-- ============================================

-- Delete 'New Dark Palettes'
DELETE FROM palettes 
WHERE (name = 'Midnight Depth' AND colors::text = '["#0A0F24", "#11213B", "#1E3660", "#4D5E80", "#0F1A33"]')
   OR (name = 'Dark Nebula' AND colors::text = '["#12121B", "#1F1F2E", "#39395B", "#5B5B7D", "#0E0E17"]')
   OR (name = 'Abyssal Blue' AND colors::text = '["#141C2F", "#1C2338", "#27334F", "#4C5870", "#0D1526"]')
   OR (name = 'Deep Void' AND colors::text = '["#0E131F", "#18203B", "#2C3E6E", "#5C7082", "#080C18"]')
   OR (name = 'Carbon Fiber' AND colors::text = '["#151515", "#212121", "#2E2E2E", "#6B6B6B", "#0F0F0F"]')
   OR (name = 'Night Ocean' AND colors::text = '["#0B1F33", "#12314B", "#1E4A74", "#61798F", "#071223"]')
   OR (name = 'Onyx Stone' AND colors::text = '["#1A1A1D", "#2C2C34", "#464651", "#70707F", "#101014"]')
   OR (name = 'Deep Cosmic' AND colors::text = '["#0C111D", "#191F35", "#203464", "#5B6B8C", "#080C17"]')
   OR (name = 'Twilight Blue' AND colors::text = '["#16192B", "#212741", "#354A7A", "#6D7FA0", "#0C0F1E"]')
   OR (name = 'Obsidian Night' AND colors::text = '["#121426", "#1D2441", "#2A3972", "#6472A0", "#0A0D1C"]')
   OR (name = 'Shadow Grey' AND colors::text = '["#1F1F2A", "#272737", "#3C3C5A", "#777798", "#0C0C14"]')
   OR (name = 'Slate Dark' AND colors::text = '["#16181F", "#252A3C", "#3B4771", "#7280A2", "#0A0B15"]')
   OR (name = 'Deep Navy' AND colors::text = '["#0E1422", "#1A2642", "#30528A", "#6A83AA", "#070B18"]')
   OR (name = 'Gunmetal' AND colors::text = '["#20202A", "#2E2E44", "#445E8A", "#7C8BA6", "#12121C"]')
   OR (name = 'Midnight Marine' AND colors::text = '["#0D1623", "#1A2B48", "#2C4F8C", "#688BAD", "#070F1B"]')
   OR (name = 'Dark Matter' AND colors::text = '["#1C202B", "#272D42", "#3B4F83", "#7A8EB3", "#11141F"]')
   OR (name = 'Deep Horizon' AND colors::text = '["#0F131C", "#171D30", "#27436F", "#6584A1", "#090B14"]')
   OR (name = 'Night Watch' AND colors::text = '["#14171D", "#1F253B", "#2E3A73", "#7288B1", "#0D0F17"]')
   OR (name = 'Eclipse' AND colors::text = '["#1E1E28", "#2A2A3F", "#435786", "#7B8BA9", "#0F0F18"]')
   OR (name = 'Galactic Dark' AND colors::text = '["#0A101F", "#15243A", "#3462A0", "#7A97BE", "#060C17"]');

-- Delete 'New Light Palettes'
DELETE FROM palettes 
WHERE (name = 'Warm White' AND colors::text = '["#FFFDF8", "#FFEEDD", "#FFD6C9", "#FFB8B1", "#FFF3E8"]')
   OR (name = 'Cool White' AND colors::text = '["#F8FAFF", "#E6ECFF", "#CCD7FF", "#B3C1FF", "#F2F5FF"]')
   OR (name = 'Soft Yellow' AND colors::text = '["#FFFEEE", "#FFF6C8", "#FFEEA2", "#FFE57A", "#FFF9DB"]')
   OR (name = 'Pale Blue' AND colors::text = '["#F1FBFF", "#D8F3FF", "#BEEBFF", "#A3E2FF", "#E8F9FF"]')
   OR (name = 'Soft Pink' AND colors::text = '["#FFF7FA", "#FFE3EF", "#FFCFE5", "#FFB9D8", "#FFF0F6"]')
   OR (name = 'Pale Green' AND colors::text = '["#F9FFF4", "#EBFFD6", "#DAFFB8", "#C6FF96", "#F3FFEB"]')
   OR (name = 'Soft Lavender' AND colors::text = '["#FDF8FF", "#F1E4FF", "#E3CEFF", "#D4B7FF", "#F7F0FF"]')
   OR (name = 'Minty Fresh' AND colors::text = '["#F4FFF9", "#DCFFEE", "#C2FFE2", "#A7FFD6", "#ECFFF6"]')
   OR (name = 'Peach Cream' AND colors::text = '["#FFF9F2", "#FFE8D1", "#FFD6AF", "#FFC28A", "#FFF1E2"]')
   OR (name = 'Sky Blue' AND colors::text = '["#F6FCFF", "#E0F6FF", "#C9EEFF", "#B0E6FF", "#EDF9FF"]')
   OR (name = 'Sunny Day' AND colors::text = '["#FFFEF5", "#FFF4CC", "#FFEAA3", "#FFE07A", "#FFF9E6"]')
   OR (name = 'Lilac Mist' AND colors::text = '["#FAF7FF", "#E8E1FF", "#D5CBFF", "#C1B4FF", "#F3EFFF"]')
   OR (name = 'Aqua Breeze' AND colors::text = '["#F7FFFE", "#DFFFFA", "#C6FFF3", "#ACFFEB", "#EEFFFB"]')
   OR (name = 'Rose Petal' AND colors::text = '["#FFF7F4", "#FFE1DA", "#FFCAC0", "#FFB2A6", "#FFF0EB"]')
   OR (name = 'Lime Sorbet' AND colors::text = '["#F8FFF1", "#E9FFD0", "#D8FFAE", "#C6FF8A", "#F1FFE5"]')
   OR (name = 'Cotton Candy' AND colors::text = '["#FFF8FD", "#FFE2F6", "#FFCCEE", "#FFB4E4", "#FFF1FA"]')
   OR (name = 'Seafoam' AND colors::text = '["#F5FBF8", "#DCF3EC", "#C2EADF", "#A8E0D1", "#ECF8F4"]')
   OR (name = 'Lemon Chiffon' AND colors::text = '["#FFFDF0", "#FFF2B8", "#FFE67F", "#FFD944", "#FFF8D9"]')
   OR (name = 'Periwinkle' AND colors::text = '["#F3F9FF", "#DAECFF", "#C0DEFF", "#A6CEFF", "#EAF3FF"]')
   OR (name = 'Apricot' AND colors::text = '["#FFFAF6", "#FFEADB", "#FFD9BF", "#FFC6A0", "#FFF3EA"]');
