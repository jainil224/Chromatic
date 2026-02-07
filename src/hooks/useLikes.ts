import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { getUserId, getUserLikedPalettes } from '../lib/likesApi';
import { toast } from 'sonner';

const STORAGE_KEY = 'chromatic_likes';

interface LikeData {
    [paletteId: string]: {
        count: number;
        isLiked: boolean;
    };
}

/**
 * Global hook to manage likes for all palettes
 * Uses palette_likes junction table for persistent, global like tracking
 */
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

                    setLikes(prevLikes => ({
                        ...prevLikes,
                        [updatedPalette.id]: {
                            count: updatedPalette.likes || 0,
                            isLiked: prevLikes[updatedPalette.id]?.isLiked || false,
                        },
                    }));
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

            // Get which palettes the current user has liked from database
            const likedPaletteIds = await getUserLikedPalettes();

            // Build likes object
            const likesData: LikeData = {};
            data?.forEach(palette => {
                likesData[palette.id] = {
                    count: palette.likes || 0,
                    isLiked: likedPaletteIds.includes(palette.id),
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
                    count: 0, // Default count for new palettes
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
        const userId = getUserId();

        // Optimistically update UI
        const optimisticCount = wasLiked ? currentLike.count - 1 : currentLike.count + 1;
        const newLikes = {
            ...currentLikes,
            [paletteId]: {
                count: Math.max(0, optimisticCount),
                isLiked: !wasLiked,
            },
        };
        setLikes(newLikes);

        try {
            // Check if palette exists in database first
            const { data: existingPalette } = await supabase
                .from('palettes')
                .select('id')
                .eq('id', paletteId)
                .single();

            // Only update database if palette exists there
            if (existingPalette) {
                if (wasLiked) {
                    // Unlike: Delete from palette_likes
                    const { error: deleteError } = await supabase
                        .from('palette_likes')
                        .delete()
                        .eq('palette_id', paletteId)
                        .eq('user_id', userId);

                    if (deleteError) throw deleteError;

                    // Decrement like count using RPC
                    const { data: newCount, error: rpcError } = await supabase.rpc('decrement_palette_likes', {
                        palette_id: paletteId
                    });

                    if (rpcError) throw rpcError;

                    // Update state with actual count from database
                    setLikes(prevLikes => ({
                        ...prevLikes,
                        [paletteId]: {
                            count: newCount || 0,
                            isLiked: false,
                        },
                    }));

                    toast.success('Removed from favorites');
                } else {
                    // Like: Insert into palette_likes
                    const { error: insertError } = await supabase
                        .from('palette_likes')
                        .insert({
                            palette_id: paletteId,
                            user_id: userId
                        });

                    // Check if it's a duplicate key error (user already liked)
                    if (insertError) {
                        if (insertError.code === '23505') {
                            // Already liked, just refetch to sync state
                            await fetchLikes();
                            return;
                        }
                        throw insertError;
                    }

                    // Increment like count using RPC
                    const { data: newCount, error: rpcError } = await supabase.rpc('increment_palette_likes', {
                        palette_id: paletteId
                    });

                    if (rpcError) {
                        // Rollback: delete the like we just inserted
                        await supabase
                            .from('palette_likes')
                            .delete()
                            .eq('palette_id', paletteId)
                            .eq('user_id', userId);
                        throw rpcError;
                    }

                    // Update state with actual count from database
                    setLikes(prevLikes => ({
                        ...prevLikes,
                        [paletteId]: {
                            count: newCount || 0,
                            isLiked: true,
                        },
                    }));

                    toast.success('Liked! ❤️');
                }

                // Update localStorage backup
                localStorage.setItem(STORAGE_KEY, JSON.stringify(newLikes));
            } else {
                // Palette doesn't exist in database (hardcoded palette)
                // Just keep the optimistic update
                if (!wasLiked) {
                    toast.success('Liked! ❤️');
                }
            }
        } catch (err) {
            console.error('Error toggling like:', err);

            // Revert optimistic update on error
            setLikes(currentLikes);
            toast.error('Failed to update like');
        }
    };

    // Get like count for a palette
    const getLikeCount = (paletteId: string): number => {
        if (!likes[paletteId]) {
            return 0; // Return 0 for uninitialized palettes
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

