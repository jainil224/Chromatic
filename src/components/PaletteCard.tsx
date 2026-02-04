import type { Palette } from "@/data/palettes";
import { Heart } from "lucide-react";

interface PaletteCardProps {
  palette: Palette;
  isSelected: boolean;
  onClick: () => void;
  index: number;
  animationOffset?: number;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
}

export function PaletteCard({
  palette,
  isSelected,
  onClick,
  index,
  animationOffset = 0,
  isFavorite = false,
  onToggleFavorite
}: PaletteCardProps) {
  return (
    <div className="relative group">
      <button
        onClick={onClick}
        className={`group relative w-full overflow-hidden rounded-lg border bg-card p-4 text-left transition-all duration-300 opacity-0 animate-fade-up ${isSelected
          ? "border-primary glow-accent"
          : "border-border hover:border-muted-foreground/50"
          }`}
        style={{ animationDelay: `${animationOffset + index * 0.02}s` }}
      >
        {/* Color Preview */}
        <div className="mb-4 flex h-14 overflow-hidden rounded-md">
          {palette.colors.map((color, i) => (
            <div
              key={i}
              className="flex-1 transition-transform duration-300 first:rounded-l-md last:rounded-r-md group-hover:scale-y-105 cursor-help"
              style={{
                backgroundColor: color,
                transitionDelay: `${i * 20}ms`
              }}
              title={color}
            />
          ))}
        </div>

        {/* Info */}
        <div className="space-y-1.5 pr-8">
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

        {/* Selection Indicator */}
        {isSelected && (
          <div className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-primary/20 pointer-events-none">
            <svg className="h-3 w-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
      </button>

      {/* Favorite Button */}
      {onToggleFavorite && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(palette.id);
          }}
          className={`absolute right-4 bottom-4 z-10 flex h-8 w-8 items-center justify-center rounded-full text-foreground/80 transition-all hover:bg-muted ${isFavorite ? "text-red-500 hover:text-red-600" : "text-muted-foreground hover:text-red-500"
            }`}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
        </button>
      )}
    </div>
  );
}
