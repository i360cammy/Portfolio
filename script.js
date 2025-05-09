document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu functionality
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        
        // Calculate and set max-height
        if (navLinks.classList.contains('nav-active')) {
            // Force a reflow to update the scrollHeight
            navLinks.style.display = 'block';
            const height = navLinks.scrollHeight;
            navLinks.style.display = '';
            navLinks.style.maxHeight = height + 'px';
        } else {
            navLinks.style.maxHeight = '0';
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        // Check if click is outside menu and not on carousel controls
        if (!menuToggle.contains(e.target) && 
            !navLinks.contains(e.target) &&
            !e.target.closest('.carousel-arrow') &&
            !e.target.closest('.carousel-indicators')) {
            navLinks.classList.remove('nav-active');
            navLinks.style.maxHeight = '0';
        }
    });

    // Carousel functionality
    const slides = document.querySelectorAll('.carousel-slide');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const indicators = document.querySelectorAll('.indicator');
    let currentSlide = 0;

    function updateIndicators() {
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('carousel-active', index === currentSlide);
        });
    }

    function showSlide(n) {
        // Calculate new slide index
        const prevSlide = currentSlide;
        currentSlide = (n + slides.length) % slides.length;
        
        // Determine direction
        const isForward = n > prevSlide;
        
        // Position slides based on direction
        slides.forEach((slide, index) => {
            slide.classList.remove('carousel-active');
            if (index === currentSlide) {
                // New slide position
                slide.style.transform = isForward ? 'translateX(100%)' : 'translateX(-100%)';
            } else if (index === prevSlide) {
                // Previous slide position
                slide.style.transform = isForward ? 'translateX(-100%)' : 'translateX(100%)';
            } else {
                // Other slides position
                slide.style.transform = isForward ? 'translateX(-100%)' : 'translateX(100%)';
            }
        });
        
        // Add active class to new slide
        slides[currentSlide].classList.add('carousel-active');
        
        // Update indicators
        updateIndicators();

        // Enable both navigation buttons since we're cycling
        prevButton.disabled = false;
        nextButton.disabled = false;

        // Reset the transform after transition
        setTimeout(() => {
            slides.forEach(slide => {
                slide.style.transform = 'translateX(0)';
            });
        }, 500);
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    // Add event listeners for navigation
    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);

    // Add event listeners for indicators
    indicators.forEach(indicator => {
        indicator.addEventListener('click', () => {
            const slideIndex = parseInt(indicator.dataset.slide);
            showSlide(slideIndex);
        });
    });



    // Initialize the carousel
    showSlide(0);
});
