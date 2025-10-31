// Initialize GSAP and ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Animate timeline items
gsap.utils.toArray('.timeline-item').forEach((item, index) => {
    gsap.from(item, {
        opacity: 0,
        y: 100,
        duration: 1,
        scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });
});

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});