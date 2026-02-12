
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase URL or Key in .env file');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// ==========================================
// INLINED TAG GENERATOR LOGIC
// ==========================================

const TAG_DEFINITIONS: Record<string, string> = {
    'ruby': '#E0115F', 'crimson': '#DC143C', 'scarlet': '#FF2400', 'cherry': '#DE3163',
    'rose': '#FF007F', 'blush': '#DE5D83', 'coral': '#FF7F50', 'salmon': '#FA8072',
    'peach': '#FFCBA4', 'flamingo': '#FC8EAC', 'bubblegum': '#FFC1CC', 'magenta': '#FF00FF',
    'berry': '#990F4B', 'sunset': '#FD5E53', 'tangerine': '#F28500', 'apricot': '#FBCEB1',
    'amber': '#FFBF00', 'gold': '#FFD700', 'lemon': '#FFF700', 'cream': '#FFFDD0',
    'beige': '#F5F5DC', 'sand': '#C2B280', 'sepia': '#704214', 'chocolate': '#7B3F00',
    'coffee': '#6F4E37', 'cocoa': '#D2691E', 'bronze': '#CD7F32', 'terracotta': '#E2725B',
    'emerald': '#50C878', 'jade': '#00A86B', 'sage': '#BCB88A', 'olive': '#808000',
    'lime': '#BFFF00', 'mint': '#3EB489', 'forest': '#228B22', 'pine': '#01796F',
    'seafoam': '#9FE2BF', 'teal': '#008080', 'turquoise': '#40E0D0', 'aqua': '#00FFFF',
    'ocean': '#0077BE', 'sky': '#87CEEB', 'azure': '#007FFF', 'cobalt': '#0047AB',
    'indigo': '#4B0082', 'navy': '#000080', 'midnight': '#191970', 'denim': '#1560BD',
    'ice': '#B9F2FF', 'frost': '#E1F5FE', 'violet': '#8F00FF', 'lavender': '#E6E6FA',
    'lilac': '#C8A2C8', 'plum': '#8E4585', 'grape': '#6F2DA8', 'orchid': '#DA70D6',
    'mauve': '#E0B0FF', 'charcoal': '#36454F', 'slate': '#708090', 'graphite': '#2D2D2D',
    'smoke': '#848884', 'silver': '#C0C0C0', 'platinum': '#E5E4E2', 'pearl': '#EAE0C8',
    'ivory': '#FFFFF0', 'snow': '#FFFAFA',
};

const hexToRgb = (hex: string): { r: number, g: number, b: number } => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
}

const generateTags = (paletteColors: string[]): string[] => {
    const tagScores: { tag: string, score: number }[] = [];
    Object.entries(TAG_DEFINITIONS).forEach(([tagName, tagHex]) => {
        let minDistance = Infinity;
        paletteColors.forEach(paletteColor => {
            const rgb1 = hexToRgb(paletteColor);
            const rgb2 = hexToRgb(tagHex);
            const distance = Math.sqrt(Math.pow(rgb1.r - rgb2.r, 2) + Math.pow(rgb1.g - rgb2.g, 2) + Math.pow(rgb1.b - rgb2.b, 2));
            if (distance < minDistance) minDistance = distance;
        });
        tagScores.push({ tag: tagName, score: 1000 - minDistance });
    });
    tagScores.sort((a, b) => b.score - a.score);
    return tagScores.slice(0, 3).map(t => t.tag).sort();
};

const getTagCombinationKey = (tags: string[]): string => {
    return [...tags].sort().join('|');
};

// ==========================================
// MAIN REGENERATION LOGIC
// ==========================================

async function regenerateAllTags() {
    console.log('🔄 Starting Tag Regeneration (Standalone)...');

    const { data: palettes, error } = await supabase.from('palettes').select('*');

    if (error || !palettes) {
        console.error('Error fetching palettes:', error);
        return;
    }

    console.log(`📊 Found ${palettes.length} palettes.`);

    const seenCombinations = new Set<string>();
    let updatedCount = 0;

    const getUniqueTags = (colors: string[], paletteId: string): string[] => {
        let tags = generateTags(colors);
        let key = getTagCombinationKey(tags);

        if (seenCombinations.has(key)) {
            // Advanced collision resolution logic
            const tagScores: { tag: string, score: number }[] = [];
            Object.entries(TAG_DEFINITIONS).forEach(([tagName, tagHex]) => {
                let minDistance = Infinity;
                colors.forEach(paletteColor => {
                    const rgb1 = hexToRgb(paletteColor);
                    const rgb2 = hexToRgb(tagHex);
                    const distance = Math.sqrt(Math.pow(rgb1.r - rgb2.r, 2) + Math.pow(rgb1.g - rgb2.g, 2) + Math.pow(rgb1.b - rgb2.b, 2));
                    if (distance < minDistance) minDistance = distance;
                });
                tagScores.push({ tag: tagName, score: 1000 - minDistance });
            });
            tagScores.sort((a, b) => b.score - a.score);

            const candidates = tagScores.slice(0, 6).map(t => t.tag);
            let foundUnique = false;

            for (let i = 0; i < candidates.length; i++) {
                for (let j = i + 1; j < candidates.length; j++) {
                    for (let k = j + 1; k < candidates.length; k++) {
                        const trialTags = [candidates[i], candidates[j], candidates[k]].sort();
                        const trialKey = getTagCombinationKey(trialTags);
                        if (!seenCombinations.has(trialKey)) {
                            tags = trialTags;
                            key = trialKey;
                            foundUnique = true;
                            break;
                        }
                    }
                    if (foundUnique) break;
                }
                if (foundUnique) break;
            }
        }
        seenCombinations.add(key);
        return tags;
    };

    for (const palette of palettes) {
        const newTags = getUniqueTags(palette.colors, palette.id);
        const { error: updateError } = await supabase
            .from('palettes')
            .update({ tags: newTags })
            .eq('id', palette.id);

        if (updateError) {
            console.error(`❌ Failed to update ${palette.name}:`, updateError);
        } else {
            process.stdout.write('.');
            updatedCount++;
        }
    }

    console.log('\n\n✅ Regeneration Complete!');
    console.log(`Updated ${updatedCount} / ${palettes.length} palettes.`);
}

regenerateAllTags();
