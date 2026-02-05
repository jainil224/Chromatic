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
      <button
        onClick={onClick}
        className={`palette-card-btn group relative w-full overflow-hidden rounded-lg border bg-card p-4 text-left transition-all duration-300 opacity-0 animate-fade-up ${isSelected
          ? "border-primary glow-accent"
          : "border-border hover:border-muted-foreground/50"
          }`}
        style={{ animationDelay: `${animationOffset + index * 0.02}s` }}
      >
        {/* Custom Badge */}
        {isCustom && (
          <div className="absolute left-3 top-3 z-10">
            <div className="flex items-center gap-1 rounded-full bg-primary/20 px-2 py-0.5 backdrop-blur-md border border-primary/30">
              <Sparkles className="h-2.5 w-2.5 text-primary fill-current" />
              <span className="font-mono text-[8px] font-bold uppercase tracking-tighter text-primary">
                Custom
              </span>
            </div>
          </div>
        )}

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
          <h3 className="font-display text-base text-foreground transition-colors group-hover:text-primary truncate">
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

          {/* Like Counter */}
          {onToggleLike && (
            <div className="flex items-center gap-1.5 mt-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleLike(palette.id);
                }}
                className="transition-transform active:scale-90 hover:scale-110"
                aria-label={isLiked ? "Unlike palette" : "Like palette"}
              >
                <Heart
                  className={`h-4 w-4 transition-all duration-200 ${isLiked
                      ? "fill-red-500 text-red-500 animate-[heart-pulse_0.3s_ease-in-out]"
                      : "text-muted-foreground hover:text-red-400"
                    }`}
                />
              </button>
              <span className="font-mono text-xs text-muted-foreground tabular-nums">
                {(() => {
                  if (likeCount >= 1000000) return `${(likeCount / 1000000).toFixed(1)}M`;
                  if (likeCount >= 1000) return `${(likeCount / 1000).toFixed(1)}K`;
                  return likeCount.toString();
                })()}
              </span>
            </div>
          )}
        </div>

        {/* Selection Indicator */}
        {isSelected && !isCustom && (
          <div className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-primary/20 pointer-events-none">
            <svg className="h-3 w-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
      </button>

      {/* Action Buttons Container */}
      <div className="absolute right-4 bottom-4 z-10 flex items-center gap-1">
        {/* User Palette Menu */}
        {isCustom && (onEdit || onDelete) && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-all hover:bg-muted hover:text-foreground">
                <MoreVertical className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-background border-border">
              {onEdit && (
                <DropdownMenuItem onClick={() => onEdit(palette)} className="flex items-center gap-2 cursor-pointer">
                  <Edit2 className="h-3.5 w-3.5" />
                  <span>Edit Palette</span>
                </DropdownMenuItem>
              )}
              {onDelete && (
                <DropdownMenuItem
                  onClick={() => onDelete(palette.id)}
                  className="flex items-center gap-2 cursor-pointer text-destructive focus:text-destructive"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>Delete Palette</span>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {/* Favorite Button */}
        {onToggleFavorite && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(palette.id);
            }}
            className={`flex h-8 w-8 items-center justify-center rounded-full transition-all hover:bg-muted ${isFavorite ? "text-red-500 hover:text-red-600" : "text-muted-foreground hover:text-red-500"
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
