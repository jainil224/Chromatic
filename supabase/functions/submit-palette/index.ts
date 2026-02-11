import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

/**
 * Converts an IPv4 address string to a numeric representation (BigInt).
 */
function ipv4ToNumeric(ip: string): bigint {
    return ip.split('.').reduce((acc, octet) => (acc << 8n) + BigInt(octet), 0n);
}

/**
 * Converts an IPv6 address string to a numeric representation (BigInt).
 */
function ipv6ToNumeric(ip: string): bigint {
    // Normalize IPv6 (handle ::)
    let fullIp = ip;
    if (ip.includes('::')) {
        const parts = ip.split('::');
        const left = parts[0] ? parts[0].split(':') : [];
        const right = parts[1] ? parts[1].split(':') : [];
        const missing = 8 - (left.length + right.length);
        const middle = new Array(missing).fill('0');
        fullIp = [...left, ...middle, ...right].join(':');
    }

    // Split into 16-bit blocks and convert to bigint
    const hexBlocks = fullIp.split(':').map(block => block.padStart(4, '0'));
    return hexBlocks.reduce((acc, hex) => (acc << 16n) + BigInt(`0x${hex}`), 0n);
}

/**
 * Detects and converts the IP address to a numeric format.
 */
function getNumericIp(req: Request): string {
    let userIp = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || '127.0.0.1';

    // Normalize IPv4-mapped IPv6 (::ffff:192.168.1.1)
    if (userIp.startsWith('::ffff:')) {
        userIp = userIp.substring(7);
    }

    try {
        if (userIp.includes('.')) {
            // IPv4
            return ipv4ToNumeric(userIp).toString();
        } else {
            // IPv6
            return ipv6ToNumeric(userIp).toString();
        }
    } catch (e) {
        console.error('IP conversion error:', e);
        return "0";
    }
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

        // 1. Basic Validation
        if (!name || !colors || !Array.isArray(colors) || colors.length < 3) {
            throw new Error('Invalid palette data');
        }

        // 2. Capture and convert IP
        const numericIp = getNumericIp(req);

        // 3. Insert into database
        const { data, error } = await supabase
            .from('palette_submissions')
            .insert([
                {
                    name: name.trim(),
                    colors: colors,
                    status: 'pending',
                    tags: tags || [],
                    ip_address_numeric: numericIp
                }
            ])
            .select('id, name, status') // Exclude sensitive fields
            .single();

        if (error) throw error

        return new Response(
            JSON.stringify({ success: true, message: 'Palette submitted successfully', submissionId: data.id }),
            {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 200
            }
        )

    } catch (error: any) {
        return new Response(
            JSON.stringify({ success: false, error: error.message }),
            {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 400
            }
        )
    }
})
