
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { generateTags, getTagCombinationKey, TAG_DEFINITIONS, hexToRgb } from '../src/utils/tagGenerator';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase URL or Key in .env file');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

console.log('✅ Supabase client initialized');

if (!TAG_DEFINITIONS || Object.keys(TAG_DEFINITIONS).length === 0) {
    console.error('❌ TAG_DEFINITIONS is missing or empty!');
    process.exit(1);
}

if (typeof hexToRgb !== 'function') {
    console.error('❌ hexToRgb is not a function!');
    process.exit(1);
}

async function regenerateAllTags() {
    console.log('🔄 Starting Tag Regeneration...');

    // 1. Fetch all palettes
    const { data: palettes, error } = await supabase
        .from('palettes')
        .select('*');

    if (error || !palettes) {
        console.error('Error fetching palettes:', error);
        return;
    }

    console.log(`📊 Found ${palettes.length} palettes.`);

    const seenCombinations = new Set<string>();
    const updates = [];

    // Helper to generate a unique set of tags
    const getUniqueTags = (colors: string[], paletteId: string, retryCount = 0): string[] => {
        // Standard generation (uses top 3 matches)
        let tags = generateTags(colors);

        // Initial key
        let key = getTagCombinationKey(tags);

        // If collision, try to perturb the selection
        // We do this by getting top X matches and picking a different subset
        if (seenCombinations.has(key)) {
            // Advanced collision resolution
            // Get top 6 matches manually to pick different combos
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

            // Take top 6 candidates
            const candidates = tagScores.slice(0, 6).map(t => t.tag);

            // Try different combinations of 3 from these 6
            // Simple heuristic: Try swapping the 3rd tag with 4th, 5th, 6th...
            let foundUnique = false;

            // Try all combinations of 3 tags from the top 6 candidates
            // This is brute force but 6C3 is only 20 combinations, so it's instant.
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

            if (!foundUnique) {
                console.warn(`⚠️ Could not find unique tags for palette ${paletteId}. Using default with collision.`);
            }
        }

        seenCombinations.add(key);
        return tags;
    };

    // 2. Process Palettes
    let updatedCount = 0;

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
