import { useState, useMemo, useEffect, memo, lazy, Suspense, useDeferredValue } from "react";
import { Palette as PaletteIcon, Search, X, Menu, PanelLeftClose, PanelLeftOpen, Plus, Image as ImageIcon } from "lucide-react";
import { darkPalettes, lightPalettes, pastelPalettes, vintagePalettes, retroPalettes, neonPalettes, goldPalettes, coldPalettes, fallPalettes, winterPalettes, springPalettes, happyPalettes, naturePalettes, earthPalettes, spacePalettes, rainbowPalettes, gradientPalettes, sunsetPalettes, skyPalettes, seaPalettes, kidPalettes, skinPalettes, foodPalettes, creamPalettes, coffeePalettes, weddingPalettes, christmasPalettes, type Palette } from "@/data/palettes";
const PaletteSection = lazy(() => import("@/components/PaletteSection").then(m => ({ default: m.PaletteSection })));
const PaletteDetail = lazy(() => import("@/components/PaletteDetail").then(m => ({ default: m.PaletteDetail })));
const CategoryMenu = lazy(() => import("@/components/CategoryMenu").then(m => ({ default: m.CategoryMenu })));
const PaletteCreatorModal = lazy(() => import("@/components/PaletteCreatorModal").then(m => ({ default: m.PaletteCreatorModal })));
const ImagePickerModal = lazy(() => import("@/components/ImagePickerModal").then(m => ({ default: m.ImagePickerModal })));
import { Hero } from "@/components/Hero";
import { WhyChromatic } from "@/components/WhyChromatic";
import { AboutCreator } from "@/components/AboutCreator";
import { Navbar } from "@/components/Navbar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

import { useFavorites } from "@/hooks/useFavorites";
import { useUserPalettes, type UserPalette } from "@/hooks/useUserPalettes";

const Index = () => {
  const [selectedPalette, setSelectedPalette] = useState<Palette | null>(darkPalettes[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>("Pastel");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);
  const [editingPalette, setEditingPalette] = useState<UserPalette | null>(null);
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const { userPalettes, addPalette, updatePalette, deletePalette } = useUserPalettes();

  // Defer search query to keep input responsive
  const deferredSearchQuery = useDeferredValue(searchQuery);

  // Image Picker State (for persistence)
  const [pickerImage, setPickerImage] = useState<string | null>(() =>
    localStorage.getItem('chromatic_picker_image')
  );
  const [pickerMarkers, setPickerMarkers] = useState<{ x: number; y: number; color: string }[]>(() => {
    const saved = localStorage.getItem('chromatic_picker_markers');
    try {
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [pickerNumColors, setPickerNumColors] = useState(() => {
    const saved = localStorage.getItem('chromatic_picker_num_colors');
    return saved ? parseInt(saved) : 5;
  });

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('chromatic_picker_image', pickerImage || "");
  }, [pickerImage]);

  useEffect(() => {
    localStorage.setItem('chromatic_picker_markers', JSON.stringify(pickerMarkers));
  }, [pickerMarkers]);

  useEffect(() => {
    localStorage.setItem('chromatic_picker_num_colors', pickerNumColors.toString());
  }, [pickerNumColors]);

  useEffect(() => {
    localStorage.setItem('chromatic_picker_is_open', isImagePickerOpen.toString());
  }, [isImagePickerOpen]);

  // Handle initial modal state safely
  useEffect(() => {
    const wasOpen = localStorage.getItem('chromatic_picker_is_open') === 'true';
    if (wasOpen && !isImagePickerOpen) {
      setIsImagePickerOpen(true);
    }
  }, []);

  // Category keyword mapping for smart search
  const categoryKeywords: Record<string, string[]> = {
    'Dark': ['dark', 'darker', 'noir', 'black', 'shadow', 'midnight'],
    'Light': ['light', 'bright', 'white', 'pale', 'airy'],
    'Pastel': ['pastel', 'soft', 'gentle', 'muted'],
    'Vintage': ['vintage', 'retro', 'old', 'classic'],
    'Retro': ['retro', '80s', '90s', 'throwback'],
    'Neon': ['neon', 'fluorescent', 'glow', 'vibrant'],
    'Gold': ['gold', 'golden', 'luxury', 'metallic'],
    'Cold': ['cold', 'cool', 'icy', 'winter', 'blue'],
    'Fall': ['fall', 'autumn', 'orange', 'harvest'],
    'Winter': ['winter', 'snow', 'frost', 'ice'],
    'Spring': ['spring', 'fresh', 'bloom', 'floral'],
    'Happy': ['happy', 'cheerful', 'joy', 'bright'],
    'Nature': ['nature', 'natural', 'green', 'organic', 'earth'],
    'Earth': ['earth', 'brown', 'terracotta', 'soil'],
    'Space': ['space', 'cosmic', 'galaxy', 'star', 'universe'],
    'Rainbow': ['rainbow', 'colorful', 'multicolor'],
    'Gradient': ['gradient', 'ombre', 'blend', 'fade'],
    'Sunset': ['sunset', 'dusk', 'twilight'],
    'Sky': ['sky', 'azure', 'blue', 'clouds'],
    'Sea': ['sea', 'ocean', 'aqua', 'marine', 'water'],
    'Kids': ['kids', 'children', 'playful', 'fun'],
    'Skin': ['skin', 'tone', 'flesh', 'nude'],
    'Food': ['food', 'culinary', 'edible'],
    'Cream': ['cream', 'beige', 'ivory', 'neutral'],
    'Coffee': ['coffee', 'mocha', 'espresso', 'latte'],
    'Wedding': ['wedding', 'bridal', 'romantic'],
    'Christmas': ['christmas', 'holiday', 'festive', 'xmas']
  };

  // Smart search: Auto-select category based on search query (triggered on Enter)
  const handleSearchSubmit = () => {
    if (!searchQuery) return;

    const query = searchQuery.toLowerCase().trim();

    // Check if query matches any category keyword
    for (const [category, keywords] of Object.entries(categoryKeywords)) {
      if (keywords.some(keyword => query.includes(keyword))) {
        setSelectedCategory(category);
        setSearchQuery(''); // Clear search after redirecting to category
        break;
      }
    }
  };

  const handleSelectPalette = (palette: Palette) => {
    setSelectedPalette(palette);
    setMobileDetailOpen(true);
  };

  // Combine all palettes into a unified list with explicit categories
  const allPalettes = (useMemo(() => [
    ...userPalettes.map(p => ({ ...p, category: "Custom" })),
    ...darkPalettes.map(p => ({ ...p, category: "Dark" })),
    ...lightPalettes.map(p => ({ ...p, category: "Light" })),
    ...pastelPalettes.map(p => ({ ...p, category: "Pastel" })),
    ...vintagePalettes.map(p => ({ ...p, category: "Vintage" })),
    ...retroPalettes.map(p => ({ ...p, category: "Retro" })),
    ...neonPalettes.map(p => ({ ...p, category: "Neon" })),
    ...goldPalettes.map(p => ({ ...p, category: "Gold" })),
    ...coldPalettes.map(p => ({ ...p, category: "Cold" })),
    ...fallPalettes.map(p => ({ ...p, category: "Fall" })),
    ...winterPalettes.map(p => ({ ...p, category: "Winter" })),
    ...springPalettes.map(p => ({ ...p, category: "Spring" })),
    ...happyPalettes.map(p => ({ ...p, category: "Happy" })),
    ...naturePalettes.map(p => ({ ...p, category: "Nature" })),
    ...earthPalettes.map(p => ({ ...p, category: "Earth" })),
    ...spacePalettes.map(p => ({ ...p, category: "Space" })),
    ...rainbowPalettes.map(p => ({ ...p, category: "Rainbow" })),
    ...gradientPalettes.map(p => ({ ...p, category: "Gradient" })),
    ...sunsetPalettes.map(p => ({ ...p, category: "Sunset" })),
    ...skyPalettes.map(p => ({ ...p, category: "Sky" })),
    ...seaPalettes.map(p => ({ ...p, category: "Sea" })),
    ...kidPalettes.map(p => ({ ...p, category: "Kids" })),
    ...skinPalettes.map(p => ({ ...p, category: "Skin" })),
    ...foodPalettes.map(p => ({ ...p, category: "Food" })),
    ...creamPalettes.map(p => ({ ...p, category: "Cream" })),
    ...coffeePalettes.map(p => ({ ...p, category: "Coffee" })),
    ...weddingPalettes.map(p => ({ ...p, category: "Wedding" })),
    ...christmasPalettes.map(p => ({ ...p, category: "Christmas" })),
  ], [userPalettes])) as Palette[];

  // Derive favorite palette objects
  const favoritePalettes = useMemo(() =>
    allPalettes.filter(p => isFavorite(p.id)),
    [allPalettes, favorites]
  );

  // Filter palettes based on search query and category
  const filteredPalettes = useMemo(() => {
    let filtered = allPalettes;

    // Filter by Search Query
    if (deferredSearchQuery.trim()) {
      const query = deferredSearchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.tags?.some((tag) => tag.toLowerCase().includes(query))
      );
      return filtered;
    }

    // Filter by Category
    if (selectedCategory) {
      const cat = selectedCategory.toLowerCase();
      filtered = filtered.filter(p => {
        // 1. Exact category match
        if (p.category?.toLowerCase() === cat) return true;

        // 2. Tag-based match for virtual categories (like 'Warm', 'Summer', 'Night')
        const hasTag = p.tags?.some(tag => tag.toLowerCase() === cat);
        if (hasTag) return true;

        // 3. Fallback: Tag or name inclusion (more liberal)
        // Only if it's a search-like category or we want broader results
        if (["warm", "cold", "bright", "dark", "light"].includes(cat)) {
          return (
            p.tags?.some(tag => tag.toLowerCase().includes(cat)) ||
            p.name.toLowerCase().includes(cat)
          );
        }

        return false;
      });
      return filtered;
    }

    // Default: Return empty if no category or search
    return [];
  }, [allPalettes, selectedCategory, deferredSearchQuery]);

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
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Navbar Section */}
      <Navbar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        allPalettesCount={allPalettes.length}
        totalResults={totalResults}
        onAddNew={() => {
          setEditingPalette(null);
          setIsModalOpen(true);
        }}
        onPickFromImage={() => setIsImagePickerOpen(true)}
        onSearchSubmit={handleSearchSubmit}
      />

      {/* Hero Section */}
      <div className="pt-[140px] sm:pt-[72px]">
        <Hero
          onBrowse={() => {
            const searchInput = document.getElementById('navbar-search');
            if (searchInput) {
              searchInput.focus();
              searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
              document.getElementById('palette-grid')?.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          onCreate={() => {
            setEditingPalette(null);
            setIsModalOpen(true);
          }}
        />
        <WhyChromatic />
      </div>

      {/* Gradient Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute -left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -right-1/4 bottom-0 h-[600px] w-[600px] rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-muted/30 blur-3xl" />
      </div>

      {/* Grain Overlay */}
      <div className="grain pointer-events-none fixed inset-0 -z-10" />

      <div id="palette-grid" className="mx-auto max-w-[1800px] px-4 sm:px-6 lg:px-8 mt-12">

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
            "hidden lg:block sticky top-[80px] h-[calc(100vh-80px)] overflow-y-auto thin-scrollbar pb-10",
            "transition-all duration-300 ease-in-out py-4",
            isSidebarOpen
              ? "opacity-100 translate-x-0 w-full pr-4"
              : "opacity-0 -translate-x-4 w-0 pr-0 overflow-hidden"
          )}>
            <Suspense fallback={<div className="p-4 space-y-4"><div className="h-8 w-full bg-muted animate-pulse rounded" /><div className="h-8 w-full bg-muted animate-pulse rounded" /></div>}>
              <CategoryMenu
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
            </Suspense>
          </aside>

          {/* Middle: Palette Sections */}
          <div className="space-y-10 min-w-0">

            {/* Unified Palettes Section */}
            <Suspense fallback={<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{Array.from({ length: 9 }).map((_, i) => <div key={i} className="h-48 rounded-lg bg-muted animate-pulse" />)}</div>}>
              {filteredPalettes.length > 0 && (
                <PaletteSection
                  key={selectedCategory || "all"}
                  title={sectionTitle}
                  mode={sectionMode}
                  palettes={filteredPalettes}
                  selectedPalette={selectedPalette}
                  onSelectPalette={handleSelectPalette}
                  animationOffset={0.15}
                  isFavorite={isFavorite}
                  onToggleFavorite={toggleFavorite}
                  onEditPalette={(p: UserPalette) => {
                    setEditingPalette(p);
                    setIsModalOpen(true);
                  }}
                  onDeletePalette={deletePalette}
                />
              )}
            </Suspense>

            {/* No Results */}
            {/* No Results or Empty State */}
            {totalResults === 0 && (
              <div className="flex flex-col items-center justify-center py-20 opacity-0 animate-fade-up">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  {searchQuery ? (
                    <Search className="h-8 w-8 text-muted-foreground" />
                  ) : (
                    <PaletteIcon className="h-8 w-8 text-muted-foreground" />
                  )}
                </div>
                <h3 className="font-display text-xl text-foreground mb-2">
                  {searchQuery ? "No palettes found" : "Select a category"}
                </h3>
                <p className="font-mono text-sm text-muted-foreground text-center max-w-md">
                  {searchQuery
                    ? "Try adjusting your search filters."
                    : "Choose a category from the menu to view curated palettes."}
                </p>
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory(null);
                    }}
                    className="mt-6 text-primary hover:underline font-mono text-sm"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Right: Palette Detail & Favorites (Sticky) */}
          {showRightPanel && (
            <div className="hidden xl:flex xl:flex-col xl:gap-8 xl:sticky xl:top-[100px] xl:self-start xl:h-[calc(100vh-120px)] overflow-y-auto no-scrollbar pb-10">
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
              <Suspense fallback={<div className="mt-20 flex flex-col items-center justify-center space-y-4"><div className="h-48 w-full bg-muted animate-pulse rounded-xl" /><div className="h-32 w-full bg-muted animate-pulse rounded-xl" /></div>}>
                {selectedPalette && (
                  <div className="mt-6">
                    <PaletteDetail palette={selectedPalette} />
                  </div>
                )}
              </Suspense>
            </SheetContent>
          </Sheet>
        </div>

        {/* About the Creator Section */}
        <div className="mt-32">
          <AboutCreator />
        </div>

        {/* Footer */}
        <footer className="mt-32 border-t border-white/[0.03] pt-16 pb-20 opacity-0 animate-fade-up group" style={{ animationDelay: "1s" }}>
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-center">
              <span className="inline-block animate-pop-pulse">
                <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-medium text-primary/90 drop-shadow-[0_0_8px_rgba(var(--primary),0.3)] cursor-default transition-all duration-500 animate-glitch inline-block">
                  © 2026 Jainil Patel
                </span>
              </span>
              <span className="hidden sm:block h-1 w-1 rounded-full bg-white/10" />
              <span className="font-display text-[11px] sm:text-[12px] tracking-wide font-light text-white transition-all duration-700">
                Chromatic — A curated color palette platform for designers and developers.
              </span>
            </div>
            <div className="mt-8 flex justify-center opacity-10">
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-foreground to-transparent" />
            </div>
          </div>
        </footer>
      </div>
      <Suspense fallback={null}>
        <PaletteCreatorModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onCreate={(p) => {
            if (editingPalette) {
              updatePalette(editingPalette.id, p);
            } else {
              addPalette(p);
            }
          }}
          initialPalette={editingPalette ? {
            ...editingPalette,
            tags: editingPalette.tags || []
          } : undefined}
        />
      </Suspense>
      <Suspense fallback={null}>
        <ImagePickerModal
          isOpen={isImagePickerOpen}
          onClose={() => setIsImagePickerOpen(false)}
          onExport={(p) => {
            addPalette({
              ...p,
              tags: ["image-extracted"],
            });
            toast.success("Extracted palette added to your collection!");
          }}
          // Persistence props
          savedImage={pickerImage}
          onImageChange={setPickerImage}
          savedMarkers={pickerMarkers}
          onMarkersChange={setPickerMarkers}
          savedNumColors={pickerNumColors}
          onNumColorsChange={setPickerNumColors}
        />
      </Suspense>
    </div>
  );
};

export default Index;
