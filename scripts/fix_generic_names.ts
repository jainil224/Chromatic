
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('❌ Missing Supabase credentials. Please check .env or .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function fixGenericPalettes() {
    console.log('🔍 Searching for generic "Dream" palettes...');

    // 1. Fetch generic palettes matching "Dream"
    // We fetch ALL palettes to check for name uniqueness, then filter for the ones to fix.
    const { data: allPalettes, error: fetchError } = await supabase
        .from('palettes')
        .select('*');

    if (fetchError) {
        console.error('❌ Error fetching palettes:', fetchError);
        return;
    }

    if (!allPalettes || allPalettes.length === 0) {
        console.log('✅ No palettes found.');
        return;
    }

    // Pattern to identify generic names we want to change:
    // "Happy Dream...", "Coffee Dream...", "Summer Dream 104", "Purple Dream"
    // Basically anything ending in "Dream" or "Dream \d+" or starting with a Category + Dream
    const genericPattern = /Dream(\s+\d+)?$/i;

    // Filter candidates
    const palettesToFix = allPalettes.filter(p => genericPattern.test(p.name));

    if (palettesToFix.length === 0) {
        console.log('✅ No generic "Dream" palettes found to fix.');
        return;
    }

    console.log(`Found ${palettesToFix.length} palettes to fix out of ${allPalettes.length} total.`);

    // Create a set of existing names to ensure uniqueness
    const existingNames = new Set(allPalettes.map(p => p.name.toLowerCase()));

    // Remove the names we are about to change from the set, so we can recycle them if needed (unlikely)
    // actually, keep them in to avoid accidental collision if we crash halfway. 
    // But we want to allow the *new* names to populate the space.

    let updatedCount = 0;

    // 2. Iterate and update
    for (const palette of palettesToFix) {
        let { name: newName, tags: newTags } = generatePaletteMetadata(palette.colors);

        // Ensure Uniqueness
        let attempts = 0;
        const baseName = newName;
        while (existingNames.has(newName.toLowerCase())) {
            attempts++;
            // Try different variations
            if (attempts < 5) {
                // Try a different noun
                const meta = generatePaletteMetadata(palette.colors);
                newName = meta.name;
            } else {
                // Append distinct suffix
                const roman = toRoman(attempts - 4);
                newName = `${baseName} ${roman}`;
            }

            // Safety break
            if (attempts > 20) {
                newName = `${baseName} ${Math.floor(Math.random() * 1000)}`;
                break;
            }
        }

        // Add valid new name to set
        existingNames.add(newName.toLowerCase());

        console.log(`🎨 Renaming "${palette.name}" -> "${newName}" [${newTags.join(', ')}]`);

        // Keep existing tags if any, distinct merge
        const existingTags = Array.isArray(palette.tags) ? palette.tags : [];
        const mergedTags = Array.from(new Set([...existingTags, ...newTags]));

        const { error: updateError } = await supabase
            .from('palettes')
            .update({
                name: newName,
                tags: mergedTags
            })
            .eq('id', palette.id);

        if (updateError) {
            console.error(`Failed to update ${palette.id}`, updateError);
        } else {
            updatedCount++;
        }
    }

    console.log(`✅ Successfully fixed ${updatedCount} palettes!`);
}

function toRoman(num: number): string {
    if (num === 1) return "I";
    if (num === 2) return "II";
    if (num === 3) return "III";
    if (num === 4) return "IV";
    return `V${"I".repeat(num - 5)}`;
}

// --- Helper Functions ---

function generatePaletteMetadata(colors: string[]) {
    // 1. Convert hex to HSL to understand the colors
    const hslColors = colors.map(hex => hexToHSL(hex));

    // 2. Determine dominant properties
    const avgL = hslColors.reduce((acc, c) => acc + c.l, 0) / hslColors.length;
    const avgS = hslColors.reduce((acc, c) => acc + c.s, 0) / hslColors.length;

    // 3. Generate Tags
    const tags = new Set<string>();

    // Brightness tags
    if (avgL < 30) tags.add("dark");
    else if (avgL > 70) tags.add("light");

    // Saturation tags
    if (avgS > 80) tags.add("vibrant");
    else if (avgS > 60) tags.add("neon");
    else if (avgS < 20) tags.add("pastel");
    else if (avgS < 10) tags.add("muted");

    // Warm/Cold tags based on hue
    const warmCount = hslColors.filter(c => (c.h >= 0 && c.h < 60) || (c.h >= 300)).length;
    const coldCount = hslColors.filter(c => c.h >= 150 && c.h < 300).length;

    if (warmCount > coldCount) tags.add("warm");
    if (coldCount > warmCount) tags.add("cold");

    // 4. Generate Name
    // Get the most saturated color to drive the name
    const dominant = hslColors.reduce((prev, current) => (prev.s > current.s) ? prev : current);

    let colorName = "Color";
    const h = dominant.h;
    if (h >= 0 && h < 15) colorName = "Red";
    else if (h >= 15 && h < 45) colorName = "Orange";
    else if (h >= 45 && h < 70) colorName = "Yellow";
    else if (h >= 70 && h < 150) colorName = "Green";
    else if (h >= 150 && h < 190) colorName = "Teal";
    else if (h >= 190 && h < 250) colorName = "Blue";
    else if (h >= 250 && h < 290) colorName = "Purple";
    else if (h >= 290 && h < 330) colorName = "Pink";
    else colorName = "Red";

    // Adjectives
    const adjective = avgL < 30 ? "Midnight"
        : avgL > 80 ? "Soft"
            : avgS > 80 ? "Electric"
                : avgS < 20 ? "Dusty"
                    : "Classic";

    // Nouns
    const nouns = ["Harmony", "Vibe", "Mood", "Essence", "Flow", "Scape", "Aura", "Dream"];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];

    const name = `${adjective} ${colorName} ${noun}`;

    return { name, tags: Array.from(tags) };
}

function hexToHSL(H: string) {
    // Convert hex to RGB first
    let r = 0, g = 0, b = 0;
    if (H.length == 4) {
        r = parseInt("0x" + H[1] + H[1]);
        g = parseInt("0x" + H[2] + H[2]);
        b = parseInt("0x" + H[3] + H[3]);
    } else if (H.length == 7) {
        r = parseInt("0x" + H[1] + H[2]);
        g = parseInt("0x" + H[3] + H[4]);
        b = parseInt("0x" + H[5] + H[6]);
    }
    // Then to HSL
    r /= 255; g /= 255; b /= 255;
    let cmin = Math.min(r, g, b), cmax = Math.max(r, g, b), delta = cmax - cmin;
    let h = 0, s = 0, l = 0;

    if (delta == 0) h = 0;
    else if (cmax == r) h = ((g - b) / delta) % 6;
    else if (cmax == g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;

    h = Math.round(h * 60);
    if (h < 0) h += 360;

    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return { h, s, l };
}

fixGenericPalettes();
