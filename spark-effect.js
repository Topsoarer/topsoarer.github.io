// Academic Portfolio Subtle Spark Effect
document.addEventListener('DOMContentLoaded', function() {
    // Create canvas for the spark effect
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none'; // Make sure it doesn't interfere with clicks
    canvas.style.zIndex = '0'; // Place it behind content
    canvas.style.opacity = '0.6'; // Lower opacity for subtlety
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    // Handle window resize
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    
    // Elegant Spark particle class
    class Spark {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.vx = (Math.random() - 0.5) * 3; // Gentler speed
            this.vy = (Math.random() - 0.5) * 3;
            this.size = Math.random() * 1.5 + 0.5; // Smaller particles for subtlety
            this.alpha = 0.6; // Lower initial alpha
            this.decay = Math.random() * 0.03 + 0.01; // Faster decay for shorter trails
            this.color = color || this.getRandomColor();
            this.gravity = 0.02; // Very light gravity
            this.drag = 0.98;
            this.life = 1;
        }
        
        // Generate elegant colors for academic theme - updated colors to match site theme
        getRandomColor() {
            // This will match the theme colors from CSS
            const colors = [
                'rgba(108, 92, 231, 0.6)', // primary purple
                'rgba(193, 178, 255, 0.5)', // light purple
                'rgba(0, 200, 150, 0.5)',   // accent green
                'rgba(127, 255, 206, 0.5)'  // light green
            ];
            return colors[Math.floor(Math.random() * colors.length)];
        }
        
        update() {
            this.vx *= this.drag;
            this.vy *= this.drag;
            this.vy += this.gravity;
            
            this.x += this.vx;
            this.y += this.vy;
            
            this.life -= this.decay;
            this.alpha = this.life * 0.6;
            
            return this.life > 0;
        }
        
        draw(ctx) {
            ctx.globalAlpha = this.alpha;
            
            // Draw the main particle
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            
            // Subtle glow
            ctx.shadowBlur = 3;
            ctx.shadowColor = this.color;
        }
    }
    
    // Store all active particles
    let sparks = [];
    
    // Variables to track mouse/touch movement
    let isMouseDown = false;
    let lastX = 0;
    let lastY = 0;
    let currentX = 0;
    let currentY = 0;
    
    // Set a timer to clear all sparks after a short period of inactivity
    let sparkClearTimer = null;
    
    // CSS class to disable text selection during dragging
    const noSelectClass = 'no-select-during-drag';
    
    // Create a style element to add the no-select class
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .${noSelectClass} {
            user-select: none !important;
            -webkit-user-select: none !important;
            -moz-user-select: none !important;
            -ms-user-select: none !important;
        }
        
        .${noSelectClass} * {
            user-select: none !important;
            -webkit-user-select: none !important;
            -moz-user-select: none !important;
            -ms-user-select: none !important;
        }
    `;
    document.head.appendChild(styleElement);
    
    // Create sparks when dragging - fewer sparks for subtlety
    function createSparks(x, y, amount) {
        const actualAmount = Math.min(amount, 4); // Limit the number of sparks
        
        for (let i = 0; i < actualAmount; i++) {
            sparks.push(new Spark(x, y));
        }
    }
    
    // Function to enable text selection
    function enableTextSelection() {
        document.body.classList.remove(noSelectClass);
    }
    
    // Function to disable text selection
    function disableTextSelection() {
        document.body.classList.add(noSelectClass);
    }
    
    // Mouse events for desktop
    document.addEventListener('mousedown', function(e) {
        isMouseDown = true;
        lastX = currentX = e.clientX;
        lastY = currentY = e.clientY;
        disableTextSelection();
    });
    
    document.addEventListener('mousemove', function(e) {
        currentX = e.clientX;
        currentY = e.clientY;
        
        if (isMouseDown) {
            const dx = currentX - lastX;
            const dy = currentY - lastY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Only create sparks if there's significant movement
            if (distance > 5) {
                // Create sparks along the path of movement
                const steps = Math.floor(distance / 5);
                for (let i = 0; i < steps; i++) {
                    const x = lastX + dx * (i / steps);
                    const y = lastY + dy * (i / steps);
                    
                    // Create fewer sparks for more subtlety
                    createSparks(x, y, 1 + Math.floor(Math.random() * 2));
                }
                
                lastX = currentX;
                lastY = currentY;
            }
        }
    });
    
    document.addEventListener('mouseup', function() {
        isMouseDown = false;
        
        // Re-enable text selection
        enableTextSelection();
        
        // Clear all sparks after a short delay when mouse is released
        clearTimeout(sparkClearTimer);
        sparkClearTimer = setTimeout(() => {
            sparks = [];
        }, 300);
    });
    
    document.addEventListener('mouseleave', function() {
        isMouseDown = false;
        
        // Re-enable text selection
        enableTextSelection();
        
        // Clear all sparks when mouse leaves the window
        clearTimeout(sparkClearTimer);
        sparkClearTimer = setTimeout(() => {
            sparks = [];
        }, 300);
    });
    
    // Touch events for mobile
    document.addEventListener('touchstart', function(e) {
        isMouseDown = true;
        lastX = currentX = e.touches[0].clientX;
        lastY = currentY = e.touches[0].clientY;
        disableTextSelection();
        
        // Prevent default scrolling when starting drag
        if (e.target.closest('.drag-info')) {
            e.preventDefault();
        }
    });
    
    document.addEventListener('touchmove', function(e) {
        // Only prevent default if we're dragging
        if (isMouseDown) {
            e.preventDefault();
        }
        
        currentX = e.touches[0].clientX;
        currentY = e.touches[0].clientY;
        
        const dx = currentX - lastX;
        const dy = currentY - lastY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Only create sparks if there's significant movement
        if (distance > 5) {
            // Create sparks along the path of movement
            const steps = Math.floor(distance / 5);
            for (let i = 0; i < steps; i++) {
                const x = lastX + dx * (i / steps);
                const y = lastY + dy * (i / steps);
                
                // Create fewer sparks for more subtlety
                createSparks(x, y, 1 + Math.floor(Math.random() * 2));
            }
            
            lastX = currentX;
            lastY = currentY;
        }
    }, { passive: false }); // Important to prevent scroll in modern browsers
    
    document.addEventListener('touchend', function() {
        isMouseDown = false;
        
        // Re-enable text selection
        enableTextSelection();
        
        // Clear all sparks after a short delay when touch ends
        clearTimeout(sparkClearTimer);
        sparkClearTimer = setTimeout(() => {
            sparks = [];
        }, 300);
    });
    
    document.addEventListener('touchcancel', function() {
        isMouseDown = false;
        
        // Re-enable text selection
        enableTextSelection();
        
        // Clear all sparks immediately
        sparks = [];
    });
    
    // Animation loop with faster fade for clean look
    function animate() {
        // Clear canvas completely with solid white for no trails
        ctx.fillStyle = 'rgba(255, 255, 255, 1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw all sparks
        sparks = sparks.filter(spark => {
            const isAlive = spark.update();
            if (isAlive) {
                spark.draw(ctx);
            }
            return isAlive;
        });
        
        requestAnimationFrame(animate);
    }
    
    // Start the animation
    animate();
});// Academic Portfolio Subtle Spark Effect
document.addEventListener('DOMContentLoaded', function() {
    // Create canvas for the spark effect
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none'; // Make sure it doesn't interfere with clicks
    canvas.style.zIndex = '0'; // Place it behind content
    canvas.style.opacity = '0.6'; // Lower opacity for subtlety
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    // Handle window resize
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    
    // Elegant Spark particle class
    class Spark {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.vx = (Math.random() - 0.5) * 3; // Gentler speed
            this.vy = (Math.random() - 0.5) * 3;
            this.size = Math.random() * 1.5 + 0.5; // Smaller particles for subtlety
            this.alpha = 0.6; // Lower initial alpha
            this.decay = Math.random() * 0.03 + 0.01; // Faster decay for shorter trails
            this.color = color || this.getRandomColor();
            this.gravity = 0.02; // Very light gravity
            this.drag = 0.98;
            this.life = 1;
        }
        
        // Generate elegant colors for academic theme - updated colors to match site theme
        getRandomColor() {
            // This will match the theme colors from CSS
            const colors = [
                'rgba(108, 92, 231, 0.6)', // primary purple
                'rgba(193, 178, 255, 0.5)', // light purple
                'rgba(0, 200, 150, 0.5)',   // accent green
                'rgba(127, 255, 206, 0.5)'  // light green
            ];
            return colors[Math.floor(Math.random() * colors.length)];
        }
        
        update() {
            this.vx *= this.drag;
            this.vy *= this.drag;
            this.vy += this.gravity;
            
            this.x += this.vx;
            this.y += this.vy;
            
            this.life -= this.decay;
            this.alpha = this.life * 0.6;
            
            return this.life > 0;
        }
        
        draw(ctx) {
            ctx.globalAlpha = this.alpha;
            
            // Draw the main particle
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            
            // Subtle glow
            ctx.shadowBlur = 3;
            ctx.shadowColor = this.color;
        }
    }
    
    // Store all active particles
    let sparks = [];
    
    // Variables to track mouse/touch movement
    let isMouseDown = false;
    let lastX = 0;
    let lastY = 0;
    let currentX = 0;
    let currentY = 0;
    
    // Set a timer to clear all sparks after a short period of inactivity
    let sparkClearTimer = null;
    
    // Create sparks when dragging - fewer sparks for subtlety
    function createSparks(x, y, amount) {
        const actualAmount = Math.min(amount, 4); // Limit the number of sparks
        
        for (let i = 0; i < actualAmount; i++) {
            sparks.push(new Spark(x, y));
        }
    }
    
    // Mouse events for desktop
    document.addEventListener('mousedown', function(e) {
        isMouseDown = true;
        lastX = currentX = e.clientX;
        lastY = currentY = e.clientY;
    });
    
    document.addEventListener('mousemove', function(e) {
        currentX = e.clientX;
        currentY = e.clientY;
        
        if (isMouseDown) {
            const dx = currentX - lastX;
            const dy = currentY - lastY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Only create sparks if there's significant movement
            if (distance > 5) {
                // Create sparks along the path of movement
                const steps = Math.floor(distance / 5);
                for (let i = 0; i < steps; i++) {
                    const x = lastX + dx * (i / steps);
                    const y = lastY + dy * (i / steps);
                    
                    // Create fewer sparks for more subtlety
                    createSparks(x, y, 1 + Math.floor(Math.random() * 2));
                }
                
                lastX = currentX;
                lastY = currentY;
            }
        }
    });
    
    document.addEventListener('mouseup', function() {
        isMouseDown = false;
        
        // Clear all sparks after a short delay when mouse is released
        clearTimeout(sparkClearTimer);
        sparkClearTimer = setTimeout(() => {
            sparks = [];
        }, 300);
    });
    
    document.addEventListener('mouseleave', function() {
        isMouseDown = false;
        
        // Clear all sparks when mouse leaves the window
        clearTimeout(sparkClearTimer);
        sparkClearTimer = setTimeout(() => {
            sparks = [];
        }, 300);
    });
    
    // Touch events for mobile - prevent scrolling while dragging
    document.addEventListener('touchstart', function(e) {
        isMouseDown = true;
        lastX = currentX = e.touches[0].clientX;
        lastY = currentY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchmove', function(e) {
        // Don't prevent default scrolling
        currentX = e.touches[0].clientX;
        currentY = e.touches[0].clientY;
        
        const dx = currentX - lastX;
        const dy = currentY - lastY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Only create sparks if there's significant movement
        if (distance > 5) {
            // Create sparks along the path of movement
            const steps = Math.floor(distance / 5);
            for (let i = 0; i < steps; i++) {
                const x = lastX + dx * (i / steps);
                const y = lastY + dy * (i / steps);
                
                // Create fewer sparks for more subtlety
                createSparks(x, y, 1 + Math.floor(Math.random() * 2));
            }
            
            lastX = currentX;
            lastY = currentY;
        }
    });
    
    document.addEventListener('touchend', function() {
        isMouseDown = false;
        
        // Clear all sparks after a short delay when touch ends
        clearTimeout(sparkClearTimer);
        sparkClearTimer = setTimeout(() => {
            sparks = [];
        }, 300);
    });
    
    // Animation loop with faster fade for clean look
    function animate() {
        // Clear canvas completely with solid white for no trails
        ctx.fillStyle = 'rgba(255, 255, 255, 1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw all sparks
        sparks = sparks.filter(spark => {
            const isAlive = spark.update();
            if (isAlive) {
                spark.draw(ctx);
            }
            return isAlive;
        });
        
        requestAnimationFrame(animate);
    }
    
    // Start the animation
    animate();
});
