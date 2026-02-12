
import { hexToRgbString } from './colorUtils';

// ==========================================
// 1. DEFINITIONS: CURATED TAG LIST
// ==========================================
// Each tag has a representative hex color for matching.
export const TAG_DEFINITIONS: Record<string, string> = {
    // Reds / Pinks
    'ruby': '#E0115F',
    'crimson': '#DC143C',
    'scarlet': '#FF2400',
    'cherry': '#DE3163',
    'rose': '#FF007F',
    'blush': '#DE5D83',
    'coral': '#FF7F50',
    'salmon': '#FA8072',
    'peach': '#FFCBA4',
    'flamingo': '#FC8EAC',
    'bubblegum': '#FFC1CC',
    'magenta': '#FF00FF',
    'berry': '#990F4B',

    // Oranges / Yellows / Browns
    'sunset': '#FD5E53',
    'tangerine': '#F28500',
    'apricot': '#FBCEB1',
    'amber': '#FFBF00',
    'gold': '#FFD700',
    'lemon': '#FFF700',
    'cream': '#FFFDD0',
    'beige': '#F5F5DC',
    'sand': '#C2B280',
    'sepia': '#704214',
    'chocolate': '#7B3F00',
    'coffee': '#6F4E37',
    'cocoa': '#D2691E',
    'bronze': '#CD7F32',
    'terracotta': '#E2725B',

    // Greens
    'emerald': '#50C878',
    'jade': '#00A86B',
    'sage': '#BCB88A',
    'olive': '#808000',
    'lime': '#BFFF00',
    'mint': '#3EB489',
    'forest': '#228B22',
    'pine': '#01796F',
    'seafoam': '#9FE2BF',
    'teal': '#008080',
    'turquoise': '#40E0D0',
    'aqua': '#00FFFF',

    // Blues
    'ocean': '#0077BE',
    'sky': '#87CEEB',
    'azure': '#007FFF',
    'cobalt': '#0047AB',
    'indigo': '#4B0082',
    'navy': '#000080',
    'midnight': '#191970',
    'denim': '#1560BD',
    'ice': '#B9F2FF',
    'frost': '#E1F5FE',

    // Purples
    'violet': '#8F00FF',
    'lavender': '#E6E6FA',
    'lilac': '#C8A2C8',
    'plum': '#8E4585',
    'grape': '#6F2DA8',
    'orchid': '#DA70D6',
    'mauve': '#E0B0FF',

    // Greys / Blacks / Whites
    'charcoal': '#36454F',
    'slate': '#708090',
    'graphite': '#2D2D2D',
    'smoke': '#848884',
    'silver': '#C0C0C0',
    'platinum': '#E5E4E2',
    'pearl': '#EAE0C8',
    'ivory': '#FFFFF0',
    'snow': '#FFFAFA',
};

// ==========================================
// 2. HELPER FUNCTIONS
// ==========================================

export const hexToRgb = (hex: string): { r: number, g: number, b: number } => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
}

// Calculate Euclidean distance between two colors
const getColorDistance = (color1: string, color2: string): number => {
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);

    return Math.sqrt(
        Math.pow(rgb1.r - rgb2.r, 2) +
        Math.pow(rgb1.g - rgb2.g, 2) +
        Math.pow(rgb1.b - rgb2.b, 2)
    );
};

// ==========================================
// 3. MAIN GENERATOR LOGIC
// ==========================================

export const generateTags = (paletteColors: string[]): string[] => {
    const tagScores: { tag: string, score: number }[] = [];

    // For each defined tag, calculate how close it is to ANY color in the palette
    Object.entries(TAG_DEFINITIONS).forEach(([tagName, tagHex]) => {
        let minDistance = Infinity;

        paletteColors.forEach(paletteColor => {
            const distance = getColorDistance(paletteColor, tagHex);
            if (distance < minDistance) {
                minDistance = distance;
            }
        });

        // Score is inverse of distance (closer = higher score)
        // We add a tiny random factor to break perfect ties predictably if needed
        tagScores.push({ tag: tagName, score: (1000 - minDistance) });
    });

    // Sort by best match (highest score)
    tagScores.sort((a, b) => b.score - a.score);

    // Take top 3 unique tags
    const topTags = tagScores.slice(0, 3).map(t => t.tag);

    // Sort alphabetically to ensure deterministic uniqueness checks
    return topTags.sort();
};

// Helper to create a unique key for a set of tags
export const getTagCombinationKey = (tags: string[]): string => {
    return [...tags].sort().join('|');
};
