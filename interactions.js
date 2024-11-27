// Initialize AOS Library for Scroll Animations
document.addEventListener("DOMContentLoaded", () => {
    AOS.init({
        duration: 1000, // Animation duration (ms)
        once: true,     // Run animation only once
        offset: 100     // Offset to trigger animations
    });

    // Initialize Slick Carousel
    $('.carousel').slick({
        autoplay: true,
        autoplaySpeed: 3000,
        dots: true,
        arrows: true,
        fade: true
    });
});

// Add Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute("href"));
        target.scrollIntoView({
            behavior: "smooth"
        });
    });
});
