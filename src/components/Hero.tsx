import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Palette, Search, Image as ImageIcon, Paintbrush, Sparkles, Wand2 } from "lucide-react";
import { useState, useEffect, memo } from "react";
import { generateRandomColor } from "@/utils/colorUtils";
import { HeroIllustration } from "./HeroIllustration";

export const Hero = memo(({ onBrowse, onMaker, onPickFromImage, onCustomize }: { onBrowse: () => void; onMaker: () => void; onPickFromImage: () => void; onCustomize: () => void }) => {
    // Initial hero palettes state (increased for unique background variety)
    const [heroPalettes, setHeroPalettes] = useState(
        Array(24).fill(null).map(() =>
            Array(4).fill(null).map(() => generateRandomColor())
        )
    );

    const [isShuffling, setIsShuffling] = useState(false);

    // Shuffle colors function
    const shuffleColors = () => {
        setIsShuffling(true);
        // Generate 24 new unique palettes
        const newPalettes = Array(24).fill(null).map(() =>
            Array(4).fill(null).map(() => generateRandomColor())
        );

        setHeroPalettes(newPalettes);

        // Reset shuffling state for animation capability
        setTimeout(() => setIsShuffling(false), 500);
    };

    // Auto-shuffle timer
    useEffect(() => {
        // Auto-shuffle every 3 seconds
        const autoShuffleInterval = setInterval(() => {
            shuffleColors();
        }, 3000);

        return () => clearInterval(autoShuffleInterval);
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
                                AI-Powered <span className="relative inline-block">
                                    <span
                                        className="transition-colors duration-700 ease-in-out"
                                        style={{ color: heroPalettes[0][0] }}
                                    >
                                        Color
                                    </span>{" "}
                                    <span
                                        className="transition-colors duration-700 ease-in-out"
                                        style={{ color: heroPalettes[0][1] }}
                                    >
                                        Palettes
                                    </span>
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

                        </div>
                    </div>

                    {/* Right Visual Component */}
                    <div className="relative h-[500px] lg:h-[650px] w-full animate-fade-in [animation-delay:0.3s]">
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

