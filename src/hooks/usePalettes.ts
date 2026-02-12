import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { Palette } from '@/data/palettes';

interface SupabasePalette {
    id: string;
    name: string;
    colors: string[];
    category: string | null;
    tags: string[] | null;
    likes: number;
    created_at: string;
    section: string | null;
}

export function usePalettes(section?: string) {
    const [palettes, setPalettes] = useState<Palette[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchPalettes();

        const handleChanges = (payload: any) => {
            if (payload.eventType === 'INSERT') {
                const newPalette: Palette = {
                    id: payload.new.id,
                    name: payload.new.name,
                    colors: payload.new.colors,
                    category: payload.new.category || undefined,
                    tags: payload.new.tags || undefined,
                    created_at: payload.new.created_at,
                    section: payload.new.section || undefined,
                };
                setPalettes(prev => [newPalette, ...prev]);
            } else if (payload.eventType === 'UPDATE') {
                const updated = payload.new;
                setPalettes(prev => prev.map(p => {
                    if (p.id !== updated.id) return p;

                    // Optimization: Check if core visual fields actually changed
                    // This prevents re-renders when only 'likes' count updates (handled by useLikes)
                    const hasVisualChanges =
                        p.name !== updated.name ||
                        JSON.stringify(p.colors) !== JSON.stringify(updated.colors) ||
                        p.category !== (updated.category || undefined) ||
                        p.section !== (updated.section || undefined) ||
                        JSON.stringify(p.tags) !== JSON.stringify(updated.tags || undefined);

                    if (!hasVisualChanges) return p;

                    return {
                        ...p,
                        name: updated.name,
                        colors: updated.colors,
                        category: updated.category || undefined,
                        tags: updated.tags || undefined,
                        section: updated.section || undefined,
                    };
                }));
            } else if (payload.eventType === 'DELETE') {
                setPalettes(prev => prev.filter(p => p.id !== payload.old.id));
            }
        };

        // Subscribe to realtime updates
        const channel = supabase
            .channel('palettes-changes')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'palettes',
                },
                (payload) => {
                    // Optimized: Only handle incremental changes
                    handleChanges(payload);
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [section]);

    const fetchPalettes = async (silent = false) => {
        try {
            if (!silent) {
                setLoading(true);
            }
            setError(null);

            let allData: SupabasePalette[] = [];
            let from = 0;
            const step = 1000;
            let finished = false;

            while (!finished) {
                let query = supabase
                    .from('palettes')
                    .select('*')
                    .order('created_at', { ascending: false })
                    .order('id', { ascending: true })
                    .range(from, from + step - 1);

                if (section) {
                    query = query.eq('section', section);
                }

                const { data, error: fetchError } = await query;

                if (fetchError) {
                    console.error('Error fetching palettes:', fetchError);
                    setError(fetchError.message);
                    return;
                }

                if (data && data.length > 0) {
                    allData = [...allData, ...(data as SupabasePalette[])];
                    if (data.length < step) {
                        finished = true;
                    } else {
                        from += step;
                    }
                } else {
                    finished = true;
                }
            }

            if (allData.length > 0) {
                // Transform Supabase data to Palette format
                const transformedPalettes: Palette[] = allData.map((p: SupabasePalette) => ({
                    id: p.id,
                    name: p.name,
                    colors: p.colors,
                    category: p.category || undefined,
                    tags: p.tags || undefined,
                    created_at: p.created_at,
                    section: p.section || undefined,
                }));

                setPalettes(transformedPalettes);
            }
        } catch (err) {
            console.error('Exception fetching palettes:', err);
            setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
            if (!silent) {
                setLoading(false);
            }
        }
    };

    return {
        palettes,
        loading,
        error,
        refetch: fetchPalettes,
    };
}
