// Debug script to help identify issues with page loading
document.addEventListener('DOMContentLoaded', function() {
    console.log('Debug: DOM content loaded');
    
    // Check if stylesheets loaded correctly
    const styles = document.styleSheets;
    console.log(`Debug: ${styles.length} stylesheets found`);
    
    for (let i = 0; i < styles.length; i++) {
        try {
            console.log(`Debug: Stylesheet ${i} href: ${styles[i].href}`);
        } catch (e) {
            console.log(`Debug: Could not access stylesheet ${i}`);
        }
    }
    
    // Add visual indicator that script is running
    const debugElement = document.createElement('div');
    debugElement.style.position = 'fixed';
    debugElement.style.top = '10px';
    debugElement.style.right = '10px';
    debugElement.style.backgroundColor = 'rgba(0,200,150,0.7)'; // Changed to match green accent color
    debugElement.style.padding = '5px 10px';
    debugElement.style.borderRadius = '5px';
    debugElement.style.zIndex = '10000';
    debugElement.style.color = 'white';
    debugElement.style.fontSize = '12px';
    debugElement.textContent = 'Debug Active';
    document.body.appendChild(debugElement);
    
    // Check color application
    const headerElement = document.querySelector('header');
    if (headerElement) {
        // Ensure header has the correct background color
        if (getComputedStyle(headerElement).backgroundColor !== 'rgb(230, 214, 255)') {
            console.log('Debug: Applying header background color manually');
            headerElement.style.backgroundColor = '#e6d6ff';
        }
    }
    
    // Check for any JS errors that might prevent page rendering
    window.onerror = function(message, source, lineno, colno, error) {
        console.log('Debug: JS Error detected', message, source, lineno);
        
        const errorElement = document.createElement('div');
        errorElement.style.position = 'fixed';
        errorElement.style.top = '40px';
        errorElement.style.right = '10px';
        errorElement.style.backgroundColor = 'rgba(255,0,0,0.7)';
        errorElement.style.padding = '5px 10px';
        errorElement.style.borderRadius = '5px';
        errorElement.style.zIndex = '10000';
        errorElement.style.color = 'white';
        errorElement.style.maxWidth = '300px';
        errorElement.style.fontSize = '12px';
        errorElement.textContent = `Error: ${message} (${source}:${lineno})`;
        document.body.appendChild(errorElement);
        
        return false;
    };
    
    // Check if nav elements are styled correctly
    const navNumbers = document.querySelectorAll('.nav-number');
    navNumbers.forEach(navNumber => {
        if (getComputedStyle(navNumber).color !== 'rgb(0, 200, 150)') {
            console.log('Debug: Applying nav number color manually');
            navNumber.style.color = '#00c896';
        }
    });
    
    // Ensure skill tags have the correct gradient
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.style.background = 'linear-gradient(135deg, #c1b2ff 0%, #6c5ce7 100%)';
    });
    
    // Check if page navigation dots are styled correctly
    const navDots = document.querySelectorAll('.nav-dot');
    navDots.forEach(dot => {
        if (dot.classList.contains('active')) {
            dot.style.backgroundColor = '#00c896';
        }
    });
});