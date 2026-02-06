import { Palette as PaletteIcon, Search, X, Menu, PanelLeftClose, PanelLeftOpen, Plus, Image as ImageIcon, Paintbrush } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CategoryMenu } from "@/components/CategoryMenu";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
    isSidebarOpen: boolean;
    setIsSidebarOpen: (open: boolean) => void;
    selectedCategory: string | null;
    setSelectedCategory: (category: string | null) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    allPalettesCount: number;
    totalResults: number;
    onAddNew: () => void;
    onPickFromImage: () => void;
    onSearchSubmit?: () => void;
}

export const Navbar = ({
    isSidebarOpen,
    setIsSidebarOpen,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    allPalettesCount,
    totalResults,
    onAddNew,
    onPickFromImage,
    onSearchSubmit
}: NavbarProps) => {
    const navigate = useNavigate();

    return (
        <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-xl">
            <div className="mx-auto max-w-[1800px] px-4 py-4 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
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
                                    onSelectCategory={setSelectedCategory}
                                    className="mt-8 px-4"
                                />
                            </SheetContent>
                        </Sheet>

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 overflow-hidden ring-1 ring-white/10">
                            <img src="/logo.png" alt="Chromatic Logo" className="h-full w-full object-cover" />
                        </div>
                        <div className="hidden xs:block">
                            <h1 className="font-display text-2xl text-foreground leading-none">
                                Chromatic
                            </h1>
                            <p className="font-mono text-[10px] text-muted-foreground mt-0.5">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent font-bold">
                                    713
                                </span> Curated Palettes
                            </p>
                        </div>
                    </div>

                    {/* Search Bar & Add Button */}
                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-2xl">
                        <div className="relative flex-1 w-full">
                            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
                            <input
                                id="navbar-search"
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && onSearchSubmit) {
                                        onSearchSubmit();
                                    }
                                }}
                                placeholder="Search palettes..."
                                className="w-full rounded-full border border-white/10 bg-white/5 py-2.5 pl-11 pr-10 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all"
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

                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            <Button
                                onClick={onAddNew}
                                className="flex-1 sm:flex-none rounded-full bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/20 transition-all font-mono text-[10px] uppercase h-10 px-5"
                            >
                                <Plus className="h-3.5 w-3.5 mr-1.5" />
                                Add Palette
                            </Button>

                            <Button
                                variant="outline"
                                onClick={onPickFromImage}
                                className="flex-1 sm:flex-none rounded-full border-white/10 bg-white/5 hover:bg-white/10 transition-all font-mono text-[10px] uppercase h-10 px-5"
                            >
                                <ImageIcon className="h-3.5 w-3.5 mr-1.5" />
                                From Image
                            </Button>

                            <Button
                                variant="outline"
                                onClick={() => navigate('/customize')}
                                className="flex-1 sm:flex-none rounded-full border-white/10 bg-white/5 hover:bg-white/10 transition-all font-mono text-[10px] uppercase h-10 px-5"
                            >
                                <Paintbrush className="h-3.5 w-3.5 mr-1.5" />
                                Customize
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};
