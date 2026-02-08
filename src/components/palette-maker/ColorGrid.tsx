import { useState } from "react";
import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";

export type BaseColor = {
    name: string;
    shades: {
        name: string;
        hex: string;
        rgb: string;
    }[];
};

interface ColorGridProps {
    colors: BaseColor[];
    selectedColors: string[];
    onColorSelect: (color: { name: string; hex: string; rgb: string }) => void;
}

export const ColorGrid = ({ colors, selectedColors, onColorSelect }: ColorGridProps) => {
    const [hoveredColor, setHoveredColor] = useState<string | null>(null);

    const copyToClipboard = (hex: string, e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent selection when clicking copy
        navigator.clipboard.writeText(hex);
        toast.success(`Copied ${hex} to clipboard`);
    };

    return (
        <div className="space-y-16 py-8">
            {colors.map((baseColor) => (
                <div key={baseColor.name} className="space-y-6">
                    <div className="flex items-center gap-4">
                        <h3 className="font-display text-2xl font-bold tracking-tight text-foreground/90 capitalize pl-2 border-l-4 border-primary/50">
                            {baseColor.name}
                        </h3>
                        <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                    </div>

                    <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 Gap-4 sm:gap-6">
                        {baseColor.shades.map((shade) => {
                            const isSelected = selectedColors.includes(shade.hex);
                            const isHovered = hoveredColor === shade.hex;

                            return (
                                <button
                                    key={shade.hex}
                                    onClick={() => onColorSelect(shade)}
                                    onMouseEnter={() => setHoveredColor(shade.hex)}
                                    onMouseLeave={() => setHoveredColor(null)}
                                    className={cn(
                                        "group relative aspect-[3/2] w-full overflow-hidden rounded-2xl border-0 transition-all duration-300 ease-out",
                                        "hover:scale-105 hover:shadow-xl hover:z-10",
                                        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background",
                                        isSelected ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-[0.98]" : "hover:-translate-y-1"
                                    )}
                                    style={{
                                        backgroundColor: shade.hex,
                                        boxShadow: isHovered
                                            ? `0 20px 40px -10px ${shade.hex}66` // Colored shadow on hover
                                            : 'none'
                                    }}
                                    aria-label={`Select ${shade.name} (${shade.hex})`}
                                >
                                    {/* Selection Indicator */}
                                    <div className={cn(
                                        "absolute inset-0 flex items-center justify-center transition-all duration-300",
                                        isSelected ? "opacity-100 bg-black/10 backdrop-blur-[1px]" : "opacity-0"
                                    )}>
                                        {isSelected && (
                                            <div className="bg-background/20 backdrop-blur-md rounded-full p-2 shadow-sm">
                                                <Check className="h-6 w-6 text-white drop-shadow-md" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Info Overlay (Visible on Hover) */}
                                    <div className={cn(
                                        "absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 via-black/30 to-transparent",
                                        "transform transition-transform duration-300 ease-in-out flex flex-col justify-end",
                                        isHovered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
                                    )}>
                                        <div className="flex items-end justify-between text-white">
                                            <div className="text-left">
                                                <p className="font-display font-medium text-xs tracking-wide text-white/90">
                                                    {shade.name.split(' ').pop()} {/* Just show the number/shade name */}
                                                </p>
                                                <p className="font-mono text-[10px] text-white/70 uppercase tracking-wider">
                                                    {shade.hex}
                                                </p>
                                            </div>

                                            {/* Quick Action: Copy */}
                                            <div
                                                role="button"
                                                onClick={(e) => copyToClipboard(shade.hex, e)}
                                                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 transition-colors backdrop-blur-md"
                                                title="Copy Hex"
                                            >
                                                <Copy className="h-3 w-3" />
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};
