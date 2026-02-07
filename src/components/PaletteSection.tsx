import { memo } from "react";
import type { Palette } from "@/data/palettes";
import { PaletteCard } from "./PaletteCard";
import { Moon, Sun } from "lucide-react";

interface PaletteSectionProps {
  title: string;
  subtitle?: string;
  mode: "dark" | "light";
  palettes: Palette[];
  selectedPalette: Palette | null;
  onSelectPalette: (palette: Palette) => void;
  animationOffset?: number;
  isFavorite?: (id: string) => boolean;
  onToggleFavorite?: (id: string) => void;
  gridClassName?: string;
  onEditPalette?: (palette: any) => void;
  onDeletePalette?: (id: string) => void;
  getLikeCount?: (id: string) => number;
  isPaletteLiked?: (id: string) => boolean;
  onToggleLike?: (id: string) => void;
}

export const PaletteSection = memo(function PaletteSection({
  title,
  subtitle,
  mode,
  palettes,
  selectedPalette,
  onSelectPalette,
  animationOffset = 0,
  isFavorite,
  onToggleFavorite,
  gridClassName,
  onEditPalette,
  onDeletePalette,
  getLikeCount,
  isPaletteLiked,
  onToggleLike,
}: PaletteSectionProps) {
  const Icon = mode === "dark" ? Moon : Sun;

  return (
    <section className="space-y-4">
      {title !== "All Palettes" && (
        <div
          className="flex items-center gap-3 opacity-0 animate-fade-up"
          style={{ animationDelay: `${animationOffset}s` }}
        >
          <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${mode === "dark" ? "bg-slate-800" : "bg-amber-100"
            }`}>
            <Icon className={`h-4 w-4 ${mode === "dark" ? "text-slate-300" : "text-amber-600"
              }`} />
          </div>
          <div>
            <h2 className="font-display text-xl text-foreground">{title}</h2>
            {subtitle ? (
              <p className="font-mono text-xs text-secondary-foreground/70 mt-0.5">
                {subtitle}
              </p>
            ) : (
              <p className="font-mono text-[10px] uppercase tracking-widest text-secondary-foreground/70">
                {palettes.length} palettes
              </p>
            )}
          </div>
        </div>
      )}

      <div className={`grid gap-3 ${gridClassName || "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"}`}>
        {palettes.map((palette, index) => (
          <PaletteCard
            key={palette.id}
            palette={palette}
            isSelected={selectedPalette?.id === palette.id}
            onClick={() => onSelectPalette(palette)}
            index={index}
            animationOffset={animationOffset + 0.1}
            isFavorite={isFavorite?.(palette.id)}
            onToggleFavorite={onToggleFavorite}
            isCustom={(palette as any).isCustom}
            onEdit={onEditPalette}
            onDelete={onDeletePalette}
            likeCount={getLikeCount?.(palette.id)}
            isLiked={isPaletteLiked?.(palette.id)}
            onToggleLike={onToggleLike}
          />
        ))}
      </div>
    </section>
  );
});
