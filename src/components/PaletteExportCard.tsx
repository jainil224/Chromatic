
import { forwardRef } from "react";
import type { Palette } from "@/data/palettes";

interface PaletteExportCardProps {
    palette: Palette;
    className?: string;
    style?: React.CSSProperties;
}

export const PaletteExportCard = forwardRef<HTMLDivElement, PaletteExportCardProps>(
    ({ palette, className, style }, ref) => {
        return (
            <div
                ref={ref}
                className={`relative flex aspect-[4/5] w-[800px] flex-col overflow-hidden bg-[#050505] p-16 text-white ${className}`}
                style={style}
            >
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div className="space-y-2">
                        <h1
                            className="font-display text-7xl font-medium tracking-tight text-white capitalize"
                            style={{ fontFamily: "'Instrument Serif', serif" }}
                        >
                            {palette.name || "Untitled Palette"}
                        </h1>
                        <p className="font-mono text-sm uppercase tracking-[0.3em] text-white/40">
                            Color Palette
                        </p>
                    </div>
                    <div className="flex items-center gap-2 pt-4">
                        <div className="h-3 w-3 rounded-full bg-[#1da1f2]" />
                        <span className="font-mono text-sm font-bold uppercase tracking-wider text-[#1da1f2]">
                            Chromatic
                        </span>
                    </div>
                </div>

                {/* Swatches Container */}
                <div className="flex-1 py-12">
                    <div className="h-full w-full overflow-hidden rounded-[2.5rem] shadow-2xl">
                        <div className="flex h-full flex-col">
                            {palette.colors.map((color, index) => {
                                // Simple contrast check for text color
                                const r = parseInt(color.slice(1, 3), 16);
                                const g = parseInt(color.slice(3, 5), 16);
                                const b = parseInt(color.slice(5, 7), 16);
                                const yiq = (r * 299 + g * 587 + b * 114) / 1000;
                                const textColor = yiq >= 128 ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.7)';
                                const highlightColor = yiq >= 128 ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.9)';

                                return (
                                    <div
                                        key={`${color}-${index}`}
                                        className="relative flex flex-1 items-center px-12"
                                        style={{ backgroundColor: color }}
                                    >
                                        <span
                                            className="font-mono text-2xl font-bold tracking-widest"
                                            style={{ color: highlightColor }}
                                        >
                                            {color.toLowerCase()}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-end justify-between">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                            <span className="rounded-full bg-white/5 px-6 py-2 border border-white/10 font-mono text-sm text-white/40">
                                {palette.category || "custom"}
                            </span>
                            <div className="flex gap-2">
                                {(palette.tags || ["palette", "custom", "chromatic"]).map(tag => (
                                    <span key={tag} className="font-mono text-sm text-white/20">#{tag}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="text-right">
                        <div
                            className="font-display text-2xl italic text-white/40"
                            style={{ fontFamily: "'Instrument Serif', serif" }}
                        >
                            Made with Chromatic
                        </div>
                    </div>
                </div>
            </div>
        );
    }
);

PaletteExportCard.displayName = "PaletteExportCard";
