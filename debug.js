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
    debugElement.style.backgroundColor = 'rgba(0,255,0,0.7)';
    debugElement.style.padding = '5px 10px';
    debugElement.style.borderRadius = '5px';
    debugElement.style.zIndex = '10000';
    debugElement.style.color = 'black';
    debugElement.style.fontSize = '12px';
    debugElement.textContent = 'Debug Active';
    document.body.appendChild(debugElement);
    
    // Force body to have visible background if not already set
    document.body.style.backgroundColor = '#e6d6ff';
    document.body.style.color = '#00994d';
    document.documentElement.style.backgroundColor = '#e6d6ff';
    
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
});
