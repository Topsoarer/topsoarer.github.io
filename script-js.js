document.addEventListener('DOMContentLoaded', function() {
    // Navigation dots functionality
    const sections = document.querySelectorAll('section');
    const navDots = document.querySelectorAll('.nav-dot');
    
    // Remove page dragging functionality
    // The original dragging code has been removed to prevent scrolling when dragging
    
    // Disable overscroll behavior to prevent page bouncing
    document.body.style.overscrollBehavior = 'none';
    
    // Update drag info text
    const dragInfo = document.querySelector('.drag-info');
    if (dragInfo) {
        dragInfo.textContent = 'DRAG FOR EFFECT';
    }
    
    // Highlight active nav dot based on scroll position
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 300) {
                current = section.getAttribute('id');
            }
        });
        
        navDots.forEach((dot, index) => {
            dot.classList.remove('active');
            if (index === Array.from(sections).findIndex(section => section.getAttribute('id') === current)) {
                dot.classList.add('active');
            }
        });
    });
    
    // Smooth scroll to section when clicking nav dots
    navDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            window.scrollTo({
                top: sections[index].offsetTop,
                behavior: 'smooth'
            });
        });
    });
    
    // Navigation menu smooth scroll
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        });
    });
    
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // For a real implementation, you would send the form data to your server
            const formData = new FormData(this);
            let formValues = {};
            
            for (let [key, value] of formData.entries()) {
                formValues[key] = value;
            }
            
            console.log('Form submitted:', formValues);
            
            // Reset the form
            this.reset();
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
        });
    }
    
    // Typing animation for the title
    const titleElement = document.querySelector('.title-text');
    if (titleElement) {
        const titleText = titleElement.textContent;
        titleElement.textContent = '';
        
        let charIndex = 0;
        function typeWriter() {
            if (charIndex < titleText.length) {
                titleElement.textContent += titleText.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Start the typing animation after a short delay
        setTimeout(typeWriter, 500);
    }
});
