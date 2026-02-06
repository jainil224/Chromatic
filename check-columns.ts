import { createClient } from '@supabase/supabase-js';

// Supabase credentials
const supabaseUrl = 'https://etsqidrpebkrtubfufag.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0c3FpZHJwZWJrcnR1YmZ1ZmFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzMDM4NzEsImV4cCI6MjA4NTg3OTg3MX0.GexBeezXG05HxdeOKwJa1riBRRBY4bdpQFqRaieEBoU';

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function addCategoryColumns() {
    console.log('🔧 Adding category and tags columns to palettes table...\n');

    try {
        // Note: ALTER TABLE requires admin privileges
        // Since we're using the anon key, we'll check if columns exist first

        console.log('⚠️  Note: Adding columns requires running SQL in Supabase Dashboard');
        console.log('📋 Please run the following SQL in Supabase SQL Editor:\n');
        console.log('---------------------------------------------------');
        console.log('ALTER TABLE palettes ADD COLUMN IF NOT EXISTS category TEXT;');
        console.log('ALTER TABLE palettes ADD COLUMN IF NOT EXISTS tags JSONB DEFAULT \'[]\'::jsonb;');
        console.log('CREATE INDEX IF NOT EXISTS idx_palettes_category ON palettes(category);');
        console.log('CREATE INDEX IF NOT EXISTS idx_palettes_tags ON palettes USING GIN (tags);');
        console.log('---------------------------------------------------\n');

        // Check if we can query the table to verify structure
        const { data, error } = await supabase
            .from('palettes')
            .select('*')
            .limit(1);

        if (error) {
            console.error('❌ Error checking table:', error.message);
            return false;
        }

        if (data && data.length > 0) {
            const firstPalette = data[0];
            console.log('✅ Current palette structure:', Object.keys(firstPalette));

            if ('category' in firstPalette && 'tags' in firstPalette) {
                console.log('✅ Columns already exist! Ready to update categories.');
                return true;
            } else {
                console.log('⚠️  Columns not found. Please run the SQL above first.');
                return false;
            }
        }

        return false;
    } catch (err) {
        console.error('❌ Exception:', err.message || err);
        return false;
    }
}

addCategoryColumns()
    .then((success) => {
        if (success) {
            console.log('\n✨ Ready to run update-categories.ts!');
        } else {
            console.log('\n⚠️  Please add columns in Supabase Dashboard first.');
        }
        process.exit(0);
    })
    .catch((error) => {
        console.error('\n💥 Fatal error:', error);
        process.exit(1);
    });
