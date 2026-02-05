import { useState, useEffect } from 'react';

const STORAGE_KEY = 'chromatic_likes';

interface LikeData {
    [paletteId: string]: {
        count: number;
        isLiked: boolean;
    };
}

export const useLikes = () => {
    const [likes, setLikes] = useState<LikeData>({});

    // Load from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                setLikes(JSON.parse(stored));
            } catch (e) {
                console.error('Failed to parse likes:', e);
            }
        }
    }, []);

    // Save to localStorage whenever likes change
    const saveLikes = (newLikes: LikeData) => {
        setLikes(newLikes);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newLikes));
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
            saveLikes(newLikes);
            return newLikes;
        }
        return likes;
    };

    // Toggle like for a palette
    const toggleLike = (paletteId: string) => {
        const currentLikes = ensurePaletteInitialized(paletteId);
        const currentLike = currentLikes[paletteId];

        const newLikes = {
            ...currentLikes,
            [paletteId]: {
                count: currentLike.isLiked ? currentLike.count - 1 : currentLike.count + 1,
                isLiked: !currentLike.isLiked,
            },
        };

        saveLikes(newLikes);
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

    return { toggleLike, getLikeCount, isLiked };
};
