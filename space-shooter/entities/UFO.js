/**
 * UFO.js
 * Special UFO entity that appears randomly for bonus points
 */

class UFO {
  constructor(canvasWidth) {
    this.canvasWidth = canvasWidth;
    this.width = 40;
    this.height = 20;
    this.y = 40; // Appears at top of screen
    this.speed = 3;
    this.isActive = false;
    this.points = 0;
    this.blinkTimer = 0;
    this.isVisible = true;
    this.direction = 1; // 1 = right, -1 = left
    this.ufoSound = null;

    // UFO appears from random side
    if (Math.random() < 0.5) {
      this.x = -this.width;
      this.direction = 1;
    } else {
      this.x = canvasWidth;
      this.direction = -1;
    }

    // Random high score value
    const scores = [50, 100, 150, 300];
    this.points = scores[Math.floor(Math.random() * scores.length)];
  }

  spawn() {
    if (this.isActive) return false;

    // Reset position
    if (Math.random() < 0.5) {
      this.x = -this.width;
      this.direction = 1;
    } else {
      this.x = this.canvasWidth;
      this.direction = -1;
    }

    // Random score
    const scores = [50, 100, 150, 300];
    this.points = scores[Math.floor(Math.random() * scores.length)];

    this.isActive = true;
    this.blinkTimer = 0;
    this.isVisible = true;

    return true;
  }

  update() {
    if (!this.isActive) return;

    // Move across screen
    this.x += this.speed * this.direction;

    // Slower blinking effect - more visible
    this.blinkTimer++;
    if (this.blinkTimer % 30 === 0) {  // Changed from 10 to 30 for slower blinking
      this.isVisible = !this.isVisible;
    }

    // Deactivate when off screen
    if (this.direction === 1 && this.x > this.canvasWidth) {
      this.deactivate();
    } else if (this.direction === -1 && this.x < -this.width) {
      this.deactivate();
    }
  }

  destroy() {
    this.isActive = false;
    return this.points;
  }

  deactivate() {
    this.isActive = false;
  }

  getBounds() {
    return {
      left: this.x,
      right: this.x + this.width,
      top: this.y,
      bottom: this.y + this.height
    };
  }

  render(ctx) {
    if (!this.isActive || !this.isVisible) return;

    ctx.save();

    const centerX = this.x + this.width / 2;
    const centerY = this.y + this.height / 2;

    // Draw classic UFO shape using simpler shapes
    // Main body (bright magenta)
    ctx.fillStyle = '#ff00ff';
    ctx.fillRect(this.x + 8, centerY - 2, this.width - 16, 8);

    // Top dome (lighter magenta)
    ctx.fillStyle = '#ff88ff';
    ctx.fillRect(this.x + 12, centerY - 6, this.width - 24, 4);

    // Bottom wider part
    ctx.fillStyle = '#ff00ff';
    ctx.fillRect(this.x + 4, centerY + 4, this.width - 8, 4);

    // Lights (yellow)
    ctx.fillStyle = '#ffff00';
    for (let i = 0; i < 3; i++) {
      const lightX = this.x + 10 + i * 10;
      ctx.fillRect(lightX, centerY, 4, 4);
    }

    // Glow effect
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#ff00ff';
    ctx.fillStyle = '#ff00ff';
    ctx.fillRect(this.x + 8, centerY - 2, this.width - 16, 8);
    ctx.shadowBlur = 0;

    // Display points value
    ctx.fillStyle = '#ffffff';
    ctx.font = '12px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(this.points, centerX, this.y - 8);

    ctx.restore();
  }
}

class UFOManager {
  constructor(canvasWidth) {
    this.canvasWidth = canvasWidth;
    this.ufo = new UFO(canvasWidth);
    this.lastSpawnTime = Date.now();
    this.minSpawnInterval = 20000; // Minimum 20 seconds between UFOs
    this.maxSpawnInterval = 40000; // Maximum 40 seconds
    this.nextSpawnTime = Date.now() + this.getRandomSpawnTime();
  }

  getRandomSpawnTime() {
    return this.minSpawnInterval + Math.random() * (this.maxSpawnInterval - this.minSpawnInterval);
  }

  update() {
    const now = Date.now();

    // Check if it's time to spawn a UFO
    if (!this.ufo.isActive && now >= this.nextSpawnTime) {
      if (this.ufo.spawn()) {
        this.nextSpawnTime = now + this.getRandomSpawnTime();
        return true; // UFO spawned
      }
    }

    // Update existing UFO
    this.ufo.update();

    return false;
  }

  checkCollision(bullets) {
    if (!this.ufo.isActive) return null;

    const ufoBounds = this.ufo.getBounds();

    for (let bullet of bullets) {
      if (!bullet.isActive || !bullet.isPlayerBullet) continue;

      const bulletBounds = bullet.getBounds();

      // Check AABB collision
      if (!(bulletBounds.right <= ufoBounds.left ||
            bulletBounds.left >= ufoBounds.right ||
            bulletBounds.bottom <= ufoBounds.top ||
            bulletBounds.top >= ufoBounds.bottom)) {

        bullet.deactivate();
        const points = this.ufo.destroy();
        return { points, x: this.ufo.x + this.ufo.width / 2, y: this.ufo.y + this.ufo.height / 2 };
      }
    }

    return null;
  }

  render(ctx) {
    this.ufo.render(ctx);
  }

  reset() {
    this.ufo.isActive = false;
    this.nextSpawnTime = Date.now() + this.getRandomSpawnTime();
  }

  forceSpawn() {
    // For testing or special events
    this.ufo.spawn();
  }
}

// Expose to global scope for browser
if (typeof window !== 'undefined') {
  window.UFO = UFO;
  window.UFOManager = UFOManager;
}