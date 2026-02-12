
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabase = createClient(process.env.VITE_SUPABASE_URL!, process.env.VITE_SUPABASE_ANON_KEY!);

async function list() {
    const { data, error } = await supabase.from('palettes').select('name').ilike('name', '%Dream%');
    if (error) console.error(error);
    else console.log(JSON.stringify(data.map(p => p.name), null, 2));
}

list();
