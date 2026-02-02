window.addEventListener('pageshow', (event) => {
    const loader = document.getElementById('page-loader');
    if (event.persisted || (loader && !loader.classList.contains('hidden'))) {
        if (loader) {
            loader.classList.add('hidden');
        }
    }
});

window.addEventListener('load', () => {
    const loader = document.getElementById('page-loader');
    if (loader) {
        loader.classList.add('hidden');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Select all hyperlinks on the page
    const allLinks = document.querySelectorAll('a');

    allLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetUrl = this.getAttribute('href');

            // Judgment conditions:
            // 1. The link cannot be empty
            // 2. The link cannot start with # (excluding in-page anchor links)
            // 3. The link cannot contain javascript: (excluding special script links)
            if (targetUrl && !targetUrl.startsWith('#') && !targetUrl.startsWith('javascript:')) {

                e.preventDefault(); // Intercept Redirect

                const loader = document.getElementById('page-loader');
                if (loader) {
                    loader.classList.remove('hidden');
                }

                // Execute the actual redirect after 800ms.
                setTimeout(() => {
                    window.location.href = targetUrl;
                }, 800);
            }
        });
    });
});