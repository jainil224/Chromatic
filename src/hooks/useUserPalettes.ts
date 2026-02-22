import { useState, useEffect } from 'react';
import type { Palette } from '../data/palettes';
import { supabase } from '../lib/supabase';
import { toast } from 'sonner';

const STORAGE_KEY = 'chromatic_user_palettes';

export interface UserPalette extends Palette {
    createdAt: string;
    isCustom: boolean;
    isNew?: boolean;
}

export const useUserPalettes = () => {
    const [userPalettes, setUserPalettes] = useState<UserPalette[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // On mount: restore ONLY genuinely local palettes (offline fallbacks with "local-" prefix).
    // Do NOT fetch from Supabase here — usePalettes() already does that and handles all
    // approved DB palettes. Fetching here was marking every palette with isCustom:true
    // which caused the amber NEW badge to appear on every card.
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const all: UserPalette[] = JSON.parse(stored);
                // Keep only local-fallback palettes, not stale copies of DB rows
                const localOnly = all.filter(p => p.id.startsWith('local-'));
                setUserPalettes(localOnly);
            }
        } catch {
            // ignore parse errors
        }
    }, []);

    const fetchPalettes = async () => { /* no-op — usePalettes handles DB reads */ };

    // Submit new palette for review via Edge Function
    const addPalette = async (palette: Omit<UserPalette, 'id' | 'createdAt' | 'isCustom' | 'isNew'> & { section?: string }) => {
        try {
            // Use Edge Function for server-side IP capture
            const { data, error: functionError } = await supabase.functions.invoke('submit-palette', {
                body: {
                    name: palette.name,
                    colors: palette.colors,
                    tags: palette.tags || [],
                    section: palette.section || 'general'
                }
            });

            if (functionError) {
                throw functionError;
            }

            toast.success('Palette submitted for review! 🎨');
            return data;
        } catch (err) {
            console.error('Error submitting palette:', err);
            toast.error('Failed to submit palette. Please try again.');

            // Fallback to localStorage (for persistence, stays 'pending' locally)
            const fallbackPalette: UserPalette = {
                ...palette,
                id: `local-${Date.now()}`,
                createdAt: new Date().toISOString(),
                isCustom: true,
                isNew: true,
                section: palette.section || 'general'
            };

            const updated = [fallbackPalette, ...userPalettes];
            setUserPalettes(updated);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

            toast.warning('Palette saved locally (offline mode)');
            return fallbackPalette;
        }
    };

    // Update palette in Supabase
    const updatePalette = async (id: string, updates: Partial<Omit<UserPalette, 'id' | 'createdAt' | 'isCustom'>>) => {
        try {
            const { error: updateError } = await supabase
                .from('palettes')
                .update({
                    name: updates.name,
                    colors: updates.colors,
                })
                .eq('id', id);

            if (updateError) {
                throw updateError;
            }

            // Update local state
            setUserPalettes(prev =>
                prev.map(p => (p.id === id ? { ...p, ...updates } : p))
            );

            toast.success('Palette updated!');
        } catch (err) {
            console.error('Error updating palette:', err);
            toast.error('Failed to update palette');
        }
    };

    // NOTE: deletePalette is intentionally removed from this hook.
    // Only admins can delete palettes — handled exclusively in AdminDashboard.

    return {
        userPalettes,
        addPalette,
        updatePalette,
        loading,
        error,
        refetch: fetchPalettes,
    };
};
