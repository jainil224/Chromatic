import { useState, useEffect } from 'react';
import type { Palette } from '../data/palettes';

const STORAGE_KEY = 'chromatic_user_palettes';

export interface UserPalette extends Palette {
    createdAt: string;
    isCustom: boolean;
    isNew?: boolean;
}

export const useUserPalettes = () => {
    const [userPalettes, setUserPalettes] = useState<UserPalette[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                setUserPalettes(JSON.parse(stored));
            } catch (e) {
                console.error('Failed to parse user palettes:', e);
            }
        }
    }, []);

    const savePalettes = (palettes: UserPalette[]) => {
        setUserPalettes(palettes);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(palettes));
    };

    const addPalette = (palette: Omit<UserPalette, 'id' | 'createdAt' | 'isCustom' | 'isNew'>) => {
        const newPalette: UserPalette = {
            ...palette,
            id: `user-${Date.now()}`,
            createdAt: new Date().toISOString(),
            isCustom: true,
            isNew: true,
        };
        const updated = [newPalette, ...userPalettes];
        savePalettes(updated);
        return newPalette;
    };

    const updatePalette = (id: string, updates: Partial<Omit<UserPalette, 'id' | 'createdAt' | 'isCustom'>>) => {
        const updated = userPalettes.map(p =>
            p.id === id ? { ...p, ...updates } : p
        );
        savePalettes(updated);
    };

    const deletePalette = (id: string) => {
        const updated = userPalettes.filter(p => p.id !== id);
        savePalettes(updated);
    };

    return { userPalettes, addPalette, updatePalette, deletePalette };
};
