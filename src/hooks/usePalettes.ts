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
}

export function usePalettes() {
    const [palettes, setPalettes] = useState<Palette[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchPalettes();

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
                () => {
                    // Refetch palettes when any change occurs
                    fetchPalettes();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const fetchPalettes = async () => {
        try {
            setLoading(true);
            setError(null);

            const { data, error: fetchError } = await supabase
                .from('palettes')
                .select('*')
                .order('created_at', { ascending: false });

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
                }));

                setPalettes(transformedPalettes);
            }
        } catch (err) {
            console.error('Exception fetching palettes:', err);
            setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
            setLoading(false);
        }
    };

    return {
        palettes,
        loading,
        error,
        refetch: fetchPalettes,
    };
}
