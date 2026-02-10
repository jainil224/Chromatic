import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
    // Handle CORS
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const supabase = createClient(
            Deno.env.get('SUPABASE_URL') || '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
        )

        const { name, colors, tags } = await req.json()

        // 1. Capture real IP from headers
        // Supabase Edge Functions provide the real user IP in x-forwarded-for
        let userIp = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';

        // 2. Normalize IP (strip IPv6 prefix if present)
        if (userIp.includes('::ffff:')) {
            userIp = userIp.split(':').pop() || userIp;
        }

        // 3. Insert into database
        const { data, error } = await supabase
            .from('palette_submissions')
            .insert([
                {
                    name: name.trim(),
                    colors: colors,
                    status: 'pending',
                    tags: tags,
                    user_ip: userIp
                }
            ])
            .select()

        if (error) throw error

        return new Response(
            JSON.stringify({ success: true, data }),
            {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 200
            }
        )

    } catch (error) {
        return new Response(
            JSON.stringify({ error: error.message }),
            {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 400
            }
        )
    }
})
