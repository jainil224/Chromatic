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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch palettes from Supabase
    const fetchPalettes = async () => {
        try {
            setLoading(true);
            setError(null);

            const { data, error: fetchError } = await supabase
                .from('palettes')
                .select('*')
                .order('created_at', { ascending: false });

            if (fetchError) {
                throw fetchError;
            }

            // Transform Supabase data to UserPalette format
            const transformedPalettes: UserPalette[] = (data || []).map(palette => ({
                id: palette.id,
                name: palette.name,
                colors: palette.colors,
                tags: [], // You can add tags support later
                createdAt: palette.created_at,
                isCustom: true,
                isNew: isWithin24Hours(palette.created_at),
            }));

            setUserPalettes(transformedPalettes);

            // Also save to localStorage as backup
            localStorage.setItem(STORAGE_KEY, JSON.stringify(transformedPalettes));
        } catch (err) {
            console.error('Error fetching palettes:', err);
            setError(err instanceof Error ? err.message : 'Failed to fetch palettes');

            // Fallback to localStorage if Supabase fails
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                try {
                    setUserPalettes(JSON.parse(stored));
                } catch (e) {
                    console.error('Failed to parse localStorage palettes:', e);
                }
            }
        } finally {
            setLoading(false);
        }
    };

    // Check if palette was created within last 24 hours
    const isWithin24Hours = (createdAt: string): boolean => {
        const created = new Date(createdAt);
        const now = new Date();
        const diffMs = now.getTime() - created.getTime();
        const diffHours = diffMs / (1000 * 60 * 60);
        return diffHours < 24;
    };

    // Initial fetch
    useEffect(() => {
        fetchPalettes();
    }, []);

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

    // Delete palette from Supabase
    const deletePalette = async (id: string) => {
        try {
            const { error: deleteError } = await supabase
                .from('palettes')
                .delete()
                .eq('id', id);

            if (deleteError) {
                throw deleteError;
            }

            // Remove from local state
            setUserPalettes(prev => prev.filter(p => p.id !== id));

            // Update localStorage backup
            const updated = userPalettes.filter(p => p.id !== id);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

            toast.success('Palette deleted from database!');
        } catch (err) {
            console.error('Error deleting palette:', err);
            toast.error('Failed to delete palette from database');

            // Still remove from local state as fallback
            setUserPalettes(prev => prev.filter(p => p.id !== id));
        }
    };

    return {
        userPalettes,
        addPalette,
        updatePalette,
        deletePalette,
        loading,
        error,
        refetch: fetchPalettes,
    };
};
