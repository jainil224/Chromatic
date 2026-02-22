import { Palette as PaletteIcon, Search, X, Menu, Image as ImageIcon, Paintbrush, PanelLeftClose, PanelLeftOpen, Upload, Share2, Link2, Twitter } from "lucide-react";
import { toast } from "sonner";
import { ModeToggle, type ThemeMode } from "./ModeToggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CategoryMenu } from "@/components/CategoryMenu";
import { SubmitPaletteModal } from "@/components/SubmitPaletteModal";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
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
    totalUniqueColors?: number;
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
    totalUniqueColors,
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
    const [shareOpen, setShareOpen] = useState(false);

    const shareUrl = window.location.origin;
    const shareText = "Discover beautiful, hand-picked color palettes for your next design project on Chromatic.";

    const handleCopyLink = async () => {
        await navigator.clipboard.writeText(shareUrl);
        toast.success("Link copied to clipboard!");
        setShareOpen(false);
    };

    const handleShareNative = async () => {
        try {
            if (navigator.share) {
                await navigator.share({ title: "Chromatic - Modern Color Palettes", text: shareText, url: shareUrl });
            } else {
                await handleCopyLink();
            }
        } catch (err) {
            if ((err as Error).name !== 'AbortError') toast.error("Sharing failed");
        }
        setShareOpen(false);
    };

    const handleShareTwitter = () => {
        const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        window.open(tweetUrl, '_blank', 'noopener,noreferrer');
        setShareOpen(false);
    };

    return (
        <header className="fixed top-0 sm:top-6 left-1/2 -translate-x-1/2 z-50 w-full sm:w-[95%] max-w-[1200px] pointer-events-none transition-all duration-300">
            <div className="glass-dock pulse-glow flex items-center justify-between px-3 sm:px-4 py-2 pointer-events-auto ring-1 ring-white/10 shadow-2xl rounded-none sm:rounded-full">
                {/* Branding Pill */}
                <div className="flex items-center gap-2 pr-3 sm:pr-4 border-r border-white/10">
                    <button
                        id="tour-logo"
                        onClick={onLogoClick}
                        className={cn(
                            "group relative flex items-center gap-2 rounded-full pl-2 sm:pl-3 pr-3 sm:pr-4 py-1.5 transition-all hover:scale-[1.02] ring-1 ring-white/20 shadow-[0_0_20px_-5px_rgba(0,0,0,0.4)]",
                            themeMode === 'midnight'
                                ? "bg-gradient-to-r from-blue-600 to-indigo-700 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.5)]"
                                : "bg-gradient-to-r from-amber-500 to-orange-600 shadow-[0_0_20px_-5px_hsl(var(--primary)/0.4)] hover:shadow-[0_0_30px_-5px_hsl(var(--primary)/0.6)]"
                        )}
                    >
                        <div className="h-4 w-4 flex items-center justify-center overflow-hidden rounded-sm bg-white/10 group-hover:bg-white/20 transition-colors ring-1 ring-white/20 shrink-0">
                            <img
                                src="/logo_1_upscaled.png?v=2"
                                alt="Chromatic Logo"
                                className="h-full w-full object-contain scale-125 transition-transform group-hover:scale-150"
                            />
                        </div>
                        <div className="flex items-center gap-1.5 whitespace-nowrap">
                            <span className="font-mono text-[10px] font-bold uppercase tracking-tight text-white/90">
                                Color Palettes:
                            </span>
                            <span className="font-display text-sm sm:text-base font-black text-white leading-none">
                                {allPalettesCount.toLocaleString()}
                            </span>
                        </div>
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_3s_infinite]" />
                        </div>
                    </button>
                </div>

                {/* Main Navigation Logic */}
                <div className="flex items-center gap-2 px-2 sm:px-4 flex-1 max-w-xl">
                    <div className="relative flex-1 group/search">
                        <Search className="absolute left-2.5 sm:left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-secondary-foreground/40 transition-colors group-focus-within/search:text-primary" />
                        <input
                            id="navbar-search"
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && onSearchSubmit?.()}
                            placeholder="Search..."
                            className="w-full rounded-full border border-white/5 bg-white/5 py-2 sm:py-1.5 pl-8 sm:pl-9 pr-7 sm:pr-8 font-mono text-[11px] sm:text-xs text-foreground placeholder:text-secondary-foreground/30 focus:bg-white/10 focus:border-white/10 focus:ring-1 focus:ring-white/10 focus:outline-none transition-all min-h-[44px] sm:min-h-0"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-secondary-foreground/40 hover:bg-white/10 hover:text-foreground transition-colors"
                            >
                                <X className="h-2.5 w-2.5" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Actions & Theme */}
                <div className="flex items-center gap-1.5 sm:gap-2 pl-3 sm:pl-4 border-l border-white/10">
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
                            Extract
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            id="tour-build"
                            onClick={() => navigate('/palette-maker')}
                            className="rounded-full h-8 px-3 text-[10px] font-mono text-secondary-foreground/60 hover:text-foreground hover:bg-white/10 hover:shadow-lg transition-all uppercase"
                        >
                            <PaletteIcon className="h-3 w-3 mr-1.5" />
                            Create
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            id="tour-tweak"
                            onClick={() => navigate('/customize')}
                            className="rounded-full h-8 px-3 text-[10px] font-mono text-secondary-foreground/60 hover:text-foreground hover:bg-white/10 hover:shadow-lg transition-all uppercase"
                        >
                            <Paintbrush className="h-3 w-3 mr-1.5" />
                            Customize
                        </Button>

                        {/* Share Dropdown — desktop */}
                        <Popover open={shareOpen} onOpenChange={setShareOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="rounded-full h-8 px-3 text-[10px] font-mono text-secondary-foreground/60 hover:text-foreground hover:bg-white/10 hover:shadow-lg transition-all uppercase"
                                    title="Share Chromatic"
                                >
                                    <Share2 className="h-3 w-3 mr-1.5" />
                                    Share
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent
                                side="bottom"
                                align="end"
                                sideOffset={12}
                                className="w-52 p-2 bg-background/95 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl"
                            >
                                <p className="px-2 py-1 text-[9px] font-mono uppercase tracking-widest text-secondary-foreground/40 mb-1">Share Chromatic</p>
                                <button
                                    onClick={handleCopyLink}
                                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-foreground/80 hover:bg-white/5 hover:text-foreground transition-all"
                                >
                                    <Link2 className="h-4 w-4 text-primary/70" />
                                    <span className="font-medium text-xs">Copy Link</span>
                                </button>
                                <button
                                    onClick={handleShareTwitter}
                                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-foreground/80 hover:bg-white/5 hover:text-foreground transition-all"
                                >
                                    <Twitter className="h-4 w-4 text-sky-400/80" />
                                    <span className="font-medium text-xs">Share on X / Twitter</span>
                                </button>
                                <button
                                    onClick={handleShareNative}
                                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-foreground/80 hover:bg-white/5 hover:text-foreground transition-all"
                                >
                                    <Share2 className="h-4 w-4 text-green-400/80" />
                                    <span className="font-medium text-xs">More Options</span>
                                </button>
                            </PopoverContent>
                        </Popover>
                    </div>

                    <ModeToggle id="tour-theme-toggle" mode={themeMode} onToggle={onToggleTheme} />

                    {/* Mobile Menu Trigger moved into Dock */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="lg:hidden h-10 w-10 sm:h-8 sm:w-8 rounded-full hover:bg-white/5">
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
