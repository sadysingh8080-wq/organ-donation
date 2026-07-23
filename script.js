document.addEventListener('DOMContentLoaded', () => {

    // --- Filtering Logic ---
    const filterLinks = document.querySelectorAll('.nav-links a');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.getAttribute('href').startsWith('#gallery')) {
                e.preventDefault();
                
                // Active state
                filterLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');

                const filterValue = link.getAttribute('data-filter');

                galleryItems.forEach(item => {
                    if (filterValue === 'all' || item.classList.contains(filterValue)) {
                        item.style.display = 'block';
                        // Re-trigger animation
                        setTimeout(() => item.classList.add('show'), 50);
                    } else {
                        item.style.display = 'none';
                        item.classList.remove('show');
                    }
                });
            }
        });
    });

    // --- Intersection Observer for Scroll Animation ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    galleryItems.forEach(item => {
        observer.observe(item);
    });

    // --- Lightbox Logic ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-modal');
    const previewBtns = document.querySelectorAll('.preview-btn');

    previewBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const imgSrc = btn.getAttribute('data-src');
            lightboxImg.src = imgSrc;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    closeBtn.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
        if (e.target !== lightboxImg) {
            closeLightbox();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    // Trigger default selection on load
    const defaultFilter = document.querySelector('.nav-links a.active');
    if (defaultFilter) {
        defaultFilter.click();
    }
});
