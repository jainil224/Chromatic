import { Palette } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ThemeMode } from "@/components/ModeToggle";

interface ColorCounterProps {
    totalPalettes: number;
    className?: string;
    themeMode?: ThemeMode;
}

export const ColorCounter = ({ totalPalettes, className, themeMode = "dark" }: ColorCounterProps) => {
    // Theme-specific styles
    const themeStyles = {
        dark: {
            bg: "from-amber-500/95 via-yellow-500/95 to-amber-600/95",
            shadow: "shadow-[0_4px_20px_rgba(251,191,36,0.4)] hover:shadow-[0_6px_30px_rgba(251,191,36,0.6)]",
            border: "border-amber-300/30",
            text: "text-amber-50/90",
            hoverGlow: "from-amber-400/0 via-yellow-300/20 to-amber-500/0"
        },
        light: {
            bg: "from-orange-500/95 via-amber-500/95 to-orange-600/95",
            shadow: "shadow-[0_4px_20px_rgba(249,115,22,0.3)] hover:shadow-[0_6px_30px_rgba(249,115,22,0.5)]",
            border: "border-orange-300/40",
            text: "text-orange-50",
            hoverGlow: "from-orange-400/0 via-amber-300/20 to-orange-500/0"
        },
        midnight: {
            bg: "from-blue-600/95 via-indigo-500/95 to-blue-700/95",
            shadow: "shadow-[0_4px_20px_rgba(59,130,246,0.4)] hover:shadow-[0_6px_30px_rgba(59,130,246,0.6)]",
            border: "border-blue-300/30",
            text: "text-blue-50/90",
            hoverGlow: "from-blue-400/0 via-indigo-300/20 to-blue-500/0"
        }
    };

    const currentStyles = themeStyles[themeMode] || themeStyles.dark;

    return (
        <div
            className={cn(
                "fixed top-4 left-4 z-[100]",
                "inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full",
                "bg-gradient-to-r",
                currentStyles.bg,
                currentStyles.shadow,
                "border",
                currentStyles.border,
                "backdrop-blur-sm",
                "transition-all duration-300 ease-out",
                "hover:scale-[1.02]",
                "group cursor-default",
                className
            )}
        >
            <span className="text-xl">🎨</span>

            <div className="flex items-center gap-2">
                <span className={cn(
                    "font-sans text-[11px] font-medium uppercase tracking-[0.08em] whitespace-nowrap",
                    currentStyles.text
                )}>
                    COLORS PALETTES:
                </span>
                <span
                    className="font-sans text-base font-semibold text-white tabular-nums"
                    key={totalPalettes}
                    style={{
                        animation: "pop-in 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)"
                    }}
                >
                    {totalPalettes.toLocaleString()}
                </span>
            </div>

            {/* Subtle inner glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

            {/* Hover glow effect */}
            <div className={cn(
                "absolute inset-0 rounded-full bg-gradient-to-r opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300 -z-10",
                currentStyles.hoverGlow
            )} />
        </div>
    );
};
