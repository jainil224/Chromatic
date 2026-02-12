
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('❌ Missing Supabase credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkDreamPalettes() {
    console.log('🔍 Searching for generic "Dream" palettes...');

    const { data: palettes, error } = await supabase
        .from('palettes')
        .select('id, name, section, category')
        .ilike('name', '%Dream%')
        .order('name');

    if (error) {
        console.error('❌ Error fetching palettes:', error);
        return;
    }

    // Filter for generic pattern: "Category Dream NNN"
    // Regex: Start with word(s), then " Dream ", then digits
    const genericRegex = /^[A-Za-z ]+ Dream \d+$/;

    const genericPalettes = palettes.filter(p => genericRegex.test(p.name));

    console.log(`COUNTS: Total Dream: ${palettes.length}, Generic: ${genericPalettes.length}`);
    if (genericPalettes.length > 0) {
        console.log(`Samples: ${genericPalettes.slice(0, 3).map(p => p.name).join(', ')}`);
    }

    if (genericPalettes.length > 0) {
        // Group by prefix
        const counts: Record<string, number> = {};
        for (const p of genericPalettes) {
            const prefix = p.name.split(' Dream')[0];
            counts[prefix] = (counts[prefix] || 0) + 1;
        }
        console.log('\nCounts by prefix:');
        console.table(counts);
    }
}

checkDreamPalettes();
