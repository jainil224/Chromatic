import { Trash2 } from "lucide-react";
import type { Palette } from "@/data/palettes";

interface PaletteCardProps {
  palette: Palette;
  isSelected: boolean;
  onClick: () => void;
  onDelete?: () => void;
  index: number;
  animationOffset?: number;
}

export function PaletteCard({ palette, isSelected, onClick, onDelete, index, animationOffset = 0 }: PaletteCardProps) {
  return (
    <div
      className={`group relative w-full overflow-hidden rounded-lg border bg-card p-4 text-left transition-all duration-300 opacity-0 animate-fade-up ${
        isSelected
          ? "border-primary glow-accent"
          : "border-border hover:border-muted-foreground/50"
      }`}
      style={{ animationDelay: `${animationOffset + index * 0.02}s` }}
    >
      {/* Clickable Area */}
      <button onClick={onClick} className="w-full text-left">
        {/* Color Preview */}
        <div className="mb-4 flex h-14 overflow-hidden rounded-md">
          {palette.colors.map((color, i) => (
            <div
              key={i}
              className="flex-1 transition-transform duration-300 first:rounded-l-md last:rounded-r-md group-hover:scale-y-105"
              style={{ 
                backgroundColor: color,
                transitionDelay: `${i * 20}ms`
              }}
            />
          ))}
        </div>

        {/* Info */}
        <div className="space-y-1.5">
          <h3 className="font-display text-base text-foreground transition-colors group-hover:text-primary">
            {palette.name}
          </h3>
          <div className="flex flex-wrap gap-1">
            {palette.tags?.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-muted px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </button>

      {/* Selection Indicator */}
      {isSelected && !palette.isCustom && (
        <div className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
          <svg className="h-3 w-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}

      {/* Delete Button for Custom Palettes */}
      {palette.isCustom && onDelete && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-lg bg-destructive/10 text-destructive opacity-0 transition-all hover:bg-destructive hover:text-destructive-foreground group-hover:opacity-100"
          title="Delete palette"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      )}

      {/* Custom Badge */}
      {palette.isCustom && (
        <div className="absolute left-3 top-3 rounded-full bg-accent/20 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-accent">
          Custom
        </div>
      )}
    </div>
  );
}
