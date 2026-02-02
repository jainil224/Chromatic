import type { Palette } from "@/data/palettes";
import { ColorSwatch } from "./ColorSwatch";
import { CodeDisplay } from "./CodeDisplay";

interface PaletteDetailProps {
  palette: Palette;
}

export function PaletteDetail({ palette }: PaletteDetailProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2 opacity-0 animate-fade-up" style={{ animationDelay: "0.1s" }}>
        <h2 className="font-display text-4xl italic text-foreground md:text-5xl">
          {palette.name}
        </h2>
        <p className="font-mono text-sm text-muted-foreground">
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
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
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
