import type { Palette } from "@/data/palettes";

interface PaletteCardProps {
  palette: Palette;
  isSelected: boolean;
  onClick: () => void;
  index: number;
  animationOffset?: number;
}

export function PaletteCard({ palette, isSelected, onClick, index, animationOffset = 0 }: PaletteCardProps) {
  return (
    <button
      onClick={onClick}
      className={`group relative w-full overflow-hidden rounded-lg border bg-card p-4 text-left transition-all duration-300 opacity-0 animate-fade-up ${
        isSelected
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

      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
          <svg className="h-3 w-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
    </button>
  );
}
