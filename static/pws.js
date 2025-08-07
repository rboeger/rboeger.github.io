AOS.init();

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('gallery-modal');
    const modalImg = document.getElementById('modal-image');
    const modalDescription = document.getElementById('modal-description');
    const closeBtn = document.querySelector('.gallery-modal-close');
    const galleryItems = document.querySelectorAll('.gallery-item');
    let currentIndex = 0;
    
    function openImageModal(index, direction = 'none') {
        const item = galleryItems[index];
        const imgSrc = item.querySelector('img').src;
        const description = item.getAttribute('data-description');
        const isMobile = window.innerWidth <= 768; // Check if mobile/tablet
        
        // Set up animation classes
        if (isMobile && direction !== 'none') {
            // Remove any existing animation classes
            modalImg.classList.remove('swipe-left', 'swipe-right', 'swipe-in-left', 'swipe-in-right');
            
            // Set initial position based on direction
            if (direction === 'next') {
                modalImg.classList.add('swipe-left');
            } else if (direction === 'prev') {
                modalImg.classList.add('swipe-right');
            }
            
            // Force reflow to ensure the initial position is applied
            void modalImg.offsetWidth;
            
            // Apply the slide-in animation
            if (direction === 'next') {
                modalImg.classList.add('swipe-in-left');
            } else if (direction === 'prev') {
                modalImg.classList.add('swipe-in-right');
            }
            
            // Remove animation classes after animation completes
            modalImg.addEventListener('animationend', function onAnimationEnd() {
                modalImg.classList.remove('swipe-left', 'swipe-right', 'swipe-in-left', 'swipe-in-right');
                modalImg.removeEventListener('animationend', onAnimationEnd);
            }, { once: true });
        }
        
        // Update image and description
        modalImg.src = imgSrc;
        modalImg.alt = item.querySelector('img').alt;
        modalDescription.textContent = description;
        
        // Show modal if not already shown
        if (modal.style.display !== 'flex') {
            modal.style.display = 'flex';
            setTimeout(() => {
                modal.classList.add('show');
            }, 10);
        }
        
        currentIndex = index;
        document.body.style.overflow = 'hidden';
    }
    
    function closeImageModal() {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = ''; // Re-enable scrolling
        }, 300);
    }
    
    function showNextImage() {
        const newIndex = (currentIndex + 1) % galleryItems.length;
        openImageModal(newIndex, 'next');
    }
    
    function showPreviousImage() {
        const newIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        openImageModal(newIndex, 'prev');
    }
    
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openImageModal(index));
    });
    
    closeBtn.addEventListener('click', closeImageModal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeImageModal();
        }
    });
    
    // Keyboard navigation for modal
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('show')) return;
        
        switch(e.key) {
            case 'Escape':
                closeImageModal();
                break;
            case 'ArrowLeft':
                showPreviousImage();
                break;
            case 'ArrowRight':
                showNextImage();
                break;
        }
    });
    
    // Add touch events for mobile swipe
    let touchStartX = 0;
    let touchEndX = 0;
    
    modal.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    modal.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        const swipeThreshold = 50; // Minimum distance to consider it a swipe
        
        if (touchEndX < touchStartX - swipeThreshold) {
            showNextImage();
        } else if (touchEndX > touchStartX + swipeThreshold) {
            showPreviousImage();
        }
    }
});
