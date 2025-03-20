// Subtle Spark Effect - When dragging anywhere on the page
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
    canvas.style.opacity = '0.6'; // Reduce overall opacity
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    // Handle window resize
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    
    // Subtle Spark particle class with reduced visual impact
    class Spark {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.vx = (Math.random() - 0.5) * 6; // Reduced velocity
            this.vy = (Math.random() - 0.5) * 6;
            this.size = Math.random() * 2 + 1; // Smaller particles
            this.alpha = 0.7; // Lower initial alpha
            this.decay = Math.random() * 0.03 + 0.01; // Faster decay for shorter trails
            this.color = color || this.getRandomColor();
            this.gravity = 0.05;
            this.drag = 0.98;
            this.life = 1;
            
            // Add flicker effect
            this.flicker = Math.random() > 0.5;
            this.flickerIntensity = Math.random() * 0.2;
        }
        
        // Generate more subtle colors
        getRandomColor() {
            // More subtle colors that don't interfere with text readability
            const colors = [
                'rgba(80, 255, 151, 0.6)', // More transparent green
                'rgba(0, 255, 102, 0.5)',  // More transparent bright green
                'rgba(224, 212, 255, 0.7)', // More transparent light purple
                'rgba(138, 92, 255, 0.5)'  // More transparent bright purple
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
                this.alpha = this.life * (1 - this.flickerIntensity + Math.random() * this.flickerIntensity * 2) * 0.7; // Reduced alpha
            } else {
                this.alpha = this.life * 0.7; // Reduced alpha
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
            
            // Reduced glow effect
            ctx.shadowBlur = 5; // Less blur
            ctx.shadowColor = this.color;
            
            // Skip the additional glow layer to make it more subtle
        }
    }
    
    // Ember class for smaller trailing particles
    class Ember {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.vx = (Math.random() - 0.5) * 2; // Reduced velocity
            this.vy = (Math.random() - 0.5) * 2;
            this.size = Math.random() * 1 + 0.5; // Smaller particles
            this.color = color;
            this.alpha = 0.6; // Lower alpha
            this.decay = Math.random() * 0.07 + 0.03; // Faster decay
            this.life = 1;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.life -= this.decay;
            this.alpha = this.life * 0.6; // Reduced alpha
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
    
    // Create sparks when dragging - fewer sparks for subtlety
    function createSparks(x, y, amount, speed) {
        const baseColors = ['rgba(80, 255, 151, 0.6)', 'rgba(224, 212, 255, 0.7)'];
        
        // Limit the number of sparks for subtlety
        const actualAmount = Math.min(amount, 5);
        
        for (let i = 0; i < actualAmount; i++) {
            const baseColor = baseColors[i % baseColors.length];
            sparks.push(new Spark(x, y, baseColor));
            
            // Add fewer embers
            if (Math.random() > 0.7) {
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
            if (speed > 3) {
                // Limit spark count for subtlety
                const sparkCount = Math.min(Math.floor(speed * 0.3 + 1), 6);
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
        if (speed > 5) {
            // Limit spark count for subtlety
            const sparkCount = Math.min(Math.floor(speed * 0.3 + 1), 6);
            createSparks(currentX, currentY, sparkCount, speed);
        }
        
        lastX = currentX;
        lastY = currentY;
    });
    
    document.addEventListener('touchend', function() {
        isMouseDown = false;
    });
    
    // Animation loop with faster fade for subtle effect
    function animate() {
        // Faster fade for more subtle trail effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';  // Faster clearing for shorter trails
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
