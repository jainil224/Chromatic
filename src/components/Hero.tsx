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

                        {/* Action Cards Grid */}
                        <div className="w-full max-w-[580px] animate-fade-up [animation-delay:0.2s]">
                            {/* Primary CTA */}
                            <Button
                                onClick={onBrowse}
                                size="lg"
                                className="w-full h-12 xs:h-14 rounded-full bg-primary px-8 text-sm xs:text-base font-medium text-primary-foreground shadow-[0_0_20px_-5px_hsl(var(--primary)/0.5)] hover:shadow-[0_0_30px_-5px_hsl(var(--primary)/0.6)] hover:scale-[1.02] transition-all duration-300 mb-5"
                            >
                                <Search className="mr-2 h-4 w-4" />
                                Browse Palettes
                            </Button>

                            {/* Tool Cards */}
                            <div className="grid grid-cols-3 gap-3">
                                {/* Pixels Card */}
                                <button
                                    onClick={onPickFromImage}
                                    className="group relative flex flex-col items-center gap-3 p-4 sm:p-5 rounded-2xl border border-sky-500/10 bg-sky-500/5 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:scale-[1.04] hover:border-sky-500/30 hover:bg-sky-500/10 hover:shadow-[0_8px_30px_-10px_rgba(56,189,248,0.3)]"
                                >
                                    <div className="relative z-10 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 shadow-[0_4px_15px_-3px_rgba(56,189,248,0.5)] group-hover:shadow-[0_4px_20px_-3px_rgba(56,189,248,0.7)] transition-all">
                                        <ImageIcon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                                    </div>
                                    <div className="relative z-10 text-center">
                                        <p className="font-bold text-sm sm:text-base text-foreground">Extract</p>
                                        <p className="text-[10px] sm:text-xs text-secondary-foreground/50 mt-0.5 leading-tight">Colors from images</p>
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-sky-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                </button>

                                {/* Build Card */}
                                <button
                                    onClick={onMaker}
                                    className="group relative flex flex-col items-center gap-3 p-4 sm:p-5 rounded-2xl border border-amber-500/10 bg-amber-500/5 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:scale-[1.04] hover:border-amber-500/30 hover:bg-amber-500/10 hover:shadow-[0_8px_30px_-10px_rgba(245,158,11,0.3)]"
                                >
                                    <div className="relative z-10 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 shadow-[0_4px_15px_-3px_rgba(245,158,11,0.5)] group-hover:shadow-[0_4px_20px_-3px_rgba(245,158,11,0.7)] transition-all">
                                        <Palette className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                                    </div>
                                    <div className="relative z-10 text-center">
                                        <p className="font-bold text-sm sm:text-base text-foreground">Create</p>
                                        <p className="text-[10px] sm:text-xs text-secondary-foreground/50 mt-0.5 leading-tight">Build palettes</p>
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                </button>

                                {/* Tweak Card */}
                                <button
                                    onClick={onCustomize}
                                    className="group relative flex flex-col items-center gap-3 p-4 sm:p-5 rounded-2xl border border-violet-500/10 bg-violet-500/5 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:scale-[1.04] hover:border-violet-500/30 hover:bg-violet-500/10 hover:shadow-[0_8px_30px_-10px_rgba(139,92,246,0.3)]"
                                >
                                    <div className="relative z-10 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-violet-400 to-purple-600 shadow-[0_4px_15px_-3px_rgba(139,92,246,0.5)] group-hover:shadow-[0_4px_20px_-3px_rgba(139,92,246,0.7)] transition-all">
                                        <Paintbrush className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                                    </div>
                                    <div className="relative z-10 text-center">
                                        <p className="font-bold text-sm sm:text-base text-foreground">Customize</p>
                                        <p className="text-[10px] sm:text-xs text-secondary-foreground/50 mt-0.5 leading-tight">Fine-tune colors</p>
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                </button>
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
