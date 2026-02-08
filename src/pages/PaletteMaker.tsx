import { useState } from "react";
import { ColorGrid, type BaseColor } from "@/components/palette-maker/ColorGrid";
import { PaletteBuilder } from "@/components/palette-maker/PaletteBuilder";
import { SubmitPaletteModal } from "@/components/SubmitPaletteModal";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { generateRandomColor, hexToRgbString, generateColorHarmonies } from "@/utils/colorUtils";
import { toast } from "sonner";
import { Plus, RefreshCw, Sparkles } from "lucide-react";

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
    const [creationColor, setCreationColor] = useState<string>("#3b82f6"); // Default blue-ish

    const handleColorSelect = (color: { name: string; hex: string; rgb: string }) => {
        // Prevent duplicates
        if (selectedColors.some(c => c.hex === color.hex)) {
            // Optional: Toggle select/deselect
            setSelectedColors(prev => prev.filter(c => c.hex !== color.hex));
            return;
        }

        // Max limit check
        if (selectedColors.length >= 5) {
            toast.error("You can only add up to 5 colors.");
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

    const handleColorChange = (index: number, newHex: string) => {
        const rgb = hexToRgbString(newHex);
        setSelectedColors(prev => {
            const newColors = [...prev];
            newColors[index] = {
                ...newColors[index],
                hex: newHex,
                rgb: rgb,
                name: "Custom Color" // Or keep existing name if possible, but "Custom" is safer
            };
            return newColors;
        });
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

            <main className="container py-8 px-4 mx-auto space-y-12 relative">
                {/* Palette Builder Section - STICKY */}
                <section className="sticky top-4 z-50 rounded-2xl border border-white/10 bg-background/80 p-6 shadow-2xl backdrop-blur-xl transition-all duration-300">
                    <PaletteBuilder
                        colors={selectedColors}
                        onRemoveColor={handleRemoveColor}
                        onClearPalette={handleClearPalette}
                        onReorder={setSelectedColors}
                        onColorChange={handleColorChange}
                        onSubmit={() => setIsSubmitModalOpen(true)}
                    />
                </section>

                {/* Color Grid Section */}
                {/* Color Creation Studio */}
                <section className="relative rounded-3xl border border-white/10 bg-card/30 p-8 md:p-12 shadow-2xl overflow-hidden">
                    {/* Background Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />

                    <div className="relative z-10 grid gap-12 lg:grid-cols-2 items-center max-w-5xl mx-auto">

                        {/* Left: Controls */}
                        <div className="space-y-8">
                            <div className="space-y-2">
                                <h2 className="text-4xl font-display font-bold text-foreground">Color Studio</h2>
                                <p className="text-muted-foreground text-lg">
                                    Craft your perfect color. Pick, tweak, or randomize to find the missing piece of your palette.
                                </p>
                            </div>

                            <div className="space-y-6">
                                {/* Color Input & Display */}
                                <div className="flex items-center gap-4 p-2 rounded-2xl border border-white/10 bg-black/20 backdrop-blur-md">
                                    <div className="relative w-16 h-16 rounded-xl overflow-hidden shadow-inner ring-1 ring-white/10 shrink-0 group cursor-pointer">
                                        <div
                                            className="absolute inset-0 w-full h-full"
                                            style={{ backgroundColor: creationColor }}
                                        />
                                        <input
                                            type="color"
                                            value={creationColor}
                                            onChange={(e) => setCreationColor(e.target.value)}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            title="Pick a color"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/30 transition-opacity pointer-events-none">
                                            <span className="text-[10px] text-white font-bold uppercase">Pick</span>
                                        </div>
                                    </div>

                                    <div className="flex-1 space-y-1">
                                        < label className="text-xs font-medium text-muted-foreground ml-1">HEX CODE</label>
                                        <input
                                            type="text"
                                            value={creationColor.toUpperCase()}
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                setCreationColor(val);
                                                // Basic valid hex check could be added here
                                            }}
                                            className="w-full bg-transparent border-none text-2xl font-mono font-bold text-foreground focus:ring-0 p-0 uppercase placeholder:text-muted-foreground/50"
                                            placeholder="#000000"
                                        />
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="grid grid-cols-2 gap-4">
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        onClick={() => setCreationColor(generateRandomColor())}
                                        className="h-14 text-base border-white/10 hover:bg-white/5 hover:border-white/20"
                                    >
                                        <RefreshCw className="mr-2 h-5 w-5" />
                                        Randomize
                                    </Button>

                                    <Button
                                        size="lg"
                                        onClick={() => handleColorSelect({
                                            name: "Custom Color",
                                            hex: creationColor,
                                            rgb: hexToRgbString(creationColor)
                                        })}
                                        disabled={selectedColors.length >= 5}
                                        className="h-14 text-base bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25"
                                    >
                                        <Plus className="mr-2 h-5 w-5" />
                                        Add to Palette
                                    </Button>
                                </div>

                                {selectedColors.length >= 5 && (
                                    <p className="text-center text-sm text-destructive/80 font-medium animate-pulse">
                                        Palette is full (5/5). Remove a color to add new ones.
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Right: Large Preview */}
                        <div className="relative group perspective-1000 flex justify-center">
                            {/* Ambient Glow behind preview */}
                            <div
                                className="absolute inset-0 rounded-full blur-[100px] opacity-40 transition-colors duration-700"
                                style={{ backgroundColor: creationColor }}
                            />

                            <div
                                className="relative w-64 h-64 md:w-80 md:h-80 rounded-[2.5rem] shadow-2xl transition-all duration-500 transform group-hover:scale-105 group-hover:rotate-3 border-4 border-white/5 ring-1 ring-white/10"
                                style={{ backgroundColor: creationColor }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-black/10 rounded-[2.5rem] opacity-50" />

                                {/* Info on the card */}
                                <div className="absolute bottom-8 left-8 right-8">
                                    <div className="bg-black/20 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                                        <div className="text-white/90 font-mono text-xl font-bold tracking-wider">
                                            {creationColor.toUpperCase()}
                                        </div>
                                        <div className="text-white/60 font-mono text-xs mt-1">
                                            {hexToRgbString(creationColor)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Perfect Matches / Harmonies */}
                <section className="space-y-6">
                    <div className="space-y-1 px-2">
                        <h2 className="text-3xl font-display font-bold text-foreground/90">Perfect Matches</h2>
                        <p className="text-sm text-muted-foreground">Automatically generated harmonies to pair with your color.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {generateColorHarmonies(creationColor).map((harmony) => (
                            <div key={harmony.type} className="space-y-3 bg-card/40 p-4 rounded-2xl border border-white/5">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{harmony.type.replace('-', ' ')}</h3>
                                <div className="flex gap-3">
                                    {harmony.colors.map((hex) => (
                                        <button
                                            key={hex}
                                            onClick={() => handleColorSelect({
                                                name: `${harmony.type} match`,
                                                hex: hex,
                                                rgb: hexToRgbString(hex)
                                            })}
                                            disabled={selectedColors.length >= 5}
                                            className="group relative h-16 w-full rounded-xl shadow-sm border border-white/10 overflow-hidden transition-all hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:hover:scale-100"
                                            style={{ backgroundColor: hex }}
                                            title={`Add ${hex}`}
                                        >
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/20 transition-opacity">
                                                <Plus className="text-white w-5 h-5 drop-shadow-md" />
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
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
