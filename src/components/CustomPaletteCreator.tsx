import { useState } from "react";
import { Plus, X, Sparkles, Check } from "lucide-react";
import { toast } from "sonner";
import type { Palette } from "@/data/palettes";

interface CustomPaletteCreatorProps {
  onCreatePalette: (palette: Palette, mode: "dark" | "light") => void;
}

export function CustomPaletteCreator({ onCreatePalette }: CustomPaletteCreatorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [colors, setColors] = useState<string[]>(["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981"]);
  const [mode, setMode] = useState<"dark" | "light">("dark");

  const addColor = () => {
    if (colors.length < 8) {
      setColors([...colors, "#6b7280"]);
    }
  };

  const removeColor = (index: number) => {
    if (colors.length > 2) {
      setColors(colors.filter((_, i) => i !== index));
    }
  };

  const updateColor = (index: number, color: string) => {
    const newColors = [...colors];
    newColors[index] = color;
    setColors(newColors);
  };

  const handleCreate = () => {
    if (!name.trim()) {
      toast.error("Please enter a palette name");
      return;
    }

    const newPalette: Palette = {
      id: `custom-${Date.now()}`,
      name: name.trim(),
      colors: colors,
      tags: ["custom"],
    };

    onCreatePalette(newPalette, mode);
    toast.success(`"${name}" palette created!`, {
      position: "bottom-center",
    });

    // Reset form
    setName("");
    setColors(["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981"]);
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="group flex w-full items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border bg-card/50 p-6 transition-all duration-300 hover:border-primary hover:bg-card"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/20">
          <Plus className="h-5 w-5 text-primary" />
        </div>
        <div className="text-left">
          <p className="font-display text-lg text-foreground">Create Custom Palette</p>
          <p className="font-mono text-xs text-muted-foreground">Design your own color scheme</p>
        </div>
      </button>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-primary/50 bg-card p-6 glow-accent animate-scale-in">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h3 className="font-display text-xl text-foreground">New Palette</h3>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Name Input */}
      <div className="mb-6">
        <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Palette Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Ocean Sunset"
          className="w-full rounded-lg border border-border bg-muted px-4 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Mode Selection */}
      <div className="mb-6">
        <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Add to Section
        </label>
        <div className="flex gap-2">
          {(["dark", "light"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`flex-1 rounded-lg border px-4 py-2 font-mono text-xs uppercase transition-all ${
                mode === m
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:border-muted-foreground"
              }`}
            >
              {m} Palettes
            </button>
          ))}
        </div>
      </div>

      {/* Color Pickers */}
      <div className="mb-6">
        <label className="mb-3 block font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Colors ({colors.length}/8)
        </label>
        
        {/* Preview Bar */}
        <div className="mb-4 flex h-12 overflow-hidden rounded-lg">
          {colors.map((color, i) => (
            <div
              key={i}
              className="flex-1 transition-all first:rounded-l-lg last:rounded-r-lg"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        {/* Color Inputs Grid */}
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-5">
          {colors.map((color, index) => (
            <div key={index} className="relative group">
              <label
                className="flex h-14 w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg border-2 border-transparent transition-all hover:border-foreground/20"
                style={{ backgroundColor: color }}
              >
                <input
                  type="color"
                  value={color}
                  onChange={(e) => updateColor(index, e.target.value)}
                  className="absolute inset-0 cursor-pointer opacity-0"
                />
                <span className="font-mono text-[10px] font-medium uppercase opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ 
                    color: isLightColor(color) ? "#1a1a1a" : "#ffffff" 
                  }}
                >
                  {color}
                </span>
              </label>
              {colors.length > 2 && (
                <button
                  onClick={() => removeColor(index)}
                  className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-destructive-foreground opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
          ))}
          
          {colors.length < 8 && (
            <button
              onClick={addColor}
              className="flex h-14 items-center justify-center rounded-lg border-2 border-dashed border-border text-muted-foreground transition-all hover:border-primary hover:text-primary"
            >
              <Plus className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={() => setIsOpen(false)}
          className="flex-1 rounded-lg border border-border px-4 py-3 font-mono text-xs uppercase tracking-wider text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
        >
          Cancel
        </button>
        <button
          onClick={handleCreate}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 font-mono text-xs uppercase tracking-wider text-primary-foreground transition-all hover:opacity-90"
        >
          <Check className="h-4 w-4" />
          Create Palette
        </button>
      </div>
    </div>
  );
}

function isLightColor(hex: string): boolean {
  const c = hex.substring(1);
  const rgb = parseInt(c, 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = (rgb >> 0) & 0xff;
  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luma > 140;
}
