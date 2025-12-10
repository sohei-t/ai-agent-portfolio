/**
 * Player - Player-controlled ship
 */
import { Entity } from './Entity.js';
import { GAME_CONFIG } from '../config/gameConfig.js';

export class Player extends Entity {
  constructor(x, y) {
    const config = GAME_CONFIG.PLAYER;

    // Support config object (for tests) or x, y coordinates
    let playerX, playerY, playerConfig;
    if (typeof x === 'object' && x !== null) {
      playerConfig = x;
      playerX = playerConfig.x !== undefined ? playerConfig.x : config.START_X - config.WIDTH / 2;
      playerY = playerConfig.y !== undefined ? playerConfig.y : config.START_Y - config.HEIGHT / 2;
    } else {
      playerX = x;
      playerY = y;
      playerConfig = {};
    }

    const width = playerConfig.width !== undefined ? playerConfig.width : config.WIDTH;
    const height = playerConfig.height !== undefined ? playerConfig.height : config.HEIGHT;

    super(playerX, playerY, width, height);

    this.type = 'player';
    this.health = playerConfig.health !== undefined ? playerConfig.health : config.MAX_HEALTH;
    this.maxHealth = config.MAX_HEALTH;
    this.power = 1;
    this.maxPower = config.MAX_POWER || 3;
    this.speed = playerConfig.speed !== undefined ? playerConfig.speed : config.SPEED;
    this.fireRate = config.FIRE_RATE;
    this.lastFireTime = 0;
    this.invincible = false;
    this.invincibleTimer = 0;
    this.bullets = [];
    this.shield = false;
    this.bombs = 3;
    this.isAlive = true;
    this.shipType = 'BALANCED';
    this.bulletType = 'PLAYER_NORMAL';

    // Apply ship type if provided
    this.setShipType(playerConfig.shipType || this.shipType);
  }

  /**
   * Update player
   */
  update(deltaTime) {
    // Update invincibility
    if (this.invincible) {
      this.invincibleTimer -= deltaTime;
      if (this.invincibleTimer <= 0) {
        this.invincible = false;
      }
    }

    // Update fire cooldown
    if (this.lastFireTime > 0) {
      this.lastFireTime -= deltaTime;
    }
  }

  /**
   * Move player
   */
  move(dx, dy, deltaTime, canvasWidth, canvasHeight) {
    this.x += dx * this.speed * deltaTime;
    this.y += dy * this.speed * deltaTime;

    // Clamp to screen bounds
    this.x = Math.max(0, Math.min(canvasWidth - this.width, this.x));
    this.y = Math.max(0, Math.min(canvasHeight - this.height, this.y));
  }

  /**
   * Move left
   */
  moveLeft() {
    this.x -= this.speed;
    if (this.x < 0) {
      this.x = 0;
    }
  }

  /**
   * Move right
   */
  moveRight() {
    const canvasWidth = 800;
    this.x += this.speed;
    if (this.x > canvasWidth - this.width) {
      this.x = canvasWidth - this.width;
    }
  }

  /**
   * Move up
   */
  moveUp() {
    this.y -= this.speed;
    if (this.y < 0) {
      this.y = 0;
    }
  }

  /**
   * Move down
   */
  moveDown() {
    const canvasHeight = 600;
    this.y += this.speed;
    if (this.y > canvasHeight - this.height) {
      this.y = canvasHeight - this.height;
    }
  }

  /**
   * Check if can shoot
   */
  canShoot() {
    return this.lastFireTime <= 0;
  }

  /**
   * Shoot bullet
   */
  shoot() {
    if (!this.canShoot()) return null;

    this.lastFireTime = this.fireRate;
    return this.createBullets();
  }

  /**
   * Create bullets based on power level
   */
  createBullets() {
    const bullets = [];
    const centerX = this.x + this.width / 2;
    const bulletY = this.y;
    const bulletType = this.bulletType || 'PLAYER_NORMAL';

    if (this.power === 1) {
      // Single bullet
      bullets.push({ x: centerX - 4, y: bulletY, vx: 0, vy: -800, bulletType });
    } else if (this.power === 2) {
      // Double bullets
      bullets.push({ x: centerX - 12, y: bulletY, vx: -50, vy: -800, bulletType });
      bullets.push({ x: centerX + 4, y: bulletY, vx: 50, vy: -800, bulletType });
    } else if (this.power >= 3) {
      // Triple bullets
      bullets.push({ x: centerX - 20, y: bulletY, vx: -100, vy: -800, bulletType });
      bullets.push({ x: centerX - 4, y: bulletY, vx: 0, vy: -800, bulletType });
      bullets.push({ x: centerX + 12, y: bulletY, vx: 100, vy: -800, bulletType });
    }

    return bullets;
  }

  /**
   * Take damage
   */
  takeDamage(damage) {
    if (this.invincible) return false;

    if (this.shield) {
      this.shield = false;
      return false;
    }

    this.health -= damage;
    if (this.health < 0) {
      this.health = 0;
    }

    if (this.health > 0) {
      this.invincible = true;
      this.invincibleTimer = GAME_CONFIG.PLAYER.INVINCIBLE_TIME / 1000;
    } else {
      this.isAlive = false;
      this.active = false; // Mark player as inactive when dead
    }

    return this.health <= 0;
  }

  /**
   * Make player invincible
   */
  makeInvincible(duration) {
    this.invincible = true;
    this.invincibleTimer = duration / 1000;
  }

  /**
   * Power up
   */
  powerUp() {
    if (this.power < this.maxPower) {
      this.power++;
    }
  }

  /**
   * Activate shield
   */
  activateShield() {
    this.shield = true;
  }

  /**
   * Add life
   */
  addLife() {
    if (this.health < this.maxHealth) {
      this.health++;
    }
  }

  /**
   * Use bomb
   */
  useBomb() {
    if (this.bombs > 0) {
      this.bombs--;
      return true;
    }
    return false;
  }

  /**
   * Render player
   */
  render(ctx) {
    // Draw ship body (triangle shape)
    ctx.save();

    // Flicker when invincible
    if (this.invincible && Math.floor(this.invincibleTimer * 10) % 2 === 0) {
      ctx.globalAlpha = 0.5;
    }

    // Ship color
    ctx.fillStyle = '#00FFFF';
    ctx.strokeStyle = '#00AAFF';
    ctx.lineWidth = 2;

    // Draw ship
    ctx.beginPath();
    ctx.moveTo(this.x + this.width / 2, this.y);
    ctx.lineTo(this.x, this.y + this.height);
    ctx.lineTo(this.x + this.width, this.y + this.height);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Draw cockpit
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(
      this.x + this.width / 2,
      this.y + this.height / 2,
      8,
      0,
      Math.PI * 2
    );
    ctx.fill();

    // Draw shield
    if (this.shield) {
      ctx.strokeStyle = '#00FF00';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(
        this.x + this.width / 2,
        this.y + this.height / 2,
        this.width / 2 + 5,
        0,
        Math.PI * 2
      );
      ctx.stroke();
    }

    ctx.restore();
  }

  /**
   * Reset player
   */
  reset(shipType = this.shipType) {
    const config = GAME_CONFIG.PLAYER;
    this.x = config.START_X - config.WIDTH / 2;
    this.y = config.START_Y - config.HEIGHT / 2;
    this.health = config.MAX_HEALTH;
    this.power = 1;
    this.invincible = false;
    this.invincibleTimer = 0;
    this.shield = false;
    this.bombs = 3;
    this.active = true;
    this.isAlive = true;

    this.setShipType(shipType);
  }

  /**
  * Set current ship type stats
  */
  setShipType(shipType = 'BALANCED') {
    const shipConfig = GAME_CONFIG.SHIP_TYPES[shipType] || GAME_CONFIG.SHIP_TYPES.BALANCED;

    this.shipType = shipType;
    this.speed = shipConfig.speed;
    this.fireRate = shipConfig.fireRate;
    this.maxPower = shipConfig.maxPower ?? this.maxPower;
    this.power = Math.min(shipConfig.power ?? this.power, this.maxPower);
    this.bulletType = shipConfig.bulletType || 'PLAYER_NORMAL';
  }
}
