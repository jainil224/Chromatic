
import { cn } from "@/lib/utils";
import { Sparkles, Leaf, Sun, Heart, Palette, Cloud, Gift } from "lucide-react";

interface CategoryMenuProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
  className?: string; // Allow custom classes for responsive control
}

// Define the menu structure
const MENU_SECTIONS = [
  {
    title: "Vibes",
    icon: Palette,
    items: [
      "Pastel", "Vintage", "Retro", "Neon", "Gold",
      "Light", "Dark", "Warm", "Cold"
    ]
  },
  {
    title: "Seasons & Mood",
    icon: Sun,
    items: ["Summer", "Fall", "Winter", "Spring", "Happy"]
  },
  {
    title: "Themes",
    icon: Leaf,
    items: [
      "Nature", "Earth", "Night", "Space", "Rainbow",
      "Gradient", "Sunset", "Sky", "Sea"
    ]
  },
  {
    title: "Special",
    icon: Gift,
    items: [
      "Kids", "Skin", "Food", "Cream", "Coffee",
      "Wedding", "Christmas"
    ]
  }
];

export function CategoryMenu({ selectedCategory, onSelectCategory, className }: CategoryMenuProps) {
  return (
    <div className={cn("flex flex-col gap-6 py-2 pb-10", className)}>



      <div className="space-y-6">
        {MENU_SECTIONS.map((section) => (
          <div key={section.title} className="space-y-3">
            <div className="flex items-center gap-2 px-4 text-secondary-foreground/60">
              <section.icon className="h-3.5 w-3.5" />
              <h3 className="font-display text-sm tracking-wide">{section.title}</h3>
            </div>

            <div className="flex flex-col gap-1">
              {section.items.map((item) => (
                <button
                  key={item}
                  onClick={() => onSelectCategory(item === selectedCategory ? null : item)}
                  className={cn(
                    "relative px-4 py-2 rounded-lg text-left transition-all duration-200",
                    "font-mono text-xs hover:pl-5", // subtle interaction
                    selectedCategory === item
                      ? "bg-accent/10 text-accent font-medium shadow-[inset_2px_0_0_0_hsl(var(--accent))]" // Active state
                      : "text-secondary-foreground/70 hover:bg-secondary/50 hover:text-foreground"
                  )}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
