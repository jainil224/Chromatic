import { supabase } from './supabase';
import { toast } from 'sonner';

/**
 * Generate a unique user ID (browser fingerprint)
 * Stored in localStorage to persist across sessions
 */
export const getUserId = (): string => {
    let userId = localStorage.getItem('chromatic_user_id');
    if (!userId) {
        userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('chromatic_user_id', userId);
    }
    return userId;
};

/**
 * Check if the current user has already liked a palette
 * @param paletteId - UUID of the palette
 * @returns Promise<boolean> - true if user has liked this palette
 */
export const hasUserLikedPalette = async (paletteId: string): Promise<boolean> => {
    try {
        const userId = getUserId();
        const { data, error } = await supabase
            .from('palette_likes')
            .select('id')
            .eq('palette_id', paletteId)
            .eq('user_id', userId)
            .maybeSingle();

        if (error) {
            console.error('Error checking like status:', error);
            return false;
        }

        return !!data;
    } catch (err) {
        console.error('Exception checking like status:', err);
        return false;
    }
};

/**
 * Like a palette
 * @param paletteId - UUID of the palette to like
 * @returns Promise with success status and new like count
 */
export const likePalette = async (paletteId: string): Promise<{ success: boolean; newLikeCount: number }> => {
    try {
        const userId = getUserId();

        // 1. Insert into palette_likes (will fail if already liked due to UNIQUE constraint)
        const { error: insertError } = await supabase
            .from('palette_likes')
            .insert({
                palette_id: paletteId,
                user_id: userId
            });

        if (insertError) {
            // Check if it's a duplicate key error (user already liked this palette)
            if (insertError.code === '23505') {
                console.log('User has already liked this palette');
                return { success: false, newLikeCount: 0 };
            }
            console.error('Like insert error:', insertError);
            return { success: false, newLikeCount: 0 };
        }

        // 2. Increment the likes count using RPC function
        const { data: newCount, error: rpcError } = await supabase.rpc('increment_palette_likes', {
            palette_id: paletteId
        });

        if (rpcError) {
            console.error('Increment error:', rpcError);
            // Rollback: delete the like we just inserted
            await supabase
                .from('palette_likes')
                .delete()
                .eq('palette_id', paletteId)
                .eq('user_id', userId);
            return { success: false, newLikeCount: 0 };
        }

        return { success: true, newLikeCount: newCount || 0 };
    } catch (err) {
        console.error('Exception liking palette:', err);
        return { success: false, newLikeCount: 0 };
    }
};

/**
 * Unlike a palette
 * @param paletteId - UUID of the palette to unlike
 * @returns Promise with success status and new like count
 */
export const unlikePalette = async (paletteId: string): Promise<{ success: boolean; newLikeCount: number }> => {
    try {
        const userId = getUserId();

        // 1. Delete from palette_likes
        const { error: deleteError } = await supabase
            .from('palette_likes')
            .delete()
            .eq('palette_id', paletteId)
            .eq('user_id', userId);

        if (deleteError) {
            console.error('Unlike delete error:', deleteError);
            return { success: false, newLikeCount: 0 };
        }

        // 2. Decrement the likes count using RPC function
        const { data: newCount, error: rpcError } = await supabase.rpc('decrement_palette_likes', {
            palette_id: paletteId
        });

        if (rpcError) {
            console.error('Decrement error:', rpcError);
            return { success: false, newLikeCount: 0 };
        }

        return { success: true, newLikeCount: newCount || 0 };
    } catch (err) {
        console.error('Exception unliking palette:', err);
        return { success: false, newLikeCount: 0 };
    }
};

/**
 * Get all palettes the current user has liked
 * @returns Promise<string[]> - Array of palette IDs
 */
export const getUserLikedPalettes = async (): Promise<string[]> => {
    try {
        const userId = getUserId();
        const { data, error } = await supabase
            .from('palette_likes')
            .select('palette_id')
            .eq('user_id', userId);

        if (error) {
            console.error('Error fetching user likes:', error);
            return [];
        }

        return data?.map(like => like.palette_id) || [];
    } catch (err) {
        console.error('Exception fetching user likes:', err);
        return [];
    }
};
