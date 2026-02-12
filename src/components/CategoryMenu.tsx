
import { cn } from "@/lib/utils";
import {
  Sparkles, Leaf, Sun, Heart, Palette, Cloud, Gift,
  Moon, Layers, Zap, Star, LayoutGrid, Flame
} from "lucide-react";

interface CategoryMenuProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
  className?: string;
  horizontal?: boolean;
}

const MENU_SECTIONS = [
  {
    title: "Vibes",
    icon: Zap,
    items: [
      "Pastel", "Vintage", "Retro", "Neon", "Gold",
      "Light", "Dark", "Warm", "Cold"
    ]
  },
  {
    title: "Seasons",
    icon: Sun,
    items: ["Summer", "Fall", "Winter", "Spring", "Happy"]
  },
  {
    title: "Themes",
    icon: Star,
    items: [
      "Nature", "Earth", "Night", "Space", "Rainbow",
      "Gradient", "Sunset", "Sky", "Sea"
    ]
  },
  {
    title: "Special",
    icon: Gift,
    items: [
      "Kid", "Skin", "Food", "Cream", "Coffee",
      "Wedding", "Christmas"
    ]
  }
];

export function CategoryMenu({ selectedCategory, onSelectCategory, className, horizontal = false }: CategoryMenuProps) {
  if (horizontal) {
    return (
      <div className={cn("inline-flex items-center gap-2 py-4 px-2 overflow-x-auto no-scrollbar max-w-full", className)}>
        {/* "All" Reset Button */}
        <button
          onClick={() => onSelectCategory(null)}
          className={cn(
            "group flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-300 border font-bold",
            !selectedCategory
              ? "bg-primary text-primary-foreground border-primary shadow-[0_0_20px_rgba(var(--primary),0.3)] scale-[1.05]"
              : "bg-white/5 text-secondary-foreground/60 border-white/10 hover:bg-white/10 hover:text-foreground"
          )}
        >
          <LayoutGrid className={cn("h-4 w-4", !selectedCategory ? "text-white" : "text-primary/60 group-hover:text-primary")} />
          <span className="font-display text-sm">All</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Favorites Filter */}
          <button
            onClick={() => onSelectCategory('Favorites')}
            className={cn(
              "group flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-300 border font-bold",
              selectedCategory === 'Favorites'
                ? "bg-red-500/20 text-red-500 border-red-500/40 shadow-inner"
                : "bg-white/5 text-secondary-foreground/60 border-white/10 hover:bg-white/10 hover:text-foreground"
            )}
          >
            <Heart className={cn("h-4 w-4", selectedCategory === 'Favorites' ? "fill-red-500 text-red-500" : "text-red-500/60 group-hover:text-red-500")} />
            <span className="font-display text-sm">Favorites</span>
          </button>

          <div className="h-6 w-px bg-white/5 mx-2" />
        </div>

        <div className="flex items-center gap-2">
          {MENU_SECTIONS.map((section) => (
            <div key={section.title} className="flex items-center gap-2">
              <div className="h-6 w-px bg-white/5 mx-2" />
              {section.items.map((item) => (
                <button
                  key={item}
                  onClick={() => onSelectCategory(item === selectedCategory ? null : item)}
                  className={cn(
                    "group flex-shrink-0 px-5 py-2.5 rounded-full transition-all duration-300 border text-sm font-medium",
                    selectedCategory === item
                      ? "bg-primary/20 text-primary border-primary/40 shadow-inner"
                      : "bg-white/5 text-secondary-foreground/60 border-white/5 hover:bg-white/10 hover:text-foreground"
                  )}
                >
                  {item}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-8 py-2 pb-10", className)}>
      {/* "All" Reset Button */}
      <button
        onClick={() => onSelectCategory(null)}
        className={cn(
          "group relative flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300",
          !selectedCategory
            ? "bg-primary text-primary-foreground shadow-[0_0_20px_rgba(var(--primary),0.3)] font-bold scale-[1.02]"
            : "text-secondary-foreground/60 hover:bg-secondary/40 hover:text-foreground"
        )}
      >
        <LayoutGrid className={cn("h-4 w-4", !selectedCategory ? "text-white" : "text-primary/60 group-hover:text-primary")} />
        <span className="font-display text-sm">Dashboard</span>
        {!selectedCategory && (
          <div className="absolute right-3 h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
        )}
      </button>

      <button
        onClick={() => onSelectCategory('Favorites')}
        className={cn(
          "group relative flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300",
          selectedCategory === 'Favorites'
            ? "bg-red-500/10 text-red-500 shadow-inner font-bold scale-[1.02]"
            : "text-secondary-foreground/60 hover:bg-secondary/40 hover:text-foreground"
        )}
      >
        <Heart className={cn("h-4 w-4", selectedCategory === 'Favorites' ? "fill-red-500 text-red-500" : "text-red-500/60 group-hover:text-red-500")} />
        <span className="font-display text-sm">Favorites</span>
        {selectedCategory === 'Favorites' && (
          <div className="absolute right-3 h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
        )}
      </button>

      <div className="space-y-8">
        {MENU_SECTIONS.map((section) => (
          <div key={section.title} className="space-y-4">
            <div className="flex items-center gap-2.5 px-3">
              <div className="p-1 rounded-md bg-secondary/30">
                <section.icon className="h-3 w-3 text-primary/70" />
              </div>
              <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-secondary-foreground/40 font-bold">
                {section.title}
              </h3>
            </div>

            <div className="flex flex-col gap-0.5">
              {section.items.map((item) => (
                <button
                  key={item}
                  onClick={() => onSelectCategory(item === selectedCategory ? null : item)}
                  className={cn(
                    "group relative px-4 py-2 rounded-lg text-left transition-all duration-200",
                    "font-display text-sm tracking-wide",
                    selectedCategory === item
                      ? "bg-secondary text-primary font-semibold shadow-sm translate-x-1"
                      : "text-secondary-foreground/60 hover:text-foreground hover:translate-x-1"
                  )}
                >
                  <span className="relative z-10">{item}</span>
                  {selectedCategory === item && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-primary rounded-r-full" />
                  )}
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/[0.03] rounded-lg transition-colors" />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

