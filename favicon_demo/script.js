document.addEventListener('DOMContentLoaded', () => {
    const clickableFavicon = document.getElementById('clickable-favicon');
    const collectionGrid = document.getElementById('collection-grid');
    const toast = document.getElementById('toast');
    const clearBtn = document.getElementById('clear-btn');
    const faviconSrc = '/favicon.ico'; // In production, this might be dynamic

    // Load initial collection from localStorage
    let collection = JSON.parse(localStorage.getItem('faviconCollection')) || [];
    renderCollection();

    // Event Listener for clicking the favicon
    clickableFavicon.addEventListener('click', () => {
        addToCollection(faviconSrc);
    });

    // Event Listener for clear button
    clearBtn.addEventListener('click', () => {
        collection = [];
        saveCollection();
        renderCollection();
        showToast('Collection cleared', 'error');
    });

    function addToCollection(src) {
        // Check for duplicates
        if (collection.includes(src)) {
            showToast('Already in collection!', 'error');
            return;
        }

        // Add to array
        collection.push(src);

        // Save to localStorage
        saveCollection();

        // Render update
        renderCollection();

        // Show success feedback
        showToast('Added to Collection!');

        // Visual feedback on the clickable icon
        clickableFavicon.style.transform = 'scale(0.9)';
        setTimeout(() => {
            clickableFavicon.style.transform = '';
        }, 150);
    }

    function saveCollection() {
        localStorage.setItem('faviconCollection', JSON.stringify(collection));
    }

    function renderCollection() {
        collectionGrid.innerHTML = '';

        if (collection.length === 0) {
            collectionGrid.innerHTML = '<div class="empty-message">Your collection is empty. Start clicking!</div>';
            return;
        }

        collection.forEach((src, index) => {
            const item = document.createElement('div');
            item.className = 'collection-item';

            // Create image element
            const img = document.createElement('img');
            img.src = src;
            img.alt = `Favicon ${index + 1}`;

            // Create label
            const span = document.createElement('span');
            span.textContent = `Item #${index + 1}`;

            item.appendChild(img);
            item.appendChild(span);
            collectionGrid.appendChild(item);
        });
    }

    function showToast(message, type = 'success') {
        toast.textContent = message;
        toast.className = `notification ${type} show`;

        // Hide after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
});
