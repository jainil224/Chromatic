/**
 * SEED HARDCODED PALETTES TO SUPABASE
 * 
 * Simple Node.js script to seed palettes
 * Run: node seed-palettes-simple.js
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables from .env.local
const envPath = path.join(__dirname, '.env.local');
if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split('=');
        if (key && valueParts.length) {
            process.env[key.trim()] = valueParts.join('=').trim();
        }
    });
}

// Get Supabase credentials
const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('❌ ERROR: Supabase credentials not found in .env.local');
    process.exit(1);
}

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Sample palettes to test (you can add more later)
const testPalettes = [
    { name: "Midnight Ember", colors: ["#1a1a2e", "#16213e", "#0f3460", "#e94560", "#ff6b6b"] },
    { name: "Forest Depths", colors: ["#0d1b2a", "#1b263b", "#415a77", "#778da9", "#e0e1dd"] },
    { name: "Neon Noir", colors: ["#10002b", "#240046", "#3c096c", "#5a189a", "#ff00ff"] },
];

async function seedPalettes() {
    console.log('🎨 Starting palette seeding (test mode)...\n');
    console.log(`📊 Total palettes to seed: ${testPalettes.length}\n`);

    const palettesForDB = testPalettes.map(palette => ({
        name: palette.name,
        colors: palette.colors,
        likes: 0,
    }));

    try {
        console.log('📦 Inserting palettes...');

        const { data, error } = await supabase
            .from('palettes')
            .insert(palettesForDB)
            .select();

        if (error) {
            console.error('❌ Error:', error.message);
            process.exit(1);
        }

        console.log(`✅ Successfully inserted ${data.length} palettes!`);
        console.log('\nInserted palettes:');
        data.forEach((p, i) => {
            console.log(`  ${i + 1}. ${p.name} (ID: ${p.id.substring(0, 8)}...)`);
        });

        console.log('\n🎉 Seeding completed successfully!');
        console.log('🔥 Palettes now have unique UUIDs and can use the global like system!');

    } catch (err) {
        console.error('❌ Exception:', err.message);
        process.exit(1);
    }
}

seedPalettes()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error('💥 Fatal error:', error);
        process.exit(1);
    });
