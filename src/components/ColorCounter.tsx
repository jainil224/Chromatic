import { Palette } from "lucide-react";
import { cn } from "@/lib/utils";

interface ColorCounterProps {
    totalPalettes: number;
    className?: string;
}

export const ColorCounter = ({ totalPalettes, className }: ColorCounterProps) => {
    return (
        <div
            className={cn(
                "fixed top-4 left-4 z-[100]",
                "inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full",
                "bg-gradient-to-r from-amber-500/95 via-yellow-500/95 to-amber-600/95",
                "shadow-[0_4px_20px_rgba(251,191,36,0.4)] hover:shadow-[0_6px_30px_rgba(251,191,36,0.6)]",
                "border border-amber-300/30",
                "backdrop-blur-sm",
                "transition-all duration-300 ease-out",
                "hover:scale-[1.02]",
                "group cursor-default",
                className
            )}
        >
            <span className="text-xl">🎨</span>

            <div className="flex items-center gap-2">
                <span className="font-sans text-[11px] font-medium uppercase tracking-[0.08em] text-amber-50/90 whitespace-nowrap">
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
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400/0 via-yellow-300/20 to-amber-500/0 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300 -z-10" />
        </div>
    );
};
