import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputFile = path.join(__dirname, '../src/data/palettes.ts');
const outputFile = path.join(__dirname, '../seed_old_palettes.sql');

const content = fs.readFileSync(inputFile, 'utf8');

// Regex to find all palette arrays
// Matches: export const [name]Palettes: Palette[] = [ ... ];
const arrayRegex = /export const (\w+)Palettes: Palette\[\] = \[([\s\S]*?)(?:^\];)/gm;

let sql = `-- ============================================\n`;
sql += `-- SEED OLD PALETTES (RESTORE)\n`;
sql += `-- Generated from src/data/palettes.ts\n`;
sql += `-- ============================================\n\n`;

// Function to escape single quotes for SQL
const escapeSql = (str) => str.replace(/'/g, "''");

let match;
while ((match = arrayRegex.exec(content)) !== null) {
    const varName = match[1]; // e.g., 'dark', 'light'
    const arrayContent = match[2];

    // Determine category/section from varName
    const section = varName.toLowerCase();

    sql += `-- Section: ${section}\n`;
    sql += `DELETE FROM palettes WHERE section = '${section}';\n`;
    sql += `INSERT INTO palettes (name, colors, tags, section, created_at)\nVALUES\n`;

    const lines = arrayContent.split('\n');
    const values = [];

    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('//')) continue;

        // Regex to extract object properties
        const nameMatch = trimmed.match(/name:\s*"([^"]+)"/);
        const colorsMatch = trimmed.match(/colors:\s*(\[[^\]]+\])/);
        const tagsMatch = trimmed.match(/tags:\s*(\[[^\]]+\])/);

        if (nameMatch && colorsMatch) {
            const name = nameMatch[1];
            const colors = colorsMatch[1];
            const tags = tagsMatch ? tagsMatch[1] : '[]';

            let tagsSqlLiteral = "'[]'";
            try {
                const tagsArray = JSON.parse(tags);
                if (Array.isArray(tagsArray)) {
                    // Check if tagsArray has content or not. Even empty array is valid JSON [].
                    // JSON.stringify(["a", "b"]) -> '["a","b"]'
                    const jsonString = JSON.stringify(tagsArray);
                    // Escape single quotes for SQL: ' becomes ''
                    tagsSqlLiteral = `'${jsonString.replace(/'/g, "''")}'`;
                }
            } catch (e) {
                console.warn(`Failed to parse tags for ${name}: ${tags}`);
            }

            values.push(`  ('${escapeSql(name)}', '${colors}', ${tagsSqlLiteral}, '${section}', NOW())`);
        }
    }

    if (values.length > 0) {
        sql += values.join(',\n');
        sql += `\nON CONFLICT DO NOTHING;\n\n`;
    }
}

fs.writeFileSync(outputFile, sql);
console.log(`Generated SQL at ${outputFile}`);
