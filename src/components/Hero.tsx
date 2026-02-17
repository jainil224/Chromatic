import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Palette, Search, Image as ImageIcon, Paintbrush, Sparkles, Wand2 } from "lucide-react";
import { useState, useEffect, memo } from "react";
import { generateRandomColor } from "@/utils/colorUtils";

export const Hero = memo(({ onBrowse, onMaker, onPickFromImage, onCustomize }: { onBrowse: () => void; onMaker: () => void; onPickFromImage: () => void; onCustomize: () => void }) => {
    // Initial hero palettes state
    const [heroPalettes, setHeroPalettes] = useState([
        ["#2D3436", "#636E72", "#B2BEC3", "#DFE6E9"], // Card 1
        ["#1A1A1A", "#4A4A4A", "#D4A373", "#E9EDC9"], // Card 2
        ["#001219", "#005F73", "#EE9B00", "#BB3E03"], // Card 3
        ["#0F0F0F", "#1C1C1C", "#C69C6D", "#8B5E34"]  // Card 4 (Center)
    ]);

    const [isShuffling, setIsShuffling] = useState(false);

    // Shuffle colors function
    const shuffleColors = () => {
        setIsShuffling(true);
        // Generate 4 new palettes with 4 colors each
        const newPalettes = Array(4).fill(null).map(() =>
            Array(4).fill(null).map(() => generateRandomColor())
        );

        setHeroPalettes(newPalettes);

        // Reset shuffling state for animation capability
        setTimeout(() => setIsShuffling(false), 500);
    };

    // Spacebar listener
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === 'Space') {
                e.preventDefault(); // Prevent scrolling
                shuffleColors();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <section className="relative w-full overflow-hidden py-24 lg:py-32">
            {/* Minimal Background */}
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

                            {/* Main Heading */}
                            <h1 className="font-display text-5xl font-bold leading-tight tracking-tight text-foreground md:text-7xl lg:text-8xl animate-fade-up">
                                AI-Powered <span className="text-primary relative inline-block">
                                    Color Palettes
                                    {/* Underline decoration */}
                                    <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                                        <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
                                    </svg>
                                </span> <br className="hidden lg:block" />
                                for Modern Design
                            </h1>

                            {/* Description */}
                            <p className="max-w-[580px] font-mono text-base text-secondary-foreground/80 md:text-lg animate-fade-up [animation-delay:0.1s] leading-relaxed">
                                Generate, customize, and share stunning color palettes powered by intelligent color analysis and community creativity.
                            </p>
                        </div>

                        {/* Buttons Grid */}
                        <div className="flex flex-col gap-6 w-full max-w-[580px] animate-fade-up [animation-delay:0.2s]">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Button
                                    onClick={onBrowse}
                                    size="lg"
                                    className="h-14 rounded-full bg-primary px-8 text-base font-medium text-primary-foreground shadow-[0_0_20px_-5px_hsl(var(--primary)/0.5)] hover:shadow-[0_0_30px_-5px_hsl(var(--primary)/0.6)] hover:scale-[1.02] transition-all duration-300"
                                >
                                    <Search className="mr-2 h-4 w-4" />
                                    Browse Palettes
                                </Button>
                                <Button
                                    onClick={onPickFromImage}
                                    size="lg"
                                    className="h-14 rounded-full border border-primary/20 bg-primary/5 px-8 text-base font-medium text-primary backdrop-blur-sm hover:bg-primary/10 transition-all hover:scale-[1.02]"
                                >
                                    <ImageIcon className="mr-2 h-4 w-4" />
                                    From Image
                                </Button>
                                <Button
                                    onClick={onMaker}
                                    variant="outline"
                                    size="lg"
                                    className="h-12 rounded-full border-white/10 bg-white/5 px-6 text-sm font-medium backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/20"
                                >
                                    <Palette className="mr-2 h-4 w-4" />
                                    Maker
                                </Button>
                                <Button
                                    onClick={onCustomize}
                                    variant="outline"
                                    size="lg"
                                    className="h-12 rounded-full border-white/10 bg-white/5 px-6 text-sm font-medium backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/20"
                                >
                                    <Paintbrush className="mr-2 h-4 w-4" />
                                    Customize
                                </Button>
                            </div>

                            {/* Interactive Hint & Social Proof */}
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground/60">
                                    <span className="animate-pulse">▶</span>
                                    <span>Press <span className="font-bold text-primary/80 border border-primary/20 rounded px-1 py-0.5 mx-0.5 bg-primary/5">SPACEBAR</span> to generate instantly</span>
                                </div>


                            </div>
                        </div>
                    </div>

                    {/* Right Visual Component */}
                    <div className="relative h-[500px] lg:h-[650px] w-full animate-fade-in [animation-delay:0.3s]">
                        <div className="absolute inset-0 flex items-center justify-center lg:block">
                            {/* Card 1: Top Left */}
                            <div
                                className="absolute lg:left-[5%] lg:top-[5%] left-[5%] top-[5%] z-10 w-64 lg:w-72 transition-all duration-500 ease-out has-shadow"
                                style={{
                                    animation: 'floating-1 12s ease-in-out infinite',
                                    transform: isShuffling ? 'scale(1.05) translateY(-5px)' : 'scale(1) translateY(0)'
                                }}
                            >
                                <div className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-2.5 backdrop-blur-3xl shadow-xl transition-all duration-500 hover:scale-[1.05] hover:-translate-y-2 hover:border-white/20 hover:shadow-[0_20px_60px_-15px_hsl(var(--primary)/0.2)] cursor-pointer ${isShuffling ? 'ring-2 ring-primary/60 shadow-[0_0_40px_hsl(var(--primary)/0.4)] border-primary/30' : ''}`}>
                                    <div className="h-4 w-full flex gap-1.5 mb-2 px-1">
                                        <div className="h-1.5 w-1.5 rounded-full bg-white/20 transition-colors group-hover:bg-red-500/50" />
                                        <div className="h-1.5 w-1.5 rounded-full bg-white/20 transition-colors group-hover:bg-amber-500/50" />
                                        <div className="h-1.5 w-1.5 rounded-full bg-white/20 transition-colors group-hover:bg-emerald-500/50" />
                                    </div>
                                    <div className="flex h-32 lg:h-36 w-full flex-col overflow-hidden rounded-xl bg-black/40 ring-1 ring-white/5 relative">
                                        {/* Flash Overlay */}
                                        <div className={`absolute inset-0 bg-white/30 z-10 pointer-events-none transition-opacity duration-300 ease-out ${isShuffling ? 'opacity-100' : 'opacity-0'}`} />

                                        {heroPalettes[0].map((color, i) => (
                                            <div key={i} className="flex-1 transition-colors duration-500 ease-in-out group-hover:scale-110" style={{ backgroundColor: color }} />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Card 2: Mid Left */}
                            <div
                                className="absolute lg:left-[15%] lg:top-[35%] left-[2%] bottom-[10%] z-20 w-64 lg:w-72 transition-all duration-500 ease-out has-shadow"
                                style={{
                                    animation: 'floating-2 15s ease-in-out infinite',
                                    transform: isShuffling ? 'scale(1.05) translateY(-5px)' : 'scale(1) translateY(0)'
                                }}
                            >
                                <div className={`group relative overflow-hidden rounded-2xl border border-primary/20 bg-primary/[0.02] p-2.5 backdrop-blur-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] transition-all duration-500 hover:scale-[1.05] hover:-translate-y-2 hover:border-primary/40 hover:shadow-[0_40px_100px_-15px_hsl(var(--primary)/0.3)] cursor-pointer ${isShuffling ? 'ring-2 ring-primary/60 shadow-[0_0_50px_hsl(var(--primary)/0.5)] border-primary/40' : ''}`}>
                                    <div className="h-4 w-full flex gap-1.5 mb-2 px-1">
                                        <div className="h-1.5 w-1.5 rounded-full bg-primary/40" />
                                        <div className="h-1.5 w-1.5 rounded-full bg-white/10" />
                                    </div>
                                    <div className="flex h-32 lg:h-36 w-full flex-col overflow-hidden rounded-xl bg-black/40 ring-1 ring-white/5 relative">
                                        {/* Flash Overlay */}
                                        <div className={`absolute inset-0 bg-white/30 z-10 pointer-events-none transition-opacity duration-300 ease-out ${isShuffling ? 'opacity-100' : 'opacity-0'}`} />

                                        {heroPalettes[1].map((color, i) => (
                                            <div key={i} className="flex-1 transition-colors duration-500 ease-in-out group-hover:scale-110" style={{ backgroundColor: color }} />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Card 3: Top Right */}
                            <div
                                className="absolute lg:right-[5%] lg:top-[15%] right-[5%] top-[10%] z-20 w-64 lg:w-72 transition-all duration-500 ease-out has-shadow"
                                style={{
                                    animation: 'floating-3 10s ease-in-out infinite',
                                    transform: isShuffling ? 'scale(1.05) translateY(-5px)' : 'scale(1) translateY(0)'
                                }}
                            >
                                <div className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-2.5 backdrop-blur-3xl shadow-xl transition-all duration-500 hover:scale-[1.05] hover:-translate-y-2 hover:border-white/25 hover:shadow-[0_20px_60px_-15px_rgba(255,255,255,0.1)] cursor-pointer ${isShuffling ? 'ring-2 ring-primary/60 shadow-[0_0_40px_hsl(var(--primary)/0.4)] border-primary/30' : ''}`}>
                                    <div className="flex h-32 lg:h-36 w-full flex-col overflow-hidden rounded-xl bg-black/40 ring-1 ring-white/5 relative">
                                        {/* Flash Overlay */}
                                        <div className={`absolute inset-0 bg-white/30 z-10 pointer-events-none transition-opacity duration-300 ease-out ${isShuffling ? 'opacity-100' : 'opacity-0'}`} />

                                        {heroPalettes[2].map((color, i) => (
                                            <div key={i} className="flex-1 transition-colors duration-500 ease-in-out group-hover:scale-110" style={{ backgroundColor: color }} />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Card 4: Foreground Center */}
                            <div
                                className="absolute lg:left-1/2 lg:top-1/2 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40 w-[280px] lg:w-80 transition-all duration-500 ease-out has-shadow"
                                style={{
                                    animation: 'floating-1 18s ease-in-out infinite reverse',
                                    transform: isShuffling ? 'translate(-50%, -50%) scale(1.05)' : 'translate(-50%, -50%) scale(1)'
                                }}
                            >
                                <div className={`group relative overflow-hidden rounded-3xl border border-primary/30 bg-black/60 p-4 backdrop-blur-[40px] shadow-[0_60px_120px_-20px_rgba(0,0,0,0.9)] transition-all duration-500 hover:scale-[1.05] hover:-translate-y-4 hover:border-primary/50 hover:shadow-[0_80px_150px_-25px_hsl(var(--primary)/0.4)] cursor-pointer ring-1 ring-white/10 ${isShuffling ? 'ring-2 ring-primary/60 shadow-[0_0_60px_hsl(var(--primary)/0.5)] border-primary/60' : ''}`}>
                                    <div className="flex h-40 lg:h-48 w-full flex-col overflow-hidden rounded-2xl bg-black/40 ring-1 ring-white/5 mb-4 relative">
                                        {/* Flash Overlay */}
                                        <div className={`absolute inset-0 bg-white/25 z-10 pointer-events-none transition-opacity duration-300 ease-out ${isShuffling ? 'opacity-100' : 'opacity-0'}`} />

                                        {heroPalettes[3].map((color, i) => (
                                            <div key={i} className="flex-1 transition-colors duration-500 ease-in-out group-hover:scale-110" style={{ backgroundColor: color }} />
                                        ))}
                                    </div>
                                    <div className="flex items-center justify-between px-1">
                                        <div className="flex flex-col gap-2">
                                            <div className="h-2 w-32 rounded-full bg-primary/20 group-hover:bg-primary/40 transition-colors" />
                                            <div className="h-1 w-20 rounded-full bg-white/5" />
                                        </div>
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 border border-primary/20 shadow-inner group-hover:bg-primary/20 transition-all">
                                            <Wand2 className="h-5 w-5 text-primary/60 group-hover:text-primary transition-colors" />
                                        </div>
                                    </div>

                                    {/* Shimmer overlay */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-700">
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-[premium-shimmer_3s_infinite]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
});

