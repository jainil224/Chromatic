import { useState } from "react";
import { Palette as PaletteIcon } from "lucide-react";
import { darkPalettes, lightPalettes, type Palette } from "@/data/palettes";
import { PaletteSection } from "@/components/PaletteSection";
import { PaletteDetail } from "@/components/PaletteDetail";
import { CustomPaletteCreator } from "@/components/CustomPaletteCreator";

const Index = () => {
  const [customDarkPalettes, setCustomDarkPalettes] = useState<Palette[]>([]);
  const [customLightPalettes, setCustomLightPalettes] = useState<Palette[]>([]);
  const [selectedPalette, setSelectedPalette] = useState<Palette | null>(darkPalettes[0]);

  const allDarkPalettes = [...darkPalettes, ...customDarkPalettes];
  const allLightPalettes = [...lightPalettes, ...customLightPalettes];

  const handleCreatePalette = (palette: Palette, mode: "dark" | "light") => {
    if (mode === "dark") {
      setCustomDarkPalettes((prev) => [...prev, palette]);
    } else {
      setCustomLightPalettes((prev) => [...prev, palette]);
    }
    setSelectedPalette(palette);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Gradient Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute -left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -right-1/4 bottom-0 h-[600px] w-[600px] rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-muted/30 blur-3xl" />
      </div>

      {/* Grain Overlay */}
      <div className="grain pointer-events-none fixed inset-0 -z-10" />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-12 text-center">
          <div className="inline-flex items-center gap-3 opacity-0 animate-fade-up">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <PaletteIcon className="h-6 w-6 text-primary" />
            </div>
            <div className="text-left">
              <h1 className="font-display text-3xl text-foreground">
                Chromatic
              </h1>
              <p className="font-mono text-xs text-muted-foreground">
                Curated Color Palettes
              </p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          {/* Left: Palette Sections */}
          <div className="space-y-10">
            {/* Custom Palette Creator */}
            <div className="opacity-0 animate-fade-up" style={{ animationDelay: "0.1s" }}>
              <CustomPaletteCreator onCreatePalette={handleCreatePalette} />
            </div>

            {/* Dark Palettes Section */}
            <PaletteSection
              title="Dark Palettes"
              mode="dark"
              palettes={allDarkPalettes}
              selectedPalette={selectedPalette}
              onSelectPalette={setSelectedPalette}
              animationOffset={0.2}
            />

            {/* Light Palettes Section */}
            <PaletteSection
              title="Light Palettes"
              mode="light"
              palettes={allLightPalettes}
              selectedPalette={selectedPalette}
              onSelectPalette={setSelectedPalette}
              animationOffset={0.4}
            />
          </div>

          {/* Right: Palette Detail */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            {selectedPalette ? (
              <PaletteDetail palette={selectedPalette} />
            ) : (
              <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-border">
                <p className="font-mono text-sm text-muted-foreground">
                  Select a palette to view details
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 border-t border-border pt-8 opacity-0 animate-fade-up" style={{ animationDelay: "0.8s" }}>
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="font-mono text-xs text-muted-foreground">
              Click any color to copy its hex value
            </p>
            <p className="font-mono text-xs text-dim">
              Built with care for designers & developers
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
