/**
 * Vehicle.js - Base Vehicle Class
 * Foundation for Player and Enemy vehicles
 */

import { Entity } from './Entity.js';
import { Vector2 } from '../utils/Vector2.js';

export class Vehicle extends Entity {
  constructor(x = 0, y = 0) {
    super(x, y);

    this.type = 'vehicle';

    // Dimensions (car sprite size)
    this.width = 64;
    this.height = 96;
    this.collisionRadius = 30;

    // Stats
    this.health = 100;
    this.maxHealth = 100;
    this.speed = 150;
    this.maxSpeed = 200;
    this.acceleration = 300;
    this.friction = 0.95;
    this.turnRate = 5; // Radians per second

    // State
    this.isInvincible = false;
    this.invincibleTimer = 0;
    this.invincibleDuration = 2;

    // Visual effects
    this.flashTimer = 0;
    this.damageFlash = false;

    // Trail effect
    this.trail = [];
    this.trailMaxLength = 10;
    this.trailTimer = 0;
    this.trailInterval = 0.05;
  }

  /**
   * Update vehicle state
   * @param {number} deltaTime - Time since last update
   */
  update(deltaTime) {
    // Apply friction
    this.velocity.mult(this.friction);

    // Limit speed
    const currentSpeed = this.velocity.mag();
    if (currentSpeed > this.maxSpeed) {
      this.velocity.setMag(this.maxSpeed);
    }

    // Update position
    super.update(deltaTime);

    // Update invincibility
    if (this.isInvincible) {
      this.invincibleTimer -= deltaTime;
      if (this.invincibleTimer <= 0) {
        this.isInvincible = false;
        this.alpha = 1;
      } else {
        // Flashing effect
        this.alpha = Math.sin(this.invincibleTimer * 20) * 0.3 + 0.7;
      }
    }

    // Update damage flash
    if (this.damageFlash) {
      this.flashTimer -= deltaTime;
      if (this.flashTimer <= 0) {
        this.damageFlash = false;
      }
    }

    // Update trail
    this.trailTimer += deltaTime;
    if (this.trailTimer >= this.trailInterval && currentSpeed > 50) {
      this.trailTimer = 0;
      this.trail.unshift({
        x: this.position.x,
        y: this.position.y,
        rotation: this.rotation,
        alpha: 0.5
      });

      // Limit trail length
      if (this.trail.length > this.trailMaxLength) {
        this.trail.pop();
      }
    }

    // Fade trail
    for (let i = 0; i < this.trail.length; i++) {
      this.trail[i].alpha -= deltaTime * 2;
      if (this.trail[i].alpha <= 0) {
        this.trail.splice(i, 1);
        i--;
      }
    }
  }

  /**
   * Render vehicle
   * @param {CanvasRenderingContext2D} ctx - Canvas context
   */
  render(ctx) {
    // Render trail
    for (const point of this.trail) {
      ctx.save();
      ctx.globalAlpha = point.alpha * 0.3;
      ctx.translate(point.x, point.y);
      ctx.rotate(point.rotation);

      if (this.sprite) {
        ctx.drawImage(
          this.sprite,
          -this.width / 2,
          -this.height / 2,
          this.width,
          this.height
        );
      } else {
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
      }

      ctx.restore();
    }

    // Render vehicle
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.translate(this.position.x, this.position.y);
    ctx.rotate(this.rotation);

    // Damage flash effect
    if (this.damageFlash) {
      ctx.filter = 'brightness(2)';
    }

    if (this.sprite) {
      ctx.drawImage(
        this.sprite,
        -this.width / 2,
        -this.height / 2,
        this.width,
        this.height
      );
    } else {
      // Fallback: draw car shape
      this.renderFallback(ctx);
    }

    ctx.filter = 'none';
    ctx.restore();

    // Render invincibility shield
    if (this.isInvincible) {
      this.renderShield(ctx);
    }
  }

  /**
   * Render fallback car shape
   */
  renderFallback(ctx) {
    // Body
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.ellipse(0, 0, this.width / 2 - 8, this.height / 2 - 8, 0, 0, Math.PI * 2);
    ctx.fill();

    // Windshield (eyes)
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.ellipse(-12, -20, 10, 12, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(12, -20, 10, 12, 0, 0, Math.PI * 2);
    ctx.fill();

    // Pupils
    ctx.fillStyle = '#333333';
    ctx.beginPath();
    ctx.arc(-12, -18, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(12, -18, 5, 0, Math.PI * 2);
    ctx.fill();

    // Spoiler
    ctx.fillStyle = this.color;
    ctx.fillRect(-24, 30, 48, 8);
  }

  /**
   * Render invincibility shield
   */
  renderShield(ctx) {
    ctx.save();
    ctx.translate(this.position.x, this.position.y);

    const pulseScale = 1 + Math.sin(Date.now() * 0.01) * 0.1;
    ctx.scale(pulseScale, pulseScale);

    ctx.strokeStyle = 'rgba(79, 195, 247, 0.6)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, 0, this.collisionRadius + 10, 0, Math.PI * 2);
    ctx.stroke();

    ctx.restore();
  }

  /**
   * Move in a direction
   * @param {number} dx - Direction X (-1 to 1)
   * @param {number} dy - Direction Y (-1 to 1)
   * @param {number} deltaTime - Time since last update
   */
  move(dx, dy, deltaTime) {
    // Normalize input
    const inputMag = Math.sqrt(dx * dx + dy * dy);
    if (inputMag > 1) {
      dx /= inputMag;
      dy /= inputMag;
    }

    // Apply acceleration
    this.velocity.x += dx * this.acceleration * deltaTime;
    this.velocity.y += dy * this.acceleration * deltaTime;

    // Update rotation to face movement direction
    if (inputMag > 0.1) {
      const targetRotation = Math.atan2(dy, dx) + Math.PI / 2;
      this.rotation = this.lerpAngle(this.rotation, targetRotation, this.turnRate * deltaTime);
    }
  }

  /**
   * Linear interpolation for angles
   */
  lerpAngle(from, to, amount) {
    // Normalize angles
    while (from < -Math.PI) from += Math.PI * 2;
    while (from > Math.PI) from -= Math.PI * 2;
    while (to < -Math.PI) to += Math.PI * 2;
    while (to > Math.PI) to -= Math.PI * 2;

    // Calculate shortest rotation direction
    let diff = to - from;
    while (diff < -Math.PI) diff += Math.PI * 2;
    while (diff > Math.PI) diff -= Math.PI * 2;

    return from + diff * Math.min(1, amount);
  }

  /**
   * Take damage
   * @param {number} amount - Damage amount
   * @returns {boolean} True if still alive
   */
  takeDamage(amount) {
    if (this.isInvincible) return true;

    this.health -= amount;
    this.damageFlash = true;
    this.flashTimer = 0.1;

    // Become invincible briefly
    this.isInvincible = true;
    this.invincibleTimer = this.invincibleDuration;

    if (this.health <= 0) {
      this.health = 0;
      this.die();
      return false;
    }

    return true;
  }

  /**
   * Heal
   * @param {number} amount - Heal amount
   */
  heal(amount) {
    this.health = Math.min(this.health + amount, this.maxHealth);
  }

  /**
   * Check if dead
   */
  isDead() {
    return this.health <= 0;
  }

  /**
   * Die (override in subclasses)
   */
  die() {
    this.active = false;
  }

  /**
   * Get health percentage (0-1)
   */
  getHealthPercent() {
    return this.health / this.maxHealth;
  }

  /**
   * Reset vehicle
   */
  reset() {
    super.reset();
    this.health = this.maxHealth;
    this.isInvincible = false;
    this.invincibleTimer = 0;
    this.damageFlash = false;
    this.trail = [];
  }
}

export default Vehicle;
