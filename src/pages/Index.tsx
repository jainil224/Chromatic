import { useState } from "react";
import { Palette as PaletteIcon, Search, X, Menu, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { darkPalettes, lightPalettes, pastelPalettes, vintagePalettes, retroPalettes, neonPalettes, goldPalettes, coldPalettes, type Palette } from "@/data/palettes";
import { PaletteSection } from "@/components/PaletteSection";
import { PaletteDetail } from "@/components/PaletteDetail";
import { CategoryMenu } from "@/components/CategoryMenu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { useFavorites } from "@/hooks/useFavorites";

const Index = () => {
  const [selectedPalette, setSelectedPalette] = useState<Palette | null>(darkPalettes[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false);
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  const handleSelectPalette = (palette: Palette) => {
    setSelectedPalette(palette);
    setMobileDetailOpen(true);
  };

  // Combine and filter palettes
  const allPalettes = [...darkPalettes, ...lightPalettes, ...pastelPalettes, ...vintagePalettes, ...retroPalettes, ...neonPalettes, ...goldPalettes, ...coldPalettes];

  // Derive favorite palette objects
  const favoritePalettes = allPalettes.filter(p => isFavorite(p.id));

  // Filter palettes based on search query and category
  const filterPalettes = (palettes: Palette[]) => {
    let filtered = palettes;

    // Filter by Category
    if (selectedCategory) {
      const cat = selectedCategory.toLowerCase();
      filtered = filtered.filter(p =>
        p.tags?.some(tag => tag.toLowerCase().includes(cat)) ||
        p.name.toLowerCase().includes(cat)
      );
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.tags?.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    return filtered;
  };

  const filteredPalettes = filterPalettes(allPalettes);
  const totalResults = filteredPalettes.length;

  // Determine section properties based on current filter
  const getSectionProps = () => {
    if (searchQuery) return { title: "Search Results", mode: "dark" as const };
    if (selectedCategory) {
      // Simple heuristic: adjust icon mode based on category name or selected content
      // For now default to dark theme consistency unless "Light" or "Bright"
      const isLightCategory = ["light", "bright", "pale", "soft"].some(k =>
        selectedCategory.toLowerCase().includes(k)
      );
      return {
        title: `${selectedCategory} Palettes`,
        mode: (isLightCategory ? "light" : "dark") as "light" | "dark"
      };
    }
    return { title: "All Palettes", mode: "dark" as const };
  };

  const { title: sectionTitle, mode: sectionMode } = getSectionProps();

  const showRightPanel = favoritePalettes.length > 0;

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

      <div className="mx-auto max-w-[1800px] px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3 opacity-0 animate-fade-up">
              {/* Desktop Sidebar Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="hidden lg:flex mr-2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
              >
                {isSidebarOpen ? <PanelLeftClose className="h-5 w-5" /> : <PanelLeftOpen className="h-5 w-5" />}
              </Button>

              {/* Mobile Menu Trigger */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden mr-2">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[280px] border-r-border bg-background/95 backdrop-blur-xl p-0">
                  <CategoryMenu
                    selectedCategory={selectedCategory}
                    onSelectCategory={(cat) => setSelectedCategory(cat)}
                    className="mt-8 px-4"
                  />
                </SheetContent>
              </Sheet>

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

          {/* Search Results Count / Active Filter */}
          {(searchQuery || selectedCategory) && (
            <div className="mt-4 flex items-center gap-2 opacity-0 animate-fade-in" style={{ animationDelay: "0.05s" }}>
              <p className="font-mono text-xs text-muted-foreground">
                Found <span className="text-primary">{totalResults}</span> palettes
                {selectedCategory && <span> in <span className="text-accent">{selectedCategory}</span></span>}
                {searchQuery && <span> matching "{searchQuery}"</span>}
              </p>
              {(searchQuery || selectedCategory) && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory(null);
                  }}
                  className="text-[10px] uppercase text-muted-foreground hover:text-destructive transition-colors ml-2 border-b border-transparent hover:border-destructive"
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}
        </header>

        {/* Main Content Grid */}
        <div className={cn(
          "grid gap-8 transition-all duration-300 ease-in-out",
          // Left sidebar logic
          isSidebarOpen ? "lg:grid-cols-[220px_1fr]" : "lg:grid-cols-[0px_1fr]",
          // Right panel logic (XL screens)
          showRightPanel
            ? (isSidebarOpen ? "xl:grid-cols-[220px_1fr_400px]" : "xl:grid-cols-[0px_1fr_400px]")
            : (isSidebarOpen ? "xl:grid-cols-[220px_1fr]" : "xl:grid-cols-[0px_1fr]")
        )}>

          {/* Left: Category Menu (Desktop) */}
          <aside className={cn(
            "hidden lg:block sticky top-8 self-start h-[calc(100vh-100px)] overflow-y-auto thin-scrollbar",
            "transition-all duration-300 ease-in-out",
            isSidebarOpen
              ? "opacity-100 translate-x-0 w-full pr-4"
              : "opacity-0 -translate-x-4 w-0 pr-0 overflow-hidden"
          )}>
            <CategoryMenu
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </aside>

          {/* Middle: Palette Sections */}
          <div className="space-y-10 min-w-0">

            {/* Unified Palettes Section */}
            {filteredPalettes.length > 0 && (
              <PaletteSection
                title={sectionTitle}
                mode={sectionMode}
                palettes={filteredPalettes}
                selectedPalette={selectedPalette}
                onSelectPalette={handleSelectPalette}
                animationOffset={0.15}
                isFavorite={isFavorite}
                onToggleFavorite={toggleFavorite}
              />
            )}

            {/* No Results */}
            {totalResults === 0 && (
              <div className="flex flex-col items-center justify-center py-20 opacity-0 animate-fade-up">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-display text-xl text-foreground mb-2">No palettes found</h3>
                <p className="font-mono text-sm text-muted-foreground text-center max-w-md">
                  Try adjusting your search or category filters.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory(null);
                  }}
                  className="mt-6 text-primary hover:underline font-mono text-sm"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>

          {/* Right: Palette Detail & Favorites (Sticky) */}
          {showRightPanel && (
            <div className="hidden xl:flex xl:flex-col xl:gap-8 xl:sticky xl:top-8 xl:h-[calc(100vh-4rem)] overflow-y-auto no-scrollbar pb-10">
              {/* Favorites Section in Sidebar - Always show if exists */}
              {favoritePalettes.length > 0 && (
                <div className="border-b border-border pb-6">
                  <PaletteSection
                    title="Your Favorites"
                    mode="dark"
                    palettes={favoritePalettes}
                    selectedPalette={selectedPalette}
                    onSelectPalette={handleSelectPalette}
                    animationOffset={0}
                    isFavorite={isFavorite}
                    onToggleFavorite={toggleFavorite}
                    gridClassName="grid-cols-1 sm:grid-cols-2 lg:grid-cols-1"
                  />
                </div>
              )}
            </div>
          )}

          {/* Mobile Palette Detail Sheet */}
          <Sheet open={mobileDetailOpen} onOpenChange={setMobileDetailOpen}>
            <SheetContent side="right" className="w-full sm:w-[400px] border-l-border bg-background/95 backdrop-blur-xl overflow-y-auto">
              {selectedPalette && (
                <div className="mt-6">
                  <PaletteDetail palette={selectedPalette} />
                </div>
              )}
            </SheetContent>
          </Sheet>
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
