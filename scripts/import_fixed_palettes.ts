
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
const targetFile = path.resolve(process.cwd(), 'src/data/palettes.ts');

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('❌ Missing Supabase credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function importFixedPalettes() {
    console.log('🔍 Searching for fixed palettes to import...');

    // Regex pattern for the names we generated
    // Includes nouns from both fix scripts
    const pattern = '^(Midnight|Soft|Electric|Dusty|Classic) (Red|Orange|Yellow|Green|Teal|Blue|Purple|Pink|Color) (Harmony|Vibe|Mood|Essence|Flow|Scape|Aura|Dream|Echo|Wave|Tide|Pulse|Glow|Spark|Mist|Haze|Beam)( [IVX]+)?$';

    // Fetch all palettes to filter in JS
    const { data: palettes, error } = await supabase
        .from('palettes')
        .select('*')
        .range(0, 9999);

    if (error) {
        console.error('❌ Error fetching palettes:', error);
        return;
    }

    // Filter in JS
    const fixedPalettes = palettes.filter(p => new RegExp(pattern).test(p.name));

    if (fixedPalettes.length === 0) {
        console.log('✅ No fixed palettes found to import.');
        return;
    }

    console.log(`Found ${fixedPalettes.length} fixed palettes. Updating ${targetFile}...`);

    let fileContent = fs.readFileSync(targetFile, 'utf-8');

    // Remove existing restored section if present
    const marker = '// --- RESTORED GENERIC PALETTES ---';
    const markerIndex = fileContent.indexOf(marker);

    if (markerIndex !== -1) {
        console.log('Duplicate section found, removing old one...');
        fileContent = fileContent.substring(0, markerIndex).trim();
    }

    let typeScriptContent = `\n\n${marker}\n`;
    typeScriptContent += `export const restoredPalettes: Palette[] = [\n`;

    // Sort by name for consistency
    fixedPalettes.sort((a, b) => a.name.localeCompare(b.name));

    for (const p of fixedPalettes) {
        const tagsStr = p.tags ? JSON.stringify(p.tags) : '[]';
        // Ensure colors are properly formatted as string array
        let colors = p.colors;
        if (typeof colors === 'string') {
            try {
                colors = JSON.parse(colors);
            } catch (e) {
                // keep as is
            }
        }
        const colorsStr = JSON.stringify(colors).replace(/"/g, "'");

        typeScriptContent += `  { id: "${p.id}", name: "${p.name}", colors: ${colorsStr}, tags: ${tagsStr} },\n`;
    }

    typeScriptContent += `];\n`;

    // Append to file (which is now clean of the old section)
    fs.writeFileSync(targetFile, fileContent + typeScriptContent);

    console.log(`✅ Successfully imported ${fixedPalettes.length} palettes to src/data/palettes.ts`);
}

importFixedPalettes();
