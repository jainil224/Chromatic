
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
                className={`relative flex aspect-[4/5] w-[600px] flex-col overflow-hidden bg-background text-foreground ${className}`}
                style={style}
            >
                {/* Background Gradient */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-background via-muted/10 to-muted/30" />

                {/* Decorative elements */}
                <div className="absolute top-0 right-0 h-64 w-64 translate-x-1/3 -translate-y-1/3 rounded-full bg-primary/5 blur-3xl" />
                <div className="absolute bottom-0 left-0 h-64 w-64 -translate-x-1/3 translate-y-1/3 rounded-full bg-accent/5 blur-3xl" />

                {/* Header */}
                <div className="flex items-center justify-between p-12 pb-8">
                    <div>
                        <h1 className="font-display text-5xl font-italic tracking-tight text-foreground">
                            {palette.name}
                        </h1>
                        <p className="mt-2 font-mono text-sm uppercase tracking-widest text-muted-foreground">
                            Color Palette
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                        <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
                            Chromatic
                        </span>
                    </div>
                </div>

                {/* Swatches Container */}
                <div className="flex-1 px-12 py-4">
                    <div className="h-full w-full overflow-hidden rounded-2xl shadow-xl ring-1 ring-border/50">
                        <div className="flex h-full flex-col">
                            {palette.colors.map((color, index) => (
                                <div
                                    key={`${color}-${index}`}
                                    className="relative flex flex-1 items-center justify-between px-8 transition-all"
                                    style={{ backgroundColor: color }}
                                >
                                    <span className="font-mono text-lg font-medium tracking-wide text-white/90 drop-shadow-sm mix-blend-difference">
                                        {color}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between p-12 pt-8">
                    <div className="flex items-center gap-4">
                        {palette.category && (
                            <span className="rounded-full border border-border bg-card px-4 py-1.5 font-mono text-xs text-muted-foreground">
                                {palette.category}
                            </span>
                        )}
                        <div className="flex gap-1">
                            {palette.tags?.slice(0, 3).map(tag => (
                                <span key={tag} className="text-xs text-muted-foreground/60">#{tag}</span>
                            ))}
                        </div>
                    </div>

                    <div className="text-right">
                        <p className="font-display text-lg text-foreground/80">
                            Made with Chromatic
                        </p>
                    </div>
                </div>
            </div>
        );
    }
);

PaletteExportCard.displayName = "PaletteExportCard";
