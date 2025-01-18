document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('dataForm');
    const popup = document.getElementById('warningPopup');
    const closeBtn = popup.querySelector('.close-btn');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        try {
            const formData = new FormData(form);
            const queryString = new URLSearchParams(formData).toString();
            const response = await fetch(`${form.action}?${queryString}`);
            const data = await response.json();

            // Check if no data found (adjust this condition based on your API response)
            if (!data || data.error || data.length === 0) {
                showPopup();
            } else {
                // If data found, proceed with normal form submission
                form.submit();
            }
        } catch (error) {
            showPopup();
        }
    });

    closeBtn.addEventListener('click', function() {
        hidePopup();
    });

    // Close popup when clicking outside
    popup.addEventListener('click', function(e) {
        if (e.target === popup) {
            hidePopup();
        }
    });

    // Close popup when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && popup.classList.contains('show')) {
            hidePopup();
        }
    });
});

function showPopup() {
    const popup = document.getElementById('warningPopup');
    popup.classList.add('show');
}

function hidePopup() {
    const popup = document.getElementById('warningPopup');
    popup.classList.remove('show');
} 