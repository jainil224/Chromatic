import { useState, useMemo, useEffect, memo, lazy, Suspense, useDeferredValue, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Palette as PaletteIcon, Search, X, Menu, PanelLeftClose, PanelLeftOpen, Plus, Image as ImageIcon } from "lucide-react";
import type { ThemeMode } from "@/components/ModeToggle";
import type { Palette } from "@/data/palettes";
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
import { useLikes } from "@/hooks/useLikes";
import { usePalettes } from "@/hooks/usePalettes";

const Index = () => {
  const navigate = useNavigate();
  const [themeMode, setThemeMode] = useState<ThemeMode>(() =>
    (localStorage.getItem('chromatic_theme') as ThemeMode) || 'dark'
  );
  const [selectedPalette, setSelectedPalette] = useState<Palette | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);
  const [editingPalette, setEditingPalette] = useState<UserPalette | null>(null);
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const { userPalettes, addPalette, updatePalette, deletePalette } = useUserPalettes();
  const { toggleLike, getLikeCount, isLiked: isPaletteLiked } = useLikes();
  const { palettes: supabasePalettes, loading: palettesLoading, error: palettesError } = usePalettes();

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

  // Theme Handling
  useEffect(() => {
    localStorage.setItem('chromatic_theme', themeMode);
    // Apply theme class to body for global styles
    document.body.classList.remove('light-mode', 'midnight-mode');
    if (themeMode !== 'dark') {
      document.body.classList.add(`${themeMode}-mode`);
    }
  }, [themeMode]);

  const toggleTheme = useCallback(() => {
    setThemeMode(prev => {
      if (prev === 'dark') return 'light';
      if (prev === 'light') return 'midnight';
      return 'dark';
    });
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
    'Kid': ['kid', 'kids', 'children', 'playful', 'fun'],
    'Skin': ['skin', 'tone', 'flesh', 'nude'],
    'Food': ['food', 'culinary', 'edible'],
    'Cream': ['cream', 'beige', 'ivory', 'neutral'],
    'Coffee': ['coffee', 'mocha', 'espresso', 'latte'],
    'Wedding': ['wedding', 'bridal', 'romantic'],
    'Christmas': ['christmas', 'holiday', 'festive', 'xmas']
  };

  // Performance: Control how many sections are rendered at once
  const [visibleSectionsCount, setVisibleSectionsCount] = useState(6);

  // Centralized Category Selection
  const handleSelectCategory = useCallback((category: string | null) => {
    setSelectedCategory(category);
    // Reset visible sections when filtering
    setVisibleSectionsCount(6);
  }, []);



  // Smart search: Auto-select category based on search query (triggered on Enter)
  const handleSearchSubmit = () => {
    if (!searchQuery) return;

    const query = searchQuery.toLowerCase().trim();

    // Check if query matches any category keyword
    for (const [category, keywords] of Object.entries(categoryKeywords)) {
      if (keywords.some(keyword => query.includes(keyword))) {
        handleSelectCategory(category);
        setSearchQuery(''); // Clear search after redirecting to category
        break;
      }
    }
  };

  const handleSelectPalette = (palette: Palette) => {
    setSelectedPalette(palette);
    setMobileDetailOpen(true);
  };

  // Combine Supabase palettes with user-created palettes and deduplicate by ID
  const allPalettes = useMemo(() => {
    const map = new Map<string, Palette>();

    // Add Supabase palettes first as the base
    supabasePalettes.forEach(p => map.set(p.id, p));

    // Add user palettes (they might override or add new ones)
    userPalettes.forEach(up => {
      const existing = map.get(up.id);
      map.set(up.id, {
        ...existing,
        ...up,
        category: up.category || existing?.category || "Custom",
        // Keep tags from existing if user palette doesn't have them
        tags: up.tags && up.tags.length > 0 ? up.tags : (existing?.tags || [])
      });
    });

    return Array.from(map.values());
  }, [userPalettes, supabasePalettes]);

  // Derive favorite palette objects
  const favoritePalettes = useMemo(() =>
    allPalettes.filter(p => isFavorite(p.id)),
    [allPalettes, favorites]
  );

  // Filter palettes based on search query and category
  const filteredPalettes = useMemo(() => {
    // Filter by Search Query
    if (deferredSearchQuery.trim()) {
      const query = deferredSearchQuery.toLowerCase();
      return allPalettes.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.tags?.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Filter by Category (only show when category is selected)
    if (selectedCategory) {
      const cat = selectedCategory.toLowerCase();
      return allPalettes.filter(p => {
        // EXCLUSIVITY: Pastel palettes only show in Pastel category
        const isPastel = p.section?.toLowerCase() === 'pastel' || p.category?.toLowerCase() === 'pastel';
        if (isPastel && cat !== 'pastel') return false;

        // 1. Exact category match (case-insensitive)
        if (p.category?.toLowerCase() === cat) return true;

        // 2. Tag-based match for virtual categories
        if (p.tags?.some(tag => tag.toLowerCase() === cat)) return true;

        // 3. Section-based match
        if (p.section?.toLowerCase() === cat) return true;

        return false;
      });
    }

    // No filters: return empty (user must select category)
    return [];
  }, [allPalettes, selectedCategory, deferredSearchQuery]);

  const totalResults = filteredPalettes.length;

  // Calculate total number of palettes (only Supabase palettes, not user-created)
  const totalPalettes = supabasePalettes.length;





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

  // Define the ordered list of categories to display on the home page (Dashboard)
  const HOME_CATEGORIES = [
    // Vibes
    'Pastel', 'Vintage', 'Retro', 'Neon', 'Gold', 'Light', 'Dark', 'Warm', 'Cold',
    // Seasons
    'Summer', 'Fall', 'Winter', 'Spring', 'Happy',
    // Themes
    'Nature', 'Earth', 'Night', 'Space', 'Rainbow', 'Gradient', 'Sunset', 'Sky', 'Sea',
    // Special
    'Kid', 'Skin', 'Food', 'Cream', 'Coffee', 'Wedding', 'Christmas',
  ];

  // Helper to get palettes for a specific category (Strict Filtering with Smart Meta-Categories)
  const getPalettesByCategory = useCallback((category: string) => {
    const catLower = category.toLowerCase();

    // Special Case: Favorites
    if (catLower === 'favorites') {
      return favoritePalettes;
    }

    // Define Meta-Categories (collections of tags)
    const metaCategories: Record<string, string[]> = {
      'warm': ['red', 'orange', 'yellow', 'amber', 'gold', 'crimson', 'ruby', 'rose', 'coral', 'peach', 'sunset', 'tangerine', 'apricot', 'chocolate', 'cocoa', 'bronze', 'terracotta'],
      'cold': ['blue', 'cyan', 'teal', 'green', 'purple', 'indigo', 'violet', 'navy', 'sky', 'ocean', 'aqua', 'turquoise', 'ice', 'frost', 'denim', 'midnight', 'leaf', 'sage', 'mint', 'emerald', 'jade', 'forest', 'pine', 'seafoam'],
      'summer': ['gold', 'yellow', 'orange', 'blue', 'sky', 'ocean', 'beach', 'sand', 'teal', 'turquoise', 'coral', 'peach', 'sunset', 'sun', 'bright', 'lemon', 'lime'],
      'happy': ['yellow', 'orange', 'pink', 'bright', 'gold', 'lemon', 'lime', 'mint', 'coral', 'bubblegum', 'rainbow'],
    };

    return allPalettes.filter(p => {
      // 1. Tag match (Strict)
      if (p.tags?.includes(catLower)) return true;

      // 2. Meta-Category Match (Smart Filtering)
      if (metaCategories[catLower]) {
        // If ANY of the palette's tags match ANY of the meta-category tags -> Include it
        if (p.tags?.some(tag => metaCategories[catLower].includes(tag))) return true;
      }

      // 3. Category field match
      if (p.category?.toLowerCase() === catLower) return true;
      // 4. Section field match
      if (p.section?.toLowerCase() === catLower) return true;

      return false;
    });
  }, [allPalettes]);

  interface DashboardSection {
    title: string;
    palettes: Palette[];
    mode: 'light' | 'dark';
    key: string;
  }

  // Determine which sections to render
  const sectionsToRender = useMemo((): DashboardSection[] => {
    if (searchQuery) {
      // specific search logic
      return [{ title: "Search Results", palettes: filteredPalettes, mode: 'dark' as const, key: 'search' }];
    }
    if (selectedCategory) {
      // Single category view
      const palettes = getPalettesByCategory(selectedCategory);
      const isLight = ["light", "bright", "pale", "soft", "cream", "wedding", "spring"].some(k => selectedCategory.toLowerCase().includes(k));
      return [{
        title: `${selectedCategory} Palettes`,
        palettes,
        mode: (isLight ? 'light' : 'dark' as const),
        key: 'selected-cat'
      }];
    }

    // Home view: Render all known sections that have palettes
    return HOME_CATEGORIES.map(cat => {
      const palettes = getPalettesByCategory(cat);
      if (palettes.length === 0) return null;

      const isLight = ["light", "bright", "pale", "soft", "cream", "wedding", "spring"].some(k => cat.toLowerCase().includes(k));
      return {
        title: `${cat} Palettes`,
        palettes,
        mode: (isLight ? 'light' : 'dark' as const),
        key: cat
      };
    }).filter((s): s is DashboardSection => s !== null);
  }, [selectedCategory, searchQuery, filteredPalettes, getPalettesByCategory, HOME_CATEGORIES]);

  // Derived sections to actually show (performance optimization)
  const visibleSections = useMemo((): DashboardSection[] => {
    if (searchQuery || selectedCategory) return sectionsToRender;
    return sectionsToRender.slice(0, visibleSectionsCount);
  }, [sectionsToRender, visibleSectionsCount, searchQuery, selectedCategory]);

  const loadMoreSections = useCallback(() => {
    setVisibleSectionsCount(prev => Math.min(prev + 6, sectionsToRender.length));
  }, [sectionsToRender.length]);

  return (
    <div className={cn(
      "h-screen overflow-hidden flex flex-col transition-colors duration-500",
      themeMode === 'light' ? 'bg-[#fcfaf7]' : themeMode === 'midnight' ? 'bg-[#050b17]' : 'bg-[#080808]'
    )}>
      {/* Background Gradients (Fixed in Background) */}
      <div className="fixed inset-0 -z-10 transition-opacity duration-1000">
        <div className="absolute inset-0 bg-background" />
        <div className={cn(
          "absolute -left-1/4 top-0 h-[500px] w-[500px] rounded-full blur-3xl transition-all duration-1000",
          themeMode === 'light' ? "bg-orange-500/10" : themeMode === 'midnight' ? "bg-blue-500/20" : "bg-primary/5"
        )} />
        <div className={cn(
          "absolute -right-1/4 bottom-0 h-[600px] w-[600px] rounded-full blur-3xl transition-all duration-1000",
          themeMode === 'light' ? "bg-blue-500/10" : themeMode === 'midnight' ? "bg-purple-500/20" : "bg-accent/5"
        )} />
      </div>
      <div className="grain pointer-events-none fixed inset-0 -z-10" />

      <Navbar
        selectedCategory={selectedCategory}
        setSelectedCategory={handleSelectCategory}
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
        themeMode={themeMode}
        onToggleTheme={toggleTheme}
        onLogoClick={() => {
          setSelectedCategory(null);
          setSearchQuery('');
        }}
      />

      <main className="flex-1 min-h-0 pt-[80px] overflow-hidden">
        {/* Middle: Content Area (Independent Scroll) */}
        <div id="main-scroll-view" className="h-full overflow-y-auto thin-scrollbar">
          <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 py-12">
            {/* HEROS SECTION */}
            <div className="animate-fade-in">
              <Hero
                onBrowse={() => {
                  const grid = document.getElementById('palette-grid');
                  grid?.scrollIntoView({ behavior: 'smooth' });
                }}
                onMaker={() => navigate('/palette-maker')}
                onCustomize={() => navigate('/customize')}
                onPickFromImage={() => setIsImagePickerOpen(true)}
              />
            </div>

            {/* HORIZONTAL CATEGORY MENU (Sticky) */}
            <div className="sticky top-0 z-40 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 py-4 mb-8 bg-background/80 backdrop-blur-md border-b border-white/5">
              <Suspense fallback={<div className="h-12 bg-secondary/10 animate-pulse rounded-full" />}>
                <CategoryMenu
                  horizontal
                  selectedCategory={selectedCategory}
                  onSelectCategory={handleSelectCategory}
                />
              </Suspense>
            </div>

            {/* DASHBOARD / PALETTE GRID CONTENT */}
            <div id="palette-grid" className="space-y-16 pb-32 animate-fade-up">
              <Suspense fallback={<div className="h-96 w-full flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></div>}>
                {visibleSections.map((section, idx) => (
                  <PaletteSection
                    key={section.key || section.title}
                    title={section.title}
                    mode={section.mode}
                    palettes={section.palettes}
                    selectedPalette={selectedPalette}
                    onSelectPalette={handleSelectPalette}
                    animationOffset={idx * 0.1}
                    isFavorite={isFavorite}
                    onToggleFavorite={toggleFavorite}
                    onEditPalette={(p: UserPalette) => {
                      setEditingPalette(p);
                      setIsModalOpen(true);
                    }}
                    onDeletePalette={deletePalette}
                    getLikeCount={getLikeCount}
                    isPaletteLiked={isPaletteLiked}
                    onToggleLike={toggleLike}
                  />
                ))}

                {/* Load More Button */}
                {!searchQuery && !selectedCategory && visibleSectionsCount < sectionsToRender.length && (
                  <div className="flex justify-center py-10 opacity-0 animate-fade-up">
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={loadMoreSections}
                      className="rounded-full px-10 gap-2 border-primary/20 hover:border-primary/50 bg-primary/5 backdrop-blur-sm"
                    >
                      <Plus className="h-4 w-4" />
                      Load More Collections
                    </Button>
                  </div>
                )}

                {visibleSections.length === 0 && !palettesLoading && (
                  <div className="flex flex-col items-center justify-center py-20 opacity-0 animate-fade-up">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
                      {selectedCategory === 'Favorites' ? (
                        <Heart className="h-8 w-8 text-red-500/60" />
                      ) : (
                        <Search className="h-8 w-8 text-secondary-foreground/60" />
                      )}
                    </div>
                    <h3 className="font-display text-xl text-foreground mb-2">
                      {selectedCategory === 'Favorites' ? "No favorites yet" : "No palettes found"}
                    </h3>
                    <p className="font-mono text-sm text-secondary-foreground/70 text-center max-w-md">
                      {selectedCategory === 'Favorites'
                        ? "Tap the heart on any palette to save it to your collection."
                        : "Try adjusting your search filters."}
                    </p>
                    <Button variant="link" onClick={() => { setSearchQuery(''); handleSelectCategory(null); }} className="mt-4">
                      {selectedCategory === 'Favorites' ? "Browse all palettes" : "Clear Filters"}
                    </Button>
                  </div>
                )}
              </Suspense>
            </div>

            {/* SUPPORTING LANDING CONTENT */}
            <div className="mt-20">
              <WhyChromatic themeMode={themeMode} />
            </div>
            <div className="mt-32">
              <AboutCreator />
            </div>

            {/* Unified Footer */}
            <footer className="pt-24 pb-20 border-t border-white/[0.03] mt-32">
              <div className="container mx-auto px-4">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-center">
                  <span className="inline-block animate-pop-pulse">
                    <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-medium text-primary/90">© 2026 Jainil Patel</span>
                  </span>
                  <span className="hidden sm:block h-1 w-1 rounded-full bg-white/10" />
                  <span className="font-display text-[11px] sm:text-[12px] tracking-wide font-light text-white">Chromatic — A curated color palette platform.</span>
                </div>
              </div>
            </footer>
          </div>
        </div>

      </main>

      {/* Sheet (Mobile Sidebar Content remains) */}
      <Sheet open={mobileDetailOpen} onOpenChange={setMobileDetailOpen}>
        <SheetContent side="right" className="w-full sm:w-[400px] border-l-border bg-background/95 backdrop-blur-xl overflow-y-auto">
          <Suspense fallback={<div className="mt-20 flex flex-col items-center justify-center space-y-4"><div className="h-48 w-full bg-secondary animate-pulse rounded-xl" /><div className="h-32 w-full bg-secondary animate-pulse rounded-xl" /></div>}>
            {selectedPalette && (
              <div className="mt-6">
                <PaletteDetail
                  palette={selectedPalette}
                  likeCount={getLikeCount(selectedPalette.id)}
                  isLiked={isPaletteLiked(selectedPalette.id)}
                  onToggleLike={toggleLike}
                />
              </div>
            )}
          </Suspense>
        </SheetContent>
      </Sheet>

      <Suspense fallback={null}>
        <PaletteCreatorModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onCreate={(p) => {
            if (editingPalette) {
              updatePalette(editingPalette.id, p);
            } else {
              addPalette({
                ...p,
                section: selectedCategory === 'Kid' ? 'kid' : null
              });
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
    </div >
  );
};

export default Index;
