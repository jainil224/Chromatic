
const { createClient } = require('@supabase/supabase-js');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

const supabaseUrl = 'https://etsqidrpebkrtubfufag.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0c3FpZHJwZWJrcnR1YmZ1ZmFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzMDM4NzEsImV4cCI6MjA4NTg3OTg3MX0.GexBeezXG05HxdeOKwJa1riBRRBY4bdpQFqRaieEBoU';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

console.log('✅ Supabase initialized');

// ==========================================
// INLINED TAG LOGIC (CommonJS)
// ==========================================

const TAG_DEFINITIONS = {
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

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
}

function generateTags(paletteColors) {
    const tagScores = [];
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
}

function getTagCombinationKey(tags) {
    return [...tags].sort().join('|');
}

// ==========================================
// MAIN MIGRATION
// ==========================================

async function run() {
    console.log('🔄 Starting Tag Regeneration (CommonJS)...');

    // Added explicit logging
    console.log('⚠️  FORCE REGENERATING TAGS FOR ALL PALETTES...');

    // We are selecting tags ONLY, so we don't need other fields, but we need colors to gen tags.
    const { data: palettes, error } = await supabase.from('palettes').select('id, name, colors');

    if (error) {
        console.error('Error fetching palettes:', error);
        return;
    }

    console.log(`📊 Found ${palettes.length} palettes.`);

    // clear seen combinations to ensure we are starting fresh for this run
    // but honestly, we should probably just re-generate everything based on the colors NOW.

    let updatedCount = 0;

    for (const palette of palettes) {
        let tags = generateTags(palette.colors);
        let key = getTagCombinationKey(tags);

        // Ensure uniqueness roughly
        // This block is removed as per the instruction to simplify the loop and force update.
        // The original instruction had a partial block here, but the intent is to remove the uniqueness logic.

        // FORCE UPDATE: We are overwriting the tags column completely.
        const { error: updateError } = await supabase
            .from('palettes')
            .update({ tags: tags })
            .eq('id', palette.id);

        if (updateError) {
            console.error(`❌ Failed to update ${palette.name}:`, updateError);
        } else {
            updatedCount++;
            if (updatedCount % 50 === 0) process.stdout.write(`\nProcessed ${updatedCount}...`);
        }
    }

    console.log('\n✅ Done!');
    console.log(`Updated ${updatedCount} / ${palettes.length} palettes.`);
}

run();
