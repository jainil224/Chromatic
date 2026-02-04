import { useState, useEffect } from 'react';
import type { Palette } from '../data/palettes';

export const useFavorites = () => {
    const [favorites, setFavorites] = useState<string[]>([]);

    useEffect(() => {
        const storedFavorites = localStorage.getItem('chromatic_favorites');
        if (storedFavorites) {
            try {
                setFavorites(JSON.parse(storedFavorites));
            } catch (e) {
                console.error('Failed to parse favorites:', e);
            }
        }
    }, []);

    const toggleFavorite = (paletteId: string) => {
        setFavorites(prev => {
            const newFavorites = prev.includes(paletteId)
                ? prev.filter(id => id !== paletteId)
                : [...prev, paletteId];

            localStorage.setItem('chromatic_favorites', JSON.stringify(newFavorites));
            return newFavorites;
        });
    };

    const isFavorite = (paletteId: string) => favorites.includes(paletteId);

    return { favorites, toggleFavorite, isFavorite };
};
