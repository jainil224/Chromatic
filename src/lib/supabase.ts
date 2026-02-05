import { createClient } from '@supabase/supabase-js'

// Supabase credentials from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('⚠️ Supabase credentials missing! Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment variables.')
    console.warn('The app will work in offline mode using localStorage.')
}

// Create Supabase client (will work even with empty credentials, but queries will fail gracefully)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Database {
    public: {
        Tables: {
            palettes: {
                Row: {
                    id: string
                    name: string
                    colors: string[]
                    likes: number
                    created_at: string
                }
                Insert: {
                    id?: string
                    name: string
                    colors: string[]
                    likes?: number
                    created_at?: string
                }
                Update: {
                    id?: string
                    name?: string
                    colors?: string[]
                    likes?: number
                    created_at?: string
                }
            }
        }
    }
}

// Typed Supabase client
export type TypedSupabase = ReturnType<typeof createClient<Database>>
