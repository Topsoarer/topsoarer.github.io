// Add the fixed CSS styles to ensure white background and clear text
document.addEventListener('DOMContentLoaded', function() {
    // Create a style element
    const styleElement = document.createElement('style');
    
    // Define the CSS to fix background and text issues
    styleElement.textContent = `
        /* Force white background everywhere */
        body, html, section, main, .hero, .about-section, .work-section, 
        .publications-section, .skills-section, .contact-section, .resume-section {
            background-color: #ffffff !important;
        }
        
        section:nth-child(even), section:nth-child(odd) {
            background-color: #ffffff !important;
        }
        
        /* Fix text colors and gradients */
        .name-glow {
            color: #c1b2ff !important;
            -webkit-text-fill-color: initial !important;
            background: none !important;
            background-clip: initial !important;
            -webkit-background-clip: initial !important;
            text-shadow: 0 0 10px rgba(193, 178, 255, 0.4) !important;
        }
        
        .title-text {
            color: #00c896 !important;
        }
        
        .intro-text {
            color: #2a2a2a !important;
            border-left: 3px solid #00c896 !important;
        }
        
        /* Fix skill tags */
        .skill-tag {
            background: #6c5ce7 !important;
            color: white !important;
        }
        
        /* Fix section titles and headers */
        .experience-title, .education-title, .section-title {
            color: #6c5ce7 !important;
        }
        
        .experience-company, .education-institution {
            color: #00c896 !important;
        }
        
        /* Ensure nav numbers are visible */
        .nav-number {
            color: #00c896 !important;
        }
        
        /* Make buttons have solid backgrounds */
        .primary-btn {
            background: #00c896 !important;
            box-shadow: 0 4px 15px rgba(0, 200, 150, 0.3) !important;
        }
        
        .secondary-btn {
            border: 2px solid #00c896 !important;
            color: #00c896 !important;
        }
    `;
    
    // Append the style element to the head
    document.head.appendChild(styleElement);
    
    console.log('Background fix styles applied');
});
