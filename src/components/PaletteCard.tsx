import { memo, useState } from "react";
import type { Palette } from "@/data/palettes";
import { Heart, Trash2, Share2 } from "lucide-react";
import { toast } from "sonner";
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
  // Admin-only props
  isAdmin?: boolean;
  onAdminDelete?: (id: string) => void;
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
  isAdmin = false,
  onAdminDelete,
}: PaletteCardProps) {
  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const shareData = {
      title: `Chromatic - ${palette.name}`,
      text: `Check out this color palette: ${palette.name}`,
      url: window.location.href, // This might need refinement if URL changes per palette
    };

    if (navigator.share) {
      navigator.share(shareData).catch(err => {
        if (err.name !== 'AbortError') toast.error("Sharing failed");
      });
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => {
        toast.success("Link copied to clipboard!");
      });
    }
  };

  const [deleteConfirm, setDeleteConfirm] = useState(false);
  // Show "NEW" badge only if tag exists AND approved within last 3 days
  const isNewArrival = (() => {
    if (!palette.tags?.includes('new_arrival')) return false;
    // Only show NEW if we have a known approval timestamp AND it's within 3 days
    if (!palette.approved_at) return false;
    const elapsed = Date.now() - new Date(palette.approved_at).getTime();
    return elapsed < 3 * 24 * 60 * 60 * 1000; // 3 days in ms
  })();

  // Filter out new_arrival from visible tags (it's shown as a badge instead)
  const visibleTags = palette.tags?.filter(t => t !== 'new_arrival').slice(0, 3) ?? [];

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
        className={`palette-card-btn group relative w-full overflow-hidden rounded-lg border bg-card p-3 sm:p-4 text-left transition-all duration-300 opacity-0 animate-fade-up ${isSelected
          ? "border-primary glow-accent"
          : "border-border hover:border-secondary-foreground/30"
          }`}
        style={{ animationDelay: `${animationOffset + index * 0.02}s` }}
      >

        {/* Color Preview */}
        <div className="mb-3 sm:mb-4 relative flex h-12 sm:h-14 overflow-hidden rounded-xl bg-black/20 ring-1 ring-white/10 group-hover:ring-white/20 transition-all">
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

          {/* NEW badge — for community new arrivals (teal) */}
          {isNewArrival && (
            <div
              className="absolute top-1.5 left-1.5 flex items-center gap-1 px-2 py-0.5 rounded-full font-black uppercase select-none pointer-events-none"
              style={{
                fontSize: 9,
                letterSpacing: '0.15em',
                background: 'linear-gradient(135deg, #00f5d4, #06b6d4)',
                color: '#000',
                boxShadow: '0 0 8px #00f5d460, 0 0 16px #00f5d420',
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
              }}
            >
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#000', display: 'inline-block', opacity: 0.5 }} />
              NEW
            </div>
          )}

          {/* NEW badge — for user-created palettes (amber/gold) */}
          {isCustom && !isNewArrival && (
            <div
              className="absolute top-1.5 left-1.5 flex items-center gap-1 px-2.5 py-1 rounded-full font-black uppercase select-none pointer-events-none"
              style={{
                fontSize: 9,
                letterSpacing: '0.15em',
                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                color: '#000',
                boxShadow: '0 0 10px rgba(245,158,11,0.45), 0 0 20px rgba(245,158,11,0.2)',
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
              }}
            >
              ✦ NEW
            </div>
          )}
        </div>

        {/* Info */}
        <div className="space-y-1.5 sm:space-y-2 pr-8">
          <h3 className="font-display text-sm sm:text-lg text-foreground tracking-tight transition-colors group-hover:text-primary truncate">
            {palette.name}
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {visibleTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/[0.03] border border-white/5 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-secondary-foreground/70 transition-colors group-hover:border-white/10 group-hover:bg-white/[0.05]"
              >
                {tag}
              </span>
            ))}
          </div>
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

        {/* Admin Delete Button — only visible when admin is logged in */}
        {isAdmin && onAdminDelete && (
          deleteConfirm ? (
            // Confirm state: show Yes/Cancel
            <div className="flex items-center gap-1 animate-fade-up">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onAdminDelete(palette.id);
                  setDeleteConfirm(false);
                }}
                className="flex h-7 items-center gap-1 rounded-full bg-red-600 px-2.5 text-[10px] font-black uppercase tracking-wider text-white transition-all hover:bg-red-500"
                aria-label="Confirm delete"
              >
                Delete
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setDeleteConfirm(false);
                }}
                className="flex h-7 items-center rounded-full border border-white/10 bg-secondary/80 px-2.5 text-[10px] font-bold uppercase text-secondary-foreground/70 transition-all hover:bg-secondary"
                aria-label="Cancel delete"
              >
                Cancel
              </button>
            </div>
          ) : (
            // Default state: subtle trash icon
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setDeleteConfirm(true);
              }}
              className="flex h-8 w-8 items-center justify-center rounded-full text-red-500/40 transition-all hover:bg-red-500/10 hover:text-red-500 opacity-0 group-hover:opacity-100"
              aria-label="Delete palette (admin)"
              title="Admin: Remove from site"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          )
        )}

        {/* Favorite Button */}
        {onToggleFavorite && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleFavorite(palette.id);
            }}
            className={`flex h-10 w-10 sm:h-8 sm:w-8 items-center justify-center rounded-full transition-all hover:bg-secondary ${isFavorite ? "text-red-500 hover:text-red-600" : "text-secondary-foreground/60 hover:text-red-500"
              }`}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
          </button>
        )}

        {/* Share Button */}
        <button
          type="button"
          onClick={handleShare}
          className="flex h-10 w-10 sm:h-8 sm:w-8 items-center justify-center rounded-full text-secondary-foreground/60 transition-all hover:bg-secondary hover:text-primary"
          aria-label="Share palette"
          title="Share"
        >
          <Share2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
});
