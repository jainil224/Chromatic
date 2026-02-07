import { Palette, Image as ImageIcon, MousePointer2, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
    {
        icon: Palette,
        title: "Curated Palettes",
        description: "Hand-picked color palettes crafted for modern UI and branding.",
        delay: "0.1s"
    },
    {
        icon: ImageIcon,
        title: "Image Color Extraction",
        description: "Instantly generate palettes by picking colors from any image.",
        delay: "0.2s"
    },
    {
        icon: MousePointer2,
        title: "One-Click Export",
        description: "Export palettes to CSS, Tailwind, or design tools.",
        delay: "0.3s"
    },
    {
        icon: Moon,
        title: "Built for Dark Mode",
        description: "Designed for focus, contrast, and long creative sessions.",
        delay: "0.4s"
    }
];

export const WhyChromatic = () => {
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

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={cn(
                                "group relative overflow-hidden rounded-3xl border border-white/5 bg-[#121212]/40 p-8",
                                "backdrop-blur-xl transition-all duration-300",
                                "hover:-translate-y-2 hover:border-primary/20 hover:bg-[#121212]/60",
                                "hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)]",
                                "animate-fade-up"
                            )}
                            style={{ animationDelay: feature.delay }}
                        >
                            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                                <feature.icon className="h-6 w-6" />
                            </div>

                            <h3 className="mb-3 font-display text-xl font-bold text-foreground">
                                {feature.title}
                            </h3>

                            <p className="font-mono text-xs leading-relaxed text-secondary-foreground/70 group-hover:text-foreground/80 transition-colors">
                                {feature.description}
                            </p>

                            {/* Decorative Corner Glow */}
                            <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-primary/10 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
