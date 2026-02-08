import { X, Trash2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { toPng } from 'html-to-image';
import { useRef, useState } from "react";

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
    onSubmit: () => void;
}

export const PaletteBuilder = ({ colors, onRemoveColor, onClearPalette, onReorder, onSubmit }: PaletteBuilderProps) => {
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
        link.download = "my-palette.json";
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
        link.download = "palette.css";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success("Palette exported as CSS variables!");
    };

    const handleDownloadPNG = async () => {
        if (colors.length === 0) {
            toast.error("Add some colors first!");
            return;
        }
        if (paletteRef.current === null) return;

        try {
            const dataUrl = await toPng(paletteRef.current, { cacheBust: true });
            const link = document.createElement("a");
            link.download = "my-palette.png";
            link.href = dataUrl;
            link.click();
            toast.success("Palette exported as PNG!");
        } catch (err) {
            console.error(err);
            toast.error("Failed to export PNG.");
        }
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
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-display font-bold">My Custom Palette</h2>
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClearPalette}
                        disabled={colors.length === 0}
                        className="text-muted-foreground hover:text-destructive"
                    >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Clear
                    </Button>
                </div>
            </div>

            {/* Palette Preview Area - This is what gets captured for PNG */}
            <div
                ref={paletteRef}
                className="min-h-[140px] w-full rounded-2xl border bg-card p-6 shadow-sm transition-all text-card-foreground"
            >
                {colors.length === 0 ? (
                    <div className="flex h-32 flex-col items-center justify-center text-muted-foreground">
                        <p>Select colors from the grid above to build your palette.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {colors.map((color, index) => (
                            <div
                                key={color.hex}
                                draggable
                                onDragStart={(e) => handleDragStart(e, index)}
                                onDragOver={(e) => handleDragOver(e, index)}
                                onDragEnd={handleDragEnd}
                                className={cn(
                                    "group relative flex flex-col overflow-hidden rounded-xl border bg-background shadow-sm transition-all hover:shadow-md cursor-grab active:cursor-grabbing",
                                    draggedIdx === index && "opacity-50 scale-95 ring-2 ring-primary ring-offset-2"
                                )}
                            >
                                <div
                                    className="h-24 w-full transition-transform duration-500 group-hover:scale-105"
                                    style={{ backgroundColor: color.hex }}
                                />
                                <button
                                    onClick={() => onRemoveColor(color.hex)}
                                    className="absolute right-2 top-2 rounded-full bg-background/50 p-1 opacity-0 backdrop-blur transition-opacity hover:bg-background group-hover:opacity-100"
                                    aria-label="Remove color"
                                >
                                    <X className="h-3 w-3" />
                                </button>
                                <div className="flex flex-col gap-0.5 p-3 text-xs">
                                    <span className="font-semibold text-foreground">{color.name}</span>
                                    <span className="font-mono text-muted-foreground uppercase">{color.hex}</span>
                                    <span className="font-mono text-[10px] text-muted-foreground/70">{color.rgb}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-4 border-t">
                <Button onClick={handleDownloadJSON} variant="outline" className="gap-2">
                    <Download className="h-4 w-4" /> JSON
                </Button>
                <Button onClick={handleDownloadCSS} variant="outline" className="gap-2">
                    <Download className="h-4 w-4" /> CSS
                </Button>
                <Button onClick={handleDownloadPNG} variant="default" className="gap-2">
                    <Download className="h-4 w-4" /> PNG Image
                </Button>
                <div className="flex-1" />
                <Button
                    onClick={onSubmit}
                    disabled={colors.length < 2}
                    className="gap-2 bg-green-600 hover:bg-green-700 text-white"
                >
                    Submit to Community
                </Button>
            </div>
        </div>
    );
};
