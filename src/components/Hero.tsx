import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Palette, Search, Image as ImageIcon, Paintbrush, Sparkles } from "lucide-react";
import { useState, useEffect, memo, useRef } from "react";
import { HeroIllustration } from "./HeroIllustration";
import * as AllPalettes from "@/data/palettes";
import type { Palette as PaletteType } from "@/data/palettes";

// Hex values to exclude — pure "filler" colors that look harsh or flat
const FILLER_COLORS = new Set([
    '#000000', '#FFFFFF', '#FFFF00', '#FF00FF', '#00FFFF',
    '#FF0000', '#00FF00', '#0000FF', '#39FF14',
]);

// Build a pool from the provided live palettes.
// Falls back to static palettes.ts if the live list is empty.
const buildPool = (live: PaletteType[]): string[][] => {
    const seenIds = new Set<string>();
    const pool: string[][] = [];

    // Combine live palettes with the full static set to guarantee a large, diverse pool (200+ palettes)
    const staticSet: PaletteType[] = [];
    Object.values(AllPalettes).forEach(v => {
        if (Array.isArray(v)) staticSet.push(...(v as PaletteType[]));
    });

    const source = [...live, ...staticSet];

    for (const p of source) {
        if (seenIds.has(p.id)) continue;
        if (!p.colors || p.colors.length < 5) continue;
        if (p.colors.some(c => FILLER_COLORS.has(c.toUpperCase()))) continue;
        const unique = new Set(p.colors.map(c => c.toUpperCase()));
        if (unique.size < p.colors.length) continue;
        seenIds.add(p.id);
        pool.push(p.colors);
    }

    // ✔ Shuffle using Fisher-Yates to ensure visually distinct palettes spread across columns
    for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    return pool;
};

export const Hero = memo(({ onBrowse, onMaker, onPickFromImage, onCustomize, livePalettes = [] }: {
    onBrowse: () => void;
    onMaker: () => void;
    onPickFromImage: () => void;
    onCustomize: () => void;
    livePalettes?: PaletteType[];   // ← actual site palettes from Supabase
}) => {
    // Build the pool from live palettes (sequential, no shuffle)
    const poolRef = useRef<string[][]>([]);
    const cursorRef = useRef(0);

    // Rebuild & shuffle whenever livePalettes updates
    useEffect(() => {
        const newPool = buildPool(livePalettes);
        poolRef.current = newPool;
        cursorRef.current = 0;
        // Immediately sync the state with newest pool to avoid stale/duplicate frames
        setHeroPalettes(getNextWindowFrom(newPool, 0));
    }, [livePalettes]);

    // 90 palettes per window = 30 per column
    // This ensures the CSS-scroll duplicate is completely off-screen
    const WINDOW = 90;

    // Helper: get next WINDOW palettes starting from a given cursor position
    const getNextWindowFrom = (pool: string[][], start: number): string[][] => {
        if (pool.length === 0) return [];
        const result: string[][] = [];
        for (let i = 0; i < WINDOW; i++) {
            result.push(pool[(start + i) % pool.length]);
        }
        cursorRef.current = (start + WINDOW) % pool.length;
        return result;
    };

    const getNextWindow = (): string[][] =>
        getNextWindowFrom(poolRef.current, cursorRef.current);

    const [heroPalettes, setHeroPalettes] = useState<string[][]>(() => {
        // Initial: use static pool so something renders immediately
        poolRef.current = buildPool([]);
        return getNextWindow();
    });
    const [isShuffling, setIsShuffling] = useState(false);

    const advanceColors = () => {
        setIsShuffling(true);
        setHeroPalettes(getNextWindow());
        setTimeout(() => setIsShuffling(false), 500);
    };

    // Cycle to next batch every 4 seconds
    useEffect(() => {
        const interval = setInterval(advanceColors, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative w-full overflow-hidden py-24 lg:py-32">
            {/* Minimal Background - Removed opaque background to allow global theme to show through */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                {/* Global background handles the base color and gradients now */}
            </div>

            <div className="container relative z-10 mx-auto px-4 md:px-6">
                <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
                    {/* Left Content */}
                    <div className="flex flex-col items-start gap-8 lg:pr-8">
                        <div className="space-y-6">
                            {/* AI Badge */}
                            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-mono font-medium text-primary animate-fade-in backdrop-blur-sm shadow-[0_0_15px_-5px_hsl(var(--primary)/0.3)]">
                                <Sparkles className="mr-2 h-3 w-3 fill-primary" />
                                <span>Powered by Chromatic Color Intelligence</span>
                            </div>

                            {/* Main Heading — colors sync with the foreground palette card */}
                            {/* heroPalettes[4] = same palette shown in the foreground card */}
                            <h1
                                className="font-display text-4xl xs:text-5xl font-bold leading-tight tracking-tight text-white md:text-7xl lg:text-8xl animate-fade-up transition-all duration-700 ease-in-out"
                                style={{
                                    textShadow: `0 0 40px ${heroPalettes[4]?.[2]}20`
                                }}
                            >
                                AI-Powered <span className="relative inline-block">
                                    <span
                                        className="transition-colors duration-700 ease-in-out"
                                        style={{
                                            color: heroPalettes[4]?.[1],
                                            textShadow: `0 0-24px ${heroPalettes[4]?.[1]}60`
                                        }}
                                    >
                                        Color
                                    </span>{" "}
                                    <span
                                        className="transition-colors duration-700 ease-in-out"
                                        style={{
                                            color: heroPalettes[4]?.[3],
                                            textShadow: `0 0 24px ${heroPalettes[4]?.[3]}60`
                                        }}
                                    >
                                        Palettes
                                    </span>
                                </span> <br className="hidden lg:block" />
                                for Modern Design
                            </h1>

                            {/* Description */}
                            <p className="max-w-[580px] font-mono text-sm xs:text-base text-secondary-foreground/80 md:text-lg animate-fade-up [animation-delay:0.1s] leading-relaxed">
                                Generate, customize, and share stunning color palettes powered by intelligent analysis and community creativity.
                            </p>
                        </div>

                        {/* Buttons Grid */}
                        <div className="flex flex-col gap-6 w-full max-w-[580px] animate-fade-up [animation-delay:0.2s]">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                <Button
                                    onClick={onBrowse}
                                    size="lg"
                                    className="h-12 xs:h-14 rounded-full bg-primary px-8 text-sm xs:text-base font-medium text-primary-foreground shadow-[0_0_20px_-5px_hsl(var(--primary)/0.5)] hover:shadow-[0_0_30px_-5px_hsl(var(--primary)/0.6)] hover:scale-[1.02] transition-all duration-300"
                                >
                                    <Search className="mr-2 h-4 w-4" />
                                    Browse Palettes
                                </Button>
                                <Button
                                    onClick={onPickFromImage}
                                    size="lg"
                                    className="h-12 xs:h-14 rounded-full border border-primary/20 bg-primary/5 px-8 text-sm xs:text-base font-medium text-primary backdrop-blur-sm hover:bg-primary/10 transition-all hover:scale-[1.02]"
                                >
                                    <ImageIcon className="mr-2 h-4 w-4" />
                                    From Image
                                </Button>
                                <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:col-span-2">
                                    <Button
                                        onClick={onMaker}
                                        variant="outline"
                                        size="lg"
                                        className="h-11 xs:h-12 rounded-full border-white/10 bg-white/5 px-4 text-[11px] xs:text-xs font-medium backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/20"
                                    >
                                        <Palette className="mr-2 h-4 w-4" />
                                        Maker
                                    </Button>
                                    <Button
                                        onClick={onCustomize}
                                        variant="outline"
                                        size="lg"
                                        className="h-11 xs:h-12 rounded-full border-white/10 bg-white/5 px-4 text-[11px] xs:text-xs font-medium backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/20"
                                    >
                                        <Paintbrush className="mr-2 h-4 w-4" />
                                        Customize
                                    </Button>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Right Visual Component */}
                    <div className="relative h-[350px] xs:h-[450px] lg:h-[650px] w-full animate-fade-in [animation-delay:0.3s]">
                        <HeroIllustration
                            palettes={heroPalettes}
                            isShuffling={isShuffling}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
});
