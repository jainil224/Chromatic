import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Plus, Shuffle } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

interface SubmitPaletteModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialColors?: string[]; // Optional: Pre-fill with colors (e.g. from Palette Maker)
}

export const SubmitPaletteModal = ({ isOpen, onClose, initialColors = [] }: SubmitPaletteModalProps) => {
    const [name, setName] = useState("");
    const [tags, setTags] = useState("");
    const [colors, setColors] = useState<string[]>(initialColors.length > 0 ? initialColors : ["#000000", "#ffffff"]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (isOpen && initialColors.length > 0) {
            setColors(initialColors);
        } else if (isOpen && colors.length === 0) {
            setColors(["#000000", "#ffffff"]);
        }
    }, [isOpen, initialColors]);

    const handleColorChange = (index: number, value: string) => {
        const newColors = [...colors];
        newColors[index] = value;
        setColors(newColors);
    };

    const addColor = () => {
        if (colors.length < 10) {
            setColors([...colors, "#000000"]);
        }
    };

    const removeColor = (index: number) => {
        if (colors.length > 2) {
            const newColors = colors.filter((_, i) => i !== index);
            setColors(newColors);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim()) {
            toast.error("Please enter a palette name");
            return;
        }

        if (colors.length < 2) {
            toast.error("Palette must have at least 2 colors");
            return;
        }

        setIsSubmitting(true);

        try {
            // Call the Supabase Edge Function instead of direct table insert
            // This allows the backend to capture the user's real IP address
            const { data, error } = await supabase.functions.invoke('submit-palette', {
                body: {
                    name: name.trim(),
                    colors: colors,
                    tags: tags.split(',').map(t => t.trim()).filter(t => t.length > 0)
                }
            });

            if (error) throw error;

            toast.success("Palette submitted for review! It will appear once approved.");
            onClose();
            setName("");
            setTags("");
            setColors(["#000000", "#ffffff"]);

        } catch (error: any) {
            console.error('Submission error:', error);
            toast.error(error.message || "Failed to submit palette");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] bg-background/95 backdrop-blur-xl border-white/10">
                <DialogHeader>
                    <DialogTitle>Submit Palette</DialogTitle>
                    <DialogDescription>
                        Submit your custom palette for review. If approved, it will be featured on the main page.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Palette Name</Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g., Sunset Vibes"
                            className="bg-secondary/50 border-white/10 focus:border-primary/50"
                            maxLength={30}
                        />
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g., Sunset Vibes"
                            className="bg-secondary/50 border-white/10 focus:border-primary/50"
                            maxLength={30}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="tags">Tags (Optional)</Label>
                        <Input
                            id="tags"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            placeholder="e.g., warm, sunset, vibrant (comma separated)"
                            className="bg-secondary/50 border-white/10 focus:border-primary/50"
                        />
                        <p className="text-xs text-muted-foreground">Separate tags with commas.</p>
                    </div>

                    <div className="space-y-3">
                        <Label>Colors ({colors.length}/10)</Label>
                        <div className="grid grid-cols-5 gap-2">
                            {colors.map((color, index) => (
                                <div key={index} className="group relative aspect-square">
                                    <input
                                        type="color"
                                        value={color}
                                        onChange={(e) => handleColorChange(index, e.target.value)}
                                        className="h-full w-full cursor-pointer opacity-0 absolute inset-0 z-10"
                                    />
                                    <div
                                        className="h-full w-full rounded-md border border-white/10 shadow-sm transition-transform group-hover:scale-105"
                                        style={{ backgroundColor: color }}
                                    />
                                    {colors.length > 2 && (
                                        <button
                                            type="button"
                                            onClick={() => removeColor(index)}
                                            className="absolute -top-1 -right-1 z-20 h-4 w-4 rounded-full bg-destructive text-white opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    )}
                                </div>
                            ))}
                            {colors.length < 10 && (
                                <button
                                    type="button"
                                    onClick={addColor}
                                    className="flex aspect-square items-center justify-center rounded-md border border-dashed border-white/20 hover:border-primary/50 hover:bg-primary/5 transition-colors"
                                >
                                    <Plus className="h-4 w-4 text-muted-foreground" />
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <Button type="button" variant="ghost" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Submitting..." : "Submit for Review"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};
