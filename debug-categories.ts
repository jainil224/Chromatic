import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://etsqidrpebkrtubfufag.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0c3FpZHJwZWJrcnR1YmZ1ZmFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzMDM4NzEsImV4cCI6MjA4NTg3OTg3MX0.GexBeezXG05HxdeOKwJa1riBRRBY4bdpQFqRaieEBoU';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkCategories() {
    console.log('🔍 Checking palette categories in Supabase...\n');

    // Get sample palettes
    const { data, error } = await supabase
        .from('palettes')
        .select('id, name, category, tags')
        .limit(20);

    if (error) {
        console.error('❌ Error:', error.message);
        return;
    }

    console.log(`📊 Found ${data.length} palettes\n`);

    // Group by category
    const byCategory = {};
    data.forEach(p => {
        const cat = p.category || 'null';
        if (!byCategory[cat]) byCategory[cat] = [];
        byCategory[cat].push(p.name);
    });

    console.log('📋 Categories found:');
    Object.keys(byCategory).forEach(cat => {
        console.log(`  ${cat}: ${byCategory[cat].length} palettes`);
        console.log(`    Examples: ${byCategory[cat].slice(0, 3).join(', ')}`);
    });

    console.log('\n📝 Sample palettes:');
    data.slice(0, 5).forEach(p => {
        console.log(`  - ${p.name}`);
        console.log(`    Category: ${p.category || 'null'}`);
        console.log(`    Tags: ${JSON.stringify(p.tags)}`);
    });
}

checkCategories()
    .then(() => process.exit(0))
    .catch(err => {
        console.error('💥 Fatal error:', err);
        process.exit(1);
    });
