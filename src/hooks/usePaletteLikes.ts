import { useState, useEffect } from 'react';
import { hasUserLikedPalette, likePalette, unlikePalette } from '../lib/likesApi';
import { toast } from 'sonner';

/**
 * Custom hook to manage palette like state
 * @param paletteId - UUID of the palette
 * @param initialLikes - Initial like count from database
 * @returns Object with likes count, isLiked status, loading state, and toggleLike function
 */
export const usePaletteLikes = (paletteId: string, initialLikes: number) => {
    const [likes, setLikes] = useState(initialLikes);
    const [isLiked, setIsLiked] = useState(false);
    const [loading, setLoading] = useState(false);
    const [checkingStatus, setCheckingStatus] = useState(true);

    // Check if user has already liked this palette on mount
    useEffect(() => {
        const checkLikeStatus = async () => {
            setCheckingStatus(true);
            const liked = await hasUserLikedPalette(paletteId);
            setIsLiked(liked);
            setCheckingStatus(false);
        };
        checkLikeStatus();
    }, [paletteId]);

    const toggleLike = async () => {
        if (loading || checkingStatus) return;

        setLoading(true);

        // Optimistic update
        const previousLikes = likes;
        const previousIsLiked = isLiked;

        if (isLiked) {
            // Optimistically update UI
            setIsLiked(false);
            setLikes(prev => Math.max(0, prev - 1));

            // Unlike
            const result = await unlikePalette(paletteId);
            if (result.success) {
                setLikes(result.newLikeCount);
                toast.success('Removed from favorites');
            } else {
                // Rollback on error
                setIsLiked(previousIsLiked);
                setLikes(previousLikes);
                toast.error('Failed to unlike palette');
            }
        } else {
            // Optimistically update UI
            setIsLiked(true);
            setLikes(prev => prev + 1);

            // Like
            const result = await likePalette(paletteId);
            if (result.success) {
                setLikes(result.newLikeCount);
                toast.success('Added to favorites! ❤️');
            } else {
                // Rollback on error
                setIsLiked(previousIsLiked);
                setLikes(previousLikes);
                toast.error('Failed to like palette');
            }
        }

        setLoading(false);
    };

    return {
        likes,
        isLiked,
        loading: loading || checkingStatus,
        toggleLike
    };
};

