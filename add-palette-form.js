// ============================================
// Add New Palette Form - Public Palette Creation
// ============================================
// This file handles creating new color palettes
// All palettes are saved to Supabase and visible to all users

// Assumes supabase client is already initialized in supabase-client.js

// ============================================
// 1. CREATE NEW PALETTE IN SUPABASE
// ============================================

/**
 * Adds a new palette to Supabase database
 * @param {string} name - Palette name
 * @param {string[]} colors - Array of hex color codes
 * @returns {Promise<Object>} Created palette data
 */
async function createNewPalette(name, colors) {
    try {
        // Validate inputs
        if (!name || name.trim().length === 0) {
            throw new Error('Palette name is required')
        }

        if (!colors || colors.length === 0) {
            throw new Error('At least one color is required')
        }

        // Validate hex colors
        const hexPattern = /^#[0-9A-Fa-f]{6}$/
        const invalidColors = colors.filter(color => !hexPattern.test(color))
        if (invalidColors.length > 0) {
            throw new Error(`Invalid hex colors: ${invalidColors.join(', ')}`)
        }

        // Insert into Supabase
        const { data, error } = await supabase
            .from('palettes')
            .insert([
                {
                    name: name.trim(),
                    colors: colors, // Supabase automatically converts to JSONB
                    likes: 0
                }
            ])
            .select()
            .single()

        if (error) {
            console.error('Error creating palette:', error)
            throw error
        }

        console.log('Palette created successfully:', data)
        return data
    } catch (err) {
        console.error('Failed to create palette:', err)
        throw err
    }
}

// ============================================
// 2. HANDLE FORM SUBMISSION
// ============================================

/**
 * Handles the palette creation form submission
 * @param {Event} event - Form submit event
 */
async function handlePaletteFormSubmit(event) {
    event.preventDefault()

    const form = event.target
    const submitButton = form.querySelector('button[type="submit"]')
    const nameInput = form.querySelector('#palette-name')
    const colorInputs = form.querySelectorAll('.color-input')

    // Disable submit button during processing
    submitButton.disabled = true
    submitButton.textContent = 'Creating...'

    try {
        // Get form values
        const name = nameInput.value.trim()
        const colors = Array.from(colorInputs)
            .map(input => input.value)
            .filter(color => color) // Remove empty values

        // Create palette in Supabase
        const newPalette = await createNewPalette(name, colors)

        // Show success message
        showSuccessMessage('Palette created successfully! 🎨')

        // Reset form
        form.reset()

        // Refresh palette list to show new palette
        await refreshPaletteList()

        // Scroll to top to see new palette
        window.scrollTo({ top: 0, behavior: 'smooth' })

    } catch (error) {
        // Show error message
        showErrorMessage(error.message || 'Failed to create palette. Please try again.')
    } finally {
        // Re-enable submit button
        submitButton.disabled = false
        submitButton.textContent = 'Create Palette'
    }
}

// ============================================
// 3. REFRESH PALETTE LIST
// ============================================

/**
 * Refreshes the palette list to show newly created palettes
 */
async function refreshPaletteList() {
    try {
        // Fetch all palettes (including newly created ones)
        const palettes = await fetchAllPalettes()

        // Re-render palettes in UI
        renderPalettes(palettes)

        console.log('Palette list refreshed')
    } catch (error) {
        console.error('Failed to refresh palette list:', error)
    }
}

// ============================================
// 4. UI FEEDBACK MESSAGES
// ============================================

/**
 * Shows a success message to the user
 * @param {string} message - Success message
 */
function showSuccessMessage(message) {
    const messageDiv = document.createElement('div')
    messageDiv.className = 'message success-message'
    messageDiv.textContent = message

    document.body.appendChild(messageDiv)

    // Auto-remove after 3 seconds
    setTimeout(() => {
        messageDiv.classList.add('fade-out')
        setTimeout(() => messageDiv.remove(), 300)
    }, 3000)
}

/**
 * Shows an error message to the user
 * @param {string} message - Error message
 */
function showErrorMessage(message) {
    const messageDiv = document.createElement('div')
    messageDiv.className = 'message error-message'
    messageDiv.textContent = message

    document.body.appendChild(messageDiv)

    // Auto-remove after 5 seconds
    setTimeout(() => {
        messageDiv.classList.add('fade-out')
        setTimeout(() => messageDiv.remove(), 300)
    }, 5000)
}

// ============================================
// 5. DYNAMIC COLOR INPUT MANAGEMENT
// ============================================

/**
 * Adds a new color input field
 */
function addColorInput() {
    const colorInputsContainer = document.getElementById('color-inputs-container')
    const colorInputs = colorInputsContainer.querySelectorAll('.color-input-group')

    // Limit to 10 colors
    if (colorInputs.length >= 10) {
        showErrorMessage('Maximum 10 colors allowed')
        return
    }

    const colorInputGroup = document.createElement('div')
    colorInputGroup.className = 'color-input-group'
    colorInputGroup.innerHTML = `
    <input 
      type="color" 
      class="color-input" 
      value="#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}"
      required
    >
    <button type="button" class="remove-color-btn" onclick="removeColorInput(this)">
      ✕
    </button>
  `

    colorInputsContainer.appendChild(colorInputGroup)
}

/**
 * Removes a color input field
 * @param {HTMLElement} button - Remove button element
 */
function removeColorInput(button) {
    const colorInputsContainer = document.getElementById('color-inputs-container')
    const colorInputs = colorInputsContainer.querySelectorAll('.color-input-group')

    // Keep at least 1 color
    if (colorInputs.length <= 1) {
        showErrorMessage('At least one color is required')
        return
    }

    button.closest('.color-input-group').remove()
}

// ============================================
// 6. INITIALIZE FORM
// ============================================

/**
 * Initializes the palette creation form
 */
function initializePaletteForm() {
    const form = document.getElementById('create-palette-form')
    if (!form) {
        console.warn('Create palette form not found')
        return
    }

    // Add submit event listener
    form.addEventListener('submit', handlePaletteFormSubmit)

    // Add event listener for "Add Color" button
    const addColorBtn = document.getElementById('add-color-btn')
    if (addColorBtn) {
        addColorBtn.addEventListener('click', addColorInput)
    }

    console.log('Palette form initialized')
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePaletteForm)
} else {
    initializePaletteForm()
}

// ============================================
// EXPORT FOR MODULE USAGE
// ============================================

// If using ES modules, export functions
// export { createNewPalette, handlePaletteFormSubmit, refreshPaletteList }
