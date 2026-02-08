import { X, Trash2, Download, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { toPng } from 'html-to-image';
import { useRef, useState } from "react";
import { PaletteExportCard } from "@/components/PaletteExportCard";

interface PaletteColor {
    hex: string;
    name: string;
    rgb: string;
}

interface PaletteBuilderProps {
    colors: PaletteColor[];
    onRemoveColor: (hex: string) => void;
    onClearPalette: () => void;
    onReorder: (newOrder: PaletteColor[]) => void;
    onColorChange: (index: number, newHex: string) => void; // Added prop
    onSubmit: () => void;
}

export const PaletteBuilder = ({ colors, onRemoveColor, onClearPalette, onReorder, onColorChange, onSubmit }: PaletteBuilderProps) => { // Added prop
    const paletteRef = useRef<HTMLDivElement>(null);
    const [draggedIdx, setDraggedIdx] = useState<number | null>(null);

    const handleDownloadJSON = () => {
        if (colors.length === 0) {
            toast.error("Add some colors first!");
            return;
        }
        const data = JSON.stringify(colors, null, 2);
        const blob = new Blob([data], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "chromatic-colors.json";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success("Palette exported as JSON!");
    };

    const handleDownloadCSS = () => {
        if (colors.length === 0) {
            toast.error("Add some colors first!");
            return;
        }
        const cssVars = colors.map((c, i) => `  --color-${i + 1}: ${c.hex}; /* ${c.name} */`).join("\n");
        const content = `:root {\n${cssVars}\n}`;
        const blob = new Blob([content], { type: "text/css" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "chromatic-colors.css";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success("Palette exported as CSS variables!");
    };

    const [isExporting, setIsExporting] = useState(false);
    const exportRef = useRef<HTMLDivElement>(null);

    const handleDownloadPNG = async () => {
        if (colors.length === 0) {
            toast.error("Add some colors first!");
            return;
        }

        setIsExporting(true);
        // Wait for re-render so exportRef is populated
        setTimeout(async () => {
            if (exportRef.current === null) {
                setIsExporting(false);
                return;
            }

            try {
                const dataUrl = await toPng(exportRef.current, {
                    cacheBust: true,
                    pixelRatio: 2, // Higher quality
                });
                const link = document.createElement("a");
                link.download = "chromatic-colors.png";
                link.href = dataUrl;
                link.click();
                toast.success("Palette exported as PNG!");
            } catch (err) {
                console.error(err);
                toast.error("Failed to export PNG.");
            } finally {
                setIsExporting(false);
            }
        }, 100);
    };

    // Drag and Drop Handlers
    const handleDragStart = (e: React.DragEvent, index: number) => {
        setDraggedIdx(index);
        e.dataTransfer.effectAllowed = "move";
        // Optional: Set ghost image or just let default
        // e.dataTransfer.setDragImage(e.currentTarget, 0, 0);
    };

    const handleDragOver = (e: React.DragEvent, index: number) => {
        e.preventDefault(); // Necessary to allow dropping
        if (draggedIdx === null || draggedIdx === index) return;

        // Optional: Visual feedback could be added here if we want live reordering
        // For now, we'll stick to swap on drop for simplicity or implement swap here for live preview
        // Implementing live reorder on DragOver feel more responsive:
        const newColors = [...colors];
        const draggedItem = newColors[draggedIdx];
        newColors.splice(draggedIdx, 1);
        newColors.splice(index, 0, draggedItem);

        onReorder(newColors);
        setDraggedIdx(index);
    };

    const handleDragEnd = () => {
        setDraggedIdx(null);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div>
                    <h2 className="text-2xl font-display font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">My Custom Palette</h2>
                    <p className="text-xs text-muted-foreground mt-1 font-medium tracking-wide">
                        {colors.length} / 5 COLORS SELECTED
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClearPalette}
                        disabled={colors.length === 0}
                        className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                    >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Clear
                    </Button>
                </div>
            </div>

            {/* Palette Preview Area - This is what gets captured for PNG */}
            <div
                ref={paletteRef}
                className="min-h-[160px] w-full rounded-2xl border border-white/5 bg-black/20 p-6 shadow-inner transition-all relative overflow-hidden group/board"
            >
                {/* Subtle background pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

                {colors.length === 0 ? (
                    <div className="flex h-32 flex-col items-center justify-center text-muted-foreground/50 border-2 border-dashed border-white/5 rounded-xl">
                        <p className="text-sm font-medium">Select colors from the grid below to build your palette.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 relative z-10">
                        {colors.map((color, index) => (
                            <div
                                key={color.hex}
                                draggable
                                onDragStart={(e) => handleDragStart(e, index)}
                                onDragOver={(e) => handleDragOver(e, index)}
                                onDragEnd={handleDragEnd}
                                className={cn(
                                    "group relative flex flex-col overflow-hidden rounded-xl border border-white/10 bg-card shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-move active:cursor-grabbing",
                                    draggedIdx === index && "opacity-50 scale-95 ring-2 ring-primary ring-offset-2 ring-offset-background"
                                )}
                            >
                                <div
                                    className="h-28 w-full transition-transform duration-500 relative"
                                    style={{ backgroundColor: color.hex }}
                                >
                                    {/* Hidden color input that covers the color block area */}
                                    <input
                                        type="color"
                                        value={color.hex}
                                        onChange={(e) => onColorChange(index, e.target.value)}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        title="Click to edit color"
                                    />


                                </div>

                                <button
                                    onClick={() => onRemoveColor(color.hex)}
                                    className="absolute right-2 top-2 rounded-full bg-black/40 text-white p-1.5 opacity-0 backdrop-blur-md transition-all duration-200 hover:bg-black/60 group-hover:opacity-100 pointer-events-auto z-10 translate-y-1 group-hover:translate-y-0"
                                    aria-label="Remove color"
                                >
                                    <X className="h-3.5 w-3.5" />
                                </button>

                                <div className="flex flex-col gap-1 p-3 bg-card/95 backdrop-blur-sm">
                                    <span className="font-semibold text-sm text-foreground truncate">{color.name}</span>
                                    <div className="flex flex-col gap-0.5">
                                        <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">{color.hex}</span>
                                        <span className="font-mono text-[9px] text-muted-foreground/60">{color.rgb}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-4 border-t border-white/5">
                <Button onClick={handleDownloadJSON} variant="outline" size="sm" className="gap-2 h-9 text-xs border-white/10 hover:bg-white/5">
                    <Download className="h-3.5 w-3.5" /> JSON
                </Button>
                <Button onClick={handleDownloadCSS} variant="outline" size="sm" className="gap-2 h-9 text-xs border-white/10 hover:bg-white/5">
                    <Download className="h-3.5 w-3.5" /> CSS
                </Button>
                <div className="flex-1" />
                <div className="flex flex-wrap gap-3">
                    <Button
                        onClick={handleDownloadPNG}
                        disabled={colors.length === 0}
                        className="gap-3 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 px-6 h-12"
                    >
                        <ImageIcon className="h-4 w-4" />
                        <span className="font-mono font-bold tracking-[0.1em] text-xs">DOWNLOAD IMAGE</span>
                    </Button>
                    <Button
                        onClick={onSubmit}
                        disabled={colors.length < 3}
                        className="h-12 px-6 bg-[#00FF88] hover:bg-[#00FF88]/90 text-[#050505] font-bold border-none transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                    >
                        Submit to Community
                    </Button>
                </div>
            </div>

            {/* Hidden Export Card for PNG Capture */}
            <div className="fixed left-[-9999px] top-[-9999px]">
                <PaletteExportCard
                    ref={exportRef}
                    palette={{
                        id: 'custom',
                        name: 'Custom Palette',
                        colors: colors.map(c => c.hex),
                        category: 'Private',
                        tags: ['custom', 'my-palette']
                    }}
                />
            </div>
        </div>
    );
};
