import { createClient } from '@supabase/supabase-js'

// Supabase credentials from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

// Create Supabase client
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
