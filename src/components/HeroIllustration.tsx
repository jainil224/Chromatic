import { memo } from "react";
import { cn } from "@/lib/utils";
import { Wand2 } from "lucide-react";

interface HeroIllustrationProps {
    palettes: string[][];
    isShuffling: boolean;
}

export const HeroIllustration = memo(({ palettes, isShuffling }: HeroIllustrationProps) => {
    // 90-palette window split evenly: 30 unique palettes per column — no visible repeats
    const col1 = palettes.slice(0, 30);
    const col2 = palettes.slice(30, 60);
    const col3 = palettes.slice(60, 90);

    // Foreground card uses a palette from the middle for visual variety
    const foregroundPalette = palettes[4] ?? palettes[0];

    const renderColumn = (colPalettes: string[][], duration: string, delay: string) => {
        // For the CSS infinite scroll technique we need to duplicate content.
        // Simple duplication [A,B,C, A,B,C] ensures a frame-perfect loop 
        // with no back-to-back repeats at the seam.
        const doubled = [...colPalettes, ...colPalettes];
        return (
            <div className="flex flex-col gap-4 py-4" style={{ animation: `scroll-up ${duration} linear infinite`, animationDelay: delay }}>
                {doubled.map((colors, idx) => (
                    <div
                        key={idx}
                        className="h-24 lg:h-32 w-full rounded-xl overflow-hidden border border-white/10 flex flex-row shadow-md opacity-90"
                    >
                        {colors.map((color, i) => (
                            <div key={i} className="flex-1 h-full" style={{ backgroundColor: color }} />
                        ))}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="relative h-full w-full flex items-center justify-start overflow-visible">
            {/* Background Scrolling Layer - Contained clipping */}
            <div className="absolute inset-0 z-0 overflow-hidden rounded-3xl pointer-events-none opacity-[0.40] lg:opacity-[0.50]">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 h-full">
                    {renderColumn(col1, '35s', '0s')}
                    {renderColumn(col2, '45s', '-8s')}
                    <div className="hidden md:block">
                        {renderColumn(col3, '40s', '-16s')}
                    </div>
                </div>
            </div>

            {/* Main Foreground Card - Repositioned to avoid clipping while staying on the left */}
            <div
                className="relative z-10 w-[85%] sm:w-full max-w-[320px] lg:max-w-[420px] mx-auto lg:ml-8 transition-all duration-700 ease-out"
                style={{
                    transform: isShuffling ? 'scale(1.03) translateY(-8px)' : 'scale(1) translateY(0)',
                }}
            >
                <div className={cn(
                    "group relative overflow-hidden rounded-[2rem] border p-0 backdrop-blur-[40px] transition-all duration-500",
                    "bg-black/40 border-white/10 ring-1 ring-white/10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9)]",
                    isShuffling ? "ring-2 ring-primary/40" : "hover:border-white/20 hover:-translate-y-1"
                )}>
                    {/* Visual Content (The Palette) - Smaller size */}
                    <div className="flex h-40 lg:h-56 w-full flex-row overflow-hidden relative">
                        {/* Flash Overlay */}
                        <div className={cn(
                            "absolute inset-0 bg-white/10 z-10 pointer-events-none transition-opacity duration-300 ease-out",
                            isShuffling ? "opacity-100" : "opacity-0"
                        )} />

                        {foregroundPalette.map((color, i) => (
                            <div
                                key={i}
                                className="flex-1 transition-colors duration-700 ease-in-out"
                                style={{ backgroundColor: color, transitionDelay: `${i * 40}ms` }}
                            />
                        ))}
                    </div>

                    {/* Subtle Overlay Glow */}
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
            </div>
        </div>
    );
});
