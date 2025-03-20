// Main JavaScript for Academic Portfolio
document.addEventListener('DOMContentLoaded', function() {
    // Elements that should animate on scroll
    const fadeElements = document.querySelectorAll('.section-title, .education-item, .experience-item, .publication-item, .skill-category');
    
    // Add fade-in class to elements
    fadeElements.forEach(element => {
        element.classList.add('fade-in');
    });
    
    // Check if an element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Handle scroll animations
    function handleScrollAnimations() {
        fadeElements.forEach(element => {
            if (isInViewport(element)) {
                element.classList.add('active');
            }
        });
    }
    
    // Initial check for elements in viewport
    handleScrollAnimations();
    
    // Check on scroll
    window.addEventListener('scroll', handleScrollAnimations);
    
    // Navigation dots and smooth scrolling
    const sections = document.querySelectorAll('section');
    const navDots = document.querySelectorAll('.nav-dot');
    
    // Update active navigation dot on scroll
    function updateActiveNavDot() {
        let currentSectionId = '';
        let minDistance = Infinity;
        
        // Find the closest section to the viewport center
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const distance = Math.abs(rect.top);
            
            if (distance < minDistance) {
                minDistance = distance;
                currentSectionId = section.id;
            }
        });
        
        // Update active nav dot
        navDots.forEach(dot => {
            dot.classList.remove('active');
            if (dot.getAttribute('data-section') === currentSectionId) {
                dot.classList.add('active');
            }
        });
    }
    
    // Initial update
    updateActiveNavDot();
    
    // Update on scroll
    window.addEventListener('scroll', updateActiveNavDot);
    
    // Smooth scroll to section when clicking nav dots
    navDots.forEach(dot => {
        dot.addEventListener('click', function() {
            const targetSection = document.getElementById(this.getAttribute('data-section'));
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navigation menu smooth scroll
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Contact form handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            let isValid = true;
            const name = this.querySelector('#name');
            const email = this.querySelector('#email');
            const subject = this.querySelector('#subject');
            const message = this.querySelector('#message');
            
            // Clear previous errors
            document.querySelectorAll('.error-message').forEach(el => el.remove());
            document.querySelectorAll('.form-group input, .form-group textarea').forEach(el => {
                el.classList.remove('error');
            });
            
            // Validate fields
            if (!name.value.trim()) {
                showError(name, 'Please enter your name');
                isValid = false;
            }
            
            if (!email.value.trim()) {
                showError(email, 'Please enter your email');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                showError(email, 'Please enter a valid email address');
                isValid = false;
            }
            
            if (!subject.value.trim()) {
                showError(subject, 'Please enter a subject');
                isValid = false;
            }
            
            if (!message.value.trim()) {
                showError(message, 'Please enter your message');
                isValid = false;
            }
            
            if (isValid) {
                // Here you would typically send the form data to your server
                // For now, we'll just simulate success
                showSuccessMessage();
                this.reset();
            }
        });
        
        // Helper function to show error message
        function showError(inputElement, message) {
            inputElement.classList.add('error');
            
            const errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.textContent = message;
            errorElement.style.color = '#ff3860';
            errorElement.style.fontSize = '0.8rem';
            errorElement.style.marginTop = '0.3rem';
            
            inputElement.parentNode.appendChild(errorElement);
        }
        
        // Helper function to show success message
        function showSuccessMessage() {
            // Remove any existing success message
            const existingSuccess = document.querySelector('.success-message');
            if (existingSuccess) {
                existingSuccess.remove();
            }
            
            // Create success message
            const successElement = document.createElement('div');
            successElement.className = 'success-message';
            successElement.textContent = 'Your message has been sent successfully! I will get back to you soon.';
            successElement.style.backgroundColor = 'rgba(0, 200, 150, 0.1)';
            successElement.style.color = '#00c896';
            successElement.style.padding = '1rem';
            successElement.style.borderRadius = '4px';
            successElement.style.marginTop = '1rem';
            
            contactForm.parentNode.appendChild(successElement);
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successElement.style.opacity = '0';
                successElement.style.transform = 'translateY(-10px)';
                
                setTimeout(() => {
                    successElement.remove();
                }, 500);
            }, 5000);
        }
        
        // Helper function to validate email
        function isValidEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }
        
        // Reset error state on input
        document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
            input.addEventListener('input', function() {
                this.classList.remove('error');
                const errorMessage = this.parentNode.querySelector('.error-message');
                if (errorMessage) {
                    errorMessage.remove();
                }
            });
        });
    }
    
    // Typing animation for title
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
        
        // Start typing animation
        setTimeout(typeWriter, 1000);
    }
    
    // Add subtle hover effects for better interactivity
    document.querySelectorAll('.publication-item, .education-item, .experience-item, .skill-category').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = this.classList.contains('skill-category') ? 'translateY(-10px)' : 'translateX(10px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0)';
        });
    });
});
