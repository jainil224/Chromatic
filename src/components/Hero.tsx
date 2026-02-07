import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Plus, Search } from "lucide-react";

export const Hero = ({ onBrowse, onCreate }: { onBrowse: () => void; onCreate: () => void }) => {
    return (
        <section className="relative w-full overflow-hidden py-24 lg:py-32">
            {/* Cinematic Gradient Background */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute inset-0 bg-background" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-foreground/5 to-transparent" />
                <div className="absolute -left-[10%] top-[-10%] h-[70%] w-[50%] rounded-[100%] bg-primary/10 blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
                <div className="absolute -right-[5%] bottom-[10%] h-[60%] w-[40%] rounded-[100%] bg-accent/5 blur-[100px] animate-pulse" style={{ animationDuration: '10s' }} />
            </div>

            <div className="container relative z-10 mx-auto px-4 md:px-6">
                <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                    {/* Left Content */}
                    <div className="flex flex-col items-start gap-8">
                        <div className="space-y-4">
                            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-mono text-primary animate-fade-in">
                                <span className="mr-2 h-1 w-1 rounded-full bg-primary animate-ping" />
                                New: Image-to-Palette Extractor
                            </div>
                            <h1 className="font-display text-5xl font-bold leading-tight tracking-tight text-foreground md:text-7xl lg:text-8xl animate-fade-up">
                                Curated <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-shimmer">Color Palettes</span> for Modern Design
                            </h1>
                            <p className="max-w-[540px] font-mono text-base text-muted-foreground md:text-lg animate-fade-up [animation-delay:0.1s]">
                                Explore hand-picked color palettes crafted for UI, branding, and creative projects. Designed for developers and creators.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-4 animate-fade-up [animation-delay:0.2s]">
                            <Button
                                onClick={onBrowse}
                                size="lg"
                                className="h-14 rounded-full bg-primary px-8 text-base font-medium text-primary-foreground hover:scale-105 transition-all hover:shadow-[0_0_30px_-5px_hsl(var(--primary)/0.5)]"
                            >
                                <Search className="mr-2 h-4 w-4" />
                                Browse Palettes
                            </Button>
                            <Button
                                onClick={onCreate}
                                variant="outline"
                                size="lg"
                                className="h-14 rounded-full border-white/10 bg-white/5 px-8 text-base font-medium backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/20"
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Create Your Own
                            </Button>
                        </div>
                    </div>

                    {/* Right Visual Component */}
                    <div className="relative h-auto w-full py-12 lg:h-[650px] animate-fade-in [animation-delay:0.3s]">
                        <div className="flex flex-col items-center gap-8 lg:absolute lg:inset-0 lg:block">
                            {/* 
                Structure Logic:
                - lg:absolute for desktop diagonal arrangement
                - flex-col for mobile vertical stacking
                - Wrapper div handles floating animation
                - Inner Card div handles hover interaction (lift, scale, border)
              */}

                            {/* Card 1: Top Left */}
                            <div
                                className="lg:absolute lg:left-[5%] lg:top-[5%] z-10 w-full max-w-[320px] lg:w-72"
                                style={{ animation: 'floating-1 8s ease-in-out infinite' }}
                            >
                                <div className="group relative overflow-hidden rounded-2xl border border-white/5 bg-[#121212]/40 p-2.5 backdrop-blur-md shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-2 hover:border-white/20 hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.5)] cursor-pointer">
                                    <div className="h-4 w-full flex gap-1 mb-2 px-1">
                                        <div className="h-1.5 w-1.5 rounded-full bg-white/10" />
                                        <div className="h-1.5 w-1.5 rounded-full bg-white/10" />
                                        <div className="h-1.5 w-1.5 rounded-full bg-white/10" />
                                    </div>
                                    <div className="flex h-36 w-full flex-col overflow-hidden rounded-xl bg-black/20">
                                        <div className="flex-1 bg-[#2D3436] transition-transform duration-500 group-hover:scale-105" />
                                        <div className="flex-1 bg-[#636E72] transition-transform duration-500 group-hover:scale-105" />
                                        <div className="flex-1 bg-[#B2BEC3] transition-transform duration-500 group-hover:scale-105" />
                                        <div className="flex-1 bg-[#DFE6E9] transition-transform duration-500 group-hover:scale-105" />
                                    </div>
                                    <div className="mt-2.5 flex items-center justify-between px-2">
                                        <div className="h-2 w-16 rounded-full bg-white/5" />
                                        <div className="h-4 w-4 rounded-full bg-white/5" />
                                    </div>
                                </div>
                            </div>

                            {/* Card 2: Mid Left */}
                            <div
                                className="lg:absolute lg:left-[15%] lg:top-[35%] z-30 w-full max-w-[320px] lg:w-72"
                                style={{ animation: 'floating-2 10s ease-in-out infinite' }}
                            >
                                <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#121212]/60 p-2.5 backdrop-blur-xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] transition-all duration-300 hover:scale-[1.02] hover:-translate-y-2 hover:border-primary/30 hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.7)] cursor-pointer">
                                    <div className="h-4 w-full flex gap-1 mb-2 px-1">
                                        <div className="h-1.5 w-1.5 rounded-full bg-primary/40" />
                                        <div className="h-1.5 w-1.5 rounded-full bg-white/10" />
                                        <div className="h-1.5 w-1.5 rounded-full bg-white/10" />
                                    </div>
                                    <div className="flex h-36 w-full flex-col overflow-hidden rounded-xl bg-black/20">
                                        <div className="flex-1 bg-[#1A1A1A] transition-transform duration-500 group-hover:scale-105" />
                                        <div className="flex-1 bg-[#4A4A4A] transition-transform duration-500 group-hover:scale-105" />
                                        <div className="flex-1 bg-[#D4A373] transition-transform duration-500 group-hover:scale-105" />
                                        <div className="flex-1 bg-[#E9EDC9] transition-transform duration-500 group-hover:scale-105" />
                                    </div>
                                    <div className="mt-2.5 flex items-center justify-between px-2">
                                        <div className="h-2 w-20 rounded-full bg-white/10" />
                                        <div className="h-5 w-5 rounded-lg bg-primary/20" />
                                    </div>
                                </div>
                            </div>

                            {/* Card 3: Top Right */}
                            <div
                                className="lg:absolute lg:right-[5%] lg:top-[15%] z-20 w-full max-w-[320px] lg:w-72"
                                style={{ animation: 'floating-3 7s ease-in-out infinite' }}
                            >
                                <div className="group relative overflow-hidden rounded-2xl border border-white/5 bg-[#121212]/30 p-2.5 backdrop-blur-sm shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-2 hover:border-white/20 hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.4)] cursor-pointer">
                                    <div className="flex h-36 w-full flex-col overflow-hidden rounded-xl bg-black/20">
                                        <div className="flex-1 bg-[#001219] transition-transform duration-500 group-hover:scale-105" />
                                        <div className="flex-1 bg-[#005F73] transition-transform duration-500 group-hover:scale-105" />
                                        <div className="flex-1 bg-[#EE9B00] transition-transform duration-500 group-hover:scale-105" />
                                        <div className="flex-1 bg-[#BB3E03] transition-transform duration-500 group-hover:scale-105" />
                                    </div>
                                    <div className="mt-2.5 flex items-center gap-2 px-2">
                                        <div className="h-1.5 w-1.5 rounded-full bg-accent/60" />
                                        <div className="h-2 w-24 rounded-full bg-white/5" />
                                    </div>
                                </div>
                            </div>

                            {/* Card 4: Foreground Center */}
                            <div
                                className="lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 z-40 w-full max-w-[340px] lg:w-80"
                                style={{ animation: 'floating-1 12s ease-in-out infinite reverse' }}
                            >
                                <div className="group relative overflow-hidden rounded-2xl border border-primary/20 bg-[#121212]/80 p-3 backdrop-blur-2xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.7)] transition-all duration-300 hover:scale-[1.03] hover:-translate-y-3 hover:border-primary/40 hover:shadow-[0_60px_120px_-25px_rgba(0,0,0,0.8)] cursor-pointer">
                                    <div className="flex h-48 w-full flex-col overflow-hidden rounded-xl bg-black/20">
                                        <div className="flex-1 bg-[#0F0F0F] transition-transform duration-500 group-hover:scale-105" />
                                        <div className="flex-1 bg-[#1C1C1C] transition-transform duration-500 group-hover:scale-105" />
                                        <div className="flex-1 bg-[#C69C6D] transition-transform duration-500 group-hover:scale-105" />
                                        <div className="flex-1 bg-[#8B5E34] transition-transform duration-500 group-hover:scale-105" />
                                    </div>
                                    <div className="mt-4 flex items-center justify-between px-2">
                                        <div className="flex flex-col gap-1.5">
                                            <div className="h-2.5 w-32 rounded-full bg-primary/30" />
                                            <div className="h-1.5 w-20 rounded-full bg-white/5" />
                                        </div>
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 border border-primary/20">
                                            <div className="h-4 w-4 rounded-full bg-primary/60 group-hover:bg-primary transition-colors" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Subtle Gradient Glow behing cards */}
                        <div className="absolute left-1/2 top-1/2 -z-10 h-[300px] w-full max-w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px] lg:h-[400px] lg:w-[400px] lg:bg-primary/10 lg:blur-[130px]" />
                    </div>
                </div>
            </div>
        </section>
    );
};
