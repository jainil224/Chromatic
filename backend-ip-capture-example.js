/**
 * Backend IP Capture Example (Node.js / Express)
 * This example shows how to capture a user's IP on the server
 * and save it to Supabase during a palette submission.
 */

const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const app = express();

app.use(express.json());

// Initialize Supabase client
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

app.post('/api/submit-palette', async (req, res) => {
    const { name, colors, tags } = req.body;

    // 1. Capture the User IP Address on the backend
    // 'x-forwarded-for' is usually needed if behind a proxy (like Vercel, Heroku, Cloudflare)
    let userIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    // 2. Normalize IP format (convert ::ffff:1.2.3.4 to 1.2.3.4)
    if (userIp && userIp.includes('::ffff:')) {
        userIp = userIp.split(':').pop();
    }

    // Handle localhost IPv6 to numeric representation
    if (userIp === '::1') {
        userIp = '127.0.0.1';
    }

    try {
        // 3. Insert into Supabase with the captured IP
        const { data, error } = await supabase
            .from('palette_submissions')
            .insert([
                {
                    name: name.trim(),
                    colors: colors,
                    status: 'pending',
                    tags: tags,
                    user_ip: userIp // Securely captured on backend
                }
            ]);

        if (error) throw error;

        res.status(201).json({
            success: true,
            message: "Palette submitted for review!",
            ip_captured: userIp // For confirmation
        });

    } catch (error) {
        console.error('Submission error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

/**
 * MASKING UTILITY (for Admin Display)
 * If you want to mask the IP in the Admin UI:
 */
function maskIp(ip) {
    if (!ip) return 'Unknown';
    if (ip.includes(':')) { // IPv6
        return ip.split(':').slice(0, 3).join(':') + ':****';
    }
    // IPv4 (mask last two octets)
    return ip.split('.').slice(0, 2).join('.') + '.*.*';
}

app.listen(3000, () => console.log('Server running on port 3000'));
