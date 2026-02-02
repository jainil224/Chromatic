import { useState, useEffect } from "react";
import { Palette as PaletteIcon } from "lucide-react";
import { darkPalettes, lightPalettes, type Palette } from "@/data/palettes";
import { ModeToggle } from "@/components/ModeToggle";
import { PaletteCard } from "@/components/PaletteCard";
import { PaletteDetail } from "@/components/PaletteDetail";

const Index = () => {
  const [mode, setMode] = useState<"dark" | "light">("dark");
  const [selectedPalette, setSelectedPalette] = useState<Palette | null>(null);

  const palettes = mode === "dark" ? darkPalettes : lightPalettes;

  // Select first palette on mode change
  useEffect(() => {
    setSelectedPalette(palettes[0]);
  }, [mode]);

  // Apply light-mode class to root
  useEffect(() => {
    if (mode === "light") {
      document.documentElement.classList.add("light-mode");
    } else {
      document.documentElement.classList.remove("light-mode");
    }
  }, [mode]);

  const toggleMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Gradient Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute -left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -right-1/4 bottom-0 h-[600px] w-[600px] rounded-full bg-accent/5 blur-3xl" />
      </div>

      {/* Grain Overlay */}
      <div className="grain pointer-events-none fixed inset-0 -z-10" />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3 opacity-0 animate-fade-up">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <PaletteIcon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="font-display text-2xl text-foreground">
                Chromatic
              </h1>
              <p className="font-mono text-xs text-muted-foreground">
                Curated Color Palettes
              </p>
            </div>
          </div>

          <div className="opacity-0 animate-fade-up stagger-2">
            <ModeToggle mode={mode} onToggle={toggleMode} />
          </div>
        </header>

        {/* Main Content */}
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
          {/* Palette Grid */}
          <section>
            <h2 className="mb-6 font-mono text-xs uppercase tracking-widest text-muted-foreground opacity-0 animate-fade-up stagger-3">
              {mode === "dark" ? "Dark" : "Light"} Palettes
              <span className="ml-2 text-primary">({palettes.length})</span>
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {palettes.map((palette, index) => (
                <PaletteCard
                  key={palette.id}
                  palette={palette}
                  isSelected={selectedPalette?.id === palette.id}
                  onClick={() => setSelectedPalette(palette)}
                  index={index}
                />
              ))}
            </div>
          </section>

          {/* Palette Detail */}
          <section className="lg:sticky lg:top-8 lg:self-start">
            {selectedPalette && <PaletteDetail palette={selectedPalette} />}
          </section>
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
