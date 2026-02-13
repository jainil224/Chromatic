import { Github, ExternalLink } from "lucide-react";

export function AboutCreator() {
    return (
        <section className="relative py-24 overflow-hidden border-t border-white/5">
            {/* Top Separator Line (#ffd700 Gold with Shadow Animation) */}
            <div className="absolute top-0 left-0 right-0">
                <div className="h-[1px] bg-gradient-to-r from-transparent via-[#ffd700]/50 to-transparent" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-16 bg-[#ffd700]/10 blur-3xl animate-pulse -z-10" />
            </div>
            {/* Background Spotlight Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 relative">
                <div className="flex flex-col items-center mb-12 animate-fade-up">
                    <span className="text-[10px] uppercase tracking-[0.4em] text-primary/60 font-mono mb-4">
                        About the Creator
                    </span>
                    <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-center">
                        Curated by Yours Truly
                        <span
                            className="block text-2xl md:text-3xl font-light mt-2 italic font-mono animate-glitch"
                            style={{ color: '#fda4af' }}
                        >
                            — JAINIL PATEL —
                        </span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
                    {/* Left: Avatar with Glowing Ring */}
                    <div className="flex justify-center lg:justify-end animate-fade-in" style={{ animationDelay: "0.2s" }}>
                        <div className="relative group">
                            {/* Colorful Outer Ring (Thicker) */}
                            <div className="absolute -inset-[6px] bg-gradient-to-tr from-primary via-accent to-primary rounded-full opacity-100 animate-hue-rotate" />

                            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full bg-black flex items-center justify-center overflow-hidden border-4 border-black shadow-[0_0_60px_rgba(var(--primary),0.2)]">
                                <img
                                    src="/logo_1_upscaled.png?v=2"
                                    alt="Chromatic Color Palette Branding Logo"
                                    className="relative w-full h-full object-contain p-0 transition-all duration-700 scale-[1.6] translate-y-[12%]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right: Bio & CTAs */}
                    <div className="flex flex-col space-y-6 animate-fade-up" style={{ animationDelay: "0.4s" }}>
                        <div className="p-8 rounded-3xl glass-effect border border-white/5 relative overflow-hidden">
                            {/* Subtle Texture/Spotlight in card */}
                            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />

                            <p className="text-lg text-foreground/80 leading-relaxed font-light first-letter:text-4xl first-letter:font-display first-letter:text-primary first-letter:mr-1 first-letter:float-left">
                                I am a UI/UX designer and creative technologist with a profound focus on visual systems and the human experience within digital spaces.
                                Chromatic was built from the ground up to provide a premium, distraction-free sanctuary where designers and developers
                                can explore the emotional and psychological impact of color.
                            </p>

                            <p className="text-lg text-foreground/80 leading-relaxed font-light mt-4">
                                My work is rooted in the intersection of design theory and creative engineering, with a dedicated focus on
                                harmony, accessibility, and modern aesthetics. Whether crafting immersive interfaces or refining complex visual hierarchies,
                                I believe that every pixel and every hue should serve a specific, intentional purpose.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <a
                                href="https://github.com/jainil224"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-primary hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(var(--primary),0.4)] group"
                            >
                                <Github size={18} className="transition-transform group-hover:rotate-12" />
                                GitHub Profile
                            </a>
                            <a
                                href="https://jainilpatel.vercel.app/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 group"
                            >
                                <ExternalLink size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                View Portfolio
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
