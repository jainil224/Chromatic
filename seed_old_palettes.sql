-- ============================================
-- SEED OLD PALETTES (RESTORE)
-- Generated from src/data/palettes.ts
-- ============================================

-- Section: dark
DELETE FROM palettes WHERE section = 'dark';
INSERT INTO palettes (name, colors, tags, section, created_at)
VALUES
  ('Midnight Ember', '["#1a1a2e", "#16213e", "#0f3460", "#e94560", "#ff6b6b"]', '["dramatic","warm"]', 'dark', NOW()),
  ('Forest Depths', '["#0d1b2a", "#1b263b", "#415a77", "#778da9", "#e0e1dd"]', '["nature","calm"]', 'dark', NOW()),
  ('Neon Noir', '["#10002b", "#240046", "#3c096c", "#5a189a", "#ff00ff"]', '["cyberpunk","vibrant"]', 'dark', NOW()),
  ('Autumn Night', '["#2d2a32", "#4a3728", "#6b4423", "#c77b30", "#e5c185"]', '["warm","cozy"]', 'dark', NOW()),
  ('Ocean Abyss', '["#03045e", "#023e8a", "#0077b6", "#00b4d8", "#90e0ef"]', '["ocean","gradient"]', 'dark', NOW()),
  ('Carbon Rose', '["#1a1a1d", "#2b2b2b", "#4e4e50", "#c3073f", "#950740"]', '["elegant","bold"]', 'dark', NOW()),
  ('Deep Space', '["#0b0c10", "#1f2833", "#45a29e", "#66fcf1", "#c5c6c7"]', '["tech","futuristic"]', 'dark', NOW()),
  ('Volcanic', '["#1a1a1a", "#2d2d2d", "#4a4a4a", "#ff4500", "#ffa500"]', '["fire","intense"]', 'dark', NOW()),
  ('Nordic Aurora', '["#0a0a0f", "#1a1a2e", "#2d4a3e", "#4ecdc4", "#a8e6cf"]', '["nordic","aurora"]', 'dark', NOW()),
  ('Wine Cellar', '["#1a0a0a", "#2d1515", "#4a2020", "#722f37", "#b8860b"]', '["wine","luxe"]', 'dark', NOW()),
  ('Midnight Jazz', '["#0d0d0d", "#1a1a2e", "#2d2d5a", "#4a4a8a", "#ffd700"]', '["jazz","classic"]', 'dark', NOW()),
  ('Cyber Punk', '["#0a0a0a", "#1a0a2e", "#ff00ff", "#00ffff", "#ffff00"]', '["cyber","neon"]', 'dark', NOW()),
  ('Obsidian Gold', '["#0a0a0a", "#1a1a1a", "#2d2d2d", "#b8860b", "#ffd700"]', '["luxury","gold"]', 'dark', NOW()),
  ('Dark Forest', '["#0a0f0a", "#1a2f1a", "#2d4a2d", "#4a6b4a", "#8fbc8f"]', '["forest","nature"]', 'dark', NOW()),
  ('Blood Moon', '["#0a0505", "#1a0a0a", "#2d1515", "#8b0000", "#dc143c"]', '["dark","intense"]', 'dark', NOW()),
  ('Electric Storm', '["#0a0a1a", "#1a1a3a", "#2d2d5a", "#4169e1", "#00bfff"]', '["electric","storm"]', 'dark', NOW()),
  ('Shadow Realm', '["#050505", "#0a0a0a", "#1a1a1a", "#2d2d2d", "#4a4a4a"]', '["minimal","dark"]', 'dark', NOW()),
  ('Toxic Waste', '["#0a0a0a", "#1a2a1a", "#2d4a2d", "#7fff00", "#adff2f"]', '["toxic","neon"]', 'dark', NOW()),
  ('Purple Haze', '["#0a0510", "#1a0a20", "#2d1540", "#4b0082", "#9370db"]', '["purple","dreamy"]', 'dark', NOW()),
  ('Dark Chocolate', '["#0a0505", "#1a0f0a", "#2d1f15", "#3d2914", "#5d4037"]', '["brown","warm"]', 'dark', NOW()),
  ('Arctic Night', '["#0a0f1a", "#1a2a3a", "#2d4a5a", "#4a6a7a", "#87ceeb"]', '["arctic","cold"]', 'dark', NOW()),
  ('Ember Glow', '["#0a0505", "#1a0a05", "#2d1505", "#ff4500", "#ff6347"]', '["ember","warm"]', 'dark', NOW()),
  ('Matrix Green', '["#0a0a0a", "#0a1a0a", "#0d2d0d", "#00ff00", "#32cd32"]', '["matrix","tech"]', 'dark', NOW()),
  ('Royal Velvet', '["#0a0510", "#1a0a20", "#2d1030", "#4b0082", "#8b008b"]', '["royal","luxe"]', 'dark', NOW()),
  ('Steampunk', '["#1a1510", "#2d2015", "#4a3020", "#b87333", "#cd7f32"]', '["steampunk","vintage"]', 'dark', NOW()),
  ('Deep Sea', '["#000510", "#001020", "#002040", "#003060", "#004080"]', '["ocean","deep"]', 'dark', NOW()),
  ('Noir Detective', '["#0a0a0a", "#1a1a1a", "#2d2d2d", "#696969", "#a9a9a9"]', '["noir","classic"]', 'dark', NOW()),
  ('Crimson Night', '["#0a0505", "#1a0a0a", "#2d0f0f", "#dc143c", "#ff1493"]', '["crimson","bold"]', 'dark', NOW()),
  ('Twilight Zone', '["#0a0a15", "#1a1a2a", "#2d2d4a", "#4a4a6a", "#6a6a8a"]', '["twilight","mystic"]', 'dark', NOW()),
  ('Dark Amber', '["#0a0805", "#1a100a", "#2d1a0f", "#ff8c00", "#ffa500"]', '["amber","warm"]', 'dark', NOW()),
  ('Galaxy Core', '["#050510", "#0a0a20", "#1a1a40", "#4169e1", "#9370db"]', '["galaxy","space"]', 'dark', NOW()),
  ('Onyx Jade', '["#0a0a0a", "#1a1a1a", "#2d2d2d", "#00a86b", "#50c878"]', '["jade","elegant"]', 'dark', NOW()),
  ('Midnight Plum', '["#0a050a", "#1a0a1a", "#2d102d", "#8e4585", "#dda0dd"]', '["plum","soft"]', 'dark', NOW()),
  ('Dark Teal', '["#050a0a", "#0a1a1a", "#0f2d2d", "#008080", "#20b2aa"]', '["teal","calm"]', 'dark', NOW()),
  ('Black Pearl', '["#050505", "#0a0a0a", "#1a1a1a", "#2f4f4f", "#708090"]', '["pearl","elegant"]', 'dark', NOW()),
  ('Molten Lava', '["#0a0505", "#1a0a05", "#2d0f05", "#ff4500", "#ff0000"]', '["lava","hot"]', 'dark', NOW()),
  ('Phantom Blue', '["#050510", "#0a0a20", "#0f0f40", "#191970", "#4169e1"]', '["phantom","deep"]', 'dark', NOW()),
  ('Dark Sage', '["#0a0f0a", "#1a2a1a", "#2d4a2d", "#6b8e23", "#9acd32"]', '["sage","natural"]', 'dark', NOW()),
  ('Ruby Night', '["#0a0505", "#1a0a0a", "#2d0f0f", "#9b111e", "#e0115f"]', '["ruby","precious"]', 'dark', NOW()),
  ('Dark Steel', '["#0a0a0a", "#1a1a1a", "#2d2d2d", "#4682b4", "#b0c4de"]', '["steel","industrial"]', 'dark', NOW()),
  ('Shadow Purple', '["#0a050f", "#1a0a1f", "#2d0f3f", "#6a0dad", "#9932cc"]', '["shadow","mystic"]', 'dark', NOW()),
  ('Dark Coral', '["#0a0505", "#1a0a0a", "#2d1515", "#cd5c5c", "#f08080"]', '["coral","warm"]', 'dark', NOW()),
  ('Night Sky', '["#000005", "#00000a", "#000020", "#191970", "#000080"]', '["night","sky"]', 'dark', NOW()),
  ('Dark Bronze', '["#0a0805", "#1a100a", "#2d1a10", "#cd7f32", "#b8860b"]', '["bronze","metallic"]', 'dark', NOW()),
  ('Mystic Violet', '["#0a0510", "#1a0a20", "#2d0f40", "#8a2be2", "#9400d3"]', '["violet","mystic"]', 'dark', NOW()),
  ('Dark Olive', '["#0a0a05", "#1a1a0a", "#2d2d10", "#556b2f", "#6b8e23"]', '["olive","earthy"]', 'dark', NOW()),
  ('Obsidian Blue', '["#050510", "#0a0a1a", "#0f0f2d", "#1e3a5f", "#4a6fa5"]', '["obsidian","cool"]', 'dark', NOW()),
  ('Dark Rose', '["#0a0508", "#1a0a10", "#2d0f1a", "#c71585", "#db7093"]', '["rose","romantic"]', 'dark', NOW()),
  ('Charcoal Ember', '["#0a0a0a", "#1a1a1a", "#2d2d2d", "#ff4500", "#cd853f"]', '["charcoal","warm"]', 'dark', NOW()),
  ('Abyss Green', '["#050a05", "#0a1a0a", "#0f2d0f", "#006400", "#228b22"]', '["abyss","forest"]', 'dark', NOW())
ON CONFLICT DO NOTHING;

-- Section: light
DELETE FROM palettes WHERE section = 'light';
INSERT INTO palettes (name, colors, tags, section, created_at)
VALUES
  ('Morning Mist', '["#f8f9fa", "#e9ecef", "#dee2e6", "#6c757d", "#212529"]', '["minimal","clean"]', 'light', NOW()),
  ('Peach Blossom', '["#fff5eb", "#ffd6ba", "#ffb088", "#ff8b5e", "#e85d04"]', '["warm","soft"]', 'light', NOW()),
  ('Sage Garden', '["#f1faee", "#a8dadc", "#457b9d", "#1d3557", "#e63946"]', '["nature","balanced"]', 'light', NOW()),
  ('Lavender Fields', '["#f8f0fc", "#e5dbff", "#c0a9ff", "#8c6bff", "#5c3bff"]', '["calm","dreamy"]', 'light', NOW()),
  ('Sand Dune', '["#fefae0", "#dda15e", "#bc6c25", "#606c38", "#283618"]', '["earthy","natural"]', 'light', NOW()),
  ('Arctic Blue', '["#f0f8ff", "#caf0f8", "#90e0ef", "#0096c7", "#023e8a"]', '["cool","fresh"]', 'light', NOW()),
  ('Sunset Glow', '["#fff4e6", "#ffe8cc", "#ffc8a2", "#ff7f50", "#dc143c"]', '["vibrant","warm"]', 'light', NOW()),
  ('Cream Noir', '["#faf8f5", "#f0ebe3", "#d4c9be", "#7d6b5a", "#2b2118"]', '["elegant","sophisticated"]', 'light', NOW()),
  ('Cotton Candy', '["#fff0f5", "#ffb6c1", "#ff69b4", "#ff1493", "#c71585"]', '["sweet","playful"]', 'light', NOW()),
  ('Mint Fresh', '["#f0fff4", "#c6f6d5", "#9ae6b4", "#68d391", "#48bb78"]', '["mint","fresh"]', 'light', NOW()),
  ('Lemon Zest', '["#fffff0", "#fefcbf", "#faf089", "#ecc94b", "#d69e2e"]', '["citrus","bright"]', 'light', NOW()),
  ('Sky High', '["#f0f9ff", "#e0f2fe", "#bae6fd", "#7dd3fc", "#38bdf8"]', '["sky","airy"]', 'light', NOW()),
  ('Rose Garden', '["#fff1f2", "#ffe4e6", "#fecdd3", "#fda4af", "#fb7185"]', '["rose","romantic"]', 'light', NOW()),
  ('Spring Meadow', '["#f0fdf4", "#dcfce7", "#bbf7d0", "#86efac", "#4ade80"]', '["spring","fresh"]', 'light', NOW()),
  ('Coral Reef', '["#fff7ed", "#ffedd5", "#fed7aa", "#fdba74", "#fb923c"]', '["coral","tropical"]', 'light', NOW()),
  ('Ocean Breeze', '["#ecfeff", "#cffafe", "#a5f3fc", "#67e8f9", "#22d3ee"]', '["ocean","refreshing"]', 'light', NOW()),
  ('Vanilla Cream', '["#fffbeb", "#fef3c7", "#fde68a", "#fcd34d", "#fbbf24"]', '["vanilla","warm"]', 'light', NOW()),
  ('Blush Pink', '["#fdf2f8", "#fce7f3", "#fbcfe8", "#f9a8d4", "#f472b6"]', '["blush","soft"]', 'light', NOW()),
  ('Forest Glade', '["#f0fdf4", "#d1fae5", "#a7f3d0", "#6ee7b7", "#34d399"]', '["forest","natural"]', 'light', NOW()),
  ('Dusty Rose', '["#faf5f5", "#f5e6e8", "#e8c4c8", "#d4a5a5", "#bc8f8f"]', '["dusty","vintage"]', 'light', NOW()),
  ('Powder Blue', '["#f0f8ff", "#e6f2ff", "#cce5ff", "#99ccff", "#66b2ff"]', '["powder","soft"]', 'light', NOW()),
  ('Honeydew', '["#f0fff0", "#e0ffe0", "#c0ffc0", "#90ee90", "#50c878"]', '["honey","fresh"]', 'light', NOW()),
  ('Seashell', '["#fff5ee", "#ffeedd", "#ffd4b8", "#ffb088", "#ff8c5a"]', '["shell","beach"]', 'light', NOW()),
  ('Lilac Dream', '["#f8f4ff", "#ede4ff", "#dcc8ff", "#c4a8ff", "#a855f7"]', '["lilac","dreamy"]', 'light', NOW()),
  ('Ivory Tower', '["#fffff0", "#fafad2", "#eee8aa", "#daa520", "#b8860b"]', '["ivory","classic"]', 'light', NOW()),
  ('Baby Blue', '["#f0f8ff", "#e0f0ff", "#b0d4f1", "#89cff0", "#6cb4ee"]', '["baby","gentle"]', 'light', NOW()),
  ('Champagne', '["#faf8f0", "#f7f0e0", "#f7e7ce", "#f1d4a8", "#d4af37"]', '["champagne","luxe"]', 'light', NOW()),
  ('Soft Coral', '["#fff5f5", "#ffe0e0", "#ffb3b3", "#ff8080", "#ff6b6b"]', '["coral","soft"]', 'light', NOW()),
  ('Eucalyptus', '["#f0f5f0", "#d8e8d8", "#b0d0b0", "#88b888", "#5f9f5f"]', '["eucalyptus","calm"]', 'light', NOW()),
  ('Apricot', '["#fff8f0", "#ffe8d0", "#ffd8a8", "#ffb878", "#ff9040"]', '["apricot","warm"]', 'light', NOW()),
  ('Wisteria', '["#f8f0ff", "#e8d8f8", "#d0b8f0", "#b898e8", "#9f70e0"]', '["wisteria","floral"]', 'light', NOW()),
  ('Sand Stone', '["#faf6f0", "#f0e8d8", "#e0d0b8", "#c8b898", "#a89878"]', '["sand","natural"]', 'light', NOW()),
  ('Aquamarine', '["#f0ffff", "#d0fff0", "#a0ffe0", "#7fffd4", "#40e0d0"]', '["aqua","tropical"]', 'light', NOW()),
  ('Buttercream', '["#fffef0", "#fff8d0", "#fff0a0", "#ffe870", "#ffd700"]', '["butter","sunny"]', 'light', NOW()),
  ('Mauve Mist', '["#f8f0f8", "#f0e0f0", "#e0c8e0", "#d0a8d0", "#c088c0"]', '["mauve","soft"]', 'light', NOW()),
  ('Seafoam', '["#f0fff8", "#d0fff0", "#a0f0d8", "#70e8c0", "#3eb489"]', '["seafoam","fresh"]', 'light', NOW()),
  ('Peach Cream', '["#fff8f4", "#ffe8e0", "#ffd8c8", "#ffc0a0", "#ffa878"]', '["peach","creamy"]', 'light', NOW()),
  ('Sky Lavender', '["#f8f8ff", "#e8e8ff", "#d0d0ff", "#b0b0ff", "#9090ff"]', '["sky","serene"]', 'light', NOW()),
  ('Warm Sand', '["#faf8f0", "#f0e8d0", "#e8d8b0", "#d8c090", "#c8a870"]', '["sand","warm"]', 'light', NOW()),
  ('Cherry Blossom', '["#fff0f8", "#ffe0f0", "#ffc0e0", "#ffa0d0", "#ff80c0"]', '["cherry","japanese"]', 'light', NOW()),
  ('Soft Sage', '["#f4f8f4", "#e0ece0", "#c8dcc8", "#b0ccb0", "#98bc98"]', '["sage","muted"]', 'light', NOW()),
  ('Tangerine', '["#fff8f0", "#ffe8d0", "#ffd0a0", "#ffb060", "#ff9020"]', '["tangerine","vibrant"]', 'light', NOW()),
  ('Periwinkle', '["#f0f0ff", "#e0e0ff", "#c8c8ff", "#a8a8ff", "#8888ff"]', '["periwinkle","cool"]', 'light', NOW()),
  ('Almond', '["#faf6f0", "#f0e8dc", "#e8dcc8", "#d8c8b0", "#c8b498"]', '["almond","neutral"]', 'light', NOW()),
  ('Ice Blue', '["#f0ffff", "#e0ffff", "#c0ffff", "#a0ffff", "#80ffff"]', '["ice","cold"]', 'light', NOW()),
  ('Rose Quartz', '["#fff0f0", "#ffe0e0", "#ffc8c8", "#ffb0b0", "#f7a8a8"]', '["quartz","crystal"]', 'light', NOW()),
  ('Pistachio', '["#f8fff0", "#e8ffd8", "#d0f0b0", "#b8e088", "#93c759"]', '["pistachio","fresh"]', 'light', NOW()),
  ('Shell Pink', '["#fff8f8", "#fff0f0", "#ffe8e8", "#ffd8d8", "#ffc8c8"]', '["shell","delicate"]', 'light', NOW()),
  ('Cloud White', '["#ffffff", "#fafafa", "#f5f5f5", "#e8e8e8", "#d0d0d0"]', '["cloud","minimal"]', 'light', NOW()),
  ('Golden Hour', '["#fffaf0", "#fff0d0", "#ffe0a0", "#ffd070", "#ffc040"]', '["golden","sunset"]', 'light', NOW()),
  ('Sunny Day', '["#0f1c2e", "#1e3a5f", "#f4c430", "#ffa500", "#87ceeb"]', '["summer","sunny","sky"]', 'light', NOW()),
  ('Tropical Summer', '["#102820", "#1f4f4a", "#30d5c8", "#ff6f61", "#6fffe9"]', '["summer","tropical","mint"]', 'light', NOW()),
  ('Sunset Vibes', '["#2b0f0f", "#4a1c1c", "#ff7a00", "#ffb347", "#ffd93d"]', '["summer","sunset","warm"]', 'light', NOW()),
  ('Beach Light', '["#1a2b3c", "#2e4a62", "#00e5ff", "#f5e6c8", "#fffdf5"]', '["summer","beach","cool"]', 'light', NOW()),
  ('Lemon Breeze', '["#1a1f0a", "#2d3a12", "#ffe135", "#ffd95a", "#fff3b0"]', '["summer","citrus","fresh"]', 'light', NOW()),
  ('Palm Coast', '["#0f2a24", "#1f4d43", "#2ecc71", "#6fffe9", "#c7f9cc"]', '["summer","tropical","green"]', 'light', NOW()),
  ('Ocean Spray', '["#081a2b", "#123a5c", "#1ca9c9", "#5fd3e3", "#b8f3ff"]', '["summer","ocean","cool"]', 'light', NOW()),
  ('Hibiscus Pop', '["#2a0a14", "#4a1425", "#ff4f79", "#ff8fab", "#ffd6e0"]', '["summer","floral","vibrant"]', 'light', NOW()),
  ('Peach Heat', '["#2b140f", "#4f2a1d", "#ff9f45", "#ffb7a5", "#ffe0cc"]', '["summer","peach","warm"]', 'light', NOW()),
  ('Golden Hour Summer', '["#24140a", "#4a2c18", "#f4c430", "#ffcc70", "#fff1c1"]', '["summer","golden","sunset"]', 'light', NOW()),
  ('Watermelon Chill', '["#1f0a0f", "#3a141c", "#ff3b3b", "#ff6f91", "#ffe3ea"]', '["summer","fruit","sweet"]', 'light', NOW()),
  ('Summer Rainbow', '["#1a1a2e", "#2a2a4a", "#ff2f92", "#00e5ff", "#fff176"]', '["summer","rainbow","vibrant"]', 'light', NOW()),
  ('Beach Sand', '["#1e1a14", "#3a3326", "#f5e6c8", "#e6d3a3", "#fff8e7"]', '["summer","beach","neutral"]', 'light', NOW()),
  ('Coastal Wind', '["#102030", "#1f3b5c", "#87ceeb", "#a8ddf0", "#e6f7ff"]', '["summer","coastal","breezy"]', 'light', NOW()),
  ('Citrus Pop', '["#2a2a0a", "#4a4a14", "#ffd93d", "#ffea70", "#fff8cc"]', '["summer","citrus","bright"]', 'light', NOW()),
  ('Fresh Mint', '["#0a241e", "#145046", "#30d5c8", "#6fffe9", "#d6fff6"]', '["summer","mint","fresh"]', 'light', NOW()),
  ('Heatwave', '["#2a0f0a", "#4a1c14", "#ff4500", "#ff7a00", "#ffd1a1"]', '["summer","hot","intense"]', 'light', NOW()),
  ('Sun Kissed', '["#2a240a", "#4a4214", "#ffc300", "#ffd966", "#fff3b0"]', '["summer","sunny","gold"]', 'light', NOW()),
  ('Lagoon', '["#081f24", "#124a54", "#00e5ff", "#66f2ff", "#d6fbff"]', '["summer","ocean","blue"]', 'light', NOW()),
  ('Berry Splash', '["#1f0a14", "#3a1425", "#ff2f92", "#ff77b7", "#ffe0f0"]', '["summer","berry","sweet"]', 'light', NOW()),
  ('Summer Field', '["#1a2410", "#2f4a1f", "#a4ff3f", "#c8ff7a", "#ecffd9"]', '["summer","nature","green"]', 'light', NOW()),
  ('Tropical Juice', '["#2a120a", "#4a2414", "#ff7a00", "#ffa94d", "#ffe1b3"]', '["summer","fruit","warm"]', 'light', NOW()),
  ('Soft Daylight', '["#1a1f2a", "#2a304a", "#a8ddf0", "#cfefff", "#f5fbff"]', '["summer","sky","soft"]', 'light', NOW()),
  ('Island Glow', '["#0f241a", "#1f4a33", "#2ecc71", "#7dffb3", "#d9ffe9"]', '["summer","island","fresh"]', 'light', NOW())
ON CONFLICT DO NOTHING;

-- Section: pastel
DELETE FROM palettes WHERE section = 'pastel';
INSERT INTO palettes (name, colors, tags, section, created_at)
VALUES
  ('Cotton Candy', '["#fff5fb", "#f6e6f2", "#f0cfe7", "#e8b4d8", "#cfa3c8"]', '["pastel","pink","sweet"]', 'pastel', NOW()),
  ('Peach Milk', '["#fff8f5", "#fff1eb", "#ffd6c9", "#ffb7a5", "#f2a38c"]', '["pastel","peach","warm"]', 'pastel', NOW()),
  ('Soft Lemon', '["#fffef2", "#fff9db", "#fff3b0", "#ffe066", "#ffd43b"]', '["pastel","lemon","yellow"]', 'pastel', NOW()),
  ('Mint Cream', '["#f4fffb", "#e9fbf3", "#c8f7e1", "#9ee6c3", "#6fd3a3"]', '["pastel","mint","green"]', 'pastel', NOW()),
  ('Sky Milk', '["#f7fbff", "#edf6ff", "#d6ecff", "#b5ddff", "#8ecaff"]', '["pastel","sky","blue"]', 'pastel', NOW()),
  ('Blush Rose', '["#fff6f8", "#fdecef", "#f9cfd8", "#f4a9b8", "#e58fa1"]', '["pastel","rose","pink"]', 'pastel', NOW()),
  ('Vanilla Cream', '["#fffdf9", "#faf7f2", "#f2eadf", "#e6d3b3", "#d1bfa0"]', '["pastel","vanilla","cream"]', 'pastel', NOW()),
  ('Lavender Milk', '["#faf8ff", "#f3efff", "#e0d8ff", "#c7b7ff", "#a896f0"]', '["pastel","lavender","purple"]', 'pastel', NOW()),
  ('Aqua Foam', '["#f5fffe", "#eafaf9", "#c9f1ef", "#9be3df", "#6fd1cb"]', '["pastel","aqua","blue"]', 'pastel', NOW()),
  ('Soft Tulip', '["#fff7fa", "#fff0f4", "#ffd6e3", "#ffb3cc", "#f28fb1"]', '["pastel","tulip","pink"]', 'pastel', NOW()),
  ('Melon Mist', '["#f9fffb", "#f3fff6", "#dcf7e5", "#bdeecf", "#95ddb1"]', '["pastel","melon","green"]', 'pastel', NOW()),
  ('Cloud Grey', '["#fafbff", "#f2f3f7", "#e0e2ea", "#c6c9d6", "#a9adbf"]', '["pastel","grey","cloud"]', 'pastel', NOW()),
  ('Sakura Light', '["#fff7fa", "#fff1f5", "#ffd9e2", "#ffb6c9", "#e99aac"]', '["pastel","sakura","pink"]', 'pastel', NOW()),
  ('Pastel Citrus', '["#fffff5", "#fdfde7", "#f8f6c1", "#f0ec8a", "#dcd66a"]', '["pastel","citrus","yellow"]', 'pastel', NOW()),
  ('Oat Milk', '["#fdfbf8", "#f7f4ef", "#ede6db", "#ddd0bd", "#c4b59f"]', '["pastel","oat","neutral"]', 'pastel', NOW()),
  ('Berry Cream', '["#fff6fb", "#fbeef4", "#f4d1e3", "#e9a9cb", "#d28bb1"]', '["pastel","berry","pink"]', 'pastel', NOW()),
  ('Seashell', '["#fffaf7", "#fff7f3", "#fbe3d7", "#f2c6b3", "#e3a88e"]', '["pastel","seashell","warm"]', 'pastel', NOW()),
  ('Pistachio Soft', '["#f8fff7", "#f2f9f1", "#dbefda", "#bfe3be", "#97c997"]', '["pastel","pistachio","green"]', 'pastel', NOW()),
  ('Baby Pink', '["#fff8fb", "#fff3f6", "#ffdfe7", "#ffc1d1", "#f39fb3"]', '["pastel","pink","soft"]', 'pastel', NOW()),
  ('Soft Dove', '["#fcfdff", "#f6f7f8", "#e8eaee", "#d2d6dd", "#b8beca"]', '["pastel","dove","grey"]', 'pastel', NOW())
ON CONFLICT DO NOTHING;

-- Section: vintage
DELETE FROM palettes WHERE section = 'vintage';
INSERT INTO palettes (name, colors, tags, section, created_at)
VALUES
  ('Old Paper', '["#2b241b", "#4a3f2f", "#c9b28b", "#a8916f", "#f4ecd8"]', '["vintage","brown","paper"]', 'vintage', NOW()),
  ('Coffee House', '["#1e1410", "#3b261a", "#8b5a2b", "#b08d57", "#f1e3c6"]', '["vintage","coffee","warm"]', 'vintage', NOW()),
  ('Sepia Ink', '["#2a1d14", "#4a3423", "#9c6b3d", "#c19a6b", "#f6ead7"]', '["vintage","sepia","ink"]', 'vintage', NOW()),
  ('Linen Beige', '["#2b2a23", "#47463b", "#b6aa8f", "#d2c7ad", "#f9f5ec"]', '["vintage","beige","linen"]', 'vintage', NOW()),
  ('Wine Barrel', '["#2a0f14", "#4a1f28", "#7a3b46", "#a86a74", "#f1d6da"]', '["vintage","wine","red"]', 'vintage', NOW()),
  ('Rustic Wood', '["#1f160f", "#3a291c", "#7c5531", "#b08a5a", "#f3e6d3"]', '["vintage","wood","brown"]', 'vintage', NOW()),
  ('Candle Light', '["#2a2016", "#4a3825", "#d4a373", "#e1b382", "#fff3e0"]', '["vintage","candle","light"]', 'vintage', NOW()),
  ('Film Grain', '["#1f1e1a", "#3a3934", "#8f8b7d", "#b0aca0", "#f5f3ed"]', '["vintage","film","grain"]', 'vintage', NOW()),
  ('Travel Trunk', '["#241b16", "#423228", "#8c6b4f", "#b89a7c", "#f4eadf"]', '["vintage","travel","leather"]', 'vintage', NOW()),
  ('Old Newspaper', '["#2a2925", "#47463f", "#9f9b8c", "#c1beae", "#faf7f0"]', '["vintage","news","grey"]', 'vintage', NOW()),
  ('Thread Spool', '["#1f1a14", "#3a2f24", "#a6784f", "#c9a476", "#f6ecdd"]', '["vintage","thread","craft"]', 'vintage', NOW()),
  ('Autumn Dust', '["#2a1c12", "#4a3220", "#c47a3d", "#e0a36f", "#f8e4cf"]', '["vintage","autumn","dust"]', 'vintage', NOW()),
  ('Feather Brown', '["#2a221c", "#4a3f36", "#9b8573", "#c3ad9a", "#f5ede5"]', '["vintage","feather","soft"]', 'vintage', NOW()),
  ('Gentleman''s Club', '["#1f1a17", "#3a2f2a", "#7d5a3c", "#b08d6a", "#efe3d3"]', '["vintage","classy","dark"]', 'vintage', NOW()),
  ('Antique Window', '["#2a241f", "#4a423b", "#9e8c7a", "#c9b8a6", "#f7f1e9"]', '["vintage","antique","window"]', 'vintage', NOW()),
  ('Salt & Pepper', '["#1e1e1c", "#3a3a37", "#7f7f78", "#a9a9a2", "#f3f3ef"]', '["vintage","salt","pepper"]', 'vintage', NOW()),
  ('Wheat Field', '["#2a2316", "#4a4028", "#d2b48c", "#e3c9a6", "#fff4df"]', '["vintage","wheat","field"]', 'vintage', NOW()),
  ('Soap Bar', '["#2a2a27", "#474742", "#bdbdb5", "#d6d6ce", "#fafaf5"]', '["vintage","soap","clean"]', 'vintage', NOW()),
  ('Old Furniture', '["#241a14", "#423026", "#8b6a4f", "#bca083", "#f2e7dc"]', '["vintage","furniture","wood"]', 'vintage', NOW()),
  ('Retro Archive', '["#1f1b18", "#3a332d", "#9c7c5a", "#c2a27f", "#f6ede2"]', '["vintage","retro","archive"]', 'vintage', NOW())
ON CONFLICT DO NOTHING;

-- Section: retro
DELETE FROM palettes WHERE section = 'retro';
INSERT INTO palettes (name, colors, tags, section, created_at)
VALUES
  ('VHS Sunset', '["#1b1026", "#3a1c4a", "#ff2f92", "#ff7ad9", "#ffd1f0"]', '["retro","vhs","sunset"]', 'retro', NOW()),
  ('Arcade Glow', '["#0f1028", "#1f1f4a", "#00e5ff", "#7df9ff", "#f0ffff"]', '["retro","arcade","glow"]', 'retro', NOW()),
  ('Neon Tape', '["#1a092d", "#3a145a", "#ff00ff", "#00ffff", "#fff176"]', '["retro","neon","tape"]', 'retro', NOW()),
  ('CRT Screen', '["#0f1a0f", "#1f3a1f", "#39ff14", "#8aff8a", "#eaffea"]', '["retro","crt","green"]', 'retro', NOW()),
  ('Pop Soda', '["#2a0a0a", "#4a1414", "#ff3131", "#ffb703", "#fff3bf"]', '["retro","pop","soda"]', 'retro', NOW()),
  ('Cassette Pop', '["#1f0a14", "#3a1425", "#ff4f79", "#ffd166", "#fff1c1"]', '["retro","cassette","pink"]', 'retro', NOW()),
  ('Synth Night', '["#12091f", "#2a1450", "#9d4edd", "#c77dff", "#f1e9ff"]', '["retro","synth","purple"]', 'retro', NOW()),
  ('Miami Vice', '["#081a2b", "#123a5c", "#ff5ac8", "#00e5ff", "#e0fbff"]', '["retro","miami","blue"]', 'retro', NOW()),
  ('Polaroid Flash', '["#2a2410", "#4a4214", "#ffd93d", "#ff7a00", "#fff8cc"]', '["retro","polaroid","yellow"]', 'retro', NOW()),
  ('Retro Poster', '["#2a120a", "#4a2414", "#ff7a00", "#ffb347", "#ffe6c7"]', '["retro","poster","orange"]', 'retro', NOW()),
  ('Old Radio', '["#1f1a14", "#3a2f24", "#cfa15a", "#e6c28a", "#fff4df"]', '["retro","radio","brown"]', 'retro', NOW()),
  ('Game Cartridge', '["#0f1f14", "#1f3a2a", "#39ff14", "#baff39", "#f3ffe0"]', '["retro","game","green"]', 'retro', NOW()),
  ('Burnt Orange 70s', '["#2a1a0a", "#4a2e14", "#ff8c00", "#ffc27a", "#fff1d6"]', '["retro","orange","70s"]', 'retro', NOW()),
  ('Brown Vinyl', '["#1f120a", "#3a2414", "#8b5a2b", "#cfa15a", "#f3e2c7"]', '["retro","vinyl","brown"]', 'retro', NOW()),
  ('Retro Diner', '["#2a0a0a", "#4a1414", "#ff0000", "#ffd166", "#fff5cc"]', '["retro","diner","red"]', 'retro', NOW()),
  ('Laser Disc', '["#120a1f", "#2a1450", "#ff00ff", "#00e5ff", "#f0f0ff"]', '["retro","laser","purple"]', 'retro', NOW()),
  ('Electric Blue 80s', '["#0a102a", "#14204a", "#2979ff", "#7aa2ff", "#e6ecff"]', '["retro","blue","80s"]', 'retro', NOW()),
  ('Yellow Cab', '["#2a240a", "#4a4214", "#ffd300", "#ffea7a", "#fff9cc"]', '["retro","yellow","cab"]', 'retro', NOW()),
  ('Mint Arcade', '["#0a241e", "#145046", "#30d5c8", "#8effe1", "#e6fffa"]', '["retro","mint","green"]', 'retro', NOW()),
  ('Retro Catalog', '["#1f1a17", "#3a2f2a", "#c19a6b", "#e0c9a6", "#f7efe5"]', '["retro","catalog","vintage"]', 'retro', NOW())
ON CONFLICT DO NOTHING;

-- Section: neon
DELETE FROM palettes WHERE section = 'neon';
INSERT INTO palettes (name, colors, tags, section, created_at)
VALUES
  ('Neon Pulse', '["#0b0014", "#1a0033", "#ff00e6", "#00f6ff", "#12001f"]', '["neon","pulse","purple"]', 'neon', NOW()),
  ('Cyber Violet', '["#080014", "#1c003a", "#b300ff", "#00ffcc", "#14002b"]', '["neon","cyber","violet"]', 'neon', NOW()),
  ('Toxic Glow', '["#061a0d", "#0d3320", "#39ff14", "#9dff6a", "#041f11"]', '["neon","toxic","green"]', 'neon', NOW()),
  ('Electric Ice', '["#000f1a", "#00263d", "#00b3ff", "#6fe7ff", "#00121f"]', '["neon","ice","blue"]', 'neon', NOW()),
  ('Laser Pink', '["#1a0010", "#33001f", "#ff007f", "#ff66b3", "#1f0014"]', '["neon","laser","pink"]', 'neon', NOW()),
  ('Ultraviolet Night', '["#0e001f", "#22004a", "#8f00ff", "#d28bff", "#13002a"]', '["neon","ultraviolet","purple"]', 'neon', NOW()),
  ('Neon Voltage', '["#1a1600", "#332c00", "#ffee00", "#fff566", "#1f1a00"]', '["neon","voltage","yellow"]', 'neon', NOW()),
  ('Crimson Glow', '["#1a0000", "#330000", "#ff0033", "#ff6f91", "#1f0005"]', '["neon","crimson","red"]', 'neon', NOW()),
  ('Neon Matrix', '["#001a12", "#003326", "#00ff9c", "#7affc8", "#002014"]', '["neon","matrix","green"]', 'neon', NOW()),
  ('Acid Tech', '["#141a00", "#2a3300", "#ccff00", "#e6ff66", "#181f00"]', '["neon","acid","yellow"]', 'neon', NOW()),
  ('Plasma Core', '["#140014", "#330033", "#ff00ff", "#ff8cff", "#1a001a"]', '["neon","plasma","magenta"]', 'neon', NOW()),
  ('Neon Tide', '["#00141a", "#00333d", "#00ffd5", "#6ffff0", "#00191f"]', '["neon","tide","cyan"]', 'neon', NOW()),
  ('Magma Neon', '["#1a0b00", "#331500", "#ff3d00", "#ff8a50", "#1f0d00"]', '["neon","magma","orange"]', 'neon', NOW()),
  ('Radioactive Mint', '["#001a16", "#00332c", "#00ffcc", "#66ffe0", "#001f1a"]', '["neon","radioactive","mint"]', 'neon', NOW()),
  ('Neon Ember', '["#1a0f00", "#332000", "#ff9100", "#ffbf66", "#1f1300"]', '["neon","ember","orange"]', 'neon', NOW()),
  ('Hologram Blue', '["#000f1f", "#001f3d", "#0099ff", "#6fbfff", "#00142b"]', '["neon","hologram","blue"]', 'neon', NOW()),
  ('Synth Glow', '["#12001a", "#2a0033", "#d400ff", "#f27aff", "#18001f"]', '["neon","synth","purple"]', 'neon', NOW()),
  ('Laser Lime', '["#0f1a00", "#203300", "#aaff00", "#d4ff66", "#141f00"]', '["neon","lime","green"]', 'neon', NOW()),
  ('Photon Blue', '["#000a1a", "#001833", "#0066ff", "#6f9cff", "#000f1f"]', '["neon","photon","blue"]', 'neon', NOW()),
  ('Neon Orchid', '["#1a0016", "#33002c", "#ff00cc", "#ff66dd", "#1f001b"]', '["neon","orchid","pink"]', 'neon', NOW())
ON CONFLICT DO NOTHING;

-- Section: gold
DELETE FROM palettes WHERE section = 'gold';
INSERT INTO palettes (name, colors, tags, section, created_at)
VALUES
  ('Royal Gold', '["#1a1408", "#332711", "#d4af37", "#b8962e", "#f5e6b8"]', '["gold","royal","luxe"]', 'gold', NOW()),
  ('Antique Crown', '["#1c170d", "#3a2f1a", "#c9a44c", "#a88b3c", "#f2e4c4"]', '["gold","antique","crown"]', 'gold', NOW()),
  ('Champagne Luxe', '["#1a1612", "#332d26", "#e6c87a", "#c7ad6a", "#faf3dd"]', '["gold","champagne","luxury"]', 'gold', NOW()),
  ('Polished Brass', '["#1f190f", "#3d3220", "#bfa24b", "#9f863a", "#efe2b6"]', '["gold","brass","polished"]', 'gold', NOW()),
  ('Trophy Gold', '["#201806", "#40300c", "#f2c94c", "#c9a227", "#fff3c4"]', '["gold","trophy","winner"]', 'gold', NOW()),
  ('Golden Silk', '["#19140e", "#332a1d", "#dec27d", "#bfa86a", "#f8efd9"]', '["gold","silk","soft"]', 'gold', NOW()),
  ('Temple Gold', '["#1f160b", "#3b2a13", "#c79a2d", "#a57f24", "#f3e1b0"]', '["gold","temple","ancient"]', 'gold', NOW()),
  ('Sun Bar Gold', '["#1f1700", "#3d2f00", "#ffd24a", "#d4a500", "#fff1b8"]', '["gold","sun","bright"]', 'gold', NOW()),
  ('Mystic Gold', '["#1a120c", "#332216", "#bfa66a", "#9f8a56", "#efe4c9"]', '["gold","mystic","magic"]', 'gold', NOW()),
  ('Candlelight Gold', '["#1f1a12", "#3b3325", "#e0b973", "#c09a5b", "#fff4db"]', '["gold","candle","warm"]', 'gold', NOW()),
  ('Imperial Vault', '["#160f08", "#2f2011", "#b08d2c", "#8f7323", "#e8d49a"]', '["gold","imperial","vault"]', 'gold', NOW()),
  ('Noble Gold', '["#191208", "#302312", "#d1aa4b", "#ad8f3d", "#f4e3b6"]', '["gold","noble","royal"]', 'gold', NOW()),
  ('Aged Coin', '["#1c150f", "#35271d", "#a8873a", "#8c7031", "#e6d3a3"]', '["gold","coin","aged"]', 'gold', NOW()),
  ('Star Alloy', '["#1a140a", "#332812", "#f5cc5a", "#d1aa3f", "#fff0c2"]', '["gold","star","bright"]', 'gold', NOW()),
  ('Bronze Gold', '["#1f160e", "#3b2a1a", "#b08d57", "#8f7147", "#ead8b8"]', '["gold","bronze","metal"]', 'gold', NOW()),
  ('Heirloom Gold', '["#18120a", "#302214", "#c2a14a", "#a2863e", "#f1e0b4"]', '["gold","heirloom","vintage"]', 'gold', NOW()),
  ('Solar Gold', '["#1a1300", "#332600", "#ffcc33", "#d4a017", "#fff0b3"]', '["gold","solar","sun"]', 'gold', NOW()),
  ('Gilded Wood', '["#1f170f", "#3b2d1e", "#b89b5e", "#9c834d", "#efe0c1"]', '["gold","wood","gilded"]', 'gold', NOW()),
  ('Medal Shine', '["#1a1206", "#33210c", "#e6b84a", "#c49a35", "#fae9b2"]', '["gold","medal","shine"]', 'gold', NOW()),
  ('Sovereign Gold', '["#160f06", "#2f1f0c", "#cfa642", "#a88534", "#f2e0a8"]', '["gold","sovereign","royal"]', 'gold', NOW())
ON CONFLICT DO NOTHING;

-- Section: cold
DELETE FROM palettes WHERE section = 'cold';
INSERT INTO palettes (name, colors, tags, section, created_at)
VALUES
  ('Arctic Frost', '["#0C1C28", "#12314F", "#1A4D7A", "#4A6D91", "#E3F2FD"]', '["cold","arctic","frost"]', 'cold', NOW()),
  ('Polar Night', '["#031927", "#042E4C", "#054C7A", "#507B9C", "#D0EAFB"]', '["cold","polar","night"]', 'cold', NOW()),
  ('Glacier Blue', '["#0A2342", "#0E3B6D", "#0F4C81", "#5A7FA6", "#E8F4FC"]', '["cold","glacier","blue"]', 'cold', NOW()),
  ('Ice Cavern', '["#0E1F33", "#123355", "#1B4F7A", "#5C7D9D", "#DDE9F4"]', '["cold","ice","cavern"]', 'cold', NOW()),
  ('Frozen Lake', '["#0F1A28", "#0F2D4A", "#105F8A", "#6892B0", "#E6F3FA"]', '["cold","frozen","lake"]', 'cold', NOW()),
  ('Winter Sky', '["#11202E", "#143B5A", "#196A90", "#72A3C8", "#F0FAFF"]', '["cold","winter","sky"]', 'cold', NOW()),
  ('Chill Factor', '["#0D1521", "#0F3050", "#0F4D88", "#628EB7", "#E9F8FF"]', '["cold","chill","blizzard"]', 'cold', NOW()),
  ('North Pole', '["#0C2233", "#125276", "#1A76AD", "#78AFCB", "#DCEFFA"]', '["cold","north","pole"]', 'cold', NOW()),
  ('Frostbite', '["#133049", "#1A4C78", "#2F6BA3", "#86AACA", "#E2F4FB"]', '["cold","frost","bite"]', 'cold', NOW()),
  ('Cool Breeze', '["#0B2537", "#0E4A72", "#1376A5", "#78AFCF", "#DBF2FA"]', '["cold","cool","breeze"]', 'cold', NOW()),
  ('Snow Drift', '["#062234", "#0A3C6F", "#0F67A1", "#6EA9CE", "#E7F6FF"]', '["cold","snow","drift"]', 'cold', NOW()),
  ('Icicle', '["#082C40", "#0E4A73", "#1569A3", "#78A9C8", "#E1F5FF"]', '["cold","ice","icicle"]', 'cold', NOW()),
  ('Frozen Depths', '["#0F213A", "#0E4E78", "#1D75AD", "#7BAED1", "#DFF4FB"]', '["cold","frozen","depths"]', 'cold', NOW()),
  ('Cold Snap', '["#0D2938", "#13547A", "#1B6BB0", "#7AAFD3", "#E6F8FF"]', '["cold","snap","winter"]', 'cold', NOW()),
  ('Blue Steel', '["#162A43", "#1E4E80", "#2471A3", "#82AECB", "#F0FAFF"]', '["cold","steel","blue"]', 'cold', NOW()),
  ('Glory Blue', '["#0B283F", "#0C4A7B", "#1672AE", "#82B4D0", "#EAF8FF"]', '["cold","glory","blue"]', 'cold', NOW()),
  ('Iceberg', '["#0A1E2E", "#0C3D64", "#1280B0", "#85B9D6", "#DFF7FF"]', '["cold","iceberg","sea"]', 'cold', NOW()),
  ('Deep Freeze', '["#142533", "#17608A", "#1B7EBF", "#8ABED7", "#E8FAFF"]', '["cold","deep","freeze"]', 'cold', NOW()),
  ('Winter Storm', '["#09273A", "#0F4C7B", "#1895CF", "#8CC9E3", "#DFF9FF"]', '["cold","winter","storm"]', 'cold', NOW()),
  ('Glacial River', '["#0D2438", "#154A7F", "#1C7FBC", "#8BCADC", "#E9FBFF"]', '["cold","glacial","river"]', 'cold', NOW()),
  ('Nordic Night', '["#0b1d2d", "#12344d", "#1f5f8b", "#8ecae6", "#e0f4ff"]', '["cold","nordic","night"]', 'cold', NOW()),
  ('Deep Fjord', '["#0a2540", "#133b5c", "#1c6ea4", "#a9d6e5", "#edf6f9"]', '["cold","fjord","deep"]', 'cold', NOW()),
  ('Icy Lagoon', '["#081c24", "#0b3c49", "#1b6f8a", "#90dbf4", "#e6f9ff"]', '["cold","icy","lagoon"]', 'cold', NOW()),
  ('Winter Solstice', '["#0d1b2a", "#1b263b", "#415a77", "#a8dadc", "#f1faee"]', '["cold","solstice","winter"]', 'cold', NOW()),
  ('Blue Moon', '["#001f2d", "#003f5c", "#2f6690", "#9bd1e5", "#f0faff"]', '["cold","moon","blue"]', 'cold', NOW()),
  ('Midnight Breeze', '["#0a1f33", "#102a43", "#1f6f8b", "#7cc6fe", "#e3f2fd"]', '["cold","midnight","breeze"]', 'cold', NOW()),
  ('Frost Giant', '["#061826", "#0b2c3d", "#145c75", "#88c9d4", "#e9f8fa"]', '["cold","frost","giant"]', 'cold', NOW()),
  ('Crystal Lake', '["#0c2233", "#164863", "#427aa1", "#bde0fe", "#f1f7ff"]', '["cold","crystal","lake"]', 'cold', NOW()),
  ('Sapphire Ice', '["#071a2d", "#0f3057", "#00587a", "#7fbcd2", "#eaf6fb"]', '["cold","sapphire","ice"]', 'cold', NOW()),
  ('Polar Express', '["#081f2c", "#0e3a53", "#3da5d9", "#a2d6f9", "#eef9ff"]', '["cold","polar","express"]', 'cold', NOW())
ON CONFLICT DO NOTHING;

-- Section: fall
DELETE FROM palettes WHERE section = 'fall';
INSERT INTO palettes (name, colors, tags, section, created_at)
VALUES
  ('Autumn Harvest', '["#5F3B1F", "#A35622", "#D98F3C", "#E9C46A", "#F4E1C1"]', '["fall","harvest","warm"]', 'fall', NOW()),
  ('Maple Leaf', '["#8B3E2F", "#C46A4A", "#E78F5A", "#F2B27B", "#FBECE2"]', '["fall","maple","red"]', 'fall', NOW()),
  ('Pumpkin Spice', '["#7A5A2F", "#C27E3E", "#E2A15D", "#F6C89E", "#FCF2E8"]', '["fall","pumpkin","orange"]', 'fall', NOW()),
  ('Fall Sunset', '["#96302F", "#C75331", "#E27E43", "#F5A663", "#FBEDD9"]', '["fall","sunset","vibrant"]', 'fall', NOW()),
  ('Amber Woods', '["#8C331E", "#B75D33", "#DE8A4A", "#F2B27C", "#F9E8D8"]', '["fall","amber","woods"]', 'fall', NOW()),
  ('Golden Wheat', '["#6F4A1E", "#A07A35", "#C7A25F", "#E2C59F", "#F6EFE0"]', '["fall","gold","wheat"]', 'fall', NOW()),
  ('Rusty Red', '["#762F23", "#AC4E37", "#D9885B", "#F2BB9D", "#F9EEE4"]', '["fall","rust","red"]', 'fall', NOW()),
  ('Chestnut Brown', '["#58331E", "#825636", "#B57E59", "#D3B29A", "#EFE4D7"]', '["fall","chestnut","brown"]', 'fall', NOW()),
  ('Acorn Brown', '["#6E2C00", "#A44F0A", "#D18E38", "#E9C385", "#F9EFE1"]', '["fall","acorn","nature"]', 'fall', NOW()),
  ('Cranberry Bog', '["#702F2F", "#B2504F", "#DF836F", "#F2B59D", "#FCEDE5"]', '["fall","cranberry","red"]', 'fall', NOW()),
  ('Terracotta', '["#823A28", "#C05B3F", "#E08A6B", "#F2B9A4", "#F9ECE4"]', '["fall","terracotta","earthy"]', 'fall', NOW()),
  ('Woodland Earth', '["#4E2F1F", "#804F31", "#B87D57", "#D9B69B", "#F1E4D8"]', '["fall","woodland","brown"]', 'fall', NOW()),
  ('Red Fox', '["#772E25", "#B1523E", "#E0876E", "#F1BBAA", "#F9ECE5"]', '["fall","fox","nature"]', 'fall', NOW()),
  ('Old Leather', '["#5C321E", "#926347", "#C9A07A", "#E6CAAB", "#F3E7D9"]', '["fall","leather","vintage"]', 'fall', NOW()),
  ('Cinnamon Stick', '["#7D2F1F", "#BB5C3F", "#E18F67", "#F3BC9F", "#F9ECE2"]', '["fall","cinnamon","spice"]', 'fall', NOW()),
  ('Fallen Leaves', '["#942C26", "#C55A46", "#E49478", "#F3BBA3", "#FBEEE5"]', '["fall","leaves","red"]', 'fall', NOW()),
  ('Pine Cone', '["#61331C", "#A26B3F", "#D2A27C", "#E9C9AF", "#F3ECE2"]', '["fall","pine","brown"]', 'fall', NOW()),
  ('Warm Hearth', '["#5D2920", "#95503C", "#C9A07A", "#E3C4A9", "#F5EAE0"]', '["fall","hearth","cozy"]', 'fall', NOW()),
  ('Mulled Wine', '["#6B2E28", "#A25D4B", "#D29B7A", "#ECD2B9", "#F7EFE5"]', '["fall","wine","dark"]', 'fall', NOW()),
  ('November Rain', '["#7A261F", "#C0513B", "#E49477", "#F3C9B2", "#FBECE3"]', '["fall","november","moody"]', 'fall', NOW())
ON CONFLICT DO NOTHING;

-- Section: winter
DELETE FROM palettes WHERE section = 'winter';
INSERT INTO palettes (name, colors, tags, section, created_at)
VALUES
  ('Winter Deep', '["#0B1F33", "#0F3B60", "#4D7BA7", "#A6C8E0", "#EEF6FA"]', '["winter","deep","blue"]', 'winter', NOW()),
  ('Frozen Night', '["#0A1631", "#0D2A52", "#3868A3", "#89B1D9", "#E9F1FA"]', '["winter","frozen","night"]', 'winter', NOW()),
  ('Arctic Ocean', '["#102639", "#1A466B", "#5B8FBF", "#ABCFE5", "#F0F7FA"]', '["winter","arctic","ocean"]', 'winter', NOW()),
  ('Glacial Ice', '["#08203A", "#0E4A7C", "#5D9DD1", "#AFD5E9", "#F4FAFF"]', '["winter","glacial","ice"]', 'winter', NOW()),
  ('Frost Bound', '["#091C2D", "#0F3F66", "#4F8AC3", "#A8CFEF", "#ECF7FF"]', '["winter","frost","cold"]', 'winter', NOW()),
  ('Ice Storm', '["#0E2438", "#195C9F", "#63A8D9", "#B3DCEE", "#F6FBFF"]', '["winter","storm","blue"]', 'winter', NOW()),
  ('Polar Vortex', '["#11203F", "#1F4D83", "#78AEE6", "#C0DFF4", "#F7FAFF"]', '["winter","polar","vortex"]', 'winter', NOW()),
  ('Winter Zen', '["#0D192A", "#1A3F73", "#6F9DE1", "#C3DDF3", "#F8FBFF"]', '["winter","zen","calm"]', 'winter', NOW()),
  ('Blue Horizon', '["#0F253E", "#1A487F", "#79A9E6", "#C2DCEC", "#F1F9FF"]', '["winter","horizon","sky"]', 'winter', NOW()),
  ('Frosty Morning', '["#0B1A2C", "#0F3B72", "#4D83C3", "#BDD9EF", "#EBF8FF"]', '["winter","frosty","morning"]', 'winter', NOW()),
  ('Snowy Peak', '["#0E1422", "#13356C", "#5E8DC9", "#B9D5EB", "#F5FAFF"]', '["winter","snow","peak"]', 'winter', NOW()),
  ('Icy River', '["#08182B", "#0D4273", "#6A96D8", "#C4DFF3", "#F9FCFF"]', '["winter","river","ice"]', 'winter', NOW()),
  ('Crystal Cavern', '["#13223F", "#1E4E80", "#78A9E4", "#C2D9F2", "#F6FAFF"]', '["winter","crystal","cavern"]', 'winter', NOW()),
  ('Winter Skyline', '["#0B2642", "#0F4D7C", "#5996D2", "#BED8EE", "#F3F9FF"]', '["winter","skyline","city"]', 'winter', NOW()),
  ('Deep Freeze II', '["#0A1D2F", "#0E3A65", "#4E84C6", "#A5CCE9", "#E8F6FF"]', '["winter","deep","freeze"]', 'winter', NOW()),
  ('Nordic Blue', '["#0C1B2F", "#144676", "#5F97D4", "#BCD8F1", "#F2FAFF"]', '["winter","nordic","blue"]', 'winter', NOW()),
  ('Blue Steel II', '["#05172A", "#0F386E", "#5C8DD9", "#B5D8F1", "#F4FBFF"]', '["winter","steel","cold"]', 'winter', NOW()),
  ('Glacial Lake', '["#0D202F", "#185A98", "#6BA6E9", "#CEE4F6", "#F8FDFF"]', '["winter","glacial","lake"]', 'winter', NOW()),
  ('Frost Bite II', '["#091F37", "#0F4679", "#598ACE", "#B8D7EC", "#F5FAFF"]', '["winter","bite","frost"]', 'winter', NOW()),
  ('Winter Whisper', '["#08203C", "#0E5080", "#5F92DA", "#C4DDF3", "#F9FDFF"]', '["winter","whisper","soft"]', 'winter', NOW())
ON CONFLICT DO NOTHING;

-- Section: spring
DELETE FROM palettes WHERE section = 'spring';
INSERT INTO palettes (name, colors, tags, section, created_at)
VALUES
  ('Spring Sprout', '["#F0FAF4", "#C4E8D3", "#8FD2A5", "#65B081", "#EBF8F1"]', '["spring","sprout","green"]', 'spring', NOW()),
  ('Peach Blossom II', '["#FFF8F2", "#FFE3C8", "#FFD1A8", "#FFB680", "#FFF9F5"]', '["spring","peach","warm"]', 'spring', NOW()),
  ('Clear Sky', '["#F6FCFF", "#D2EBFF", "#A6D7FF", "#7DC3FF", "#F8FBFF"]', '["spring","sky","blue"]', 'spring', NOW()),
  ('Sakura Petal', '["#FFF5F9", "#FFDAE8", "#FFBFE1", "#FF9BCE", "#FFF7FB"]', '["spring","sakura","pink"]', 'spring', NOW()),
  ('Fresh Lime', '["#F8FFF3", "#E3FBCF", "#CFF99C", "#ACDC7A", "#F7FFF5"]', '["spring","lime","green"]', 'spring', NOW()),
  ('Candy Floss', '["#FFFDFD", "#FCE4EC", "#F9B8D3", "#F68FB8", "#FEF9FB"]', '["spring","candy","pink"]', 'spring', NOW()),
  ('Aquamarine Mist', '["#E7FFF8", "#C3FFE8", "#93F2D7", "#67CDB8", "#F0FFFA"]', '["spring","aqua","mist"]', 'spring', NOW()),
  ('Lemon Drop', '["#FFFBF0", "#FFF0C7", "#FFE796", "#FFD867", "#FFFCF4"]', '["spring","lemon","yellow"]', 'spring', NOW()),
  ('Lilac Breeze', '["#FFF6FE", "#FCE3FC", "#F9BFF9", "#F68BF6", "#FFFAFF"]', '["spring","lilac","purple"]', 'spring', NOW()),
  ('Mint Leaf', '["#F4FFF7", "#D3FFE5", "#98FDBF", "#64DCA3", "#F6FFF9"]', '["spring","mint","green"]', 'spring', NOW()),
  ('Yellow Tulip', '["#FFFDF3", "#FEF0C4", "#FDE599", "#FBDD6E", "#FFFEF6"]', '["spring","tulip","yellow"]', 'spring', NOW()),
  ('Peri Winkle', '["#F7F8FF", "#DDE2FF", "#B2BEFF", "#7F90FF", "#F9F9FF"]', '["spring","periwinkle","blue"]', 'spring', NOW()),
  ('Warm Breeze', '["#FFF8F6", "#FFEBE2", "#FFD6C7", "#FFB9A3", "#FFF9F8"]', '["spring","warm","orange"]', 'spring', NOW()),
  ('Garden Green', '["#FBFFF5", "#EBFFE2", "#D4FFB7", "#A6ECA0", "#FAFFF8"]', '["spring","garden","green"]', 'spring', NOW()),
  ('Daffodil', '["#FFFFF2", "#FEF4C7", "#FEEA9F", "#FDD77C", "#FFFEF4"]', '["spring","daffodil","yellow"]', 'spring', NOW()),
  ('April Showers', '["#F9FBFF", "#E2EFFF", "#BBD4FF", "#82B7FF", "#FAFCFF"]', '["spring","rain","blue"]', 'spring', NOW()),
  ('Coral Blush', '["#FFF9F9", "#FFEDEA", "#FFD2CB", "#FFA69A", "#FFFAFB"]', '["spring","coral","pink"]', 'spring', NOW()),
  ('Spring Dew', '["#EFFFFC", "#C8FFEE", "#8FFFE1", "#59EFC8", "#F5FFFA"]', '["spring","dew","teal"]', 'spring', NOW()),
  ('Orchid Bloom', '["#FFF8FE", "#FBE5FD", "#F7BFF9", "#F38BF2", "#FFFAFF"]', '["spring","orchid","purple"]', 'spring', NOW()),
  ('Green Tea', '["#F7FFF0", "#E4FFE0", "#CFFFD0", "#A8EDA9", "#F9FFF4"]', '["spring","tea","green"]', 'spring', NOW())
ON CONFLICT DO NOTHING;

-- Section: happy
DELETE FROM palettes WHERE section = 'happy';
INSERT INTO palettes (name, colors, tags, section, created_at)
VALUES
  ('Peach Joy', '["#FFF8E7", "#FFDAB9", "#FFB347", "#FF9A8B", "#FFF4E6"]', '["happy","peach","joy"]', 'happy', NOW()),
  ('Bubblegum Smile', '["#FFF3F8", "#FFCEE4", "#FF9CCF", "#FF6FBF", "#FFF8FB"]', '["happy","bubblegum","pink"]', 'happy', NOW()),
  ('Minty Joy', '["#EFFBF9", "#C8F7E8", "#8EE2CD", "#55C3AD", "#F6FFFC"]', '["happy","mint","fresh"]', 'happy', NOW()),
  ('Sunny Smile', '["#FFF9E6", "#FFF1CC", "#FFE066", "#FFB84C", "#FFFCEB"]', '["happy","sunny","yellow"]', 'happy', NOW()),
  ('Sky Delight', '["#F4FCFF", "#D0EBFF", "#8ECFFF", "#4CA8E0", "#F8FDFF"]', '["happy","sky","blue"]', 'happy', NOW()),
  ('Cheerful Apricot', '["#FFF7F2", "#FFEBE0", "#FFCFB8", "#FFA87F", "#FFF9F6"]', '["happy","apricot","warm"]', 'happy', NOW()),
  ('Spring Zing', '["#E7FFF5", "#C8FFE7", "#8CFBC8", "#42D7A8", "#F5FFFA"]', '["happy","spring","green"]', 'happy', NOW()),
  ('Sweet Candy', '["#FFF8FC", "#FFE3F4", "#FFA8E6", "#FF6FC9", "#FFF9FD"]', '["happy","candy","pink"]', 'happy', NOW()),
  ('Happy Lime', '["#F9FFF0", "#E2FFD1", "#A9FF83", "#68D64F", "#FAFFF2"]', '["happy","lime","green"]', 'happy', NOW()),
  ('Blue Bliss', '["#F2F9FF", "#D6EEFF", "#8FD4FF", "#4BB2E6", "#F7FCFF"]', '["happy","blue","bliss"]', 'happy', NOW()),
  ('Orange Crush', '["#FFF4E8", "#FFE4C7", "#FFD08E", "#FFB74D", "#FFF7F0"]', '["happy","orange","crush"]', 'happy', NOW()),
  ('Pink Party', '["#FFF6F9", "#FFE5EF", "#FFB1DC", "#FF6FAF", "#FFF8FB"]', '["happy","pink","party"]', 'happy', NOW()),
  ('Aqua Fun', '["#E8FFF7", "#C0FFED", "#78FFD4", "#20E6AA", "#F4FFFB"]', '["happy","aqua","fun"]', 'happy', NOW()),
  ('Green Glee', '["#F7FFE9", "#E3FFBF", "#A6FF68", "#5DD144", "#FAFFF1"]', '["happy","green","glee"]', 'happy', NOW()),
  ('Golden Smile', '["#FFFFF2", "#FEF4C7", "#FEEA9F", "#FDD77C", "#FFFEF4"]', '["happy","golden","yellow"]', 'happy', NOW()),
  ('Clear Day', '["#F6FBFF", "#E0F4FF", "#8FD0FF", "#4FADEC", "#F8FCFF"]', '["happy","clear","blue"]', 'happy', NOW()),
  ('Warm Hug', '["#FFF8EE", "#FFEAD0", "#FFCC7F", "#FFA840", "#FFF9F1"]', '["happy","warm","orange"]', 'happy', NOW()),
  ('Lemon Joy', '["#FFFFF0", "#FFFDD6", "#FFFC9E", "#FFF661", "#FFFFF4"]', '["happy","lemon","yellow"]', 'happy', NOW()),
  ('Sprout Happy', '["#F8FFF7", "#D6FFE3", "#98FCA9", "#4FDB6B", "#FBFFFA"]', '["happy","sprout","green"]', 'happy', NOW()),
  ('Electric Lilac', '["#FFF7FE", "#FCE5FF", "#FAA8FF", "#F56AFF", "#FFF9FF"]', '["happy","lilac","purple"]', 'happy', NOW())
ON CONFLICT DO NOTHING;

-- Section: nature
DELETE FROM palettes WHERE section = 'nature';
INSERT INTO palettes (name, colors, tags, section, created_at)
VALUES
  ('Deep Forest', '["#2C3E50", "#1F2D3A", "#3C8D0D", "#76B041", "#E8F5E9"]', '["nature","forest","green"]', 'nature', NOW()),
  ('Moss Rock', '["#263238", "#37474F", "#4CAF50", "#81C784", "#E8F5E9"]', '["nature","moss","rock"]', 'nature', NOW()),
  ('Lake Pine', '["#1B3A4B", "#356859", "#78A383", "#ADC9B8", "#F0F7EF"]', '["nature","lake","pine"]', 'nature', NOW()),
  ('Olive Grove', '["#2E2D24", "#4B4B3A", "#9E9D7B", "#CFCFBF", "#F7F7F1"]', '["nature","olive","earthy"]', 'nature', NOW()),
  ('Evergreen', '["#0A2A12", "#145A32", "#2E7D32", "#66BB6A", "#E8F5E9"]', '["nature","green","bold"]', 'nature', NOW()),
  ('Bamboo Forest', '["#132B23", "#205C37", "#4CAF50", "#8BC34A", "#F1F8E9"]', '["nature","bamboo","fresh"]', 'nature', NOW()),
  ('Teal Lake', '["#0F2E3F", "#13736F", "#4DB6AC", "#80CBC4", "#E0F2F1"]', '["nature","teal","water"]', 'nature', NOW()),
  ('Green Meadow', '["#263238", "#2E7D32", "#66BB6A", "#A5D6A7", "#E8F5E9"]', '["nature","meadow","green"]', 'nature', NOW()),
  ('Fern Gully', '["#1E4432", "#3B7D44", "#71B56A", "#B3D9A5", "#F0F8EF"]', '["nature","fern","green"]', 'nature', NOW()),
  ('Misty Woods', '["#1B2C1E", "#2E493F", "#577D5F", "#90B49B", "#EFF6EF"]', '["nature","mist","woods"]', 'nature', NOW()),
  ('Earthy Clay', '["#263238", "#5D4037", "#8D6E63", "#BCAAA4", "#F5F5F5"]', '["nature","clay","brown"]', 'nature', NOW()),
  ('Stone Path', '["#102027", "#37474F", "#78909C", "#B0BEC5", "#ECEFF1"]', '["nature","stone","grey"]', 'nature', NOW()),
  ('River Reed', '["#27313F", "#558B6E", "#8EB695", "#C7D4C7", "#F2F5F2"]', '["nature","river","green"]', 'nature', NOW()),
  ('Forest Canopy', '["#21412A", "#4E6C50", "#7CA982", "#B3CBB9", "#EEF3EE"]', '["nature","forest","canopy"]', 'nature', NOW()),
  ('Highland Grass', '["#2D3E2B", "#4A6F43", "#78A477", "#AAD0A9", "#EEF7F0"]', '["nature","grass","green"]', 'nature', NOW()),
  ('Blue Lagoon', '["#0F243A", "#315F72", "#709FB0", "#A8C8CE", "#F0F7F9"]', '["nature","water","blue"]', 'nature', NOW()),
  ('Jungle Leaf', '["#1A2F20", "#3C6645", "#6C9A73", "#B3D1BC", "#F4F9F5"]', '["nature","jungle","leaf"]', 'nature', NOW()),
  ('Stormy Sea', '["#2C3833", "#5E6770", "#8C9E9B", "#C6D1CD", "#F5F6F6"]', '["nature","sea","grey"]', 'nature', NOW()),
  ('Clover Field', '["#142A16", "#356C25", "#6FAE48", "#B3D99E", "#EFF8ED"]', '["nature","clover","green"]', 'nature', NOW()),
  ('Alpine Spruce', '["#182C28", "#326750", "#6B9D80", "#B8D6C1", "#F1F7F3"]', '["nature","spruce","green"]', 'nature', NOW())
ON CONFLICT DO NOTHING;

-- Section: earth
DELETE FROM palettes WHERE section = 'earth';
INSERT INTO palettes (name, colors, tags, section, created_at)
VALUES
  ('Clay Earth', '["#4B3F2F", "#78624A", "#A88F6A", "#D4BFA6", "#F6EFE6"]', '["earth","clay","brown"]', 'earth', NOW()),
  ('Muddy Ground', '["#3E352B", "#6B5C4F", "#8D7B68", "#BFAF9F", "#EFE8DD"]', '["earth","mud","brown"]', 'earth', NOW()),
  ('Deep Soil', '["#3B3026", "#5D4A3A", "#8F7864", "#C5B4A6", "#F1EDE7"]', '["earth","soil","dark"]', 'earth', NOW()),
  ('Rocky Path', '["#2F251E", "#59493E", "#89745F", "#C0B3A8", "#EFEBE4"]', '["earth","rock","stone"]', 'earth', NOW()),
  ('Sandstone', '["#4C3E31", "#7B6A59", "#B09B87", "#D8CBBF", "#F7F2ED"]', '["earth","sand","beige"]', 'earth', NOW()),
  ('Granite Earth', '["#40362F", "#6B6257", "#9F8F82", "#CCBEAF", "#F5EFE7"]', '["earth","granite","grey"]', 'earth', NOW()),
  ('Dusty Trail', '["#3C2F25", "#5F4A3E", "#927B6B", "#C5B9AE", "#EFEEE9"]', '["earth","dust","brown"]', 'earth', NOW()),
  ('Dried Mud', '["#40352C", "#6A594D", "#9F8775", "#CDBCA9", "#F6F1EA"]', '["earth","dry","warm"]', 'earth', NOW()),
  ('Limestone', '["#453D33", "#7A705E", "#B09F8A", "#D7CBBB", "#F8F4EC"]', '["earth","stone","light"]', 'earth', NOW()),
  ('Cave Rock', '["#352E26", "#5F5346", "#947E6D", "#CBB9A7", "#EFE9E2"]', '["earth","cave","dark"]', 'earth', NOW()),
  ('Basalt Grey', '["#2B271F", "#564D42", "#867A6B", "#C2B8AA", "#F1EFE9"]', '["earth","basalt","grey"]', 'earth', NOW()),
  ('Taupe Ground', '["#4D4539", "#7F6F61", "#B19F8D", "#D9CFC1", "#F8F4EE"]', '["earth","taupe","neutral"]', 'earth', NOW()),
  ('Fossil Stone', '["#493F33", "#776958", "#B09D88", "#D8CBB9", "#F6EFE6"]', '["earth","fossil","ancient"]', 'earth', NOW()),
  ('River Bed', '["#3A3128", "#64584D", "#9B8F82", "#CFC6BA", "#F5F1EB"]', '["earth","river","bed"]', 'earth', NOW()),
  ('Slate Earth', '["#342E27", "#5D544A", "#948974", "#CBBBAD", "#EFE9E1"]', '["earth","slate","grey"]', 'earth', NOW()),
  ('Pebble Beach', '["#3F3328", "#6C5F52", "#A5917F", "#D0C2B4", "#F8F2EC"]', '["earth","pebble","beach"]', 'earth', NOW()),
  ('Volcanic Ash', '["#231F1C", "#524B42", "#8C7F72", "#C6BFB4", "#F2EFE8"]', '["earth","ash","dark"]', 'earth', NOW()),
  ('Desert Sand', '["#564938", "#8D7F6F", "#C2B6A5", "#E3D9CC", "#F8F4EE"]', '["earth","desert","sand"]', 'earth', NOW()),
  ('Loam Soil', '["#3A3027", "#6A5F51", "#A18F7F", "#D1C3B7", "#F4EFE8"]', '["earth","loam","soil"]', 'earth', NOW()),
  ('Dark Canyon', '["#2D2822", "#5C5144", "#998975", "#CDBFAF", "#F2EEE6"]', '["earth","canyon","dark"]', 'earth', NOW())
ON CONFLICT DO NOTHING;

-- Section: space
DELETE FROM palettes WHERE section = 'space';
INSERT INTO palettes (name, colors, tags, section, created_at)
VALUES
  ('Cosmic Depths', '["#0B0F2B", "#121A4A", "#2C3E91", "#6A7FDB", "#050714"]', '["space","cosmic","blue"]', 'space', NOW()),
  ('Star Field', '["#0A1024", "#161D3D", "#3A4CC0", "#7E8EFF", "#060913"]', '["space","star","night"]', 'space', NOW()),
  ('Nebula Core', '["#090C1F", "#1B214F", "#4A5DFF", "#9AA6FF", "#040611"]', '["space","nebula","blue"]', 'space', NOW()),
  ('Galactic Blue', '["#0D0E1C", "#23275A", "#5E6CFF", "#AEB6FF", "#05050D"]', '["space","galactic","blue"]', 'space', NOW()),
  ('Astral Plane', '["#06081A", "#1C234D", "#3F51E0", "#8794FF", "#03040A"]', '["space","astral","blue"]', 'space', NOW()),
  ('Void Walker', '["#0C0A21", "#2A2E6A", "#6A5CFF", "#B0A7FF", "#05040E"]', '["space","void","purple"]', 'space', NOW()),
  ('Deep Night Sky', '["#070B18", "#1F2A44", "#445C9C", "#8EA3E3", "#03060F"]', '["space","night","sky"]', 'space', NOW()),
  ('Starlight', '["#090A1E", "#252B5E", "#6C72E8", "#B4B7FF", "#040412"]', '["space","star","light"]', 'space', NOW()),
  ('Cosmos', '["#0E0C22", "#2E3377", "#7B7DFF", "#C1C2FF", "#050418"]', '["space","cosmos","purple"]', 'space', NOW()),
  ('Blue Nova', '["#050818", "#1A2D5C", "#3F7CFF", "#8FB9FF", "#02040C"]', '["space","nova","blue"]', 'space', NOW()),
  ('Interstellar', '["#0A0E27", "#1E3A6D", "#4FA3FF", "#9FD0FF", "#040717"]', '["space","interstellar","blue"]', 'space', NOW()),
  ('Cyan Nebula', '["#060C1E", "#163C5F", "#00A6FF", "#7FD4FF", "#030610"]', '["space","cyan","nebula"]', 'space', NOW()),
  ('Galaxy Edge', '["#090E23", "#2B4B7A", "#5BB8FF", "#A5DBFF", "#05081A"]', '["space","galaxy","blue"]', 'space', NOW()),
  ('Teal Star', '["#070D1D", "#1F4663", "#4DD0E1", "#9BE7F0", "#03060E"]', '["space","teal","star"]', 'space', NOW()),
  ('Aqua Space', '["#0B0C1A", "#263A52", "#5FE1FF", "#A8F0FF", "#04050C"]', '["space","aqua","bright"]', 'space', NOW()),
  ('Purple Space', '["#080A16", "#2A2F4F", "#8C7CFF", "#C7BEFF", "#03040A"]', '["space","purple","haze"]', 'space', NOW()),
  ('Violet Void', '["#0C0A19", "#3B2E5A", "#B388FF", "#E1CFFF", "#05030D"]', '["space","violet","void"]', 'space', NOW()),
  ('Lavender Galaxy', '["#0A0917", "#332A44", "#9C7BFF", "#D2C1FF", "#04030A"]', '["space","lavender","soft"]', 'space', NOW()),
  ('Indigo Depths', '["#050612", "#241E3F", "#6F5BFF", "#B3A9FF", "#020309"]', '["space","indigo","deep"]', 'space', NOW()),
  ('Neon Cosmos', '["#060715", "#2C254D", "#FF5CF4", "#FF9BF8", "#03030A"]', '["space","neon","pink"]', 'space', NOW())
ON CONFLICT DO NOTHING;

-- Section: rainbow
DELETE FROM palettes WHERE section = 'rainbow';
INSERT INTO palettes (name, colors, tags, section, created_at)
VALUES
  ('Vivid Rainbow', '["#FF1E56", "#FF7A00", "#FFD600", "#2ECC71", "#1E90FF"]', '["rainbow","vivid","bright"]', 'rainbow', NOW()),
  ('Bright Spectrum', '["#E10600", "#F77F00", "#FCBF49", "#06D6A0", "#118AB2"]', '["rainbow","spectrum","bright"]', 'rainbow', NOW()),
  ('Muted Rainbow', '["#D62828", "#F9844A", "#F9C74F", "#90DBF4", "#577590"]', '["rainbow","muted","warm"]', 'rainbow', NOW()),
  ('Neon Arc', '["#FF004D", "#FF8C42", "#FFF275", "#3EC300", "#2EC4B6"]', '["rainbow","neon","green"]', 'rainbow', NOW()),
  ('Primary Pop', '["#C1121F", "#F48C06", "#FFD166", "#8AC926", "#1982C4"]', '["rainbow","pop","primary"]', 'rainbow', NOW()),
  ('Cyber Rainbow', '["#B5179E", "#F72585", "#FFD60A", "#4CC9F0", "#3A0CA3"]', '["rainbow","cyber","neon"]', 'rainbow', NOW()),
  ('High Contrast', '["#EF233C", "#FF9F1C", "#FFE66D", "#06AED5", "#26547C"]', '["rainbow","contrast","bold"]', 'rainbow', NOW()),
  ('Retro Spectrum', '["#9B2226", "#EE9B00", "#E9D8A6", "#0A9396", "#005F73"]', '["rainbow","retro","teal"]', 'rainbow', NOW()),
  ('Vibrant Wave', '["#FF006E", "#FB5607", "#FFBE0B", "#00F5D4", "#8338EC"]', '["rainbow","vibrant","wave"]', 'rainbow', NOW()),
  ('Earthy Rainbow', '["#AD2831", "#F6AA1C", "#FCE762", "#43AA8B", "#277DA1"]', '["rainbow","earthy","toned"]', 'rainbow', NOW()),
  ('Soft Spectrum', '["#E63946", "#F1A208", "#FFF3B0", "#52B788", "#457B9D"]', '["rainbow","soft","pastel"]', 'rainbow', NOW()),
  ('Playful Arc', '["#C9184A", "#FF922B", "#FFD43B", "#40C057", "#4D96FF"]', '["rainbow","playful","bright"]', 'rainbow', NOW()),
  ('Bold Rainbow', '["#9D0208", "#DC2F02", "#F7B801", "#2EC4B6", "#4361EE"]', '["rainbow","bold","vivid"]', 'rainbow', NOW()),
  ('Pastel Pop', '["#FF595E", "#FFCA3A", "#8AC926", "#1982C4", "#6A4C93"]', '["rainbow","pastel","pop"]', 'rainbow', NOW()),
  ('Mystic Rainbow', '["#B7094C", "#F77F00", "#F9C74F", "#43BCCF", "#560BAD"]', '["rainbow","mystic","purple"]', 'rainbow', NOW()),
  ('Deep Spectrum', '["#A4133C", "#FFB703", "#EAE2B7", "#2A9D8F", "#264653"]', '["rainbow","deep","dark"]', 'rainbow', NOW()),
  ('Classic Rainbow', '["#D00000", "#FAA307", "#FFDD00", "#55A630", "#3A86FF"]', '["rainbow","classic","bright"]', 'rainbow', NOW()),
  ('Sunset Rainbow', '["#E5383B", "#FF9E00", "#FFF1A8", "#80ED99", "#5E60CE"]', '["rainbow","sunset","warm"]', 'rainbow', NOW()),
  ('Electric Rainbow', '["#7209B7", "#F72585", "#FFEA00", "#4DCCBD", "#4361EE"]', '["rainbow","electric","neon"]', 'rainbow', NOW()),
  ('Stormy Rainbow', '["#C71F37", "#F48C06", "#F9DC5C", "#3EC1D3", "#364F6B"]', '["rainbow","stormy","dark"]', 'rainbow', NOW())
ON CONFLICT DO NOTHING;

-- Section: gradient
DELETE FROM palettes WHERE section = 'gradient';
INSERT INTO palettes (name, colors, tags, section, created_at)
VALUES
  ('Neon Twilight', '["#1F0036", "#3A0CA3", "#7209B7", "#F72585", "#FDE2FF"]', '["gradient","neon","purple"]', 'gradient', NOW()),
  ('Ocean Depths', '["#03045E", "#0077B6", "#00B4D8", "#90DBF4", "#E0F7FA"]', '["gradient","ocean","blue"]', 'gradient', NOW()),
  ('Arctic Breeze', '["#0B132B", "#1C2541", "#3A86FF", "#4CC9F0", "#E8F9FF"]', '["gradient","arctic","blue"]', 'gradient', NOW()),
  ('Purple Dream', '["#2D0B59", "#5A189A", "#9D4EDD", "#E0AAFF", "#F6EDFF"]', '["gradient","purple","dream"]', 'gradient', NOW()),
  ('Teal Waters', '["#003049", "#005F73", "#0A9396", "#94D2BD", "#E9F5F3"]', '["gradient","teal","green"]', 'gradient', NOW()),
  ('Sunset Glow', '["#2B2D42", "#8D99AE", "#EF233C", "#FF6B6B", "#FFF1F1"]', '["gradient","sunset","red"]', 'gradient', NOW()),
  ('Berry Smoothie', '["#1B1F3B", "#693668", "#A74482", "#F84AA7", "#FFE4F2"]', '["gradient","berry","pink"]', 'gradient', NOW()),
  ('Midnight Sun', '["#0A1A2F", "#0D3B66", "#FAF0CA", "#F4D35E", "#FFF8E1"]', '["gradient","midnight","yellow"]', 'gradient', NOW()),
  ('Royal Amethyst', '["#240046", "#5A189A", "#C77DFF", "#E0AAFF", "#F8EDFF"]', '["gradient","royal","purple"]', 'gradient', NOW()),
  ('Desert Dusk', '["#001219", "#005F73", "#EE9B00", "#CA6702", "#FFF3E0"]', '["gradient","desert","orange"]', 'gradient', NOW()),
  ('Fiery Furnace', '["#03071E", "#370617", "#9D0208", "#E85D04", "#FFE8D6"]', '["gradient","fire","red"]', 'gradient', NOW()),
  ('Mocha Fade', '["#1A1423", "#3D314A", "#684756", "#96705B", "#EDE0D4"]', '["gradient","mocha","brown"]', 'gradient', NOW()),
  ('Northern Lights', '["#0F2027", "#203A43", "#2C5364", "#5BC0BE", "#E6FFFA"]', '["gradient","northern","green"]', 'gradient', NOW()),
  ('Winter Blues', '["#1D3557", "#457B9D", "#A8DADC", "#F1FAEE", "#FFFFFF"]', '["gradient","winter","blue"]', 'gradient', NOW()),
  ('Ultra Violet', '["#10002B", "#240046", "#7B2CBF", "#C77DFF", "#F3E8FF"]', '["gradient","violet","purple"]', 'gradient', NOW()),
  ('Solar Flare', '["#001524", "#15616D", "#FF7D00", "#FFB703", "#FFF3D6"]', '["gradient","solar","orange"]', 'gradient', NOW()),
  ('Rose Quartz', '["#0B090A", "#161A1D", "#E5383B", "#FF8787", "#FFF0F0"]', '["gradient","rose","red"]', 'gradient', NOW()),
  ('Deep Sea', '["#00203F", "#005792", "#00BBF0", "#CDB4DB", "#EDF6FF"]', '["gradient","sea","blue"]', 'gradient', NOW()),
  ('Lavender Mist', '["#231942", "#5E548E", "#9F86C0", "#E0B1CB", "#F7EDEE"]', '["gradient","lavender","purple"]', 'gradient', NOW()),
  ('Neon Night', '["#030637", "#3C0753", "#720455", "#F67280", "#FFECEC"]', '["gradient","neon","dark"]', 'gradient', NOW())
ON CONFLICT DO NOTHING;

-- Section: sunset
DELETE FROM palettes WHERE section = 'sunset';
INSERT INTO palettes (name, colors, tags, section, created_at)
VALUES
  ('Evening Glow', '["#2B0F1E", "#5A1E3A", "#FF6A3D", "#FFB997", "#FFF1E8"]', '["sunset","evening","glow"]', 'sunset', NOW()),
  ('Purple Dusk', '["#1F1026", "#4B1D6B", "#FF784F", "#FFC2A1", "#FFF4EC"]', '["sunset","purple","dusk"]', 'sunset', NOW()),
  ('Orange Horizon', '["#26112E", "#6A1B9A", "#FF8C42", "#FFD1A8", "#FFF6ED"]', '["sunset","orange","horizon"]', 'sunset', NOW()),
  ('Twilight Red', '["#2E0E1A", "#7A1E2C", "#FF944D", "#FFD6B0", "#FFF7EF"]', '["sunset","twilight","red"]', 'sunset', NOW()),
  ('Warm Dusk', '["#241027", "#5E2750", "#FF7A59", "#FFBFA3", "#FFF2EB"]', '["sunset","warm","dusk"]', 'sunset', NOW()),
  ('Golden Hour Dusk', '["#1D132B", "#4E2A6E", "#FF9A3C", "#FFD59E", "#FFF8F0"]', '["sunset","golden","dusk"]', 'sunset', NOW()),
  ('Crimson Sky', '["#2C0F24", "#7B2D5B", "#FF6F61", "#FFB7AE", "#FFF1F0"]', '["sunset","crimson","sky"]', 'sunset', NOW()),
  ('Amber Sunset', '["#21122A", "#5B3378", "#FF8F3F", "#FFD9B3", "#FFF9F2"]', '["sunset","amber","glow"]', 'sunset', NOW()),
  ('Burnt Orange Sky', '["#190D23", "#47265D", "#FF6D3A", "#FFB18C", "#FFF0E6"]', '["sunset","burnt","orange"]', 'sunset', NOW()),
  ('Rosy Dusk', '["#2A1020", "#6F2C3E", "#FF8552", "#FFD0B8", "#FFF6F1"]', '["sunset","rosy","dusk"]', 'sunset', NOW()),
  ('Violet Sunset', '["#20112D", "#593C7D", "#FF9F45", "#FFE0B8", "#FFF9F4"]', '["sunset","violet","sunset"]', 'sunset', NOW()),
  ('Red Horizon', '["#2D0B19", "#8A1C3A", "#FF7F50", "#FFC4A3", "#FFF3EB"]', '["sunset","red","horizon"]', 'sunset', NOW()),
  ('Deep Purple Sunset', '["#1B0F26", "#4F2E73", "#FF914D", "#FFD7AF", "#FFF8F1"]', '["sunset","deep","purple"]', 'sunset', NOW()),
  ('Coral Dusk', '["#2A0D1E", "#7A2B4D", "#FF6B4A", "#FFB3A1", "#FFF0EC"]', '["sunset","coral","dusk"]', 'sunset', NOW()),
  ('Lilac Sunset', '["#22122F", "#623B88", "#FF9E57", "#FFE1BC", "#FFF9F5"]', '["sunset","lilac","sunset"]', 'sunset', NOW()),
  ('Fading Light', '["#1E0E1A", "#5D2433", "#FF8243", "#FFC9A6", "#FFF4EE"]', '["sunset","fading","light"]', 'sunset', NOW()),
  ('Royal Sunset', '["#23102B", "#6C3B8F", "#FF965A", "#FFE3C1", "#FFF9F6"]', '["sunset","royal","sunset"]', 'sunset', NOW()),
  ('Maroon Glow', '["#260C18", "#8C2F45", "#FF7043", "#FFB9A0", "#FFF2EE"]', '["sunset","maroon","glow"]', 'sunset', NOW()),
  ('Dusty Sunset', '["#1A1024", "#4A356E", "#FF8B5C", "#FFD8C2", "#FFF8F3"]', '["sunset","dusty","sunset"]', 'sunset', NOW()),
  ('Blush Sky', '["#240A14", "#7F2338", "#FF5E3A", "#FFA69E", "#FFEDEA"]', '["sunset","blush","sky"]', 'sunset', NOW())
ON CONFLICT DO NOTHING;

-- Section: sky
DELETE FROM palettes WHERE section = 'sky';
INSERT INTO palettes (name, colors, tags, section, created_at)
VALUES
  ('Deep Sky', '["#0E1B2A", "#1E4E6E", "#4FA3D1", "#9BCDE8", "#EDF7FD"]', '["sky","blue","deep"]', 'sky', NOW()),
  ('Azure Heights', '["#081827", "#143E5A", "#3A8FC7", "#8EC1E3", "#F0F8FF"]', '["sky","azure","dark"]', 'sky', NOW()),
  ('Clear Day Sky', '["#0C2233", "#1F5A7A", "#5BB0E6", "#A7D7F2", "#F3FAFF"]', '["sky","clear","blue"]', 'sky', NOW()),
  ('High Altitude', '["#10283C", "#2B6F95", "#74C2F2", "#BDE4FA", "#F6FCFF"]', '["sky","high","blue"]', 'sky', NOW()),
  ('Stratosphere', '["#0A1F30", "#1C4F73", "#4FA9DC", "#9FD2EE", "#ECF6FC"]', '["sky","stratosphere","blue"]', 'sky', NOW()),
  ('Cloudy Sky', '["#0F2A3F", "#2F6E99", "#6EC6F0", "#B6E3FA", "#F4FBFF"]', '["sky","cloudy","blue"]', 'sky', NOW()),
  ('Cerulean Sky', '["#091C2E", "#1B4A6A", "#4AA1D6", "#96CDED", "#EAF5FC"]', '["sky","cerulean","blue"]', 'sky', NOW()),
  ('Bright Sky', '["#122B42", "#3A7DAA", "#82D0F5", "#C3EAFB", "#F7FDFF"]', '["sky","bright","blue"]', 'sky', NOW()),
  ('Blue Horizon', '["#0B2136", "#255E85", "#63B7E8", "#ADDDF4", "#EFF9FE"]', '["sky","horizon","blue"]', 'sky', NOW()),
  ('Frosty Sky', '["#142F46", "#4A88B4", "#8BD6F7", "#CFEFFD", "#FAFEFF"]', '["sky","frosty","blue"]', 'sky', NOW()),
  ('Glacial Blue', '["#0D2438", "#2E6F9C", "#6FC4F1", "#B9E3FA", "#F2FAFF"]', '["sky","glacial","blue"]', 'sky', NOW()),
  ('Pure Sky', '["#091E31", "#20587F", "#4FB1E3", "#9DD6F3", "#EBF7FD"]', '["sky","pure","blue"]', 'sky', NOW()),
  ('Zenith Blue', '["#112C45", "#3F82AF", "#7CCEF4", "#BFE9FC", "#F8FDFF"]', '["sky","zenith","blue"]', 'sky', NOW()),
  ('Air Blue', '["#0A2035", "#1E5D89", "#56B6EA", "#A3DBF6", "#EEF8FD"]', '["sky","air","blue"]', 'sky', NOW()),
  ('Crystal Sky', '["#0F2942", "#3C7DA8", "#7BC8F0", "#C0E7FA", "#F6FCFF"]', '["sky","crystal","blue"]', 'sky', NOW()),
  ('Ozone Blue', '["#081A2C", "#1A4D72", "#47A6D9", "#92CFEA", "#E9F5FB"]', '["sky","ozone","blue"]', 'sky', NOW()),
  ('Pale Sky', '["#132E48", "#4C8FBC", "#8AD4F6", "#CAEAFB", "#F9FEFF"]', '["sky","pale","blue"]', 'sky', NOW()),
  ('Light Sky', '["#0C263F", "#2A6E9E", "#67C0EF", "#B0E0F8", "#F1FAFE"]', '["sky","light","blue"]', 'sky', NOW()),
  ('Soft Blue Sky', '["#091F34", "#1F5A88", "#52B2E8", "#9BD9F5", "#EDF8FE"]', '["sky","soft","blue"]', 'sky', NOW()),
  ('Cumulus Blue', '["#102941", "#4A8DB8", "#8ED3F5", "#D1EEFC", "#FBFEFF"]', '["sky","cumulus","blue"]', 'sky', NOW()),
  ('Morning Mist', '["#cfe9ff", "#dff7ff", "#ffffff", "#ffe0b2", "#f7fbff"]', '["sky","morning","cloud"]', 'sky', NOW()),
  ('Sunny Day', '["#3fb3e6", "#5cd0ff", "#f5f7b8", "#fbffdb", "#eefcff"]', '["sky","sunny","bright"]', 'sky', NOW()),
  ('Electric Sky', '["#fff100", "#0066ff", "#12c8ff", "#c6f6f8", "#f1feff"]', '["sky","electric","blue"]', 'sky', NOW()),
  ('Lavender Dream', '["#eadcf3", "#f5f0ff", "#d1c8ff", "#a89bff", "#faf8ff"]', '["sky","lavender","soft"]', 'sky', NOW()),
  ('Soft Cumulus', '["#dbe6ff", "#fff9db", "#e2ead6", "#9cb3cf", "#f7faff"]', '["sky","cumulus","soft"]', 'sky', NOW()),
  ('Bluebird Day', '["#faffb5", "#a8d4f7", "#4aa4f2", "#0e68b0", "#edf7ff"]', '["sky","bluebird","clear"]', 'sky', NOW()),
  ('Pastel Horizon', '["#fffcc7", "#7de2e8", "#5f8dc9", "#5b39c8", "#f4f6ff"]', '["sky","pastel","horizon"]', 'sky', NOW()),
  ('Deep Azure', '["#06327a", "#2f659c", "#ff8848", "#ffde8a", "#fff6ea"]', '["sky","azure","deep"]', 'sky', NOW()),
  ('Clear Morning', '["#fff9cf", "#c8f4ff", "#a7ddff", "#63b2ff", "#f4fbff"]', '["sky","clear","morning"]', 'sky', NOW()),
  ('Minty Sky', '["#f6f1e6", "#b7ebe4", "#70d8da", "#80a6e7", "#f1f7ff"]', '["sky","mint","fresh"]', 'sky', NOW()),
  ('Icy Horizon', '["#9fd3d8", "#b8e2e3", "#fffdf7", "#e5e1d8", "#f8fcfc"]', '["sky","icy","cold"]', 'sky', NOW()),
  ('Winter Blue', '["#eef5ff", "#bcd9ff", "#8fbaff", "#156d8c", "#e8f3ff"]', '["sky","winter","blue"]', 'sky', NOW()),
  ('Purple Twilight', '["#7c71b7", "#b391cc", "#e8bad5", "#ffe7e7", "#faf4ff"]', '["sky","purple","twilight"]', 'sky', NOW()),
  ('Cyan Burst', '["#c9fff6", "#a6f0ff", "#5bb3ff", "#6f64ff", "#f0f9ff"]', '["sky","cyan","burst"]', 'sky', NOW()),
  ('Steel Sky', '["#f4f3ed", "#9ed1ea", "#7fa1c2", "#4a82a6", "#f6fbff"]', '["sky","steel","grey"]', 'sky', NOW())
ON CONFLICT DO NOTHING;

-- Section: sea
DELETE FROM palettes WHERE section = 'sea';
INSERT INTO palettes (name, colors, tags, section, created_at)
VALUES
  ('Ocean Blue', '["#04293A", "#0E4D64", "#1CA7EC", "#75D6F9", "#E6F7FF"]', '["sea","ocean","blue"]', 'sea', NOW()),
  ('Deep Marine', '["#033149", "#046E8F", "#2EBCE6", "#82DBF5", "#F0FCFF"]', '["sea","marine","teal"]', 'sea', NOW()),
  ('Calm Sea', '["#021526", "#02457A", "#348DD9", "#92CFF0", "#EBF9FF"]', '["sea","calm","blue"]', 'sea', NOW()),
  ('Lagoon Waters', '["#0A2E36", "#0F6170", "#2697C0", "#82D2EB", "#E3F8FF"]', '["sea","lagoon","teal"]', 'sea', NOW()),
  ('Navy Teal', '["#001F3F", "#005F73", "#00A6D2", "#5BC0EB", "#E0FFFF"]', '["sea","navy","teal"]', 'sea', NOW()),
  ('Pacific Blue', '["#013A63", "#046A8E", "#34ABD9", "#80DDF2", "#E9F9FF"]', '["sea","pacific","blue"]', 'sea', NOW()),
  ('Reef Shallow', '["#052F32", "#0D667D", "#3AAFD9", "#8EDFF4", "#E5FBFF"]', '["sea","reef","teal"]', 'sea', NOW()),
  ('Nautical Blue', '["#011F4B", "#03396C", "#005B96", "#6497B1", "#B3CDE0"]', '["sea","nautical","blue"]', 'sea', NOW()),
  ('Wave Crest', '["#002D40", "#006494", "#2EA3F2", "#8FD9F7", "#E8F8FF"]', '["sea","wave","blue"]', 'sea', NOW()),
  ('Tropical Sea', '["#00375A", "#007EA7", "#00BCD4", "#7CE0F4", "#E2FBFF"]', '["sea","tropical","cyan"]', 'sea', NOW()),
  ('Deep Ocean', '["#014F86", "#0277BD", "#039BE5", "#66C9F2", "#E8F7FF"]', '["sea","deep","blue"]', 'sea', NOW()),
  ('Marine Life', '["#002F4B", "#0A709B", "#61A9DC", "#9BDBF5", "#EDFCFF"]', '["sea","marine","blue"]', 'sea', NOW()),
  ('Dark Tide', '["#031526", "#03506F", "#37A6DB", "#8FD3F0", "#EBF9FF"]', '["sea","tide","dark"]', 'sea', NOW()),
  ('Twilight Sea', '["#003F5C", "#2F4B7C", "#665191", "#A05195", "#D45087"]', '["sea","twilight","purple"]', 'sea', NOW()),
  ('Clear Water', '["#013A63", "#0275B1", "#05C1E0", "#7CE7F6", "#E5FAFF"]', '["sea","clear","cyan"]', 'sea', NOW()),
  ('Arctic Sea', '["#002E4D", "#0C6888", "#3FA9EA", "#8FD9F9", "#E4F8FF"]', '["sea","arctic","blue"]', 'sea', NOW()),
  ('Coastline', '["#02263C", "#036B8C", "#3ABFE0", "#8CE1F6", "#EFFCFF"]', '["sea","coast","cyan"]', 'sea', NOW()),
  ('Blue Depths', '["#013151", "#017CBA", "#30B6E9", "#9BE3F8", "#E6FBFF"]', '["sea","depths","blue"]', 'sea', NOW()),
  ('Classic Sea', '["#003957", "#006D9C", "#0099CC", "#66C2E4", "#CFEFFA"]', '["sea","classic","blue"]', 'sea', NOW()),
  ('Azure Sea', '["#021F38", "#025B9E", "#3EB1E7", "#8DD8F8", "#E9F8FF"]', '["sea","azure","blue"]', 'sea', NOW())
ON CONFLICT DO NOTHING;

-- Section: kid
DELETE FROM palettes WHERE section = 'kid';
INSERT INTO palettes (name, colors, tags, section, created_at)
VALUES
  ('Playtime Fun', '["#FFEB3B", "#FF5722", "#4CAF50", "#03A9F4", "#E1F5FE"]', '["kid","play","bright"]', 'kid', NOW()),
  ('Bubblegum Blast', '["#FF4081", "#FFEA00", "#448AFF", "#69F0AE", "#E8F5E9"]', '["kid","candy","pop"]', 'kid', NOW()),
  ('Super Hero', '["#FF6F00", "#00C853", "#2979FF", "#FF5252", "#FFF8E1"]', '["kid","hero","bold"]', 'kid', NOW()),
  ('Magic Marker', '["#D500F9", "#00B0FF", "#76FF03", "#FF8F00", "#F3E5F5"]', '["kid","marker","neon"]', 'kid', NOW()),
  ('Toy Box', '["#FF1744", "#FF9100", "#00E5FF", "#69F0AE", "#E0F7FA"]', '["kid","toy","vivid"]', 'kid', NOW()),
  ('Party Time', '["#FF4081", "#448AFF", "#FFEA00", "#00E676", "#E8F5E9"]', '["kid","party","confetti"]', 'kid', NOW()),
  ('Cartoon Colors', '["#69F0AE", "#FF5252", "#2962FF", "#FFAB00", "#FFFDE7"]', '["kid","cartoon","fun"]', 'kid', NOW()),
  ('Splash Zone', '["#FF9100", "#00B8D4", "#D500F9", "#64DD17", "#F1F8E9"]', '["kid","splash","bright"]', 'kid', NOW()),
  ('Rainbow Dash', '["#00E5FF", "#FFEA00", "#FF4081", "#8BC34A", "#E8F5E9"]', '["kid","rainbow","dash"]', 'kid', NOW()),
  ('Sugar Rush', '["#F50057", "#FF9800", "#40C4FF", "#69F0AE", "#E0F7FA"]', '["kid","sugar","sweet"]', 'kid', NOW()),
  ('Park Day', '["#76FF03", "#FD4C77", "#2979FF", "#FFAB40", "#FFFDE7"]', '["kid","park","sunny"]', 'kid', NOW()),
  ('Pool Party', '["#00B0FF", "#FFEA00", "#FF5252", "#00E676", "#E8F5E9"]', '["kid","pool","summer"]', 'kid', NOW()),
  ('Orange Fizz', '["#FF6D00", "#00E5FF", "#DD2C00", "#69F0AE", "#E0F7FA"]', '["kid","orange","fizz"]', 'kid', NOW()),
  ('Comic Book', '["#D500F9", "#FFEA00", "#2962FF", "#FF5252", "#FFFDE7"]', '["kid","comic","book"]', 'kid', NOW()),
  ('Arcade Lights', '["#FFAB00", "#00B8D4", "#FF4081", "#64DD17", "#F1F8E9"]', '["kid","arcade","game"]', 'kid', NOW()),
  ('Crayon Box', '["#00E676", "#FF6E40", "#448AFF", "#FFC107", "#FFF8E1"]', '["kid","crayon","draw"]', 'kid', NOW()),
  ('Jumping Jelly', '["#FF3D00", "#00C853", "#2979FF", "#FFD600", "#FFFDE7"]', '["kid","jelly","jump"]', 'kid', NOW()),
  ('Gummy Bears', '["#00B8D4", "#FF4081", "#FFEB3B", "#64DD17", "#E8F5E9"]', '["kid","gummy","bear"]', 'kid', NOW()),
  ('Fruit Snack', '["#FF5252", "#40C4FF", "#00E676", "#FF9100", "#FFF8E1"]', '["kid","fruit","snack"]', 'kid', NOW()),
  ('High Score', '["#F50057", "#FF9800", "#2979FF", "#69F0AE", "#E0F7FA"]', '["kid","score","win"]', 'kid', NOW())
ON CONFLICT DO NOTHING;

-- Section: skin
DELETE FROM palettes WHERE section = 'skin';
INSERT INTO palettes (name, colors, tags, section, created_at)
VALUES
  ('Rosy Blush', '["#FBE8EB", "#F9D2CC", "#F4B6B2", "#E58F8C", "#FCEDEB"]', '["skin","rosy","blush"]', 'skin', NOW()),
  ('Peach Cream', '["#FFEFE6", "#FFD7C7", "#FFBDAE", "#FF9778", "#FFF5F2"]', '["skin","peach","cream"]', 'skin', NOW()),
  ('Warm Sand', '["#F6E2D3", "#EECBB9", "#E3B499", "#C69074", "#FAF2EE"]', '["skin","warm","sand"]', 'skin', NOW()),
  ('Apricot Glow', '["#F9E5D7", "#F3CDBF", "#E8B59A", "#CE926C", "#FBF3EE"]', '["skin","apricot","glow"]', 'skin', NOW()),
  ('Pale Peach', '["#FFEEE4", "#FEDCC7", "#FFBE9A", "#FF9C6A", "#FFF8F4"]', '["skin","pale","peach"]', 'skin', NOW()),
  ('Soft Crepe', '["#FFE6D1", "#FDD8B9", "#FDC29B", "#FCA47A", "#FFF7F0"]', '["skin","soft","crepe"]', 'skin', NOW()),
  ('Almond Milk', '["#FBEDD9", "#F9DDBF", "#F6C79D", "#E8A173", "#FCF6F2"]', '["skin","almond","milk"]', 'skin', NOW()),
  ('Bisque Tone', '["#FCEDE3", "#FADBC9", "#F8C19A", "#E5996F", "#FEF6F2"]', '["skin","bisque","tone"]', 'skin', NOW()),
  ('Soft Blush', '["#FDEDE2", "#FCDCC7", "#FABB98", "#F48A5E", "#FFF8F3"]', '["skin","soft","blush"]', 'skin', NOW()),
  ('Beige Ivory', '["#F4EAD9", "#E7D3BA", "#D9B997", "#B8926B", "#FAF6F1"]', '["skin","beige","ivory"]', 'skin', NOW()),
  ('Warm Honey', '["#FFEFE9", "#FFDCD0", "#FFBB9D", "#FF956F", "#FFF9F6"]', '["skin","warm","honey"]', 'skin', NOW()),
  ('Rose Beige', '["#F7E5D4", "#EECDB8", "#E3AD90", "#C88362", "#F9F2EE"]', '["skin","rose","beige"]', 'skin', NOW()),
  ('Creamy Latte', '["#F9E7DC", "#F4D9C5", "#EBC1A0", "#D59E75", "#FAF4EF"]', '["skin","creamy","latte"]', 'skin', NOW()),
  ('Peach Puff', '["#FFE8DF", "#FFD4BA", "#FFB78E", "#FF9169", "#FFF8F4"]', '["skin","peach","puff"]', 'skin', NOW()),
  ('Sand Dune', '["#F9E9D7", "#F4D7BC", "#E8BD97", "#C99A6F", "#FAF3EF"]', '["skin","sand","dune"]', 'skin', NOW()),
  ('Fair Complexion', '["#FDEDE6", "#FBDCC9", "#F8BE96", "#F3905E", "#FFFAF7"]', '["skin","fair","complexion"]', 'skin', NOW()),
  ('Terra Cotta Light', '["#FFECE1", "#FFDCC9", "#FFBFA3", "#FF9576", "#FFF8F4"]', '["skin","terra","cotta"]', 'skin', NOW()),
  ('Golden Skin', '["#FEF0E7", "#FCDCC6", "#F9C29A", "#EBA16C", "#FFF9F2"]', '["skin","golden","skin"]', 'skin', NOW()),
  ('Neutral Beige', '["#F5E7D9", "#EAD3BA", "#D8B48B", "#B89869", "#F8F3EE"]', '["skin","neutral","beige"]', 'skin', NOW()),
  ('Rosy Cheek', '["#FFECE8", "#FFDCD0", "#FFC1A8", "#FF9F81", "#FFF9F6"]', '["skin","rosy","cheek"]', 'skin', NOW()),
  ('Warm Brown Peach', '["#8c4a3a", "#c6855a", "#ffc77a", "#fde2b8", "#fff5ea"]', '["skin","warm","brown"]', 'skin', NOW()),
  ('Dusty Blue Beige', '["#a9b7c2", "#efe6d1", "#dcc9b5", "#9a857c", "#faf6f1"]', '["skin","dusty","beige"]', 'skin', NOW()),
  ('Soft Pink Cream', '["#fbf5f4", "#fde1e8", "#f8c8d8", "#f3b6c7", "#fff7fb"]', '["skin","pink","cream"]', 'skin', NOW()),
  ('Wine Rose', '["#6b3c46", "#9a6377", "#c996aa", "#ead1d1", "#fbf2f4"]', '["skin","wine","rose"]', 'skin', NOW()),
  ('Plum Neutral', '["#5a2648", "#6c3f6f", "#9a7a7a", "#b9abab", "#f4eeee"]', '["skin","plum","neutral"]', 'skin', NOW()),
  ('Rose Coral', '["#d14f73", "#ffb3b0", "#ffd2da", "#fff0f3", "#fff8fb"]', '["skin","rose","coral"]', 'skin', NOW()),
  ('Cream Red Accent', '["#fff4e4", "#ffe3c6", "#ff9f85", "#e84745", "#fff9f3"]', '["skin","cream","red"]', 'skin', NOW()),
  ('Taupe Elegance', '["#8a7773", "#d9bcbc", "#ead7d5", "#f2e7e5", "#fbf6f5"]', '["skin","taupe","elegance"]', 'skin', NOW()),
  ('Mauve Classic', '["#a7727d", "#ede0d0", "#f6eadf", "#fbf4ea", "#fffaf4"]', '["skin","mauve","classic"]', 'skin', NOW()),
  ('Vintage Navy Pink', '["#394867", "#ffd1dc", "#ffb3c7", "#f29bb4", "#fff5f9"]', '["skin","vintage","navy"]', 'skin', NOW()),
  ('Olive Gold', '["#6a5120", "#a98947", "#c9a24f", "#e8bb2b", "#fff6dc"]', '["skin","olive","gold"]', 'skin', NOW()),
  ('Rust Brown', '["#8b2e00", "#a64b2a", "#d9a96f", "#fde5b5", "#fff6e6"]', '["skin","rust","brown"]', 'skin', NOW())
ON CONFLICT DO NOTHING;

-- Section: food
DELETE FROM palettes WHERE section = 'food';
INSERT INTO palettes (name, colors, tags, section, created_at)
VALUES
  ('Citrus Tart', '["#FF6F61", "#FFC857", "#E9724C", "#F5E1A4", "#FFF8E7"]', '["food","citrus","tart"]', 'food', NOW()),
  ('Mango Salsa', '["#FF9E00", "#FFCA3A", "#8AC926", "#FFE066", "#FFFCE8"]', '["food","mango","fresh"]', 'food', NOW()),
  ('Spice Market', '["#FF4E50", "#FC913A", "#F9D423", "#EDE574", "#F9F7D9"]', '["food","spice","warm"]', 'food', NOW()),
  ('Berry Cream', '["#D7263D", "#F46036", "#2E294E", "#FCECC9", "#FFF9F5"]', '["food","berry","cream"]', 'food', NOW()),
  ('Fig Jam', '["#F08A5D", "#B83B5E", "#6A2C70", "#F6E2B3", "#FFF4E6"]', '["food","fig","jam"]', 'food', NOW()),
  ('Peach Dessert', '["#FF7F50", "#FFA07A", "#FFDAB9", "#FFE4E1", "#FFF8F7"]', '["food","peach","sweet"]', 'food', NOW()),
  ('Berry Ice', '["#E63946", "#F1FAEE", "#A8DADC", "#457B9D", "#F8FAFC"]', '["food","berry","ice"]', 'food', NOW()),
  ('Tropical Smoothie', '["#FFB347", "#FFD15C", "#FF6F91", "#F7D6BF", "#FFF6F0"]', '["food","tropical","fruit"]', 'food', NOW()),
  ('Lime Sorbet', '["#8AC926", "#A1C349", "#D9E76C", "#FDFD97", "#F9FFE3"]', '["food","lime","sorbet"]', 'food', NOW()),
  ('Popsicle Stick', '["#FF3B3F", "#FCAF3C", "#65D4F6", "#F5F5F5", "#FEFEFE"]', '["food","popsicle","fun"]', 'food', NOW()),
  ('Spicy Curry', '["#FF6347", "#FF4500", "#FFD700", "#FFF8DC", "#FFFDF5"]', '["food","spicy","curry"]', 'food', NOW()),
  ('Chocolate Cake', '["#8B4513", "#A0522D", "#CD853F", "#DEB887", "#F8F2E9"]', '["food","chocolate","brown"]', 'food', NOW()),
  ('Vanilla Bean', '["#FFDAB9", "#FFE4B5", "#FFEFD5", "#FFF5EE", "#FFFCF7"]', '["food","vanilla","cream"]', 'food', NOW()),
  ('Green Apple', '["#9ACD32", "#ADFF2F", "#7FFF00", "#F0FFF0", "#F7FFF7"]', '["food","apple","green"]', 'food', NOW()),
  ('Grape Soda', '["#8E4585", "#DA70D6", "#EE82EE", "#F8E7F6", "#FEF9FB"]', '["food","grape","purple"]', 'food', NOW()),
  ('Cheese Platter', '["#FF8C00", "#FFA500", "#FFD700", "#FFFACD", "#FFFDEF"]', '["food","cheese","yellow"]', 'food', NOW()),
  ('Strawberry Shake', '["#FF69B4", "#FF1493", "#DB7093", "#FFC0CB", "#FFE4E1"]', '["food","strawberry","pink"]', 'food', NOW()),
  ('Mint Chip', '["#00CED1", "#20B2AA", "#3CB371", "#98FB98", "#E8FBF0"]', '["food","mint","green"]', 'food', NOW()),
  ('Blue Raspberry', '["#AFEEEE", "#B0E0E6", "#ADD8E6", "#E0FFFF", "#F0FFFF"]', '["food","blue","raspberry"]', 'food', NOW()),
  ('Red Velvet', '["#BC8F8F", "#F08080", "#CD5C5C", "#FA8072", "#FFF0F0"]', '["food","red","velvet"]', 'food', NOW())
ON CONFLICT DO NOTHING;

-- Section: cream
DELETE FROM palettes WHERE section = 'cream';
INSERT INTO palettes (name, colors, tags, section, created_at)
VALUES
  ('Warm Cream', '["#FFF8E7", "#FFECD5", "#FCE0C4", "#F6D3AB", "#FFF9F2"]', '["cream","warm","soft"]', 'cream', NOW()),
  ('Soft Ivory', '["#FFF9F1", "#F9F1E6", "#F2E5D5", "#E9D7C0", "#FEFAF5"]', '["cream","ivory","white"]', 'cream', NOW()),
  ('Vanilla Cream', '["#FEF8F0", "#FDF0DE", "#FBE7CA", "#F6D8AC", "#FFFBF6"]', '["cream","vanilla","sweet"]', 'cream', NOW()),
  ('Peachy Cream', '["#FFF7EF", "#FFEAD9", "#FDDCBF", "#F9CBA2", "#FFF8F3"]', '["cream","peach","soft"]', 'cream', NOW()),
  ('Rose Cream', '["#FFF6F1", "#FFE8DC", "#FDD9C1", "#FBC09F", "#FFF8F5"]', '["cream","rose","pink"]', 'cream', NOW()),
  ('Antique Cream', '["#FDF9F0", "#F9EFDB", "#F3E3C2", "#EAD7A7", "#FEFAF3"]', '["cream","antique","vintage"]', 'cream', NOW()),
  ('Butter Cream', '["#FFF9E8", "#FFF0D1", "#FFE5B7", "#FDD893", "#FFFDEA"]', '["cream","butter","yellow"]', 'cream', NOW()),
  ('Latte Foam', '["#FFF8F2", "#FCEFE0", "#F9E3C7", "#F4D5A8", "#FFF9F5"]', '["cream","latte","coffee"]', 'cream', NOW()),
  ('Lemon Cream', '["#FFFDE7", "#FFF5CF", "#FEEEAD", "#FADB82", "#FFFFF1"]', '["cream","lemon","yellow"]', 'cream', NOW()),
  ('Almond Cream', '["#FFF9F3", "#FCEDE1", "#F7DCC4", "#EBC5A5", "#FFFAF6"]', '["cream","almond","nut"]', 'cream', NOW()),
  ('Biscuit Cream', '["#FFF8EC", "#F9ECDC", "#F4DDBF", "#E9C696", "#FEF9F4"]', '["cream","biscuit","brown"]', 'cream', NOW()),
  ('Apricot Whip', '["#FFF7F0", "#FEEFE1", "#FDDDC3", "#FACBA0", "#FFF8F6"]', '["cream","apricot","whip"]', 'cream', NOW()),
  ('Custard Cream', '["#FFFAF2", "#FDF1DC", "#FBE4BE", "#F8CFA0", "#FFFBF7"]', '["cream","custard","sweet"]', 'cream', NOW()),
  ('Banana Cream', '["#FFF9E9", "#FFF1CE", "#FFEBAB", "#FFE07B", "#FFFFF0"]', '["cream","banana","fruit"]', 'cream', NOW()),
  ('Sugar Cookie', '["#FFFDF5", "#FCEEDC", "#F9DDC0", "#F3C397", "#FFFEF8"]', '["cream","cookie","sugar"]', 'cream', NOW()),
  ('Clotted Cream', '["#FFFBEF", "#FEF4DC", "#FDE9C0", "#FAD89A", "#FEFDF4"]', '["cream","clotted","english"]', 'cream', NOW()),
  ('Orange Cream', '["#FFF6E9", "#FFEBD3", "#FEDDAD", "#FDBF7E", "#FFF8EE"]', '["cream","orange","citrus"]', 'cream', NOW()),
  ('Golden Cream', '["#FFF9F0", "#FDF1D9", "#FBE1B8", "#F8C78D", "#FFFBF6"]', '["cream","golden","warm"]', 'cream', NOW()),
  ('Blush Cream', '["#FFF7F4", "#FDEEE2", "#F9DCC1", "#EFC49A", "#FFF9F7"]', '["cream","blush","pink"]', 'cream', NOW()),
  ('Milky Tea', '["#FFF8F1", "#FCEFE1", "#F8DDBF", "#EEC89C", "#FFF9F6"]', '["cream","milk","tea"]', 'cream', NOW())
ON CONFLICT DO NOTHING;

-- Section: coffee
DELETE FROM palettes WHERE section = 'coffee';
INSERT INTO palettes (name, colors, tags, section, created_at)
VALUES
  ('Espresso Roast', '["#4B2E2A", "#6E4D3E", "#A57C69", "#D1B8A3", "#F5EFE8"]', '["coffee","espresso","dark"]', 'coffee', NOW()),
  ('Mocha Bean', '["#3E2B28", "#5A463E", "#997C6B", "#C9B19F", "#F3EAE0"]', '["coffee","mocha","brown"]', 'coffee', NOW()),
  ('Dark Roast', '["#3D2C29", "#6B4F40", "#9C7E6A", "#CDBBA9", "#EFE8E1"]', '["coffee","dark","roast"]', 'coffee', NOW()),
  ('Black Coffee', '["#2C1E1B", "#4C3B35", "#897765", "#C1B3A8", "#F3EEE9"]', '["coffee","black","strong"]', 'coffee', NOW()),
  ('Cafe au Lait', '["#5A3E36", "#8B6E5E", "#C0A18B", "#E2D4C8", "#F7F2EE"]', '["coffee","cafe","lait"]', 'coffee', NOW()),
  ('Java Blend', '["#3A2E27", "#624D40", "#A17D67", "#D5C0B0", "#F2EBE4"]', '["coffee","java","blend"]', 'coffee', NOW()),
  ('Barista Brew', '["#42312D", "#705D51", "#B09A89", "#D7C9BF", "#F6F1EC"]', '["coffee","barista","brew"]', 'coffee', NOW()),
  ('Turkish Coffee', '["#281C18", "#513E37", "#8E745F", "#C8B7AA", "#EFEBE7"]', '["coffee","turkish","strong"]', 'coffee', NOW()),
  ('Coffee Shop', '["#4F3A34", "#816C5A", "#B69E8C", "#DBCEC2", "#F9F4EF"]', '["coffee","shop","warm"]', 'coffee', NOW()),
  ('American Roast', '["#362E2A", "#5E4F47", "#9E8A7B", "#D1C4BB", "#F4F0EC"]', '["coffee","american","roast"]', 'coffee', NOW()),
  ('Hazelnut Brew', '["#3C2F2A", "#6A564D", "#B09B8F", "#D9CEC5", "#F7F3F0"]', '["coffee","hazelnut","nutty"]', 'coffee', NOW()),
  ('Cappuccino Foam', '["#422F2A", "#7A5F57", "#BA9E8F", "#E1D4CB", "#FAF6F2"]', '["coffee","cappuccino","foam"]', 'coffee', NOW()),
  ('Morning Brew', '["#362B27", "#6B5850", "#A79180", "#D2C7C0", "#F2EEEB"]', '["coffee","morning","brew"]', 'coffee', NOW()),
  ('Roasted Bean', '["#412F2B", "#7F6D62", "#C1AC9E", "#E6DED5", "#FAF8F5"]', '["coffee","roasted","bean"]', 'coffee', NOW()),
  ('Coffee Crema', '["#472F2B", "#856F63", "#C8B7AA", "#E9DDD4", "#FBF7F3"]', '["coffee","crema","smooth"]', 'coffee', NOW()),
  ('Macchiato Shot', '["#392E28", "#6E5B51", "#B19C8F", "#D8CCC4", "#F8F4F1"]', '["coffee","macchiato","shot"]', 'coffee', NOW()),
  ('Cortado Cup', '["#3E2D27", "#605042", "#A0897B", "#D2C4BA", "#F3EEF0"]', '["coffee","cortado","cup"]', 'coffee', NOW()),
  ('Flat White', '["#352D27", "#5E4C42", "#A38C7F", "#CDC2B8", "#F5F1ED"]', '["coffee","flat","white"]', 'coffee', NOW()),
  ('Ristretto Pour', '["#3A2C26", "#644F44", "#A89183", "#D1C7BF", "#F6F2EF"]', '["coffee","ristretto","pour"]', 'coffee', NOW()),
  ('Breve Coffee', '["#4A322E", "#7A5F53", "#C0A894", "#E5DDD3", "#FBF6F1"]', '["coffee","breve","rich"]', 'coffee', NOW())
ON CONFLICT DO NOTHING;

-- Section: wedding
DELETE FROM palettes WHERE section = 'wedding';
INSERT INTO palettes (name, colors, tags, section, created_at)
VALUES
  ('Blushing Bride', '["#FFF7F8", "#FDE8E9", "#F9DAD9", "#EFCED4", "#FFF9FA"]', '["wedding","pink","soft"]', 'wedding', NOW()),
  ('Champagne Toast', '["#FFF9F2", "#FEF2E6", "#FDE7D8", "#F7DCC2", "#FFF9F5"]', '["wedding","champagne","cream"]', 'wedding', NOW()),
  ('Something Blue', '["#F8F9FF", "#EFF2FF", "#E0E6FF", "#C8D0FF", "#FAFCFF"]', '["wedding","blue","soft"]', 'wedding', NOW()),
  ('Ivory Vows', '["#FFFDF6", "#FDF6E8", "#F9E8D6", "#F4D9BA", "#FFFEF8"]', '["wedding","ivory","warm"]', 'wedding', NOW()),
  ('Bridal Rose', '["#FFF8FA", "#FDEDF1", "#F8D4E4", "#EFB8CE", "#FFF9FB"]', '["wedding","rose","pink"]', 'wedding', NOW()),
  ('Pure Romance', '["#FFF6F6", "#FEEAEA", "#FDDADA", "#F9CFCF", "#FFF8F8"]', '["wedding","romance","red"]', 'wedding', NOW()),
  ('Garden Wedding', '["#F6FFF1", "#E8FFE3", "#D1FBC3", "#A9F7A5", "#F7FFF4"]', '["wedding","garden","green"]', 'wedding', NOW()),
  ('Lavender Haze', '["#FEFCFF", "#F8F4FF", "#ECD6FF", "#D8BBFF", "#FFF9FF"]', '["wedding","lavender","purple"]', 'wedding', NOW()),
  ('Golden Hour', '["#FFF9E8", "#FFF2D4", "#FFE7B8", "#FFD58C", "#FFFAED"]', '["wedding","golden","yellow"]', 'wedding', NOW()),
  ('Peach Perfect', '["#FFF8F2", "#FCEFE3", "#F8DFC9", "#F0BC9E", "#FFF9F4"]', '["wedding","peach","soft"]', 'wedding', NOW()),
  ('Pink Bouquet', '["#FFF4F9", "#FCE8F3", "#F8C9E1", "#EFA9C7", "#FFF8FB"]', '["wedding","bouquet","pink"]', 'wedding', NOW()),
  ('Gold Elegance', '["#FFFBEF", "#FDF4D7", "#FBDEAB", "#F7C77F", "#FFFCF4"]', '["wedding","gold","elegance"]', 'wedding', NOW()),
  ('Classic White', '["#FEFEFF", "#F8F8FF", "#E8E8FF", "#D8D8FF", "#FFFEFF"]', '["wedding","classic","white"]', 'wedding', NOW()),
  ('Apricot Kiss', '["#FFF9F6", "#FEEFE7", "#FDD7C9", "#FABFA1", "#FFF9F7"]', '["wedding","apricot","kiss"]', 'wedding', NOW()),
  ('Sunlit Wedding', '["#FFF8EE", "#FEEBD4", "#FDD8A9", "#FDBF82", "#FFFAF3"]', '["wedding","sunlit","warm"]', 'wedding', NOW()),
  ('Sweet Lavender', '["#FFF7FC", "#FCEBF6", "#F9D5EB", "#F3B9DE", "#FFF9FD"]', '["wedding","sweet","lavender"]', 'wedding', NOW()),
  ('Vanilla Sky', '["#FFF9E0", "#FFF4C8", "#FFECB0", "#FFE188", "#FFFCE5"]', '["wedding","vanilla","sky"]', 'wedding', NOW()),
  ('Timeless Rose', '["#FEF9FA", "#F9EEF1", "#F4D6DA", "#E9BCC4", "#FFF9FB"]', '["wedding","timeless","rose"]', 'wedding', NOW()),
  ('Pale Yellow', '["#FFFDF0", "#FDF6D9", "#FAEFB0", "#F7DC84", "#FFFEF7"]', '["wedding","pale","yellow"]', 'wedding', NOW()),
  ('Soft Petal', '["#FFF8F5", "#FCEEE7", "#F9D7C9", "#F1BFA8", "#FFF9F7"]', '["wedding","petal","soft"]', 'wedding', NOW()),
  ('Charcoal Blue', '["#333446", "#8690aa", "#c8d9d7", "#eef2f1", "#f8fafc"]', '["wedding","charcoal","blue"]', 'wedding', NOW()),
  ('Brown Olive', '["#4e3427", "#cc7a42", "#bcd7a8", "#f0f4c3", "#fafbe8"]', '["wedding","brown","olive"]', 'wedding', NOW()),
  ('Pink Cream', '["#5a3d50", "#ff6fb1", "#ffb6c9", "#fde6c9", "#fff7f1"]', '["wedding","pink","cream"]', 'wedding', NOW()),
  ('Purple Blush', '["#7f5ab6", "#9f86c0", "#f7a1b3", "#ffe4e1", "#fff6f7"]', '["wedding","purple","blush"]', 'wedding', NOW()),
  ('Red Plum', '["#e84d4f", "#70204e", "#c0d2de", "#eaf3ed", "#f9fcfa"]', '["wedding","red","plum"]', 'wedding', NOW()),
  ('Pink Mint', '["#ff9fc5", "#ffd1e1", "#fbfde6", "#98d3d8", "#f1fbfc"]', '["wedding","pink","mint"]', 'wedding', NOW()),
  ('Soft Blue', '["#aabce2", "#a7cdf4", "#c9e3e7", "#fff2d9", "#fff9ee"]', '["wedding","soft","blue"]', 'wedding', NOW()),
  ('Dark Navy', '["#0f2b4c", "#d8cfc2", "#0a2540", "#000000", "#f5f3ef"]', '["wedding","dark","navy"]', 'wedding', NOW()),
  ('Lavender Soft', '["#a968cc", "#d8a7e5", "#eac5ef", "#ffe3f1", "#fff7fb"]', '["wedding","lavender","soft"]', 'wedding', NOW()),
  ('Gold Navy', '["#f2b63f", "#3f678d", "#1f3f5f", "#4f7f8f", "#f8f4ec"]', '["wedding","gold","navy"]', 'wedding', NOW()),
  ('Ice Pastel', '["#fbfbfb", "#eaf8ff", "#cfdcff", "#cfcaff", "#f7f8ff"]', '["wedding","ice","pastel"]', 'wedding', NOW()),
  ('Teal Mustard', '["#2a6f7e", "#f4e7c3", "#ff9155", "#cf6a44", "#fff3e6"]', '["wedding","teal","mustard"]', 'wedding', NOW())
ON CONFLICT DO NOTHING;

-- Section: christmas
DELETE FROM palettes WHERE section = 'christmas';
INSERT INTO palettes (name, colors, tags, section, created_at)
VALUES
  ('Festive Red', '["#8A1C1C", "#C12F2F", "#FF4F4F", "#FFD7D7", "#FFF8F8"]', '["christmas","red","festive"]', 'christmas', NOW()),
  ('Evergreen', '["#1A3A1A", "#2C5F2C", "#4CAF50", "#A8E6A3", "#ECF9EE"]', '["christmas","green","nature"]', 'christmas', NOW()),
  ('Holly Berry', '["#3B1F1F", "#7D2626", "#C94141", "#F4B7B7", "#FFF2F2"]', '["christmas","red","holly"]', 'christmas', NOW()),
  ('Winter Night', '["#0F2F4A", "#1A4D78", "#72A6D1", "#CADFF0", "#F3F9FF"]', '["christmas","blue","winter"]', 'christmas', NOW()),
  ('Gingerbread House', '["#3F2D1F", "#785330", "#BD885E", "#E4C9A4", "#FAF5ED"]', '["christmas","brown","sweet"]', 'christmas', NOW()),
  ('Silent Night', '["#1C1E26", "#3A3F4A", "#667085", "#B0B9C6", "#F9FAFC"]', '["christmas","dark","cool"]', 'christmas', NOW()),
  ('Santa Suit', '["#7A1C23", "#B22E35", "#E45757", "#F8BFBF", "#FFF4F4"]', '["christmas","red","bright"]', 'christmas', NOW()),
  ('Mistletoe', '["#0B3D2E", "#167A45", "#63C78E", "#B9E8CB", "#ECFDF6"]', '["christmas","green","mistletoe"]', 'christmas', NOW()),
  ('Reindeer Brown', '["#4A2411", "#8C4F27", "#C27A44", "#E9C8A4", "#F9EFE4"]', '["christmas","brown","animal"]', 'christmas', NOW()),
  ('Frosty Morning', '["#102A4E", "#1E487F", "#679ECB", "#BFD8F2", "#F5Faff"]', '["christmas","blue","frost"]', 'christmas', NOW()),
  ('Candy Cane', '["#5C1F1F", "#962424", "#FF6363", "#FFA3A3", "#FFF5F5"]', '["christmas","red","candy"]', 'christmas', NOW()),
  ('Pine Forest', '["#1C3F2B", "#2F6D47", "#5FBF85", "#B7E7CB", "#EFFDF5"]', '["christmas","green","pine"]', 'christmas', NOW()),
  ('Sugar Plum', '["#3D192F", "#7E304F", "#C44C7A", "#F0BFCE", "#FFF4F8"]', '["christmas","purple","sweet"]', 'christmas', NOW()),
  ('Winter Storm', '["#2B2631", "#556580", "#8AB4F8", "#C3D8FF", "#F5F9FF"]', '["christmas","dark","stormy"]', 'christmas', NOW()),
  ('Warm Hearth', '["#83281F", "#B84C3D", "#E98B81", "#F7CFC9", "#FFF6F4"]', '["christmas","red","warm"]', 'christmas', NOW()),
  ('Spruce Green', '["#204E3B", "#3A7A59", "#6ABF92", "#C1E9D8", "#EFFDFB"]', '["christmas","green","spruce"]', 'christmas', NOW()),
  ('Cranberry Red', '["#501C1C", "#8E3434", "#D14F4F", "#F8BEBE", "#FFF3F3"]', '["christmas","red","berry"]', 'christmas', NOW()),
  ('Ice Skating', '["#174A6F", "#2A6EB2", "#6FAFDB", "#C3DFFA", "#F7FBFF"]', '["christmas","blue","ice"]', 'christmas', NOW()),
  ('Cocoa Mug', '["#3E2C2F", "#7B4F54", "#C16F76", "#E9C8CC", "#FFF2F2"]', '["christmas","brown","cozy"]', 'christmas', NOW()),
  ('Winter Mint', '["#16422B", "#2C784B", "#4FBF80", "#B9EACA", "#E9FFF4"]', '["christmas","green","mint"]', 'christmas', NOW())
ON CONFLICT DO NOTHING;

-- Section: kid
DELETE FROM palettes WHERE section = 'kid';
INSERT INTO palettes (name, colors, tags, section, created_at)
VALUES
  ('Playtime Fun', '["#FFEB3B", "#FF5722", "#4CAF50", "#03A9F4", "#E1F5FE"]', '["kid","play","bright"]', 'kid', NOW()),
  ('Bubblegum Blast', '["#FF4081", "#FFEA00", "#448AFF", "#69F0AE", "#E8F5E9"]', '["kid","candy","pop"]', 'kid', NOW()),
  ('Super Hero', '["#FF6F00", "#00C853", "#2979FF", "#FF5252", "#FFF8E1"]', '["kid","hero","bold"]', 'kid', NOW()),
  ('Magic Marker', '["#D500F9", "#00B0FF", "#76FF03", "#FF8F00", "#F3E5F5"]', '["kid","marker","neon"]', 'kid', NOW()),
  ('Toy Box', '["#FF1744", "#FF9100", "#00E5FF", "#69F0AE", "#E0F7FA"]', '["kid","toy","vivid"]', 'kid', NOW()),
  ('Party Time', '["#FF4081", "#448AFF", "#FFEA00", "#00E676", "#E8F5E9"]', '["kid","party","confetti"]', 'kid', NOW()),
  ('Cartoon Colors', '["#69F0AE", "#FF5252", "#2962FF", "#FFAB00", "#FFFDE7"]', '["kid","cartoon","fun"]', 'kid', NOW()),
  ('Splash Zone', '["#FF9100", "#00B8D4", "#D500F9", "#64DD17", "#F1F8E9"]', '["kid","splash","bright"]', 'kid', NOW()),
  ('Rainbow Dash', '["#00E5FF", "#FFEA00", "#FF4081", "#8BC34A", "#E8F5E9"]', '["kid","rainbow","dash"]', 'kid', NOW()),
  ('Sugar Rush', '["#F50057", "#FF9800", "#40C4FF", "#69F0AE", "#E0F7FA"]', '["kid","sugar","sweet"]', 'kid', NOW()),
  ('Park Day', '["#76FF03", "#FD4C77", "#2979FF", "#FFAB40", "#FFFDE7"]', '["kid","park","sunny"]', 'kid', NOW()),
  ('Pool Party', '["#00B0FF", "#FFEA00", "#FF5252", "#00E676", "#E8F5E9"]', '["kid","pool","summer"]', 'kid', NOW()),
  ('Orange Fizz', '["#FF6D00", "#00E5FF", "#DD2C00", "#69F0AE", "#E0F7FA"]', '["kid","orange","fizz"]', 'kid', NOW()),
  ('Comic Book', '["#D500F9", "#FFEA00", "#2962FF", "#FF5252", "#FFFDE7"]', '["kid","comic","book"]', 'kid', NOW()),
  ('Arcade Lights', '["#FFAB00", "#00B8D4", "#FF4081", "#64DD17", "#F1F8E9"]', '["kid","arcade","game"]', 'kid', NOW()),
  ('Crayon Box', '["#00E676", "#FF6E40", "#448AFF", "#FFC107", "#FFF8E1"]', '["kid","crayon","draw"]', 'kid', NOW()),
  ('Jumping Jelly', '["#FF3D00", "#00C853", "#2979FF", "#FFD600", "#FFFDE7"]', '["kid","jelly","jump"]', 'kid', NOW()),
  ('Gummy Bears', '["#00B8D4", "#FF4081", "#FFEB3B", "#64DD17", "#E8F5E9"]', '["kid","gummy","bear"]', 'kid', NOW()),
  ('Fruit Snack', '["#FF5252", "#40C4FF", "#00E676", "#FF9100", "#FFF8E1"]', '["kid","fruit","snack"]', 'kid', NOW()),
  ('High Score', '["#F50057", "#FF9800", "#2979FF", "#69F0AE", "#E0F7FA"]', '["kid","score","win"]', 'kid', NOW())
ON CONFLICT DO NOTHING;

-- Section: skin
DELETE FROM palettes WHERE section = 'skin';
INSERT INTO palettes (name, colors, tags, section, created_at)
VALUES
  ('Rosy Blush', '["#FBE8EB", "#F9D2CC", "#F4B6B2", "#E58F8C", "#FCEDEB"]', '["skin","rosy","blush"]', 'skin', NOW()),
  ('Peach Cream', '["#FFEFE6", "#FFD7C7", "#FFBDAE", "#FF9778", "#FFF5F2"]', '["skin","peach","cream"]', 'skin', NOW()),
  ('Warm Sand', '["#F6E2D3", "#EECBB9", "#E3B499", "#C69074", "#FAF2EE"]', '["skin","warm","sand"]', 'skin', NOW()),
  ('Apricot Glow', '["#F9E5D7", "#F3CDBF", "#E8B59A", "#CE926C", "#FBF3EE"]', '["skin","apricot","glow"]', 'skin', NOW()),
  ('Pale Peach', '["#FFEEE4", "#FEDCC7", "#FFBE9A", "#FF9C6A", "#FFF8F4"]', '["skin","pale","peach"]', 'skin', NOW()),
  ('Soft Crepe', '["#FFE6D1", "#FDD8B9", "#FDC29B", "#FCA47A", "#FFF7F0"]', '["skin","soft","crepe"]', 'skin', NOW()),
  ('Almond Milk', '["#FBEDD9", "#F9DDBF", "#F6C79D", "#E8A173", "#FCF6F2"]', '["skin","almond","milk"]', 'skin', NOW()),
  ('Bisque Tone', '["#FCEDE3", "#FADBC9", "#F8C19A", "#E5996F", "#FEF6F2"]', '["skin","bisque","tone"]', 'skin', NOW()),
  ('Soft Blush', '["#FDEDE2", "#FCDCC7", "#FABB98", "#F48A5E", "#FFF8F3"]', '["skin","soft","blush"]', 'skin', NOW()),
  ('Beige Ivory', '["#F4EAD9", "#E7D3BA", "#D9B997", "#B8926B", "#FAF6F1"]', '["skin","beige","ivory"]', 'skin', NOW()),
  ('Warm Honey', '["#FFEFE9", "#FFDCD0", "#FFBB9D", "#FF956F", "#FFF9F6"]', '["skin","warm","honey"]', 'skin', NOW()),
  ('Rose Beige', '["#F7E5D4", "#EECDB8", "#E3AD90", "#C88362", "#F9F2EE"]', '["skin","rose","beige"]', 'skin', NOW()),
  ('Creamy Latte', '["#F9E7DC", "#F4D9C5", "#EBC1A0", "#D59E75", "#FAF4EF"]', '["skin","creamy","latte"]', 'skin', NOW()),
  ('Peach Puff', '["#FFE8DF", "#FFD4BA", "#FFB78E", "#FF9169", "#FFF8F4"]', '["skin","peach","puff"]', 'skin', NOW()),
  ('Sand Dune', '["#F9E9D7", "#F4D7BC", "#E8BD97", "#C99A6F", "#FAF3EF"]', '["skin","sand","dune"]', 'skin', NOW()),
  ('Fair Complexion', '["#FDEDE6", "#FBDCC9", "#F8BE96", "#F3905E", "#FFFAF7"]', '["skin","fair","complexion"]', 'skin', NOW()),
  ('Terra Cotta Light', '["#FFECE1", "#FFDCC9", "#FFBFA3", "#FF9576", "#FFF8F4"]', '["skin","terra","cotta"]', 'skin', NOW()),
  ('Golden Skin', '["#FEF0E7", "#FCDCC6", "#F9C29A", "#EBA16C", "#FFF9F2"]', '["skin","golden","skin"]', 'skin', NOW()),
  ('Neutral Beige', '["#F5E7D9", "#EAD3BA", "#D8B48B", "#B89869", "#F8F3EE"]', '["skin","neutral","beige"]', 'skin', NOW()),
  ('Rosy Cheek', '["#FFECE8", "#FFDCD0", "#FFC1A8", "#FF9F81", "#FFF9F6"]', '["skin","rosy","cheek"]', 'skin', NOW()),
  ('Warm Brown Peach', '["#8c4a3a", "#c6855a", "#ffc77a", "#fde2b8", "#fff5ea"]', '["skin","warm","brown"]', 'skin', NOW()),
  ('Dusty Blue Beige', '["#a9b7c2", "#efe6d1", "#dcc9b5", "#9a857c", "#faf6f1"]', '["skin","dusty","beige"]', 'skin', NOW()),
  ('Soft Pink Cream', '["#fbf5f4", "#fde1e8", "#f8c8d8", "#f3b6c7", "#fff7fb"]', '["skin","pink","cream"]', 'skin', NOW()),
  ('Wine Rose', '["#6b3c46", "#9a6377", "#c996aa", "#ead1d1", "#fbf2f4"]', '["skin","wine","rose"]', 'skin', NOW()),
  ('Plum Neutral', '["#5a2648", "#6c3f6f", "#9a7a7a", "#b9abab", "#f4eeee"]', '["skin","plum","neutral"]', 'skin', NOW()),
  ('Rose Coral', '["#d14f73", "#ffb3b0", "#ffd2da", "#fff0f3", "#fff8fb"]', '["skin","rose","coral"]', 'skin', NOW()),
  ('Cream Red Accent', '["#fff4e4", "#ffe3c6", "#ff9f85", "#e84745", "#fff9f3"]', '["skin","cream","red"]', 'skin', NOW()),
  ('Taupe Elegance', '["#8a7773", "#d9bcbc", "#ead7d5", "#f2e7e5", "#fbf6f5"]', '["skin","taupe","elegance"]', 'skin', NOW()),
  ('Mauve Classic', '["#a7727d", "#ede0d0", "#f6eadf", "#fbf4ea", "#fffaf4"]', '["skin","mauve","classic"]', 'skin', NOW()),
  ('Vintage Navy Pink', '["#394867", "#ffd1dc", "#ffb3c7", "#f29bb4", "#fff5f9"]', '["skin","vintage","navy"]', 'skin', NOW()),
  ('Olive Gold', '["#6a5120", "#a98947", "#c9a24f", "#e8bb2b", "#fff6dc"]', '["skin","olive","gold"]', 'skin', NOW()),
  ('Rust Brown', '["#8b2e00", "#a64b2a", "#d9a96f", "#fde5b5", "#fff6e6"]', '["skin","rust","brown"]', 'skin', NOW())
ON CONFLICT DO NOTHING;

-- Section: food
DELETE FROM palettes WHERE section = 'food';
INSERT INTO palettes (name, colors, tags, section, created_at)
VALUES
  ('Citrus Tart', '["#FF6F61", "#FFC857", "#E9724C", "#F5E1A4", "#FFF8E7"]', '["food","citrus","tart"]', 'food', NOW()),
  ('Mango Salsa', '["#FF9E00", "#FFCA3A", "#8AC926", "#FFE066", "#FFFCE8"]', '["food","mango","fresh"]', 'food', NOW()),
  ('Spice Market', '["#FF4E50", "#FC913A", "#F9D423", "#EDE574", "#F9F7D9"]', '["food","spice","warm"]', 'food', NOW()),
  ('Berry Cream', '["#D7263D", "#F46036", "#2E294E", "#FCECC9", "#FFF9F5"]', '["food","berry","cream"]', 'food', NOW()),
  ('Fig Jam', '["#F08A5D", "#B83B5E", "#6A2C70", "#F6E2B3", "#FFF4E6"]', '["food","fig","jam"]', 'food', NOW()),
  ('Peach Dessert', '["#FF7F50", "#FFA07A", "#FFDAB9", "#FFE4E1", "#FFF8F7"]', '["food","peach","sweet"]', 'food', NOW()),
  ('Berry Ice', '["#E63946", "#F1FAEE", "#A8DADC", "#457B9D", "#F8FAFC"]', '["food","berry","ice"]', 'food', NOW()),
  ('Tropical Smoothie', '["#FFB347", "#FFD15C", "#FF6F91", "#F7D6BF", "#FFF6F0"]', '["food","tropical","fruit"]', 'food', NOW()),
  ('Lime Sorbet', '["#8AC926", "#A1C349", "#D9E76C", "#FDFD97", "#F9FFE3"]', '["food","lime","sorbet"]', 'food', NOW()),
  ('Popsicle Stick', '["#FF3B3F", "#FCAF3C", "#65D4F6", "#F5F5F5", "#FEFEFE"]', '["food","popsicle","fun"]', 'food', NOW()),
  ('Spicy Curry', '["#FF6347", "#FF4500", "#FFD700", "#FFF8DC", "#FFFDF5"]', '["food","spicy","curry"]', 'food', NOW()),
  ('Chocolate Cake', '["#8B4513", "#A0522D", "#CD853F", "#DEB887", "#F8F2E9"]', '["food","chocolate","brown"]', 'food', NOW()),
  ('Vanilla Bean', '["#FFDAB9", "#FFE4B5", "#FFEFD5", "#FFF5EE", "#FFFCF7"]', '["food","vanilla","cream"]', 'food', NOW()),
  ('Green Apple', '["#9ACD32", "#ADFF2F", "#7FFF00", "#F0FFF0", "#F7FFF7"]', '["food","apple","green"]', 'food', NOW()),
  ('Grape Soda', '["#8E4585", "#DA70D6", "#EE82EE", "#F8E7F6", "#FEF9FB"]', '["food","grape","purple"]', 'food', NOW()),
  ('Cheese Platter', '["#FF8C00", "#FFA500", "#FFD700", "#FFFACD", "#FFFDEF"]', '["food","cheese","yellow"]', 'food', NOW()),
  ('Strawberry Shake', '["#FF69B4", "#FF1493", "#DB7093", "#FFC0CB", "#FFE4E1"]', '["food","strawberry","pink"]', 'food', NOW()),
  ('Mint Chip', '["#00CED1", "#20B2AA", "#3CB371", "#98FB98", "#E8FBF0"]', '["food","mint","green"]', 'food', NOW()),
  ('Blue Raspberry', '["#AFEEEE", "#B0E0E6", "#ADD8E6", "#E0FFFF", "#F0FFFF"]', '["food","blue","raspberry"]', 'food', NOW()),
  ('Red Velvet', '["#BC8F8F", "#F08080", "#CD5C5C", "#FA8072", "#FFF0F0"]', '["food","red","velvet"]', 'food', NOW())
ON CONFLICT DO NOTHING;

-- Section: cream
DELETE FROM palettes WHERE section = 'cream';
INSERT INTO palettes (name, colors, tags, section, created_at)
VALUES
  ('Warm Cream', '["#FFF8E7", "#FFECD5", "#FCE0C4", "#F6D3AB", "#FFF9F2"]', '["cream","warm","soft"]', 'cream', NOW()),
  ('Soft Ivory', '["#FFF9F1", "#F9F1E6", "#F2E5D5", "#E9D7C0", "#FEFAF5"]', '["cream","ivory","white"]', 'cream', NOW()),
  ('Vanilla Cream', '["#FEF8F0", "#FDF0DE", "#FBE7CA", "#F6D8AC", "#FFFBF6"]', '["cream","vanilla","sweet"]', 'cream', NOW()),
  ('Peachy Cream', '["#FFF7EF", "#FFEAD9", "#FDDCBF", "#F9CBA2", "#FFF8F3"]', '["cream","peach","soft"]', 'cream', NOW()),
  ('Rose Cream', '["#FFF6F1", "#FFE8DC", "#FDD9C1", "#FBC09F", "#FFF8F5"]', '["cream","rose","pink"]', 'cream', NOW()),
  ('Antique Cream', '["#FDF9F0", "#F9EFDB", "#F3E3C2", "#EAD7A7", "#FEFAF3"]', '["cream","antique","vintage"]', 'cream', NOW()),
  ('Butter Cream', '["#FFF9E8", "#FFF0D1", "#FFE5B7", "#FDD893", "#FFFDEA"]', '["cream","butter","yellow"]', 'cream', NOW()),
  ('Latte Foam', '["#FFF8F2", "#FCEFE0", "#F9E3C7", "#F4D5A8", "#FFF9F5"]', '["cream","latte","coffee"]', 'cream', NOW()),
  ('Lemon Cream', '["#FFFDE7", "#FFF5CF", "#FEEEAD", "#FADB82", "#FFFFF1"]', '["cream","lemon","yellow"]', 'cream', NOW()),
  ('Almond Cream', '["#FFF9F3", "#FCEDE1", "#F7DCC4", "#EBC5A5", "#FFFAF6"]', '["cream","almond","nut"]', 'cream', NOW()),
  ('Biscuit Cream', '["#FFF8EC", "#F9ECDC", "#F4DDBF", "#E9C696", "#FEF9F4"]', '["cream","biscuit","brown"]', 'cream', NOW()),
  ('Apricot Whip', '["#FFF7F0", "#FEEFE1", "#FDDDC3", "#FACBA0", "#FFF8F6"]', '["cream","apricot","whip"]', 'cream', NOW()),
  ('Custard Cream', '["#FFFAF2", "#FDF1DC", "#FBE4BE", "#F8CFA0", "#FFFBF7"]', '["cream","custard","sweet"]', 'cream', NOW()),
  ('Banana Cream', '["#FFF9E9", "#FFF1CE", "#FFEBAB", "#FFE07B", "#FFFFF0"]', '["cream","banana","fruit"]', 'cream', NOW()),
  ('Sugar Cookie', '["#FFFDF5", "#FCEEDC", "#F9DDC0", "#F3C397", "#FFFEF8"]', '["cream","cookie","sugar"]', 'cream', NOW()),
  ('Clotted Cream', '["#FFFBEF", "#FEF4DC", "#FDE9C0", "#FAD89A", "#FEFDF4"]', '["cream","clotted","english"]', 'cream', NOW()),
  ('Orange Cream', '["#FFF6E9", "#FFEBD3", "#FEDDAD", "#FDBF7E", "#FFF8EE"]', '["cream","orange","citrus"]', 'cream', NOW()),
  ('Golden Cream', '["#FFF9F0", "#FDF1D9", "#FBE1B8", "#F8C78D", "#FFFBF6"]', '["cream","golden","warm"]', 'cream', NOW()),
  ('Blush Cream', '["#FFF7F4", "#FDEEE2", "#F9DCC1", "#EFC49A", "#FFF9F7"]', '["cream","blush","pink"]', 'cream', NOW()),
  ('Milky Tea', '["#FFF8F1", "#FCEFE1", "#F8DDBF", "#EEC89C", "#FFF9F6"]', '["cream","milk","tea"]', 'cream', NOW())
ON CONFLICT DO NOTHING;

-- Section: coffee
DELETE FROM palettes WHERE section = 'coffee';
INSERT INTO palettes (name, colors, tags, section, created_at)
VALUES
  ('Espresso Roast', '["#4B2E2A", "#6E4D3E", "#A57C69", "#D1B8A3", "#F5EFE8"]', '["coffee","espresso","dark"]', 'coffee', NOW()),
  ('Mocha Bean', '["#3E2B28", "#5A463E", "#997C6B", "#C9B19F", "#F3EAE0"]', '["coffee","mocha","brown"]', 'coffee', NOW()),
  ('Dark Roast', '["#3D2C29", "#6B4F40", "#9C7E6A", "#CDBBA9", "#EFE8E1"]', '["coffee","dark","roast"]', 'coffee', NOW()),
  ('Black Coffee', '["#2C1E1B", "#4C3B35", "#897765", "#C1B3A8", "#F3EEE9"]', '["coffee","black","strong"]', 'coffee', NOW()),
  ('Cafe au Lait', '["#5A3E36", "#8B6E5E", "#C0A18B", "#E2D4C8", "#F7F2EE"]', '["coffee","cafe","lait"]', 'coffee', NOW()),
  ('Java Blend', '["#3A2E27", "#624D40", "#A17D67", "#D5C0B0", "#F2EBE4"]', '["coffee","java","blend"]', 'coffee', NOW()),
  ('Barista Brew', '["#42312D", "#705D51", "#B09A89", "#D7C9BF", "#F6F1EC"]', '["coffee","barista","brew"]', 'coffee', NOW()),
  ('Turkish Coffee', '["#281C18", "#513E37", "#8E745F", "#C8B7AA", "#EFEBE7"]', '["coffee","turkish","strong"]', 'coffee', NOW()),
  ('Coffee Shop', '["#4F3A34", "#816C5A", "#B69E8C", "#DBCEC2", "#F9F4EF"]', '["coffee","shop","warm"]', 'coffee', NOW()),
  ('American Roast', '["#362E2A", "#5E4F47", "#9E8A7B", "#D1C4BB", "#F4F0EC"]', '["coffee","american","roast"]', 'coffee', NOW()),
  ('Hazelnut Brew', '["#3C2F2A", "#6A564D", "#B09B8F", "#D9CEC5", "#F7F3F0"]', '["coffee","hazelnut","nutty"]', 'coffee', NOW()),
  ('Cappuccino Foam', '["#422F2A", "#7A5F57", "#BA9E8F", "#E1D4CB", "#FAF6F2"]', '["coffee","cappuccino","foam"]', 'coffee', NOW()),
  ('Morning Brew', '["#362B27", "#6B5850", "#A79180", "#D2C7C0", "#F2EEEB"]', '["coffee","morning","brew"]', 'coffee', NOW()),
  ('Roasted Bean', '["#412F2B", "#7F6D62", "#C1AC9E", "#E6DED5", "#FAF8F5"]', '["coffee","roasted","bean"]', 'coffee', NOW()),
  ('Coffee Crema', '["#472F2B", "#856F63", "#C8B7AA", "#E9DDD4", "#FBF7F3"]', '["coffee","crema","smooth"]', 'coffee', NOW()),
  ('Macchiato Shot', '["#392E28", "#6E5B51", "#B19C8F", "#D8CCC4", "#F8F4F1"]', '["coffee","macchiato","shot"]', 'coffee', NOW()),
  ('Cortado Cup', '["#3E2D27", "#605042", "#A0897B", "#D2C4BA", "#F3EEF0"]', '["coffee","cortado","cup"]', 'coffee', NOW()),
  ('Flat White', '["#352D27", "#5E4C42", "#A38C7F", "#CDC2B8", "#F5F1ED"]', '["coffee","flat","white"]', 'coffee', NOW()),
  ('Ristretto Pour', '["#3A2C26", "#644F44", "#A89183", "#D1C7BF", "#F6F2EF"]', '["coffee","ristretto","pour"]', 'coffee', NOW()),
  ('Breve Coffee', '["#4A322E", "#7A5F53", "#C0A894", "#E5DDD3", "#FBF6F1"]', '["coffee","breve","rich"]', 'coffee', NOW())
ON CONFLICT DO NOTHING;

-- Section: wedding
DELETE FROM palettes WHERE section = 'wedding';
INSERT INTO palettes (name, colors, tags, section, created_at)
VALUES
  ('Blushing Bride', '["#FFF7F8", "#FDE8E9", "#F9DAD9", "#EFCED4", "#FFF9FA"]', '["wedding","pink","soft"]', 'wedding', NOW()),
  ('Champagne Toast', '["#FFF9F2", "#FEF2E6", "#FDE7D8", "#F7DCC2", "#FFF9F5"]', '["wedding","champagne","cream"]', 'wedding', NOW()),
  ('Something Blue', '["#F8F9FF", "#EFF2FF", "#E0E6FF", "#C8D0FF", "#FAFCFF"]', '["wedding","blue","soft"]', 'wedding', NOW()),
  ('Ivory Vows', '["#FFFDF6", "#FDF6E8", "#F9E8D6", "#F4D9BA", "#FFFEF8"]', '["wedding","ivory","warm"]', 'wedding', NOW()),
  ('Bridal Rose', '["#FFF8FA", "#FDEDF1", "#F8D4E4", "#EFB8CE", "#FFF9FB"]', '["wedding","rose","pink"]', 'wedding', NOW()),
  ('Pure Romance', '["#FFF6F6", "#FEEAEA", "#FDDADA", "#F9CFCF", "#FFF8F8"]', '["wedding","romance","red"]', 'wedding', NOW()),
  ('Garden Wedding', '["#F6FFF1", "#E8FFE3", "#D1FBC3", "#A9F7A5", "#F7FFF4"]', '["wedding","garden","green"]', 'wedding', NOW()),
  ('Lavender Haze', '["#FEFCFF", "#F8F4FF", "#ECD6FF", "#D8BBFF", "#FFF9FF"]', '["wedding","lavender","purple"]', 'wedding', NOW()),
  ('Golden Hour', '["#FFF9E8", "#FFF2D4", "#FFE7B8", "#FFD58C", "#FFFAED"]', '["wedding","golden","yellow"]', 'wedding', NOW()),
  ('Peach Perfect', '["#FFF8F2", "#FCEFE3", "#F8DFC9", "#F0BC9E", "#FFF9F4"]', '["wedding","peach","soft"]', 'wedding', NOW()),
  ('Pink Bouquet', '["#FFF4F9", "#FCE8F3", "#F8C9E1", "#EFA9C7", "#FFF8FB"]', '["wedding","bouquet","pink"]', 'wedding', NOW()),
  ('Gold Elegance', '["#FFFBEF", "#FDF4D7", "#FBDEAB", "#F7C77F", "#FFFCF4"]', '["wedding","gold","elegance"]', 'wedding', NOW()),
  ('Classic White', '["#FEFEFF", "#F8F8FF", "#E8E8FF", "#D8D8FF", "#FFFEFF"]', '["wedding","classic","white"]', 'wedding', NOW()),
  ('Apricot Kiss', '["#FFF9F6", "#FEEFE7", "#FDD7C9", "#FABFA1", "#FFF9F7"]', '["wedding","apricot","kiss"]', 'wedding', NOW()),
  ('Sunlit Wedding', '["#FFF8EE", "#FEEBD4", "#FDD8A9", "#FDBF82", "#FFFAF3"]', '["wedding","sunlit","warm"]', 'wedding', NOW()),
  ('Sweet Lavender', '["#FFF7FC", "#FCEBF6", "#F9D5EB", "#F3B9DE", "#FFF9FD"]', '["wedding","sweet","lavender"]', 'wedding', NOW()),
  ('Vanilla Sky', '["#FFF9E0", "#FFF4C8", "#FFECB0", "#FFE188", "#FFFCE5"]', '["wedding","vanilla","sky"]', 'wedding', NOW()),
  ('Timeless Rose', '["#FEF9FA", "#F9EEF1", "#F4D6DA", "#E9BCC4", "#FFF9FB"]', '["wedding","timeless","rose"]', 'wedding', NOW()),
  ('Pale Yellow', '["#FFFDF0", "#FDF6D9", "#FAEFB0", "#F7DC84", "#FFFEF7"]', '["wedding","pale","yellow"]', 'wedding', NOW()),
  ('Soft Petal', '["#FFF8F5", "#FCEEE7", "#F9D7C9", "#F1BFA8", "#FFF9F7"]', '["wedding","petal","soft"]', 'wedding', NOW()),
  ('Charcoal Blue', '["#333446", "#8690aa", "#c8d9d7", "#eef2f1", "#f8fafc"]', '["wedding","charcoal","blue"]', 'wedding', NOW()),
  ('Brown Olive', '["#4e3427", "#cc7a42", "#bcd7a8", "#f0f4c3", "#fafbe8"]', '["wedding","brown","olive"]', 'wedding', NOW()),
  ('Pink Cream', '["#5a3d50", "#ff6fb1", "#ffb6c9", "#fde6c9", "#fff7f1"]', '["wedding","pink","cream"]', 'wedding', NOW()),
  ('Purple Blush', '["#7f5ab6", "#9f86c0", "#f7a1b3", "#ffe4e1", "#fff6f7"]', '["wedding","purple","blush"]', 'wedding', NOW()),
  ('Red Plum', '["#e84d4f", "#70204e", "#c0d2de", "#eaf3ed", "#f9fcfa"]', '["wedding","red","plum"]', 'wedding', NOW()),
  ('Pink Mint', '["#ff9fc5", "#ffd1e1", "#fbfde6", "#98d3d8", "#f1fbfc"]', '["wedding","pink","mint"]', 'wedding', NOW()),
  ('Soft Blue', '["#aabce2", "#a7cdf4", "#c9e3e7", "#fff2d9", "#fff9ee"]', '["wedding","soft","blue"]', 'wedding', NOW()),
  ('Dark Navy', '["#0f2b4c", "#d8cfc2", "#0a2540", "#000000", "#f5f3ef"]', '["wedding","dark","navy"]', 'wedding', NOW()),
  ('Lavender Soft', '["#a968cc", "#d8a7e5", "#eac5ef", "#ffe3f1", "#fff7fb"]', '["wedding","lavender","soft"]', 'wedding', NOW()),
  ('Gold Navy', '["#f2b63f", "#3f678d", "#1f3f5f", "#4f7f8f", "#f8f4ec"]', '["wedding","gold","navy"]', 'wedding', NOW()),
  ('Ice Pastel', '["#fbfbfb", "#eaf8ff", "#cfdcff", "#cfcaff", "#f7f8ff"]', '["wedding","ice","pastel"]', 'wedding', NOW()),
  ('Teal Mustard', '["#2a6f7e", "#f4e7c3", "#ff9155", "#cf6a44", "#fff3e6"]', '["wedding","teal","mustard"]', 'wedding', NOW())
ON CONFLICT DO NOTHING;

-- Section: christmas
DELETE FROM palettes WHERE section = 'christmas';
INSERT INTO palettes (name, colors, tags, section, created_at)
VALUES
  ('Festive Red', '["#8A1C1C", "#C12F2F", "#FF4F4F", "#FFD7D7", "#FFF8F8"]', '["christmas","red","festive"]', 'christmas', NOW()),
  ('Evergreen', '["#1A3A1A", "#2C5F2C", "#4CAF50", "#A8E6A3", "#ECF9EE"]', '["christmas","green","nature"]', 'christmas', NOW()),
  ('Holly Berry', '["#3B1F1F", "#7D2626", "#C94141", "#F4B7B7", "#FFF2F2"]', '["christmas","red","holly"]', 'christmas', NOW()),
  ('Winter Night', '["#0F2F4A", "#1A4D78", "#72A6D1", "#CADFF0", "#F3F9FF"]', '["christmas","blue","winter"]', 'christmas', NOW()),
  ('Gingerbread House', '["#3F2D1F", "#785330", "#BD885E", "#E4C9A4", "#FAF5ED"]', '["christmas","brown","sweet"]', 'christmas', NOW()),
  ('Silent Night', '["#1C1E26", "#3A3F4A", "#667085", "#B0B9C6", "#F9FAFC"]', '["christmas","dark","cool"]', 'christmas', NOW()),
  ('Santa Suit', '["#7A1C23", "#B22E35", "#E45757", "#F8BFBF", "#FFF4F4"]', '["christmas","red","bright"]', 'christmas', NOW()),
  ('Mistletoe', '["#0B3D2E", "#167A45", "#63C78E", "#B9E8CB", "#ECFDF6"]', '["christmas","green","mistletoe"]', 'christmas', NOW()),
  ('Reindeer Brown', '["#4A2411", "#8C4F27", "#C27A44", "#E9C8A4", "#F9EFE4"]', '["christmas","brown","animal"]', 'christmas', NOW()),
  ('Frosty Morning', '["#102A4E", "#1E487F", "#679ECB", "#BFD8F2", "#F5Faff"]', '["christmas","blue","frost"]', 'christmas', NOW()),
  ('Candy Cane', '["#5C1F1F", "#962424", "#FF6363", "#FFA3A3", "#FFF5F5"]', '["christmas","red","candy"]', 'christmas', NOW()),
  ('Pine Forest', '["#1C3F2B", "#2F6D47", "#5FBF85", "#B7E7CB", "#EFFDF5"]', '["christmas","green","pine"]', 'christmas', NOW()),
  ('Sugar Plum', '["#3D192F", "#7E304F", "#C44C7A", "#F0BFCE", "#FFF4F8"]', '["christmas","purple","sweet"]', 'christmas', NOW()),
  ('Winter Storm', '["#2B2631", "#556580", "#8AB4F8", "#C3D8FF", "#F5F9FF"]', '["christmas","dark","stormy"]', 'christmas', NOW()),
  ('Warm Hearth', '["#83281F", "#B84C3D", "#E98B81", "#F7CFC9", "#FFF6F4"]', '["christmas","red","warm"]', 'christmas', NOW()),
  ('Spruce Green', '["#204E3B", "#3A7A59", "#6ABF92", "#C1E9D8", "#EFFDFB"]', '["christmas","green","spruce"]', 'christmas', NOW()),
  ('Cranberry Red', '["#501C1C", "#8E3434", "#D14F4F", "#F8BEBE", "#FFF3F3"]', '["christmas","red","berry"]', 'christmas', NOW()),
  ('Ice Skating', '["#174A6F", "#2A6EB2", "#6FAFDB", "#C3DFFA", "#F7FBFF"]', '["christmas","blue","ice"]', 'christmas', NOW()),
  ('Cocoa Mug', '["#3E2C2F", "#7B4F54", "#C16F76", "#E9C8CC", "#FFF2F2"]', '["christmas","brown","cozy"]', 'christmas', NOW()),
  ('Winter Mint', '["#16422B", "#2C784B", "#4FBF80", "#B9EACA", "#E9FFF4"]', '["christmas","green","mint"]', 'christmas', NOW())
ON CONFLICT DO NOTHING;

-- Section: restored
DELETE FROM palettes WHERE section = 'restored';
INSERT INTO palettes (name, colors, tags, section, created_at)
VALUES
  ('Soft Red Scape', '['#E0CCDE', '#EFE6F0', '#EFCFDE', '#E7D5EB', '#E7C3C3']', '["light","warm"]', 'restored', NOW()),
  ('Electric Purple Essence', '['#2D0B59', '#5A189A', '#9D4EDD', '#E0AAFF', '#F6EDFF']', '["gradient","purple","dream","vibrant","cold"]', 'restored', NOW()),
  ('Midnight Blue Scape', '['#8D786D', '#453A1C', '#1E0F1F', '#077D6A', '#020B64']', '["dark","cold"]', 'restored', NOW()),
  ('Soft Pink Harmony', '['#F0E7F3', '#E3B6DF', '#F0EBF7', '#BDE5CB', '#E2CAD2']', '["light"]', 'restored', NOW()),
  ('Classic Teal Scape', '['#FDFEFB', '#A2C4DD', '#016779', '#A5A592', '#ECECE4']', '["cold"]', 'restored', NOW()),
  ('Classic Purple Mood', '['#415CBE', '#209744', '#2B2F28', '#BB4AF7', '#42B389']', '["cold"]', 'restored', NOW()),
  ('Classic Green Aura', '['#7BF48D', '#070D31', '#94D197', '#D0CCAE', '#0D3E63']', '["neon","cold"]', 'restored', NOW()),
  ('Classic Orange Mood', '['#7F572A', '#58442D', '#8E651B', '#996924', '#55442B']', '["warm"]', 'restored', NOW()),
  ('Soft Purple Harmony', '['#f8f4ff', '#ede4ff', '#dcc8ff', '#c4a8ff', '#a855f7']', '["lilac","dreamy","light","vibrant","cold"]', 'restored', NOW()),
  ('Soft Green Dream', '['#EEF4E0', '#E3E7C6', '#D8D7EB', '#D7CBE4', '#DFE8F2']', '["light","cold"]', 'restored', NOW()),
  ('Soft Pink Scape', '['#D5E5E3', '#E0C7DB', '#ECE9F2', '#EAD9EC', '#F4F2ED']', '["light","cold"]', 'restored', NOW()),
  ('Soft Blue Mood', '['#E0BCD5', '#CDE3BE', '#DADAF1', '#D6D2E3', '#C9DDC4']', '["light","cold"]', 'restored', NOW()),
  ('Soft Orange Flow', '['#F0E8D2', '#D0DAEC', '#DFE3D0', '#F3EDE9', '#E5EEE5']', '["light","warm"]', 'restored', NOW()),
  ('Soft Blue Flow', '['#EFEFE0', '#E9E8F5', '#C6CBEA', '#F0E8E1', '#E8EAF6']', '["light","cold"]', 'restored', NOW()),
  ('Soft Blue Essence', '['#DDEAED', '#CFC2E6', '#F2E6EE', '#DDE3F0', '#CAD5ED']', '["light","cold"]', 'restored', NOW()),
  ('Soft Blue Vibe', '['#E0DAC9', '#E4E3F3', '#D8D8E5', '#EDE3E2', '#E6E8EF']', '["light","cold"]', 'restored', NOW()),
  ('Soft Blue Harmony', '['#D8E6EB', '#BBD1E6', '#E4E1EC', '#DBD1E8', '#F5EEED']', '["light","cold"]', 'restored', NOW()),
  ('Soft Green Harmony', '['#D0E8D3', '#E1DBEF', '#E7EFF2', '#E7D1DF', '#DDEFD1']', '["light","cold"]', 'restored', NOW()),
  ('Soft Green Mood', '['#E2D7E7', '#C5C0E0', '#EBF1DB', '#E4E3D5', '#D9EAEF']', '["light","cold"]', 'restored', NOW()),
  ('Classic Teal Vibe', '['#180F1F', '#6D2385', '#05383D', '#33270A', '#E3E3E3']', '["cold"]', 'restored', NOW()),
  ('Classic Purple Harmony', '['#4040A0', '#441448', '#7E8BE2', '#E1B5F2', '#86799A']', '["cold"]', 'restored', NOW()),
  ('Classic Blue Scape', '['#E5E9F5', '#1B2979', '#2F2F32', '#F5F2EB', '#D5BAB8']', '["cold"]', 'restored', NOW()),
  ('Classic Green Flow', '['#C307E9', '#B4DAB4', '#72FDAA', '#BBB5AF', '#051506']', '[]', 'restored', NOW()),
  ('Classic Purple Flow', '['#979597', '#38363F', '#80754D', '#9AAAC1', '#9413C3']', '["cold"]', 'restored', NOW()),
  ('Classic Purple Dream', '['#CEE3D4', '#8598AD', '#A0A6AC', '#231853', '#BBC0CE']', '["cold"]', 'restored', NOW()),
  ('Classic Pink Dream', '['#F1F4F1', '#063956', '#3A404B', '#017B89', '#330029']', '["neon","cold"]', 'restored', NOW()),
  ('Classic Pink Aura', '['#789074', '#B3B8B2', '#187737', '#FBFCFE', '#F3B4F2']', '[]', 'restored', NOW()),
  ('Classic Pink Scape', '['#92D8B5', '#2B2370', '#CE1C7E', '#791B35', '#D8BB3B']', '["neon","warm"]', 'restored', NOW()),
  ('Classic Green Harmony', '['#E8CD9B', '#C6CB67', '#406010', '#AAC1A4', '#454545']', '["warm"]', 'restored', NOW()),
  ('Classic Blue Harmony', '['#9C9D95', '#1A0518', '#122BAB', '#A58E40', '#29271E']', '["warm"]', 'restored', NOW()),
  ('Classic Pink Essence', '['#DFC877', '#E6E4E7', '#7F104F', '#33CC8A', '#C7A9AF']', '["warm"]', 'restored', NOW()),
  ('Classic Green Essence', '['#218CCA', '#3A6C0F', '#DDCADD', '#ADB6A5', '#3C1911']', '["warm"]', 'restored', NOW()),
  ('Classic Pink Vibe', '['#5E5B5A', '#9888A0', '#9FE783', '#5D0957', '#0E161B']', '[]', 'restored', NOW()),
  ('Classic Purple Vibe', '['#390F95', '#A1979E', '#A7A6A5', '#16090B', '#F8BFC5']', '["warm"]', 'restored', NOW()),
  ('Classic Blue Vibe', '['#144952', '#60395E', '#8BE4F8', '#D11553', '#2036DF']', '["neon","cold"]', 'restored', NOW()),
  ('Classic Blue Essence', '['#DD3C5C', '#060A06', '#7E9CF6', '#D8A683', '#839B69']', '["warm"]', 'restored', NOW()),
  ('Classic Teal Essence', '['#000000', '#D7EEE7', '#C5E755', '#A0D39C', '#ACF6E8']', '["cold"]', 'restored', NOW()),
  ('Classic Teal Harmony', '['#0D0907', '#0C120D', '#D5D9DD', '#A0F8D3', '#59E3D1']', '["cold"]', 'restored', NOW()),
  ('Classic Teal Aura', '['#F0E9F7', '#525275', '#443722', '#68735E', '#11312E']', '["cold"]', 'restored', NOW()),
  ('Classic Teal Dream', '['#A58D9E', '#02361E', '#394D51', '#D2D2D5', '#E0E29C']', '["cold"]', 'restored', NOW()),
  ('Classic Yellow Mood', '['#ECEEE3', '#2CD84E', '#F3F6F7', '#ADE1B5', '#876708']', '[]', 'restored', NOW()),
  ('Classic Blue Flow', '['#326255', '#4D492D', '#4D3276', '#545421', '#9797FC']', '["cold"]', 'restored', NOW()),
  ('Classic Pink Harmony', '['#F9FBF9', '#2B1F3D', '#ED99FA', '#5ED025', '#A2969A']', '["cold"]', 'restored', NOW()),
  ('Classic Teal Mood', '['#95742D', '#50E7B5', '#575757', '#80D56D', '#337063']', '[]', 'restored', NOW()),
  ('Classic Green Vibe', '['#2D5458', '#270D63', '#D4FE85', '#10A232', '#C9C39C']', '["neon","cold"]', 'restored', NOW()),
  ('Classic Purple Essence', '['#CCF5DC', '#17161D', '#D281FE', '#F665CF', '#2C3F3C']', '["cold"]', 'restored', NOW()),
  ('Classic Orange Vibe', '['#2511C0', '#6F256B', '#18BF18', '#433723', '#FCE8CA']', '["neon","warm"]', 'restored', NOW()),
  ('Classic Green Mood', '['#071A05', '#D1D8D0', '#1B1D1C', '#3F2731', '#909898']', '["cold"]', 'restored', NOW()),
  ('Classic Green Scape', '['#BFB797', '#2A2D2D', '#4C7811', '#B8E0C7', '#EDCFD5']', '["warm"]', 'restored', NOW()),
  ('Classic Yellow Essence', '['#FCFCFD', '#461127', '#A5991D', '#104130', '#0F0507']', '["warm"]', 'restored', NOW()),
  ('Classic Pink Flow', '['#E2D779', '#38281A', '#EE3F9C', '#381C14', '#AB6044']', '["warm"]', 'restored', NOW()),
  ('Electric Green Flow', '['#FA5FCE', '#F8AF6A', '#56FD8E', '#9545F6', '#1AFE72']', '["vibrant","warm"]', 'restored', NOW()),
  ('Electric Purple Harmony', '['#AF4EFA', '#C90EFD', '#49E7F8', '#9F43FB', '#FCC347']', '["vibrant","cold"]', 'restored', NOW()),
  ('Electric Green Dream', '['#14DBF5', '#9147F7', '#FB257B', '#D2FD26', '#9EFA5C']', '["vibrant","cold"]', 'restored', NOW()),
  ('Electric Red Harmony', '['#FE459F', '#9555FD', '#67FA95', '#37FB06', '#5610FA']', '["vibrant","cold"]', 'restored', NOW()),
  ('Electric Teal Aura', '['#38F0FE', '#D3F84F', '#F6BA2F', '#D0F809', '#F6C251']', '["vibrant","warm"]', 'restored', NOW()),
  ('Electric Orange Mood', '['#FF9360', '#0821FD', '#56FB4A', '#64F964', '#5BF419']', '["vibrant"]', 'restored', NOW()),
  ('Electric Blue Scape', '['#FD5ED0', '#0CDAF5', '#97F863', '#21A5FD', '#F48217']', '["vibrant"]', 'restored', NOW()),
  ('Electric Red Aura', '['#885AFD', '#59B2FB', '#3EEAF9', '#51B4F6', '#FE2515']', '["vibrant","cold"]', 'restored', NOW()),
  ('Electric Red Flow', '['#F6285C', '#D243FE', '#22FBAF', '#64FA4D', '#FE5724']', '["vibrant"]', 'restored', NOW()),
  ('Electric Red Dream', '['#2CB3F6', '#15F89A', '#F81A1A', '#F73DDF', '#FC5F5F']', '["vibrant","warm"]', 'restored', NOW()),
  ('Electric Purple Aura', '['#69FAB4', '#B4FA69', '#572DFE', '#FB45F8', '#D9F80E']', '["vibrant","cold"]', 'restored', NOW()),
  ('Electric Red Essence', '['#374EF6', '#5CF41F', '#05FA80', '#6150FC', '#FD6286']', '["vibrant","cold"]', 'restored', NOW()),
  ('Electric Yellow Scape', '['#F31027', '#59F728', '#26F47C', '#DDFB19', '#2145FB']', '["vibrant"]', 'restored', NOW()),
  ('Electric Orange Dream', '['#FE6A60', '#FE2521', '#FFB84F', '#3EBCFC', '#2ACDF6']', '["vibrant","warm"]', 'restored', NOW()),
  ('Electric Blue Aura', '['#44F9F9', '#F6B448', '#23F947', '#BF61FA', '#14D3FA']', '["vibrant","cold"]', 'restored', NOW()),
  ('Electric Green Vibe', '['#9C63FE', '#FAC822', '#3689F5', '#7CFA60', '#0BFE13']', '["vibrant","cold"]', 'restored', NOW()),
  ('Electric Pink Vibe', '['#57FF78', '#F92D22', '#FF47DA', '#60FB7A', '#F9F51E']', '["vibrant","warm"]', 'restored', NOW()),
  ('Classic Yellow Dream', '['#F4C332', '#EFB611', '#EDB92C', '#C2A02F', '#E3BB5C']', '["neon","warm"]', 'restored', NOW()),
  ('Classic Yellow Scape', '['#D6A43A', '#DEC06C', '#EEC21C', '#D1A310', '#BB901E']', '["neon","warm"]', 'restored', NOW()),
  ('Classic Yellow Flow', '['#DFA923', '#EECA56', '#BA9925', '#C38D15', '#E1CA62']', '["neon","warm"]', 'restored', NOW()),
  ('Classic Yellow Vibe', '['#E8AD2E', '#DCAD1C', '#D7AF11', '#F0C043', '#DAC565']', '["neon","warm"]', 'restored', NOW()),
  ('Classic Orange Scape', '['#EEBC48', '#B78C28', '#E8B725', '#E5BD23', '#DFBF2E']', '["neon","warm"]', 'restored', NOW()),
  ('Classic Orange Harmony', '['#EFCD6D', '#F0C35A', '#B0851D', '#E7B82E', '#AF8824']', '["neon","warm"]', 'restored', NOW()),
  ('Electric Orange Aura', '['#E7BD5B', '#ECC768', '#F1B641', '#E5A60F', '#E6AF1D']', '["vibrant","warm"]', 'restored', NOW()),
  ('Classic Orange Essence', '['#D8B74B', '#D5B94B', '#CFB532', '#DCBD74', '#EFBF3B']', '["neon","warm"]', 'restored', NOW()),
  ('Classic Green Dream', '['#93E77E', '#8ECEDC', '#728CE4', '#5D7463', '#EFF1D0']', '["cold"]', 'restored', NOW()),
  ('Classic Purple Scape', '['#D2D2F9', '#160656', '#9DADE7', '#F7F7F7', '#E2D040']', '["cold"]', 'restored', NOW()),
  ('Classic Blue Dream', '['#CFE2D9', '#6D9793', '#C1B9BB', '#CED5F3', '#D5E6E6']', '["light","cold"]', 'restored', NOW()),
  ('Classic Red Flow', '['#EBE5EA', '#D12E15', '#30301C', '#DAE6C7', '#B9B0C9']', '["warm"]', 'restored', NOW()),
  ('Midnight Blue Essence', '['#03350E', '#001334', '#0E2245', '#0F292E', '#570727']', '["dark","neon","cold"]', 'restored', NOW()),
  ('Midnight Yellow Essence', '['#3A301B', '#3C4203', '#085536', '#1F221C', '#171206']', '["dark","warm"]', 'restored', NOW()),
  ('Midnight Yellow Scape', '['#362D2F', '#180417', '#211E02', '#141F14', '#222024']', '["dark","warm"]', 'restored', NOW()),
  ('Midnight Yellow Vibe', '['#302E0A', '#141A17', '#29253A', '#0E2718', '#242419']', '["dark","cold"]', 'restored', NOW()),
  ('Midnight Yellow Flow', '['#161512', '#323607', '#0E0E0E', '#180721', '#41180E']', '["dark","warm"]', 'restored', NOW()),
  ('Midnight Purple Vibe', '['#1B151F', '#25311E', '#400253', '#0B470A', '#383911']', '["dark","cold"]', 'restored', NOW()),
  ('Midnight Green Mood', '['#0D300A', '#383227', '#2D3E16', '#390C1F', '#012303']', '["dark","warm"]', 'restored', NOW()),
  ('Midnight Teal Vibe', '['#0F1B15', '#013431', '#23112B', '#07524A', '#31321E']', '["dark","cold"]', 'restored', NOW()),
  ('Midnight Teal Flow', '['#2B2B1C', '#0D462A', '#2F282B', '#0B3F3D', '#090A27']', '["dark","cold"]', 'restored', NOW()),
  ('Midnight Yellow Mood', '['#12120F', '#2E2D03', '#3B0412', '#131C1A', '#171717']', '["dark","warm"]', 'restored', NOW()),
  ('Midnight Blue Aura', '['#2D2A2E', '#441B39', '#081B13', '#0C0925', '#010639']', '["dark","cold"]', 'restored', NOW()),
  ('Midnight Pink Essence', '['#1F0A19', '#111318', '#1F2E3F', '#241919', '#241526']', '["dark","cold"]', 'restored', NOW()),
  ('Midnight Blue Harmony', '['#090D11', '#171F04', '#0B100A', '#0E094D', '#0F0B0E']', '["dark","cold"]', 'restored', NOW()),
  ('Midnight Green Vibe', '['#2E240E', '#11481B', '#1F3639', '#171315', '#0E1F2C']', '["dark"]', 'restored', NOW()),
  ('Midnight Teal Scape', '['#0B0F0F', '#151225', '#350D18', '#03321E', '#333231']', '["dark","cold"]', 'restored', NOW()),
  ('Midnight Red Essence', '['#1E1D22', '#545A07', '#130B1E', '#16191F', '#360111']', '["dark","cold"]', 'restored', NOW()),
  ('Midnight Pink Aura', '['#0E4834', '#322C38', '#370539', '#1D1D1D', '#2D1F0B']', '["dark","cold"]', 'restored', NOW()),
  ('Classic Red Harmony', '['#F59995', '#EF9989', '#CF7470', '#D5C325', '#C96F43']', '["neon","warm"]', 'restored', NOW()),
  ('Classic Red Vibe', '['#EEA216', '#F0D68E', '#F7897D', '#BC211A', '#DDA947']', '["neon","warm"]', 'restored', NOW()),
  ('Classic Red Essence', '['#F0ACA7', '#F7A29C', '#E39F5E', '#A88D29', '#CF381B']', '["neon","warm"]', 'restored', NOW()),
  ('Classic Blue Aura', '['#93D9E1', '#B3CCD4', '#B1BCD0', '#AEBFE5', '#9CCBE6']', '["light","cold"]', 'restored', NOW()),
  ('Soft Blue Dream', '['#C3CBE4', '#B7D4E7', '#BDD2DC', '#E4EBF7', '#E4E6F3']', '["light","cold"]', 'restored', NOW()),
  ('Soft Teal Essence', '['#C9D9DB', '#E5EAEE', '#D8D9E7', '#91DBE0', '#9DBAE0']', '["light","cold"]', 'restored', NOW()),
  ('Classic Purple Aura', '['#708669', '#E4BBEC', '#6C0486', '#054311', '#1E2A6B']', '["neon","cold"]', 'restored', NOW()),
  ('Midnight Pink Mood', '['#72371D', '#22161E', '#797916', '#510A5C', '#3F172B']', '["dark","warm"]', 'restored', NOW()),
  ('Classic Red Aura', '['#727EA7', '#7F39A2', '#050000', '#221122', '#C88232']', '["warm"]', 'restored', NOW()),
  ('Classic Red Scape', '['#CCF5CC', '#A0A84D', '#5B0620', '#D2D0D1', '#687728']', '["warm"]', 'restored', NOW())
ON CONFLICT DO NOTHING;

