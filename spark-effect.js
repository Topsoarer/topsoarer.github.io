// Spark Effect - When dragging anywhere on the page
document.addEventListener('DOMContentLoaded', function() {
    // Create canvas for the spark effect
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none'; // Make sure it doesn't interfere with clicks
    canvas.style.zIndex = '9999'; // Place it on top of other elements
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    // Handle window resize
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    
    // Improved Spark particle class
    class Spark {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.vx = (Math.random() - 0.5) * 12; // Increased velocity for more dramatic effect
            this.vy = (Math.random() - 0.5) * 12;
            this.size = Math.random() * 5 + 2; // Larger particles
            this.alpha = 1;
            this.decay = Math.random() * 0.02 + 0.005; // Slower decay for longer trails
            this.color = color || this.getRandomColor();
            this.gravity = 0.07; // Reduced gravity for longer arcs
            this.drag = 0.97; // Less drag for faster movement
            this.life = 1;
            
            // Add flicker effect
            this.flicker = Math.random() > 0.5;
            this.flickerIntensity = Math.random() * 0.2;
        }
        
        // Generate random color with higher intensity
        getRandomColor() {
            // Bright green and purple variations
            const colors = [
                '#50ff97', // Brighter green
                '#00ff66', // Vibrant green
                '#e0d4ff', // Lighter purple
                '#8a5cff', // Bright purple
                '#39ff14', // Neon green
                '#cc00ff'  // Neon purple
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
            
            // Flickering effect
            if (this.flicker) {
                this.alpha = this.life * (1 - this.flickerIntensity + Math.random() * this.flickerIntensity * 2);
            } else {
                this.alpha = this.life;
            }
            
            return this.life > 0;
        }
        
        draw(ctx) {
            ctx.globalAlpha = this.alpha;
            
            // Draw the main particle
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            
            // Enhanced glow effect
            ctx.shadowBlur = 15;
            ctx.shadowColor = this.color;
            
            // Draw additional glow layer for more intensity
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size * 1.5, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.fill();
        }
    }
    
    // Ember class for smaller trailing particles
    class Ember {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.vx = (Math.random() - 0.5) * 3;
            this.vy = (Math.random() - 0.5) * 3;
            this.size = Math.random() * 2 + 0.5;
            this.color = color;
            this.alpha = 1;
            this.decay = Math.random() * 0.05 + 0.02;
            this.life = 1;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.life -= this.decay;
            this.alpha = this.life;
            return this.life > 0;
        }
        
        draw(ctx) {
            ctx.globalAlpha = this.alpha;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }
    
    // Store all active particles
    let sparks = [];
    let embers = [];
    
    // Variables to track mouse/touch movement
    let isMouseDown = false;
    let lastX = 0;
    let lastY = 0;
    let currentX = 0;
    let currentY = 0;
    let velocityX = 0;
    let velocityY = 0;
    
    // Create sparks when dragging
    function createSparks(x, y, amount, speed) {
        const baseColors = ['#50ff97', '#e0d4ff', '#39ff14', '#cc00ff'];
        
        for (let i = 0; i < amount; i++) {
            const baseColor = baseColors[i % baseColors.length];
            sparks.push(new Spark(x, y, baseColor));
            
            // Add small embers for each spark
            if (Math.random() > 0.5) {
                for (let j = 0; j < 3; j++) {
                    embers.push(new Ember(x, y, baseColor));
                }
            }
        }
    }
    
    // Mouse events for desktop WITH prevention of page scrolling while dragging
    document.addEventListener('mousedown', function(e) {
        isMouseDown = true;
        lastX = currentX = e.clientX;
        lastY = currentY = e.clientY;
    });
    
    document.addEventListener('mousemove', function(e) {
        currentX = e.clientX;
        currentY = e.clientY;
        
        if (isMouseDown) {
            // Prevent default behavior to stop page scrolling while dragging
            e.preventDefault();
            
            velocityX = currentX - lastX;
            velocityY = currentY - lastY;
            const speed = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
            
            // Create more sparks with higher speed, and increased base amount
            const sparkCount = Math.min(Math.floor(speed * 1.5 + 5), 30);
            if (sparkCount > 0) {
                createSparks(currentX, currentY, sparkCount, speed);
            }
            
            lastX = currentX;
            lastY = currentY;
        }
    });
    
    document.addEventListener('mouseup', function() {
        isMouseDown = false;
    });
    
    document.addEventListener('mouseleave', function() {
        isMouseDown = false;
    });
    
    // Touch events for mobile with explicit prevention of scrolling
    document.addEventListener('touchstart', function(e) {
        isMouseDown = true;
        lastX = currentX = e.touches[0].clientX;
        lastY = currentY = e.touches[0].clientY;
        
        // Prevent scrolling
        e.preventDefault();
    });
    
    document.addEventListener('touchmove', function(e) {
        // Prevent scrolling when dragging
        e.preventDefault();
        
        currentX = e.touches[0].clientX;
        currentY = e.touches[0].clientY;
        
        velocityX = currentX - lastX;
        velocityY = currentY - lastY;
        const speed = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
        
        // Create more sparks with higher speed
        const sparkCount = Math.min(Math.floor(speed * 1.5 + 5), 30);
        if (sparkCount > 0) {
            createSparks(currentX, currentY, sparkCount, speed);
        }
        
        lastX = currentX;
        lastY = currentY;
    });
    
    document.addEventListener('touchend', function() {
        isMouseDown = false;
    });
    
    // Prevent default dragging behavior of the entire document
    document.addEventListener('dragstart', function(e) {
        e.preventDefault();
    });
    
    // Animation loop with improved rendering
    function animate() {
        // Semi-transparent clear for trail effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';  // This creates a fading trail effect
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw all sparks
        sparks = sparks.filter(spark => {
            const isAlive = spark.update();
            if (isAlive) {
                spark.draw(ctx);
            }
            return isAlive;
        });
        
        // Update and draw all embers
        embers = embers.filter(ember => {
            const isAlive = ember.update();
            if (isAlive) {
                ember.draw(ctx);
            }
            return isAlive;
        });
        
        requestAnimationFrame(animate);
    }
    
    // Start the animation
    animate();
    
    // Fix for mobile dragging - prevent default on the document level
    document.body.addEventListener('touchmove', function(e) {
        if (isMouseDown) {
            e.preventDefault();
        }
    }, { passive: false });
    
    // Allow dragging on specific elements without scrolling
    const draggableContent = document.querySelector('body');
    if (draggableContent) {
        draggableContent.style.touchAction = 'none';
    }
});
