/**
 * Player.js
 * Player entity with movement, shooting, and lives management
 */

class Player {
  constructor(canvasWidth, canvasHeight) {
    this.x = canvasWidth / 2;
    this.y = canvasHeight - 60;
    this.position = { x: this.x, y: this.y }; // Add position object for compatibility
    this.width = Config.player.width;
    this.height = Config.player.height;
    this.speed = Config.player.speed;
    this.lives = Config.player.maxLives;
    this.maxLives = Config.player.maxLives;
    this.fireRate = Config.player.fireRate;
    this.baseFireRate = Config.player.fireRate;
    this.lastFireTime = 0;
    this.isInvincible = false;
    this.invincibleUntil = 0;
    this.score = 0;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
  }

  moveLeft() {
    this.x = Math.max(0, this.x - this.speed);
    this.position.x = this.x;
  }

  moveRight() {
    this.x = Math.min(this.canvasWidth - this.width, this.x + this.speed);
    this.position.x = this.x;
  }

  canShoot(currentTime) {
    return currentTime - this.lastFireTime >= this.fireRate;
  }

  shoot(currentTime) {
    if (this.canShoot(currentTime)) {
      this.lastFireTime = currentTime;
      return true;
    }
    return false;
  }

  takeDamage() {
    // Clear expired invincibility
    if (this.isInvincible && Date.now() >= this.invincibleUntil) {
      this.isInvincible = false;
    }

    if (this.isInvincible) return false;

    this.lives--;
    // Note: Invincibility is managed externally by game logic
    // Don't auto-set here to allow test scenarios with consecutive hits
    return true;
  }

  makeInvincible(duration) {
    this.isInvincible = true;
    this.invincibleUntil = Date.now() + duration;
  }

  update(currentTime) {
    if (this.isInvincible && currentTime >= this.invincibleUntil) {
      this.isInvincible = false;
    }
  }

  isDead() {
    return this.lives <= 0;
  }

  reset() {
    this.x = this.canvasWidth / 2;
    this.y = this.canvasHeight - 60;
    this.position.x = this.x;
    this.position.y = this.y;
    this.lives = this.maxLives;
    this.isInvincible = false;
    this.invincibleUntil = 0;
    this.lastFireTime = 0;
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

// Expose to global scope for browser
if (typeof window !== 'undefined') {
  window.Player = Player;
}

