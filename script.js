document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Share Functionality
    const shareButton = document.getElementById('shareButton');
    const shareText = document.getElementById('shareText');

    if (shareButton) {
        shareButton.addEventListener('click', async () => {
            const shareData = {
                title: 'Vesper Standard Time',
                text: 'What if time worked with us? Discover Vesper Standard Time.',
                url: window.location.href,
            };

            try {
                if (navigator.share) {
                    await navigator.share(shareData);
                } else {
                    await navigator.clipboard.writeText(window.location.href);
                    const originalText = shareText.textContent;
                    shareText.textContent = 'Link Copied!';
                    shareButton.classList.add('bg-emerald-500', 'text-white');
                    shareButton.classList.remove('bg-white', 'text-slate-950');
                    
                    setTimeout(() => {
                        shareText.textContent = originalText;
                        shareButton.classList.remove('bg-emerald-500', 'text-white');
                        shareButton.classList.add('bg-white', 'text-slate-950');
                    }, 2000);
                }
            } catch (err) {
                console.error('Error sharing:', err);
            }
        });
    }

    // Intersection Observer for Reveal Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: stop observing once revealed
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
        observer.observe(el);
    });
});
