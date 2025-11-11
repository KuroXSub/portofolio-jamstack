document.addEventListener('DOMContentLoaded', function() {
    // Efek fade-in saat halaman dimuat
    document.body.classList.add('loaded');
    
    // Logika animasi saat scroll (Intersection Observer)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('animate-slide-in-up');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('[data-animate]').forEach(el => {
        observer.observe(el);
    });

    // --- LOGIKA BARU DI SINI ---

    // 1. Logika untuk tombol Scroll-to-Top
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.remove('opacity-0');
        } else {
            scrollToTopBtn.classList.add('opacity-0');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 2. Logika untuk Lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxClose = document.getElementById('lightbox-close');

    document.querySelectorAll('.lightbox-trigger').forEach(image => {
        image.addEventListener('click', () => {
            lightboxImage.src = image.src;
            lightbox.classList.remove('hidden');
        });
    });

    const closeLightbox = () => {
        lightbox.classList.add('hidden');
        lightboxImage.src = '';
    }

    lightboxClose.addEventListener('click', closeLightbox);
    // Tutup lightbox jika mengklik area gelap di sekitarnya
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    let lastScrollTop = 0;
    const header = document.getElementById('main-header');
    const headerHeight = header.offsetHeight;

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop && scrollTop > headerHeight){
            // Scroll ke bawah
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scroll ke atas
            header.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Untuk handle scroll di paling atas
    });
});