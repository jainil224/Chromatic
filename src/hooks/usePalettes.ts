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
                setPalettes(prev => prev.map(p =>
                    p.id === payload.new.id
                        ? {
                            ...p,
                            name: payload.new.name,
                            colors: payload.new.colors,
                            category: payload.new.category || undefined,
                            tags: payload.new.tags || undefined,
                            section: payload.new.section || undefined,
                        }
                        : p
                ));
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

            let query = supabase
                .from('palettes')
                .select('*')
                .order('created_at', { ascending: false })
                .order('id', { ascending: true });

            if (section) {
                query = query.eq('section', section);
            }

            const { data, error: fetchError } = await query;

            if (fetchError) {
                console.error('Error fetching palettes:', fetchError);
                setError(fetchError.message);
                return;
            }

            if (data) {
                // Transform Supabase data to Palette format
                const transformedPalettes: Palette[] = data.map((p: SupabasePalette) => ({
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
