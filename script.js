/**
 * Pikmin Website - Interactive Scripts
 * Handles intersection observers for scroll animations and other dynamic effects
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // Setup Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const animateOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add visible class to trigger CSS transitions
                entry.target.classList.add('visible');
                // Optional: Stop observing once animated if we only want it to animate once
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select all elements that need to fade in
    const elementsToAnimate = document.querySelectorAll('.fade-in, .fade-in-up');
    
    elementsToAnimate.forEach(el => {
        animateOnScroll.observe(el);
    });

    // Handle smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add a simple interaction to the cards on click (e.g. bounce effect)
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', () => {
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
                card.style.transform = ''; // reset to default or hover state
            }, 150);
        });
    });
});
