export interface Palette {
  id: string;
  name: string;
  colors: string[];
  tags?: string[];
}

export const darkPalettes: Palette[] = [
  {
    id: "midnight-ember",
    name: "Midnight Ember",
    colors: ["#1a1a2e", "#16213e", "#0f3460", "#e94560", "#ff6b6b"],
    tags: ["dramatic", "warm"],
  },
  {
    id: "forest-depths",
    name: "Forest Depths",
    colors: ["#0d1b2a", "#1b263b", "#415a77", "#778da9", "#e0e1dd"],
    tags: ["nature", "calm"],
  },
  {
    id: "neon-noir",
    name: "Neon Noir",
    colors: ["#10002b", "#240046", "#3c096c", "#5a189a", "#ff00ff"],
    tags: ["cyberpunk", "vibrant"],
  },
  {
    id: "autumn-night",
    name: "Autumn Night",
    colors: ["#2d2a32", "#4a3728", "#6b4423", "#c77b30", "#e5c185"],
    tags: ["warm", "cozy"],
  },
  {
    id: "ocean-abyss",
    name: "Ocean Abyss",
    colors: ["#03045e", "#023e8a", "#0077b6", "#00b4d8", "#90e0ef"],
    tags: ["ocean", "gradient"],
  },
  {
    id: "carbon-rose",
    name: "Carbon Rose",
    colors: ["#1a1a1d", "#2b2b2b", "#4e4e50", "#c3073f", "#950740"],
    tags: ["elegant", "bold"],
  },
  {
    id: "deep-space",
    name: "Deep Space",
    colors: ["#0b0c10", "#1f2833", "#45a29e", "#66fcf1", "#c5c6c7"],
    tags: ["tech", "futuristic"],
  },
  {
    id: "volcanic",
    name: "Volcanic",
    colors: ["#1a1a1a", "#2d2d2d", "#4a4a4a", "#ff4500", "#ffa500"],
    tags: ["fire", "intense"],
  },
];

export const lightPalettes: Palette[] = [
  {
    id: "morning-mist",
    name: "Morning Mist",
    colors: ["#f8f9fa", "#e9ecef", "#dee2e6", "#6c757d", "#212529"],
    tags: ["minimal", "clean"],
  },
  {
    id: "peach-blossom",
    name: "Peach Blossom",
    colors: ["#fff5eb", "#ffd6ba", "#ffb088", "#ff8b5e", "#e85d04"],
    tags: ["warm", "soft"],
  },
  {
    id: "sage-garden",
    name: "Sage Garden",
    colors: ["#f1faee", "#a8dadc", "#457b9d", "#1d3557", "#e63946"],
    tags: ["nature", "balanced"],
  },
  {
    id: "lavender-fields",
    name: "Lavender Fields",
    colors: ["#f8f0fc", "#e5dbff", "#c0a9ff", "#8c6bff", "#5c3bff"],
    tags: ["calm", "dreamy"],
  },
  {
    id: "sand-dune",
    name: "Sand Dune",
    colors: ["#fefae0", "#dda15e", "#bc6c25", "#606c38", "#283618"],
    tags: ["earthy", "natural"],
  },
  {
    id: "arctic-blue",
    name: "Arctic Blue",
    colors: ["#f0f8ff", "#caf0f8", "#90e0ef", "#0096c7", "#023e8a"],
    tags: ["cool", "fresh"],
  },
  {
    id: "sunset-glow",
    name: "Sunset Glow",
    colors: ["#fff4e6", "#ffe8cc", "#ffc8a2", "#ff7f50", "#dc143c"],
    tags: ["vibrant", "warm"],
  },
  {
    id: "cream-noir",
    name: "Cream Noir",
    colors: ["#faf8f5", "#f0ebe3", "#d4c9be", "#7d6b5a", "#2b2118"],
    tags: ["elegant", "sophisticated"],
  },
];
