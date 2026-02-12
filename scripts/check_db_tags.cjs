
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://etsqidrpebkrtubfufag.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0c3FpZHJwZWJrcnR1YmZ1ZmFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzMDM4NzEsImV4cCI6MjA4NTg3OTg3MX0.GexBeezXG05HxdeOKwJa1riBRRBY4bdpQFqRaieEBoU';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkTags() {
    console.log('🔍 Checking Total Palette Count...');
    const { count, error } = await supabase
        .from('palettes')
        .select('*', { count: 'exact', head: true });

    if (error) {
        console.error('Error:', error);
        return;
    }

    console.log(`📊 Total Palettes in DB: ${count}`);

    // Check specific new palette tags
    const { data } = await supabase.from('palettes').select('id, name, tags').in('name', ['Marshmallow Dream', 'Synthwave Sun', 'Midnight Blue']);
    console.log('New Palette Tags:', JSON.stringify(data, null, 2));
}

checkTags();
