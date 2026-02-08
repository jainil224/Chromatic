import { useState } from "react";
import { ColorGrid, type BaseColor } from "@/components/palette-maker/ColorGrid";
import { PaletteBuilder } from "@/components/palette-maker/PaletteBuilder";
import { SubmitPaletteModal } from "@/components/SubmitPaletteModal";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Predefined colors with shades
const PALETTE_MAKER_COLORS: BaseColor[] = [
    {
        name: "Red",
        shades: [
            { name: "Red 50", hex: "#fef2f2", rgb: "254, 242, 242" },
            { name: "Red 200", hex: "#fecaca", rgb: "254, 202, 202" },
            { name: "Red 400", hex: "#f87171", rgb: "248, 113, 113" },
            { name: "Red 600", hex: "#dc2626", rgb: "220, 38, 38" },
            { name: "Red 900", hex: "#7f1d1d", rgb: "127, 29, 29" },
        ],
    },
    {
        name: "Orange",
        shades: [
            { name: "Orange 50", hex: "#fff7ed", rgb: "255, 247, 237" },
            { name: "Orange 200", hex: "#fed7aa", rgb: "254, 215, 170" },
            { name: "Orange 400", hex: "#fb923c", rgb: "251, 146, 60" },
            { name: "Orange 600", hex: "#ea580c", rgb: "234, 88, 12" },
            { name: "Orange 900", hex: "#7c2d12", rgb: "124, 45, 18" },
        ],
    },
    {
        name: "Amber",
        shades: [
            { name: "Amber 50", hex: "#fffbeb", rgb: "255, 251, 235" },
            { name: "Amber 200", hex: "#fde68a", rgb: "253, 230, 138" },
            { name: "Amber 400", hex: "#fbbf24", rgb: "251, 191, 36" },
            { name: "Amber 600", hex: "#d97706", rgb: "217, 119, 6" },
            { name: "Amber 900", hex: "#78350f", rgb: "120, 53, 15" },
        ],
    },
    {
        name: "Yellow",
        shades: [
            { name: "Yellow 50", hex: "#fefce8", rgb: "254, 252, 232" },
            { name: "Yellow 200", hex: "#fef08a", rgb: "254, 240, 138" },
            { name: "Yellow 400", hex: "#facc15", rgb: "250, 204, 21" },
            { name: "Yellow 600", hex: "#ca8a04", rgb: "202, 138, 4" },
            { name: "Yellow 900", hex: "#713f12", rgb: "113, 63, 18" },
        ],
    },
    {
        name: "Lime",
        shades: [
            { name: "Lime 50", hex: "#f7fee7", rgb: "247, 254, 231" },
            { name: "Lime 200", hex: "#d9f99d", rgb: "217, 249, 157" },
            { name: "Lime 400", hex: "#a3e635", rgb: "163, 230, 53" },
            { name: "Lime 600", hex: "#65a30d", rgb: "101, 163, 13" },
            { name: "Lime 900", hex: "#3f6212", rgb: "63, 98, 18" },
        ],
    },
    {
        name: "Green",
        shades: [
            { name: "Green 50", hex: "#f0fdf4", rgb: "240, 253, 244" },
            { name: "Green 200", hex: "#bbf7d0", rgb: "187, 247, 208" },
            { name: "Green 400", hex: "#4ade80", rgb: "74, 222, 128" },
            { name: "Green 600", hex: "#16a34a", rgb: "22, 163, 74" },
            { name: "Green 900", hex: "#14532d", rgb: "20, 83, 45" },
        ],
    },
    {
        name: "Emerald",
        shades: [
            { name: "Emerald 50", hex: "#ecfdf5", rgb: "236, 253, 245" },
            { name: "Emerald 200", hex: "#a7f3d0", rgb: "167, 243, 208" },
            { name: "Emerald 400", hex: "#34d399", rgb: "52, 211, 153" },
            { name: "Emerald 600", hex: "#059669", rgb: "5, 150, 105" },
            { name: "Emerald 900", hex: "#064e3b", rgb: "6, 78, 59" },
        ],
    },
    {
        name: "Teal",
        shades: [
            { name: "Teal 50", hex: "#f0fdfa", rgb: "240, 253, 250" },
            { name: "Teal 200", hex: "#99f6e4", rgb: "153, 246, 228" },
            { name: "Teal 400", hex: "#2dd4bf", rgb: "45, 212, 191" },
            { name: "Teal 600", hex: "#0d9488", rgb: "13, 148, 136" },
            { name: "Teal 900", hex: "#134e4a", rgb: "19, 78, 74" },
        ],
    },
    {
        name: "Cyan",
        shades: [
            { name: "Cyan 50", hex: "#ecfeff", rgb: "236, 254, 255" },
            { name: "Cyan 200", hex: "#a5f3fc", rgb: "165, 243, 252" },
            { name: "Cyan 400", hex: "#22d3ee", rgb: "34, 211, 238" },
            { name: "Cyan 600", hex: "#0891b2", rgb: "8, 145, 178" },
            { name: "Cyan 900", hex: "#164e63", rgb: "22, 78, 99" },
        ],
    },
    {
        name: "Sky",
        shades: [
            { name: "Sky 50", hex: "#f0f9ff", rgb: "240, 249, 255" },
            { name: "Sky 200", hex: "#bae6fd", rgb: "186, 230, 253" },
            { name: "Sky 400", hex: "#38bdf8", rgb: "56, 189, 248" },
            { name: "Sky 600", hex: "#0284c7", rgb: "2, 132, 199" },
            { name: "Sky 900", hex: "#0c4a6e", rgb: "12, 74, 110" },
        ],
    },
    {
        name: "Blue",
        shades: [
            { name: "Blue 50", hex: "#eff6ff", rgb: "239, 246, 255" },
            { name: "Blue 200", hex: "#bfdbfe", rgb: "191, 219, 254" },
            { name: "Blue 400", hex: "#60a5fa", rgb: "96, 165, 250" },
            { name: "Blue 600", hex: "#2563eb", rgb: "37, 99, 235" },
            { name: "Blue 900", hex: "#1e3a8a", rgb: "30, 58, 138" },
        ],
    },
    {
        name: "Indigo",
        shades: [
            { name: "Indigo 50", hex: "#eef2ff", rgb: "238, 242, 255" },
            { name: "Indigo 200", hex: "#c7d2fe", rgb: "199, 210, 254" },
            { name: "Indigo 400", hex: "#818cf8", rgb: "129, 140, 248" },
            { name: "Indigo 600", hex: "#4f46e5", rgb: "79, 70, 229" },
            { name: "Indigo 900", hex: "#312e81", rgb: "49, 46, 129" },
        ],
    },
    {
        name: "Violet",
        shades: [
            { name: "Violet 50", hex: "#f5f3ff", rgb: "245, 243, 255" },
            { name: "Violet 200", hex: "#ddd6fe", rgb: "221, 214, 254" },
            { name: "Violet 400", hex: "#a78bfa", rgb: "167, 139, 250" },
            { name: "Violet 600", hex: "#7c3aed", rgb: "124, 58, 237" },
            { name: "Violet 900", hex: "#4c1d95", rgb: "76, 29, 149" },
        ],
    },
    {
        name: "Purple",
        shades: [
            { name: "Purple 50", hex: "#faf5ff", rgb: "250, 245, 255" },
            { name: "Purple 200", hex: "#e9d5ff", rgb: "233, 213, 255" },
            { name: "Purple 400", hex: "#c084fc", rgb: "192, 132, 252" },
            { name: "Purple 600", hex: "#9333ea", rgb: "147, 51, 234" },
            { name: "Purple 900", hex: "#581c87", rgb: "88, 28, 135" },
        ],
    },
    {
        name: "Fuchsia",
        shades: [
            { name: "Fuchsia 50", hex: "#fdf4ff", rgb: "253, 244, 255" },
            { name: "Fuchsia 200", hex: "#f5d0fe", rgb: "245, 208, 254" },
            { name: "Fuchsia 400", hex: "#e879f9", rgb: "232, 121, 249" },
            { name: "Fuchsia 600", hex: "#c026d3", rgb: "192, 38, 211" },
            { name: "Fuchsia 900", hex: "#701a75", rgb: "112, 26, 117" },
        ],
    },
    {
        name: "Pink",
        shades: [
            { name: "Pink 50", hex: "#fdf2f8", rgb: "253, 242, 248" },
            { name: "Pink 200", hex: "#fbcfe8", rgb: "251, 207, 232" },
            { name: "Pink 400", hex: "#f472b6", rgb: "244, 114, 182" },
            { name: "Pink 600", hex: "#db2777", rgb: "219, 39, 119" },
            { name: "Pink 900", hex: "#831843", rgb: "131, 24, 67" },
        ],
    },
    {
        name: "Rose",
        shades: [
            { name: "Rose 50", hex: "#fff1f2", rgb: "255, 241, 242" },
            { name: "Rose 200", hex: "#fecdd3", rgb: "254, 205, 211" },
            { name: "Rose 400", hex: "#fb7185", rgb: "251, 113, 133" },
            { name: "Rose 600", hex: "#e11d48", rgb: "225, 29, 72" },
            { name: "Rose 900", hex: "#881337", rgb: "136, 19, 55" },
        ],
    },
    {
        name: "Slate",
        shades: [
            { name: "Slate 50", hex: "#f8fafc", rgb: "248, 250, 252" },
            { name: "Slate 200", hex: "#e2e8f0", rgb: "226, 232, 240" },
            { name: "Slate 400", hex: "#94a3b8", rgb: "148, 163, 184" },
            { name: "Slate 600", hex: "#475569", rgb: "71, 85, 105" },
            { name: "Slate 900", hex: "#0f172a", rgb: "15, 23, 42" },
        ],
    },
];

const PaletteMaker = () => {
    const navigate = useNavigate();
    const [selectedColors, setSelectedColors] = useState<{ name: string; hex: string; rgb: string }[]>([]);
    const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

    const handleColorSelect = (color: { name: string; hex: string; rgb: string }) => {
        // Prevent duplicates
        if (selectedColors.some(c => c.hex === color.hex)) {
            // Optional: Toggle select/deselect
            setSelectedColors(prev => prev.filter(c => c.hex !== color.hex));
            return;
        }
        setSelectedColors(prev => [...prev, color]);
    };

    const handleRemoveColor = (hex: string) => {
        setSelectedColors(prev => prev.filter(c => c.hex !== hex));
    };

    const handleClearPalette = () => {
        setSelectedColors([]);
    };

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Simple Navbar Reuse or Custom Header */}
            <div className="border-b bg-card">
                <div className="container flex h-16 items-center px-4">
                    <button
                        onClick={() => navigate("/")}
                        className="mr-4 rounded-full p-2 text-muted-foreground hover:bg-accent hover:text-foreground"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </button>
                    <h1 className="text-xl font-bold font-display">Custom Color Palette Maker</h1>
                </div>
            </div>

            <main className="container py-8 px-4 mx-auto space-y-12">
                {/* Palette Builder Section */}
                <section className="rounded-xl border bg-card/50 p-6 shadow-sm backdrop-blur-sm">
                    <PaletteBuilder
                        colors={selectedColors}
                        onRemoveColor={handleRemoveColor}
                        onClearPalette={handleClearPalette}
                        onReorder={setSelectedColors}
                        onSubmit={() => setIsSubmitModalOpen(true)}
                    />
                </section>

                {/* Color Grid Section */}
                <section>
                    <h2 className="mb-6 text-2xl font-display font-bold px-4">Explore Colors</h2>
                    <ColorGrid
                        colors={PALETTE_MAKER_COLORS}
                        selectedColors={selectedColors.map(c => c.hex)}
                        onColorSelect={handleColorSelect}
                    />
                </section>
            </main>

            <SubmitPaletteModal
                isOpen={isSubmitModalOpen}
                onClose={() => setIsSubmitModalOpen(false)}
                initialColors={selectedColors.map(c => c.hex)}
            />
        </div>
    );
};

export default PaletteMaker;
