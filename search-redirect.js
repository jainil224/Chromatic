/**
 * Search Redirection Logic
 * This script handles user input from a search bar and redirects to specific 
 * palette pages based on predefined keyword mapping.
 */

// 1. Predefined keyword groups for easy customization
const REDIRECTION_RULES = [
    {
        keywords: ['dark', 'black', 'night', 'deep'],
        redirectUrl: '/dark-palettes'
    },
    {
        keywords: ['pastel', 'soft', 'light', 'baby'],
        redirectUrl: '/pastel-palettes'
    },
    {
        keywords: ['aqua', 'blue', 'sky', 'ocean'],
        redirectUrl: '/blue-palettes'
    },
    {
        keywords: ['red', 'pink', 'rose'],
        redirectUrl: '/red-palettes'
    }
];

/**
 * Handles the search submission
 * @param {string} query - The raw user input
 */
function handleSearchRedirect(query) {
    // 2. Normalize the input (trim spaces, convert to lowercase)
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) return;

    // 3. Match the search term with predefined keyword groups
    let targetUrl = null;

    for (const rule of REDIRECTION_RULES) {
        // Check if any keyword in the group is present as a word in the query
        // or if the query matches the keyword exactly
        const isMatch = rule.keywords.some(keyword =>
            normalizedQuery.includes(keyword)
        );

        if (isMatch) {
            targetUrl = rule.redirectUrl;
            break; // Stop at first match
        }
    }

    // 4. Redirect the user based on the matched keyword
    if (targetUrl) {
        console.log(`Redirecting to: ${targetUrl}`);
        window.location.href = targetUrl;
    } else {
        console.log('No specific redirection rule matched. Staying on search results.');
        // Optional: you could add a default redirection here if needed
        // window.location.href = `/search?q=${encodeURIComponent(normalizedQuery)}`;
    }
}

// Export for usage or simple script inclusion
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { handleSearchRedirect, REDIRECTION_RULES };
}
