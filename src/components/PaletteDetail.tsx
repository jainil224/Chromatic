import { useState, useRef, useCallback } from "react";
import { Download, Loader2, Heart } from "lucide-react";
import { toPng } from "html-to-image";
import { toast } from "sonner";
import type { Palette } from "@/data/palettes";
import { ColorSwatch } from "./ColorSwatch";
import { CodeDisplay } from "./CodeDisplay";
import { PaletteExportCard } from "./PaletteExportCard";
import { Button } from "@/components/ui/button";

interface PaletteDetailProps {
  palette: Palette;
  likeCount?: number;
  isLiked?: boolean;
  onToggleLike?: (id: string) => void;
}

export function PaletteDetail({
  palette,
  likeCount = 0,
  isLiked = false,
  onToggleLike
}: PaletteDetailProps) {
  const [isExporting, setIsExporting] = useState(false);
  const exportCardRef = useRef<HTMLDivElement>(null);

  const handleExport = useCallback(async () => {
    if (exportCardRef.current === null) {
      return;
    }

    try {
      setIsExporting(true);

      // Small delay to ensure render
      await new Promise(resolve => setTimeout(resolve, 100));

      const dataUrl = await toPng(exportCardRef.current, {
        cacheBust: true,
        pixelRatio: 2, // Higher quality
        backgroundColor: '#000000', // Ensure dark bg doesn't show transparently if theme varies
      });

      const link = document.createElement('a');
      link.download = `${palette.name.toLowerCase().replace(/\s+/g, '-')}-palette.png`;
      link.href = dataUrl;
      link.click();

      toast.success("Palette image exported!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to export image");
    } finally {
      setIsExporting(false);
    }
  }, [palette.name]);

  return (
    <div className="space-y-8 relative">
      {/* Hidden Export Card */}
      <div className="absolute left-[9999px] top-0 overflow-hidden pointer-events-none opacity-0">
        <PaletteExportCard ref={exportCardRef} palette={palette} />
      </div>

      {/* Header */}
      <div className="space-y-2 opacity-0 animate-fade-up" style={{ animationDelay: "0.1s" }}>
        <div className="flex items-start justify-between gap-4">
          <h2 className="font-display text-4xl italic text-foreground md:text-5xl">
            {palette.name}
          </h2>
          <div className="flex items-center gap-2">
            {onToggleLike && (
              <div className="flex items-center gap-1.5 mr-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    onToggleLike(palette.id);
                  }}
                  className="transition-transform active:scale-90 hover:scale-110 p-2 rounded-full hover:bg-secondary"
                  aria-label={isLiked ? "Unlike palette" : "Like palette"}
                >
                  <Heart
                    className={`h-5 w-5 transition-all duration-300 ${isLiked
                      ? "fill-red-500 text-red-500 animate-[heart-pulse_0.3s_ease-in-out]"
                      : "text-secondary-foreground/60 hover:text-red-400"
                      }`}
                  />
                </button>
                <span className="font-mono text-sm text-secondary-foreground/60 tabular-nums">
                  {(() => {
                    if (likeCount >= 1000000) return `${(likeCount / 1000000).toFixed(1)}M`;
                    if (likeCount >= 1000) return `${(likeCount / 1000).toFixed(1)}K`;
                    return likeCount.toString();
                  })()}
                </span>
              </div>
            )}
            <Button
              variant="outline"
              size="icon"
              onClick={handleExport}
              disabled={isExporting}
              className="shrink-0 rounded-full hover:bg-secondary"
              title="Export as Image"
            >
              {isExporting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Download className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
        <p className="font-mono text-sm text-secondary-foreground/70">
          {palette.colors.length} colors · Click any swatch to copy
        </p>
      </div>

      {/* Color Swatches */}
      <div className="overflow-hidden rounded-xl opacity-0 animate-fade-up" style={{ animationDelay: "0.2s" }}>
        <div className="flex h-48 md:h-64">
          {palette.colors.map((color, index) => (
            <ColorSwatch key={color} color={color} index={index} />
          ))}
        </div>
      </div>

      {/* Hex Values Grid */}
      <div className="grid grid-cols-5 gap-2 opacity-0 animate-fade-up" style={{ animationDelay: "0.3s" }}>
        {palette.colors.map((color, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-2 rounded-lg border border-border bg-card p-3"
          >
            <div
              className="h-8 w-8 rounded-md shadow-sm"
              style={{ backgroundColor: color }}
            />
            <span className="font-mono text-[10px] uppercase tracking-wider text-secondary-foreground/60">
              {color}
            </span>
          </div>
        ))}
      </div>

      {/* Code Display */}
      <CodeDisplay palette={palette} />
    </div>
  );
}
