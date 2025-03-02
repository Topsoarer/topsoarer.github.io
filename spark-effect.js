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
    
    // Spark particle class
    class Spark {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.vx = (Math.random() - 0.5) * 8; // Random horizontal velocity
            this.vy = (Math.random() - 0.5) * 8; // Random vertical velocity
            this.size = Math.random() * 3 + 1;
            this.alpha = 1; // Start fully opaque
            this.decay = Math.random() * 0.03 + 0.01; // Random decay rate
            this.color = color || this.getRandomColor();
            this.gravity = 0.1;
            this.drag = 0.95;
            this.life = 1; // Life value from 1 to 0
        }
        
        // Generate random color with preference for green and purple
        getRandomColor() {
            const colors = [
                '#3eff8b', // Primary green
                '#00ff55', // Secondary green
                '#d4c1fb', // Light purple
                '#6c40bf', // Dark purple
                '#9eff9e', // Light green
                '#b088ff'  // Medium purple
            ];
            return colors[Math.floor(Math.random() * colors.length)];
        }
        
        // Update spark position and properties
        update() {
            this.vx *= this.drag;
            this.vy *= this.drag;
            this.vy += this.gravity;
            
            this.x += this.vx;
            this.y += this.vy;
            
            this.life -= this.decay;
            this.alpha = this.life;
            
            return this.life > 0;
        }
        
        // Draw the spark
        draw(ctx) {
            ctx.globalAlpha = this.alpha;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            
            // Optional: Add a glow effect
            ctx.shadowBlur = 10;
            ctx.shadowColor = this.color;
        }
    }
    
    // Store all active sparks
    let sparks = [];
    
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
        const baseColors = ['#3eff8b', '#d4c1fb'];
        
        for (let i = 0; i < amount; i++) {
            // Base color alternates between green and purple
            const baseColor = baseColors[i % 2];
            sparks.push(new Spark(x, y, baseColor));
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
            velocityX = currentX - lastX;
            velocityY = currentY - lastY;
            const speed = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
            
            // Create more sparks with higher speed
            const sparkCount = Math.min(Math.floor(speed), 20);
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
    
    // Touch events for mobile
    document.addEventListener('touchstart', function(e) {
        isMouseDown = true;
        lastX = currentX = e.touches[0].clientX;
        lastY = currentY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchmove', function(e) {
        e.preventDefault(); // Prevent scrolling when dragging
        
        currentX = e.touches[0].clientX;
        currentY = e.touches[0].clientY;
        
        velocityX = currentX - lastX;
        velocityY = currentY - lastY;
        const speed = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
        
        // Create more sparks with higher speed
        const sparkCount = Math.min(Math.floor(speed), 20);
        if (sparkCount > 0) {
            createSparks(currentX, currentY, sparkCount, speed);
        }
        
        lastX = currentX;
        lastY = currentY;
    });
    
    document.addEventListener('touchend', function() {
        isMouseDown = false;
    });
    
    // Animation loop
    function animate() {
        // Clear the canvas with a transparent fill to create trail effect
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
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
