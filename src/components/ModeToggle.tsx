import { Sun, Moon } from "lucide-react";

interface ModeToggleProps {
  mode: "dark" | "light";
  onToggle: () => void;
}

export function ModeToggle({ mode, onToggle }: ModeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="group relative flex items-center gap-3 rounded-full border border-border bg-card px-5 py-2.5 transition-all duration-300 hover:border-primary/50 hover:glow-accent"
    >
      <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors group-hover:text-foreground">
        {mode === "dark" ? "Dark" : "Light"} Palettes
      </span>
      <div className="relative flex h-6 w-12 items-center rounded-full bg-muted p-1">
        <div
          className={`flex h-4 w-4 items-center justify-center rounded-full bg-primary transition-all duration-300 ${
            mode === "light" ? "translate-x-6" : "translate-x-0"
          }`}
        >
          {mode === "dark" ? (
            <Moon className="h-2.5 w-2.5 text-primary-foreground" />
          ) : (
            <Sun className="h-2.5 w-2.5 text-primary-foreground" />
          )}
        </div>
      </div>
    </button>
  );
}
