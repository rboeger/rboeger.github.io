// Wait for DOM to load before setting up hamburger menu
document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Functionality
    const themeToggle = document.getElementById('themeToggle');
    const themeText = themeToggle.querySelector('.theme-text');
    
    // Check for saved theme preference or default to light
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeToggle(currentTheme);
    
    function updateThemeToggle(theme) {
        if (themeText) {
            themeText.textContent = theme === 'dark' ? 'Dark' : 'Light';
        }
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            // Update theme
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeToggle(newTheme);
            
            // Add a little animation
            themeToggle.style.transform = 'scale(0.95)';
            setTimeout(() => {
                themeToggle.style.transform = 'scale(1)';
            }, 150);
        });
    }

    // Hamburger menu functionality
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when a link is clicked
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-container')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // Gallery carousel functionality
    const carouselImages = [
        { src: 'static/building/organ_bench.jpg', title: 'Custom Organ Bench' },
        { src: 'static/building/pc_build1.jpg', title: 'Custom PC (new components)' },
        { src: 'static/building/pc_build2.jpg', title: 'Custom PC (used components)' },
        { src: 'static/building/regulator.jpg', title: 'Pressure Regulator' },
        { src: 'static/building/solenoids.jpg', title: 'Solenoid Components under Toe Board' },
        { src: 'static/building/switching_system1.jpg', title: 'Switching System' },
        { src: 'static/building/switching_system2.jpg', title: 'Switching System' }
    ];
    
    let currentCarouselIndex = 0;
    const carouselImage = document.querySelector('.carousel-image');
    const carouselTitle = document.getElementById('carouselTitle');
    const indicators = document.querySelectorAll('.indicator');
    
    function updateCarousel(index) {
        currentCarouselIndex = index;
        carouselImage.style.opacity = '0';
        
        setTimeout(() => {
            carouselImage.src = carouselImages[index].src;
            carouselTitle.textContent = carouselImages[index].title;
            carouselImage.style.opacity = '1';
        }, 300);
        
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
    }
    
    // Auto-rotate carousel every 4 seconds
    setInterval(() => {
        currentCarouselIndex = (currentCarouselIndex + 1) % carouselImages.length;
        updateCarousel(currentCarouselIndex);
    }, 4000);
    
    // Allow manual control via indicators
    indicators.forEach(indicator => {
        indicator.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            updateCarousel(index);
        });
    });

    // Smooth scroll behavior for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Gallery modal functionality
    const galleryData = [
        { src: 'static/building/organ_bench.jpg', title: 'Organ Bench' },
        { src: 'static/building/pc_build1.jpg', title: 'Pipeline Component' },
        { src: 'static/building/pc_build2.jpg', title: 'Pipeline Component Assembly' },
        { src: 'static/building/regulator.jpg', title: 'Regulator System' },
        { src: 'static/building/solenoids.jpg', title: 'Solenoid Components' },
        { src: 'static/building/switching_system1.jpg', title: 'Switching System' },
        { src: 'static/building/switching_system2.jpg', title: 'Switching System Detail' }
    ];

    const galleryToggle = document.getElementById('galleryToggle');
    const galleryModal = document.getElementById('galleryModal');
    const modalClose = document.getElementById('modalClose');
    const modalImage = document.getElementById('modalImage');
    const modalImageTitle = document.getElementById('modalImageTitle');
    const thumbnails = document.querySelectorAll('.thumbnail');

    let currentModalIndex = 0;

    function openModal() {
        if (galleryModal) {
            galleryModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeModal() {
        if (galleryModal) {
            galleryModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    function updateModalImage(index) {
        currentModalIndex = index;
        if (modalImage) modalImage.src = galleryData[index].src;
        if (modalImageTitle) modalImageTitle.textContent = galleryData[index].title;

        thumbnails.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });
    }

    // Setup gallery toggle button
    if (galleryToggle && galleryModal) {
        console.log('Setting up gallery toggle listener');
        galleryToggle.addEventListener('click', (e) => {
            console.log('Gallery toggle clicked');
            e.preventDefault();
            openModal();
        });
    } else {
        console.warn('Gallery toggle or modal not found');
    }

    // Setup modal close button
    if (modalClose && galleryModal) {
        modalClose.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal();
        });
    }

    // Close modal when clicking outside the content
    if (galleryModal) {
        galleryModal.addEventListener('click', (e) => {
            if (e.target === galleryModal) {
                closeModal();
            }
        });
    }

    // Thumbnail click handlers
    if (thumbnails.length > 0) {
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                updateModalImage(index);
            });
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!galleryModal || !galleryModal.classList.contains('active')) return;

        if (e.key === 'Escape') {
            closeModal();
        } else if (e.key === 'ArrowLeft') {
            currentModalIndex = (currentModalIndex - 1 + galleryData.length) % galleryData.length;
            updateModalImage(currentModalIndex);
        } else if (e.key === 'ArrowRight') {
            currentModalIndex = (currentModalIndex + 1) % galleryData.length;
            updateModalImage(currentModalIndex);
        }
    });
});

// Active navigation highlighting
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    const viewportMiddle = pageYOffset + window.innerHeight / 2;
    const pageHeight = document.documentElement.scrollHeight;
    const scrollPosition = pageYOffset + window.innerHeight;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionBottom = sectionTop + sectionHeight;
        
        // Check if viewport middle is within the section
        if (viewportMiddle >= sectionTop && viewportMiddle <= sectionBottom) {
            current = section.getAttribute('id');
        }
    });

    // If at bottom of page and no section is currently active, highlight the last section
    if (!current && scrollPosition >= pageHeight - 300 && sections.length > 0) {
        current = sections[sections.length - 1].getAttribute('id');
    }

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });

    // If no nav item is active, highlight Contact
    const activeLink = document.querySelector('.nav-menu a.active');
    if (!activeLink) {
        const contactLink = document.querySelector('.nav-menu a[href="#contact"]');
        if (contactLink) {
            contactLink.classList.add('active');
        }
    }
});

// Add active link styling
const style = document.createElement('style');
style.textContent = `
    .nav-menu a.active {
        color: var(--accent-color) !important;
        border-bottom: 2px solid var(--accent-color);
        padding-bottom: 5px;
    }
`;
document.head.appendChild(style);

// Keep gallery images visible - remove lazy loading that was hiding them
// Images will load normally without the opacity animation

// Mobile menu toggle (optional)
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    });
}

// Scroll animation for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply scroll animation to cards and items (but not gallery items to avoid conflicts)
document.querySelectorAll('.skill-category, .project-card, .cert-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    scrollObserver.observe(el);
});

// Gallery items are handled by the image lazy loading, so don't hide them here
document.querySelectorAll('.gallery-item').forEach(el => {
    el.style.opacity = '1';
});

console.log('Portfolio website loaded successfully!');
