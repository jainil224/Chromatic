import { Palette, Image as ImageIcon, MousePointer2, Moon, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

export const WhyChromatic = ({ themeMode }: { themeMode?: 'light' | 'dark' | 'midnight' }) => {
    return (
        <section className="relative w-full py-24 lg:py-32 overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute inset-x-0 top-1/2 -z-10 h-[500px] -translate-y-1/2 bg-primary/5 blur-[120px] opacity-50" />

            <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
                <div className="mb-16 text-center lg:mb-24">
                    <h2 className="mb-4 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl animate-fade-up">
                        Why <span className="text-primary italic">Chromatic?</span>
                    </h2>
                    <p className="mx-auto max-w-2xl font-mono text-sm text-secondary-foreground/70 sm:text-base animate-fade-up [animation-delay:0.1s]">
                        Everything you need to discover, create, and export perfect color palettes.
                    </p>
                </div>

                {/* SEO Description Content */}
                <div className={cn(
                    "mb-16 rounded-3xl border p-8 md:p-12 backdrop-blur-xl transition-all duration-500 animate-fade-up",
                    themeMode === 'light'
                        ? "border-orange-500/10 bg-white/40 shadow-[0_20px_50px_-20px_rgba(249,115,22,0.1)]"
                        : themeMode === 'midnight'
                            ? "border-blue-500/20 bg-[#0a1229]/60 shadow-[0_20px_50px_-20px_rgba(59,130,246,0.15)]"
                            : "border-white/5 bg-[#121212]/40 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)]"
                )}>
                    <h3 className="mb-6 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                        Chromatic Color Palette – Find Perfect Color Combinations
                    </h3>

                    <div className="space-y-4 font-mono text-sm leading-relaxed text-secondary-foreground/80 sm:text-base">
                        <p className="opacity-0 animate-fade-up [animation-delay:0.2s] [animation-fill-mode:forwards]">
                            Chromatic Color Palette is a powerful and easy-to-use <strong>online color palette generator</strong> and <strong>gradient tool</strong> that helps designers, developers, and creatives discover beautiful color schemes.
                        </p>

                        <p className="opacity-0 animate-fade-up [animation-delay:0.4s] [animation-fill-mode:forwards]">
                            Browse trending color combinations, generate <strong>custom palettes</strong>, and copy HEX, RGB, and HSL values instantly. Whether you're building a website, mobile app, logo, or UI design, Chromatic makes <strong>color selection</strong> fast and effortless with our <strong>image color extractor</strong>.
                        </p>

                        <p className="opacity-0 animate-fade-up [animation-delay:0.6s] [animation-fill-mode:forwards]">
                            Our platform is a free <strong>professional color tool</strong>, optimized for <strong>creative workflows</strong>. No sign-up required—just pure inspiration for your next project.
                        </p>
                    </div>

                    {/* Footer Attribution */}
                    <div className="absolute bottom-4 right-6 sm:bottom-6 sm:right-8 opacity-40 hover:opacity-100 transition-opacity">
                        <span className="flex items-center gap-1.5 font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-secondary-foreground">
                            Made with <Heart className="h-3 w-3 fill-red-500 text-red-500 animate-pulse" /> by Chromatic
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};
