// ============================================
// Supabase Client Setup & Palette Likes System
// ============================================
// This file provides a production-ready global likes system
// All users share the same like counts in real-time

// ============================================
// 1. SETUP - Initialize Supabase Client
// ============================================

// Option A: Using CDN (add this to your HTML <head>)
/*
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
*/

// Option B: Using npm (run: npm install @supabase/supabase-js)
// import { createClient } from '@supabase/supabase-js'

// Replace these with your actual Supabase project credentials
const SUPABASE_URL = 'https://etsqidrpebkrtubfufag.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0c3FpZHJwZWJrcnR1YmZ1ZmFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzMDM4NzEsImV4cCI6MjA4NTg3OTg3MX0.GexBeezXG05HxdeOKwJa1riBRRBY4bdpQFqRaieEBoU'

// Initialize Supabase client
const supabase = window.supabase
    ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    : createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// ============================================
// 2. FETCH ALL PALETTES WITH LIKES
// ============================================

/**
 * Fetches all color palettes from Supabase
 * @returns {Promise<Array>} Array of palette objects with likes
 */
async function fetchAllPalettes() {
    try {
        const { data, error } = await supabase
            .from('palettes')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) {
            console.error('Error fetching palettes:', error)
            throw error
        }

        console.log('Fetched palettes:', data)
        return data
    } catch (err) {
        console.error('Failed to fetch palettes:', err)
        return []
    }
}

// ============================================
// 3. INCREMENT LIKES (ATOMIC OPERATION)
// ============================================

/**
 * Increments the like count for a specific palette
 * Uses atomic increment to prevent race conditions
 * @param {string} paletteId - UUID of the palette
 * @returns {Promise<Object>} Updated palette data
 */
async function incrementPaletteLikes(paletteId) {
    try {
        // Method 1: Using RPC function (recommended - atomic)
        const { data, error } = await supabase
            .rpc('increment_palette_likes', { palette_id: paletteId })

        if (error) {
            console.error('Error incrementing likes:', error)

            // Fallback Method 2: Direct update (less safe for concurrent users)
            const { data: currentData, error: fetchError } = await supabase
                .from('palettes')
                .select('likes')
                .eq('id', paletteId)
                .single()

            if (fetchError) throw fetchError

            const { data: updateData, error: updateError } = await supabase
                .from('palettes')
                .update({ likes: currentData.likes + 1 })
                .eq('id', paletteId)
                .select()
                .single()

            if (updateError) throw updateError
            return updateData
        }

        // Fetch updated palette to get new like count
        const { data: updatedPalette, error: fetchError } = await supabase
            .from('palettes')
            .select('*')
            .eq('id', paletteId)
            .single()

        if (fetchError) throw fetchError

        console.log('Likes incremented successfully:', updatedPalette)
        return updatedPalette
    } catch (err) {
        console.error('Failed to increment likes:', err)
        throw err
    }
}

// ============================================
// 4. RENDER PALETTES IN UI
// ============================================

/**
 * Renders all palettes with like buttons
 * @param {Array} palettes - Array of palette objects
 */
function renderPalettes(palettes) {
    const container = document.getElementById('palettes-container')
    if (!container) {
        console.error('Container #palettes-container not found')
        return
    }

    container.innerHTML = '' // Clear existing content

    palettes.forEach(palette => {
        const paletteCard = createPaletteCard(palette)
        container.appendChild(paletteCard)
    })
}

/**
 * Creates a single palette card element
 * @param {Object} palette - Palette object with id, name, colors, likes
 * @returns {HTMLElement} Palette card element
 */
function createPaletteCard(palette) {
    const card = document.createElement('div')
    card.className = 'palette-card'
    card.dataset.paletteId = palette.id

    // Parse colors (handle both array and JSONB formats)
    const colors = Array.isArray(palette.colors)
        ? palette.colors
        : JSON.parse(palette.colors)

    // Create color swatches
    const colorSwatches = colors.map(color =>
        `<div class="color-swatch" style="background-color: ${color}"></div>`
    ).join('')

    card.innerHTML = `
    <div class="palette-header">
      <h3 class="palette-name">${palette.name}</h3>
    </div>
    <div class="color-swatches">
      ${colorSwatches}
    </div>
    <div class="palette-footer">
      <button class="like-button" data-palette-id="${palette.id}">
        ❤️ <span class="like-count">${palette.likes}</span>
      </button>
    </div>
  `

    return card
}

// ============================================
// 5. HANDLE LIKE BUTTON CLICKS
// ============================================

/**
 * Handles like button clicks with optimistic UI update
 * @param {Event} event - Click event
 */
async function handleLikeClick(event) {
    const button = event.target.closest('.like-button')
    if (!button) return

    const paletteId = button.dataset.paletteId
    const likeCountSpan = button.querySelector('.like-count')
    const currentLikes = parseInt(likeCountSpan.textContent)

    // Prevent multiple clicks while processing
    if (button.disabled) return
    button.disabled = true

    // Optimistic UI update
    likeCountSpan.textContent = currentLikes + 1
    button.classList.add('liked')

    try {
        // Increment likes in database
        const updatedPalette = await incrementPaletteLikes(paletteId)

        // Update UI with actual value from database
        likeCountSpan.textContent = updatedPalette.likes

        // Add animation
        button.classList.add('pulse')
        setTimeout(() => button.classList.remove('pulse'), 600)

    } catch (error) {
        // Revert optimistic update on error
        likeCountSpan.textContent = currentLikes
        button.classList.remove('liked')
        alert('Failed to update like. Please try again.')
    } finally {
        // Re-enable button after short delay to prevent spam
        setTimeout(() => {
            button.disabled = false
        }, 500)
    }
}

// ============================================
// 6. INITIALIZE APP
// ============================================

/**
 * Initializes the palette likes system
 */
async function initializePaletteSystem() {
    try {
        // Fetch all palettes from Supabase
        const palettes = await fetchAllPalettes()

        // Render palettes in UI
        renderPalettes(palettes)

        // Add event listener for like buttons (event delegation)
        document.addEventListener('click', handleLikeClick)

        console.log('Palette system initialized successfully')
    } catch (error) {
        console.error('Failed to initialize palette system:', error)
    }
}

// ============================================
// 7. AUTO-INITIALIZE ON DOM READY
// ============================================

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePaletteSystem)
} else {
    initializePaletteSystem()
}

// ============================================
// 8. OPTIONAL: REAL-TIME UPDATES
// ============================================

/**
 * Subscribe to real-time updates for palette likes
 * When any user likes a palette, all users see the update instantly
 */
function subscribeToRealtimeUpdates() {
    const channel = supabase
        .channel('palette-likes')
        .on(
            'postgres_changes',
            {
                event: 'UPDATE',
                schema: 'public',
                table: 'palettes'
            },
            (payload) => {
                console.log('Real-time update received:', payload)

                // Update the specific palette in UI
                const paletteId = payload.new.id
                const newLikes = payload.new.likes

                const button = document.querySelector(`[data-palette-id="${paletteId}"]`)
                if (button) {
                    const likeCountSpan = button.querySelector('.like-count')
                    likeCountSpan.textContent = newLikes

                    // Add subtle animation to show update
                    button.classList.add('updated')
                    setTimeout(() => button.classList.remove('updated'), 1000)
                }
            }
        )
        .subscribe()

    return channel
}

// Uncomment to enable real-time updates
// subscribeToRealtimeUpdates()

// ============================================
// EXPORT FOR MODULE USAGE
// ============================================

// If using ES modules, export functions
// export { fetchAllPalettes, incrementPaletteLikes, renderPalettes, initializePaletteSystem }
