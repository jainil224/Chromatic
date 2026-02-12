
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://etsqidrpebkrtubfufag.supabase.co';
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0c3FpZHJwZWJrcnR1YmZ1ZmFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzMDM4NzEsImV4cCI6MjA4NTg3OTg3MX0.GexBeezXG05HxdeOKwJa1riBRRBY4bdpQFqRaieEBoU';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// Tag generator helper (simplified version of what we have)
const generateTags = (colors: string[], category: string): string[] => {
    // Basic tags based on category
    const tags = [category.toLowerCase()];
    return tags;
};

const CATEGORIES = {
    Pastel: [
        { name: "Marshmallow Dream", colors: ["#FFD6E0", "#FFEFD6", "#E0F5D6", "#D6E4FF", "#EBD6FF"] },
        { name: "Cotton Candy Sky", colors: ["#FFC4D6", "#FFD6E7", "#FFF0F5", "#E6E6FA", "#B0E0E6"] },
        { name: "Baby Blues", colors: ["#E0F7FA", "#B2EBF2", "#80DEEA", "#4DD0E1", "#26C6DA"] },
        { name: "Soft Lilac", colors: ["#F3E5F5", "#E1BEE7", "#CE93D8", "#BA68C8", "#AB47BC"] },
        { name: "Peachy Keen", colors: ["#FFF3E0", "#FFE0B2", "#FFCC80", "#FFB74D", "#FFA726"] },
        { name: "Minty Fresh", colors: ["#E0F2F1", "#B2DFDB", "#80CBC4", "#4DB6AC", "#26A69A"] },
        { name: "Lemon Chiffon", colors: ["#FFFDE7", "#FFF9C4", "#FFF59D", "#FFF176", "#FFEE58"] },
        { name: "Rose Water", colors: ["#FFEBEE", "#FFCDD2", "#EF9A9A", "#E57373", "#EF5350"] },
        { name: "Lavender Haze", colors: ["#EDE7F6", "#D1C4E9", "#B39DDB", "#9575CD", "#7E57C2"] },
        { name: "Pistachio Gelato", colors: ["#F1F8E9", "#DCEDC8", "#C5E1A5", "#AED581", "#9CCC65"] },
        { name: "Vanilla Cream", colors: ["#FFF8E1", "#FFECB3", "#FFE082", "#FFD54F", "#FFCA28"] },
        { name: "Bubblegum Pop", colors: ["#FCE4EC", "#F8BBD0", "#F48FB1", "#F06292", "#EC407A"] },
        { name: "Serenity Now", colors: ["#E3F2FD", "#BBDEFB", "#90CAF9", "#64B5F6", "#42A5F5"] },
        { name: "Muted Clay", colors: ["#D7CCC8", "#BCAAA4", "#A1887F", "#8D6E63", "#795548"] },
        { name: "Dusty Miller", colors: ["#ECEFF1", "#CFD8DC", "#B0BEC5", "#90A4AE", "#78909C"] },
    ],
    Vintage: [
        { name: "Old Photograph", colors: ["#F4E4BC", "#E8D595", "#CBB677", "#8F7E4F", "#4A3F23"] },
        { name: "Victorian Rose", colors: ["#C79292", "#B37171", "#9F5050", "#763131", "#4D1A1A"] },
        { name: "Antique Gold", colors: ["#D4AF37", "#C5A028", "#B69121", "#A7821B", "#907015"] },
        { name: "Faded Denim", colors: ["#7F9EB2", "#608298", "#45667D", "#2E4B5F", "#1A3040"] },
        { name: "Sepia Tone", colors: ["#704214", "#8A5A2A", "#A37240", "#BD8A57", "#D6A26E"] },
        { name: "Retro Green", colors: ["#8FBC8F", "#78AB78", "#619A61", "#4A894A", "#337833"] },
        { name: "Dusty Pink", colors: ["#D8A8A8", "#C48C8C", "#B07070", "#9C5454", "#883838"] },
        { name: "Mustard Yellow", colors: ["#FFDB58", "#EBC33D", "#D7AB22", "#C39307", "#AF7B00"] },
        { name: "Teal Recall", colors: ["#008080", "#007373", "#006666", "#005959", "#004D4D"] },
        { name: "Brown Derby", colors: ["#634934", "#563D2B", "#493122", "#3C2519", "#2F1910"] },
        { name: "Cream Soda", colors: ["#FFFDD0", "#F5F3C2", "#EBE9B4", "#E1DFA6", "#D7D598"] },
        { name: "Rust Bucket", colors: ["#B7410E", "#A3380B", "#8F3008", "#7B2705", "#671F02"] },
        { name: "Olive Drab", colors: ["#6B8E23", "#5C7A1D", "#4D6617", "#3E5211", "#2F3E0B"] },
        { name: "Slate Blue", colors: ["#6A5ACD", "#5D4EB4", "#50429B", "#433682", "#362A69"] },
        { name: "Grandma's Couch", colors: ["#CC9966", "#BF8B59", "#B27D4C", "#A56F3F", "#986132"] }
    ],
    Retro: [
        { name: "Synthwave Sun", colors: ["#FFD319", "#FF901F", "#FF2975", "#F222FF", "#8C1EFF"] },
        { name: "Miami Vice", colors: ["#00FFFF", "#00CED1", "#FF69B4", "#FF1493", "#9400D3"] },
        { name: "Arcade Floor", colors: ["#1A1A2E", "#16213E", "#0F3460", "#E94560", "#FF2E63"] },
        { name: "VHS Glitch", colors: ["#2B2B2B", "#4A4A4A", "#FF0055", "#00FFDD", "#FFFF00"] },
        { name: "80s Workout", colors: ["#FF00CC", "#3333FF", "#00FF00", "#FFFF00", "#FF6600"] },
        { name: "Neon Nights", colors: ["#0C0C0C", "#1F1F1F", "#E60073", "#00E676", "#2979FF"] },
        { name: "Cyberpunk City", colors: ["#F7FF00", "#DB00FF", "#00F0FF", "#000000", "#FFFFFF"] },
        { name: "Outrun Grid", colors: ["#240046", "#3C096C", "#5A189A", "#7B2CBF", "#9D4EDD"] },
        { name: "Cassette Tape", colors: ["#FFA500", "#FF8C00", "#FF7F50", "#FF6347", "#FF4500"] },
        { name: "Disco Ball", colors: ["#E0E0E0", "#C0C0C0", "#A0A0A0", "#808080", "#606060"] },
        { name: "Pixel Art", colors: ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF"] },
        { name: "Console Grey", colors: ["#D3D3D3", "#C0C0C0", "#A9A9A9", "#808080", "#696969"] },
        { name: "Joy Stick Red", colors: ["#D50000", "#C62828", "#B71C1C", "#FF1744", "#D50000"] },
        { name: "Pacman Yellow", colors: ["#FFFF00", "#FFEA00", "#FFD600", "#FFC400", "#FFAB00"] },
        { name: "Space Invader", colors: ["#00FF00", "#32CD32", "#00C853", "#00E676", "#69F0AE"] }
    ],
    Neon: [
        { name: "Electric Blue", colors: ["#00FFFF", "#00BFFF", "#1E90FF", "#0000FF", "#00008B"] },
        { name: "Hot Pink Power", colors: ["#FF69B4", "#FF1493", "#C71585", "#DB7093", "#FFC0CB"] },
        { name: "Lime Wire", colors: ["#00FF00", "#32CD32", "#7FFF00", "#7CFC00", "#ADFF2F"] },
        { name: "Bright Orange", colors: ["#FFA500", "#FF8C00", "#FF7F50", "#FF6347", "#FF4500"] },
        { name: "Laser Lemon", colors: ["#FFFF00", "#FFFFE0", "#FFFACD", "#FAFAD2", "#FFEFD5"] },
        { name: "Cyber Grape", colors: ["#8A2BE2", "#9400D3", "#9932CC", "#8B008B", "#800080"] },
        { name: "Toxic Green", colors: ["#39FF14", "#00FF7F", "#00FA9A", "#7CFC00", "#7FFF00"] },
        { name: "Radioactive", colors: ["#CCFF00", "#DFFF00", "#E6E6FA", "#F0F8FF", "#F5F5F5"] },
        { name: "Ultra Violet", colors: ["#6B2CF5", "#5D26D6", "#4F1FB7", "#411898", "#331179"] },
        { name: "Fluorescent Red", colors: ["#FF355E", "#FF00CC", "#FF0033", "#FF0066", "#FF0099"] },
        { name: "Highlighter Yellow", colors: ["#FDFF00", "#F5F5DC", "#FFFFF0", "#F0FFF0", "#F0FFFF"] },
        { name: "Cyan Pop", colors: ["#00FFFF", "#E0FFFF", "#AFEEEE", "#7FFFD4", "#40E0D0"] },
        { name: "Magenta Madness", colors: ["#FF00FF", "#EE82EE", "#DA70D6", "#D8BFD8", "#DDA0DD"] },
        { name: "Vivid Tangerine", colors: ["#FF9966", "#FF8855", "#FF7744", "#FF6633", "#FF5522"] },
        { name: "Alien Green", colors: ["#66FF00", "#55DD00", "#44BB00", "#339900", "#227700"] }
    ],
    Spring: [
        { name: "Cherry Blossom", colors: ["#FFB7C5", "#FFC5D0", "#FFD3DB", "#FFE1E6", "#FFEFF1"] },
        { name: "Fresh Grass", colors: ["#56B870", "#6AC282", "#7ECC94", "#92D6A6", "#A6E0B8"] },
        { name: "Tulip Garden", colors: ["#FF4E50", "#FC913A", "#F9D423", "#EDE574", "#E1F5C4"] },
        { name: "April Showers", colors: ["#A4B0F5", "#8CA0D7", "#7490B9", "#5C809B", "#44707D"] },
        { name: "Sprout Green", colors: ["#BEF08E", "#A8D97B", "#92C268", "#7CAB55", "#669442"] },
        { name: "Morning Dew", colors: ["#D4E6F1", "#A9CCE3", "#7FB3D5", "#5499C7", "#2980B9"] },
        { name: "Daffodil Delight", colors: ["#FFFFE0", "#FFFACD", "#FAFAD2", "#FFEFD5", "#FFE4B5"] },
        { name: "Lilac Bush", colors: ["#DCD0FF", "#C8A2C8", "#B57EDC", "#A25AC0", "#8F36A4"] },
        { name: "Robin's Egg", colors: ["#00CCCC", "#1FD6D6", "#3EE0E0", "#5DEAEA", "#7CF4F4"] },
        { name: "Butterfly Wing", colors: ["#FFD700", "#FFA500", "#FF8C00", "#FF7F50", "#FF6347"] },
        { name: "Spring Sky", colors: ["#87CEEB", "#00BFFF", "#1E90FF", "#4169E1", "#0000FF"] },
        { name: "Pink Petal", colors: ["#FFC0CB", "#FFB6C1", "#FF69B4", "#FF1493", "#C71585"] },
        { name: "Meadow Green", colors: ["#90EE90", "#98FB98", "#8FBC8F", "#3CB371", "#2E8B57"] },
        { name: "Easter Egg", colors: ["#BA55D3", "#9370DB", "#8A2BE2", "#9400D3", "#9932CC"] },
        { name: "Rain Boot Yellow", colors: ["#FFFF00", "#FFD700", "#FFC125", "#FFB90F", "#EEDC82"] }
    ],
    Fall: [
        { name: "Pumpkin Spice", colors: ["#D2691E", "#CD853F", "#8B4513", "#A0522D", "#D2691E"] },
        { name: "Autumn Leaves", colors: ["#FF4500", "#FF6347", "#FF7F50", "#CD5C5C", "#8B0000"] },
        { name: "Harvest Moon", colors: ["#F4A460", "#DAA520", "#B8860B", "#CD853F", "#D2691E"] },
        { name: "Cozy Sweater", colors: ["#F5F5DC", "#F0EAD6", "#E3DAC9", "#D8C8B8", "#CDC6C6"] },
        { name: "Cinnamon Stick", colors: ["#D2691E", "#8B4513", "#A0522D", "#CD853F", "#F4A460"] },
        { name: "Maple Syrup", colors: ["#C98858", "#B57343", "#A15E2E", "#8D4919", "#793404"] },
        { name: "Apple Cider", colors: ["#CC4E5C", "#B3424F", "#9A3642", "#812A35", "#681E28"] },
        { name: "Chestnut Brown", colors: ["#954535", "#7D3A2C", "#652F23", "#4D241A", "#351911"] },
        { name: "Golden Hour", colors: ["#FFC300", "#FFB700", "#FFAB00", "#FF9F00", "#FF9300"] },
        { name: "Forest Floor", colors: ["#556B2F", "#6B8E23", "#808000", "#555D50", "#3E4639"] },
        { name: "Scarecrow", colors: ["#E1C699", "#C6AA79", "#AB8E59", "#907239", "#755619"] },
        { name: "Bonfire Night", colors: ["#2C3E50", "#E67E22", "#D35400", "#C0392B", "#E74C3C"] },
        { name: "Acorn", colors: ["#A67B5B", "#8C664A", "#725139", "#583C28", "#3E2717"] },
        { name: "Corn Maze", colors: ["#E4D96F", "#D6C954", "#C8B939", "#BAA91E", "#AC9903"] },
        { name: "Cranberry Sauce", colors: ["#9E1B32", "#86172A", "#6E1322", "#560F1A", "#3E0B12"] }
    ],
    Night: [
        { name: "Midnight Blue", colors: ["#191970", "#000080", "#00008B", "#0000CD", "#0000FF"] },
        { name: "Starry Night", colors: ["#0C1446", "#2B3A67", "#496A81", "#66999B", "#B3C7D6"] },
        { name: "Moonlight Shadow", colors: ["#3C415C", "#B4A5A5", "#3A0088", "#930077", "#E61C5D"] },
        { name: "Aurora Borealis", colors: ["#0B3D91", "#0E4D92", "#105DA3", "#126DB4", "#157DC5"] },
        { name: "City Lights", colors: ["#000000", "#1C1C1C", "#383838", "#545454", "#707070"] },
        { name: "Dark Alley", colors: ["#121212", "#1E1E1E", "#2A2A2A", "#363636", "#424242"] },
        { name: "Deep Space", colors: ["#4B0082", "#483D8B", "#6A5ACD", "#7B68EE", "#9370DB"] },
        { name: "Eclipse", colors: ["#000000", "#191919", "#333333", "#4D4D4D", "#666666"] },
        { name: "Galaxy Quest", colors: ["#2E0854", "#4B0082", "#800080", "#9932CC", "#BA55D3"] },
        { name: "Nocturne", colors: ["#2C3E50", "#34495E", "#7F8C8D", "#95A5A6", "#BDC3C7"] },
        { name: "Shadow Realm", colors: ["#0D0D0D", "#1A1A1A", "#262626", "#333333", "#404040"] },
        { name: "Twilight Zone", colors: ["#483D8B", "#6A5ACD", "#7B68EE", "#9370DB", "#BA55D3"] },
        { name: "Vampire Kiss", colors: ["#800000", "#8B0000", "#A52A2A", "#B22222", "#DC143C"] },
        { name: "Witching Hour", colors: ["#2F4F4F", "#008080", "#008B8B", "#20B2AA", "#48D1CC"] },
        { name: "Zero Gravity", colors: ["#000000", "#0F0F0F", "#1F1F1F", "#2F2F2F", "#3F3F3F"] }
    ]
};

async function seed() {
    console.log("🚀 Starting seed...");
    let total = 0;

    for (const [section, palettes] of Object.entries(CATEGORIES)) {
        console.log(`Processing ${section}...`);

        // Prepare data with correct section and basic tags
        const palettesData = palettes.map(p => ({
            name: p.name,
            colors: p.colors,
            section: section.toLowerCase(), // Force strict section
            tags: [section.toLowerCase()] // Force strict tag
        }));

        const { data, error } = await supabase
            .from('palettes')
            .insert(palettesData)
            .select();

        if (error) {
            console.error(`❌ Error inserting ${section}:`, error);
        } else {
            console.log(`✅ Added ${data.length} palettes to ${section}`);
            total += data.length;
        }
    }

    // Now re-run tag generation ONLY for these new palettes to give them rich tags
    // We will do this by fetching the ones we just added? 
    // Actually, sticking to the user's "Strict" request, maybe we should just leave them with the section tag + generated ones?
    // The user said "Add 15 new uniq color... sort it acosing to section-wise. Can't mix up"
    // So sticking to the single tag + section is safest to ensure they appear ONLY there.
    // BUT the "Smart Filtering" relies on tags.
    // If I add "Marshmallow Dream" to "Pastel", it has tag "pastel".
    // Does "Pastel" category show it? Yes.
    // Does "Warm" category show it? Only if I add warm tags.
    // User said "Can't mix up".
    // So I will NOT generate extra tags that might cross-contaminate. I'll stick to the primary tag.

    console.log(`🎉 Total inserted: ${total}`);
}

seed();
