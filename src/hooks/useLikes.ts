import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { toast } from 'sonner';

const STORAGE_KEY = 'chromatic_likes';
const LIKED_PALETTES_KEY = 'chromatic_liked_palettes';

interface LikeData {
    [paletteId: string]: {
        count: number;
        isLiked: boolean;
    };
}

export const useLikes = () => {
    const [likes, setLikes] = useState<LikeData>({});
    const [loading, setLoading] = useState(true);

    // Load likes from Supabase on mount and setup realtime subscription
    useEffect(() => {
        fetchLikes();

        // Setup Realtime subscription for palette updates
        const channel = supabase
            .channel('palettes-likes-sync')
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'palettes'
                },
                (payload) => {
                    // When any palette is updated (like count changed), update local state
                    const updatedPalette = payload.new as { id: string; likes: number };

                    setLikes(prevLikes => {
                        // Get current liked status from localStorage
                        const likedPalettesStr = localStorage.getItem(LIKED_PALETTES_KEY);
                        const likedPalettes: string[] = likedPalettesStr ? JSON.parse(likedPalettesStr) : [];

                        return {
                            ...prevLikes,
                            [updatedPalette.id]: {
                                count: updatedPalette.likes || 0,
                                isLiked: likedPalettes.includes(updatedPalette.id),
                            },
                        };
                    });
                }
            )
            .subscribe();

        // Cleanup subscription on unmount
        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const fetchLikes = async () => {
        try {
            setLoading(true);

            // Fetch all palettes with their like counts
            const { data, error } = await supabase
                .from('palettes')
                .select('id, likes');

            if (error) {
                throw error;
            }

            // Load which palettes the user has liked from localStorage
            const likedPalettesStr = localStorage.getItem(LIKED_PALETTES_KEY);
            const likedPalettes: string[] = likedPalettesStr ? JSON.parse(likedPalettesStr) : [];

            // Build likes object
            const likesData: LikeData = {};
            data?.forEach(palette => {
                likesData[palette.id] = {
                    count: palette.likes || 0,
                    isLiked: likedPalettes.includes(palette.id),
                };
            });

            setLikes(likesData);

            // Save to localStorage as backup
            localStorage.setItem(STORAGE_KEY, JSON.stringify(likesData));
        } catch (err) {
            console.error('Error fetching likes:', err);

            // Fallback to localStorage
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                try {
                    setLikes(JSON.parse(stored));
                } catch (e) {
                    console.error('Failed to parse likes:', e);
                }
            }
        } finally {
            setLoading(false);
        }
    };

    // Initialize palette with default count if not exists
    const ensurePaletteInitialized = (paletteId: string): LikeData => {
        if (!likes[paletteId]) {
            const newLikes = {
                ...likes,
                [paletteId]: {
                    count: 5, // Default count
                    isLiked: false,
                },
            };
            setLikes(newLikes);
            return newLikes;
        }
        return likes;
    };

    // Toggle like for a palette
    const toggleLike = async (paletteId: string) => {
        const currentLikes = ensurePaletteInitialized(paletteId);
        const currentLike = currentLikes[paletteId];
        const wasLiked = currentLike.isLiked;
        const newCount = wasLiked ? currentLike.count - 1 : currentLike.count + 1;

        // Optimistically update UI
        const newLikes = {
            ...currentLikes,
            [paletteId]: {
                count: Math.max(0, newCount),
                isLiked: !wasLiked,
            },
        };
        setLikes(newLikes);

        // Update localStorage for liked palettes
        const likedPalettesStr = localStorage.getItem(LIKED_PALETTES_KEY);
        const likedPalettes: string[] = likedPalettesStr ? JSON.parse(likedPalettesStr) : [];

        if (wasLiked) {
            const index = likedPalettes.indexOf(paletteId);
            if (index > -1) likedPalettes.splice(index, 1);
        } else {
            if (!likedPalettes.includes(paletteId)) {
                likedPalettes.push(paletteId);
            }
        }
        localStorage.setItem(LIKED_PALETTES_KEY, JSON.stringify(likedPalettes));

        try {
            // Check if palette exists in database first
            const { data: existingPalette } = await supabase
                .from('palettes')
                .select('id')
                .eq('id', paletteId)
                .single();

            // Only update database if palette exists there
            if (existingPalette) {
                const { error } = await supabase
                    .from('palettes')
                    .update({ likes: Math.max(0, newCount) })
                    .eq('id', paletteId);

                if (error) {
                    throw error;
                }

                // Confirm state update after successful database update
                // This ensures all sections see the updated count
                setLikes(prevLikes => ({
                    ...prevLikes,
                    [paletteId]: {
                        count: Math.max(0, newCount),
                        isLiked: !wasLiked,
                    },
                }));

                // Update localStorage backup with confirmed count
                localStorage.setItem(STORAGE_KEY, JSON.stringify({
                    ...newLikes,
                    [paletteId]: {
                        count: Math.max(0, newCount),
                        isLiked: !wasLiked,
                    },
                }));
            }
            // If palette doesn't exist in database, it's a hardcoded palette
            // Just keep the like in localStorage (already done above)

            // Show feedback
            if (!wasLiked) {
                toast.success('Liked! ❤️');
            }
        } catch (err) {
            console.error('Error toggling like:', err);

            // Only revert if it was a real error (not just palette not found)
            const errorMessage = (err as any)?.message || '';
            if (!errorMessage.includes('No rows found')) {
                // Revert optimistic update on error
                setLikes(currentLikes);

                // Revert localStorage
                const revertedLiked: string[] = likedPalettesStr ? JSON.parse(likedPalettesStr) : [];
                localStorage.setItem(LIKED_PALETTES_KEY, JSON.stringify(revertedLiked));

                toast.error('Failed to update like');
            } else {
                // Palette not in database, but like still works locally
                if (!wasLiked) {
                    toast.success('Liked! ❤️');
                }
            }
        }
    };

    // Get like count for a palette
    const getLikeCount = (paletteId: string): number => {
        if (!likes[paletteId]) {
            return 5; // Return default without initializing yet
        }
        return likes[paletteId].count;
    };

    // Check if palette is liked
    const isLiked = (paletteId: string): boolean => {
        return likes[paletteId]?.isLiked || false;
    };

    return {
        toggleLike,
        getLikeCount,
        isLiked,
        loading,
        refetch: fetchLikes,
    };
};
