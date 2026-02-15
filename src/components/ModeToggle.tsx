import { Sun, Moon, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export type ThemeMode = "dark" | "light" | "midnight";

interface ModeToggleProps {
  mode: ThemeMode;
  onToggle: () => void;
  id?: string;
}

export function ModeToggle({ mode, onToggle, id }: ModeToggleProps) {
  const getIcon = () => {
    switch (mode) {
      case "light": return <Sun className="h-4 w-4" />;
      case "midnight": return <Sparkles className="h-4 w-4 text-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.5)]" />;
      default: return <Moon className="h-4 w-4" />;
    }
  };

  const getLabel = () => {
    switch (mode) {
      case "light": return "Light";
      case "midnight": return "Midnight";
      default: return "Dark";
    }
  };

  return (
    <div id={id} className="flex items-center gap-1 p-1 rounded-full border border-white/10 bg-black/20 backdrop-blur-md ring-1 ring-white/5 shadow-inner group/toggle">
      {(['dark', 'light', 'midnight'] as ThemeMode[]).map((t) => {
        const isActive = mode === t;
        const Icon = t === 'dark' ? Moon : t === 'light' ? Sun : Sparkles;

        return (
          <button
            key={t}
            onClick={onToggle}
            className={cn(
              "relative flex items-center justify-center h-8 w-8 rounded-full transition-all duration-300 cursor-pointer",
              isActive
                ? "bg-white/10 text-foreground shadow-[0_2px_10px_rgba(0,0,0,0.3)] ring-1 ring-white/10"
                : "text-secondary-foreground/40 hover:text-secondary-foreground/80 hover:bg-white/5"
            )}
            title={`Switch to ${t} (Current: ${mode})`}
          >
            <Icon className={cn(
              "h-3.5 w-3.5 transition-transform duration-500",
              isActive && "scale-110",
              t === 'midnight' && isActive && "text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]"
            )} />

            {isActive && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary animate-pulse" />
            )}
          </button>
        );
      })}
    </div>
  );
}
