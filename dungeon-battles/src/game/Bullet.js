/**
 * Bullet - Projectile entity for player and enemy attacks
 * Supports normal bullets, homing bullets, and magic bullets
 */
import { Entity } from './Entity.js';

export class Bullet extends Entity {
  constructor() {
    super(0, 0, 8, 16, 'bullet');

    this.damage = 10;
    this.owner = null; // 'player' or 'enemy'
    this.homing = false;
    this.homingStrength = 0;
    this.target = null;
    this.lifetime = 0;
    this.maxLifetime = 5;
    this.color = '#ffffff';
    this.speed = 200;
  }

  /**
   * Initialize bullet with parameters
   */
  init(x, y, damage, type, config, target = null) {
    this.x = x;
    this.y = y;
    this.damage = damage;
    this.type = type;
    this.alive = true;
    this.lifetime = 0;

    // Set properties from config
    this.speed = config.speed;
    this.maxLifetime = config.lifetime;
    this.color = config.color;
    this.width = config.size.width;
    this.height = config.size.height;

    // Homing setup
    if (config.homingStrength) {
      this.homing = true;
      this.homingStrength = config.homingStrength;
      this.target = target;
    } else {
      this.homing = false;
      this.target = null;
    }

    // Set initial velocity
    if (type === 'player-bullet' || type === 'magic-bullet') {
      this.velocity.y = -this.speed; // Move up
    } else {
      this.velocity.y = this.speed; // Move down
    }

    return this;
  }

  /**
   * Initialize with angle
   */
  initWithAngle(x, y, damage, type, angle, config) {
    this.init(x, y, damage, type, config);

    // Set velocity based on angle
    this.velocity.x = Math.cos(angle) * this.speed;
    this.velocity.y = Math.sin(angle) * this.speed;

    return this;
  }

  /**
   * Update bullet
   */
  update(deltaTime) {
    // Update lifetime
    this.lifetime += deltaTime;
    if (this.lifetime >= this.maxLifetime) {
      this.alive = false;
      return;
    }

    // Homing behavior
    if (this.homing && this.target && this.target.alive) {
      const angle = this.angleTo(this.target);
      const currentAngle = Math.atan2(this.velocity.y, this.velocity.x);

      // Gradually turn towards target
      let angleDiff = angle - currentAngle;

      // Normalize angle difference
      while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
      while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;

      const turnAmount = angleDiff * this.homingStrength;
      const newAngle = currentAngle + turnAmount;

      this.velocity.x = Math.cos(newAngle) * this.speed;
      this.velocity.y = Math.sin(newAngle) * this.speed;
    }
  }

  /**
   * Render bullet
   */
  render(ctx) {
    ctx.save();

    ctx.fillStyle = this.color;

    if (this.type === 'magic-bullet') {
      // Draw larger, glowing magic bullet
      ctx.shadowBlur = 10;
      ctx.shadowColor = this.color;

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.width / 2, 0, Math.PI * 2);
      ctx.fill();
    } else if (this.homing) {
      // Draw diamond for homing bullets
      ctx.beginPath();
      ctx.moveTo(this.x, this.y - this.height / 2);
      ctx.lineTo(this.x + this.width / 2, this.y);
      ctx.lineTo(this.x, this.y + this.height / 2);
      ctx.lineTo(this.x - this.width / 2, this.y);
      ctx.closePath();
      ctx.fill();
    } else {
      // Draw normal bullet
      ctx.fillRect(
        this.x - this.width / 2,
        this.y - this.height / 2,
        this.width,
        this.height
      );
    }

    ctx.restore();
  }

  /**
   * Reset bullet for object pool
   */
  reset() {
    super.reset();
    this.damage = 0;
    this.owner = null;
    this.homing = false;
    this.target = null;
    this.lifetime = 0;
    this.homingStrength = 0;
  }

  /**
   * Check if bullet is from player
   */
  isPlayerBullet() {
    return this.type === 'player-bullet' || this.type === 'magic-bullet';
  }

  /**
   * Check if bullet is from enemy
   */
  isEnemyBullet() {
    return this.type === 'enemy-bullet' || this.type === 'boss-bullet';
  }
}
