import { createClient } from '@supabase/supabase-js';

// Supabase credentials
const supabaseUrl = 'https://etsqidrpebkrtubfufag.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0c3FpZHJwZWJrcnR1YmZ1ZmFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzMDM4NzEsImV4cCI6MjA4NTg3OTg3MX0.GexBeezXG05HxdeOKwJa1riBRRBY4bdpQFqRaieEBoU';

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Import all palette arrays
import {
    darkPalettes,
    lightPalettes,
    vintagePalettes,
    retroPalettes,
    neonPalettes,
    goldPalettes,
    coldPalettes,
    fallPalettes,
    winterPalettes,
    springPalettes,
    happyPalettes,
    naturePalettes,
    earthPalettes,
    spacePalettes,
    rainbowPalettes,
    gradientPalettes,
    sunsetPalettes,
    skyPalettes,
    seaPalettes,
    kidPalettes,
    skinPalettes,
    foodPalettes,
    summerPalettes,
    warmPalettes,
    nightPalettes,
    glowPalettes,
    coffeePalettes,
    weddingPalettes,
    christmasPalettes,
} from './src/data/palettes.js';

// Map palette arrays to their categories
const paletteCategories = [
    { palettes: darkPalettes, category: 'dark' },
    { palettes: lightPalettes, category: 'light' },
    { palettes: vintagePalettes, category: 'vintage' },
    { palettes: retroPalettes, category: 'retro' },
    { palettes: neonPalettes, category: 'neon' },
    { palettes: goldPalettes, category: 'gold' },
    { palettes: coldPalettes, category: 'cold' },
    { palettes: fallPalettes, category: 'fall' },
    { palettes: winterPalettes, category: 'winter' },
    { palettes: springPalettes, category: 'spring' },
    { palettes: happyPalettes, category: 'happy' },
    { palettes: naturePalettes, category: 'nature' },
    { palettes: earthPalettes, category: 'earth' },
    { palettes: spacePalettes, category: 'space' },
    { palettes: rainbowPalettes, category: 'rainbow' },
    { palettes: gradientPalettes, category: 'gradient' },
    { palettes: sunsetPalettes, category: 'sunset' },
    { palettes: skyPalettes, category: 'sky' },
    { palettes: seaPalettes, category: 'sea' },
    { palettes: kidPalettes, category: 'kid' },
    { palettes: skinPalettes, category: 'skin' },
    { palettes: foodPalettes, category: 'food' },
    { palettes: summerPalettes, category: 'summer' },
    { palettes: warmPalettes, category: 'warm' },
    { palettes: nightPalettes, category: 'night' },
    { palettes: glowPalettes, category: 'glow' },
    { palettes: coffeePalettes, category: 'coffee' },
    { palettes: weddingPalettes, category: 'wedding' },
    { palettes: christmasPalettes, category: 'christmas' },
];

async function updatePaletteCategories() {
    console.log('🎨 Updating palette categories and tags...\n');

    let totalUpdated = 0;
    let totalErrors = 0;

    for (const { palettes, category } of paletteCategories) {
        console.log(`\n📦 Processing ${category} palettes (${palettes.length} items)...`);

        for (const palette of palettes) {
            try {
                // Update palette with category and tags
                const { error } = await supabase
                    .from('palettes')
                    .update({
                        category: category,
                        tags: palette.tags || [],
                    })
                    .eq('name', palette.name);

                if (error) {
                    console.error(`  ❌ Error updating "${palette.name}":`, error.message);
                    totalErrors++;
                } else {
                    totalUpdated++;
                    if (totalUpdated % 50 === 0) {
                        console.log(`  ✅ Updated ${totalUpdated} palettes so far...`);
                    }
                }
            } catch (err: any) {
                console.error(`  ❌ Exception updating "${palette.name}":`, err.message || err);
                totalErrors++;
            }
        }

        console.log(`  ✅ Completed ${category} category`);
    }

    console.log('\n' + '='.repeat(50));
    console.log('📈 UPDATE COMPLETE');
    console.log('='.repeat(50));
    console.log(`✅ Successfully updated: ${totalUpdated} palettes`);
    console.log(`❌ Failed: ${totalErrors} palettes`);
    console.log('='.repeat(50) + '\n');

    if (totalUpdated > 0) {
        console.log('🎉 Palettes now have categories and tags!');
        console.log('🔥 You can now filter by category in your app!');
    }
}

// Run the update function
updatePaletteCategories()
    .then(() => {
        console.log('\n✨ Category update completed!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('\n💥 Fatal error:', error);
        process.exit(1);
    });
