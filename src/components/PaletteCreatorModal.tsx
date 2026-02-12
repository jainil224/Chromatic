import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { generateTags } from "@/utils/tagGenerator";

interface PaletteCreatorModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (palette: { name: string; colors: string[]; tags: string[] }) => void;
    initialPalette?: { id: string; name: string; colors: string[]; tags: string[] };
}

export function PaletteCreatorModal({
    isOpen,
    onClose,
    onCreate,
    initialPalette
}: PaletteCreatorModalProps) {
    const [name, setName] = useState("");
    const [colors, setColors] = useState<string[]>(["#FF6B6B", "#4ECDC4", "#FFE66D"]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState("");

    useEffect(() => {
        if (initialPalette) {
            setName(initialPalette.name);
            setColors(initialPalette.colors);
            setSelectedTags(initialPalette.tags || []);
        } else {
            setName("");
            setColors(["#FF6B6B", "#4ECDC4", "#FFE66D"]);
            const initialTags = generateTags(["#FF6B6B", "#4ECDC4", "#FFE66D"]);
            setSelectedTags(initialTags);
        }
    }, [initialPalette, isOpen]);

    // Auto-generate tags when colors change
    useEffect(() => {
        if (colors.length > 0) {
            const newTags = generateTags(colors);
            setSelectedTags(newTags);
        }
    }, [colors]);

    const handleAddColor = () => {
        if (colors.length < 5) {
            setColors([...colors, "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase()]);
        }
    };

    const handleRemoveColor = (index: number) => {
        if (colors.length > 3) {
            setColors(colors.filter((_, i) => i !== index));
        }
    };

    const handleColorChange = (index: number, value: string) => {
        const nextColors = [...colors];
        nextColors[index] = value.toUpperCase();
        setColors(nextColors);
    };



    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim()) {
            toast.error("Please provide a palette name");
            return;
        }

        if (new Set(colors).size !== colors.length) {
            toast.error("Please ensure all colors are unique");
            return;
        }

        onCreate({
            name: name.trim(),
            colors,
            tags: selectedTags
        });

        onClose();
        toast.success(`Palette "${name}" ${initialPalette ? 'updated' : 'created'}!`);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px] bg-background border-border shadow-2xl">
                <DialogHeader>
                    <DialogTitle className="font-display text-2xl">
                        {initialPalette ? 'Edit Palette' : 'Create New Palette'}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 pt-4">
                    {/* Name Input */}
                    <div className="space-y-2">
                        <label className="text-xs font-mono uppercase tracking-wider text-secondary-foreground/60">
                            Palette Name ({name.length}/50)
                        </label>
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value.substring(0, 50))}
                            placeholder="e.g., Sunset Dreams"
                            className="bg-card/50 border-border focus:ring-1 focus:ring-primary h-12"
                            required
                        />
                    </div>

                    {/* Color Picker Grid */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <label className="text-xs font-mono uppercase tracking-wider text-secondary-foreground/60">
                                Colors (3-5)
                            </label>
                            {colors.length < 5 && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleAddColor}
                                    className="h-7 text-[10px] uppercase font-bold text-primary hover:bg-primary/10"
                                >
                                    <Plus className="h-3 w-3 mr-1" /> Add Color
                                </Button>
                            )}
                        </div>

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            {colors.map((color, index) => (
                                <div key={index} className="flex items-center gap-2 group">
                                    <div
                                        className="h-10 w-10 rounded-lg border border-border shrink-0 shadow-inner relative"
                                        style={{ backgroundColor: color }}
                                    >
                                        <input
                                            type="color"
                                            value={color}
                                            onChange={(e) => handleColorChange(index, e.target.value)}
                                            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                                        />
                                    </div>
                                    <Input
                                        value={color}
                                        onChange={(e) => handleColorChange(index, e.target.value)}
                                        className="font-mono text-xs h-10 bg-card/50"
                                    />
                                    {colors.length > 3 && (
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleRemoveColor(index)}
                                            className="h-8 w-8 text-secondary-foreground/60 hover:text-destructive shrink-0"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Auto-Generated Tags */}
                    <div className="space-y-3">
                        <label className="text-xs font-mono uppercase tracking-wider text-secondary-foreground/60">
                            Generated Tags (Auto)
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {selectedTags.map(tag => (
                                <Badge
                                    key={tag}
                                    variant="secondary"
                                    className="bg-secondary/50 text-secondary-foreground border-transparent cursor-default"
                                >
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                        <p className="text-[10px] text-muted-foreground">
                            Tags are automatically generated based on the colors to ensure uniqueness and consistency.
                        </p>
                    </div>

                    <DialogFooter className="pt-4 flex flex-col sm:flex-row gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            className="flex-1 h-12 border-border hover:bg-secondary font-mono text-xs uppercase"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="flex-1 h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-mono text-xs uppercase"
                        >
                            {initialPalette ? 'Update Palette' : 'Create Palette'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
