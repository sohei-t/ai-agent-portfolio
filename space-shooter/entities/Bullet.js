/**
 * Bullet.js
 * Bullet entity for player and enemy bullets
 */


class Bullet {
  constructor(x, y, owner, angle = null) {
    this.x = x;
    this.y = y;
    this.width = Config.bullet.width;
    this.height = Config.bullet.height;
    this.owner = owner; // 'player' or 'enemy'
    this.isPlayerBullet = owner === 'player';
    this.direction = this.isPlayerBullet ? -1 : 1; // Up or Down
    this.speed = this.isPlayerBullet ? Config.bullet.playerSpeed : Config.bullet.enemySpeed;
    this.isActive = true;
    this.angle = angle; // For multi-shot spread

    // If angle is provided (for multi-shot), adjust velocity
    if (angle !== null) {
      const radians = (angle * Math.PI) / 180;
      this.vx = Math.sin(radians) * this.speed;
      this.vy = -Math.cos(radians) * this.speed; // Negative for upward
    } else {
      this.vx = 0;
      this.vy = this.speed * this.direction;
    }
  }

  update() {
    if (this.angle !== null) {
      this.x += this.vx;
      this.y += this.vy;
    } else {
      this.y += this.speed * this.direction;
    }
  }

  isOffScreen(canvasHeight) {
    return this.y + this.height < 0 || this.y > canvasHeight;
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
}

class BulletPool {
  constructor(canvasHeight) {
    this.bullets = [];
    this.maxBullets = 50;
    this.canvasHeight = canvasHeight;
  }

  create(x, y, owner, angle = null) {
    if (this.bullets.length < this.maxBullets) {
      const bullet = new Bullet(x, y, owner, angle);
      this.bullets.push(bullet);
      return bullet;
    }
    return null;
  }

  update() {
    this.bullets.forEach(bullet => {
      if (bullet.isActive) {
        bullet.update();
        if (bullet.isOffScreen(this.canvasHeight)) {
          bullet.isActive = false;
        }
      }
    });
  }

  getActiveBullets() {
    return this.bullets.filter(b => b.isActive);
  }

  cleanup() {
    this.bullets = this.bullets.filter(b => b.isActive);
  }
}

// Expose to global scope for browser
if (typeof window !== 'undefined') {
  window.Bullet = Bullet;
  window.BulletPool = BulletPool;
}

