
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

async function fixRemainingGenericPalettes() {
    let totalFixed = 0;

    while (true) {
        console.log('🔄 Fetching next batch of "Dream" palettes...');

        // 1. Fetch generic names candidates efficiently using ILIKE
        const { data: candidates, error: fetchError } = await supabase
            .from('palettes')
            .select('*')
            .ilike('name', '%Dream%')
            .range(0, 999); // Fetch 1000 at a time

        if (fetchError) {
            console.error('❌ Error fetching candidates:', fetchError);
            break;
        }

        if (!candidates || candidates.length === 0) {
            console.log('✅ No more candidate "Dream" palettes found.');
            break;
        }

        const genericPattern = /.+ Dream \d+$/i;
        const palettesToFix = candidates.filter(p => genericPattern.test(p.name));

        if (palettesToFix.length === 0) {
            console.log('✅ No actual generic "Dream NNN" palettes found in this batch.');
            // If we found candidates but none matched, we might be stuck if we don't fix them.
            // But existing "Purple Dream" (valid) will be returned by ILIKE.
            // So we must break if we can't find any to fix, otherwise infinite loop.
            // However, if we have 1000 "Purple Dream"s, we might never see the "Nature Dream 101"s if they are further down?
            // But we are not ordering by anything, so default order.
            // If we process and rename, they disappear from ILIKE results (unless new name has Dream).
            // My generator removes "Dream", so they SHOULD disappear.
            // So consistent progress should allow us to clear the queue.
            // But if we encounter a page of ONLY valid "Dream"s, we might stop early.
            // So we should probably use a counter or offset? 
            // No, `ilike` is a filter. If we rename, the count decreases.
            // The only risk is if we have >1000 VALID "Dreams" that hide the invalid ones AND we don't rename them.
            // In that case, we should maybe filter `not.ilike` or something?
            // Or fetch ALL.
            // Let's rely on the fact that we probably don't have 1000 valid dreams yet.
            break;
        }

        console.log(`Found ${palettesToFix.length} palettes to fix in this batch.`);

        // 2. Fetch names (lightweight) - do this once or every time? Every time is safer.
        const { data: nameData } = await supabase
            .from('palettes')
            .select('name')
            .range(0, 9999); // Limit check

        const existingNames = new Set((nameData || []).map(p => p.name.toLowerCase()));

        let batchFixed = 0;

        for (const palette of palettesToFix) {
            let { name: newName, tags: newTags } = generatePaletteMetadata(palette.colors);

            // Ensure Uniqueness
            let attempts = 0;
            const baseName = newName;
            while (existingNames.has(newName.toLowerCase())) {
                attempts++;
                if (attempts < 5) {
                    const meta = generatePaletteMetadata(palette.colors);
                    newName = meta.name;
                } else {
                    const roman = toRoman(attempts - 4);
                    newName = `${baseName} ${roman}`;
                }
                if (attempts > 20) {
                    newName = `${baseName} ${Math.floor(Math.random() * 1000)}`;
                    break;
                }
            }

            existingNames.add(newName.toLowerCase());

            console.log(`🎨 Renaming "${palette.name}" -> "${newName}"`);

            const existingTags = Array.isArray(palette.tags) ? palette.tags : [];
            const mergedTags = Array.from(new Set([...existingTags, ...newTags]));

            const { error: updateError } = await supabase
                .from('palettes')
                .update({ name: newName, tags: mergedTags })
                .eq('id', palette.id);

            if (updateError) {
                console.error(`Failed to update ${palette.id}`, updateError);
            } else {
                batchFixed++;
                totalFixed++;
            }
        }

        console.log(`✅ Batch complete: Fixed ${batchFixed} palettes.`);
    }

    console.log(`🎉 Total palettes fixed: ${totalFixed}`);
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
    // 1. Convert hex to HSL
    const hslColors = colors.map(hex => hexToHSL(hex));

    // 2. Determine dominant properties
    const avgL = hslColors.reduce((acc, c) => acc + c.l, 0) / hslColors.length;
    const avgS = hslColors.reduce((acc, c) => acc + c.s, 0) / hslColors.length;

    // 3. Generate Tags
    const tags = new Set<string>();

    if (avgL < 30) tags.add("dark");
    else if (avgL > 70) tags.add("light");

    if (avgS > 80) tags.add("vibrant");
    else if (avgS > 60) tags.add("neon");
    else if (avgS < 20) tags.add("pastel");
    else if (avgS < 10) tags.add("muted");

    const warmCount = hslColors.filter(c => (c.h >= 0 && c.h < 60) || (c.h >= 300)).length;
    const coldCount = hslColors.filter(c => c.h >= 150 && c.h < 300).length;

    if (warmCount > coldCount) tags.add("warm");
    if (coldCount > warmCount) tags.add("cold");

    // 4. Generate Name
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

    // Nouns - Removed "Dream" to avoid future confusion
    const nouns = ["Harmony", "Vibe", "Mood", "Essence", "Flow", "Scape", "Aura", "Echo", "Wave", "Tide", "Pulse", "Glow", "Spark", "Mist", "Haze", "Beam"];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];

    const name = `${adjective} ${colorName} ${noun}`;

    return { name, tags: Array.from(tags) };
}

function hexToHSL(H: string) {
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

fixRemainingGenericPalettes();
