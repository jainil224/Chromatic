import { memo } from "react";
import type { Palette } from "@/data/palettes";
import { Heart, MoreVertical, Edit2, Trash2, Sparkles } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface PaletteCardProps {
  palette: Palette;
  isSelected: boolean;
  onClick: () => void;
  index: number;
  animationOffset?: number;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
  isCustom?: boolean;
  onEdit?: (palette: any) => void;
  onDelete?: (id: string) => void;
  likeCount?: number;
  isLiked?: boolean;
  onToggleLike?: (id: string) => void;
}

export const PaletteCard = memo(function PaletteCard({
  palette,
  isSelected,
  onClick,
  index,
  animationOffset = 0,
  isFavorite = false,
  onToggleFavorite,
  isCustom = false,
  onEdit,
  onDelete,
  likeCount = 0,
  isLiked = false,
  onToggleLike
}: PaletteCardProps) {
  return (
    <div className="relative group">
      <div
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick();
          }
        }}
        className={`palette-card-btn group relative w-full overflow-hidden rounded-lg border bg-card p-4 text-left transition-all duration-300 opacity-0 animate-fade-up ${isSelected
          ? "border-primary glow-accent"
          : "border-border hover:border-secondary-foreground/30"
          }`}
        style={{ animationDelay: `${animationOffset + index * 0.02}s` }}
      >

        {/* Color Preview */}
        <div className="mb-4 flex h-14 overflow-hidden rounded-xl bg-black/20 ring-1 ring-white/10 group-hover:ring-white/20 transition-all">
          {palette.colors.map((color, i) => (
            <div
              key={i}
              className="flex-1 transition-transform duration-500 first:rounded-l-xl last:rounded-r-xl group-hover:scale-y-110 cursor-help"
              style={{
                backgroundColor: color,
                transitionDelay: `${i * 30}ms`
              }}
              title={color}
            />
          ))}
        </div>

        {/* Info */}
        <div className="space-y-2 pr-8">
          <h3 className="font-display text-lg text-foreground tracking-tight transition-colors group-hover:text-primary truncate">
            {palette.name}
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {palette.tags?.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/[0.03] border border-white/5 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-secondary-foreground/60 transition-colors group-hover:border-white/10 group-hover:bg-white/[0.05]"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Like Counter */}
          {onToggleLike && (
            <div className="flex items-center gap-1.5 mt-3 opacity-60 group-hover:opacity-100 transition-opacity">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onToggleLike(palette.id);
                }}
                className="transition-transform active:scale-90 hover:scale-110"
                aria-label={isLiked ? "Unlike palette" : "Like palette"}
              >
                <Heart
                  className={`h-3.5 w-3.5 transition-all duration-300 ${isLiked
                    ? "fill-red-500 text-red-500 animate-[heart-pulse_0.3s_ease-in-out]"
                    : "text-secondary-foreground/60 hover:text-red-400"
                    }`}
                />
              </button>
              <span className="font-mono text-[10px] text-secondary-foreground/60 tabular-nums uppercase tracking-tighter">
                {(() => {
                  if (likeCount >= 1000000) return `${(likeCount / 1000000).toFixed(1)}M`;
                  if (likeCount >= 1000) return `${(likeCount / 1000).toFixed(1)}K`;
                  return likeCount.toString();
                })()}
              </span>
            </div>
          )}
        </div>

        {/* Shimmer effect overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-700">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-[premium-shimmer_4s_infinite]" />
        </div>

        {/* Selection Indicator */}
        {isSelected && !isCustom && (
          <div className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-primary/20 pointer-events-none ring-1 ring-primary/30">
            <svg className="h-2.5 w-2.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
      </div>

      {/* Action Buttons Container */}
      <div className="absolute right-4 bottom-4 z-10 flex items-center gap-1">

        {/* Favorite Button */}
        {onToggleFavorite && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleFavorite(palette.id);
            }}
            className={`flex h-8 w-8 items-center justify-center rounded-full transition-all hover:bg-secondary ${isFavorite ? "text-red-500 hover:text-red-600" : "text-secondary-foreground/60 hover:text-red-500"
              }`}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
          </button>
        )}
      </div>
    </div>
  );
});
