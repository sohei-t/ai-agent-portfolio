/**
 * Shield.js
 * Destructible shields (like Space Invaders' bunkers)
 */

class Shield {
  constructor(x, y, canvasWidth) {
    this.x = x;
    this.y = y;
    this.width = 80;
    this.height = 60;
    this.canvasWidth = canvasWidth;

    // Create a 2D array representing the shield's pixels
    // Each cell can be damaged independently
    this.pixelSize = 4;
    this.cols = Math.floor(this.width / this.pixelSize);
    this.rows = Math.floor(this.height / this.pixelSize);

    // Initialize shield shape (1 = solid, 0 = empty)
    this.pixels = this.createShieldShape();
    this.maxHealth = 3;  // Each pixel can take 3 hits

    // Track damage for each pixel
    this.health = [];
    for (let row = 0; row < this.rows; row++) {
      this.health[row] = [];
      for (let col = 0; col < this.cols; col++) {
        this.health[row][col] = this.pixels[row][col] ? this.maxHealth : 0;
      }
    }
  }

  createShieldShape() {
    const shape = [];
    for (let row = 0; row < this.rows; row++) {
      shape[row] = [];
      for (let col = 0; col < this.cols; col++) {
        // Create a bunker/dome shape
        const centerCol = this.cols / 2;
        const centerRow = this.rows / 2;

        // Top dome shape
        if (row < centerRow) {
          const radius = centerRow;
          const dist = Math.sqrt(Math.pow(col - centerCol, 2) + Math.pow(row - centerRow, 2));
          shape[row][col] = dist <= radius ? 1 : 0;
        }
        // Bottom solid part with entrance
        else {
          const entranceWidth = 6;
          const entranceStart = Math.floor((this.cols - entranceWidth) / 2);
          const entranceEnd = entranceStart + entranceWidth;

          if (col >= entranceStart && col <= entranceEnd && row > centerRow + 2) {
            shape[row][col] = 0; // Entrance
          } else {
            shape[row][col] = 1; // Solid
          }
        }
      }
    }
    return shape;
  }

  takeDamage(bulletX, bulletY, bulletWidth, bulletHeight, damage = 1) {
    // Convert bullet position to shield pixel coordinates
    const startCol = Math.floor((bulletX - this.x) / this.pixelSize);
    const endCol = Math.floor((bulletX + bulletWidth - this.x) / this.pixelSize);
    const startRow = Math.floor((bulletY - this.y) / this.pixelSize);
    const endRow = Math.floor((bulletY + bulletHeight - this.y) / this.pixelSize);

    let hit = false;

    // Damage pixels in the impact area
    for (let row = Math.max(0, startRow); row <= Math.min(this.rows - 1, endRow); row++) {
      for (let col = Math.max(0, startCol); col <= Math.min(this.cols - 1, endCol); col++) {
        if (this.health[row][col] > 0) {
          this.health[row][col] = Math.max(0, this.health[row][col] - damage);
          hit = true;

          // Create a small crater effect
          this.createCrater(row, col, 1);
        }
      }
    }

    return hit;
  }

  createCrater(centerRow, centerCol, radius) {
    // Damage surrounding pixels to create a crater effect
    for (let r = -radius; r <= radius; r++) {
      for (let c = -radius; c <= radius; c++) {
        const row = centerRow + r;
        const col = centerCol + c;

        if (row >= 0 && row < this.rows && col >= 0 && col < this.cols) {
          const dist = Math.sqrt(r * r + c * c);
          if (dist <= radius && this.health[row][col] > 0) {
            const damage = radius - dist + 1;
            this.health[row][col] = Math.max(0, this.health[row][col] - damage * 0.5);
          }
        }
      }
    }
  }

  checkCollision(x, y, width, height) {
    // Check if an object collides with any solid part of the shield
    if (x + width < this.x || x > this.x + this.width ||
        y + height < this.y || y > this.y + this.height) {
      return false;
    }

    // Check pixel-level collision
    const startCol = Math.max(0, Math.floor((x - this.x) / this.pixelSize));
    const endCol = Math.min(this.cols - 1, Math.floor((x + width - this.x) / this.pixelSize));
    const startRow = Math.max(0, Math.floor((y - this.y) / this.pixelSize));
    const endRow = Math.min(this.rows - 1, Math.floor((y + height - this.y) / this.pixelSize));

    for (let row = startRow; row <= endRow; row++) {
      for (let col = startCol; col <= endCol; col++) {
        if (this.health[row][col] > 0) {
          return true;
        }
      }
    }

    return false;
  }

  getBounds() {
    return {
      left: this.x,
      right: this.x + this.width,
      top: this.y,
      bottom: this.y + this.height
    };
  }

  isDestroyed() {
    // Check if the shield is completely destroyed
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        if (this.health[row][col] > 0) {
          return false;
        }
      }
    }
    return true;
  }

  render(ctx) {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        if (this.health[row][col] > 0) {
          const healthRatio = this.health[row][col] / this.maxHealth;

          // Color based on damage: green -> yellow -> red
          if (healthRatio > 0.66) {
            ctx.fillStyle = '#00ff00';
          } else if (healthRatio > 0.33) {
            ctx.fillStyle = '#ffff00';
          } else {
            ctx.fillStyle = '#ff4444';
          }

          // Add some transparency based on damage
          ctx.globalAlpha = 0.3 + healthRatio * 0.7;

          ctx.fillRect(
            this.x + col * this.pixelSize,
            this.y + row * this.pixelSize,
            this.pixelSize,
            this.pixelSize
          );
        }
      }
    }

    ctx.globalAlpha = 1.0; // Reset alpha
  }
}

class ShieldManager {
  constructor(canvasWidth, canvasHeight) {
    this.shields = [];
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.shieldCount = 4;
    this.init();
  }

  init() {
    this.shields = [];
    const spacing = this.canvasWidth / (this.shieldCount + 1);
    const shieldY = this.canvasHeight - 180; // Position shields above the player

    for (let i = 0; i < this.shieldCount; i++) {
      const x = spacing * (i + 1) - 40; // Center each shield
      this.shields.push(new Shield(x, shieldY, this.canvasWidth));
    }
  }

  checkBulletCollisions(bullets) {
    const hits = [];

    bullets.forEach((bullet, bulletIndex) => {
      if (!bullet.isActive) return;

      for (let shield of this.shields) {
        if (shield.checkCollision(bullet.x, bullet.y, bullet.width, bullet.height)) {
          // Damage the shield
          shield.takeDamage(bullet.x, bullet.y, bullet.width, bullet.height);
          hits.push({ bulletIndex, bullet });
          break;
        }
      }
    });

    return hits;
  }

  checkEnemyCollisions(enemies) {
    // Check if enemies have reached the shields
    enemies.forEach(enemy => {
      if (!enemy.isAlive) return;

      this.shields.forEach(shield => {
        if (shield.checkCollision(enemy.x, enemy.y, enemy.width, enemy.height)) {
          // Destroy the part of the shield the enemy touches
          const damage = 3; // Heavy damage from direct contact
          for (let i = 0; i < 3; i++) {
            shield.takeDamage(
              enemy.x + Math.random() * enemy.width,
              enemy.y + Math.random() * enemy.height,
              10, 10, damage
            );
          }
        }
      });
    });
  }

  render(ctx) {
    this.shields.forEach(shield => {
      if (!shield.isDestroyed()) {
        shield.render(ctx);
      }
    });
  }

  reset() {
    this.init();
  }
}

// Expose to global scope for browser
if (typeof window !== 'undefined') {
  window.Shield = Shield;
  window.ShieldManager = ShieldManager;
}