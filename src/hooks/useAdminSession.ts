import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

/**
 * Returns whether the current visitor is a logged-in admin.
 * Admins are identified by having an active Supabase Auth session.
 * Regular users browsing the site have no session → isAdmin = false.
 */
export const useAdminSession = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [checkingSession, setCheckingSession] = useState(true);

    useEffect(() => {
        // 1. Check current session immediately
        supabase.auth.getSession().then(({ data: { session } }) => {
            setIsAdmin(!!session);
            setCheckingSession(false);
        });

        // 2. Listen for login/logout events
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setIsAdmin(!!session);
        });

        return () => subscription.unsubscribe();
    }, []);

    return { isAdmin, checkingSession };
};
