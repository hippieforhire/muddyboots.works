document.addEventListener("DOMContentLoaded", function() {
    const mainNav = document.getElementById("mainNav");
    const navbarCollapse = document.getElementById("navbarResponsive");
    const navbarToggler = document.querySelector(".navbar-toggler");

    // --- Navbar Shrink on Scroll ---
    // This function adds/removes the 'navbar-shrink' class based on scroll position.
    // The 'navbar-shrink' class is defined in style.css to change the navbar's appearance.
    let lastScrollTop = 0;
    window.addEventListener("scroll", function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > 50) { // Add shrink class after scrolling 50px
            mainNav.classList.add("navbar-shrink");
        } else {
            mainNav.classList.remove("navbar-shrink");
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
    });

    // --- Smooth Scrolling for Navigation Links ---
    // When a navigation link is clicked, this smoothly scrolls the page to the target section.
    document.querySelectorAll('a.nav-link[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default jump
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Close the navbar on mobile after clicking a link
                if (navbarCollapse.classList.contains('show')) {
                    navbarCollapse.classList.remove('show');
                }

                // Calculate position considering fixed header height
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                // Offset by navbar height so content isn't hidden behind it
                const offsetPosition = elementPosition - mainNav.offsetHeight; 

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // --- Toggle Navbar on Toggler Click (for mobile menu) ---
    navbarToggler.addEventListener('click', function() {
        navbarCollapse.classList.toggle('show');
    });

    // --- Close Navbar when clicking outside (on mobile) ---
    // If the navbar is open and a click occurs outside the navbar and toggler, close the navbar.
    document.addEventListener('click', function(event) {
        if (!navbarCollapse.contains(event.target) && !navbarToggler.contains(event.target) && navbarCollapse.classList.contains('show')) {
            navbarCollapse.classList.remove('show');
        }
    });

    // --- Portfolio Modal Functionality ---
    // Handles opening and closing of the portfolio item modals.
    document.querySelectorAll('.portfolio-link').forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            const targetModalId = this.getAttribute('href');
            const modal = document.querySelector(targetModalId);
            if (modal) {
                modal.classList.add('show'); // Add 'show' class to display the modal
                document.body.style.overflow = 'hidden'; // Prevent body scroll when modal is open
            }
        });
    });

    // Close modal when the close button is clicked
    document.querySelectorAll('.close-modal').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.classList.remove('show'); // Remove 'show' class to hide modal
                document.body.style.overflow = ''; // Restore body scroll
            }
        });
    });

    // Close modal when clicking outside the modal content (on the backdrop)
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            // Check if the click occurred directly on the modal backdrop, not its content
            if (e.target === modal) {
                modal.classList.remove('show'); // Remove 'show' class to hide modal
                document.body.style.overflow = ''; // Restore body scroll
            }
        });
    });

    // --- Contact Form Submission (using Formspree/Basscss recipient) ---
    // This script will capture the form submission and send it to the specified recipient.
    // It uses a service like Formspree based on your original `data-bss-recipient` attribute.
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(event) {
            event.preventDefault(); // Prevent default form submission

            const form = event.target;
            const recipient = form.getAttribute('data-bss-recipient');
            const formData = new FormData(form);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });

            // Using Formspree's endpoint for email forwarding
            // For this to work, you need to set up your Formspree form and verify the email address.
            try {
                const response = await fetch(`https://formspree.io/f/${recipient}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    alert('Your message has been sent successfully!');
                    form.reset(); // Clear the form
                } else {
                    alert('There was an error sending your message. Please try again later.');
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                alert('An unexpected error occurred. Please try again.');
            }
        });
    }
});
