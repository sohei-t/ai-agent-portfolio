/**
 * Bomb.js - Bomb Projectile Class
 * Thrown behind vehicles, explodes after fuse time
 */

import { Entity } from './Entity.js';

export class Bomb extends Entity {
  constructor(x = 0, y = 0) {
    super(x, y);

    this.type = 'bomb';
    this.width = 32;
    this.height = 32;
    this.collisionRadius = 12;
    this.color = '#333333';

    // Bomb properties
    this.owner = null;
    this.damage = 40;
    this.fuseTime = 2;
    this.timer = 0;
    this.exploded = false;
    this.explosionRadius = 80;
    this.explosionDuration = 0.3;
    this.explosionTimer = 0;

    // Animation
    this.pulseTimer = 0;
    this.bounceHeight = 0;
  }

  /**
   * Initialize bomb
   */
  init(x, y, vx, vy, owner = null) {
    this.position.set(x, y);
    this.velocity.set(vx, vy);
    this.owner = owner;
    this.timer = 0;
    this.exploded = false;
    this.explosionTimer = 0;
    this.active = true;
    this.pulseTimer = 0;
  }

  /**
   * Update bomb state
   */
  update(deltaTime) {
    if (!this.exploded) {
      // Apply friction
      this.velocity.mult(0.98);

      // Update position
      super.update(deltaTime);

      // Update fuse timer
      this.timer += deltaTime;

      // Animation
      this.pulseTimer += deltaTime;
      this.bounceHeight = Math.abs(Math.sin(this.pulseTimer * 10)) * 5;

      // Explode when fuse runs out
      if (this.timer >= this.fuseTime) {
        this.explode();
      }
    } else {
      // Update explosion animation
      this.explosionTimer += deltaTime;
      if (this.explosionTimer >= this.explosionDuration) {
        this.active = false;
      }
    }
  }

  /**
   * Render bomb
   */
  render(ctx) {
    if (this.exploded) {
      this.renderExplosion(ctx);
    } else {
      this.renderBomb(ctx);
    }
  }

  /**
   * Render bomb sprite
   */
  renderBomb(ctx) {
    ctx.save();
    ctx.translate(this.position.x, this.position.y - this.bounceHeight);

    // Shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.beginPath();
    ctx.ellipse(0, this.bounceHeight + 5, 12, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // Bomb body
    ctx.fillStyle = '#333';
    ctx.beginPath();
    ctx.arc(0, 0, 14, 0, Math.PI * 2);
    ctx.fill();

    // Highlight
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.beginPath();
    ctx.arc(-4, -4, 5, 0, Math.PI * 2);
    ctx.fill();

    // Fuse
    ctx.strokeStyle = '#8B4513';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, -14);
    ctx.quadraticCurveTo(5, -20, 0, -24);
    ctx.stroke();

    // Fuse spark (pulsing)
    const fuseProgress = this.timer / this.fuseTime;
    const sparkSize = 3 + Math.sin(this.pulseTimer * 20) * 2;

    // Change color as fuse runs out
    if (fuseProgress > 0.7) {
      ctx.fillStyle = '#FF0000';
    } else if (fuseProgress > 0.4) {
      ctx.fillStyle = '#FF6600';
    } else {
      ctx.fillStyle = '#FFCC00';
    }

    ctx.beginPath();
    ctx.arc(0, -24, sparkSize, 0, Math.PI * 2);
    ctx.fill();

    // Spark glow
    ctx.globalAlpha = 0.5;
    ctx.beginPath();
    ctx.arc(0, -24, sparkSize + 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  /**
   * Render explosion effect
   */
  renderExplosion(ctx) {
    const progress = this.explosionTimer / this.explosionDuration;
    const radius = this.explosionRadius * (0.3 + progress * 0.7);
    const alpha = 1 - progress;

    ctx.save();
    ctx.translate(this.position.x, this.position.y);
    ctx.globalAlpha = alpha;

    // Outer explosion
    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
    gradient.addColorStop(0, '#FFFFFF');
    gradient.addColorStop(0.3, '#FFCC00');
    gradient.addColorStop(0.6, '#FF6600');
    gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.fill();

    // Sparks
    ctx.fillStyle = '#FFCC00';
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2 + progress * 2;
      const sparkRadius = radius * 0.8;
      const x = Math.cos(angle) * sparkRadius;
      const y = Math.sin(angle) * sparkRadius;
      const size = 5 * (1 - progress);

      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  /**
   * Explode the bomb
   */
  explode() {
    if (this.exploded) return;
    this.exploded = true;
    this.explosionTimer = 0;
    this.collidable = true; // Enable collision during explosion
  }

  /**
   * Check if entity is in explosion radius
   */
  isInExplosion(entity) {
    if (!this.exploded) return false;
    if (entity === this.owner) return false; // Don't damage owner

    const dx = entity.position.x - this.position.x;
    const dy = entity.position.y - this.position.y;
    const distSq = dx * dx + dy * dy;
    return distSq < this.explosionRadius * this.explosionRadius;
  }

  /**
   * Get explosion progress (0-1)
   */
  getExplosionProgress() {
    return this.explosionTimer / this.explosionDuration;
  }

  /**
   * Check if explosion is active
   */
  isExploding() {
    return this.exploded && this.explosionTimer < this.explosionDuration;
  }

  /**
   * Reset bomb
   */
  reset() {
    super.reset();
    this.owner = null;
    this.timer = 0;
    this.exploded = false;
    this.explosionTimer = 0;
    this.pulseTimer = 0;
    this.bounceHeight = 0;
    this.collidable = false;
  }
}

export default Bomb;
