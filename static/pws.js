AOS.init();

// Gallery functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get the modal elements
    const modal = document.getElementById('gallery-modal');
    const modalImg = document.getElementById('modal-image');
    const modalDescription = document.getElementById('modal-description');
    const closeBtn = document.querySelector('.gallery-modal-close');
    
    // Get all gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    let currentIndex = 0;
    
    // Function to open the modal with the clicked image
    function openModal(index) {
        const item = galleryItems[index];
        const imgSrc = item.querySelector('img').src;
        const description = item.getAttribute('data-description');
        
        modalImg.src = imgSrc;
        modalImg.alt = item.querySelector('img').alt;
        modalDescription.textContent = description;
        
        // Show the modal with animation
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
        
        // Update current index
        currentIndex = index;
        
        // Prevent scrolling on the body when modal is open
        document.body.style.overflow = 'hidden';
    }
    
    // Function to close the modal
    function closeModal() {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = ''; // Re-enable scrolling
        }, 300);
    }
    
    // Function to show next image
    function showNext() {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        openModal(currentIndex);
    }
    
    // Function to show previous image
    function showPrevious() {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        openModal(currentIndex);
    }
    
    // Add click event listeners to all gallery items
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openModal(index));
    });
    
    // Close modal when clicking the close button
    closeBtn.addEventListener('click', closeModal);
    
    // Close modal when clicking outside the image
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('show')) return;
        
        switch(e.key) {
            case 'Escape':
                closeModal();
                break;
            case 'ArrowLeft':
                showPrevious();
                break;
            case 'ArrowRight':
                showNext();
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
            // Swipe left - show next
            showNext();
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right - show previous
            showPrevious();
        }
    }
});

// Your existing code
window.onload = () => {
    console.log("Website loaded successfully");
}

const testElement = document.getElementById('projects');
testElement?.addEventListener('scroll', () => {
    console.log("Scrolling in projects section");
});
