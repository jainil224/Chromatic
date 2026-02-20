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
    boldPalettes,
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

async function seedPalettes() {
    console.log('🎨 Starting palette seeding...\n');

    // Combine all palette arrays
    const allPalettes = [
        ...darkPalettes,
        ...lightPalettes,
        ...boldPalettes,
        ...vintagePalettes,
        ...retroPalettes,
        ...neonPalettes,
        ...goldPalettes,
        ...coldPalettes,
        ...fallPalettes,
        ...winterPalettes,
        ...springPalettes,
        ...happyPalettes,
        ...naturePalettes,
        ...earthPalettes,
        ...spacePalettes,
        ...rainbowPalettes,
        ...gradientPalettes,
        ...sunsetPalettes,
        ...skyPalettes,
        ...seaPalettes,
        ...kidPalettes,
        ...skinPalettes,
        ...foodPalettes,
        ...summerPalettes,
        ...warmPalettes,
        ...nightPalettes,
        ...glowPalettes,
        ...coffeePalettes,
        ...weddingPalettes,
        ...christmasPalettes,
    ];

    console.log(`📊 Total palettes to seed: ${allPalettes.length}\n`);

    // Prepare data for insertion
    const palettesForDB = allPalettes.map(palette => ({
        name: palette.name,
        colors: palette.colors,
        likes: 0,
    }));

    // Insert in batches
    const BATCH_SIZE = 50;
    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < palettesForDB.length; i += BATCH_SIZE) {
        const batch = palettesForDB.slice(i, i + BATCH_SIZE);
        const batchNumber = Math.floor(i / BATCH_SIZE) + 1;
        const totalBatches = Math.ceil(palettesForDB.length / BATCH_SIZE);

        console.log(`📦 Processing batch ${batchNumber}/${totalBatches} (${batch.length} palettes)...`);

        try {
            const { data, error } = await supabase
                .from('palettes')
                .insert(batch)
                .select();

            if (error) {
                console.error(`❌ Error in batch ${batchNumber}:`, error.message);
                errorCount += batch.length;
            } else {
                console.log(`✅ Batch ${batchNumber} inserted successfully (${data?.length || 0} palettes)`);
                successCount += data?.length || 0;
            }
        } catch (err: any) {
            console.error(`❌ Exception in batch ${batchNumber}:`, err.message || err);
            errorCount += batch.length;
        }
    }

    console.log('\n' + '='.repeat(50));
    console.log('📈 SEEDING COMPLETE');
    console.log('='.repeat(50));
    console.log(`✅ Successfully seeded: ${successCount} palettes`);
    console.log(`❌ Failed: ${errorCount} palettes`);
    console.log(`📊 Total: ${allPalettes.length} palettes`);
    console.log('='.repeat(50) + '\n');

    if (successCount > 0) {
        console.log('🎉 Your hardcoded palettes now have unique UUIDs in Supabase!');
        console.log('🔥 They can now use the global like system!');
    }
}

// Run the seeding function
seedPalettes()
    .then(() => {
        console.log('\n✨ Seeding script completed!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('\n💥 Fatal error:', error);
        process.exit(1);
    });
