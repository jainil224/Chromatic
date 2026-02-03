import { useState } from "react";
import { Palette as PaletteIcon, Search, X } from "lucide-react";
import { darkPalettes, lightPalettes, type Palette } from "@/data/palettes";
import { PaletteSection } from "@/components/PaletteSection";
import { PaletteDetail } from "@/components/PaletteDetail";

const Index = () => {
  const [selectedPalette, setSelectedPalette] = useState<Palette | null>(darkPalettes[0]);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter palettes based on search query
  const filterPalettes = (palettes: Palette[]) => {
    if (!searchQuery.trim()) return palettes;
    const query = searchQuery.toLowerCase();
    return palettes.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.tags?.some((tag) => tag.toLowerCase().includes(query))
    );
  };

  const filteredDarkPalettes = filterPalettes(darkPalettes);
  const filteredLightPalettes = filterPalettes(lightPalettes);
  const totalResults = filteredDarkPalettes.length + filteredLightPalettes.length;

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

      <div className="mx-auto max-w-[1600px] px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3 opacity-0 animate-fade-up">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <PaletteIcon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="font-display text-3xl text-foreground">
                  Chromatic
                </h1>
                <p className="font-mono text-xs text-muted-foreground">
                  100 Curated Color Palettes
                </p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative w-full max-w-md opacity-0 animate-fade-up" style={{ animationDelay: "0.1s" }}>
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or tag..."
                className="w-full rounded-xl border border-border bg-card py-3 pl-11 pr-10 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Search Results Count */}
          {searchQuery && (
            <div className="mt-4 opacity-0 animate-fade-in" style={{ animationDelay: "0.05s" }}>
              <p className="font-mono text-xs text-muted-foreground">
                Found <span className="text-primary">{totalResults}</span> palettes matching "{searchQuery}"
              </p>
            </div>
          )}
        </header>

        {/* Main Content */}
        <div className="grid gap-10 xl:grid-cols-[1fr_400px] xl:gap-12">
          {/* Left: Palette Sections */}
          <div className="space-y-10">
            {/* Dark Palettes Section */}
            {filteredDarkPalettes.length > 0 && (
              <PaletteSection
                title="Dark Palettes"
                mode="dark"
                palettes={filteredDarkPalettes}
                selectedPalette={selectedPalette}
                onSelectPalette={setSelectedPalette}
                animationOffset={0.15}
              />
            )}

            {/* Light Palettes Section */}
            {filteredLightPalettes.length > 0 && (
              <PaletteSection
                title="Light Palettes"
                mode="light"
                palettes={filteredLightPalettes}
                selectedPalette={selectedPalette}
                onSelectPalette={setSelectedPalette}
                animationOffset={0.25}
              />
            )}

            {/* No Results */}
            {totalResults === 0 && searchQuery && (
              <div className="flex flex-col items-center justify-center py-20 opacity-0 animate-fade-up">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-display text-xl text-foreground mb-2">No palettes found</h3>
                <p className="font-mono text-sm text-muted-foreground text-center max-w-md">
                  Try searching for different keywords like "warm", "ocean", "minimal", or color names.
                </p>
              </div>
            )}
          </div>

          {/* Right: Palette Detail (Sticky) */}
          <div className="xl:sticky xl:top-8 xl:self-start">
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
        <footer className="mt-16 border-t border-border pt-8 opacity-0 animate-fade-up" style={{ animationDelay: "0.5s" }}>
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
