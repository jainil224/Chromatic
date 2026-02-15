import { Palette as PaletteIcon, Search, X, Menu, Image as ImageIcon, Paintbrush, PanelLeftClose, PanelLeftOpen, Upload } from "lucide-react";
import { ModeToggle, type ThemeMode } from "./ModeToggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CategoryMenu } from "@/components/CategoryMenu";
import { SubmitPaletteModal } from "@/components/SubmitPaletteModal";
import { cn } from "@/lib/utils";
import { NavbarTour } from "./NavbarTour";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface NavbarProps {
    selectedCategory: string | null;
    setSelectedCategory: (category: string | null) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    allPalettesCount: number;
    totalResults: number;
    onAddNew: () => void;
    onPickFromImage: () => void;
    onSearchSubmit?: () => void;
    themeMode: ThemeMode;
    onToggleTheme: () => void;
    onLogoClick?: () => void;
}

export const Navbar = ({
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    allPalettesCount,
    totalResults,
    onAddNew,
    onPickFromImage,
    onSearchSubmit,
    themeMode,
    onToggleTheme,
    onLogoClick,
}: NavbarProps) => {
    const navigate = useNavigate();
    const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

    return (
        <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-[1200px] pointer-events-none">
            <div className="glass-dock pulse-glow flex items-center justify-between px-4 py-2 pointer-events-auto ring-1 ring-white/10 shadow-2xl">
                {/* Branding Pill */}
                <div className="flex items-center gap-2 pr-4 border-r border-white/10">
                    <button
                        id="tour-logo"
                        onClick={onLogoClick}
                        className={cn(
                            "group relative flex items-center gap-2 rounded-full pl-3 pr-4 py-1.5 transition-all hover:scale-[1.02] ring-1 ring-white/20 shadow-[0_0_20px_-5px_rgba(0,0,0,0.4)]",
                            themeMode === 'midnight'
                                ? "bg-gradient-to-r from-blue-600 to-indigo-700 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.5)]"
                                : themeMode === 'light'
                                    ? "bg-gradient-to-r from-orange-500 to-amber-600 hover:shadow-[0_0_30px_-5px_rgba(249,115,22,0.4)]"
                                    : "bg-gradient-to-r from-amber-500 to-orange-600 shadow-[0_0_20px_-5px_hsl(var(--primary)/0.4)] hover:shadow-[0_0_30px_-5px_hsl(var(--primary)/0.6)]"
                        )}
                    >
                        <div className="h-4 w-4 flex items-center justify-center overflow-hidden rounded-sm bg-white/10 group-hover:bg-white/20 transition-colors ring-1 ring-white/20">
                            <img
                                src="/logo_1_upscaled.png?v=2"
                                alt="Chromatic Logo"
                                className="h-full w-full object-contain scale-125 transition-transform group-hover:scale-150"
                            />
                        </div>
                        <div className="flex items-center gap-1.5 whitespace-nowrap">
                            <span className="font-mono text-[10px] font-bold uppercase tracking-tight text-white/90">
                                Colors Palettes:
                            </span>
                            <span className="font-display text-base font-black text-white leading-none">
                                {allPalettesCount}
                            </span>
                        </div>
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_3s_infinite]" />
                        </div>
                    </button>
                </div>

                {/* Main Navigation Logic */}
                <div className="flex items-center gap-2 px-4 flex-1 max-w-xl">
                    <div className="relative flex-1 group/search">
                        <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-secondary-foreground/40 transition-colors group-focus-within/search:text-primary" />
                        <input
                            id="navbar-search"
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && onSearchSubmit?.()}
                            placeholder="Find inspiration..."
                            className="w-full rounded-full border border-white/5 bg-white/5 py-1.5 pl-9 pr-8 font-mono text-xs text-foreground placeholder:text-secondary-foreground/30 focus:bg-white/10 focus:border-white/10 focus:ring-1 focus:ring-white/10 focus:outline-none transition-all"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-secondary-foreground/40 hover:bg-white/10 hover:text-foreground transition-colors"
                            >
                                <X className="h-3 w-3" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Actions & Theme */}
                <div className="flex items-center gap-2 pl-4 border-l border-white/10">
                    {/* Compact Action Buttons */}
                    <div className="hidden lg:flex items-center gap-1">
                        <Button
                            variant="ghost"
                            size="sm"
                            id="tour-pixels"
                            onClick={onPickFromImage}
                            className="rounded-full h-8 px-3 text-[10px] font-mono text-secondary-foreground/60 hover:text-foreground hover:bg-white/10 hover:shadow-lg transition-all uppercase"
                        >
                            <ImageIcon className="h-3 w-3 mr-1.5" />
                            Pixels
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            id="tour-build"
                            onClick={() => navigate('/palette-maker')}
                            className="rounded-full h-8 px-3 text-[10px] font-mono text-secondary-foreground/60 hover:text-foreground hover:bg-white/10 hover:shadow-lg transition-all uppercase"
                        >
                            <PaletteIcon className="h-3 w-3 mr-1.5" />
                            Build
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            id="tour-tweak"
                            onClick={() => navigate('/customize')}
                            className="rounded-full h-8 px-3 text-[10px] font-mono text-secondary-foreground/60 hover:text-foreground hover:bg-white/10 hover:shadow-lg transition-all uppercase"
                        >
                            <Paintbrush className="h-3 w-3 mr-1.5" />
                            Tweak
                        </Button>

                    </div>

                    <ModeToggle id="tour-theme-toggle" mode={themeMode} onToggle={onToggleTheme} />

                    {/* Mobile Menu Trigger moved into Dock */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="lg:hidden h-8 w-8 rounded-full hover:bg-white/5">
                                <Menu className="h-4 w-4" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[280px] border-r-border bg-background/95 backdrop-blur-xl p-0">
                            <CategoryMenu
                                selectedCategory={selectedCategory}
                                onSelectCategory={setSelectedCategory}
                                className="mt-8 px-4"
                            />
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
            <SubmitPaletteModal
                isOpen={isSubmitModalOpen}
                onClose={() => setIsSubmitModalOpen(false)}
            />
            <NavbarTour />
        </header >
    );
};
