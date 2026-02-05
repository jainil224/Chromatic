import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { toast } from 'sonner';

const LIKED_PALETTES_KEY = 'chromatic_liked_palettes';

export const usePaletteLikes = () => {
    // Track which palettes the user has liked (stored in localStorage)
    const [likedPalettes, setLikedPalettes] = useState<Set<string>>(() => {
        const stored = localStorage.getItem(LIKED_PALETTES_KEY);
        return stored ? new Set(JSON.parse(stored)) : new Set();
    });

    // Save liked palettes to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem(LIKED_PALETTES_KEY, JSON.stringify(Array.from(likedPalettes)));
    }, [likedPalettes]);

    // Check if a palette is liked by the current user
    const isLiked = (paletteId: string): boolean => {
        return likedPalettes.has(paletteId);
    };

    // Toggle like status for a palette
    const toggleLike = async (paletteId: string, currentLikes: number) => {
        const wasLiked = likedPalettes.has(paletteId);
        const newLikes = wasLiked ? currentLikes - 1 : currentLikes + 1;

        try {
            // Optimistically update UI
            setLikedPalettes(prev => {
                const next = new Set(prev);
                if (wasLiked) {
                    next.delete(paletteId);
                } else {
                    next.add(paletteId);
                }
                return next;
            });

            // Update database
            const { error } = await supabase
                .from('palettes')
                .update({ likes: Math.max(0, newLikes) }) // Prevent negative likes
                .eq('id', paletteId);

            if (error) {
                throw error;
            }

            // Show feedback
            if (!wasLiked) {
                toast.success('Liked! ❤️');
            }
        } catch (err) {
            console.error('Error toggling like:', err);

            // Revert optimistic update on error
            setLikedPalettes(prev => {
                const next = new Set(prev);
                if (wasLiked) {
                    next.add(paletteId);
                } else {
                    next.delete(paletteId);
                }
                return next;
            });

            toast.error('Failed to update like');
        }
    };

    return {
        isLiked,
        toggleLike,
        likedPalettes,
    };
};
