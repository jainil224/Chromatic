import { Sun, Moon, Sparkles } from "lucide-react";

export type ThemeMode = "dark" | "light" | "midnight";

interface ModeToggleProps {
  mode: ThemeMode;
  onToggle: () => void;
}

export function ModeToggle({ mode, onToggle }: ModeToggleProps) {
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
    <button
      onClick={onToggle}
      className="group relative flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 transition-all duration-300 hover:border-primary/50 hover:bg-white/10"
      title={`Switch theme (Current: ${getLabel()})`}
    >
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground transition-colors group-hover:text-foreground">
          {getIcon()}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground group-hover:text-foreground">
          {getLabel()}
        </span>
      </div>

      {/* Visual State Indicator */}
      <div className="flex gap-1">
        <div className={`h-1 w-2 rounded-full transition-all duration-300 ${mode === 'dark' ? 'bg-primary w-4' : 'bg-white/10'}`} />
        <div className={`h-1 w-2 rounded-full transition-all duration-300 ${mode === 'light' ? 'bg-orange-400 w-4' : 'bg-white/10'}`} />
        <div className={`h-1 w-2 rounded-full transition-all duration-300 ${mode === 'midnight' ? 'bg-blue-400 w-4' : 'bg-white/10'}`} />
      </div>
    </button>
  );
}
