document.addEventListener('DOMContentLoaded', function() {
    // Navigation dots functionality
    const sections = document.querySelectorAll('section');
    const navDots = document.querySelectorAll('.nav-dot');
    
    // Disable overscroll behavior for smoother experience
    document.body.style.overscrollBehavior = 'none';
    
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
    
    // Form submission with validation
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            let isValid = true;
            const name = this.querySelector('#name').value.trim();
            const email = this.querySelector('#email').value.trim();
            const message = this.querySelector('#message').value.trim();
            
            if (name === '') {
                isValid = false;
                highlightInvalidField(this.querySelector('#name'), 'Please enter your name');
            }
            
            if (email === '' || !isValidEmail(email)) {
                isValid = false;
                highlightInvalidField(this.querySelector('#email'), 'Please enter a valid email address');
            }
            
            if (message === '') {
                isValid = false;
                highlightInvalidField(this.querySelector('#message'), 'Please enter your message');
            }
            
            if (isValid) {
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
                showFormSuccess();
            }
        });
        
        // Add input event listeners to clear errors when user starts typing
        contactForm.querySelectorAll('input, textarea').forEach(field => {
            field.addEventListener('input', function() {
                this.classList.remove('error');
                const errorMessage = this.parentNode.querySelector('.error-message');
                if (errorMessage) {
                    errorMessage.remove();
                }
            });
        });
    }
    
    // Helper function to validate email format
    function isValidEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }
    
    // Helper function to highlight invalid form fields
    function highlightInvalidField(field, message) {
        field.classList.add('error');
        
        // Remove existing error message if any
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add error message
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = message;
        errorMessage.style.color = '#ff3860';
        errorMessage.style.fontSize = '0.8rem';
        errorMessage.style.marginTop = '0.25rem';
        field.parentNode.appendChild(errorMessage);
    }
    
    // Helper function to show success message
    function showFormSuccess() {
        // Create success message element
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Thank you for your message! I will get back to you soon.';
        successMessage.style.backgroundColor = 'rgba(62, 255, 139, 0.2)';
        successMessage.style.color = '#00994d';
        successMessage.style.padding = '1rem';
        successMessage.style.borderRadius = '4px';
        successMessage.style.marginTop = '1rem';
        successMessage.style.textAlign = 'center';
        
        // Add to form container
        const formContainer = contactForm.parentNode;
        formContainer.insertBefore(successMessage, contactForm.nextSibling);
        
        // Remove after 5 seconds
        setTimeout(() => {
            successMessage.style.opacity = '0';
            successMessage.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                successMessage.remove();
            }, 500);
        }, 5000);
    }
    
    // Subtle typing animation for professional look
    const titleElement = document.querySelector('.title-text');
    if (titleElement) {
        const titleText = titleElement.textContent;
        titleElement.textContent = '';
        
        let charIndex = 0;
        function typeWriter() {
            if (charIndex < titleText.length) {
                titleElement.textContent += titleText.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 80); // Slightly faster for more professional feel
            }
        }
        
        // Start the typing animation after a short delay
        setTimeout(typeWriter, 500);
    }
    
    // Add subtle hover effect to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
            this.style.boxShadow = '0 10px 20px rgba(62, 255, 139, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.05)';
        });
    });
});
