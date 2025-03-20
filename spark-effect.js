// Professional Subtle Spark Effect - For academic portfolio
document.addEventListener('DOMContentLoaded', function() {
    // Create canvas for the spark effect
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none'; // Make sure it doesn't interfere with clicks
    canvas.style.zIndex = '1'; // Lower z-index so it stays behind content
    canvas.style.opacity = '0.7'; // Adjust opacity for light background
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    // Handle window resize
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    
    // Professional Spark particle class with reduced visual impact
    class Spark {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.vx = (Math.random() - 0.5) * 4; // Reduced velocity for professional look
            this.vy = (Math.random() - 0.5) * 4;
            this.size = Math.random() * 1.5 + 0.5; // Smaller particles for subtlety
            this.alpha = 0.6; // Lower initial alpha
            this.decay = Math.random() * 0.04 + 0.01; // Faster decay for shorter trails
            this.color = color || this.getRandomColor();
            this.gravity = 0.02; // Very light gravity
            this.drag = 0.98;
            this.life = 1;
            
            // Add subtle flicker
            this.flicker = Math.random() > 0.5;
            this.flickerIntensity = Math.random() * 0.1; // Reduced flicker
        }
        
        // Generate professional colors for academic theme
        getRandomColor() {
            // More professional colors
            const colors = [
                'rgba(0, 153, 77, 0.6)',  // Green (more professional)
                'rgba(102, 51, 204, 0.5)', // Purple (more professional)
                'rgba(0, 128, 128, 0.55)', // Teal (academic)
                'rgba(70, 130, 180, 0.5)'  // Steel blue (professional)
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
            
            // Subtle flickering effect
            if (this.flicker) {
                this.alpha = this.life * (1 - this.flickerIntensity + Math.random() * this.flickerIntensity * 2) * 0.6;
            } else {
                this.alpha = this.life * 0.6;
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
            
            // Very subtle glow
            ctx.shadowBlur = 3;
            ctx.shadowColor = this.color;
        }
    }
    
    // Ember class for minimal trailing effect
    class Ember {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.vx = (Math.random() - 0.5) * 1.5; // Very slow movement
            this.vy = (Math.random() - 0.5) * 1.5;
            this.size = Math.random() * 0.8 + 0.3; // Tiny particles
            this.color = color;
            this.alpha = 0.5; // Lower alpha
            this.decay = Math.random() * 0.08 + 0.04; // Faster decay
            this.life = 1;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.life -= this.decay;
            this.alpha = this.life * 0.5;
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
    
    // Create sparks when dragging - fewer sparks for professional look
    function createSparks(x, y, amount, speed) {
        const baseColors = ['rgba(0, 153, 77, 0.6)', 'rgba(102, 51, 204, 0.5)'];
        
        // Limit the number of sparks for professional subtlety
        const actualAmount = Math.min(amount, 3);
        
        for (let i = 0; i < actualAmount; i++) {
            const baseColor = baseColors[i % baseColors.length];
            sparks.push(new Spark(x, y, baseColor));
            
            // Add fewer embers
            if (Math.random() > 0.8) {
                embers.push(new Ember(x, y, baseColor));
            }
        }
    }
    
    // Mouse events for desktop
    document.addEventListener('mousedown', function(e) {
        isMouseDown = true;
        lastX = currentX = e.clientX;
        lastY = currentY = e.clientY;
    });
    
    document.addEventListener('mousemove', function(e) {
        // Always update current position
        currentX = e.clientX;
        currentY = e.clientY;
        
        if (isMouseDown) {
            velocityX = currentX - lastX;
            velocityY = currentY - lastY;
            const speed = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
            
            // Only create sparks if there's significant movement
            if (speed > 4) { // Higher threshold for professional look
                // Limit spark count for subtlety
                const sparkCount = Math.min(Math.floor(speed * 0.2 + 1), 4);
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
    
    // Touch events for mobile
    document.addEventListener('touchstart', function(e) {
        isMouseDown = true;
        lastX = currentX = e.touches[0].clientX;
        lastY = currentY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchmove', function(e) {
        // Update current position
        currentX = e.touches[0].clientX;
        currentY = e.touches[0].clientY;
        
        velocityX = currentX - lastX;
        velocityY = currentY - lastY;
        const speed = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
        
        // Only create sparks if there's significant movement
        if (speed > 6) { // Higher threshold for professional look on mobile
            // Limit spark count for subtlety
            const sparkCount = Math.min(Math.floor(speed * 0.2 + 1), 4);
            createSparks(currentX, currentY, sparkCount, speed);
        }
        
        lastX = currentX;
        lastY = currentY;
    });
    
    document.addEventListener('touchend', function() {
        isMouseDown = false;
    });
    
    // Animation loop with faster fade for clean, professional look
    function animate() {
        // Faster fade for professional, clean look on light background
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
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
});
