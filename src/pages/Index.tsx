import { useState, useMemo, useEffect, memo, lazy, Suspense, useDeferredValue, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Palette as PaletteIcon, Search, X, Menu, PanelLeftClose, PanelLeftOpen, Plus, Image as ImageIcon, Heart, Share2, Paintbrush } from "lucide-react";
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
import { usePalettes } from "@/hooks/usePalettes";
import { useAdminSession } from "@/hooks/useAdminSession";
import { supabase } from "@/lib/supabase";
import * as DefaultPalettes from "@/data/palettes";

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
  const { userPalettes, addPalette, updatePalette } = useUserPalettes();
  const { palettes: supabasePalettes, loading: palettesLoading, error: palettesError } = usePalettes();
  const { isAdmin } = useAdminSession();

  // Admin: remove a palette permanently from the live site
  const handleAdminDelete = useCallback(async (id: string) => {
    const { error } = await supabase.from('palettes').delete().eq('id', id);
    if (error) {
      toast.error('Failed to delete palette. Make sure you are logged in as admin.');
    } else {
      toast.success('Palette removed from the live site.');
    }
  }, []);

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
    setThemeMode(prev => prev === 'dark' ? 'midnight' : 'dark');
  }, []);

  // Category keyword mapping for smart search
  const categoryKeywords: Record<string, string[]> = {
    'Dark': ['dark', 'darker', 'noir', 'black', 'shadow', 'midnight'],
    'Vintage': ['vintage', 'retro', 'old', 'classic'],
    'Retro': ['retro', '80s', '90s', 'throwback'],
    'Neon': ['neon', 'fluorescent', 'glow', 'vibrant'],
    'Gold': ['gold', 'golden', 'luxury', 'metallic'],
    'Cold': ['cold', 'cool', 'icy', 'winter', 'blue'],
    'Fall': ['fall', 'autumn', 'orange', 'harvest'],
    'Winter': ['winter', 'snow', 'frost', 'ice'],
    'Nature': ['nature', 'natural', 'green', 'organic', 'earth'],
    'Earth': ['earth', 'brown', 'terracotta', 'soil'],
    'Space': ['space', 'cosmic', 'galaxy', 'star', 'universe'],
    'Rainbow': ['rainbow', 'colorful', 'multicolor'],
    'Gradient': ['gradient', 'ombre', 'blend', 'fade'],
    'Sunset': ['sunset', 'dusk', 'twilight'],
    'Sky': ['sky', 'azure', 'blue', 'clouds'],
    'Sea': ['sea', 'ocean', 'aqua', 'marine', 'water'],
    'Kid': ['kid', 'kids', 'children', 'playful', 'fun'],
    'Food': ['food', 'culinary', 'edible'],
    'Coffee': ['coffee', 'mocha', 'espresso', 'latte'],
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

  // Reset scroll position when category or search changes
  useEffect(() => {
    const scrollView = document.getElementById('main-scroll-view');
    if (scrollView) {
      scrollView.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [selectedCategory, searchQuery]);



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

  const handleSelectPalette = useCallback((palette: Palette) => {
    setSelectedPalette(palette);
    setMobileDetailOpen(true);
  }, []);

  const handleLogoClick = useCallback(() => {
    setSelectedCategory(null);
    setSearchQuery("");
  }, []);

  const handleShareWebsite = useCallback(async () => {
    const shareData = {
      title: "Chromatic - Modern Color Palettes",
      text: "Discover beautiful, hand-picked color palettes for your next design project on Chromatic.",
      url: window.location.origin,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.origin);
        toast.success("Website link copied to clipboard!");
      }
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        console.error('Error sharing website:', err);
        toast.error("Failed to share website");
      }
    }
  }, []);

  const handleBrowse = useCallback(() => {
    const searchInput = document.getElementById('navbar-search');
    if (searchInput) {
      searchInput.focus();
    }
  }, []);

  const handleMaker = useCallback(() => navigate('/palette-maker'), [navigate]);
  const handleCustomize = useCallback(() => navigate('/customize'), [navigate]);
  const handlePickFromImage = useCallback(() => setIsImagePickerOpen(true), []);
  const handleAddNew = useCallback(() => {
    setEditingPalette(null);
    setIsModalOpen(true);
  }, []);

  // Combine Supabase palettes with user-created palettes and hardcoded defaults, and deduplicate by ID
  const allPalettes = useMemo(() => {
    const map = new Map<string, Palette>();

    // 1. Add Hardcoded Default Palettes (Source of Truth for Local Work)
    Object.entries(DefaultPalettes).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((p: Palette) => {
          // Add section tag based on the array name if not present
          const sectionFromKey = key.replace('Palettes', '').toLowerCase();
          const tags = p.tags || [];
          if (!tags.includes(sectionFromKey)) {
            tags.push(sectionFromKey);
          }
          map.set(p.id, { ...p, tags, section: p.section || sectionFromKey });
        });
      }
    });

    // 2. Add Supabase palettes (Override defaults if ID matches)
    supabasePalettes.forEach(p => map.set(p.id, p));

    // 3. Add user palettes (Latest overrides)
    userPalettes.forEach(up => {
      const existing = map.get(up.id);
      map.set(up.id, {
        ...existing,
        ...up,
        category: up.category || existing?.category || "Custom",
        tags: up.tags && up.tags.length > 0 ? up.tags : (existing?.tags || [])
      });
    });

    // FILTER: Purge all muted, pastel, and low-contrast palettes globally
    // We use a more careful matching to avoid accidental matches like 'nice' for 'ice'
    const unwantedKeywords = [
      'pastel', 'muted', 'soft', 'pale', 'beige', 'cream', 'serenity', 'gelato', 'chiffon',
      'marshmallow', 'dusty', 'haze', 'lilac', 'peachy', 'candy', 'bubblegum', 'baby',
      'frost', 'ice', 'lavender', 'pearl', 'blush', 'ivory', 'apricot', 'cotton',
      'pistachio', 'keen', 'pop', 'blossom', 'petal', 'cloudy', 'dreamy', 'mist',
      'linen', 'soap', 'feather', 'paper', 'wheat', 'antique', 'latte', 'bisque',
      'puff', 'fair', 'complexion', 'rosy', 'peach', 'vanilla', 'sorbet', 'powder',
      'faded', 'dawn', 'airy', 'gentle', 'delicate'
    ];

    return Array.from(map.values()).filter(p => {
      const pTags = p.tags?.map(t => t.toLowerCase()) || [];
      const pName = p.name.toLowerCase();
      const pCategory = p.category?.toLowerCase() || "";
      const pSection = p.section?.toLowerCase() || "";

      // Check for unwanted keywords - STRICT matching to only hide truly muted palettes
      const matchesUnwanted = unwantedKeywords.some(kw =>
        pTags.some(tag => tag === kw) // Only filter if the palette is explicitly TAGGED as muted/pastel
      );

      return !matchesUnwanted;
    });
  }, [userPalettes, supabasePalettes]);

  // Calculate total unique colors across all active palettes
  const totalUniqueColorsCount = useMemo(() => {
    const colors = new Set<string>();
    allPalettes.forEach(p => p.colors.forEach(c => colors.add(c.toUpperCase())));
    return colors.size;
  }, [allPalettes]);

  // Derive favorite palette objects
  const favoritePalettes = useMemo(() =>
    allPalettes.filter(p => isFavorite(p.id)),
    [allPalettes, favorites]
  );

  // Filter palettes based on search query and category
  const filteredPalettes = useMemo(() => {
    // 1. Filter by Favorites Category
    if (selectedCategory?.toLowerCase() === 'favorites') {
      return favoritePalettes;
    }

    // 2. Filter by Search Query
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
  }, [allPalettes, selectedCategory, deferredSearchQuery, favoritePalettes]);

  const totalResults = filteredPalettes.length;

  // Calculate total number of palettes (only Supabase palettes, not user-created)
  const totalPalettes = supabasePalettes.length;

  // Determine section properties based on current filter
  const getSectionProps = () => {
    if (searchQuery) return { title: "Search Results", mode: "dark" as const };
    if (selectedCategory) {
      // Simple heuristic: adjust icon mode based on category name or selected content
      // For now default to dark theme consistency
      return {
        title: `${selectedCategory} Palettes`,
        mode: "dark" as const
      };
    }
    return { title: "All Palettes", mode: "dark" as const };
  };

  const { title: sectionTitle, mode: sectionMode } = getSectionProps();

  const showRightPanel = favoritePalettes.length > 0;

  // Define the ordered list of categories to display on the home page (Dashboard)
  const HOME_CATEGORIES = [
    // Vibes
    'Bold', 'Dark', 'Neon', 'Gold', 'Glow',
    // Styles
    'Vintage', 'Retro', 'Warm', 'Cold',
    // Seasons
    'Summer', 'Spring', 'Fall', 'Winter',
    // Moods
    'Happy', 'Night',
    // Themes
    'Nature', 'Earth', 'Space', 'Rainbow', 'Gradient', 'Sunset', 'Sky', 'Sea',
    // Light
    'Light',
    // Special
    'Skin', 'Kid', 'Food', 'Coffee', 'Wedding', 'Christmas',
  ];

  // Helper to get palettes for a specific category — STRICT matching only.
  // A palette only appears in a category if it is explicitly tagged, categorised, or sectioned for it.
  const getPalettesByCategory = useCallback((category: string) => {
    const catLower = category.toLowerCase();

    // Special Case: Favorites
    if (catLower === 'favorites') {
      return favoritePalettes;
    }

    return allPalettes.filter(p => {
      // 1. Exact tag match
      if (p.tags?.some(t => t.toLowerCase() === catLower)) return true;
      // 2. Exact category field match
      if (p.category?.toLowerCase() === catLower) return true;
      // 3. Exact section field match
      if (p.section?.toLowerCase() === catLower) return true;
      return false;
    });
  }, [allPalettes, favoritePalettes]);

  interface DashboardSection {
    title: string;
    palettes: Palette[];
    mode: 'light' | 'dark';
    key: string;
  }

  // Determine which sections to render
  const sectionsToRender = useMemo((): DashboardSection[] => {
    // Search results
    if (searchQuery) {
      return [{ title: "Search Results", palettes: filteredPalettes, mode: 'dark' as const, key: 'search' }];
    }
    // Single category view — strict, only that category's palettes
    if (selectedCategory) {
      const palettes = getPalettesByCategory(selectedCategory);
      const isLight = ["light", "bright", "pale", "soft", "cream", "wedding", "spring"].some(k => selectedCategory.toLowerCase().includes(k));
      return [{
        title: `${selectedCategory} Palettes`,
        palettes,
        mode: (isLight ? 'light' : 'dark' as const),
        key: 'selected-cat'
      }];
    }
    // Home (no category, no search) — no palette sections, just show the Hero
    return [];
  }, [selectedCategory, searchQuery, filteredPalettes, getPalettesByCategory]);

  // Derived sections to actually show (performance optimization)
  const visibleSections = useMemo((): DashboardSection[] => {
    if (searchQuery || selectedCategory) return sectionsToRender;
    return sectionsToRender.slice(0, visibleSectionsCount);
  }, [sectionsToRender, visibleSectionsCount, searchQuery, selectedCategory]);

  const loadMoreSections = useCallback(() => {
    setVisibleSectionsCount(prev => Math.min(prev + 6, sectionsToRender.length));
  }, [sectionsToRender.length]);

  return (
    <div className="h-screen overflow-hidden flex flex-col bg-background theme-transition">
      {/* Background Gradients (Fixed in Background) */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-background theme-transition" />
        <div className="absolute -left-1/4 top-0 h-[500px] w-[500px] rounded-full blur-3xl theme-transition bg-[var(--blob-1)]" />
        <div className="absolute -right-1/4 bottom-0 h-[600px] w-[600px] rounded-full blur-3xl theme-transition bg-[var(--blob-2)]" />
      </div>
      <div className="grain pointer-events-none fixed inset-0 -z-10" />

      <Navbar
        selectedCategory={selectedCategory}
        setSelectedCategory={handleSelectCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        allPalettesCount={allPalettes.length}
        totalUniqueColors={totalUniqueColorsCount}
        totalResults={totalResults}
        onAddNew={handleAddNew}
        onPickFromImage={handlePickFromImage}
        onSearchSubmit={handleSearchSubmit}
        themeMode={themeMode}
        onToggleTheme={toggleTheme}
        onLogoClick={handleLogoClick}
      />

      {/* ── FIXED VERTICAL SIDEBAR ─────────────────────────────────────────
           Fixed left sidebar below the 80px Navbar.
           Contains the vertical CategoryMenu — scrolls independently.
           Palette grid sits to its right and scrolls up/down. */}
      <aside
        className="fixed left-0 bottom-0 z-[38] overflow-y-auto thin-scrollbar hidden lg:block"
        style={{
          top: 80,
          width: 220,
          borderRight: '1px solid rgba(255,255,255,0.05)',
          background: 'rgba(var(--background-rgb, 10,10,18), 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        <div className="px-4 py-6">
          <Suspense fallback={
            <div className="space-y-2">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-8 bg-secondary/20 animate-pulse rounded-lg" />
              ))}
            </div>
          }>
            <CategoryMenu
              selectedCategory={selectedCategory}
              onSelectCategory={handleSelectCategory}
            />
          </Suspense>
        </div>
      </aside>

      <main className="flex-1 min-h-0 pt-[80px] overflow-hidden lg:pl-[220px]">
        {/* Content Area — scrolls ONLY vertically */}
        <div id="main-scroll-view" className="h-full overflow-y-auto thin-scrollbar">
          {/* HERO — shown only on the home dashboard (no category / search active) */}
          {!selectedCategory && !searchQuery && (
            <div className="w-full animate-fade-in">
              <Hero
                onBrowse={handleBrowse}
                onMaker={handleMaker}
                onCustomize={handleCustomize}
                onPickFromImage={handlePickFromImage}
                livePalettes={allPalettes}
              />
            </div>
          )}

          {/* MOBILE ONLY CATEGORY SLIDER */}
          <div className="lg:hidden sticky top-0 z-[30] -mx-4 sm:-mx-6 px-4 sm:px-6 py-2 bg-background/80 backdrop-blur-xl border-b border-white/5 mb-8">
            <Suspense fallback={null}>
              <CategoryMenu
                horizontal
                selectedCategory={selectedCategory}
                onSelectCategory={handleSelectCategory}
                className="w-full"
              />
            </Suspense>
          </div>

          <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 py-12">
            {/* PALETTE GRID — shown only when a category or search is active */}
            {(selectedCategory || searchQuery) && (
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
                      isAdmin={isAdmin}
                      onAdminDelete={handleAdminDelete}
                    />
                  ))}

                  {/* Empty state */}
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
            )}

            {/* SUPPORTING LANDING CONTENT — home only */}
            {!selectedCategory && !searchQuery && (
              <>
                <div className="mt-20"><WhyChromatic /></div>
                <div className="mt-32"><AboutCreator /></div>
              </>
            )}

            {/* Unified Footer */}
            <footer className="pt-24 pb-20 border-t border-white/[0.03] mt-32">
              <div className="container mx-auto px-4">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-center">
                  <span className="inline-block animate-pop-pulse">
                    <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-medium text-primary/90">© 2026 Jainil Patel</span>
                  </span>
                  <span className="hidden sm:block h-1 w-1 rounded-full bg-white/10" />
                  <span className="font-display text-[11px] sm:text-[12px] tracking-wide font-light text-white">Chromatic — A curated palette of colours.</span>
                  <span className="hidden sm:block h-1 w-1 rounded-full bg-white/10" />
                  <button
                    onClick={handleShareWebsite}
                    className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-secondary-foreground/60 hover:text-foreground transition-all"
                  >
                    <Share2 className="h-3 w-3" />
                    Share Site
                  </button>
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
                  isFavorite={isFavorite(selectedPalette.id)}
                  onToggleFavorite={toggleFavorite}
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
                name: p.name,
                colors: p.colors,
                tags: p.tags || [],
                section: selectedCategory === 'Kid' ? 'kid' : undefined
              });
            }
            setIsModalOpen(false);
            setEditingPalette(null);
          }}
          initialPalette={editingPalette ? {
            id: editingPalette.id,
            name: editingPalette.name,
            colors: editingPalette.colors,
            tags: editingPalette.tags || []
          } : undefined}
        />

        <ImagePickerModal
          isOpen={isImagePickerOpen}
          onClose={() => setIsImagePickerOpen(false)}
          onExport={(p) => {
            addPalette({
              name: p.name,
              colors: p.colors,
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

      {/* Floating Bottom Dock — always visible, centered */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 rounded-2xl bg-background/80 backdrop-blur-xl border border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.05)] ring-1 ring-white/5">
        {/* Pixels */}
        <button
          onClick={handlePickFromImage}
          className="group flex flex-col items-center gap-1 px-3 sm:px-4 py-2 rounded-xl hover:bg-sky-500/10 transition-all duration-200"
          title="Pixels — Extract from Image"
        >
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-sky-400 to-blue-600 shadow-[0_2px_10px_-2px_rgba(56,189,248,0.5)] group-hover:shadow-[0_4px_15px_-2px_rgba(56,189,248,0.6)] group-hover:scale-110 transition-all">
            <ImageIcon className="h-4 w-4 text-white" />
          </div>
          <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-secondary-foreground/50 group-hover:text-sky-400 transition-colors">Pixels</span>
        </button>

        <div className="w-px h-8 bg-white/5" />

        {/* Build */}
        <button
          onClick={handleMaker}
          className="group flex flex-col items-center gap-1 px-3 sm:px-4 py-2 rounded-xl hover:bg-amber-500/10 transition-all duration-200"
          title="Build — Create Palettes"
        >
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-amber-400 to-orange-600 shadow-[0_2px_10px_-2px_rgba(245,158,11,0.5)] group-hover:shadow-[0_4px_15px_-2px_rgba(245,158,11,0.6)] group-hover:scale-110 transition-all">
            <PaletteIcon className="h-4 w-4 text-white" />
          </div>
          <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-secondary-foreground/50 group-hover:text-amber-400 transition-colors">Build</span>
        </button>

        <div className="w-px h-8 bg-white/5" />

        {/* Tweak */}
        <button
          onClick={handleCustomize}
          className="group flex flex-col items-center gap-1 px-3 sm:px-4 py-2 rounded-xl hover:bg-violet-500/10 transition-all duration-200"
          title="Tweak — Customize Colors"
        >
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-violet-400 to-purple-600 shadow-[0_2px_10px_-2px_rgba(139,92,246,0.5)] group-hover:shadow-[0_4px_15px_-2px_rgba(139,92,246,0.6)] group-hover:scale-110 transition-all">
            <Paintbrush className="h-4 w-4 text-white" />
          </div>
          <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-secondary-foreground/50 group-hover:text-violet-400 transition-colors">Tweak</span>
        </button>

        <div className="w-px h-8 bg-white/5" />

        {/* Share */}
        <button
          onClick={handleShareWebsite}
          className="group flex flex-col items-center gap-1 px-3 sm:px-4 py-2 rounded-xl hover:bg-emerald-500/10 transition-all duration-200"
          title="Share Chromatic"
        >
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-400 to-green-600 shadow-[0_2px_10px_-2px_rgba(52,211,153,0.5)] group-hover:shadow-[0_4px_15px_-2px_rgba(52,211,153,0.6)] group-hover:scale-110 transition-all">
            <Share2 className="h-4 w-4 text-white" />
          </div>
          <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-secondary-foreground/50 group-hover:text-emerald-400 transition-colors">Share</span>
        </button>
      </div>
    </div>
  );
};

export default Index;
